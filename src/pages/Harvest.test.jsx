import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Harvest from './Harvest'
import { postHarvestInterest } from '../api/harvestInterest'

vi.mock('../config/publicEdgeFunctions', () => ({
  harvestInterestWebhookUrl: () => 'https://pvtrqnvacjdquktdcqfh.supabase.co/functions/v1/harvest-interest',
}))

vi.mock('../config/resolveSupabaseAnonKey', () => ({
  resolveSupabaseAnonKey: () =>
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSJ9.signature',
  supabaseAnonKeyIssue: () => null,
}))

vi.mock('../api/harvestInterest', () => ({
  postHarvestInterest: vi.fn(),
}))

describe('Harvest registration form', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows validation error when email is empty', () => {
    render(<Harvest />)

    // HTML5 `required` on the email input blocks button submit in jsdom; submit the form directly
    // so React `handleSubmit` runs and our custom message appears (same as programmatic submit).
    const form = document.querySelector('#register form')
    expect(form).toBeTruthy()
    fireEvent.submit(form)

    expect(screen.getByText(/please add your email/i)).toBeInTheDocument()
    expect(postHarvestInterest).not.toHaveBeenCalled()
  })

  it('submits and shows confirmation when email was sent', async () => {
    postHarvestInterest.mockResolvedValue({ emailSent: true })
    const user = userEvent.setup()
    render(<Harvest />)

    await user.type(screen.getByLabelText(/^name$/i), 'Alex')
    await user.type(screen.getByLabelText(/email/i), 'alex@example.com')
    await user.clear(screen.getByLabelText(/number of people/i))
    await user.type(screen.getByLabelText(/number of people/i), '2')
    await user.click(screen.getByRole('button', { name: /register interest/i }))

    expect(postHarvestInterest).toHaveBeenCalledTimes(1)
    const [webhook, anonKey, payload] = postHarvestInterest.mock.calls[0]
    expect(webhook).toContain('harvest-interest')
    expect(anonKey).toMatch(/^eyJ/)
    expect(payload).toMatchObject({
      name: 'Alex',
      email: 'alex@example.com',
      guestCount: 2,
      source: 'harvest-2026-stage1',
    })
    expect(payload.createdAt).toBeDefined()

    expect(await screen.findByTestId('harvest-email-sent')).toBeInTheDocument()
    expect(screen.getByText(/we've sent a short confirmation/i)).toBeInTheDocument()
  })

  it('submits successfully but omits email line when API did not send email', async () => {
    postHarvestInterest.mockResolvedValue({ emailSent: false })
    const user = userEvent.setup()
    render(<Harvest />)

    await user.type(screen.getByLabelText(/email/i), 'pat@example.com')
    await user.click(screen.getByRole('button', { name: /register interest/i }))

    expect(await screen.findByText(/thanks — we've got your details/i)).toBeInTheDocument()
    expect(screen.queryByTestId('harvest-email-sent')).not.toBeInTheDocument()
  })

  it('shows error when postHarvestInterest throws', async () => {
    postHarvestInterest.mockRejectedValue(new Error('Request failed'))
    const user = userEvent.setup()
    render(<Harvest />)

    await user.type(screen.getByLabelText(/email/i), 'fail@example.com')
    await user.click(screen.getByRole('button', { name: /register interest/i }))

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument()
  })
})
