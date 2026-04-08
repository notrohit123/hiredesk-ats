import { useState } from 'react'
import {
  Briefcase,
  Building2,
  Calendar,
  ChevronDown,
  Clock,
  DollarSign,
  Eye,
  Globe,
  MapPin,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Trash2,
  Users,
  X,
} from 'lucide-react'

// Mock job listings with enough fields to make the table look real.
// Each job tracks its status, applicant count, and basic details.
const INITIAL_JOBS = [
  {
    id: 1,
    title: 'Sr. Frontend Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    salary: '$140K - $180K',
    posted: '2026-03-15',
    applicants: 23,
    status: 'Active',
    description: 'We are looking for a senior frontend engineer to lead our React application development...',
  },
  {
    id: 2,
    title: 'Product Designer',
    department: 'Design',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120K - $155K',
    posted: '2026-03-20',
    applicants: 18,
    status: 'Active',
    description: 'Join our design team to shape the user experience of our core product...',
  },
  {
    id: 3,
    title: 'Backend Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    salary: '$135K - $170K',
    posted: '2026-03-22',
    applicants: 31,
    status: 'Active',
    description: 'Build scalable APIs and services that power our platform...',
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$130K - $165K',
    posted: '2026-03-25',
    applicants: 12,
    status: 'Active',
    description: 'Own our infrastructure, CI/CD pipelines, and cloud architecture...',
  },
  {
    id: 5,
    title: 'Product Manager',
    department: 'Product',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$145K - $185K',
    posted: '2026-03-10',
    applicants: 42,
    status: 'Paused',
    description: 'Lead product strategy and roadmap for our enterprise platform...',
  },
  {
    id: 6,
    title: 'SDR (Sales Development)',
    department: 'Sales',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$55K - $75K + commission',
    posted: '2026-04-01',
    applicants: 8,
    status: 'Active',
    description: 'Generate qualified pipeline through outbound prospecting...',
  },
  {
    id: 7,
    title: 'Data Analyst',
    department: 'Analytics',
    location: 'Remote',
    type: 'Contract',
    salary: '$95K - $120K',
    posted: '2026-02-28',
    applicants: 56,
    status: 'Closed',
    description: 'Turn raw data into actionable insights for our go-to-market teams...',
  },
  {
    id: 8,
    title: 'Marketing Coordinator',
    department: 'Marketing',
    location: 'Remote',
    type: 'Full-time',
    salary: '$60K - $80K',
    posted: '2026-04-03',
    applicants: 5,
    status: 'Active',
    description: 'Support campaigns, content creation, and event coordination...',
  },
]

// Map job status to visual styling so each status reads clearly in the table
const STATUS_STYLES = {
  Active: 'bg-emerald-500/15 text-emerald-400 ring-emerald-500/20',
  Paused: 'bg-amber-500/15 text-amber-400 ring-amber-500/20',
  Closed: 'bg-slate-500/15 text-slate-400 ring-slate-500/20',
}

// Departments available in the create-job form. Matches the departments
// used in the mock data above.
const DEPARTMENTS = ['Engineering', 'Design', 'Product', 'Sales', 'Marketing', 'Analytics', 'Operations', 'Finance']
const LOCATIONS = ['Remote', 'San Francisco, CA', 'New York, NY', 'Austin, TX', 'London, UK', 'Berlin, DE']
const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship']

