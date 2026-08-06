import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { map } from 'rxjs';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { SeoService } from '../../core/services/seo.service';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { SectionTitleComponent } from '../../shared/ui/section-title/section-title.component';
import { fadeIn } from '../../shared/animations/fade.animations';

@Component({
  selector: 'app-about',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, SectionTitleComponent, RevealOnScrollDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  animations: [fadeIn],
})
export class AboutComponent implements OnInit {
  private readonly data = inject(PortfolioDataService);
  private readonly seo = inject(SeoService);

  readonly profile$ = this.data.getProfile();
  readonly experience$ = this.data.getExperience();

  readonly stats$ = this.profile$.pipe(
    map((profile) => [
      { label: 'Years experience', value: `${profile.stats.yearsExperience}+` },
      { label: 'Projects delivered', value: `${profile.stats.projectsDelivered}` },
      { label: 'Technologies', value: `${profile.stats.technologies}+` },
      { label: 'Companies', value: `${profile.stats.companies}` },
    ]),
  );

  readonly strengths = [
    'Building enterprise Angular applications from the ground up',
    'Designing reusable component libraries and design-system patterns',
    'Real-time UI with SignalR and resilient client-side state',
    'Permission-driven interfaces and secure authentication flows',
    'Cross-functional collaboration across product, backend, and QA',
  ];

  ngOnInit(): void {
    this.seo.setTitle('About | Khaled Sabry');
    this.seo.setMetaDescription(
      'About Khaled Sabry — Senior Frontend Engineer focused on scalable Angular and React product experiences.',
    );
  }
}
