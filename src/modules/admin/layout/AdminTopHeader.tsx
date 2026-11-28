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
}) => {
  return (
    <header className="relative px-4 sm:px-7 py-3 bg-[#0A0B0F]/90 border-b border-white/[0.07] sticky top-0 z-40 backdrop-blur-xl flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-theme-primary/35 to-transparent"
      />
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
          <Home className="w-4 h-4 shrink-0" />
          <span>{overviewGroupLabel}</span>
          <span className="text-slate-600">/</span>
          <span className="font-semibold text-white">{activeTabLabel}</span>
        </div>
      </div>

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
          className={`flex items-center justify-center gap-1.5 h-9 px-2.5 sm:px-3 rounded-xl border text-xs font-mono font-semibold transition-all shrink-0 touch-manipulation disabled:opacity-70 ${
            refreshFeedback === 'synced'
              ? 'bg-emerald-500/15 border-emerald-500/35 text-emerald-300'
              : refreshFeedback === 'error'
              ? 'bg-rose-500/15 border-rose-500/35 text-rose-300'
              : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border-white/[0.08]'
          }`}
        >
          <RefreshCw
            className={`w-3.5 h-3.5 shrink-0 ${refreshFeedback === 'synced' ? 'text-emerald-400' : 'text-theme-primary'} ${
              isRefreshing ? 'animate-spin' : ''
            }`}
          />
          <span className="hidden sm:inline">
            {isRefreshing ? (lang === 'ar' ? 'جاري التحديث...' : 'Syncing...') : lang === 'ar' ? 'تحديث' : 'Refresh'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          className="flex items-center justify-center gap-1.5 h-9 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/[0.08] text-xs font-mono font-semibold transition-all shrink-0"
          title="Switch Language"
        >
          <Globe className="w-3.5 h-3.5 text-theme-primary" />
          <span>{lang === 'en' ? 'AR' : 'EN'}</span>
        </button>

        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="btn-sheen flex items-center justify-center gap-1.5 h-9 px-3 rounded-xl bg-theme-primary/15 hover:bg-theme-primary/25 text-theme-primary border border-theme-primary/30 text-xs font-mono font-semibold transition-all shrink-0 touch-manipulation"
        >
          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden sm:inline">{lang === 'ar' ? 'معاينة البورتفوليو' : 'Preview'}</span>
        </a>

        <button
          type="button"
          onClick={onLogout}
          className="flex items-center justify-center gap-1.5 h-9 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/25 text-xs font-mono font-semibold transition-all shrink-0 touch-manipulation"
        >
          <LogOut className="w-3.5 h-3.5 shrink-0 rtl-flip" />
          <span className="hidden sm:inline">{lang === 'ar' ? 'خروج' : 'Logout'}</span>
        </button>
      </div>
    </header>
  );
};