export default function JobsPage() {
  const [jobs, setJobs] = useState(INITIAL_JOBS)
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newJob, setNewJob] = useState({
    title: '',
    department: DEPARTMENTS[0],
    location: LOCATIONS[0],
    type: JOB_TYPES[0],
    salary: '',
    description: '',
  })

  // Filter jobs by the search query across title, department, and location
  const filteredJobs = jobs.filter((job) => {
    const query = searchQuery.toLowerCase()
    return (
      job.title.toLowerCase().includes(query) ||
      job.department.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query)
    )
  })

  // Creates a new job from the form data and adds it to the list.
  // In a real app this would POST to an API; here we just update local state.
  function handleCreateJob(e) {
    e.preventDefault()
    const job = {
      id: Date.now(),
      ...newJob,
      posted: new Date().toISOString().split('T')[0],
      applicants: 0,
      status: 'Active',
    }
    setJobs([job, ...jobs])
    setShowCreateForm(false)
    setNewJob({ title: '', department: DEPARTMENTS[0], location: LOCATIONS[0], type: JOB_TYPES[0], salary: '', description: '' })
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header row with search and create button */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">Job Postings</h1>
            <p className="mt-1 text-sm text-slate-400">
              {jobs.filter((j) => j.status === 'Active').length} active roles across{' '}
              {new Set(jobs.map((j) => j.department)).size} departments
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden />
              <input
                type="text"
                placeholder="Search jobs…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-64 rounded-lg border border-white/10 bg-slate-900/50 pl-9 pr-4 text-sm text-white placeholder-slate-500 outline-none ring-1 ring-white/5 transition focus:border-indigo-500/50 focus:ring-indigo-500/20"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowCreateForm(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400"
            >
              <Plus className="h-4 w-4" aria-hidden />
              Create Job
            </button>
          </div>
        </div>

        {/* Create Job Modal */}
        {showCreateForm ? (
          <div className="mb-8 rounded-xl border border-indigo-500/30 bg-slate-900/80 p-6 ring-1 ring-indigo-500/10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">New Job Posting</h2>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white/5 hover:text-white"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <form onSubmit={handleCreateJob} className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-slate-300">Job Title</label>
                <input
                  type="text"
                  required
                  value={newJob.title}
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  placeholder="e.g. Sr. Frontend Engineer"
                  className="h-10 w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 text-sm text-white placeholder-slate-500 outline-none ring-1 ring-white/5 focus:border-indigo-500/50 focus:ring-indigo-500/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">Department</label>
                <select
                  value={newJob.department}
                  onChange={(e) => setNewJob({ ...newJob, department: e.target.value })}
                  className="h-10 w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 text-sm text-white outline-none ring-1 ring-white/5 focus:border-indigo-500/50 focus:ring-indigo-500/20"
                >
                  {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">Location</label>
                <select
                  value={newJob.location}
                  onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                  className="h-10 w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 text-sm text-white outline-none ring-1 ring-white/5 focus:border-indigo-500/50 focus:ring-indigo-500/20"
                >
                  {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">Employment Type</label>
                <select
                  value={newJob.type}
                  onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
                  className="h-10 w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 text-sm text-white outline-none ring-1 ring-white/5 focus:border-indigo-500/50 focus:ring-indigo-500/20"
                >
                  {JOB_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">Salary Range</label>
                <input
                  type="text"
                  value={newJob.salary}
                  onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                  placeholder="e.g. $120K - $160K"
                  className="h-10 w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 text-sm text-white placeholder-slate-500 outline-none ring-1 ring-white/5 focus:border-indigo-500/50 focus:ring-indigo-500/20"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-slate-300">Description</label>
                <textarea
                  rows={3}
                  value={newJob.description}
                  onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                  placeholder="Describe the role, responsibilities, and requirements..."
                  className="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none ring-1 ring-white/5 focus:border-indigo-500/50 focus:ring-indigo-500/20"
                />
              </div>
              <div className="sm:col-span-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400"
                >
                  Publish Job
                </button>
              </div>
            </form>
          </div>
        ) : null}

        {/* Jobs table */}
        <div className="overflow-hidden rounded-xl border border-white/10 ring-1 ring-white/5">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-slate-900/50">
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Job</th>
                <th className="hidden px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400 md:table-cell">Location</th>
                <th className="hidden px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400 lg:table-cell">Salary</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Applicants</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Status</th>
                <th className="hidden px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400 sm:table-cell">Posted</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="transition hover:bg-white/[0.02]">
                  <td className="px-4 py-3.5">
                    <div>
                      <p className="font-medium text-white">{job.title}</p>
                      <p className="text-xs text-slate-500">{job.department} · {job.type}</p>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3.5 md:table-cell">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <MapPin className="h-3.5 w-3.5" aria-hidden />
                      {job.location}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3.5 text-slate-400 lg:table-cell">{job.salary}</td>
                  <td className="px-4 py-3.5">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <Users className="h-3.5 w-3.5 text-slate-500" aria-hidden />
                      {job.applicants}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${STATUS_STYLES[job.status]}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3.5 text-slate-500 sm:table-cell">{job.posted}</td>
                  <td className="px-4 py-3.5">
                    <button
                      type="button"
                      className="rounded p-1.5 text-slate-500 transition hover:bg-white/5 hover:text-white"
                    >
                      <MoreHorizontal className="h-4 w-4" aria-hidden />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredJobs.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-500">
              No jobs match your search.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
