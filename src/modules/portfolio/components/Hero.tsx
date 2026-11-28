import React, { useCallback, useLayoutEffect, useRef } from 'react';
import { usePortfolio } from '@/app/providers/PortfolioContext';
import { SignatureGlowAvatar } from '@modules/portfolio/components/SignatureGlowAvatar';
import { MOTION_EASE, StaggerGroup, StaggerItem } from '@shared/ui/KineticAssemble';
import { AvailabilityBadgeIcon } from '@shared/utils/availabilityIcon';
import { motion } from 'framer-motion';
import { 
  Send, 
  MapPin, 
  ArrowUpRight,
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { profile, lang } = usePortfolio();
  const nameContainerRef = useRef<HTMLDivElement>(null);
  const nameHeadingRef = useRef<HTMLHeadingElement>(null);

  const heroName =
    lang === 'ar'
      ? (profile.nameAr || profile.shortNameAr || 'عمرو عاطف إمام محمود')
      : (profile.name || profile.shortName || 'Amr Atef Imam Mahmoud');

  const fitHeroName = useCallback(() => {
    const container = nameContainerRef.current;
    const heading = nameHeadingRef.current;
    if (!container || !heading) return;

    // Clear previous inline override so CSS clamp() sets the upper bound first
    heading.style.fontSize = '';

    const availableWidth = container.getBoundingClientRect().width;
    if (availableWidth <= 0) return;

    const textWidth = heading.getBoundingClientRect().width;
    const computedPx = parseFloat(window.getComputedStyle(heading).fontSize);

    if (textWidth > availableWidth && Number.isFinite(computedPx)) {
      const ratio = Math.max(0.1, (availableWidth - 2) / textWidth);
      let fittedPx = Math.max(16, Math.floor(computedPx * ratio * 10) / 10);
      heading.style.fontSize = `${fittedPx}px`;

      // Guard against non-linear kerning/hinting overflow after font-size change
      let guard = 0;
      while (heading.getBoundingClientRect().width > availableWidth && fittedPx > 16 && guard < 6) {
        fittedPx = Math.max(16, Math.round((fittedPx - 0.5) * 10) / 10);
        heading.style.fontSize = `${fittedPx}px`;
        guard += 1;
      }
    }
  }, []);

  useLayoutEffect(() => {
    let cancelled = false;
    const runFit = () => {
      if (!cancelled) fitHeroName();
    };

    runFit();

    const observer =
      typeof ResizeObserver !== 'undefined' && nameContainerRef.current
        ? new ResizeObserver(runFit)
        : null;
    if (observer && nameContainerRef.current) {
      observer.observe(nameContainerRef.current);
    }

    const fontSet = typeof document !== 'undefined' ? document.fonts : undefined;
    fontSet?.ready?.then(runFit).catch(() => {});
    fontSet?.addEventListener?.('loadingdone', runFit);

    return () => {
      cancelled = true;
      observer?.disconnect();
      fontSet?.removeEventListener?.('loadingdone', runFit);
    };
  }, [fitHeroName, heroName, lang, profile.fontPreset]);

  return (
    <section id="hero" className="relative min-h-[85vh] pt-20 sm:pt-32 pb-8 sm:pb-16 lg:pb-20 flex items-center justify-center overflow-hidden">
      
      {/* Architectural Dot Grid & Soft Background Radial Light */}
      <div className="hero-dot-grid absolute inset-0 opacity-60 pointer-events-none" aria-hidden="true" />
      <div 
        className="absolute top-1/4 -right-16 w-[380px] sm:w-[560px] h-[380px] sm:h-[560px] rounded-full blur-[56px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(var(--theme-primary-rgb), 0.16) 0%, transparent 70%)' }}
      />
      <div 
        className="absolute bottom-10 -left-16 w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] rounded-full blur-[54px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(var(--theme-accent-rgb), 0.11) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        
        {/* Left Column: Orchestrated Reading-Order Cascade */}
        <StaggerGroup
          mode="mount"
          delay={0.14}
          stagger={0.11}
          className="lg:col-span-7 min-w-0 flex flex-col gap-6 text-start z-10 order-2 lg:order-1"
        >
          {/* 1. Dynamic Status / Availability Pill */}
          {profile.showAvailabilityBadge !== false && (() => {
            const status = profile.availabilityStatus || 'available';
            const statusLabel =
              lang === 'ar'
                ? (profile.availabilityNoteAr ||
                    (status === 'available'
                      ? 'متاح للمشاريع الحرة وعقود العمل'
                      : status === 'busy'
                      ? 'مشغول حالياً بمشاريع قائمة'
                      : 'غير متاح حالياً للمشاريع الجديدة'))
                : (profile.availabilityNoteEn ||
                    (status === 'available'
                      ? 'Available for Freelance & Full-time Roles'
                      : status === 'busy'
                      ? 'Busy with Active Projects'
                      : 'Currently Unavailable'));
            const pillClasses =
              status === 'available'
                ? 'border-theme-primary/30 text-theme-secondary shadow-[0_0_20px_rgba(var(--theme-primary-rgb),0.15)]'
                : status === 'busy'
                ? 'border-amber-500/35 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.12)]'
                : 'border-white/15 text-slate-300';
            const dotClasses =
              status === 'available'
                ? 'bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.85)]'
                : status === 'busy'
                ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.75)]'
                : 'bg-slate-400';

            return (
              <StaggerItem direction="bottom" distance={18} duration={0.72}>
                <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#121215]/90 backdrop-blur-md border text-xs sm:text-sm font-mono font-medium self-start ${pillClasses}`}>
                  <span className={`w-2 h-2 rounded-full shrink-0 ${dotClasses}`} />
                  <AvailabilityBadgeIcon icon={profile.availabilityIcon} status={status} />
                  <span>{statusLabel}</span>
                </div>
              </StaggerItem>
            );
          })()}

          {/* 2 & 3. Greeting + Large Name + Theme Primary Title + Stack + Location */}
          <div className="min-w-0">
            <StaggerItem direction="bottom" distance={18} duration={0.76}>
              <p className="text-xl sm:text-2xl font-light text-slate-300 tracking-wide font-sans">
                {lang === 'ar' ? (profile.heroGreetingAr || 'مرحباً، أنا') : (profile.heroGreeting || 'Hello, I am')}
              </p>
              
              <div ref={nameContainerRef} className="w-full min-w-0 overflow-hidden">
                <h1
                  ref={nameHeadingRef}
                  className="inline-block whitespace-nowrap text-[clamp(1.75rem,4.8vw,3.75rem)] font-black text-white leading-[1.2] tracking-tight mt-1"
                >
                  {heroName}
                </h1>
              </div>
            </StaggerItem>

            <StaggerItem direction="bottom" distance={18} duration={0.76}>
              {/* Theme Primary Title */}
              <div className="inline-block mt-2">
                <p className="text-[clamp(1.4rem,3.8vw,2.3rem)] font-extrabold text-theme-primary tracking-normal drop-shadow-[0_0_25px_rgba(var(--theme-primary-rgb),0.45)]">
                  {lang === 'ar' 
                    ? (profile.titleAr || 'مطور نظم خلفية .NET') 
                    : (profile.title || '.NET Backend Developer')}
                </p>
              </div>

              {/* Core Technologies Micro-Pills */}
              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                {['C#', 'ASP.NET Core', 'SQL Server', 'PostgreSQL'].map((tech) => (
                  <span
                    key={tech}
                    dir="ltr"
                    className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] text-[11px] sm:text-xs font-mono font-semibold text-theme-secondary/95 tracking-wide shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-slate-400 text-sm sm:text-base mt-2">
                <MapPin className="w-4 h-4 text-theme-secondary shrink-0" />
                <span>{lang === 'ar' ? (profile.locationAr || 'الإسماعيلية، مصر') : (profile.location || 'Ismailia, Egypt')}</span>
              </div>
            </StaggerItem>
          </div>

          {/* 4. Bio snippet */}
          <StaggerItem direction="bottom" distance={18} duration={0.78}>
            <p className="text-slate-300 text-base sm:text-lg leading-[1.8] max-w-2xl font-normal">
              {lang === 'ar'
                ? (profile.bioAr ? profile.bioAr.split('\n')[0] : 'طالب علوم حاسب ومطور نظم خلفية .NET بخبرة عملية في تصميم وتطوير أنظمة خلفية قابلة للتوسع باستخدام C# و ASP.NET Core، وبناء واجهات RESTful APIs وتطبيق Clean Architecture و CQRS.')
                : (profile.bio ? profile.bio.split('\n')[0] : 'Computer Science student and .NET Backend Developer with hands-on experience designing and developing scalable backend systems using C# and ASP.NET Core, building RESTful APIs, and implementing Clean Architecture & CQRS.')}
            </p>
          </StaggerItem>

          {/* 5. Action Buttons: Hire Me + View Projects */}
          <StaggerItem direction="bottom" distance={18} duration={0.78}>
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              {/* "Hire Me" Button with Theme Gradient & Glow */}
              <a
                href="#contact"
                className="btn-sheen w-full sm:w-auto flex items-center justify-center gap-2.5 h-12 sm:h-14 px-7 sm:px-9 rounded-2xl bg-gradient-to-r from-theme-primary to-theme-secondary hover:brightness-110 text-white font-bold text-base shadow-[0_0_30px_rgba(var(--theme-primary-rgb),0.45)] hover:shadow-[0_0_45px_rgba(var(--theme-primary-rgb),0.7)] transition-all duration-300 active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>{lang === 'ar' ? 'وظفني الآن' : 'Hire Me'}</span>
              </a>

              {/* Secondary Button: Explore Projects */}
              <a
                href="#projects"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 h-12 sm:h-14 px-6 sm:px-8 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-theme-primary/30 hover:border-theme-primary/60 text-slate-200 hover:text-white font-semibold text-base shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300 active:scale-95"
              >
                <span>{lang === 'ar' ? 'تصفح المشاريع' : 'Explore Projects'}</span>
                <ArrowUpRight className="w-4 h-4 text-theme-secondary rtl-flip" />
              </a>
            </div>
          </StaggerItem>

          {/* 6. Quick Metrics Frosted Stat Cards */}
          <StaggerItem direction="bottom" distance={16} duration={0.8}>
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 pt-2 max-w-xl">
              <div className="rounded-2xl bg-[#111218]/80 backdrop-blur-md border border-white/[0.08] hover:border-theme-primary/35 px-3 py-3 sm:px-4 sm:py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors">
                <span className="block text-xl sm:text-3xl font-black font-mono tabular-nums text-theme-primary">
                  +{profile.yearsOfExperience ?? 1}
                </span>
                <span className="block text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5 leading-snug">
                  {lang === 'ar' ? 'سنوات خبرة' : 'Years Experience'}
                </span>
              </div>
              <div className="rounded-2xl bg-[#111218]/80 backdrop-blur-md border border-white/[0.08] hover:border-theme-secondary/35 px-3 py-3 sm:px-4 sm:py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors">
                <span className="block text-xl sm:text-3xl font-black font-mono tabular-nums text-theme-secondary">
                  +{profile.completedProjects || 24}
                </span>
                <span className="block text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5 leading-snug">
                  {lang === 'ar' ? 'مشروع مكتمل' : 'Completed Projects'}
                </span>
              </div>
              <div className="rounded-2xl bg-[#111218]/80 backdrop-blur-md border border-white/[0.08] hover:border-emerald-500/35 px-3 py-3 sm:px-4 sm:py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors">
                <span className="block text-xl sm:text-3xl font-black font-mono tabular-nums text-emerald-400">
                  100%
                </span>
                <span className="block text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5 leading-snug">
                  {lang === 'ar' ? 'اجتياز الاختبارات (49)' : 'Test Pass Rate (49)'}
                </span>
              </div>
            </div>
          </StaggerItem>

        </StaggerGroup>

        {/* Right Column: Signature Circular Glow Silhouette Avatar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.94, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.24, ease: MOTION_EASE }}
          className="lg:col-span-5 flex items-center justify-center order-1 lg:order-2 z-10 transform-gpu"
        >
          <SignatureGlowAvatar
            imageUrl={profile.heroAvatarUrl || "/drama_hero.png"}
            alt={profile.name || "Amr Atef"}
            variant="hero"
            scale={profile.heroImageScale ?? 1}
            offsetY={profile.heroImageOffsetY ?? 0}
            glowIntensity={profile.heroGlowIntensity ?? 1}
            showRings={profile.heroShowRings ?? true}
            showEditButton={false}
          />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
