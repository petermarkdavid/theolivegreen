import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const handleNewsletter = async (e) => {
    e.preventDefault()
    setError('')
    const trimmed = email.trim()
    if (!trimmed) {
      setError('Please enter your email.')
      return
    }
    const webhook = import.meta.env.VITE_NEWSLETTER_WEBHOOK_URL
    if (!webhook) {
      setError('Newsletter is not configured yet.')
      return
    }

    const payload = {
      email: trimmed,
      source: 'footer',
      createdAt: new Date().toISOString(),
    }

    setStatus('loading')
    try {
      const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
      const res = await fetch(webhook, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(anonKey ? { Authorization: `Bearer ${anonKey}`, apikey: anonKey } : {}),
        },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('idle')
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <footer className="w-full border-t border-stone-200/40 bg-stone-100">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-8 py-16 font-body text-sm md:grid-cols-3">
        <div className="space-y-6">
          <div className="font-headline text-xl text-brand-primary">Olive Green Martinborough</div>
          <p className="max-w-xs leading-relaxed text-stone-500">
            Premium extra virgin olive oil from the heart of Martinborough.
          </p>
        </div>

        <div className="space-y-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-primary">Quick links</h4>
          <ul className="space-y-4">
            <li>
              <Link to="/" className="text-stone-500 transition-colors hover:text-brand-secondary">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className="text-stone-500 transition-colors hover:text-brand-secondary">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/harvest" className="text-stone-500 transition-colors hover:text-brand-secondary">
                Harvest
              </Link>
            </li>
            <li>
              <a
                href="mailto:olivegreenmartinborough@gmail.com"
                className="text-stone-500 transition-colors hover:text-brand-secondary"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-primary">Newsletter</h4>
          <p className="text-stone-500">Receive harvest updates and seasonal releases.</p>
          <form onSubmit={handleNewsletter} className="flex flex-col gap-2">
            <div className="flex gap-2">
              <input
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                disabled={status === 'loading' || status === 'success'}
                placeholder="Your email"
                className="min-w-0 flex-grow border-b border-stone-300 bg-transparent py-2 text-on-surface placeholder:text-stone-400 focus:border-primary focus:outline-none disabled:opacity-60"
                aria-label="Newsletter email"
              />
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="shrink-0 font-bold text-primary hover:opacity-70 disabled:opacity-50"
              >
                {status === 'loading' ? '…' : status === 'success' ? 'Joined' : 'Join'}
              </button>
            </div>
            {error ? <p className="text-xs text-red-600">{error}</p> : null}
            {status === 'success' ? (
              <p className="text-xs text-stone-600">Thanks — you&apos;re on the list.</p>
            ) : null}
          </form>
          <p className="mt-8 text-[10px] text-stone-400">
            © {new Date().getFullYear()} Olive Green Martinborough. Crafted for the harvest.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
