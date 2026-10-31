import React, { useState } from 'react';
import {
  BookOpen,
  Volume2,
  VolumeX,
  Type,
  Maximize2,
  Sparkles,
  CheckCircle2,
  AlignLeft,
  SlidersHorizontal,
  Play,
  Pause,
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const ReadingDifficultyView: React.FC = () => {
  const {
    settings,
    toggleDyslexiaFont,
    toggleBionicReading,
    toggleReadingRuler,
    speakText,
    stopSpeaking,
    isSpeaking,
    announce,
  } = useAccessibility();

  const [isSimplified, setIsSimplified] = useState(true);
  const [activeParagraphIndex, setActiveParagraphIndex] = useState<number | null>(null);

  // Standard scientific textbook content
  const standardText = [
    {
      heading: 'Section 4.1: Bioenergetic Transduction in the Thylakoid Matrix',
      body: 'Photosynthesis constitutes the foundational biophysical transducer through which photoautotrophs convert electromagnetic photon radiation into stabilized Gibbs free energy sequestered within covalent hydrocarbon bonds. This transformation occurs within specialized compartmentalized organelle structures designated as chloroplasts, governed by localized electrochemical proton gradients across lipid bilayers.',
    },
    {
      heading: 'Section 4.2: Photolysis and Z-Scheme Photo-Oxidation',
      body: 'During light-dependent transduction, photosystem II (P680) absorbs photons, catalytic water oxidation ensues, releasing diatomic molecular oxygen and four hydrogen protons into the thylakoid lumen. Concomitantly, photo-energized electrons navigate an electron transport chain featuring plastoquinone and cytochrome b6f, culminating in photosystem I (P700) generating NADPH via ferredoxin-NADP+ reductase.',
    },
    {
      heading: 'Section 4.3: Chemiosmotic Phosphorylation via ATP Synthase',
      body: 'The accumulation of stoichiometric proton concentrations within the thylakoid lumen generates a proton-motive force. As protons transit back into the stroma through the rotary CF1-CF0 ATP synthase complex, adenosine diphosphate (ADP) undergoes condensation phosphorylation into adenosine triphosphate (ATP), supplying vital thermodynamic drive for stromatic Calvin cycle reduction.',
    },
  ];

  // AI-Simplified Plain Language Content (Grade 5-6 reading level)
  const simplifiedText = [
    {
      heading: 'Step 1: The Leaf\'s Solar Collectors (Chloroplasts)',
      bullets: [
        'Plants eat sunlight! Green leaves act like living solar panels.',
        'Inside every plant cell are tiny green factories called Chloroplasts.',
        'Inside the factory are stacks of green discs called Thylakoids.',
        'These discs absorb sunlight and turn light energy into chemical batteries.',
      ],
      analogy: '💡 Think of Thylakoids like rechargeable battery packs plugged into sunlight.',
    },
    {
      heading: 'Step 2: Splitting Water to Make Oxygen',
      bullets: [
        'When you water a houseplant, the roots send water up to the green leaves.',
        'Sunlight hits the water inside the discs and splits it apart.',
        'Oxygen gas is released into the room for humans and animals to breathe!',
        'Two power batteries are charged: ATP (fast energy) and NADPH (carrying electrons).',
      ],
      analogy: '💧 Water goes in ──► Sunlight splits it ──► Fresh oxygen comes out!',
    },
    {
      heading: 'Step 3: Making Sweet Glucose Sugar (The Calvin Cycle)',
      bullets: [
        'In the liquid area outside the discs (called the Stroma), the plant cooks its food.',
        'It breathes in carbon dioxide from our air.',
        'Using the charged batteries from Step 2, it glues the carbon atoms together.',
        'Result: Sweet glucose sugar that feeds the plant, flowers, and fruit!',
      ],
      analogy: '🍪 The plant uses the sun\'s power to bake sugar straight from the air.',
    },
  ];

  // Helper for bionic reading rendering
  const renderBionicText = (text: string) => {
    if (!settings.isBionicReading) return text;

    return text.split(' ').map((word, wIdx) => {
      const mid = Math.ceil(word.length / 2);
      const boldPart = word.slice(0, mid);
      const rest = word.slice(mid);
      return (
        <span key={wIdx} className="inline-block mr-1">
          <strong className="font-extrabold text-white">{boldPart}</strong>
          <span>{rest}</span>
        </span>
      );
    });
  };

  const handleReadParagraph = (index: number, text: string) => {
    setActiveParagraphIndex(index);
    speakText(text);
    announce(`Reading section ${index + 1}`);
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-500/30">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">Reading Difficulty & Dyslexia Accommodation</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Cognitive Load Reduced 65%
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Clean distraction-free typography with AI simplification, Bionic fixation guides, and line focus rulers.
            </p>
          </div>
        </div>

        {/* Accommodation Controls Quick Bar */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleDyslexiaFont}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              settings.isDyslexiaFont
                ? 'bg-emerald-600 text-white border-emerald-400'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            Lexend Font: {settings.isDyslexiaFont ? 'ON' : 'OFF'}
          </button>

          <button
            onClick={toggleBionicReading}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              settings.isBionicReading
                ? 'bg-cyan-600 text-white border-cyan-400'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            Bionic Reading: {settings.isBionicReading ? 'ON' : 'OFF'}
          </button>

          <button
            onClick={toggleReadingRuler}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              settings.readingRulerEnabled
                ? 'bg-indigo-600 text-white border-indigo-400'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            Focus Ruler: {settings.readingRulerEnabled ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* Main Text Content Card */}
      <div className="rounded-2xl border border-slate-700/80 bg-slate-900/90 p-6 sm:p-8 shadow-xl backdrop-blur-md">
        
        {/* Toggle between Standard Academic vs AI-Simplified */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-800 gap-3">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
              Text Simplification Engine
            </span>
            <h3 className="text-base font-bold text-white mt-0.5">
              {isSimplified ? 'Auto-Simplified Conversational Mode' : 'Standard Academic Biology Textbook'}
            </h3>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => {
                setIsSimplified(false);
                announce('Showing Standard Academic Text');
              }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                !isSimplified
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Standard Textbook
            </button>
            <button
              onClick={() => {
                setIsSimplified(true);
                announce('Showing AI-Simplified Plain English');
              }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                isSimplified
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI-Simplified (Recommended)</span>
            </button>
          </div>
        </div>

        {/* Text Content */}
        <div className="mt-6 space-y-6">
          {isSimplified ? (
            /* Simplified Mode: Bulleted, clean, with real-world analogies */
            simplifiedText.map((section, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border transition-all ${
                  activeParagraphIndex === idx
                    ? 'bg-emerald-950/30 border-emerald-500/70 shadow-lg'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-base font-bold text-emerald-300">
                    {section.heading}
                  </h4>
                  <button
                    onClick={() =>
                      handleReadParagraph(
                        idx,
                        `${section.heading}. ${section.bullets.join('. ')}. ${section.analogy}`
                      )
                    }
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white transition-colors"
                    aria-label={`Read ${section.heading} aloud`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <ul className="space-y-2 text-sm text-slate-200 leading-relaxed list-disc list-inside">
                  {section.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="pl-1">
                      {renderBionicText(bullet)}
                    </li>
                  ))}
                </ul>

                <div className="mt-3.5 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-amber-300 font-medium">
                  {section.analogy}
                </div>
              </div>
            ))
          ) : (
            /* Standard Mode with Bionic toggle capability */
            standardText.map((section, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border transition-all ${
                  activeParagraphIndex === idx
                    ? 'bg-indigo-950/30 border-indigo-500/70'
                    : 'bg-slate-950/60 border-slate-800/80'
                }`}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <h4 className="text-sm font-bold text-slate-200">
                    {section.heading}
                  </h4>
                  <button
                    onClick={() => handleReadParagraph(idx, `${section.heading}. ${section.body}`)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {renderBionicText(section.body)}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Floating Read-Aloud Bar at bottom of card */}
        <div className="mt-8 pt-5 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Volume2 className="w-4 h-4 text-emerald-400" />
            <span>Click any section speaker icon to trigger speech read-aloud with sentence tracking.</span>
          </div>
          {isSpeaking && (
            <button
              onClick={stopSpeaking}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-xs font-semibold text-white animate-pulse"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>Stop Speech</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
