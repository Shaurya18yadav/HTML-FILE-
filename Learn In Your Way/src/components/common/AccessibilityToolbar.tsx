import React, { useState } from 'react';
import {
  SlidersHorizontal,
  Sun,
  Moon,
  Eye,
  Type,
  BookOpen,
  Volume2,
  VolumeX,
  Sparkles,
  Maximize2,
  Minus,
  Plus,
  X,
  Check,
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const AccessibilityToolbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    settings,
    toggleDarkMode,
    toggleHighContrast,
    toggleDyslexiaFont,
    toggleBionicReading,
    setFontSize,
    toggleReadingRuler,
    speakText,
    stopSpeaking,
    isSpeaking,
    setSpeechRate,
    applyStudentPreset,
  } = useAccessibility();

  const handleTestVoice = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speakText('Welcome to Learn in Your Way. Multimodal inclusive education engine is active.');
    }
  };

  return (
    <>
      {/* Floating Trigger Pill */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Open Accessibility Toolbar"
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full font-medium text-xs shadow-xl transition-all duration-200 border ${
            isOpen
              ? 'bg-indigo-600 text-white border-indigo-400 ring-4 ring-indigo-500/20'
              : 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border-slate-700/80 backdrop-blur-md hover:border-indigo-500/50'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
          <span className="hidden sm:inline">A11y Accommodations</span>
          {settings.isHighContrast && (
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" title="High Contrast Active" />
          )}
          {settings.isDyslexiaFont && (
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Dyslexia Font Active" />
          )}
        </button>
      </div>

      {/* Floating Accessibility Panel */}
      {isOpen && (
        <aside
          role="dialog"
          aria-label="Accessibility Accommodation Settings"
          className="fixed bottom-20 right-6 z-40 w-96 max-w-[calc(100vw-3rem)] rounded-2xl bg-slate-900/95 border border-slate-700/80 p-5 shadow-2xl backdrop-blur-xl text-slate-200 text-sm animate-in fade-in slide-in-from-bottom-4 duration-150"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <h2 className="font-semibold text-slate-100 text-sm">Universal Accessibility Hub</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
              aria-label="Close accessibility toolbar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Accommodations Presets */}
          <div className="mt-3.5">
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
              Quick Accommodation Presets
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => applyStudentPreset('visual')}
                className="px-2.5 py-1.5 text-xs rounded-lg bg-slate-800/80 hover:bg-indigo-950/60 hover:text-indigo-300 border border-slate-700/60 hover:border-indigo-500/50 transition-colors text-center"
              >
                👁️ Low Vision
              </button>
              <button
                onClick={() => applyStudentPreset('dyslexia')}
                className="px-2.5 py-1.5 text-xs rounded-lg bg-slate-800/80 hover:bg-emerald-950/60 hover:text-emerald-300 border border-slate-700/60 hover:border-emerald-500/50 transition-colors text-center"
              >
                📖 Dyslexia
              </button>
              <button
                onClick={() => applyStudentPreset('default')}
                className="px-2.5 py-1.5 text-xs rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 transition-colors text-center text-slate-400"
              >
                ↺ Reset
              </button>
            </div>
          </div>

          <div className="mt-4 space-y-3.5">
            {/* Visual & Theme */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {settings.isDarkMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
                <span className="text-xs font-medium">Color Palette</span>
              </div>
              <button
                onClick={toggleDarkMode}
                className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
              >
                {settings.isDarkMode ? 'Dark Slate' : 'Clean Light'}
              </button>
            </div>

            {/* High Contrast Mode */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Eye className="w-4 h-4 text-amber-400" />
                <div>
                  <span className="text-xs font-medium block">WCAG AAA Contrast</span>
                  <span className="text-[10px] text-slate-400">Boosts border & element delta</span>
                </div>
              </div>
              <button
                onClick={toggleHighContrast}
                role="switch"
                aria-checked={settings.isHighContrast}
                className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors duration-200 ${
                  settings.isHighContrast ? 'bg-amber-500 justify-end' : 'bg-slate-700 justify-start'
                }`}
              >
                <span className="bg-white w-4 h-4 rounded-full shadow-md" />
              </button>
            </div>

            {/* Dyslexia Typography */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Type className="w-4 h-4 text-emerald-400" />
                <div>
                  <span className="text-xs font-medium block">Dyslexia-Friendly Font</span>
                  <span className="text-[10px] text-slate-400">Lexend weighted baseline</span>
                </div>
              </div>
              <button
                onClick={toggleDyslexiaFont}
                role="switch"
                aria-checked={settings.isDyslexiaFont}
                className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors duration-200 ${
                  settings.isDyslexiaFont ? 'bg-emerald-500 justify-end' : 'bg-slate-700 justify-start'
                }`}
              >
                <span className="bg-white w-4 h-4 rounded-full shadow-md" />
              </button>
            </div>

            {/* Bionic Reading Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <div>
                  <span className="text-xs font-medium block">Bionic Guided Saccades</span>
                  <span className="text-[10px] text-slate-400">Bolds initial word syllables</span>
                </div>
              </div>
              <button
                onClick={toggleBionicReading}
                role="switch"
                aria-checked={settings.isBionicReading}
                className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors duration-200 ${
                  settings.isBionicReading ? 'bg-cyan-500 justify-end' : 'bg-slate-700 justify-start'
                }`}
              >
                <span className="bg-white w-4 h-4 rounded-full shadow-md" />
              </button>
            </div>

            {/* Reading Ruler Guide */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Maximize2 className="w-4 h-4 text-indigo-400" />
                <div>
                  <span className="text-xs font-medium block">Reading Focus Ruler</span>
                  <span className="text-[10px] text-slate-400">Cursor-tracking focus slit</span>
                </div>
              </div>
              <button
                onClick={toggleReadingRuler}
                role="switch"
                aria-checked={settings.readingRulerEnabled}
                className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors duration-200 ${
                  settings.readingRulerEnabled ? 'bg-indigo-500 justify-end' : 'bg-slate-700 justify-start'
                }`}
              >
                <span className="bg-white w-4 h-4 rounded-full shadow-md" />
              </button>
            </div>

            {/* Font Size Scaling */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs font-medium">Text Scale</span>
              <div className="flex items-center gap-1 bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/60">
                <button
                  onClick={() => setFontSize('normal')}
                  className={`px-2 py-1 text-xs rounded font-medium transition-colors ${
                    settings.fontSize === 'normal'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  100%
                </button>
                <button
                  onClick={() => setFontSize('large')}
                  className={`px-2 py-1 text-xs rounded font-medium transition-colors ${
                    settings.fontSize === 'large'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  125%
                </button>
                <button
                  onClick={() => setFontSize('xlarge')}
                  className={`px-2 py-1 text-xs rounded font-medium transition-colors ${
                    settings.fontSize === 'xlarge'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  150%
                </button>
              </div>
            </div>

            {/* Neural TTS Reader Controls */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-violet-400" />
                  <span className="text-xs font-medium">Audio TTS Preview</span>
                </div>
                <button
                  onClick={handleTestVoice}
                  className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors ${
                    isSpeaking
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'bg-indigo-600/80 hover:bg-indigo-600 text-white'
                  }`}
                >
                  {isSpeaking ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5" /> Stop
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5" /> Test Voice
                    </>
                  )}
                </button>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Playback Speed:</span>
                <div className="flex gap-1.5">
                  {[0.75, 1.0, 1.25, 1.5].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => setSpeechRate(speed)}
                      className={`px-1.5 py-0.5 rounded text-[11px] font-mono transition-colors ${
                        settings.speechRate === speed
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-800 hover:text-slate-200'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>
      )}
    </>
  );
};
