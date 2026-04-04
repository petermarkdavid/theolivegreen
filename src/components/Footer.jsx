import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
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
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="min-w-0 flex-grow border-b border-stone-300 bg-transparent py-2 text-on-surface placeholder:text-stone-400 focus:border-primary focus:outline-none"
              aria-label="Newsletter email"
            />
            <button type="button" className="shrink-0 font-bold text-primary hover:opacity-70">
              Join
            </button>
          </div>
          <p className="mt-8 text-[10px] text-stone-400">
            © {new Date().getFullYear()} Olive Green Martinborough. Crafted for the harvest.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
