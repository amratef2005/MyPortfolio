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
  EyeOff
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const {
    profile,
    projects,
    certificates,
    skills,
    messages,
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
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'certificates' | 'skills' | 'profile' | 'security' | 'inbox' | 'backup'>('overview');

  // Edit Project State
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);

  // Edit Certificate State
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [isNewCert, setIsNewCert] = useState(false);

  // Profile Form State
  const [profileForm, setProfileForm] = useState(profile);

  // Security Form State
  const [newUsername, setNewUsername] = useState(profile.adminUsername || 'admin');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [securitySuccess, setSecuritySuccess] = useState('');
  const [securityError, setSecurityError] = useState('');

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

    if (!newUsername.trim()) {
      setSecurityError('اسم المستخدم لا يمكن أن يكون فارغاً');
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setSecurityError('كلمة المرور وتأكيد كلمة المرور غير متطابقين');
      return;
    }

    const passwordToSet = newPassword.trim() ? newPassword : (profile.adminPassword || 'admin123');
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
      <div className="min-h-screen bg-[#07090e] flex flex-col justify-center items-center p-4 relative overflow-hidden font-cairo selection:bg-cyan-500/30 selection:text-cyan-200">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 backdrop-blur-xl rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative z-10 text-center">
          {/* Logo Badge */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5 mx-auto mb-5 shadow-[0_0_25px_rgba(56,189,248,0.35)]">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-cyan-400">
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
                  placeholder="admin"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-white text-sm outline-none font-mono transition-all text-left placeholder:text-slate-600"
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
                  className="w-full px-4 py-3 pr-10 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-white text-sm outline-none font-mono transition-all text-left placeholder:text-slate-600"
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
              className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Unlock className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>تأكيد تسجيل الدخول</span>
            </button>
          </form>

          {/* Quick Notice about default credentials */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">
            <p className="text-[11px] font-mono text-slate-500">
              البيانات الافتراضية لأول دخول: <span className="text-cyan-400 font-bold">admin</span> / <span className="text-cyan-400 font-bold">admin123</span>
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 font-mono mt-3 transition-colors"
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
  // 2. AUTHENTICATED: FULL-PAGE DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-[#06080d] text-slate-100 flex flex-col font-cairo selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Header */}
      <header className="px-6 py-4 bg-slate-950/90 border-b border-slate-800/80 sticky top-0 z-40 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5 shadow-[0_0_15px_rgba(56,189,248,0.3)] shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h1 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
              <span>لوحة التحكم في البورتفوليو</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                Live Admin
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              إدارة المشاريع، الشهادات، المهارات، والرسائل الواردة
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-semibold transition-all shadow-[0_0_12px_rgba(56,189,248,0.2)]"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">معاينة البورتفوليو الحقيقي</span>
            <span className="sm:hidden">البورتفوليو</span>
          </a>

          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-mono font-semibold transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>خروج</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-slate-950/70 border-b md:border-b-0 md:border-l border-slate-800 p-4 flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible shrink-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold w-full text-right transition-all shrink-0 md:shrink ${
              activeTab === 'overview' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            <span>نظرة عامة وإحصائيات</span>
          </button>

          <button
            onClick={() => { setActiveTab('projects'); setEditingProject(null); }}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold w-full text-right transition-all shrink-0 md:shrink ${
              activeTab === 'projects' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <FolderGit2 className="w-4 h-4 shrink-0" />
            <span>إدارة المشاريع ({projects.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('certificates'); setEditingCert(null); }}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold w-full text-right transition-all shrink-0 md:shrink ${
              activeTab === 'certificates' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Award className="w-4 h-4 shrink-0" />
            <span>إدارة الشهادات ({certificates.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold w-full text-right transition-all shrink-0 md:shrink ${
              activeTab === 'skills' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Cpu className="w-4 h-4 shrink-0" />
            <span>المهارات والتقنيات</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold w-full text-right transition-all shrink-0 md:shrink ${
              activeTab === 'profile' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <User className="w-4 h-4 shrink-0" />
            <span>البيانات الشخصية والصور</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold w-full text-right transition-all shrink-0 md:shrink ${
              activeTab === 'security' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <KeyRound className="w-4 h-4 shrink-0" />
            <span>تأكيد اليوزر والباسورد</span>
          </button>

          <button
            onClick={() => setActiveTab('inbox')}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold w-full text-right transition-all shrink-0 md:shrink ${
              activeTab === 'inbox' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 shrink-0" />
              <span>صندوق الوارد</span>
            </div>
            {messages.filter(m => !m.read).length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-cyan-500 text-black font-bold text-[10px]">
                {messages.filter(m => !m.read).length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold w-full text-right transition-all shrink-0 md:shrink ${
              activeTab === 'backup' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Download className="w-4 h-4 shrink-0" />
            <span>النسخ الاحتياطي والاستعادة</span>
          </button>
        </aside>

        {/* Content Body */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-6xl">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white">نظرة عامة على حالة البورتفوليو</h2>
                <p className="text-xs text-slate-400 font-mono mt-1">إحصائيات فورية وموجز المحتوى الحالي</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                  <span className="block text-3xl font-black text-cyan-400 font-mono">{projects.length}</span>
                  <span className="text-xs text-slate-400 mt-1 block">مشاريع رئيسية</span>
                </div>
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                  <span className="block text-3xl font-black text-indigo-400 font-mono">{certificates.length}</span>
                  <span className="text-xs text-slate-400 mt-1 block">شهادات واعتمادات</span>
                </div>
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                  <span className="block text-3xl font-black text-emerald-400 font-mono">
                    {skills.reduce((acc, cat) => acc + cat.skills.length, 0)}
                  </span>
                  <span className="text-xs text-slate-400 mt-1 block">مهارة برمجية</span>
                </div>
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                  <span className="block text-3xl font-black text-amber-400 font-mono">{messages.length}</span>
                  <span className="text-xs text-slate-400 mt-1 block">رسائل تواصل</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>دليل التحكم السريع:</span>
                </h3>
                <ul className="text-xs text-slate-300 leading-relaxed space-y-2 list-disc list-inside">
                  <li>البورتفوليو الرئيسي أصبح للعرض فقط ولا يحتوي على أي أزرار أو نوافذ إدارية.</li>
                  <li>هذه الصفحة منفصلة تماماً ومحمية باسم مستخدم وكلمة مرور.</li>
                  <li>جميع التعديلات التي تجريها هنا تنعكس فورياً ومحلياً على البورتفوليو.</li>
                  <li>يمكنك تغيير اسم المستخدم وكلمة المرور في أي وقت من تبويب <b>"تأكيد اليوزر والباسورد"</b>.</li>
                </ul>
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
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-bold shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>إضافة مشروع جديد</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {projects.map((p) => (
                      <div key={p.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
                        <div>
                          <span className="text-xs font-mono text-cyan-400 font-semibold">{p.badge}</span>
                          <h4 className="font-bold text-white text-base">{p.titleAr || p.title}</h4>
                          <p className="text-xs text-slate-400 font-mono mt-0.5">{p.taglineAr || p.tagline}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => { setEditingProject(p); setIsNewProject(false); }}
                            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors"
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
                <div className="space-y-5 bg-slate-950/80 p-6 rounded-3xl border border-slate-800">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
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
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">اسم المشروع (English)</label>
                      <input
                        type="text"
                        value={editingProject.title}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">الشعار المختصر (Tagline)</label>
                    <input
                      type="text"
                      value={editingProject.taglineAr}
                      onChange={(e) => setEditingProject({ ...editingProject, taglineAr: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">الوصف التفصيلي</label>
                    <textarea
                      rows={3}
                      value={editingProject.descriptionAr}
                      onChange={(e) => setEditingProject({ ...editingProject, descriptionAr: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">الشارة (Badge)</label>
                    <input
                      type="text"
                      value={editingProject.badge}
                      onChange={(e) => setEditingProject({ ...editingProject, badge: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm font-mono"
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
                      className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-xs shadow-lg flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>حفظ المشروع</span>
                    </button>
                    <button
                      onClick={() => setEditingProject(null)}
                      className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-400 text-xs"
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
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-bold"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة شهادة جديدة</span>
                </button>
              </div>

              {!editingCert ? (
                <div className="space-y-3">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
                      <div>
                        <span className="text-xs font-mono text-emerald-400 font-semibold">{cert.badge}</span>
                        <h4 className="font-bold text-white text-base">{cert.titleAr || cert.title}</h4>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">{cert.issuerAr} &bull; {cert.fileUrl}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => { setEditingCert(cert); setIsNewCert(false); }}
                          className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200"
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
                <div className="space-y-4 bg-slate-950/80 p-6 rounded-3xl border border-slate-800">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">اسم الشهادة (عربي)</label>
                      <input
                        type="text"
                        value={editingCert.titleAr}
                        onChange={(e) => setEditingCert({ ...editingCert, titleAr: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">الجهة المصدرة</label>
                      <input
                        type="text"
                        value={editingCert.issuerAr}
                        onChange={(e) => setEditingCert({ ...editingCert, issuerAr: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">رابط ملف الـ PDF (مثال: /iti.pdf أو رابط ويب)</label>
                    <input
                      type="text"
                      value={editingCert.fileUrl}
                      onChange={(e) => setEditingCert({ ...editingCert, fileUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm font-mono"
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
                      className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-xs"
                    >
                      حفظ الشهادة
                    </button>
                    <button
                      onClick={() => setEditingCert(null)}
                      className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-400 text-xs"
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
                  <div key={catIdx} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <h3 className="font-bold text-cyan-400 text-sm">{category.nameAr}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {category.skills.map((skill, sIdx) => (
                        <div key={sIdx} className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                          <span className="text-xs text-white font-medium">{skill.name}</span>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min={50}
                              max={100}
                              value={skill.level}
                              onChange={(e) => {
                                const newSkills = [...skills];
                                newSkills[catIdx].skills[sIdx].level = Number(e.target.value);
                                updateSkills(newSkills);
                              }}
                              className="w-16 px-2 py-1 rounded bg-slate-950 text-cyan-400 text-xs font-mono text-center border border-slate-800"
                            />
                            <span className="text-xs text-slate-500 font-mono">%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PROFILE & IMAGES */}
          {activeTab === 'profile' && (
            <div className="space-y-5 bg-slate-950/80 p-6 rounded-3xl border border-slate-800">
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
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">الاسم المختصر (عربي - للهيرو الرئيسي)</label>
                  <input
                    type="text"
                    value={profileForm.shortNameAr || 'عمرو عاطف'}
                    onChange={(e) => setProfileForm({ ...profileForm, shortNameAr: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">الاسم الكامل (English - Top & CV)</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">الاسم المختصر (English - Hero)</label>
                  <input
                    type="text"
                    value={profileForm.shortName || 'Amr Atef'}
                    onChange={(e) => setProfileForm({ ...profileForm, shortName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">المسمى الوظيفي (عربي)</label>
                  <input
                    type="text"
                    value={profileForm.titleAr}
                    onChange={(e) => setProfileForm({ ...profileForm, titleAr: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">البريد الإلكتروني</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">واتساب (WhatsApp)</label>
                  <input
                    type="text"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">الموقع الجغرافي (English)</label>
                  <input
                    type="text"
                    value={profileForm.location}
                    onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">الموقع الجغرافي (عربي)</label>
                  <input
                    type="text"
                    value={profileForm.locationAr}
                    onChange={(e) => setProfileForm({ ...profileForm, locationAr: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                  />
                </div>
              </div>

              {/* Top Image URL Setting */}
              <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-800/40 space-y-2">
                <label className="block text-xs font-mono text-cyan-300 font-bold">
                  مسار / رابط الصورة العلوية (Navbar Image):
                </label>
                <input
                  type="text"
                  value={profileForm.topAvatarUrl || '/my.jpg'}
                  onChange={(e) => setProfileForm({ ...profileForm, topAvatarUrl: e.target.value })}
                  placeholder="/my.jpg أو رابط خارجي"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 text-sm font-mono"
                />
                <p className="text-[11px] text-slate-400">
                  ملاحظة: الصورة الشفافة ثلاثية الأبعاد التفاعلية في قسم الـ Hero تظل ثابتة ومحمية من التغيير كما هي في مكانها.
                </p>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">النبذة التعريفية (Bio)</label>
                <textarea
                  rows={3}
                  value={profileForm.bioAr}
                  onChange={(e) => setProfileForm({ ...profileForm, bioAr: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                />
              </div>

              <button
                onClick={() => {
                  updateProfile(profileForm);
                  alert('تم حفظ البيانات الشخصية بنجاح!');
                }}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-xs flex items-center gap-2 shadow-lg"
              >
                <Save className="w-4 h-4" />
                <span>تحديث البيانات الشخصية</span>
              </button>
            </div>
          )}

          {/* TAB 6: SECURITY & PASSWORD CONFIRMATION */}
          {activeTab === 'security' && (
            <div className="space-y-6 max-w-xl bg-slate-950/80 p-6 rounded-3xl border border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-cyan-400" />
                  <span>تأكيد اليوزر والباسورد (بيانات الدخول)</span>
                </h2>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  تغيير وتأكيد اسم المستخدم وكلمة المرور الخاصة بلوحة التحكم
                </p>
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

              <form onSubmit={handleSecurityUpdate} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
                    اسم المستخدم (Username)
                  </label>
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm font-mono outline-none focus:border-cyan-500"
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
                    placeholder="اتركها فارغة إن لم ترغب في التغيير"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm font-mono outline-none focus:border-cyan-500"
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
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm font-mono outline-none focus:border-cyan-500"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ وتأكيد بيانات الدخول</span>
                </button>
              </form>
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
                <div className="p-12 text-center bg-slate-950 rounded-2xl border border-slate-800 text-slate-500 text-xs font-mono">
                  لا توجد رسائل واردة حتى الآن.
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        msg.read ? 'bg-slate-950/60 border-slate-800/80' : 'bg-cyan-950/20 border-cyan-500/40 shadow-[0_0_15px_rgba(56,189,248,0.1)]'
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
                        <p className="text-xs font-mono text-cyan-400 font-semibold mb-2">الموضوع: {msg.subject}</p>
                      )}
                      
                      <p className="text-slate-300 text-xs leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
                        {msg.message}
                      </p>

                      <div className="flex items-center gap-4 mt-3 pt-2 border-t border-slate-800/60">
                        <a
                          href={`mailto:${msg.email}?subject=رد: ${encodeURIComponent(msg.subject || 'تواصل')}`}
                          className="text-xs text-cyan-400 hover:underline font-mono"
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

              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <h3 className="font-bold text-white text-sm">تصدير كامل بيانات البرتفوليو (JSON):</h3>
                <p className="text-xs text-slate-400">
                  تنزيل نسخة احتياطية من جميع المشاريع، الشهادات، المهارات، والبيانات الشخصية.
                </p>
                <button
                  onClick={exportData}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs cursor-pointer shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>تصدير البيانات (Export JSON)</span>
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
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
                  className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700"
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
    </div>
  );
};

export default AdminPage;