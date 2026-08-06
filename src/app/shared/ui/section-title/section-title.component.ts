import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-section-title',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './section-title.component.html',
  styleUrl: './section-title.component.scss',
})
export class SectionTitleComponent {
  readonly eyebrow = input<string>('');
  readonly title = input.required<string>();
  readonly subtitle = input<string>('');
}
