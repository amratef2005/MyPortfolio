import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { AssembleItem } from './motion/KineticAssemble';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  ExternalLink, 
  Layers, 
  CheckCircle2,
  Award
} from 'lucide-react';

export const Experience: React.FC = () => {
  const { experiences, profile, lang } = usePortfolio();

  return (
    <section id="experience" className="py-8 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Background Subtle Orange Glow */}
      <div 
        className="absolute top-1/3 -right-20 w-[450px] h-[450px] rounded-full blur-[150px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255, 87, 34, 0.12) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header + Large Experience Number Highlight */}
        <AssembleItem direction="top">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-12 lg:mb-16 gap-6 sm:gap-8">
            <div className="text-start max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121215] border border-orange-500/20 text-[#FF7A00] text-xs font-mono mb-3">
                <Briefcase className="w-3.5 h-3.5 text-[#FF5722]" />
                <span>{lang === 'ar' ? 'المسيرة المهنية والخبرات' : 'Career & Experience'}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.2]">
                {lang === 'ar' ? (
                  <>
                    خبرة عملية في بناء <span className="text-[#FF5722] drop-shadow-[0_0_20px_rgba(255,87,34,0.4)]">النظم الخلفية والمنصات السحابية</span>
                  </>
                ) : (
                  <>
                    Production Experience in <span className="text-[#FF5722] drop-shadow-[0_0_20px_rgba(255,87,34,0.4)]">Backend Systems & Architecture</span>
                  </>
                )}
              </h2>
              <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
                {lang === 'ar'
                  ? 'مسيرة مهنية في تصميم وبناء النظم الخلفية، المعماريات البرمجية، وتطوير منصات SaaS وقواعد البيانات.'
                  : 'Professional track record architecting and developing backend systems, scalable SaaS platforms, and relational databases.'}
              </p>
            </div>

            {/* Prominent Orange Number for Years of Experience */}
            <div className="flex items-center gap-5 p-5 sm:p-6 rounded-3xl bg-[#0e0e12] border border-orange-500/30 shadow-[0_0_35px_rgba(255,87,34,0.15)] self-start lg:self-auto shrink-0">
              <span className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#FF5722] drop-shadow-[0_0_25px_rgba(255,87,34,0.5)] font-mono">
                +{profile.yearsOfExperience || 2}
              </span>
              <div className="flex flex-col">
                <span className="text-white font-bold text-base sm:text-lg leading-tight">
                  {lang === 'ar' ? 'سنوات من الخبرة' : 'Years of Experience'}
                </span>
                <span className="text-xs sm:text-sm text-slate-400 mt-1 max-w-[180px]">
                  {lang === 'ar' ? 'في تطوير النظم الخلفية ومعمارية البرمجيات' : 'in .NET Backend Engineering & Architecture'}
                </span>
              </div>
            </div>
          </div>
        </AssembleItem>

        {/* Vertical Timeline Container */}
        <div className="relative mt-8">
          
          {/* Vertical Central Glowing Line */}
          <div className="absolute top-0 bottom-0 left-4 sm:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#FF5722] via-[#FF7A00] to-orange-950/20 shadow-[0_0_12px_rgba(255,87,34,0.5)]" />

          {/* Timeline Items */}
          <div className="space-y-12 sm:space-y-16">
            {experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div 
                  key={exp.id}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Glowing Node Dot on Timeline */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#050505] border-2 border-[#FF5722] flex items-center justify-center shadow-[0_0_18px_rgba(255,87,34,0.8)] z-20">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF7A00] animate-ping" />
                  </div>

                  {/* Empty Spacer Column for Desktop */}
                  <div className="hidden sm:block sm:w-1/2" />

                  {/* Card Content Column */}
                  <div className="w-full sm:w-1/2 ps-12 sm:ps-0 sm:px-8">
                    <AssembleItem direction={isEven ? 'left' : 'right'} distance={60}>
                      <div className="p-4 sm:p-6 lg:p-8 rounded-3xl bg-[#0e0e12]/90 border border-white/10 hover:border-orange-500/40 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.6)] group relative overflow-hidden">
                        
                        {/* Hover Ambient Corner Glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all pointer-events-none" />

                        {/* Card Header: Role & Period */}
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#FF7A00] text-xs font-mono font-medium">
                            <Calendar className="w-3.5 h-3.5" />
                            {lang === 'ar' ? (exp.periodAr || exp.period) : exp.period}
                          </span>

                          {exp.location && (
                            <span className="inline-flex items-center gap-1 text-slate-400 text-xs">
                              <MapPin className="w-3 h-3 text-[#FF5722]" />
                              {lang === 'ar' ? (exp.locationAr || exp.location) : exp.location}
                            </span>
                          )}
                        </div>

                        {/* Role Title */}
                        <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-[#FF7A00] transition-colors">
                          {lang === 'ar' ? (exp.roleAr || exp.role) : exp.role}
                        </h3>

                        {/* Company Name */}
                        <p className="text-sm font-semibold text-orange-400/90 mt-1">
                          {lang === 'ar' ? (exp.companyAr || exp.company) : exp.company}
                        </p>

                        {/* Description */}
                        <p className="text-slate-300 text-sm leading-relaxed mt-4">
                          {lang === 'ar' ? (exp.summaryAr || exp.summary) : exp.summary}
                        </p>

                        {/* Tech / Deliverables Pills */}
                        {exp.technologies && exp.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-white/5">
                            {exp.technologies.map((tech, i) => (
                              <span 
                                key={i}
                                className="px-2.5 py-1 rounded-lg bg-[#18181f] text-slate-300 text-xs font-mono border border-white/5 hover:border-orange-500/30 transition-colors"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Responsibilities bullet points if present */}
                        {exp.responsibilities && exp.responsibilities.length > 0 && (
                          <ul className="mt-4 space-y-1.5 text-xs text-slate-400">
                            {(lang === 'ar' ? (exp.responsibilitiesAr || exp.responsibilities) : exp.responsibilities)
                              .slice(0, 3)
                              .map((item, rIdx) => (
                                <li key={rIdx} className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] mt-1.5 shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                          </ul>
                        )}

                        {/* External Link */}
                        {exp.liveUrl && (
                          <div className="mt-5 pt-3">
                            <a 
                              href={exp.liveUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#FF7A00] hover:text-[#FF8A00] font-semibold"
                            >
                              <span>{lang === 'ar' ? 'عرض تفاصيل المشروع' : 'View Live Product'}</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        )}

                      </div>
                    </AssembleItem>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Experience;
