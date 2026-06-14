import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Seo from '../components/Seo'

const ShopSuccess = () => {
  return (
    <div className="min-h-screen bg-surface font-body text-on-surface">
      <Seo
        title="Order confirmed — Olive Green Martinborough"
        description="Thanks for your order of the 2026 Martinborough Harvest Blend."
        path="/shop/success"
      />
      <section className="flex min-h-[60vh] items-center px-8 py-16">
        <div className="mx-auto max-w-xl space-y-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Thank you
          </p>
          <h1 className="font-headline text-4xl leading-tight text-on-surface md:text-5xl">
            Your order&apos;s confirmed.
          </h1>
          <p className="text-lg leading-relaxed text-on-surface-variant">
            Thanks for supporting the grove — your payment went through and a receipt is on its way
            to your email. We&apos;ll be in touch shortly to arrange pickup or local drop-off in
            Wellington City.
          </p>
          <p className="text-on-surface-variant">
            Any questions, just reply to your receipt or email{' '}
            <a
              href="mailto:olivegreenmartinborough@gmail.com"
              className="font-semibold text-primary hover:underline"
            >
              olivegreenmartinborough@gmail.com
            </a>
            .
          </p>
          <div className="pt-4">
            <Link to="/">
              <Button variant="secondary">Back to home</Button>
            </Link>
          </div>
          <p className="pt-2 font-headline text-xl italic text-brand-secondary">Peter &amp; Matt</p>
        </div>
      </section>
    </div>
  )
}

export default ShopSuccess
