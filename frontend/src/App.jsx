import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import DashboardLayout from './components/layout/DashboardLayout'
import AccessibilitySettings from './components/common/AccessibilitySettings'
import SkipToContent from './components/common/SkipToContent'
import TextReader from './components/common/TextReader'

import { lazy, Suspense } from 'react'

// Pages
const Landing = lazy(() => import('./pages/Landing'))
const Login = lazy(() => import('./pages/Auth/Login'))
const Register = lazy(() => import('./pages/Auth/Register'))
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'))
const CarbonAssessment = lazy(() => import('./pages/CarbonAssessment/CarbonAssessment'))
const AICoach = lazy(() => import('./pages/AICoach/AICoach'))
const ImpactSimulator = lazy(() => import('./pages/ImpactSimulator/ImpactSimulator'))
const EcoChallenges = lazy(() => import('./pages/EcoChallenges/EcoChallenges'))
const Profile = lazy(() => import('./pages/Profile/Profile'))
const DecisionAssistant = lazy(() => import('./pages/DecisionAssistant/DecisionAssistant'))

// Accessible Loading Fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div 
      className="animate-spin h-8 w-8 border-4 border-brand-primary border-t-transparent rounded-full" 
      aria-label="Loading page..."
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  </div>
)

/**
 * Root Application Component
 * 
 * Manages global routing, lazy-loaded chunk boundaries, and core accessibility providers.
 * Utilizes React.Suspense to defer loading of heavy dashboard components.
 * 
 * @returns {JSX.Element} The rendered application tree.
 */
function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <SkipToContent />
      <AccessibilitySettings />
      <TextReader />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Routes with Navbar */}
          <Route path="/" element={
            <>
              <Navbar />
              <Landing />
            </>
          } />
          <Route path="/login" element={<><Navbar /><Login /></>} />
          <Route path="/register" element={<><Navbar /><Register /></>} />

          {/* Protected Routes with Dashboard Layout */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/assessment" element={<CarbonAssessment />} />
            <Route path="/coach" element={<AICoach />} />
            <Route path="/simulator" element={<ImpactSimulator />} />
            <Route path="/challenges" element={<EcoChallenges />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/decision-assistant" element={<DecisionAssistant />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
