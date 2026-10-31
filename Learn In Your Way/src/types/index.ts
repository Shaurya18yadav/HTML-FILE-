export type AppScreen = 'dashboard' | 'pipeline' | 'student-view';

export type StudentFormatMode =
  | 'visual'
  | 'hearing'
  | 'reading'
  | 'language'
  | 'practice';

export interface Student {
  id: string;
  name: string;
  avatar: string;
  grade: string;
  primaryAccommodation: string;
  assignedFormats: StudentFormatMode[];
  formatLabels: string[];
  status: 'on-track' | 'needs-review' | 'high-engagement';
  statusNote: string;
  currentLesson: string;
  progressPercent: number;
  lastActive: string;
  iepGoal: string;
  preferredLanguage?: string;
  fontPreference?: string;
}

export interface MetricSummary {
  activeStudents: number;
  totalStudents: number;
  avgFormatsGenerated: number;
  topicsFlagged: number;
  wcagComplianceRate: number;
}

export type PipelineStageId =
  | 'ocr'
  | 'diagrams'
  | 'alt-gen'
  | 'audio'
  | 'captions'
  | 'translation';

export interface PipelineStage {
  id: PipelineStageId;
  name: string;
  description: string;
  status: 'idle' | 'processing' | 'completed' | 'error';
  duration: string;
  badge: string;
  details: string[];
}

export interface DiagramItem {
  id: string;
  title: string;
  category: string;
  tactileDescription: string;
  screenReaderSummary: string;
  keyComponents: { label: string; coordinates: string; role: string }[];
  svgType: 'chloroplast' | 'calvin-cycle';
}

export interface CaptionLine {
  id: string;
  startSec: number;
  endSec: number;
  text: string;
  speaker: string;
  soundCue?: string;
  keyTerms?: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
  conceptTag: string;
}

export interface TranslatedTerm {
  term: string;
  original: string;
  translation: string;
  transliteration?: string;
  simplifiedExplanation: string;
}

export interface AccessibilitySettings {
  isDarkMode: boolean;
  isHighContrast: boolean;
  isDyslexiaFont: boolean;
  isBionicReading: boolean;
  fontSize: 'normal' | 'large' | 'xlarge';
  lineSpacing: 'normal' | 'relaxed' | 'double';
  readingRulerEnabled: boolean;
  screenReaderAnnouncement: string;
  speechRate: number;
  soundEffects: boolean;
}
