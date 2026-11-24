import React from 'react';
import { Project } from '../types';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  X, 
  ExternalLink, 
  Github, 
  Layers, 
  Cpu, 
  Database, 
  CheckCircle2, 
  ShieldCheck,
  Server
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { lang } = usePortfolio();

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-dark-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge & Title */}
        <div className="mt-2 mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-[#FF7A00] text-xs font-mono font-semibold mb-3">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5722]" />
            <span>{lang === 'ar' ? (project.badgeAr || project.badge) : project.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {lang === 'ar' ? project.titleAr : project.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-mono mt-1">
            {lang === 'ar' ? project.taglineAr : project.tagline}
          </p>
        </div>

        {/* Performance Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 p-4 rounded-2xl bg-[#09090b] border border-orange-500/20">
          {project.metrics.map((metric, idx) => (
            <div key={idx} className="text-center p-2">
              <span className="block text-[#FF5722] font-mono font-bold text-base sm:text-lg">
                {lang === 'ar' ? (metric.valueAr || metric.value) : metric.value}
              </span>
              <span className="text-slate-400 text-xs font-medium">
                {lang === 'ar' ? (metric.labelAr || metric.label) : metric.label}
              </span>
            </div>
          ))}
        </div>

        {/* Project Description */}
        <div className="mb-6">
          <h4 className="text-white font-bold text-base mb-2 flex items-center gap-2">
            <Server className="w-4 h-4 text-[#FF7A00]" />
            <span>{lang === 'ar' ? 'نظرة عامة على دراسة الحالة' : 'Case Study Overview'}</span>
          </h4>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {lang === 'ar' ? project.descriptionAr : project.description}
          </p>
        </div>

        {/* Architecture Breakdown */}
        <div className="mb-6">
          <h4 className="text-white font-bold text-base mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#FF5722]" />
            <span>{lang === 'ar' ? 'المنهجية وتجربة المستخدم' : 'UX Methodology & Architecture'}</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {(lang === 'ar' && project.architectureAr ? project.architectureAr : project.architecture).map((arch, idx) => (
              <span 
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-mono font-medium"
              >
                {arch}
              </span>
            ))}
          </div>
        </div>

        {/* Deep Dive Features */}
        <div className="mb-6">
          <h4 className="text-white font-bold text-base mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'ar' ? 'الميزات الهندسية ونقاط القوة' : 'Key Engineering Highlights'}</span>
          </h4>
          <ul className="grid grid-cols-1 gap-2.5">
            {(lang === 'ar' && project.featuresAr ? project.featuresAr : project.features).map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies Stack */}
        <div className="mb-8">
          <h4 className="text-white font-bold text-base mb-3 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#FF7A00]" />
            <span>{lang === 'ar' ? 'التقنيات والمكتبات المستخدمة' : 'Technologies & Libraries'}</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <span 
                key={idx}
                className="px-3 py-1 rounded-md bg-[#18181f] border border-white/5 text-slate-300 text-xs font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-4 pt-4 border-t border-white/10">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#18181f] hover:bg-[#22222b] text-slate-200 text-sm font-semibold transition-colors border border-white/10"
            >
              <Github className="w-4 h-4" />
              <span>{lang === 'ar' ? 'مستودع الكود (GitHub)' : 'GitHub Repository'}</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5722] to-[#FF7A00] hover:from-[#FF6B00] hover:to-[#FF8A00] text-white text-sm font-semibold transition-colors shadow-[0_0_20px_rgba(255,87,34,0.4)]"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{lang === 'ar' ? 'معاينة النموذج الحي' : 'Live Interactive Demo'}</span>
            </a>
          )}
          <button
            onClick={onClose}
            className="mr-auto px-5 py-2.5 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white text-sm transition-colors"
          >
            {lang === 'ar' ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
