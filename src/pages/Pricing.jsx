import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Loader2, Sparkles } from 'lucide-react'

// Same-origin in production (Express serves both API and SPA from dist/).
// In dev, Vite runs on :5173 and Express on :3003, so we point at the server.
const API_BASE = import.meta.env.PROD ? '' : 'http://localhost:3003'

// Using the shared Stripe test price for now. Replace with real per-tier
// price IDs when you create separate products in Stripe.
const PRO_PRICE_ID = 'price_1TFwoYC1G4JikVULFdw1MZs6'
const ENTERPRISE_PRICE_ID = 'price_1TFwoYC1G4JikVULFdw1MZs6'

const TIERS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'For small teams getting started with structured hiring.',
    cta: 'link',
    href: '/app',
    features: [
      'Up to 3 active jobs',
      'Basic pipeline board',
      'Candidate profiles',
      'Email notifications',
      '1 team member',
    ],
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'Full-featured ATS for growing recruitment teams.',
    cta: 'checkout',
    priceId: PRO_PRICE_ID,
    features: [
      'Unlimited active jobs',
      'Custom pipeline stages',
      'Interview scheduling',
      'Scorecards & feedback',
      'Hiring analytics',
      'Up to 10 team members',
      'Priority support',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: '/month',
    description: 'Advanced controls and analytics for scaling orgs.',
    cta: 'checkout',
    priceId: ENTERPRISE_PRICE_ID,
    features: [
      'Everything in Pro',
      'Unlimited team members',
      'SSO & SAML',
      'Custom roles & permissions',
      'API access',
      'Advanced compliance tools',
      'Dedicated account manager',
      'SLA guarantee',
    ],
    highlighted: false,
  },
]

export default function PricingPage() {
  const [redirectingId, setRedirectingId] = useState(null)

  // Sends the selected priceId to our Express server, which creates a
  // Stripe Checkout session and returns the redirect URL. The user lands
  // on Stripe's hosted page to complete payment.
  async function startCheckout(priceId, tierKey) {
    setRedirectingId(tierKey)
    try {
      const res = await fetch(`${API_BASE}/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      })
      if (!res.ok) {
        throw new Error(`Checkout failed (${res.status})`)
      }
      const data = await res.json()
      const url = data.url ?? data.checkoutUrl
      if (!url || typeof url !== 'string') {
        throw new Error('No checkout URL in response')
      }
      window.location.assign(url)
    } catch {
      setRedirectingId(null)
      alert('Could not start checkout. Is the billing API running?')
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-white">
      <div className="relative overflow-hidden">
        {/* Ambient indigo glow behind the pricing cards */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden
          style={{
            backgroundImage:
              'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,102,241,0.22), transparent)',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500">
              Pricing
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Plans that grow with your team
            </h1>
            <p className="mt-4 text-sm text-slate-400 sm:text-base">
              Start free—upgrade when structured hiring and analytics become critical to your process.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-6xl gap-6 lg:grid-cols-3 lg:gap-8">
            {TIERS.map((tier) => {
              const tierKey = tier.name
              const isBusy = redirectingId === tierKey

              return (
                <div
                  key={tier.name}
                  className={
                    tier.highlighted
                      ? 'relative flex flex-col rounded-2xl border border-indigo-500/40 bg-slate-900/60 p-8 shadow-[0_0_60px_-15px_rgba(99,102,241,0.35)] ring-1 ring-indigo-500/20'
                      : 'relative flex flex-col rounded-2xl border border-white/10 bg-slate-900/40 p-8 ring-1 ring-white/5'
                  }
                >
                  {tier.highlighted ? (
                    <div className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-indigo-500 px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-indigo-500/30">
                      <Sparkles className="h-3.5 w-3.5" aria-hidden />
                      Most Popular
                    </div>
                  ) : null}

                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-white">{tier.name}</h2>
                    <p className="mt-2 text-sm text-slate-400">{tier.description}</p>
                    <div className="mt-6 flex items-baseline gap-1">
                      <span className="text-4xl font-semibold tracking-tight text-white">
                        {tier.price}
                      </span>
                      <span className="text-sm text-slate-500">{tier.period}</span>
                    </div>
                  </div>

                  <ul className="mb-8 flex-1 space-y-3 text-sm text-slate-300">
                    {tier.features.map((f) => (
                      <li key={f} className="flex gap-3">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500"
                          strokeWidth={2.5}
                          aria-hidden
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {tier.cta === 'link' ? (
                    <Link
                      to={tier.href}
                      className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] text-sm font-semibold text-white transition hover:border-indigo-500/40 hover:bg-indigo-500/10"
                    >
                      Get started
                    </Link>
                  ) : (
                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() => startCheckout(tier.priceId, tierKey)}
                      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isBusy ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                          Redirecting…
                        </>
                      ) : (
                        <>Subscribe to {tier.name}</>
                      )}
                    </button>
                  )}
                </div>
              )
            })}
          </div>

          <p className="mx-auto mt-12 max-w-xl text-center text-xs text-slate-500">
            Taxes may apply. Secure checkout is handled by Stripe. You can change or cancel your plan
            from billing settings.
          </p>
        </div>
      </div>
    </div>
  )
}
