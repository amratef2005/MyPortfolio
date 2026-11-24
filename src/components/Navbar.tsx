import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Globe, Menu, X, Linkedin, Github, Mail, Send } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { lang, setLang, profile, certificates, setIsAdminOpen } = usePortfolio();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { href: "#hero", labelAr: "الرئيسية", labelEn: "Home" },
    { href: "#about", labelAr: "نبذة عني", labelEn: "About" },
    { href: "#experience", labelAr: "الخبرات", labelEn: "Experience" },
    { href: "#projects", labelAr: "المشاريع", labelEn: "Projects" },
    ...(certificates && certificates.length > 0 ? [{ href: "#certificates", labelAr: "الشهادات", labelEn: "Certificates" }] : []),
    { href: "#skills", labelAr: "المهارات", labelEn: "Skills" },
    { href: "#contact", labelAr: "تواصل معي", labelEn: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-3 xs:px-4 sm:px-6 lg:px-8 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] bg-[#050505]/85 backdrop-blur-2xl border-b border-orange-500/15 shadow-[0_8px_30px_rgba(0,0,0,0.85)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-6">

        {/* Brand / Logo: "Amr Atef." with Burnt Orange Accent Dot */}
        <a
          href="#hero"
          onDoubleClick={(e) => {
            e.preventDefault();
            setIsAdminOpen(true);
          }}
          className="flex items-center gap-2 group shrink-0 select-none cursor-pointer"
          title={lang === 'ar' ? 'Amr Atef (نقر مزدوج لفتح لوحة التحكم)' : 'Amr Atef (Double-click to open Admin)'}
        >
          <span className="text-xl sm:text-2xl font-black tracking-tight text-white transition-colors duration-200">
            {lang === 'ar' ? (profile.brandNameAr || profile.brandName || 'عمرو عاطف') : (profile.brandName || 'Amr Atef')}
            <span className="text-[#FF5722] text-2xl sm:text-3xl font-black drop-shadow-[0_0_12px_rgba(255,87,34,0.8)]">.</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#FF7A00] hover:text-[#FF9E3D] transition-colors duration-200 relative group py-1"
            >
              {lang === 'ar' ? link.labelAr : link.labelEn}
              <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-gradient-to-r from-[#FF5722] to-[#FF7A00] transition-all duration-300 group-hover:w-full group-hover:left-0" />
            </a>
          ))}
        </div>

        {/* Right Section: Social Icons + Hire Me + Lang Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">

          {/* Social Icons (Desktop) */}
            <div className="hidden sm:flex items-center gap-2 text-[#FF7A00] border-e border-white/10 pe-3 me-1">
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg hover:text-[#FF9E3D] hover:bg-orange-500/15 transition-colors"
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
                  className="p-2 rounded-lg hover:text-[#FF9E3D] hover:bg-orange-500/15 transition-colors"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              <a
                href={`mailto:${profile.email}`}
                className="p-2 rounded-lg hover:text-[#FF9E3D] hover:bg-orange-500/15 transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            {/* "Hire Me" Quick Action CTA */}
            <a
              href="#contact"
              className="flex items-center justify-center gap-1.5 h-10 px-3 sm:px-4 rounded-xl bg-gradient-to-r from-[#FF5722] to-[#FF7A00] hover:from-[#FF6B00] hover:to-[#FF8A00] text-white text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(255,87,34,0.4)] hover:shadow-[0_0_28px_rgba(255,87,34,0.6)] transition-all shrink-0 active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'وظفني' : 'Hire Me'}</span>
            </a>

            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="flex items-center justify-center gap-1 h-10 px-2.5 rounded-xl bg-[#121215] hover:bg-[#18181f] border border-white/10 text-xs font-mono text-slate-200 transition-colors"
              title={lang === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
            >
              <Globe className="w-3.5 h-3.5 text-[#FF7A00]" />
              <span className="font-bold">{lang === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden h-10 w-10 rounded-xl bg-[#121215] border border-white/10 text-slate-300 hover:text-white flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#FF7A00]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-white/10 flex flex-col gap-2 pb-3 animate-fadeIn">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-[#FF7A00] hover:text-[#FF9E3D] hover:bg-orange-500/10 px-3 py-2 rounded-lg transition-colors"
              >
                {lang === 'ar' ? link.labelAr : link.labelEn}
              </a>
            ))}
            {/* Socials on Mobile */}
              <div className="flex items-center gap-3 px-3 pt-2 border-t border-white/5 text-[#FF7A00]">
                {profile.linkedin && (
                    <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#FF9E3D]">
                      <Linkedin className="w-5 h-5" />
                    </a>
            )}
                    {profile.github && (
                        <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-[#FF9E3D]">
                          <Github className="w-5 h-5" />
                        </a>
            )}
                          <a href={`mailto:${profile.email}`} className="hover:text-[#FF9E3D]">
                            <Mail className="w-5 h-5" />
                          </a>
                        </div>
                      </div>
                    )}
                  </nav>
                );
};

                export default Navbar;
