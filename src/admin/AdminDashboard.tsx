import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project, Certificate, SkillCategory, ProfileInfo } from '../types';
import {
  X,
  Lock,
  Unlock,
  LayoutDashboard,
  FolderGit2,
  Award,
  Cpu,
  User,
  Mail,
  Save,
  Trash2,
  Plus,
  Download,
  Upload,
  RotateCcw,
  Check,
  Eye,
  ShieldCheck,
  LogOut,
  Image as ImageIcon,
  Type,
  Layers,
  RefreshCw,
  Palette,
  Bell,
  Box,
  Globe,
  Home,
  Search
} from 'lucide-react';
import { BentoOverview } from './BentoOverview';
import { QuantixSidebar } from './QuantixSidebar';
import { ThemePickerPanel } from './ThemePickerPanel';
import { adminTranslations } from './adminTranslations';
import { ConfirmActionModal, ConfirmActionState } from './ConfirmActionModal';

export const AdminDashboard: React.FC = () => {
  const {
    profile,
    projects,
    certificates,
    skills,
    messages,
    lang,
    setLang,
    isAdminOpen,
    setIsAdminOpen,
    isAuthenticated,
    login,
    logout,
    updateProfile,
    addProject,
    updateProject,
    deleteProject,
    addCertificate,
    updateCertificate,
    deleteCertificate,
    updateSkills,
    markMessageRead,
    deleteMessage,
    exportData,
    importData,
    resetToDefault
  } = usePortfolio();

  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<
    'overview' | 'images' | 'names' | 'profile' | 'projects' | 'certificates' | 'skills' | 'inbox' | 'backup' | 'theme'
  >('overview');

  // Edit Project State
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);

  // Edit Certificate State
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [isNewCert, setIsNewCert] = useState(false);

  // Profile Form State
  const [profileForm, setProfileForm] = useState<ProfileInfo>(profile);
  const [skillsDraft, setSkillsDraft] = useState<SkillCategory[]>(skills);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Keep form in sync when profile changes externally
  useEffect(() => {
    setProfileForm(profile);
  }, [profile]);

  useEffect(() => {
    setSkillsDraft(skills);
  }, [skills]);

  if (!isAdminOpen) return null;

  // Handle image upload from computer (Base64 DataURL)
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'heroAvatarUrl' | 'aboutAvatarUrl'
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (base64) {
          const updated = { ...profileForm, [field]: base64 };
          setProfileForm(updated);
          requestConfirm({
            variant: 'edit',
            title: lang === 'ar' ? 'تأكيد تحديث الصورة' : 'Confirm Image Upload',
            description:
              lang === 'ar'
                ? 'هل تريد حفظ وتطبيق الصورة المرفوعة الجديدة على البورتفوليو؟'
                : 'Save and apply the uploaded image to your portfolio?',
            confirmLabel: lang === 'ar' ? 'تأكيد الحفظ' : 'Save Image',
            cancelLabel: lang === 'ar' ? 'إلغاء' : 'Cancel',
            onConfirm: () => {
              updateProfile(updated);
              showSaveNotification();
            },
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const showSaveNotification = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const [confirmState, setConfirmState] = useState<ConfirmActionState>({
    isOpen: false,
    variant: 'edit',
    title: '',
    description: '',
    onConfirm: () => {},
  });

  const requestConfirm = (opts: Omit<ConfirmActionState, 'isOpen'>) => {
    setConfirmState({ ...opts, isOpen: true });
  };

  const handleSaveProfile = () => {
    requestConfirm({
      variant: 'edit',
      title: lang === 'ar' ? 'تأكيد حفظ التعديلات' : 'Confirm Profile Changes',
      description:
        lang === 'ar'
          ? 'هل تريد حفظ وتطبيق التعديلات على الموقع الآن؟'
          : 'Save and apply these changes to your portfolio?',
      confirmLabel: lang === 'ar' ? 'تأكيد الحفظ' : 'Save Changes',
      cancelLabel: lang === 'ar' ? 'إلغاء' : 'Cancel',
      onConfirm: () => {
        updateProfile(profileForm);
        showSaveNotification();
      },
    });
  };

  const t = adminTranslations[lang];

  // Login Screen if not authenticated
  if (!isAuthenticated) {
    const handleLoginSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const success = login(pinInput);
      if (success) {
        setPinError(false);
        setPinInput('');
      } else {
        setPinError(true);
      }
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

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <input
              type="password"
              value={pinInput}
              onChange={(e) => {
                setPinInput(e.target.value);
                setPinError(false);
              }}
              placeholder={t.loginPlaceholder}
              className="w-full text-center text-base tracking-[0.15em] py-3 rounded-xl bg-[#08090C] border border-white/10 focus:border-white/30 text-white outline-none font-mono"
            />

            {pinError && (
              <p className="text-rose-400 text-xs font-mono">{t.loginError}</p>
            )}

            <button
              type="submit"
              style={{
                background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))',
                boxShadow: '0 8px 24px -6px rgba(var(--theme-primary-rgb), 0.5)',
              }}
              className="btn-sheen w-full py-3 rounded-xl text-white font-bold text-sm transition-all flex items-center justify-center gap-2 hover:brightness-110 cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>{t.loginButton}</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Authenticated Quantix Dashboard
  const unreadCount = messages.filter((m) => !m.read).length;
  const activeTabLabel = t.tabs[activeTab] || activeTab;

  return (
    <div className="quantix-dashboard fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#050608]/95 backdrop-blur-xl overflow-hidden">
      {/* Subtle Ambient Theme Glow behind Quantix Window */}
      <div
        className="pointer-events-none absolute w-[520px] h-[520px] rounded-full blur-[110px] opacity-20"
        style={{
          background: 'radial-gradient(circle, var(--theme-primary), transparent 70%)',
        }}
      />

      <div className="relative w-full max-w-[1360px] h-[94vh] bg-[#0B0C10] border border-white/[0.08] rounded-3xl flex flex-col lg:flex-row shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Quantix Left Navigation Sidebar */}
        <QuantixSidebar
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab as typeof activeTab);
            if (tab === 'projects') setEditingProject(null);
            if (tab === 'certificates') setEditingCert(null);
          }}
          unreadCount={unreadCount}
          projectsCount={projects.length}
          onPreview={() => setIsAdminOpen(false)}
          onLogout={logout}
        />

        {/* Right Main Column: Top Breadcrumb Bar + Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#08090C]">
          {/* Quantix Top Header */}
          <header className="relative px-4 sm:px-7 py-3.5 bg-[#0A0B0F]/90 border-b border-white/[0.07] flex items-center justify-between gap-4 shrink-0">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-theme-primary/35 to-transparent"
            />
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs sm:text-sm min-w-0">
              <Home className="w-4 h-4 text-slate-500 shrink-0" />
              <span className="text-slate-500 truncate">{t.groups.overview}</span>
              <span className="text-slate-600">/</span>
              <span className="font-semibold text-white truncate">{activeTabLabel}</span>
            </div>

            {/* Right Controls: Search + Saved + Lang + Bell + Theme Dot + Close */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-slate-400 w-44 focus-within:border-theme-primary/40 transition-colors">
                <Search className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="bg-transparent outline-none text-white placeholder:text-slate-500 w-full text-xs"
                />
              </div>

              {savedSuccess && (
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono">
                  <Check className="w-3 h-3" />
                  {t.saved}
                </span>
              )}

              <button
                type="button"
                onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-slate-200 transition-colors"
                title="Switch Language"
              >
                <Globe className="w-3.5 h-3.5 text-theme-primary" />
                <span>{lang === 'en' ? 'AR' : 'EN'}</span>
              </button>

              <button
                onClick={() => setActiveTab('inbox')}
                className="relative p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 transition-colors"
                title="Messages"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('theme')}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-white transition-colors"
                title="Theme Colors & Fonts"
              >
                <span className="w-3 h-3 rounded-full bg-theme-primary" />
                <span>AA</span>
              </button>

              <button
                onClick={() => setIsAdminOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* Tab Content Panel */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto text-start">
            <div key={activeTab} className="animate-fadeIn">

            {/* ========================================================= */}
            {/* TAB: DUAL IMAGE MANAGER (صورة 1 في الرئيسية وصورة 2 في About) */}
            {/* ========================================================= */}
            {activeTab === 'images' && (
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

                  {/* CARD 1: Hero Image (صورة الصفحة الأساسية) */}
                  <div className="p-6 quantix-card quantix-card-interactive flex flex-col justify-between space-y-5 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 rounded-full bg-theme-primary/10 text-theme-primary text-xs font-mono font-bold">
                          صورة 1: الصفحة الأساسية (Hero)
                        </span>
                        <span className="text-xs text-slate-400 font-mono">قسم الترحيب</span>
                      </div>

                      {/* Image Preview with Circular Orange Glow */}
                      <div className="relative w-full h-56 rounded-2xl bg-[#08090C] border border-white/[0.08] flex items-center justify-center overflow-hidden mb-5">
                        {/* Orange Aura */}
                        <div
                          className="absolute w-36 h-36 rounded-full blur-2xl"
                          style={{ background: 'radial-gradient(circle, rgba(var(--theme-primary-rgb),0.7) 0%, transparent 70%)' }}
                        />
                        <img
                          src={profileForm.heroAvatarUrl || "/drama_hero.png"}
                          alt="Hero Avatar Preview"
                          className="relative z-10 h-full w-auto object-contain object-bottom drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = "/drama_hero.png";
                          }}
                        />
                      </div>

                      {/* File Upload Input */}
                      <div className="space-y-3">
                        <label className="block text-xs font-mono text-slate-300">
                          رفع صورة من جهازك (صورة 1):
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'heroAvatarUrl')}
                          className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-gradient-to-r file:from-theme-primary file:to-theme-secondary file:text-white hover:file:opacity-90 cursor-pointer"
                        />

                        {/* Direct URL input */}
                        <div className="pt-2">
                          <label className="block text-xs font-mono text-slate-400 mb-1">
                            أو اكتب مسار/رابط الصورة:
                          </label>
                          <input
                            type="text"
                            value={profileForm.heroAvatarUrl || ''}
                            onChange={(e) => setProfileForm({ ...profileForm, heroAvatarUrl: e.target.value })}
                            placeholder="/drama_hero.png"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border border-white/10 text-white text-xs font-mono outline-none focus:border-theme-primary"
                          />
                        </div>

                        {/* Quick Presets */}
                        <div className="flex flex-wrap gap-2 pt-1">
                          <span className="text-[11px] text-slate-400 font-mono self-center">صور جاهزة:</span>
                          <button
                            type="button"
                            onClick={() => setProfileForm({ ...profileForm, heroAvatarUrl: '/drama_hero.png' })}
                            className="px-2.5 py-1 rounded-lg bg-[#08090C] hover:bg-theme-primary/20 text-[11px] text-slate-300 border border-white/[0.08]"
                          >
                            drama_hero.png
                          </button>
                          <button
                            type="button"
                            onClick={() => setProfileForm({ ...profileForm, heroAvatarUrl: '/my_transparent.png' })}
                            className="px-2.5 py-1 rounded-lg bg-[#08090C] hover:bg-theme-primary/20 text-[11px] text-slate-300 border border-white/[0.08]"
                          >
                            my_transparent.png
                          </button>
                          <button
                            type="button"
                            onClick={() => setProfileForm({ ...profileForm, heroAvatarUrl: '/my.jpg' })}
                            className="px-2.5 py-1 rounded-lg bg-[#08090C] hover:bg-theme-primary/20 text-[11px] text-slate-300 border border-white/[0.08]"
                          >
                            my.jpg
                          </button>
                        </div>

                        {/* Sliders for Hero Image */}
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

                  {/* CARD 2: About Image (صورة الصفحة الثانية) */}
                  <div className="p-6 quantix-card quantix-card-interactive flex flex-col justify-between space-y-5 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 rounded-full bg-theme-primary/10 text-theme-secondary text-xs font-mono font-bold">
                          صورة 2: الصفحة الثانية (About)
                        </span>
                        <span className="text-xs text-slate-400 font-mono">قسم نبذة عني</span>
                      </div>

                      {/* Image Preview with Circular Orange Glow */}
                      <div className="relative w-full h-56 rounded-2xl bg-[#08090C] border border-white/[0.08] flex items-center justify-center overflow-hidden mb-5">
                        {/* Orange Aura */}
                        <div
                          className="absolute w-36 h-36 rounded-full blur-2xl"
                          style={{ background: 'radial-gradient(circle, rgba(var(--theme-secondary-rgb),0.7) 0%, transparent 70%)' }}
                        />
                        <img
                          src={profileForm.aboutAvatarUrl || profileForm.heroAvatarUrl || "/my_transparent.png"}
                          alt="About Avatar Preview"
                          className="relative z-10 h-full w-auto object-contain object-bottom drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = "/my_transparent.png";
                          }}
                        />
                      </div>

                      {/* File Upload Input */}
                      <div className="space-y-3">
                        <label className="block text-xs font-mono text-slate-300">
                          رفع صورة من جهازك (صورة 2):
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'aboutAvatarUrl')}
                          className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-gradient-to-r file:from-[var(--theme-secondary)] file:to-[#FFA726] file:text-white hover:file:opacity-90 cursor-pointer"
                        />

                        {/* Direct URL input */}
                        <div className="pt-2">
                          <label className="block text-xs font-mono text-slate-400 mb-1">
                            أو اكتب مسار/رابط الصورة:
                          </label>
                          <input
                            type="text"
                            value={profileForm.aboutAvatarUrl || ''}
                            onChange={(e) => setProfileForm({ ...profileForm, aboutAvatarUrl: e.target.value })}
                            placeholder="/my_transparent.png"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border border-white/10 text-white text-xs font-mono outline-none focus:border-theme-primary"
                          />
                        </div>

                        {/* Quick Presets */}
                        <div className="flex flex-wrap gap-2 pt-1">
                          <span className="text-[11px] text-slate-400 font-mono self-center">صور جاهزة:</span>
                          <button
                            type="button"
                            onClick={() => setProfileForm({ ...profileForm, aboutAvatarUrl: '/about_avatar.png' })}
                            className="px-2.5 py-1 rounded-lg bg-theme-primary/20 hover:bg-theme-primary/30 text-[11px] text-theme-secondary font-bold border border-theme-primary/30"
                          >
                            about_avatar.png (الجانبية المفرغة)
                          </button>
                          <button
                            type="button"
                            onClick={() => setProfileForm({ ...profileForm, aboutAvatarUrl: '/my_transparent.png' })}
                            className="px-2.5 py-1 rounded-lg bg-[#08090C] hover:bg-theme-primary/20 text-[11px] text-slate-300 border border-white/[0.08]"
                          >
                            my_transparent.png
                          </button>
                          <button
                            type="button"
                            onClick={() => setProfileForm({ ...profileForm, aboutAvatarUrl: '/drama_hero.png' })}
                            className="px-2.5 py-1 rounded-lg bg-[#08090C] hover:bg-theme-primary/20 text-[11px] text-slate-300 border border-white/[0.08]"
                          >
                            drama_hero.png
                          </button>
                          <button
                            type="button"
                            onClick={() => setProfileForm({ ...profileForm, aboutAvatarUrl: '/my.jpg' })}
                            className="px-2.5 py-1 rounded-lg bg-[#08090C] hover:bg-theme-primary/20 text-[11px] text-slate-300 border border-white/[0.08]"
                          >
                            my.jpg
                          </button>
                        </div>

                        {/* Sliders for About Image */}
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

                {/* Save Button */}
                <div className="flex justify-end pt-4 border-t border-white/10">
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-theme-primary to-theme-secondary text-white font-bold text-sm shadow-[0_0_25px_rgba(var(--theme-primary-rgb),0.4)] hover:shadow-[0_0_35px_rgba(var(--theme-primary-rgb),0.6)] active:scale-95 transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>حفظ إعدادات الصورتين</span>
                  </button>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB: NAMES & HEADINGS MANAGER (تعديل شامل لكل اسم وعنوان) */}
            {/* ========================================================= */}
            {activeTab === 'names' && (
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

                {/* Section 1: Logo & Brand Name */}
                <div className="p-6 quantix-card space-y-4">
                  <h5 className="font-bold text-white text-base flex items-center gap-2">
                    <Layers className="w-4 h-4 text-theme-primary" />
                    <span>1. اسم الشعار في الشريط العلوي (Navbar Brand Name)</span>
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        اسم الشعار (English) - مكان Portfolio.
                      </label>
                      <input
                        type="text"
                        value={profileForm.brandName || ''}
                        onChange={(e) => setProfileForm({ ...profileForm, brandName: e.target.value })}
                        placeholder="Amr Kandel"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#08090C] border border-white/10 text-white text-sm outline-none focus:border-theme-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        اسم الشعار (العربية)
                      </label>
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

                {/* Section 2: Home / Hero Section Names & Titles */}
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

                {/* Section 3: About Section Headings */}
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

                {/* Section 4: Metrics & Stats */}
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

                {/* Save All Names Button */}
                <div className="flex justify-end pt-4 border-t border-white/10">
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-theme-primary to-theme-secondary text-white font-bold text-sm shadow-[0_0_25px_rgba(var(--theme-primary-rgb),0.4)] hover:shadow-[0_0_35px_rgba(var(--theme-primary-rgb),0.6)] active:scale-95 transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>حفظ جميع الأسماء والعناوين</span>
                  </button>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB: BENTO OVERVIEW */}
            {/* ========================================================= */}
            {activeTab === 'overview' && (
              <BentoOverview
                projects={projects}
                certificates={certificates}
                skills={skills}
                messages={messages}
                onNewProject={() => {
                  setActiveTab('projects');
                  setEditingProject({
                    id: `proj-${Date.now()}`,
                    title: '',
                    titleAr: '',
                    tagline: '',
                    taglineAr: '',
                    description: '',
                    descriptionAr: '',
                    category: '.NET & Backend',
                    featured: true,
                    badge: 'Backend',
                    architecture: [],
                    technologies: ['C#', 'ASP.NET Core'],
                    metrics: [],
                    features: [],
                  });
                  setIsNewProject(true);
                }}
                onNavigate={(tab) => setActiveTab(tab as typeof activeTab)}
              />
            )}

            {/* ========================================================= */}
            {/* TAB: THEME & COLORS (ألوان البورتفوليو والداشبورد) */}
            {/* ========================================================= */}
            {activeTab === 'theme' && (
              <ThemePickerPanel onSaved={showSaveNotification} />
            )}

            {/* ========================================================= */}
            {/* TAB: PROJECTS */}
            {/* ========================================================= */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-bold text-white">إدارة المشاريع ({projects.length})</h4>
                  <button
                    onClick={() => {
                      setIsNewProject(true);
                      setEditingProject({
                        id: 'proj_' + Date.now(),
                        title: '',
                        titleAr: '',
                        tagline: '',
                        taglineAr: '',
                        description: '',
                        descriptionAr: '',
                        category: 'UI/UX Design',
                        featured: true,
                        badge: 'UI/UX Case Study',
                        badgeAr: 'دراسة حالة وتصميم',
                        architecture: ['Figma', 'Design Systems', 'User Research'],
                        architectureAr: ['فيجما', 'أنظمة التصميم', 'أبحاث المستخدم'],
                        technologies: ['Figma', 'Auto-Layout', 'Interactive Prototype'],
                        metrics: [{ label: 'Impact', value: '100%' }],
                        features: ['Comprehensive user journey mapping']
                      });
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-theme-primary to-theme-secondary text-white text-xs font-bold shadow-[0_0_15px_rgba(var(--theme-primary-rgb),0.3)]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إضافة مشروع جديد</span>
                  </button>
                </div>

                {!editingProject ? (
                  <div className="space-y-3">
                    {projects.map((proj) => (
                      <div key={proj.id} className="p-4 quantix-card flex items-center justify-between">
                        <div>
                          <span className="text-xs font-mono text-theme-secondary font-semibold">{proj.category}</span>
                          <h5 className="font-bold text-white text-base">{proj.titleAr || proj.title}</h5>
                          <p className="text-xs text-slate-400 font-mono mt-0.5">{proj.taglineAr || proj.tagline}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => { setEditingProject(proj); setIsNewProject(false); }}
                            className="px-3 py-1.5 rounded-lg bg-[#08090C] hover:bg-[#22222b] text-xs text-slate-200"
                          >
                            تعديل
                          </button>
                          <button
                            onClick={() =>
                              requestConfirm({
                                variant: 'danger',
                                title: lang === 'ar' ? 'تأكيد حذف المشروع' : 'Confirm Project Deletion',
                                description:
                                  lang === 'ar'
                                    ? `سيتم حذف المشروع "${proj.titleAr || proj.title}" نهائياً.`
                                    : `Delete "${proj.title}" permanently?`,
                                confirmLabel: lang === 'ar' ? 'تأكيد الحذف' : 'Delete',
                                cancelLabel: lang === 'ar' ? 'إلغاء' : 'Cancel',
                                onConfirm: () => deleteProject(proj.id),
                              })
                            }
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Edit Project Form */
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">عنوان المشروع (عربي)</label>
                        <input
                          type="text"
                          value={editingProject.titleAr}
                          onChange={(e) => setEditingProject({ ...editingProject, titleAr: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#08090C] border border-white/10 text-white text-sm outline-none focus:border-theme-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">عنوان المشروع (English)</label>
                        <input
                          type="text"
                          value={editingProject.title}
                          onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#08090C] border border-white/10 text-white text-sm outline-none focus:border-theme-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">التصنيف (Category)</label>
                      <input
                        type="text"
                        value={editingProject.category}
                        onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                        placeholder="UI/UX Design / Mobile Apps / Web & SaaS"
                        className="w-full px-3 py-2 rounded-xl bg-[#08090C] border border-white/10 text-white text-sm outline-none focus:border-theme-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">الوصف (عربي)</label>
                      <textarea
                        rows={3}
                        value={editingProject.descriptionAr}
                        onChange={(e) => setEditingProject({ ...editingProject, descriptionAr: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#08090C] border border-white/10 text-white text-sm outline-none focus:border-theme-primary"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-3">
                      <button
                        onClick={() =>
                          requestConfirm({
                            variant: 'edit',
                            title: isNewProject
                              ? (lang === 'ar' ? 'تأكيد إضافة مشروع جديد' : 'Confirm New Project')
                              : (lang === 'ar' ? 'تأكيد تعديل المشروع' : 'Confirm Project Update'),
                            description:
                              lang === 'ar'
                                ? `هل تريد حفظ المشروع "${editingProject.titleAr || editingProject.title}"؟`
                                : `Save project "${editingProject.title}"?`,
                            confirmLabel: lang === 'ar' ? 'تأكيد الحفظ' : 'Save Project',
                            cancelLabel: lang === 'ar' ? 'إلغاء' : 'Cancel',
                            onConfirm: () => {
                              if (isNewProject) {
                                addProject(editingProject);
                              } else {
                                updateProject(editingProject.id, editingProject);
                              }
                              setEditingProject(null);
                              showSaveNotification();
                            },
                          })
                        }
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-theme-primary to-theme-secondary text-white font-bold text-xs shadow-lg flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>حفظ التعديلات</span>
                      </button>
                      <button
                        onClick={() => setEditingProject(null)}
                        className="px-4 py-2.5 rounded-xl border border-white/10 text-slate-400 text-xs"
                      >
                        إلغاء
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB: CERTIFICATES */}
            {/* ========================================================= */}
            {activeTab === 'certificates' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-bold text-white">الشهادات والاعتمادات ({certificates.length})</h4>
                  <button
                    onClick={() => {
                      setIsNewCert(true);
                      setEditingCert({
                        id: 'cert_' + Date.now(),
                        title: '',
                        titleAr: '',
                        issuer: '',
                        issuerAr: '',
                        date: '2024',
                        fileUrl: '/iti.pdf',
                        badge: 'Accredited Certificate',
                        description: '',
                        descriptionAr: ''
                      });
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-theme-primary to-theme-secondary text-white text-xs font-bold shadow-[0_0_15px_rgba(var(--theme-primary-rgb),0.3)]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إضافة شهادة جديدة</span>
                  </button>
                </div>

                {!editingCert ? (
                  <div className="space-y-3">
                    {certificates.map((cert) => (
                      <div key={cert.id} className="p-4 quantix-card flex items-center justify-between">
                        <div>
                          <span className="text-xs font-mono text-theme-secondary font-semibold">{cert.badge}</span>
                          <h5 className="font-bold text-white text-base">{cert.titleAr || cert.title}</h5>
                          <p className="text-xs text-slate-400 font-mono mt-0.5">{cert.issuerAr} &bull; {cert.fileUrl}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => { setEditingCert(cert); setIsNewCert(false); }}
                            className="px-3 py-1.5 rounded-lg bg-[#08090C] hover:bg-[#22222b] text-xs text-slate-200"
                          >
                            تعديل
                          </button>
                          <button
                            onClick={() =>
                              requestConfirm({
                                variant: 'danger',
                                title: lang === 'ar' ? 'تأكيد حذف الشهادة' : 'Confirm Certificate Deletion',
                                description:
                                  lang === 'ar'
                                    ? `سيتم حذف الشهادة "${cert.titleAr || cert.title}" نهائياً.`
                                    : `Delete "${cert.title}" permanently?`,
                                confirmLabel: lang === 'ar' ? 'تأكيد الحذف' : 'Delete',
                                cancelLabel: lang === 'ar' ? 'إلغاء' : 'Cancel',
                                onConfirm: () => deleteCertificate(cert.id),
                              })
                            }
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Edit Certificate Form */
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">اسم الشهادة (عربي)</label>
                        <input
                          type="text"
                          value={editingCert.titleAr}
                          onChange={(e) => setEditingCert({ ...editingCert, titleAr: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#08090C] border border-white/10 text-white text-sm outline-none focus:border-theme-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">الجهة المصدرة</label>
                        <input
                          type="text"
                          value={editingCert.issuerAr}
                          onChange={(e) => setEditingCert({ ...editingCert, issuerAr: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#08090C] border border-white/10 text-white text-sm outline-none focus:border-theme-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">رابط الملف (مثال: /iti.pdf أو رابط خارجي)</label>
                      <input
                        type="text"
                        value={editingCert.fileUrl}
                        onChange={(e) => setEditingCert({ ...editingCert, fileUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#08090C] border border-white/10 text-white text-sm font-mono outline-none focus:border-theme-primary"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-3">
                      <button
                        onClick={() =>
                          requestConfirm({
                            variant: 'edit',
                            title: isNewCert
                              ? (lang === 'ar' ? 'تأكيد إضافة شهادة جديدة' : 'Confirm New Certificate')
                              : (lang === 'ar' ? 'تأكيد تعديل الشهادة' : 'Confirm Certificate Update'),
                            description:
                              lang === 'ar'
                                ? `هل تريد حفظ الشهادة "${editingCert.titleAr || editingCert.title}"؟`
                                : `Save certificate "${editingCert.title}"?`,
                            confirmLabel: lang === 'ar' ? 'تأكيد الحفظ' : 'Save Certificate',
                            cancelLabel: lang === 'ar' ? 'إلغاء' : 'Cancel',
                            onConfirm: () => {
                              if (isNewCert) {
                                addCertificate(editingCert);
                              } else {
                                updateCertificate(editingCert.id, editingCert);
                              }
                              setEditingCert(null);
                              showSaveNotification();
                            },
                          })
                        }
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-theme-primary to-theme-secondary text-white font-bold text-xs"
                      >
                        حفظ الشهادة
                      </button>
                      <button
                        onClick={() => setEditingCert(null)}
                        className="px-4 py-2.5 rounded-xl border border-white/10 text-slate-400 text-xs"
                      >
                        إلغاء
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB: SKILLS */}
            {/* ========================================================= */}
            {activeTab === 'skills' && (
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white">إدارة المهارات والنسب المئوية</h4>
                <div className="space-y-6">
                  {skillsDraft.map((category, catIdx) => (
                    <div key={catIdx} className="p-4 quantix-card space-y-3">
                      <h5 className="font-bold text-theme-secondary text-sm">{category.nameAr}</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {category.skills.map((skill, sIdx) => {
                          const skillName = typeof skill === 'string' ? skill : (skill.name || skill.nameAr || '');
                          const skillLevel = typeof skill === 'object' && skill !== null && typeof skill.level === 'number' ? skill.level : 90;
                          return (
                            <div key={sIdx} className="flex items-center justify-between p-2.5 rounded-xl bg-[#08090C] border border-white/[0.08]">
                              <span className="text-xs text-white font-medium">{skillName}</span>
                              <div className="flex items-center gap-2">
                                <input
                                  type="number"
                                  min={0}
                                  max={100}
                                  value={skillLevel}
                                  onChange={(e) => {
                                    const nextLevel = Math.min(100, Math.max(0, Number(e.target.value) || 0));
                                    const newSkills = skillsDraft.map((c, ci) =>
                                      ci !== catIdx
                                        ? c
                                        : {
                                            ...c,
                                            skills: c.skills.map((sk, si) =>
                                              si !== sIdx
                                                ? sk
                                                : typeof sk === 'string'
                                                  ? { name: sk, level: nextLevel }
                                                  : { ...sk, level: nextLevel }
                                            ),
                                          }
                                    );
                                    setSkillsDraft(newSkills);
                                  }}
                                  className="w-14 px-2 py-1 rounded bg-[#08090C] text-theme-primary text-xs font-mono text-center border border-white/10 font-bold"
                                />
                                <span className="text-xs text-slate-500">%</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() =>
                      requestConfirm({
                        variant: 'edit',
                        title: lang === 'ar' ? 'تأكيد تعديل نسب المهارات' : 'Confirm Skills Update',
                        description:
                          lang === 'ar'
                            ? 'هل تريد حفظ وتطبيق نسب المهارات المحدّثة على البورتفوليو؟'
                            : 'Save and apply updated skill levels?',
                        confirmLabel: lang === 'ar' ? 'تأكيد الحفظ' : 'Save Skills',
                        cancelLabel: lang === 'ar' ? 'إلغاء' : 'Cancel',
                        onConfirm: () => {
                          updateSkills(skillsDraft);
                          showSaveNotification();
                        },
                      })
                    }
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-theme-primary to-theme-secondary text-white font-bold text-xs flex items-center gap-2 shadow-lg cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'حفظ وتأكيد تعديلات المهارات' : 'Save Skill Changes'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB: PROFILE & CONTACT */}
            {/* ========================================================= */}
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-white mb-2">تعديل البيانات الشخصية والسيرة الذاتية</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">البريد الإلكتروني</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#08090C] border border-white/10 text-white text-sm font-mono outline-none focus:border-theme-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">واتساب (WhatsApp)</label>
                    <input
                      type="text"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      placeholder="amratefkandel"
                      className="w-full px-3 py-2 rounded-xl bg-[#08090C] border border-white/10 text-white text-sm font-mono outline-none focus:border-theme-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">رابط لينكد إن (LinkedIn)</label>
                    <input
                      type="text"
                      value={profileForm.linkedin || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#08090C] border border-white/10 text-white text-sm font-mono outline-none focus:border-theme-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">رابط جيت هاب (GitHub)</label>
                    <input
                      type="text"
                      value={profileForm.github || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#08090C] border border-white/10 text-white text-sm font-mono outline-none focus:border-theme-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">النبذة التعريفية (Bio)</label>
                  <textarea
                    rows={4}
                    value={profileForm.bioAr}
                    onChange={(e) => setProfileForm({ ...profileForm, bioAr: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#08090C] border border-white/10 text-white text-sm outline-none focus:border-theme-primary"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-theme-primary/20 border border-orange-800/40">
                  <label className="block text-xs font-mono text-theme-secondary font-bold mb-1">
                    رمز الـ PIN للدخول إلى لوحة التحكم
                  </label>
                  <input
                    type="text"
                    maxLength={8}
                    value={profileForm.adminPin}
                    onChange={(e) => setProfileForm({ ...profileForm, adminPin: e.target.value })}
                    className="w-48 px-3 py-2 rounded-xl bg-[#08090C] border border-white/10 text-theme-primary text-sm font-mono font-bold"
                  />
                </div>

                <button
                  onClick={handleSaveProfile}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-theme-primary to-theme-secondary text-white font-bold text-xs flex items-center gap-2 shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  <span>تحديث البيانات الشخصية</span>
                </button>
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB: INBOX */}
            {/* ========================================================= */}
            {activeTab === 'inbox' && (
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-white mb-2">رسائل الزوار وتواصل العملاء ({messages.length})</h4>
                {messages.length === 0 ? (
                  <p className="text-slate-500 text-xs font-mono text-center py-12">لا توجد رسائل واردة حتى الآن.</p>
                ) : (
                  <div className="space-y-3">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-4 quantix-card transition-all ${msg.read ? '' : 'border-theme-primary/40'
                          }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">{msg.name}</span>
                            <span className="text-xs text-slate-400 font-mono">&lt;{msg.email}&gt;</span>
                          </div>
                          <span className="text-[11px] font-mono text-slate-500">
                            {new Date(msg.createdAt).toLocaleDateString('ar-EG')}
                          </span>
                        </div>

                        {msg.subject && (
                          <p className="text-xs font-mono text-theme-secondary font-semibold mb-1">الموضوع: {msg.subject}</p>
                        )}
                        <p className="text-slate-300 text-xs leading-relaxed bg-[#08090C] p-3 rounded-xl border border-white/[0.08]">
                          {msg.message}
                        </p>

                        <div className="flex items-center gap-3 mt-3 pt-2 border-t border-white/[0.08]">
                          <a
                            href={`mailto:${msg.email}?subject=رد: ${encodeURIComponent(msg.subject || 'تواصل')}`}
                            className="text-xs text-theme-primary hover:underline font-mono"
                          >
                            الرد عبر البريد الإلكتروني
                          </a>
                          {!msg.read && (
                            <button
                              onClick={() => markMessageRead(msg.id)}
                              className="text-xs text-slate-400 hover:text-white"
                            >
                              تحديد كمقروء
                            </button>
                          )}
                          <button
                            onClick={() =>
                              requestConfirm({
                                variant: 'danger',
                                title: lang === 'ar' ? 'تأكيد حذف الرسالة' : 'Confirm Message Deletion',
                                description:
                                  lang === 'ar'
                                    ? `سيتم حذف رسالة "${msg.name}" نهائياً.`
                                    : `Delete message from "${msg.name}"?`,
                                confirmLabel: lang === 'ar' ? 'تأكيد الحذف' : 'Delete',
                                cancelLabel: lang === 'ar' ? 'إلغاء' : 'Cancel',
                                onConfirm: () => deleteMessage(msg.id),
                              })
                            }
                            className="text-xs text-red-400 hover:underline mr-auto"
                          >
                            حذف الرسالة
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB: BACKUP & RESET */}
            {/* ========================================================= */}
            {activeTab === 'backup' && (
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white mb-2">النسخ الاحتياطي وإعادة الضبط</h4>

                <div className="p-6 quantix-card space-y-4">
                  <h5 className="font-bold text-white text-sm">تصدير كامل بيانات البرتفوليو (JSON):</h5>
                  <p className="text-xs text-slate-400">
                    يمكنك تنزيل ملف JSON يحتوي على كامل مشاريعك، شهاداتك، مهاراتك، وبياناتك الشخصية للاحتفاظ بها.
                  </p>
                  <button
                    onClick={exportData}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-theme-primary hover:bg-theme-primary text-white font-bold text-xs"
                  >
                    <Download className="w-4 h-4" />
                    <span>تصدير البيانات (Export JSON)</span>
                  </button>
                </div>

                <div className="p-6 quantix-card space-y-4">
                  <h5 className="font-bold text-white text-sm">استيراد بيانات من ملف JSON:</h5>
                  <input
                    type="file"
                    accept=".json"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const content = event.target?.result as string;
                        if (!content) return;
                        requestConfirm({
                          variant: 'edit',
                          title: lang === 'ar' ? 'تأكيد استيراد النسخة الاحتياطية' : 'Confirm Backup Import',
                          description:
                            lang === 'ar'
                              ? 'سيتم استبدال بيانات البورتفوليو الحالية بمحتوى ملف JSON المختار.'
                              : 'Replace current portfolio data with the selected JSON backup?',
                          confirmLabel: lang === 'ar' ? 'تأكيد الاستيراد' : 'Import Backup',
                          cancelLabel: lang === 'ar' ? 'إلغاء' : 'Cancel',
                          onConfirm: () => {
                            if (importData(content)) {
                              showSaveNotification();
                            } else {
                              alert('الملف غير صالح أو تالف.');
                            }
                          },
                        });
                      };
                      reader.readAsText(file);
                    }}
                    className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#08090C] file:text-slate-200 hover:file:bg-[#22222b]"
                  />
                </div>

                <div className="p-6 rounded-2xl bg-red-950/20 border border-red-900/40 space-y-3">
                  <h5 className="font-bold text-red-400 text-sm">إعادة ضبط المصنع (Reset Defaults):</h5>
                  <p className="text-xs text-slate-400">
                    إعادة جميع المشاريع والشهادات والبيانات إلى الحالة الأصلية الافتراضية.
                  </p>
                  <button
                    onClick={() =>
                      requestConfirm({
                        variant: 'danger',
                        title: lang === 'ar' ? 'تأكيد إعادة ضبط المصنع' : 'Confirm Factory Reset',
                        description:
                          lang === 'ar'
                            ? 'سيتم مسح التعديلات واستعادة كافة البيانات إلى الإعدادات الأولية الافتراضية.'
                            : 'This will reset all projects, certificates, and settings to defaults.',
                        confirmLabel: lang === 'ar' ? 'إعادة ضبط المصنع' : 'Reset All',
                        cancelLabel: lang === 'ar' ? 'إلغاء' : 'Cancel',
                        onConfirm: () => resetToDefault(),
                      })
                    }
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>إعادة ضبط المصنع</span>
                  </button>
                </div>
              </div>
            )}

            </div>
          </div>

        </div>

      </div>

      <ConfirmActionModal
        {...confirmState}
        onClose={() => setConfirmState(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};

export default AdminDashboard;
