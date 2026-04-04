import React, { useState } from 'react'
import Button from '../components/Button'

/** Replace with your venue details — shown only after successful interest registration. */
const VENUE_AFTER_SUBMIT = {
  name: 'The Olive Green',
  addressLine: 'Martinborough, Wairarapa, New Zealand',
  directions:
    'From Martinborough village, follow local signage toward the grove. If you use a maps app, search for “The Olive Green Martinborough” or the address we email you. Parking is on site; please drive slowly on the gravel approach.',
}

const TIMELINE = [
  { time: '10:00', title: 'Start (flexible)', detail: 'Arrive when suits you — we’ll be in the grove.' },
  { time: '11:30', title: 'Morning tea', detail: 'A pause mid-morning.' },
  { time: '15:30', title: 'Harvest meal', detail: 'A long, late lunch together.' },
]

const EXPECT = [
  'Hands-on picking — we’ll guide you',
  'Relaxed pace',
  'Outdoor winter setting',
  'Long, late lunch',
]

const overviewCopy = `Harvest day is a seasonal moment we share with friends of the grove. It is not a spectacle — it is shared effort, good food, and time together among the trees. We work at an unhurried rhythm, pause for morning tea, and finish with a long meal. Whether you know every row or it is your first visit, you are welcome. Come as you are, dress for the weather, and leave room for conversation.`

