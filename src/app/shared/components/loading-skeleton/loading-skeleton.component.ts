import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-loading-skeleton',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './loading-skeleton.component.html',
  styleUrl: './loading-skeleton.component.scss',
})
export class LoadingSkeletonComponent {
  readonly width = input<string>('100%');
  readonly height = input<string>('1rem');
  readonly radius = input<string>('var(--radius, 0.75rem)');

  readonly hostStyles = computed(() => ({
    width: this.width(),
    height: this.height(),
    borderRadius: this.radius(),
  }));
}
