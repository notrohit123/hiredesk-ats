import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  GitBranch,
  Globe,
  LineChart,
  Percent,
  PieChart,
  TrendingDown,
  TrendingUp,
  Users,
} from 'lucide-react'

// Key metrics displayed at the top of the reports page. Each metric
// shows the current value and a comparison to the previous period.
const METRICS = [
  { label: 'Time to Hire', value: '23 days', change: '-3 days', trend: 'down', icon: Clock, good: true },
  { label: 'Offer Acceptance', value: '87%', change: '+5%', trend: 'up', icon: CheckCircle2, good: true },
  { label: 'Cost per Hire', value: '$4,200', change: '-$380', trend: 'down', icon: BarChart3, good: true },
  { label: 'Open Roles', value: '8', change: '+2', trend: 'up', icon: Briefcase, good: false },
]

// Source breakdown data for the horizontal bar chart visualization.
// Shows where candidates are coming from and how each source converts.
const SOURCE_DATA = [
  { source: 'LinkedIn', applicants: 142, hires: 8, conversion: '5.6%', barWidth: '85%' },
  { source: 'Referrals', applicants: 64, hires: 12, conversion: '18.7%', barWidth: '38%' },
  { source: 'Indeed', applicants: 98, hires: 4, conversion: '4.1%', barWidth: '59%' },
  { source: 'Careers Page', applicants: 76, hires: 5, conversion: '6.6%', barWidth: '46%' },
  { source: 'Glassdoor', applicants: 45, hires: 2, conversion: '4.4%', barWidth: '27%' },
  { source: 'Dribbble', applicants: 23, hires: 3, conversion: '13%', barWidth: '14%' },
  { source: 'AngelList', applicants: 31, hires: 1, conversion: '3.2%', barWidth: '19%' },
]

// Pipeline conversion funnel — shows dropoff at each stage so teams
// can identify bottlenecks in their hiring process.
const PIPELINE_FUNNEL = [
  { stage: 'Applied', count: 479, pct: '100%', barWidth: '100%', color: 'bg-slate-500' },
  { stage: 'Screening', count: 186, pct: '38.8%', barWidth: '38.8%', color: 'bg-blue-500' },
  { stage: 'Interview', count: 72, pct: '15%', barWidth: '15%', color: 'bg-amber-500' },
  { stage: 'Offer', count: 41, pct: '8.5%', barWidth: '8.5%', color: 'bg-violet-500' },
  { stage: 'Hired', count: 35, pct: '7.3%', barWidth: '7.3%', color: 'bg-emerald-500' },
]

// Time-to-hire breakdown by stage — helps identify which stages
// take the longest and where the process could be sped up.
const TIME_BY_STAGE = [
  { stage: 'Applied → Screening', days: 3.2, barWidth: '32%', color: 'bg-blue-500' },
  { stage: 'Screening → Interview', days: 5.8, barWidth: '58%', color: 'bg-amber-500' },
  { stage: 'Interview → Offer', days: 7.1, barWidth: '71%', color: 'bg-violet-500' },
  { stage: 'Offer → Hired', days: 4.3, barWidth: '43%', color: 'bg-emerald-500' },
]

// Department-level hiring stats for the breakdown table
const DEPARTMENT_STATS = [
  { dept: 'Engineering', openRoles: 4, applicants: 186, hires: 15, avgDays: 24, pipeline: 47 },
  { dept: 'Design', openRoles: 2, applicants: 72, hires: 8, avgDays: 21, pipeline: 18 },
  { dept: 'Product', openRoles: 1, applicants: 42, hires: 5, avgDays: 19, pipeline: 12 },
  { dept: 'Sales', openRoles: 2, applicants: 89, hires: 6, avgDays: 16, pipeline: 23 },
  { dept: 'Marketing', openRoles: 1, applicants: 34, hires: 3, avgDays: 22, pipeline: 8 },
  { dept: 'Operations', openRoles: 0, applicants: 56, hires: 4, avgDays: 20, pipeline: 0 },
]

// Monthly hiring trend for the sparkline-style visualization at bottom.
// Shows hiring volume over the last 6 months.
const MONTHLY_TREND = [
  { month: 'Nov', hires: 4, applications: 52 },
  { month: 'Dec', hires: 3, applications: 38 },
  { month: 'Jan', hires: 6, applications: 71 },
  { month: 'Feb', hires: 5, applications: 64 },
  { month: 'Mar', hires: 8, applications: 93 },
  { month: 'Apr', hires: 9, applications: 112 },
]

