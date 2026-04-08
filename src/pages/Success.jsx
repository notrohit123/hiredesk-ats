import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, CheckCircle, Loader2, XCircle } from 'lucide-react'

const API_URL = import.meta.env.PROD ? '' : 'http://localhost:3003'

export default function SuccessPage() {
  const [params] = useSearchParams()
  const sessionId = params.get('session_id')

  const [phase, setPhase] = useState('loading')
  const [email, setEmail] = useState(null)

  // On mount, call our backend to verify the Stripe session status.
  // Only fire conversion tracking if payment is confirmed as paid,
  // so we don't count failed or pending payments as Yorco conversions.
  useEffect(() => {
    if (!sessionId) {
      setPhase('error')
      return
    }

    let cancelled = false

    async function verify() {
      setPhase('loading')
      try {
        const res = await fetch(
          `${API_URL}/api/checkout/verify?session_id=${encodeURIComponent(sessionId)}`
        )
        if (!res.ok) {
          throw new Error('verify failed')
        }
        const data = await res.json()
        if (cancelled) {
          return
        }

        // Accept multiple response shapes from the verify endpoint
        const paid =
          data.paid === true ||
          data.status === 'complete' ||
          data.status === 'paid' ||
          data.payment_status === 'paid'
        const customerEmail =
          data.customer_email ??
          data.customerEmail ??
          data.email ??
          data?.customer_details?.email ??
          null

        if (paid) {
          setEmail(typeof customerEmail === 'string' ? customerEmail : null)
          setPhase('success')
          // Track the conversion through the Yorco widget SDK if it's loaded.
          // Uses optional chaining since the widget may not be initialized on
          // the success page (it's a marketing page, widget is on /app pages).
          window.yorco?.('track', 'converted')
        } else {
          setPhase('pending')
        }
      } catch {
        if (!cancelled) {
          setPhase('error')
        }
      }
    }

    verify()
    return () => {
      cancelled = true
    }
  }, [sessionId])

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-lg flex-col justify-center px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-10 text-center shadow-[0_0_80px_-20px_rgba(99,102,241,0.2)] ring-1 ring-white/5">
          {phase === 'loading' ? (
            <>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 ring-1 ring-indigo-500/25">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-500" aria-hidden />
              </div>
              <h1 className="mt-8 text-xl font-semibold text-white">Confirming your payment…</h1>
              <p className="mt-2 text-sm text-slate-400">
                This only takes a moment. Please do not close this tab.
              </p>
            </>
          ) : null}

          {phase === 'success' ? (
            <>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/15 ring-1 ring-indigo-500/35">
                <CheckCircle className="h-9 w-9 text-indigo-400" strokeWidth={2} aria-hidden />
              </div>
              <h1 className="mt-8 text-2xl font-semibold tracking-tight text-white">
                You&apos;re all set!
              </h1>
              <p className="mt-3 text-sm text-slate-400">
                Your subscription is active. Head to the dashboard and start building your hiring pipeline.
              </p>
              {email ? (
                <p className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
                  <span className="block text-xs font-medium uppercase tracking-wide text-slate-500">
                    Receipt email
                  </span>
                  <span className="mt-1 block font-medium text-white">{email}</span>
                </p>
              ) : null}
            </>
          ) : null}

          {phase === 'pending' ? (
            <>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 ring-1 ring-amber-500/25">
                <Loader2 className="h-8 w-8 animate-pulse text-amber-400" aria-hidden />
              </div>
              <h1 className="mt-8 text-xl font-semibold text-white">Payment still processing</h1>
              <p className="mt-2 text-sm text-slate-400">
                We haven&apos;t confirmed payment yet. Refresh in a minute or check your email for a
                receipt from Stripe.
              </p>
            </>
          ) : null}

          {phase === 'error' ? (
            <>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 ring-1 ring-red-500/25">
                <XCircle className="h-9 w-9 text-red-400" strokeWidth={2} aria-hidden />
              </div>
              <h1 className="mt-8 text-xl font-semibold text-white">
                {sessionId ? 'Could not verify payment' : 'Missing checkout session'}
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                {sessionId
                  ? 'The verification service returned an error. Try again from pricing or contact support.'
                  : 'Open this page from the link after checkout so we can confirm your session.'}
              </p>
            </>
          ) : null}

          <Link
            to="/app"
            className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
          >
            Go to Dashboard
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  )
}
