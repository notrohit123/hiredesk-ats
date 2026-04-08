import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  ExternalLink,
  FileText,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Star,
  User,
} from 'lucide-react'

// Full candidate database shared with the list page. In a real app this
// would come from an API call using the :id param. Here we just look
// up by ID in the static array.
const CANDIDATES = [
  {
    id: 1, name: 'Sarah Chen', email: 'sarah.chen@gmail.com', phone: '+1 (415) 555-0123',
    role: 'Sr. Frontend Engineer', stage: 'Applied', rating: 0, location: 'San Francisco, CA',
    source: 'LinkedIn', appliedDate: '2026-04-06', experience: '7 years', avatar: 'SC',
    skills: ['React', 'TypeScript', 'GraphQL', 'Next.js', 'Tailwind CSS', 'Jest'],
    education: 'B.S. Computer Science, UC Berkeley',
    summary: 'Full-stack engineer with 7 years building React applications at scale. Led frontend architecture at a Series B startup. Strong TypeScript and design system experience.',
    timeline: [
      { date: '2026-04-06', event: 'Application received', type: 'system' },
      { date: '2026-04-06', event: 'Resume parsed and profile created', type: 'system' },
    ],
    notes: [],
  },
  {
    id: 5, name: 'Emily Zhao', email: 'emily.zhao@gmail.com', phone: '+1 (206) 555-0456',
    role: 'Sr. Frontend Engineer', stage: 'Screening', rating: 4, location: 'Seattle, WA',
    source: 'LinkedIn', appliedDate: '2026-04-02', experience: '8 years', avatar: 'EZ',
    skills: ['React', 'TypeScript', 'Performance', 'Accessibility', 'Webpack', 'Testing Library'],
    education: 'M.S. HCI, University of Washington',
    summary: 'Accessibility-focused frontend engineer who has shipped performance-critical UIs at two FAANG companies. Deep expertise in React internals and bundle optimization.',
    timeline: [
      { date: '2026-04-02', event: 'Application received via LinkedIn', type: 'system' },
      { date: '2026-04-03', event: 'Resume reviewed — strong match', type: 'review' },
      { date: '2026-04-04', event: 'Moved to Screening', type: 'stage' },
      { date: '2026-04-05', event: 'Phone screen scheduled for April 10', type: 'schedule' },
    ],
    notes: [
      { author: 'Mike (Recruiter)', date: '2026-04-03', text: 'Really impressive background. Has led accessibility initiatives at two major companies. Recommend fast-tracking to phone screen.' },
      { author: 'Sarah (Hiring Manager)', date: '2026-04-04', text: 'Agreed. Her portfolio shows exactly the kind of performance work we need. Let\'s schedule the screen this week.' },
    ],
  },
  {
    id: 8, name: 'Lisa Thompson', email: 'lisa.t@yahoo.com', phone: '+1 (312) 555-0789',
    role: 'Backend Engineer', stage: 'Interview', rating: 5, location: 'Chicago, IL',
    source: 'LinkedIn', appliedDate: '2026-03-25', experience: '9 years', avatar: 'LT',
    skills: ['Go', 'Microservices', 'gRPC', 'Redis', 'PostgreSQL', 'Kubernetes'],
    education: 'B.S. Computer Engineering, UIUC',
    summary: 'Systems-minded backend engineer who has built and operated high-throughput services handling 50K+ RPS. Excellent communicator with experience mentoring junior engineers.',
    timeline: [
      { date: '2026-03-25', event: 'Application received', type: 'system' },
      { date: '2026-03-26', event: 'Resume reviewed — strong match', type: 'review' },
      { date: '2026-03-27', event: 'Moved to Screening', type: 'stage' },
      { date: '2026-03-28', event: 'Phone screen completed', type: 'schedule' },
      { date: '2026-03-29', event: 'Moved to Interview — phone screen went great', type: 'stage' },
      { date: '2026-04-02', event: 'Technical interview scheduled for April 8', type: 'schedule' },
      { date: '2026-04-05', event: 'Technical interview completed', type: 'schedule' },
    ],
    notes: [
      { author: 'Mike (Recruiter)', date: '2026-03-26', text: 'Extensive Go and microservices experience. Exactly what the backend team is looking for.' },
      { author: 'Dave (Eng Lead)', date: '2026-03-29', text: 'Phone screen was excellent. She walked through her system design at her current company — very thorough. Moving to on-site.' },
      { author: 'Dave (Eng Lead)', date: '2026-04-05', text: 'Crushed the technical round. Clean code, great communication, asked thoughtful questions about our architecture. Strong hire recommendation.' },
    ],
  },
  {
    id: 11, name: 'Tom Anderson', email: 'tom.a@gmail.com', phone: '+1 (917) 555-0321',
    role: 'DevOps Engineer', stage: 'Offer', rating: 5, location: 'New York, NY',
    source: 'LinkedIn', appliedDate: '2026-03-20', experience: '8 years', avatar: 'TA',
    skills: ['AWS', 'Docker', 'Terraform', 'Monitoring', 'CI/CD', 'Security'],
    education: 'B.S. Information Systems, NYU',
    summary: 'Infrastructure engineer who has built cloud-native platforms for three startups from zero to production. Strong in security and compliance (SOC 2, HIPAA).',
    timeline: [
      { date: '2026-03-20', event: 'Application received', type: 'system' },
      { date: '2026-03-21', event: 'Resume reviewed', type: 'review' },
      { date: '2026-03-22', event: 'Moved to Screening', type: 'stage' },
      { date: '2026-03-24', event: 'Phone screen completed', type: 'schedule' },
      { date: '2026-03-25', event: 'Moved to Interview', type: 'stage' },
      { date: '2026-03-28', event: 'Technical + system design interview completed', type: 'schedule' },
      { date: '2026-04-01', event: 'Team fit interview completed', type: 'schedule' },
      { date: '2026-04-02', event: 'Moved to Offer', type: 'stage' },
      { date: '2026-04-03', event: 'Offer letter sent — $165K base + equity', type: 'system' },
    ],
    notes: [
      { author: 'Mike (Recruiter)', date: '2026-03-21', text: 'Built infra for two YC companies. Deep Terraform and AWS expertise.' },
      { author: 'CTO', date: '2026-04-02', text: 'Unanimous hire decision. Offer approved at $165K + 0.1% equity. He mentioned he has another offer expiring April 10, so let\'s move fast.' },
    ],
  },
]

