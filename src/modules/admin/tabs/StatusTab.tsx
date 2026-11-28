import React, { useState } from 'react';
import { CheckCircle2, MessageSquare, Radio, Save } from 'lucide-react';
import type { ProfileInfo } from '@shared/types';
import {
  AVAILABILITY_ICON_OPTIONS,
  AvailabilityBadgeIcon,
  AvailabilityPreviewGlyph,
} from '@shared/utils/availabilityIcon';
import { usePortfolio } from '@/app/providers/PortfolioContext';
import type { RequestConfirmFn } from '../types';

interface StatusTabProps {
  profileForm: ProfileInfo;
  setProfileForm: React.Dispatch<React.SetStateAction<ProfileInfo>>;
  requestConfirm: RequestConfirmFn;
}

export const StatusTab: React.FC<StatusTabProps> = ({
  profileForm,
  setProfileForm,
  requestConfirm,
}) => {
  const { lang, updateProfile } = usePortfolio();
  const [statusSuccess, setStatusSuccess] = useState('');

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
          <Radio className="w-6 h-6 text-emerald-400 animate-pulse" />
          <span>إدارة حالة التوفر والتواجد والواتساب</span>
        </h2>
        <p className="text-xs text-slate-400 font-mono mt-1">
          تحكم فوري في إشارة تواجدك الحية، شارة التوظيف للزوار، وحالة الرد على واتساب
        </p>
      </div>

      {statusSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center gap-2.5 shadow-lg">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{statusSuccess}</span>
        </div>
      )}

      {/* CARD 1: GENERAL WORK AVAILABILITY & PRESENCE */}
      <div className="p-6 quantix-card space-y-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-theme-primary/10 border border-theme-primary/30 flex items-center justify-center text-theme-primary shrink-0">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                1. حالة التوفر والعمل العامة (Work &amp; Hiring Status)
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                تظهر في شارة الأفاتار التفاعلية بالهيرو وقسم التواصل
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              setProfileForm({
                ...profileForm,
                showAvailabilityBadge: profileForm.showAvailabilityBadge === false,
              })
            }
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer ${
              profileForm.showAvailabilityBadge !== false
                ? 'bg-theme-primary/15 text-theme-primary border-theme-primary/40'
                : 'bg-[#14151B] text-slate-400 border-white/[0.08]'
            }`}
          >
            {profileForm.showAvailabilityBadge !== false ? 'الشارة: مفعّلة (ON)' : 'الشارة: مخفية (OFF)'}
          </button>
        </div>

        {/* Quick Presets */}
        <div>
          <label className="block text-xs font-mono text-slate-300 mb-2 font-semibold">
            اختر نمط الحالة بنقرة واحدة (Presets):
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() =>
                setProfileForm({
                  ...profileForm,
                  availabilityStatus: 'available',
                  availabilityNoteAr: 'جاهز للمشاريع والتحديات الهندسية',
                  availabilityNoteEn: 'Available for High-Impact Roles',
                })
              }
              className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col gap-1.5 cursor-pointer ${
                (profileForm.availabilityStatus || 'available') === 'available'
                  ? 'bg-emerald-950/30 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/50'
                  : 'bg-[#0B0C10] border-white/[0.08] text-slate-400 hover:border-white/[0.08]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  متاح للعمل (Available)
                </span>
                {(profileForm.availabilityStatus || 'available') === 'available' && (
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">نشط</span>
                )}
              </div>
              <span className="text-[11px] text-slate-400">للمشاريع الجديدة والتوظيف الفوري</span>
            </button>

            <button
              type="button"
              onClick={() =>
                setProfileForm({
                  ...profileForm,
                  availabilityStatus: 'busy',
                  availabilityNoteAr: 'مشغول حالياً بمشاريع قائمة',
                  availabilityNoteEn: 'Busy with Ongoing Projects',
                })
              }
              className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col gap-1.5 cursor-pointer ${
                profileForm.availabilityStatus === 'busy'
                  ? 'bg-amber-950/30 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/50'
                  : 'bg-[#0B0C10] border-white/[0.08] text-slate-400 hover:border-white/[0.08]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-amber-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  مشغول / محدد (Busy)
                </span>
                {profileForm.availabilityStatus === 'busy' && (
                  <span className="text-[10px] font-mono text-amber-400 font-bold">نشط</span>
                )}
              </div>
              <span className="text-[11px] text-slate-400">متاح لفرص واستشارات محددة فقط</span>
            </button>

            <button
              type="button"
              onClick={() =>
                setProfileForm({
                  ...profileForm,
                  availabilityStatus: 'offline',
                  availabilityNoteAr: 'غير متاح حالياً لاستقبال مشاريع',
                  availabilityNoteEn: 'Currently Unavailable',
                })
              }
              className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col gap-1.5 cursor-pointer ${
                profileForm.availabilityStatus === 'offline'
                  ? 'bg-[#14151B] border-white/20 shadow-md ring-1 ring-slate-500'
                  : 'bg-[#0B0C10] border-white/[0.08] text-slate-400 hover:border-white/[0.08]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-500" />
                  غير متاح (Offline)
                </span>
                {profileForm.availabilityStatus === 'offline' && (
                  <span className="text-[10px] font-mono text-slate-300 font-bold">نشط</span>
                )}
              </div>
              <span className="text-[11px] text-slate-400">معتذر حالياً عن قبول مشاريع</span>
            </button>
          </div>
        </div>

        {/* Custom Text Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1 font-semibold">
              نص الحالة المخصص (عربي):
            </label>
            <input
              type="text"
              value={profileForm.availabilityNoteAr || ''}
              onChange={(e) => setProfileForm({ ...profileForm, availabilityNoteAr: e.target.value })}
              placeholder="مثال: جاهز للمشاريع والتحديات الهندسية"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm outline-none focus:border-theme-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1 font-semibold">
              نص الحالة المخصص (English):
            </label>
            <input
              type="text"
              value={profileForm.availabilityNoteEn || ''}
              onChange={(e) => setProfileForm({ ...profileForm, availabilityNoteEn: e.target.value })}
              placeholder="e.g. Available for High-Impact Roles"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm font-mono outline-none focus:border-theme-primary"
            />
          </div>
        </div>

        {/* Availability Badge Icon Selector */}
        <div className="space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <label className="block text-xs font-mono text-slate-300 font-semibold">
              أيقونة شارة الحالة (Status Badge Icon):
            </label>
            <span className="text-[11px] font-mono text-slate-500">
              تظهر بجانب نقطة الحالة في الهيرو والتذييل (بدلاً من أيقونة النبض)
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {AVAILABILITY_ICON_OPTIONS.map((opt) => {
              const activeIcon = (profileForm.availabilityIcon || 'auto') === opt.id;
              const currentStatus = profileForm.availabilityStatus || 'available';
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setProfileForm({ ...profileForm, availabilityIcon: opt.id })}
                  className={`p-2.5 rounded-xl border text-right transition-all flex items-center gap-2.5 cursor-pointer ${
                    activeIcon
                      ? 'bg-theme-primary/15 border-theme-primary/55 text-white ring-1 ring-theme-primary/40 shadow-[0_0_15px_rgba(var(--theme-primary-rgb),0.15)]'
                      : 'bg-[#0B0C10] border-white/[0.08] text-slate-300 hover:border-white/20'
                  }`}
                  title={lang === 'ar' ? opt.descAr : opt.descEn}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                      activeIcon
                        ? 'bg-theme-primary/20 border-theme-primary/40 text-theme-primary'
                        : 'bg-white/[0.03] border-white/[0.08] text-slate-400'
                    }`}
                  >
                    <AvailabilityPreviewGlyph icon={opt.id} status={currentStatus} className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold truncate">
                      {lang === 'ar' ? opt.labelAr : opt.labelEn}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 truncate">
                      {opt.isAuto ? (lang === 'ar' ? 'تتغير بالحالة' : 'Auto by status') : opt.id}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Preview Avatar Badge */}
        <div className="p-4 quantix-card flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-mono text-slate-400">معاينة شكل الشارة في الهيرو والأفاتار:</span>
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#08090C] border text-xs font-mono font-semibold self-start sm:self-auto ${
              (profileForm.availabilityStatus || 'available') === 'available'
                ? 'border-emerald-500/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                : profileForm.availabilityStatus === 'busy'
                ? 'border-amber-500/40 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                : 'border-white/[0.08] text-slate-400'
            }`}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              {(profileForm.availabilityStatus || 'available') === 'available' && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              )}
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  (profileForm.availabilityStatus || 'available') === 'available'
                    ? 'bg-emerald-400'
                    : profileForm.availabilityStatus === 'busy'
                    ? 'bg-amber-400'
                    : 'bg-slate-500'
                }`}
              />
            </span>
            <AvailabilityBadgeIcon
              icon={profileForm.availabilityIcon}
              status={profileForm.availabilityStatus || 'available'}
            />
            <span>
              {profileForm.availabilityNoteAr ||
                ((profileForm.availabilityStatus || 'available') === 'available'
                  ? 'جاهز للمشاريع والتحديات الهندسية'
                  : profileForm.availabilityStatus === 'busy'
                  ? 'مشغول حالياً بمشاريع قائمة'
                  : 'غير متاح حالياً')}
            </span>
          </div>
        </div>
      </div>

      {/* CARD 2: WHATSAPP LIVE RESPONSE STATUS */}
      <div className="p-6 quantix-card space-y-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                2. حالة الرد على واتساب (WhatsApp Live Status)
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                تظهر بجانب رقم الواتساب ورابط المحادثة الفورية في قسم التواصل
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              setProfileForm({
                ...profileForm,
                showWhatsAppStatus: profileForm.showWhatsAppStatus === false,
              })
            }
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer ${
              profileForm.showWhatsAppStatus !== false
                ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40'
                : 'bg-[#14151B] text-slate-400 border-white/[0.08]'
            }`}
          >
            {profileForm.showWhatsAppStatus !== false ? 'شارة الواتساب: مفعّلة (ON)' : 'شارة الواتساب: مخفية (OFF)'}
          </button>
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 mb-2 font-semibold">
            اختر حالة التوفر على واتساب:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() =>
                setProfileForm({
                  ...profileForm,
                  whatsappStatus: 'online',
                  whatsappNoteAr: 'متاح الآن للرد الفوري',
                  whatsappNoteEn: 'Available for immediate reply',
                })
              }
              className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col gap-1.5 cursor-pointer ${
                (profileForm.whatsappStatus || 'online') === 'online'
                  ? 'bg-emerald-950/30 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/50'
                  : 'bg-[#0B0C10] border-white/[0.08] text-slate-400 hover:border-white/[0.08]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  متصل للرد الفوري (Online)
                </span>
                {(profileForm.whatsappStatus || 'online') === 'online' && (
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">نشط</span>
                )}
              </div>
              <span className="text-[11px] text-slate-400">رد سريع خلال دقائق</span>
            </button>

            <button
              type="button"
              onClick={() =>
                setProfileForm({
                  ...profileForm,
                  whatsappStatus: 'delayed',
                  whatsappNoteAr: 'مشغول • الرد خلال ساعات',
                  whatsappNoteEn: 'Replies within a few hours',
                })
              }
              className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col gap-1.5 cursor-pointer ${
                profileForm.whatsappStatus === 'delayed'
                  ? 'bg-amber-950/30 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/50'
                  : 'bg-[#0B0C10] border-white/[0.08] text-slate-400 hover:border-white/[0.08]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-amber-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  الرد خلال ساعات (Delayed)
                </span>
                {profileForm.whatsappStatus === 'delayed' && (
                  <span className="text-[10px] font-mono text-amber-400 font-bold">نشط</span>
                )}
              </div>
              <span className="text-[11px] text-slate-400">مشغول في كود أو اجتماع</span>
            </button>

            <button
              type="button"
              onClick={() =>
                setProfileForm({
                  ...profileForm,
                  whatsappStatus: 'offline',
                  whatsappNoteAr: 'غير متصل حالياً • اترك رسالة',
                  whatsappNoteEn: 'Offline • Leave a message',
                })
              }
              className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col gap-1.5 cursor-pointer ${
                profileForm.whatsappStatus === 'offline'
                  ? 'bg-[#14151B] border-white/20 shadow-md ring-1 ring-slate-500'
                  : 'bg-[#0B0C10] border-white/[0.08] text-slate-400 hover:border-white/[0.08]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-500" />
                  غير متصل (Offline)
                </span>
                {profileForm.whatsappStatus === 'offline' && (
                  <span className="text-[10px] font-mono text-slate-300 font-bold">نشط</span>
                )}
              </div>
              <span className="text-[11px] text-slate-400">سيعاود الرد لاحقاً</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1 font-semibold">
              نص حالة الواتساب (عربي):
            </label>
            <input
              type="text"
              value={profileForm.whatsappNoteAr || ''}
              onChange={(e) => setProfileForm({ ...profileForm, whatsappNoteAr: e.target.value })}
              placeholder="مثال: متاح الآن للرد الفوري"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm outline-none focus:border-theme-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1 font-semibold">
              نص حالة الواتساب (English):
            </label>
            <input
              type="text"
              value={profileForm.whatsappNoteEn || ''}
              onChange={(e) => setProfileForm({ ...profileForm, whatsappNoteEn: e.target.value })}
              placeholder="e.g. Available for immediate reply"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm font-mono outline-none focus:border-theme-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1 font-semibold">
            رابط واتساب المباشر (Direct WhatsApp Link):
          </label>
          <input
            type="text"
            value={profileForm.whatsapp || ''}
            onChange={(e) => setProfileForm({ ...profileForm, whatsapp: e.target.value })}
            placeholder="https://wa.me/201000000000 أو wa.me"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-emerald-400 text-sm font-mono outline-none focus:border-emerald-500"
          />
          <p className="text-[11px] text-slate-400 font-mono mt-1">
            يتم تحويل الزائر مباشرة لمحادثتك عند النقر على أيقونة الواتساب في قسم التواصل.
          </p>
        </div>

        <div className="p-4 quantix-card flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-mono text-slate-400">معاينة شارة الواتساب في بطاقة التواصل:</span>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium self-start sm:self-auto ${
              (profileForm.whatsappStatus || 'online') === 'online'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : profileForm.whatsappStatus === 'delayed'
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                : 'bg-[#14151B] text-slate-400 border border-white/[0.08]'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                (profileForm.whatsappStatus || 'online') === 'online'
                  ? 'bg-emerald-400 animate-pulse'
                  : profileForm.whatsappStatus === 'delayed'
                  ? 'bg-amber-400'
                  : 'bg-slate-500'
              }`}
            />
            <span>
              {profileForm.whatsappNoteAr ||
                ((profileForm.whatsappStatus || 'online') === 'online'
                  ? 'متاح الآن للرد الفوري'
                  : profileForm.whatsappStatus === 'delayed'
                  ? 'مشغول • الرد خلال ساعات'
                  : 'غير متصل حالياً • اترك رسالة')}
            </span>
          </span>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={() =>
            requestConfirm({
              variant: 'edit',
              title: 'تأكيد تحديث حالات التوفر والواتساب',
              description: 'هل تريد حفظ وتطبيق حالات التوفر والواتساب الجديدة على البورتفوليو؟',
              confirmLabel: 'تأكيد الحفظ',
              onConfirm: () => {
                updateProfile(profileForm);
                setStatusSuccess('تم حفظ وتحديث حالات التوفر والواتساب بنجاح في البورتفوليو!');
                setTimeout(() => setStatusSuccess(''), 4000);
              },
            })
          }
          className="px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-theme-primary hover:from-emerald-400 hover:to-theme-primary text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all flex items-center gap-2 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>حفظ وتطبيق الحالات في البورتفوليو</span>
        </button>
      </div>
    </div>
  );
};
