import React from 'react'

const CartIcon = ({ count = 0, className = 'text-brand-primary' }) => {
  const hasItems = count > 0
  
  return (
    <div className="relative flex items-center">
      <svg
        className={`h-6 w-6 transition-all ${className} ${hasItems ? 'scale-110' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      {hasItems && (
        <span className="absolute -top-2 -right-2 bg-muted-gold text-olive-green text-sm font-bold rounded-full min-w-[24px] h-6 px-2 flex items-center justify-center shadow-lg border-2 border-white">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </div>
  )
}

export default CartIcon
