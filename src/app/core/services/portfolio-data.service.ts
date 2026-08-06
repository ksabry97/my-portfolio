import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  Certificate,
  Education,
  Experience,
  Profile,
  Project,
  Skill,
  SocialLink,
} from '../models/portfolio.models';

import profile from '../../../assets/data/profile.json';
import social from '../../../assets/data/social.json';
import experience from '../../../assets/data/experience.json';
import projects from '../../../assets/data/projects.json';
import skills from '../../../assets/data/skills.json';
import education from '../../../assets/data/education.json';
import certificates from '../../../assets/data/certificates.json';

@Injectable({ providedIn: 'root' })
export class PortfolioDataService {
  getProfile(): Observable<Profile> {
    return of(profile as Profile);
  }

  getSocialLinks(): Observable<SocialLink[]> {
    return of(social as SocialLink[]);
  }

  getExperience(): Observable<Experience[]> {
    return of(experience as Experience[]);
  }

  getProjects(): Observable<Project[]> {
    return of(projects as Project[]);
  }

  getProjectBySlug(slug: string): Observable<Project | undefined> {
    return of((projects as Project[]).find((p) => p.slug === slug));
  }

  getSkills(): Observable<Skill[]> {
    return of(skills as Skill[]);
  }

  getEducation(): Observable<Education[]> {
    return of(education as Education[]);
  }

  getCertificates(): Observable<Certificate[]> {
    return of(certificates as Certificate[]);
  }
}
