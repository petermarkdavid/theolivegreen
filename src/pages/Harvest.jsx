import React, { useState } from 'react'
import { postHarvestInterest } from '../api/harvestInterest'
import { harvestInterestWebhookUrl } from '../config/publicEdgeFunctions'
import { resolveSupabaseAnonKey, supabaseAnonKeyIssue } from '../config/resolveSupabaseAnonKey'

const VENUE_AFTER_SUBMIT = {
  name: 'Olive Green Martinborough',
  addressLine: '7 Hawkins Drive, Martinborough',
  directions: 'Wairarapa, New Zealand. Parking is on site; please drive slowly on the gravel approach.',
}

const TIMELINE = [
  {
    time: '10:00',
    title: 'Start (flexible)',
    detail:
      'On arrival, grab a hand rake and aim for 80% of the olives off the tree and into the nets.',
  },
  {
    time: '11:30',
    title: 'Morning tea',
    detail: 'Cheese scones and a rest break. Served near the pizza oven.',
  },
  {
    time: '15:30',
    title: 'Harvest meal',
    detail:
      "A long, late lunch and drinks into the evening. Don't forget to take a bottle of 2025 oil with you when you leave.",
  },
]

const EXPECT_ITEMS = [
  {
    icon: 'eco',
    title: 'Hands-on picking',
  },
  {
    icon: 'local_cafe',
    title: 'Morning tea',
  },
  {
    icon: 'schedule',
    title: 'Relaxed pace',
  },
  {
    icon: 'ac_unit',
    title: 'Outdoor winter setting',
  },
  {
    icon: 'restaurant',
    title: 'Long, late lunch',
  },
  {
    icon: 'shopping_bag',
    title: 'A bottle of 2025 oil to take home',
  },
]

const GALLERY_BENTO = [
  { src: '/images/grove1.jpg', alt: 'Olive grove', className: 'md:col-span-2' },
  { src: '/images/petergrove.jpg', alt: 'In the grove', className: 'md:col-span-1' },
  { src: '/images/mattfrank.jpg', alt: 'People in the grove', className: 'md:col-span-1' },
  {
    src: '/images/dougtrish.jpg',
    alt: 'Gathering at the grove',
    className: 'md:col-span-2 md:col-start-2',
  },
]

