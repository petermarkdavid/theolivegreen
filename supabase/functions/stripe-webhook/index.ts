// Stripe webhook → emails a sale notification (buyer name + order details) via Resend.
//
// Stripe calls this function when a Checkout Session completes (i.e. someone pays).
// We verify the webhook signature, fetch the line items, and email the shop inbox.
//
// Deploy (one-time setup):
//   1. supabase functions deploy stripe-webhook --no-verify-jwt --project-ref pvtrqnvacjdquktdcqfh
//   2. Stripe Dashboard → Developers → Webhooks → Add endpoint:
//        URL:    https://pvtrqnvacjdquktdcqfh.supabase.co/functions/v1/stripe-webhook
//        Events: checkout.session.completed
//      Copy the signing secret (whsec_…) shown after creating the endpoint.
//   3. supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_xxx --project-ref pvtrqnvacjdquktdcqfh
//      (STRIPE_SECRET_KEY and RESEND_API_KEY are already set for the other functions.)
//      Optional: SALE_NOTIFY_TO=you@example.com (defaults to the shop Gmail below).
//   4. Test: Stripe Dashboard → the webhook endpoint → "Send test event" →
//      checkout.session.completed, or make a real purchase with a test card in test mode.

import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import {
  DEFAULT_RESEND_FROM,
  normalizeResendFromAddress,
} from '../_shared/normalizeResendFrom.ts'

const DEFAULT_NOTIFY_TO = 'olivegreenmartinborough@gmail.com'
/** Matt also gets each sale notification. Override with SALE_NOTIFY_CC (comma-separated) if needed. */
const DEFAULT_NOTIFY_CC = 'mattspence@outlook.co.nz'
const RESEND_URL = 'https://api.resend.com/emails'
/** Reject events older than this to limit replay attacks (Stripe's recommended default). */
const SIGNATURE_TOLERANCE_SECONDS = 5 * 60

type StripeCheckoutSession = {
  id: string
  amount_total: number | null
  currency: string | null
  payment_intent: string | null
  livemode?: boolean
  customer_details?: {
    name?: string | null
    email?: string | null
    phone?: string | null
  } | null
  total_details?: {
    amount_discount?: number | null
  } | null
}

type StripeLineItem = {
  description?: string | null
  quantity?: number | null
  amount_total?: number | null
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')?.trim()
  if (!webhookSecret) {
    console.error('stripe-webhook: STRIPE_WEBHOOK_SECRET not set')
    return new Response('Not configured', { status: 500 })
  }

  const payload = await req.text()
  const signatureHeader = req.headers.get('stripe-signature') || ''
  const verified = await verifyStripeSignature(payload, signatureHeader, webhookSecret)
  if (!verified) {
    console.warn('stripe-webhook: signature verification failed')
    return new Response('Invalid signature', { status: 400 })
  }

  let event: { type?: string; data?: { object?: StripeCheckoutSession } }
  try {
    event = JSON.parse(payload)
  } catch {
    return new Response('Invalid JSON', { status: 400 })
  }

  if (event.type !== 'checkout.session.completed') {
    // Acknowledge everything else so Stripe doesn't retry.
    return new Response(JSON.stringify({ received: true }), { status: 200 })
  }

  const session = event.data?.object
  if (!session?.id) {
    return new Response('Missing session', { status: 400 })
  }

  const lineItems = await fetchLineItems(session.id)

  const resendKey = Deno.env.get('RESEND_API_KEY')?.trim()
  if (!resendKey) {
    console.error('stripe-webhook: RESEND_API_KEY not set — sale email skipped', {
      sessionId: session.id,
    })
    // 500 so Stripe retries once the secret is fixed.
    return new Response('Email not configured', { status: 500 })
  }

  const from =
    normalizeResendFromAddress(Deno.env.get('RESEND_FROM') ?? '') || DEFAULT_RESEND_FROM
  const to = Deno.env.get('SALE_NOTIFY_TO')?.trim() || DEFAULT_NOTIFY_TO
  const cc = (Deno.env.get('SALE_NOTIFY_CC')?.trim() || DEFAULT_NOTIFY_CC)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  const { subject, html, text } = buildSaleEmail(session, lineItems)

  const res = await fetch(RESEND_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      ...(cc.length ? { cc } : {}),
      subject,
      html,
      text,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    console.error('stripe-webhook: Resend failed', res.status, body)
    // Non-2xx → Stripe retries the event, so a transient email outage still notifies you.
    return new Response('Email failed', { status: 502 })
  }

  console.info('stripe-webhook: sale notification sent', {
    sessionId: session.id,
    to,
    amountTotal: session.amount_total,
  })
  return new Response(JSON.stringify({ received: true }), { status: 200 })
})

/**
 * Verify Stripe's `Stripe-Signature` header: HMAC-SHA256 of `${timestamp}.${payload}`
 * with the endpoint's signing secret. https://docs.stripe.com/webhooks/signature
 */
