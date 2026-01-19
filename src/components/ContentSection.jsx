import React from 'react'

const ContentSection = ({ heading, content, background = 'warm-off-white', layout = 'split' }) => {
  const bgClass = background === 'warm-off-white' ? 'bg-warm-off-white' : 'bg-white'
  
  return (
    <section className={`w-full ${bgClass} py-4xl px-xl`}>
      <div className="max-w-7xl mx-auto">
        {layout === 'split' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3xl items-start">
            {/* Left Column - Heading */}
            <div>
              <h2 className="text-soft-charcoal text-4xl md:text-5xl font-bold font-sans mb-lg tracking-tight">
                {heading || 'Rooted in Nature'}
              </h2>
            </div>
            
            {/* Right Column - Content */}
            <div className="max-w-2xl">
              <div className="text-soft-charcoal text-base md:text-lg font-sans leading-relaxed space-y-md">
                {content || (
                  <p>
                    Our connection to the grove shapes our journey.
                    We focus on ethical production using low-impact methods and minimal intervention.
                    Our hands nurture the trees, reflecting our commitment to the environment.
                    We honor traditions while advancing sustainable practices for future generations,
                    fostering a culture where quality and approachability coexist.
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-soft-charcoal text-4xl md:text-5xl font-bold font-sans mb-lg tracking-tight">
              {heading}
            </h2>
            <div className="text-soft-charcoal text-base md:text-lg font-sans leading-relaxed space-y-md">
              {content}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ContentSection
