import React, { useState, useEffect } from 'react';
import { Volume2, Square } from 'lucide-react';
import useTextToSpeech from '../../hooks/useTextToSpeech';

export default function TextReader() {
  const [selectedText, setSelectedText] = useState('');
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const { speak, stop, isSpeaking, isSupported } = useTextToSpeech();

  useEffect(() => {
    if (!isSupported) return;

    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        setShowTooltip(false);
      }
    };

    const handleMouseUp = (e) => {
      if (e.target.closest('#text-reader-container')) return;

      const selection = window.getSelection();
      const text = selection?.toString().trim();

      if (text) {
        setSelectedText(text);
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        setPosition({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX + (rect.width / 2)
        });
        setShowTooltip(true);
      } else {
        setShowTooltip(false);
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('selectionchange', handleSelectionChange);
    
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, [isSupported]);

  if (!isSupported) return null;

  return (
    <div id="text-reader-container" className="z-[1000]">
      {/* Floating tooltip for selection */}
      {showTooltip && !isSpeaking && (
        <div 
          className="absolute transform -translate-x-1/2 -translate-y-full pb-2 animate-fade-in pointer-events-auto z-[9999]"
          style={{ top: position.top, left: position.left }}
        >
          <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-3 py-2 rounded-lg shadow-xl flex items-center gap-2 after:content-[''] after:absolute after:top-full after:-mt-2 after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-slate-900 dark:after:border-t-white">
            <button 
              onMouseDown={(e) => e.preventDefault()} // Prevents selection from clearing
              onClick={() => {
                speak(selectedText);
                setShowTooltip(false);
                window.getSelection()?.removeAllRanges();
              }}
              className="flex items-center gap-2 hover:text-brand-primary dark:hover:text-brand-primary transition-colors text-sm font-medium focus:outline-none"
              aria-label="Read Selection"
            >
              <Volume2 size={16} />
              Read Selection
            </button>
          </div>
        </div>
      )}

      {/* Persistent player when speaking */}
      {isSpeaking && (
        <div className="fixed bottom-6 right-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-4 rounded-xl shadow-2xl flex items-center gap-4 animate-slide-up z-[9999]">
          <div className="flex gap-1 items-center px-2">
            <span className="w-1.5 h-4 bg-brand-primary rounded-full animate-pulse"></span>
            <span className="w-1.5 h-6 bg-brand-primary rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></span>
            <span className="w-1.5 h-4 bg-brand-primary rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></span>
          </div>
          <div className="text-sm font-medium mr-2 max-w-[150px] truncate">
            Reading selection...
          </div>
          <button 
            onClick={stop}
            className="p-2 bg-slate-800 dark:bg-slate-100 hover:bg-slate-700 dark:hover:bg-slate-200 text-slate-300 dark:text-slate-600 hover:text-white dark:hover:text-slate-900 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary"
            aria-label="Stop Reading"
            title="Stop Reading"
          >
            <Square size={16} className="fill-current" />
          </button>
        </div>
      )}
    </div>
  );
}
