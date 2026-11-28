import React from 'react';
import {
  Award,
  Cpu,
  FolderGit2,
  LayoutGrid,
  Mail,
  Menu,
  Palette,
  Radio,
  RefreshCw,
  Settings,
  ShieldCheck,
  Smartphone,
  User,
} from 'lucide-react';
import type { ProfileInfo } from '@shared/types';
import type { AdminLang } from '../i18n/adminTranslations';
import type { AdminTab } from '../hooks/useActiveAdminTab';

interface MobileAdminNavProps {
  activeTab: AdminTab;
  isMobileMoreOpen: boolean;
  setIsMobileMoreOpen: (open: boolean) => void;
  onSelectTab: (tab: AdminTab) => void;
  unreadCount: number;
  lang: AdminLang;
  tabsLabels: Record<string, string>;
  profile: ProfileInfo;
  onOpenBrandModal: () => void;
  onHardReload: () => Promise<void>;
  showIosInstallGuide?: boolean;
}

export const MobileAdminNav: React.FC<MobileAdminNavProps> = ({
  activeTab,
  isMobileMoreOpen,
  setIsMobileMoreOpen,
  onSelectTab,
  unreadCount,
  lang,
  tabsLabels,
  profile,
  onOpenBrandModal,
  onHardReload,
  showIosInstallGuide = false,
}) => {
  return (
    <>
      <nav
        aria-label="Mobile Navigation"
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0A0B0F]/95 backdrop-blur-md border-t border-white/[0.08] px-2 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-12px_32px_rgba(0,0,0,0.85)]"
      >
        <div className="grid grid-cols-5 gap-1 max-w-md mx-auto">
          {[
            { id: 'overview' as const, label: lang === 'ar' ? 'الرئيسية' : 'Home', icon: LayoutGrid },
            { id: 'projects' as const, label: lang === 'ar' ? 'المشاريع' : 'Projects', icon: FolderGit2 },
            { id: 'inbox' as const, label: lang === 'ar' ? 'الرسائل' : 'Inbox', icon: Mail, badge: unreadCount },
            { id: 'theme' as const, label: lang === 'ar' ? 'المظهر' : 'Theme', icon: Palette },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id && !isMobileMoreOpen;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelectTab(item.id);
                  setIsMobileMoreOpen(false);
                }}
                className={`relative flex flex-col items-center justify-center gap-1 py-1.5 rounded-xl transition-colors min-h-[50px] touch-manipulation ${
                  isActive ? 'text-theme-primary bg-theme-primary/10' : 'text-slate-400 active:text-white'
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {typeof item.badge === 'number' && item.badge > 0 && (
                    <span className="absolute -top-1.5 -end-2 min-w-[16px] h-4 px-1 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium truncate max-w-full px-0.5">{item.label}</span>
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setIsMobileMoreOpen(!isMobileMoreOpen)}
            className={`relative flex flex-col items-center justify-center gap-1 py-1.5 rounded-xl transition-colors min-h-[50px] touch-manipulation ${
              isMobileMoreOpen || ['skills', 'certificates', 'status', 'profile', 'security', 'backup'].includes(activeTab)
                ? 'text-theme-primary bg-theme-primary/10'
                : 'text-slate-400 active:text-white'
            }`}
          >
            <Menu className="w-5 h-5" />
            <span className="text-[10px] font-medium">{lang === 'ar' ? 'المزيد' : 'More'}</span>
          </button>
        </div>
      </nav>

      {isMobileMoreOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end"
          onClick={() => setIsMobileMoreOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full bg-[#0D0E14] border-t border-white/[0.12] rounded-t-3xl p-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] space-y-4 animate-fadeIn max-h-[82vh] overflow-y-auto"
          >
            <div className="w-10 h-1 rounded-full bg-white/20 mx-auto" />

            <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={profile.topAvatarUrl || '/my.jpg'}
                  alt={profile.name}
                  className="w-10 h-10 rounded-xl object-cover object-top border border-theme-primary/40 shrink-0"
                />
                <div className="min-w-0 text-start">
                  <div className="text-sm font-bold text-white truncate">
                    {lang === 'ar' ? profile.shortNameAr || 'عمرو عاطف' : profile.shortName || 'Amr Atef'}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{profile.title}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMoreOpen(false);
                  onOpenBrandModal();
                }}
                className="px-3 py-1.5 rounded-xl bg-theme-primary/15 border border-theme-primary/30 text-theme-primary text-xs font-bold shrink-0"
              >
                {lang === 'ar' ? 'تعديل الهوية' : 'Edit Brand'}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: 'skills' as const, label: tabsLabels.skills, icon: Cpu },
                { id: 'certificates' as const, label: tabsLabels.certificates, icon: Award },
                { id: 'status' as const, label: tabsLabels.status, icon: Radio },
                { id: 'profile' as const, label: tabsLabels.profile, icon: User },
                { id: 'security' as const, label: tabsLabels.security, icon: ShieldCheck },
                { id: 'backup' as const, label: tabsLabels.backup, icon: Settings },
              ].map((sec) => {
                const Icon = sec.icon;
                const isActive = activeTab === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => {
                      onSelectTab(sec.id);
                      setIsMobileMoreOpen(false);
                    }}
                    className={`flex items-center gap-2.5 p-3.5 rounded-2xl border text-start transition-colors min-h-[50px] ${
                      isActive
                        ? 'bg-theme-primary/15 border-theme-primary/40 text-white font-bold'
                        : 'bg-[#12131A] border-white/[0.07] text-slate-300'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-theme-primary' : 'text-slate-400'}`} />
                    <span className="text-xs truncate">{sec.label}</span>
                  </button>
                );
              })}
            </div>

            {showIosInstallGuide && (
              <div className="p-3 rounded-2xl bg-theme-primary/10 border border-theme-primary/25 text-xs text-slate-300 space-y-1 text-start">
                <div className="font-bold text-theme-primary flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>لتثبيت التطبيق على آيفون 7:</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  من Safari اضغط على أيقونة المشاركة (Share) بالأسفل ثم اختر &quot;إضافة إلى الشاشة الرئيسية&quot; (Add to Home Screen).
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMoreOpen(false);
                  void onHardReload();
                }}
                className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-theme-primary/15 border border-theme-primary/30 text-theme-primary text-xs font-bold touch-manipulation"
              >
                <RefreshCw className="w-3.5 h-3.5 shrink-0" />
                <span>{lang === 'ar' ? 'إعادة تحميل التطبيق' : 'Hard Reload App'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsMobileMoreOpen(false)}
                className="py-3 px-3 rounded-xl bg-white/[0.05] text-slate-300 text-xs font-bold touch-manipulation"
              >
                {lang === 'ar' ? 'إغلاق القائمة' : 'Close Menu'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
