import React from 'react';
import {
  FileText,
  Image as ImageIcon,
  Eye,
  Volume2,
  Subtitles,
  Languages,
  ArrowRight,
  Code2,
  CheckCircle2,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { PipelineStageId } from '../../types';
import {
  mockDiagrams,
  mockCaptions,
  mockHindiGlossary,
  mockLessonOverview,
} from '../../data/mockData';

interface PipelineOutputInspectorProps {
  selectedStageId: PipelineStageId;
  onLaunchStudentView: () => void;
}

export const PipelineOutputInspector: React.FC<PipelineOutputInspectorProps> = ({
  selectedStageId,
  onLaunchStudentView,
}) => {
  return (
    <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 shadow-xl backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-2.5">
          <Code2 className="h-4 w-4 text-indigo-400" />
          <h3 className="text-sm font-bold text-white">
            Artifact Inspector: Stage Artifacts & Telemetry
          </h3>
        </div>
        <button
          onClick={onLaunchStudentView}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 transition-all hover:scale-105"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Launch Multi-Format Student Viewer</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="mt-5">
        {/* Stage 1: Structured Text Extraction */}
        {selectedStageId === 'ocr' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
              <div className="text-emerald-400 font-bold"># Extracted Section: Cellular Photosynthesis (Ch. 4)</div>
              <div className="text-slate-400">// Tokenized 4,312 words, 14 headings, 3 structural equations</div>
              <p className="text-slate-200">
                Photosynthesis is the fundamental biological process through which photosynthetic organisms
                convert electromagnetic solar radiation into stable chemical potential energy stored in the covalent
                bonds of carbohydrates.
              </p>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-indigo-300 font-mono text-[11px]">
                Overall Equation: 6 CO₂ + 6 H₂O + Photons ───► C₆H₁₂O₆ + 6 O₂ [ΔG°' = +2870 kJ/mol]
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-800">
                <span className="text-slate-400 block text-[10px] font-mono">PARSED PARAGRAPHS</span>
                <span className="font-bold text-white text-sm">34 Semantic Blocks</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-800">
                <span className="text-slate-400 block text-[10px] font-mono">CONFIDENCE SCORE</span>
                <span className="font-bold text-emerald-400 text-sm">99.8% OCR Accuracy</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-800">
                <span className="text-slate-400 block text-[10px] font-mono">TARGET ACCOMMODATION</span>
                <span className="font-bold text-indigo-400 text-sm">Dyslexia & Plain Text</span>
              </div>
            </div>
          </div>
        )}

        {/* Stage 2: Diagram & Visual Identification */}
        {selectedStageId === 'diagrams' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockDiagrams.map((diag) => (
                <div key={diag.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-200">{diag.title}</span>
                    <span className="text-[10px] font-mono bg-indigo-950 text-indigo-400 px-2 py-0.5 rounded border border-indigo-800/40">
                      Vision Segmented
                    </span>
                  </div>
                  <div className="h-32 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center p-3 relative overflow-hidden">
                    <div className="absolute inset-2 border border-dashed border-indigo-500/40 rounded flex items-center justify-center">
                      <span className="text-[11px] font-mono text-indigo-300">
                        Bounding Box: [x:120, y:340, w:800, h:520]
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-300">Identified Components: </span>
                    {diag.keyComponents.map((c) => c.label).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stage 3: Tactile Alt Generation */}
        {selectedStageId === 'alt-gen' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 font-mono">
                  [WCAG AAA] Multi-Layered Spatial Audio Narrative
                </span>
                <span className="text-[10px] font-mono text-slate-400">Target: Low Vision & Screen Readers</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
                "{mockDiagrams[0].tactileDescription}"
              </p>
              <div className="p-3 bg-indigo-950/20 rounded-lg border border-indigo-800/40 text-[11px] text-indigo-300">
                <strong>Screen Reader Anchor Tag:</strong> aria-roledescription="scientific-tactile-diagram" aria-details="chloroplast-spatial-map"
              </div>
            </div>
          </div>
        )}

        {/* Stage 4: Audio Narration Slicing */}
        {selectedStageId === 'audio' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-violet-400 font-mono">
                  Neural Studio TTS Narration Stream
                </span>
                <span className="text-[10px] font-mono text-slate-400">Voice: Sarah (Natural AP Science)</span>
              </div>

              {/* Simulated Waveform spectrum */}
              <div className="h-16 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center gap-1.5 px-4 overflow-hidden">
                {[4, 12, 28, 16, 24, 8, 32, 20, 14, 26, 18, 30, 22, 10, 24, 16, 32, 8, 20, 28, 12, 16, 26, 14, 20].map((h, i) => (
                  <div
                    key={i}
                    className="w-1.5 rounded-full bg-indigo-500/80 transition-all duration-300"
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs pt-1">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 text-[10px] block font-mono">TOTAL DURATION</span>
                  <span className="font-bold text-white font-mono">12m 40s</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 text-[10px] block font-mono">AUDIO CHAPTERS</span>
                  <span className="font-bold text-white font-mono">6 Slices</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 text-[10px] block font-mono">CADENCE PACING</span>
                  <span className="font-bold text-emerald-400 font-mono">135 WPM (Relaxed)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stage 5: Synchronized Caption Building */}
        {selectedStageId === 'captions' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-sky-400 font-mono block">
                Synchronized WebVTT / JSON Captions with Acoustic Cues
              </span>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {mockCaptions.slice(0, 4).map((c) => (
                  <div key={c.id} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                      <span>{c.startSec.toFixed(1)}s ──► {c.endSec.toFixed(1)}s</span>
                      {c.soundCue && (
                        <span className="text-amber-400 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20">
                          Sound Cue: [{c.soundCue}]
                        </span>
                      )}
                    </div>
                    <p className="text-slate-200">
                      <strong className="text-indigo-400">{c.speaker}:</strong> "{c.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Stage 6: Regional Translation */}
        {selectedStageId === 'translation' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 font-mono">
                  Target: Hindi (हिंदी) Regional STEM Terminology
                </span>
                <span className="text-[10px] font-mono text-slate-400">Dual Vocabulary Index</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {mockHindiGlossary.slice(0, 4).map((item) => (
                  <div key={item.term} className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-indigo-300">{item.original}</span>
                      <span className="text-emerald-400 font-bold">{item.translation}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                      {item.simplifiedExplanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
