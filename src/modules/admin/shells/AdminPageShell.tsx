import React, { useCallback, useEffect, useState } from 'react';
import { Radio, RefreshCw } from 'lucide-react';
import type { Certificate, Project } from '@shared/types';
import { ConfirmActionModal, ConfirmActionState } from '@shared/ui/ConfirmActionModal';
import { usePortfolio } from '@/app/providers/PortfolioContext';
import { AdminLoginScreen, useAdminSessions } from '@modules/auth';
import { ThemePickerPanel } from '@modules/theme/components/ThemePickerPanel';
import { InboxTab } from '@modules/contact';
import { adminTranslations } from '../i18n/adminTranslations';
import { useActiveAdminTab } from '../hooks/useActiveAdminTab';
import { PULL_THRESHOLD, usePullToRefresh } from '../hooks/usePullToRefresh';
import { QuantixSidebar } from '../layout/QuantixSidebar';
import { AdminTopHeader } from '../layout/AdminTopHeader';
import { BrandIdentityModal } from '../layout/BrandIdentityModal';
import { MobileAdminNav } from '../layout/MobileAdminNav';
import { BentoOverview } from '../tabs/BentoOverview';
import { StatusTab } from '../tabs/StatusTab';
import { ProjectsTab } from '../tabs/ProjectsTab';
import { CertificatesTab } from '../tabs/CertificatesTab';
import { SkillsTab } from '../tabs/SkillsTab';
import { ProfileTab } from '../tabs/ProfileTab';
import { SecurityTab } from '../tabs/SecurityTab';
import { BackupTab } from '../tabs/BackupTab';
import type { RequestConfirmFn } from '../types';

