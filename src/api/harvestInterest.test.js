import { describe, it, expect, vi } from 'vitest'
import { postHarvestInterest } from './harvestInterest'

describe('postHarvestInterest', () => {
  it('sends POST with JSON body, Authorization, and apikey', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true, emailSent: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    )
    const payload = {
      name: 'Alex',
      email: 'alex@example.com',
      guestCount: 2,
      source: 'harvest-2026-stage1',
      createdAt: '2026-04-11T12:00:00.000Z',
    }
    const result = await postHarvestInterest(
      'https://proj.supabase.co/functions/v1/harvest-interest',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test',
      payload,
      fetchImpl,
    )

    expect(fetchImpl).toHaveBeenCalledTimes(1)
    const [url, init] = fetchImpl.mock.calls[0]
    expect(url).toBe('https://proj.supabase.co/functions/v1/harvest-interest')
    expect(init.method).toBe('POST')
    expect(init.headers.Authorization).toBe('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test')
    expect(init.headers.apikey).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test')
    expect(init.headers['Content-Type']).toBe('application/json')
    expect(JSON.parse(init.body)).toEqual(payload)
    expect(result.emailSent).toBe(true)
  })

  it('returns emailSent false when API omits emailSent', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } }),
    )
    const result = await postHarvestInterest('https://x.test/fn', 'eyJx', {}, fetchImpl)
    expect(result.emailSent).toBe(false)
  })

  it('returns emailSent false when emailSent is false', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true, emailSent: false }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    )
    const result = await postHarvestInterest('https://x.test/fn', 'eyJx', {}, fetchImpl)
    expect(result.emailSent).toBe(false)
  })

  it('throws when response is not ok', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response('', { status: 401 }))
    await expect(postHarvestInterest('https://x.test/fn', 'eyJx', {}, fetchImpl)).rejects.toThrow('Request failed')
  })
})
