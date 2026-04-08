import { useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
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
const YORCO_API_KEY = 'pk_4ff2193ee67bc5f4b2093659dd7abeb29fd9edad12ce04af'

// Widget shows on every page — this is a demo SaaS app with no auth
// pages to exclude. The widget loads once on first render and stays
// active across all route navigations.
function useYorcoWidget() {
  const scriptLoaded = useRef(false)

  useEffect(() => {
    function init() {
      if (typeof window.yorco === 'function') {
        window.yorco('init', { apiKey: YORCO_API_KEY, displayMode: 'push' })
      }
    }

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
  }, [])
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
