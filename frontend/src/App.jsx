import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import DashboardLayout from './components/layout/DashboardLayout'
import AccessibilitySettings from './components/common/AccessibilitySettings'
import SkipToContent from './components/common/SkipToContent'
import TextReader from './components/common/TextReader'

// Pages
import Landing from './pages/Landing'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import CarbonAssessment from './pages/CarbonAssessment/CarbonAssessment'
import AICoach from './pages/AICoach/AICoach'
import ImpactSimulator from './pages/ImpactSimulator/ImpactSimulator'
import EcoChallenges from './pages/EcoChallenges/EcoChallenges'
import Profile from './pages/Profile/Profile'
import DecisionAssistant from './pages/DecisionAssistant/DecisionAssistant'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <SkipToContent />
      <AccessibilitySettings />
      <TextReader />
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
    </div>
  )
}

export default App
