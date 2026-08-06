import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of, shareReplay } from 'rxjs';
import { GITHUB_API } from '../constants/app.constants';
import { GithubRepo, GithubUser } from '../models/portfolio.models';

@Injectable({ providedIn: 'root' })
export class GithubService {
  private readonly http = inject(HttpClient);
  private cache = new Map<string, Observable<unknown>>();

  getUser(username: string): Observable<GithubUser | null> {
    return this.cached(
      `user:${username}`,
      this.http.get<GithubUser>(`${GITHUB_API}/users/${username}`).pipe(
        catchError(() => of(null)),
        shareReplay(1)
      )
    ) as Observable<GithubUser | null>;
  }

  getRepos(username: string): Observable<GithubRepo[]> {
    return this.cached(
      `repos:${username}`,
      this.http
        .get<GithubRepo[]>(
          `${GITHUB_API}/users/${username}/repos?sort=updated&per_page=12`
        )
        .pipe(
          catchError(() => of([] as GithubRepo[])),
          shareReplay(1)
        )
    ) as Observable<GithubRepo[]>;
  }

  private cached<T>(key: string, source$: Observable<T>): Observable<T> {
    const existing = this.cache.get(key);
    if (existing) {
      return existing as Observable<T>;
    }
    this.cache.set(key, source$);
    return source$;
  }
}
