import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, of, switchMap } from 'rxjs';
import { Project } from '../../../core/models/portfolio.models';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';
import { SeoService } from '../../../core/services/seo.service';
import { fadeIn } from '../../../shared/animations/fade.animations';
import { ProjectCardComponent } from '../../../shared/components/project-card/project-card.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { TagComponent } from '../../../shared/ui/tag/tag.component';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    RouterLink,
    ButtonComponent,
    TagComponent,
    ProjectCardComponent,
  ],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss',
  animations: [fadeIn],
})
export class ProjectDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly data = inject(PortfolioDataService);
  private readonly seo = inject(SeoService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')),
    { initialValue: '' },
  );

  readonly project$ = toObservable(this.slug).pipe(
    switchMap((slug) => (slug ? this.data.getProjectBySlug(slug) : of(undefined))),
  );

  private readonly project = toSignal(this.project$);

  readonly related$ = toObservable(this.project).pipe(
    switchMap((project) => {
      if (!project) {
        return of([] as Project[]);
      }
      return this.data.getProjects().pipe(
        map((projects) =>
          projects
            .filter((p) => p.id !== project.id && p.category === project.category)
            .slice(0, 2),
        ),
      );
    }),
  );

  ngOnInit(): void {
    this.project$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((project) => {
      if (project) {
        this.seo.setTitle(`${project.title} | Khaled Sabry`);
        this.seo.setMetaDescription(project.summary);
      } else {
        this.seo.setTitle('Project | Khaled Sabry');
      }
    });
  }
}
