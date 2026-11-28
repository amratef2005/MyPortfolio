import type { ContactMessage, ProfileInfo, Project } from '@shared/types';

function getSessionHeader(): Record<string, string> {
  const sid = typeof window !== 'undefined' ? localStorage.getItem('portfolio_admin_session_id') || '' : '';
  return sid ? { 'x-session-id': sid } : {};
}

export async function fetchPortfolioSnapshot() {
  const res = await fetch('/api/portfolio', { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export async function syncProfileApi(profile: Partial<ProfileInfo>): Promise<boolean> {
  const res = await fetch('/api/profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getSessionHeader(),
    },
    body: JSON.stringify(profile),
  });
  return res.ok;
}

export async function syncProjectApi(project: Project): Promise<boolean> {
  const res = await fetch('/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project),
  });
  return res.ok;
}

export async function deleteProjectApi(id: string): Promise<boolean> {
  const res = await fetch(`/api/projects?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  return res.ok;
}

export async function submitContactMessageApi(message: ContactMessage): Promise<boolean> {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message),
  });
  return res.ok;
}

export async function deleteMessageApi(id: string): Promise<boolean> {
  const res = await fetch(`/api/messages?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  return res.ok;
}
