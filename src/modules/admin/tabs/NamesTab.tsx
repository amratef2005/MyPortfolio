import React from 'react';
import { Award, Layers, Save, Type, User } from 'lucide-react';
import type { ProfileInfo } from '@shared/types';

interface NamesTabProps {
  profileForm: ProfileInfo;
  setProfileForm: React.Dispatch<React.SetStateAction<ProfileInfo>>;
  onSaveProfile: () => void;
}

export const NamesTab: React.FC<NamesTabProps> = ({
  profileForm,
  setProfileForm,
  onSaveProfile,
}) => {
  return (
    <div className="space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-theme-primary/10 border border-theme-primary/25 text-theme-secondary text-xs font-mono mb-2">
          <Type className="w-3.5 h-3.5 text-theme-primary" />
          <span>تخصيص كامل للنصوص والأسماء</span>
        </div>
        <h4 className="text-2xl font-black text-white">تعديل كل اسم وعنوان في البرتفوليو</h4>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          يمكنك تعديل اسم الشعار في الشريط العلوي، أسماء وألقاب قسم الترحيب، العناوين الفرعية للشغف، وعناوين الأقسام السبعة.
        </p>
      </div>

      <div className="p-6 quantix-card space-y-4">
        <h5 className="font-bold text-white text-base flex items-center gap-2">
          <Layers className="w-4 h-4 text-theme-primary" />
          <span>1. اسم الشعار في الشريط العلوي (Navbar Brand Name)</span>
        </h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">اسم الشعار (English) - مكان Portfolio.</label>
            <input
              type="text"
              value={profileForm.brandName || ''}
              onChange={(e) => setProfileForm({ ...profileForm, brandName: e.target.value })}
              placeholder="Amr Kandel"
              className="w-full px-4 py-2.5 rounded-xl bg-[#08090C] border border-white/10 text-white text-sm outline-none focus:border-theme-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">اسم الشعار (العربية)</label>
            <input
              type="text"
              value={profileForm.brandNameAr || ''}
              onChange={(e) => setProfileForm({ ...profileForm, brandNameAr: e.target.value })}
              placeholder="عمرو قنديل"
              className="w-full px-4 py-2.5 rounded-xl bg-[#08090C] border border-white/10 text-white text-sm outline-none focus:border-theme-primary"
            />
          </div>
        </div>
      </div>

      <div className="p-6 quantix-card space-y-4">
        <h5 className="font-bold text-white text-base flex items-center gap-2">
          <User className="w-4 h-4 text-theme-secondary" />
          <span>2. أسماء وعناوين الصفحة الرئيسية (Home / Hero)</span>
        </h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">كلمة الترحيب (English)</label>
            <input
              type="text"
              value={profileForm.heroGreeting || ''}
              onChange={(e) => setProfileForm({ ...profileForm, heroGreeting: e.target.value })}
              placeholder="Hello,"
              className="w-full px-4 py-2.5 rounded-xl bg-[#08090C] border border-white/10 text-white text-sm outline-none focus:border-theme-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">كلمة الترحيب (عربي)</label>
            <input
              type="text"
              value={profileForm.heroGreetingAr || ''}
              onChange={(e) => setProfileForm({ ...profileForm, heroGreetingAr: e.target.value })}
              placeholder="مرحباً، أنا"
              className="w-full px-4 py-2.5 rounded-xl bg-[#08090C] border border-white/10 text-white text-sm outline-none focus:border-theme-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">الاسم الكامل في الهيرو (English)</label>
            <input
              type="text"
              value={profileForm.name || ''}
              onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
              placeholder="Amr Kandel"
              className="w-full px-4 py-2.5 rounded-xl bg-[#08090C] border border-white/10 text-white text-sm outline-none focus:border-theme-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">الاسم الكامل في الهيرو (عربي)</label>
            <input
              type="text"
              value={profileForm.nameAr || ''}
              onChange={(e) => setProfileForm({ ...profileForm, nameAr: e.target.value })}
              placeholder="عمرو قنديل"
              className="w-full px-4 py-2.5 rounded-xl bg-[#08090C] border border-white/10 text-white text-sm outline-none focus:border-theme-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">المسمى الوظيفي بالبرتقالي (English)</label>
            <input
              type="text"
              value={profileForm.title || ''}
              onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
              placeholder="UI/UX Designer & .NET Developer"
              className="w-full px-4 py-2.5 rounded-xl bg-[#08090C] border border-white/10 text-white text-sm outline-none focus:border-theme-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">المسمى الوظيفي بالبرتقالي (عربي)</label>
            <input
              type="text"
              value={profileForm.titleAr || ''}
              onChange={(e) => setProfileForm({ ...profileForm, titleAr: e.target.value })}
              placeholder="مطور نظم خلفية ومصمم واجهات"
              className="w-full px-4 py-2.5 rounded-xl bg-[#08090C] border border-white/10 text-white text-sm outline-none focus:border-theme-primary"
            />
          </div>
        </div>
      </div>

      <div className="p-6 quantix-card space-y-4">
        <h5 className="font-bold text-white text-base flex items-center gap-2">
          <Layers className="w-4 h-4 text-theme-primary" />
          <span>3. عناوين قسم نبذة عني (About Section)</span>
        </h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">العنوان الفرعي (English) - Designing Is My Passion</label>
            <input
              type="text"
              value={profileForm.aboutSubtitle || ''}
              onChange={(e) => setProfileForm({ ...profileForm, aboutSubtitle: e.target.value })}
              placeholder="Designing Is My Passion"
              className="w-full px-4 py-2.5 rounded-xl bg-[#08090C] border border-white/10 text-white text-sm outline-none focus:border-theme-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">العنوان الفرعي (عربي)</label>
            <input
              type="text"
              value={profileForm.aboutSubtitleAr || ''}
              onChange={(e) => setProfileForm({ ...profileForm, aboutSubtitleAr: e.target.value })}
              placeholder="التصميم هو شغفي وهويتي"
              className="w-full px-4 py-2.5 rounded-xl bg-[#08090C] border border-white/10 text-white text-sm outline-none focus:border-theme-primary"
            />
          </div>
        </div>
      </div>

      <div className="p-6 quantix-card space-y-4">
        <h5 className="font-bold text-white text-base flex items-center gap-2">
          <Award className="w-4 h-4 text-theme-secondary" />
          <span>4. الأرقام البارزة وسنوات الخبرة</span>
        </h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">سنوات الخبرة (رقم كبير بالبرتقالي)</label>
            <input
              type="number"
              min={1}
              max={30}
              value={profileForm.yearsOfExperience ?? 1}
              onChange={(e) => setProfileForm({ ...profileForm, yearsOfExperience: Number(e.target.value) })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#08090C] border border-white/10 text-theme-primary font-mono font-bold text-base outline-none focus:border-theme-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">عدد المشاريع المكتملة</label>
            <input
              type="number"
              min={1}
              max={100}
              value={profileForm.completedProjects || 15}
              onChange={(e) => setProfileForm({ ...profileForm, completedProjects: Number(e.target.value) })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#08090C] border border-white/10 text-theme-secondary font-mono font-bold text-base outline-none focus:border-theme-primary"
            />
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
          <span>حفظ جميع الأسماء والعناوين</span>
        </button>
      </div>
    </div>
  );
};
