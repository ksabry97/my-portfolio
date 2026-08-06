# AI Software Architect Prompt - Angular Portfolio Website

You are a Senior Staff Frontend Engineer, UX Designer, Motion Designer, and Angular Architect.

Your goal is to build a production-ready personal portfolio website that looks premium, modern, highly animated, responsive, and optimized for performance.

The result should look comparable to award-winning portfolio websites while remaining professional enough for recruiters and companies.

The portfolio should emphasize engineering quality rather than excessive visual effects.

---

# Tech Stack

Use

- Angular 20
- Standalone Components
- Signals
- RxJS only where necessary
- Angular Router
- Angular Animations
- SCSS
- CSS Variables
- TypeScript Strict Mode
- Angular SSR (SEO Friendly)
- Angular Hydration
- Angular Image Optimization
- Vite (default Angular)
- ESLint
- Prettier

No jQuery.

No Bootstrap.

No unnecessary dependencies.

---

# Architecture

Follow feature-based architecture.

```
src
│
├── core
│   ├── services
│   ├── models
│   ├── constants
│   ├── interceptors
│   └── utilities
│
├── shared
│   ├── components
│   ├── directives
│   ├── pipes
│   ├── animations
│   ├── icons
│   └── ui
│
├── features
│   ├── home
│   ├── projects
│   ├── experience
│   ├── skills
│   ├── blog
│   ├── contact
│   └── github
│
└── assets
```

Every section must be reusable.

No duplicated code.

Keep business logic outside UI components.

---

# Design Style

Theme:

Modern
Minimal
Premium
Dark Mode First

Design inspiration:

Linear.app

Stripe

Vercel

Apple

Framer

Avoid templates that look generic.

Use

glassmorphism

soft shadows

gradients

subtle animations

blur

modern typography

large spacing

smooth scrolling

---

# Color Palette

Dark Theme

Background:
#09090B

Surface:
#18181B

Primary:
#6366F1

Accent:
#06B6D4

Success:
#22C55E

Warning:
#F59E0B

Danger:
#EF4444

Text:
#FAFAFA

Secondary Text:
#A1A1AA

---

# Typography

Use Inter.

Large hero titles.

Readable spacing.

Professional hierarchy.

---

# Animations

Everything should feel alive.

Implement

fade

slide

stagger

floating effects

hover transitions

button ripple

scroll reveal

card tilt

parallax background

cursor glow

animated gradients

page transitions

Use Angular Animations instead of external libraries whenever possible.

Animations should never hurt performance.

---

# Responsive Design

Desktop

Laptop

Tablet

Mobile

Ultra-wide monitors

Everything should scale properly.

---

# Hero Section

Include

Professional photo placeholder

Large name

Frontend Engineer

Angular Expert

React Developer

Problem Solver

Short introduction

Animated typing effect

Buttons

Download Resume

View Projects

Contact Me

Social Icons

GitHub

LinkedIn

Email

Location

Availability

Animated background

---

# About Me

Professional summary

Journey

Core strengths

Engineering philosophy

Numbers section

Years Experience

Projects Delivered

Technologies

Repositories

Open Source Contributions

---

# Skills

Beautiful animated cards.

Group skills into

Frontend

Angular

React

TypeScript

JavaScript

HTML

CSS

SCSS

Tailwind

State Management

RxJS

NgRx

Signals

Testing

Jest

Cypress

Performance

SSR

Security

Accessibility

Build Tools

Webpack

Vite

Nx

Git

Storybook

Backend Knowledge

Node

REST APIs

SignalR

WebSockets

Authentication

JWT

OAuth

Architecture

Monorepo

Micro Frontends

Reusable UI

Design Systems

Each skill should have

logo

level

years

description

---

# Experience Timeline

Beautiful vertical timeline.

Each company

Role

Duration

Achievements

Technologies

Expandable details.

---

# Featured Projects

Create premium project cards.

Each project contains

cover image

title

summary

technologies

GitHub

Live Demo

Case Study

Project Details

Challenges

Architecture

Animations

Filtering

Search

Category

Sort

---

# GitHub Integration

Create GitHub service.

Use GitHub API.

Show

Repositories

Stars

Forks

Languages

Contribution Stats

Pinned Projects

Latest Activity

Profile Card

Followers

Following

Contribution Heatmap placeholder

Include loading skeletons.

---

# Project Details Page

Each project has

Hero

Gallery

Architecture

Features

Challenges

Solutions

Lessons Learned

Tech Stack

Links

Screenshots

Related Projects

---

# Resume

Interactive resume page.

Download CV button.

Timeline.

Skills.

Education.

Certificates.

---

# Contact

Beautiful contact form.

Validation.

Animations.

Success state.

Email

LinkedIn

GitHub

Location

Calendar button

---

# Footer

Quick Links

Socials

Back To Top

Copyright

Theme Toggle

---

# Dark / Light Mode

Implement both.

Remember user preference.

Smooth transitions.

---

# Accessibility

Keyboard navigation

ARIA labels

Semantic HTML

Proper focus states

Screen reader friendly

WCAG compliance

---

# Performance

Lazy Loading

Deferred Loading

Route Level Code Splitting

Image Optimization

Preloading

Caching

TrackBy

OnPush

Signals

Avoid unnecessary change detection

Minimize bundle size

---

# SEO

Angular SSR

Meta tags

OpenGraph

Twitter Cards

Structured Data

Sitemap

robots.txt

Canonical URLs

---

# Components

Small reusable components only.

Examples

HeroComponent

ProjectCardComponent

SkillCardComponent

TimelineComponent

GithubCardComponent

NavbarComponent

FooterComponent

SectionTitleComponent

ButtonComponent

TagComponent

BadgeComponent

ModalComponent

ImageGalleryComponent

ThemeToggleComponent

SocialIconsComponent

LoadingSkeletonComponent

---

# Code Standards

Strict typing.

No any.

SOLID principles.

DRY.

Reusable utilities.

Use signals where possible.

Comments only where useful.

Readable code.

---

# Deployment

Prepare production configuration.

Generate

Dockerfile

docker-compose.yml

GitHub Actions workflow

Nginx configuration

Deployment guide

Environment files

Ready for

Vercel

Netlify

Firebase Hosting

GitHub Pages

Azure Static Web Apps

AWS S3 + CloudFront

---

# Content

Use placeholders so I can easily replace them later.

Create JSON files for

Projects

Experience

Skills

Social Links

Education

Certificates

Everything should be data-driven.

---

# Bonus Features

Command palette

Search

Animated cursor

Page loading animation

Smooth page transitions

Reading progress bar

Scroll progress

Mouse follower

Project filtering

Blog support

Internationalization

Theme customization

Keyboard shortcuts

Interactive background

Particle effects

Terminal-style "About Me"

---

# Deliverables

Generate

✔ Complete Angular project

✔ Production-ready architecture

✔ Responsive UI

✔ Beautiful animations

✔ Reusable components

✔ Clean SCSS

✔ GitHub integration

✔ SEO optimized

✔ Accessible

✔ Deployment ready

✔ Well documented

✔ README.md

✔ Professional code quality

Before implementing any feature:
- Search the existing project for reusable components, utilities, directives, services, styles, and helpers.
- Reuse existing code whenever possible instead of creating new implementations.
- Keep components small and focused.
- Separate presentation from business logic.
- Follow Angular best practices and avoid unnecessary complexity.
- Ensure the final application is maintainable, scalable, and production-ready.