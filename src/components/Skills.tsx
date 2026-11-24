import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Cpu, 
  Server, 
  Database, 
  ShieldCheck, 
  Zap, 
  Code2, 
  Layers, 
  FileCheck, 
  Cloud,
  Terminal,
  Lock,
  GitBranch
} from 'lucide-react';
import { AssembleItem } from './motion/KineticAssemble';

export const Skills: React.FC = () => {
  const { skills, profile, lang } = usePortfolio();

  // Top core competencies with percentages
  const displaySkills = [
    { name: "C# & .NET 10", level: 95 },
    { name: "ASP.NET Core Web API", level: 95 },
    { name: "Clean Architecture & CQRS", level: 95 },
    { name: "PostgreSQL & SQL Server", level: 92 },
    { name: "JWT & Refresh Token Security", level: 94 },
    { name: "Entity Framework Core", level: 92 },
    { name: "SignalR & Real-Time", level: 90 },
    { name: "GitHub Actions & CI/CD", level: 90 }
  ];

  // The 8 Core Backend Architectural Domains from the user's CV
  const backendDomains = [
    {
      icon: <Code2 className="w-6 h-6 text-[#FF5722]" />,
      titleAr: "لغات البرمجة",
      titleEn: "Programming Languages",
      skillsAr: "C#, SQL",
      skillsEn: "C#, SQL",
      descAr: "كتابة كود C# متقن وعالي الأداء، واستعلامات SQL علائقية محسنة.",
      descEn: "Clean, robust C# engineering and optimized relational SQL queries."
    },
    {
      icon: <Server className="w-6 h-6 text-[#FF7A00]" />,
      titleAr: "تطوير النظم الخلفية",
      titleEn: "Backend Development",
      skillsAr: ".NET 10, ASP.NET Core, EF Core, RESTful APIs, DI, Middleware, Background Services",
      skillsEn: ".NET 10, ASP.NET Core Web API, RESTful APIs, EF Core, DI, Middleware, Background Services",
      descAr: "بناء واجهات برمجية RESTful قابلة للتوسع، وإدارة مسار معالجة الطلبات والخدمات الخلفية.",
      descEn: "Scalable RESTful API architecture, pipeline middleware, and asynchronous background workers."
    },
    {
      icon: <Layers className="w-6 h-6 text-[#FF5722]" />,
      titleAr: "المعمارية وتصميم الأنظمة",
      titleEn: "Architecture & Design",
      skillsAr: "Clean Architecture, Modular Monolith, CQRS, DTOs, Manual Mapping",
      skillsEn: "Clean Architecture, Modular Monolith, CQRS, DTOs, Manual Mapping, Separation of Concerns",
      descAr: "فصل طبقات المجال والتطبيق، تطبيق نمط CQRS، وتحويل البيانات عالي الكفاءة.",
      descEn: "Strict Domain separation, CQRS command/query segregation, and high-performance mapping."
    },
    {
      icon: <Database className="w-6 h-6 text-[#FF7A00]" />,
      titleAr: "قواعد البيانات وإدارة البيانات",
      titleEn: "Databases & ORM",
      skillsAr: "PostgreSQL, SQL Server, Supabase, EF Core, Database Migrations",
      skillsEn: "Microsoft SQL Server, PostgreSQL, Supabase, EF Core, Relational Schema Design",
      descAr: "تصميم مخططات قواعد البيانات العلائقية، إدارة الهجرة والترقيات، والتحسين الفائق للاستعلامات.",
      descEn: "Relational schema design, schema migrations, and optimized EF Core query execution."
    },
    {
      icon: <Lock className="w-6 h-6 text-[#FF5722]" />,
      titleAr: "المصادقة وأمان الأنظمة",
      titleEn: "Authentication & Security",
      skillsAr: "JWT, OAuth 2.0, Phone OTP, Refresh Token Rotation (SHA-256), Tenant Isolation, IDOR Prevention",
      skillsEn: "JWT, OAuth 2.0, Phone OTP, Refresh Token Rotation, SHA-256 Hashing, IDOR Prevention",
      descAr: "إدارة جلسات فائقة الأمان، تدوير التوكنات بتشفير SHA-256، وحماية صارمة ضد ثغرات IDOR.",
      descEn: "Secure session lifecycle, SHA-256 refresh token rotation, and multi-tenant IDOR protection."
    },
    {
      icon: <Zap className="w-6 h-6 text-[#FF7A00]" />,
      titleAr: "الاتصال اللحظي ومعالجة الدفعات",
      titleEn: "Real-Time & Performance",
      skillsAr: "SignalR (WebSockets), Background Processing, Batch Processing, Async Programming",
      skillsEn: "SignalR (WebSockets), Background Processing, Batch Processing, Asynchronous Programming",
      descAr: "تحديثات لحظية فورية عبر SignalR، معالجة الدفعات في الخلفية، وتزامن فائق السرعة.",
      descEn: "Real-time bi-directional SignalR communication, batch processing, and high-concurrency async code."
    },
    {
      icon: <FileCheck className="w-6 h-6 text-[#FF5722]" />,
      titleAr: "التحقق والتوثيق البرمجي",
      titleEn: "Validation & Documentation",
      skillsAr: "FluentValidation, Swagger / OpenAPI, Postman",
      skillsEn: "FluentValidation, Swagger / OpenAPI, Postman",
      descAr: "التحقق من صحة المدخلات بنمط نظيف وتوثيق واجهات الـ APIs بدقة تفاعلية.",
      descEn: "Declarative request validation with FluentValidation and interactive Swagger / OpenAPI contracts."
    },
    {
      icon: <GitBranch className="w-6 h-6 text-[#FF7A00]" />,
      titleAr: "أدوات التطوير والأتمتة",
      titleEn: "DevOps & Tools",
      skillsAr: "Git, GitHub, GitHub Actions (CI/CD), IIS Deployment",
      skillsEn: "Git, GitHub, GitHub Actions, CI/CD, IIS Deployment",
      descAr: "إدارة النسخ عبر Git، أتمتة خطوط البناء والاختبار والنشر (CI/CD)، والاستضافة عبر IIS.",
      descEn: "Automated CI/CD build & test workflows using GitHub Actions and production hosting on IIS."
    }
  ];

  return (
    <section id="skills" className="py-8 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Ambient Radial Lighting */}
      <div 
        className="absolute top-1/4 -left-20 w-[450px] h-[450px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255, 87, 34, 0.12) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <AssembleItem direction="top">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121215] border border-orange-500/20 text-[#FF7A00] text-xs font-mono mb-3">
              <Cpu className="w-3.5 h-3.5 text-[#FF5722]" />
              <span>{lang === 'ar' ? 'القدرات والمهارات التقنية' : 'Technical Skills & Capabilities'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.2]">
              {lang === 'ar' ? (
                <>
                  كفاءات معمارية وهندسية <span className="text-[#FF5722] drop-shadow-[0_0_20px_rgba(255,87,34,0.4)]">بأعلى معايير الأداء</span>
                </>
              ) : (
                <>
                  Backend Engineering & Architecture <span className="text-[#FF5722] drop-shadow-[0_0_20px_rgba(255,87,34,0.4)]">Core Competencies</span>
                </>
              )}
            </h2>
            <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
              {lang === 'ar'
                ? 'منظومة متكاملة من التقنيات والأنماط المعمارية لتطوير نظم خلفية موثوقة، آمنة، وقابلة للتوسع.'
                : 'A cohesive stack of modern .NET backend technologies, robust patterns, and database engineering.'}
            </p>
          </div>
        </AssembleItem>

        {/* Highlight Card: Bio Intro + Years of Experience in Big Orange */}
        <AssembleItem direction="top" distance={50}>
          <div className="mb-10 sm:mb-14 p-4 sm:p-6 lg:p-8 rounded-3xl bg-[#0e0e12] border border-orange-500/25 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
            <div className="text-start max-w-2xl">
              <h3 className="text-xl font-bold text-white mb-2">
                {lang === 'ar' ? 'خبرة عملية مبنية على بناء مشاريع واقعية' : 'Hands-on Production Architecture'}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {lang === 'ar'
                  ? 'خبرة في تطبيق Clean Architecture ونمط Modular Monolith، وتطوير واجهات برمجة تطبيقات RESTful APIs متقدمة، وتنفيذ آليات أمان الجلسات وتدوير التوكنات، مع تحقيق 49 اختباراً مؤتمتاً ناجحاً بنسبة 100%.'
                  : 'Demonstrated proficiency delivering scalable backend solutions, multi-tenant SaaS architecture, token rotation with SHA-256, SignalR real-time hubs, and 49 automated passing tests with 100% pass rate.'}
              </p>
            </div>

            {/* Big Orange Number */}
            <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-orange-500/10 border border-orange-500/30 shrink-0">
              <span className="text-5xl sm:text-6xl font-black text-[#FF5722] font-mono drop-shadow-[0_0_20px_rgba(255,87,34,0.5)]">
                100%
              </span>
              <div className="flex flex-col text-start">
                <span className="text-white font-bold text-sm">
                  {lang === 'ar' ? 'نسبة اجتياز الاختبارات' : 'Test Pass Rate'}
                </span>
                <span className="text-xs text-[#FF7A00] font-mono">
                  {lang === 'ar' ? '49 اختباراً مؤتمتاً ناجحاً' : '49 Passing Tests'}
                </span>
              </div>
            </div>
          </div>
        </AssembleItem>

        {/* Skills with Big Percentages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {displaySkills.map((skill, idx) => (
            <AssembleItem key={idx} direction="top" distance={40 + idx * 10}>
              <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#0e0e12] border border-white/10 hover:border-orange-500/40 transition-all duration-300 group relative overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.6)]">
                {/* Big Orange Percentage Number */}
                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-3xl sm:text-4xl font-black text-[#FF5722] font-mono group-hover:text-[#FF7A00] transition-colors drop-shadow-[0_0_15px_rgba(255,87,34,0.3)]">
                    {skill.level}%
                  </span>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5722] group-hover:scale-125 transition-transform" />
                </div>

                {/* Skill Name */}
                <h4 className="text-sm sm:text-base font-bold text-white mb-3">
                  {skill.name}
                </h4>

                {/* Progress Track */}
                <div className="w-full h-1.5 rounded-full bg-[#18181f] overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-[#FF5722] to-[#FF7A00] transition-all duration-1000 shadow-[0_0_10px_rgba(255,87,34,0.5)]"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            </AssembleItem>
          ))}
        </div>

        {/* The 8 Architectural Domains Grid */}
        <div className="pt-8 border-t border-white/10">
          <AssembleItem direction="top">
            <div className="text-start mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#FF7A00] text-xs font-mono mb-2">
                <Terminal className="w-3.5 h-3.5 text-[#FF5722]" />
                <span>{lang === 'ar' ? 'المجالات الهندسية المتخصصة' : 'Specialized Engineering Areas'}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {lang === 'ar' ? 'فئات الخبرة والقدرات البرمجية' : 'Full Backend Technology Domains'}
              </h3>
            </div>
          </AssembleItem>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {backendDomains.map((domain, sIdx) => (
              <AssembleItem key={sIdx} direction="top" distance={50 + sIdx * 10}>
                <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#0e0e12] border border-white/5 hover:border-orange-500/30 transition-all duration-300 group h-full flex flex-col justify-between">
                  <div>
                    <div className="w-11 h-11 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      {domain.icon}
                    </div>
                    <h4 className="text-base font-bold text-white mb-1.5 group-hover:text-[#FF7A00] transition-colors">
                      {lang === 'ar' ? domain.titleAr : domain.titleEn}
                    </h4>
                    <p className="text-[#FF7A00] font-mono text-[11px] font-semibold mb-2">
                      {lang === 'ar' ? domain.skillsAr : domain.skillsEn}
                    </p>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {lang === 'ar' ? domain.descAr : domain.descEn}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-[#FF5722]">
                    <span>{lang === 'ar' ? 'معتمد ومطبق' : 'Production-Ready'}</span>
                    <span className="text-[#FF7A00]">&rarr;</span>
                  </div>
                </div>
              </AssembleItem>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
