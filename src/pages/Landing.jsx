import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  GitBranch,
  KanbanSquare,
  LayoutDashboard,
  LineChart,
  Mail,
  Play,
  Search,
  Shield,
  Sparkles,
  UserCheck,
  UserPlus,
  Users,
  Zap,
} from 'lucide-react'

// Steps shown in the "How it works" section. Each step maps to a core
// workflow in the ATS: post a job, collect applicants, run them through
// the pipeline, then close with an offer.
const howItWorks = [
  {
    title: 'Post a Job',
    body: 'Create a listing in seconds with templates for engineering, sales, design, and ops. Push to job boards with one click.',
    icon: FileText,
  },
  {
    title: 'Collect Applicants',
    body: 'Applications flow in from your career page, LinkedIn, Indeed, and referrals—all in one unified inbox.',
    icon: UserPlus,
  },
  {
    title: 'Run Your Pipeline',
    body: 'Drag candidates through Applied, Screening, Interview, Offer, and Hired stages on a visual kanban board.',
    icon: KanbanSquare,
  },
  {
    title: 'Close the Hire',
    body: 'Send offer letters, collect signatures, and onboard—without leaving HireDesk.',
    icon: UserCheck,
  },
]

// Feature cards for the grid section. These highlight the key capabilities
// that differentiate HireDesk from spreadsheets and basic trackers.
const featureCards = [
  {
    title: 'Visual Pipeline',
    description: 'Kanban board with drag-and-drop stages so your whole team sees where every candidate stands.',
    icon: KanbanSquare,
  },
  {
    title: 'Job Board Sync',
    description: 'Post once, distribute everywhere. LinkedIn, Indeed, Glassdoor, and your own careers page.',
    icon: Building2,
  },
  {
    title: 'Smart Scheduling',
    description: 'Automated interview scheduling that checks availability across hiring managers and candidates.',
    icon: Calendar,
  },
  {
    title: 'Candidate Profiles',
    description: 'Resumes, scorecards, notes, and timeline in one place. No more digging through email threads.',
    icon: FileText,
  },
  {
    title: 'Team Collaboration',
    description: 'Tag reviewers, leave feedback, and make decisions together with structured scorecards.',
    icon: Users,
  },
  {
    title: 'Hiring Analytics',
    description: 'Time-to-hire, source effectiveness, pipeline bottlenecks, and diversity metrics at a glance.',
    icon: LineChart,
  },
]

// Stats shown in the social proof banner. Numbers are aspirational /
// illustrative for this demo app.
const stats = [
  { value: '4,200+', label: 'Companies hiring' },
  { value: '38%', label: 'Faster time-to-hire' },
  { value: '2.1M', label: 'Candidates processed' },
]

