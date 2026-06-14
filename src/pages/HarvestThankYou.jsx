import React from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

const STATS = [
  { number: '~180', label: 'Olive trees' },
  { number: '950 kg', label: 'Olives picked' },
  { number: '144 L', label: 'Oil yielded' },
  { number: '15.2%', label: 'Extraction rate' },
]

const VARIETIES = [
  { name: 'Frantoio', note: 'Structure and longevity — robust, grassy intensity that softens over time.' },
  { name: 'Barnea', note: 'Brightness and fresh fruit — lighter body that lifts the blend.' },
  { name: 'Leccino', note: 'A milder, buttery note that rounds everything out.' },
  { name: 'Koroneiki', note: 'The tiny Greek powerhouse — peppery intensity and high polyphenols.' },
]

const FRIENDS = [
  {
    title: 'Among the Olives',
    by: 'Colleen wrote about the day on her Maia Food blog',
    href: 'https://maiafood.substack.com/p/among-the-olives',
    cta: 'Read the blog post',
  },
  {
    title: 'Maia Food',
    by: 'Colleen’s food writing and recipes',
    href: 'https://maiafood.co.nz/blog/',
    cta: 'Visit Maia Food',
  },
  {
    title: 'Amore Rosé',
    by: 'Rex & Emily’s wine — the perfect pour alongside the oil',
    href: 'https://www.seicento.co.nz/product/amore',
    cta: 'Find the wine',
  },
]

const GALLERY = [
  { src: '/images/photo-1.jpg', alt: 'Crew gathering in the grove' },
  { src: '/images/photo-2.jpg', alt: 'Freshly harvested olives' },
  { src: '/images/photo-3.jpg', alt: 'End of day harvest crates' },
  { src: '/images/photo-5.jpg', alt: 'Spreading the nets' },
  { src: '/images/photo-6.jpg', alt: 'Post-harvest lunch' },
  { src: '/images/picking-nets.jpg', alt: 'Pickers working the nets under the trees' },
]

