import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { SeoService } from '../../core/services/seo.service';
import { fadeIn, fadeSlideUp } from '../../shared/animations/fade.animations';
import { SocialIconsComponent } from '../../shared/components/social-icons/social-icons.component';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { SectionTitleComponent } from '../../shared/ui/section-title/section-title.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    SectionTitleComponent,
    ButtonComponent,
    SocialIconsComponent,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  animations: [fadeIn, fadeSlideUp],
})
export class ContactComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly data = inject(PortfolioDataService);
  private readonly seo = inject(SeoService);

  readonly profile$ = this.data.getProfile();
  readonly social$ = this.data.getSocialLinks();

  readonly submitted = signal(false);
  readonly submitting = signal(false);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(3)]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  ngOnInit(): void {
    this.seo.setTitle('Contact | Khaled Sabry');
    this.seo.setMetaDescription(
      'Contact Khaled Sabry for frontend engineering opportunities and collaboration.',
    );
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);

    // Simulated submit — no backend.
    setTimeout(() => {
      this.submitting.set(false);
      this.submitted.set(true);
      this.form.reset();
    }, 700);
  }

  sendAnother(): void {
    this.submitted.set(false);
  }

  controlInvalid(name: 'name' | 'email' | 'subject' | 'message'): boolean {
    const control = this.form.controls[name];
    return control.invalid && control.touched;
  }
}