export const AdminPageShell: React.FC = () => {
  const {
    profile,
    projects,
    certificates,
    skills,
    messages,
    lang,
    setLang,
    isAuthenticated,
    logout,
    refreshPortfolio,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useActiveAdminTab();
  const [isMobileMoreOpen, setIsMobileMoreOpen] = useState(false);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [isNewCert, setIsNewCert] = useState(false);

  const [profileForm, setProfileForm] = useState(profile);
  const [skillsDraft, setSkillsDraft] = useState(skills);

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

  const [showIosInstallGuide] = useState(() => {
    if (typeof window === 'undefined') return false;
    const ua = window.navigator.userAgent || '';
    const isIos = /iPhone|iPad|iPod/i.test(ua);
    const isStandalone =
      (window.navigator as any).standalone === true ||
      window.matchMedia('(display-mode: standalone)').matches;
    const dismissed = localStorage.getItem('admin_ios_guide_dismissed') === 'true';
    return isIos && !isStandalone && !dismissed;
  });

  const { fetchSessions } = useAdminSessions(isAuthenticated, logout);

  const syncAll = useCallback(async () => {
    const [ok] = await Promise.all([refreshPortfolio(), fetchSessions()]);
    return ok;
  }, [refreshPortfolio, fetchSessions]);

  const {
    isRefreshing,
    refreshFeedback,
    pullDistance,
    mainContentRef,
    handleHardReload,
    handleRefresh,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = usePullToRefresh(syncAll);

  if (!isAuthenticated) {
    return <AdminLoginScreen />;
  }

  const t = adminTranslations[lang];
  const unreadCount = messages.filter((m) => !m.read).length;
  const activeTabLabel = t.tabs[activeTab as keyof typeof t.tabs] || activeTab;

  const handleSelectTab = (tab: string) => {
    setActiveTab(tab as typeof activeTab);
    if (tab === 'projects') setEditingProject(null);
    if (tab === 'certificates') setEditingCert(null);
  };

  return (
    <div className="quantix-dashboard min-h-screen bg-[#07080B] text-slate-100 flex flex-col lg:flex-row selection:bg-theme-primary/30 selection:text-white">
      <QuantixSidebar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        unreadCount={unreadCount}
        projectsCount={projects.length}
        includeExtendedTabs
        onLogout={logout}
        onEditBrand={() => setIsBrandModalOpen(true)}
      />

      <div className="flex-1 flex flex-col min-w-0 bg-[#08090C]">
        <AdminTopHeader
          overviewGroupLabel={t.groups.overview}
          activeTabLabel={activeTabLabel}
          lang={lang}
          setLang={setLang}
          isRefreshing={isRefreshing}
          refreshFeedback={refreshFeedback}
          onRefresh={handleRefresh}
          onLogout={logout}
        />

        <main
          ref={mainContentRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-6xl w-full min-w-0 pb-[max(6.25rem,calc(env(safe-area-inset-bottom)+5.25rem))] lg:pb-8"
        >
          {(pullDistance > 0 || isRefreshing) && (
            <div
              className="lg:hidden flex items-center justify-center gap-2 overflow-hidden transition-all duration-150 mb-3"
              style={{ height: isRefreshing ? 40 : Math.min(48, Math.max(24, Math.round(pullDistance * 0.55))) }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs font-mono text-slate-200">
                <RefreshCw
                  className={`w-3.5 h-3.5 text-theme-primary ${isRefreshing ? 'animate-spin' : ''}`}
                  style={!isRefreshing ? { transform: `rotate(${Math.min(270, pullDistance * 3)}deg)` } : undefined}
                />
                <span>
                  {isRefreshing
                    ? lang === 'ar'
                      ? 'جاري التحديث...'
                      : 'Refreshing...'
                    : pullDistance >= PULL_THRESHOLD
                    ? lang === 'ar'
                      ? 'اترك للتحديث'
                      : 'Release to refresh'
                    : lang === 'ar'
                    ? 'اسحب للتحديث'
                    : 'Pull to refresh'}
                </span>
              </div>
            </div>
          )}

          <div key={activeTab} className="animate-fadeIn">
            {activeTab === 'overview' && (
              <div className="space-y-6">
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
                  onNavigate={handleSelectTab}
                />

                <div className="p-4 sm:p-5 quantix-card flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 min-w-0">
                  <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5 sm:mt-0">
                      <Radio className="w-5 h-5 animate-pulse" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2 flex-wrap">
                        <span>الحالة الحية الحالية:</span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold ${
                            (profileForm.availabilityStatus || 'available') === 'available'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : profileForm.availabilityStatus === 'busy'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : 'bg-[#14151B] text-slate-400 border border-white/[0.08]'
                          }`}
                        >
                          {(profileForm.availabilityStatus || 'available') === 'available'
                            ? 'متاح للعمل (Available) 🟢'
                            : profileForm.availabilityStatus === 'busy'
                            ? 'مشغول بمشاريع (Busy) 🟡'
                            : 'غير متاح (Offline) ⚪'}
                        </span>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-[1.75]">
                        واتساب:{' '}
                        {(profileForm.whatsappStatus || 'online') === 'online'
                          ? 'متصل للرد الفوري 🟢'
                          : profileForm.whatsappStatus === 'delayed'
                          ? 'الرد خلال ساعات 🟡'
                          : 'غير متصل ⚪'}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('status')}
                    className="min-h-[44px] px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-mono font-semibold transition-all self-start sm:self-center shrink-0 flex items-center justify-center"
                  >
                    تعديل الحالة الآن &larr;
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'theme' && <ThemePickerPanel />}
            {activeTab === 'status' && (
              <StatusTab profileForm={profileForm} setProfileForm={setProfileForm} requestConfirm={requestConfirm} />
            )}
            {activeTab === 'projects' && (
              <ProjectsTab
                editingProject={editingProject}
                setEditingProject={setEditingProject}
                isNewProject={isNewProject}
                setIsNewProject={setIsNewProject}
                requestConfirm={requestConfirm}
              />
            )}
            {activeTab === 'certificates' && (
              <CertificatesTab
                editingCert={editingCert}
                setEditingCert={setEditingCert}
                isNewCert={isNewCert}
                setIsNewCert={setIsNewCert}
                requestConfirm={requestConfirm}
              />
            )}
            {activeTab === 'skills' && (
              <SkillsTab skillsDraft={skillsDraft} setSkillsDraft={setSkillsDraft} requestConfirm={requestConfirm} />
            )}
            {activeTab === 'profile' && (
              <ProfileTab profileForm={profileForm} setProfileForm={setProfileForm} requestConfirm={requestConfirm} />
            )}
            {activeTab === 'security' && <SecurityTab requestConfirm={requestConfirm} />}
            {activeTab === 'inbox' && <InboxTab requestConfirm={requestConfirm} />}
            {activeTab === 'backup' && <BackupTab requestConfirm={requestConfirm} />}
          </div>
        </main>
      </div>

      <BrandIdentityModal
        isOpen={isBrandModalOpen}
        onClose={() => setIsBrandModalOpen(false)}
        requestConfirm={requestConfirm}
      />

      <MobileAdminNav
        activeTab={activeTab}
        isMobileMoreOpen={isMobileMoreOpen}
        setIsMobileMoreOpen={setIsMobileMoreOpen}
        onSelectTab={handleSelectTab}
        unreadCount={unreadCount}
        lang={lang}
        tabsLabels={t.tabs}
        profile={profile}
        onOpenBrandModal={() => setIsBrandModalOpen(true)}
        onHardReload={handleHardReload}
        showIosInstallGuide={showIosInstallGuide}
      />

      <ConfirmActionModal
        {...confirmState}
        onClose={() => setConfirmState((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};

export default AdminPageShell;
