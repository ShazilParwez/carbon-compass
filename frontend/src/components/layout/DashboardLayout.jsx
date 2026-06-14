import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Leaf, 
  MessageSquare, 
  LineChart, 
  Award, 
  User, 
  Scale, 
  LogOut,
  Compass,
  Moon,
  Sun,
  Settings
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Assessment', href: '/assessment', icon: Leaf },
  { name: 'Decision Assistant', href: '/decision-assistant', icon: Scale },
  { name: 'AI Coach', href: '/coach', icon: MessageSquare },
  { name: 'Impact Simulator', href: '/simulator', icon: LineChart },
  { name: 'Eco Challenges', href: '/challenges', icon: Award },
  { name: 'Profile', href: '/profile', icon: User },
];

const prefetchMap = {
  '/dashboard': () => import('../../pages/Dashboard/Dashboard'),
  '/assessment': () => import('../../pages/CarbonAssessment/CarbonAssessment'),
  '/decision-assistant': () => import('../../pages/DecisionAssistant/DecisionAssistant'),
  '/coach': () => import('../../pages/AICoach/AICoach'),
  '/simulator': () => import('../../pages/ImpactSimulator/ImpactSimulator'),
  '/challenges': () => import('../../pages/EcoChallenges/EcoChallenges'),
  '/profile': () => import('../../pages/Profile/Profile'),
};

const prefetchRoute = (href) => {
  if (prefetchMap[href]) {
    prefetchMap[href]().catch(() => {});
  }
};

export default function DashboardLayout() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const { setIsSettingsOpen } = useAccessibility();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden text-slate-900 dark:text-slate-50 transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 glass border-r border-slate-200 dark:border-slate-800 flex-col hidden md:flex z-10 relative">
        <div className="h-16 flex justify-between items-center px-6 border-b border-slate-200 dark:border-slate-800">
          <Link to="/" className="flex items-center">
            <Compass className="h-8 w-8 text-brand-primary mr-2" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">
              Compass
            </span>
          </Link>
          <div className="flex gap-2">
            <button onClick={() => setDarkMode(!darkMode)} className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors" aria-label="Toggle dark mode">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setIsSettingsOpen(true)} className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors" aria-label="Open accessibility settings">
              <Settings size={18} />
            </button>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onMouseEnter={() => prefetchRoute(item.href)}
                onFocus={() => prefetchRoute(item.href)}
                className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-brand-primary/10 text-brand-primary dark:text-brand-accent' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <item.icon className={`h-5 w-5 mr-3 ${isActive ? 'text-brand-primary dark:text-brand-accent' : ''}`} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <Link to="/" className="flex items-center px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl transition-colors">
            <LogOut className="h-5 w-5 mr-3" />
            <span className="font-medium">Log out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 overflow-y-auto p-4 md:p-8 relative">
        <div className="max-w-6xl mx-auto animate-fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
}