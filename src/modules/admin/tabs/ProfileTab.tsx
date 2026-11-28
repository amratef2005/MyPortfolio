import React from 'react';
import { Image as ImageIcon, Save, Upload } from 'lucide-react';
import type { ProfileInfo } from '@shared/types';
import { compressImageFile } from '@shared/utils/imageCompressor';
import { usePortfolio } from '@/app/providers/PortfolioContext';
import type { RequestConfirmFn } from '../types';

interface ProfileTabProps {
  profileForm: ProfileInfo;
  setProfileForm: React.Dispatch<React.SetStateAction<ProfileInfo>>;
  requestConfirm: RequestConfirmFn;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  profileForm,
  setProfileForm,
  requestConfirm,
}) => {
  const { updateProfile } = usePortfolio();

  const handleHeroFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressedDataUrl = await compressImageFile(file, 800, 0.88);
      if (compressedDataUrl) {
        setProfileForm((prev) => ({ ...prev, heroAvatarUrl: compressedDataUrl }));
      }
    } catch (err) {
      console.error('Hero image compression error:', err);
    }
  };

  const handleTopFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressedDataUrl = await compressImageFile(file, 320, 0.88);
      if (compressedDataUrl) {
        setProfileForm((prev) => ({ ...prev, topAvatarUrl: compressedDataUrl }));
      }
    } catch (err) {
      console.error('Top image compression error:', err);
    }
  };

  return (
    <div className="space-y-5 quantix-card p-6">
      <div>
        <h2 className="text-xl font-bold text-white">البيانات الشخصية والصور</h2>
        <p className="text-xs text-slate-400 font-mono mt-0.5">تعديل الاسم والنبذة ومسار الصورة العلوية</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">الاسم الكامل (عربي - للأعلى والـ CV)</label>
          <input
            type="text"
            value={profileForm.nameAr}
            onChange={(e) => setProfileForm({ ...profileForm, nameAr: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">الاسم المختصر (عربي - للهيرو الرئيسي)</label>
          <input
            type="text"
            value={profileForm.shortNameAr || 'عمرو عاطف'}
            onChange={(e) => setProfileForm({ ...profileForm, shortNameAr: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm"
          />
        </div>
        <div>
          <label htmlFor="profile-name-en" className="block text-xs font-mono text-slate-300 mb-1">الاسم الكامل (English - Top &amp; CV)</label>
          <input
            id="profile-name-en"
            name="name"
            type="text"
            autoComplete="name"
            value={profileForm.name}
            onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm font-mono"
          />
        </div>
        <div>
          <label htmlFor="profile-shortname-en" className="block text-xs font-mono text-slate-300 mb-1">الاسم المختصر (English - Hero)</label>
          <input
            id="profile-shortname-en"
            name="given-name"
            type="text"
            autoComplete="nickname"
            value={profileForm.shortName || 'Amr Atef'}
            onChange={(e) => setProfileForm({ ...profileForm, shortName: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">اسم الشعار في الناف بار (عربي - Navbar Logo)</label>
          <input
            type="text"
            value={profileForm.brandNameAr || ''}
            onChange={(e) => setProfileForm({ ...profileForm, brandNameAr: e.target.value })}
            placeholder="عمرو عاطف"
            className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">اسم الشعار في الناف بار (English - Navbar Logo)</label>
          <input
            type="text"
            value={profileForm.brandName || ''}
            onChange={(e) => setProfileForm({ ...profileForm, brandName: e.target.value })}
            placeholder="Amr Atef"
            className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm font-mono"
          />
        </div>
        <div>
          <label htmlFor="profile-title-en" className="block text-xs font-mono text-slate-300 mb-1">المسمى الوظيفي (English - Title)</label>
          <input
            id="profile-title-en"
            name="organization-title"
            type="text"
            autoComplete="organization-title"
            value={profileForm.title}
            onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">المسمى الوظيفي (عربي)</label>
          <input
            type="text"
            value={profileForm.titleAr}
            onChange={(e) => setProfileForm({ ...profileForm, titleAr: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm"
          />
        </div>
        <div>
          <label htmlFor="profile-github" className="block text-xs font-mono text-slate-300 mb-1">رابط GitHub</label>
          <input
            id="profile-github"
            name="github"
            type="url"
            dir="ltr"
            autoComplete="url"
            autoCapitalize="none"
            value={profileForm.github}
            onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm font-mono"
          />
        </div>
        <div>
          <label htmlFor="profile-linkedin" className="block text-xs font-mono text-slate-300 mb-1">رابط LinkedIn</label>
          <input
            id="profile-linkedin"
            name="linkedin"
            type="url"
            dir="ltr"
            autoComplete="url"
            autoCapitalize="none"
            value={profileForm.linkedin}
            onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm font-mono"
          />
        </div>
        <div>
          <label htmlFor="profile-email" className="block text-xs font-mono text-slate-300 mb-1">البريد الإلكتروني</label>
          <input
            id="profile-email"
            name="email"
            type="email"
            dir="ltr"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            value={profileForm.email}
            onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm font-mono"
          />
        </div>
        <div>
          <label htmlFor="profile-phone" className="block text-xs font-mono text-slate-300 mb-1">واتساب (WhatsApp)</label>
          <input
            id="profile-phone"
            name="tel"
            type="text"
            dir="ltr"
            autoComplete="tel"
            value={profileForm.phone}
            onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm font-mono"
          />
        </div>
        <div>
          <label htmlFor="profile-location-en" className="block text-xs font-mono text-slate-300 mb-1">الموقع الجغرافي (English)</label>
          <input
            id="profile-location-en"
            name="location"
            type="text"
            autoComplete="address-level2"
            value={profileForm.location}
            onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">الموقع الجغرافي (عربي)</label>
          <input
            type="text"
            value={profileForm.locationAr}
            onChange={(e) => setProfileForm({ ...profileForm, locationAr: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm"
          />
        </div>
      </div>

      {/* HERO AVATAR & NAVBAR IMAGE CONTROLS */}
      <div className="p-6 rounded-2xl bg-[#0B0C10]/80 border border-theme-primary/30 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-2 text-theme-primary font-bold text-base">
            <ImageIcon className="w-5 h-5 text-theme-primary" />
            <span>إدارة الصور والهوية البصرية للموقع</span>
          </div>
          <span className="text-[11px] font-mono text-theme-primary/80 bg-theme-primary/10 px-3 py-1 rounded-full border border-theme-primary/25">
            تحديث مباشر ومزامنة لحظية
          </span>
        </div>

        <div className="p-4 quantix-card space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <label className="block text-sm font-bold text-white mb-0.5">
                صورة الهيرو التفاعلية 3D (Hero Main Avatar):
              </label>
              <p className="text-xs text-slate-400">
                الصورة الكبيرة في مقدمة الموقع التي تتفاعل بحركة ثلاثية الأبعاد مع الماوس وتُفرز هالات ضوئية متناغمة.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#0B0C10] border-2 border-theme-primary/50 p-1 flex items-center justify-center shadow-[0_0_15px_rgba(var(--theme-primary-rgb),0.25)]">
                <img
                  src={profileForm.heroAvatarUrl || '/drama_hero.png'}
                  alt="Hero Preview"
                  className="w-full h-full object-contain filter drop-shadow"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/drama_hero.png';
                  }}
                />
              </div>
              <span className="text-[11px] font-mono text-slate-400">معاينة الهيرو</span>
            </div>
          </div>

          <div>
            <span className="block text-xs font-mono text-slate-400 mb-2">اختر من الصور الجاهزة بالبرتفوليو:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {[
                { label: 'الصورة المفرغة الجديدة', url: '/drama_hero.png', tag: 'الموصى بها' },
                { label: 'الصورة الكلاسيكية المفرغة', url: '/my_transparent.png', tag: 'السابقة' },
                { label: 'صورة البورتريه مع الخلفية', url: '/WhatsApp Image 2026-11-22 at 7.04.38 AM.jpeg', tag: 'الأصلية' },
                { label: 'الصورة المربعة الرسمية', url: '/my.jpg', tag: 'الرسمية' },
              ].map((item) => (
                <button
                  key={item.url}
                  type="button"
                  onClick={() => setProfileForm((prev) => ({ ...prev, heroAvatarUrl: item.url }))}
                  className={`p-2.5 rounded-xl text-start border transition-all flex flex-col justify-between text-xs ${
                    (profileForm.heroAvatarUrl || '/drama_hero.png') === item.url
                      ? 'bg-theme-primary/15 border-theme-primary text-theme-primary shadow-[0_0_12px_rgba(var(--theme-primary-rgb),0.25)]'
                      : 'bg-[#0B0C10] border-white/[0.08] text-slate-300 hover:border-white/[0.08]'
                  }`}
                >
                  <span className="font-bold truncate">{item.label}</span>
                  <div className="flex items-center justify-between mt-1 text-[10px] font-mono text-slate-400">
                    <span className="text-theme-primary">{item.tag}</span>
                    <span className="truncate max-w-[100px]">{item.url}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div className="md:col-span-8 space-y-1">
              <label className="block text-xs font-mono text-slate-400">أو اكتب مسار / رابط الصورة:</label>
              <input
                type="text"
                value={profileForm.heroAvatarUrl || '/drama_hero.png'}
                onChange={(e) => setProfileForm({ ...profileForm, heroAvatarUrl: e.target.value })}
                placeholder="/drama_hero.png أو رابط خارجي https://..."
                className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-theme-primary text-xs font-mono"
              />
            </div>
            <div className="md:col-span-4">
              <label className="block text-xs font-mono text-slate-400 mb-1">رفع صورة جديدة من جهازك:</label>
              <label className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-theme-primary/10 hover:bg-theme-primary/20 border border-theme-primary/40 text-theme-primary text-xs font-bold cursor-pointer transition-all shadow-sm">
                <Upload className="w-4 h-4 shrink-0" />
                <span>رفع صورة من الجهاز</span>
                <input type="file" accept="image/*" onChange={handleHeroFileUpload} className="hidden" />
              </label>
            </div>
          </div>
        </div>

        <div className="p-4 quantix-card space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <label className="block text-sm font-bold text-white mb-0.5">
                صورة شريط التنقل (Navbar Avatar):
              </label>
              <p className="text-xs text-slate-400">
                الصورة الرمزية الصغيرة الظاهرة بجانب اسمك في الـ Navbar بأعلى الموقع.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#0B0C10] border border-theme-primary/40 p-0.5">
                <img
                  src={profileForm.topAvatarUrl || '/my.jpg'}
                  alt="Navbar Preview"
                  className="w-full h-full object-cover object-top rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/my.jpg';
                  }}
                />
              </div>
              <span className="text-[11px] font-mono text-slate-400">معاينة النافبار</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div className="md:col-span-8">
              <input
                type="text"
                value={profileForm.topAvatarUrl || '/my.jpg'}
                onChange={(e) => setProfileForm({ ...profileForm, topAvatarUrl: e.target.value })}
                placeholder="/my.jpg أو رابط صورة"
                className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-theme-primary text-xs font-mono"
              />
            </div>
            <div className="md:col-span-4">
              <label className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#0B0C10] hover:bg-[#14151B] border border-white/[0.08] text-slate-200 text-xs font-bold cursor-pointer transition-all">
                <Upload className="w-4 h-4 shrink-0 text-theme-primary" />
                <span>رفع صورة للنافبار</span>
                <input type="file" accept="image/*" onChange={handleTopFileUpload} className="hidden" />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">النبذة التعريفية (عربي - Bio)</label>
          <textarea
            rows={4}
            value={profileForm.bioAr}
            onChange={(e) => setProfileForm({ ...profileForm, bioAr: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">النبذة التعريفية (English - Bio)</label>
          <textarea
            rows={4}
            value={profileForm.bio}
            onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm font-mono"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() =>
          requestConfirm({
            variant: 'edit',
            title: 'تأكيد تعديل البيانات الشخصية',
            description: 'هل تريد حفظ وتطبيق التعديلات الجديدة على الملف الشخصي في البورتفوليو؟',
            confirmLabel: 'تأكيد الحفظ',
            onConfirm: () => {
              updateProfile(profileForm);
            },
          })
        }
        className="px-6 py-2.5 rounded-xl bg-theme-primary hover:bg-theme-primary text-white font-bold text-xs flex items-center gap-2 shadow-lg"
      >
        <Save className="w-4 h-4" />
        <span>تحديث البيانات الشخصية</span>
      </button>
    </div>
  );
};
