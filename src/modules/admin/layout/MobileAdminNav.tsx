import React, { useEffect, useRef } from 'react';
import {
  Award,
  Cpu,
  FolderGit2,
  LayoutGrid,
  Mail,
  Palette,
  Radio,
  Settings,
  ShieldCheck,
  User,
} from 'lucide-react';
import type { AdminLang } from '../i18n/adminTranslations';
import type { AdminTab } from '../hooks/useActiveAdminTab';

interface MobileAdminNavProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  unreadCount: number;
  lang: AdminLang;
}

export const MobileAdminNav: React.FC<MobileAdminNavProps> = ({
  activeTab,
  onSelectTab,
  unreadCount,
  lang,
}) => {
  const itemRefs = useRef<Partial<Record<AdminTab, HTMLButtonElement | null>>>({});

  const navItems: Array<{
    id: AdminTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
  }> = [
    { id: 'overview', label: lang === 'ar' ? 'الرئيسية' : 'Home', icon: LayoutGrid },
    { id: 'projects', label: lang === 'ar' ? 'المشاريع' : 'Projects', icon: FolderGit2 },
    { id: 'inbox', label: lang === 'ar' ? 'الرسائل' : 'Inbox', icon: Mail, badge: unreadCount },
    { id: 'theme', label: lang === 'ar' ? 'المظهر' : 'Theme', icon: Palette },
    { id: 'status', label: lang === 'ar' ? 'التوفر' : 'Status', icon: Radio },
    { id: 'certificates', label: lang === 'ar' ? 'الشهادات' : 'Certs', icon: Award },
    { id: 'skills', label: lang === 'ar' ? 'المهارات' : 'Skills', icon: Cpu },
    { id: 'profile', label: lang === 'ar' ? 'الملف' : 'Profile', icon: User },
    { id: 'security', label: lang === 'ar' ? 'الأمان' : 'Security', icon: ShieldCheck },
    { id: 'backup', label: lang === 'ar' ? 'الإعدادات' : 'Settings', icon: Settings },
  ];

  // Auto-center active tab inside the single horizontal floating dock
  useEffect(() => {
    const el = itemRefs.current[activeTab];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [activeTab]);

  return (
    <nav
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 pointer-events-none px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))]"
    >
      <div className="pointer-events-auto relative mx-auto max-w-lg rounded-[24px] bg-[#0D0F17]/90 backdrop-blur-2xl border border-white/[0.11] shadow-[0_18px_45px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.09)] overflow-hidden">
        {/* Top Luminous Specular Edge */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-theme-primary/55 to-transparent"
        />

        {/* Single Horizontal Scrollable Pill Strip (All 10 Tabs, Zero "More" Sheet) */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth snap-x px-2 py-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                ref={(node) => {
                  itemRefs.current[item.id] = node;
                }}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`relative min-w-[66px] shrink-0 snap-center flex flex-col items-center justify-center gap-0.5 py-1.5 px-2.5 rounded-2xl transition-all duration-200 active:scale-95 touch-manipulation ${
                  isActive
                    ? 'bg-gradient-to-b from-theme-primary/20 to-theme-primary/[0.06] border border-theme-primary/40 text-white shadow-[0_0_18px_rgba(var(--theme-primary-rgb),0.22)]'
                    : 'border border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute -top-0.5 w-4 h-0.5 rounded-full bg-theme-primary shadow-[0_0_8px_rgba(var(--theme-primary-rgb),0.9)]"
                  />
                )}
                <div className="relative">
                  <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-theme-primary' : ''}`} />
                  {typeof item.badge === 'number' && item.badge > 0 && (
                    <span className="absolute -top-1.5 -end-2.5 min-w-[16px] h-4 px-1 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center shadow-[0_0_8px_rgba(244,63,94,0.6)]">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] leading-tight truncate max-w-[62px] ${isActive ? 'font-bold text-white' : 'font-medium'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
