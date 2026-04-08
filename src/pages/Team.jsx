import { useState } from 'react'
import {
  Award,
  Briefcase,
  Calendar,
  ChevronDown,
  Clock,
  Crown,
  Mail,
  MoreHorizontal,
  Plus,
  Shield,
  Star,
  User,
  UserCheck,
  Users,
} from 'lucide-react'

// Mock team data representing the people involved in the hiring process.
// Each member has a role type that determines their permissions and what
// they see in the ATS (hiring managers own jobs, recruiters own pipeline,
// interviewers give feedback).
const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Rachel Torres',
    email: 'rachel@hiredesk.demo',
    title: 'VP of Engineering',
    role: 'Hiring Manager',
    avatar: 'RT',
    activeJobs: 3,
    hires: 12,
    avgDays: 21,
    joinedDate: '2025-06-15',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Mike Chen',
    email: 'mike@hiredesk.demo',
    title: 'Senior Recruiter',
    role: 'Recruiter',
    avatar: 'MC',
    activeJobs: 6,
    hires: 28,
    avgDays: 19,
    joinedDate: '2025-08-01',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Sarah Kim',
    email: 'sarah@hiredesk.demo',
    title: 'Head of Design',
    role: 'Hiring Manager',
    avatar: 'SK',
    activeJobs: 2,
    hires: 8,
    avgDays: 24,
    joinedDate: '2025-09-10',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Dave O\'Brien',
    email: 'dave@hiredesk.demo',
    title: 'Engineering Lead',
    role: 'Interviewer',
    avatar: 'DO',
    activeJobs: 0,
    hires: 0,
    avgDays: 0,
    interviews: 34,
    joinedDate: '2025-10-01',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Alicia Pham',
    email: 'alicia@hiredesk.demo',
    title: 'Recruiting Coordinator',
    role: 'Recruiter',
    avatar: 'AP',
    activeJobs: 4,
    hires: 15,
    avgDays: 22,
    joinedDate: '2025-11-15',
    status: 'Active',
  },
  {
    id: 6,
    name: 'Carlos Mendez',
    email: 'carlos@hiredesk.demo',
    title: 'CTO',
    role: 'Hiring Manager',
    avatar: 'CM',
    activeJobs: 1,
    hires: 5,
    avgDays: 18,
    joinedDate: '2025-06-01',
    status: 'Active',
  },
  {
    id: 7,
    name: 'Jessica Wang',
    email: 'jessica@hiredesk.demo',
    title: 'Senior Engineer',
    role: 'Interviewer',
    avatar: 'JW',
    activeJobs: 0,
    hires: 0,
    avgDays: 0,
    interviews: 22,
    joinedDate: '2026-01-10',
    status: 'Active',
  },
  {
    id: 8,
    name: 'Nathan Brooks',
    email: 'nathan@hiredesk.demo',
    title: 'Sales Director',
    role: 'Hiring Manager',
    avatar: 'NB',
    activeJobs: 2,
    hires: 6,
    avgDays: 16,
    joinedDate: '2025-07-20',
    status: 'Active',
  },
  {
    id: 9,
    name: 'Emily Foster',
    email: 'emily@hiredesk.demo',
    title: 'Product Manager',
    role: 'Interviewer',
    avatar: 'EF',
    activeJobs: 0,
    hires: 0,
    avgDays: 0,
    interviews: 18,
    joinedDate: '2026-02-01',
    status: 'Active',
  },
  {
    id: 10,
    name: 'Raj Kapoor',
    email: 'raj@hiredesk.demo',
    title: 'Contract Recruiter',
    role: 'Recruiter',
    avatar: 'RK',
    activeJobs: 2,
    hires: 3,
    avgDays: 25,
    joinedDate: '2026-03-01',
    status: 'Invited',
  },
]

