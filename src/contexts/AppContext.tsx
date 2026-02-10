import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import type { Language, Theme } from '@/types/adhkar';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  currentAudio: HTMLAudioElement | null;
  playAudio: (url: string) => void;
  stopAudio: () => void;
  playingUrl: string | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('adhkar-lang') as Language) || 'ar';
  });
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('adhkar-theme') as Theme;
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('adhkar-lang', lang);
  };

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem('adhkar-theme', t);
  };

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setPlayingUrl(null);
  }, []);

  const playAudio = useCallback((url: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (playingUrl === url) {
      setPlayingUrl(null);
      audioRef.current = null;
      return;
    }
    const audio = new Audio(url);
    audio.onended = () => {
      setPlayingUrl(null);
      audioRef.current = null;
    };
    audio.play();
    audioRef.current = audio;
    setPlayingUrl(url);
  }, [playingUrl]);

  return (
    <AppContext.Provider value={{
      language, setLanguage, theme, setTheme, toggleTheme,
      currentAudio: audioRef.current, playAudio, stopAudio, playingUrl,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
