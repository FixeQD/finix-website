// Theme: "light" or "dark". No stored choice means "follow the system".
// The inline script in index.html applies a stored choice before first paint, so there is no flash.
export type Theme = 'light' | 'dark';

const KEY = 'theme';
// Created on first use, so importing this file is safe during server side rendering.
const systemDark = () => matchMedia('(prefers-color-scheme: dark)');

export function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null; // storage can be blocked: just follow the system
  }
}

export function currentTheme(): Theme {
  return (document.documentElement.dataset.theme as Theme) || (systemDark().matches ? 'dark' : 'light');
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#1d2320' : '#fcfaf5');
}

export function setTheme(theme: Theme): void {
  applyTheme(theme);
  try { localStorage.setItem(KEY, theme); } catch { /* ignore */ }
}

/** Calls back when the system theme changes and the visitor has not made a choice. Returns a cleanup. */
export function followSystem(callback: (theme: Theme) => void): () => void {
  const query = systemDark();
  const onChange = () => {
    if (storedTheme()) return;
    applyTheme(query.matches ? 'dark' : 'light');
    callback(currentTheme());
  };
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}
