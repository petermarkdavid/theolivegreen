import React from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import ContentSection from '../components/ContentSection'
import Card from '../components/Card'
import Button from '../components/Button'

const Homepage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero 
        heading="Quietly Crafted. Exceptionally Pure."
        supportingText="Our olive oil comes from a deep respect for the grove, combined with dedicated care and attention. This commitment results in the highest quality fruit, leading to exceptional tasting oil."
        backgroundImage="url(/images/hero-olive-branch.jpg)"
      />
      
      {/* From the Grove Section */}
      <ContentSection 
        heading="Rooted in Nature"
        content="Our connection to the grove shapes our journey. We focus on ethical production using low-impact methods and minimal intervention. Our hands nurture the trees, reflecting our commitment to the environment."
      />
      
      {/* Featured Products */}
      <section className="w-full bg-white py-4xl px-xl">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-3xl">
            <div className="text-muted-gold text-xs uppercase tracking-wider font-sans mb-sm">From the Grove</div>
            <h2 className="text-soft-charcoal text-4xl md:text-5xl font-bold font-sans tracking-tight">Our Olive Oil</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
            <Card
              variant="product"
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