function Landing() {
  return (
    <main className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background glow — large indigo blobs for the premium dark look */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-1/4 top-0 h-[520px] w-[520px] rounded-full bg-indigo-500/20 blur-[120px]" />
        <div className="absolute -right-1/4 top-1/3 h-[480px] w-[480px] rounded-full bg-indigo-600/15 blur-[100px]" />
        <div className="absolute bottom-0 left-1/2 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[90px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8 lg:pb-32 lg:pt-24">
        {/* -------- Hero -------- */}
        <section className="mx-auto max-w-4xl text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/25 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-indigo-400">
            <Zap className="h-3.5 w-3.5" aria-hidden />
            Modern applicant tracking
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.08]">
            Hire the right people,{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              faster
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl">
            Stop losing candidates to slow processes. HireDesk gives your team a visual pipeline,
            automated scheduling, and real-time analytics so you can go from posting to offer letter
            in days—not months.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
            <Link
              to="/signup"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-8 py-3.5 text-base font-semibold text-white shadow-[0_0_40px_-8px_rgba(99,102,241,0.55)] transition hover:bg-indigo-400 sm:w-auto"
            >
              Try Free
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
            <Link
              to="/pricing"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition hover:border-indigo-500/40 hover:bg-white/10 sm:w-auto"
            >
              <Play className="h-5 w-5 text-indigo-400" aria-hidden />
              View Pricing
            </Link>
          </div>
        </section>

        {/* -------- How it works -------- */}
        <section className="mx-auto mt-28 max-w-6xl" aria-labelledby="how-heading">
          <div className="text-center">
            <h2 id="how-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl">
              How it works
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-400">
              Four steps from open requisition to signed offer letter.
            </p>
          </div>
          <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step, index) => {
              const Icon = step.icon
              return (
                <li
                  key={step.title}
                  className="group relative rounded-2xl border border-white/10 bg-slate-900/40 p-6 shadow-xl shadow-black/20 ring-1 ring-white/5 backdrop-blur-sm transition hover:border-indigo-500/30 hover:ring-indigo-500/20"
                >
                  <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-400 ring-1 ring-indigo-500/25 transition group-hover:bg-indigo-500/25">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-500/90">
                    Step {index + 1}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.body}</p>
                </li>
              )
            })}
          </ol>
        </section>

        {/* -------- Features grid -------- */}
        <section className="mx-auto mt-28 max-w-6xl" aria-labelledby="features-heading">
          <div className="text-center">
            <h2 id="features-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything you need to hire well
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-400">
              From sourcing to onboarding, HireDesk covers the full recruitment lifecycle.
            </p>
          </div>
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((card) => {
              const Icon = card.icon
              return (
                <li
                  key={card.title}
                  className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-transparent p-6 transition hover:border-indigo-500/25"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-400">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{card.description}</p>
                </li>
              )
            })}
          </ul>
        </section>

        {/* -------- Stats / social proof -------- */}
        <section className="mx-auto mt-28 max-w-5xl">
          <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.06] px-8 py-12 ring-1 ring-indigo-500/10">
            <div className="text-center">
              <Briefcase className="mx-auto h-10 w-10 text-indigo-400" aria-hidden />
              <p className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Trusted by hiring teams everywhere
              </p>
              <p className="mx-auto mt-3 max-w-xl text-slate-300">
                From seed-stage startups to public companies, teams use HireDesk to build world-class organizations.
              </p>
            </div>
            <dl className="mt-10 grid gap-8 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <dt className="text-3xl font-bold tracking-tight text-indigo-400">{stat.value}</dt>
                  <dd className="mt-1 text-sm text-slate-400">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* -------- CTA banner -------- */}
        <section className="mx-auto mt-28 max-w-4xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to fix your hiring?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Start for free. No credit card required. Set up your first job posting in under two minutes.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
            <Link
              to="/signup"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-8 py-3.5 text-base font-semibold text-white shadow-[0_0_40px_-8px_rgba(99,102,241,0.55)] transition hover:bg-indigo-400 sm:w-auto"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
            <Link
              to="/features"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition hover:border-indigo-500/40 hover:bg-white/10 sm:w-auto"
            >
              See All Features
            </Link>
          </div>
        </section>
      </div>

      {/* -------- Footer -------- */}
      <footer className="relative border-t border-white/10 bg-slate-950/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/15 ring-1 ring-indigo-500/30">
              <Briefcase className="h-5 w-5 text-indigo-500" aria-hidden />
            </span>
            <span className="font-semibold text-white">HireDesk</span>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-400" aria-label="Footer">
            <Link to="/features" className="transition hover:text-indigo-400">Features</Link>
            <Link to="/pricing" className="transition hover:text-indigo-400">Pricing</Link>
            <Link to="/app" className="transition hover:text-indigo-400">Pipeline</Link>
            <Link to="/jobs" className="transition hover:text-indigo-400">Jobs</Link>
            <Link to="/candidates" className="transition hover:text-indigo-400">Candidates</Link>
            <Link to="/reports" className="transition hover:text-indigo-400">Reports</Link>
          </nav>
          <p className="text-sm text-slate-500 lg:text-right">
            &copy; {new Date().getFullYear()} HireDesk. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}

export default Landing