async function verifyStripeSignature(
  payload: string,
  header: string,
  secret: string,
): Promise<boolean> {
  const parts = new Map<string, string[]>()
  for (const pair of header.split(',')) {
    const [k, v] = pair.split('=', 2)
    if (!k || !v) continue
    const list = parts.get(k.trim()) ?? []
    list.push(v.trim())
    parts.set(k.trim(), list)
  }

  const timestamp = parts.get('t')?.[0]
  const signatures = parts.get('v1') ?? []
  if (!timestamp || signatures.length === 0) return false

  const age = Math.abs(Date.now() / 1000 - Number(timestamp))
  if (!Number.isFinite(age) || age > SIGNATURE_TOLERANCE_SECONDS) return false

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const mac = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(`${timestamp}.${payload}`),
  )
  const expected = hexFromBytes(new Uint8Array(mac))

  return signatures.some((sig) => timingSafeEqualHex(sig, expected))
}

function hexFromBytes(bytes: Uint8Array): string {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')
}

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

/** Line items aren't included in the webhook payload; fetch them from the Stripe API. */
async function fetchLineItems(sessionId: string): Promise<StripeLineItem[]> {
  const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')?.trim()
  if (!stripeKey) {
    console.warn('stripe-webhook: STRIPE_SECRET_KEY not set — email will omit line items')
    return []
  }
  const res = await fetch(
    `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}/line_items?limit=100`,
    { headers: { Authorization: `Bearer ${stripeKey}` } },
  )
  if (!res.ok) {
    console.error('stripe-webhook: line items fetch failed', res.status, await res.text())
    return []
  }
  const body = (await res.json()) as { data?: StripeLineItem[] }
  return body.data ?? []
}

function formatAmount(cents: number | null | undefined, currency: string | null | undefined): string {
  if (cents == null) return '—'
  const code = (currency || 'nzd').toUpperCase()
  return `${code === 'NZD' ? 'NZ$' : `${code} `}${(cents / 100).toFixed(2)}`
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function buildSaleEmail(
  session: StripeCheckoutSession,
  lineItems: StripeLineItem[],
): { subject: string; html: string; text: string } {
  const name = session.customer_details?.name?.trim() || 'Unknown name'
  const email = session.customer_details?.email?.trim() || '—'
  const phone = session.customer_details?.phone?.trim() || '—'
  const total = formatAmount(session.amount_total, session.currency)
  const discount = session.total_details?.amount_discount || 0
  const testNote = session.livemode === false ? ' [TEST MODE]' : ''
  const paymentUrl = session.payment_intent
    ? `https://dashboard.stripe.com/payments/${session.payment_intent}`
    : 'https://dashboard.stripe.com/payments'

  const itemLines = lineItems.length
    ? lineItems.map(
        (li) =>
          `${li.quantity ?? 1} × ${li.description || 'Item'} — ${formatAmount(li.amount_total, session.currency)}`,
      )
    : ['(line items unavailable — see Stripe dashboard)']

  const subject = `🫒 New sale${testNote}: ${name} — ${total}`

  const rows: [string, string][] = [
    ['Name', name],
    ['Email', email],
    ['Phone', phone],
    ['Order', itemLines.join('; ')],
    ...(discount > 0
      ? ([['Discount', `-${formatAmount(discount, session.currency)} (promo code used)`]] as [
          string,
          string,
        ][])
      : []),
    ['Total paid', total],
  ]

  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 16px 6px 0;font-family:Georgia,serif;font-size:15px;color:#3d4a2e;font-weight:600;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td><td style="padding:6px 0;font-family:Georgia,serif;font-size:15px;color:#2c2c2c;">${escapeHtml(value)}</td></tr>`,
    )
    .join('')

  const html = `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:24px;background-color:#f0ebe3;font-family:Georgia,serif;">
  <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:8px;padding:28px 32px;border-top:4px solid #c9a961;">
    <p style="margin:0 0 4px 0;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#6b7d3f;">Olive Green Martinborough${escapeHtml(testNote)}</p>
    <h1 style="margin:0 0 20px 0;font-size:22px;color:#3d4a2e;">New sale 🫒</h1>
    <table role="presentation" cellspacing="0" cellpadding="0" border="0">${htmlRows}</table>
    <p style="margin:24px 0 0 0;font-size:14px;">
      <a href="${escapeHtml(paymentUrl)}" style="color:#5a6b3a;font-weight:600;">View payment in Stripe</a>
    </p>
    <p style="margin:16px 0 0 0;font-size:12px;color:#8a8a8a;">Pickup / local drop-off in Wellington City — remember to arrange a time with the buyer.</p>
  </div>
</body>
</html>`

  const text = [
    `New sale${testNote} — Olive Green Martinborough`,
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    `Stripe: ${paymentUrl}`,
    '',
    'Pickup / local drop-off in Wellington City — remember to arrange a time with the buyer.',
  ].join('\n')

  return { subject, html, text }
}
