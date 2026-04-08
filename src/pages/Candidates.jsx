import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Calendar,
  ChevronRight,
  Clock,
  ExternalLink,
  FileText,
  Filter,
  MapPin,
  Search,
  Star,
  User,
} from 'lucide-react'

// Comprehensive mock candidate list. Each candidate has enough detail
// for both the list view and the detail page (CandidateDetail.jsx).
const CANDIDATES = [
  {
    id: 1,
    name: 'Sarah Chen',
    email: 'sarah.chen@gmail.com',
    role: 'Sr. Frontend Engineer',
    stage: 'Applied',
    rating: 0,
    location: 'San Francisco, CA',
    source: 'LinkedIn',
    appliedDate: '2026-04-06',
    experience: '7 years',
    avatar: 'SC',
    skills: ['React', 'TypeScript', 'GraphQL', 'Next.js'],
  },
  {
    id: 2,
    name: 'James Wilson',
    email: 'j.wilson@outlook.com',
    role: 'Sr. Frontend Engineer',
    stage: 'Applied',
    rating: 0,
    location: 'Remote',
    source: 'Referral',
    appliedDate: '2026-04-05',
    experience: '5 years',
    avatar: 'JW',
    skills: ['Vue.js', 'JavaScript', 'CSS', 'Figma'],
  },
  {
    id: 3,
    name: 'Priya Patel',
    email: 'priya.p@gmail.com',
    role: 'Product Designer',
    stage: 'Applied',
    rating: 0,
    location: 'New York, NY',
    source: 'Indeed',
    appliedDate: '2026-04-06',
    experience: '4 years',
    avatar: 'PP',
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
  },
  {
    id: 4,
    name: 'Marcus Brown',
    email: 'marcus.b@proton.me',
    role: 'Backend Engineer',
    stage: 'Applied',
    rating: 0,
    location: 'Austin, TX',
    source: 'Careers page',
    appliedDate: '2026-04-04',
    experience: '6 years',
    avatar: 'MB',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'AWS'],
  },
  {
    id: 5,
    name: 'Emily Zhao',
    email: 'emily.zhao@gmail.com',
    role: 'Sr. Frontend Engineer',
    stage: 'Screening',
    rating: 4,
    location: 'Seattle, WA',
    source: 'LinkedIn',
    appliedDate: '2026-04-02',
    experience: '8 years',
    avatar: 'EZ',
    skills: ['React', 'TypeScript', 'Performance', 'Accessibility'],
  },
  {
    id: 6,
    name: 'David Kim',
    email: 'd.kim@hey.com',
    role: 'Product Designer',
    stage: 'Screening',
    rating: 3,
    location: 'Los Angeles, CA',
    source: 'Dribbble',
    appliedDate: '2026-04-03',
    experience: '5 years',
    avatar: 'DK',
    skills: ['Figma', 'Sketch', 'Motion Design', 'Brand Identity'],
  },
  {
    id: 7,
    name: 'Alex Rivera',
    email: 'a.rivera@gmail.com',
    role: 'DevOps Engineer',
    stage: 'Screening',
    rating: 4,
    location: 'Remote',
    source: 'Referral',
    appliedDate: '2026-04-01',
    experience: '6 years',
    avatar: 'AR',
    skills: ['Kubernetes', 'Terraform', 'AWS', 'CI/CD'],
  },
  {
    id: 8,
    name: 'Lisa Thompson',
    email: 'lisa.t@yahoo.com',
    role: 'Backend Engineer',
    stage: 'Interview',
    rating: 5,
    location: 'Chicago, IL',
    source: 'LinkedIn',
    appliedDate: '2026-03-25',
    experience: '9 years',
    avatar: 'LT',
    skills: ['Go', 'Microservices', 'gRPC', 'Redis'],
  },
  {
    id: 9,
    name: 'Ryan O\'Connor',
    email: 'ryan.oc@gmail.com',
    role: 'Sr. Frontend Engineer',
    stage: 'Interview',
    rating: 4,
    location: 'Denver, CO',
    source: 'Referral',
    appliedDate: '2026-03-27',
    experience: '7 years',
    avatar: 'RO',
    skills: ['React', 'Node.js', 'TypeScript', 'Testing'],
  },
  {
    id: 10,
    name: 'Nina Gupta',
    email: 'nina.g@outlook.com',
    role: 'Product Designer',
    stage: 'Interview',
    rating: 4,
    location: 'Portland, OR',
    source: 'Indeed',
    appliedDate: '2026-03-29',
    experience: '6 years',
    avatar: 'NG',
    skills: ['User Research', 'Figma', 'Usability Testing', 'Wireframing'],
  },
  {
    id: 11,
    name: 'Tom Anderson',
    email: 'tom.a@gmail.com',
    role: 'DevOps Engineer',
    stage: 'Offer',
    rating: 5,
    location: 'New York, NY',
    source: 'LinkedIn',
    appliedDate: '2026-03-20',
    experience: '8 years',
    avatar: 'TA',
    skills: ['AWS', 'Docker', 'Terraform', 'Monitoring'],
  },
  {
    id: 12,
    name: 'Sofia Martinez',
    email: 'sofia.m@gmail.com',
    role: 'Backend Engineer',
    stage: 'Offer',
    rating: 5,
    location: 'Miami, FL',
    source: 'Careers page',
    appliedDate: '2026-03-18',
    experience: '7 years',
    avatar: 'SM',
    skills: ['Python', 'Django', 'PostgreSQL', 'Celery'],
  },
  {
    id: 13,
    name: 'Chris Lee',
    email: 'chris.lee@gmail.com',
    role: 'Sr. Frontend Engineer',
    stage: 'Hired',
    rating: 5,
    location: 'Remote',
    source: 'Referral',
    appliedDate: '2026-03-12',
    experience: '9 years',
    avatar: 'CL',
    skills: ['React', 'TypeScript', 'System Design', 'Mentoring'],
  },
  {
    id: 14,
    name: 'Aisha Khan',
    email: 'aisha.k@hey.com',
    role: 'Product Manager',
    stage: 'Hired',
    rating: 5,
    location: 'San Francisco, CA',
    source: 'LinkedIn',
    appliedDate: '2026-03-08',
    experience: '10 years',
    avatar: 'AK',
    skills: ['Strategy', 'Analytics', 'User Stories', 'Roadmapping'],
  },
]

