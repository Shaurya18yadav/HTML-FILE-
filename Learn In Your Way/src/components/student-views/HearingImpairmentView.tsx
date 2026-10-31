import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Subtitles,
  Search,
  Bell,
  Sparkles,
  Maximize2,
  CheckCircle2,
  Tv,
} from 'lucide-react';
import { mockCaptions, mockLessonOverview } from '../../data/mockData';
import { useAccessibility } from '../../context/AccessibilityContext';

export const HearingImpairmentView: React.FC = () => {
  const { announce } = useAccessibility();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSec, setCurrentSec] = useState(0);
  const [searchFilter, setSearchFilter] = useState('');
  const [activeCaptionIndex, setActiveCaptionIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Maximum lecture clip length
  const totalSeconds = 38.0;

  // Real-time playback timer simulation
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSec((prev) => {
          if (prev >= totalSeconds) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.5;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Sync active caption
  useEffect(() => {
    const activeIdx = mockCaptions.findIndex(
      (c) => currentSec >= c.startSec && currentSec <= c.endSec
    );
    if (activeIdx !== -1) {
      setActiveCaptionIndex(activeIdx);
    }
  }, [currentSec]);

  const activeCaption = mockCaptions[activeCaptionIndex] || mockCaptions[0];

  const handleSeek = (sec: number) => {
    setCurrentSec(sec);
    announce(`Jumped to lecture timestamp ${sec.toFixed(1)} seconds`);
  };

  const filteredCaptions = mockCaptions.filter((c) =>
    c.text.toLowerCase().includes(searchFilter.toLowerCase()) ||
    (c.soundCue && c.soundCue.toLowerCase().includes(searchFilter.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="rounded-xl border border-sky-500/40 bg-sky-950/20 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center border border-sky-500/30">
            <Subtitles className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">Hearing Impairment & Deaf Accessibility Suite</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                100% Visualized Sound Cues
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Live synchronized transcript captions with non-speech acoustic cues and interactive timestamp navigation.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-sky-300 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
          <Bell className="w-4 h-4 text-amber-400" />
          <span>Acoustic Cue Badges Enabled</span>
        </div>
      </div>

      {/* Synchronized Lecture Video & Caption Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left: Video Player Simulator with Big Subtitle Overlay */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-slate-700/80 bg-slate-950 p-5 shadow-2xl relative overflow-hidden">
          
          {/* Top Video Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <Tv className="w-4 h-4 text-sky-400" />
              <span className="text-xs font-bold text-slate-200">
                Live Science Lecture Stream: Cellular Photosynthesis
              </span>
            </div>
            <span className="text-[10px] font-mono bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800/40">
              1080p HD • Subtitles ON
            </span>
          </div>

          {/* Visual Simulation Screen */}
          <div className="my-4 relative aspect-video w-full rounded-xl bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/80 border border-slate-800 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
            
            {/* Visual sound cue alert banner inside video */}
            {activeCaption.soundCue && (
              <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono animate-bounce">
                <Bell className="w-3.5 h-3.5" />
                <span>Sound Cue: [{activeCaption.soundCue}]</span>
              </div>
            )}

            {/* Pulsing Speaker Avatar & Visual Soundwaves */}
            <div className="relative mb-3">
              <div className={`h-20 w-20 rounded-2xl bg-gradient-to-tr from-sky-600 to-indigo-600 p-1 flex items-center justify-center shadow-lg ${isPlaying ? 'ring-4 ring-sky-400/40 animate-pulse' : ''}`}>
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
                  alt="Dr. Sarah Mitchell"
                  className="h-full w-full object-cover rounded-xl"
                />
              </div>
              {isPlaying && (
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.5 rounded-full font-mono">
                  SPEAKING
                </div>
              )}
            </div>

            <span className="text-xs font-bold text-slate-300 font-mono">
              Dr. Sarah Mitchell • AP Biology Lead
            </span>

            {/* Overlaid Captions Container (Vercel/Linear Style) */}
            <div className="absolute bottom-4 inset-x-4 bg-slate-950/90 backdrop-blur-md p-3.5 rounded-xl border border-sky-500/40 shadow-xl">
              <div className="flex items-center justify-between text-[10px] font-mono text-sky-400 mb-1">
                <span>[Captions • 100% Synced]</span>
                <span>{activeCaption.startSec.toFixed(1)}s - {activeCaption.endSec.toFixed(1)}s</span>
              </div>
              <p className="text-sm font-medium text-white leading-relaxed">
                {activeCaption.text}
              </p>
            </div>
          </div>

          {/* Bottom Scrubbing & Playback Bar */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="h-10 w-10 rounded-xl bg-sky-600 hover:bg-sky-500 text-white flex items-center justify-center shadow-md shadow-sky-600/30 transition-transform hover:scale-105 shrink-0"
                aria-label={isPlaying ? 'Pause lecture' : 'Play lecture'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>

              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max={totalSeconds}
                  step="0.5"
                  value={currentSec}
                  onChange={(e) => handleSeek(Number(e.target.value))}
                  aria-label="Lecture time scrubber"
                  className="w-full accent-sky-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-1">
                  <span>{currentSec.toFixed(1)}s</span>
                  <span>{totalSeconds.toFixed(1)}s</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right: Interactive Synchronized Transcript & Sound Cue Explorer */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl backdrop-blur-md flex flex-col justify-between">
          
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Subtitles className="h-4 w-4 text-sky-400" />
                <h3 className="text-sm font-bold text-white">
                  Synchronized Interactive Transcript
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                Click any line to jump
              </span>
            </div>

            {/* Transcript Search */}
            <div className="mt-3 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search captions or sound cues..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:border-sky-500 focus:outline-none"
              />
            </div>

            {/* Caption List */}
            <div
              ref={scrollRef}
              className="mt-3.5 space-y-2.5 max-h-[380px] overflow-y-auto pr-1"
            >
              {filteredCaptions.map((cap, idx) => {
                const isActive = activeCaptionIndex === idx;
                return (
                  <div
                    key={cap.id}
                    onClick={() => handleSeek(cap.startSec)}
                    className={`p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                      isActive
                        ? 'bg-sky-950/60 border-sky-400 shadow-md ring-1 ring-sky-500/30'
                        : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                      <span className={isActive ? 'text-sky-300 font-bold' : 'text-slate-400'}>
                        {cap.startSec.toFixed(1)}s
                      </span>
                      {cap.soundCue && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px]">
                          <Bell className="w-2.5 h-2.5" />
                          [{cap.soundCue}]
                        </span>
                      )}
                    </div>

                    <p className={`leading-relaxed ${isActive ? 'text-white font-semibold' : 'text-slate-300'}`}>
                      {cap.text}
                    </p>

                    {cap.keyTerms && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {cap.keyTerms.map((term) => (
                          <span
                            key={term}
                            className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-sky-300 border border-slate-700"
                          >
                            #{term}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ASL / Visual Concept Notation Tip */}
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
            <span>
              All scientific terms include contextual visual definition popovers for hearing-impaired learners.
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};
