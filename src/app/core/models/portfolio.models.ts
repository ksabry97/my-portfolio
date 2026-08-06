export interface Profile {
  name: string;
  title: string;
  roles: string[];
  tagline: string;
  summary: string;
  philosophy: string;
  email: string;
  phone: string;
  location: string;
  availability: string;
  photo: string;
  resumeUrl: string;
  githubUsername: string;
  stats: ProfileStats;
}

export interface ProfileStats {
  yearsExperience: number;
  projectsDelivered: number;
  technologies: number;
  companies: number;
}

export interface SocialLink {
  id: string;
  label: string;
  url: string;
  icon: 'github' | 'linkedin' | 'email' | string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  summary: string;
  achievements: string[];
  technologies: string[];
}

export interface ProjectLinks {
  github: string | null;
  live: string | null;
  caseStudy: string | null;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  featured: boolean;
  summary: string;
  description: string;
  coverImage: string;
  technologies: string[];
  highlights: string[];
  challenges: string[];
  architecture: string[];
  features: string[];
  lessons: string[];
  links: ProjectLinks;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  years: number;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  details: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: number | null;
  url: string | null;
}

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
}

export interface GithubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  location: string | null;
}
