import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';
import { TimelineItemComponent } from '../../../shared/components/timeline-item/timeline-item.component';
import { RevealOnScrollDirective } from '../../../shared/directives/reveal-on-scroll.directive';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { SectionTitleComponent } from '../../../shared/ui/section-title/section-title.component';

@Component({
  selector: 'app-experience-preview',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    SectionTitleComponent,
    TimelineItemComponent,
    ButtonComponent,
    RevealOnScrollDirective,
  ],
  templateUrl: './experience-preview.component.html',
  styleUrl: './experience-preview.component.scss',
})
export class ExperiencePreviewComponent {
  private readonly data = inject(PortfolioDataService);

  readonly latest$ = this.data.getExperience().pipe(map((items) => items.slice(0, 2)));
}
