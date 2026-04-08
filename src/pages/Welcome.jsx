import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react'

export default function WelcomePage() {
  const tracked = useRef(false)

  // fire the trial_started event exactly once when the page mounts.
  // this tells the Yorco widget SDK that a new user just signed up,
  // so the tenant can see trial signups in their analytics dashboard.
  // using a ref guard to prevent duplicate tracking from React strict
  // mode double-mounting in dev.
  useEffect(() => {
    if (tracked.current) {
      return
    }
    tracked.current = true

    // the widget SDK attaches window.yorco during init. if for some
    // reason it hasn't loaded yet (ad blocker, slow network), the
    // optional chaining silently skips the call instead of crashing.
    if (typeof window.yorco === 'function') {
      window.yorco('track', 'trial_started')
    }
  }, [])

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-950 px-4 py-16">
      <div className="w-full max-w-lg text-center">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-10 shadow-[0_0_80px_-20px_rgba(99,102,241,0.2)] ring-1 ring-white/5">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/15 ring-1 ring-indigo-500/35">
            <CheckCircle className="h-9 w-9 text-indigo-400" strokeWidth={2} aria-hidden />
          </div>

          <h1 className="mt-8 text-2xl font-semibold tracking-tight text-white">
            Your account is ready!
          </h1>
          <p className="mt-3 text-sm text-slate-400">
            Welcome to HireDesk. Your free trial is active — no credit card needed.
          </p>

          <div className="mx-auto mt-8 max-w-sm rounded-xl border border-white/10 bg-white/[0.03] p-5 text-left">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Quick Start
            </div>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-indigo-400">1.</span>
                Post your first job opening
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-indigo-400">2.</span>
                Add candidates to your pipeline
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-indigo-400">3.</span>
                Invite your hiring team
              </li>
            </ul>
          </div>

          <Link
            to="/app"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
          >
            Go to Dashboard
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  )
}
