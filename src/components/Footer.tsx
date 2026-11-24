import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Github, Linkedin, Shield, Heart, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { profile, lang, setIsAdminOpen } = usePortfolio();

  return (
    <footer className="py-12 border-t border-white/10 bg-[#050505] text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Branding & Rights */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="font-bold text-white text-base">
            {lang === 'ar' ? (profile.nameAr || profile.shortNameAr || 'عمرو قنديل') : (profile.name || profile.shortName || 'Amr Kandel')}
            <span className="text-[#FF5722] font-black">.</span>
            <span className="text-slate-400 text-xs font-mono font-normal ms-2">
              {lang === 'ar' ? profile.titleAr : profile.title}
            </span>
          </p>
          <p className="text-xs text-slate-500">
            {lang === 'ar' 
              ? `© ${new Date().getFullYear()} جميع الحقوق محفوظة. تم التصميم والتطوير بأعلى معايير UI/UX وهندسة الويب الحديثة.`
              : `© ${new Date().getFullYear()} All rights reserved. Designed & built with modern UI/UX & web engineering standards.`}
          </p>
        </div>

        {/* Social & Admin Access */}
        <div className="flex items-center gap-3">
          {profile.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-[#121215] hover:bg-orange-500/10 border border-white/5 hover:border-orange-500/30 text-slate-400 hover:text-[#FF7A00] transition-all"
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
              className="p-2.5 rounded-xl bg-[#121215] hover:bg-orange-500/10 border border-white/5 hover:border-orange-500/30 text-slate-400 hover:text-[#FF7A00] transition-all"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}

          <a
            href={
              profile.whatsapp && !profile.whatsapp.includes('wa.me/?text=')
                ? profile.whatsapp
                : `https://wa.me/${(profile.phone || 'amratefkandel').replace(/^@/, '')}`
            }
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-xl bg-[#121215] hover:bg-emerald-500/10 border border-white/5 hover:border-emerald-500/30 text-slate-400 hover:text-emerald-400 transition-all"
            title="WhatsApp"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
              <path d="M12.004 2C6.48 2 2 6.48 2 12c0 1.947.56 3.765 1.53 5.305L2 22l4.836-1.503A9.957 9.957 0 0012.004 22c5.523 0 10.004-4.48 10.004-10s-4.481-10-10.004-10zm0 18.232c-1.637 0-3.15-.479-4.432-1.306l-.318-.204-2.871.893.91-2.793-.223-.332A8.187 8.187 0 013.77 12c0-4.54 3.694-8.232 8.234-8.232 4.54 0 8.232 3.692 8.232 8.232s-3.692 8.232-8.232 8.232z" />
            </svg>
          </a>

          <a
            href={`mailto:${profile.email}`}
            className="p-2.5 rounded-xl bg-[#121215] hover:bg-orange-500/10 border border-white/5 hover:border-orange-500/30 text-slate-400 hover:text-[#FF7A00] transition-all"
            title={profile.email}
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            onClick={() => setIsAdminOpen(true)}
            className="p-2.5 rounded-xl bg-[#121215] hover:bg-orange-500/20 border border-white/10 hover:border-orange-500/40 text-slate-400 hover:text-[#FF5722] transition-all ml-2"
            title={lang === 'ar' ? 'لوحة تحكم البرتفوليو' : 'Portfolio Admin Panel'}
          >
            <Shield className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
