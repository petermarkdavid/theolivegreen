import React from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import ContentSection from '../components/ContentSection'
import Card from '../components/Card'
import Button from '../components/Button'
import Seo from '../components/Seo'
import { SEO_HOME } from '../seo/siteSeo'

const Homepage = () => {
  return (
    <div className="min-h-screen">
      <Seo
        {...SEO_HOME}
        imageAlt="Olive branch and fruit at the Martinborough grove"
      />
      {/* Hero Section */}
      <Hero 
        heading="Quietly Crafted. Exceptionally Pure."
        supportingText="Grown in Martinborough and pressed in Greytown, our Tuscan blend extra virgin olive oil reveals a clean, balanced flavour — designed for drizzling and finishing."
        backgroundImage="url(/images/hero-olive-branch.jpg)"
      />
      
      {/* Featured Products */}
      <section className="w-full bg-white py-2xl md:py-3xl px-xl">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-xl md:mb-2xl">
            <div className="text-muted-gold text-xs uppercase tracking-wider font-sans mb-sm">From the Grove</div>
            <h2 className="text-soft-charcoal text-4xl md:text-5xl font-bold font-sans tracking-tight">Our Olive Oil</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg md:gap-xl md:max-w-4xl md:mx-auto">
            <Card
              variant="product"
              image="/images/olive-oil-bottle-unlabeled.jpg"
              imageAlt="Clear glass bottle of extra virgin olive oil without a label"
              title="2026 Extra Virgin Olive Oil"
              description="Waitlisted. Cold-pressed from the first harvest. Rich, fruity, and perfectly balanced."
              action={
                <Link to="/shop">
                  <Button variant="primary">Shop Now</Button>
                </Link>
              }
            />
            <Card
              variant="product"
              image="/images/olive-oil-bottle-reserve-unlabeled.jpg"
              imageAlt="Dark glass bottle of reserve extra virgin olive oil without a label"
              title="2025 Harvest Reserve"
              description="SOLD OUT. Complex and elegant."
              action={
                <Link to="/shop">
                  <Button variant="primary">Shop Now</Button>
                </Link>
              }
            />
          </div>
        </div>
      </section>
      
      {/* Guided by the Grove Section */}
      <ContentSection 
        heading="Guided by the Grove"
        content="Each bottle tells a story of place, time, and craft. From tree to table, we honor the traditions that make our oil exceptional."
        background="warm-off-white"
        layout="centered"
      />
    </div>
  )
}

export default Homepage
