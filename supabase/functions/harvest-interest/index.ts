// Harvest interest form → inserts into `harvest_interest` (same table as supabase/harvest_interest.sql).
//
// Deploy (one-time setup):
//   1. Install Supabase CLI: https://supabase.com/docs/guides/cli
//   2. supabase login
//   3. supabase link --project-ref YOUR_PROJECT_REF   (from Project Settings → General)
//   4. supabase secrets set ALLOWED_ORIGIN=https://www.olivegreenmartinborough.com --project-ref pvtrqnvacjdquktdcqfh
//      Or Dashboard → Edge Functions → Secrets. (Use ALLOWED_ORIGIN=* only for local testing.)
//   5. supabase functions deploy harvest-interest
//
// Webhook URL for Vite (VITE_HARVEST_INTEREST_WEBHOOK_URL):
//   https://pvtrqnvacjdquktdcqfh.supabase.co/functions/v1/harvest-interest
//
// --no-verify-jwt = browser can POST without a Supabase login (public form).

import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'

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

  return json({ ok: true }, 200, origin)
})
