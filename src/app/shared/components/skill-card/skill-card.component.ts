import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  inject,
  input,
  signal,
} from '@angular/core';
import { Skill } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-skill-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './skill-card.component.html',
  styleUrl: './skill-card.component.scss',
})
export class SkillCardComponent implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private observer: IntersectionObserver | null = null;

  readonly skill = input.required<Skill>();
  readonly animated = signal(false);

  ngAfterViewInit(): void {
    if (typeof IntersectionObserver === 'undefined') {
      this.animated.set(true);
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.animated.set(true);
            this.observer?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.35 },
    );

    this.observer.observe(this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.observer = null;
  }
}