// Map stage names to color styles for the badge
const STAGE_STYLES = {
  Applied: 'bg-slate-500/15 text-slate-400 ring-slate-500/20',
  Screening: 'bg-blue-500/15 text-blue-400 ring-blue-500/20',
  Interview: 'bg-amber-500/15 text-amber-400 ring-amber-500/20',
  Offer: 'bg-violet-500/15 text-violet-400 ring-violet-500/20',
  Hired: 'bg-emerald-500/15 text-emerald-400 ring-emerald-500/20',
}

export default function CandidatesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [stageFilter, setStageFilter] = useState('All')

  // Filter candidates by search query and stage filter simultaneously
  const filtered = CANDIDATES.filter((c) => {
    const matchesSearch =
      !searchQuery ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStage = stageFilter === 'All' || c.stage === stageFilter
    return matchesSearch && matchesStage
  })

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-white">Candidates</h1>
          <p className="mt-1 text-sm text-slate-400">
            {CANDIDATES.length} candidates across all open roles
          </p>
        </div>

        {/* Filters row */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden />
            <input
              type="text"
              placeholder="Search by name, role, or email…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-lg border border-white/10 bg-slate-900/50 pl-9 pr-4 text-sm text-white placeholder-slate-500 outline-none ring-1 ring-white/5 transition focus:border-indigo-500/50 focus:ring-indigo-500/20"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-500" aria-hidden />
            {['All', 'Applied', 'Screening', 'Interview', 'Offer', 'Hired'].map((stage) => (
              <button
                key={stage}
                type="button"
                onClick={() => setStageFilter(stage)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  stageFilter === stage
                    ? 'bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-500/30'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {stage}
              </button>
            ))}
          </div>
        </div>

        {/* Candidate list */}
        <div className="space-y-2">
          {filtered.map((c) => (
            <Link
              key={c.id}
              to={`/candidates/${c.id}`}
              className="group flex items-center gap-4 rounded-xl border border-white/5 bg-slate-900/40 px-4 py-3.5 transition hover:border-indigo-500/25 hover:bg-slate-900/60"
            >
              {/* Avatar */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-sm font-semibold text-indigo-300">
                {c.avatar}
              </div>

              {/* Main info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate font-medium text-white">{c.name}</p>
                  <span className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${STAGE_STYLES[c.stage]}`}>
                    {c.stage}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-xs text-slate-400">
                  {c.role} · {c.experience} · {c.location}
                </p>
              </div>

              {/* Skills tags — hidden on small screens */}
              <div className="hidden items-center gap-1.5 lg:flex">
                {c.skills.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-slate-400"
                  >
                    {skill}
                  </span>
                ))}
                {c.skills.length > 3 ? (
                  <span className="text-xs text-slate-500">+{c.skills.length - 3}</span>
                ) : null}
              </div>

              {/* Rating stars */}
              <div className="hidden items-center gap-0.5 sm:flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${i < c.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`}
                    aria-hidden
                  />
                ))}
              </div>

              {/* Source and date */}
              <div className="hidden text-right text-xs text-slate-500 md:block">
                <p>{c.source}</p>
                <p className="mt-0.5">{c.appliedDate}</p>
              </div>

              <ChevronRight className="h-4 w-4 shrink-0 text-slate-600 transition group-hover:text-indigo-400" aria-hidden />
            </Link>
          ))}

          {filtered.length === 0 ? (
            <div className="py-16 text-center text-sm text-slate-500">
              No candidates match your filters.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
