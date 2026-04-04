import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navigation = ({ items = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'Harvest', path: '/harvest' },
] }) => {
  const location = useLocation()
  
  return (
    <nav className="flex items-center gap-xl">
      {items.map((item, index) => {
        const isActive = location.pathname === item.path
        return (
          <Link
            key={index}
            to={item.path}
            className={`text-white text-sm md:text-base font-sans tracking-wide hover:opacity-80 transition-opacity ${
              isActive ? 'opacity-100 underline' : ''
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
