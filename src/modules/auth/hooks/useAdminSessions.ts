import { useCallback, useEffect, useState } from 'react';

export interface AdminSession {
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

export function useAdminSessions(isAuthenticated: boolean, logout: () => void) {
  const [sessions, setSessions] = useState<AdminSession[]>([]);
  const [activeSessionsCount, setActiveSessionsCount] = useState<number>(0);
  const [loadingSessions, setLoadingSessions] = useState<boolean>(false);

  const fetchSessions = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoadingSessions(true);
    try {
      const sid = typeof window !== 'undefined' ? localStorage.getItem('portfolio_admin_session_id') || '' : '';
      const res = await fetch(`/api/admin-sessions?sessionId=${encodeURIComponent(sid)}`, {
        headers: { 'x-session-id': sid },
      });
      if (res.ok) {
        const data = await res.json();
        setActiveSessionsCount(data.count ?? data.activeSessionsCount ?? (data.sessions ? data.sessions.length : 0));
        setSessions(data.sessions || []);
        if (sid && (data.isCurrentActive === false || data.isCurrentSessionActive === false)) {
          alert('تم إنهاء جلستك على هذا الجهاز (تم تسجيل الخروج بواسطة الإدارة).');
          logout();
        }
      }
    } catch {
      // ignore network interruptions gracefully
    } finally {
      setLoadingSessions(false);
    }
  }, [isAuthenticated, logout]);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchSessions();
    const interval = setInterval(fetchSessions, 20000);
    return () => clearInterval(interval);
  }, [isAuthenticated, fetchSessions]);

  return {
    sessions,
    activeSessionsCount,
    loadingSessions,
    fetchSessions,
  };
}