// Stage badge colors — same mapping as the list page
const STAGE_STYLES = {
  Applied: 'bg-slate-500/15 text-slate-400 ring-slate-500/20',
  Screening: 'bg-blue-500/15 text-blue-400 ring-blue-500/20',
  Interview: 'bg-amber-500/15 text-amber-400 ring-amber-500/20',
  Offer: 'bg-violet-500/15 text-violet-400 ring-violet-500/20',
  Hired: 'bg-emerald-500/15 text-emerald-400 ring-emerald-500/20',
}

// Timeline event type icons so each event is visually distinct
const EVENT_ICONS = {
  system: FileText,
  review: Star,
  stage: ChevronRight,
  schedule: Calendar,
}

export default function CandidateDetail() {
  const { id } = useParams()
  const candidate = CANDIDATES.find((c) => c.id === Number(id))

  // If the candidate ID doesn't match any mock data, show a fallback
  if (!candidate) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-slate-950">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <User className="mx-auto h-12 w-12 text-slate-600" aria-hidden />
          <h1 className="mt-4 text-xl font-semibold text-white">Candidate not found</h1>
          <p className="mt-2 text-sm text-slate-400">
            This demo only has detailed profiles for a few candidates.
          </p>
          <Link
            to="/candidates"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-indigo-400 transition hover:text-indigo-300"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to candidates
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          to="/candidates"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-400 transition hover:text-indigo-400"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          All Candidates
        </Link>

        {/* Profile header */}
        <div className="mb-8 flex flex-col gap-6 rounded-xl border border-white/10 bg-slate-900/40 p-6 ring-1 ring-white/5 sm:flex-row sm:items-start">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/20 text-xl font-bold text-indigo-300">
            {candidate.avatar}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold text-white">{candidate.name}</h1>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${STAGE_STYLES[candidate.stage]}`}>
                {candidate.stage}
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-400">{candidate.role}</p>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" aria-hidden />{candidate.email}</span>
              {candidate.phone ? <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" aria-hidden />{candidate.phone}</span> : null}
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" aria-hidden />{candidate.location}</span>
              <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" aria-hidden />{candidate.experience}</span>
              <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" aria-hidden />Applied {candidate.appliedDate}</span>
            </div>
            {/* Rating */}
            <div className="mt-3 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < candidate.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`}
                  aria-hidden
                />
              ))}
              {candidate.rating > 0 ? (
                <span className="ml-1 text-xs text-slate-400">{candidate.rating}/5</span>
              ) : (
                <span className="ml-1 text-xs text-slate-500">Not rated yet</span>
              )}
            </div>
          </div>
          <div className="flex shrink-0 gap-2">
            <button type="button" className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/5">
              <Mail className="h-3.5 w-3.5" aria-hidden />
              Email
            </button>
            <button type="button" className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-400">
              <ChevronRight className="h-3.5 w-3.5" aria-hidden />
              Advance Stage
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left column: summary, skills, education */}
          <div className="space-y-6 lg:col-span-2">
            {/* Summary */}
            <section className="rounded-xl border border-white/10 bg-slate-900/40 p-6 ring-1 ring-white/5">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">Summary</h2>
              <p className="text-sm leading-relaxed text-slate-300">{candidate.summary}</p>
            </section>

            {/* Skills */}
            <section className="rounded-xl border border-white/10 bg-slate-900/40 p-6 ring-1 ring-white/5">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill) => (
                  <span key={skill} className="rounded-lg bg-indigo-500/10 px-3 py-1 text-sm text-indigo-300 ring-1 ring-indigo-500/20">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Notes */}
            <section className="rounded-xl border border-white/10 bg-slate-900/40 p-6 ring-1 ring-white/5">
              <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
                <MessageSquare className="h-4 w-4" aria-hidden />
                Team Notes ({candidate.notes.length})
              </h2>
              {candidate.notes.length > 0 ? (
                <div className="space-y-4">
                  {candidate.notes.map((note, i) => (
                    <div key={i} className="rounded-lg border border-white/5 bg-slate-950/50 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-indigo-300">{note.author}</span>
                        <span className="text-xs text-slate-500">{note.date}</span>
                      </div>
                      <p className="text-sm leading-relaxed text-slate-300">{note.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">No notes yet. Be the first to leave feedback.</p>
              )}
            </section>
          </div>

          {/* Right column: timeline, education, source */}
          <div className="space-y-6">
            {/* Activity timeline */}
            <section className="rounded-xl border border-white/10 bg-slate-900/40 p-6 ring-1 ring-white/5">
              <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
                <Clock className="h-4 w-4" aria-hidden />
                Timeline
              </h2>
              <ol className="space-y-4">
                {candidate.timeline.map((entry, i) => {
                  const Icon = EVENT_ICONS[entry.type] || FileText
                  return (
                    <li key={i} className="flex gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/5">
                        <Icon className="h-3.5 w-3.5 text-slate-400" aria-hidden />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-300">{entry.event}</p>
                        <p className="text-xs text-slate-500">{entry.date}</p>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </section>

            {/* Education */}
            <section className="rounded-xl border border-white/10 bg-slate-900/40 p-6 ring-1 ring-white/5">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">Education</h2>
              <p className="text-sm text-slate-300">{candidate.education}</p>
            </section>

            {/* Source */}
            <section className="rounded-xl border border-white/10 bg-slate-900/40 p-6 ring-1 ring-white/5">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">Source</h2>
              <div className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-indigo-400" aria-hidden />
                <span className="text-sm text-slate-300">{candidate.source}</span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
