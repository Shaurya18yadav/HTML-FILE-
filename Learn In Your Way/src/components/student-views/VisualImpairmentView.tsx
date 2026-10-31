import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Compass,
  Eye,
  Sliders,
  CheckCircle2,
  Headphones,
  Maximize2,
} from 'lucide-react';
import { mockDiagrams, mockLessonOverview } from '../../data/mockData';
import { useAccessibility } from '../../context/AccessibilityContext';

export const VisualImpairmentView: React.FC = () => {
  const { speakText, stopSpeaking, isSpeaking, settings, announce } = useAccessibility();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState(1.25);
  const [activeDiagramIndex, setActiveDiagramIndex] = useState(0);
  const [progressSec, setProgressSec] = useState(45);
  const totalSec = 258; // 4 mins 18 sec

  const activeDiagram = mockDiagrams[activeDiagramIndex];

  const toggleNarration = () => {
    if (isSpeaking || isPlayingAudio) {
      stopSpeaking();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      const textToRead = `${activeDiagram.title}. ${activeDiagram.tactileDescription}`;
      speakText(textToRead);
    }
  };

  const handleReadDiagramSpatialTour = () => {
    stopSpeaking();
    setIsPlayingAudio(true);
    speakText(`Tactile spatial walkthrough of ${activeDiagram.title}: ${activeDiagram.tactileDescription}`);
    announce(`Reading tactile description of ${activeDiagram.title}`);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-6">
      
      {/* Visual Impairment Profile Banner */}
      <div className="rounded-xl border border-indigo-500/40 bg-indigo-950/20 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center border border-indigo-500/30">
            <Eye className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">Visual Impairment & Low Vision Accommodation</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                WCAG AAA Audio-First
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Screen-reader spatial descriptions with tactile audio walkthroughs and directional orientation cues.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-indigo-300 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
          <Headphones className="w-4 h-4 text-indigo-400" />
          <span>Screen Reader Ready</span>
        </div>
      </div>

      {/* Primary Audio Player Widget */}
      <div className="rounded-2xl border border-slate-700/80 bg-slate-900/90 p-6 shadow-xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-400 font-semibold">
              Primary Studio Audio Narration
            </span>
            <h3 className="text-base font-bold text-white mt-0.5">
              Chapter 4: Cellular Photosynthesis & Light-Dependent Reactions
            </h3>
            <p className="text-xs text-slate-400">
              Narrated with SSML pacing markers and enhanced auditory spatial cues
            </p>
          </div>

          {/* Speed Presets */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <span className="text-[11px] font-mono text-slate-400 px-2">Speed:</span>
            {[0.75, 1.0, 1.25, 1.5, 2.0].map((rate) => (
              <button
                key={rate}
                onClick={() => setAudioSpeed(rate)}
                className={`px-2 py-1 rounded-lg text-xs font-mono transition-colors ${
                  audioSpeed === rate
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
                aria-label={`Set playback speed to ${rate}x`}
              >
                {rate}x
              </button>
            ))}
          </div>
        </div>

        {/* Audio Visualizer & Waveform Bar */}
        <div className="my-5 flex items-center justify-between gap-1 h-14 bg-slate-950/80 px-5 rounded-xl border border-slate-800/80 overflow-hidden">
          {[
            12, 24, 38, 20, 44, 28, 16, 50, 32, 22, 40, 30, 48, 26, 18, 42, 34, 24, 46,
            28, 16, 38, 26, 44, 30, 20, 48, 32, 14, 40, 24, 36, 18, 42, 28, 20, 38,
          ].map((val, idx) => {
            const isPast = (idx / 37) * totalSec <= progressSec;
            return (
              <div
                key={idx}
                className={`w-1.5 rounded-full transition-all duration-200 ${
                  isPast
                    ? 'bg-indigo-400 shadow-sm shadow-indigo-400/50'
                    : 'bg-slate-800 hover:bg-slate-700'
                } ${isPlayingAudio ? 'animate-pulse' : ''}`}
                style={{ height: `${val}px` }}
              />
            );
          })}
        </div>

        {/* Time Scrubber */}
        <div className="space-y-1.5">
          <input
            type="range"
            min="0"
            max={totalSec}
            value={progressSec}
            onChange={(e) => setProgressSec(Number(e.target.value))}
            aria-label="Audio scrubber"
            className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>{formatTime(progressSec)}</span>
            <span className="text-indigo-400">Section 2: Thylakoid Membrane Architecture</span>
            <span>{formatTime(totalSec)}</span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setProgressSec((prev) => Math.max(0, prev - 10))}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              aria-label="Rewind 10 seconds"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={toggleNarration}
              className="h-12 w-12 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 transition-transform hover:scale-105"
              aria-label={isPlayingAudio ? 'Pause audio narration' : 'Play audio narration'}
            >
              {isPlayingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>

            <button
              onClick={() => setProgressSec((prev) => Math.min(totalSec, prev + 10))}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              aria-label="Skip forward 10 seconds"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleReadDiagramSpatialTour}
            className="flex items-center gap-2 rounded-xl bg-violet-600/80 hover:bg-violet-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md transition-colors"
          >
            <Compass className="w-4 h-4 text-violet-200" />
            <span>Read Diagram Spatial Tour Aloud</span>
          </button>
        </div>
      </div>

      {/* Tactile & Spatial Diagram Exploration Section */}
      <div className="rounded-2xl border border-slate-700/80 bg-slate-900/90 p-6 shadow-xl backdrop-blur-md">
        
        {/* Diagram Switcher Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
          <div className="flex items-center gap-2">
            <Compass className="h-5 w-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">
              Tactile Spatial Diagram Tour
            </h3>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            {mockDiagrams.map((d, index) => (
              <button
                key={d.id}
                onClick={() => setActiveDiagramIndex(index)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  activeDiagramIndex === index
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {d.category}
              </button>
            ))}
          </div>
        </div>

        {/* Spatial Content Body */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Visual Diagram Representation (High Contrast & Clear Outlines) */}
          <div className="lg:col-span-5 rounded-2xl bg-slate-950 border border-slate-800 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-200">{activeDiagram.title}</span>
              <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800/40">
                Figure 4.1
              </span>
            </div>

            {/* Custom SVG Illustration of Chloroplast */}
            <div className="w-full aspect-[4/3] rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center p-2 relative overflow-hidden">
              <svg viewBox="0 0 400 300" className="w-full h-full drop-shadow">
                {/* Outer Membrane */}
                <ellipse cx="200" cy="150" rx="170" ry="120" fill="#064e3b" stroke="#10b981" strokeWidth="4" />
                {/* Inner Membrane */}
                <ellipse cx="200" cy="150" rx="155" ry="105" fill="#022c22" stroke="#34d399" strokeWidth="2" strokeDasharray="4 2" />
                {/* Stroma cavity label */}
                <text x="210" y="80" fill="#a7f3d0" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
                  Stroma (Aqueous Fluid)
                </text>

                {/* Left Granum (Stack of Thylakoids) */}
                <g transform="translate(90, 110)">
                  <ellipse cx="30" cy="15" rx="30" ry="10" fill="#059669" stroke="#6ee7b7" strokeWidth="2" />
                  <ellipse cx="30" cy="30" rx="30" ry="10" fill="#059669" stroke="#6ee7b7" strokeWidth="2" />
                  <ellipse cx="30" cy="45" rx="30" ry="10" fill="#059669" stroke="#6ee7b7" strokeWidth="2" />
                  <ellipse cx="30" cy="60" rx="30" ry="10" fill="#059669" stroke="#6ee7b7" strokeWidth="2" />
                  <text x="0" y="85" fill="#ffffff" fontSize="11" fontWeight="bold">Granum Stack 1</text>
                </g>

                {/* Center Granum */}
                <g transform="translate(180, 130)">
                  <ellipse cx="30" cy="15" rx="30" ry="10" fill="#059669" stroke="#6ee7b7" strokeWidth="2" />
                  <ellipse cx="30" cy="30" rx="30" ry="10" fill="#059669" stroke="#6ee7b7" strokeWidth="2" />
                  <ellipse cx="30" cy="45" rx="30" ry="10" fill="#059669" stroke="#6ee7b7" strokeWidth="2" />
                  <text x="5" y="70" fill="#ffffff" fontSize="11" fontWeight="bold">Granum 2</text>
                </g>

                {/* Right Granum */}
                <g transform="translate(260, 100)">
                  <ellipse cx="28" cy="15" rx="28" ry="10" fill="#059669" stroke="#6ee7b7" strokeWidth="2" />
                  <ellipse cx="28" cy="30" rx="28" ry="10" fill="#059669" stroke="#6ee7b7" strokeWidth="2" />
                  <ellipse cx="28" cy="45" rx="28" ry="10" fill="#059669" stroke="#6ee7b7" strokeWidth="2" />
                  <ellipse cx="28" cy="60" rx="28" ry="10" fill="#059669" stroke="#6ee7b7" strokeWidth="2" />
                  <text x="0" y="85" fill="#ffffff" fontSize="11" fontWeight="bold">Granum Stack 3</text>
                </g>

                {/* Connecting Lamella Bridge */}
                <path d="M 150 145 Q 180 140 210 145" stroke="#34d399" strokeWidth="3" fill="none" />
                <path d="M 240 145 Q 260 135 288 130" stroke="#34d399" strokeWidth="3" fill="none" />

                {/* Sunlight Photons */}
                <line x1="50" y1="30" x2="100" y2="110" stroke="#facc15" strokeWidth="3" strokeDasharray="3 3" />
                <polygon points="100,110 90,105 95,95" fill="#facc15" />
                <text x="35" y="25" fill="#fde047" fontSize="12" fontWeight="bold">☀️ Sunlight</text>
              </svg>
            </div>
            
            <p className="mt-2 text-[11px] text-slate-400 italic">
              High-contrast vector visual rendered with thick borders and distinct tactile regions for partial vision clarity.
            </p>
          </div>

          {/* Deep Spatial Text Description Block */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-xl bg-slate-950 border border-slate-800 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  Directional Mental Model Map
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Screen Reader ARIA Live Region
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                {activeDiagram.tactileDescription}
              </p>
            </div>

            {/* Key Anatomical Landmark Coordinates */}
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                Spatial Coordinate Key (Touch & Sound Anchors):
              </span>
              <div className="space-y-2">
                {activeDiagram.keyComponents.map((comp, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start justify-between gap-3 text-xs hover:border-indigo-500/40 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{comp.label}</span>
                        <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950 px-2 py-0.2 rounded border border-indigo-800/40">
                          {comp.coordinates}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {comp.role}
                      </p>
                    </div>

                    <button
                      onClick={() => speakText(`${comp.label}: Located at ${comp.coordinates}. ${comp.role}`)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition-colors"
                      aria-label={`Read ${comp.label} audio anchor`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
