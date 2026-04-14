/**
 * Anon key for Supabase Edge Function gateway (browser-safe; public by design).
 *
 * Prefer VITE_SUPABASE_ANON_KEY from root `.env.production` at build time.
 * Optional: set PUBLIC_ANON_KEY_FALLBACK if you cannot use env (same JWT value).
 *
 * Dashboard → Settings → API → anon public: JWT (eyJ…) or sb_publishable_…
 * Do NOT use sb_secret_* or service_role keys in the frontend.
 *
 * Fallback matches project pvtrqnvacjdquktdcqfh (HarvestRegistrations) so GitHub Pages
 * builds work without Actions secrets; override with VITE_SUPABASE_ANON_KEY when needed.
 */
export const PUBLIC_ANON_KEY_FALLBACK =
  'sb_publishable_ER9krzubZzu9fHt3AEOoqA_4b-SrYso'

export function resolveSupabaseAnonKey() {
  const fromEnv = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()
  return fromEnv || PUBLIC_ANON_KEY_FALLBACK.trim()
}

/** 'missing' | 'wrong_type' | null when OK */
export function supabaseAnonKeyIssue(key) {
  if (!key?.trim()) return 'missing'
  if (key.startsWith('sb_secret_')) return 'wrong_type'
  if (key.startsWith('sb_publishable_')) return null
  if (key.startsWith('eyJ')) return null
  if (key.length > 80 && key.includes('.')) return null
  return 'wrong_type'
}