// Map role names to visual styles for the role badge
const ROLE_STYLES = {
  'Hiring Manager': { bg: 'bg-violet-500/15 text-violet-400 ring-violet-500/20', icon: Crown },
  Recruiter: { bg: 'bg-indigo-500/15 text-indigo-400 ring-indigo-500/20', icon: UserCheck },
  Interviewer: { bg: 'bg-amber-500/15 text-amber-400 ring-amber-500/20', icon: Award },
}

const STATUS_STYLES = {
  Active: 'bg-emerald-500/15 text-emerald-400',
  Invited: 'bg-amber-500/15 text-amber-400',
}

export default function TeamPage() {
  const [roleFilter, setRoleFilter] = useState('All')

  const filtered = TEAM_MEMBERS.filter(
    (m) => roleFilter === 'All' || m.role === roleFilter
  )

  // Count each role for the summary cards
  const roleCounts = TEAM_MEMBERS.reduce((acc, m) => {
    acc[m.role] = (acc[m.role] || 0) + 1
    return acc
  }, {})

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">Hiring Team</h1>
            <p className="mt-1 text-sm text-slate-400">
              {TEAM_MEMBERS.length} members across {Object.keys(roleCounts).length} roles
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400"
          >
            <Plus className="h-4 w-4" aria-hidden />
            Invite Member
          </button>
        </div>

        {/* Role summary cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {Object.entries(ROLE_STYLES).map(([role, style]) => {
            const Icon = style.icon
            return (
              <div
                key={role}
                className="rounded-xl border border-white/10 bg-slate-900/50 p-5 ring-1 ring-white/5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-400">{role}s</span>
                  <Icon className="h-4 w-4 text-slate-500" aria-hidden />
                </div>
                <p className="mt-2 text-2xl font-semibold text-white">{roleCounts[role] || 0}</p>
                <p className="mt-1 text-xs text-indigo-400">
                  {role === 'Interviewer'
                    ? `${TEAM_MEMBERS.filter((m) => m.role === role).reduce((sum, m) => sum + (m.interviews || 0), 0)} interviews completed`
                    : `${TEAM_MEMBERS.filter((m) => m.role === role).reduce((sum, m) => sum + m.hires, 0)} total hires`}
                </p>
              </div>
            )
          })}
        </div>

        {/* Role filter tabs */}
        <div className="mb-6 flex items-center gap-2">
          {['All', 'Hiring Manager', 'Recruiter', 'Interviewer'].map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setRoleFilter(role)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                roleFilter === role
                  ? 'bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-500/30'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Team member cards grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((member) => {
            const roleStyle = ROLE_STYLES[member.role]
            const RoleIcon = roleStyle.icon
            return (
              <div
                key={member.id}
                className="group rounded-xl border border-white/10 bg-slate-900/40 p-5 ring-1 ring-white/5 transition hover:border-indigo-500/25"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-500/20 text-sm font-semibold text-indigo-300">
                      {member.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-white">{member.name}</p>
                      <p className="text-xs text-slate-400">{member.title}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[member.status]}`}>
                    {member.status}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${roleStyle.bg}`}>
                    <RoleIcon className="h-3 w-3" aria-hidden />
                    {member.role}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-500">
                  <Mail className="h-3.5 w-3.5" aria-hidden />
                  {member.email}
                </div>

                {/* Stats row — differs based on role type */}
                <div className="mt-4 grid grid-cols-3 gap-3 border-t border-white/5 pt-4">
                  {member.role === 'Interviewer' ? (
                    <>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-white">{member.interviews || 0}</p>
                        <p className="text-xs text-slate-500">Interviews</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-white">4.8</p>
                        <p className="text-xs text-slate-500">Avg Rating</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-white">96%</p>
                        <p className="text-xs text-slate-500">On-time</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-white">{member.activeJobs}</p>
                        <p className="text-xs text-slate-500">Active Jobs</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-white">{member.hires}</p>
                        <p className="text-xs text-slate-500">Total Hires</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-white">{member.avgDays > 0 ? `${member.avgDays}d` : '—'}</p>
                        <p className="text-xs text-slate-500">Avg Days</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
