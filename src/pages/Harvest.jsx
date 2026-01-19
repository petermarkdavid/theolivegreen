import React from 'react'
import Hero from '../components/Hero'
import ContentSection from '../components/ContentSection'
import Card from '../components/Card'
import TextBlock from '../components/TextBlock'

const Harvest = () => {
  const harvestNotes = [
    {
      title: "Early Harvest",
      date: "October",
      description: "The first olives are hand-picked at peak ripeness. This early harvest yields our most vibrant, fruity oils."
    },
    {
      title: "Main Harvest",
      date: "November",
      description: "The bulk of our harvest takes place. A careful balance of timing and weather determines the oil's character."
    },
    {
      title: "Late Harvest",
      date: "December",
      description: "The final olives, often richer and more complex. These contribute to our reserve and special edition oils."
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero 
        heading="The Harvest, Captured at Its Peak"
        supportingText="Each harvest is a moment in time, shaped by weather, soil, and careful timing. We pick at the perfect moment to capture the essence of the grove."
      />
      
      {/* Harvest Story */}
      <ContentSection 
        heading="A Year in the Grove"
        content="The harvest is the culmination of a year's work. From spring blossoms to autumn picking, every season contributes to the final oil. We honor this cycle with careful attention to each stage."
      />
      
      {/* Harvest Timeline */}
      <section className="w-full bg-white py-4xl px-xl">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-3xl">
            <div className="text-muted-gold text-xs uppercase tracking-wider font-sans mb-sm">Harvest 2024</div>
            <h2 className="text-soft-charcoal text-4xl md:text-5xl font-bold font-sans tracking-tight">Harvest Notes</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
            {harvestNotes.map((note, index) => (
              <Card
                key={index}
                variant="note"
                title={note.title}
                description={
                  <div>
                    <div className="text-muted-gold text-xs uppercase tracking-wider mb-md">{note.date}</div>
                    <p>{note.description}</p>
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <ContentSection 
        heading="From Tree to Bottle"
        content="Within hours of picking, our olives are cold-pressed. This immediacy preserves the fresh, vibrant character of the fruit. No heat, no chemicals—just pure extraction of the oil."
        background="warm-off-white"
        layout="split"
      />
      
      {/* Tasting Notes */}
      <section className="w-full bg-deep-olive py-4xl px-xl">
        <div className="max-w-4xl mx-auto">
          <TextBlock
            heading="Tasting the Harvest"
            text="Each harvest year brings unique characteristics. The 2024 harvest shows bright fruitiness with balanced bitterness and a clean finish. Notes of green apple, fresh grass, and a hint of almond."
            headingSize="section"
            textColor="white"
          />
        </div>
      </section>
    </div>
  )
}

export default Harvest