const Harvest = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [guestCount, setGuestCount] = useState('1')
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const count = parseInt(String(guestCount), 10)
    if (!email.trim()) {
      setError('Please add your email so we can reach you.')
      return
    }
    if (!Number.isFinite(count) || count < 1) {
      setError('Please enter the number of people (at least 1).')
      return
    }

    const payload = {
      name: name.trim(),
      email: email.trim(),
      guestCount: count,
      notes: notes.trim() || undefined,
      source: 'harvest-2026-stage1',
      createdAt: new Date().toISOString(),
    }

    const webhook = import.meta.env.VITE_HARVEST_INTEREST_WEBHOOK_URL
    setStatus('loading')
    try {
      if (webhook) {
        const res = await fetch(webhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error('Request failed')
      }
      setStatus('success')
    } catch {
      setStatus('idle')
      setError('Something went wrong. Please try again or email us directly.')
    }
  }

  return (
    <div className="min-h-screen bg-warm-off-white">
      {/* Hero — Olive Harvest Day */}
      <section className="relative w-full min-h-[min(70vh,640px)] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/hero-olive-branch.jpg)',
            filter: 'blur(1px)',
          }}
        >
          <div className="absolute inset-0 bg-olive-green/45" />
          <div className="absolute inset-0 bg-black/25" />
        </div>
        <div className="relative z-10 w-full max-w-3xl mx-auto px-xl py-4xl text-center md:text-left">
          <p className="text-white/90 font-sans text-xs uppercase tracking-[0.2em] mb-md text-muted-gold">
            The Olive Green Harvest Day
          </p>
          <h1 className="font-serif text-white text-4xl md:text-5xl lg:text-6xl font-normal leading-tight tracking-tight mb-lg">
            Olive Harvest Day
          </h1>
          <p className="text-white/95 font-sans text-lg md:text-xl mb-md">Sunday 31 May · Martinborough</p>
          <p className="text-white/90 font-sans text-base md:text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
            Join us for a day of harvesting, food, and time together in the grove.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-xl py-4xl space-y-4xl">
        {/* Overview */}
        <section className="space-y-md">
          <h2 className="font-serif text-soft-charcoal text-3xl md:text-4xl font-normal tracking-tight">
            The harvest gathering
          </h2>
          <p className="text-soft-charcoal/90 font-sans text-base md:text-lg leading-relaxed">{overviewCopy}</p>
        </section>

        {/* The day — timeline */}
        <section className="space-y-xl">
          <h2 className="font-serif text-soft-charcoal text-3xl md:text-4xl font-normal tracking-tight">The day</h2>
          <ul className="border-l border-muted-gold/50 pl-xl space-y-2xl ml-1">
            {TIMELINE.map((item) => (
              <li key={item.time} className="relative">
                <span className="absolute -left-[calc(1rem+5px)] top-1.5 w-2.5 h-2.5 rounded-full bg-muted-gold/80 ring-4 ring-warm-off-white" />
                <p className="text-muted-gold font-sans text-sm uppercase tracking-wider mb-xs">{item.time}</p>
                <p className="text-soft-charcoal font-sans text-lg font-semibold">{item.title}</p>
                <p className="text-soft-charcoal/80 font-sans text-base leading-relaxed mt-sm">{item.detail}</p>
              </li>
            ))}
          </ul>
          <p className="text-soft-charcoal/75 font-sans text-sm italic leading-relaxed pl-1">
            Come for part of the day or stay through — it’s flexible.
          </p>
        </section>

        {/* What to expect */}
        <section className="space-y-lg">
          <h2 className="font-serif text-soft-charcoal text-3xl md:text-4xl font-normal tracking-tight">What to expect</h2>
          <ul className="space-y-md font-sans text-soft-charcoal/90 text-base leading-relaxed list-disc pl-xl marker:text-muted-gold">
            {EXPECT.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        {/* Accommodation callout */}
        <aside className="rounded-sm bg-white border border-soft-charcoal/10 p-xl md:p-2xl shadow-sm">
          <h3 className="font-serif text-soft-charcoal text-xl md:text-2xl mb-md">King’s Birthday Weekend</h3>
          <p className="text-soft-charcoal/85 font-sans text-base leading-relaxed">
            Accommodation in Martinborough books out early and often has 2–3 night minimum stays. If you’re planning to
            stay, it’s worth booking soon.
          </p>
        </aside>

        {/* Stage 1 — Register interest */}
        <section id="register" className="scroll-mt-8 space-y-xl pb-2xl">
          <h2 className="font-serif text-soft-charcoal text-3xl md:text-4xl font-normal tracking-tight">
            Register interest
          </h2>
          <p className="text-soft-charcoal/80 font-sans text-base leading-relaxed">
            A quick note of who you are and how many might come. We’ll email you closer to the date to confirm harvest,
            meal, and final numbers.
          </p>

          {status === 'success' ? (
            <div className="rounded-sm bg-white border border-soft-charcoal/10 p-xl md:p-2xl space-y-lg">
              <p className="text-soft-charcoal font-sans text-lg leading-relaxed">
                Thanks — we’ve got your details. We’ll be in touch closer to the date to confirm final numbers and
                whether you’ll be joining for harvest, the meal, or both.
              </p>
              <div className="pt-lg border-t border-soft-charcoal/10">
                <h3 className="font-serif text-soft-charcoal text-xl mb-md">Where we’ll meet</h3>
                <p className="text-soft-charcoal font-sans font-semibold">{VENUE_AFTER_SUBMIT.name}</p>
                <p className="text-soft-charcoal/85 font-sans mt-sm">{VENUE_AFTER_SUBMIT.addressLine}</p>
                <p className="text-soft-charcoal/80 font-sans text-sm leading-relaxed mt-md">{VENUE_AFTER_SUBMIT.directions}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-sm bg-white border border-soft-charcoal/10 p-xl md:p-2xl space-y-lg">
              <div className="space-y-sm">
                <label htmlFor="harvest-name" className="block font-sans text-sm text-soft-charcoal font-medium">
                  Name
                </label>
                <input
                  id="harvest-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-md py-sm border border-soft-charcoal/20 rounded-sm bg-warm-off-white font-sans text-soft-charcoal focus:outline-none focus:ring-2 focus:ring-olive-green/40 focus:border-olive-green"
                />
              </div>
              <div className="space-y-sm">
                <label htmlFor="harvest-email" className="block font-sans text-sm text-soft-charcoal font-medium">
                  Email <span className="text-muted-gold">(required)</span>
                </label>
                <input
                  id="harvest-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-md py-sm border border-soft-charcoal/20 rounded-sm bg-warm-off-white font-sans text-soft-charcoal focus:outline-none focus:ring-2 focus:ring-olive-green/40 focus:border-olive-green"
                />
              </div>
              <div className="space-y-sm">
                <label htmlFor="harvest-guests" className="block font-sans text-sm text-soft-charcoal font-medium">
                  Number of people
                </label>
                <input
                  id="harvest-guests"
                  type="number"
                  min={1}
                  step={1}
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="w-full max-w-[8rem] px-md py-sm border border-soft-charcoal/20 rounded-sm bg-warm-off-white font-sans text-soft-charcoal focus:outline-none focus:ring-2 focus:ring-olive-green/40 focus:border-olive-green"
                />
              </div>
              <div className="space-y-sm">
                <label htmlFor="harvest-notes" className="block font-sans text-sm text-soft-charcoal font-medium">
                  Notes <span className="text-soft-charcoal/60 font-normal">(optional)</span>
                </label>
                <textarea
                  id="harvest-notes"
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-md py-sm border border-soft-charcoal/20 rounded-sm bg-warm-off-white font-sans text-soft-charcoal focus:outline-none focus:ring-2 focus:ring-olive-green/40 focus:border-olive-green resize-y min-h-[100px]"
                />
              </div>
              {error ? <p className="text-deep-olive font-sans text-sm">{error}</p> : null}
              <Button type="submit" variant="primary" className="min-w-0 w-full sm:w-auto" disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending…' : 'Register interest'}
              </Button>
              {import.meta.env.DEV && !import.meta.env.VITE_HARVEST_INTEREST_WEBHOOK_URL ? (
                <p className="text-soft-charcoal/55 font-sans text-xs leading-relaxed">
                  Dev: set <code className="text-soft-charcoal/70">VITE_HARVEST_INTEREST_WEBHOOK_URL</code> to POST JSON
                  (e.g. Zapier) to persist registrations.
                </p>
              ) : null}
            </form>
          )}
        </section>
      </div>
    </div>
  )
}

export default Harvest
