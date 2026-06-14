import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Harvest from './Harvest'

const wrapper = ({ children }) => (
  <HelmetProvider>
    <MemoryRouter>{children}</MemoryRouter>
  </HelmetProvider>
)

describe('Harvest page — 2026 registrations closed', () => {
  it('shows that 2026 registrations are closed', () => {
    render(<Harvest />, { wrapper })
    expect(screen.getByText(/registrations closed/i)).toBeInTheDocument()
    expect(screen.getByText(/that's a wrap on 2026/i)).toBeInTheDocument()
  })

  it('no longer renders the registration form', () => {
    render(<Harvest />, { wrapper })
    expect(document.querySelector('#register form')).toBeNull()
    expect(screen.queryByRole('button', { name: /register interest/i })).not.toBeInTheDocument()
  })

  it('links to the 2026 thank-you page', () => {
    render(<Harvest />, { wrapper })
    const link = screen.getByRole('link', { name: /see the 2026 thank-you/i })
    expect(link).toHaveAttribute('href', '/harvest-thank-you')
  })

  it('shows a 2027 placeholder for King’s Birthday weekend', () => {
    render(<Harvest />, { wrapper })
    expect(screen.getByRole('heading', { name: /harvest 2027/i })).toBeInTheDocument()
    expect(screen.getByText(/king's birthday weekend, june 2027/i)).toBeInTheDocument()
  })
})
