import React from 'react';
import {
  Sparkles,
  LayoutDashboard,
  Cpu,
  GraduationCap,
  Sun,
  Moon,
  Eye,
  User,
  CheckCircle2,
  Sliders,
} from 'lucide-react';
import { AppScreen, StudentFormatMode } from '../../types';
import { useAccessibility } from '../../context/AccessibilityContext';
import { mockStudents } from '../../data/mockData';

interface NavbarProps {
  currentScreen: AppScreen;
  setCurrentScreen: (screen: AppScreen) => void;
  activeFormatMode: StudentFormatMode;
  setActiveFormatMode: (mode: StudentFormatMode) => void;
  activeStudentId: string;
  setActiveStudentId: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  setCurrentScreen,
  setActiveFormatMode,
  activeStudentId,
  setActiveStudentId,
}) => {
  const { settings, toggleDarkMode, toggleHighContrast, applyStudentPreset } = useAccessibility();

  const handleStudentSelect = (studentId: string) => {
    setActiveStudentId(studentId);
    if (studentId === 'teacher') {
      setCurrentScreen('dashboard');
      applyStudentPreset('default');
    } else {
      const student = mockStudents.find((s) => s.id === studentId);
      if (student && student.assignedFormats.length > 0) {
        setActiveFormatMode(student.assignedFormats[0]);
        setCurrentScreen('student-view');

        // Automatically tune preset for maximum wow factor
        if (student.assignedFormats.includes('visual')) {
          applyStudentPreset('visual');
        } else if (student.assignedFormats.includes('reading')) {
          applyStudentPreset('dyslexia');
        }
      }
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Identity */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
            aria-label="Learn in Your Way Home"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-700 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="h-4 w-4 text-white" />
              <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-white text-base">
                  Learn <span className="text-indigo-400 font-extrabold">in Your Way</span>
                </span>
                <span className="hidden md:inline-flex items-center rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-medium font-mono text-indigo-300 border border-indigo-500/25">
                  AI Multi-Format v2.4
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Inclusive Multi-Modal Education Engine
              </p>
            </div>
          </button>
        </div>

        {/* Central Screen Tabs (Linear Style) */}
        <nav
          className="flex items-center rounded-xl bg-slate-900/90 p-1 border border-slate-800/80 shadow-inner"
          aria-label="Main Navigation"
        >
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              currentScreen === 'dashboard'
                ? 'bg-slate-800 text-indigo-300 shadow-sm border border-slate-700/60'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
            aria-current={currentScreen === 'dashboard' ? 'page' : undefined}
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
            <span>Teacher Dashboard</span>
            <span className="hidden sm:inline-block rounded-full bg-indigo-950 px-1.5 py-0.2 text-[10px] font-mono text-indigo-400 border border-indigo-800/50">
              28
            </span>
          </button>

          <button
            onClick={() => setCurrentScreen('pipeline')}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              currentScreen === 'pipeline'
                ? 'bg-slate-800 text-indigo-300 shadow-sm border border-slate-700/60'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
            aria-current={currentScreen === 'pipeline' ? 'page' : undefined}
          >
            <Cpu className="h-3.5 w-3.5 text-violet-400" />
            <span>AI Pipeline</span>
            <span className="hidden sm:inline-block rounded-full bg-emerald-950 px-1.5 py-0.2 text-[10px] font-mono text-emerald-400 border border-emerald-800/50">
              6 Steps
            </span>
          </button>

          <button
            onClick={() => setCurrentScreen('student-view')}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              currentScreen === 'student-view'
                ? 'bg-slate-800 text-indigo-300 shadow-sm border border-slate-700/60'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
            aria-current={currentScreen === 'student-view' ? 'page' : undefined}
          >
            <GraduationCap className="h-3.5 w-3.5 text-indigo-400" />
            <span>Student View</span>
            <span className="inline-block rounded-full bg-indigo-500/20 px-1.5 py-0.2 text-[10px] font-mono text-indigo-300 border border-indigo-400/40">
              5 Modes
            </span>
          </button>
        </nav>

        {/* Right Tools: Persona Preset Picker + A11y Toggles */}
        <div className="flex items-center gap-2">
          {/* Quick Persona Tester Dropdown */}
          <div className="relative">
            <label htmlFor="persona-select" className="sr-only">
              Simulate User Persona
            </label>
            <div className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1.5 text-xs text-slate-300">
              <User className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
              <select
                id="persona-select"
                value={activeStudentId}
                onChange={(e) => handleStudentSelect(e.target.value)}
                className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer pr-1"
                aria-label="Select learner profile simulation"
              >
                <option value="teacher" className="bg-slate-900 text-slate-200">
                  Role: Ms. Elena Vance (Teacher)
                </option>
                <option disabled className="bg-slate-900 text-slate-500">
                  ── Student Profiles ──
                </option>
                {mockStudents.map((s) => (
                  <option key={s.id} value={s.id} className="bg-slate-900 text-slate-200">
                    {s.name} ({s.assignedFormats[0].toUpperCase()})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick AAA Contrast Switch */}
          <button
            onClick={toggleHighContrast}
            title={settings.isHighContrast ? 'Disable High Contrast' : 'Enable WCAG AAA High Contrast'}
            aria-label="Toggle High Contrast Mode"
            className={`hidden sm:flex h-8 w-8 items-center justify-center rounded-lg border text-xs transition-colors ${
              settings.isHighContrast
                ? 'bg-amber-500 text-slate-950 border-amber-300 font-bold'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
          </button>

          {/* Theme Switch */}
          <button
            onClick={toggleDarkMode}
            title={settings.isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            aria-label="Toggle Dark and Light theme"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-colors text-xs"
          >
            {settings.isDarkMode ? <Moon className="h-3.5 w-3.5 text-indigo-400" /> : <Sun className="h-3.5 w-3.5 text-amber-400" />}
          </button>
        </div>

      </div>
    </header>
  );
};
