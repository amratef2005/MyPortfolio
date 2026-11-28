import { useEffect, useState } from 'react';

export const ADMIN_TABS = [
  'overview',
  'status',
  'projects',
  'certificates',
  'skills',
  'profile',
  'security',
  'inbox',
  'backup',
  'theme',
] as const;

export type AdminTab = (typeof ADMIN_TABS)[number];

export function useActiveAdminTab() {
  const [activeTab, setActiveTab] = useState<AdminTab>(() => {
    try {
      const saved =
        sessionStorage.getItem('admin_active_tab') ||
        localStorage.getItem('admin_active_tab');
      if (saved && (ADMIN_TABS as readonly string[]).includes(saved)) {
        return saved as AdminTab;
      }
    } catch {
      // ignore storage access issues
    }
    return 'overview';
  });

  useEffect(() => {
    try {
      sessionStorage.setItem('admin_active_tab', activeTab);
      localStorage.setItem('admin_active_tab', activeTab);
    } catch {
      // ignore storage access issues
    }
  }, [activeTab]);

  return [activeTab, setActiveTab] as const;
}
