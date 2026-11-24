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
  Sparkles,
  RefreshCw
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    profile,
    projects,
    certificates,
    skills,
    messages,
    lang,
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
  const [activeTab, setActiveTab] = useState<
    'overview' | 'images' | 'names' | 'profile' | 'projects' | 'certificates' | 'skills' | 'inbox' | 'backup'
  >('images');

  // Edit Project State
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);

  // Edit Certificate State
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [isNewCert, setIsNewCert] = useState(false);

  // Profile Form State
  const [profileForm, setProfileForm] = useState<ProfileInfo>(profile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Keep form in sync when profile changes externally
  useEffect(() => {
    setProfileForm(profile);
  }, [profile]);

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
          updateProfile(updated);
          showSaveNotification();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const showSaveNotification = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleSaveProfile = () => {
    updateProfile(profileForm);
    showSaveNotification();
  };

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
        <div className="relative w-full max-w-md bg-[#0e0e12] border border-orange-500/30 rounded-3xl p-8 shadow-2xl text-center">
          <button
            onClick={() => setIsAdminOpen(false)}
            className="absolute top-5 left-5 p-2 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mx-auto mb-4 text-[#FF5722] shadow-[0_0_20px_rgba(255,87,34,0.3)]">
            <Lock className="w-8 h-8" />
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">لوحة التحكم في البرتفوليو</h3>
          <p className="text-slate-400 text-xs font-mono mb-6">
            أدخل كلمة المرور أو رمز الـ PIN للمتابعة
          </p>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <input
              type="password"
              value={pinInput}
              onChange={(e) => {
                setPinInput(e.target.value);
                setPinError(false);
              }}
              placeholder="••••••••"
              className="w-full text-center text-xl tracking-[0.2em] py-3 rounded-xl bg-[#15151c] border border-white/10 focus:border-[#FF5722] text-white outline-none font-mono"
            />

            {pinError && (
              <p className="text-red-400 text-xs font-mono">كلمة المرور غير صحيحة، يرجى المحاولة مجدداً.</p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF5722] to-[#FF7A00] text-white font-bold text-sm shadow-[0_0_20px_rgba(255,87,34,0.4)] transition-all flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>دخول لوحة التحكم</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Authenticated Dashboard
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-lg overflow-hidden">
      <div className="relative w-full max-w-6xl h-[92vh] bg-[#0c0d10] border border-orange-500/25 rounded-3xl flex flex-col shadow-2xl overflow-hidden">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#08080a] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF5722] to-[#FF7A00] flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,87,34,0.4)]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">لوحة التحكم المركزية (Admin Portfolio CMS)</h3>
              <p className="text-xs text-slate-400 font-mono">التحكم في الصور الشخصية والأسماء والعناوين والمشاريع</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {savedSuccess && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold animate-fadeIn">
                <Check className="w-3.5 h-3.5" />
                تم الحفظ والتحديث بنجاح!
              </span>
            )}
            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-mono"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>تسجيل الخروج</span>
            </button>
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Body with Sidebar */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Sidebar Tabs */}
          <div className="w-full md:w-64 bg-[#08080a] border-b md:border-b-0 md:border-l border-white/10 p-3 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible">
            
            {/* Tab: Images Manager (صورة 1 وصورة 2) */}
            <button
              onClick={() => setActiveTab('images')}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold w-full text-right transition-all shrink-0 md:shrink ${
                activeTab === 'images' ? 'bg-orange-500/15 text-[#FF7A00] border border-orange-500/30 shadow-[0_0_15px_rgba(255,87,34,0.15)]' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-[#FF5722]" />
              <span>التحكم في الصور (صورة 1 و 2)</span>
            </button>

            {/* Tab: Names & Headings (تعديل الأسماء والعناوين) */}
            <button
              onClick={() => setActiveTab('names')}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold w-full text-right transition-all shrink-0 md:shrink ${
                activeTab === 'names' ? 'bg-orange-500/15 text-[#FF7A00] border border-orange-500/30 shadow-[0_0_15px_rgba(255,87,34,0.15)]' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Type className="w-4 h-4 text-[#FF7A00]" />
              <span>تعديل الأسماء والعناوين</span>
            </button>

            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold w-full text-right transition-all shrink-0 md:shrink ${
                activeTab === 'overview' ? 'bg-orange-500/15 text-[#FF7A00] border border-orange-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>نظرة عامة وإحصائيات</span>
            </button>

            <button
              onClick={() => { setActiveTab('projects'); setEditingProject(null); }}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold w-full text-right transition-all shrink-0 md:shrink ${
                activeTab === 'projects' ? 'bg-orange-500/15 text-[#FF7A00] border border-orange-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FolderGit2 className="w-4 h-4" />
              <span>إدارة المشاريع ({projects.length})</span>
            </button>

            <button
              onClick={() => { setActiveTab('certificates'); setEditingCert(null); }}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold w-full text-right transition-all shrink-0 md:shrink ${
                activeTab === 'certificates' ? 'bg-orange-500/15 text-[#FF7A00] border border-orange-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>إدارة الشهادات ({certificates.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('skills')}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold w-full text-right transition-all shrink-0 md:shrink ${
                activeTab === 'skills' ? 'bg-orange-500/15 text-[#FF7A00] border border-orange-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>إدارة المهارات والنسب</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold w-full text-right transition-all shrink-0 md:shrink ${
                activeTab === 'profile' ? 'bg-orange-500/15 text-[#FF7A00] border border-orange-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <User className="w-4 h-4" />
              <span>البيانات الشخصية والنبذة</span>
            </button>

            <button
              onClick={() => setActiveTab('inbox')}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold w-full text-right transition-all shrink-0 md:shrink ${
                activeTab === 'inbox' ? 'bg-orange-500/15 text-[#FF7A00] border border-orange-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>رسائل الزوار ({messages.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('backup')}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold w-full text-right transition-all shrink-0 md:shrink ${
                activeTab === 'backup' ? 'bg-orange-500/15 text-[#FF7A00] border border-orange-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>النسخ الاحتياطي وإعادة الضبط</span>
            </button>
          </div>

          {/* Tab Content Panel */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto text-start">
            
            {/* ========================================================= */}
            {/* TAB: DUAL IMAGE MANAGER (صورة 1 في الرئيسية وصورة 2 في About) */}
            {/* ========================================================= */}
            {activeTab === 'images' && (
              <div className="space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-[#FF7A00] text-xs font-mono mb-2">
                    <ImageIcon className="w-3.5 h-3.5 text-[#FF5722]" />
                    <span>التحكم في صور الموقع بالتوهج الدائري</span>
                  </div>
                  <h4 className="text-2xl font-black text-white">التحكم المستقل في صورة 1 (الرئيسية) وصورة 2 (نبذة عني)</h4>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    يمكنك رفع صورة جديدة من جهازك مباشرة، أو إدخال مسار أو رابط للصورة، وسيتم تطبيق الهالة الدائرية البرتقالية عليها فوراً.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  
                  {/* CARD 1: Hero Image (صورة الصفحة الأساسية) */}
                  <div className="p-6 rounded-3xl bg-[#121215] border border-orange-500/30 flex flex-col justify-between space-y-5 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 rounded-full bg-orange-500/10 text-[#FF5722] text-xs font-mono font-bold">
                          صورة 1: الصفحة الأساسية (Hero)
                        </span>
                        <span className="text-xs text-slate-400 font-mono">قسم الترحيب</span>
                      </div>

                      {/* Image Preview with Circular Orange Glow */}
                      <div className="relative w-full h-56 rounded-2xl bg-[#08080a] border border-white/5 flex items-center justify-center overflow-hidden mb-5">
                        {/* Orange Aura */}
                        <div 
                          className="absolute w-36 h-36 rounded-full blur-2xl"
                          style={{ background: 'radial-gradient(circle, rgba(255,87,34,0.7) 0%, transparent 70%)' }}
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
                          className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-gradient-to-r file:from-[#FF5722] file:to-[#FF7A00] file:text-white hover:file:opacity-90 cursor-pointer"
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
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#18181f] border border-white/10 text-white text-xs font-mono outline-none focus:border-[#FF5722]"
                          />
                        </div>

                        {/* Quick Presets */}
                        <div className="flex flex-wrap gap-2 pt-1">
                          <span className="text-[11px] text-slate-400 font-mono self-center">صور جاهزة:</span>
                          <button
                            type="button"
                            onClick={() => setProfileForm({ ...profileForm, heroAvatarUrl: '/drama_hero.png' })}
                            className="px-2.5 py-1 rounded-lg bg-[#18181f] hover:bg-orange-500/20 text-[11px] text-slate-300 border border-white/5"
                          >
                            drama_hero.png
                          </button>
                          <button
                            type="button"
                            onClick={() => setProfileForm({ ...profileForm, heroAvatarUrl: '/my_transparent.png' })}
                            className="px-2.5 py-1 rounded-lg bg-[#18181f] hover:bg-orange-500/20 text-[11px] text-slate-300 border border-white/5"
                          >
                            my_transparent.png
                          </button>
                          <button
                            type="button"
                            onClick={() => setProfileForm({ ...profileForm, heroAvatarUrl: '/my.jpg' })}
                            className="px-2.5 py-1 rounded-lg bg-[#18181f] hover:bg-orange-500/20 text-[11px] text-slate-300 border border-white/5"
                          >
                            my.jpg
                          </button>
                        </div>

                        {/* Sliders for Hero Image */}
                        <div className="space-y-2 pt-3 border-t border-white/5">
                          <div className="flex justify-between text-[11px] font-mono">
                            <span className="text-slate-400">التكبير (Scale/Zoom):</span>
                            <span className="text-[#FF7A00] font-bold">{Math.round((profileForm.heroImageScale ?? 1) * 100)}%</span>
                          </div>
                          <input
                            type="range"
                            min="0.7"
                            max="1.4"
                            step="0.02"
                            value={profileForm.heroImageScale ?? 1}
                            onChange={(e) => setProfileForm({ ...profileForm, heroImageScale: parseFloat(e.target.value) })}
                            className="w-full accent-[#FF5722] cursor-pointer"
                          />

                          <div className="flex justify-between text-[11px] font-mono">
                            <span className="text-slate-400">الموضع الرأسي (Offset Y):</span>
                            <span className="text-[#FF7A00] font-bold">{profileForm.heroImageOffsetY ?? 0}px</span>
                          </div>
                          <input
                            type="range"
                            min="-60"
                            max="60"
                            step="1"
                            value={profileForm.heroImageOffsetY ?? 0}
                            onChange={(e) => setProfileForm({ ...profileForm, heroImageOffsetY: parseInt(e.target.value, 10) })}
                            className="w-full accent-[#FF5722] cursor-pointer"
                          />

                          <div className="flex justify-between text-[11px] font-mono">
                            <span className="text-slate-400">شدة الهالة (Glow):</span>
                            <span className="text-[#FF7A00] font-bold">{Math.round((profileForm.heroGlowIntensity ?? 1) * 100)}%</span>
                          </div>
                          <input
                            type="range"
                            min="0.4"
                            max="1.8"
                            step="0.05"
                            value={profileForm.heroGlowIntensity ?? 1}
                            onChange={(e) => setProfileForm({ ...profileForm, heroGlowIntensity: parseFloat(e.target.value) })}
                            className="w-full accent-[#FF5722] cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CARD 2: About Image (صورة الصفحة الثانية) */}
                  <div className="p-6 rounded-3xl bg-[#121215] border border-orange-500/30 flex flex-col justify-between space-y-5 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 rounded-full bg-orange-500/10 text-[#FF7A00] text-xs font-mono font-bold">
                          صورة 2: الصفحة الثانية (About)
                        </span>
                        <span className="text-xs text-slate-400 font-mono">قسم نبذة عني</span>
                      </div>

                      {/* Image Preview with Circular Orange Glow */}
                      <div className="relative w-full h-56 rounded-2xl bg-[#08080a] border border-white/5 flex items-center justify-center overflow-hidden mb-5">
                        {/* Orange Aura */}
                        <div 
                          className="absolute w-36 h-36 rounded-full blur-2xl"
                          style={{ background: 'radial-gradient(circle, rgba(255,122,0,0.7) 0%, transparent 70%)' }}
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
                          className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-gradient-to-r file:from-[#FF7A00] file:to-[#FFA726] file:text-white hover:file:opacity-90 cursor-pointer"
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
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#18181f] border border-white/10 text-white text-xs font-mono outline-none focus:border-[#FF5722]"
                          />
                        </div>

                        {/* Quick Presets */}
                        <div className="flex flex-wrap gap-2 pt-1">
                          <span className="text-[11px] text-slate-400 font-mono self-center">صور جاهزة:</span>
                          <button
                            type="button"
                            onClick={() => setProfileForm({ ...profileForm, aboutAvatarUrl: '/about_avatar.png' })}
                            className="px-2.5 py-1 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 text-[11px] text-[#FF7A00] font-bold border border-orange-500/30"
                          >
                            about_avatar.png (الجانبية المفرغة)
                          </button>
                          <button
                            type="button"
                            onClick={() => setProfileForm({ ...profileForm, aboutAvatarUrl: '/my_transparent.png' })}
                            className="px-2.5 py-1 rounded-lg bg-[#18181f] hover:bg-orange-500/20 text-[11px] text-slate-300 border border-white/5"
                          >
                            my_transparent.png
                          </button>
                          <button
                            type="button"
                            onClick={() => setProfileForm({ ...profileForm, aboutAvatarUrl: '/drama_hero.png' })}
                            className="px-2.5 py-1 rounded-lg bg-[#18181f] hover:bg-orange-500/20 text-[11px] text-slate-300 border border-white/5"
                          >
                            drama_hero.png
                          </button>
                          <button
                            type="button"
                            onClick={() => setProfileForm({ ...profileForm, aboutAvatarUrl: '/my.jpg' })}
                            className="px-2.5 py-1 rounded-lg bg-[#18181f] hover:bg-orange-500/20 text-[11px] text-slate-300 border border-white/5"
                          >
                            my.jpg
                          </button>
                        </div>

                        {/* Sliders for About Image */}
                        <div className="space-y-2 pt-3 border-t border-white/5">
                          <div className="flex justify-between text-[11px] font-mono">
                            <span className="text-slate-400">التكبير (Scale/Zoom):</span>
                            <span className="text-[#FF7A00] font-bold">{Math.round((profileForm.aboutImageScale ?? 1) * 100)}%</span>
                          </div>
                          <input
                            type="range"
                            min="0.7"
                            max="1.4"
                            step="0.02"
                            value={profileForm.aboutImageScale ?? 1}
                            onChange={(e) => setProfileForm({ ...profileForm, aboutImageScale: parseFloat(e.target.value) })}
                            className="w-full accent-[#FF5722] cursor-pointer"
                          />

                          <div className="flex justify-between text-[11px] font-mono">
                            <span className="text-slate-400">الموضع الرأسي (Offset Y):</span>
                            <span className="text-[#FF7A00] font-bold">{profileForm.aboutImageOffsetY ?? 0}px</span>
                          </div>
                          <input
                            type="range"
                            min="-60"
                            max="60"
                            step="1"
                            value={profileForm.aboutImageOffsetY ?? 0}
                            onChange={(e) => setProfileForm({ ...profileForm, aboutImageOffsetY: parseInt(e.target.value, 10) })}
                            className="w-full accent-[#FF5722] cursor-pointer"
                          />

                          <div className="flex justify-between text-[11px] font-mono">
                            <span className="text-slate-400">شدة الهالة (Glow):</span>
                            <span className="text-[#FF7A00] font-bold">{Math.round((profileForm.aboutGlowIntensity ?? 1) * 100)}%</span>
                          </div>
                          <input
                            type="range"
                            min="0.4"
                            max="1.8"
                            step="0.05"
                            value={profileForm.aboutGlowIntensity ?? 1}
                            onChange={(e) => setProfileForm({ ...profileForm, aboutGlowIntensity: parseFloat(e.target.value) })}
                            className="w-full accent-[#FF5722] cursor-pointer"
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
                    className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-[#FF5722] to-[#FF7A00] text-white font-bold text-sm shadow-[0_0_25px_rgba(255,87,34,0.4)] hover:shadow-[0_0_35px_rgba(255,87,34,0.6)] active:scale-95 transition-all"
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
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-[#FF7A00] text-xs font-mono mb-2">
                    <Type className="w-3.5 h-3.5 text-[#FF5722]" />
                    <span>تخصيص كامل للنصوص والأسماء</span>
                  </div>
                  <h4 className="text-2xl font-black text-white">تعديل كل اسم وعنوان في البرتفوليو</h4>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    يمكنك تعديل اسم الشعار في الشريط العلوي، أسماء وألقاب قسم الترحيب، العناوين الفرعية للشغف، وعناوين الأقسام السبعة.
                  </p>
                </div>

                {/* Section 1: Logo & Brand Name */}
                <div className="p-6 rounded-3xl bg-[#121215] border border-white/10 space-y-4">
                  <h5 className="font-bold text-white text-base flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#FF5722]" />
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
                        className="w-full px-4 py-2.5 rounded-xl bg-[#18181f] border border-white/10 text-white text-sm outline-none focus:border-[#FF5722]"
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
                        className="w-full px-4 py-2.5 rounded-xl bg-[#18181f] border border-white/10 text-white text-sm outline-none focus:border-[#FF5722]"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Home / Hero Section Names & Titles */}
                <div className="p-6 rounded-3xl bg-[#121215] border border-white/10 space-y-4">
                  <h5 className="font-bold text-white text-base flex items-center gap-2">
                    <User className="w-4 h-4 text-[#FF7A00]" />
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
                        className="w-full px-4 py-2.5 rounded-xl bg-[#18181f] border border-white/10 text-white text-sm outline-none focus:border-[#FF5722]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">كلمة الترحيب (عربي)</label>
                      <input
                        type="text"
                        value={profileForm.heroGreetingAr || ''}
                        onChange={(e) => setProfileForm({ ...profileForm, heroGreetingAr: e.target.value })}
                        placeholder="مرحباً، أنا"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#18181f] border border-white/10 text-white text-sm outline-none focus:border-[#FF5722]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">الاسم الكامل في الهيرو (English)</label>
                      <input
                        type="text"
                        value={profileForm.name || ''}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        placeholder="Amr Kandel"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#18181f] border border-white/10 text-white text-sm outline-none focus:border-[#FF5722]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">الاسم الكامل في الهيرو (عربي)</label>
                      <input
                        type="text"
                        value={profileForm.nameAr || ''}
                        onChange={(e) => setProfileForm({ ...profileForm, nameAr: e.target.value })}
                        placeholder="عمرو قنديل"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#18181f] border border-white/10 text-white text-sm outline-none focus:border-[#FF5722]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">المسمى الوظيفي بالبرتقالي (English)</label>
                      <input
                        type="text"
                        value={profileForm.title || ''}
                        onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                        placeholder="UI/UX Designer & .NET Developer"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#18181f] border border-white/10 text-white text-sm outline-none focus:border-[#FF5722]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">المسمى الوظيفي بالبرتقالي (عربي)</label>
                      <input
                        type="text"
                        value={profileForm.titleAr || ''}
                        onChange={(e) => setProfileForm({ ...profileForm, titleAr: e.target.value })}
                        placeholder="مطور نظم خلفية ومصمم واجهات"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#18181f] border border-white/10 text-white text-sm outline-none focus:border-[#FF5722]"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: About Section Headings */}
                <div className="p-6 rounded-3xl bg-[#121215] border border-white/10 space-y-4">
                  <h5 className="font-bold text-white text-base flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#FF5722]" />
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
                        className="w-full px-4 py-2.5 rounded-xl bg-[#18181f] border border-white/10 text-white text-sm outline-none focus:border-[#FF5722]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">العنوان الفرعي (عربي)</label>
                      <input
                        type="text"
                        value={profileForm.aboutSubtitleAr || ''}
                        onChange={(e) => setProfileForm({ ...profileForm, aboutSubtitleAr: e.target.value })}
                        placeholder="التصميم هو شغفي وهويتي"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#18181f] border border-white/10 text-white text-sm outline-none focus:border-[#FF5722]"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 4: Metrics & Stats */}
                <div className="p-6 rounded-3xl bg-[#121215] border border-white/10 space-y-4">
                  <h5 className="font-bold text-white text-base flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#FF7A00]" />
                    <span>4. الأرقام البارزة وسنوات الخبرة</span>
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">سنوات الخبرة (رقم كبير بالبرتقالي)</label>
                      <input
                        type="number"
                        min={1}
                        max={30}
                        value={profileForm.yearsOfExperience || 3}
                        onChange={(e) => setProfileForm({ ...profileForm, yearsOfExperience: Number(e.target.value) })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#18181f] border border-white/10 text-[#FF5722] font-mono font-bold text-base outline-none focus:border-[#FF5722]"
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
                        className="w-full px-4 py-2.5 rounded-xl bg-[#18181f] border border-white/10 text-[#FF7A00] font-mono font-bold text-base outline-none focus:border-[#FF5722]"
                      />
                    </div>
                  </div>
                </div>

                {/* Save All Names Button */}
                <div className="flex justify-end pt-4 border-t border-white/10">
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-[#FF5722] to-[#FF7A00] text-white font-bold text-sm shadow-[0_0_25px_rgba(255,87,34,0.4)] hover:shadow-[0_0_35px_rgba(255,87,34,0.6)] active:scale-95 transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>حفظ جميع الأسماء والعناوين</span>
                  </button>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB: OVERVIEW */}
            {/* ========================================================= */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white mb-2">إحصائيات البرتفوليو العامة</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-[#121215] border border-white/5">
                    <span className="text-xs font-mono text-slate-400 block mb-1">إجمالي المشاريع</span>
                    <span className="text-3xl font-black text-[#FF5722]">{projects.length}</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#121215] border border-white/5">
                    <span className="text-xs font-mono text-slate-400 block mb-1">الشهادات المعتمدة</span>
                    <span className="text-3xl font-black text-[#FF7A00]">{certificates.length}</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#121215] border border-white/5">
                    <span className="text-xs font-mono text-slate-400 block mb-1">سنوات الخبرة</span>
                    <span className="text-3xl font-black text-white">+{profile.yearsOfExperience}</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#121215] border border-white/5">
                    <span className="text-xs font-mono text-slate-400 block mb-1">رسائل التواصل</span>
                    <span className="text-3xl font-black text-emerald-400">{messages.length}</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#121215] border border-white/5 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-white text-base">معاينة الموقع المباشر</h5>
                    <p className="text-xs text-slate-400 mt-1">يمكنك إغلاق لوحة التحكم لمشاهدة التعديلات فورياً على الواجهة.</p>
                  </div>
                  <button
                    onClick={() => setIsAdminOpen(false)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-[#FF7A00] text-xs font-bold"
                  >
                    <Eye className="w-4 h-4" />
                    <span>إغلاق ومعاينة الموقع</span>
                  </button>
                </div>
              </div>
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
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#FF5722] to-[#FF7A00] text-white text-xs font-bold shadow-[0_0_15px_rgba(255,87,34,0.3)]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إضافة مشروع جديد</span>
                  </button>
                </div>

                {!editingProject ? (
                  <div className="space-y-3">
                    {projects.map((proj) => (
                      <div key={proj.id} className="p-4 rounded-2xl bg-[#121215] border border-white/5 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-mono text-[#FF7A00] font-semibold">{proj.category}</span>
                          <h5 className="font-bold text-white text-base">{proj.titleAr || proj.title}</h5>
                          <p className="text-xs text-slate-400 font-mono mt-0.5">{proj.taglineAr || proj.tagline}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => { setEditingProject(proj); setIsNewProject(false); }}
                            className="px-3 py-1.5 rounded-lg bg-[#18181f] hover:bg-[#22222b] text-xs text-slate-200"
                          >
                            تعديل
                          </button>
                          <button
                            onClick={() => { if (confirm('هل أنت متأكد من حذف هذا المشروع؟')) deleteProject(proj.id); }}
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
                          className="w-full px-3 py-2 rounded-xl bg-[#18181f] border border-white/10 text-white text-sm outline-none focus:border-[#FF5722]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">عنوان المشروع (English)</label>
                        <input
                          type="text"
                          value={editingProject.title}
                          onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#18181f] border border-white/10 text-white text-sm outline-none focus:border-[#FF5722]"
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
                        className="w-full px-3 py-2 rounded-xl bg-[#18181f] border border-white/10 text-white text-sm outline-none focus:border-[#FF5722]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">الوصف (عربي)</label>
                      <textarea
                        rows={3}
                        value={editingProject.descriptionAr}
                        onChange={(e) => setEditingProject({ ...editingProject, descriptionAr: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#18181f] border border-white/10 text-white text-sm outline-none focus:border-[#FF5722]"
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
                          showSaveNotification();
                        }}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5722] to-[#FF7A00] text-white font-bold text-xs shadow-lg flex items-center gap-2"
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
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#FF5722] to-[#FF7A00] text-white text-xs font-bold shadow-[0_0_15px_rgba(255,87,34,0.3)]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إضافة شهادة جديدة</span>
                  </button>
                </div>

                {!editingCert ? (
                  <div className="space-y-3">
                    {certificates.map((cert) => (
                      <div key={cert.id} className="p-4 rounded-2xl bg-[#121215] border border-white/5 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-mono text-[#FF7A00] font-semibold">{cert.badge}</span>
                          <h5 className="font-bold text-white text-base">{cert.titleAr || cert.title}</h5>
                          <p className="text-xs text-slate-400 font-mono mt-0.5">{cert.issuerAr} &bull; {cert.fileUrl}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => { setEditingCert(cert); setIsNewCert(false); }}
                            className="px-3 py-1.5 rounded-lg bg-[#18181f] hover:bg-[#22222b] text-xs text-slate-200"
                          >
                            تعديل
                          </button>
                          <button
                            onClick={() => { if (confirm('هل أنت متأكد من حذف هذه الشهادة؟')) deleteCertificate(cert.id); }}
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
                          className="w-full px-3 py-2 rounded-xl bg-[#18181f] border border-white/10 text-white text-sm outline-none focus:border-[#FF5722]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">الجهة المصدرة</label>
                        <input
                          type="text"
                          value={editingCert.issuerAr}
                          onChange={(e) => setEditingCert({ ...editingCert, issuerAr: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#18181f] border border-white/10 text-white text-sm outline-none focus:border-[#FF5722]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">رابط الملف (مثال: /iti.pdf أو رابط خارجي)</label>
                      <input
                        type="text"
                        value={editingCert.fileUrl}
                        onChange={(e) => setEditingCert({ ...editingCert, fileUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#18181f] border border-white/10 text-white text-sm font-mono outline-none focus:border-[#FF5722]"
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
                          showSaveNotification();
                        }}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5722] to-[#FF7A00] text-white font-bold text-xs"
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
                  {skills.map((category, catIdx) => (
                    <div key={catIdx} className="p-4 rounded-2xl bg-[#121215] border border-white/5 space-y-3">
                      <h5 className="font-bold text-[#FF7A00] text-sm">{category.nameAr}</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {category.skills.map((skill, sIdx) => (
                          <div key={sIdx} className="flex items-center justify-between p-2.5 rounded-xl bg-[#18181f] border border-white/5">
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
                                className="w-14 px-2 py-1 rounded bg-[#08080a] text-[#FF5722] text-xs font-mono text-center border border-white/10 font-bold"
                              />
                              <span className="text-xs text-slate-500">%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
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
                      className="w-full px-3 py-2 rounded-xl bg-[#18181f] border border-white/10 text-white text-sm font-mono outline-none focus:border-[#FF5722]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">واتساب (WhatsApp)</label>
                    <input
                      type="text"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      placeholder="amratefkandel"
                      className="w-full px-3 py-2 rounded-xl bg-[#18181f] border border-white/10 text-white text-sm font-mono outline-none focus:border-[#FF5722]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">رابط لينكد إن (LinkedIn)</label>
                    <input
                      type="text"
                      value={profileForm.linkedin || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#18181f] border border-white/10 text-white text-sm font-mono outline-none focus:border-[#FF5722]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">رابط جيت هاب (GitHub)</label>
                    <input
                      type="text"
                      value={profileForm.github || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#18181f] border border-white/10 text-white text-sm font-mono outline-none focus:border-[#FF5722]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">النبذة التعريفية (Bio)</label>
                  <textarea
                    rows={4}
                    value={profileForm.bioAr}
                    onChange={(e) => setProfileForm({ ...profileForm, bioAr: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#18181f] border border-white/10 text-white text-sm outline-none focus:border-[#FF5722]"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-orange-950/20 border border-orange-800/40">
                  <label className="block text-xs font-mono text-[#FF7A00] font-bold mb-1">
                    رمز الـ PIN للدخول إلى لوحة التحكم
                  </label>
                  <input
                    type="text"
                    maxLength={8}
                    value={profileForm.adminPin}
                    onChange={(e) => setProfileForm({ ...profileForm, adminPin: e.target.value })}
                    className="w-48 px-3 py-2 rounded-xl bg-[#08080a] border border-white/10 text-[#FF5722] text-sm font-mono font-bold"
                  />
                </div>

                <button
                  onClick={handleSaveProfile}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5722] to-[#FF7A00] text-white font-bold text-xs flex items-center gap-2 shadow-lg"
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
                        className={`p-4 rounded-2xl border transition-all ${
                          msg.read ? 'bg-[#121215] border-white/5' : 'bg-orange-950/20 border-orange-500/40'
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
                          <p className="text-xs font-mono text-[#FF7A00] font-semibold mb-1">الموضوع: {msg.subject}</p>
                        )}
                        <p className="text-slate-300 text-xs leading-relaxed bg-[#18181f] p-3 rounded-xl border border-white/5">
                          {msg.message}
                        </p>

                        <div className="flex items-center gap-3 mt-3 pt-2 border-t border-white/5">
                          <a
                            href={`mailto:${msg.email}?subject=رد: ${encodeURIComponent(msg.subject || 'تواصل')}`}
                            className="text-xs text-[#FF5722] hover:underline font-mono"
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

            {/* ========================================================= */}
            {/* TAB: BACKUP & RESET */}
            {/* ========================================================= */}
            {activeTab === 'backup' && (
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white mb-2">النسخ الاحتياطي وإعادة الضبط</h4>
                
                <div className="p-6 rounded-2xl bg-[#121215] border border-white/5 space-y-4">
                  <h5 className="font-bold text-white text-sm">تصدير كامل بيانات البرتفوليو (JSON):</h5>
                  <p className="text-xs text-slate-400">
                    يمكنك تنزيل ملف JSON يحتوي على كامل مشاريعك، شهاداتك، مهاراتك، وبياناتك الشخصية للاحتفاظ بها.
                  </p>
                  <button
                    onClick={exportData}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs"
                  >
                    <Download className="w-4 h-4" />
                    <span>تصدير البيانات (Export JSON)</span>
                  </button>
                </div>

                <div className="p-6 rounded-2xl bg-[#121215] border border-white/5 space-y-4">
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
                        if (content && importData(content)) {
                          alert('تم استيراد البيانات وتحديث البرتفوليو بنجاح!');
                        } else {
                          alert('الملف غير صالح أو تالف.');
                        }
                      };
                      reader.readAsText(file);
                    }}
                    className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#18181f] file:text-slate-200 hover:file:bg-[#22222b]"
                  />
                </div>

                <div className="p-6 rounded-2xl bg-red-950/20 border border-red-900/40 space-y-3">
                  <h5 className="font-bold text-red-400 text-sm">إعادة ضبط المصنع (Reset Defaults):</h5>
                  <p className="text-xs text-slate-400">
                    إعادة جميع المشاريع والشهادات والبيانات إلى الحالة الأصلية الافتراضية.
                  </p>
                  <button
                    onClick={() => {
                      if (confirm('هل أنت متأكد من رغبتك في إعادة تعيين كافة البيانات إلى الإعدادات الأولية؟')) {
                        resetToDefault();
                        alert('تمت استعادة الإعدادات الأصلية بنجاح.');
                      }
                    }}
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
  );
};

export default AdminDashboard;
