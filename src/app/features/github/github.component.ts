import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { catchError, combineLatest, map, of, startWith, switchMap } from 'rxjs';
import { GithubRepo, GithubUser } from '../../core/models/portfolio.models';
import { GithubService } from '../../core/services/github.service';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { SeoService } from '../../core/services/seo.service';
import { fadeIn } from '../../shared/animations/fade.animations';
import { LoadingSkeletonComponent } from '../../shared/components/loading-skeleton/loading-skeleton.component';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { SectionTitleComponent } from '../../shared/ui/section-title/section-title.component';
import { TagComponent } from '../../shared/ui/tag/tag.component';

interface GithubViewModel {
  loading: boolean;
  error: boolean;
  username: string;
  user: GithubUser | null;
  repos: GithubRepo[];
}

@Component({
  selector: 'app-github',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    DatePipe,
    SectionTitleComponent,
    LoadingSkeletonComponent,
    ButtonComponent,
    TagComponent,
  ],
  templateUrl: './github.component.html',
  styleUrl: './github.component.scss',
  animations: [fadeIn],
})
export class GithubComponent implements OnInit {
  private readonly data = inject(PortfolioDataService);
  private readonly github = inject(GithubService);
  private readonly seo = inject(SeoService);

  readonly vm$ = this.data.getProfile().pipe(
    switchMap((profile) => {
      const username = profile.githubUsername;
      return combineLatest({
        user: this.github.getUser(username),
        repos: this.github.getRepos(username),
      }).pipe(
        map(({ user, repos }) => ({
          loading: false,
          error: user === null,
          username,
          user,
          repos,
        })),
        startWith({
          loading: true,
          error: false,
          username,
          user: null,
          repos: [] as GithubRepo[],
        } satisfies GithubViewModel),
        catchError(() =>
          of({
            loading: false,
            error: true,
            username,
            user: null,
            repos: [] as GithubRepo[],
          } satisfies GithubViewModel),
        ),
      );
    }),
  );

  ngOnInit(): void {
    this.seo.setTitle('GitHub | Khaled Sabry');
    this.seo.setMetaDescription(
      'GitHub profile and recent repositories for Khaled Sabry.',
    );
  }
}
