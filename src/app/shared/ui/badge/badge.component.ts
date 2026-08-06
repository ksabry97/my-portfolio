import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type BadgeTone = 'default' | 'success' | 'warning' | 'danger' | 'accent';

@Component({
  selector: 'app-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
})
export class BadgeComponent {
  readonly text = input.required<string>();
  readonly tone = input<BadgeTone>('default');
}
