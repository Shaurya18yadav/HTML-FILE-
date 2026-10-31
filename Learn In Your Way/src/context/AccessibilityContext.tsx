import React, { createContext, useContext, useState, useEffect } from 'react';
import { AccessibilitySettings } from '../types';

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  toggleDarkMode: () => void;
  toggleHighContrast: () => void;
  toggleDyslexiaFont: () => void;
  toggleBionicReading: () => void;
  setFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  toggleReadingRuler: () => void;
  toggleSoundEffects: () => void;
  setSpeechRate: (rate: number) => void;
  announce: (message: string) => void;
  speakText: (text: string) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
  applyStudentPreset: (presetName: string) => void;
}

const defaultSettings: AccessibilitySettings = {
  isDarkMode: true,
  isHighContrast: false,
  isDyslexiaFont: false,
  isBionicReading: false,
  fontSize: 'normal',
  lineSpacing: 'normal',
  readingRulerEnabled: false,
  screenReaderAnnouncement: '',
  speechRate: 1.0,
  soundEffects: true,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    return defaultSettings;
  });

  const [isSpeaking, setIsSpeaking] = useState(false);

  // Sync dark mode class on HTML document
  useEffect(() => {
    const root = document.documentElement;
    if (settings.isDarkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }

    if (settings.isHighContrast) {
      root.classList.add('high-contrast-mode');
    } else {
      root.classList.remove('high-contrast-mode');
    }

    if (settings.isDyslexiaFont) {
      root.classList.add('dyslexia-font');
    } else {
      root.classList.remove('dyslexia-font');
    }
  }, [settings.isDarkMode, settings.isHighContrast, settings.isDyslexiaFont]);

  const toggleDarkMode = () => {
    setSettings((prev) => ({ ...prev, isDarkMode: !prev.isDarkMode }));
    announce(`Switched to ${!settings.isDarkMode ? 'dark mode' : 'light mode'}`);
  };

  const toggleHighContrast = () => {
    setSettings((prev) => ({ ...prev, isHighContrast: !prev.isHighContrast }));
    announce(`High contrast mode ${!settings.isHighContrast ? 'enabled' : 'disabled'}`);
  };

  const toggleDyslexiaFont = () => {
    setSettings((prev) => ({ ...prev, isDyslexiaFont: !prev.isDyslexiaFont }));
    announce(`Dyslexia-friendly typography ${!settings.isDyslexiaFont ? 'activated' : 'deactivated'}`);
  };

  const toggleBionicReading = () => {
    setSettings((prev) => ({ ...prev, isBionicReading: !prev.isBionicReading }));
    announce(`Bionic saccadic reading guide ${!settings.isBionicReading ? 'enabled' : 'disabled'}`);
  };

  const setFontSize = (size: 'normal' | 'large' | 'xlarge') => {
    setSettings((prev) => ({ ...prev, fontSize: size }));
    announce(`Font scale adjusted to ${size}`);
  };

  const toggleReadingRuler = () => {
    setSettings((prev) => ({ ...prev, readingRulerEnabled: !prev.readingRulerEnabled }));
    announce(`Reading focus ruler ${!settings.readingRulerEnabled ? 'shown' : 'hidden'}`);
  };

  const toggleSoundEffects = () => {
    setSettings((prev) => ({ ...prev, soundEffects: !prev.soundEffects }));
  };

  const setSpeechRate = (rate: number) => {
    setSettings((prev) => ({ ...prev, speechRate: rate }));
  };

  const announce = (message: string) => {
    setSettings((prev) => ({ ...prev, screenReaderAnnouncement: message }));
  };

  const speakText = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    if (!text.trim()) {
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = settings.speechRate || 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    announce(`Reading aloud: ${text.slice(0, 40)}...`);
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    announce('Audio playback paused');
  };

  const applyStudentPreset = (presetName: string) => {
    if (presetName === 'visual') {
      setSettings((prev) => ({
        ...prev,
        isHighContrast: true,
        fontSize: 'large',
        isDyslexiaFont: false,
      }));
      announce('Applied Visual Impairment profile: High contrast and enlarged text activated');
    } else if (presetName === 'dyslexia') {
      setSettings((prev) => ({
        ...prev,
        isDyslexiaFont: true,
        isBionicReading: true,
        readingRulerEnabled: true,
        fontSize: 'normal',
      }));
      announce('Applied Dyslexia Profile: Lexend font, Bionic reading, and focus ruler enabled');
    } else if (presetName === 'default') {
      setSettings(defaultSettings);
      announce('Reset to standard UI settings');
    }
  };

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        toggleDarkMode,
        toggleHighContrast,
        toggleDyslexiaFont,
        toggleBionicReading,
        setFontSize,
        toggleReadingRuler,
        toggleSoundEffects,
        setSpeechRate,
        announce,
        speakText,
        stopSpeaking,
        isSpeaking,
        applyStudentPreset,
      }}
    >
      {children}
      {/* Screen reader live region for WCAG compliance */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        id="a11y-announcer"
      >
        {settings.screenReaderAnnouncement}
      </div>
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
