import { createContext, useContext, useEffect, useState } from 'react';
import type { Theme } from '../types';
import type { ThemeContextValue, ThemeProviderProps } from '../types/theme';

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readSavedTheme(): Theme {
  try {
    return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
  } catch {
    // The preference still works in memory if the browser blocks storage.
    return 'light';
  }
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(readSavedTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // Persisting a preference must not prevent navigation or changing the theme.
    }
  }, [theme]);

  const value: ThemeContextValue = {
    theme,
    toggle: () => setTheme((current: Theme) => current === 'light' ? 'dark' : 'light'),
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme requiere ThemeProvider.');
  return context;
}
