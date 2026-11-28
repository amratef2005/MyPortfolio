import React, { useState } from 'react';
import { usePortfolio } from '@/app/providers/PortfolioContext';
import { SignatureGlowAvatar } from '@modules/portfolio/components/SignatureGlowAvatar';
import { AssembleItem, StaggerGroup, StaggerItem } from '@shared/ui/KineticAssemble';
import {
  FileDown,
  FileText,
  Users,
  Layers,
  Loader2,
  Cpu
} from 'lucide-react';

export const About: React.FC = () => {
  const { lang, profile, experiences, projects, certificates, skills, setIsCVModalOpen } = usePortfolio();
  const [downloading, setDownloading] = useState(false);

  const handleDownloadCV = async () => {
    setDownloading(true);
    try {
      const { downloadAtsPdf } = await import('@modules/cv');
      downloadAtsPdf({
        profile,
        experiences,
        projects,
        certificates,
        skills,
        options: {
          template: 'classic',
          language: 'en',
          accentColor: 'monochrome',
          includedProjects: [],
          isEditable: false,
        }
      });
    } finally {
      setTimeout(() => setDownloading(false), 600);
    }
  };

  return (
    <section id="about" className="py-8 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Background Subtle Theme Ambient Bloom */}
      <div
        className="absolute top-1/2 -left-20 w-[420px] h-[420px] rounded-full blur-[64px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(var(--theme-primary-rgb), 0.11) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Two-Column Grid: Left Portrait with Circular Orange Glow, Right Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Portrait with Signature Circular Orange Glow */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <AssembleItem direction="left" distance={24} delay={0.12}>
              <SignatureGlowAvatar
                imageUrl={profile.aboutAvatarUrl || "/about_avatar.png"}
                alt={profile.name || "Amr Atef"}
                variant="about"
                scale={profile.aboutImageScale ?? 1}
                offsetY={profile.aboutImageOffsetY ?? 0}
                glowIntensity={profile.aboutGlowIntensity ?? 1}
                showRings={profile.aboutShowRings ?? true}
                showEditButton={false}
              />
            </AssembleItem>
          </div>

          {/* Right Column: Narrative, Strengths & Download CV with Reading-Order Stagger */}
          <StaggerGroup
            mode="inView"
            delay={0.16}
            stagger={0.1}
            className="lg:col-span-7 flex flex-col gap-6 text-start"
          >
            <StaggerItem direction="right" distance={22}>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121215] border border-theme-primary/20 text-theme-secondary text-xs font-mono mb-2">
                <Cpu className="w-3.5 h-3.5 text-theme-primary" />
                <span>{lang === 'ar' ? 'نبذة عني والتخصص' : 'About Me & Specialization'}</span>
              </div>

              {/* Subtitle: "Backend Architecture & Engineering" */}
              <p className="text-sm sm:text-base font-mono uppercase tracking-widest text-theme-secondary font-bold">
                {lang === 'ar' ? (profile.aboutSubtitleAr || 'هندسة ومعمارية النظم الخلفية') : (profile.aboutSubtitle || 'Backend Architecture & Engineering')}
              </p>

              {/* Section Main Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.2] mt-1">
                {lang === 'ar' ? (
                  <>
                    بناء أنظمة خلفية فائقة الأداء <span className="text-theme-primary drop-shadow-[0_0_20px_rgba(var(--theme-primary-rgb),0.4)]">وقابلة للتوسع بأعلى أمان</span>
                  </>
                ) : (
                  <>
                    Building Resilient, Scalable & <span className="text-theme-primary drop-shadow-[0_0_20px_rgba(var(--theme-primary-rgb),0.4)]">High-Throughput Systems</span>
                  </>
                )}
              </h2>
            </StaggerItem>

            {/* Main Bio Paragraph */}
            <StaggerItem direction="bottom" distance={20}>
              <div className="text-slate-300 text-sm sm:text-base leading-[1.8] space-y-3">
                {lang === 'ar' ? (
                  <>
                    <p>
                      طالب علوم حاسب ومطور نظم خلفية .NET بخبرة عملية في تصميم وتطوير أنظمة خلفية قابلة للتوسع باستخدام C# و ASP.NET Core. خبرة في بناء واجهات RESTful APIs، وتطبيق معمارية Clean Architecture ونمط CQRS، وتصميم قواعد البيانات العلائقية، وتطوير آليات مصادقة وتفويض آمنة.
                    </p>
                    <p className="text-slate-400 text-xs sm:text-sm">
                      خبرة تطبيقية في منصات SaaS السحابية متعددة المستأجرين، ومصادقة JWT، وOAuth 2.0، وتدوير Refresh Tokens، والاتصال اللحظي عبر SignalR، ومعالجة المهام الخلفية. أعمل بتعاون وثيق مع فرق العمل المتكاملة لقيادة التطوير الخلفي وربط الخدمات مع تطبيقات الموبايل والواجهات الأمامية.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Computer Science student and .NET Backend Developer with hands-on experience designing and developing scalable backend systems using C# and ASP.NET Core. Experienced in building RESTful APIs, implementing Clean Architecture and CQRS patterns, designing relational databases, and developing secure authentication and authorization mechanisms.
                    </p>
                    <p className="text-slate-400 text-xs sm:text-sm">
                      Practical experience in multi-tenant SaaS applications, JWT authentication, OAuth 2.0, refresh token rotation, real-time communication using SignalR, and background processing. Collaborates with cross-functional teams, owning backend development and API integration with mobile and frontend applications.
                    </p>
                  </>
                )}
              </div>
            </StaggerItem>

            {/* Core Strengths / Highlights Grid */}
            <StaggerItem direction="bottom" distance={20}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="premium-card p-4 rounded-2xl border border-white/10 hover:border-theme-primary/35">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-theme-primary/10 border border-theme-primary/20 flex items-center justify-center text-theme-primary shrink-0 mt-0.5">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm sm:text-base">
                        {lang === 'ar' ? 'معمارية سحابية ونظم SaaS' : 'Multi-Tenant SaaS & Clean Arch'}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        {lang === 'ar' ? 'Clean Architecture، Modular Monolith، وعزل بيانات المستأجرين' : 'Modular Monolith, tenant isolation & CQRS'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="premium-card p-4 rounded-2xl border border-white/10 hover:border-theme-primary/35">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-theme-primary/10 border border-theme-primary/20 flex items-center justify-center text-theme-secondary shrink-0 mt-0.5">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm sm:text-base">
                        {lang === 'ar' ? 'عمل جماعي وتكامل مع الفرق' : 'Cross-Functional Teamwork'}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        {lang === 'ar' ? 'تعاون وثيق وتكامل الخدمات مع مطوري Mobile و Frontend' : 'Seamless API integration with Mobile & Frontend teams'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* Dynamic CV Generation & Download Button */}
            <StaggerItem direction="bottom" distance={18}>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  disabled={downloading}
                  onClick={handleDownloadCV}
                  className="btn-sheen flex items-center justify-center gap-2.5 h-12 sm:h-14 px-8 rounded-2xl bg-gradient-to-r from-theme-primary to-theme-secondary hover:brightness-110 text-white font-bold text-base shadow-[0_0_25px_rgba(var(--theme-primary-rgb),0.4)] hover:shadow-[0_0_35px_rgba(var(--theme-primary-rgb),0.6)] transition-all duration-300 active:scale-95 cursor-pointer disabled:opacity-75"
                >
                  {downloading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <FileDown className="w-5 h-5 text-white" />
                  )}
                  <span>
                    {downloading
                      ? (lang === 'ar' ? 'جارٍ تحميل السيرة الذاتية...' : 'Downloading CV...')
                      : (lang === 'ar' ? 'تحميل السيرة الذاتية' : 'Download CV')}
                  </span>
                </button>

                {/* Optional Smart Builder Preview Trigger */}
                <button
                  type="button"
                  onClick={() => setIsCVModalOpen(true)}
                  className="flex items-center justify-center gap-2 h-12 sm:h-14 px-6 rounded-2xl bg-[#0e0e12] hover:bg-[#141418] border border-white/20 hover:border-white/40 text-slate-200 hover:text-white font-medium text-sm transition-all duration-300 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-slate-300" />
                  <span>{lang === 'ar' ? 'معاينة وتعديل السيرة الذاتية' : 'Preview & Edit CV'}</span>
                </button>
              </div>
            </StaggerItem>
          </StaggerGroup>

        </div>

      </div>
    </section>
  );
};

export default About;
