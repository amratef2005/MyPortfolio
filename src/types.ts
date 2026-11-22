export interface Project {
  id: string;
  title: string;
  titleAr: string;
  tagline: string;
  taglineAr: string;
  description: string;
  descriptionAr: string;
  category: '.NET & Backend' | 'Full-Stack' | 'Cloud & SaaS';
  featured: boolean;
  image?: string;
  badge: string;
  badgeAr?: string;
  architecture: string[];
  architectureAr?: string[];
  technologies: string[];
  metrics: { label: string; labelAr?: string; value: string; valueAr?: string }[];
  features: string[];
  featuresAr?: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface Certificate {
  id: string;
  title: string;
  titleAr: string;
  issuer: string;
  issuerAr: string;
  date: string;
  fileUrl: string; // e.g. /iti.pdf or /cshar.pdf
  previewImage?: string;
  description: string;
  descriptionAr: string;
  badge: string;
  badgeAr?: string;
}

export interface SkillCategory {
  name: string;
  nameAr: string;
  icon: string;
  skills: { name: string; nameAr?: string; level: number; tag?: string; tagAr?: string }[];
}

export interface ProfileInfo {
  name: string;
  nameAr: string;
  shortName?: string;
  shortNameAr?: string;
  title: string;
  titleAr: string;
  bio: string;
  bioAr: string;
  email: string;
  phone: string;
  location: string;
  locationAr: string;
  github: string;
  linkedin: string;
  whatsapp: string;
  resumeUrl: string;
  topAvatarUrl?: string; // Top image (Navbar)
  yearsOfExperience: number;
  completedProjects: number;
  adminUsername?: string; // default "admin"
  adminPassword?: string; // default "admin123"
  adminPin?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}
