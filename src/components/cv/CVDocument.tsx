import React from 'react';
import { ProfileInfo, Project, Certificate, SkillCategory, Experience } from '../../types';

export type AccentColor =
  | 'monochrome'
  | 'slate'
  | 'charcoal'
  | 'burntOrange'
  | 'navy'
  | 'cyan'
  | 'cobalt'
  | 'indigo'
  | 'teal'
  | 'emerald'
  | 'rose'
  | 'ruby'
  | 'amber'
  | 'violet';

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
  experiences?: Experience[];
}

export const CVDocument: React.FC<CVDocumentProps> = ({
  options,
  profile,
  projects,
  certificates,
  skills,
  experiences = [],
}) => {
  // Filter projects by user selection
  const selectedProjects = projects.filter(p => 
    options.includedProjects.length === 0 || options.includedProjects.includes(p.id)
  );

  // Accent Colors mapping (subtle and ATS compliant)
  const colorMap: Record<AccentColor, { primary: string; divider: string; tag: string }> = {
    monochrome: { primary: '#0f172a', divider: '#0f172a', tag: '#1e293b' },
    slate: { primary: '#0f172a', divider: '#0f172a', tag: '#1e293b' },
    charcoal: { primary: '#334155', divider: '#475569', tag: '#1e293b' },
    burntOrange: { primary: '#FF5722', divider: '#FF7A00', tag: '#E64A19' },
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
  };
  const theme = colorMap[options.accentColor] || colorMap.monochrome;

  // Fallback skills list if none configured
  const defaultSkillCategories = [
    {
      name: 'Programming Languages',
      skills: 'C#, SQL'
    },
    {
      name: 'Backend Development',
      skills: '.NET 10, ASP.NET Core Web API, RESTful API Development, Entity Framework Core, Dependency Injection, Middleware, Background Services'
    },
    {
      name: 'Architecture & Design',
      skills: 'Clean Architecture, Modular Monolith, CQRS, DTOs, Manual Mapping, Separation of Concerns'
    },
    {
      name: 'Databases & ORM',
      skills: 'Microsoft SQL Server, PostgreSQL, Supabase, Entity Framework Core, Database Migrations, Relational Database Design'
    },
    {
      name: 'Authentication & Security',
      skills: 'JWT Authentication, OAuth 2.0, Phone OTP Authentication, Refresh Token Rotation, SHA-256 Hashing, Multi-Tenant Authorization, Ownership Authorization, IDOR Prevention'
    },
    {
      name: 'Real-Time & Performance',
      skills: 'SignalR, Background Processing, Batch Processing, Asynchronous Programming'
    },
    {
      name: 'Validation & Tools',
      skills: 'FluentValidation, Swagger / OpenAPI, Postman, Git, GitHub, GitHub Actions, CI/CD, IIS'
    }
  ];

  return (
    <div
      id="cv-sheet"
      dir="ltr"
      className="bg-white text-slate-900 w-full max-w-[210mm] min-h-[297mm] p-8 sm:p-11 shadow-2xl rounded-none mx-auto font-sans text-left selection:bg-slate-200"
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
          {profile.name || 'Amr Atef Imam Mahmoud'}
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
          <a href={`mailto:${profile.email}`} className="text-slate-900 hover:underline">{profile.email || 'amratefkandel@gmail.com'}</a>
          <span>•</span>
          <span>WhatsApp: @amratefkandel</span>
          {profile.linkedin && (
            <>
              <span>•</span>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-slate-900 hover:underline">
                {profile.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            </>
          )}
          {profile.github && (
            <>
              <span>•</span>
              <a href={profile.github} target="_blank" rel="noreferrer" className="text-slate-900 hover:underline">
                {profile.github.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            </>
          )}
        </div>
      </header>

      {/* ==================== 2. PROFESSIONAL SUMMARY ==================== */}
      <section className="mb-3.5 avoid-break">
        <h2 className="text-xs font-bold font-mono tracking-widest uppercase text-slate-950 border-b border-slate-800 pb-0.5 mb-1.5">
          Professional Summary
        </h2>
        <p
          contentEditable={options.isEditable}
          suppressContentEditableWarning
          className="text-[11.5px] text-slate-800 leading-relaxed text-justify"
        >
          {profile.bio || 
            "Computer Science student and .NET Backend Developer with hands-on experience designing and developing scalable backend systems using C# and ASP.NET Core. Experienced in building RESTful APIs, implementing Clean Architecture and CQRS patterns, designing relational databases, and developing secure authentication and authorization mechanisms. Practical experience in multi-tenant SaaS applications, JWT authentication, OAuth 2.0, refresh token rotation, real-time communication using SignalR, and background processing. Collaborates with cross-functional teams, owning backend development and API integration with mobile and frontend applications. Interested in software architecture, backend security, database optimization, and maintainable software systems."}
        </p>
      </section>

      {/* ==================== 3. TECHNICAL SKILLS ==================== */}
      <section className="mb-3.5 avoid-break">
        <h2 className="text-xs font-bold font-mono tracking-widest uppercase text-slate-950 border-b border-slate-800 pb-0.5 mb-1.5">
          Technical Skills
        </h2>

        <div className="space-y-1 text-[11px] text-slate-800">
          {skills && skills.length > 0 ? (
            skills.map((category, idx) => (
              <div key={idx} className="flex items-baseline">
                <span className="font-bold text-slate-950 font-mono w-48 shrink-0">• {category.name}:</span>
                <span contentEditable={options.isEditable} suppressContentEditableWarning>
                  {category.skills.map(s => s.name).join(', ')}
                </span>
              </div>
            ))
          ) : (
            defaultSkillCategories.map((cat, idx) => (
              <div key={idx} className="flex items-baseline">
                <span className="font-bold text-slate-950 font-mono w-48 shrink-0">• {cat.name}:</span>
                <span contentEditable={options.isEditable} suppressContentEditableWarning>
                  {cat.skills}
                </span>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ==================== 4. PROFESSIONAL WORK EXPERIENCE ==================== */}
      {experiences && experiences.length > 0 && (
        <section className="mb-3.5 avoid-break">
          <h2 className="text-xs font-bold font-mono tracking-widest uppercase text-slate-950 border-b border-slate-800 pb-0.5 mb-2">
            Professional Work Experience
          </h2>

          <div className="space-y-3.5">
            {experiences.map((exp) => (
              <div key={exp.id} className="avoid-break">
                {/* Title and Role Line */}
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <h3
                      contentEditable={options.isEditable}
                      suppressContentEditableWarning
                      className="text-xs font-bold text-slate-950 font-mono"
                    >
                      {exp.company}
                    </h3>
                    <span className="text-[11px] text-slate-400 font-mono">|</span>
                    <span
                      contentEditable={options.isEditable}
                      suppressContentEditableWarning
                      className="text-[11px] text-slate-700 font-semibold"
                    >
                      {exp.role}
                    </span>
                  </div>
                  <span className="text-[10.5px] font-mono text-slate-600 font-semibold shrink-0">
                    {exp.period} {exp.location ? `| ${exp.location}` : ''}
                  </span>
                </div>

                {/* Technologies */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <p className="text-[10.5px] font-mono text-slate-700 mt-0.5">
                    <strong className="text-slate-950 font-semibold">Technologies: </strong>
                    <span contentEditable={options.isEditable} suppressContentEditableWarning>
                      {exp.technologies.join(', ')}
                    </span>
                  </p>
                )}

                {/* Subtitle Summary */}
                {exp.summary && (
                  <p
                    contentEditable={options.isEditable}
                    suppressContentEditableWarning
                    className="text-[11px] text-slate-800 italic mt-0.5"
                  >
                    {exp.summary}
                  </p>
                )}

                {/* ATS Bullet Points */}
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul className="list-disc list-outside text-[11px] text-slate-800 space-y-0.5 mt-1 pl-4 leading-relaxed">
                    {exp.responsibilities.map((bullet, idx) => (
                      <li key={idx} contentEditable={options.isEditable} suppressContentEditableWarning>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ==================== 5. KEY TECHNICAL PROJECTS ==================== */}
      {selectedProjects && selectedProjects.length > 0 && (
        <section className="mb-3.5">
          <h2 className="text-xs font-bold font-mono tracking-widest uppercase text-slate-950 border-b border-slate-800 pb-0.5 mb-2">
            Key Technical Projects
          </h2>

          <div className="space-y-3.5">
            {selectedProjects.map((p) => (
              <div key={p.id} className="avoid-break">
                {/* Title and Role Line */}
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <h3
                      contentEditable={options.isEditable}
                      suppressContentEditableWarning
                      className="text-xs font-bold text-slate-950 font-mono"
                    >
                      {p.title}
                    </h3>
                    <span className="text-[11px] text-slate-400 font-mono">|</span>
                    <span
                      contentEditable={options.isEditable}
                      suppressContentEditableWarning
                      className="text-[11px] text-slate-700 font-semibold"
                    >
                      {p.category || 'Software Project'}
                    </span>
                  </div>
                  {p.badge && (
                    <span className="text-[10.5px] font-mono text-slate-600 font-semibold shrink-0">
                      {p.badge}
                    </span>
                  )}
                </div>

                {/* Technologies */}
                {p.technologies && p.technologies.length > 0 && (
                  <p className="text-[10.5px] font-mono text-slate-700 mt-0.5">
                    <strong className="text-slate-950 font-semibold">Technologies: </strong>
                    <span contentEditable={options.isEditable} suppressContentEditableWarning>
                      {p.technologies.join(', ')}
                    </span>
                  </p>
                )}

                {/* Subtitle Summary */}
                {p.description && (
                  <p
                    contentEditable={options.isEditable}
                    suppressContentEditableWarning
                    className="text-[11px] text-slate-800 italic mt-0.5"
                  >
                    {p.description}
                  </p>
                )}

                {/* ATS Bullet Points */}
                {p.features && p.features.length > 0 && (
                  <ul className="list-disc list-outside text-[11px] text-slate-800 space-y-0.5 mt-1 pl-4 leading-relaxed">
                    {p.features.map((feature, fIdx) => (
                      <li
                        key={fIdx}
                        contentEditable={options.isEditable}
                        suppressContentEditableWarning
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ==================== TEAMWORK & COLLABORATION ==================== */}
      <section className="mb-3.5 avoid-break">
        <h2 className="text-xs font-bold font-mono tracking-widest uppercase text-slate-950 border-b border-slate-800 pb-0.5 mb-1.5">
          Teamwork & Collaboration
        </h2>
        <ul className="list-disc list-outside text-[11px] text-slate-800 space-y-0.5 mt-1 pl-4 leading-relaxed">
          <li contentEditable={options.isEditable} suppressContentEditableWarning>Worked in development teams of Backend, Mobile, and Frontend developers.</li>
          <li contentEditable={options.isEditable} suppressContentEditableWarning>Took responsibility for backend architecture, API development, and database integration.</li>
          <li contentEditable={options.isEditable} suppressContentEditableWarning>Collaborated with Mobile and Frontend developers to integrate backend services.</li>
          <li contentEditable={options.isEditable} suppressContentEditableWarning>Participated in technical discussions and implementation decisions.</li>
        </ul>
      </section>

      {/* ==================== 6. CERTIFICATES & ACCREDITATIONS ==================== */}
      {certificates && certificates.length > 0 && (
        <section className="mb-3.5 avoid-break">
          <h2 className="text-xs font-bold font-mono tracking-widest uppercase text-slate-950 border-b border-slate-800 pb-0.5 mb-1.5">
            Certifications & Accreditations
          </h2>
          <div className="space-y-1 text-[11px] text-slate-800">
            {certificates.map((cert) => (
              <div key={cert.id} className="flex items-baseline justify-between">
                <div>
                  <span className="font-bold text-slate-950">• {cert.title}</span>
                  {cert.issuer && <span className="text-slate-600"> – {cert.issuer}</span>}
                </div>
                {cert.date && (
                  <span className="font-mono text-slate-600 text-[10.5px] shrink-0">
                    {cert.date}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ==================== 7. EDUCATION ==================== */}
      <section className="mb-3.5 avoid-break">
        <h2 className="text-xs font-bold font-mono tracking-widest uppercase text-slate-950 border-b border-slate-800 pb-0.5 mb-1.5">
          Education
        </h2>

        <div className="text-[11px] text-slate-800">
          <div className="flex items-start justify-between">
            <div>
              <h3 
                contentEditable={options.isEditable}
                suppressContentEditableWarning
                className="font-bold text-slate-950"
              >
                {(profile as any).university || 'Suez Canal University – Faculty of Science'}
              </h3>
              <p 
                contentEditable={options.isEditable}
                suppressContentEditableWarning
                className="text-slate-700"
              >
                {(profile as any).degree || 'Bachelor of Science (B.Sc.) in Mathematics – Computer Science Program | Fourth Year Student (In Progress)'}
              </p>
            </div>
            <span className="font-mono text-slate-700 font-bold shrink-0">In Progress</span>
          </div>
        </div>
      </section>

      {/* ==================== 8. LANGUAGES ==================== */}
      <section className="avoid-break">
        <h2 className="text-xs font-bold font-mono tracking-widest uppercase text-slate-950 border-b border-slate-800 pb-0.5 mb-1.5">
          Languages
        </h2>
        <p 
          contentEditable={options.isEditable}
          suppressContentEditableWarning
          className="text-[11px] text-slate-800"
        >
          {(profile as any).languages || 'Arabic: Native • English: Intermediate'}
        </p>
      </section>
    </div>
  );
};
