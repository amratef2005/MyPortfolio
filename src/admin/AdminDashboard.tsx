import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project, Certificate, SkillCategory } from '../types';
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
  LogOut
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
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'certificates' | 'skills' | 'profile' | 'inbox' | 'backup'>('overview');

  // Edit Project State
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);

  // Edit Certificate State
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [isNewCert, setIsNewCert] = useState(false);

  // Profile Form State
  const [profileForm, setProfileForm] = useState(profile);

  if (!isAdminOpen) return null;

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
        <div className="relative w-full max-w-md bg-dark-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center">
          <button
            onClick={() => setIsAdminOpen(false)}
            className="absolute top-5 left-5 p-2 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto mb-4 text-cyan-400 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
            <Lock className="w-8 h-8" />
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">لوحة التحكم في البرتفوليو</h3>
          <p className="text-slate-400 text-xs font-mono mb-6">
            أدخل رمز الـ PIN السري للمتابعة (الرمز الافتراضي: <span className="text-cyan-400 font-bold">1234</span>)
          </p>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <input
              type="password"
              maxLength={8}
              value={pinInput}
              onChange={(e) => {
                setPinInput(e.target.value);
                setPinError(false);
              }}
              placeholder="••••"
              className="w-full text-center text-2xl tracking-[0.5em] py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-white outline-none font-mono"
            />

            {pinError && (
              <p className="text-red-400 text-xs font-mono">الرمز غير صحيح، حاول مجدداً.</p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-sm shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all flex items-center justify-center gap-2"
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
      <div className="relative w-full max-w-6xl h-[92vh] bg-dark-900 border border-slate-800 rounded-3xl flex flex-col shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">لوحة التحكم المركزية (Admin Portfolio CMS)</h3>
              <p className="text-xs text-slate-400 font-mono">التحكم الكامل في المشاريع والشهادات والبيانات</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
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
          <div className="w-full md:w-64 bg-slate-950/60 border-b md:border-b-0 md:border-l border-slate-800 p-3 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold w-full text-right transition-all shrink-0 md:shrink ${
                activeTab === 'overview' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>نظرة عامة وإحصائيات</span>
            </button>

            <button
              onClick={() => { setActiveTab('projects'); setEditingProject(null); }}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold w-full text-right transition-all shrink-0 md:shrink ${
                activeTab === 'projects' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <FolderGit2 className="w-4 h-4" />
              <span>إدارة المشاريع ({projects.length})</span>
            </button>

            <button
              onClick={() => { setActiveTab('certificates'); setEditingCert(null); }}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold w-full text-right transition-all shrink-0 md:shrink ${
                activeTab === 'certificates' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>إدارة الشهادات ({certificates.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('skills')}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold w-full text-right transition-all shrink-0 md:shrink ${
                activeTab === 'skills' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>ترسانة المهارات</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold w-full text-right transition-all shrink-0 md:shrink ${
                activeTab === 'profile' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <User className="w-4 h-4" />
              <span>البيانات الشخصية و PIN</span>
            </button>

            <button
              onClick={() => setActiveTab('inbox')}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold w-full text-right transition-all shrink-0 md:shrink ${
                activeTab === 'inbox' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4" />
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
              <Download className="w-4 h-4" />
              <span>النسخ الاحتياطي والاستعادة</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* Tab: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white mb-4">نظرة عامة على حالة البرتفوليو</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                    <span className="block text-3xl font-black text-cyan-400 font-mono">{projects.length}</span>
                    <span className="text-xs text-slate-400">مشاريع رئيسية</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                    <span className="block text-3xl font-black text-indigo-400 font-mono">{certificates.length}</span>
                    <span className="text-xs text-slate-400">شهادات واعتمادات</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                    <span className="block text-3xl font-black text-emerald-400 font-mono">
                      {skills.reduce((acc, cat) => acc + cat.skills.length, 0)}
                    </span>
                    <span className="text-xs text-slate-400">مهارة تقنية</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                    <span className="block text-3xl font-black text-amber-400 font-mono">{messages.length}</span>
                    <span className="text-xs text-slate-400">رسائل واردة</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-3">
                  <h5 className="font-bold text-white text-sm">💡 تعليمات لوحة التحكم:</h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    • كل التعديلات التي تقوم بها تُحفظ فورياً ومحلياً على المتصفح وتظهر في البرتفوليو مباشرة.<br />
                    • يمكنك استخدام تبويب <b>"النسخ الاحتياطي والاستعادة"</b> لتصدير بياناتك بملف JSON أو استيرادها على أي جهاز آخر بنقرة واحدة.<br />
                    • يمكنك إضافة أي مشاريع جديدة أو تعديل مشروعي MOT7KM و StudySync في أي وقت.
                  </p>
                </div>
              </div>
            )}

            {/* Tab: Projects */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                {!editingProject ? (
                  <>
                    <div className="flex items-center justify-between">
                      <h4 className="text-xl font-bold text-white">المشاريع المضافة ({projects.length})</h4>
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
                            badge: 'New System',
                            architecture: ['Clean Architecture'],
                            technologies: ['.NET 10', 'PostgreSQL'],
                            metrics: [{ label: 'Performance', value: '100%' }],
                            features: ['ميزة هندسية جديدة']
                          });
                        }}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-bold shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                      >
                        <Plus className="w-4 h-4" />
                        <span>إضافة مشروع جديد</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {projects.map((p) => (
                        <div key={p.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                          <div>
                            <span className="text-xs font-mono text-cyan-400 font-semibold">{p.badge}</span>
                            <h5 className="font-bold text-white text-base">{p.titleAr || p.title}</h5>
                            <p className="text-xs text-slate-400 font-mono mt-0.5">{p.taglineAr || p.tagline}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => { setEditingProject(p); setIsNewProject(false); }}
                              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200"
                            >
                              تعديل
                            </button>
                            <button
                              onClick={() => { if (confirm('هل أنت متأكد من حذف هذا المشروع؟')) deleteProject(p.id); }}
                              className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
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
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <h4 className="text-lg font-bold text-white">
                        {isNewProject ? 'إضافة مشروع جديد' : `تعديل: ${editingProject.titleAr || editingProject.title}`}
                      </h4>
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
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">اسم المشروع (English)</label>
                        <input
                          type="text"
                          value={editingProject.title}
                          onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">الشعار المختصر (Tagline)</label>
                      <input
                        type="text"
                        value={editingProject.taglineAr}
                        onChange={(e) => setEditingProject({ ...editingProject, taglineAr: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">الوصف التفصيلي</label>
                      <textarea
                        rows={3}
                        value={editingProject.descriptionAr}
                        onChange={(e) => setEditingProject({ ...editingProject, descriptionAr: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">الشارة (Badge)</label>
                      <input
                        type="text"
                        value={editingProject.badge}
                        onChange={(e) => setEditingProject({ ...editingProject, badge: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
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
                        <span>حفظ التعديلات</span>
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

            {/* Tab: Certificates */}
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
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-bold"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إضافة شهادة جديدة</span>
                  </button>
                </div>

                {!editingCert ? (
                  <div className="space-y-3">
                    {certificates.map((cert) => (
                      <div key={cert.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-mono text-emerald-400 font-semibold">{cert.badge}</span>
                          <h5 className="font-bold text-white text-base">{cert.titleAr || cert.title}</h5>
                          <p className="text-xs text-slate-400 font-mono mt-0.5">{cert.issuerAr} &bull; {cert.fileUrl}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => { setEditingCert(cert); setIsNewCert(false); }}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200"
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
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">الجهة المصدرة</label>
                        <input
                          type="text"
                          value={editingCert.issuerAr}
                          onChange={(e) => setEditingCert({ ...editingCert, issuerAr: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">رابط الملف (مثال: /iti.pdf أو رابط خارجي)</label>
                      <input
                        type="text"
                        value={editingCert.fileUrl}
                        onChange={(e) => setEditingCert({ ...editingCert, fileUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm font-mono"
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

            {/* Tab: Skills */}
            {activeTab === 'skills' && (
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white">إدارة المهارات والتقنيات</h4>
                <div className="space-y-6">
                  {skills.map((category, catIdx) => (
                    <div key={catIdx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                      <h5 className="font-bold text-cyan-400 text-sm">{category.nameAr}</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {category.skills.map((skill, sIdx) => (
                          <div key={sIdx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
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
                                className="w-14 px-2 py-1 rounded bg-slate-950 text-cyan-400 text-xs font-mono text-center border border-slate-800"
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

            {/* Tab: Profile */}
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-white mb-2">تعديل البيانات الشخصية والسيرة الذاتية</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">الاسم (عربي)</label>
                    <input
                      type="text"
                      value={profileForm.nameAr}
                      onChange={(e) => setProfileForm({ ...profileForm, nameAr: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">المسمى الوظيفي (عربي)</label>
                    <input
                      type="text"
                      value={profileForm.titleAr}
                      onChange={(e) => setProfileForm({ ...profileForm, titleAr: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">البريد الإلكتروني</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">واتساب (WhatsApp)</label>
                    <input
                      type="text"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      placeholder="amratefkandel"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">النبذة التعريفية (Bio)</label>
                  <textarea
                    rows={3}
                    value={profileForm.bioAr}
                    onChange={(e) => setProfileForm({ ...profileForm, bioAr: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-800/40">
                  <label className="block text-xs font-mono text-cyan-300 font-bold mb-1">
                    رمز الـ PIN للدخول إلى لوحة التحكم
                  </label>
                  <input
                    type="text"
                    maxLength={8}
                    value={profileForm.adminPin}
                    onChange={(e) => setProfileForm({ ...profileForm, adminPin: e.target.value })}
                    className="w-48 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 text-sm font-mono font-bold"
                  />
                </div>

                <button
                  onClick={() => {
                    updateProfile(profileForm);
                    alert('تم حفظ البيانات الشخصية بنجاح!');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-xs flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>تحديث البيانات الشخصية</span>
                </button>
              </div>
            )}

            {/* Tab: Inbox */}
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
                          msg.read ? 'bg-slate-950/40 border-slate-800/60' : 'bg-cyan-950/20 border-cyan-500/40'
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
                          <p className="text-xs font-mono text-cyan-400 font-semibold mb-1">الموضوع: {msg.subject}</p>
                        )}
                        <p className="text-slate-300 text-xs leading-relaxed bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                          {msg.message}
                        </p>

                        <div className="flex items-center gap-3 mt-3 pt-2 border-t border-slate-800/60">
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

            {/* Tab: Backup & Reset */}
            {activeTab === 'backup' && (
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white mb-2">النسخ الاحتياطي وإعادة الضبط</h4>
                
                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <h5 className="font-bold text-white text-sm">تصدير كامل بيانات البرتفوليو (JSON):</h5>
                  <p className="text-xs text-slate-400">
                    يمكنك تنزيل ملف JSON يحتوي على كامل مشاريعك، شهاداتك، مهاراتك، وبياناتك الشخصية للاحتفاظ بها.
                  </p>
                  <button
                    onClick={exportData}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs"
                  >
                    <Download className="w-4 h-4" />
                    <span>تصدير البيانات (Export JSON)</span>
                  </button>
                </div>

                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
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
                    className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700"
                  />
                </div>

                <div className="p-6 rounded-2xl bg-red-950/20 border border-red-900/40 space-y-3">
                  <h5 className="font-bold text-red-400 text-sm">إعادة ضبط المصنع (Reset Defaults):</h5>
                  <p className="text-xs text-slate-400">
                    إعادة جميع المشاريع والشهادات إلى الحالة الأصلية الافتراضية.
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
