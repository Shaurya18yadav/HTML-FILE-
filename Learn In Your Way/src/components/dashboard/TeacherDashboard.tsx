import React, { useState } from 'react';
import {
  Users,
  Layers,
  AlertCircle,
  ShieldCheck,
  PlusCircle,
  FileDown,
  Sparkles,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { MetricCard } from './MetricCard';
import { StudentTable } from './StudentTable';
import { StudentDetailModal } from './StudentDetailModal';
import { ClassInsights } from './ClassInsights';
import { mockMetrics, mockStudents } from '../../data/mockData';
import { Student, StudentFormatMode, AppScreen } from '../../types';
import { useAccessibility } from '../../context/AccessibilityContext';

interface TeacherDashboardProps {
  onNavigateToPipeline: () => void;
  onLaunchStudentView: (student: Student, mode: StudentFormatMode) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  onNavigateToPipeline,
  onLaunchStudentView,
}) => {
  const { announce } = useAccessibility();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showExportToast, setShowExportToast] = useState(false);

  const handleExportReport = () => {
    setShowExportToast(true);
    announce('Exported IEP Accessibility and Multimodal Compliance Report.');
    setTimeout(() => setShowExportToast(false), 3000);
  };

  return (
    <div className="space-y-7 pb-16">
      
      {/* Toast Alert */}
      {showExportToast && (
        <div className="fixed top-20 right-6 z-50 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xl animate-in fade-in slide-in-from-top-2">
          ✓ Exported Class 10 IEP Accessibility Audit (PDF + JSON)
        </div>
      )}

      {/* Header / Intro Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-medium text-indigo-400 uppercase tracking-wider">
              Educator Command Center
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs text-slate-400">Class 10-A / Biology</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
            Universal Learning Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Monitor real-time engagement and automated multimodal adaptation for all 28 diverse learners.
          </p>
        </div>

        {/* Top Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportReport}
            className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/90 hover:bg-slate-800 px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white transition-colors"
          >
            <FileDown className="h-3.5 w-3.5 text-slate-400" />
            <span>Export IEP Audit</span>
          </button>

          <button
            onClick={onNavigateToPipeline}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:scale-[1.02]"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Transform Lesson Chapter</span>
          </button>
        </div>
      </div>

      {/* High-level Class Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="ACTIVE STUDENTS"
          value={mockMetrics.activeStudents}
          subValue={`/ ${mockMetrics.totalStudents} enrolled`}
          change="+100%"
          trend="up"
          icon={Users}
          accentColor="indigo"
        />

        <MetricCard
          title="FORMATS GENERATED"
          value={`${mockMetrics.avgFormatsGenerated} avg`}
          subValue="per source PDF"
          change="+18%"
          trend="up"
          icon={Layers}
          accentColor="emerald"
        />

        <MetricCard
          title="TOPICS FLAGGED FOR REVIEW"
          value={mockMetrics.topicsFlagged}
          subValue="Photosynthesis Ch. 4"
          change="Needs review"
          trend="down"
          icon={AlertCircle}
          accentColor="amber"
        />

        <MetricCard
          title="WCAG AAA COMPLIANCE"
          value={`${mockMetrics.wcagComplianceRate}%`}
          subValue="Verified standard"
          change="+0.8%"
          trend="up"
          icon={ShieldCheck}
          accentColor="violet"
        />
      </div>

      {/* Class Insights & Flagged Topics Hub */}
      <ClassInsights onGoToPipeline={onNavigateToPipeline} />

      {/* Student Progress & Accessibility Mapping Table */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <h2 className="text-base font-bold text-white">
              Student Accommodations & Progress Matrix
            </h2>
            <p className="text-xs text-slate-400">
              Personalized modalities dynamically tailored to individual IEP and sensory learning requirements.
            </p>
          </div>
        </div>

        <StudentTable
          students={mockStudents}
          onSelectStudent={(student) => setSelectedStudent(student)}
          onQuickLaunchMode={(student, mode) => onLaunchStudentView(student, mode)}
        />
      </div>

      {/* Student Detail Modal */}
      <StudentDetailModal
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
        onLaunchStudentView={onLaunchStudentView}
      />

    </div>
  );
};
