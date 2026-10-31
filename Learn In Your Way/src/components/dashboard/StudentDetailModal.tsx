import React from 'react';
import {
  X,
  User,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Volume2,
  Eye,
  Languages,
  PenTool,
  Award,
} from 'lucide-react';
import { Student, StudentFormatMode } from '../../types';

interface StudentDetailModalProps {
  student: Student | null;
  onClose: () => void;
  onLaunchStudentView: (student: Student, mode: StudentFormatMode) => void;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  student,
  onClose,
  onLaunchStudentView,
}) => {
  if (!student) return null;

  const modeIcons: Record<StudentFormatMode, any> = {
    visual: Eye,
    hearing: Volume2,
    reading: BookOpen,
    language: Languages,
    practice: PenTool,
  };

  const modeLabels: Record<StudentFormatMode, string> = {
    visual: 'Visual Impairment (Tactile Audio & Alt)',
    hearing: 'Hearing Impairment (Synchronized Captions)',
    reading: 'Reading Difficulty (Lexend & Simplified)',
    language: 'Language Barrier (Regional Hindi/Spanish)',
    practice: 'Extra Practice (Concept Cards & Quiz)',
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="student-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-xl rounded-2xl border border-slate-700/80 bg-slate-900 p-6 shadow-2xl text-slate-100">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <img
              src={student.avatar}
              alt={student.name}
              className="h-12 w-12 rounded-xl object-cover ring-2 ring-indigo-500/30"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 id="student-modal-title" className="text-lg font-bold text-white">
                  {student.name}
                </h3>
                <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700/60">
                  {student.grade}
                </span>
              </div>
              <p className="text-xs text-indigo-400 font-medium mt-0.5">
                {student.primaryAccommodation}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="mt-5 space-y-4">
          
          {/* Status & Telemetry */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Current Lesson Progress
              </span>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-lg font-bold font-mono text-white">
                  {student.progressPercent}%
                </span>
                <span className="text-xs text-slate-400">{student.lastActive}</span>
              </div>
              <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-indigo-500 h-full rounded-full transition-all"
                  style={{ width: `${student.progressPercent}%` }}
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Learning Status Note
              </span>
              <div className="mt-1.5 flex items-start gap-1.5">
                {student.status === 'needs-review' ? (
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                )}
                <p className="text-xs text-slate-300 leading-snug">
                  {student.statusNote}
                </p>
              </div>
            </div>
          </div>

          {/* IEP Goal */}
          <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-800/40">
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-semibold text-indigo-300">
                Individualized Education Plan (IEP) Focus
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {student.iepGoal}
            </p>
          </div>

          {/* Assigned Formats */}
          <div>
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
              Generated Inclusive Modalities (Click to Test Directly)
            </label>
            <div className="space-y-2">
              {student.assignedFormats.map((format) => {
                const IconComponent = modeIcons[format];
                return (
                  <button
                    key={format}
                    onClick={() => {
                      onLaunchStudentView(student, format);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700 hover:border-indigo-500/60 transition-all text-left group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-slate-100 block group-hover:text-indigo-300">
                          {modeLabels[format]}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Optimized for current lesson: Cellular Photosynthesis
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onLaunchStudentView(student, student.assignedFormats[0]);
              onClose();
            }}
            className="px-4 py-2 rounded-xl text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-colors"
          >
            <span>Launch Student's Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
