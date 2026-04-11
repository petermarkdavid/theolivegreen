/**
 * Resend API: `from` must be `email@example.com` or `Name <email@example.com>`.
 * Dashboard/CLI secrets often accidentally include wrapping quotes or newlines.
 */
export function normalizeResendFromAddress(raw: string): string {
  let s = raw.trim().replace(/\r?\n/g, '')
  if (s.length >= 2) {
    const open = s[0]
    const close = s[s.length - 1]
    if ((open === '"' && close === '"') || (open === "'" && close === "'")) {
      s = s.slice(1, -1).trim()
    }
  }
  return s.replace(/\s+/g, ' ').trim()
}
