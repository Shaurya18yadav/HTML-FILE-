import React, { useState } from 'react';
import {
  Languages,
  Volume2,
  Columns,
  Square,
  Sparkles,
  BookOpen,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import { mockHindiGlossary } from '../../data/mockData';
import { useAccessibility } from '../../context/AccessibilityContext';

export const LanguageBarrierView: React.FC = () => {
  const { speakText, announce } = useAccessibility();
  const [selectedLanguage, setSelectedLanguage] = useState<'hindi' | 'spanish' | 'tamil' | 'french'>('hindi');
  const [isSplitView, setIsSplitView] = useState(true);
  const [activeGlossaryTerm, setActiveGlossaryTerm] = useState<string | null>('Photosynthesis');

  const languageOptions = [
    { id: 'hindi', label: 'Hindi (हिंदी)', script: 'देवनागरी' },
    { id: 'spanish', label: 'Spanish (Español)', script: 'Latinoamérica' },
    { id: 'tamil', label: 'Tamil (தமிழ்)', script: 'தமிழ் எழுத்துமுறை' },
    { id: 'french', label: 'French (Français)', script: 'Standard' },
  ] as const;

  const contentByLanguage = {
    hindi: {
      title: 'अध्याय 4: कोशिकीय प्रकाश संश्लेषण (Cellular Photosynthesis)',
      summary:
        'प्रकाश संश्लेषण वह प्रक्रिया है जिसके द्वारा हरे पौधे सूर्य के प्रकाश की ऊर्जा को रासायनिक ऊर्जा (ग्लूकोज) में बदलते हैं। यह मुख्य रूप से पत्तियों की कोशिकाओं में मौजूद हरितलवक (Chloroplast) के अंदर होता है।',
      sections: [
        {
          heading: '1. प्रकाश-निर्भर प्रतिक्रियाएँ (थायलाकोइड में)',
          body:
            'जब धूप थायलाकोइड झिल्ली पर पड़ती है, तो क्लोरोफिल अणु उत्तेजित हो जाते हैं। पानी (H2O) के अणु टूटकर ऑक्सीजन (O2) गैस छोड़ते हैं। इस दौरान दो महत्वपूर्ण ऊर्जा अणु बनते हैं: ATP और NADPH।',
        },
        {
          heading: '2. केल्विन चक्र / प्रकाश-स्वतंत्र प्रतिक्रियाएँ (स्ट्रोमा में)',
          body:
            'हरितलवक के तरल पदार्थ (स्ट्रोमा) में, कार्बन डाइऑक्साइड (CO2) को रूबीस्को (RuBisCO) एंजाइम की मदद से शर्करा में बदला जाता है। यह पौधे का भोजन होता है।',
        },
      ],
      equation: '6 CO₂ (कार्बन डाइऑक्साइड) + 6 H₂O (पानी) + धूप ──► C₆H₁₂O₆ (ग्लूकोज) + 6 O₂ (ऑक्सीजन)',
    },
    spanish: {
      title: 'Capítulo 4: Fotosíntesis Celular y Bioenergética',
      summary:
        'La fotosíntesis es el proceso bioquímico por el cual las plantas convierten la energía solar en glucosa química, desarrollándose principalmente en los cloroplastos.',
      sections: [
        {
          heading: '1. Reacciones dependientes de la luz (En los Tilacoides)',
          body:
            'La clorofila absorbe fotones solares y divide moléculas de agua (fotólisis), liberando oxígeno y cargando dos transportadores energéticos esenciales: ATP y NADPH.',
        },
        {
          heading: '2. El Ciclo de Calvin (En el Estroma)',
          body:
            'El dióxido de carbono se fija enzimáticamente gracias a la enzima RuBisCO en el fluido estromático, sintetizando moléculas de azúcar para alimentar la planta.',
        },
      ],
      equation: '6 CO₂ + 6 H₂O + Luz Solar ──► C₆H₁₂O₆ (Glucosa) + 6 O₂ (Oxígeno)',
    },
    tamil: {
      title: 'அத்தியாயம் 4: செல்லுலார் ஒளிச்சேர்க்கை (Photosynthesis)',
      summary:
        'தாவரங்கள் சூரிய ஒளியைப் பயன்படுத்தி உணவு தயாரிக்கும் நிகழ்வு ஒளிச்சேர்க்கை எனப்படும். இது பசுங்கணிகங்களில் (Chloroplast) நடைபெறுகிறது.',
      sections: [
        {
          heading: '1. ஒளி சார்ந்த வினைகள் (தைலகாய்டு பகுதியில்)',
          body:
            'சூரிய ஒளி தைலகாய்டு சவ்வுகளில் படும்போது நீர் மூலக்கூறுகள் பிளக்கப்பட்டு ஆக்ஸிஜன் வாயு வெளியேறுகிறது. ஆற்றல் நாணயங்களான ATP மற்றும் NADPH உருவாகின்றன.',
        },
        {
          heading: '2. கால்வின் சுழற்சி (ஸ்ட்ரோமாவில்)',
          body:
            'ஸ்ட்ரோமா திரவத்தில் கார்பன் டை ஆக்சைடு உட்கவரப்பட்டு RuBisCO நொதி உதவியுடன் குளுக்கோஸ் சர்க்கரையாக மாற்றப்படுகிறது.',
        },
      ],
      equation: '6 CO₂ + 6 H₂O + சூரிய ஒளி ──► C₆H₁₂O₆ + 6 O₂',
    },
    french: {
      title: 'Chapitre 4 : La Photosynthèse Cellulaire et Bioénergétique',
      summary:
        'La photosynthèse est le processus fondamental par lequel les végétaux convertissent le rayonnement solaire en énergie chimique sous forme de glucose.',
      sections: [
        {
          heading: '1. Réactions photochimiques (Thylakoïdes)',
          body:
            'La chlorophylle capte les photons, scinde l\'eau par photolyse et libère du dioxygène tout en produisant de l\'ATP et du NADPH.',
        },
        {
          heading: '2. Le Cycle de Calvin (Stroma)',
          body:
            'Le CO2 atmosphérique est fixé par l\'enzyme RuBisCO dans le stroma liquide pour former des glucides nourriciers.',
        },
      ],
      equation: '6 CO₂ + 6 H₂O + Photons ──► C₆H₁₂O₆ + 6 O₂',
    },
  };

  const currentRegionalData = contentByLanguage[selectedLanguage];

  const handleLanguageChange = (lang: 'hindi' | 'spanish' | 'tamil' | 'french') => {
    setSelectedLanguage(lang);
    announce(`Switched regional translation to ${lang}`);
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="rounded-xl border border-amber-500/40 bg-amber-950/20 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/30">
            <Languages className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">Language Barrier & Regional STEM Accommodation</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Contextual Glossary Mapped
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Side-by-side bilingual parallel text with localized terminology guides and native-script audio playback.
            </p>
          </div>
        </div>

        {/* View Switcher Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSplitView(!isSplitView)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 border border-slate-700 text-slate-200 hover:text-white transition-colors"
          >
            {isSplitView ? <Square className="w-3.5 h-3.5" /> : <Columns className="w-3.5 h-3.5" />}
            <span>{isSplitView ? 'Toggle Single View' : 'Side-by-Side Split'}</span>
          </button>
        </div>
      </div>

      {/* Language Selector Bar */}
      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Target Language:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {languageOptions.map((lang) => (
              <button
                key={lang.id}
                onClick={() => handleLanguageChange(lang.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedLanguage === lang.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() =>
            speakText(
              `${currentRegionalData.title}. ${currentRegionalData.summary}. ${currentRegionalData.sections[0].body}`
            )
          }
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500 hover:text-slate-950 text-xs font-semibold transition-colors"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>Listen in {selectedLanguage.toUpperCase()}</span>
        </button>
      </div>

      {/* Main Bilingual Content Container */}
      <div
        className={`grid gap-6 ${
          isSplitView ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
        }`}
      >
        
        {/* Left Side: English Original Academic Master */}
        {isSplitView && (
          <div className="rounded-2xl border border-slate-700/80 bg-slate-900/90 p-6 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider font-semibold">
                Source Document (English Original)
              </span>
              <span className="text-[10px] font-mono bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                AP Bio Curriculum
              </span>
            </div>

            <h3 className="text-base font-bold text-white mt-4">
              Chapter 4: Cellular Photosynthesis & Bioenergetics
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Photosynthesis is the process by which autotrophic plants convert electromagnetic photon radiation into stable chemical potential energy stored in carbohydrate bonds inside chloroplast organelles.
            </p>

            <div className="mt-4 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-indigo-300 font-mono">
              6 CO₂ + 6 H₂O + Photons ──► C₆H₁₂O₆ (Glucose) + 6 O₂
            </div>

            <div className="mt-5 space-y-4">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <h4 className="text-xs font-bold text-slate-200">
                  1. Light-Dependent Reactions (In Thylakoids)
                </h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Sunlight strikes chlorophyll within the thylakoid membrane, splitting water molecules into oxygen and creating energy carriers ATP and NADPH.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <h4 className="text-xs font-bold text-slate-200">
                  2. Calvin-Benson Cycle (In Stroma Fluid)
                </h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Carbon dioxide from atmospheric air is captured by enzyme RuBisCO and assembled into glucose using the energy batteries generated during the light phase.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Right Side: Regional Translated Adapted View */}
        <div className="rounded-2xl border border-amber-500/40 bg-slate-900/90 p-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
              Translated & Culturally Contextualized ({selectedLanguage.toUpperCase()})
            </span>
            <span className="text-[10px] font-mono bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-800/40">
              AI Localized
            </span>
          </div>

          <h3 className="text-base font-bold text-amber-200 mt-4">
            {currentRegionalData.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed">
            {currentRegionalData.summary}
          </p>

          <div className="mt-4 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-amber-300 font-mono">
            {currentRegionalData.equation}
          </div>

          <div className="mt-5 space-y-4">
            {currentRegionalData.sections.map((sec, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-amber-300">
                    {sec.heading}
                  </h4>
                  <button
                    onClick={() => speakText(`${sec.heading}. ${sec.body}`)}
                    className="p-1 rounded bg-slate-800 hover:bg-amber-600 text-slate-300 hover:text-white transition-colors"
                    aria-label={`Read ${sec.heading} in regional script`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  {sec.body}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Interactive Bilingual STEM Glossary Tooltip Explorer */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white">
              Interactive Multilingual Terminology Bridge
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Click any term to view pronunciation and contextual cultural analogy
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-2">
          {mockHindiGlossary.map((item) => (
            <button
              key={item.term}
              onClick={() => setActiveGlossaryTerm(item.term)}
              className={`p-2.5 rounded-xl text-left border transition-all ${
                activeGlossaryTerm === item.term
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-1 ring-amber-400/30'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <span className="text-xs font-bold block">{item.term}</span>
              <span className="text-[10px] text-slate-400 font-mono block mt-0.5 truncate">
                {item.translation.split('(')[0]}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Term Detail Card */}
        {activeGlossaryTerm && (
          <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {(() => {
              const termData = mockHindiGlossary.find((t) => t.term === activeGlossaryTerm)!;
              return (
                <>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{termData.original}</span>
                      <span className="text-xs font-bold text-emerald-400 font-mono">
                        ──► {termData.translation}
                      </span>
                      {termData.transliteration && (
                        <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                          [{termData.transliteration}]
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                      {termData.simplifiedExplanation}
                    </p>
                  </div>

                  <button
                    onClick={() => speakText(`${termData.original}. ${termData.translation}`)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors shrink-0"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Pronounce Term</span>
                  </button>
                </>
              );
            })()}
          </div>
        )}
      </div>

    </div>
  );
};
