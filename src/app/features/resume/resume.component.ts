import { AsyncPipe, KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Skill } from '../../core/models/portfolio.models';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { SeoService } from '../../core/services/seo.service';
import { formatDateRange, groupBy } from '../../core/utilities/date.utils';
import { fadeIn } from '../../shared/animations/fade.animations';
import { SkillCardComponent } from '../../shared/components/skill-card/skill-card.component';
import { TimelineItemComponent } from '../../shared/components/timeline-item/timeline-item.component';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { SectionTitleComponent } from '../../shared/ui/section-title/section-title.component';

@Component({
  selector: 'app-resume',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    KeyValuePipe,
    SectionTitleComponent,
    ButtonComponent,
    TimelineItemComponent,
    SkillCardComponent,
  ],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss',
  animations: [fadeIn],
})
export class ResumeComponent implements OnInit {
  private readonly data = inject(PortfolioDataService);
  private readonly seo = inject(SeoService);

  readonly profile$ = this.data.getProfile();
  readonly experience$ = this.data.getExperience();
  readonly education$ = this.data.getEducation();
  readonly certificates$ = this.data.getCertificates();

  readonly skillsGrouped = toSignal(
    this.data.getSkills().pipe(
      map((skills) =>
        groupBy([...skills].sort((a, b) => b.level - a.level), 'category') as Record<
          string,
          Skill[]
        >,
      ),
    ),
    { initialValue: {} as Record<string, Skill[]> },
  );

  readonly formatDateRange = formatDateRange;

  ngOnInit(): void {
    this.seo.setTitle('Resume | Khaled Sabry');
    this.seo.setMetaDescription(
      'Interactive resume — experience, skills, education, and certificates for Khaled Sabry.',
    );
  }
}
