export interface Experience {
  id: string;
  role: string;
  roleAr: string;
  company: string;
  companyAr: string;
  period: string;
  periodAr: string;
  location: string;
  locationAr: string;
  type: string;
  typeAr: string;
  badge: string;
  badgeAr?: string;
  summary: string;
  summaryAr: string;
  architecture: string[];
  architectureAr?: string[];
  technologies: string[];
  metrics: { label: string; labelAr?: string; value: string; valueAr?: string }[];
  responsibilities: string[];
  responsibilitiesAr?: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  titleAr: string;
  tagline: string;
  taglineAr: string;
  description: string;
  descriptionAr: string;
  category: 'UI/UX Design' | 'Mobile Apps' | 'Web & SaaS' | 'Design Systems' | string;
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
  brandName?: string;
  brandNameAr?: string;
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
  heroAvatarUrl?: string; // Image 1 (Hero Section)
  aboutAvatarUrl?: string; // Image 2 (About Section)
  heroImageScale?: number; // 0.7 to 1.5 (default 1)
  heroImageOffsetY?: number; // -60 to 60 (default 0)
  heroGlowIntensity?: number; // 0.4 to 1.8 (default 1)
  heroShowRings?: boolean; // default true
  aboutImageScale?: number; // 0.7 to 1.5 (default 1)
  aboutImageOffsetY?: number; // -60 to 60 (default 0)
  aboutGlowIntensity?: number; // 0.4 to 1.8 (default 1)
  aboutShowRings?: boolean; // default true
  autoExtractColors?: boolean; // Automatically extract theme colors from avatar
  fontPreset?: 'plex-jakarta' | 'cairo-outfit' | 'alexandria-dm' | 'ruqaa-dancing';
  iconPack?: 'minimal-crisp' | 'duotone-glow' | 'apple-bold';
  extractedColors?: {
    primary: string;
    primaryRgb?: string;
    secondary: string;
    secondaryRgb?: string;
    accent: string;
    accentRgb?: string;
    glow: string;
    glowSecondary?: string;
  };
  yearsOfExperience: number;
  completedProjects: number;
  adminUsername?: string; // default "admin"
  adminPassword?: string; // default "admin123"
  adminPin?: string;

  // Custom Editable Headings & Names Across Sections
  heroGreeting?: string;
  heroGreetingAr?: string;
  aboutSubtitle?: string;
  aboutSubtitleAr?: string;
  aboutHeading?: string;
  aboutHeadingAr?: string;
  experienceHeading?: string;
  experienceHeadingAr?: string;
  projectsHeading?: string;
  projectsHeadingAr?: string;
  certificatesHeading?: string;
  certificatesHeadingAr?: string;
  skillsHeading?: string;
  skillsHeadingAr?: string;
  contactHeading?: string;
  contactHeadingAr?: string;
  contactPrompt?: string;
  contactPromptAr?: string;

  // 1. Work Availability & Presence Status
  availabilityStatus?: 'available' | 'busy' | 'offline';
  availabilityNoteAr?: string;
  availabilityNoteEn?: string;
  showAvailabilityBadge?: boolean;

  // 2. WhatsApp Live Response Status
  whatsappStatus?: 'online' | 'delayed' | 'offline';
  whatsappNoteAr?: string;
  whatsappNoteEn?: string;
  showWhatsAppStatus?: boolean;

  // Education, Collaboration & Languages
  university?: string;
  universityAr?: string;
  degree?: string;
  degreeAr?: string;
  teamwork?: string[];
  teamworkAr?: string[];
  languages?: string;
  languagesAr?: string;
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
