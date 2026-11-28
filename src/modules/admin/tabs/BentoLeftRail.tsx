import React, { useState } from 'react';
import {
  Plus,
  Check,
  Palette,
  Eye,
  Download,
  MessageSquare,
  Calendar,
  FolderGit2,
} from 'lucide-react';
import { ContactMessage } from '@shared/types';
import { usePortfolio } from '@/app/providers/PortfolioContext';
import { adminTranslations } from '@modules/admin/i18n/adminTranslations';

interface BentoLeftRailProps {
  messages: ContactMessage[];
  onNavigate: (tab: string) => void;
  onPreview?: () => void;
  onExport?: () => void;
}

export const BentoLeftRail: React.FC<BentoLeftRailProps> = ({
  messages,
  onNavigate,
  onPreview,
  onExport,
}) => {
  const { lang } = usePortfolio();
  const t = adminTranslations[lang].leftRail;
  const [doneMap, setDoneMap] = useState<{ [key: string]: boolean }>({ '1': true });

  const unreadCount = messages.filter((m) => !m.read).length;

  const tasks = [
    { id: '1', label: t.taskItems.redesign, done: !!doneMap['1'], badge: 0 },
    { id: '2', label: t.taskItems.messages, done: !!doneMap['2'], badge: unreadCount },
    { id: '3', label: t.taskItems.projects, done: !!doneMap['3'], badge: 0 },
    { id: '4', label: t.taskItems.theme, done: !!doneMap['4'], badge: 0 },
  ];

  const toggleTask = (id: string) => {
    setDoneMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside className="w-full lg:w-64 shrink-0 bg-[#0b101b]/75 border-b lg:border-b-0 lg:border-e border-white/10 p-4 flex flex-col gap-5 overflow-y-auto">
      {/* Tasks */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-white">{t.tasks}</span>
            <span className="px-1.5 py-0.5 rounded-md bg-white/10 text-[10px] font-mono text-slate-300">
              {tasks.length}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className="text-slate-400 hover:text-white transition-colors"
            title={t.projects}
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-1.5">
          {tasks.map((task) => (
            <button
              key={task.id}
              type="button"
              onClick={() => toggleTask(task.id)}
              className={`w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl text-xs transition-colors text-start ${
                task.done
                  ? 'bg-white/[0.06] text-slate-200'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                    task.done
                      ? 'border-transparent text-white'
                      : 'border-white/20 bg-transparent'
                  }`}
                  style={task.done ? { backgroundColor: 'var(--theme-primary)' } : undefined}
                >
                  {task.done && <Check className="w-2.5 h-2.5" />}
                </span>
                <span className="truncate">{task.label}</span>
              </div>
              {task.badge > 0 && (
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                  {task.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="pt-3 border-t border-white/10">
        <div className="text-xs font-semibold text-white mb-3 text-start">{t.recentActivity}</div>
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={() => onNavigate('inbox')}
            className="w-full flex items-start gap-2.5 p-2 rounded-xl hover:bg-white/[0.04] text-start transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-slate-300 shrink-0">
              <MessageSquare className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-medium text-slate-200 truncate">
                {messages[0]?.name ? `${t.messageFrom} ${messages[0].name}` : t.inboxReady}
              </div>
              <div className="text-[10px] text-slate-500">
                {messages.length} {t.totalMessages}
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('theme')}
            className="w-full flex items-start gap-2.5 p-2 rounded-xl hover:bg-white/[0.04] text-start transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-slate-300 shrink-0">
              <Calendar className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-medium text-slate-200 truncate">{t.themeSyncActive}</div>
              <div className="text-[10px] text-slate-500">{t.portfolioAndDashboard}</div>
            </div>
          </button>
        </div>
      </div>

      {/* Quick Access */}
      <div className="pt-3 border-t border-white/10 mt-auto">
        <div className="text-xs font-semibold text-white mb-3 text-start">{t.quickAccess}</div>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => onNavigate('theme')}
            className="flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 text-slate-300 hover:text-white transition-all"
          >
            <Palette className="w-4 h-4" style={{ color: 'var(--theme-primary)' }} />
            <span className="text-[10px] font-medium">{t.colors}</span>
          </button>

          <button
            type="button"
            onClick={() => (onPreview ? onPreview() : onNavigate('projects'))}
            className="flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 text-slate-300 hover:text-white transition-all"
          >
            {onPreview ? <Eye className="w-4 h-4" /> : <FolderGit2 className="w-4 h-4" />}
            <span className="text-[10px] font-medium">{onPreview ? t.preview : t.projects}</span>
          </button>

          <button
            type="button"
            onClick={() => (onExport ? onExport() : onNavigate('backup'))}
            className="flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 text-slate-300 hover:text-white transition-all"
          >
            <Download className="w-4 h-4" />
            <span className="text-[10px] font-medium">{t.backup}</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
