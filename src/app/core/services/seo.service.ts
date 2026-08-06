import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = signal('Khaled Sabry | Senior Frontend Engineer');

  setTitle(value: string): void {
    this.title.set(value);
    if (typeof document !== 'undefined') {
      document.title = value;
    }
  }

  setMetaDescription(description: string): void {
    if (typeof document === 'undefined') {
      return;
    }

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
  }
}
