/** Resend REST API — https://resend.com/docs/api-reference/emails/send-email */

const RESEND_URL = 'https://api.resend.com/emails'

export type SendEmailResult = { ok: true } | { ok: false; status: number; body: string }

export async function sendResendEmail(params: {
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

  if (!res.ok) {
    const body = await res.text()
    return { ok: false, status: res.status, body }
  }
  return { ok: true }
}
