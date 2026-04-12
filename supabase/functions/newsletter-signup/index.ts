// Newsletter signup → inserts into `newsletter_subscribers` (see supabase/newsletter.sql).
//
// Deploy: supabase functions deploy newsletter-signup --no-verify-jwt
// Secrets: same as harvest-interest (SUPABASE_* auto; ALLOWED_ORIGIN for CORS).
//
// Vite: VITE_NEWSLETTER_WEBHOOK_URL=https://<ref>.supabase.co/functions/v1/newsletter-signup
// Optional: RESEND_API_KEY. RESEND_FROM defaults to olivegreenmartinborough@gmail.com in code if unset.

import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'
import {
  DEFAULT_RESEND_FROM,
  normalizeResendFromAddress,
} from '../_shared/normalizeResendFrom.ts'

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

  const resendKey = Deno.env.get('RESEND_API_KEY')?.trim()
  const resendFrom =
    normalizeResendFromAddress(Deno.env.get('RESEND_FROM') ?? '') || DEFAULT_RESEND_FROM
  /** Always CC the main inbox. */
  const cc = [DEFAULT_CC]

  if (!resendKey) {
    console.warn('newsletter-signup: Resend skipped — set RESEND_API_KEY', {
      hasApiKey: Boolean(resendKey),
    })
  } else {
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
    } else {
      console.info('newsletter-signup: Resend OK', { resendId: sent.resendId, to: email })
    }
  }

  return json({ ok: true }, 200, origin)
})
