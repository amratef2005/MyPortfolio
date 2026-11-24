import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { SignatureGlowAvatar } from './SignatureGlowAvatar';
import { AssembleItem } from './motion/KineticAssemble';
import { 
  FileDown, 
  FileText, 
  Heart, 
  CheckCircle2, 
  Layout, 
  Users, 
  Layers,
  Compass,
  Loader2,
  Cpu
} from 'lucide-react';

export const About: React.FC = () => {
  const { lang, profile, experiences, projects, certificates, skills, setIsCVModalOpen } = usePortfolio();
  const [downloading, setDownloading] = useState(false);

  const handleDownloadCV = async () => {
    setDownloading(true);
    try {
      const { downloadAtsPdf } = await import('../utils/atsPdfGenerator');
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
      {/* Background Subtle Orange Ambient Bloom */}
      <div 
        className="absolute top-1/2 -left-20 w-[450px] h-[450px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255, 87, 34, 0.12) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two-Column Grid: Left Portrait with Circular Orange Glow, Right Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Portrait with Signature Circular Orange Glow (Image 2) */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <AssembleItem direction="left" distance={80}>
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

          {/* Right Column: "Designing Is My Passion", Narrative & Download CV */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-start">
            <AssembleItem direction="right" distance={80}>
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121215] border border-orange-500/20 text-[#FF7A00] text-xs font-mono mb-2">
                <Cpu className="w-3.5 h-3.5 text-[#FF5722]" />
                <span>{lang === 'ar' ? 'نبذة عني والتخصص' : 'About Me & Specialization'}</span>
              </div>

              {/* Subtitle: "Backend Architecture & Engineering" */}
              <p className="text-sm sm:text-base font-mono uppercase tracking-widest text-[#FF7A00] font-bold">
                {lang === 'ar' ? (profile.aboutSubtitleAr || 'هندسة ومعمارية النظم الخلفية') : (profile.aboutSubtitle || 'Backend Architecture & Engineering')}
              </p>

              {/* Section Main Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.2]">
                {lang === 'ar' ? (
                  <>
                    بناء أنظمة خلفية فائقة الأداء <span className="text-[#FF5722] drop-shadow-[0_0_20px_rgba(255,87,34,0.4)]">وقابلة للتوسع بأعلى أمان</span>
                  </>
                ) : (
                  <>
                    Building Resilient, Scalable & <span className="text-[#FF5722] drop-shadow-[0_0_20px_rgba(255,87,34,0.4)]">High-Throughput Systems</span>
                  </>
                )}
              </h2>

              {/* Main Bio Paragraph */}
              <div className="text-slate-300 text-sm sm:text-base leading-[1.8] mt-2 space-y-3">
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

              {/* Core Strengths / Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-3">
                <div className="p-4 rounded-2xl bg-[#0e0e12] border border-white/5 hover:border-orange-500/30 transition-all">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-[#FF5722] shrink-0 mt-0.5">
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

                <div className="p-4 rounded-2xl bg-[#0e0e12] border border-white/5 hover:border-orange-500/30 transition-all">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-[#FF7A00] shrink-0 mt-0.5">
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

              {/* Dynamic CV Generation & Download Button (Luxury Monochrome Design) */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  disabled={downloading}
                  onClick={handleDownloadCV}
                  className="flex items-center justify-center gap-2.5 h-12 sm:h-14 px-8 rounded-2xl bg-white text-slate-950 hover:bg-slate-100 font-bold text-base shadow-[0_0_25px_rgba(255,255,255,0.22)] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] transition-all duration-300 active:scale-95 cursor-pointer disabled:opacity-75"
                >
                  {downloading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <FileDown className="w-5 h-5 text-slate-950" />
                  )}
                  <span>
                    {downloading
                      ? (lang === 'ar' ? 'جارٍ توليد وتحميل PDF...' : 'Generating ATS PDF...')
                      : (lang === 'ar' ? 'تحميل السيرة الذاتية (PDF)' : 'Download CV (ATS PDF)')}
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

            </AssembleItem>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
