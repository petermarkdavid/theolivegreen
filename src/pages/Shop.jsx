import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Seo from '../components/Seo'
import { SEO_SHOP } from '../seo/siteSeo'

const Shop = () => {
  return (
    <div className="min-h-screen flex flex-col bg-warm-off-white">
      <Seo {...SEO_SHOP} />
      <section className="w-full bg-primary py-4xl px-xl flex-1 flex items-center">
        <div className="max-w-2xl mx-auto text-center w-full">
          <p className="text-muted-gold text-xs uppercase tracking-wider font-sans mb-md">Shop</p>
          <h1 className="font-serif text-white text-4xl md:text-5xl font-normal leading-tight tracking-tight mb-lg">
            Coming soon
          </h1>
          <p className="text-white/90 font-sans text-lg md:text-xl leading-relaxed mb-3xl">
            Our online shop is not open yet. We’re finishing the next release — check back, or get in touch if you’d
            like to hear when bottles are available.
          </p>
          <div className="flex flex-col sm:flex-row gap-lg justify-center items-center">
            <Link to="/">
              <Button variant="ghost">Back to home</Button>
            </Link>
            <a href="mailto:olivegreenmartinborough@gmail.com">
              <Button variant="ghost">Email us</Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Shop
