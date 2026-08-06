import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealOnScrollDirective } from '../../../shared/directives/reveal-on-scroll.directive';
import { ButtonComponent } from '../../../shared/ui/button/button.component';

@Component({
  selector: 'app-contact-cta',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, RevealOnScrollDirective],
  templateUrl: './contact-cta.component.html',
  styleUrl: './contact-cta.component.scss',
})
export class ContactCtaComponent {}
