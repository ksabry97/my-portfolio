import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NAV_LINKS } from '../../../core/constants/app.constants';
import { SocialLink } from '../../../core/models/portfolio.models';
import { SocialIconsComponent } from '../social-icons/social-icons.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, SocialIconsComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly socials = input<SocialLink[]>([]);
  readonly links = NAV_LINKS;
  readonly year = 2026;

  scrollToTop(): void {
    if (typeof window === 'undefined') {
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
