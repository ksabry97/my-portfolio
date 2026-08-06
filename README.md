# Khaled Sabry — Portfolio

Production-ready Angular 20 portfolio with SSR, dark/light themes, and data-driven content from your CV.

## Stack

- Angular 20 (standalone, signals, SSR + hydration)
- SCSS + CSS variables
- Angular Animations + view transitions
- GitHub API integration
- Feature-based architecture

## Quick start

```bash
npm install
npm start
```

Open `http://localhost:4200`.

## Scripts

| Command | Description |
| --- | --- |
| `npm start` | Dev server |
| `npm run build` | Production SSR build |
| `npm run serve:ssr:portfolio` | Serve SSR build |
| `npm test` | Unit tests |

## Content

Edit JSON under `src/assets/data/`:

- `profile.json` — name, summary, photo, stats
- `experience.json` — work history
- `projects.json` — case studies
- `skills.json` — skill cards
- `education.json` / `certificates.json` / `social.json`

Assets:

- Photo: `src/assets/images/profile.jpg`
- Resume: `src/assets/resume/khaledSabry-CV.pdf`

## Architecture

```
src/app
├── core        # models, services, constants, utilities
├── shared      # UI primitives, layout, animations, directives
└── features    # home, about, skills, experience, projects, github, resume, contact
```

## Deploy

- **SSR Node**: `npm run build` then `npm run serve:ssr:portfolio`
- **Docker**: see `Dockerfile` + `docker-compose.yml`
- **Static hosts** (Vercel/Netlify/Firebase): configure for Angular SSR or export accordingly

## Contact

- Email: isabryex@gmail.com
- GitHub: [ksabry97](https://github.com/ksabry97)
- LinkedIn: [khaled-sabry-680649139](https://linkedin.com/in/khaled-sabry-680649139)
