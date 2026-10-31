import React, { useState } from 'react';
import {
  PenTool,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  RefreshCw,
  Award,
  ArrowRight,
  Flame,
  Lightbulb,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { mockQuizQuestions } from '../../data/mockData';
import { useAccessibility } from '../../context/AccessibilityContext';

export const ExtraPracticeView: React.FC = () => {
  const { announce } = useAccessibility();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleToggleHint = (questionId: string) => {
    setRevealedHints((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
    announce('Hint assistance revealed');
  };

  const calculateScore = () => {
    let score = 0;
    mockQuizQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const handleSubmitQuiz = () => {
    setSubmitted(true);
    const score = calculateScore();
    announce(`Quiz submitted. You scored ${score} out of ${mockQuizQuestions.length}!`);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // Fallback safe
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setRevealedHints({});
    setSubmitted(false);
    announce('Quiz reset for another practice run.');
  };

  const score = calculateScore();
  const totalQuestions = mockQuizQuestions.length;
  const isAllAnswered = Object.keys(selectedAnswers).length === totalQuestions;

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="rounded-xl border border-violet-500/40 bg-violet-950/20 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-violet-500/20 text-violet-300 flex items-center justify-center border border-violet-500/30">
            <PenTool className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">Extra Practice & Adaptive Reinforcement</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
                Instant Mastery Feedback
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Simplified conceptual flash breakdown paired with an interactive adaptive mini-quiz generator.
            </p>
          </div>
        </div>

        {/* Score pill */}
        {submitted && (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-violet-600 text-white font-mono text-xs font-bold shadow-lg animate-bounce">
            <Award className="w-4 h-4" />
            <span>Mastery Score: {score} / {totalQuestions} ({Math.round((score / totalQuestions) * 100)}%)</span>
          </div>
        )}
      </div>

      {/* Conceptual Breakdown Cards (Fast Review) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
          <div className="flex items-center gap-2 mb-1.5 text-indigo-400 font-bold">
            <Lightbulb className="w-4 h-4" />
            <span>Core Takeaway 1: Light Phase</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Takes place in <strong>Thylakoid membranes</strong>. Photons split <strong>Water (H₂O)</strong> into <strong>Oxygen (O₂)</strong> while charging fuel batteries <strong>ATP and NADPH</strong>.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
          <div className="flex items-center gap-2 mb-1.5 text-violet-400 font-bold">
            <Lightbulb className="w-4 h-4" />
            <span>Core Takeaway 2: Dark Phase</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Takes place in <strong>Stroma fluid</strong>. Enzyme <strong>RuBisCO</strong> fixes <strong>Carbon Dioxide (CO₂)</strong> into stable 3-carbon sugars to assemble <strong>Glucose</strong>.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
          <div className="flex items-center gap-2 mb-1.5 text-emerald-400 font-bold">
            <Flame className="w-4 h-4" />
            <span>Energy Conversion Metric</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Overall efficiency is ~34% of absorbed photons converted into glucose potential energy. Plants produce all the oxygen animals inhale.
          </p>
        </div>
      </div>

      {/* Interactive Adaptive Mini-Quiz Section */}
      <div className="rounded-2xl border border-slate-700/80 bg-slate-900/90 p-6 sm:p-8 shadow-xl backdrop-blur-md">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-800 gap-3">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-violet-400 font-semibold">
              Interactive Adaptive Mini-Quiz Generator
            </span>
            <h3 className="text-base font-bold text-white mt-0.5">
              Knowledge Check: Cellular Photosynthesis & Bioenergetics
            </h3>
            <p className="text-xs text-slate-400">
              Answer the questions below to test your multimodal understanding.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {submitted ? (
              <button
                onClick={handleResetQuiz}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Quiz</span>
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                disabled={!isAllAnswered}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                  isAllAnswered
                    ? 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-600/30 scale-105'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Check All Answers ({Object.keys(selectedAnswers).length}/{totalQuestions})</span>
              </button>
            )}
          </div>
        </div>

        {/* Questions List */}
        <div className="mt-6 space-y-6">
          {mockQuizQuestions.map((q, qIdx) => {
            const selectedOpt = selectedAnswers[q.id];
            const isAnswered = selectedOpt !== undefined;
            const isCorrect = selectedOpt === q.correctIndex;
            const showHint = revealedHints[q.id];

            return (
              <div
                key={q.id}
                className={`p-5 rounded-2xl border transition-all ${
                  submitted
                    ? isCorrect
                      ? 'bg-emerald-950/20 border-emerald-500/60'
                      : 'bg-rose-950/20 border-rose-500/60'
                    : 'bg-slate-950/60 border-slate-800'
                }`}
              >
                {/* Question Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-violet-500/20 text-violet-300 text-xs font-bold font-mono shrink-0">
                      Q{qIdx + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-100 leading-snug">
                        {q.question}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-400 mt-1 block">
                        Concept: {q.conceptTag}
                      </span>
                    </div>
                  </div>

                  {/* Ask AI Hint Button */}
                  <button
                    onClick={() => handleToggleHint(q.id)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-amber-300 font-medium shrink-0 transition-colors"
                    aria-label={`Toggle hint for question ${qIdx + 1}`}
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{showHint ? 'Hide Hint' : 'Ask AI Hint'}</span>
                  </button>
                </div>

                {/* Hint Box */}
                {showHint && (
                  <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-center gap-2 animate-in fade-in">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span><strong>AI Assistant Hint:</strong> {q.hint}</span>
                  </div>
                )}

                {/* Options List */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedOpt === optIdx;
                    let optionStyle = 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300';

                    if (submitted) {
                      if (optIdx === q.correctIndex) {
                        optionStyle = 'bg-emerald-950/80 border-emerald-400 text-white font-bold ring-1 ring-emerald-400/40';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'bg-rose-950/80 border-rose-400 text-rose-200 line-through';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-violet-600/30 border-violet-500 text-white font-semibold ring-1 ring-violet-500/40';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`p-3 rounded-xl border text-xs text-left transition-all flex items-center justify-between ${optionStyle}`}
                      >
                        <span className="flex-1 pr-2">{opt}</span>
                        {submitted && optIdx === q.correctIndex && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                        {submitted && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation feedback after submission */}
                {submitted && (
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-start gap-2 text-xs">
                    {isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    )}
                    <p className={`leading-relaxed ${isCorrect ? 'text-emerald-300' : 'text-rose-300'}`}>
                      {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quiz Summary Footer */}
        {submitted && (
          <div className="mt-8 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Next Pedagogical Step
              </span>
              <p className="text-xs text-slate-200 mt-0.5">
                {score >= 3
                  ? 'Outstanding comprehension! The AI suggests advancing to Chapter 5: Cellular Respiration.'
                  : 'Review the Calvin Cycle diagram again in the Visual or Plain Reading view to strengthen your concept mastery.'}
              </p>
            </div>
            <button
              onClick={handleResetQuiz}
              className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-xs font-bold text-white transition-colors shrink-0"
            >
              Take Another Practice Set
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
