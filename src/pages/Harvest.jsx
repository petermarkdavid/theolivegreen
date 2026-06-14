import React from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { SEO_HARVEST } from '../seo/siteSeo'

const GOOGLE_MAPS_VENUE_URL =
  'https://www.google.com/maps/search/?api=1&query=7%20Hawkins%20Drive%2C%20Martinborough%2C%20New%20Zealand'

const TIMELINE = [
  {
    time: '10:00',
    title: 'Start (flexible, join us anytime you like)',
    detail:
      "On arrival, come find us – we'll be working our way down the grove, so just keep walking past the house and you'll find us, we'll give you a quick rundown on how to harvest (there's nothing to it) – then join in!",
  },
  {
    time: '11:30',
    title: 'Morning tea',
    detail:
      "As well as an army of \"pickers\", we'll also have a small army of \"Nanas\" in the kitchen – so expect to be treated to some homemade snacks and treats! – we'll serve morning tea up by the house!",
  },
  {
    time: '15:30',
    title: 'Harvest meal',
    detail:
      "A late, long lunch and drinks – as a thanks for the day's hard work, we celebrate with food, drinks and laughs into the evening, we also have a small supply of 2025's oil, so \"while stocks last\" grab a bottle to take home!",
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
    title: 'A bottle of 2025 oil to take home (while stocks last!)',
  },
]

