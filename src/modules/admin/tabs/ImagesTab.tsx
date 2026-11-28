import React from 'react';
import { Image as ImageIcon, Save } from 'lucide-react';
import type { ProfileInfo } from '@shared/types';

interface ImagesTabProps {
  profileForm: ProfileInfo;
  setProfileForm: React.Dispatch<React.SetStateAction<ProfileInfo>>;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>, field: 'heroAvatarUrl' | 'aboutAvatarUrl') => void;
  onSaveProfile: () => void;
}

export const ImagesTab: React.FC<ImagesTabProps> = ({
  profileForm,
  setProfileForm,
  onImageUpload,
  onSaveProfile,
}) => {
  return (
    <div className="space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-theme-primary/10 border border-theme-primary/25 text-theme-secondary text-xs font-mono mb-2">
          <ImageIcon className="w-3.5 h-3.5 text-theme-primary" />
          <span>التحكم في صور الموقع بالتوهج الدائري</span>
        </div>
        <h4 className="text-2xl font-black text-white">التحكم المستقل في صورة 1 (الرئيسية) وصورة 2 (نبذة عني)</h4>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          يمكنك رفع صورة جديدة من جهازك مباشرة، أو إدخال مسار أو رابط للصورة، وسيتم تطبيق الهالة الدائرية البرتقالية عليها فوراً.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* CARD 1: Hero Image */}
        <div className="p-6 quantix-card quantix-card-interactive flex flex-col justify-between space-y-5 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-theme-primary/10 text-theme-primary text-xs font-mono font-bold">
                صورة 1: الصفحة الأساسية (Hero)
              </span>
              <span className="text-xs text-slate-400 font-mono">قسم الترحيب</span>
            </div>

            <div className="relative w-full h-56 rounded-2xl bg-[#08090C] border border-white/[0.08] flex items-center justify-center overflow-hidden mb-5">
              <div
                className="absolute w-36 h-36 rounded-full blur-2xl"
                style={{ background: 'radial-gradient(circle, rgba(var(--theme-primary-rgb),0.7) 0%, transparent 70%)' }}
              />
              <img
                src={profileForm.heroAvatarUrl || '/drama_hero.png'}
                alt="Hero Avatar Preview"
                className="relative z-10 h-full w-auto object-contain object-bottom drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = '/drama_hero.png';
                }}
              />
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-mono text-slate-300">رفع صورة من جهازك (صورة 1):</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => onImageUpload(e, 'heroAvatarUrl')}
                className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-gradient-to-r file:from-theme-primary file:to-theme-secondary file:text-white hover:file:opacity-90 cursor-pointer"
              />

              <div className="pt-2">
                <label className="block text-xs font-mono text-slate-400 mb-1">أو اكتب مسار/رابط الصورة:</label>
                <input
                  type="text"
                  value={profileForm.heroAvatarUrl || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, heroAvatarUrl: e.target.value })}
                  placeholder="/drama_hero.png"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border border-white/10 text-white text-xs font-mono outline-none focus:border-theme-primary"
                />
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-[11px] text-slate-400 font-mono self-center">صور جاهزة:</span>
                {['/drama_hero.png', '/my_transparent.png', '/my.jpg'].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setProfileForm({ ...profileForm, heroAvatarUrl: preset })}
                    className="px-2.5 py-1 rounded-lg bg-[#08090C] hover:bg-theme-primary/20 text-[11px] text-slate-300 border border-white/[0.08]"
                  >
                    {preset.replace('/', '')}
                  </button>
                ))}
              </div>

              <div className="space-y-2 pt-3 border-t border-white/[0.08]">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-slate-400">التكبير (Scale/Zoom):</span>
                  <span className="text-theme-secondary font-bold">{Math.round((profileForm.heroImageScale ?? 1) * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.7"
                  max="1.4"
                  step="0.02"
                  value={profileForm.heroImageScale ?? 1}
                  onChange={(e) => setProfileForm({ ...profileForm, heroImageScale: parseFloat(e.target.value) })}
                  className="w-full accent-[var(--theme-primary)] cursor-pointer"
                />

                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-slate-400">الموضع الرأسي (Offset Y):</span>
                  <span className="text-theme-secondary font-bold">{profileForm.heroImageOffsetY ?? 0}px</span>
                </div>
                <input
                  type="range"
                  min="-60"
                  max="60"
                  step="1"
                  value={profileForm.heroImageOffsetY ?? 0}
                  onChange={(e) => setProfileForm({ ...profileForm, heroImageOffsetY: parseInt(e.target.value, 10) })}
                  className="w-full accent-[var(--theme-primary)] cursor-pointer"
                />

                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-slate-400">شدة الهالة (Glow):</span>
                  <span className="text-theme-secondary font-bold">{Math.round((profileForm.heroGlowIntensity ?? 1) * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.4"
                  max="1.8"
                  step="0.05"
                  value={profileForm.heroGlowIntensity ?? 1}
                  onChange={(e) => setProfileForm({ ...profileForm, heroGlowIntensity: parseFloat(e.target.value) })}
                  className="w-full accent-[var(--theme-primary)] cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2: About Image */}
        <div className="p-6 quantix-card quantix-card-interactive flex flex-col justify-between space-y-5 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-theme-primary/10 text-theme-secondary text-xs font-mono font-bold">
                صورة 2: الصفحة الثانية (About)
              </span>
              <span className="text-xs text-slate-400 font-mono">قسم نبذة عني</span>
            </div>

            <div className="relative w-full h-56 rounded-2xl bg-[#08090C] border border-white/[0.08] flex items-center justify-center overflow-hidden mb-5">
              <div
                className="absolute w-36 h-36 rounded-full blur-2xl"
                style={{ background: 'radial-gradient(circle, rgba(var(--theme-secondary-rgb),0.7) 0%, transparent 70%)' }}
              />
              <img
                src={profileForm.aboutAvatarUrl || profileForm.heroAvatarUrl || '/my_transparent.png'}
                alt="About Avatar Preview"
                className="relative z-10 h-full w-auto object-contain object-bottom drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = '/my_transparent.png';
                }}
              />
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-mono text-slate-300">رفع صورة من جهازك (صورة 2):</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => onImageUpload(e, 'aboutAvatarUrl')}
                className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-gradient-to-r file:from-[var(--theme-secondary)] file:to-[#FFA726] file:text-white hover:file:opacity-90 cursor-pointer"
              />

              <div className="pt-2">
                <label className="block text-xs font-mono text-slate-400 mb-1">أو اكتب مسار/رابط الصورة:</label>
                <input
                  type="text"
                  value={profileForm.aboutAvatarUrl || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, aboutAvatarUrl: e.target.value })}
                  placeholder="/my_transparent.png"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border border-white/10 text-white text-xs font-mono outline-none focus:border-theme-primary"
                />
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-[11px] text-slate-400 font-mono self-center">صور جاهزة:</span>
                <button
                  type="button"
                  onClick={() => setProfileForm({ ...profileForm, aboutAvatarUrl: '/about_avatar.png' })}
                  className="px-2.5 py-1 rounded-lg bg-theme-primary/20 hover:bg-theme-primary/30 text-[11px] text-theme-secondary font-bold border border-theme-primary/30"
                >
                  about_avatar.png (الجانبية المفرغة)
                </button>
                {['/my_transparent.png', '/drama_hero.png', '/my.jpg'].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setProfileForm({ ...profileForm, aboutAvatarUrl: preset })}
                    className="px-2.5 py-1 rounded-lg bg-[#08090C] hover:bg-theme-primary/20 text-[11px] text-slate-300 border border-white/[0.08]"
                  >
                    {preset.replace('/', '')}
                  </button>
                ))}
              </div>

              <div className="space-y-2 pt-3 border-t border-white/[0.08]">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-slate-400">التكبير (Scale/Zoom):</span>
                  <span className="text-theme-secondary font-bold">{Math.round((profileForm.aboutImageScale ?? 1) * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.7"
                  max="1.4"
                  step="0.02"
                  value={profileForm.aboutImageScale ?? 1}
                  onChange={(e) => setProfileForm({ ...profileForm, aboutImageScale: parseFloat(e.target.value) })}
                  className="w-full accent-[var(--theme-primary)] cursor-pointer"
                />

                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-slate-400">الموضع الرأسي (Offset Y):</span>
                  <span className="text-theme-secondary font-bold">{profileForm.aboutImageOffsetY ?? 0}px</span>
                </div>
                <input
                  type="range"
                  min="-60"
                  max="60"
                  step="1"
                  value={profileForm.aboutImageOffsetY ?? 0}
                  onChange={(e) => setProfileForm({ ...profileForm, aboutImageOffsetY: parseInt(e.target.value, 10) })}
                  className="w-full accent-[var(--theme-primary)] cursor-pointer"
                />

                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-slate-400">شدة الهالة (Glow):</span>
                  <span className="text-theme-secondary font-bold">{Math.round((profileForm.aboutGlowIntensity ?? 1) * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.4"
                  max="1.8"
                  step="0.05"
                  value={profileForm.aboutGlowIntensity ?? 1}
                  onChange={(e) => setProfileForm({ ...profileForm, aboutGlowIntensity: parseFloat(e.target.value) })}
                  className="w-full accent-[var(--theme-primary)] cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-white/10">
        <button
          type="button"
          onClick={onSaveProfile}
          className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-theme-primary to-theme-secondary text-white font-bold text-sm shadow-[0_0_25px_rgba(var(--theme-primary-rgb),0.4)] hover:shadow-[0_0_35px_rgba(var(--theme-primary-rgb),0.6)] active:scale-95 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>حفظ إعدادات الصورتين</span>
        </button>
      </div>
    </div>
  );
};
