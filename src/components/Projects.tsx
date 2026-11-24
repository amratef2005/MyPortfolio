import React, { useState, useMemo, useEffect } from 'react';
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
  Sparkles
} from 'lucide-react';

export const Projects: React.FC = () => {
  const { projects, lang } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('All');

  // Dynamically compute available categories
  const categories = useMemo(() => {
    const rawCategories = Array.from(new Set(projects.map(p => p.category))).filter(Boolean);
    const catMap: Record<string, { labelAr: string; labelEn: string }> = {
      'UI/UX Design': { labelAr: 'تصميم واجهات وتجربة مستخدم', labelEn: 'UI/UX Design' },
      'Mobile Apps': { labelAr: 'تطبيقات الهاتف', labelEn: 'Mobile Apps' },
      'Web & SaaS': { labelAr: 'مواقع ومنصات سحابية', labelEn: 'Web & SaaS' },
      'Design Systems': { labelAr: 'أنظمة التصميم', labelEn: 'Design Systems' },
      'Full-Stack': { labelAr: 'تطوير وتصميم', labelEn: 'Full-Stack' },
      '.NET & Backend': { labelAr: 'أنظمة خلفية', labelEn: 'Backend' },
      'Cloud & SaaS': { labelAr: 'سحابي و SaaS', labelEn: 'Cloud & SaaS' },
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
    <section id="projects" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background Soft Orange Glow */}
      <div 
        className="absolute top-1/2 left-0 w-[450px] h-[450px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255, 87, 34, 0.1) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title & Filter Tabs */}
        <AssembleItem direction="top">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div className="text-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121215] border border-orange-500/20 text-[#FF7A00] text-xs font-mono mb-3">
                <Palette className="w-3.5 h-3.5 text-[#FF5722]" />
                <span>{lang === 'ar' ? 'معرض الأعمال ودراسات الحالة' : 'Selected Works & Case Studies'}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.2]">
                {lang === 'ar' ? (
                  <>
                    تصاميم استثنائية تركز على <span className="text-[#FF5722] drop-shadow-[0_0_20px_rgba(255,87,34,0.4)]">المستخدم والنمو</span>
                  </>
                ) : (
                  <>
                    Crafted Projects Driven by <span className="text-[#FF5722] drop-shadow-[0_0_20px_rgba(255,87,34,0.4)]">User Empathy & Growth</span>
                  </>
                )}
              </h2>
            </div>

            {/* Filter Pills */}
            {categories.length > 1 && (
              <div className="flex items-center gap-1.5 bg-[#0e0e12] p-1.5 rounded-2xl border border-white/10 self-start md:self-auto overflow-x-auto max-w-full shrink-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setFilter(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold whitespace-nowrap transition-all shrink-0 ${
                      filter === cat.id
                        ? 'bg-gradient-to-r from-[#FF5722] to-[#FF7A00] text-white shadow-[0_0_15px_rgba(255,87,34,0.4)]'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {lang === 'ar' ? cat.labelAr : cat.labelEn}
                  </button>
                ))}
              </div>
            )}
          </div>
        </AssembleItem>

        {/* Projects Cards Grid */}
        <div className={filteredProjects.length === 1 ? 'max-w-4xl mx-auto' : 'grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch'}>
          {filteredProjects.map((project, idx) => {
            const isLeft = idx % 2 === 0;

            return (
              <AssembleItem 
                key={project.id}
                direction={isLeft ? 'left' : 'right'}
                distance={100}
                className="h-full"
              >
                <div className="rounded-3xl bg-[#0e0e12] border border-white/10 hover:border-orange-500/40 p-6 sm:p-7 flex flex-col justify-between group overflow-hidden transition-all duration-300 shadow-[0_12px_32px_rgba(0,0,0,0.7)] hover:shadow-[0_16px_40px_rgba(255,87,34,0.15)] h-full relative">
                  
                  {/* Top Glowing Gradient Bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF5722] via-[#FF7A00] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div>
                    {/* Project Visual / Thumbnail Mockup Preview */}
                    <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden bg-[#18181f] border border-white/5 mb-6 group-hover:border-orange-500/30 transition-colors flex items-center justify-center">
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#15151c] to-[#09090b] text-slate-500 group-hover:text-orange-400/80 transition-colors p-6 text-center">
                          <Layers className="w-12 h-12 mb-3 text-[#FF5722]/60 group-hover:text-[#FF5722] transition-colors" />
                          <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
                            {lang === 'ar' ? (project.category || 'دراسة حالة وتصميم تفاعلي') : (project.category || 'Case Study & Interactive Design')}
                          </span>
                        </div>
                      )}

                      {/* Floating Badge */}
                      <div className="absolute top-3 start-3">
                        <span className="px-3 py-1 rounded-full bg-[#050505]/85 backdrop-blur-md border border-orange-500/30 text-[#FF7A00] text-xs font-mono font-bold shadow-lg">
                          {lang === 'ar' ? (project.badgeAr || project.badge || 'UI/UX Case Study') : (project.badge || 'UI/UX Case Study')}
                        </span>
                      </div>
                    </div>

                    {/* Category & Title */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono text-orange-400/90 font-semibold uppercase tracking-wider">
                        {lang === 'ar' ? (project.category || 'تصميم واجهات') : project.category}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-white group-hover:text-[#FF7A00] transition-colors mb-2">
                      {lang === 'ar' ? project.titleAr : project.title}
                    </h3>

                    <p className="text-xs sm:text-sm font-mono text-slate-400 mb-4 line-clamp-2">
                      {lang === 'ar' ? project.taglineAr : project.tagline}
                    </p>

                    <p className="text-slate-300 text-sm leading-relaxed mb-6 line-clamp-3">
                      {lang === 'ar' ? project.descriptionAr : project.description}
                    </p>
                  </div>

                  <div>
                    {/* Technologies / Tools Tags */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6 pt-4 border-t border-white/5">
                        {project.technologies.slice(0, 5).map((tech, i) => (
                          <span 
                            key={i}
                            className="px-2.5 py-1 rounded-lg bg-[#18181f] text-slate-300 text-xs font-mono border border-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action Links */}
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-[#FF7A00] hover:text-white text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-95"
                      >
                        <Eye className="w-4 h-4" />
                        <span>{lang === 'ar' ? 'عرض دراسة الحالة' : 'View Case Study'}</span>
                      </button>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#18181f] hover:bg-[#22222b] border border-white/10 text-slate-300 hover:text-white transition-colors"
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
