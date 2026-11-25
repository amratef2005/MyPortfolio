import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Globe, Menu, X, Linkedin, Github, Mail, Send } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { lang, setLang, profile, certificates, setIsAdminOpen } = usePortfolio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const navRef = useRef<HTMLElement>(null);

  const navLinks = useMemo(
    () => [
      { href: "#hero", labelAr: "الرئيسية", labelEn: "Home" },
      { href: "#about", labelAr: "نبذة عني", labelEn: "About" },
      { href: "#experience", labelAr: "الخبرات", labelEn: "Experience" },
      { href: "#projects", labelAr: "المشاريع", labelEn: "Projects" },
      ...(certificates && certificates.length > 0
        ? [{ href: "#certificates", labelAr: "الشهادات", labelEn: "Certificates" }]
        : []),
      { href: "#skills", labelAr: "المهارات", labelEn: "Skills" },
      { href: "#contact", labelAr: "تواصل معي", labelEn: "Contact" },
    ],
    [certificates]
  );

  // Scroll-Spy: highlight whichever section is currently in view
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace('#', ''));

    const updateActiveOnScroll = () => {
      const navHeight = navRef.current?.offsetHeight ?? 76;
      const scrollMarker = window.scrollY + navHeight + 120;

      setIsScrolled(window.scrollY > 20);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? Math.min(100, Math.max(0, (window.scrollY / maxScroll) * 100)) : 0);

      // If near the very bottom of the page, mark the last section active
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 40) {
        setActiveSection(sectionIds[sectionIds.length - 1] || 'contact');
        return;
      }

      let currentId = sectionIds[0] || 'hero';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollMarker >= top) {
            currentId = id;
          }
        }
      }
      setActiveSection(currentId);
    };

    updateActiveOnScroll();
    window.addEventListener('scroll', updateActiveOnScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateActiveOnScroll);
  }, [navLinks]);

  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    setMobileMenuOpen(false);
    setActiveSection(id);

    const performScroll = (attempts = 0) => {
      const target = document.getElementById(id);
      if (target) {
        const navHeight = navRef.current?.offsetHeight ?? 76;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior: 'smooth',
        });
      } else if (attempts < 10) {
        // Wait briefly if a lazy-loaded section is still mounting
        window.setTimeout(() => performScroll(attempts + 1), 80);
      }
    };

    performScroll();
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 px-3 xs:px-4 sm:px-6 lg:px-8 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050505]/92 backdrop-blur-2xl border-b border-theme-primary/25 shadow-[0_10px_35px_rgba(0,0,0,0.9)]'
          : 'bg-[#050505]/75 backdrop-blur-xl border-b border-theme-primary/15 shadow-[0_8px_30px_rgba(0,0,0,0.75)]'
      }`}
    >
      {/* Top-Edge Scroll Progress Indicator */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-theme-primary to-theme-secondary transition-[width] duration-150 pointer-events-none"
        style={{
          width: `${scrollProgress}%`,
          boxShadow: scrollProgress > 1 ? '0 0 10px rgba(var(--theme-primary-rgb), 0.7)' : 'none',
        }}
      />
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-6">

        {/* Brand / Logo: "Amr Atef." with Theme Primary Accent Dot */}
        <a
          href="#hero"
          onClick={(e) => scrollToSection(e, '#hero')}
          onDoubleClick={(e) => {
            e.preventDefault();
            setIsAdminOpen(true);
          }}
          className="flex items-center gap-2 group shrink-0 select-none cursor-pointer"
          title={lang === 'ar' ? 'Amr Atef (نقر مزدوج لفتح لوحة التحكم)' : 'Amr Atef (Double-click to open Admin)'}
        >
          <span className="text-xl sm:text-2xl font-black tracking-tight text-white transition-colors duration-200">
            {lang === 'ar' ? (profile.brandNameAr || profile.brandName || 'عمرو عاطف') : (profile.brandName || 'Amr Atef')}
            <span className="text-theme-primary text-2xl sm:text-3xl font-black drop-shadow-[0_0_12px_rgba(var(--theme-primary-rgb),0.8)]">.</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                aria-current={isActive ? 'page' : undefined}
                className={`text-sm font-medium transition-colors duration-200 relative group py-1 ${
                  isActive
                    ? 'text-theme-primary font-semibold'
                    : 'text-theme-secondary hover:text-theme-primary'
                }`}
              >
                {lang === 'ar' ? link.labelAr : link.labelEn}
                <span
                  className={`absolute bottom-0 right-0 h-0.5 bg-gradient-to-r from-theme-primary to-theme-secondary transition-all duration-300 ${
                    isActive
                      ? 'w-full left-0'
                      : 'w-0 group-hover:w-full group-hover:left-0'
                  }`}
                />
              </a>
            );
          })}
        </div>

        {/* Right Section: Social Icons + Hire Me + Lang Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">

          {/* Social Icons (Desktop) */}
            <div className="hidden sm:flex items-center gap-2 text-theme-secondary border-e border-white/10 pe-3 me-1">
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg hover:text-theme-primary hover:bg-theme-primary/15 transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg hover:text-theme-primary hover:bg-theme-primary/15 transition-colors"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              <a
                href={`mailto:${profile.email}`}
                className="p-2 rounded-lg hover:text-theme-primary hover:bg-theme-primary/15 transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            {/* "Hire Me" Quick Action CTA */}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="btn-sheen flex items-center justify-center gap-1.5 h-10 px-3 sm:px-4 rounded-xl bg-gradient-to-r from-theme-primary to-theme-secondary hover:brightness-110 text-white text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(var(--theme-primary-rgb),0.4)] hover:shadow-[0_0_28px_rgba(var(--theme-primary-rgb),0.6)] transition-all shrink-0 active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'وظفني' : 'Hire Me'}</span>
            </a>

            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="flex items-center justify-center gap-1 h-10 px-2.5 rounded-xl bg-[#121215] hover:bg-[#18181f] border border-white/10 hover:border-theme-primary/40 text-xs font-mono text-slate-200 transition-colors"
              title={lang === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
            >
              <Globe className="w-3.5 h-3.5 text-theme-secondary" />
              <span className="font-bold">{lang === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden h-10 w-10 rounded-xl bg-[#121215] border border-white/10 text-slate-300 hover:text-white flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-theme-secondary" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-white/10 flex flex-col gap-2 pb-3 animate-fadeIn">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'text-theme-primary bg-theme-primary/15 font-semibold border border-theme-primary/30'
                      : 'text-theme-secondary hover:text-theme-primary hover:bg-theme-primary/10'
                  }`}
                >
                  {lang === 'ar' ? link.labelAr : link.labelEn}
                </a>
              );
            })}
            {/* Socials on Mobile */}
              <div className="flex items-center gap-3 px-3 pt-2 border-t border-white/5 text-theme-secondary">
                {profile.linkedin && (
                    <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-theme-primary">
                      <Linkedin className="w-5 h-5" />
                    </a>
            )}
                    {profile.github && (
                        <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-theme-primary">
                          <Github className="w-5 h-5" />
                        </a>
            )}
                          <a href={`mailto:${profile.email}`} className="hover:text-theme-primary">
                            <Mail className="w-5 h-5" />
                          </a>
                        </div>
                      </div>
                    )}
                  </nav>
                );
};

                export default Navbar;
