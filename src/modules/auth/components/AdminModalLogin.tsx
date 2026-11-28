import React, { useEffect, useState } from 'react';
import { Globe, Lock, Unlock, X } from 'lucide-react';
import { usePortfolio } from '@/app/providers/PortfolioContext';
import { adminTranslations } from '@modules/admin/i18n/adminTranslations';

export const AdminModalLogin: React.FC = () => {
  const {
    profile,
    lang,
    setLang,
    setIsAdminOpen,
    verifyAdminCredentials,
    completeLoginSession,
  } = usePortfolio();

  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const modalLoginFormRef = React.useRef<HTMLFormElement | null>(null);
  const t = adminTranslations[lang];

  useEffect(() => {
    setPinError(false);
  }, [lang]);

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!verifyAdminCredentials(pinInput)) {
      setPinError(true);
      return;
    }

    setPinError(false);
    const formEl = modalLoginFormRef.current;
    try {
      const CredCtor = (window as any).PasswordCredential;
      if (CredCtor && (navigator as any).credentials?.store) {
        const cred = formEl
          ? new CredCtor(formEl)
          : new CredCtor({
              id: (profile.adminUsername || 'amratefkandel').trim(),
              password: pinInput,
              name: profile.name || 'Portfolio Admin',
            });
        await (navigator as any).credentials.store(cred);
      }
    } catch {
      // Ignore gracefully on browsers without Credential Management API
    }

    await completeLoginSession(false, false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-md quantix-card rounded-3xl p-8 shadow-[0_25px_70px_rgba(0,0,0,0.9)] text-center overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 inset-x-0 h-40 opacity-45"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(var(--theme-primary-rgb), 0.25), transparent 70%)',
          }}
        />
        <button
          type="button"
          onClick={() => setIsAdminOpen(false)}
          className="absolute top-5 end-5 p-2 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          className="absolute top-5 start-5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>{lang === 'en' ? 'AR' : 'EN'}</span>
        </button>

        <div
          className="w-16 h-16 rounded-2xl border border-white/15 flex items-center justify-center mx-auto mb-4"
          style={{
            backgroundColor: 'rgba(var(--theme-primary-rgb), 0.14)',
            color: 'var(--theme-primary)',
            boxShadow: '0 0 24px rgba(var(--theme-primary-rgb), 0.25)',
          }}
        >
          <Lock className="w-8 h-8" />
        </div>

        <h3 className="text-2xl font-bold text-white mb-2">{t.loginTitle}</h3>
        <p className="text-slate-400 text-xs font-mono mb-6">{t.loginSubtitle}</p>

        <form ref={modalLoginFormRef} method="post" autoComplete="on" onSubmit={handleLoginSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            autoComplete="username"
            value={profile.adminUsername || 'amratefkandel'}
            readOnly
            tabIndex={-1}
            aria-hidden="true"
            className="sr-only"
          />
          <input
            id="modal-admin-password"
            name="password"
            type="password"
            dir="ltr"
            autoComplete="current-password"
            autoCapitalize="none"
            autoCorrect="off"
            value={pinInput}
            onChange={(e) => {
              setPinInput(e.target.value);
              setPinError(false);
            }}
            placeholder={t.loginPlaceholder}
            className="w-full text-center text-base tracking-[0.15em] py-3 rounded-xl bg-[#08090C] border border-white/10 focus:border-white/30 text-white outline-none font-mono"
          />

          {pinError && <p className="text-rose-400 text-xs font-mono">{t.loginError}</p>}

          <button
            type="submit"
            style={{
              background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))',
              boxShadow: '0 8px 24px -6px rgba(var(--theme-primary-rgb), 0.45)',
            }}
            className="btn-sheen w-full py-3 rounded-xl hover:brightness-110 text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
          >
            <Unlock className="w-4 h-4" />
            <span>{t.loginButton}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
