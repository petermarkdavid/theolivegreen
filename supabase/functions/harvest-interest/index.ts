// Harvest interest form → inserts into `harvest_interest` (same table as supabase/harvest_interest.sql).
//
// Deploy (one-time setup):
//   1. Install Supabase CLI: https://supabase.com/docs/guides/cli
//   2. supabase login
//   3. supabase link --project-ref YOUR_PROJECT_REF   (from Project Settings → General)
//   4. supabase secrets set ALLOWED_ORIGIN=https://www.olivegreenmartinborough.com --project-ref pvtrqnvacjdquktdcqfh
//      Or Dashboard → Edge Functions → Secrets. (Use ALLOWED_ORIGIN=* only for local testing.)
//   5. Optional email (Resend): secrets set RESEND_API_KEY=re_...  RESEND_FROM="Olive Green <noreply@yourdomain>"
//      (From must be a domain verified in Resend.)
//   6. supabase functions deploy harvest-interest --no-verify-jwt
//
// Webhook URL for Vite (VITE_HARVEST_INTEREST_WEBHOOK_URL):
//   https://pvtrqnvacjdquktdcqfh.supabase.co/functions/v1/harvest-interest
//
// --no-verify-jwt = browser can POST without a Supabase login (public form).

import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'

const DEFAULT_CC = 'olivegreenmartinborough@gmail.com'
const RESEND_URL = 'https://api.resend.com/emails'

type SendEmailResult =
  | { ok: true; resendId?: string }
  | { ok: false; status: number; body: string }

async function sendResendEmail(params: {
  apiKey: string
  from: string
  to: string
  cc?: string[]
  replyTo?: string
  subject: string
  html: string
}): Promise<SendEmailResult> {
  const res = await fetch(RESEND_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${params.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: params.from,
      to: [params.to],
      ...(params.cc?.length ? { cc: params.cc } : {}),
      ...(params.replyTo ? { reply_to: params.replyTo } : {}),
      subject: params.subject,
      html: params.html,
    }),
  })
  const raw = await res.text()
  if (!res.ok) {
    return { ok: false, status: res.status, body: raw }
  }
  let resendId: string | undefined
  try {
    const j = JSON.parse(raw) as { id?: string }
    resendId = j.id
  } catch {
    /* ignore */
  }
  return { ok: true, resendId }
}

/** Browsers send Authorization + apikey on fetch; gateway must allow them on preflight. */
const CORS_ALLOW_HEADERS = 'authorization, x-client-info, apikey, content-type'

function corsBase() {
  const allow = Deno.env.get('ALLOWED_ORIGIN') || '*'
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': CORS_ALLOW_HEADERS,
  }
}

function json(data: unknown, status: number, _origin: string) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsBase(),
    },
  })
}

Deno.serve(async (req) => {
  const origin = req.headers.get('origin') || ''
  const allowed = Deno.env.get('ALLOWED_ORIGIN')

  if (allowed && allowed !== '*' && origin && origin !== allowed) {
    return json({ error: 'Forbidden' }, 403, origin)
  }

  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsBase(),
    })
  }

  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405, origin)
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !serviceKey) {
    return json({ error: 'Server misconfigured' }, 500, origin)
  }

  let body: Record<string, unknown>
  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    return json({ error: 'Invalid JSON' }, 400, origin)
  }

  const email = String(body.email || '')
    .trim()
    .toLowerCase()
  const name = String(body.name || '').trim()
  const guestCount = Number(body.guestCount)
  const notes = String(body.notes || '').trim()
  const source = String(body.source || '').trim()
  const clientCreatedAt = body.createdAt ? String(body.createdAt) : null

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'Valid email required' }, 400, origin)
  }
  if (!Number.isFinite(guestCount) || guestCount < 1) {
    return json({ error: 'Invalid guest count' }, 400, origin)
  }

  const supabase = createClient(supabaseUrl, serviceKey)
  const { error } = await supabase.from('harvest_interest').insert({
    name: name || null,
    email,
    guest_count: guestCount,
    notes: notes || null,
    source: source || null,
    client_created_at: clientCreatedAt,
  })

  if (error) {
    console.error(error)
    return json({ error: 'Could not save your registration. Please try again.' }, 502, origin)
  }

  const resendKey = Deno.env.get('RESEND_API_KEY')?.trim()
  const resendFrom = Deno.env.get('RESEND_FROM')?.trim()
  const cc = (Deno.env.get('RESEND_CC')?.trim() || DEFAULT_CC).split(',').map((s) => s.trim()).filter(Boolean)

  let emailSent = false

  if (!resendKey || !resendFrom) {
    console.warn(
      'harvest-interest: Resend skipped — set Edge Function secrets RESEND_API_KEY and RESEND_FROM (check names, no extra quotes).',
      { hasApiKey: Boolean(resendKey), hasFrom: Boolean(resendFrom) },
    )
  } else {
    const displayName = name || 'there'
    const html = `
      <p>Hi ${escapeHtml(displayName)},</p>
      <p>Thanks for registering your interest in the Olive Green harvest. We’ve received your details.</p>
      <ul>
        <li><strong>People:</strong> ${guestCount}</li>
        ${notes ? `<li><strong>Notes:</strong> ${escapeHtml(notes)}</li>` : ''}
      </ul>
      <p>We’ll be in touch closer to the date. If you have questions, reply to this email or write to <a href="mailto:olivegreenmartinborough@gmail.com">olivegreenmartinborough@gmail.com</a>.</p>
      <p>— Olive Green Martinborough</p>
    `
    const sent = await sendResendEmail({
      apiKey: resendKey,
      from: resendFrom,
      to: email,
      cc,
      replyTo: DEFAULT_CC,
      subject: 'We’ve received your harvest interest — Olive Green Martinborough',
      html,
    })
    if (!sent.ok) {
      console.error('Resend harvest email failed', sent.status, sent.body)
    } else {
      emailSent = true
      console.info('harvest-interest: Resend OK', { resendId: sent.resendId, to: email })
    }
  }

  return json({ ok: true, emailSent }, 200, origin)
})

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
