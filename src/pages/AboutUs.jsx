import React from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import ContentSection from '../components/ContentSection'
import Card from '../components/Card'
import Button from '../components/Button'
import TextBlock from '../components/TextBlock'

const AboutUs = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero 
        heading="Rooted in Tradition, Guided by the Grove"
        supportingText="We are a family estate dedicated to producing exceptional olive oil. Our story is one of connection—to the land, to tradition, and to the craft of making oil that honors the grove."
      />
      
      {/* Our Story */}
      <ContentSection 
        heading="Our Story"
        content="For generations, our family has tended these groves. What began as a way of life has become a commitment to excellence. We combine time-honored methods with careful attention to quality, always letting the grove guide our decisions."
        layout="split"
      />
      
      {/* Values */}
      <section className="w-full bg-white py-4xl px-xl">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-3xl">
            <div className="text-muted-gold text-xs uppercase tracking-wider font-sans mb-sm">Our Values</div>
            <h2 className="text-soft-charcoal text-4xl md:text-5xl font-bold font-sans tracking-tight">What Guides Us</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
            <Card
              variant="editorial"
              title="Respect for the Grove"
              description="We work with nature, not against it. Sustainable practices ensure the grove thrives for generations."
            />
            <Card
              variant="editorial"
              title="Commitment to Quality"
              description="Every decision is made with quality in mind. From picking to bottling, we maintain the highest standards."
            />
            <Card
              variant="editorial"
              title="Connection to Place"
              description="Our oil reflects the unique character of our grove. Terroir matters, and we honor it in every bottle."
            />
          </div>
        </div>
      </section>
      
      {/* The Team */}
      <ContentSection 
        heading="The People Behind the Oil"
        content="Our team brings together generations of knowledge with fresh perspectives. From grove management to harvest coordination, each person plays a vital role in creating our oil."
        background="warm-off-white"
        layout="centered"
      />
      
      {/* Thank you */}
      <section className="w-full bg-warm-off-white py-3xl px-xl text-center">
        <p className="text-soft-charcoal/90 font-sans text-lg leading-relaxed max-w-2xl mx-auto">
          Thank you for your interest in the grove — whether you visit, buy our oil, or simply follow along. We’re
          grateful.
        </p>
        <p className="text-soft-charcoal font-sans text-base font-medium mt-md">Peter & Matt</p>
      </section>

      {/* Visit Us */}
      <section className="w-full bg-primary py-4xl px-xl">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white text-4xl md:text-5xl font-bold font-sans mb-lg tracking-tight">
            Visit Our Grove
          </h2>
          <p className="text-white text-lg md:text-xl leading-relaxed mb-3xl">
            We welcome visitors to experience the grove firsthand. Tours, tastings, and harvest participation available by arrangement.
          </p>
          <div className="flex flex-col sm:flex-row gap-lg justify-center">
            <Link to="/harvest">
              <Button variant="ghost">Harvest day</Button>
            </Link>
            <a href="mailto:olivegreenmartinborough@gmail.com">
              <Button variant="ghost">Contact us</Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutUs
