import React from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';

export default function AccessibilitySettings() {
  const {
    fontSize, setFontSize,
    theme, setTheme,
    reducedMotion, setReducedMotion,
    readingMode, setReadingMode,
    isSettingsOpen, setIsSettingsOpen,
    isSpeechRecognitionAvailable,
    isSpeechSynthesisAvailable,
    readinessScore
  } = useAccessibility();

  if (!isSettingsOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="a11y-title"
        className="bg-white dark:bg-slate-900 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 id="a11y-title" className="text-2xl font-bold">Accessibility Settings</h2>
          <button 
            onClick={() => setIsSettingsOpen(false)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            aria-label="Close accessibility settings"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold mb-3">Visual Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="fontSizeSelect" className="block text-sm font-medium mb-1">Font Size</label>
                  <select 
                    id="fontSizeSelect"
                    value={fontSize} 
                    onChange={(e) => setFontSize(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 focus:ring-2 focus:ring-brand-primary"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium (Default)</option>
                    <option value="large">Large</option>
                    <option value="xl">Extra Large</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="themeSelect" className="block text-sm font-medium mb-1">Theme</label>
                  <select 
                    id="themeSelect"
                    value={theme} 
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 focus:ring-2 focus:ring-brand-primary"
                  >
                    <option value="default">Default Colors</option>
                    <option value="high-contrast">High Contrast</option>
                    <option value="color-blind">Color-Blind Friendly</option>
                  </select>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">Reading & Motion</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={readingMode} 
                    onChange={(e) => setReadingMode(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-brand-primary focus:ring-2 focus:ring-brand-primary"
                  />
                  <span>Dyslexia-Friendly Reading Mode</span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={reducedMotion} 
                    onChange={(e) => setReducedMotion(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-brand-primary focus:ring-2 focus:ring-brand-primary"
                  />
                  <span>Reduce Motion</span>
                </label>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold mb-3">Accessibility Status Dashboard</h3>
              
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">Readiness Score</span>
                <span className="text-2xl font-bold text-brand-primary" aria-live="polite">{readinessScore}%</span>
              </div>
              
              <ul className="space-y-2 text-sm">
                <StatusItem label="Keyboard Navigation Enabled" active={true} />
                <StatusItem label="Screen Reader Optimized" active={true} />
                <StatusItem label="Voice Input Available" active={isSpeechRecognitionAvailable} />
                <StatusItem label="Text-to-Speech Available" active={isSpeechSynthesisAvailable} />
                <StatusItem label="Read Selected Text" active={isSpeechSynthesisAvailable} />
                <StatusItem label="High Contrast Mode" active={theme === 'high-contrast'} />
                <StatusItem label="Color-Blind Friendly Theme" active={theme === 'color-blind'} />
                <StatusItem label="Reduced Motion Enabled" active={reducedMotion} />
                <StatusItem label="Reading Mode Enabled" active={readingMode} />
              </ul>
            </section>
            
            <section>
              <h3 className="text-sm font-semibold mb-2">Keyboard Shortcuts</h3>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                <li><kbd className="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded mr-2 border border-slate-300 dark:border-slate-600">Alt + A</kbd> Toggle Settings</li>
                <li><kbd className="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded mr-2 border border-slate-300 dark:border-slate-600">Alt + R</kbd> Toggle Reading Mode</li>
                <li><kbd className="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded mr-2 border border-slate-300 dark:border-slate-600">Tab</kbd> Navigate Interface</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusItem({ label, active }) {
  return (
    <li className="flex items-center justify-between">
      <span>{label}</span>
      {active ? (
        <span className="text-green-600 dark:text-green-400 flex items-center">
          <svg aria-hidden="true" className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Active
        </span>
      ) : (
        <span className="text-slate-400 flex items-center">
          <svg aria-hidden="true" className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg> Inactive
        </span>
      )}
    </li>
  );
}
