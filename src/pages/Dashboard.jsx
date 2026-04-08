import { useState } from 'react'
import {
  Briefcase,
  ChevronRight,
  Clock,
  GripVertical,
  MapPin,
  MoreHorizontal,
  Plus,
  TrendingUp,
  User,
  Users,
} from 'lucide-react'

// Pipeline stages in the order they appear on the board. Each stage has a
// color scheme used for the header pill and card accent line. The key matches
// what we use in the candidate data below.
const STAGES = [
  { key: 'applied', label: 'Applied', color: 'bg-slate-500', textColor: 'text-slate-400', accent: 'border-l-slate-500' },
  { key: 'screening', label: 'Screening', color: 'bg-blue-500', textColor: 'text-blue-400', accent: 'border-l-blue-500' },
  { key: 'interview', label: 'Interview', color: 'bg-amber-500', textColor: 'text-amber-400', accent: 'border-l-amber-500' },
  { key: 'offer', label: 'Offer', color: 'bg-violet-500', textColor: 'text-violet-400', accent: 'border-l-violet-500' },
  { key: 'hired', label: 'Hired', color: 'bg-emerald-500', textColor: 'text-emerald-400', accent: 'border-l-emerald-500' },
]

// Mock candidate data spread across pipeline stages. Each candidate has
// enough detail to make the kanban cards look realistic.
const INITIAL_CANDIDATES = [
  { id: 1, name: 'Sarah Chen', role: 'Sr. Frontend Engineer', stage: 'applied', days: 1, source: 'LinkedIn', avatar: 'SC' },
  { id: 2, name: 'James Wilson', role: 'Sr. Frontend Engineer', stage: 'applied', days: 2, source: 'Referral', avatar: 'JW' },
  { id: 3, name: 'Priya Patel', role: 'Product Designer', stage: 'applied', days: 1, source: 'Indeed', avatar: 'PP' },
  { id: 4, name: 'Marcus Brown', role: 'Backend Engineer', stage: 'applied', days: 3, source: 'Careers page', avatar: 'MB' },
  { id: 5, name: 'Emily Zhao', role: 'Sr. Frontend Engineer', stage: 'screening', days: 5, source: 'LinkedIn', avatar: 'EZ' },
  { id: 6, name: 'David Kim', role: 'Product Designer', stage: 'screening', days: 4, source: 'Dribbble', avatar: 'DK' },
  { id: 7, name: 'Alex Rivera', role: 'DevOps Engineer', stage: 'screening', days: 6, source: 'Referral', avatar: 'AR' },
  { id: 8, name: 'Lisa Thompson', role: 'Backend Engineer', stage: 'interview', days: 12, source: 'LinkedIn', avatar: 'LT' },
  { id: 9, name: 'Ryan O\'Connor', role: 'Sr. Frontend Engineer', stage: 'interview', days: 10, source: 'Referral', avatar: 'RO' },
  { id: 10, name: 'Nina Gupta', role: 'Product Designer', stage: 'interview', days: 8, source: 'Indeed', avatar: 'NG' },
  { id: 11, name: 'Tom Anderson', role: 'DevOps Engineer', stage: 'offer', days: 18, source: 'LinkedIn', avatar: 'TA' },
  { id: 12, name: 'Sofia Martinez', role: 'Backend Engineer', stage: 'offer', days: 20, source: 'Careers page', avatar: 'SM' },
  { id: 13, name: 'Chris Lee', role: 'Sr. Frontend Engineer', stage: 'hired', days: 25, source: 'Referral', avatar: 'CL' },
  { id: 14, name: 'Aisha Khan', role: 'Product Manager', stage: 'hired', days: 30, source: 'LinkedIn', avatar: 'AK' },
]

// Summary stats shown above the kanban board. Gives a quick snapshot of
// overall pipeline health.
const QUICK_STATS = [
  { label: 'Open Roles', value: '8', icon: Briefcase, change: '+2 this week' },
  { label: 'Active Candidates', value: '47', icon: Users, change: '+12 this week' },
  { label: 'Avg. Time to Hire', value: '23d', icon: Clock, change: '-3d vs last month' },
  { label: 'Offer Rate', value: '18%', icon: TrendingUp, change: '+4% vs last month' },
]

export default function Dashboard() {
  const [candidates] = useState(INITIAL_CANDIDATES)

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950">
      <div className="mx-auto max-w-[90rem] px-4 py-8 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">Hiring Pipeline</h1>
            <p className="mt-1 text-sm text-slate-400">
              Drag candidates across stages to update their status.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400"
          >
            <Plus className="h-4 w-4" aria-hidden />
            Add Candidate
          </button>
        </div>

        {/* Quick stats row */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_STATS.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="rounded-xl border border-white/10 bg-slate-900/50 p-5 ring-1 ring-white/5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-400">{stat.label}</span>
                  <Icon className="h-4 w-4 text-slate-500" aria-hidden />
                </div>
                <p className="mt-2 text-2xl font-semibold text-white">{stat.value}</p>
                <p className="mt-1 text-xs text-indigo-400">{stat.change}</p>
              </div>
            )
          })}
        </div>

        {/* Kanban board — horizontal scroll on narrow screens */}
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4" style={{ minWidth: STAGES.length * 280 }}>
            {STAGES.map((stage) => {
              const stageCards = candidates.filter((c) => c.stage === stage.key)
              return (
                <div
                  key={stage.key}
                  className="flex w-72 shrink-0 flex-col rounded-xl border border-white/10 bg-slate-900/30"
                >
                  {/* Column header with stage name and count */}
                  <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${stage.color}`} />
                      <h3 className="text-sm font-semibold text-white">{stage.label}</h3>
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium text-slate-400">
                        {stageCards.length}
                      </span>
                    </div>
                    <button type="button" className="rounded p-1 text-slate-500 transition hover:bg-white/5 hover:text-white">
                      <Plus className="h-4 w-4" aria-hidden />
                    </button>
                  </div>

                  {/* Candidate cards stacked vertically */}
                  <div className="flex flex-1 flex-col gap-2 p-2">
                    {stageCards.map((c) => (
                      <div
                        key={c.id}
                        className={`group cursor-pointer rounded-lg border border-white/5 bg-slate-900/60 p-3 transition hover:border-indigo-500/30 hover:bg-slate-800/60 ${stage.accent} border-l-2`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2.5">
                            {/* Avatar circle with initials */}
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-xs font-semibold text-indigo-300">
                              {c.avatar}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">{c.name}</p>
                              <p className="text-xs text-slate-400">{c.role}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="rounded p-1 text-slate-600 opacity-0 transition group-hover:opacity-100 hover:bg-white/5 hover:text-white"
                          >
                            <MoreHorizontal className="h-3.5 w-3.5" aria-hidden />
                          </button>
                        </div>
                        <div className="mt-2.5 flex items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" aria-hidden />
                            {c.days}d
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" aria-hidden />
                            {c.source}
                          </span>
                        </div>
                      </div>
                    ))}

                    {/* Empty state for columns with no candidates */}
                    {stageCards.length === 0 ? (
                      <div className="flex flex-1 items-center justify-center py-8 text-xs text-slate-600">
                        No candidates
                      </div>
                    ) : null}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
