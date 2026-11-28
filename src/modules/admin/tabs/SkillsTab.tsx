import React from 'react';
import { Save } from 'lucide-react';
import type { SkillCategory } from '@shared/types';
import { usePortfolio } from '@/app/providers/PortfolioContext';
import type { RequestConfirmFn } from '../types';

interface SkillsTabProps {
  skillsDraft: SkillCategory[];
  setSkillsDraft: React.Dispatch<React.SetStateAction<SkillCategory[]>>;
  requestConfirm: RequestConfirmFn;
  onSaved?: () => void;
}

export const SkillsTab: React.FC<SkillsTabProps> = ({
  skillsDraft,
  setSkillsDraft,
  requestConfirm,
  onSaved,
}) => {
  const { updateSkills } = usePortfolio();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">إدارة المهارات والتقنيات</h2>
        <p className="text-xs text-slate-400 font-mono mt-0.5">تعديل نسب المهارات الظاهرة في البورتفوليو</p>
      </div>

      <div className="space-y-6">
        {skillsDraft.map((category, catIdx) => (
          <div key={catIdx} className="p-5 quantix-card space-y-3">
            <h3 className="font-bold text-theme-primary text-sm">{category.nameAr}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {category.skills.map((skill, sIdx) => {
                const skillName = typeof skill === 'string' ? skill : skill.name || skill.nameAr || '';
                const skillLevel = typeof skill === 'object' && skill !== null && typeof skill.level === 'number' ? skill.level : 90;
                return (
                  <div key={sIdx} className="flex items-center justify-between p-3 rounded-xl bg-[#0B0C10] border border-white/[0.08]">
                    <span className="text-xs text-white font-medium">{skillName}</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={skillLevel}
                        onChange={(e) => {
                          const nextLevel = Math.min(100, Math.max(0, Number(e.target.value) || 0));
                          const newSkills = skillsDraft.map((c, ci) =>
                            ci !== catIdx
                              ? c
                              : {
                                  ...c,
                                  skills: c.skills.map((sk, si) =>
                                    si !== sIdx
                                      ? sk
                                      : typeof sk === 'string'
                                      ? { name: sk, level: nextLevel }
                                      : { ...sk, level: nextLevel }
                                  ),
                                }
                          );
                          setSkillsDraft(newSkills);
                        }}
                        className="w-16 px-2 py-1 rounded bg-[#08090C] text-theme-primary text-xs font-mono text-center border border-white/[0.08]"
                      />
                      <span className="text-xs text-slate-500 font-mono">%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() =>
              requestConfirm({
                variant: 'edit',
                title: 'تأكيد تعديل نسب المهارات',
                description: 'هل تريد حفظ وتطبيق نسب المهارات المحدّثة على البورتفوليو؟',
                confirmLabel: 'تأكيد الحفظ',
                onConfirm: () => {
                  updateSkills(skillsDraft);
                  onSaved?.();
                },
              })
            }
            className="px-6 py-2.5 rounded-xl bg-theme-primary hover:bg-theme-primary text-white font-bold text-xs flex items-center gap-2 shadow-lg cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>حفظ وتأكيد تعديلات المهارات</span>
          </button>
        </div>
      </div>
    </div>
  );
};
