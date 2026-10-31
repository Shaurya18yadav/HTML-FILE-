import React, { useState, useEffect } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const ReadingRuler: React.FC = () => {
  const { settings } = useAccessibility();
  const [mouseY, setMouseY] = useState(250);

  useEffect(() => {
    if (!settings.readingRulerEnabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [settings.readingRulerEnabled]);

  if (!settings.readingRulerEnabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 z-50 transition-all duration-75 ease-out"
      style={{ top: `${mouseY - 32}px`, height: '64px' }}
    >
      {/* Upper shadow mask */}
      <div className="absolute -top-[1000px] inset-x-0 h-[1000px] bg-slate-950/40 backdrop-blur-[0.5px]" />
      
      {/* Active reading slit */}
      <div className="h-full w-full border-y-2 border-indigo-500/80 bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.25)] flex items-center justify-between px-4">
        <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-400 bg-slate-900/90 px-2 py-0.5 rounded border border-indigo-500/30">
          Reading Focus Guide
        </span>
        <span className="text-[10px] font-mono text-indigo-300/80">
          Move cursor vertically to scan lines
        </span>
      </div>

      {/* Lower shadow mask */}
      <div className="absolute top-[64px] inset-x-0 h-[1000px] bg-slate-950/40 backdrop-blur-[0.5px]" />
    </div>
  );
};
