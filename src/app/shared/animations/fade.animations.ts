import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('400ms ease-out', style({ opacity: 1 })),
  ]),
]);

export const fadeSlideUp = trigger('fadeSlideUp', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(24px)' }),
    animate(
      '500ms cubic-bezier(0.22, 1, 0.36, 1)',
      style({ opacity: 1, transform: 'translateY(0)' }),
    ),
  ]),
]);

export const staggerFade = trigger('staggerFade', [
  transition(':enter', [
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'translateY(16px)' }),
        stagger(80, [
          animate(
            '450ms cubic-bezier(0.22, 1, 0.36, 1)',
            style({ opacity: 1, transform: 'translateY(0)' }),
          ),
        ]),
      ],
      { optional: true },
    ),
  ]),
]);
