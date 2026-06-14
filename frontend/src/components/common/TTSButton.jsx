import React, { useState } from 'react';
import { Volume2, Square } from 'lucide-react';
import useTextToSpeech from '../../hooks/useTextToSpeech';

export default function TTSButton({ text, sectionId = 'unknown', className = '', onPlay }) {
  const { speak, stop, isSpeaking, isSupported } = useTextToSpeech();
  const [isHovered, setIsHovered] = useState(false);

  if (!isSupported) return null;

  const handleToggle = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(text);
      if (onPlay) onPlay(sectionId);
      // Dispatch global custom event for future analytics tracking
      window.dispatchEvent(new CustomEvent('tts-playback-started', { detail: { sectionId } }));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <button
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        aria-label={isSpeaking ? "Stop Reading" : "Listen"}
        aria-pressed={isSpeaking}
        className={`flex items-center justify-center p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary ${
          isSpeaking 
            ? 'bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20' 
            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200'
        }`}
        title={isSpeaking ? "Stop Reading" : "Listen"}
      >
        {isSpeaking ? (
          <Square size={18} className="fill-current" />
        ) : (
          <Volume2 size={18} className="transition-transform hover:scale-110" />
        )}
      </button>
      
      {/* Visual Feedback label */}
      {isSpeaking && (
        <span className="absolute left-full ml-2 whitespace-nowrap text-xs font-medium text-brand-primary animate-pulse pointer-events-none">
          Reading...
        </span>
      )}
    </div>
  );
}
