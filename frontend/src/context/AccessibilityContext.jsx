import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

export const useAccessibility = () => useContext(AccessibilityContext);

export const AccessibilityProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('ac-fontSize') || 'medium');
  const [theme, setTheme] = useState(() => localStorage.getItem('ac-theme') || 'default');
  const [reducedMotion, setReducedMotion] = useState(() => localStorage.getItem('ac-reducedMotion') === 'true');
  const [readingMode, setReadingMode] = useState(() => localStorage.getItem('ac-readingMode') === 'true');
  
  // Check native API availability
  const [isSpeechRecognitionAvailable, setIsSpeechRecognitionAvailable] = useState(false);
  const [isSpeechSynthesisAvailable, setIsSpeechSynthesisAvailable] = useState(false);

  useEffect(() => {
    setIsSpeechRecognitionAvailable('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
    setIsSpeechSynthesisAvailable('speechSynthesis' in window);
  }, []);

  const readinessScore = Math.round(
    ((fontSize !== 'medium' ? 1 : 0) + 
    (theme !== 'default' ? 1 : 0) + 
    (reducedMotion ? 1 : 0) + 
    (readingMode ? 1 : 0) + 
    (isSpeechRecognitionAvailable ? 1 : 0) + 
    (isSpeechSynthesisAvailable ? 1 : 0)) / 6 * 100
  );

  useEffect(() => {
    localStorage.setItem('ac-fontSize', fontSize);
    localStorage.setItem('ac-theme', theme);
    localStorage.setItem('ac-reducedMotion', reducedMotion);
    localStorage.setItem('ac-readingMode', readingMode);

    const root = document.documentElement;
    
    // Theme
    root.setAttribute('data-theme', theme);
    
    // Font Size (base scaling)
    let px = '16px';
    if (fontSize === 'small') px = '14px';
    if (fontSize === 'large') px = '18px';
    if (fontSize === 'xl') px = '20px';
    root.style.fontSize = px;
    
    // Classes
    if (reducedMotion) root.classList.add('reduce-motion');
    else root.classList.remove('reduce-motion');
    
    if (readingMode) root.classList.add('reading-mode');
    else root.classList.remove('reading-mode');
    
  }, [fontSize, theme, reducedMotion, readingMode]);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Alt + A to toggle accessibility panel
      if (e.altKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsSettingsOpen(prev => !prev);
      }
      // Alt + R to toggle reading mode
      if (e.altKey && e.key.toLowerCase() === 'r') {
        e.preventDefault();
        setReadingMode(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const value = {
    fontSize, setFontSize,
    theme, setTheme,
    reducedMotion, setReducedMotion,
    readingMode, setReadingMode,
    isSettingsOpen, setIsSettingsOpen,
    isSpeechRecognitionAvailable,
    isSpeechSynthesisAvailable,
    readinessScore
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};
