import { AsyncPipe, NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  PLATFORM_ID,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';
import { fadeSlideUp } from '../../../shared/animations/fade.animations';
import { SocialIconsComponent } from '../../../shared/components/social-icons/social-icons.component';
import { BadgeComponent } from '../../../shared/ui/badge/badge.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    NgOptimizedImage,
    ButtonComponent,
    BadgeComponent,
    SocialIconsComponent,
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  animations: [fadeSlideUp],
})
export class HeroComponent {
  private readonly data = inject(PortfolioDataService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);

  readonly profile$ = this.data.getProfile();
  readonly social$ = this.data.getSocialLinks();
  readonly profile = toSignal(this.profile$);

  readonly typedText = signal('Senior Frontend Engineer');
  private roleIndex = 0;
  private charIndex = 0;
  private deleting = false;
  private pauseTicks = 0;

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) {
        return;
      }

      // Keep the timer outside NgZone — do not call zone.run() on every tick
      // (that was thrashing change detection on mobile).
      const id = window.setInterval(() => this.tickTypewriter(), 90);
      this.destroyRef.onDestroy(() => window.clearInterval(id));
    });
  }

  private tickTypewriter(): void {
    const roles = this.profile()?.roles ?? [];
    if (!roles.length) {
      return;
    }

    if (this.pauseTicks > 0) {
      this.pauseTicks -= 1;
      return;
    }

    const current = roles[this.roleIndex % roles.length];

    if (!this.deleting) {
      this.charIndex += 1;
      this.typedText.set(current.slice(0, this.charIndex));
      if (this.charIndex >= current.length) {
        this.deleting = true;
        this.pauseTicks = 14;
      }
      return;
    }

    this.charIndex -= 1;
    this.typedText.set(current.slice(0, Math.max(this.charIndex, 0)));

    if (this.charIndex <= 0) {
      this.deleting = false;
      this.roleIndex = (this.roleIndex + 1) % roles.length;
      this.pauseTicks = 4;
    }
  }
}
