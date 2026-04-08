import { NavLink } from 'react-router-dom'
import { Briefcase } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/features', label: 'Features' },
  { to: '/app', label: 'Pipeline' },
  { to: '/jobs', label: 'Jobs' },
  { to: '/candidates', label: 'Candidates' },
  { to: '/team', label: 'Team' },
  { to: '/reports', label: 'Reports' },
  { to: '/pricing', label: 'Pricing' },
]

// Active link gets a solid indigo background so it pops on the dark nav bar.
// Inactive links stay muted slate and brighten on hover.
function linkClassName({ isActive }) {
  const base =
    'rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ' +
    'text-slate-300 hover:bg-white/5 hover:text-white'
  const active =
    ' bg-indigo-500 text-white shadow-[0_0_20px_-4px_rgba(99,102,241,0.5)] hover:bg-indigo-400 hover:text-white'
  return base + (isActive ? active : '')
}

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/70 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className="group flex shrink-0 items-center gap-2 rounded-lg outline-none ring-indigo-500/40 focus-visible:ring-2"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/15 ring-1 ring-indigo-500/30 transition group-hover:bg-indigo-500/25">
            <Briefcase className="h-5 w-5 text-indigo-400" aria-hidden />
          </span>
          <span className="text-lg font-semibold tracking-tight text-white">HireDesk</span>
        </NavLink>

        <nav
          className="flex flex-1 flex-wrap items-center justify-end gap-1 sm:gap-2"
          aria-label="Primary"
        >
          {navItems.map(({ to, label }) => (
            <NavLink key={to} to={to} className={linkClassName} end={to === '/'}>
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
