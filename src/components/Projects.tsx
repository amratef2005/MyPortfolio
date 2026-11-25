import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { AssembleItem } from './motion/KineticAssemble';
import {
  Rocket,
  ArrowUpRight,
  Layers,
  ExternalLink,
  Eye,
  Palette,
  CheckCircle2,
  ShieldCheck,
  Cpu
} from 'lucide-react';

export const Projects: React.FC = () => {
  const { projects, lang } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('All');

  // Dynamically compute available categories
  const categories = useMemo(() => {
    const rawCategories = Array.from(new Set(projects.map(p => p.category))).filter(Boolean);
    const catMap: Record<string, { labelAr: string; labelEn: string }> = {
      '.NET & Backend': { labelAr: 'أنظمة خلفية .NET', labelEn: '.NET & Backend' },
      'Clean Architecture': { labelAr: 'معمارية نظيفة', labelEn: 'Clean Architecture' },
      'Web & SaaS': { labelAr: 'منصات سحابية', labelEn: 'Web & SaaS' },
      'Backend': { labelAr: 'أنظمة خلفية', labelEn: 'Backend' },
    };

    const list = [{ id: 'All', labelAr: 'الكل', labelEn: 'All' }];
    rawCategories.forEach(cat => {
      const mapping = catMap[cat] || { labelAr: cat, labelEn: cat };
      list.push({ id: cat, labelAr: mapping.labelAr, labelEn: mapping.labelEn });
    });
    return list;
  }, [projects]);

  // Reset filter to 'All' if selected category is missing
  useEffect(() => {
    if (filter !== 'All' && !projects.some(p => p.category === filter)) {
      setFilter('All');
    }
  }, [filter, projects]);

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-8 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Background Soft Theme Glow */}
      <div
        className="absolute top-1/2 left-0 w-[450px] h-[450px] rounded-full blur-[64px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(var(--theme-primary-rgb), 0.1) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title & Filter Tabs */}
        <AssembleItem direction="top">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 lg:mb-14 gap-6">
            <div className="text-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121215] border border-theme-primary/20 text-theme-secondary text-xs font-mono mb-3">
                <Layers className="w-3.5 h-3.5 text-theme-primary" />
                <span>{lang === 'ar' ? 'المشاريع والمعمارية التقنية' : 'Architecture & Backend Projects'}</span>
              </div>
              <h2 className="font-poster text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-wide leading-[1.08]">
                {lang === 'ar' ? (
                  <>
                    مشاريع برمجية بمعمارية نظيفة <span className="text-theme-primary drop-shadow-[0_0_20px_rgba(var(--theme-primary-rgb),0.4)]">وفصل محكم للطبقات</span>
                  </>
                ) : (
                  <>
                    Architectural Systems Driven by <span className="text-theme-primary drop-shadow-[0_0_20px_rgba(var(--theme-primary-rgb),0.4)]">Clean Code & Reliability</span>
                  </>
                )}
              </h2>
            </div>

            {/* Filter Pills with Horizontal Scroll on Mobile */}
            {categories.length > 1 && (
              <div className="flex items-center gap-1.5 bg-[#0c0c0e] p-1.5 rounded-lg border border-white/10 self-start md:self-auto overflow-x-auto max-w-full shrink-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {categories.map((cat) => {
                  const isActive = filter === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setFilter(cat.id)}
                      className={`relative px-3.5 sm:px-4 py-2 rounded-md text-xs font-mono uppercase tracking-wider font-semibold whitespace-nowrap transition-colors shrink-0 ${isActive ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="projectFilterPill"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-theme-primary to-theme-secondary shadow-[0_0_15px_rgba(var(--theme-primary-rgb),0.4)]"
                        />
                      )}
                      <span className="relative z-10">{lang === 'ar' ? cat.labelAr : cat.labelEn}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </AssembleItem>

        {/* Projects Cards Grid */}
        <div className={filteredProjects.length === 1 ? 'max-w-4xl mx-auto' : 'grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch'}>
          {filteredProjects.map((project, idx) => {
            const isLeft = idx % 2 === 0;
            const indexStr = String(idx + 1).padStart(2, '0');

            return (
              <AssembleItem
                key={project.id}
                direction={isLeft ? 'left' : 'right'}
                distance={28}
                className="h-full"
              >
                <div className="rounded-3xl bg-[#0e0e12] border border-white/10 hover:border-theme-primary/40 p-4 sm:p-6 lg:p-7 flex flex-col justify-between group overflow-hidden transition-all duration-300 shadow-[0_12px_32px_rgba(0,0,0,0.7)] hover:shadow-[0_16px_40px_rgba(var(--theme-primary-rgb),0.18)] h-full relative">

                  {/* Top Glowing Gradient Bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-theme-primary via-theme-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Top Crimson Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-theme-primary via-theme-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div>
                    {/* Top Badges Header Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#14141a] border border-theme-primary/30 text-theme-secondary text-[11px] sm:text-xs font-mono font-bold shadow-sm">
                        <Layers className="w-3.5 h-3.5 text-theme-primary shrink-0" />
                        <span>{lang === 'ar' ? 'معمارية نظيفة و CQRS' : 'Clean Architecture & CQRS'}</span>
                      </span>

                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0a1810] border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{lang === 'ar' ? '49 اختبار مؤتمت • 100%' : '49 Tests • 100% Pass'}</span>
                      </span>
                    </div>

                    {/* Project Visual / Thumbnail Mockup Preview with Cinematic Lighting */}
                    <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden bg-[#101015] border border-white/10 mb-5 group-hover:border-theme-primary/40 transition-all duration-500 flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.8)] group-hover:shadow-[0_16px_45px_rgba(var(--theme-primary-rgb),0.22)]">

                      {/* Ambient Volumetric Backdrop Light */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: 'radial-gradient(ellipse at center, rgba(var(--theme-primary-rgb), 0.18) 0%, rgba(var(--theme-secondary-rgb), 0.06) 40%, transparent 75%)' }}
                      />

                      {/* Specular Light Sheen Sweep Across Mockup */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none z-20" />

                      {/* Inner Cinematic Vignette */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(5,5,8,0.7)_100%)] pointer-events-none z-10" />

                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95 group-hover:brightness-105"
                        />
                      ) : (
                        /* Cinematic High-Tech Architectural Mockup Frame */
                        <div className="w-full h-full flex flex-col items-center justify-center relative p-4 z-10">
                          {/* Glowing Schematic Frame */}
                          <div className="w-full max-w-[270px] sm:max-w-xs p-4 sm:p-5 rounded-2xl bg-[#08080c]/90 border border-theme-primary/25 group-hover:border-theme-primary/50 shadow-[0_0_35px_rgba(var(--theme-primary-rgb),0.12),inset_0_0_20px_rgba(var(--theme-primary-rgb),0.06)] flex flex-col items-center justify-center transition-all duration-300">

                            {/* Glowing Central Icon with Dual Ring */}
                            <div className="relative mb-2.5 flex items-center justify-center">
                              <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-theme-primary to-theme-secondary blur-lg opacity-40 group-hover:opacity-80 transition-opacity" />
                              <div className="w-11 h-11 rounded-xl bg-[#121218] border border-theme-primary/40 flex items-center justify-center text-theme-primary relative z-10 shadow-lg">
                                <Layers className="w-5 h-5 text-theme-primary group-hover:scale-110 transition-transform duration-300" />
                              </div>
                            </div>

                            {/* Tech Stack Subtitle */}
                            <span className="font-mono text-[11px] sm:text-xs font-bold text-theme-secondary tracking-wider uppercase">
                              .NET 10 • ASP.NET Core
                            </span>

                            <span className="text-[10px] font-mono text-slate-400 mt-1 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                              <span className="text-emerald-400 font-semibold">{lang === 'ar' ? 'اختبارات مؤتمتة موثقة' : 'Automated Tests Verified'}</span>
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Category & Title */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono text-theme-secondary/90 font-semibold uppercase tracking-wider">
                        {lang === 'ar' ? (project.category || '.NET ونظم خلفية') : (project.category || '.NET & Backend')}
                      </span>
                      <div className="min-w-0">
                        <span className="block text-[11px] font-mono text-slate-400 font-semibold uppercase tracking-[0.15em]">
                          {lang === 'ar' ? (project.category || '.NET ونظم خلفية') : (project.category || '.NET & Backend')}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-theme-primary transition-colors mt-0.5">
                          {lang === 'ar' ? project.titleAr : project.title}
                        </h3>
                      </div>
                    </div>

                    <h3 className="text-2xl font-black text-white group-hover:text-theme-secondary transition-colors mb-2">
                      {lang === 'ar' ? project.titleAr : project.title}
                    </h3>

                    <p className="text-xs sm:text-sm font-mono text-slate-400 mb-4 line-clamp-2">
                      {lang === 'ar' ? project.taglineAr : project.tagline}
                    </p>

                    <p className="text-slate-300 text-sm leading-relaxed mb-5 line-clamp-3">
                      {lang === 'ar' ? project.descriptionAr : project.description}
                    </p>
                  </div>

                  <div>
                    {/* Technologies / Tools Tags */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-5 pt-4 border-t border-white/10">
                        {project.technologies.slice(0, 5).map((tech, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-md bg-[#121215] text-slate-300 text-[11px] font-mono uppercase tracking-wider border border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action Links */}
                    <div className="flex items-center gap-3 pt-1">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl bg-theme-primary/10 hover:bg-theme-primary/20 border border-theme-primary/30 text-theme-secondary hover:text-white text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-95"
                      >
                        <span className="flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          <span>{lang === 'ar' ? 'عرض دراسة الحالة' : 'View Case Study'}</span>
                        </span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center w-11 h-11 rounded-lg bg-[#121215] hover:bg-[#1a1a1f] border border-white/10 text-slate-300 hover:text-white transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              </AssembleItem>
            );
          })}
        </div>

      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;
