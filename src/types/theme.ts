import type { ReactNode } from 'react';
import type { Theme } from './index';

export interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
}
