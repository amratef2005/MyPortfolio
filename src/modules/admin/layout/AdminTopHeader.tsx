import React from 'react';
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Globe,
  Home,
  LogOut,
  RefreshCw,
} from 'lucide-react';
import type { ProfileInfo } from '@shared/types';
import type { AdminLang } from '../i18n/adminTranslations';

interface AdminTopHeaderProps {
  overviewGroupLabel: string;
  activeTabLabel: string;
  lang: AdminLang;
  setLang: (lang: AdminLang) => void;
  isRefreshing: boolean;
  refreshFeedback: 'synced' | 'error' | null;
  onRefresh: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  onLogout: () => void;
  profile?: ProfileInfo;
  onEditBrand?: () => void;
}

export const AdminTopHeader: React.FC<AdminTopHeaderProps> = ({
  overviewGroupLabel,
  activeTabLabel,
  lang,
  setLang,
  isRefreshing,
  refreshFeedback,
  onRefresh,
  onLogout,
  profile,
  onEditBrand,
}) => {
  const statusColor =
    (profile?.availabilityStatus || 'available') === 'available'
      ? 'bg-emerald-400'
      : profile?.availabilityStatus === 'busy'
      ? 'bg-amber-400'
      : 'bg-slate-500';

  return (
    <header className="relative px-3.5 sm:px-7 py-2.5 sm:py-3 bg-[#090A0F]/88 border-b border-white/[0.08] sticky top-0 z-40 backdrop-blur-2xl flex flex-nowrap items-center justify-between gap-2 sm:gap-3 pt-[max(0.65rem,env(safe-area-inset-top))] shadow-[0_8px_30px_rgba(0,0,0,0.45)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-theme-primary/40 to-transparent"
      />

      {/* Left: Quick Avatar (mobile Brand shortcut) + Compact Breadcrumb */}
      <div className="flex items-center gap-2.5 min-w-0">
        {profile && onEditBrand && (
          <button
            type="button"
            onClick={onEditBrand}
            title={lang === 'ar' ? 'تعديل الهوية والاسم' : 'Edit Brand Identity'}
            className="lg:hidden relative w-9 h-9 rounded-xl p-0.5 bg-gradient-to-tr from-theme-primary/70 to-indigo-500/40 shrink-0 active:scale-95 transition-transform touch-manipulation shadow-[0_0_16px_rgba(var(--theme-primary-rgb),0.25)]"
          >
            <img
              src={profile.topAvatarUrl || '/my.jpg'}
              alt={profile.name || 'Admin'}
              className="w-full h-full rounded-[10px] object-cover object-top bg-[#0B0C10]"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/drama_hero.png';
              }}
            />
            <span
              className={`absolute -bottom-0.5 -end-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#090A0F] ${statusColor}`}
            />
          </button>
        )}

        {/* Mobile Title Stack */}
        <div className="flex flex-col sm:hidden min-w-0 text-start">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider leading-none truncate">
            {overviewGroupLabel}
          </span>
          <span className="text-sm font-bold text-white leading-tight mt-0.5 truncate">
            {activeTabLabel}
          </span>
        </div>

        {/* Desktop Breadcrumb */}
        <div className="hidden sm:flex items-center gap-2 text-xs sm:text-sm text-slate-500 min-w-0">
          <Home className="w-4 h-4 shrink-0" />
          <span>{overviewGroupLabel}</span>
          <span className="text-slate-600">/</span>
          <span className="font-semibold text-white truncate">{activeTabLabel}</span>
        </div>
      </div>

      {/* Right: Sync Badge + Unified Frosted Glass Action Pill */}
      <div className="flex items-center gap-2 shrink-0">
        {refreshFeedback && (
          <span
            className={`hidden md:inline-flex items-center gap-1 px-2.5 h-9 rounded-xl border text-[11px] font-mono animate-fadeIn ${
              refreshFeedback === 'synced'
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                : 'bg-rose-500/15 border-rose-500/30 text-rose-400'
            }`}
          >
            {refreshFeedback === 'synced' ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>{lang === 'ar' ? 'تم التحديث' : 'Synced'}</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{lang === 'ar' ? 'تعذر التحديث' : 'Sync failed'}</span>
              </>
            )}
          </span>
        )}

        <div className="flex items-center gap-1 p-1 rounded-2xl bg-white/[0.035] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            aria-label={lang === 'ar' ? 'تحديث البيانات' : 'Refresh data'}
            title={
              lang === 'ar'
                ? 'تحديث ومزامنة البيانات (Shift + نقر لإعادة تحميل التطبيق وتحديث الكاش)'
                : 'Refresh & sync data (Shift + Click to hard reload app)'
            }
            className={`flex items-center justify-center gap-1.5 h-8 px-2 sm:px-2.5 rounded-xl text-xs font-mono font-semibold transition-all shrink-0 active:scale-95 touch-manipulation disabled:opacity-70 ${
              refreshFeedback === 'synced'
                ? 'bg-emerald-500/20 text-emerald-300'
                : refreshFeedback === 'error'
                ? 'bg-rose-500/20 text-rose-300'
                : 'hover:bg-white/[0.07] text-slate-200'
            }`}
          >
            <RefreshCw
              className={`w-3.5 h-3.5 shrink-0 ${
                refreshFeedback === 'synced' ? 'text-emerald-400' : 'text-theme-primary'
              } ${isRefreshing ? 'animate-spin' : ''}`}
            />
            <span className="hidden sm:inline">
              {isRefreshing ? (lang === 'ar' ? 'جاري...' : 'Syncing...') : lang === 'ar' ? 'تحديث' : 'Refresh'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="flex items-center justify-center gap-1 h-8 px-2 sm:px-2.5 rounded-xl hover:bg-white/[0.07] text-slate-200 text-[11px] sm:text-xs font-mono font-semibold transition-all shrink-0 active:scale-95 touch-manipulation"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-theme-primary shrink-0" />
            <span>{lang === 'en' ? 'AR' : 'EN'}</span>
          </button>

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="btn-sheen flex items-center justify-center gap-1.5 h-8 px-2 sm:px-2.5 rounded-xl bg-theme-primary/18 hover:bg-theme-primary/28 text-theme-primary border border-theme-primary/30 text-xs font-mono font-semibold transition-all shrink-0 active:scale-95 touch-manipulation"
          >
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">{lang === 'ar' ? 'معاينة البورتفوليو' : 'Preview'}</span>
          </a>

          <button
            type="button"
            onClick={onLogout}
            className="flex items-center justify-center gap-1.5 h-8 px-2 sm:px-2.5 rounded-xl bg-rose-500/12 hover:bg-rose-500/22 text-rose-400 border border-rose-500/25 text-xs font-mono font-semibold transition-all shrink-0 active:scale-95 touch-manipulation"
          >
            <LogOut className="w-3.5 h-3.5 shrink-0 rtl-flip" />
            <span className="hidden sm:inline">{lang === 'ar' ? 'خروج' : 'Logout'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
