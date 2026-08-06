import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
    title: 'Khaled Sabry | Senior Frontend Engineer',
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/about/about.component').then((m) => m.AboutComponent),
    title: 'About | Khaled Sabry',
  },
  {
    path: 'skills',
    loadComponent: () =>
      import('./features/skills/skills.component').then((m) => m.SkillsComponent),
    title: 'Skills | Khaled Sabry',
  },
  {
    path: 'experience',
    loadComponent: () =>
      import('./features/experience/experience.component').then(
        (m) => m.ExperienceComponent
      ),
    title: 'Experience | Khaled Sabry',
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./features/projects/projects.component').then(
        (m) => m.ProjectsComponent
      ),
    title: 'Projects | Khaled Sabry',
  },
  {
    path: 'projects/:slug',
    loadComponent: () =>
      import('./features/projects/project-detail/project-detail.component').then(
        (m) => m.ProjectDetailComponent
      ),
    title: 'Project | Khaled Sabry',
  },
  {
    path: 'github',
    loadComponent: () =>
      import('./features/github/github.component').then((m) => m.GithubComponent),
    title: 'GitHub | Khaled Sabry',
  },
  {
    path: 'resume',
    loadComponent: () =>
      import('./features/resume/resume.component').then((m) => m.ResumeComponent),
    title: 'Resume | Khaled Sabry',
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact.component').then(
        (m) => m.ContactComponent
      ),
    title: 'Contact | Khaled Sabry',
  },
  { path: '**', redirectTo: '' },
];
