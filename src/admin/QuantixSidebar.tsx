import React, { useState } from 'react';
import {
  LayoutGrid,
  FolderGit2,
  Image as ImageIcon,
  Type,
  Cpu,
  Award,
  Mail,
  Palette,
  User,
  Settings,
  Radio,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Eye,
  LogOut,
  Pencil,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { adminTranslations } from './adminTranslations';

export interface QuantixNavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  badgeType?: 'pill' | 'count';
}

interface QuantixSidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  unreadCount: number;
  projectsCount: number;
  includeExtendedTabs?: boolean; // true for standalone AdminPage (status, security)
  onPreview?: () => void;
  onLogout?: () => void;
  onEditBrand?: () => void;
}

export const QuantixSidebar: React.FC<QuantixSidebarProps> = ({
  activeTab,
  onSelectTab,
  unreadCount,
  projectsCount,
  includeExtendedTabs = false,
  onPreview,
  onLogout,
  onEditBrand,
}) => {
  const { profile, lang } = usePortfolio();
  const t = adminTranslations[lang];
  const [collapsed, setCollapsed] = useState(false);

  const firstName =
    lang === 'ar'
      ? (profile.shortNameAr || profile.brandNameAr || 'عمرو').split(' ')[0]
      : (profile.shortName || profile.brandName || 'Amr').split(' ')[0];

  const groups: { title: string; items: QuantixNavItem[] }[] = [
    {
      title: t.groups.overview,
      items: [
        { id: 'overview', label: t.tabs.overview, icon: LayoutGrid },
      ],
    },
    {
      title: t.groups.content,
      items: [
        { id: 'projects', label: t.tabs.projects, icon: FolderGit2, badge: projectsCount, badgeType: 'count' },
        { id: 'skills', label: t.tabs.skills, icon: Cpu },
        { id: 'certificates', label: t.tabs.certificates, icon: Award },
        ...(includeExtendedTabs
          ? [{ id: 'status', label: t.tabs.status, icon: Radio, badge: t.badges.beta, badgeType: 'pill' as const }]
          : []),
      ],
    },
    {
      title: t.groups.appearance,
      items: [
        { id: 'theme', label: t.tabs.theme, icon: Palette, badge: t.badges.sync, badgeType: 'pill' },
        ...(!includeExtendedTabs
          ? [
              { id: 'images', label: t.tabs.images, icon: ImageIcon },
              { id: 'names', label: t.tabs.names, icon: Type },
            ]
          : []),
      ],
    },
    {
      title: t.groups.others,
      items: [
        { id: 'inbox', label: t.tabs.inbox, icon: Mail, badge: unreadCount > 0 ? unreadCount : undefined, badgeType: 'count' },
        { id: 'profile', label: t.tabs.profile, icon: User },
        ...(includeExtendedTabs
          ? [{ id: 'security', label: t.tabs.security, icon: ShieldCheck }]
          : []),
        { id: 'backup', label: t.tabs.backup, icon: Settings },
      ],
    },
  ];

  return (
    <aside
      className={`relative overflow-hidden shrink-0 bg-[#0A0B0F] border-b lg:border-b-0 lg:border-e border-white/[0.07] lg:sticky lg:top-0 lg:h-screen flex-col transition-all duration-300 select-none ${
        includeExtendedTabs ? 'hidden lg:flex' : 'flex'
      } ${
        collapsed ? 'lg:w-[76px]' : 'w-full lg:w-[250px]'
      }`}
    >
      {/* Subtle Top Theme Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 inset-x-0 h-44 opacity-50"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(var(--theme-primary-rgb), 0.16) 0%, transparent 72%)',
        }}
      />
      {/* Top Brand Row */}
      <div className="px-4 pt-4 pb-3 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => (onEditBrand ? onEditBrand() : onSelectTab('profile'))}
          title={lang === 'ar' ? 'انقر لتعديل الهوية والصورة' : 'Click to edit identity & avatar'}
          className={`flex items-center gap-2.5 group rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-theme-primary/40 transition-all text-start cursor-pointer min-w-0 ${
            collapsed ? 'p-1.5 justify-center' : 'px-2.5 py-1.5 flex-1'
          }`}
        >
          <div className="relative w-7 h-7 rounded-lg overflow-hidden bg-theme-primary/20 p-0.5 shrink-0">
            <img
              src={profile.topAvatarUrl || profile.heroAvatarUrl || '/my.jpg'}
              alt={profile.name}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/drama_hero.png';
              }}
              className="w-full h-full object-cover object-top rounded-[6px]"
            />
          </div>
          {!collapsed && (
            <>
              <span className="font-semibold text-white text-xs truncate flex-1">
                {lang === 'ar' ? (profile.shortNameAr || 'عمرو عاطف') : (profile.shortName || 'Amr Atef')}
              </span>
              <Pencil className="w-3 h-3 text-theme-primary opacity-70 group-hover:opacity-100 shrink-0" />
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] items-center justify-center text-slate-400 hover:text-white transition-colors shrink-0"
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {lang === 'ar' ? (
            collapsed ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />
          ) : (
            collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Greeting Block (Quantix Signature) */}
      {!collapsed && (
        <div className="px-4 pt-2 pb-4 border-b border-white/[0.06] hidden lg:block">
          <div className="text-[18px] font-bold text-white leading-snug tracking-tight">
            {t.welcomeBack}
            <br />
            <span className="text-theme-primary">{firstName}</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1.5 font-mono">{t.lastSync}</div>
        </div>
      )}

      {/* Navigation Groups */}
      <nav className="flex-1 px-3 py-3 flex lg:flex-col gap-1 lg:gap-4 overflow-x-auto lg:overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {groups.map((group) => (
          <div key={group.title} className="flex lg:flex-col gap-1 shrink-0">
            {!collapsed && (
              <div className="hidden lg:block px-2.5 pb-1 text-[11px] font-medium text-slate-500">
                {group.title}
              </div>
            )}

            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectTab(item.id)}
                  title={collapsed ? item.label : undefined}
                  className={`group relative flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'text-white border border-white/[0.12]'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.03] border border-transparent'
                  }`}
                  style={
                    isActive
                      ? {
                          background:
                            'linear-gradient(90deg, rgba(255,255,255,0.06) 0%, rgba(var(--theme-primary-rgb), 0.16) 100%)',
                          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 20px -8px rgba(var(--theme-primary-rgb), 0.35)',
                        }
                      : undefined
                  }
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-theme-primary' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </div>

                  {!collapsed && item.badge !== undefined && (
                    <span
                      className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono font-semibold shrink-0 ${
                        item.badgeType === 'pill'
                          ? 'bg-white/[0.07] text-slate-300 border border-white/[0.08]'
                          : 'bg-theme-primary/20 text-theme-primary border border-theme-primary/30'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {/* Quantix Signature End Accent Bar */}
                  {isActive && (
                    <span
                      className="hidden lg:block w-[3px] h-4 rounded-full shrink-0"
                      style={{
                        backgroundColor: 'var(--theme-primary)',
                        boxShadow: '0 0 10px var(--theme-primary)',
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bottom Quick Actions (Desktop) */}
      {(onPreview || onLogout) && !collapsed && (
        <div className="hidden lg:flex items-center gap-2 p-3 border-t border-white/[0.06]">
          {onPreview && (
            <button
              type="button"
              onClick={onPreview}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-medium text-slate-300 hover:text-white transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-theme-primary" />
              <span>{t.leftRail.preview}</span>
            </button>
          )}
          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 transition-colors"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </aside>
  );
};
