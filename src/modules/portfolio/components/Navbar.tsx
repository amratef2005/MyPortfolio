import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { usePortfolio } from '@/app/providers/PortfolioContext';
import { MOTION_EASE } from '@shared/ui/KineticAssemble';
import { Globe, Menu, X, Linkedin, Github, Mail, Send } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { lang, setLang, profile, certificates, setIsAdminOpen } = usePortfolio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const navRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll();
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 28,
    restDelta: 0.001,
  });

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
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none px-3 sm:px-6 lg:px-8 pt-[max(0.6rem,env(safe-area-inset-top))] transition-all duration-300">
      <nav
        ref={navRef}
        className={`pointer-events-auto relative mx-auto transform-gpu overflow-hidden transition-all duration-500 ${
          isScrolled
            ? 'max-w-6xl rounded-2xl px-3.5 sm:px-5 py-2.5 bg-[#07080D]/88 backdrop-blur-2xl border border-white/[0.11] shadow-[0_14px_40px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.08)]'
            : 'max-w-7xl rounded-2xl px-3.5 sm:px-6 py-3 bg-[#06070B]/65 backdrop-blur-xl border border-white/[0.06] shadow-[0_8px_28px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.05)]'
        }`}
      >
        {/* Top-Edge Scroll Progress Indicator */}
        <motion.div
          aria-hidden="true"
          className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-theme-primary via-theme-secondary to-theme-primary pointer-events-none transform-gpu ${
            lang === 'ar' ? 'origin-right' : 'origin-left'
          }`}
          style={{
            scaleX: smoothScrollProgress,
            boxShadow: isScrolled ? '0 0 12px rgba(var(--theme-primary-rgb), 0.7)' : 'none',
          }}
        />
        <div className="flex items-center justify-between gap-2 sm:gap-5">
          {/* Brand / Logo */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, '#hero')}
            onDoubleClick={(e) => {
              e.preventDefault();
              setIsAdminOpen(true);
            }}
            className="flex items-center gap-2 group min-w-0 shrink select-none cursor-pointer"
            title={lang === 'ar' ? 'Amr Atef (نقر مزدوج لفتح لوحة التحكم)' : 'Amr Atef (Double-click to open Admin)'}
          >
            <span className="text-lg sm:text-2xl font-black tracking-tight text-white transition-colors duration-200 truncate max-w-[138px] sm:max-w-none">
              {lang === 'ar' ? (profile.brandNameAr || profile.brandName || 'عمرو عاطف') : (profile.brandName || 'Amr Atef')}
              <span className="text-theme-primary text-2xl sm:text-3xl font-black drop-shadow-[0_0_12px_rgba(var(--theme-primary-rgb),0.8)]">.</span>
            </span>
          </a>

          {/* Desktop Navigation Pills */}
          <div className="hidden lg:flex items-center gap-1 p-1 rounded-xl bg-white/[0.025] border border-white/[0.06]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors duration-300 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navActivePill"
                      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                      className="absolute inset-0 rounded-lg bg-theme-primary/20 border border-theme-primary/40 shadow-[0_0_14px_rgba(var(--theme-primary-rgb),0.25)]"
                    />
                  )}
                  <span className="relative z-10">{lang === 'ar' ? link.labelAr : link.labelEn}</span>
                </a>
              );
            })}
          </div>

          {/* Right Section: Social Icons + Hire Me + Lang Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <div className="hidden sm:flex items-center gap-1 text-theme-secondary border-e border-white/10 pe-2.5 me-0.5">
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

            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="btn-sheen flex items-center justify-center gap-1.5 h-9 sm:h-10 px-3 sm:px-4 rounded-xl bg-gradient-to-r from-theme-primary to-theme-secondary hover:brightness-110 text-white text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(var(--theme-primary-rgb),0.4)] hover:shadow-[0_0_28px_rgba(var(--theme-primary-rgb),0.6)] transition-all shrink-0 active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'وظفني' : 'Hire Me'}</span>
            </a>

            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="flex items-center justify-center gap-1 h-9 sm:h-10 px-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-theme-primary/40 text-xs font-mono text-slate-200 transition-colors active:scale-95"
              title={lang === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
            >
              <Globe className="w-3.5 h-3.5 text-theme-secondary" />
              <span className="font-bold">{lang === 'ar' ? 'EN' : 'AR'}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden h-9 w-9 rounded-xl bg-white/[0.04] border border-white/10 text-slate-300 hover:text-white flex items-center justify-center active:scale-95"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4.5 h-4.5 text-theme-secondary" /> : <Menu className="w-4.5 h-4.5" />}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-drawer"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.34, ease: MOTION_EASE }}
              className="lg:hidden overflow-hidden"
            >
              <div className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-1.5 pb-2">
                {navLinks.map((link, idx) => {
                  const isActive = activeSection === link.href.replace('#', '');
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, delay: idx * 0.04, ease: MOTION_EASE }}
                      onClick={(e) => scrollToSection(e, link.href)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`text-sm font-medium px-3.5 py-2.5 rounded-xl transition-colors ${
                        isActive
                          ? 'text-white bg-theme-primary/18 font-semibold border border-theme-primary/35'
                          : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                      }`}
                    >
                      {lang === 'ar' ? link.labelAr : link.labelEn}
                    </motion.a>
                  );
                })}
                <div className="flex items-center gap-3 px-3 pt-2.5 mt-1 border-t border-white/10 text-theme-secondary">
                  {profile.linkedin && (
                    <a href={profile.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:text-theme-primary">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {profile.github && (
                    <a href={profile.github} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:text-theme-primary">
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  <a href={`mailto:${profile.email}`} className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:text-theme-primary">
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

                export default Navbar;
