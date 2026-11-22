import React from 'react';
import { ProfileInfo, Project, Certificate, SkillCategory } from '../../types';

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

  // Curated ATS-Optimized Project Data directly from User CV
  const projectEnglishData: Record<string, {
    title: string;
    role: string;
    technologies: string[];
    summary: string;
    bullets: string[];
  }> = {
    'mot7km-saas': {
      title: 'Multi-Tenant SaaS ERP & Digital Menu Platform',
      role: 'Backend Developer',
      technologies: ['C#', '.NET 10', 'ASP.NET Core', 'PostgreSQL', 'Entity Framework Core', 'Supabase', 'SignalR', 'GitHub Actions', 'IIS'],
      summary: 'Developed the backend of a multi-tenant SaaS platform for restaurants, cafés, and businesses to manage their digital presence and operations.',
      bullets: [
        'Designed and implemented Clean Architecture with a Modular Monolith approach.',
        'Developed RESTful APIs for business profiles, branches, menus, categories, products, and promotional campaigns.',
        'Implemented multi-tenancy and tenant isolation to ensure secure separation of business data.',
        'Developed authentication mechanisms supporting JWT, OAuth, and phone OTP.',
        'Implemented secure session management using refresh token rotation, sliding expiration, and token reuse detection.',
        'Applied SHA-256 hashing for refresh token storage.',
        'Developed administrative dashboard APIs with business analytics and performance insights.',
        'Integrated SignalR for real-time dashboard updates.',
        'Implemented background batch processing for product view tracking to optimize database operations.',
        'Configured automated deployment workflows using GitHub Actions and IIS.'
      ]
    },
    'studysync-lms': {
      title: 'Academic Management System',
      role: 'Backend Developer',
      technologies: ['C#', '.NET 10', 'ASP.NET Core', 'PostgreSQL', 'Entity Framework Core', 'Clean Architecture', 'CQRS'],
      summary: 'Developed the backend of an academic management system to organize educational operations through a scalable and maintainable architecture.',
      bullets: [
        'Applied Clean Architecture to separate Domain, Application, Infrastructure, and Presentation layers.',
        'Implemented CQRS to organize application commands and queries.',
        'Developed authentication and session management functionality.',
        'Implemented course management features and structured error-handling mechanisms.',
        'Supported separate application portals for different user roles.',
        'Contributed to automated testing and application reliability, achieving 49 passing automated tests with a 100% pass rate.'
      ]
    }
  };

  return (
    <div
      id="cv-sheet"
      dir="ltr"
      className="bg-white text-slate-900 w-full max-w-[210mm] min-h-[297mm] p-8 sm:p-11 shadow-2xl rounded-none mx-auto font-sans text-left selection:bg-cyan-100"
      style={{
        boxSizing: 'border-box',
        lineHeight: 1.45,
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
      }}
    >
      {/* ==================== 1. ATS CONTACT HEADER ==================== */}
      <header className="text-center pb-3.5 mb-3.5 border-b-2 border-slate-900">
        <h1
          contentEditable={options.isEditable}
          suppressContentEditableWarning
          className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-wider mb-1"
        >
          {profile.name || 'Amr Atef Imam Kandel'}
        </h1>

        <p
          contentEditable={options.isEditable}
          suppressContentEditableWarning
          style={{ color: theme.primary }}
          className="text-sm font-bold font-mono tracking-widest uppercase mb-1"
        >
          {options.roleTitle || profile.title || '.NET Backend Developer'}
        </p>

        <p className="text-[11.5px] font-mono text-slate-600 mb-2 font-medium">
          C# | ASP.NET Core | SQL Server | PostgreSQL
        </p>

        {/* ATS Standard Single-Line Contact Information */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-700 font-medium">
          <span>{profile.location || 'Ismailia, Egypt'}</span>
          <span>•</span>
          <a href={`mailto:${profile.email}`} className="text-slate-900 hover:underline">{profile.email}</a>
          <span>•</span>
          <span>WhatsApp: {profile.phone || '@amratefkandel'}</span>
          <span>•</span>
          <a href="https://linkedin.com/in/amr-atef-kandel" target="_blank" rel="noreferrer" className="text-slate-900 hover:underline">
            linkedin.com/in/amr-atef-kandel
          </a>
          <span>•</span>
          <a href="https://github.com/amratef2005" target="_blank" rel="noreferrer" className="text-slate-900 hover:underline">
            github.com/amratef2005
          </a>
        </div>
      </header>

      {/* ==================== 2. PROFESSIONAL SUMMARY ==================== */}
      <section className="mb-3.5 avoid-break">
        <h2 className="text-xs font-bold font-mono tracking-widest uppercase text-slate-950 border-b border-slate-300 pb-0.5 mb-1.5">
          Professional Summary
        </h2>
        <p
          contentEditable={options.isEditable}
          suppressContentEditableWarning
          className="text-[11.5px] text-slate-800 leading-relaxed text-justify"
        >
          Computer Science student and .NET Backend Developer with hands-on experience designing and developing scalable backend systems using C# and ASP.NET Core. Experienced in building RESTful APIs, implementing Clean Architecture and CQRS patterns, designing relational databases, and developing secure authentication and authorization mechanisms. Practical experience in multi-tenant SaaS applications, JWT authentication, OAuth 2.0, refresh token rotation, real-time communication using SignalR, and background processing. Collaborates with cross-functional teams, owning backend development and API integration with mobile and frontend applications. Interested in software architecture, backend security, database optimization, and maintainable software systems.
        </p>
      </section>

      {/* ==================== 3. TECHNICAL SKILLS ==================== */}
      <section className="mb-3.5 avoid-break">
        <h2 className="text-xs font-bold font-mono tracking-widest uppercase text-slate-950 border-b border-slate-300 pb-0.5 mb-1.5">
          Technical Skills
        </h2>

        <div className="space-y-1 text-[11px] text-slate-800">
          <div className="flex items-baseline">
            <span className="font-bold text-slate-950 font-mono w-48 shrink-0">• Programming Languages:</span>
            <span>C#, SQL</span>
          </div>

          <div className="flex items-baseline">
            <span className="font-bold text-slate-950 font-mono w-48 shrink-0">• Backend Development:</span>
            <span>.NET 10, ASP.NET Core Web API, RESTful API Development, Entity Framework Core, Dependency Injection, Middleware, Background Services</span>
          </div>

          <div className="flex items-baseline">
            <span className="font-bold text-slate-950 font-mono w-48 shrink-0">• Architecture & Design:</span>
            <span>Clean Architecture, Modular Monolith, CQRS, DTOs, Manual Mapping, Separation of Concerns</span>
          </div>

          <div className="flex items-baseline">
            <span className="font-bold text-slate-950 font-mono w-48 shrink-0">• Databases & ORM:</span>
            <span>Microsoft SQL Server, PostgreSQL, Supabase, Entity Framework Core, Database Migrations, Relational Database Design</span>
          </div>

          <div className="flex items-baseline">
            <span className="font-bold text-slate-950 font-mono w-48 shrink-0">• Authentication & Security:</span>
            <span>JWT Authentication, OAuth 2.0, Phone OTP Authentication, Refresh Token Rotation, SHA-256 Hashing, Multi-Tenant Authorization, Ownership Authorization, IDOR Prevention</span>
          </div>

          <div className="flex items-baseline">
            <span className="font-bold text-slate-950 font-mono w-48 shrink-0">• Real-Time & Performance:</span>
            <span>SignalR, Background Processing, Batch Processing, Asynchronous Programming</span>
          </div>

          <div className="flex items-baseline">
            <span className="font-bold text-slate-950 font-mono w-48 shrink-0">• Validation & Documentation:</span>
            <span>FluentValidation, Swagger / OpenAPI, Postman</span>
          </div>

          <div className="flex items-baseline">
            <span className="font-bold text-slate-950 font-mono w-48 shrink-0">• DevOps & Tools:</span>
            <span>Git, GitHub, GitHub Actions, CI/CD, IIS Deployment</span>
          </div>
        </div>
      </section>

      {/* ==================== 4. PROJECT EXPERIENCE ==================== */}
      <section className="mb-3.5">
        <h2 className="text-xs font-bold font-mono tracking-widest uppercase text-slate-950 border-b border-slate-300 pb-0.5 mb-2">
          Project Experience
        </h2>

        <div className="space-y-3.5">
          {selectedProjects.map((p) => {
            const data = projectEnglishData[p.id] || {
              title: p.title,
              role: 'Backend Developer',
              technologies: p.technologies,
              summary: p.description,
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
                </div>

                {/* Technologies */}
                <p className="text-[10.5px] font-mono text-slate-700 mt-0.5">
                  <strong className="text-slate-950 font-semibold">Technologies: </strong>
                  {data.technologies.join(', ')}
                </p>

                {/* Subtitle Summary */}
                <p
                  contentEditable={options.isEditable}
                  suppressContentEditableWarning
                  className="text-[11px] text-slate-800 italic mt-0.5"
                >
                  {data.summary}
                </p>

                {/* ATS Bullet Points */}
                <ul className="list-disc list-outside text-[11px] text-slate-800 space-y-0.5 mt-1 pl-4 leading-relaxed">
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
              </div>
            );
          })}
        </div>
      </section>

      {/* ==================== 5. TEAMWORK & COLLABORATION ==================== */}
      <section className="mb-3.5 avoid-break">
        <h2 className="text-xs font-bold font-mono tracking-widest uppercase text-slate-950 border-b border-slate-300 pb-0.5 mb-1.5">
          Teamwork & Collaboration
        </h2>
        <ul className="list-disc list-outside text-[11px] text-slate-800 space-y-0.5 pl-4 leading-relaxed">
          <li>Worked in development teams of Backend, Mobile, and Frontend developers.</li>
          <li>Took responsibility for backend architecture, API development, and database integration.</li>
          <li>Collaborated with Mobile and Frontend developers to integrate backend services.</li>
          <li>Participated in technical discussions and implementation decisions.</li>
        </ul>
      </section>

      {/* ==================== 6. EDUCATION ==================== */}
      <section className="mb-3.5 avoid-break">
        <h2 className="text-xs font-bold font-mono tracking-widest uppercase text-slate-950 border-b border-slate-300 pb-0.5 mb-1.5">
          Education
        </h2>

        <div className="text-[11px] text-slate-800">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-slate-950">
                Suez Canal University – Faculty of Science
              </h3>
              <p className="text-slate-700">
                Bachelor of Science (B.Sc.) in Mathematics – Computer Science Program | Fourth Year Student (In Progress)
              </p>
            </div>
            <span className="font-mono text-slate-700 font-bold shrink-0">In Progress</span>
          </div>
        </div>
      </section>

      {/* ==================== 7. LANGUAGES ==================== */}
      <section className="avoid-break">
        <h2 className="text-xs font-bold font-mono tracking-widest uppercase text-slate-950 border-b border-slate-300 pb-0.5 mb-1.5">
          Languages
        </h2>
        <p className="text-[11px] text-slate-800">
          <strong>Arabic:</strong> Native &bull; <strong>English:</strong> Intermediate
        </p>
      </section>
    </div>
  );
};
