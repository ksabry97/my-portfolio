import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { SeoService } from '../../core/services/seo.service';
import { fadeIn } from '../../shared/animations/fade.animations';
import { TimelineItemComponent } from '../../shared/components/timeline-item/timeline-item.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { SectionTitleComponent } from '../../shared/ui/section-title/section-title.component';

@Component({
  selector: 'app-experience',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, SectionTitleComponent, TimelineItemComponent, RevealOnScrollDirective],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
  animations: [fadeIn],
})
export class ExperienceComponent implements OnInit {
  private readonly data = inject(PortfolioDataService);
  private readonly seo = inject(SeoService);

  readonly experience$ = this.data.getExperience();

  ngOnInit(): void {
    this.seo.setTitle('Experience | Khaled Sabry');
    this.seo.setMetaDescription(
      'Professional experience timeline — enterprise Angular engineering across fintech and CRM platforms.',
    );
  }
}
