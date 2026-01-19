import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="w-full bg-olive-green py-3xl px-xl">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3xl mb-3xl">
          {/* Brand */}
          <div>
            <h3 className="text-white text-xl font-bold font-sans mb-md">The Olive Green</h3>
            <p className="text-white text-sm leading-relaxed opacity-90">
              Quietly crafted, exceptionally pure olive oil from our family grove.
            </p>
          </div>
          
          {/* Navigation */}
          <div>
            <h4 className="text-white text-sm font-bold font-sans mb-md uppercase tracking-wide">Navigate</h4>
            <nav className="flex flex-col gap-sm">
              <Link to="/" className="text-white text-sm hover:opacity-80 transition-opacity">Home</Link>
              <Link to="/shop" className="text-white text-sm hover:opacity-80 transition-opacity">Shop</Link>
              <Link to="/accommodation" className="text-white text-sm hover:opacity-80 transition-opacity">Accommodation</Link>
              <Link to="/harvest" className="text-white text-sm hover:opacity-80 transition-opacity">Harvest</Link>
              <Link to="/about" className="text-white text-sm hover:opacity-80 transition-opacity">About Us</Link>
            </nav>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-white text-sm font-bold font-sans mb-md uppercase tracking-wide">Contact</h4>
            <div className="text-white text-sm space-y-xs opacity-90">
              <p><a href="mailto:olivegreenmartinborough@gmail.com" className="hover:opacity-80 transition-opacity">olivegreenmartinborough@gmail.com</a></p>
              <p><a href="tel:+15551234567" className="hover:opacity-80 transition-opacity">+1 (555) 123-4567</a></p>
              <p>Open Saturday & Sunday<br />11AM - 3PM</p>
            </div>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="text-white text-sm font-bold font-sans mb-md uppercase tracking-wide">Stay Connected</h4>
            <p className="text-white text-sm mb-md opacity-90">
              Receive updates about harvest, new releases, and grove events.
            </p>
            <div className="flex gap-sm">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-md py-sm text-sm bg-white/10 border border-white/20 text-white placeholder-white/60 rounded focus:outline-none focus:border-white/40"
              />
              <button className="px-lg py-sm bg-muted-gold text-olive-green text-sm font-bold hover:bg-opacity-90 transition-opacity rounded">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-xl text-center">
          <p className="text-white text-sm opacity-90">
            © 2024 The Olive Green. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
