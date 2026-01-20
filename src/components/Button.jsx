import React from 'react'

const Button = ({ 
  children, 
  variant = 'primary', // 'primary' | 'secondary' (only 2 variants)
  onClick, 
  className = '',
  type = 'button'
}) => {
  const baseClasses = 'px-xl py-md font-sans text-base uppercase tracking-wide transition-all duration-200 box-border min-w-[200px]'
  
  const variants = {
    primary: 'bg-olive-green text-white hover:bg-opacity-90 border-2 border-transparent',
    secondary: 'bg-transparent text-olive-green border-2 border-olive-green hover:bg-olive-green hover:text-white',
  }
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
