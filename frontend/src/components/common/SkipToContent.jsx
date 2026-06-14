import React from 'react';

export default function SkipToContent() {
  return (
    <a 
      href="#main-content" 
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[999] focus:p-4 focus:bg-white focus:dark:bg-slate-900 focus:text-brand-primary focus:font-bold focus:shadow-lg focus:rounded-lg focus:outline-none focus:ring-4 focus:ring-brand-primary"
    >
      Skip to main content
    </a>
  );
}
