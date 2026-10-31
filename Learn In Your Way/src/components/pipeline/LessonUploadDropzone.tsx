import React, { useState } from 'react';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  FileCode,
  Check,
  RefreshCw,
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

interface LessonUploadDropzoneProps {
  onStartPipeline: (fileName: string) => void;
  isRunning: boolean;
  isCompleted: boolean;
}

export const LessonUploadDropzone: React.FC<LessonUploadDropzoneProps> = ({
  onStartPipeline,
  isRunning,
  isCompleted,
}) => {
  const { announce } = useAccessibility();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState('Cellular_Photosynthesis_Chapter_4.pdf');

  const presetSamples = [
    {
      name: 'Cellular_Photosynthesis_Chapter_4.pdf',
      size: '4.8 MB',
      pages: '14 pages',
      badge: 'Recommended Demo',
      topic: 'Photosynthesis & Calvin Cycle',
    },
    {
      name: 'Human_Circulatory_System_Grade_10.pdf',
      size: '3.6 MB',
      pages: '10 pages',
      badge: 'Cardiovascular',
      topic: 'Heart & Pulmonary Circuits',
    },
    {
      name: 'Newtonian_Mechanics_Laws_of_Motion.pdf',
      size: '5.1 MB',
      pages: '18 pages',
      badge: 'Physics',
      topic: 'Forces & Equilibrium',
    },
  ];

  const handleSelect = (fileName: string) => {
    setSelectedFile(fileName);
    announce(`Selected sample document: ${fileName}`);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setSelectedFile('Cellular_Photosynthesis_Chapter_4.pdf');
    announce('Uploaded chapter document: Cellular Photosynthesis Chapter 4.pdf');
  };

  return (
    <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 shadow-xl backdrop-blur-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-5 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono font-medium text-indigo-400 uppercase tracking-wider">
            Step 1: Document Ingestion
          </span>
          <h2 className="text-lg font-bold text-white mt-0.5">
            Upload Lesson Material for Multimodal Synthesis
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Drop standard classroom PDFs, textbooks, or scanned chapters. The AI pipeline will automatically build 5 accessible modalities.
          </p>
        </div>

        {/* Status Pill */}
        <div>
          {isCompleted ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Pipeline Processed
            </span>
          ) : isRunning ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 animate-pulse">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              Synthesizing Modalities...
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
              Ready to Ingest
            </span>
          )}
        </div>
      </div>

      {/* Drop Area & Presets */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Interactive Drop Box */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`lg:col-span-7 rounded-xl border-2 border-dashed p-6 flex flex-col items-center justify-center text-center transition-all ${
            isDragging
              ? 'border-indigo-400 bg-indigo-500/10 scale-[0.99]'
              : 'border-slate-700/80 bg-slate-950/60 hover:border-slate-600'
          }`}
        >
          <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20 mb-3">
            <UploadCloud className="h-6 w-6" />
          </div>

          <h3 className="text-sm font-semibold text-slate-200">
            Drag & Drop chapter PDF here
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm">
            Supports textbook PDFs, DOCX worksheets, or scanned biology handouts (up to 50MB)
          </p>

          {/* Active File indicator */}
          <div className="mt-4 flex items-center gap-3 bg-slate-900 border border-slate-700/80 px-3.5 py-2 rounded-xl text-left shadow-sm">
            <FileText className="h-5 w-5 text-indigo-400 shrink-0" />
            <div>
              <span className="text-xs font-semibold text-slate-100 block">
                {selectedFile}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                4.8 MB • High Resolution Illustrated Textbook Chapter
              </span>
            </div>
            <Check className="h-4 w-4 text-emerald-400 ml-2" />
          </div>

          {/* Action Trigger */}
          <div className="mt-5 flex items-center gap-3">
            <button
              onClick={() => onStartPipeline(selectedFile)}
              disabled={isRunning}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold text-white shadow-lg transition-all ${
                isRunning
                  ? 'bg-slate-800 cursor-not-allowed text-slate-400'
                  : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-indigo-600/30 hover:scale-[1.02]'
              }`}
            >
              {isRunning ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin text-indigo-300" />
                  <span>Processing Extraction Pipeline...</span>
                </>
              ) : isCompleted ? (
                <>
                  <RefreshCw className="h-4 w-4 text-emerald-300" />
                  <span>Re-Run Transformation Pipeline</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Execute Multimodal AI Pipeline</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Preset Sample Chapters */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-2">
          <div>
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
              Or Choose Pre-Loaded Curriculum Chapter:
            </label>
            <div className="space-y-2">
              {presetSamples.map((sample) => {
                const isSelected = selectedFile === sample.name;
                return (
                  <div
                    key={sample.name}
                    onClick={() => handleSelect(sample.name)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-indigo-950/40 border-indigo-500/80 shadow-md ring-1 ring-indigo-500/20'
                        : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileCode className="h-4 w-4 text-indigo-400" />
                        <span className="text-xs font-semibold text-slate-200">
                          {sample.topic}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {sample.badge}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span>{sample.name}</span>
                      <span>{sample.size}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-2.5">
            <Sparkles className="h-4 w-4 text-violet-400 shrink-0" />
            <span>
              All extractions are automatically verified against WCAG AAA color contrast & semantic header hierarchies.
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
