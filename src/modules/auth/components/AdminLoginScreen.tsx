import React, { useRef, useState } from 'react';
import {
  AlertCircle,
  Eye,
  EyeOff,
  KeyRound,
  PlusSquare,
  Share,
  ShieldCheck,
  Smartphone,
  Unlock,
  User,
  X,
} from 'lucide-react';
import { usePortfolio } from '@/app/providers/PortfolioContext';

export const AdminLoginScreen: React.FC = () => {
  const { profile, verifyAdminCredentials, completeLoginSession } = usePortfolio();

  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const loginFormRef = useRef<HTMLFormElement | null>(null);

  const [showIosInstallGuide, setShowIosInstallGuide] = useState(() => {
    if (typeof window === 'undefined') return false;
    const ua = window.navigator.userAgent || '';
    const isIos = /iPhone|iPad|iPod/i.test(ua);
    const isStandalone =
      (window.navigator as any).standalone === true ||
      window.matchMedia('(display-mode: standalone)').matches;
    const dismissed = localStorage.getItem('admin_ios_guide_dismissed') === 'true';
    return isIos && !isStandalone && !dismissed;
  });

  const dismissIosInstallGuide = () => {
    setShowIosInstallGuide(false);
    try {
      localStorage.setItem('admin_ios_guide_dismissed', 'true');
    } catch {
      // ignore
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoggingIn) return;

    const cleanUser = usernameInput.trim();
    if (!cleanUser || !passwordInput.trim()) {
      setLoginError('يرجى إدخال اسم المستخدم وكلمة المرور');
      return;
    }

    if (!verifyAdminCredentials(cleanUser, passwordInput)) {
      setLoginError('اسم المستخدم أو كلمة المرور غير صحيحة');
      return;
    }

    setLoginError('');
    setIsLoggingIn(true);

    // Ensure password field uses type="password" when browsers inspect the submitted form
    setShowPassword(false);
    const formEl = loginFormRef.current;
    const pwdInput = formEl?.querySelector('input[name="password"]') as HTMLInputElement | null;
    if (pwdInput) {
      pwdInput.type = 'password';
    }

    try {
      const CredCtor = (window as any).PasswordCredential;
      if (CredCtor && (navigator as any).credentials?.store) {
        const cred = formEl
          ? new CredCtor(formEl)
          : new CredCtor({
              id: cleanUser,
              password: passwordInput,
              name: profile.name || 'Portfolio Admin',
            });
        await (navigator as any).credentials.store(cred);
      }
    } catch {
      // Ignore gracefully on Safari iOS, which relies on form navigation
    }

    await completeLoginSession(rememberDevice, true);
    window.location.assign(window.location.pathname + window.location.search);
  };

  return (
    <div className="admin-login-shell min-h-screen bg-[#07090e] flex flex-col justify-center items-center p-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] relative overflow-hidden font-cairo selection:bg-theme-primary/30 selection:text-theme-primary">
      {/* Ambient Glows */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-theme-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md quantix-card backdrop-blur-xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative z-10 text-center">
        {/* Logo Badge */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-theme-primary to-indigo-600 p-0.5 mx-auto mb-5 shadow-[0_0_25px_rgba(var(--theme-primary-rgb),0.35)]">
          <div className="w-full h-full bg-[#08090C] rounded-[14px] flex items-center justify-center text-theme-primary">
            <ShieldCheck className="w-8 h-8" />
          </div>
        </div>

        <h2 className="text-2xl font-black text-white tracking-wide">
          بوابة الإدارة المركزية
        </h2>
        <p className="text-slate-400 text-xs font-mono mt-1 mb-6">
          Portfolio Administration &amp; Content Management
        </p>

        {loginError && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium flex items-center gap-2 text-right">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{loginError}</span>
          </div>
        )}

        <form ref={loginFormRef} method="post" action="/admin" autoComplete="on" onSubmit={handleLoginSubmit} className="space-y-4 text-right">
          <div>
            <label htmlFor="admin-username" className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
              اسم المستخدم (Username)
            </label>
            <div className="relative">
              <input
                id="admin-username"
                name="username"
                type="text"
                dir="ltr"
                autoComplete="username"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                value={usernameInput}
                onChange={(e) => {
                  setUsernameInput(e.target.value);
                  setLoginError('');
                }}
                placeholder="اسم المستخدم (Username)"
                className="w-full pl-4 pr-10 py-3 rounded-xl bg-[#08090C] border border-white/[0.08] focus:border-theme-primary text-white text-sm outline-none font-mono transition-all text-left placeholder:text-slate-600"
                required
              />
              <User className="w-4 h-4 text-slate-500 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
            </div>
          </div>

          <div>
            <label htmlFor="admin-password" className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
              كلمة المرور (Password)
            </label>
            <div className="relative">
              <input
                id="admin-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                dir="ltr"
                autoComplete="current-password"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setLoginError('');
                }}
                placeholder="••••••••"
                className="w-full pl-4 pr-20 py-3 rounded-xl bg-[#08090C] border border-white/[0.08] focus:border-theme-primary text-white text-sm outline-none font-mono transition-all text-left placeholder:text-slate-600"
                required
              />
              <div
                dir="ltr"
                className="absolute top-1/2 -translate-y-1/2 right-3.5 flex items-center gap-2"
              >
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                  className="p-1 rounded-md text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <span className="h-4 w-px bg-white/10 pointer-events-none" aria-hidden="true" />
                <KeyRound className="w-4 h-4 text-slate-500 pointer-events-none" />
              </div>
            </div>
          </div>

          <label className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-slate-300 cursor-pointer select-none">
            <span>البقاء متصلاً على هذا الهاتف (تطبيق الآيفون)</span>
            <input
              type="checkbox"
              checked={rememberDevice}
              onChange={(e) => setRememberDevice(e.target.checked)}
              className="w-4 h-4 accent-theme-primary rounded cursor-pointer"
            />
          </label>

          <button
            type="submit"
            disabled={isLoggingIn}
            style={{
              background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))',
              boxShadow: '0 8px 24px -6px rgba(var(--theme-primary-rgb), 0.45)',
            }}
            className="btn-sheen w-full py-3.5 mt-2 rounded-xl hover:brightness-110 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70"
          >
            <Unlock className={`w-4 h-4 transition-transform ${isLoggingIn ? 'animate-pulse' : 'group-hover:scale-110'}`} />
            <span>{isLoggingIn ? 'جاري تأكيد الدخول...' : 'تأكيد تسجيل الدخول'}</span>
          </button>
        </form>

        {showIosInstallGuide && (
          <div className="mt-5 p-3.5 rounded-2xl bg-theme-primary/10 border border-theme-primary/25 text-start relative">
            <button
              type="button"
              onClick={dismissIosInstallGuide}
              aria-label="إغلاق"
              className="absolute top-2.5 end-2.5 p-1 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-theme-primary text-xs font-bold mb-1.5">
              <Smartphone className="w-4 h-4 shrink-0" />
              <span>تثبيت كـ تطبيق على آيفون 7</span>
            </div>
            <ol className="text-[11px] text-slate-300 space-y-1 leading-relaxed pe-5 list-decimal list-inside">
              <li className="flex items-center gap-1.5 flex-wrap">
                <span>1. اضغط أيقونة المشاركة بالأسفل في Safari</span>
                <Share className="w-3.5 h-3.5 text-theme-secondary inline shrink-0" />
              </li>
              <li className="flex items-center gap-1.5 flex-wrap">
                <span>2. اختر &quot;إضافة إلى الشاشة الرئيسية&quot;</span>
                <PlusSquare className="w-3.5 h-3.5 text-theme-secondary inline shrink-0" />
              </li>
            </ol>
          </div>
        )}

        <div className="mt-6 pt-5 border-t border-white/[0.08]/80 text-center">
          <p className="text-[11px] font-mono text-slate-500">
            منطقة إدارية مخصصة ومحمية &bull; يُسمح بالدخول للحساب المصرح له فقط
          </p>
        </div>
      </div>
    </div>
  );
};
