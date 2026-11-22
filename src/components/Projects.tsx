import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { AssembleItem } from './motion/KineticAssemble';
import { 
  Rocket, 
  ArrowUpRight
} from 'lucide-react';

export const Projects: React.FC = () => {
  const { projects, lang } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const categories = [
    { id: 'All', labelAr: 'الكل', labelEn: 'All' },
    { id: 'Cloud & SaaS', labelAr: 'سحابي و SaaS', labelEn: 'Cloud & SaaS' },
    { id: '.NET & Backend', labelAr: '.NET وأنظمة خلفية', labelEn: '.NET & Backend' }
  ];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-0 w-80 sm:w-96 h-80 sm:h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title & Filter: Assembles from Top and disperses up */}
        <AssembleItem direction="top">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div className="text-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-mono mb-3">
                <Rocket className="w-3.5 h-3.5 text-cyan-400" />
                <span>{lang === 'ar' ? 'المشاريع المؤسسية الكبرى' : 'Flagship Systems'}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                {lang === 'ar' ? (
                  <>
                    معمارية <span className="gradient-text-cyan">أنظمة واقعية</span> تم بناؤها بأحدث التقنيات
                  </>
                ) : (
                  <>
                    Production-Ready <span className="gradient-text-cyan">Architectures</span>
                  </>
                )}
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 self-start md:self-auto overflow-x-auto max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all shrink-0 ${
                    filter === cat.id
                      ? 'bg-cyan-500 text-white shadow-[0_0_12px_rgba(56,189,248,0.35)]'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {lang === 'ar' ? cat.labelAr : cat.labelEn}
                </button>
              ))}
            </div>
          </div>
        </AssembleItem>

        {/* Projects Cards Grid: Converges from Edges & Disperses Outward */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {filteredProjects.map((project, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <AssembleItem 
                key={project.id}
                direction={isLeft ? 'left' : 'right'}
                distance={120}
                rotation={isLeft ? -3 : 3}
                className="h-full"
              >
                <div className="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative group overflow-hidden border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 h-full">
                  {/* Top Accent Gradient Line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="text-start">
                    {/* Header Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium">
                        {lang === 'ar' ? (project.badgeAr || project.badge) : project.badge}
                      </span>
                      <span className="text-xs font-mono text-slate-400 bg-slate-900/80 px-2.5 py-0.5 rounded-md">
                        {lang === 'ar' 
                          ? (project.category === 'Cloud & SaaS' ? 'سحابي وأنظمة SaaS' : project.category === '.NET & Backend' ? '.NET وأنظمة خلفية' : project.category)
                          : project.category}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-cyan-400 transition-colors mb-2">
                      {lang === 'ar' ? project.titleAr : project.title}
                    </h3>

                    {/* Tagline */}
                    <p className="text-xs sm:text-sm font-mono text-cyan-300/90 mb-4">
                      {lang === 'ar' ? project.taglineAr : project.tagline}
                    </p>

                    {/* Short Description */}
                    <p className="text-slate-300 text-sm leading-relaxed mb-6 line-clamp-3">
                      {lang === 'ar' ? project.descriptionAr : project.description}
                    </p>

                    {/* Performance Metrics Chips */}
                    <div className="grid grid-cols-2 gap-2.5 mb-6">
                      {project.metrics.slice(0, 2).map((m, mIdx) => (
                        <div key={mIdx} className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800 text-center">
                          <span className="block text-cyan-400 font-mono font-bold text-sm sm:text-base">
                            {lang === 'ar' ? (m.valueAr || m.value) : m.value}
                          </span>
                          <span className="text-slate-400 text-[11px] font-mono">
                            {lang === 'ar' ? (m.labelAr || m.label) : m.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Architecture Highlights */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {(lang === 'ar' && project.architectureAr ? project.architectureAr : project.architecture).slice(0, 4).map((arch, aIdx) => (
                        <span
                          key={aIdx}
                          className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs font-mono"
                        >
                          {arch}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold text-xs sm:text-sm group/btn"
                    >
                      <span>{lang === 'ar' ? 'عرض المخطط والمعمارية بالتفصيل' : 'View Architecture Deep-Dive'}</span>
                      <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </button>

                    <div className="hidden sm:flex items-center gap-1.5">
                      {project.technologies.slice(0, 2).map((tech, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AssembleItem>
            );
          })}
        </div>
      </div>

      {/* Deep-Dive Architecture Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
