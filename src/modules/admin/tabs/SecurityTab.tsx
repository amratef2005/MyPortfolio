import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Save,
  Shield,
  ShieldCheck,
} from 'lucide-react';
import { usePortfolio } from '@/app/providers/PortfolioContext';
import type { RequestConfirmFn } from '../types';

interface SecurityTabProps {
  requestConfirm: RequestConfirmFn;
}

export const SecurityTab: React.FC<SecurityTabProps> = ({ requestConfirm }) => {
  const { profile, updateCredentials, updateProfile } = usePortfolio();

  const [newUsername, setNewUsername] = useState(profile.adminUsername || 'amratefkandel');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationPin, setVerificationPin] = useState('');
  const [showVerificationPin, setShowVerificationPin] = useState(false);
  const [securitySuccess, setSecuritySuccess] = useState('');
  const [securityError, setSecurityError] = useState('');

  const [currentPinInput, setCurrentPinInput] = useState('');
  const [newPinInput, setNewPinInput] = useState('');
  const [confirmPinInput, setConfirmPinInput] = useState('');
  const [pinSuccess, setPinSuccess] = useState('');
  const [pinError, setPinError] = useState('');

  useEffect(() => {
    setNewUsername(profile.adminUsername || 'amratefkandel');
  }, [profile.adminUsername]);

  const handleSecurityUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setSecuritySuccess('');
    setSecurityError('');

    const expectedPin = (profile.adminPin || '1414').trim();
    if (!verificationPin.trim()) {
      setSecurityError('يرجى إدخال الرمز التأكيدي (Security PIN) أولاً للمتابعة.');
      return;
    }

    if (verificationPin.trim() !== expectedPin) {
      setSecurityError('الرمز التأكيدي غير صحيح! يرجى التحقق والمحاولة مرة أخرى.');
      return;
    }

    if (!newUsername.trim()) {
      setSecurityError('اسم المستخدم لا يمكن أن يكون فارغاً');
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setSecurityError('كلمة المرور وتأكيد كلمة المرور غير متطابقين');
      return;
    }

    const passwordToSet = newPassword.trim() ? newPassword : profile.adminPassword || 'KandelAmr###14';
    requestConfirm({
      variant: 'edit',
      title: 'تأكيد تعديل بيانات الدخول',
      description: `تم التحقق من الرمز التأكيدي بنجاح. هل تريد حفظ اسم المستخدم (${newUsername}) وكلمة المرور الجديدة؟`,
      confirmLabel: 'تأكيد التحديث',
      onConfirm: () => {
        updateCredentials(newUsername, passwordToSet);
        updateProfile({ adminUsername: newUsername, adminPassword: passwordToSet });
        setSecuritySuccess('تم التحقق وتحديث بيانات الدخول وكلمة المرور بنجاح!');
        setNewPassword('');
        setConfirmPassword('');
        setVerificationPin('');
      },
    });
  };

  const handlePinUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setPinSuccess('');
    setPinError('');

    const expectedPin = (profile.adminPin || '1414').trim();
    if (currentPinInput.trim() !== expectedPin) {
      setPinError('الرمز التأكيدي الحالي غير صحيح.');
      return;
    }

    if (newPinInput.trim().length < 4) {
      setPinError('يجب أن يكون الرمز التأكيدي الجديد 4 أرقام أو أحرف على الأقل.');
      return;
    }

    if (newPinInput.trim() !== confirmPinInput.trim()) {
      setPinError('الرمز التأكيدي الجديد وتأكيده غير متطابقين.');
      return;
    }

    const nextPin = newPinInput.trim();
    requestConfirm({
      variant: 'edit',
      title: 'تأكيد تغيير الرمز التأكيدي',
      description: 'سيُطلب الرمز التأكيدي الجديد في المرات القادمة عند تغيير كلمة المرور أو بيانات الدخول.',
      confirmLabel: 'تأكيد تغيير الرمز',
      onConfirm: () => {
        updateProfile({ adminPin: nextPin });
        setPinSuccess('تم تحديث الرمز التأكيدي (Security PIN) بنجاح!');
        setCurrentPinInput('');
        setNewPinInput('');
        setConfirmPinInput('');
      },
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* 1. CREDENTIALS UPDATE CARD */}
      <div className="p-4 sm:p-6 md:p-8 rounded-2xl quantix-card space-y-5 sm:space-y-6 shadow-xl min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]/80">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-theme-primary" />
              <span>تأكيد اليوزر والباسورد (بيانات الدخول)</span>
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-1">
              تغيير وتأكيد اسم المستخدم وكلمة المرور مع التحقق الإلزامي بالرمز التأكيدي
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-theme-primary/15 text-theme-primary border border-theme-primary/30 text-[11px] font-bold font-mono flex items-center gap-1.5 self-start sm:self-center">
            <ShieldCheck className="w-3.5 h-3.5 text-theme-primary" />
            محمي بالرمز التأكيدي
          </span>
        </div>

        {securitySuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{securitySuccess}</span>
          </div>
        )}

        {securityError && (
          <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{securityError}</span>
          </div>
        )}

        <form method="post" autoComplete="on" onSubmit={handleSecurityUpdate} className="space-y-4 max-w-lg">
          <div>
            <label htmlFor="security-username" className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
              اسم المستخدم (Username)
            </label>
            <input
              id="security-username"
              name="username"
              type="text"
              dir="ltr"
              autoComplete="username"
              autoCapitalize="none"
              autoCorrect="off"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm font-mono outline-none focus:border-theme-primary"
              required
            />
          </div>

          <div>
            <label htmlFor="security-new-password" className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
              كلمة المرور الجديدة (New Password)
            </label>
            <input
              id="security-new-password"
              name="new-password"
              type="password"
              dir="ltr"
              autoComplete="new-password"
              autoCapitalize="none"
              autoCorrect="off"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="اتركها فارغة للاحتفاظ بكلمة المرور الحالية"
              className="w-full px-4 py-2.5 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm font-mono outline-none focus:border-theme-primary"
            />
          </div>

          <div>
            <label htmlFor="security-confirm-password" className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
              تأكيد كلمة المرور الجديدة (Confirm Password)
            </label>
            <input
              id="security-confirm-password"
              name="confirm-password"
              type="password"
              dir="ltr"
              autoComplete="new-password"
              autoCapitalize="none"
              autoCorrect="off"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="أعد إدخال كلمة المرور للتأكيد"
              className="w-full px-4 py-2.5 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm font-mono outline-none focus:border-theme-primary"
            />
          </div>

          <div className="p-4 rounded-2xl bg-theme-primary/[0.06] border border-theme-primary/30 space-y-2">
            <label htmlFor="security-verification-pin" className="block text-xs font-mono text-theme-primary font-bold">
              الرمز التأكيدي (Security PIN) *
            </label>
            <div className="relative">
              <input
                id="security-verification-pin"
                name="verification-pin"
                type={showVerificationPin ? 'text' : 'password'}
                dir="ltr"
                inputMode="numeric"
                autoComplete="off"
                value={verificationPin}
                onChange={(e) => {
                  setVerificationPin(e.target.value);
                  setSecurityError('');
                }}
                placeholder="أدخل الرمز التأكيدي للمتابعة"
                className="w-full pl-4 pr-12 py-2.5 rounded-xl bg-[#08090C] border border-theme-primary/30 text-white text-sm font-mono outline-none focus:border-theme-primary"
                required
              />
              <button
                type="button"
                onClick={() => setShowVerificationPin(!showVerificationPin)}
                aria-label={showVerificationPin ? 'إخفاء الرمز' : 'إظهار الرمز'}
                className="absolute top-1/2 -translate-y-1/2 right-3 p-1 text-slate-400 hover:text-white cursor-pointer"
              >
                {showVerificationPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              مطلوب إدخال الرمز التأكيدي قبل حفظ أي تغيير على اسم المستخدم أو كلمة المرور.
            </p>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-theme-primary hover:bg-theme-primary text-white font-bold text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(var(--theme-primary-rgb),0.3)] transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>حفظ وتأكيد بيانات الدخول</span>
          </button>
        </form>
      </div>

      {/* 2. MANAGE / CHANGE SECURITY PIN */}
      <div className="p-4 sm:p-6 md:p-8 rounded-2xl quantix-card space-y-5 shadow-xl min-w-0">
        <div className="flex items-start justify-between gap-3 pb-4 border-b border-white/[0.08]/80">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-theme-secondary" />
              <span>تغيير الرمز التأكيدي (Security PIN)</span>
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-1">
              تحديث رمز الأمان المستخدم لتأكيد تغييرات بيانات الدخول
            </p>
          </div>
        </div>

        {pinSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{pinSuccess}</span>
          </div>
        )}

        {pinError && (
          <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{pinError}</span>
          </div>
        )}

        <form onSubmit={handlePinUpdate} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="pin-current" className="block text-xs font-mono text-slate-300 mb-1.5">
              الرمز الحالي *
            </label>
            <input
              id="pin-current"
              type="password"
              dir="ltr"
              inputMode="numeric"
              autoComplete="off"
              value={currentPinInput}
              onChange={(e) => setCurrentPinInput(e.target.value)}
              placeholder="••••"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm font-mono outline-none focus:border-theme-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="pin-new" className="block text-xs font-mono text-slate-300 mb-1.5">
              الرمز الجديد *
            </label>
            <input
              id="pin-new"
              type="password"
              dir="ltr"
              inputMode="numeric"
              autoComplete="off"
              value={newPinInput}
              onChange={(e) => setNewPinInput(e.target.value)}
              placeholder="••••"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm font-mono outline-none focus:border-theme-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="pin-confirm" className="block text-xs font-mono text-slate-300 mb-1.5">
              تأكيد الرمز الجديد *
            </label>
            <input
              id="pin-confirm"
              type="password"
              dir="ltr"
              inputMode="numeric"
              autoComplete="off"
              value={confirmPinInput}
              onChange={(e) => setConfirmPinInput(e.target.value)}
              placeholder="••••"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm font-mono outline-none focus:border-theme-primary"
              required
            />
          </div>
          <div className="sm:col-span-3">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-white/[0.06] hover:bg-theme-primary border border-white/10 hover:border-transparent text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>حفظ الرمز التأكيدي الجديد</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