const HarvestThankYou = () => {
  return (
    <div className="min-h-screen bg-surface font-body text-on-surface">
      <Seo
        title="Thank you — 2026 Olive Harvest | Olive Green Martinborough"
        description="A massive thank you to everyone who picked with us at the 2026 olive harvest."
        path="/thanks"
      />

      {/* Hero */}
      <section className="relative flex min-h-[min(520px,55vh)] items-end overflow-hidden">
        <img
          src="/images/hero.jpg"
          alt="The full 2026 harvest crew at Olive Green Martinborough"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="relative z-10 w-full px-8 pb-14 text-center text-white md:pb-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Martinborough · 2026
          </p>
          <h1 className="font-headline text-4xl leading-tight md:text-6xl">
            You picked with us.
            <br />
            <em className="text-brand-secondary">Thank you.</em>
          </h1>
          <p className="mt-4 text-base text-white/75 md:text-lg">
            The Olive Green harvest — Frantoio, Barnea, Leccino &amp; Koroneiki
          </p>
        </div>
      </section>

      {/* Thank-you note */}
      <section className="bg-white px-8 py-16 md:py-24">
        <div className="mx-auto max-w-2xl space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            A note from Peter &amp; Matt
          </p>
          <h2 className="font-headline text-3xl leading-snug text-on-surface md:text-4xl">
            We couldn&apos;t have done it without you.
          </h2>
          <p className="text-lg leading-relaxed text-on-surface-variant">
            Thank you to everyone who joined us and gave up their Sunday to spend it in our little
            grove. We were humbled by the support, the energy, and the incredible effort everyone
            put in throughout the day.
          </p>
          <p className="text-lg leading-relaxed text-on-surface-variant">
            Having you all out there, hands in the branches, made the whole experience feel less
            like work and more like something truly special.
          </p>
          <p className="text-lg leading-relaxed text-on-surface-variant">
            From the bottom of our hearts — thank you. The oil wouldn&apos;t be the same without you,
            and neither would the day.
          </p>
          <p className="text-lg leading-relaxed text-on-surface-variant">
            We&apos;re delighted to say the oil has turned out beautifully, and we&apos;re genuinely
            grateful that you helped make it happen. Any revenue from oil sales goes directly back
            into next year&apos;s harvest and pressing costs, helping us continue this tradition for
            years to come.
          </p>
          <p className="text-lg leading-relaxed text-on-surface-variant">
            We&apos;d love to welcome you back next year on{' '}
            <strong className="text-on-surface">Sunday, 6 June 2027</strong>.
          </p>
          <p className="text-lg leading-relaxed text-on-surface-variant">
            And if you can&apos;t wait until then to enjoy the oil you helped create, use the discount
            code below and visit our shop to order your bottles.
          </p>
        </div>
      </section>

      {/* Harvest stats */}
      <section className="bg-primary px-8 py-16 text-on-primary md:py-20">
        <div className="mx-auto max-w-4xl space-y-10">
          <h2 className="text-center font-headline text-3xl text-on-primary md:text-4xl">
            2026 harvest by the numbers
          </h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-md border border-white/15 bg-white/10 px-6 py-8 text-center"
              >
                <div className="font-headline text-3xl text-on-primary md:text-4xl">{s.number}</div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-widest text-on-primary/60">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm italic text-on-primary/60">
            A 15.2% yield is a really strong result — typical extra-virgin pressings run 12–14%.
            That&apos;s down to the quality of the fruit, and the care everyone put into the pick.
          </p>
        </div>
      </section>

      {/* Photo gallery */}
      <section className="bg-surface-container-low px-8 py-16 md:py-20">
        <div className="mx-auto max-w-7xl space-y-10">
          <div className="space-y-2 text-center">
            <h2 className="font-headline text-3xl text-on-surface md:text-4xl">From the grove</h2>
            <p className="text-on-surface-variant">
              {/* PERSONALISE: Add a warm caption here. */}
              A few snaps from the day.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {GALLERY.map((photo) => (
              <div
                key={photo.src}
                className="group overflow-hidden rounded-md bg-surface-container"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="h-64 w-full object-cover transition-[filter] duration-700 group-hover:brightness-[1.03] md:h-72"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About the oil */}
      <section className="bg-white px-8 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              The 2026 oil
            </p>
            <h2 className="font-headline text-3xl leading-snug text-on-surface md:text-4xl">
              About this year&apos;s oil
            </h2>
            <div className="space-y-4">
              {VARIETIES.map((v) => (
                <div key={v.name} className="flex gap-4">
                  <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <p className="text-on-surface-variant">
                    <strong className="text-on-surface">{v.name}</strong> — {v.note}
                  </p>
                </div>
              ))}
            </div>
            <blockquote className="border-l-2 border-secondary pl-5 text-base italic leading-relaxed text-on-surface-variant">
              The colour alone tells you something — a luminous yellow-green, almost lime, that
              signals something freshly made. On the palate it opens smooth and almost buttery, then
              a gentle bitterness arrives, and just as you swallow, a warm, pleasant prickle blooms
              at the back of the throat. It tastes alive — young and vital in the best possible way.
            </blockquote>
          </div>
          <div className="overflow-hidden rounded-md">
            <img
              src="/images/harvest-picking.jpg"
              alt="Freshly harvested olives from the Martinborough grove"
              className="h-full max-h-[520px] w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Discount */}
      <section className="bg-surface-container-low px-8 py-16 md:py-20">
        <div className="mx-auto max-w-xl space-y-8 rounded-md border border-outline-variant/20 bg-white px-10 py-14 text-center shadow-ambient-sm">
          <div className="space-y-3">
            <h2 className="font-headline text-3xl text-on-surface">Your harvest discount</h2>
            <p className="text-on-surface-variant">
              You earned this, quite literally — here&apos;s 50% off all of the 2026 oil.
            </p>
          </div>
          <div className="rounded-md bg-primary px-8 py-5 font-mono text-2xl font-bold tracking-[0.15em] text-on-primary">
            IPICKEDIN26
          </div>
          <p className="text-sm italic text-on-surface-variant">Copy the code, then head to the shop</p>
          <a
            href="https://www.olivegreenmartinborough.com/shop"
            className="btn-primary-grove inline-block"
          >
            Shop the Olive Green
          </a>
          {/* OPTIONAL: add expiry — e.g. "Valid until 31 December 2026" */}
        </div>
      </section>

      {/* Friends from the day */}
      <section className="bg-white px-8 py-16 md:py-20">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="space-y-2 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Friends from the day
            </p>
            <h2 className="font-headline text-3xl text-on-surface md:text-4xl">
              A few good people &amp; their good things
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {FRIENDS.map((f) => (
              <a
                key={f.href}
                href={f.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-md bg-surface-container-low p-7 transition-colors hover:bg-surface-container"
              >
                <h3 className="font-headline text-xl text-on-surface">{f.title}</h3>
                <p className="mt-2 flex-1 text-on-surface-variant">{f.by}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:underline">
                  {f.cta} →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Sign-off */}
      <section className="bg-primary px-8 py-16 text-center text-on-primary md:py-24">
        <div className="mx-auto max-w-xl space-y-6">
          <h2 className="font-headline text-3xl md:text-4xl">
            See you in the grove next year — King&apos;s Birthday Sunday.
          </h2>
          <p className="text-lg text-on-primary/80">
            Grab a bottle of the 2026 oil from the shop with your code above. You picked it. You earned it.
          </p>
          <p className="text-on-primary/70">With enormous gratitude,</p>
          <p className="font-headline text-2xl italic text-brand-secondary">Peter &amp; Matt</p>
          <p className="text-xs uppercase tracking-widest text-on-primary/40">
            The Olive Green · Martinborough, Wairarapa
          </p>
        </div>
      </section>
    </div>
  )
}

export default HarvestThankYou
