import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Layers,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { LessonUploadDropzone } from './LessonUploadDropzone';
import { PipelineStageTracker } from './PipelineStageTracker';
import { PipelineOutputInspector } from './PipelineOutputInspector';
import { initialPipelineStages } from '../../data/mockData';
import { PipelineStage, PipelineStageId, StudentFormatMode } from '../../types';
import { useAccessibility } from '../../context/AccessibilityContext';

interface PipelineViewProps {
  onLaunchStudentView: (mode?: StudentFormatMode) => void;
}

export const PipelineView: React.FC<PipelineViewProps> = ({ onLaunchStudentView }) => {
  const { announce } = useAccessibility();
  const [stages, setStages] = useState<PipelineStage[]>(initialPipelineStages);
  const [isRunning, setIsRunning] = useState(false);
  const [activeStageIndex, setActiveStageIndex] = useState(5);
  const [selectedStageId, setSelectedStageId] = useState<PipelineStageId>('alt-gen');
  const [isCompleted, setIsCompleted] = useState(true);

  const startPipelineExecution = (fileName: string) => {
    setIsRunning(true);
    setIsCompleted(false);
    announce(`Starting AI multimodal transformation pipeline for ${fileName}...`);

    // Reset stages to idle
    setStages((prev) =>
      prev.map((s, idx) => ({
        ...s,
        status: idx === 0 ? 'processing' : 'idle',
      }))
    );
    setActiveStageIndex(0);
    setSelectedStageId(stages[0].id);

    // Simulate animated execution sequence
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current < stages.length) {
        setActiveStageIndex(current);
        setSelectedStageId(stages[current].id);
        setStages((prev) =>
          prev.map((s, idx) => {
            if (idx < current) return { ...s, status: 'completed' };
            if (idx === current) return { ...s, status: 'processing' };
            return { ...s, status: 'idle' };
          })
        );
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setIsCompleted(true);
        setActiveStageIndex(stages.length - 1);
        setStages((prev) => prev.map((s) => ({ ...s, status: 'completed' })));
        announce('Multimodal pipeline finished! 5 inclusive formats generated.');
      }
    }, 900);
  };

  return (
    <div className="space-y-7 pb-16">
      
      {/* View Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-indigo-400 uppercase tracking-wider">
            AI Content Transformation Engine
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
          <span className="text-xs text-slate-400">One Source ──► Five Inclusive Modalities</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
          Automated Multimodal Adaptation Pipeline
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Ingest raw academic curriculum and automatically generate tactile audio descriptions, synchronized captions, plain-text bionic guides, and regional translations.
        </p>
      </div>

      {/* Step 1: Upload Dropzone */}
      <LessonUploadDropzone
        onStartPipeline={startPipelineExecution}
        isRunning={isRunning}
        isCompleted={isCompleted}
      />

      {/* Step 2: Step-by-Step Progress Execution Tracker */}
      <PipelineStageTracker
        stages={stages}
        activeStageIndex={activeStageIndex}
        selectedStageId={selectedStageId}
        onSelectStage={(id) => setSelectedStageId(id)}
        isRunning={isRunning}
      />

      {/* Step 3: Artifact Inspector */}
      <PipelineOutputInspector
        selectedStageId={selectedStageId}
        onLaunchStudentView={() => onLaunchStudentView('visual')}
      />

      {/* Bottom Launch Banner */}
      <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/60 via-slate-900/90 to-violet-950/60 p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
            <Layers className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              5 Adaptive Formats Ready for Classroom Exploration
            </h3>
            <p className="text-xs text-slate-300">
              Visual Impairment • Hearing Impairment • Reading/Dyslexia • Regional Language • Extra Practice
            </p>
          </div>
        </div>

        <button
          onClick={() => onLaunchStudentView('visual')}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
        >
          <span>Launch Multi-Format Viewer</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

    </div>
  );
};
