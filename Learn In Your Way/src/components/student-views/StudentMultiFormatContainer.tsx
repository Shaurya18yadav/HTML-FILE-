import React from 'react';
import {
  Eye,
  Volume2,
  BookOpen,
  Languages,
  PenTool,
  Sparkles,
  Layers,
  ArrowLeft,
  CheckCircle2,
  Share2,
  Bookmark,
} from 'lucide-react';
import { VisualImpairmentView } from './VisualImpairmentView';
import { HearingImpairmentView } from './HearingImpairmentView';
import { ReadingDifficultyView } from './ReadingDifficultyView';
import { LanguageBarrierView } from './LanguageBarrierView';
import { ExtraPracticeView } from './ExtraPracticeView';
import { StudentFormatMode, Student } from '../../types';
import { mockLessonOverview, mockStudents } from '../../data/mockData';
import { useAccessibility } from '../../context/AccessibilityContext';

interface StudentMultiFormatContainerProps {
  activeFormatMode: StudentFormatMode;
  setActiveFormatMode: (mode: StudentFormatMode) => void;
  activeStudentId: string;
  onBackToDashboard: () => void;
}

export const StudentMultiFormatContainer: React.FC<StudentMultiFormatContainerProps> = ({
  activeFormatMode,
  setActiveFormatMode,
  activeStudentId,
  onBackToDashboard,
}) => {
  const { announce } = useAccessibility();

  const activeStudent = mockStudents.find((s) => s.id === activeStudentId);

  const formatModes: {
    id: StudentFormatMode;
    label: string;
    sublabel: string;
    icon: any;
    color: string;
    badge: string;
  }[] = [
    {
      id: 'visual',
      label: 'Visual Impairment',
      sublabel: 'Audio Narration + Tactile Diagram Breakdown',
      icon: Eye,
      color: 'indigo',
      badge: 'Audio-First',
    },
    {
      id: 'hearing',
      label: 'Hearing Impairment',
      sublabel: 'Synced Captions + Acoustic Non-Speech Cues',
      icon: Volume2,
      color: 'sky',
      badge: 'Captions',
    },
    {
      id: 'reading',
      label: 'Reading Difficulty',
      sublabel: 'Lexend Font + Bionic + AI Simplification',
      icon: BookOpen,
      color: 'emerald',
      badge: 'Cognitive',
    },
    {
      id: 'language',
      label: 'Language Barrier',
      sublabel: 'Hindi / Regional Bilingual Dual-View',
      icon: Languages,
      color: 'amber',
      badge: 'Multilingual',
    },
    {
      id: 'practice',
      label: 'Extra Practice',
      sublabel: 'Conceptual Flash + Adaptive Mini-Quiz',
      icon: PenTool,
      color: 'violet',
      badge: 'Adaptive Quiz',
    },
  ];

  const handleModeSwitch = (mode: StudentFormatMode) => {
    setActiveFormatMode(mode);
    announce(`Switched student view to ${mode} mode`);
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Top Breadcrumb & Source Lesson Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <button
              onClick={onBackToDashboard}
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Teacher Dashboard</span>
            </button>
            <span>/</span>
            <span className="text-indigo-400">Multi-Format Viewer</span>
            <span>/</span>
            <span className="text-slate-200">1 Source ──► 5 Modalities</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mt-1.5">
            {mockLessonOverview.title}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {mockLessonOverview.subtitle}
          </p>
        </div>

        {/* Current Learner Accommodation Pill */}
        {activeStudent && (
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
            <img
              src={activeStudent.avatar}
              alt={activeStudent.name}
              className="h-8 w-8 rounded-lg object-cover ring-1 ring-indigo-500/40"
            />
            <div className="text-left text-xs">
              <span className="font-semibold text-white block">
                Profile: {activeStudent.name}
              </span>
              <span className="text-[10px] text-indigo-400 font-mono">
                {activeStudent.primaryAccommodation.split('(')[0].trim()}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 5-Mode Segmented Control Bar (Linear/Vercel Aesthetic) */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-2 shadow-xl backdrop-blur-md">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {formatModes.map((mode) => {
            const Icon = mode.icon;
            const isActive = activeFormatMode === mode.id;

            return (
              <button
                key={mode.id}
                onClick={() => handleModeSwitch(mode.id)}
                className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all relative overflow-hidden group ${
                  isActive
                    ? 'bg-slate-800 border-indigo-500 text-white shadow-md shadow-indigo-500/10 ring-1 ring-indigo-500/40'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700 hover:bg-slate-900'
                }`}
                aria-current={isActive ? 'true' : undefined}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-violet-500" />
                )}

                <div className="flex items-center justify-between w-full mb-1">
                  <div
                    className={`h-7 w-7 rounded-lg flex items-center justify-center transition-colors ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${
                      isActive
                        ? 'bg-indigo-950 text-indigo-300 border-indigo-700'
                        : 'bg-slate-900 text-slate-500 border-slate-800'
                    }`}
                  >
                    {mode.badge}
                  </span>
                </div>

                <span className={`text-xs font-bold block ${isActive ? 'text-white' : 'text-slate-300'}`}>
                  {mode.label}
                </span>
                <span className="text-[10px] text-slate-400 leading-tight mt-0.5 line-clamp-1">
                  {mode.sublabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Active Format Mode View */}
      <div className="mt-6">
        {activeFormatMode === 'visual' && <VisualImpairmentView />}
        {activeFormatMode === 'hearing' && <HearingImpairmentView />}
        {activeFormatMode === 'reading' && <ReadingDifficultyView />}
        {activeFormatMode === 'language' && <LanguageBarrierView />}
        {activeFormatMode === 'practice' && <ExtraPracticeView />}
      </div>

    </div>
  );
};
