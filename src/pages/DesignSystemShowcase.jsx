import React from 'react'
import Button from '../components/Button'
import Icon from '../components/Icon'
import TextBlock from '../components/TextBlock'
import Card from '../components/Card'
import Navigation from '../components/Navigation'
import CartIcon from '../components/CartIcon'

const DesignSystemShowcase = () => {
  return (
    <div className="min-h-screen">
      {/* Design System Showcase Dashboard */}
      <section className="w-full bg-warm-off-white py-4xl px-xl">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-soft-charcoal text-4xl md:text-5xl font-bold font-sans mb-3xl text-center tracking-tight">
            Brand Elements
          </h2>
          
          {/* Buttons Showcase */}
          <div className="mb-4xl">
            <h3 className="text-soft-charcoal text-3xl font-bold font-sans mb-xl">Buttons</h3>
            <div className="flex flex-wrap gap-lg items-center">
              <Button variant="primary">Shop Now</Button>
              <Button variant="secondary">Learn More</Button>
            </div>
          </div>
          
          {/* Icons Showcase */}
          <div className="mb-4xl">
            <h3 className="text-soft-charcoal text-3xl font-bold font-sans mb-xl">Icons</h3>
            <div className="flex flex-wrap gap-xl items-center">
              <div className="bg-olive-green p-xl rounded">
                <Icon name="cart" color="white" size="lg" />
              </div>
              <div className="bg-olive-green p-xl rounded">
                <Icon name="user" color="white" size="lg" />
              </div>
              <div className="bg-olive-green p-xl rounded">
                <Icon name="menu" color="white" size="lg" />
              </div>
              <div className="bg-olive-green p-xl rounded">
                <Icon name="close" color="white" size="lg" />
              </div>
              <div className="bg-olive-green p-xl rounded">
                <Icon name="arrow" color="white" size="lg" />
              </div>
              <div className="p-xl">
                <Icon name="cart" color="soft-charcoal" size="lg" />
              </div>
              <div className="p-xl">
                <Icon name="user" color="olive-green" size="lg" />
              </div>
            </div>
          </div>
          
          {/* Text Blocks Showcase */}
          <div className="mb-4xl">
            <h3 className="text-soft-charcoal text-3xl font-bold font-sans mb-xl">Text Blocks</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3xl">
              <TextBlock 
                heading="Large Heading"
                text="This is a text block with a large heading and supporting text. It demonstrates the typography hierarchy and spacing principles."
                headingSize="section"
              />
              <TextBlock 
                heading="Medium Heading"
                text="This is a text block with a medium heading. The design system emphasizes generous spacing and clear hierarchy."
                headingSize="section"
              />
            </div>
            <div className="mt-xl bg-olive-green p-3xl rounded">
              <TextBlock 
                heading="White Text on Dark"
                text="This demonstrates text blocks on dark backgrounds, maintaining excellent contrast and readability."
                headingSize="section"
                textColor="white"
              />
            </div>
          </div>
          
          {/* Cards Showcase */}
          <div className="mb-4xl">
            <h3 className="text-soft-charcoal text-3xl font-bold font-sans mb-xl">Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
              <Card 
                title="Editorial Card"
                description="Editorial sophistication over UI components. Spacing and background contrast over borders."
                variant="editorial"
                action={<Button variant="secondary" className="mt-md">Learn More</Button>}
              />
              <Card 
                title="Product Card"
                description="For displaying olive oil products. Clean, minimal styling."
                variant="product"
                action={<Button variant="primary" className="mt-md">Shop</Button>}
              />
              <Card 
                title="Note Card"
                description="Harvest notes, tasting profiles. Subtle border accent."
                variant="note"
                action={<Button variant="secondary" className="mt-md">Read</Button>}
              />
            </div>
          </div>
          
          {/* Navigation Showcase */}
          <div className="mb-4xl">
            <h3 className="text-soft-charcoal text-3xl font-bold font-sans mb-xl">Navigation</h3>
            <div className="bg-olive-green p-3xl rounded">
              <Navigation />
            </div>
          </div>
          
          {/* Cart Icon Showcase */}
          <div className="mb-4xl">
            <h3 className="text-soft-charcoal text-3xl font-bold font-sans mb-xl">Cart Icon</h3>
            <div className="flex flex-wrap gap-xl items-center">
              <div className="bg-olive-green p-xl rounded">
                <div className="mb-sm text-white text-sm">Empty Cart</div>
                <CartIcon count={0} />
              </div>
              <div className="bg-olive-green p-xl rounded">
                <div className="mb-sm text-white text-sm">1 Item</div>
                <CartIcon count={1} />
              </div>
              <div className="bg-olive-green p-xl rounded">
                <div className="mb-sm text-white text-sm">3 Items</div>
                <CartIcon count={3} />
              </div>
              <div className="bg-olive-green p-xl rounded">
                <div className="mb-sm text-white text-sm">12 Items</div>
                <CartIcon count={12} />
              </div>
              <div className="bg-olive-green p-xl rounded">
                <div className="mb-sm text-white text-sm">100+ Items</div>
                <CartIcon count={150} />
              </div>
            </div>
          </div>
          
          {/* Color Palette Showcase */}
          <div className="mb-4xl">
            <h3 className="text-soft-charcoal text-3xl font-bold font-sans mb-xl">Color Palette</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-xl">
              <div 
                className="bg-olive-green p-3xl rounded text-white text-center"
                style={{ backgroundColor: '#6B8E23' }}
              >
                <div className="font-bold mb-md">Olive Green</div>
                <div className="text-sm font-mono">#6B8E23</div>
              </div>
              <div 
                className="bg-warm-off-white p-3xl rounded text-soft-charcoal text-center border border-gray-200"
                style={{ backgroundColor: '#FAF8F3' }}
              >
                <div className="font-bold mb-md">Warm Off-White</div>
                <div className="text-sm font-mono">#FAF8F3</div>
              </div>
              <div 
                className="bg-soft-charcoal p-3xl rounded text-white text-center"
                style={{ backgroundColor: '#2C2C2C' }}
              >
                <div className="font-bold mb-md">Soft Charcoal</div>
                <div className="text-sm font-mono">#2C2C2C</div>
              </div>
              <div 
                className="bg-deep-olive p-3xl rounded text-white text-center"
                style={{ backgroundColor: '#3D4A2E' }}
              >
                <div className="font-bold mb-md">Deep Olive</div>
                <div className="text-sm font-mono">#3D4A2E</div>
              </div>
              <div 
                className="bg-muted-gold p-3xl rounded text-olive-green text-center border border-gray-300"
                style={{ backgroundColor: '#C9A961' }}
              >
                <div className="font-bold mb-md">Muted Gold</div>
                <div className="text-sm font-mono">#C9A961</div>
              </div>
            </div>
          </div>
          
          {/* Typography Showcase */}
          <div className="mb-4xl">
            <h3 className="text-soft-charcoal text-3xl font-bold font-sans mb-xl">Typography Scale</h3>
            <div className="space-y-xl">
              <div>
                <div className="text-xs text-gray-600 mb-sm">Logo (Modern Sans-Serif)</div>
                <div className="font-modern text-muted-gold text-4xl font-bold tracking-tight">THE OLIVE GREEN</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-sm">Hero (Editorial, Sentence Case)</div>
                <div className="text-5xl md:text-6xl font-bold text-soft-charcoal tracking-tight">The harvest, captured at its peak</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-sm">Section Heading (Editorial, Sentence Case)</div>
                <div className="text-4xl md:text-5xl font-bold text-soft-charcoal tracking-tight">Rooted in Nature</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-sm">Eyebrow (Micro-heading)</div>
                <div className="text-muted-gold text-xs uppercase tracking-wider font-sans mb-sm">From the Grove</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-sm">Body (Optimized for Reading)</div>
                <div className="text-base md:text-lg text-soft-charcoal leading-relaxed">
                  This is body text with comfortable line height for optimal readability. 
                  The design system emphasizes editorial sophistication and long-form storytelling.
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-sm">Navigation (Sentence Case)</div>
                <div className="text-base tracking-wide text-soft-charcoal">Our Grove</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-sm">Small (Secondary Information)</div>
                <div className="text-sm text-gray-600">This is small text for harvest notes, tasting profiles, and fine print.</div>
              </div>
            </div>
          </div>
          
          {/* Spacing Showcase */}
          <div className="mb-4xl">
            <h3 className="text-soft-charcoal text-3xl font-bold font-sans mb-xl">Spacing Scale</h3>
            <div className="space-y-md">
              <div className="flex items-center gap-md">
                <div className="w-xs h-xs bg-olive-green"></div>
                <span className="text-sm">xs: 4px</span>
              </div>
              <div className="flex items-center gap-md">
                <div className="w-sm h-sm bg-olive-green"></div>
                <span className="text-sm">sm: 8px</span>
              </div>
              <div className="flex items-center gap-md">
                <div className="w-md h-md bg-olive-green"></div>
                <span className="text-sm">md: 16px</span>
              </div>
              <div className="flex items-center gap-md">
                <div className="w-lg h-lg bg-olive-green"></div>
                <span className="text-sm">lg: 24px</span>
              </div>
              <div className="flex items-center gap-md">
                <div className="w-xl h-xl bg-olive-green"></div>
                <span className="text-sm">xl: 32px</span>
              </div>
              <div className="flex items-center gap-md">
                <div className="w-2xl h-2xl bg-olive-green"></div>
                <span className="text-sm">2xl: 48px</span>
              </div>
              <div className="flex items-center gap-md">
                <div className="w-3xl h-3xl bg-olive-green"></div>
                <span className="text-sm">3xl: 64px</span>
              </div>
              <div className="flex items-center gap-md">
                <div className="w-4xl h-4xl bg-olive-green"></div>
                <span className="text-sm">4xl: 96px</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DesignSystemShowcase
