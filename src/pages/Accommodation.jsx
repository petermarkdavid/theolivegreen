import React from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import ContentSection from '../components/ContentSection'
import Card from '../components/Card'
import Button from '../components/Button'
import TextBlock from '../components/TextBlock'

const Accommodation = () => {
  const rooms = [
    {
      title: "Grove View Suite",
      description: "Overlooking the olive groves. Spacious, comfortable, with direct access to the grounds.",
      features: ["King bed", "Private terrace", "Grove views", "Breakfast included"],
      price: "$180/night"
    },
    {
      title: "Harvest Cottage",
      description: "A charming cottage nestled among the trees. Perfect for a quiet retreat.",
      features: ["Queen bed", "Kitchenette", "Private garden", "Breakfast included"],
      price: "$150/night"
    },
    {
      title: "Estate Room",
      description: "Elegant and refined, with views of the estate. Ideal for longer stays.",
      features: ["King bed", "Sitting area", "Estate views", "Breakfast included"],
      price: "$200/night"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero 
        heading="Stay Among the Groves"
        supportingText="Experience the grove beyond the harvest. Wake to the sound of olive trees, explore the grounds, and immerse yourself in the rhythm of the estate."
      />
      
      {/* About the Accommodation */}
      <ContentSection 
        heading="A Place to Rest"
        content="Our accommodation offers a peaceful retreat in the heart of the grove. Each room is thoughtfully designed to reflect the natural beauty of the estate, providing comfort and connection to the land."
      />
      
      {/* Rooms */}
      <section className="w-full bg-white py-4xl px-xl">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-3xl">
            <div className="text-muted-gold text-xs uppercase tracking-wider font-sans mb-sm">Accommodation</div>
            <h2 className="text-soft-charcoal text-4xl md:text-5xl font-bold font-sans tracking-tight">Our Rooms</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
            {rooms.map((room, index) => (
              <Card
                key={index}
                variant="editorial"
                title={room.title}
                description={room.description}
                action={
                  <div className="mt-lg">
                    <div className="text-soft-charcoal text-sm mb-md">
                      <div className="font-semibold mb-sm">{room.price}</div>
                      <ul className="space-y-xs text-xs">
                        {room.features.map((feature, i) => (
                          <li key={i}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                    <Button variant="primary">Check Availability</Button>
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* What's Included */}
      <ContentSection 
        heading="What's Included"
        content="All stays include breakfast featuring our olive oil, access to grove tours, and the opportunity to participate in harvest activities during season. Evening tastings available by arrangement."
        background="warm-off-white"
        layout="centered"
      />
      
      {/* Booking CTA */}
      <section className="w-full bg-olive-green py-4xl px-xl">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white text-4xl md:text-5xl font-bold font-sans mb-lg tracking-tight">
            Plan Your Stay
          </h2>
          <p className="text-white text-lg md:text-xl leading-relaxed mb-3xl">
            Contact us to discuss availability and special arrangements.
          </p>
          <Link to="/about">
            <Button variant="secondary">Contact Us</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Accommodation
