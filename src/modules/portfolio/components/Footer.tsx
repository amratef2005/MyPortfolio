import React, { useMemo, useCallback } from 'react';
import { usePortfolio } from '@/app/providers/PortfolioContext';
import { ArrowUp, ArrowUpRight, Github, Linkedin, Mail, MapPin, Terminal } from 'lucide-react';
import { AvailabilityBadgeIcon } from '@shared/utils/availabilityIcon';

export const Footer: React.FC = () => {
  const { profile, certificates, lang } = usePortfolio();

  const quickLinks = useMemo(
    () => [
      { href: '#hero', labelAr: 'الرئيسية', labelEn: 'Home' },
      { href: '#about', labelAr: 'نبذة عني', labelEn: 'About' },
      { href: '#experience', labelAr: 'الخبرات', labelEn: 'Experience' },
      { href: '#projects', labelAr: 'المشاريع', labelEn: 'Projects' },
      ...(certificates && certificates.length > 0
        ? [{ href: '#certificates', labelAr: 'الشهادات', labelEn: 'Certificates' }]
        : []),
      { href: '#skills', labelAr: 'المهارات', labelEn: 'Skills' },
      { href: '#contact', labelAr: 'تواصل معي', labelEn: 'Contact' },
    ],
    [certificates]
  );

  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const target = document.getElementById(id);
    if (target) {
      const navEl = document.querySelector('nav');
      const navHeight = navEl instanceof HTMLElement ? navEl.offsetHeight : 76;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: 'smooth',
      });
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappHref =
    profile.whatsapp && !profile.whatsapp.includes('wa.me/?text=')
      ? profile.whatsapp
      : `https://wa.me/${(profile.phone || 'amratefkandel').replace(/^@/, '')}`;

  return (
    <footer className="relative overflow-hidden bg-[#050505] text-slate-400 text-sm border-t border-white/[0.08]">
      {/* Top Theme Gradient Accent Line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-theme-primary/50 to-transparent pointer-events-none" />

      {/* Subtle Ambient Bottom Theme Glow (Mobile-safe blur radius) */}
      <div
        className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[360px] sm:w-[560px] h-[160px] sm:h-[220px] rounded-full blur-[44px] sm:blur-[72px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(var(--theme-primary-rgb), 0.1) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 space-y-10">
        {/* Main 3-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 text-start">
          {/* Column 1: Brand, Specialization & Availability */}
          <div className="md:col-span-5 space-y-4">
            <div>
              <a
                href="#hero"
                onClick={(e) => scrollToSection(e, '#hero')}
                className="inline-flex items-baseline gap-1 text-2xl font-black tracking-tight text-white hover:opacity-90 transition-opacity"
              >
                <span>
                  {lang === 'ar'
                    ? (profile.brandNameAr || profile.shortNameAr || 'عمرو عاطف')
                    : (profile.brandName || profile.shortName || 'Amr Atef')}
                </span>
                <span className="text-theme-primary text-3xl font-black drop-shadow-[0_0_12px_rgba(var(--theme-primary-rgb),0.7)]">
                  .
                </span>
              </a>
              <p className="text-xs sm:text-sm font-mono font-semibold text-theme-secondary mt-1">
                {lang === 'ar' ? (profile.titleAr || 'مطور نظم خلفية .NET') : (profile.title || '.NET Backend Developer')}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              {lang === 'ar'
                ? 'تصميم وبناء الأنظمة الخلفية القابلة للتوسع، واجهات APIs، ومعمارية Clean Architecture و CQRS بأعلى معايير الأداء والأمان.'
                : 'Architecting resilient backend systems, scalable RESTful APIs, and multi-tenant SaaS platforms with Clean Architecture & CQRS.'}
            </p>

            {/* Availability & Location Badges */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              {profile.showAvailabilityBadge !== false && (() => {
                const status = profile.availabilityStatus || 'available';
                const statusText =
                  lang === 'ar'
                    ? (profile.availabilityNoteAr ||
                        (status === 'available'
                          ? 'متاح للمشاريع والعمل'
                          : status === 'busy'
                          ? 'مشغول حالياً بمشاريع قائمة'
                          : 'غير متاح حالياً'))
                    : (profile.availabilityNoteEn ||
                        (status === 'available'
                          ? 'Available for Opportunities'
                          : status === 'busy'
                          ? 'Busy with Active Projects'
                          : 'Currently Unavailable'));
                const badgeStyle =
                  status === 'available'
                    ? 'border-theme-primary/25 text-theme-secondary'
                    : status === 'busy'
                    ? 'border-amber-500/35 text-amber-300'
                    : 'border-white/10 text-slate-400';
                const dotStyle =
                  status === 'available'
                    ? 'bg-emerald-400 animate-pulse'
                    : status === 'busy'
                    ? 'bg-amber-400'
                    : 'bg-slate-500';
                return (
                  <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0e0e12] border text-xs font-mono ${badgeStyle}`}>
                    <span className={`w-2 h-2 rounded-full shrink-0 ${dotStyle}`} />
                    <AvailabilityBadgeIcon icon={profile.availabilityIcon} status={status} />
                    <span>{statusText}</span>
                  </span>
                );
              })()}

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0e0e12] border border-white/10 text-slate-300 text-xs font-mono">
                <MapPin className="w-3.5 h-3.5 text-theme-secondary shrink-0" />
                <span>{lang === 'ar' ? (profile.locationAr || 'الإسماعيلية، مصر') : (profile.location || 'Ismailia, Egypt')}</span>
              </span>
            </div>
          </div>

          {/* Column 2: Quick Section Navigation */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-theme-primary" />
              <span>{lang === 'ar' ? 'روابط سريعة' : 'Quick Navigation'}</span>
            </h4>

            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="group inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 hover:text-theme-secondary transition-colors w-fit"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-theme-primary/70 group-hover:text-theme-secondary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all rtl-flip" />
                  <span>{lang === 'ar' ? link.labelAr : link.labelEn}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Direct Connect & Back to Top */}
          <div className="md:col-span-3 flex flex-col justify-between gap-5">
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-theme-secondary" />
                <span>{lang === 'ar' ? 'تواصل مباشر' : 'Direct Connect'}</span>
              </h4>

              <div className="flex flex-wrap items-center gap-2.5">
                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-[#0e0e12] hover:bg-theme-primary/15 border border-white/10 hover:border-theme-primary/40 text-slate-300 hover:text-theme-secondary transition-all"
                    title="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}

                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-[#0e0e12] hover:bg-theme-primary/15 border border-white/10 hover:border-theme-primary/40 text-slate-300 hover:text-theme-secondary transition-all"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-[#0e0e12] hover:bg-emerald-500/15 border border-white/10 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-400 transition-all"
                  title="WhatsApp"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                    <path d="M12.004 2C6.48 2 2 6.48 2 12c0 1.947.56 3.765 1.53 5.305L2 22l4.836-1.503A9.957 9.957 0 0012.004 22c5.523 0 10.004-4.48 10.004-10s-4.481-10-10.004-10zm0 18.232c-1.637 0-3.15-.479-4.432-1.306l-.318-.204-2.871.893.91-2.793-.223-.332A8.187 8.187 0 013.77 12c0-4.54 3.694-8.232 8.234-8.232 4.54 0 8.232 3.692 8.232 8.232s-3.692 8.232-8.232 8.232z" />
                  </svg>
                </a>

                <a
                  href={`mailto:${profile.email}`}
                  className="p-2.5 rounded-xl bg-[#0e0e12] hover:bg-theme-primary/15 border border-white/10 hover:border-theme-primary/40 text-slate-300 hover:text-theme-secondary transition-all"
                  title={profile.email}
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0e0e12] hover:bg-gradient-to-r hover:from-theme-primary hover:to-theme-secondary border border-theme-primary/30 hover:border-transparent text-theme-secondary hover:text-white text-xs font-mono font-bold transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(var(--theme-primary-rgb),0.4)] w-full sm:w-fit cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'العودة للأعلى' : 'Back to Top'}</span>
            </button>
          </div>
        </div>

        {/* Bottom Copyright & Stack Bar */}
        <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p className="text-center sm:text-start">
            {lang === 'ar'
              ? `© ${new Date().getFullYear()} ${profile.nameAr || 'عمرو عاطف'}. جميع الحقوق محفوظة.`
              : `© ${new Date().getFullYear()} ${profile.name || 'Amr Atef'}. All rights reserved.`}
          </p>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] font-mono text-[11px] text-slate-300">
            <Terminal className="w-3.5 h-3.5 text-theme-primary shrink-0" />
            <span>C# • ASP.NET Core • Clean Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
