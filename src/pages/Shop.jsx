import React, { useState } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import TextBlock from '../components/TextBlock'

const Shop = () => {
  const products = [
    {
      id: 1,
      title: "Extra Virgin Olive Oil",
      description: "Cold-pressed from the first harvest. Rich, fruity notes with a peppery finish.",
      price: "$28",
      size: "500ml"
    },
    {
      id: 2,
      title: "Harvest Reserve",
      description: "Limited edition from our finest groves. Complex and elegant with exceptional depth.",
      price: "$45",
      size: "500ml"
    },
    {
      id: 3,
      title: "Everyday Classic",
      description: "Our signature blend. Versatile and approachable, perfect for daily cooking.",
      price: "$22",
      size: "500ml"
    },
    {
      id: 4,
      title: "Gift Set - Three Varieties",
      description: "A curated selection of our finest oils. Perfect for gifting or exploring.",
      price: "$85",
      size: "3 x 250ml"
    },
    {
      id: 5,
      title: "Harvest Collection",
      description: "A complete range showcasing the diversity of our grove. Limited availability.",
      price: "$120",
      size: "5 x 250ml"
    },
    {
      id: 6,
      title: "Estate Reserve",
      description: "Our most premium offering. Single-grove, single-harvest excellence.",
      price: "$65",
      size: "500ml"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="w-full bg-olive-green py-4xl px-xl">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-muted-gold text-xs uppercase tracking-wider font-sans mb-sm">Shop</div>
          <h1 className="text-white text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-lg">
            Our Olive Oil
          </h1>
          <p className="text-white text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Each bottle represents a commitment to quality, tradition, and the grove.
          </p>
        </div>
      </section>
      
      {/* Products Grid */}
      <section className="w-full bg-warm-off-white py-4xl px-xl">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
            {products.map((product) => (
              <Card
                key={product.id}
                variant="product"
                title={product.title}
                description={product.description}
                action={
                  <div className="flex items-center justify-between mt-lg">
                    <div>
                      <div className="text-soft-charcoal font-bold text-lg">{product.price}</div>
                      <div className="text-soft-charcoal text-sm">{product.size}</div>
                    </div>
                    <Button variant="primary" onClick={handleAddToCart}>Add to Cart</Button>
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Shipping Info */}
      <section className="w-full bg-white py-3xl px-xl">
        <div className="max-w-4xl mx-auto text-center">
          <TextBlock
            heading="Shipping & Care"
            text="We carefully package each order to ensure your oil arrives in perfect condition. Free shipping on orders over $75."
            headingSize="section"
            textColor="soft-charcoal"
          />
        </div>
      </section>
    </div>
  )
}

export default Shop
