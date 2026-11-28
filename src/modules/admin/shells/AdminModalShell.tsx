import React, { useEffect, useState } from 'react';
import { Bell, Check, Globe, Home, RefreshCw, Save, Search, X } from 'lucide-react';
import type { Certificate, ProfileInfo, Project, SkillCategory } from '@shared/types';
import { ConfirmActionModal, ConfirmActionState } from '@shared/ui/ConfirmActionModal';
import { usePortfolio } from '@/app/providers/PortfolioContext';
import { AdminModalLogin } from '@modules/auth';
import { ThemePickerPanel } from '@modules/theme/components/ThemePickerPanel';
import { InboxTab } from '@modules/contact';
import { adminTranslations } from '../i18n/adminTranslations';
import { QuantixSidebar } from '../layout/QuantixSidebar';
import { BentoOverview } from '../tabs/BentoOverview';
import { ImagesTab } from '../tabs/ImagesTab';
import { NamesTab } from '../tabs/NamesTab';
import { ProjectsTab } from '../tabs/ProjectsTab';
import { CertificatesTab } from '../tabs/CertificatesTab';
import { SkillsTab } from '../tabs/SkillsTab';
import { BackupTab } from '../tabs/BackupTab';
import type { RequestConfirmFn } from '../types';

export const AdminModalShell: React.FC = () => {
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
    logout,
    updateProfile,
    refreshPortfolio,
  } = usePortfolio();

  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshFeedback, setRefreshFeedback] = useState<'synced' | 'error' | null>(null);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'images' | 'names' | 'profile' | 'projects' | 'certificates' | 'skills' | 'inbox' | 'backup' | 'theme'
  >('overview');

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [isNewCert, setIsNewCert] = useState(false);

  const [profileForm, setProfileForm] = useState<ProfileInfo>(profile);
  const [skillsDraft, setSkillsDraft] = useState<SkillCategory[]>(skills);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setProfileForm(profile);
  }, [profile]);

  useEffect(() => {
    setSkillsDraft(skills);
  }, [skills]);

  const [confirmState, setConfirmState] = useState<ConfirmActionState>({
    isOpen: false,
    variant: 'edit',
    title: '',
    description: '',
    onConfirm: () => {},
  });

  const requestConfirm: RequestConfirmFn = (opts) => {
    setConfirmState({ ...opts, isOpen: true });
  };

  if (!isAdminOpen) return null;

  if (!isAuthenticated) {
    return <AdminModalLogin />;
  }

  const showSaveNotification = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleRefresh = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e?.shiftKey) {
      window.location.reload();
      return;
    }
    if (isRefreshing) return;
    setIsRefreshing(true);
    setRefreshFeedback(null);
    const ok = await refreshPortfolio();
    setIsRefreshing(false);
    setRefreshFeedback(ok ? 'synced' : 'error');
    setTimeout(() => setRefreshFeedback(null), 2200);
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'heroAvatarUrl' | 'aboutAvatarUrl'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
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
  const unreadCount = messages.filter((m) => !m.read).length;
  const activeTabLabel = t.tabs[activeTab as keyof typeof t.tabs] || activeTab;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="quantix-dashboard relative w-full max-w-6xl h-[92vh] bg-[#07080B] border border-white/[0.08] rounded-3xl flex flex-col lg:flex-row overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.9)]">
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

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#08090C]">
          <header className="relative px-4 sm:px-7 py-3.5 bg-[#0A0B0F]/90 border-b border-white/[0.07] flex items-center justify-between gap-4 shrink-0">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-theme-primary/35 to-transparent"
            />
            <div className="flex items-center gap-2 text-xs sm:text-sm min-w-0">
              <Home className="w-4 h-4 text-slate-500 shrink-0" />
              <span className="text-slate-500 truncate">{t.groups.overview}</span>
              <span className="text-slate-600">/</span>
              <span className="font-semibold text-white truncate">{activeTabLabel}</span>
            </div>

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

              {refreshFeedback && (
                <span
                  className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px] font-mono animate-fadeIn ${
                    refreshFeedback === 'synced'
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                      : 'bg-rose-500/15 border-rose-500/30 text-rose-400'
                  }`}
                >
                  {refreshFeedback === 'synced'
                    ? lang === 'ar'
                      ? 'تم التحديث'
                      : 'Synced'
                    : lang === 'ar'
                    ? 'تعذر التحديث'
                    : 'Sync failed'}
                </span>
              )}

              <button
                type="button"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-slate-200 transition-colors disabled:opacity-60"
                title={lang === 'ar' ? 'تحديث البيانات (Shift+نقر لإعادة تحميل الصفحة)' : 'Refresh data (Shift+Click to reload page)'}
              >
                <RefreshCw className={`w-3.5 h-3.5 text-theme-primary ${isRefreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">{lang === 'ar' ? 'تحديث' : 'Refresh'}</span>
              </button>

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
                type="button"
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
                type="button"
                onClick={() => setActiveTab('theme')}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-white transition-colors"
                title="Theme Colors & Fonts"
              >
                <span className="w-3 h-3 rounded-full bg-theme-primary" />
                <span>AA</span>
              </button>

              <button
                type="button"
                onClick={() => setIsAdminOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </header>

          <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto text-start">
            <div key={activeTab} className="animate-fadeIn">
              {activeTab === 'images' && (
                <ImagesTab
                  profileForm={profileForm}
                  setProfileForm={setProfileForm}
                  onImageUpload={handleImageUpload}
                  onSaveProfile={handleSaveProfile}
                />
              )}

              {activeTab === 'names' && (
                <NamesTab
                  profileForm={profileForm}
                  setProfileForm={setProfileForm}
                  onSaveProfile={handleSaveProfile}
                />
              )}

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

              {activeTab === 'theme' && <ThemePickerPanel onSaved={showSaveNotification} />}

              {activeTab === 'projects' && (
                <ProjectsTab
                  editingProject={editingProject}
                  setEditingProject={setEditingProject}
                  isNewProject={isNewProject}
                  setIsNewProject={setIsNewProject}
                  requestConfirm={requestConfirm}
                  onSaved={showSaveNotification}
                />
              )}

              {activeTab === 'certificates' && (
                <CertificatesTab
                  editingCert={editingCert}
                  setEditingCert={setEditingCert}
                  isNewCert={isNewCert}
                  setIsNewCert={setIsNewCert}
                  requestConfirm={requestConfirm}
                  onSaved={showSaveNotification}
                />
              )}

              {activeTab === 'skills' && (
                <SkillsTab
                  skillsDraft={skillsDraft}
                  setSkillsDraft={setSkillsDraft}
                  requestConfirm={requestConfirm}
                  onSaved={showSaveNotification}
                />
              )}

              {activeTab === 'profile' && (
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-white mb-2">تعديل البيانات الشخصية والسيرة الذاتية</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="modal-profile-email" className="block text-xs font-mono text-slate-300 mb-1">البريد الإلكتروني</label>
                      <input
                        id="modal-profile-email"
                        name="email"
                        type="email"
                        dir="ltr"
                        inputMode="email"
                        autoComplete="email"
                        autoCapitalize="none"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#08090C] border border-white/10 text-white text-sm font-mono outline-none focus:border-theme-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="modal-profile-phone" className="block text-xs font-mono text-slate-300 mb-1">واتساب (WhatsApp)</label>
                      <input
                        id="modal-profile-phone"
                        name="tel"
                        type="text"
                        dir="ltr"
                        autoComplete="tel"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        placeholder="amratefkandel"
                        className="w-full px-3 py-2 rounded-xl bg-[#08090C] border border-white/10 text-white text-sm font-mono outline-none focus:border-theme-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="modal-profile-linkedin" className="block text-xs font-mono text-slate-300 mb-1">رابط لينكد إن (LinkedIn)</label>
                      <input
                        id="modal-profile-linkedin"
                        name="linkedin"
                        type="url"
                        dir="ltr"
                        autoComplete="url"
                        autoCapitalize="none"
                        value={profileForm.linkedin || ''}
                        onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#08090C] border border-white/10 text-white text-sm font-mono outline-none focus:border-theme-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="modal-profile-github" className="block text-xs font-mono text-slate-300 mb-1">رابط جيت هاب (GitHub)</label>
                      <input
                        id="modal-profile-github"
                        name="github"
                        type="url"
                        dir="ltr"
                        autoComplete="url"
                        autoCapitalize="none"
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
                    type="button"
                    onClick={handleSaveProfile}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-theme-primary to-theme-secondary text-white font-bold text-xs flex items-center gap-2 shadow-lg"
                  >
                    <Save className="w-4 h-4" />
                    <span>تحديث البيانات الشخصية</span>
                  </button>
                </div>
              )}

              {activeTab === 'inbox' && <InboxTab requestConfirm={requestConfirm} />}

              {activeTab === 'backup' && <BackupTab requestConfirm={requestConfirm} onSaved={showSaveNotification} />}
            </div>
          </div>
        </div>
      </div>

      <ConfirmActionModal
        {...confirmState}
        onClose={() => setConfirmState((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};

export default AdminModalShell;
