import { KeyValuePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Skill } from '../../core/models/portfolio.models';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { SeoService } from '../../core/services/seo.service';
import { groupBy } from '../../core/utilities/date.utils';
import { fadeIn, staggerFade } from '../../shared/animations/fade.animations';
import { SkillCardComponent } from '../../shared/components/skill-card/skill-card.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { SectionTitleComponent } from '../../shared/ui/section-title/section-title.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    KeyValuePipe,
    SectionTitleComponent,
    SkillCardComponent,
    RevealOnScrollDirective,
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
  animations: [fadeIn, staggerFade],
})
export class SkillsComponent implements OnInit {
  private readonly data = inject(PortfolioDataService);
  private readonly seo = inject(SeoService);

  readonly skills = toSignal(this.data.getSkills(), { initialValue: [] as Skill[] });
  readonly selectedCategory = signal<string>('All');

  readonly categories = computed(() => {
    const cats = Array.from(new Set(this.skills().map((s) => s.category))).sort();
    return ['All', ...cats];
  });

  readonly filteredGrouped = computed(() => {
    const selected = this.selectedCategory();
    const filtered =
      selected === 'All'
        ? this.skills()
        : this.skills().filter((s) => s.category === selected);

    const grouped = groupBy(
      [...filtered].sort((a, b) => b.level - a.level),
      'category',
    );
    return grouped;
  });

  ngOnInit(): void {
    this.seo.setTitle('Skills | Khaled Sabry');
    this.seo.setMetaDescription(
      'Frontend skills across Angular, React, TypeScript, architecture, security, and tooling.',
    );
  }

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
  }
}
