import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { AboutPreviewComponent } from './about-preview/about-preview.component';
import { ContactCtaComponent } from './contact-cta/contact-cta.component';
import { ExperiencePreviewComponent } from './experience-preview/experience-preview.component';
import { FeaturedProjectsComponent } from './featured-projects/featured-projects.component';
import { HeroComponent } from './hero/hero.component';
import { SkillsPreviewComponent } from './skills-preview/skills-preview.component';

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeroComponent,
    AboutPreviewComponent,
    FeaturedProjectsComponent,
    ExperiencePreviewComponent,
    SkillsPreviewComponent,
    ContactCtaComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setTitle('Khaled Sabry | Senior Frontend Engineer');
    this.seo.setMetaDescription(
      'Portfolio of Khaled Sabry — Senior Frontend Engineer specializing in Angular, React, and scalable enterprise UI systems.',
    );
  }
}
