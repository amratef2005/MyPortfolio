import React, { useEffect, useState } from 'react';
import { CheckCircle2, Pencil, Save, Upload, X } from 'lucide-react';
import { compressImageFile } from '@shared/utils/imageCompressor';
import { usePortfolio } from '@/app/providers/PortfolioContext';
import type { RequestConfirmFn } from '../types';

interface BrandIdentityModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestConfirm: RequestConfirmFn;
}

export const BrandIdentityModal: React.FC<BrandIdentityModalProps> = ({
  isOpen,
  onClose,
  requestConfirm,
}) => {
  const { profile, updateProfile } = usePortfolio();
  const [uploadingBrandAvatar, setUploadingBrandAvatar] = useState(false);
  const [brandSuccess, setBrandSuccess] = useState(false);
  const [brandForm, setBrandForm] = useState({
    topAvatarUrl: profile.topAvatarUrl || '/my.jpg',
    name: profile.name || 'Amr Atef Imam Kandel',
    nameAr: profile.nameAr || 'عمرو عاطف إمام قنديل',
    title: profile.title || '.NET Backend Developer',
    titleAr: profile.titleAr || 'مطور نظم خلفية .NET',
  });

  useEffect(() => {
    setBrandForm({
      topAvatarUrl: profile.topAvatarUrl || '/my.jpg',
      name: profile.name || 'Amr Atef Imam Kandel',
      nameAr: profile.nameAr || 'عمرو عاطف إمام قنديل',
      title: profile.title || '.NET Backend Developer',
      titleAr: profile.titleAr || 'مطور نظم خلفية .NET',
    });
  }, [profile]);

  if (!isOpen) return null;

  const handleBrandAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingBrandAvatar(true);
    try {
      const compressedDataUrl = await compressImageFile(file, 320, 0.88);
      if (compressedDataUrl) {
        setBrandForm((prev) => ({ ...prev, topAvatarUrl: compressedDataUrl }));
      }
    } catch (err) {
      console.error('Image compression error:', err);
    } finally {
      setUploadingBrandAvatar(false);
    }
  };

  const handleSaveBrand = (e: React.FormEvent) => {
    e.preventDefault();
    requestConfirm({
      variant: 'edit',
      title: 'تأكيد تعديل هوية شريط التنقل',
      description: 'هل تريد حفظ وتطبيق صورة واسم ومسمى شريط التنقل (Navbar) على الموقع؟',
      confirmLabel: 'تأكيد التطبيق',
      onConfirm: () => {
        updateProfile({
          topAvatarUrl: brandForm.topAvatarUrl,
          name: brandForm.name,
          nameAr: brandForm.nameAr,
          title: brandForm.title,
          titleAr: brandForm.titleAr,
        });
        setBrandSuccess(true);
        setTimeout(() => {
          setBrandSuccess(false);
          onClose();
        }, 1200);
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#08090C] border border-white/[0.08] rounded-2xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl text-start space-y-5 sm:space-y-6 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 sm:top-4 left-3 sm:left-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-[#0B0C10] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2 text-theme-primary mb-1">
            <Pencil className="w-5 h-5 text-theme-primary" />
            <h3 className="text-xl font-bold text-white">تعديل هوية شريط التنقل (Navbar Brand)</h3>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            عدّل الصورة المصغرة، والاسم الكامل، والمسمى الوظيفي كما يظهر في أعلى الموقع للزوار.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#06080d] border border-theme-primary/30 space-y-2">
          <span className="text-[11px] font-mono text-theme-primary font-semibold block">معاينة حية لشكل النافبار (Live Preview):</span>
          <div className="p-3 rounded-xl bg-[#06080d]/90 border border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-tr from-theme-primary to-indigo-600 p-0.5 shadow-[0_0_15px_rgba(var(--theme-primary-rgb),0.35)] shrink-0">
              <img
                src={brandForm.topAvatarUrl || '/my.jpg'}
                alt="Preview"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/drama_hero.png';
                }}
                className="w-full h-full object-cover object-top rounded-[10px]"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-white text-sm tracking-wide">
                {brandForm.name || 'Amr Atef Imam Kandel'}
              </span>
              <span className="text-[10px] font-mono text-theme-primary/90 tracking-wider">
                {brandForm.title ? brandForm.title.toUpperCase() : '.NET BACKEND DEVELOPER'}
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSaveBrand} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-mono text-slate-300 font-bold">
              صورة النافبار (Navbar Avatar Image):
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={brandForm.topAvatarUrl}
                onChange={(e) => setBrandForm({ ...brandForm, topAvatarUrl: e.target.value })}
                placeholder="/my.jpg أو رابط خارجي"
                className="flex-1 px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-theme-primary text-xs font-mono focus:border-theme-primary outline-none"
              />
              <label
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl bg-theme-primary/10 hover:bg-theme-primary/20 border border-theme-primary/30 text-theme-primary text-xs font-bold cursor-pointer transition-all shrink-0 ${
                  uploadingBrandAvatar ? 'opacity-60 pointer-events-none' : ''
                }`}
              >
                <Upload className={`w-3.5 h-3.5 ${uploadingBrandAvatar ? 'animate-spin' : ''}`} />
                <span>{uploadingBrandAvatar ? 'جاري المعالجة...' : 'رفع صورة'}</span>
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploadingBrandAvatar}
                  onChange={handleBrandAvatarUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                { label: 'الصورة الشخصية الرسمية', url: '/my.jpg' },
                { label: 'صورة البورتريه الجديدة', url: '/drama_hero.png' },
                { label: 'الصورة الكلاسيكية المفرغة', url: '/my_transparent.png' },
              ].map((preset) => (
                <button
                  key={preset.url}
                  type="button"
                  onClick={() => setBrandForm({ ...brandForm, topAvatarUrl: preset.url })}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono border transition-all ${
                    brandForm.topAvatarUrl === preset.url
                      ? 'bg-theme-primary/20 border-theme-primary text-theme-primary'
                      : 'bg-[#0B0C10] border-white/[0.08] text-slate-400 hover:text-white'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">الاسم بالإنجليزية (English Name):</label>
              <input
                type="text"
                value={brandForm.name}
                onChange={(e) => setBrandForm({ ...brandForm, name: e.target.value })}
                placeholder="Amr Atef Imam Kandel"
                className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-xs font-mono focus:border-theme-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">الاسم بالعربية (Arabic Name):</label>
              <input
                type="text"
                value={brandForm.nameAr}
                onChange={(e) => setBrandForm({ ...brandForm, nameAr: e.target.value })}
                placeholder="عمرو عاطف إمام قنديل"
                className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-xs focus:border-theme-primary outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">المسمى الوظيفي (English Title):</label>
              <input
                type="text"
                value={brandForm.title}
                onChange={(e) => setBrandForm({ ...brandForm, title: e.target.value })}
                placeholder=".NET Backend Developer"
                className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-xs font-mono focus:border-theme-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">المسمى الوظيفي (Arabic Title):</label>
              <input
                type="text"
                value={brandForm.titleAr}
                onChange={(e) => setBrandForm({ ...brandForm, titleAr: e.target.value })}
                placeholder="مطور نظم خلفية .NET"
                className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-xs focus:border-theme-primary outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-4 py-2.5 rounded-xl border border-white/[0.08] text-slate-400 hover:text-white text-xs font-mono transition-colors flex items-center justify-center"
            >
              إلغاء
            </button>

            <button
              type="submit"
              className="min-h-[44px] px-5 sm:px-6 py-2.5 rounded-xl bg-theme-primary hover:bg-theme-primary text-white font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(var(--theme-primary-rgb),0.3)] transition-all"
            >
              {brandSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>تم الحفظ والتطبيق!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>حفظ وتطبيق على الموقع</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
