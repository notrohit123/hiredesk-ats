import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Features from './pages/Features'
import Dashboard from './pages/Dashboard'
import Jobs from './pages/Jobs'
import Candidates from './pages/Candidates'
import CandidateDetail from './pages/CandidateDetail'
import Team from './pages/Team'
import Reports from './pages/Reports'
import Pricing from './pages/Pricing'
import Success from './pages/Success'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Welcome from './pages/Welcome'

const YORCO_SDK_URL = 'https://api.yorco.ai/api/widget/sdk.js'
const YORCO_API_KEY = 'pk_4ff2193ee67bc5f4b2093659dd7abeb29fd9edad12ce04af'

// auth pages where the widget should stay hidden — having a chat
// bubble on login/signup forms is distracting and irrelevant.
const AUTH_PATHS = ['/login', '/signup']

// loads the Yorco SDK script once and inits/destroys the widget
// depending on the current route. auth pages get no widget, every
// other page shows it. destroy + reinit on route change keeps the
// widget lifecycle clean.
function useYorcoWidget() {
  const scriptLoaded = useRef(false)
  const location = useLocation()
  const isAuthPage = AUTH_PATHS.includes(location.pathname)

  useEffect(() => {
    // on auth pages, tear down the widget if it was running
    if (isAuthPage) {
      if (typeof window.yorco === 'function') {
        window.yorco('destroy')
      }
      return
    }

    function init() {
      if (typeof window.yorco === 'function') {
        window.yorco('init', { apiKey: YORCO_API_KEY, displayMode: 'push' })
      }
    }

    // if the SDK script is already on the page just (re-)init
    if (scriptLoaded.current) {
      init()
      return
    }

    const script = document.createElement('script')
    script.src = YORCO_SDK_URL
    script.async = true
    script.onload = () => {
      scriptLoaded.current = true
      init()
    }
    document.body.appendChild(script)
  }, [isAuthPage])
}

function App() {
  useYorcoWidget()
  const location = useLocation()
  const isAuthPage = AUTH_PATHS.includes(location.pathname)

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* hide the main nav on login/signup so they feel like
          standalone full-page auth forms */}
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/features" element={<Features />} />
        <Route path="/app" element={<Dashboard />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/candidates/:id" element={<CandidateDetail />} />
        <Route path="/team" element={<Team />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/success" element={<Success />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </div>
  )
}

export default App
