import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SocialLink } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-social-icons',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './social-icons.component.html',
  styleUrl: './social-icons.component.scss',
})
export class SocialIconsComponent {
  readonly links = input<SocialLink[]>([]);
}
