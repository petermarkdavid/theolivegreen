/**
 * Public Supabase Edge Function URLs (override with VITE_* at build time).
 * Same project as supabase/ in this repo — safe to ship; not credentials.
 */
export const DEFAULT_HARVEST_INTEREST_WEBHOOK_URL =
  'https://pvtrqnvacjdquktdcqfh.supabase.co/functions/v1/harvest-interest'

export function harvestInterestWebhookUrl() {
  return (
    import.meta.env.VITE_HARVEST_INTEREST_WEBHOOK_URL?.trim() ||
    DEFAULT_HARVEST_INTEREST_WEBHOOK_URL
  )
}
