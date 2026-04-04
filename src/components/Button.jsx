import React from 'react'

const Button = ({
  children,
  variant = 'primary',
  onClick,
  className = '',
  type = 'button',
  disabled = false,
}) => {
  const base =
    'inline-flex min-w-0 items-center justify-center font-body text-sm font-semibold uppercase tracking-wide transition-all duration-grove box-border disabled:cursor-not-allowed disabled:opacity-60'

  const variants = {
    primary: 'btn-primary-grove',
    secondary: 'btn-secondary-grove',
    tertiary: 'btn-tertiary-grove',
    /** For dark / hero bands — transparent, light border */
    ghost:
      'rounded-md border-2 border-white/90 bg-transparent px-8 py-3.5 text-white hover:bg-white hover:text-primary',
    /** Legacy outline on light backgrounds */
    outline:
      'rounded-md border border-grove-ghost bg-transparent px-8 py-3.5 text-primary hover:bg-surface-container-low',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant] || variants.primary} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
