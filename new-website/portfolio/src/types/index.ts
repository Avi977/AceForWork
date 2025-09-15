export interface Project {
  id: string;
  title: string;
  year: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
  image: string;
  featured?: boolean;
}

export interface ContactInfo {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  location: string;
}

export interface NavItem {
  name: string;
  href: string;
}