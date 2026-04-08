// Newsletter signup → inserts into `newsletter_subscribers` (see supabase/newsletter.sql).
//
// Deploy: supabase functions deploy newsletter-signup --no-verify-jwt
// Secrets: same as harvest-interest (SUPABASE_* auto; ALLOWED_ORIGIN for CORS).
//
// Vite: VITE_NEWSLETTER_WEBHOOK_URL=https://<ref>.supabase.co/functions/v1/newsletter-signup
// Optional: RESEND_API_KEY, RESEND_FROM (verified domain), RESEND_CC (default olivegreenmartinborough@gmail.com)

import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { sendResendEmail } from '../_shared/resend'

const DEFAULT_CC = 'olivegreenmartinborough@gmail.com'

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
  const source = String(body.source || '').trim() || null
  const clientCreatedAt = body.createdAt ? String(body.createdAt) : null

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'Valid email required' }, 400, origin)
  }

  const supabase = createClient(supabaseUrl, serviceKey)
  const { error } = await supabase.from('newsletter_subscribers').insert({
    email,
    source,
    client_created_at: clientCreatedAt,
  })

  if (error) {
    // Unique index on lower(email)
    if (error.code === '23505') {
      return json({ ok: true, duplicate: true }, 200, origin)
    }
    console.error(error)
    return json({ error: 'Could not subscribe. Please try again.' }, 502, origin)
  }

  const resendKey = Deno.env.get('RESEND_API_KEY')
  const resendFrom = Deno.env.get('RESEND_FROM')?.trim()
  const cc = (Deno.env.get('RESEND_CC')?.trim() || DEFAULT_CC).split(',').map((s) => s.trim()).filter(Boolean)

  if (resendKey && resendFrom) {
    const html = `
      <p>Hi,</p>
      <p>Thanks for joining the Olive Green Martinborough mailing list. You’ll hear from us about harvest updates and seasonal releases.</p>
      <p>— Olive Green Martinborough</p>
    `
    const sent = await sendResendEmail({
      apiKey: resendKey,
      from: resendFrom,
      to: email,
      cc,
      subject: 'You’re on the Olive Green list',
      html,
    })
    if (!sent.ok) {
      console.error('Resend newsletter email failed', sent.status, sent.body)
    }
  }

  return json({ ok: true }, 200, origin)
})
