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

const YORCO_SDK_URL = 'https://api.yorco.ai/api/widget/sdk.js'
const YORCO_API_KEY = 'pk_4ff2193ee67bc5f4b2093059dd7abeb29fd9edad12ce04af'

// Widget only appears on in-app pages where a prospect would naturally
// explore the product. Marketing pages (landing, pricing, features) stay
// clean so the visitor isn't distracted before they engage with the product.
const WIDGET_PATHS = ['/app', '/jobs', '/candidates', '/team', '/reports']

function useYorcoWidget() {
  const { pathname } = useLocation()
  const scriptLoaded = useRef(false)

  // Match exact paths and any nested sub-routes (e.g. /candidates/3)
  const shouldShow = WIDGET_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + '/')
  )

  useEffect(() => {
    if (!shouldShow) {
      // Tear down the widget when navigating away from product pages
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

    // SDK already loaded from a previous navigation — just re-init
    if (scriptLoaded.current) {
      init()
      return
    }

    // First time reaching a product page: inject the SDK script tag once
    const script = document.createElement('script')
    script.src = YORCO_SDK_URL
    script.async = true
    script.onload = () => {
      scriptLoaded.current = true
      init()
    }
    document.body.appendChild(script)
  }, [shouldShow])
}

function App() {
  useYorcoWidget()

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
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
      </Routes>
    </div>
  )
}

export default App
