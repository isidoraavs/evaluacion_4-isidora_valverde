import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ThemeProvider, useTheme } from './ThemeContext';

function ThemeControl() {
  const { theme, toggle } = useTheme();
  return <button onClick={toggle}>Tema {theme}</button>;
}

describe('preferencia global de tema', () => {
  it('recupera el tema guardado y persiste el cambio', () => {
    localStorage.setItem('theme', 'dark');
    render(<ThemeProvider><ThemeControl /></ThemeProvider>);
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    fireEvent.click(screen.getByRole('button', { name: 'Tema dark' }));
    expect(screen.getByRole('button', { name: 'Tema light' })).toBeInTheDocument();
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('permite cambiar el tema si el navegador bloquea el almacenamiento', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('Almacenamiento bloqueado', 'SecurityError');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Almacenamiento bloqueado', 'SecurityError');
    });
    render(<ThemeProvider><ThemeControl /></ThemeProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'Tema light' }));
    expect(screen.getByRole('button', { name: 'Tema dark' })).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });
});