export default function ReportsPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-white">Hiring Reports</h1>
          <p className="mt-1 text-sm text-slate-400">
            Analytics and insights across your hiring pipeline. Data from the last 90 days.
          </p>
        </div>

        {/* Key metrics row */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((m) => {
            const Icon = m.icon
            // Green for improvements, red for negative trends
            const trendColor = m.good ? 'text-emerald-400' : 'text-amber-400'
            const TrendIcon = m.trend === 'up' ? TrendingUp : TrendingDown
            return (
              <div
                key={m.label}
                className="rounded-xl border border-white/10 bg-slate-900/50 p-5 ring-1 ring-white/5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-400">{m.label}</span>
                  <Icon className="h-4 w-4 text-slate-500" aria-hidden />
                </div>
                <p className="mt-2 text-2xl font-semibold text-white">{m.value}</p>
                <div className="mt-1 flex items-center gap-1">
                  <TrendIcon className={`h-3.5 w-3.5 ${trendColor}`} aria-hidden />
                  <span className={`text-xs ${trendColor}`}>{m.change} vs last quarter</span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Pipeline conversion funnel */}
          <section className="rounded-xl border border-white/10 bg-slate-900/40 p-6 ring-1 ring-white/5">
            <h2 className="mb-1 flex items-center gap-2 text-base font-semibold text-white">
              <GitBranch className="h-4 w-4 text-indigo-400" aria-hidden />
              Pipeline Funnel
            </h2>
            <p className="mb-5 text-xs text-slate-400">Conversion rates at each hiring stage</p>
            <div className="space-y-4">
              {PIPELINE_FUNNEL.map((row) => (
                <div key={row.stage}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-300">{row.stage}</span>
                    <span className="text-slate-400">
                      {row.count} <span className="text-xs text-slate-500">({row.pct})</span>
                    </span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-white/5">
                    <div
                      className={`h-full rounded-full ${row.color} transition-all duration-700`}
                      style={{ width: row.barWidth }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Source breakdown */}
          <section className="rounded-xl border border-white/10 bg-slate-900/40 p-6 ring-1 ring-white/5">
            <h2 className="mb-1 flex items-center gap-2 text-base font-semibold text-white">
              <Globe className="h-4 w-4 text-indigo-400" aria-hidden />
              Source Breakdown
            </h2>
            <p className="mb-5 text-xs text-slate-400">Where your best candidates come from</p>
            <div className="space-y-3">
              {SOURCE_DATA.map((row) => (
                <div key={row.source} className="flex items-center gap-3">
                  <span className="w-24 shrink-0 text-sm text-slate-300">{row.source}</span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-indigo-500 transition-all duration-700"
                      style={{ width: row.barWidth }}
                    />
                  </div>
                  <div className="w-24 shrink-0 text-right text-xs">
                    <span className="text-slate-300">{row.applicants}</span>
                    <span className="text-slate-500"> · </span>
                    <span className="text-emerald-400">{row.hires} hires</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Time-to-hire by stage */}
          <section className="rounded-xl border border-white/10 bg-slate-900/40 p-6 ring-1 ring-white/5">
            <h2 className="mb-1 flex items-center gap-2 text-base font-semibold text-white">
              <Clock className="h-4 w-4 text-indigo-400" aria-hidden />
              Time in Stage
            </h2>
            <p className="mb-5 text-xs text-slate-400">Average days spent in each transition</p>
            <div className="space-y-5">
              {TIME_BY_STAGE.map((row) => (
                <div key={row.stage}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="text-slate-300">{row.stage}</span>
                    <span className="font-semibold text-white">{row.days} days</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-white/5">
                    <div
                      className={`h-full rounded-full ${row.color} transition-all duration-700`}
                      style={{ width: row.barWidth }}
                    />
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between border-t border-white/5 pt-3 text-sm">
                <span className="font-medium text-slate-300">Total avg. time to hire</span>
                <span className="text-lg font-semibold text-indigo-400">20.4 days</span>
              </div>
            </div>
          </section>

          {/* Monthly trend */}
          <section className="rounded-xl border border-white/10 bg-slate-900/40 p-6 ring-1 ring-white/5">
            <h2 className="mb-1 flex items-center gap-2 text-base font-semibold text-white">
              <LineChart className="h-4 w-4 text-indigo-400" aria-hidden />
              Monthly Trend
            </h2>
            <p className="mb-5 text-xs text-slate-400">Hiring velocity over the last 6 months</p>
            {/* Simple bar chart visualization using divs */}
            <div className="flex items-end gap-3">
              {MONTHLY_TREND.map((m) => {
                const maxApps = Math.max(...MONTHLY_TREND.map((x) => x.applications))
                const appHeight = (m.applications / maxApps) * 120
                const hireHeight = (m.hires / maxApps) * 120
                return (
                  <div key={m.month} className="flex flex-1 flex-col items-center gap-1">
                    <div className="flex items-end gap-0.5" style={{ height: 120 }}>
                      <div
                        className="w-4 rounded-t bg-indigo-500/30"
                        style={{ height: appHeight }}
                        title={`${m.applications} applications`}
                      />
                      <div
                        className="w-4 rounded-t bg-indigo-500"
                        style={{ height: hireHeight }}
                        title={`${m.hires} hires`}
                      />
                    </div>
                    <span className="text-xs text-slate-500">{m.month}</span>
                  </div>
                )
              })}
            </div>
            <div className="mt-4 flex items-center justify-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded bg-indigo-500/30" /> Applications
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded bg-indigo-500" /> Hires
              </span>
            </div>
          </section>
        </div>

        {/* Department breakdown table */}
        <section className="mt-6 rounded-xl border border-white/10 ring-1 ring-white/5">
          <div className="border-b border-white/5 px-6 py-4">
            <h2 className="flex items-center gap-2 text-base font-semibold text-white">
              <BarChart3 className="h-4 w-4 text-indigo-400" aria-hidden />
              By Department
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/5 bg-slate-900/50">
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Department</th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Open Roles</th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">In Pipeline</th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Applicants</th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Hires</th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Avg Days</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {DEPARTMENT_STATS.map((d) => (
                  <tr key={d.dept} className="transition hover:bg-white/[0.02]">
                    <td className="px-6 py-3 font-medium text-white">{d.dept}</td>
                    <td className="px-6 py-3 text-slate-300">{d.openRoles}</td>
                    <td className="px-6 py-3 text-slate-300">{d.pipeline}</td>
                    <td className="px-6 py-3 text-slate-300">{d.applicants}</td>
                    <td className="px-6 py-3 text-emerald-400">{d.hires}</td>
                    <td className="px-6 py-3 text-slate-300">{d.avgDays}d</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}
