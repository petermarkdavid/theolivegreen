import React from 'react'

const Hero = ({ heading, supportingText, backgroundImage }) => {
  return (
    <section className="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: backgroundImage || 'url(https://images.unsplash.com/photo-1587049352846-4a222e784d38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80)',
          filter: 'blur(1px)',
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-xl py-4xl">
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
              {supportingText ? (
                <p>{supportingText}</p>
              ) : (
                <>
                  <p>
                    Our design comes from a deep respect for nature, combined with dedicated care and attention.
                  </p>
                  <p>
                    This commitment results in the highest quality experiences, leading to exceptional user interfaces.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Diagonal Design Element */}
      <div className="absolute right-0 top-0 w-32 h-full bg-white/10 transform rotate-12 origin-top"></div>
    </section>
  )
}

export default Hero
