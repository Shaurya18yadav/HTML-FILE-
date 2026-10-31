import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle,
  Sparkles,
  BookOpen,
  ArrowRight,
  TrendingUp,
  FileCheck,
  ShieldCheck,
} from 'lucide-react';
import { mockFlaggedTopics, mockLessonOverview } from '../../data/mockData';
import { useAccessibility } from '../../context/AccessibilityContext';

interface ClassInsightsProps {
  onGoToPipeline: () => void;
}

export const ClassInsights: React.FC<ClassInsightsProps> = ({ onGoToPipeline }) => {
  const { announce } = useAccessibility();
  const [topics, setTopics] = useState(mockFlaggedTopics);
  const [resolvedId, setResolvedId] = useState<string | null>(null);

  const handleResolve = (id: string) => {
    setResolvedId(id);
    setTimeout(() => {
      setTopics((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, status: 'Resolved with Tactile Synthesis' } : t
        )
      );
      announce('Flagged topic accessibility issue resolved automatically by AI.');
    }, 600);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      
      {/* Current Active Lesson Card */}
      <div className="lg:col-span-1 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider font-semibold">
              Active Unit Lesson
            </span>
            <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400 border border-emerald-500/20">
              Live in Class
            </span>
          </div>

          <h3 className="text-base font-bold text-white leading-snug">
            {mockLessonOverview.title}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {mockLessonOverview.subtitle}
          </p>

          <div className="mt-4 space-y-2 text-xs text-slate-300">
            <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Class Target:</span>
              <span className="font-medium text-slate-200">{mockLessonOverview.course}</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Audio Narration:</span>
              <span className="font-mono text-indigo-300">12:40 Studio Quality</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Multimodal Formats:</span>
              <span className="font-semibold text-emerald-400">5 Active Profiles</span>
            </div>
          </div>
        </div>

        <button
          onClick={onGoToPipeline}
          className="mt-5 w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600/90 hover:bg-indigo-600 py-2.5 px-4 text-xs font-semibold text-white shadow-md shadow-indigo-600/20 transition-all hover:gap-3"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Inspect or Re-Run Transformation Pipeline</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Flagged Topics Review Hub */}
      <div className="lg:col-span-2 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white">
              AI Accessibility Guardrails & Flagged Reviews
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {topics.length} items flagged for attention
          </span>
        </div>

        <div className="space-y-3">
          {topics.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-slate-700 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-200">
                    {item.topic}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.2 rounded-full border ${
                      item.severity.includes('High')
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/25'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/25'
                    }`}
                  >
                    {item.severity}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
                  {item.issue}
                </p>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-0.5">
                  <span>Affects {item.affectedStudents} students with IEP accommodations</span>
                  <span>•</span>
                  <span className="text-indigo-400 font-medium">{item.status}</span>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                {item.status.includes('Resolved') ? (
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-medium bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Verified
                  </span>
                ) : (
                  <button
                    onClick={() => handleResolve(item.id)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition-all shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Auto-Synthesize</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Global Compliance Bar */}
        <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>WCAG 2.2 Level AAA Automated Accessibility Standard: Verified</span>
          </div>
          <span className="font-mono text-emerald-400 font-bold">99.2% Score</span>
        </div>
      </div>

    </div>
  );
};
