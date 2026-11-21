import React from 'react';
import { ProfileInfo, Project, Certificate, SkillCategory } from '../../types';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin
} from 'lucide-react';

export type AccentColor =
  | 'slate'
  | 'navy'
  | 'cyan'
  | 'cobalt'
  | 'indigo'
  | 'teal'
  | 'emerald'
  | 'rose'
  | 'ruby'
  | 'amber'
  | 'violet'
  | 'charcoal';

export interface CVOptions {
  template: 'classic';
  language: 'en';
  accentColor: AccentColor;
  includedProjects: string[];
  roleTitle?: string;
  isEditable: boolean;
}

interface CVDocumentProps {
  options: CVOptions;
  profile: ProfileInfo;
  projects: Project[];
  certificates: Certificate[];
  skills: SkillCategory[];
}

export const CVDocument: React.FC<CVDocumentProps> = ({
  options,
  profile,
  projects,
  certificates,
  skills,
}) => {
  // Filter projects by selection
  const selectedProjects = projects.filter(p => options.includedProjects.includes(p.id));

  // Accent Colors mapping (subtle and ATS compliant)
  const colorMap: Record<AccentColor, { primary: string; divider: string; tag: string }> = {
    slate: { primary: '#0f172a', divider: '#334155', tag: '#475569' },
    navy: { primary: '#1e3a8a', divider: '#1d4ed8', tag: '#1e40af' },
    cyan: { primary: '#0284c7', divider: '#0284c7', tag: '#0284c7' },
    cobalt: { primary: '#1d4ed8', divider: '#2563eb', tag: '#1e40af' },
    indigo: { primary: '#4338ca', divider: '#4f46e5', tag: '#4338ca' },
    teal: { primary: '#0f766e', divider: '#0d9488', tag: '#115e59' },
    emerald: { primary: '#047857', divider: '#059669', tag: '#047857' },
    rose: { primary: '#be123c', divider: '#e11d48', tag: '#9f1239' },
    ruby: { primary: '#991b1b', divider: '#b91c1c', tag: '#7f1d1d' },
    amber: { primary: '#b45309', divider: '#d97706', tag: '#92400e' },
    violet: { primary: '#6d28d9', divider: '#7c3aed', tag: '#5b21b6' },
    charcoal: { primary: '#334155', divider: '#475569', tag: '#1e293b' },
  };
  const theme = colorMap[options.accentColor] || colorMap.slate;

  // Curated ATS-Optimized Project Data
  const projectEnglishData: Record<string, {
    title: string;
    tagline: string;
    role: string;
    badge: string;
    metrics: string;
    architecture: string[];
    technologies: string[];
    bullets: string[];
  }> = {
    'mot7km-saas': {
      title: 'MOT7KM SaaS Platform',
      tagline: 'High-Throughput Multi-Tenant Restaurant ERP & Digital QR Menu Backend',
      role: 'Lead Backend Architect & .NET Engineer',
      badge: 'Enterprise SaaS',
      metrics: 'Latency: < 20ms | Availability: 99.9% | Code Stability: 0 Errors / 0 Warnings',
      architecture: ['Clean Architecture', 'Modular Monolith', 'Multi-Tenancy (IMustHaveTenant)', 'Sliding Session Rotation', 'Batch Queue Worker'],
      technologies: ['.NET 10', 'C# 13/14', 'EF Core', 'PostgreSQL', 'Supabase', 'SignalR', 'FluentValidation', 'Docker', 'MonsterASP CI/CD'],
      bullets: [
        'Architected a high-throughput multi-tenant SaaS ERP backend utilizing .NET 10, Clean Architecture, and PostgreSQL via Supabase, achieving < 20ms average response latency.',
        'Implemented a hybrid authentication engine (OAuth Google/Facebook + Phone SMS OTP) featuring sliding session token rotation with SHA-256 reuse detection and strict tenant isolation (IMustHaveTenant & IDOR prevention).',
        'Designed an asynchronous in-memory batch processing queue (IProductViewQueue) aggregating and flushing thousands of concurrent QR menu views every 5 seconds to eliminate database bottlenecks during peak hours.',
        'Built a dynamic Menu & Product Catalog Engine with hierarchical categories, customizable modifiers, allergen alert badges, and real-time instant inventory toggling.',
        'Integrated a real-time SignalR hub delivering live kitchen order counts and branch telemetry, backed by an automated CI/CD pipeline via GitHub Actions to MonsterASP.'
      ]
    },
    'studysync-lms': {
      title: 'StudySync Academic Platform',
      tagline: 'Academic Management & Automated Attendance Platform with Clean Architecture & CQRS',
      role: 'Backend Architect & .NET Engineer',
      badge: 'CQRS + MediatR',
      metrics: 'Test Coverage: 100% (49 Tests Passing) | Pattern: CQRS & MediatR | Database: PostgreSQL',
      architecture: ['Clean Architecture', 'CQRS (MediatR)', 'Domain-Driven Design (DDD)', 'Specification Pattern', 'Result Pattern'],
      technologies: ['.NET 10', 'MediatR', 'EF Core', 'PostgreSQL', 'xUnit & FluentAssertions', 'JWT Bearer', 'Swagger OpenAPI', 'RunASP CI/CD'],
      bullets: [
        'Decoupled read and write operations strictly using the CQRS pattern via MediatR with pipeline behaviors for automated validation and performance profiling.',
        'Achieved a 100% automated test pass rate across 49 unit and integration test suites using xUnit and FluentAssertions, verifying domain logic and command handlers.',
        'Engineered an automated dynamic QR-code lecture attendance verification engine utilizing time-decay cryptographic tokens to eliminate academic fraud.',
        'Designed an academic course offering and student enrollment subsystem featuring automated cumulative GPA calculation and prerequisite validation.',
        'Implemented enterprise-grade centralized error and exception handling utilizing RFC 7807 ProblemDetails and FluentValidation pipeline integration.'
      ]
    }
  };

  return (
    <div
      id="cv-sheet"
      dir="ltr"
      className="bg-white text-slate-900 w-full max-w-[210mm] min-h-[297mm] p-8 sm:p-12 shadow-2xl rounded-none mx-auto font-sans text-left selection:bg-cyan-100"
      style={{
        boxSizing: 'border-box',
        lineHeight: 1.45,
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
      }}
    >
      {/* ==================== 1. ATS CONTACT HEADER ==================== */}
      <header className="text-center pb-4 mb-4 border-b-2 border-slate-900">
        <h1
          contentEditable={options.isEditable}
          suppressContentEditableWarning
          className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-wider mb-1"
        >
          {profile.name === 'Software Engineer' ? 'Amr Atef' : profile.name}
        </h1>

        <p
          contentEditable={options.isEditable}
          suppressContentEditableWarning
          style={{ color: theme.primary }}
          className="text-sm font-bold font-mono tracking-widest uppercase mb-2.5"
        >
          {profile.title || 'Senior .NET & Backend Architect'}
        </p>

        {/* ATS Standard Single-Line Contact Information */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-700 font-medium">
          <span>{profile.location || 'Ismailia, Egypt'}</span>
          <span>•</span>
          <a href={`mailto:${profile.email}`} className="text-slate-900 hover:underline">{profile.email}</a>
          <span>•</span>
          <span>WhatsApp: {profile.phone || 'amratefkandel'}</span>
          <span>•</span>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-slate-900 hover:underline">
            linkedin.com/in/amratef
          </a>
          <span>•</span>
          <a href="https://github.com/amratef" target="_blank" rel="noreferrer" className="text-slate-900 hover:underline">
            github.com/amratef
          </a>
        </div>
      </header>

      {/* ==================== 2. PROFESSIONAL SUMMARY ==================== */}
      <section className="mb-4 avoid-break">
        <h2 className="text-xs font-bold font-mono tracking-widest uppercase text-slate-950 border-b border-slate-300 pb-1 mb-2">
          Professional Summary
        </h2>
        <p
          contentEditable={options.isEditable}
          suppressContentEditableWarning
          className="text-[11.5px] text-slate-800 leading-relaxed text-justify"
        >
          Results-driven Senior Backend Engineer and Systems Architect specialized in designing and building high-performance enterprise systems, Clean Architecture, and Domain-Driven Design (DDD). Proven track record engineering scalable multi-tenant SaaS platforms with .NET 10, CQRS with MediatR, PostgreSQL, and distributed caching with Redis. Adept at achieving sub-20ms latency benchmarks, implementing rigorous security models, and maintaining 100% automated test coverage.
        </p>
      </section>

      {/* ==================== 3. TECHNICAL SKILLS ==================== */}
      <section className="mb-4 avoid-break">
        <h2 className="text-xs font-bold font-mono tracking-widest uppercase text-slate-950 border-b border-slate-300 pb-1 mb-2">
          Technical Skills & Core Competencies
        </h2>

        <div className="space-y-1.5 text-[11px] text-slate-800">
          <div className="flex items-baseline">
            <span className="font-bold text-slate-950 font-mono w-44 shrink-0">Backend & Frameworks:</span>
            <span>.NET 10, .NET 8, C# 13/14, ASP.NET Core Web API, Entity Framework Core, MediatR, SignalR Core</span>
          </div>

          <div className="flex items-baseline">
            <span className="font-bold text-slate-950 font-mono w-44 shrink-0">Architecture & Patterns:</span>
            <span>Clean Architecture, CQRS, Domain-Driven Design (DDD), Multi-Tenancy Architecture, GoF Design Patterns, Specification Pattern</span>
          </div>

          <div className="flex items-baseline">
            <span className="font-bold text-slate-950 font-mono w-44 shrink-0">Databases & Caching:</span>
            <span>PostgreSQL, Supabase, Microsoft SQL Server (T-SQL), Redis Distributed Cache, Query Optimization, Indexing</span>
          </div>

          <div className="flex items-baseline">
            <span className="font-bold text-slate-950 font-mono w-44 shrink-0">Testing & DevOps:</span>
            <span>xUnit, FluentAssertions, Automated Integration Testing, Docker, GitHub Actions (CI/CD), IIS Hosting (MonsterASP/RunASP), Git</span>
          </div>
        </div>
      </section>

      {/* ==================== 4. FLAGSHIP ENTERPRISE PROJECTS ==================== */}
      <section className="mb-4">
        <h2 className="text-xs font-bold font-mono tracking-widest uppercase text-slate-950 border-b border-slate-300 pb-1 mb-2.5">
          Flagship Enterprise Projects & Experience
        </h2>

        <div className="space-y-4">
          {selectedProjects.map((p) => {
            const data = projectEnglishData[p.id] || {
              title: p.title,
              tagline: p.tagline,
              role: 'Backend Architect & .NET Engineer',
              badge: p.badge,
              metrics: 'Status: Production Ready',
              architecture: p.architecture,
              technologies: p.technologies,
              bullets: p.features
            };

            return (
              <div key={p.id} className="avoid-break">
                {/* Title and Role Line */}
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <h3
                      contentEditable={options.isEditable}
                      suppressContentEditableWarning
                      className="text-xs font-bold text-slate-950 font-mono"
                    >
                      {data.title}
                    </h3>
                    <span className="text-[11px] text-slate-400 font-mono">|</span>
                    <span
                      contentEditable={options.isEditable}
                      suppressContentEditableWarning
                      className="text-[11px] text-slate-700 font-semibold"
                    >
                      {data.role}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-slate-600 font-bold uppercase">
                    {data.badge}
                  </span>
                </div>

                {/* Subtitle / System Summary */}
                <p
                  contentEditable={options.isEditable}
                  suppressContentEditableWarning
                  className="text-[11px] text-slate-600 italic mt-0.5"
                >
                  {data.tagline} &bull; <span className="font-mono not-italic font-semibold text-slate-800">{data.metrics}</span>
                </p>

                {/* ATS Bullet Points */}
                <ul className="list-disc list-outside text-[11px] text-slate-800 space-y-1 mt-1.5 pl-4 leading-relaxed">
                  {data.bullets.map((bullet, bIdx) => (
                    <li
                      key={bIdx}
                      contentEditable={options.isEditable}
                      suppressContentEditableWarning
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Technologies List */}
                <p className="text-[10.5px] font-mono text-slate-600 mt-1 pl-4">
                  <strong className="text-slate-950 font-semibold">Technologies: </strong>
                  {data.technologies.join(', ')}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==================== 5. EDUCATION & ACCREDITATIONS ==================== */}
      <section className="mb-2 avoid-break">
        <h2 className="text-xs font-bold font-mono tracking-widest uppercase text-slate-950 border-b border-slate-300 pb-1 mb-2">
          Education & Accredited Credentials
        </h2>

        <div className="space-y-2 text-slate-800">
          {/* ITI Diploma */}
          <div className="flex items-start justify-between text-[11px]">
            <div>
              <h3 className="font-bold text-slate-950">
                Information Technology Institute (ITI) — Ministry of Communications & IT (MCIT)
              </h3>
              <p className="text-slate-700">
                Professional Diploma in Enterprise Software Engineering & Modern .NET Ecosystem
              </p>
            </div>
            <span className="font-mono text-slate-700 font-bold shrink-0">2024</span>
          </div>

          {/* C# Certificate */}
          <div className="flex items-start justify-between text-[11px]">
            <div>
              <h3 className="font-bold text-slate-950">
                Advanced C# & .NET Engineering Certificate
              </h3>
              <p className="text-slate-700">
                Accredited Certification in Clean Code, Advanced Asynchronous Systems & Performance Tuning
              </p>
            </div>
            <span className="font-mono text-slate-700 font-bold shrink-0">2024</span>
          </div>
        </div>
      </section>
    </div>
  );
};
