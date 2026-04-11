/**
 * POST harvest interest to the Supabase Edge Function.
 * Caller should validate the anon key (see resolveSupabaseAnonKey) before calling.
 *
 * @param {string} webhook
 * @param {string} anonKey
 * @param {Record<string, unknown>} payload
 * @param {typeof fetch} [fetchImpl]
 * @returns {Promise<{ emailSent: boolean }>}
 */
export async function postHarvestInterest(webhook, anonKey, payload, fetchImpl = globalThis.fetch) {
  const res = await fetchImpl(webhook, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${anonKey}`,
      apikey: anonKey,
    },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const err = new Error('Request failed')
    err.status = res.status
    throw err
  }
  let data = {}
  try {
    data = await res.json()
  } catch {
    /* non-JSON body */
  }
  return { emailSent: data.emailSent === true }
}
