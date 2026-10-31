# Learn in Your Way — AI Inclusive Education & Accessibility Engine

An AI-powered inclusive education and multimodal accessibility platform built with **React**, **Vite**, **TypeScript**, and **Tailwind CSS**. Designed following high-end SaaS design patterns (Linear / Vercel design system), with WCAG 2.2 AAA accessibility compliance, dark/light theme fidelity, and real-time interactive state.

---

## 🌟 Core Innovations & Key Screens

### 1. 📊 Teacher Dashboard (Educator Command Center)
- **Class Metrics Grid:**
  - **Active Students:** 28 enrolled (100% active this week)
  - **Formats Generated:** 4.6 average multimodal outputs per source PDF
  - **Topics Flagged for Review:** Live issue alerts (e.g., Photosynthesis Ch. 4 tactile description need) with 1-click **Auto-Synthesize AI** resolution
  - **WCAG AAA Compliance:** 99.2% verified accessibility standard
- **Student Accommodations & Progress Matrix:**
  - Individual student mapping (e.g. *Maya Lin: Tactile Audio*, *Rohan Sharma: Captions + Hindi*, *Leo Chen: Lexend + Bionic Reading*, *Ananya Patel: Bilingual Hindi*, *Jordan Miller: Adaptive Quiz*)
  - Interactive search by name, accommodation, or topic
  - Filter pills across modalities: Visual, Hearing, Reading, Bilingual, Practice
  - Student detail modal with IEP goals, progress metrics, and 1-click launch into the student's personalized workspace.

### 2. ⚡ The Content Transformation Pipeline (The Core Engine)
- **Interactive Drag-and-Drop Ingestion:** Drop academic textbook PDFs (e.g., `Cellular Photosynthesis Chapter 4.pdf`) or select pre-loaded curriculum chapters.
- **6-Phase AI Execution Progress Tracker:**
  1. **Structured Text Extraction:** OCR and semantic section parsing with chemical equation extraction.
  2. **Diagram & Organelle Identification:** Computer vision bounding box segmentation of complex chloroplast cross-sections and biochemical cycles.
  3. **Tactile & Alt-Gen Description:** Multi-layer spatial mental models and directional orientation maps for screen readers.
  4. **Audio Narration Slicing:** Studio neural TTS audio streams with SSML cadence modulation (135 WPM) and animated waveform frequency meters.
  5. **Synchronized Caption & Sound Cue Building:** Sub-second WebVTT/JSON timestamps with acoustic non-speech annotations like `[Water molecule splitting sound]`.
  6. **Regional Multilingual Adaptation:** Scientific glossary localized into Hindi (हिंदी), Spanish (Español), Tamil (தமிழ்), and French (Français).
- **Interactive Artifact Inspector:** Real-time preview of extracted JSON, bounding boxes, transcripts, and waveforms before student delivery.

### 3. 🎓 Student Multi-Format View (One Lesson ──► Five Modalities)
Demonstrates **one single source lesson** (*Cellular Photosynthesis Chapter 4*) rendered dynamically across 5 student profiles:
1. **👁️ Visual Impairment Mode:**
   - Screen-reader optimized high contrast view
   - Studio audio narration player widget with variable speeds (0.75x to 2x), 10s jump, interactive scrubber, and live waveform spectrum
   - Directional tactile spatial diagram walkthrough with SVG organelle visualization
   - Web Speech API integration (`Read Spatial Tour Aloud` speaks out loud).
2. **🦻 Hearing Impairment Mode:**
   - Synchronized lecture video simulator with animated speaker audio cues
   - Real-time karaoke-style transcript captions that advance with playback
   - Acoustic sound cues (`[Water molecule bond dissociation]`, `[Microscopic zoom]`)
   - Click-to-seek interactive transcript jumping.
3. **📖 Reading Difficulty & Dyslexia Mode:**
   - Clean distraction-free typography with **Lexend** dyslexia-friendly font toggle
   - **Bionic Reading Mode** (bolding initial syllables for guided saccadic reading)
   - **Cursor-Tracking Reading Focus Ruler** (interactive shaded focus slit)
   - Complexity toggle: *Standard Academic Biology* vs *AI-Simplified Conversational Plain English* with relatable real-world analogies.
4. **🌐 Language Barrier Mode:**
   - Side-by-side bilingual parallel text or single toggle
   - Selectable languages: Hindi (हिंदी), Spanish (Español), Tamil (தமிழ்), French (Français)
   - Interactive scientific glossary bridge with pronunciation guides and cultural analogies
   - Native-script audio player.
5. **📝 Extra Practice & Adaptive Reinforcement:**
   - Conceptual flash takeaway summary cards
   - 4-question adaptive interactive mini-quiz generator with instant explanation feedback
   - "Ask AI for a Hint" interactive helper
   - Celebration confetti burst (`canvas-confetti`) upon quiz completion!

### 4. 🎛️ Universal Accessibility Hub (Floating Tool)
- Dark / Clean Light mode palette
- WCAG AAA High Contrast mode switch
- Lexend dyslexia typography switch
- Bionic guided saccades switch
- Reading focus ruler trigger
- Font size scaling (100%, 125%, 150%)
- Quick student accommodation presets (*Low Vision*, *Dyslexia*, *Default*)

---

## 🛠️ Tech Stack
- **Framework:** React 19 + Vite 8 + TypeScript
- **Styling:** Tailwind CSS v4 with custom design tokens
- **Icons:** Lucide React
- **Animations & Delight:** Canvas Confetti + CSS Keyframe Waveforms
- **Speech Synthesis:** Native Web Speech API for genuine screen-reader read-alouds

---

## 🚀 Running Locally
```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Open in your browser:
# http://localhost:5173
```
