import { Link } from 'react-router-dom';
import { Compass, Moon, Sun, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';

export default function Navbar() {
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
    <nav className="fixed w-full z-50 glass border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <Compass className="h-8 w-8 text-brand-primary" />
            <Link to="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">
              Carbon Compass
            </Link>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-slate-600 dark:text-slate-300 hover:text-brand-primary dark:hover:text-brand-accent transition-colors font-medium">Features</a>
            <a href="#how-it-works" className="text-slate-600 dark:text-slate-300 hover:text-brand-primary dark:hover:text-brand-accent transition-colors font-medium">How it works</a>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300 focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={() => setIsSettingsOpen(true)} 
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300 focus:outline-none"
              aria-label="Open accessibility settings"
            >
              <Settings size={20} />
            </button>
            <Link to="/login" className="hidden sm:block text-slate-600 dark:text-slate-300 font-medium hover:text-brand-primary dark:hover:text-brand-accent transition-colors">Log in</Link>
            <Link to="/register" className="bg-brand-primary hover:bg-brand-secondary text-white px-5 py-2 rounded-full font-medium transition-colors shadow-md hover:shadow-lg">Get Started</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}