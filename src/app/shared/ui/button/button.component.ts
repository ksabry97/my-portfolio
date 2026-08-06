import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly href = input<string | undefined>(undefined);
  /** Prefer this over projected content — ng-content fails inside @if branches. */
  readonly label = input<string>('');
  readonly type = input<ButtonType>('button');
  readonly disabled = input(false);
  readonly ariaLabel = input<string | undefined>(undefined);
  readonly target = input<'_blank' | '_self' | undefined>(undefined);
  readonly rel = input<string | undefined>(undefined);

  readonly clicked = output<MouseEvent>();

  readonly isInternal = computed(() => {
    const link = this.href();
    return !!link && link.startsWith('/') && !link.startsWith('//');
  });

  onClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.createRipple(event);
    this.clicked.emit(event);
  }

  private createRipple(event: MouseEvent): void {
    if (typeof document === 'undefined') {
      return;
    }

    const host = event.currentTarget as HTMLElement | null;
    if (!host) {
      return;
    }

    const rect = host.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.className = 'app-button__ripple';
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    const encapsulationAttr = Array.from(host.attributes).find((attr) =>
      attr.name.startsWith('_ngcontent'),
    );
    if (encapsulationAttr) {
      ripple.setAttribute(encapsulationAttr.name, '');
    }

    host.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
  }
}
