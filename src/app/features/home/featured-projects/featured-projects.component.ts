import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';
import { ProjectCardComponent } from '../../../shared/components/project-card/project-card.component';
import { RevealOnScrollDirective } from '../../../shared/directives/reveal-on-scroll.directive';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { SectionTitleComponent } from '../../../shared/ui/section-title/section-title.component';

@Component({
  selector: 'app-featured-projects',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    SectionTitleComponent,
    ProjectCardComponent,
    ButtonComponent,
    RevealOnScrollDirective,
  ],
  templateUrl: './featured-projects.component.html',
  styleUrl: './featured-projects.component.scss',
})
export class FeaturedProjectsComponent {
  private readonly data = inject(PortfolioDataService);

  readonly featured$ = this.data
    .getProjects()
    .pipe(map((projects) => projects.filter((p) => p.featured).slice(0, 4)));
}