const Harvest = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [guestCount, setGuestCount] = useState('1')
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [emailSentNotice, setEmailSentNotice] = useState(false)

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

    const webhook = harvestInterestWebhookUrl()
    const anonKey = resolveSupabaseAnonKey()
    const keyIssue = supabaseAnonKeyIssue(anonKey)
    if (keyIssue === 'missing') {
      setError('This form is not fully configured yet—please email us directly.')
      return
    }
    if (keyIssue === 'wrong_type') {
      setError(
        'Site config: use the anon public key from Supabase (Settings → API, JWT starting with eyJ)—not a secret key.',
      )
      return
    }

    setStatus('loading')
    setEmailSentNotice(false)
    try {
      const { emailSent } = await postHarvestInterest(webhook, anonKey, payload)
      setEmailSentNotice(emailSent)
      setStatus('success')
    } catch {
      setStatus('idle')
      setError('Something went wrong. Please try again or email us directly.')
    }
  }

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface selection:bg-primary-fixed-dim/40">
      {/* Hero */}
      <section className="relative flex min-h-[min(240px,40vh)] items-center justify-center overflow-hidden px-6 py-8 md:py-10">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-olive-branch.jpg"
            alt="Olive grove"
            className="h-full w-full object-cover brightness-[0.75]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-surface/40" />
        </div>
        <div className="relative z-10 max-w-4xl space-y-6 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white">Martinborough, New Zealand</p>
          <h1 className="font-headline text-3xl leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            2026 Olive Harvest — King&apos;s Birthday Weekend
          </h1>
          <p className="font-headline text-2xl font-semibold italic tracking-wide text-white/90 sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-snug">
            Sunday 31 May · Martinborough
          </p>
          <div className="pt-8">
            <a
              href="#register"
              className="inline-block rounded-md bg-gradient-to-b from-primary to-primary-container px-10 py-4 font-medium text-on-primary shadow-ambient-sm transition-all hover:brightness-105"
            >
              Join the harvest
            </a>
          </div>
        </div>
      </section>

      {/* The harvest gathering */}
      <section className="bg-surface px-8 py-12 md:py-16">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Invitation to Harvest Day 2026
            </p>
            <span className="font-headline text-xl italic text-brand-secondary">Olive harvest experience</span>
          </div>
          <div className="space-y-4">
            <h2 className="font-headline text-3xl leading-snug text-on-surface md:text-4xl">
              Our olive grove has been tended and harvested for over 20 years by Doug and Trish, their family, friends and
              neighbours.
            </h2>
            <p className="font-headline text-3xl leading-snug text-on-surface md:text-4xl">
              We&apos;re excited to continue the tradition and would love for you to join our first olive harvest.
            </p>
          </div>
          <p className="font-headline text-3xl font-semibold italic text-brand-secondary md:text-4xl">Matt and Peter</p>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-on-surface-variant">
            It&apos;s a relaxed day—pick as many or as few olives as you like, or just join us for the late lunch, laughs
            and drinks into the evening.
          </p>
        </div>
      </section>

      {/* The day + image */}
      <section className="bg-surface-container-low px-8 py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:gap-10 lg:gap-12">
          <div className="min-w-0 space-y-8">
            <h2 className="font-headline text-4xl text-on-surface">The day</h2>
            <div className="ml-2 space-y-8 border-l border-outline-variant/40 pl-8">
              {TIMELINE.map((item) => (
                <div key={item.time} className="relative">
                  <div className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-4 border-surface-container-low bg-secondary" />
                  <h3 className="font-headline text-xl text-primary">
                    {item.time} — {item.title}
                  </h3>
                  <p className="mt-2 text-on-surface-variant">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex w-full justify-center overflow-hidden rounded-md shadow-sm md:w-auto md:shrink-0 md:self-center">
            <img
              src="/images/2025menu.jpg"
              alt="Harvest table and meal"
              className="mx-auto h-auto max-h-52 w-auto max-w-[9.5rem] object-contain sm:max-h-56 sm:max-w-[10.5rem] md:max-h-60 md:max-w-[11rem]"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* What to expect + accommodation */}
      <section className="bg-white px-8 py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-8">
            <h2 className="font-headline text-4xl text-on-surface">What to expect</h2>
            <ul className="space-y-6">
              {EXPECT_ITEMS.map((item) => (
                <li key={item.title} className="flex items-start gap-4">
                  <span className="material-symbols-outlined mt-1 text-primary">{item.icon}</span>
                  <div>
                    <h4 className="text-lg font-bold">{item.title}</h4>
                    {item.detail ? <p className="text-on-surface-variant">{item.detail}</p> : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-center space-y-6 rounded-md border border-secondary/40 bg-secondary/15 p-10 md:p-12">
            <span className="material-symbols-outlined text-4xl text-tertiary">hotel</span>
            <h3 className="font-headline text-3xl text-on-surface">King&apos;s Birthday Weekend</h3>
            <p className="text-lg leading-relaxed text-on-surface/80">
              Why not make a weekend of it? Be aware that some places will have a two- or three-night minimum stay.
            </p>
            <a
              href="https://www.airbnb.co.nz/s/Martinborough--Wellington/homes?place_id=ChIJTdllNmMtR20R4OCiQ2HvAAU&refinement_paths%5B%5D=%2Fhomes&checkin=2026-05-30&checkout=2026-06-01&date_picker_type=calendar&adults=2&guests=3&search_type=unknown&query=Martinborough%2C%20Wellington&flexible_trip_lengths%5B%5D=one_week&monthly_start_date=2026-05-01&monthly_length=3&monthly_end_date=2026-08-01&search_mode=regular_search&price_filter_input_type=2&price_filter_num_nights=3&channel=EXPLORE&source=structured_search_input_header"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-bold text-tertiary hover:underline"
            >
              Explore local stays
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </a>
          </div>
        </div>
      </section>

      {/* Register */}
      <section id="register" className="scroll-mt-28 bg-primary px-8 py-16 md:py-24 text-on-primary">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 md:grid-cols-2 md:max-w-6xl md:gap-12">
          <div className="space-y-6">
            <h2 className="font-headline text-4xl md:text-5xl">Register your interest</h2>
            <p className="text-lg text-primary-fixed-dim">
              Everyone is welcome, friends, family, kids and dogs. Please confirm your interest so we can properly plan,
              and we will ask you to RSVP closer to the time for catering. More details a couple of weeks before.
            </p>
            <div className="flex flex-col gap-4 pt-4 text-on-primary/95">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined">mail</span>
                <a href="mailto:olivegreenmartinborough@gmail.com" className="hover:underline">
                  olivegreenmartinborough@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined">location_on</span>
                <span>7 Hawkins Drive, Martinborough</span>
              </div>
            </div>
          </div>

          {status === 'success' ? (
            <div className="space-y-6 rounded-md border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
              <p className="text-lg leading-relaxed">
                Thanks — we&apos;ve got your details. We&apos;ll be in touch closer to the date to confirm final
                numbers and whether you&apos;ll be joining for harvest, the meal, or both.
              </p>
              {emailSentNotice ? (
                <p className="text-on-primary/90" data-testid="harvest-email-sent">
                  We&apos;ve sent a short confirmation to your inbox.
                </p>
              ) : null}
              <p className="text-on-primary/90">Thank you for registering — it means a lot to us.</p>
              <p className="font-medium">Matt & Peter</p>
              <div className="border-t border-white/20 pt-6">
                <h3 className="font-headline mb-3 text-xl">Where we&apos;ll meet</h3>
                <p className="font-semibold">{VENUE_AFTER_SUBMIT.name}</p>
                <p className="mt-2 text-on-primary/90">{VENUE_AFTER_SUBMIT.addressLine}</p>
                <p className="mt-3 text-sm text-on-primary/80">{VENUE_AFTER_SUBMIT.directions}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="harvest-name" className="mb-2 block text-sm font-medium opacity-90">
                  Name
                </label>
                <input
                  id="harvest-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-b border-white/30 bg-white/10 p-3 text-white placeholder:text-white/50 focus:border-white focus:outline-none"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label htmlFor="harvest-email" className="mb-2 block text-sm font-medium opacity-90">
                  Email *
                </label>
                <input
                  id="harvest-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-b border-white/30 bg-white/10 p-3 text-white placeholder:text-white/50 focus:border-white focus:outline-none"
                  placeholder="hello@example.com"
                />
              </div>
              <div>
                <label htmlFor="harvest-guests" className="mb-2 block text-sm font-medium opacity-90">
                  Number of people
                </label>
                <input
                  id="harvest-guests"
                  type="number"
                  min={1}
                  step={1}
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="w-full max-w-[12rem] border-b border-white/30 bg-white/10 p-3 text-white placeholder:text-white/50 focus:border-white focus:outline-none"
                  placeholder="1"
                />
              </div>
              <div>
                <label htmlFor="harvest-notes" className="mb-2 block text-sm font-medium opacity-90">
                  Notes (optional)
                </label>
                <textarea
                  id="harvest-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full border-b border-white/30 bg-white/10 p-3 text-white placeholder:text-white/50 focus:border-white focus:outline-none"
                  placeholder="Questions or context for your group"
                />
              </div>
              {error ? <p className="text-sm text-red-200">{error}</p> : null}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full rounded-md bg-white py-4 text-sm font-bold uppercase tracking-widest text-primary transition-colors hover:bg-surface-container-low disabled:opacity-60"
              >
                {status === 'loading' ? 'Sending…' : 'Register interest'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-surface px-8 py-12 md:py-16">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="space-y-4 text-center">
            <h2 className="font-headline text-4xl text-on-surface">Moments from the grove</h2>
            <p className="text-on-surface-variant">Memories of the 2025 harvest.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {GALLERY_BENTO.map((item) => (
              <div
                key={item.src}
                className={`group h-72 overflow-hidden rounded-md md:h-96 ${item.className}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Harvest
