/**
 * Ask the Supabase Edge Function to create a Stripe Checkout Session.
 * Returns the hosted Checkout URL to redirect the browser to.
 *
 * @param {string} endpoint  create-checkout-session function URL
 * @param {string} anonKey   Supabase anon/publishable key (browser-safe)
 * @param {{ quantity: number }} payload
 * @param {typeof fetch} [fetchImpl]
 * @returns {Promise<{ url: string }>}
 */
export async function createCheckoutSession(endpoint, anonKey, payload, fetchImpl = globalThis.fetch) {
  const res = await fetchImpl(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${anonKey}`,
      apikey: anonKey,
    },
    body: JSON.stringify(payload),
  })

  let data = {}
  try {
    data = await res.json()
  } catch {
    /* non-JSON body */
  }

  if (!res.ok || !data.url) {
    const err = new Error(data.error || 'Could not start checkout')
    err.status = res.status
    throw err
  }
  return { url: data.url }
}
