import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  PLATFORM_ID,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-scroll-progress',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './scroll-progress.component.html',
  styleUrl: './scroll-progress.component.scss',
})
export class ScrollProgressComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  readonly progress = signal(0);

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      const onScroll = () => this.updateProgress();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      this.updateProgress();

      this.destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      });
    });
  }

  private updateProgress(): void {
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop;
    const height = doc.scrollHeight - doc.clientHeight;
    const value = height > 0 ? (scrollTop / height) * 100 : 0;
    this.progress.set(Math.min(100, Math.max(0, value)));
  }
}
