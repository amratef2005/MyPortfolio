import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Github, Linkedin, Shield, Heart, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { profile, lang, setIsAdminOpen } = usePortfolio();

  return (
    <footer className="py-12 border-t border-slate-800/80 bg-dark-950 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Branding & Rights */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="font-semibold text-white">
            {lang === 'ar' ? profile.nameAr : profile.name} &bull; {lang === 'ar' ? profile.titleAr : profile.title}
          </p>
          <p className="text-xs text-slate-500">
            {lang === 'ar' 
              ? `© ${new Date().getFullYear()} جميع الحقوق محفوظة. تم البناء بأعلى معايير .NET وتقنيات React الحديثة.`
              : `© ${new Date().getFullYear()} All rights reserved. Built with .NET standards & modern React/Vite.`}
          </p>
        </div>

        {/* Social & Admin Access */}
        <div className="flex items-center gap-3">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-slate-800 border border-white/5 hover:border-slate-600 text-slate-400 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            title={lang === 'ar' ? 'حساب GitHub' : 'GitHub'}
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-[#0A66C2]/20 border border-white/5 hover:border-[#0A66C2]/40 text-slate-400 hover:text-[#0A66C2] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(10,102,194,0.4)]"
            title={lang === 'ar' ? 'الملف المهني على LinkedIn' : 'LinkedIn Public Profile'}
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href={profile.whatsapp || "https://wa.me/?text=Hello%20Amr"}
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-[#25D366]/20 border border-white/5 hover:border-[#25D366]/40 text-slate-400 hover:text-[#25D366] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(37,211,102,0.4)]"
            title={lang === 'ar' ? `واتساب: ${profile.phone}` : `WhatsApp: ${profile.phone}`}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
              <path d="M12.004 2C6.48 2 2 6.48 2 12c0 1.947.56 3.765 1.53 5.305L2 22l4.836-1.503A9.957 9.957 0 0012.004 22c5.523 0 10.004-4.48 10.004-10s-4.481-10-10.004-10zm0 18.232c-1.637 0-3.15-.479-4.432-1.306l-.318-.204-2.871.893.91-2.793-.223-.332A8.187 8.187 0 013.77 12c0-4.54 3.694-8.232 8.234-8.232 4.54 0 8.232 3.692 8.232 8.232s-3.692 8.232-8.232 8.232z" />
            </svg>
          </a>

          <a
            href={`mailto:${profile.email}`}
            className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-cyan-500/20 border border-white/5 hover:border-cyan-400/40 text-slate-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(56,189,248,0.4)]"
            title={profile.email}
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            onClick={() => setIsAdminOpen(true)}
            className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-indigo-500/20 border border-white/5 hover:border-indigo-400/40 text-slate-500 hover:text-cyan-400 transition-all duration-300 hover:scale-105 ml-2"
            title={lang === 'ar' ? 'لوحة تحكم البرتفوليو' : 'Portfolio Admin Panel'}
          >
            <Shield className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
