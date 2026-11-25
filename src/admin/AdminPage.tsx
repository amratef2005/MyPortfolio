import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project, Certificate } from '../types';
import {
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
  RotateCcw,
  ShieldCheck,
  LogOut,
  ExternalLink,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Radio,
  MessageSquare,
  Upload,
  Palette,
  RefreshCw,
  Image as ImageIcon,
  Pencil,
  X,
  Laptop,
  Smartphone,
  Monitor,
  Clock,
  ShieldAlert,
  Crown,
  Shield,
  UserCheck,
  Bell,
  Box,
  Globe,
  Home
} from 'lucide-react';
import { compressImageFile } from '../utils/imageCompressor';
import { BentoOverview } from './BentoOverview';
import { QuantixSidebar } from './QuantixSidebar';
import { ThemePickerPanel } from './ThemePickerPanel';
import { adminTranslations } from './adminTranslations';

export const AdminPage: React.FC = () => {
  const {
    profile,
    projects,
    certificates,
    skills,
    messages,
    lang,
    setLang,
    isAuthenticated,
    login,
    logout,
    updateCredentials,
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

  // Login Form States
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Dashboard Tabs
  const [activeTab, setActiveTab] = useState<'overview' | 'status' | 'projects' | 'certificates' | 'skills' | 'profile' | 'security' | 'inbox' | 'backup' | 'theme'>('overview');
  const [statusSuccess, setStatusSuccess] = useState('');

  // Edit Project State
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);

  // Edit Certificate State
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [isNewCert, setIsNewCert] = useState(false);

  // Profile Form State
  const [profileForm, setProfileForm] = useState(profile);

  // Navbar Brand Quick Editor State
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [uploadingBrandAvatar, setUploadingBrandAvatar] = useState(false);
  const [brandForm, setBrandForm] = useState({
    topAvatarUrl: profile.topAvatarUrl || '/my.jpg',
    name: profile.name || 'Amr Atef Imam Kandel',
    nameAr: profile.nameAr || 'عمرو عاطف إمام قنديل',
    title: profile.title || '.NET Backend Developer',
    titleAr: profile.titleAr || 'مطور نظم خلفية .NET',
  });
  const [brandSuccess, setBrandSuccess] = useState(false);

  React.useEffect(() => {
    setProfileForm(profile);
    setBrandForm({
      topAvatarUrl: profile.topAvatarUrl || '/my.jpg',
      name: profile.name || 'Amr Atef Imam Kandel',
      nameAr: profile.nameAr || 'عمرو عاطف إمام قنديل',
      title: profile.title || '.NET Backend Developer',
      titleAr: profile.titleAr || 'مطور نظم خلفية .NET',
    });
  }, [profile]);

  const handleBrandAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingBrandAvatar(true);
    try {
      // Compress to max 320x320 Retina-ready JPEG (~20-30KB)
      const compressedDataUrl = await compressImageFile(file, 320, 0.88);
      if (compressedDataUrl) {
        setBrandForm(prev => ({ ...prev, topAvatarUrl: compressedDataUrl }));
      }
    } catch (err) {
      console.error('Image compression error:', err);
    } finally {
      setUploadingBrandAvatar(false);
    }
  };

  const handleSaveBrand = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateProfile({
      topAvatarUrl: brandForm.topAvatarUrl,
      name: brandForm.name,
      nameAr: brandForm.nameAr,
      title: brandForm.title,
      titleAr: brandForm.titleAr,
    });
    setProfileForm(prev => ({
      ...prev,
      topAvatarUrl: brandForm.topAvatarUrl,
      name: brandForm.name,
      nameAr: brandForm.nameAr,
      title: brandForm.title,
      titleAr: brandForm.titleAr,
    }));
    setBrandSuccess(true);
    setTimeout(() => {
      setBrandSuccess(false);
      setIsBrandModalOpen(false);
    }, 1200);
  };

  const handleHeroFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      // Compress hero avatar to max 800x800 (~60-90KB)
      const compressedDataUrl = await compressImageFile(file, 800, 0.88);
      if (compressedDataUrl) {
        setProfileForm(prev => ({ ...prev, heroAvatarUrl: compressedDataUrl }));
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
        setProfileForm(prev => ({ ...prev, topAvatarUrl: compressedDataUrl }));
      }
    } catch (err) {
      console.error('Top image compression error:', err);
    }
  };

  // Security Form State
  const [newUsername, setNewUsername] = useState(profile.adminUsername || 'amratefkandel');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [securitySuccess, setSecuritySuccess] = useState('');
  const [securityError, setSecurityError] = useState('');

  // Active Sessions / Devices Management
  interface AdminSession {
    id: string;
    deviceInfo: string;
    ipAddress: string;
    createdAt: string;
    lastActive: string;
    isCurrent: boolean;
    isOldest: boolean;
    isPrimaryMaster: boolean;
    isMaster: boolean;
    canBeTerminated: boolean;
    canBePromoted: boolean;
  }
  const [sessions, setSessions] = useState<AdminSession[]>([]);
  const [activeSessionsCount, setActiveSessionsCount] = useState<number>(0);
  const [isCallerMaster, setIsCallerMaster] = useState<boolean>(true);
  const [loadingSessions, setLoadingSessions] = useState<boolean>(false);
  const [terminatingNewest, setTerminatingNewest] = useState<boolean>(false);
  const [actionTargetId, setActionTargetId] = useState<string | null>(null);
  const [sessionActionMessage, setSessionActionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Fetch active sessions from serverless API
  const fetchSessions = React.useCallback(async () => {
    if (!isAuthenticated) return;
    setLoadingSessions(true);
    try {
      const sid = typeof window !== 'undefined' ? localStorage.getItem('portfolio_admin_session_id') || '' : '';
      const res = await fetch(`/api/admin-sessions?sessionId=${encodeURIComponent(sid)}`, {
        headers: { 'x-session-id': sid }
      });
      if (res.ok) {
        const data = await res.json();
        setActiveSessionsCount(data.count ?? data.activeSessionsCount ?? (data.sessions ? data.sessions.length : 0));
        setSessions(data.sessions || []);
        setIsCallerMaster(Boolean(data.isCallerMaster));
        if (sid && (data.isCurrentActive === false || data.isCurrentSessionActive === false)) {
          alert('تم إنهاء جلستك على هذا الجهاز (تم تسجيل الخروج بواسطة الإدارة).');
          logout();
        }
      }
    } catch {
      // ignore
    } finally {
      setLoadingSessions(false);
    }
  }, [isAuthenticated, logout]);

  React.useEffect(() => {
    if (isAuthenticated) {
      fetchSessions();
      const interval = setInterval(fetchSessions, 20000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, fetchSessions]);

  // Handle Terminate Newest Device (Primary Master / Co-Master Only)
  const handleTerminateNewest = async () => {
    if (!window.confirm('هل أنت متأكد من رغبتك في طرد أحدث جهاز مسجل دخولاً؟')) {
      return;
    }
    setTerminatingNewest(true);
    setSessionActionMessage(null);
    try {
      const sid = typeof window !== 'undefined' ? localStorage.getItem('portfolio_admin_session_id') || '' : '';
      const res = await fetch('/api/admin-sessions?action=newest', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': sid
        }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSessionActionMessage({
          type: 'success',
          text: data.message || 'تم طرد أحدث جهاز بنجاح!'
        });
        await fetchSessions();
      } else {
        setSessionActionMessage({
          type: 'error',
          text: data.message || 'تعذر طرد الجهاز الأحدث.'
        });
      }
    } catch {
      setSessionActionMessage({
        type: 'error',
        text: 'حدث خطأ أثناء الاتصال بالخادم.'
      });
    } finally {
      setTerminatingNewest(false);
    }
  };

  // Handle Terminate a Specific Subordinate Device
  const handleTerminateDevice = async (targetId: string, targetName: string) => {
    if (!window.confirm(`هل أنت متأكد من رغبتك في طرد هذا الجهاز (${targetName}) فورياً؟`)) {
      return;
    }
    setActionTargetId(targetId);
    setSessionActionMessage(null);
    try {
      const sid = typeof window !== 'undefined' ? localStorage.getItem('portfolio_admin_session_id') || '' : '';
      const res = await fetch(`/api/admin-sessions?sessionId=${encodeURIComponent(targetId)}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': sid
        }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSessionActionMessage({
          type: 'success',
          text: data.message || `تم طرد الجهاز بنجاح!`
        });
        await fetchSessions();
      } else {
        setSessionActionMessage({
          type: 'error',
          text: data.message || 'تعذر طرد الجهاز المستهدف.'
        });
      }
    } catch {
      setSessionActionMessage({
        type: 'error',
        text: 'حدث خطأ أثناء الاتصال بالخادم.'
      });
    } finally {
      setActionTargetId(null);
    }
  };

  // Handle Toggle Master / Promote to Equal Permissions
  const handleToggleMaster = async (targetId: string, makeMaster: boolean, targetName: string) => {
    const actionText = makeMaster ? 'ترقية هذا الجهاز ومساواته في الصلاحيات الكاملة' : 'إلغاء الصلاحيات الكاملة لهذا الجهاز';
    if (!window.confirm(`هل أنت متأكد من ${actionText} (${targetName})؟`)) {
      return;
    }
    setActionTargetId(targetId);
    setSessionActionMessage(null);
    try {
      const sid = typeof window !== 'undefined' ? localStorage.getItem('portfolio_admin_session_id') || '' : '';
      const res = await fetch('/api/admin-sessions', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': sid
        },
        body: JSON.stringify({
          targetSessionId: targetId,
          isMaster: makeMaster
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSessionActionMessage({
          type: 'success',
          text: data.message || (makeMaster ? 'تمت ترقية الجهاز ومساواته في الصلاحيات بنجاح 👑' : 'تم إلغاء الترقية بنجاح')
        });
        await fetchSessions();
      } else {
        setSessionActionMessage({
          type: 'error',
          text: data.message || 'تعذر تعديل رتبة الجهاز.'
        });
      }
    } catch {
      setSessionActionMessage({
        type: 'error',
        text: 'حدث خطأ أثناء الاتصال بالخادم.'
      });
    } finally {
      setActionTargetId(null);
    }
  };

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput.trim() || !passwordInput.trim()) {
      setLoginError('يرجى إدخال اسم المستخدم وكلمة المرور');
      return;
    }

    const success = login(usernameInput, passwordInput);
    if (success) {
      setLoginError('');
      setUsernameInput('');
      setPasswordInput('');
    } else {
      setLoginError('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
  };

  // Handle Update Security / Password
  const handleSecurityUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setSecuritySuccess('');
    setSecurityError('');

    if (!isCallerMaster) {
      setSecurityError('غير مصرح: صلاحية تعديل بيانات الدخول محصورة في الجهاز الأساسي الأول أو الأجهزة المفوضة.');
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

    const passwordToSet = newPassword.trim() ? newPassword : (profile.adminPassword || 'KandelAmr###14');
    updateCredentials(newUsername, passwordToSet);
    updateProfile({ adminUsername: newUsername, adminPassword: passwordToSet });

    setSecuritySuccess('تم تحديث بيانات الدخول وكلمة المرور بنجاح!');
    setNewPassword('');
    setConfirmPassword('');
  };

  // ==========================================
  // 1. UN-AUTHENTICATED: LOGIN SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#07090e] flex flex-col justify-center items-center p-4 relative overflow-hidden font-cairo selection:bg-theme-primary/30 selection:text-theme-primary">
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
            Portfolio Administration & Content Management
          </p>

          {loginError && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium flex items-center gap-2 text-right">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-right">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
                اسم المستخدم (Username)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={usernameInput}
                  onChange={(e) => {
                    setUsernameInput(e.target.value);
                    setLoginError('');
                  }}
                  placeholder="اسم المستخدم (Username)"
                  className="w-full px-4 py-3 rounded-xl bg-[#08090C] border border-white/[0.08] focus:border-theme-primary text-white text-sm outline-none font-mono transition-all text-left placeholder:text-slate-600"
                  required
                />
                <User className="w-4 h-4 text-slate-500 absolute top-3.5 right-3.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
                كلمة المرور (Password)
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setLoginError('');
                  }}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-10 rounded-xl bg-[#08090C] border border-white/[0.08] focus:border-theme-primary text-white text-sm outline-none font-mono transition-all text-left placeholder:text-slate-600"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-3.5 left-3 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <KeyRound className="w-4 h-4 text-slate-500 absolute top-3.5 right-3.5 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              style={{
                background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))',
                boxShadow: '0 8px 24px -6px rgba(var(--theme-primary-rgb), 0.45)',
              }}
              className="w-full py-3.5 mt-2 rounded-xl hover:brightness-110 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Unlock className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>تأكيد تسجيل الدخول</span>
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 pt-5 border-t border-white/[0.08]/80 text-center">
            <p className="text-[11px] font-mono text-slate-500">
              منطقة إدارية مخصصة ومحمية &bull; يُسمح بالدخول للحساب المصرح له فقط
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-theme-primary font-mono mt-3 transition-colors"
            >
              <span>العودة إلى البورتفوليو</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. AUTHENTICATED: QUANTIX FULL-PAGE DASHBOARD
  // ==========================================
  const t = adminTranslations[lang];
  const unreadCount = messages.filter((m) => !m.read).length;
  const activeTabLabel = t.tabs[activeTab as keyof typeof t.tabs] || activeTab;

  return (
    <div className="quantix-dashboard min-h-screen bg-[#07080B] text-slate-100 flex flex-col lg:flex-row selection:bg-theme-primary/30 selection:text-white">
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
        includeExtendedTabs
        onLogout={logout}
        onEditBrand={() => setIsBrandModalOpen(true)}
      />

      {/* Right Main Column: Quantix Top Bar + Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#08090C]">
        {/* Top Header */}
        <header className="px-4 sm:px-7 py-3 bg-[#0A0B0F]/90 border-b border-white/[0.07] sticky top-0 z-40 backdrop-blur-xl flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
          {/* Left: Breadcrumb + Brand Identity Quick Trigger */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
              <Home className="w-4 h-4 shrink-0" />
              <span>{t.groups.overview}</span>
              <span className="text-slate-600">/</span>
              <span className="font-semibold text-white">{activeTabLabel}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="flex items-center justify-center gap-1.5 h-9 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/[0.08] text-xs font-mono font-semibold transition-all shrink-0"
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-theme-primary" />
              <span>{lang === 'en' ? 'AR' : 'EN'}</span>
            </button>

            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 h-9 px-3 rounded-xl bg-theme-primary/15 hover:bg-theme-primary/25 text-theme-primary border border-theme-primary/30 text-xs font-mono font-semibold transition-all shrink-0 touch-manipulation"
            >
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">{lang === 'ar' ? 'معاينة البورتفوليو' : 'Preview'}</span>
            </a>

            <button
              onClick={logout}
              className="flex items-center justify-center gap-1.5 h-9 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/25 text-xs font-mono font-semibold transition-all shrink-0 touch-manipulation"
            >
              <LogOut className="w-3.5 h-3.5 shrink-0 rtl-flip" />
              <span className="hidden sm:inline">{lang === 'ar' ? 'خروج' : 'Logout'}</span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-6xl w-full min-w-0 pb-[max(2rem,env(safe-area-inset-bottom))]">
          {/* TAB 1: BENTO OVERVIEW */}
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
                onNavigate={(tab) => setActiveTab(tab as typeof activeTab)}
              />

              {/* Quick Status Bar */}
              <div className="p-4 sm:p-5 quantix-card flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 min-w-0">
                <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5 sm:mt-0">
                    <Radio className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2 flex-wrap">
                      <span>الحالة الحية الحالية:</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold ${(profileForm.availabilityStatus || 'available') === 'available'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : ((profileForm.availabilityStatus === 'busy')
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-[#14151B] text-slate-400 border border-white/[0.08]')
                        }`}>
                        {(profileForm.availabilityStatus || 'available') === 'available' ? 'متاح للعمل (Available) 🟢' : ((profileForm.availabilityStatus === 'busy') ? 'مشغول بمشاريع (Busy) 🟡' : 'غير متاح (Offline) ⚪')}
                      </span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-[1.75]">
                      واتساب: {(profileForm.whatsappStatus || 'online') === 'online' ? 'متصل للرد الفوري 🟢' : ((profileForm.whatsappStatus === 'delayed') ? 'الرد خلال ساعات 🟡' : 'غير متصل ⚪')}
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

          {/* TAB: THEME & COLORS */}
          {activeTab === 'theme' && (
            <ThemePickerPanel />
          )}

          {/* TAB: AVAILABILITY & WHATSAPP STATUS */}
          {activeTab === 'status' && (
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
                        1. حالة التوفر والعمل العامة (Work & Hiring Status)
                      </h3>
                      <p className="text-xs text-slate-400 font-mono">
                        تظهر في شارة الأفاتار التفاعلية بالهيرو وقسم التواصل
                      </p>
                    </div>
                  </div>

                  {/* Master Toggle */}
                  <button
                    type="button"
                    onClick={() => setProfileForm({
                      ...profileForm,
                      showAvailabilityBadge: profileForm.showAvailabilityBadge === false
                    })}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer ${profileForm.showAvailabilityBadge !== false
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
                    {/* Available */}
                    <button
                      type="button"
                      onClick={() => setProfileForm({
                        ...profileForm,
                        availabilityStatus: 'available',
                        availabilityNoteAr: 'جاهز للمشاريع والتحديات الهندسية',
                        availabilityNoteEn: 'Available for High-Impact Roles'
                      })}
                      className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col gap-1.5 cursor-pointer ${(profileForm.availabilityStatus || 'available') === 'available'
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

                    {/* Busy */}
                    <button
                      type="button"
                      onClick={() => setProfileForm({
                        ...profileForm,
                        availabilityStatus: 'busy',
                        availabilityNoteAr: 'مشغول حالياً بمشاريع قائمة',
                        availabilityNoteEn: 'Busy with Ongoing Projects'
                      })}
                      className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col gap-1.5 cursor-pointer ${profileForm.availabilityStatus === 'busy'
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

                    {/* Offline */}
                    <button
                      type="button"
                      onClick={() => setProfileForm({
                        ...profileForm,
                        availabilityStatus: 'offline',
                        availabilityNoteAr: 'غير متاح حالياً لاستقبال مشاريع',
                        availabilityNoteEn: 'Currently Unavailable'
                      })}
                      className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col gap-1.5 cursor-pointer ${profileForm.availabilityStatus === 'offline'
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

                {/* Live Preview Avatar Badge */}
                <div className="p-4 quantix-card flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-xs font-mono text-slate-400">معاينة شكل الشارة في الهيرو والأفاتار:</span>
                  <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#08090C] border text-xs font-mono font-semibold self-start sm:self-auto ${(profileForm.availabilityStatus || 'available') === 'available'
                    ? 'border-emerald-500/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                    : (profileForm.availabilityStatus === 'busy'
                      ? 'border-amber-500/40 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                      : 'border-white/[0.08] text-slate-400')
                    }`}>
                    <span className="relative flex h-2 w-2 shrink-0">
                      {(profileForm.availabilityStatus || 'available') === 'available' && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      )}
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${(profileForm.availabilityStatus || 'available') === 'available'
                        ? 'bg-emerald-400'
                        : (profileForm.availabilityStatus === 'busy' ? 'bg-amber-400' : 'bg-slate-500')
                        }`} />
                    </span>
                    <span>
                      {profileForm.availabilityNoteAr ||
                        ((profileForm.availabilityStatus || 'available') === 'available'
                          ? 'جاهز للمشاريع والتحديات الهندسية'
                          : (profileForm.availabilityStatus === 'busy' ? 'مشغول حالياً بمشاريع قائمة' : 'غير متاح حالياً'))}
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

                  {/* WhatsApp Status Toggle */}
                  <button
                    type="button"
                    onClick={() => setProfileForm({
                      ...profileForm,
                      showWhatsAppStatus: profileForm.showWhatsAppStatus === false
                    })}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer ${profileForm.showWhatsAppStatus !== false
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40'
                      : 'bg-[#14151B] text-slate-400 border-white/[0.08]'
                      }`}
                  >
                    {profileForm.showWhatsAppStatus !== false ? 'شارة الواتساب: مفعّلة (ON)' : 'شارة الواتساب: مخفية (OFF)'}
                  </button>
                </div>

                {/* WhatsApp Presets */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2 font-semibold">
                    اختر حالة التوفر على واتساب:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Online */}
                    <button
                      type="button"
                      onClick={() => setProfileForm({
                        ...profileForm,
                        whatsappStatus: 'online',
                        whatsappNoteAr: 'متاح الآن للرد الفوري',
                        whatsappNoteEn: 'Available for immediate reply'
                      })}
                      className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col gap-1.5 cursor-pointer ${(profileForm.whatsappStatus || 'online') === 'online'
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

                    {/* Delayed */}
                    <button
                      type="button"
                      onClick={() => setProfileForm({
                        ...profileForm,
                        whatsappStatus: 'delayed',
                        whatsappNoteAr: 'مشغول • الرد خلال ساعات',
                        whatsappNoteEn: 'Replies within a few hours'
                      })}
                      className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col gap-1.5 cursor-pointer ${profileForm.whatsappStatus === 'delayed'
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

                    {/* Offline */}
                    <button
                      type="button"
                      onClick={() => setProfileForm({
                        ...profileForm,
                        whatsappStatus: 'offline',
                        whatsappNoteAr: 'غير متصل حالياً • اترك رسالة',
                        whatsappNoteEn: 'Offline • Leave a message'
                      })}
                      className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col gap-1.5 cursor-pointer ${profileForm.whatsappStatus === 'offline'
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

                {/* WhatsApp Text Inputs */}
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

                {/* Direct Link Input */}
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

                {/* Live Preview WhatsApp Badge */}
                <div className="p-4 quantix-card flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-xs font-mono text-slate-400">معاينة شارة الواتساب في بطاقة التواصل:</span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium self-start sm:self-auto ${(profileForm.whatsappStatus || 'online') === 'online'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : (profileForm.whatsappStatus === 'delayed'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      : 'bg-[#14151B] text-slate-400 border border-white/[0.08]')
                    }`}>
                    <span className={`w-2 h-2 rounded-full ${(profileForm.whatsappStatus || 'online') === 'online'
                      ? 'bg-emerald-400 animate-pulse'
                      : (profileForm.whatsappStatus === 'delayed' ? 'bg-amber-400' : 'bg-slate-500')
                      }`} />
                    <span>
                      {profileForm.whatsappNoteAr ||
                        ((profileForm.whatsappStatus || 'online') === 'online'
                          ? 'متاح الآن للرد الفوري'
                          : (profileForm.whatsappStatus === 'delayed' ? 'مشغول • الرد خلال ساعات' : 'غير متصل حالياً • اترك رسالة'))}
                    </span>
                  </span>
                </div>
              </div>

              {/* SAVE BUTTON */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    updateProfile(profileForm);
                    setStatusSuccess('تم حفظ وتحديث حالات التوفر والواتساب بنجاح في البورتفوليو!');
                    setTimeout(() => setStatusSuccess(''), 4000);
                  }}
                  className="px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-theme-primary hover:from-emerald-400 hover:to-theme-primary text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ وتطبيق الحالات في البورتفوليو</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              {!editingProject ? (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white">المشاريع المضافة ({projects.length})</h2>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">إضافة وتعديل وحذف المشاريع</p>
                    </div>
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
                          category: '.NET & Backend',
                          featured: true,
                          badge: 'Enterprise Project',
                          architecture: ['Clean Architecture'],
                          technologies: ['.NET 10', 'PostgreSQL'],
                          metrics: [{ label: 'Performance', value: '100%' }],
                          features: ['ميزة هندسية جديدة']
                        });
                      }}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-theme-primary hover:bg-theme-primary text-white text-xs font-bold shadow-[0_0_15px_rgba(var(--theme-primary-rgb),0.3)] transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>إضافة مشروع جديد</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {projects.map((p) => (
                      <div key={p.id} className="p-4 quantix-card flex items-center justify-between gap-4">
                        <div>
                          <span className="text-xs font-mono text-theme-primary font-semibold">{p.badge}</span>
                          <h4 className="font-bold text-white text-base">{p.titleAr || p.title}</h4>
                          <p className="text-xs text-slate-400 font-mono mt-0.5">{p.taglineAr || p.tagline}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => { setEditingProject(p); setIsNewProject(false); }}
                            className="px-3.5 py-1.5 rounded-lg bg-[#14151B] hover:bg-slate-700 text-xs text-slate-200 transition-colors"
                          >
                            تعديل
                          </button>
                          <button
                            onClick={() => { if (confirm('هل أنت متأكد من حذف هذا المشروع؟')) deleteProject(p.id); }}
                            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                /* Edit / Add Project Form */
                <div className="space-y-5 quantix-card p-6">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                    <h3 className="text-lg font-bold text-white">
                      {isNewProject ? 'إضافة مشروع جديد' : `تعديل: ${editingProject.titleAr || editingProject.title}`}
                    </h3>
                    <button
                      onClick={() => setEditingProject(null)}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      إلغاء والعودة
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">اسم المشروع (عربي)</label>
                      <input
                        type="text"
                        value={editingProject.titleAr}
                        onChange={(e) => setEditingProject({ ...editingProject, titleAr: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">اسم المشروع (English)</label>
                      <input
                        type="text"
                        value={editingProject.title}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">الشعار المختصر (Tagline)</label>
                    <input
                      type="text"
                      value={editingProject.taglineAr}
                      onChange={(e) => setEditingProject({ ...editingProject, taglineAr: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">الوصف التفصيلي</label>
                    <textarea
                      rows={3}
                      value={editingProject.descriptionAr}
                      onChange={(e) => setEditingProject({ ...editingProject, descriptionAr: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">الشارة (Badge)</label>
                    <input
                      type="text"
                      value={editingProject.badge}
                      onChange={(e) => setEditingProject({ ...editingProject, badge: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm font-mono"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-3">
                    <button
                      onClick={() => {
                        if (isNewProject) {
                          addProject(editingProject);
                        } else {
                          updateProject(editingProject.id, editingProject);
                        }
                        setEditingProject(null);
                      }}
                      className="px-6 py-2.5 rounded-xl bg-theme-primary hover:bg-theme-primary text-white font-bold text-xs shadow-lg flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>حفظ المشروع</span>
                    </button>
                    <button
                      onClick={() => setEditingProject(null)}
                      className="px-4 py-2.5 rounded-xl border border-white/[0.08] text-slate-400 text-xs"
                    >
                      إلغاء
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CERTIFICATES */}
          {activeTab === 'certificates' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">الشهادات والاعتمادات ({certificates.length})</h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">إدارة وتعديل شهادات ITI والاعتمادات المهنية</p>
                </div>
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
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-theme-primary hover:bg-theme-primary text-white text-xs font-bold"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة شهادة جديدة</span>
                </button>
              </div>

              {!editingCert ? (
                <div className="space-y-3">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="p-4 quantix-card flex items-center justify-between gap-4">
                      <div>
                        <span className="text-xs font-mono text-emerald-400 font-semibold">{cert.badge}</span>
                        <h4 className="font-bold text-white text-base">{cert.titleAr || cert.title}</h4>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">{cert.issuerAr} &bull; {cert.fileUrl}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => { setEditingCert(cert); setIsNewCert(false); }}
                          className="px-3.5 py-1.5 rounded-lg bg-[#14151B] hover:bg-slate-700 text-xs text-slate-200"
                        >
                          تعديل
                        </button>
                        <button
                          onClick={() => { if (confirm('هل أنت متأكد من حذف هذه الشهادة؟')) deleteCertificate(cert.id); }}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Edit Certificate Form */
                <div className="space-y-4 quantix-card p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">اسم الشهادة (عربي)</label>
                      <input
                        type="text"
                        value={editingCert.titleAr}
                        onChange={(e) => setEditingCert({ ...editingCert, titleAr: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">الجهة المصدرة</label>
                      <input
                        type="text"
                        value={editingCert.issuerAr}
                        onChange={(e) => setEditingCert({ ...editingCert, issuerAr: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">رابط ملف الـ PDF (مثال: /iti.pdf أو رابط ويب)</label>
                    <input
                      type="text"
                      value={editingCert.fileUrl}
                      onChange={(e) => setEditingCert({ ...editingCert, fileUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm font-mono"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-3">
                    <button
                      onClick={() => {
                        if (isNewCert) {
                          addCertificate(editingCert);
                        } else {
                          updateCertificate(editingCert.id, editingCert);
                        }
                        setEditingCert(null);
                      }}
                      className="px-6 py-2.5 rounded-xl bg-theme-primary hover:bg-theme-primary text-white font-bold text-xs"
                    >
                      حفظ الشهادة
                    </button>
                    <button
                      onClick={() => setEditingCert(null)}
                      className="px-4 py-2.5 rounded-xl border border-white/[0.08] text-slate-400 text-xs"
                    >
                      إلغاء
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SKILLS */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">إدارة المهارات والتقنيات</h2>
                <p className="text-xs text-slate-400 font-mono mt-0.5">تعديل نسب المهارات الظاهرة في البورتفوليو</p>
              </div>

              <div className="space-y-6">
                {skills.map((category, catIdx) => (
                  <div key={catIdx} className="p-5 quantix-card space-y-3">
                    <h3 className="font-bold text-theme-primary text-sm">{category.nameAr}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {category.skills.map((skill, sIdx) => {
                        const skillName = typeof skill === 'string' ? skill : (skill.name || skill.nameAr || '');
                        const skillLevel = typeof skill === 'object' && skill !== null && typeof skill.level === 'number' ? skill.level : 90;
                        return (
                          <div key={sIdx} className="flex items-center justify-between p-3 rounded-xl bg-[#0B0C10] border border-white/[0.08]">
                            <span className="text-xs text-white font-medium">{skillName}</span>
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                min={0}
                                max={100}
                                value={skillLevel}
                                onChange={(e) => {
                                  const nextLevel = Math.min(100, Math.max(0, Number(e.target.value) || 0));
                                  const newSkills = skills.map((c, ci) =>
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
                                  updateSkills(newSkills);
                                }}
                                className="w-16 px-2 py-1 rounded bg-[#08090C] text-theme-primary text-xs font-mono text-center border border-white/[0.08]"
                              />
                              <span className="text-xs text-slate-500 font-mono">%</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PROFILE & IMAGES */}
          {activeTab === 'profile' && (
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
                  <label className="block text-xs font-mono text-slate-300 mb-1">الاسم الكامل (English - Top & CV)</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">الاسم المختصر (English - Hero)</label>
                  <input
                    type="text"
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
                  <label className="block text-xs font-mono text-slate-300 mb-1">المسمى الوظيفي (English - Title)</label>
                  <input
                    type="text"
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
                  <label className="block text-xs font-mono text-slate-300 mb-1">رابط GitHub</label>
                  <input
                    type="text"
                    value={profileForm.github}
                    onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">رابط LinkedIn</label>
                  <input
                    type="text"
                    value={profileForm.linkedin}
                    onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">البريد الإلكتروني</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">واتساب (WhatsApp)</label>
                  <input
                    type="text"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">الموقع الجغرافي (English)</label>
                  <input
                    type="text"
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

              {/* =========================================================================
                  HERO AVATAR & NAVBAR IMAGE & DYNAMIC COLOR THEME CONTROLS
                  ========================================================================= */}
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

                {/* 1. Hero Avatar Controls */}
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

                    {/* Current Preview */}
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

                  {/* Preset Chips */}
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
                          onClick={() => {
                            setProfileForm(prev => ({ ...prev, heroAvatarUrl: item.url }));
                          }}
                          className={`p-2.5 rounded-xl text-start border transition-all flex flex-col justify-between text-xs ${(profileForm.heroAvatarUrl || '/drama_hero.png') === item.url
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

                  {/* Upload or Custom URL */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                    <div className="md:col-span-8 space-y-1">
                      <label className="block text-xs font-mono text-slate-400">أو اكتب مسار / رابط الصورة:</label>
                      <input
                        type="text"
                        value={profileForm.heroAvatarUrl || '/drama_hero.png'}
                        onChange={(e) => {
                          const val = e.target.value;
                          setProfileForm({ ...profileForm, heroAvatarUrl: val });
                        }}
                        placeholder="/drama_hero.png أو رابط خارجي https://..."
                        className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-theme-primary text-xs font-mono"
                      />
                    </div>
                    <div className="md:col-span-4">
                      <label className="block text-xs font-mono text-slate-400 mb-1">رفع صورة جديدة من جهازك:</label>
                      <label className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-theme-primary/10 hover:bg-theme-primary/20 border border-theme-primary/40 text-theme-primary text-xs font-bold cursor-pointer transition-all shadow-sm">
                        <Upload className="w-4 h-4 shrink-0" />
                        <span>رفع صورة من الجهاز</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleHeroFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* 2. Navbar Image Controls */}
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
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleTopFileUpload}
                          className="hidden"
                        />
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
                onClick={() => {
                  updateProfile(profileForm);
                  alert('تم حفظ البيانات الشخصية بنجاح!');
                }}
                className="px-6 py-2.5 rounded-xl bg-theme-primary hover:bg-theme-primary text-white font-bold text-xs flex items-center gap-2 shadow-lg"
              >
                <Save className="w-4 h-4" />
                <span>تحديث البيانات الشخصية</span>
              </button>
            </div>
          )}

          {/* TAB 6: SECURITY & DEVICES MANAGEMENT */}
          {activeTab === 'security' && (
            <div className="space-y-8 max-w-4xl">
              {/* SECTION 1: ACTIVE SESSIONS & DEVICES */}
              <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:quantix-card space-y-5 sm:space-y-6 shadow-xl min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-5 border-b border-white/[0.08] min-w-0">
                  <div className="min-w-0">
                    <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2.5">
                      <Laptop className="w-5 sm:w-6 h-5 sm:h-6 text-theme-primary shrink-0" />
                      <span className="truncate">إدارة الأجهزة والجلسات النشطة</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-[1.75] break-words">
                      مراقبة الأجهزة المسجلة حالياً وإمكانية طرد أقدم جهاز لمنع التزاحم
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
                    <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{activeSessionsCount} {activeSessionsCount === 1 ? 'جهاز نشط' : 'أجهزة نشطة'}</span>
                    </span>

                    <button
                      type="button"
                      onClick={fetchSessions}
                      disabled={loadingSessions}
                      title="تحديث قائمة الأجهزة"
                      className="h-11 w-11 min-h-[44px] min-w-[44px] rounded-xl bg-[#0B0C10] border border-white/[0.08] text-slate-400 hover:text-white hover:border-white/[0.08] transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center shrink-0"
                    >
                      <RefreshCw className={`w-4 h-4 ${loadingSessions ? 'animate-spin text-theme-primary' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Session Action Alert */}
                {sessionActionMessage && (
                  <div className={`p-4 rounded-2xl border text-xs sm:text-sm font-medium flex items-center gap-2.5 ${sessionActionMessage.type === 'success'
                    ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                    : 'bg-red-500/15 border-red-500/30 text-red-400'
                    }`}>
                    {sessionActionMessage.type === 'success' ? (
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 shrink-0" />
                    )}
                    <span>{sessionActionMessage.text}</span>
                  </div>
                )}

                {/* Terminate Newest / Master Control Card */}
                {isCallerMaster ? (
                  <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-w-0">
                    <div className="flex items-start gap-3.5 min-w-0 flex-1">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5">
                        <Crown className="w-5 h-5 text-amber-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs sm:text-sm font-bold text-amber-300 flex items-center gap-2 flex-wrap">
                          <span>أنت مسجل كجهاز رئيسي (Master Device) 👑</span>
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono border border-amber-500/30">
                            سلطة عليا
                          </span>
                        </h4>
                        <p className="text-xs sm:text-sm text-amber-400/90 mt-1.5 leading-[1.75] break-words">
                          بصفتك أقدم جهاز (أو مفوضاً بصلاحيات كاملة)، يمكنك طرد أحدث الأجهزة المسجلة فورياً، أو اختيار أي جهاز بالأسفل لطرده أو مساواته معك في الصلاحيات.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleTerminateNewest}
                      disabled={terminatingNewest || activeSessionsCount <= 1}
                      className={`min-h-[44px] px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all whitespace-nowrap cursor-pointer shrink-0 ${activeSessionsCount > 1
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                        : 'bg-[#14151B] text-slate-500 cursor-not-allowed border border-white/[0.08]'
                        }`}
                    >
                      <LogOut className="w-4 h-4 rtl-flip" />
                      <span>{terminatingNewest ? 'جاري الطرد...' : 'طرد أحدث جهاز مسجل'}</span>
                    </button>
                  </div>
                ) : (
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0B0C10] border border-white/[0.08] flex items-start gap-3 min-w-0">
                    <ShieldAlert className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-300 leading-snug">جلسة عادية تابعة (Standard Device) 💻</h4>
                      <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-[1.75] break-words">
                        هذا الجهاز لا يملك صلاحية طرد الأجهزة الرئيسية. الصلاحية مقتصرة حصرياً على أقدم جهاز متصل أو الأجهزة التي تم تفويضها.
                      </p>
                    </div>
                  </div>
                )}

                {/* Sessions Cards List */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-semibold text-slate-400">
                    الأجهزة المتصلة المسجلة في النظام ({sessions.length}):
                  </h4>

                  {sessions.length === 0 ? (
                    <div className="p-6 text-center rounded-2xl bg-[#0B0C10] border border-white/[0.08] text-slate-500 text-xs font-mono">
                      لا توجد أجهزة مسجلة حالياً أو جاري التحميل...
                    </div>
                  ) : (
                    sessions.map((sess) => {
                      const isMobile = /mobile|iphone|android|ipad/i.test(sess.deviceInfo || '');
                      const formattedTime = sess.createdAt ? new Date(sess.createdAt).toLocaleString('ar-EG', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : 'غير محدد';

                      return (
                        <div
                          key={sess.id}
                          className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 min-w-0 ${sess.isCurrent
                            ? 'bg-theme-primary/10 border-theme-primary/40 shadow-[0_0_15px_rgba(var(--theme-primary-rgb),0.1)]'
                            : sess.isPrimaryMaster
                              ? 'bg-amber-950/20 border-amber-500/40'
                              : sess.isMaster
                                ? 'bg-indigo-950/20 border-indigo-500/30'
                                : 'bg-[#0B0C10] border-white/[0.08]/80'
                            }`}
                        >
                          <div className="flex items-start sm:items-center gap-3 sm:gap-3.5 min-w-0 flex-1">
                            <div className={`w-10 sm:w-11 h-10 sm:h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 ${sess.isPrimaryMaster
                              ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                              : sess.isMaster
                                ? 'bg-theme-primary/15 text-theme-primary border border-theme-primary/30'
                                : 'bg-[#14151B] text-slate-400'
                              }`}>
                              {sess.isPrimaryMaster ? (
                                <Crown className="w-5 h-5 text-amber-400" />
                              ) : isMobile ? (
                                <Smartphone className="w-5 h-5" />
                              ) : (
                                <Monitor className="w-5 h-5" />
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs sm:text-sm font-bold text-white break-words">
                                  {sess.deviceInfo || 'متصفح غير معروف'}
                                </span>

                                {/* Role Badges */}
                                {sess.isPrimaryMaster ? (
                                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold font-mono flex items-center gap-1">
                                    <Crown className="w-3 h-3 text-amber-400" />
                                    الجهاز الرئيسي الأول (أقدم جهاز)
                                  </span>
                                ) : sess.isMaster ? (
                                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-bold font-mono flex items-center gap-1">
                                    <Shield className="w-3 h-3 text-indigo-400" />
                                    جهاز مفوض (صلاحيات كاملة)
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded-full bg-[#14151B] text-slate-400 border border-white/[0.08] text-xs font-mono">
                                    جهاز تابع
                                  </span>
                                )}

                                {sess.isCurrent && (
                                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold font-mono flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    هذا الجهاز (الجلسة الحالية)
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono text-slate-400 mt-1.5 flex-wrap">
                                <span>IP: <span className="text-slate-300">{sess.ipAddress || 'محلي'}</span></span>
                                <span>&bull;</span>
                                <span>وقت الدخول: <span className="text-slate-300">{formattedTime}</span></span>
                                <span>&bull;</span>
                                <span>المعرّف: <span className="text-slate-400">{sess.id.slice(-8)}</span></span>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons for Master Device */}
                          {isCallerMaster && (
                            <div className="flex items-center gap-2 flex-wrap shrink-0">
                              {/* Promote / Demote Button */}
                              {sess.canBePromoted && (
                                <button
                                  type="button"
                                  onClick={() => handleToggleMaster(sess.id, !sess.isMaster, sess.deviceInfo)}
                                  disabled={actionTargetId === sess.id}
                                  className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 ${sess.isMaster
                                    ? 'bg-[#14151B] hover:bg-slate-700 text-slate-300 border border-white/[0.08]'
                                    : 'bg-theme-primary/15 hover:bg-theme-primary/25 text-theme-primary border border-theme-primary/30'
                                    }`}
                                  title={sess.isMaster ? 'إلغاء الصلاحيات الكاملة' : 'مساواة هذا الجهاز في الصلاحيات مع الجهاز الرئيسي'}
                                >
                                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                                  <span>{sess.isMaster ? 'إلغاء الصلاحيات' : 'مساواة الصلاحيات (ترقية)'}</span>
                                </button>
                              )}

                              {/* Kick Subordinate Device */}
                              {sess.canBeTerminated && (
                                <button
                                  type="button"
                                  onClick={() => handleTerminateDevice(sess.id, sess.deviceInfo)}
                                  disabled={actionTargetId === sess.id}
                                  className="min-h-[40px] px-3.5 py-2 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/30 text-xs font-mono font-semibold transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
                                  title="طرد هذا الجهاز وإلغاء جلسته فورياً"
                                >
                                  <LogOut className="w-3.5 h-3.5 rtl-flip" />
                                  <span>طرد هذا الجهاز</span>
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* SECTION 2: USERNAME & PASSWORD SECURITY (LOCKED & HIDDEN FOR NON-MASTER) */}
              {!isCallerMaster ? (
                <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:quantix-card space-y-3 shadow-xl min-w-0">
                  <div className="flex items-start gap-3.5 sm:gap-4 min-w-0">
                    <div className="w-11 sm:w-12 h-11 sm:h-12 rounded-2xl bg-[#0B0C10] border border-white/[0.08] flex items-center justify-center text-slate-500 shrink-0 mt-0.5">
                      <Lock className="w-5 sm:w-6 h-5 sm:h-6 text-slate-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm sm:text-base font-bold text-white">تأكيد وتغيير بيانات الدخول (محجوب ومحمي)</h3>
                        <span className="px-2 py-0.5 rounded-full bg-[#14151B] text-slate-400 border border-white/[0.08] text-xs font-mono">
                          صلاحية مقيدة 🔒
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-[1.75] break-words">
                        تعديل اسم المستخدم وكلمة المرور محجوب ومقتصر حصرياً على <b>الجهاز الرئيسي الأول (أقدم جهاز)</b> أو الأجهزة التي تم تفويضها بمساواة الصلاحيات.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:quantix-card space-y-5 sm:space-y-6 shadow-xl min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]/80">
                    <div>
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <KeyRound className="w-5 h-5 text-theme-primary" />
                        <span>تأكيد اليوزر والباسورد (بيانات الدخول)</span>
                      </h2>
                      <p className="text-xs text-slate-400 font-mono mt-1">
                        تغيير وتأكيد اسم المستخدم وكلمة المرور الخاصة بلوحة التحكم
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[11px] font-bold font-mono flex items-center gap-1.5 self-start sm:self-center">
                      <Crown className="w-3.5 h-3.5 text-amber-400" />
                      متاح فقط للجهاز الرئيسي
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

                  <form onSubmit={handleSecurityUpdate} className="space-y-4 max-w-lg">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
                        اسم المستخدم (Username)
                      </label>
                      <input
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm font-mono outline-none focus:border-theme-primary"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
                        كلمة المرور الجديدة (New Password)
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="اتركها فارغة للاحتفاظ بكلمة المرور الحالية"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm font-mono outline-none focus:border-theme-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
                        تأكيد كلمة المرور الجديدة (Confirm Password)
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="أعد إدخال كلمة المرور للتأكيد"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm font-mono outline-none focus:border-theme-primary"
                      />
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
              )}
            </div>
          )}

          {/* TAB 7: INBOX */}
          {activeTab === 'inbox' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-white">صندوق الرسائل الواردة ({messages.length})</h2>
                <p className="text-xs text-slate-400 font-mono mt-0.5">رسائل العملاء الواردة من نموذج الاتصال</p>
              </div>

              {messages.length === 0 ? (
                <div className="p-12 text-center bg-[#08090C] rounded-2xl border border-white/[0.08] text-slate-500 text-xs font-mono">
                  لا توجد رسائل واردة حتى الآن.
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-5 rounded-2xl border transition-all ${msg.read ? 'bg-[#08090C] border-white/[0.08]/80' : 'bg-theme-primary/10 border-theme-primary/40 shadow-[0_0_15px_rgba(var(--theme-primary-rgb),0.1)]'
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
                        <p className="text-xs font-mono text-theme-primary font-semibold mb-2">الموضوع: {msg.subject}</p>
                      )}

                      <p className="text-slate-300 text-xs leading-relaxed bg-[#0B0C10] p-3.5 rounded-xl border border-white/[0.08]/80">
                        {msg.message}
                      </p>

                      <div className="flex items-center gap-4 mt-3 pt-2 border-t border-white/[0.08]/60">
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
                          onClick={() => deleteMessage(msg.id)}
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

          {/* TAB 8: BACKUP & RESTORE */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">النسخ الاحتياطي والاستعادة</h2>
                <p className="text-xs text-slate-400 font-mono mt-0.5">تصدير واستيراد بيانات البرتفوليو بملفات JSON</p>
              </div>

              <div className="p-6 quantix-card space-y-4">
                <h3 className="font-bold text-white text-sm">تصدير كامل بيانات البرتفوليو (JSON):</h3>
                <p className="text-xs text-slate-400">
                  تنزيل نسخة احتياطية من جميع المشاريع، الشهادات، المهارات، والبيانات الشخصية.
                </p>
                <button
                  onClick={exportData}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-theme-primary hover:bg-theme-primary text-white font-bold text-xs cursor-pointer shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>تصدير البيانات (Export JSON)</span>
                </button>
              </div>

              <div className="p-6 quantix-card space-y-4">
                <h3 className="font-bold text-white text-sm">استيراد بيانات من ملف JSON:</h3>
                <input
                  type="file"
                  accept=".json"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const content = event.target?.result as string;
                      if (content && importData(content)) {
                        alert('تم استيراد البيانات وتحديث البرتفوليو بنجاح!');
                      } else {
                        alert('الملف غير صالح أو تالف.');
                      }
                    };
                    reader.readAsText(file);
                  }}
                  className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#14151B] file:text-slate-200 hover:file:bg-slate-700"
                />
              </div>

              <div className="p-6 rounded-2xl bg-red-950/20 border border-red-900/40 space-y-3">
                <h3 className="font-bold text-red-400 text-sm">إعادة ضبط المصنع (Reset Defaults):</h3>
                <p className="text-xs text-slate-400">
                  استعادة المشاريع والشهادات والإعدادات الأولية الافتراضية.
                </p>
                <button
                  onClick={() => {
                    if (confirm('هل أنت متأكد من رغبتك في إعادة تعيين كافة البيانات إلى الإعدادات الأولية؟')) {
                      resetToDefault();
                      alert('تمت استعادة الإعدادات الأصلية بنجاح.');
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>إعادة ضبط المصنع</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* =========================================================================
          NAVBAR BRAND QUICK EDITOR MODAL (Directly edits Image 2 from Image 1)
          ========================================================================= */}
      {isBrandModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#08090C] border border-white/[0.08] rounded-2xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl text-start space-y-5 sm:space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsBrandModalOpen(false)}
              className="absolute top-3 sm:top-4 left-3 sm:left-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-[#0B0C10] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-theme-primary mb-1">
                <Pencil className="w-5 h-5 text-theme-primary" />
                <h3 className="text-xl font-bold text-white">تعديل هوية شريط التنقل (Navbar Brand)</h3>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                عدّل الصورة المصغرة، والاسم الكامل، والمسمى الوظيفي كما يظهر في أعلى الموقع للزوار.
              </p>
            </div>

            {/* Live Interactive Preview Box (Matching Image 2) */}
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
              {/* 1. Avatar Image */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-slate-300 font-bold">
                  صورة النافبار (Navbar Avatar Image):
                </label>

                {/* Upload Button + Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={brandForm.topAvatarUrl}
                    onChange={(e) => setBrandForm({ ...brandForm, topAvatarUrl: e.target.value })}
                    placeholder="/my.jpg أو رابط خارجي"
                    className="flex-1 px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-theme-primary text-xs font-mono focus:border-theme-primary outline-none"
                  />
                  <label className={`flex items-center gap-1.5 px-3 py-2 rounded-xl bg-theme-primary/10 hover:bg-theme-primary/20 border border-theme-primary/30 text-theme-primary text-xs font-bold cursor-pointer transition-all shrink-0 ${uploadingBrandAvatar ? 'opacity-60 pointer-events-none' : ''}`}>
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

                {/* Quick Presets */}
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
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-mono border transition-all ${brandForm.topAvatarUrl === preset.url
                        ? 'bg-theme-primary/20 border-theme-primary text-theme-primary'
                        : 'bg-[#0B0C10] border-white/[0.08] text-slate-400 hover:text-white'
                        }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Names (En & Ar) */}
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

              {/* 3. Titles (En & Ar) */}
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

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setIsBrandModalOpen(false)}
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
      )}
    </div>
  );
};

export default AdminPage;