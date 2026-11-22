import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { AssembleItem } from './motion/KineticAssemble';
import { 
  Briefcase, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  Globe, 
  Cpu, 
  Zap, 
  Github 
} from 'lucide-react';

export const Experience: React.FC = () => {
  const { experiences, lang } = usePortfolio();

  return (
    <section id="experience" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AssembleItem direction="top">
          <div className="text-start mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-mono mb-3">
              <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
              <span>{lang === 'ar' ? 'الخبرات المهنية والعملية' : 'Professional Work Experience'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              {lang === 'ar' ? (
                <>
                  خبرة عملية في بناء <span className="gradient-text-cyan">أنظمة إنتاجية حية</span>
                </>
              ) : (
                <>
                  Engineering <span className="gradient-text-cyan">Production-Ready</span> Architectures
                </>
              )}
            </h2>
            <p className="text-slate-400 mt-4 text-sm sm:text-base max-w-3xl leading-relaxed">
              {lang === 'ar'
                ? 'سجل حافل بالعمل على منصات سحابية تجارية متكاملة؛ تصميم المعمارية الخلفية، عزل بيانات المشتركين، أمان الجلسات، والاتصال اللحظي في بيئات العمل الواقعية.'
                : 'Hands-on experience engineering high-throughput SaaS platforms, building secure multi-tenant backends, token security, and real-time processing in production.'}
            </p>
          </div>
        </AssembleItem>

        {/* Experience Cards */}
        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <AssembleItem 
              key={exp.id} 
              direction={idx % 2 === 0 ? 'left' : 'right'}
              distance={80}
            >
              <div className="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-10 relative group overflow-hidden border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300">
                {/* Top Accent Gradient Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Header: Role, Company & Meta */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800/80 text-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 mb-2">
                      <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium">
                        {lang === 'ar' ? (exp.badgeAr || exp.badge) : exp.badge}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono">
                        {lang === 'ar' ? exp.typeAr : exp.type}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {lang === 'ar' ? exp.roleAr : exp.role}
                    </h3>

                    <h4 className="text-base sm:text-lg text-cyan-400 font-semibold mt-1">
                      {lang === 'ar' ? exp.companyAr : exp.company}
                    </h4>
                  </div>

                  {/* Meta: Period & Location & Live Link */}
                  <div className="flex flex-wrap items-center gap-3 lg:flex-col lg:items-end">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{lang === 'ar' ? exp.periodAr : exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800">
                      <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{lang === 'ar' ? exp.locationAr : exp.location}</span>
                    </div>
                    {exp.liveUrl && (
                      <a
                        href={exp.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold transition-all shadow-[0_0_12px_rgba(56,189,248,0.2)]"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>{lang === 'ar' ? 'زيارة المنصة الحية' : 'Live Platform'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Description / Summary */}
                <div className="py-6 text-start">
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {lang === 'ar' ? exp.summaryAr : exp.summary}
                  </p>
                </div>

                {/* Key Metrics Grid */}
                {exp.metrics && exp.metrics.length > 0 && (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 my-2 mb-8 text-start">
                    {exp.metrics.map((metric, mIdx) => (
                      <div 
                        key={mIdx} 
                        className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-3.5 hover:border-cyan-500/30 transition-all"
                      >
                        <span className="block text-[11px] font-mono text-slate-400 mb-1">
                          {lang === 'ar' ? (metric.labelAr || metric.label) : metric.label}
                        </span>
                        <span className="block text-sm sm:text-base font-bold text-white font-mono">
                          {lang === 'ar' ? (metric.valueAr || metric.value) : metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Key Responsibilities & Milestones */}
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <div className="text-start mb-8">
                    <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-cyan-400" />
                      <span>{lang === 'ar' ? 'أبرز الإنجازات والمسؤوليات الهندسية' : 'Key Engineering Responsibilities & Impact'}</span>
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(lang === 'ar' ? (exp.responsibilitiesAr || exp.responsibilities) : exp.responsibilities).map((item, rIdx) => (
                        <div key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies & Links Footer */}
                <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-start">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-300 font-medium hover:border-cyan-500/40 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {exp.githubUrl && (
                      <a
                        href={exp.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-mono transition-all"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                      </a>
                    )}
                    {exp.liveUrl && (
                      <a
                        href={exp.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs font-mono shadow-[0_0_15px_rgba(56,189,248,0.35)] transition-all"
                      >
                        <span>{lang === 'ar' ? 'استعراض المنصة' : 'Explore Platform'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </AssembleItem>
          ))}
        </div>
      </div>
    </section>
  );
};
