import { Injectable, signal } from '@angular/core';
import { THEME_STORAGE_KEY } from '../constants/app.constants';

export type ThemeMode = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<ThemeMode>('dark');

  init(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const next = stored ?? (prefersDark ? 'dark' : 'light');
    this.setTheme(next);
  }

  toggle(): void {
    this.setTheme(this.theme() === 'dark' ? 'light' : 'dark');
  }

  setTheme(mode: ThemeMode): void {
    this.theme.set(mode);

    if (typeof document === 'undefined') {
      return;
    }

    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  }
}
