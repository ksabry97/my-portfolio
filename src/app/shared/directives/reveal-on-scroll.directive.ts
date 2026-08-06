import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  inject,
  input,
} from '@angular/core';

@Directive({
  selector: '[appRevealOnScroll]',
  standalone: true,
  host: {
    class: 'reveal-on-scroll',
  },
})
export class RevealOnScrollDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private observer: IntersectionObserver | null = null;

  /** Root margin for IntersectionObserver (e.g. '0px 0px -10% 0px') */
  readonly rootMargin = input('0px 0px -8% 0px');
  /** Visibility threshold 0–1 */
  readonly threshold = input(0.12);
  /** If true, keep observing so class can be removed when out of view */
  readonly once = input(true);

  ngOnInit(): void {
    if (typeof IntersectionObserver === 'undefined') {
      this.el.nativeElement.classList.add('is-visible');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            if (this.once()) {
              this.observer?.unobserve(entry.target);
            }
          } else if (!this.once()) {
            entry.target.classList.remove('is-visible');
          }
        }
      },
      {
        root: null,
        rootMargin: this.rootMargin(),
        threshold: this.threshold(),
      },
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.observer = null;
  }
}
