import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ScrollProgressComponent } from './shared/components/scroll-progress/scroll-progress.component';
import { PortfolioDataService } from './core/services/portfolio-data.service';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AsyncPipe,
    NavbarComponent,
    FooterComponent,
    ScrollProgressComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly theme = inject(ThemeService);
  private readonly data = inject(PortfolioDataService);

  readonly social$ = this.data.getSocialLinks();

  ngOnInit(): void {
    this.theme.init();
  }
}
