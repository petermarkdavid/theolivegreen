import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navigation = ({
  items = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Harvest', path: '/harvest' },
  ],
}) => {
  const location = useLocation()

  return (
    <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
      {items.map((item, index) => {
        const isActive = location.pathname === item.path
        return (
          <Link
            key={index}
            to={item.path}
            className={`font-headline text-sm font-medium tracking-wide transition-colors md:text-base ${
              isActive
                ? 'border-b-2 border-brand-primary pb-1 font-bold text-brand-primary'
                : 'text-stone-600 hover:text-brand-primary'
            }`}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

export default Navigation
