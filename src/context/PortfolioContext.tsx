import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProfileInfo, Project, Certificate, SkillCategory, ContactMessage } from '../types';
import { initialProfile, initialProjects, initialCertificates, initialSkillCategories } from '../data/initialData';

interface PortfolioContextType {
  profile: ProfileInfo;
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

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from LocalStorage or fall back to defaults
  const [profile, setProfile] = useState<ProfileInfo>(() => {
    const saved = localStorage.getItem('portfolio_profile');
    if (!saved) return initialProfile;
    try {
      const parsed = JSON.parse(saved);
      // If legacy placeholder data or previous email is detected, refresh completely to initialProfile
      if (
        !parsed.name ||
        parsed.name === 'Software Engineer' ||
        parsed.name === 'Amr Atef' ||
        parsed.email === 'developer@example.com' ||
        parsed.email === 'amratef.dev@gmail.com' ||
        parsed.phone === '+20 100 000 0000' ||
        parsed.location === 'Cairo, Egypt' ||
        parsed.location === 'Ismailia • Cairo, Egypt' ||
        parsed.locationAr === 'الإسماعيلية • القاهرة، مصر' ||
        parsed.linkedin === 'https://linkedin.com/in/amratef' ||
        parsed.github?.includes('developer') ||
        parsed.linkedin?.includes('developer')
      ) {
        localStorage.setItem('portfolio_profile', JSON.stringify(initialProfile));
        return initialProfile;
      }
      return { ...initialProfile, ...parsed };
    } catch {
      return initialProfile;
    }
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('portfolio_projects');
    if (!saved) return initialProjects;
    try {
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed) || parsed.length === 0 || !parsed.some((p: any) => p.id === 'mot7km-saas') || !parsed.some((p: any) => p.featuresAr)) {
        localStorage.setItem('portfolio_projects', JSON.stringify(initialProjects));
        return initialProjects;
      }
      return initialProjects; // Prioritize latest curated flagship projects
    } catch {
      return initialProjects;
    }
  });

  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    const saved = localStorage.getItem('portfolio_certificates');
    if (!saved) return initialCertificates;
    try {
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed) || !parsed.some((c: any) => c.badgeAr)) {
        localStorage.setItem('portfolio_certificates', JSON.stringify(initialCertificates));
        return initialCertificates;
      }
      return parsed;
    } catch {
      return initialCertificates;
    }
  });

  const [skills, setSkills] = useState<SkillCategory[]>(() => {
    const saved = localStorage.getItem('portfolio_skills');
    if (!saved) return initialSkillCategories;
    try {
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed) || !parsed.some((cat: any) => cat.skills?.some((s: any) => s.tagAr))) {
        localStorage.setItem('portfolio_skills', JSON.stringify(initialSkillCategories));
        return initialSkillCategories;
      }
      return parsed;
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

  // Fetch live portfolio data from Supabase backend on startup
  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (!data) return;
        if (data.profile) setProfile(data.profile);
        if (Array.isArray(data.projects) && data.projects.length > 0) setProjects(data.projects);
        if (Array.isArray(data.certificates) && data.certificates.length > 0) setCertificates(data.certificates);
        if (Array.isArray(data.skills) && data.skills.length > 0) setSkills(data.skills);
        if (Array.isArray(data.messages)) setMessages(data.messages);
      })
      .catch(err => {
        console.log('Local mode active (Supabase offline or static build):', err.message);
      });
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('portfolio_profile', JSON.stringify(profile));
  }, [profile]);

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
      ? `${profile.nameAr || 'عمرو عاطف'} | مهندس نظم خلفية ومعماري .NET 10`
      : `${profile.name || 'Amr Atef'} | Senior .NET & Backend Architect`;
    localStorage.setItem('portfolio_lang', lang);
  }, [lang, profile]);

  // Auth methods
  const login = (username: string, password?: string) => {
    const validUser = (profile.adminUsername || 'admin').toLowerCase();
    const validPass = profile.adminPassword || 'admin123';
    
    // Case 1: Both username and password provided
    if (password !== undefined) {
      if (username.trim().toLowerCase() === validUser && password === validPass) {
        setIsAuthenticated(true);
        sessionStorage.setItem('portfolio_admin_auth', 'true');
        return true;
      }
      return false;
    }

    // Case 2: Single PIN or password provided (fallback)
    if (username.trim() === validPass || username.trim() === profile.adminPin) {
      setIsAuthenticated(true);
      sessionStorage.setItem('portfolio_admin_auth', 'true');
      return true;
    }

    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('portfolio_admin_auth');
    setIsAdminOpen(false);
  };

  const updateCredentials = (newUsername: string, newPassword: string) => {
    setProfile(prev => ({
      ...prev,
      adminUsername: newUsername.trim(),
      adminPassword: newPassword,
    }));
  };

  const updateProfile = (updated: Partial<ProfileInfo>) => {
    setProfile(prev => {
      const nextProfile = { ...prev, ...updated };
      fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nextProfile)
      }).catch(e => console.error('Supabase profile sync error:', e));
      return nextProfile;
    });
  };

  const addProject = (project: Project) => {
    setProjects(prev => [project, ...prev]);
    fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project)
    }).catch(e => console.error('Supabase project sync error:', e));
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    setProjects(prev => {
      const nextProjects = prev.map(p => p.id === id ? { ...p, ...updated } : p);
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
    setProjects(prev => prev.filter(p => p.id !== id));
    fetch(`/api/projects/${id}`, { method: 'DELETE' }).catch(e => console.error('Supabase project delete error:', e));
  };

  const addCertificate = (cert: Certificate) => {
    setCertificates(prev => [cert, ...prev]);
  };

  const updateCertificate = (id: string, updated: Partial<Certificate>) => {
    setCertificates(prev => prev.map(c => c.id === id ? { ...c, ...updated } : c));
  };

  const deleteCertificate = (id: string) => {
    setCertificates(prev => prev.filter(c => c.id !== id));
  };

  const updateSkills = (newSkills: SkillCategory[]) => {
    setSkills(newSkills);
  };

  const addMessage = (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>) => {
    const newMessage: ContactMessage = {
      ...msg,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      read: false
    };
    setMessages(prev => [newMessage, ...prev]);
  };

  const markMessageRead = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  const exportData = () => {
    const data = {
      profile,
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
      if (data.profile) setProfile(data.profile);
      if (data.projects) setProjects(data.projects);
      if (data.certificates) setCertificates(data.certificates);
      if (data.skills) setSkills(data.skills);
      if (data.messages) setMessages(data.messages);
      return true;
    } catch {
      return false;
    }
  };

  const resetToDefault = () => {
    setProfile(initialProfile);
    setProjects(initialProjects);
    setCertificates(initialCertificates);
    setSkills(initialSkillCategories);
    setMessages([]);
    localStorage.clear();
  };

  return (
    <PortfolioContext.Provider
      value={{
        profile,
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
