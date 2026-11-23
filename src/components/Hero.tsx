import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { InteractiveAvatar } from './InteractiveAvatar';
import { VoidEmergence } from './motion/KineticAssemble';
import { motion } from 'framer-motion';
import { 
  FileDown, 
  Send, 
  Sparkles, 
  Layers, 
  Database, 
  Cpu, 
  ArrowUpRight
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { profile, lang, setIsCVModalOpen } = usePortfolio();

  return (
    <VoidEmergence className="overflow-hidden">
      <section id="hero" className="relative min-h-[92vh] pt-24 sm:pt-32 pb-16 sm:pb-24 flex items-center justify-center">
        {/* Background Soft Lighting Glows dynamically tinted from Avatar colors */}
        <div 
          style={{
            background: 'radial-gradient(circle, rgba(var(--theme-primary-rgb, 56, 189, 248), 0.16) 0%, transparent 70%)'
          }}
          className="absolute top-1/4 -right-10 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full blur-[120px] pointer-events-none" 
        />
        <div 
          style={{
            background: 'radial-gradient(circle, rgba(var(--theme-secondary-rgb, 99, 102, 241), 0.14) 0%, transparent 70%)'
          }}
          className="absolute bottom-10 -left-10 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full blur-[120px] pointer-events-none" 
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Intro & Info */}
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col gap-5 sm:gap-6 text-start z-10 order-2 lg:order-1"
          >
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-mono font-medium self-start shadow-[0_0_15px_rgba(56,189,248,0.15)] max-w-full flex-wrap sm:flex-nowrap leading-relaxed">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow shrink-0" />
              <span>{lang === 'ar' ? 'معمارية نظيفة • CQRS • .NET 10 • PostgreSQL' : 'Clean Architecture • CQRS • .NET 10 • PostgreSQL'}</span>
            </div>

            {/* Main Title with Fluid clamp() */}
            <div>
              <h1 className="text-[clamp(2rem,6vw,3.75rem)] font-black text-white leading-[1.2] tracking-tight">
                {lang === 'ar' ? (
                  <>
                    أهلاً، أنا <span className="gradient-text-cyan">{profile.shortNameAr || 'عمرو عاطف'}</span>
                  </>
                ) : (
                  <>
                    Hi, I'm <span className="gradient-text-cyan">{profile.shortName || 'Amr Atef'}</span>
                  </>
                )}
              </h1>
              <p className="text-[clamp(1.15rem,3.2vw,1.65rem)] font-bold gradient-text-violet mt-2 font-mono leading-normal">
                {lang === 'ar' ? profile.titleAr : profile.title}
              </p>
              <p className="text-xs sm:text-sm font-mono text-cyan-400/90 font-semibold tracking-wider mt-1.5 leading-relaxed">
                C# &bull; ASP.NET Core &bull; SQL Server &bull; PostgreSQL
              </p>
            </div>

            {/* Bio Description with generous Arabic-compatible line-height */}
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-[1.75] max-w-2xl">
              {lang === 'ar' ? profile.bioAr : profile.bio}
            </p>

            {/* Key Engineering Pillars */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 my-2">
              <div className="p-3.5 sm:p-4 rounded-2xl glass-panel flex items-center gap-3">
                <Layers className="w-5 h-5 text-cyan-400 shrink-0" />
                <div className="text-xs">
                  <span className="block font-bold text-white text-xs sm:text-sm">
                    {lang === 'ar' ? 'معمارية نظيفة' : 'Clean Architecture'}
                  </span>
                  <span className="text-slate-400 font-mono text-xs mt-0.5 block">
                    {lang === 'ar' ? 'أنماط CQRS و Modular Monolith' : 'CQRS & Modular Monolith'}
                  </span>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl glass-panel flex items-center gap-3">
                <Database className="w-5 h-5 text-indigo-400 shrink-0" />
                <div className="text-xs">
                  <span className="block font-bold text-white text-xs sm:text-sm">
                    {lang === 'ar' ? 'SaaS متعدد المستأجرين' : 'Multi-Tenant SaaS'}
                  </span>
                  <span className="text-slate-400 font-mono text-xs mt-0.5 block">
                    {lang === 'ar' ? 'عزل البيانات وتدوير التوكنات' : 'Isolation & Token Rotation'}
                  </span>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl glass-panel flex items-center gap-3 xs:col-span-2 sm:col-span-1">
                <Cpu className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="text-xs">
                  <span className="block font-bold text-white text-xs sm:text-sm">
                    {lang === 'ar' ? '49 اختباراً مؤتمتاً' : '49 Automated Tests'}
                  </span>
                  <span className="text-slate-400 font-mono text-xs mt-0.5 block">
                    {lang === 'ar' ? 'اجتياز بنسبة 100%' : '100% Pass Rate'}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons with accessible 44px min touch targets */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <a
                href="#projects"
                className="w-full sm:w-auto min-h-[44px] px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] transition-all flex items-center justify-center gap-2 group"
              >
                <span>{lang === 'ar' ? 'استعراض المشاريع العملاقة' : 'Explore Flagship Projects'}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
              </a>

              <button
                onClick={() => setIsCVModalOpen(true)}
                className="w-full sm:w-auto min-h-[44px] px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-400 text-slate-100 font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(56,189,248,0.15)] group"
              >
                <FileDown className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform shrink-0" />
                <span>{lang === 'ar' ? 'توليد السيرة الذاتية الذكية' : 'Generate Custom CV (PDF)'}</span>
              </button>

              <a
                href="#contact"
                className="w-full sm:w-auto min-h-[44px] px-5 py-3.5 rounded-xl border border-slate-800 hover:border-slate-600 text-slate-300 font-semibold text-sm transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{lang === 'ar' ? 'تواصل معي' : 'Contact Me'}</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: 3D Interactive Avatar with Fast Void Emergence */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex justify-center items-center z-10 order-1 lg:order-2"
          >
            <InteractiveAvatar imageSrc={profile.heroAvatarUrl || "/drama_hero.png"} />
          </motion.div>
        </div>
      </section>
    </VoidEmergence>
  );
};
