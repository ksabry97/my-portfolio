import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  input,
  signal,
} from '@angular/core';
import { Experience } from '../../../core/models/portfolio.models';
import { formatDateRange } from '../../../core/utilities/date.utils';
import { BadgeComponent } from '../../ui/badge/badge.component';
import { TagComponent } from '../../ui/tag/tag.component';

@Component({
  selector: 'app-timeline-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BadgeComponent, TagComponent],
  templateUrl: './timeline-item.component.html',
  styleUrl: './timeline-item.component.scss',
})
export class TimelineItemComponent implements OnInit {
  readonly experience = input.required<Experience>();
  readonly expandedByDefault = input(false);

  readonly expanded = signal(false);

  readonly dateRange = computed(() => {
    const exp = this.experience();
    return formatDateRange(exp.startDate, exp.endDate, exp.current);
  });

  ngOnInit(): void {
    if (this.expandedByDefault()) {
      this.expanded.set(true);
    }
  }

  toggle(): void {
    this.expanded.update((value) => !value);
  }
}
