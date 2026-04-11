// Harvest interest form → inserts into `harvest_interest` (same table as supabase/harvest_interest.sql).
//
// Deploy (one-time setup):
//   1. Install Supabase CLI: https://supabase.com/docs/guides/cli
//   2. supabase login
//   3. supabase link --project-ref YOUR_PROJECT_REF   (from Project Settings → General)
//   4. supabase secrets set ALLOWED_ORIGIN=https://www.olivegreenmartinborough.com --project-ref pvtrqnvacjdquktdcqfh
//      Or Dashboard → Edge Functions → Secrets. (Use ALLOWED_ORIGIN=* only for local testing.)
//   5. Resend: RESEND_API_KEY=re_...  RESEND_FROM must be exactly (no extra quotes in Dashboard):
//        onboarding@resend.dev   OR   Olive Green <onboarding@resend.dev>
//      CLI: supabase secrets set 'RESEND_FROM=Olive Green <onboarding@resend.dev>' --project-ref ...
//      (Use your verified domain address once DNS is verified in Resend.)
//   6. supabase functions deploy harvest-interest --no-verify-jwt
//
// Webhook URL for Vite (VITE_HARVEST_INTEREST_WEBHOOK_URL):
//   https://pvtrqnvacjdquktdcqfh.supabase.co/functions/v1/harvest-interest
//
// --no-verify-jwt = browser can POST without a Supabase login (public form).

import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { normalizeResendFromAddress } from '../_shared/normalizeResendFrom.ts'

const DEFAULT_CC = 'olivegreenmartinborough@gmail.com'
const RESEND_URL = 'https://api.resend.com/emails'

/** Personal sign-off in the confirmation email (copy only; set RESEND_FROM display name in secrets if you want the same on the envelope). */
const HOSTS_LINE = 'Matt & Peter'

/**
 * Public harvest day (matches site). Timed block 10:00–18:00 Pacific/Auckland, Sun 31 May 2026.
 * ICS uses UTC (NZST = UTC+12 on this date). Adjust icsDt* if NZ offset rules change.
 */
