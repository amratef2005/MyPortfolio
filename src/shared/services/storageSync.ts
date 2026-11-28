const SYNC_CHANNEL = 'portfolio_sync';

export type SyncEventType =
  | 'UPDATE_PROFILE'
  | 'UPDATE_EXPERIENCES'
  | 'UPDATE_PROJECTS'
  | 'UPDATE_CERTS'
  | 'UPDATE_SKILLS'
  | 'UPDATE_MESSAGES';

export function broadcastChange(type: SyncEventType, payload: unknown): void {
  try {
    if (typeof BroadcastChannel !== 'undefined') {
      const channel = new BroadcastChannel(SYNC_CHANNEL);
      channel.postMessage({ type, payload });
      channel.close();
    }
  } catch {
    // Ignore environments without BroadcastChannel support
  }
}

export function subscribeToSyncEvents(
  onMessage: (event: { type?: string; payload?: unknown }) => void
): () => void {
  let channel: BroadcastChannel | null = null;
  try {
    if (typeof BroadcastChannel !== 'undefined') {
      channel = new BroadcastChannel(SYNC_CHANNEL);
      channel.onmessage = (e) => onMessage(e.data || {});
    }
  } catch {
    // ignore
  }
  return () => {
    if (channel) channel.close();
  };
}

export function readStoredJson<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function writeStoredJson(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore quota/private mode errors gracefully
  }
}
