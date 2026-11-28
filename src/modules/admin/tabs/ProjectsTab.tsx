import React from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';
import type { Project } from '@shared/types';
import { usePortfolio } from '@/app/providers/PortfolioContext';
import type { RequestConfirmFn } from '../types';

interface ProjectsTabProps {
  editingProject: Project | null;
  setEditingProject: (project: Project | null) => void;
  isNewProject: boolean;
  setIsNewProject: (isNew: boolean) => void;
  requestConfirm: RequestConfirmFn;
  onSaved?: () => void;
}

export const ProjectsTab: React.FC<ProjectsTabProps> = ({
  editingProject,
  setEditingProject,
  isNewProject,
  setIsNewProject,
  requestConfirm,
  onSaved,
}) => {
  const { projects, addProject, updateProject, deleteProject } = usePortfolio();

  return (
    <div className="space-y-6">
      {!editingProject ? (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">المشاريع المضافة ({projects.length})</h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">إضافة وتعديل وحذف المشاريع</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsNewProject(true);
                setEditingProject({
                  id: 'proj_' + Date.now(),
                  title: '',
                  titleAr: '',
                  tagline: '',
                  taglineAr: '',
                  description: '',
                  descriptionAr: '',
                  category: '.NET & Backend',
                  featured: true,
                  badge: 'Enterprise Project',
                  architecture: ['Clean Architecture'],
                  technologies: ['.NET 10', 'PostgreSQL'],
                  metrics: [{ label: 'Performance', value: '100%' }],
                  features: ['ميزة هندسية جديدة'],
                });
              }}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-theme-primary hover:bg-theme-primary text-white text-xs font-bold shadow-[0_0_15px_rgba(var(--theme-primary-rgb),0.3)] transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة مشروع جديد</span>
            </button>
          </div>

          <div className="space-y-3">
            {projects.map((p) => (
              <div key={p.id} className="p-4 quantix-card flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-theme-primary font-semibold">{p.badge}</span>
                  <h4 className="font-bold text-white text-base">{p.titleAr || p.title}</h4>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{p.taglineAr || p.tagline}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProject(p);
                      setIsNewProject(false);
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-[#14151B] hover:bg-slate-700 text-xs text-slate-200 transition-colors"
                  >
                    تعديل
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      requestConfirm({
                        variant: 'danger',
                        title: 'تأكيد حذف المشروع',
                        description: `سيتم حذف المشروع "${p.titleAr || p.title}" نهائياً من البورتفوليو.`,
                        confirmLabel: 'تأكيد الحذف',
                        onConfirm: () => {
                          deleteProject(p.id);
                          onSaved?.();
                        },
                      })
                    }
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-5 quantix-card p-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <h3 className="text-lg font-bold text-white">
              {isNewProject ? 'إضافة مشروع جديد' : `تعديل: ${editingProject.titleAr || editingProject.title}`}
            </h3>
            <button
              type="button"
              onClick={() => setEditingProject(null)}
              className="text-xs text-slate-400 hover:text-white"
            >
              إلغاء والعودة
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">اسم المشروع (عربي)</label>
              <input
                type="text"
                value={editingProject.titleAr}
                onChange={(e) => setEditingProject({ ...editingProject, titleAr: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">اسم المشروع (English)</label>
              <input
                type="text"
                value={editingProject.title}
                onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">الشعار المختصر (Tagline)</label>
            <input
              type="text"
              value={editingProject.taglineAr}
              onChange={(e) => setEditingProject({ ...editingProject, taglineAr: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">الوصف التفصيلي</label>
            <textarea
              rows={3}
              value={editingProject.descriptionAr}
              onChange={(e) => setEditingProject({ ...editingProject, descriptionAr: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">الشارة (Badge)</label>
            <input
              type="text"
              value={editingProject.badge}
              onChange={(e) => setEditingProject({ ...editingProject, badge: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm font-mono"
            />
          </div>

          <div className="flex items-center gap-3 pt-3">
            <button
              type="button"
              onClick={() =>
                requestConfirm({
                  variant: 'edit',
                  title: isNewProject ? 'تأكيد إضافة مشروع جديد' : 'تأكيد تعديل المشروع',
                  description: isNewProject
                    ? `هل تريد إضافة المشروع "${editingProject.titleAr || editingProject.title}" إلى البورتفوليو؟`
                    : `هل تريد حفظ التعديلات على المشروع "${editingProject.titleAr || editingProject.title}"؟`,
                  confirmLabel: isNewProject ? 'تأكيد الإضافة' : 'تأكيد الحفظ',
                  onConfirm: () => {
                    if (isNewProject) {
                      addProject(editingProject);
                    } else {
                      updateProject(editingProject.id, editingProject);
                    }
                    setEditingProject(null);
                    onSaved?.();
                  },
                })
              }
              className="px-6 py-2.5 rounded-xl bg-theme-primary hover:bg-theme-primary text-white font-bold text-xs shadow-lg flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>حفظ المشروع</span>
            </button>
            <button
              type="button"
              onClick={() => setEditingProject(null)}
              className="px-4 py-2.5 rounded-xl border border-white/[0.08] text-slate-400 text-xs"
            >
              إلغاء
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
