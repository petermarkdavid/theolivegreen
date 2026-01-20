import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import Navigation from './Navigation'
import CartIcon from './CartIcon'

const Header = () => {
  return (
    <header className="w-full bg-olive-green">
      <div className="px-xl py-md">    
        {/* Main Header Content */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <Logo />
          </Link>
          
          {/* Navigation */}
          <div className="flex-1 flex justify-center">
            <Navigation />
          </div>
          
          {/* User Actions */}
          <div className="flex items-center gap-lg">
            <button className="text-white text-sm md:text-base font-sans tracking-wide hover:opacity-80 transition-opacity">
              Login
            </button>
            <Link to="/shop" className="hover:opacity-80 transition-opacity">
              <CartIcon count={0} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
