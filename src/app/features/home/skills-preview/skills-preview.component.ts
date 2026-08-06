import { AsyncPipe, KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { Skill } from '../../../core/models/portfolio.models';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';
import { groupBy } from '../../../core/utilities/date.utils';
import { SkillCardComponent } from '../../../shared/components/skill-card/skill-card.component';
import { RevealOnScrollDirective } from '../../../shared/directives/reveal-on-scroll.directive';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { SectionTitleComponent } from '../../../shared/ui/section-title/section-title.component';

@Component({
  selector: 'app-skills-preview',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    KeyValuePipe,
    SectionTitleComponent,
    SkillCardComponent,
    ButtonComponent,
    RevealOnScrollDirective,
  ],
  templateUrl: './skills-preview.component.html',
  styleUrl: './skills-preview.component.scss',
})
export class SkillsPreviewComponent {
  private readonly data = inject(PortfolioDataService);

  readonly grouped$ = this.data.getSkills().pipe(
    map((skills) => {
      const grouped = groupBy(skills, 'category');
      const sample: Record<string, Skill[]> = {};
      for (const [category, items] of Object.entries(grouped)) {
        const sorted = [...items].sort((a, b) => b.level - a.level);
        // Always surface Angular + React in the Frontend preview.
        if (category === 'Frontend') {
          const priority = ['angular', 'react', 'typescript'];
          const picked = priority
            .map((id) => sorted.find((s) => s.id === id))
            .filter((s): s is Skill => !!s);
          const rest = sorted.filter((s) => !priority.includes(s.id));
          sample[category] = [...picked, ...rest].slice(0, 3);
        } else {
          sample[category] = sorted.slice(0, 2);
        }
      }
      return sample;
    }),
  );
}
