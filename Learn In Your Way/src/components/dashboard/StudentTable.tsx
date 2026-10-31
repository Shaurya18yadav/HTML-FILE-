import React, { useState } from 'react';
import {
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ArrowUpRight,
  Eye,
  Volume2,
  BookOpen,
  Languages,
  PenTool,
  MoreVertical,
} from 'lucide-react';
import { Student, StudentFormatMode } from '../../types';

interface StudentTableProps {
  students: Student[];
  onSelectStudent: (student: Student) => void;
  onQuickLaunchMode: (student: Student, mode: StudentFormatMode) => void;
}

export const StudentTable: React.FC<StudentTableProps> = ({
  students,
  onSelectStudent,
  onQuickLaunchMode,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [formatFilter, setFormatFilter] = useState<'all' | StudentFormatMode>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'on-track' | 'needs-review' | 'high-engagement'>('all');

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.primaryAccommodation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.currentLesson.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFormat =
      formatFilter === 'all' || student.assignedFormats.includes(formatFilter);

    const matchesStatus =
      statusFilter === 'all' || student.status === statusFilter;

    return matchesSearch && matchesFormat && matchesStatus;
  });

  const getFormatBadge = (mode: StudentFormatMode) => {
    switch (mode) {
      case 'visual':
        return {
          icon: Eye,
          label: 'Audio/Tactile',
          style: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
        };
      case 'hearing':
        return {
          icon: Volume2,
          label: 'Captions + Cues',
          style: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
        };
      case 'reading':
        return {
          icon: BookOpen,
          label: 'Lexend / Bionic',
          style: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        };
      case 'language':
        return {
          icon: Languages,
          label: 'Bilingual Hindi/ES',
          style: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
        };
      case 'practice':
        return {
          icon: PenTool,
          label: 'Adaptive Quiz',
          style: 'bg-violet-500/10 text-violet-400 border-violet-500/30',
        };
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 shadow-xl backdrop-blur-md overflow-hidden">
      
      {/* Table Controls Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-800 flex flex-col md:flex-row gap-3 md:items-center justify-between">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search students, accommodations, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl bg-slate-950/80 border border-slate-800 pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Format Modality Tabs */}
          <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
            {(
              [
                { id: 'all', label: 'All Modalities' },
                { id: 'visual', label: 'Visual' },
                { id: 'hearing', label: 'Hearing' },
                { id: 'reading', label: 'Reading' },
                { id: 'language', label: 'Bilingual' },
                { id: 'practice', label: 'Practice' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFormatFilter(tab.id as any)}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-lg transition-all ${
                  formatFilter === tab.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Status Select */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="rounded-xl bg-slate-950/80 border border-slate-800 px-3 py-1.5 text-xs text-slate-300 focus:border-indigo-500 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="on-track">On Track</option>
            <option value="needs-review">Needs Review</option>
            <option value="high-engagement">High Engagement</option>
          </select>
        </div>

      </div>

      {/* Table Element */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/40 border-b border-slate-800/80 text-[11px] font-mono uppercase tracking-wider text-slate-400">
            <tr>
              <th scope="col" className="py-3 px-4 sm:px-6 font-medium">Student Learner</th>
              <th scope="col" className="py-3 px-4 font-medium">Assigned Formats & Accommodations</th>
              <th scope="col" className="py-3 px-4 font-medium">Learning Status</th>
              <th scope="col" className="py-3 px-4 font-medium">Progress</th>
              <th scope="col" className="py-3 px-4 font-medium">Last Active</th>
              <th scope="col" className="py-3 px-4 sm:px-6 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-10 text-slate-400">
                  No students found matching current filters.
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => {
                return (
                  <tr
                    key={student.id}
                    onClick={() => onSelectStudent(student)}
                    className="hover:bg-slate-800/40 transition-colors cursor-pointer group"
                  >
                    {/* Student Name & Avatar */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="h-9 w-9 rounded-xl object-cover ring-1 ring-slate-700/80 group-hover:ring-indigo-500/50 transition-all"
                        />
                        <div>
                          <span className="font-semibold text-slate-100 group-hover:text-indigo-300 transition-colors block">
                            {student.name}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {student.grade} • {student.primaryAccommodation.split('(')[0].trim()}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Assigned Formats */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {student.assignedFormats.map((format) => {
                          const badge = getFormatBadge(format);
                          const IconComp = badge.icon;
                          return (
                            <span
                              key={format}
                              onClick={(e) => {
                                e.stopPropagation();
                                onQuickLaunchMode(student, format);
                              }}
                              title={`Click to launch ${badge.label} student view`}
                              className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium border ${badge.style} hover:scale-105 transition-transform`}
                            >
                              <IconComp className="h-3 w-3" />
                              <span>{badge.label}</span>
                            </span>
                          );
                        })}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4">
                      {student.status === 'on-track' && (
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400 border border-emerald-500/25">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>On Track</span>
                        </div>
                      )}
                      {student.status === 'needs-review' && (
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-[11px] font-medium text-amber-400 border border-amber-500/25">
                          <AlertTriangle className="h-3 w-3" />
                          <span>Needs Review</span>
                        </div>
                      )}
                      {student.status === 'high-engagement' && (
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-2.5 py-1 text-[11px] font-medium text-indigo-400 border border-indigo-500/25">
                          <Flame className="h-3 w-3" />
                          <span>High Velocity</span>
                        </div>
                      )}
                    </td>

                    {/* Progress Bar */}
                    <td className="py-3.5 px-4">
                      <div className="w-28">
                        <div className="flex items-center justify-between text-[11px] mb-1 font-mono">
                          <span className="text-slate-300 font-semibold">{student.progressPercent}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              student.progressPercent > 85
                                ? 'bg-indigo-500'
                                : student.progressPercent > 70
                                ? 'bg-sky-500'
                                : 'bg-amber-500'
                            }`}
                            style={{ width: `${student.progressPercent}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Last Active */}
                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                      {student.lastActive}
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectStudent(student);
                        }}
                        className="inline-flex items-center gap-1 rounded-lg bg-slate-800/80 hover:bg-indigo-600 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white transition-colors border border-slate-700/60 hover:border-indigo-500"
                      >
                        <span>Details</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Summary */}
      <div className="px-4 py-3 bg-slate-950/60 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
        <span>Showing {filteredStudents.length} of {students.length} students enrolled in Class 10 Biology</span>
        <span className="font-mono text-emerald-400">100% Multimodal Format Coverage</span>
      </div>

    </div>
  );
};
