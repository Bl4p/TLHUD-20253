import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext(null);

const STORAGE_KEY = 'wms-theme';

function getInitialTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return {
    mode: 'light',
    sidebarCollapsed: false,
    accent: 'default',
    language: 'vi',
  };
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme.mode);
    document.documentElement.setAttribute('data-accent', theme.accent);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
  }, [theme]);

  const toggleDarkMode = useCallback(() => {
    setTheme(prev => ({ ...prev, mode: prev.mode === 'light' ? 'dark' : 'light' }));
  }, []);

  const toggleSidebar = useCallback(() => {
    setTheme(prev => ({ ...prev, sidebarCollapsed: !prev.sidebarCollapsed }));
  }, []);

  const setAccent = useCallback((accent) => {
    setTheme(prev => ({ ...prev, accent }));
  }, []);

  const setLanguage = useCallback((language) => {
    setTheme(prev => ({ ...prev, language }));
  }, []);

  return (
    <ThemeContext.Provider value={{
      ...theme,
      isDark: theme.mode === 'dark',
      toggleDarkMode,
      toggleSidebar,
      setAccent,
      setLanguage,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
