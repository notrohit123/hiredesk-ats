import {
  Briefcase,
  Calendar,
  FileText,
  GitBranch,
  KanbanSquare,
  LineChart,
  Mail,
  Search,
  Shield,
  UserCheck,
  Users,
} from 'lucide-react'

// Each section alternates text-left / text-right (zig-zag) via the reverse prop.
// The "mockShot" panel is a fake UI preview that reads as product chrome
// without requiring actual screenshots.
function FeatureSection({ icon, title, description, details, reverse }) {
  const FeatureIcon = icon
  const textCol = (
    <div className="flex flex-col justify-center gap-4">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-500 ring-1 ring-indigo-500/30">
        <FeatureIcon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
      </div>
      <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">{title}</h2>
      <p className="max-w-xl text-base leading-relaxed text-slate-400">{description}</p>
      {details ? (
        <ul className="mt-2 space-y-2 text-sm text-slate-400">
          {details.map((d) => (
            <li key={d} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500/60" />
              {d}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )

  // Fake "UI preview" that looks like a product panel without needing real assets
  const mockShot = (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 shadow-xl ring-1 ring-white/5"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
      <div className="absolute inset-x-6 top-6 h-8 rounded-lg bg-slate-800/80" />
      <div className="absolute inset-x-6 top-20 bottom-6 rounded-xl border border-slate-700/60 bg-slate-950/50 p-4">
        <div className="mb-3 h-2 w-1/3 rounded-full bg-indigo-500/40" />
        <div className="space-y-2">
          <div className="h-2 w-full rounded-full bg-slate-700/80" />
          <div className="h-2 w-5/6 rounded-full bg-slate-700/60" />
          <div className="h-2 w-4/6 rounded-full bg-slate-700/50" />
        </div>
      </div>
    </div>
  )

  return (
    <section className="border-b border-slate-800/80 py-16 last:border-b-0 md:py-24">
      <div
        className={`mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:gap-16 md:px-6 lg:px-8 ${
          reverse ? 'md:[&>*:first-child]:order-2' : ''
        }`}
      >
        {textCol}
        {mockShot}
      </div>
    </section>
  )
}

const FEATURES = [
  {
    icon: KanbanSquare,
    title: 'Visual Hiring Pipeline',
    description:
      'See every open role and its candidates on a drag-and-drop kanban board. Stages are fully customizable—rename, reorder, or add new ones to match how your team actually hires.',
    details: [
      'Default stages: Applied, Screening, Interview, Offer, Hired',
      'Custom stages per job (e.g. take-home, panel, reference check)',
      'Bulk move, archive, or reject with keyboard shortcuts',
    ],
  },
  {
    icon: Briefcase,
    title: 'Job Posting & Distribution',
    description:
      'Write once, publish everywhere. Create structured job listings with rich descriptions, requirements, and compensation bands. Push to integrated job boards and your branded careers page.',
    details: [
      'Templates for engineering, design, sales, ops, and more',
      'Salary transparency fields with location-based ranges',
      'Auto-close listings after a target number of applicants',
    ],
  },
  {
    icon: FileText,
    title: 'Candidate Profiles & Resumes',
    description:
      'Every applicant gets a rich profile: parsed resume, interview timeline, scorecards, and notes from the whole team. No more hunting through inboxes to find that one email.',
    details: [
      'Resume parsing extracts skills, experience, and education',
      'Unified timeline shows every touchpoint with the candidate',
      'Tags and custom fields for your own filtering needs',
    ],
  },
  {
    icon: Calendar,
    title: 'Interview Scheduling',
    description:
      'Automated scheduling that checks interviewer availability, sends calendar invites, and handles reschedules. Candidates pick from available slots—no more back-and-forth emails.',
    details: [
      'Google Calendar and Outlook integration',
      'Panel interview coordination across multiple interviewers',
      'Automated reminders for both candidates and interviewers',
    ],
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description:
      'Hiring is a team sport. Assign roles (hiring manager, recruiter, interviewer), leave structured feedback on scorecards, and make decisions together with clear visibility.',
    details: [
      'Role-based permissions: who can see, score, or advance candidates',
      'Structured scorecards with rating scales and competency areas',
      '@mention teammates in candidate notes for quick alignment',
    ],
  },
  {
    icon: LineChart,
    title: 'Hiring Analytics & Reports',
    description:
      'Data-driven hiring decisions. Track time-to-hire, cost-per-hire, source effectiveness, pipeline conversion rates, and diversity metrics across every role.',
    details: [
      'Time-to-hire breakdown by stage, role, and department',
      'Source attribution: which channels produce the best hires',
      'Exportable reports for leadership and compliance',
    ],
  },
  {
    icon: Mail,
    title: 'Automated Communications',
    description:
      'Keep candidates in the loop without manual effort. Trigger emails at each stage transition: application received, interview confirmed, offer sent, or rejection with feedback.',
    details: [
      'Customizable email templates per stage and per job',
      'Bulk email for batch rejections with personalized merge fields',
      'Candidate portal where applicants check their own status',
    ],
  },
  {
    icon: Shield,
    title: 'Compliance & Data Privacy',
    description:
      'Built for GDPR, EEOC, and SOC 2 requirements. Automatic data retention policies, anonymized reporting for diversity, and audit logs for every action taken on a candidate.',
    details: [
      'Configurable data retention and automatic purge schedules',
      'EEOC and diversity reporting without exposing individual data',
      'Full audit trail: who did what, when, and why',
    ],
  },
]

export default function Features() {
  return (
    <main className="bg-slate-950 text-white">
      {/* Page header */}
      <div className="border-b border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center md:px-6 md:py-20 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-wider text-indigo-500">Product</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Built for how modern teams actually hire
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
            HireDesk connects job posting, candidate tracking, team collaboration, and
            analytics so recruiters spend less time on admin and more time talking to great people.
          </p>
        </div>
      </div>

      {/* Feature sections in alternating layout */}
      {FEATURES.map((feature, index) => (
        <FeatureSection
          key={feature.title}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          details={feature.details}
          reverse={index % 2 === 1}
        />
      ))}
    </main>
  )
}
