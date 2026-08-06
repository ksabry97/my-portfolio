import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';
import { RevealOnScrollDirective } from '../../../shared/directives/reveal-on-scroll.directive';
import { SectionTitleComponent } from '../../../shared/ui/section-title/section-title.component';

@Component({
  selector: 'app-about-preview',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, SectionTitleComponent, RevealOnScrollDirective],
  templateUrl: './about-preview.component.html',
  styleUrl: './about-preview.component.scss',
})
export class AboutPreviewComponent {
  private readonly data = inject(PortfolioDataService);

  readonly profile$ = this.data.getProfile();

  readonly stats$ = this.profile$.pipe(
    map((profile) => [
      { label: 'Years experience', value: `${profile.stats.yearsExperience}+` },
      { label: 'Projects delivered', value: `${profile.stats.projectsDelivered}` },
      { label: 'Technologies', value: `${profile.stats.technologies}+` },
      { label: 'Companies', value: `${profile.stats.companies}` },
    ]),
  );
}
