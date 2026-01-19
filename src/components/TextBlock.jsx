import React from 'react'

const TextBlock = ({ 
  heading, 
  text, 
  headingSize = 'section', // 'eyebrow' | 'section' | 'hero'
  textColor = 'soft-charcoal',
  className = '' 
}) => {
  const headingSizes = {
    eyebrow: 'text-muted-gold text-xs uppercase tracking-wider font-sans mb-sm',
    section: 'text-soft-charcoal text-4xl md:text-5xl font-bold font-sans mb-lg tracking-tight',
    hero: 'text-white text-5xl md:text-6xl font-bold leading-tight tracking-tight',
  }
  
  const textColors = {
    'soft-charcoal': 'text-soft-charcoal',
    white: 'text-white',
    'olive-green': 'text-olive-green',
  }
  
  return (
    <div className={`space-y-md ${className}`}>
      {heading && (
        <h3 className={`${headingSizes[headingSize]} ${headingSize === 'eyebrow' ? '' : 'font-bold font-sans mb-lg'}`}>
          {heading}
        </h3>
      )}
      {text && (
        <p className={`text-base md:text-lg font-sans leading-relaxed ${textColors[textColor]}`}>
          {text}
        </p>
      )}
    </div>
  )
}

export default TextBlock
