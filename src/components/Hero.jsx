import React from 'react'

/** supportingText: one string, or an array of strings for multiple paragraphs */
const Hero = ({ heading, supportingText, backgroundImage }) => {
  const paragraphs = Array.isArray(supportingText)
    ? supportingText
    : supportingText
      ? [supportingText]
      : null
  return (
    <section className="relative flex min-h-[min(360px,52vh)] w-full items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: backgroundImage || 'url(/images/hero-olive-branch.jpg)',
          filter: 'blur(1px)',
        }}
      >
        {/* Soft gradient scrim for text contrast (avoids a flat rectangular veil) */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-black/35 via-black/15 to-black/30"
          aria-hidden
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-xl py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-start gap-3xl">
          {/* Main Heading */}
          <div className="flex-1">
            <h1 className="text-white text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-lg">
              {heading || 'The harvest, captured at its peak'}
            </h1>
          </div>
          
          {/* Supporting Text */}
          <div className="flex-1 max-w-xl">
            <div className="text-white text-lg md:text-xl leading-relaxed space-y-md max-w-xl">
              {paragraphs ? (
                paragraphs.map((text, i) => <p key={i}>{text}</p>)
              ) : (
                <>
                  <p>
                    Our design comes from a deep respect for nature, combined with dedicated care and attention.
                  </p>
                  <p>
                    This commitment results in the highest quality experiences, leading to exceptional flavour in every
                    bottle.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
