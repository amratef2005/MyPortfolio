import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { SignatureGlowAvatar } from './SignatureGlowAvatar';
import { VoidEmergence } from './motion/KineticAssemble';
import { motion } from 'framer-motion';
import { 
  Send, 
  MapPin, 
  Activity, 
  ArrowUpRight,
  Layers,
  Palette,
  CheckCircle2,
  FileDown
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { profile, lang } = usePortfolio();

  return (
    <VoidEmergence className="overflow-hidden">
      <section id="hero" className="relative min-h-[85vh] pt-20 sm:pt-32 pb-8 sm:pb-16 lg:pb-20 flex items-center justify-center">
        
        {/* Soft Background Radial Light */}
        <div 
          className="absolute top-1/4 -right-16 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full blur-[140px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255, 87, 34, 0.18) 0%, transparent 70%)' }}
        />
        <div 
          className="absolute bottom-10 -left-16 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full blur-[130px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(230, 74, 25, 0.12) 0%, transparent 70%)' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Greeting, Name, Orange Job Title, Location, Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col gap-6 text-start z-10 order-2 lg:order-1"
          >
            {/* Status / Availability Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#121215] border border-orange-500/25 text-[#FF7A00] text-xs sm:text-sm font-mono font-medium self-start shadow-[0_0_20px_rgba(255,87,34,0.15)]">
              <span className="w-2 h-2 rounded-full bg-[#FF5722] animate-ping" />
              <Activity className="w-3.5 h-3.5 text-[#FF7A00] shrink-0" />
              <span>
                {lang === 'ar' ? 'متاحة للمشاريع الحرة وعقود العمل' : 'Available for Freelance & Full-time Roles'}
              </span>
            </div>

            {/* Greeting + Large Name + Burnt Orange Title */}
            <div>
              <p className="text-xl sm:text-2xl font-light text-slate-300 tracking-wide font-sans">
                {lang === 'ar' ? (profile.heroGreetingAr || 'مرحباً، أنا') : (profile.heroGreeting || 'Hello, I am')}
              </p>
              
              <h1 className="text-[clamp(2.2rem,6vw,4rem)] font-black text-white leading-[1.15] tracking-tight mt-1">
                {lang === 'ar' ? (profile.nameAr || profile.shortNameAr || 'عمرو عاطف إمام محمود') : (profile.name || profile.shortName || 'Amr Atef Imam Mahmoud')}
              </h1>

              {/* Burnt Orange Title */}
              <div className="inline-block mt-2">
                <p className="text-[clamp(1.4rem,3.8vw,2.3rem)] font-extrabold text-[#FF5722] tracking-normal drop-shadow-[0_0_25px_rgba(255,87,34,0.45)]">
                  {lang === 'ar' 
                    ? (profile.titleAr || 'مطور نظم خلفية .NET') 
                    : (profile.title || '.NET Backend Developer')}
                </p>
              </div>

              {/* Core Technologies Banner */}
              <div className="mt-1">
                <span className="text-xs sm:text-sm font-mono text-orange-400/95 font-semibold tracking-wider">
                  C# • ASP.NET Core • SQL Server • PostgreSQL
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-slate-400 text-sm sm:text-base mt-2">
                <MapPin className="w-4 h-4 text-[#FF7A00] shrink-0" />
                <span>{lang === 'ar' ? (profile.locationAr || 'الإسماعيلية، مصر') : (profile.location || 'Ismailia, Egypt')}</span>
              </div>
            </div>

            {/* Bio snippet */}
            <p className="text-slate-300 text-base sm:text-lg leading-[1.8] max-w-2xl font-normal">
              {lang === 'ar'
                ? (profile.bioAr ? profile.bioAr.split('\n')[0] : 'طالب علوم حاسب ومطور نظم خلفية .NET بخبرة عملية في تصميم وتطوير أنظمة خلفية قابلة للتوسع باستخدام C# و ASP.NET Core، وبناء واجهات RESTful APIs وتطبيق Clean Architecture و CQRS.')
                : (profile.bio ? profile.bio.split('\n')[0] : 'Computer Science student and .NET Backend Developer with hands-on experience designing and developing scalable backend systems using C# and ASP.NET Core, building RESTful APIs, and implementing Clean Architecture & CQRS.')}
            </p>

            {/* Action Buttons: Hire Me + View Projects */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* "Hire Me" Button with Burnt Orange Glow */}
              <a
                href="#contact"
                className="flex items-center justify-center gap-2.5 h-12 sm:h-14 px-7 sm:px-9 rounded-2xl bg-gradient-to-r from-[#FF5722] via-[#FF6B00] to-[#FF7A00] hover:from-[#FF6B00] hover:to-[#FF8A00] text-white font-bold text-base shadow-[0_0_30px_rgba(255,87,34,0.45)] hover:shadow-[0_0_45px_rgba(255,87,34,0.7)] transition-all duration-300 active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>{lang === 'ar' ? 'وظفني الآن' : 'Hire Me'}</span>
              </a>

              {/* Secondary Button: Explore Projects */}
              <a
                href="#projects"
                className="flex items-center justify-center gap-2.5 h-12 sm:h-14 px-6 sm:px-8 rounded-2xl bg-[#121215] hover:bg-[#18181f] border border-orange-500/30 hover:border-orange-500/60 text-slate-200 hover:text-white font-semibold text-base transition-all duration-300"
              >
                <span>{lang === 'ar' ? 'تصفح المشاريع' : 'Explore Projects'}</span>
                <ArrowUpRight className="w-4 h-4 text-[#FF7A00]" />
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-white/10 max-w-lg">
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-[#FF5722]">
                  +{profile.yearsOfExperience || 3}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {lang === 'ar' ? 'سنوات خبرة' : 'Years Experience'}
                </span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-[#FF7A00]">
                  +{profile.completedProjects || 24}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {lang === 'ar' ? 'مشروع مكتمل' : 'Completed Projects'}
                </span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-emerald-400">
                  100%
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {lang === 'ar' ? 'اجتياز الاختبارات (49)' : 'Test Pass Rate (49)'}
                </span>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Signature Circular Glow Silhouette Avatar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex items-center justify-center order-1 lg:order-2 z-10"
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
    </VoidEmergence>
  );
};

export default Hero;
