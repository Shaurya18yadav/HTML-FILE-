import React from 'react';
import {
  FileText,
  Image as ImageIcon,
  Eye,
  Volume2,
  Subtitles,
  Languages,
  CheckCircle2,
  RefreshCw,
  Clock,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { PipelineStage, PipelineStageId } from '../../types';

interface PipelineStageTrackerProps {
  stages: PipelineStage[];
  activeStageIndex: number;
  selectedStageId: PipelineStageId;
  onSelectStage: (id: PipelineStageId) => void;
  isRunning: boolean;
}

export const PipelineStageTracker: React.FC<PipelineStageTrackerProps> = ({
  stages,
  activeStageIndex,
  selectedStageId,
  onSelectStage,
  isRunning,
}) => {
  const getStageIcon = (id: PipelineStageId) => {
    switch (id) {
      case 'ocr':
        return FileText;
      case 'diagrams':
        return ImageIcon;
      case 'alt-gen':
        return Eye;
      case 'audio':
        return Volume2;
      case 'captions':
        return Subtitles;
      case 'translation':
        return Languages;
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono font-medium text-indigo-400 uppercase tracking-wider">
            Step 2: AI Execution Tracker
          </span>
          <h2 className="text-base font-bold text-white mt-0.5">
            End-to-End Multimodal Transformation Pipeline
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>Click any stage to inspect output artifacts</span>
        </div>
      </div>

      {/* Stepper Pipeline Cards */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {stages.map((stage, index) => {
          const Icon = getStageIcon(stage.id);
          const isSelected = selectedStageId === stage.id;
          const isCurrentActive = isRunning && activeStageIndex === index;
          const isFinished = stage.status === 'completed';

          return (
            <div
              key={stage.id}
              onClick={() => onSelectStage(stage.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden group ${
                isSelected
                  ? 'bg-slate-800/90 border-indigo-500 shadow-md shadow-indigo-500/10 ring-1 ring-indigo-500/30'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              {/* Highlight bar */}
              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-violet-500" />
              )}

              {/* Status Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`h-8 w-8 rounded-lg flex items-center justify-center transition-colors ${
                      isFinished
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : isCurrentActive
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-400 animate-pulse'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-200 group-hover:text-indigo-300 transition-colors">
                      {stage.name}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-400">
                      Phase {index + 1} of {stages.length}
                    </span>
                  </div>
                </div>

                {/* State Badge */}
                <div>
                  {isFinished ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <CheckCircle2 className="h-3 w-3" />
                      {stage.duration}
                    </span>
                  ) : isCurrentActive ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/30">
                      <RefreshCw className="h-3 w-3 animate-spin" />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                      <Clock className="h-3 w-3" />
                      Queued
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="mt-2.5 text-xs text-slate-400 leading-relaxed line-clamp-2">
                {stage.description}
              </p>

              {/* Tag pill */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-[10px] font-mono text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/40">
                  {stage.badge}
                </span>
                <span className="text-[10px] text-slate-400 group-hover:text-slate-200 transition-colors">
                  {isSelected ? 'Viewing Artifact →' : 'Inspect →'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
