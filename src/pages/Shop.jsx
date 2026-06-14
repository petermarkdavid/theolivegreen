import React, { useState } from 'react'
import Button from '../components/Button'
import Seo from '../components/Seo'
import { SEO_SHOP } from '../seo/siteSeo'
import { createCheckoutSession } from '../api/checkout'
import { checkoutSessionUrl } from '../config/publicEdgeFunctions'
import { resolveSupabaseAnonKey, supabaseAnonKeyIssue } from '../config/resolveSupabaseAnonKey'

const UNIT_PRICE = 30 // NZD
const MAX_QTY = 24

const Shop = () => {
  const [quantity, setQuantity] = useState(1)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const dec = () => setQuantity((q) => Math.max(1, q - 1))
  const inc = () => setQuantity((q) => Math.min(MAX_QTY, q + 1))

  const handleBuy = async () => {
    setError('')
    const anonKey = resolveSupabaseAnonKey()
    if (supabaseAnonKeyIssue(anonKey)) {
      setError('The shop is not fully configured yet — please email us to order.')
      return
    }

    setStatus('loading')
    try {
      const { url } = await createCheckoutSession(checkoutSessionUrl(), anonKey, { quantity })
      window.location.href = url
    } catch (err) {
      setStatus('idle')
      setError(err?.message || 'Something went wrong. Please try again or email us.')
    }
  }

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface">
      <Seo {...SEO_SHOP} />

      <section className="px-8 py-12 md:py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Product image */}
          <div className="overflow-hidden rounded-md bg-surface-container-low">
            <img
              src="/images/olive-oil-bottle-unlabeled.jpg"
              alt="500ml bottle of 2026 Martinborough Harvest Blend extra virgin olive oil"
              className="h-full max-h-[560px] w-full object-cover"
            />
          </div>

          {/* Product detail */}
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              2026 Harvest · Limited release
            </p>
            <h1 className="font-headline text-4xl leading-tight text-on-surface md:text-5xl">
              Martinborough Harvest Blend
            </h1>
            <p className="text-lg leading-relaxed text-on-surface-variant">
              Our 2026 cold-pressed extra virgin olive oil — a four-variety blend of Frantoio,
              Barnea, Leccino and Koroneiki. Bright, grassy and peppery, with a proper Martinborough
              bite. 500ml.
            </p>

            <div className="flex items-baseline gap-3">
              <span className="font-headline text-3xl text-on-surface">${UNIT_PRICE}</span>
              <span className="text-sm text-on-surface-variant">NZD · 500ml bottle</span>
            </div>

            {/* Quantity */}
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-sm font-semibold uppercase tracking-wide text-on-surface-variant">
                Quantity
              </span>
              <div className="flex items-center rounded-md border border-outline-variant/50">
                <button
                  type="button"
                  onClick={dec}
                  disabled={quantity <= 1}
                  className="px-4 py-2 text-lg text-on-surface disabled:opacity-40"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="min-w-[3rem] text-center font-semibold">{quantity}</span>
                <button
                  type="button"
                  onClick={inc}
                  disabled={quantity >= MAX_QTY}
                  className="px-4 py-2 text-lg text-on-surface disabled:opacity-40"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-on-surface-variant">= ${UNIT_PRICE * quantity} NZD</span>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                onClick={handleBuy}
                disabled={status === 'loading'}
                className="w-full sm:w-auto"
              >
                {status === 'loading' ? 'Taking you to checkout…' : 'Buy now'}
              </Button>
            </div>

            {error ? <p className="text-sm text-red-700">{error}</p> : null}

            <div className="space-y-2 border-t border-outline-variant/30 pt-6 text-sm text-on-surface-variant">
              <p>
                <strong className="text-on-surface">Got a harvest discount code?</strong> Enter it at
                checkout for 50% off.
              </p>
              <p>
                <strong className="text-on-surface">Pickup / drop-off:</strong> Wellington City only
                — no shipping. We&apos;ll be in touch to arrange a time after your order.
              </p>
              <p>
                Secure card payment via Stripe. Questions?{' '}
                <a
                  href="mailto:olivegreenmartinborough@gmail.com"
                  className="font-semibold text-primary hover:underline"
                >
                  Email us
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Shop