/** Martinborough, King's Birthday weekend 2026 (check-in / check-out aligned with harvest). */
const BOOKING_MARTINBOROUGH_URL =
  'https://www.booking.com/searchresults.en-gb.html?ss=Martinborough%2C+Wellington%2C+New+Zealand&efdco=1&label=gen173nr-10CAEoggI46AdIM1gEaK4BiAEBmAEzuAEHyAEM2AED6AEB-AEBiAIBqAIBuALkxoPOBsACAdICJGE0YTNlNDc1LTU4MmEtNDM2Ny1iZTA2LWQ4NjZlZjdiOGU3ZNgCAeACAQ&aid=304142&lang=en-gb&sb=1&src_elem=sb&src=index&dest_id=900048025&dest_type=city&ac_position=0&ac_click_type=b&ac_langcode=xu&ac_suggestion_list_length=5&search_selected=true&search_pageview_id=bd91005e36b10436&ac_meta=GhBiZDkxMDA1ZTM2YjEwNDM2IAAoATICeHU6DW1hcnRpbmJvcm91Z2g%3D&checkin=2026-05-30&checkout=2026-06-01&group_adults=2&no_rooms=1&group_children=0'

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
  return (
    <div className="min-h-screen bg-surface font-body text-on-surface selection:bg-primary-fixed-dim/40">
      <Seo {...SEO_HARVEST} />
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
          <h1 className="font-headline text-3xl leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="block">2026 Olive Harvest</span>
            <span className="mt-1 block sm:mt-1.5">King&apos;s Birthday Weekend</span>
          </h1>
          <p className="font-headline text-2xl font-semibold italic tracking-wide text-white/90 sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-snug">
            <span className="block">Sunday 31 May</span>
            <span className="mt-1 block sm:mt-1.5">7 Hawkins Drive, Martinborough</span>
          </p>
          <div className="pt-8">
            <a
              href="#register"
              className="inline-block rounded-md bg-gradient-to-b from-primary to-primary-container px-10 py-4 font-medium text-on-primary shadow-ambient-sm transition-all hover:brightness-105"
            >
              Harvest 2027
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
              Our olive grove has been tended, cared for and harvested for over 20 years by Doug, Trish, their family,
              friends and neighbours.
            </h2>
            <p className="font-headline text-3xl leading-snug text-on-surface md:text-4xl">
              We&apos;re excited to continue the tradition and would love for you to join our first olive harvest.
            </p>
          </div>
          <p className="font-headline text-3xl font-semibold italic text-brand-secondary md:text-4xl">Peter and Matt</p>
        </div>
      </section>

      {/* The day + image */}
      <section className="bg-surface-container-low px-8 py-12 md:py-20">
        <h2 className="font-headline mx-auto mb-10 max-w-3xl text-center text-2xl leading-snug text-on-surface sm:text-3xl md:mb-14 md:text-4xl lg:text-[2.5rem] lg:leading-snug">
          It&apos;s a relaxed day—pick as many or as few olives as you like, or just join us for the late lunch, laughs
          and drinks into the evening.
        </h2>
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:gap-10 lg:gap-12">
          <div className="min-w-0 space-y-10">
            <h3 className="font-headline text-3xl text-on-surface md:text-5xl">The day</h3>
            <div className="ml-2 space-y-10 border-l border-outline-variant/40 pl-8 md:pl-10">
              {TIMELINE.map((item) => (
                <div key={item.time} className="relative">
                  <div className="absolute -left-[41px] top-1.5 h-4 w-4 rounded-full border-4 border-surface-container-low bg-secondary md:top-2" />
                  <h4 className="font-headline text-2xl text-primary md:text-3xl">
                    {item.time} — {item.title}
                  </h4>
                  <p className="mt-3 text-lg leading-relaxed text-on-surface-variant md:mt-4 md:text-xl md:leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex w-full justify-center overflow-hidden rounded-md shadow-sm md:w-auto md:shrink-0 md:self-center">
            <img
              src="/images/2025menu.jpg"
              alt="Harvest table and meal"
              className="mx-auto h-auto max-h-[19.5rem] w-auto max-w-[14.25rem] object-contain sm:max-h-[21rem] sm:max-w-[15.75rem] md:max-h-[22.5rem] md:max-w-[16.5rem]"
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
            <div className="flex flex-col gap-3">
              <a
                href="https://www.airbnb.co.nz/s/Martinborough--Wellington/homes?place_id=ChIJTdllNmMtR20R4OCiQ2HvAAU&refinement_paths%5B%5D=%2Fhomes&checkin=2026-05-30&checkout=2026-06-01&date_picker_type=calendar&adults=2&guests=3&search_type=unknown&query=Martinborough%2C%20Wellington&flexible_trip_lengths%5B%5D=one_week&monthly_start_date=2026-05-01&monthly_length=3&monthly_end_date=2026-08-01&search_mode=regular_search&price_filter_input_type=2&price_filter_num_nights=3&channel=EXPLORE&source=structured_search_input_header"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-bold text-tertiary hover:underline"
              >
                Explore local Airbnb stays
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </a>
              <a
                href={BOOKING_MARTINBOROUGH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-bold text-tertiary hover:underline"
              >
                Explore local Booking.com stays
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Registrations closed + 2027 */}
      <section id="register" className="scroll-mt-28 bg-primary px-8 py-16 md:py-24 text-on-primary">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 md:grid-cols-2 md:max-w-6xl md:gap-12">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-fixed-dim">
              Registrations closed
            </p>
            <h2 className="font-headline text-4xl md:text-5xl">That&apos;s a wrap on 2026</h2>
            <p className="text-lg text-primary-fixed-dim">
              Thank you to everyone who came and picked with us — registrations for the 2026 harvest
              are now closed. If you joined us this year, there&apos;s a little thank-you waiting for
              you.
            </p>
            <div className="flex flex-col gap-4 pt-2">
              <Link
                to="/harvest-thank-you"
                className="inline-flex w-fit items-center gap-2 rounded-md bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-primary transition-colors hover:bg-surface-container-low"
              >
                See the 2026 thank-you
              </Link>
            </div>
            <div className="flex flex-col gap-4 pt-4 text-on-primary/95">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined">mail</span>
                <a href="mailto:olivegreenmartinborough@gmail.com" className="hover:underline">
                  olivegreenmartinborough@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined">location_on</span>
                <a
                  href={GOOGLE_MAPS_VENUE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  7 Hawkins Drive, Martinborough
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-5 rounded-md border border-white/20 bg-white/10 p-8 backdrop-blur-sm md:p-10">
            <span className="material-symbols-outlined text-4xl text-secondary">event_upcoming</span>
            <h3 className="font-headline text-3xl md:text-4xl">Harvest 2027</h3>
            <p className="text-lg leading-relaxed text-on-primary/90">
              We&apos;ll be back next year over King&apos;s Birthday weekend, June 2027 — same grove,
              same long lunch. Dates and registration will open here closer to the time.
            </p>
            <p className="text-sm text-on-primary/70">
              Want first dibs? Email us and we&apos;ll add you to the list for 2027.
            </p>
            <a
              href="mailto:olivegreenmartinborough@gmail.com?subject=Olive%20Green%20—%202027%20harvest%20interest"
              className="inline-flex w-fit items-center gap-2 rounded-md border border-white/60 px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-primary"
            >
              Keep me posted for 2027
            </a>
          </div>
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
                className={`group flex h-72 justify-center overflow-hidden rounded-md bg-surface-container-low md:h-96 ${item.className}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-auto max-w-none shrink-0 transition-[filter] duration-700 group-hover:brightness-[1.03]"
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
