

# Morning & Evening Adhkar PWA

## Overview
A beautiful, bilingual (Arabic/English) Progressive Web App for reading Morning and Evening Adhkar. Fully static, offline-capable, and installable — no backend needed.

---

## 1. Data & Setup
- Copy the provided `ar.json` and `en.json` into the project as static data files
- Define TypeScript types matching the JSON schema (`order`, `content`, `count`, `count_description`, `fadl`, `source`, `type`, `audio`, `hadith_text`, `explanation_of_hadith_vocabulary`, and EN-only fields: `translation`, `transliteration`)
- Filter adhkar by type: `0` = both, `1` = morning only, `2` = evening only

## 2. App Layout & Navigation
- **Header:** App title (أذكار الصباح والمساء / Morning & Evening Adhkar), language toggle (AR/EN), and dark/light mode toggle
- **Tab Bar:** Two tabs — "Morning Adhkar" (أذكار الصباح) and "Evening Adhkar" (أذكار المساء)
- **Progress indicator** at the top showing how many adhkar are completed out of total
- **Footer:** Project description, GitHub link, and MIT license

## 3. Design & Theming
- **Color palette:** Calm, Islamic-inspired — sand, olive, and slate tones
- **Dark mode:** Deep slate/charcoal background with warm sand accents
- **Light mode:** Warm cream/sand background with olive accents
- **Arabic mode:** RTL layout with Amiri or Noto Kufi Arabic font for Arabic text
- **English mode:** LTR layout with Inter font; Arabic content still shown in Arabic font
- **Spacious, minimal design** — generous padding, no distracting animations

## 4. Adhkar Card Design
Each card displays:
- **Main Arabic text** (`content`) — large, beautiful Arabic typography
- **English details** (EN mode only): transliteration and translation below the Arabic text
- **Collapsible "Virtue" section** — accordion for `fadl` to save space
- **Source** — small muted text showing the hadith reference
- **Action area:**
  - **Counter button** — large tap target showing remaining count (e.g., "3 left" / "٣ متبقية"). Tap to decrement
  - **Audio button** — play/pause icon (shown only when audio URL exists)
- **Completion state:** When count reaches 0, the card gets a green tint/checkmark overlay and reduced opacity
- **Session reset button** to restart the counter

## 5. Interactive Counter
- Each adhkar tracks its own remaining count in component state
- Tapping the counter decrements by 1
- Visual feedback: count badge updates, subtle haptic-like visual pulse on tap
- At zero: card shows ✓ checkmark, background shifts to a soft green, opacity reduces slightly
- A "Reset All" button at the top resets all counters for the current session

## 6. Audio Player
- Play button appears only when `audio` field is non-empty
- Tapping play starts audio; icon switches to pause
- **Single-audio rule:** Starting a new audio automatically stops any currently playing audio
- Simple HTML5 Audio implementation — lightweight, no heavy libraries

## 7. Language Switcher
- Toggle between Arabic (عربي) and English in the header
- Arabic = RTL direction on the entire app, English = LTR
- Language preference saved to localStorage and restored on reload
- Arabic is the default language

## 8. Theme Toggle
- Dark/Light mode switch in the header (sun/moon icon)
- Preference saved to localStorage
- Respects system preference on first visit

## 9. PWA Setup
- Install `vite-plugin-pwa` for service worker generation
- Configure web manifest with app name, icons, theme colors (Islamic-inspired palette)
- Full offline support — all data is bundled, no network needed
- Add mobile-optimized meta tags to `index.html`
- Create an `/install` page with install prompt guidance

## 10. Footer
- "An open-source database for Morning and Evening Adhkar"
- GitHub link: `https://github.com/Seen-Arabic/Morning-And-Evening-Adhkar-DB`
- MIT License badge

