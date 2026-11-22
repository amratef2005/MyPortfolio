import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ShieldCheck, Globe, Menu, X, FileText, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { lang, setLang, setIsCVModalOpen, profile } = usePortfolio();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { href: "#hero", labelAr: "الرئيسية", labelEn: "Home" },
    { href: "#about", labelAr: "نبذة عني", labelEn: "About" },
    { href: "#projects", labelAr: "المشاريع", labelEn: "Projects" },
    { href: "#certificates", labelAr: "الشهادات و ITI", labelEn: "Certificates" },
    { href: "#skills", labelAr: "المهارات", labelEn: "Skills" },
    { href: "#contact", labelAr: "تواصل معي", labelEn: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-3 bg-[#06080d]/65 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.36),inset_0_1px_0_0_rgba(255,255,255,0.08)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand / Logo */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5 shadow-[0_0_15px_rgba(56,189,248,0.35)] group-hover:shadow-[0_0_22px_rgba(56,189,248,0.6)] transition-all shrink-0">
            <img 
              src={profile.topAvatarUrl || profile.heroAvatarUrl || "/my.jpg"} 
              alt={profile.name} 
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/drama_hero.png";
              }}
              className="w-full h-full object-cover object-top rounded-[10px]" 
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white text-sm sm:text-base tracking-wide group-hover:text-cyan-400 transition-colors">
              {lang === 'ar' ? profile.nameAr : profile.name}
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono text-cyan-400/80 tracking-wider">
              {lang === 'ar' ? 'مطور نظم خلفية .NET' : '.NET BACKEND DEVELOPER'}
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs sm:text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors duration-200 relative group py-1"
            >
              {lang === 'ar' ? link.labelAr : link.labelEn}
              <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full group-hover:left-0" />
            </a>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* CV Generator Trigger Button */}
          <button
            onClick={() => setIsCVModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold transition-all shadow-[0_0_12px_rgba(56,189,248,0.2)]"
            title={lang === 'ar' ? 'أداة توليد السيرة الذاتية الذكية' : 'Generate Smart CV'}
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">{lang === 'ar' ? 'توليد السيرة الذاتية' : 'Generate CV'}</span>
            <span className="sm:hidden font-bold">{lang === 'ar' ? 'السيرة الذاتية' : 'CV'}</span>
          </button>

          {/* Language Toggle Button */}
          <button
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-xs font-mono text-slate-200 transition-all shadow-sm"
            title={lang === 'ar' ? 'Switch to English' : 'التحويل للغة العربية'}
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-bold">{lang === 'ar' ? 'EN' : 'عربي'}</span>
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-slate-800 flex flex-col gap-1.5 pb-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-slate-200 hover:bg-slate-800/80 hover:text-cyan-400 text-sm font-medium transition-colors"
            >
              {lang === 'ar' ? link.labelAr : link.labelEn}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};
