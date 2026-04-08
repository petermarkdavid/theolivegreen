/**
 * Optional: deploy on Vercel if you use serverless there.
 * Prefer Supabase Edge Functions instead (no Vercel): see supabase/functions/harvest-interest/index.ts
 *
 * Harvest interest form → Supabase (required) + optional Resend email.
 *
 * Env (Vercel → Project → Settings → Environment Variables):
 *
 * Required — save to database (create table: supabase/harvest_interest.sql):
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY   (server only; never put in the Vite app)
 *
 * Optional — also send you an email:
 *   RESEND_API_KEY
 *   HARVEST_NOTIFY_TO
 *   HARVEST_EMAIL_FROM
 *
 * CORS:
 *   ALLOWED_ORIGIN              — https://www.olivegreenmartinborough.com (or * for dev)
 *
 * Frontend build:
 *   VITE_HARVEST_INTEREST_WEBHOOK_URL=https://YOUR_PROJECT.vercel.app/api/harvest-interest
 */

import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

function hasSupabase() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
}

function hasResend() {
  return Boolean(
    process.env.RESEND_API_KEY && process.env.HARVEST_NOTIFY_TO && process.env.HARVEST_EMAIL_FROM,
  )
}

async function saveHarvestInterest({ name, email, guestCount, notes, source, createdAt }) {
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
  const { error } = await supabase.from('harvest_interest').insert({
    name: name || null,
    email,
    guest_count: guestCount,
    notes: notes || null,
    source: source || null,
    client_created_at: createdAt || null,
  })
  return error
}

async function sendNotifyEmail({ name, email, guestCount, notes, source, bodyCreatedAt }) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const lines = [
    'New Harvest 2026 interest registration',
    '',
    `Name: ${name || '—'}`,
    `Email: ${email}`,
    `People: ${guestCount}`,
    notes ? `Notes: ${notes}` : null,
    source ? `Source: ${source}` : null,
    '',
    `Submitted: ${bodyCreatedAt || new Date().toISOString()}`,
  ].filter(Boolean)
  const text = lines.join('\n')
  const html = `<pre style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.5">${lines
    .map((l) => l.replace(/&/g, '&amp;').replace(/</g, '&lt;'))
    .join('\n')}</pre>`

  return resend.emails.send({
    from: process.env.HARVEST_EMAIL_FROM,
    to: [process.env.HARVEST_NOTIFY_TO],
    replyTo: email,
    subject: `Harvest interest: ${name || email} (${guestCount} ${guestCount === 1 ? 'person' : 'people'})`,
    text,
    html,
  })
}

function corsHeaders() {
  const allow = process.env.ALLOWED_ORIGIN || '*'
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

function readJsonBody(req) {
  if (typeof req.body === 'string') {
    try {
      return Promise.resolve(req.body ? JSON.parse(req.body) : {})
    } catch {
      return Promise.reject(new Error('parse'))
    }
  }
  if (req.body != null && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    return Promise.resolve(req.body)
  }
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (c) => chunks.push(c))
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8')
        resolve(raw ? JSON.parse(raw) : {})
      } catch (e) {
        reject(e)
      }
    })
    req.on('error', reject)
  })
}

export default async function handler(req, res) {
  const origin = req.headers.origin || ''
  const headers = corsHeaders()

  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers)
    res.end()
    return
  }

  if (req.method !== 'POST') {
    res.writeHead(405, { ...headers, 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Method not allowed' }))
    return
  }

  const allowed = process.env.ALLOWED_ORIGIN
  if (allowed && allowed !== '*' && origin && origin !== allowed) {
    res.writeHead(403, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Forbidden' }))
    return
  }

  if (!hasSupabase() && !hasResend()) {
    res.writeHead(500, { ...headers, 'Content-Type': 'application/json' })
    res.end(
      JSON.stringify({
        error: 'Server misconfigured: set Supabase (or Resend) env vars on Vercel',
      }),
    )
    return
  }

  let body
  try {
    body = await readJsonBody(req)
  } catch {
    res.writeHead(400, { ...headers, 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Invalid JSON' }))
    return
  }

  const email = String(body.email || '')
    .trim()
    .toLowerCase()
  const name = String(body.name || '').trim()
  const guestCount = Number(body.guestCount)
  const notes = String(body.notes || '').trim()
  const source = String(body.source || '').trim()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.writeHead(400, { ...headers, 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Valid email required' }))
    return
  }
  if (!Number.isFinite(guestCount) || guestCount < 1) {
    res.writeHead(400, { ...headers, 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Invalid guest count' }))
    return
  }

  const row = {
    name,
    email,
    guestCount,
    notes,
    source,
    createdAt: body.createdAt || null,
  }

  try {
    if (hasSupabase()) {
      const dbError = await saveHarvestInterest(row)
      if (dbError) {
        console.error('Supabase insert failed:', dbError)
        res.writeHead(502, { ...headers, 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Could not save your registration. Please try again.' }))
        return
      }
    }

    if (hasResend()) {
      const { error: emailError } = await sendNotifyEmail({
        name: row.name,
        email: row.email,
        guestCount: row.guestCount,
        notes: row.notes,
        source: row.source,
        bodyCreatedAt: row.createdAt,
      })
      if (emailError) {
        console.error('Resend failed:', emailError)
        // Row already saved; still return success so the user is not blocked
      }
    }

    res.writeHead(200, { ...headers, 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ ok: true }))
  } catch (e) {
    console.error(e)
    res.writeHead(502, { ...headers, 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Something went wrong. Please try again.' }))
  }
}