const HARVEST_EVENT = {
  title: 'Olive Green — 2026 olive harvest',
  summaryLine: "Sunday 31 May 2026, 10:00–18:00 (NZ time) — King's Birthday weekend",
  /** Google Calendar template: local wall times + timezone id */
  googleDates: '20260531T100000/20260531T180000',
  googleCtz: 'Pacific/Auckland',
  /** UTC instant for ICS (10:00 NZST → Z, 18:00 NZST → Z). */
  icsDtStartUtc: '20260530T220000Z',
  icsDtEndUtc: '20260531T060000Z',
  location: '7 Hawkins Drive, Martinborough, New Zealand',
  url: 'https://www.olivegreenmartinborough.com/harvest',
} as const

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
  attachments?: { filename: string; content: string }[]
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
      ...(params.attachments?.length ? { attachments: params.attachments } : {}),
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
  const resendFrom = normalizeResendFromAddress(Deno.env.get('RESEND_FROM') ?? '')
  /** Always CC the main inbox (not overridable — avoids wrong RESEND_CC in secrets). */
  const cc = [DEFAULT_CC]

  let emailSent = false

  if (!resendKey || !resendFrom) {
    console.warn(
      'harvest-interest: Resend skipped — set Edge Function secrets RESEND_API_KEY and RESEND_FROM (check names, no extra quotes).',
      { hasApiKey: Boolean(resendKey), hasFrom: Boolean(resendFrom) },
    )
  } else {
    const displayName = name || 'there'
    const googleCalUrl = buildGoogleCalendarUrl(guestCount)
    const ics = buildHarvestIcs({ email, guestCount, notes })
    const icsBase64 = base64FromUtf8(ics)
    const calHref = escapeHtmlAttr(googleCalUrl)

    const html = buildHarvestConfirmationEmailHtml({
      displayName,
      guestCount,
      notes,
      calHref,
    })
    const sent = await sendResendEmail({
      apiKey: resendKey,
      from: resendFrom,
      to: email,
      cc,
      replyTo: DEFAULT_CC,
      subject: `Thanks from ${HOSTS_LINE} — your harvest interest`,
      html,
      attachments: [{ filename: 'olive-green-harvest-2026.ics', content: icsBase64 }],
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

function escapeHtmlAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

/** Inline-first HTML email; table shell for Outlook; optional head styles for capable clients. */
function buildHarvestConfirmationEmailHtml(opts: {
  displayName: string
  guestCount: number
  notes: string
  calHref: string
}): string {
  const { displayName, guestCount, notes, calHref } = opts
  const notesRow = notes
    ? `<tr><td style="padding:0 0 10px 0;font-family:Georgia,'Times New Roman',serif;font-size:15px;line-height:1.55;color:#2c2c2c;"><strong style="color:#3d4a2e;">Notes</strong> — ${escapeHtml(notes)}</td></tr>`
    : ''

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>A note from ${HOSTS_LINE} — Olive Green</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
  <style type="text/css">
    @media only screen and (max-width: 620px) {
      .email-container { width: 100% !important; }
      .email-pad { padding-left: 20px !important; padding-right: 20px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f0ebe3;-webkit-text-size-adjust:100%;">
  <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0;">
    Matt and Peter from Olive Green — thanks for your harvest interest.
  </div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f0ebe3;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" class="email-container" width="560" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 24px rgba(44,44,44,0.08);">
          <tr>
            <td style="height:4px;background-color:#c9a961;line-height:4px;font-size:0;">&nbsp;</td>
          </tr>
          <tr>
            <td class="email-pad" style="padding:28px 36px 8px 36px;background-color:#3d4a2e;">
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#d4c4a8;">Olive Green Martinborough</p>
              <p style="margin:6px 0 0 0;font-family:Georgia,'Times New Roman',serif;font-size:15px;font-style:italic;color:#e8e4dc;">${HOSTS_LINE}</p>
              <p style="margin:10px 0 0 0;font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:1.25;font-weight:600;color:#faf8f3;">Thanks — we’ve got your details</p>
            </td>
          </tr>
          <tr>
            <td class="email-pad" style="padding:28px 36px 8px 36px;">
              <p style="margin:0 0 24px 0;font-family:Georgia,'Times New Roman',serif;font-size:17px;line-height:1.5;color:#2c2c2c;">Hi ${escapeHtml(displayName)},</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 24px 0;background-color:#faf8f3;border-radius:6px;border:1px solid #e8e4dc;">
                <tr>
                  <td style="padding:18px 20px;">
                    <p style="margin:0 0 12px 0;font-family:Georgia,'Times New Roman',serif;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#6b7d3f;">Your registration</p>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr><td style="padding:0 0 10px 0;font-family:Georgia,'Times New Roman',serif;font-size:15px;line-height:1.55;color:#2c2c2c;"><strong style="color:#3d4a2e;">People</strong> — ${guestCount}</td></tr>
                      ${notesRow}
                    </table>
                  </td>
                </tr>
              </table>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 20px 0;background-color:#f6f3ec;border-left:3px solid #6b7d3f;border-radius:0 6px 6px 0;">
                <tr>
                  <td style="padding:16px 18px;">
                    <p style="margin:0 0 6px 0;font-family:Georgia,'Times New Roman',serif;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#6b7d3f;">Save the date</p>
                    <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:15px;line-height:1.55;color:#2c2c2c;">${escapeHtml(HARVEST_EVENT.summaryLine)}. Full timing and RSVP will be confirmed closer to the day.</p>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 14px 0;font-family:Georgia,'Times New Roman',serif;font-size:14px;line-height:1.55;color:#5c5c5c;">Add the day to your calendar:</p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 20px 0;">
                <tr>
                  <td style="border-radius:6px;background-color:#5a6b3a;">
                    <a href="${calHref}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:14px 26px;font-family:Georgia,'Times New Roman',serif;font-size:15px;font-weight:600;color:#ffffff !important;text-decoration:none;border-radius:6px;">Add to Google Calendar</a>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 24px 0;font-family:Georgia,'Times New Roman',serif;font-size:14px;line-height:1.6;color:#5c5c5c;">You can also open the attached <strong style="color:#3d4a2e;">olive-green-harvest-2026.ics</strong> in Apple Calendar or Outlook.</p>
              <p style="margin:0 0 20px 0;font-family:Georgia,'Times New Roman',serif;font-size:15px;line-height:1.6;color:#3d3d3d;">We’ll be in touch closer to the date with timings and how to RSVP. If anything’s unclear before then, just <strong style="color:#3d4a2e;">reply to this email</strong> — we read every message. You can also reach us at <a href="mailto:olivegreenmartinborough@gmail.com" style="color:#5a6b3a;font-weight:600;">olivegreenmartinborough@gmail.com</a>.</p>
              <p style="margin:0 0 4px 0;font-family:Georgia,'Times New Roman',serif;font-size:15px;line-height:1.5;color:#2c2c2c;">Warmly,</p>
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:17px;line-height:1.4;font-weight:600;color:#3d4a2e;">${HOSTS_LINE}</p>
              <p style="margin:6px 0 0 0;font-family:Georgia,'Times New Roman',serif;font-size:13px;line-height:1.4;color:#6a6a6a;">Olive Green Martinborough</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 36px 28px 36px;">
              <p style="margin:0;padding-top:20px;border-top:1px solid #e8e4dc;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:#8a8a8a;text-align:center;">
                <a href="${escapeHtmlAttr(HARVEST_EVENT.url)}" style="color:#6b7d3f;text-decoration:none;">olivegreenmartinborough.com</a>
                · Martinborough, New Zealand
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

/** ICS TEXT / LOCATION escaping */
function escapeIcsText(s: string): string {
  return s
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
}

function formatIcsUtcStamp(d: Date): string {
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')
}

function buildGoogleCalendarUrl(guestCount: number): string {
  const details = [
    'Olive Green Martinborough — 2026 olive harvest.',
    `Interest registered for ${guestCount} people.`,
    'RSVP and schedule details will be emailed closer to the date.',
    '',
    HARVEST_EVENT.url,
  ].join('\n')
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: HARVEST_EVENT.title,
    dates: HARVEST_EVENT.googleDates,
    ctz: HARVEST_EVENT.googleCtz,
    details,
    location: HARVEST_EVENT.location,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

function buildHarvestIcs(opts: { email: string; guestCount: number; notes: string }): string {
  const dtStamp = formatIcsUtcStamp(new Date())
  const uid = `harvest-2026-${simpleHash(opts.email)}@olivegreenmartinborough.com`
  const desc = escapeIcsText(
    [
      "Olive Green Martinborough — 2026 olive harvest (King's Birthday weekend).",
      'Sunday 31 May 2026, 10:00–18:00 New Zealand time (Pacific/Auckland).',
      `Registered party size: ${opts.guestCount}.`,
      opts.notes ? `Notes: ${opts.notes}` : '',
      'RSVP and final times will be confirmed by email.',
      '',
      HARVEST_EVENT.url,
      `— ${HOSTS_LINE}, Olive Green Martinborough.`,
    ]
      .filter(Boolean)
      .join('\n'),
  )
  const loc = escapeIcsText(HARVEST_EVENT.location)
  const summary = escapeIcsText(HARVEST_EVENT.title)
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Olive Green Martinborough//Harvest//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${HARVEST_EVENT.icsDtStartUtc}`,
    `DTEND:${HARVEST_EVENT.icsDtEndUtc}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${desc}`,
    `LOCATION:${loc}`,
    `URL:${HARVEST_EVENT.url}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return lines.join('\r\n') + '\r\n'
}

function base64FromUtf8(text: string): string {
  const bytes = new TextEncoder().encode(text)
  let binary = ''
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i])
  return btoa(binary)
}

/** Short stable-ish id for UID (not cryptographic). */
function simpleHash(s: string): string {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  return Math.abs(h).toString(36)
}
