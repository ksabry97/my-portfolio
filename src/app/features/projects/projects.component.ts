import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Project } from '../../core/models/portfolio.models';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { SeoService } from '../../core/services/seo.service';
import { fadeIn } from '../../shared/animations/fade.animations';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { SectionTitleComponent } from '../../shared/ui/section-title/section-title.component';

type SortKey = 'featured' | 'title' | 'category';

@Component({
  selector: 'app-projects',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, SectionTitleComponent, ProjectCardComponent, RevealOnScrollDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  animations: [fadeIn],
})
export class ProjectsComponent implements OnInit {
  private readonly data = inject(PortfolioDataService);
  private readonly seo = inject(SeoService);

  readonly projects = toSignal(this.data.getProjects(), { initialValue: [] as Project[] });
  readonly search = signal('');
  readonly category = signal('All');
  readonly sort = signal<SortKey>('featured');

  readonly categories = computed(() => {
    const cats = Array.from(new Set(this.projects().map((p) => p.category))).sort();
    return ['All', ...cats];
  });

  readonly filtered = computed(() => {
    const query = this.search().trim().toLowerCase();
    const category = this.category();
    const sort = this.sort();

    let list = this.projects().filter((project) => {
      const matchesCategory = category === 'All' || project.category === category;
      const haystack = `${project.title} ${project.summary} ${project.technologies.join(' ')}`.toLowerCase();
      const matchesSearch = !query || haystack.includes(query);
      return matchesCategory && matchesSearch;
    });

    list = [...list].sort((a, b) => {
      if (sort === 'title') {
        return a.title.localeCompare(b.title);
      }
      if (sort === 'category') {
        return a.category.localeCompare(b.category) || a.title.localeCompare(b.title);
      }
      return Number(b.featured) - Number(a.featured) || a.title.localeCompare(b.title);
    });

    return list;
  });

  ngOnInit(): void {
    this.seo.setTitle('Projects | Khaled Sabry');
    this.seo.setMetaDescription(
      'Selected frontend projects — fintech portals, shared UI libraries, and enterprise CRM modules.',
    );
  }

  onSearch(value: string): void {
    this.search.set(value);
  }

  onCategory(value: string): void {
    this.category.set(value);
  }

  onSort(value: string): void {
    this.sort.set(value as SortKey);
  }
}
