// Stripe Checkout for the 2026 Martinborough Harvest Blend (500ml, $30 NZD).
// Creates a Stripe Checkout Session and returns its hosted URL; the browser redirects there.
//
// Fulfilment: Wellington City pickup / local drop-off only — no shipping collected.
// Discount: Stripe Checkout's built-in promo code field (allow_promotion_codes).
//   Create the coupon once in the Stripe Dashboard:
//     Products → Coupons → New: 50% off, then add a Promotion code "IPICKEDIN26".
//
// Deploy (one-time setup):
//   1. Stripe → Developers → API keys → copy the *secret* key (sk_live_… or sk_test_…).
//   2. supabase secrets set STRIPE_SECRET_KEY=sk_live_xxx --project-ref pvtrqnvacjdquktdcqfh
//      (Optional) supabase secrets set ALLOWED_ORIGIN=https://www.olivegreenmartinborough.com --project-ref pvtrqnvacjdquktdcqfh
//   3. supabase functions deploy create-checkout-session --no-verify-jwt
//
// Webhook URL for Vite (VITE_CHECKOUT_SESSION_URL):
//   https://pvtrqnvacjdquktdcqfh.supabase.co/functions/v1/create-checkout-session

import 'jsr:@supabase/functions-js/edge-runtime.d.ts'

const STRIPE_API = 'https://api.stripe.com/v1/checkout/sessions'

/** Product config — single line item, fixed unit price. */
const PRODUCT = {
  name: '2026 Martinborough Harvest Blend — 500ml',
  description: 'Cold-pressed extra virgin olive oil. Frantoio, Barnea, Leccino & Koroneiki.',
  currency: 'nzd',
  unitAmount: 3000, // $30.00 NZD in cents
  maxQuantity: 24,
} as const

const SITE_ORIGIN = 'https://www.olivegreenmartinborough.com'

const CORS_ALLOW_HEADERS = 'authorization, x-client-info, apikey, content-type'

function corsBase() {
  const allow = Deno.env.get('ALLOWED_ORIGIN') || '*'
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': CORS_ALLOW_HEADERS,
  }
}

function json(data: unknown, status: number) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsBase() },
  })
}

Deno.serve(async (req) => {
  const origin = req.headers.get('origin') || ''
  const allowed = Deno.env.get('ALLOWED_ORIGIN')

  if (allowed && allowed !== '*' && origin && origin !== allowed) {
    return json({ error: 'Forbidden' }, 403)
  }

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsBase() })
  }
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405)
  }

  const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')?.trim()
  if (!stripeKey) {
    console.error('create-checkout-session: STRIPE_SECRET_KEY not set')
    return json({ error: 'Payments are not configured yet. Please email us to order.' }, 500)
  }

  let body: Record<string, unknown> = {}
  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  let quantity = Number(body.quantity)
  if (!Number.isFinite(quantity) || quantity < 1) quantity = 1
  quantity = Math.min(Math.floor(quantity), PRODUCT.maxQuantity)

  // Stripe expects application/x-www-form-urlencoded.
  const form = new URLSearchParams()
  form.set('mode', 'payment')
  form.set('submit_type', 'pay')
  form.set('allow_promotion_codes', 'true')
  form.set('phone_number_collection[enabled]', 'true')
  form.set('billing_address_collection', 'auto')
  form.set('success_url', `${SITE_ORIGIN}/shop/success?session_id={CHECKOUT_SESSION_ID}`)
  form.set('cancel_url', `${SITE_ORIGIN}/shop`)
  form.set('line_items[0][price_data][currency]', PRODUCT.currency)
  form.set('line_items[0][price_data][unit_amount]', String(PRODUCT.unitAmount))
  form.set('line_items[0][price_data][product_data][name]', PRODUCT.name)
  form.set('line_items[0][price_data][product_data][description]', PRODUCT.description)
  form.set('line_items[0][quantity]', String(quantity))
  // Pickup-only note shown on the Stripe Checkout page.
  form.set(
    'custom_text[submit][message]',
    'Pickup or local drop-off in Wellington City only — no shipping. We’ll be in touch to arrange a time after your order.',
  )

  const res = await fetch(STRIPE_API, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${stripeKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: form.toString(),
  })

  const raw = await res.text()
  if (!res.ok) {
    console.error('Stripe error', res.status, raw)
    return json({ error: 'Could not start checkout. Please try again or email us.' }, 502)
  }

  let session: { id?: string; url?: string } = {}
  try {
    session = JSON.parse(raw)
  } catch {
    return json({ error: 'Unexpected response from Stripe.' }, 502)
  }

  if (!session.url) {
    return json({ error: 'Checkout session missing URL.' }, 502)
  }

  return json({ url: session.url }, 200)
})
