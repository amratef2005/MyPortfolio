import React, { useState } from 'react';
import { MoreVertical, Plus, Check, Circle, FolderGit2, Cpu, Award, Clock, ArrowUpRight } from 'lucide-react';
import { Project, Certificate, SkillCategory, ContactMessage } from '@shared/types';
import { usePortfolio } from '@/app/providers/PortfolioContext';
import { adminTranslations } from '@modules/admin/i18n/adminTranslations';

interface BentoOverviewProps {
  projects: Project[];
  certificates: Certificate[];
  skills: SkillCategory[];
  messages: ContactMessage[];
  onNewProject: () => void;
  onNavigate: (tab: string) => void;
}

export const BentoOverview: React.FC<BentoOverviewProps> = ({
  projects,
  certificates,
  skills,
  messages,
  onNewProject,
  onNavigate,
}) => {
  const { lang } = usePortfolio();
  const t = adminTranslations[lang].overview;

  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly'>('weekly');
  const [doneMap, setDoneMap] = useState<{ [key: string]: boolean }>({ '1': true, '2': false });

  const totalSkills = skills.reduce((acc, cat) => acc + cat.skills.length, 0);
  const unreadMessages = messages.filter((m) => !m.read).length;
  const readiness = Math.min(
    100,
    Math.round(
      (projects.length > 0 ? 30 : 0) +
        (certificates.length > 0 ? 24 : 0) +
        (totalSkills > 0 ? 25 : 0) +
        15
    )
  );

  const ringRadius = 32;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference * (1 - readiness / 100);

  const barHeights = [38, 62, 45, 84, 72, 54];
  const barLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  const pendingItems = [
    { id: '1', title: t.task1Title, sub: `${projects.length} ${t.task1Sub}`, done: !!doneMap['1'] },
    { id: '2', title: t.task2Title, sub: `${unreadMessages} ${t.task2Sub}`, done: !!doneMap['2'] },
  ];

  const togglePending = (id: string) => {
    setDoneMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      {/* Quantix Hero Header Row */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] font-mono text-slate-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-theme-primary animate-pulse" />
            <span>{t.lastUpdate}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">{t.subtitle}</p>
        </div>

        <button
          type="button"
          onClick={onNewProject}
          className="btn-sheen inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white border border-white/15 transition-all hover:brightness-110 active:scale-95 cursor-pointer"
          style={{
            background:
              'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))',
            boxShadow: '0 8px 24px -6px rgba(var(--theme-primary-rgb), 0.5)',
          }}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{t.newProject}</span>
        </button>
      </div>

      {/* Top 3 Quantix KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Active Projects + Area Sparkline */}
        <div
          onClick={() => onNavigate('projects')}
          className="quantix-card quantix-card-interactive relative overflow-hidden group cursor-pointer p-5 flex flex-col justify-between min-h-[185px]"
        >
          <div className="pointer-events-none absolute -top-10 -end-10 w-28 h-28 rounded-full bg-theme-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-theme-primary/15 border border-theme-primary/30 flex items-center justify-center text-theme-primary">
                <FolderGit2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">{t.activeProjects}</div>
                <div className="text-2xl font-bold text-white tabular-nums mt-0.5">{projects.length}</div>
              </div>
            </div>
            <MoreVertical className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
          </div>

          <div className="mt-4">
            <svg viewBox="0 0 200 54" className="w-full h-14 overflow-visible">
              <defs>
                <linearGradient id="bentoSparkGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--theme-primary)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="var(--theme-primary)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 44 C 28 40, 42 26, 68 32 C 95 38, 114 18, 140 22 C 165 26, 182 10, 200 6 L200 54 L0 54 Z"
                fill="url(#bentoSparkGrad)"
              />
              <path
                d="M0 44 C 28 40, 42 26, 68 32 C 95 38, 114 18, 140 22 C 165 26, 182 10, 200 6"
                fill="none"
                stroke="var(--theme-primary)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="200" cy="6" r="3" fill="var(--theme-primary)" />
            </svg>
          </div>
        </div>

        {/* Card 2: Skills & Certificates + Mini Bar Chart */}
        <div
          onClick={() => onNavigate('skills')}
          className="quantix-card quantix-card-interactive relative overflow-hidden group cursor-pointer p-5 flex flex-col justify-between min-h-[185px]"
        >
          <div className="pointer-events-none absolute -top-10 -end-10 w-28 h-28 rounded-full bg-theme-secondary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-theme-secondary/15 border border-theme-secondary/30 flex items-center justify-center text-theme-secondary">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">{t.skillsAndCerts}</div>
                <div className="text-2xl font-bold text-white tabular-nums mt-0.5">
                  {totalSkills}{' '}
                  <span className="text-xs font-mono text-slate-400 font-normal">
                    / {certificates.length} {t.certsLabel}
                  </span>
                </div>
              </div>
            </div>
            <MoreVertical className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
          </div>

          <div className="mt-4">
            <div className="flex items-end justify-between gap-2 h-12 px-1">
              {barHeights.map((h, i) => (
                <div key={barLabels[i]} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                  <div
                    className="w-full max-w-[12px] rounded-t-md transition-all"
                    style={{
                      height: `${h}%`,
                      background:
                        i >= 3
                          ? 'linear-gradient(180deg, var(--theme-secondary), var(--theme-primary))'
                          : 'rgba(var(--theme-primary-rgb), 0.35)',
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1.5 px-1">
              {barLabels.map((lbl) => (
                <span key={lbl}>{lbl}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Card 3: Portfolio Readiness + Circular Ring */}
        <div
          onClick={() => onNavigate('theme')}
          className="quantix-card quantix-card-interactive relative overflow-hidden group cursor-pointer p-5 flex flex-col justify-between min-h-[185px]"
        >
          <div className="pointer-events-none absolute -top-10 -end-10 w-28 h-28 rounded-full bg-theme-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-theme-primary/15 border border-theme-primary/30 flex items-center justify-center text-theme-primary">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">{t.readiness}</div>
                <div className="text-2xl font-bold text-white tabular-nums mt-0.5">{readiness}%</div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
              +{readiness}%
            </span>
          </div>

          <div className="flex items-center justify-center mt-2">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                <circle
                  cx="40"
                  cy="40"
                  r={ringRadius}
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="6"
                />
                <circle
                  cx="40"
                  cy="40"
                  r={ringRadius}
                  fill="none"
                  stroke="var(--theme-primary)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={ringCircumference}
                  strokeDashoffset={ringOffset}
                />
              </svg>
              <span className="absolute text-xs font-bold text-white tabular-nums">{readiness}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row: Activity Chart & Pending Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        <div
          className="quantix-card lg:col-span-8 p-5 flex flex-col justify-between gap-5"
        >
          <div>
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-white">{t.milestones}</h3>
              <button
                type="button"
                onClick={() => setTimeframe(timeframe === 'weekly' ? 'monthly' : 'weekly')}
                className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-slate-300 hover:bg-white/[0.08]"
              >
                {timeframe === 'weekly' ? t.timelineWeekly : t.timelineMonthly}
              </button>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">{t.milestoneTitle}</span>
              <span className="font-mono font-bold text-theme-primary">75%</span>
            </div>

            <div className="mt-2.5 relative h-1.5 rounded-full bg-white/[0.07] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: '75%',
                  background: 'linear-gradient(90deg, var(--theme-secondary), var(--theme-primary))',
                  boxShadow: '0 0 12px rgba(var(--theme-primary-rgb), 0.6)',
                }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1.5">
              {t.stages.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>

          <div className="pt-1">
            <svg viewBox="0 0 400 100" className="w-full h-24 overflow-visible">
              <defs>
                <linearGradient id="bentoMainArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--theme-primary)" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="var(--theme-primary)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[20, 48, 76].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={y}
                  x2="400"
                  y2={y}
                  stroke="rgba(255,255,255,0.05)"
                  strokeDasharray="3 3"
                />
              ))}
              <path
                d={
                  timeframe === 'weekly'
                    ? 'M0 88 C 55 78, 85 50, 130 60 C 185 72, 210 34, 265 42 C 315 50, 355 24, 400 10 L400 100 L0 100 Z'
                    : 'M0 80 C 60 62, 100 68, 155 46 C 210 22, 250 52, 310 30 C 350 16, 375 18, 400 8 L400 100 L0 100 Z'
                }
                fill="url(#bentoMainArea)"
              />
              <path
                d={
                  timeframe === 'weekly'
                    ? 'M0 88 C 55 78, 85 50, 130 60 C 185 72, 210 34, 265 42 C 315 50, 355 24, 400 10'
                    : 'M0 80 C 60 62, 100 68, 155 46 C 210 22, 250 52, 310 30 C 350 16, 375 18, 400 8'
                }
                fill="none"
                stroke="var(--theme-primary)"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              {t.days.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Tasks */}
        <div
          className="quantix-card lg:col-span-4 p-5 flex flex-col justify-between gap-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">{t.pendingTasks}</h3>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-theme-primary/15 text-theme-primary border border-theme-primary/25">
              {unreadMessages} {t.inboxBadge}
            </span>
          </div>

          <div className="space-y-2.5">
            {pendingItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => togglePending(item.id)}
                className="w-full p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] flex items-center justify-between gap-3 text-start transition-colors"
              >
                <div className="min-w-0">
                  <div className={`text-xs font-semibold truncate ${item.done ? 'text-slate-400 line-through' : 'text-white'}`}>
                    {item.title}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate mt-0.5">{item.sub}</div>
                </div>
                {item.done ? (
                  <span className="w-5 h-5 rounded-full bg-theme-primary flex items-center justify-center text-white shrink-0">
                    <Check className="w-3 h-3" />
                  </span>
                ) : (
                  <Circle className="w-5 h-5 text-slate-600 shrink-0" />
                )}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onNavigate('theme')}
            className="w-full py-2.5 rounded-xl text-xs font-semibold border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] hover:border-theme-primary/40 text-slate-200 transition-colors"
          >
            {t.customizeColorsBtn}
          </button>
        </div>
      </div>

      {/* Quantix-Style Market/Portfolio Overview Table */}
      <div
        className="quantix-card overflow-hidden"
      >
        <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-slate-400" />
            <div>
              <h3 className="text-sm font-semibold text-white">{t.tableTitle}</h3>
              <p className="text-[11px] text-slate-500">{t.tableSubtitle}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-theme-primary/15 hover:bg-theme-primary/25 border border-theme-primary/30 text-xs font-medium text-theme-primary transition-colors"
          >
            <span>{t.viewAll}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-start border-collapse">
            <thead>
              <tr className="border-b border-white/[0.06] text-[11px] font-mono text-slate-500">
                <th className="py-3 px-5 text-start font-medium">{t.colNo}</th>
                <th className="py-3 px-4 text-start font-medium">{t.colName}</th>
                <th className="py-3 px-4 text-start font-medium">{t.colCategory}</th>
                <th className="py-3 px-4 text-start font-medium">{t.colTech}</th>
                <th className="py-3 px-5 text-end font-medium">{t.colStatus}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05] text-xs">
              {projects.slice(0, 5).map((proj, idx) => (
                <tr
                  key={proj.id}
                  onClick={() => onNavigate('projects')}
                  className="hover:bg-white/[0.025] cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-5 font-mono text-slate-500">#{idx + 1}</td>
                  <td className="py-3.5 px-4 font-semibold text-white">
                    {lang === 'ar' ? proj.titleAr || proj.title : proj.title}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">{proj.category}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-400 truncate max-w-[200px]">
                    {proj.technologies.slice(0, 3).join(' آ· ')}
                  </td>
                  <td className="py-3.5 px-5 text-end">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium border ${
                        proj.featured
                          ? 'bg-theme-primary/15 text-theme-primary border-theme-primary/30'
                          : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25'
                      }`}
                    >
                      {proj.featured ? t.statusFeatured : t.statusPublished}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
