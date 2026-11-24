import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProfileInfo, Project, Certificate, SkillCategory, ContactMessage, Experience } from '../types';
import { initialProfile, initialProjects, initialCertificates, initialSkillCategories, initialExperiences } from '../data/initialData';

const DATA_SEED_KEY = 'portfolio_seed_v11';

interface PortfolioContextType {
  profile: ProfileInfo;
  experiences: Experience[];
  projects: Project[];
  certificates: Certificate[];
  skills: SkillCategory[];
  messages: ContactMessage[];
  lang: 'ar' | 'en';
  setLang: (lang: 'ar' | 'en') => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isCVModalOpen: boolean;
  setIsCVModalOpen: (open: boolean) => void;
  isAuthenticated: boolean;
  login: (username: string, password?: string) => boolean;
  logout: () => void;
  updateCredentials: (username: string, password: string) => void;
  updateProfile: (profile: Partial<ProfileInfo>) => void;
  addExperience: (exp: Experience) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addCertificate: (cert: Certificate) => void;
  updateCertificate: (id: string, cert: Partial<Certificate>) => void;
  deleteCertificate: (id: string) => void;
  updateSkills: (skills: SkillCategory[]) => void;
  addMessage: (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>) => void;
  markMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;
  exportData: () => void;
  importData: (jsonStr: string) => boolean;
  resetToDefault: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

// Helper to broadcast changes to other open tabs (e.g., from Admin to Portfolio in real time)
const broadcastChange = (type: string, payload: any) => {
  try {
    if (typeof BroadcastChannel !== 'undefined') {
      const channel = new BroadcastChannel('portfolio_sync');
      channel.postMessage({ type, payload });
      channel.close();
    }
  } catch {
    // ignore
  }
};

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from LocalStorage or fall back to defaults
  const [profile, setProfile] = useState<ProfileInfo>(() => {
    const isSeeded = localStorage.getItem(DATA_SEED_KEY);
    if (!isSeeded) {
      localStorage.setItem(DATA_SEED_KEY, 'true');
      localStorage.setItem('portfolio_profile', JSON.stringify(initialProfile));
      localStorage.setItem('portfolio_experiences', JSON.stringify(initialExperiences));
      localStorage.setItem('portfolio_projects', JSON.stringify(initialProjects));
      localStorage.setItem('portfolio_certificates', JSON.stringify(initialCertificates));
      localStorage.setItem('portfolio_skills', JSON.stringify(initialSkillCategories));
      return initialProfile;
    }

    const saved = localStorage.getItem('portfolio_profile');
    if (!saved) return initialProfile;
    try {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object') {
        return {
          ...initialProfile,
          ...parsed,
          brandName: parsed.brandName || initialProfile.brandName || 'Amr Kandel',
          brandNameAr: parsed.brandNameAr || initialProfile.brandNameAr || 'عمرو قنديل',
          heroAvatarUrl: parsed.heroAvatarUrl || initialProfile.heroAvatarUrl || '/drama_hero.png',
          aboutAvatarUrl: parsed.aboutAvatarUrl || initialProfile.aboutAvatarUrl || '/about_avatar.png',
          autoExtractColors: false
        };
      }
      return initialProfile;
    } catch {
      return initialProfile;
    }
  });

  const [experiences, setExperiences] = useState<Experience[]>(() => {
    const saved = localStorage.getItem('portfolio_experiences');
    if (!saved) return initialExperiences;
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
      return initialExperiences;
    } catch {
      return initialExperiences;
    }
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('portfolio_projects');
    if (!saved) return initialProjects;
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const filtered = parsed.filter(p => p.id !== 'mot7km-saas');
        return filtered.length > 0 ? filtered : initialProjects;
      }
      return initialProjects;
    } catch {
      return initialProjects;
    }
  });

  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    const saved = localStorage.getItem('portfolio_certificates');
    if (!saved) return initialCertificates;
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
      return initialCertificates;
    } catch {
      return initialCertificates;
    }
  });

  const [skills, setSkills] = useState<SkillCategory[]>(() => {
    const saved = localStorage.getItem('portfolio_skills');
    if (!saved) return initialSkillCategories;
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
      return initialSkillCategories;
    } catch {
      return initialSkillCategories;
    }
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('portfolio_messages');
    return saved ? JSON.parse(saved) : [];
  });

  const [lang, setLang] = useState<'ar' | 'en'>(() => {
    const saved = localStorage.getItem('portfolio_lang');
    return (saved === 'ar' || saved === 'en') ? saved : 'en';
  });
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('portfolio_admin_auth') === 'true';
  });

  // Cross-tab synchronization: Any change in Admin tab immediately reflects in Portfolio tab
  useEffect(() => {
    let channel: BroadcastChannel | null = null;
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        channel = new BroadcastChannel('portfolio_sync');
        channel.onmessage = (event) => {
          const { type, payload } = event.data || {};
          if (type === 'UPDATE_PROFILE' && payload) setProfile(payload);
          if (type === 'UPDATE_EXPERIENCES' && payload) setExperiences(payload);
          if (type === 'UPDATE_PROJECTS' && payload) setProjects(payload);
          if (type === 'UPDATE_CERTS' && payload) setCertificates(payload);
          if (type === 'UPDATE_SKILLS' && payload) setSkills(payload);
        };
      }
    } catch {
      // ignore
    }

    const onStorage = (e: StorageEvent) => {
      if (!e.newValue) return;
      try {
        if (e.key === 'portfolio_profile') setProfile(JSON.parse(e.newValue));
        if (e.key === 'portfolio_experiences') setExperiences(JSON.parse(e.newValue));
        if (e.key === 'portfolio_projects') setProjects(JSON.parse(e.newValue));
        if (e.key === 'portfolio_certificates') setCertificates(JSON.parse(e.newValue));
        if (e.key === 'portfolio_skills') setSkills(JSON.parse(e.newValue));
      } catch {
        // ignore
      }
    };

    window.addEventListener('storage', onStorage);
    return () => {
      if (channel) channel.close();
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  // Fetch live portfolio data from Supabase backend on startup
  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (!data) return;
        if (data.profile) {
          setProfile(prev => {
            const merged = { ...prev, ...data.profile };
            localStorage.setItem('portfolio_profile', JSON.stringify(merged));
            return merged;
          });
        }
        if (Array.isArray(data.projects) && data.projects.length > 0) {
          const cleanProjects = data.projects.filter((p: Project) => p.id !== 'mot7km-saas');
          setProjects(cleanProjects);
          localStorage.setItem('portfolio_projects', JSON.stringify(cleanProjects));
        }
        if (Array.isArray(data.certificates) && data.certificates.length > 0) {
          setCertificates(data.certificates);
          localStorage.setItem('portfolio_certificates', JSON.stringify(data.certificates));
        }
        if (Array.isArray(data.skills) && data.skills.length > 0) {
          setSkills(data.skills);
          localStorage.setItem('portfolio_skills', JSON.stringify(data.skills));
        }
        if (Array.isArray(data.messages)) {
          setMessages(data.messages);
          localStorage.setItem('portfolio_messages', JSON.stringify(data.messages));
        }
      })
      .catch(err => {
        console.log('Local/fallback mode active:', err.message);
      });
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('portfolio_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('portfolio_experiences', JSON.stringify(experiences));
  }, [experiences]);

  useEffect(() => {
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('portfolio_certificates', JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem('portfolio_skills', JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem('portfolio_messages', JSON.stringify(messages));
  }, [messages]);

  // Synchronize document direction, title and language dynamically
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.title = lang === 'ar'
      ? `${profile.nameAr || 'عمرو عاطف'} | مطور نظم خلفية .NET`
      : `${profile.name || 'Amr Atef'} | .NET Backend Developer`;
    localStorage.setItem('portfolio_lang', lang);
  }, [lang, profile]);

  // Auth methods
  const login = (username: string, password?: string) => {
    const validUser = (profile.adminUsername || 'amratefkandel').trim().toLowerCase();
    const validPass = profile.adminPassword || 'KandelAmr###14';
    
    // Case 1: Both username and password provided
    if (password !== undefined) {
      if (username.trim().toLowerCase() === validUser && password === validPass) {
        setIsAuthenticated(true);
        sessionStorage.setItem('portfolio_admin_auth', 'true');
        
        // Register session in Supabase
        const sid = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        localStorage.setItem('portfolio_admin_session_id', sid);
        fetch('/api/admin-sessions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId: sid })
        }).catch(() => {});

        return true;
      }
      return false;
    }

    // Case 2: Single PIN or master password provided
    if (username.trim() === validPass) {
      setIsAuthenticated(true);
      sessionStorage.setItem('portfolio_admin_auth', 'true');
      
      const sid = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('portfolio_admin_session_id', sid);
      fetch('/api/admin-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: sid })
      }).catch(() => {});

      return true;
    }

    return false;
  };

  const logout = () => {
    const sid = localStorage.getItem('portfolio_admin_session_id');
    if (sid) {
      fetch(`/api/admin-sessions?sessionId=${sid}`, { method: 'DELETE' }).catch(() => {});
      localStorage.removeItem('portfolio_admin_session_id');
    }
    setIsAuthenticated(false);
    sessionStorage.removeItem('portfolio_admin_auth');
    setIsAdminOpen(false);
  };

  const updateCredentials = (newUsername: string, newPassword: string) => {
    setProfile(prev => {
      const next = {
        ...prev,
        adminUsername: newUsername.trim(),
        adminPassword: newPassword,
      };
      localStorage.setItem('portfolio_profile', JSON.stringify(next));
      broadcastChange('UPDATE_PROFILE', next);
      return next;
    });
  };

  const updateProfile = (updated: Partial<ProfileInfo>) => {
    setProfile(prev => {
      const nextProfile = { ...prev, ...updated };
      try {
        localStorage.setItem('portfolio_profile', JSON.stringify(nextProfile));
      } catch (err) {
        console.warn('localStorage quota warning:', err);
      }
      broadcastChange('UPDATE_PROFILE', nextProfile);
      const sid = typeof window !== 'undefined' ? localStorage.getItem('portfolio_admin_session_id') || '' : '';
      fetch('/api/profile', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-session-id': sid
        },
        body: JSON.stringify(nextProfile)
      })
      .then(res => {
        if (!res.ok) {
          console.error('Supabase profile sync response not ok:', res.status);
        }
      })
      .catch(e => console.error('Supabase profile sync error:', e));
      return nextProfile;
    });
  };

  const addExperience = (exp: Experience) => {
    setExperiences(prev => {
      const next = [exp, ...prev];
      localStorage.setItem('portfolio_experiences', JSON.stringify(next));
      broadcastChange('UPDATE_EXPERIENCES', next);
      return next;
    });
  };

  const updateExperience = (id: string, updated: Partial<Experience>) => {
    setExperiences(prev => {
      const next = prev.map(e => e.id === id ? { ...e, ...updated } : e);
      localStorage.setItem('portfolio_experiences', JSON.stringify(next));
      broadcastChange('UPDATE_EXPERIENCES', next);
      return next;
    });
  };

  const deleteExperience = (id: string) => {
    setExperiences(prev => {
      const next = prev.filter(e => e.id !== id);
      localStorage.setItem('portfolio_experiences', JSON.stringify(next));
      broadcastChange('UPDATE_EXPERIENCES', next);
      return next;
    });
  };

  const addProject = (project: Project) => {
    setProjects(prev => {
      const next = [project, ...prev];
      localStorage.setItem('portfolio_projects', JSON.stringify(next));
      broadcastChange('UPDATE_PROJECTS', next);
      fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
      }).catch(e => console.error('Supabase project sync error:', e));
      return next;
    });
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    setProjects(prev => {
      const nextProjects = prev.map(p => p.id === id ? { ...p, ...updated } : p);
      localStorage.setItem('portfolio_projects', JSON.stringify(nextProjects));
      broadcastChange('UPDATE_PROJECTS', nextProjects);
      const target = nextProjects.find(p => p.id === id);
      if (target) {
        fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(target)
        }).catch(e => console.error('Supabase project update error:', e));
      }
      return nextProjects;
    });
  };

  const deleteProject = (id: string) => {
    setProjects(prev => {
      const next = prev.filter(p => p.id !== id);
      localStorage.setItem('portfolio_projects', JSON.stringify(next));
      broadcastChange('UPDATE_PROJECTS', next);
      fetch(`/api/projects?id=${id}`, { method: 'DELETE' }).catch(e => console.error('Supabase project delete error:', e));
      return next;
    });
  };

  const addCertificate = (cert: Certificate) => {
    setCertificates(prev => {
      const next = [cert, ...prev];
      localStorage.setItem('portfolio_certificates', JSON.stringify(next));
      broadcastChange('UPDATE_CERTS', next);
      return next;
    });
  };

  const updateCertificate = (id: string, updated: Partial<Certificate>) => {
    setCertificates(prev => {
      const next = prev.map(c => c.id === id ? { ...c, ...updated } : c);
      localStorage.setItem('portfolio_certificates', JSON.stringify(next));
      broadcastChange('UPDATE_CERTS', next);
      return next;
    });
  };

  const deleteCertificate = (id: string) => {
    setCertificates(prev => {
      const next = prev.filter(c => c.id !== id);
      localStorage.setItem('portfolio_certificates', JSON.stringify(next));
      broadcastChange('UPDATE_CERTS', next);
      return next;
    });
  };

  const updateSkills = (newSkills: SkillCategory[]) => {
    setSkills(newSkills);
    localStorage.setItem('portfolio_skills', JSON.stringify(newSkills));
    broadcastChange('UPDATE_SKILLS', newSkills);
  };

  const addMessage = (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>) => {
    const newMessage: ContactMessage = {
      ...msg,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      read: false
    };
    setMessages(prev => [newMessage, ...prev]);
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMessage)
    }).catch(e => console.error('Supabase message error:', e));
  };

  const markMessageRead = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
    fetch(`/api/messages?id=${id}`, { method: 'DELETE' }).catch(e => console.error('Supabase delete message error:', e));
  };

  const exportData = () => {
    const data = {
      profile,
      experiences,
      projects,
      certificates,
      skills,
      messages,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.profile) updateProfile(data.profile);
      if (data.experiences) {
        setExperiences(data.experiences);
        localStorage.setItem('portfolio_experiences', JSON.stringify(data.experiences));
        broadcastChange('UPDATE_EXPERIENCES', data.experiences);
      }
      if (data.projects) {
        setProjects(data.projects);
        localStorage.setItem('portfolio_projects', JSON.stringify(data.projects));
        broadcastChange('UPDATE_PROJECTS', data.projects);
      }
      if (data.certificates) {
        setCertificates(data.certificates);
        localStorage.setItem('portfolio_certificates', JSON.stringify(data.certificates));
        broadcastChange('UPDATE_CERTS', data.certificates);
      }
      if (data.skills) {
        setSkills(data.skills);
        localStorage.setItem('portfolio_skills', JSON.stringify(data.skills));
        broadcastChange('UPDATE_SKILLS', data.skills);
      }
      if (data.messages) setMessages(data.messages);
      return true;
    } catch {
      return false;
    }
  };

  const resetToDefault = () => {
    setProfile(initialProfile);
    setExperiences(initialExperiences);
    setProjects(initialProjects);
    setCertificates(initialCertificates);
    setSkills(initialSkillCategories);
    setMessages([]);
    localStorage.clear();
    broadcastChange('UPDATE_PROFILE', initialProfile);
    broadcastChange('UPDATE_EXPERIENCES', initialExperiences);
    broadcastChange('UPDATE_PROJECTS', initialProjects);
    broadcastChange('UPDATE_CERTS', initialCertificates);
    broadcastChange('UPDATE_SKILLS', initialSkillCategories);
  };

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        experiences,
        projects,
        certificates,
        skills,
        messages,
        lang,
        setLang,
        isAdminOpen,
        setIsAdminOpen,
        isCVModalOpen,
        setIsCVModalOpen,
        isAuthenticated,
        login,
        logout,
        updateCredentials,
        updateProfile,
        addExperience,
        updateExperience,
        deleteExperience,
        addProject,
        updateProject,
        deleteProject,
        addCertificate,
        updateCertificate,
        deleteCertificate,
        updateSkills,
        addMessage,
        markMessageRead,
        deleteMessage,
        exportData,
        importData,
        resetToDefault,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
