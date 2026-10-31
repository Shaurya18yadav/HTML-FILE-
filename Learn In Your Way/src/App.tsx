import React, { useState } from 'react';
import { Navbar } from './components/common/Navbar';
import { AccessibilityToolbar } from './components/common/AccessibilityToolbar';
import { ReadingRuler } from './components/common/ReadingRuler';
import { TeacherDashboard } from './components/dashboard/TeacherDashboard';
import { PipelineView } from './components/pipeline/PipelineView';
import { StudentMultiFormatContainer } from './components/student-views/StudentMultiFormatContainer';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { AppScreen, StudentFormatMode, Student } from './types';
import { Sparkles, ShieldCheck, Heart } from 'lucide-react';

const AppContent: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('dashboard');
  const [activeFormatMode, setActiveFormatMode] = useState<StudentFormatMode>('visual');
  const [activeStudentId, setActiveStudentId] = useState<string>('teacher');

  const handleLaunchStudentView = (student?: Student, mode?: StudentFormatMode) => {
    if (student) {
      setActiveStudentId(student.id);
    }
    if (mode) {
      setActiveFormatMode(mode);
    }
    setCurrentScreen('student-view');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Interactive Cursor Reading Ruler (Dyslexia Assistive) */}
      <ReadingRuler />

      {/* Top Main Navigation */}
      <Navbar
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        activeFormatMode={activeFormatMode}
        setActiveFormatMode={setActiveFormatMode}
        activeStudentId={activeStudentId}
        setActiveStudentId={setActiveStudentId}
      />

      {/* Main Workspace View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-7">
        {currentScreen === 'dashboard' && (
          <TeacherDashboard
            onNavigateToPipeline={() => setCurrentScreen('pipeline')}
            onLaunchStudentView={(student, mode) => handleLaunchStudentView(student, mode)}
          />
        )}

        {currentScreen === 'pipeline' && (
          <PipelineView
            onLaunchStudentView={(mode) => {
              if (mode) setActiveFormatMode(mode);
              setCurrentScreen('student-view');
            }}
          />
        )}

        {currentScreen === 'student-view' && (
          <StudentMultiFormatContainer
            activeFormatMode={activeFormatMode}
            setActiveFormatMode={setActiveFormatMode}
            activeStudentId={activeStudentId}
            onBackToDashboard={() => setCurrentScreen('dashboard')}
          />
        )}
      </main>

      {/* Persistent Floating A11y Drawer */}
      <AccessibilityToolbar />

      {/* Global Product Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/90 py-6 text-xs text-slate-400 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">Learn in Your Way</span>
            <span>•</span>
            <span>AI Universal Design for Learning (UDL) Engine</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              WCAG 2.2 AAA Verified
            </span>
            <span className="text-slate-400">|</span>
            <span>Fast Prototype v2.4</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <AccessibilityProvider>
      <AppContent />
    </AccessibilityProvider>
  );
}

export default App;
