import React from 'react'
import { Link } from 'react-router-dom'
import Navigation from './Navigation'
import CartIcon from './CartIcon'

const Header = () => {
  return (
    <header className="glass-header fixed top-0 z-50 w-full">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-4 md:flex-row md:items-center md:justify-between md:gap-0 md:px-8">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="font-headline text-xl tracking-tight text-brand-primary transition-opacity hover:opacity-90 md:text-2xl"
          >
            Olive Green Martinborough
          </Link>
          <Link to="/shop" className="text-brand-primary md:hidden" aria-label="Shop">
            <CartIcon />
          </Link>
        </div>

        <div className="flex flex-1 justify-center">
          <Navigation />
        </div>

        <div className="hidden text-brand-primary md:flex md:min-w-[48px] md:justify-end">
          <Link to="/shop" aria-label="Shop">
            <CartIcon />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
