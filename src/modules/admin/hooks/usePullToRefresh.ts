import React, { useCallback, useRef, useState } from 'react';

export const PULL_THRESHOLD = 64;

export function usePullToRefresh(onSync: () => Promise<boolean>) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshFeedback, setRefreshFeedback] = useState<'synced' | 'error' | null>(null);
  const [pullDistance, setPullDistance] = useState(0);
  const pullStartYRef = useRef<number | null>(null);
  const mainContentRef = useRef<HTMLElement | null>(null);

  const handleHardReload = useCallback(async () => {
    try {
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(
          keys
            .filter((k) => k.startsWith('amr-admin-shell'))
            .map((k) => caches.delete(k))
        );
      }
      if ('serviceWorker' in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map((r) => r.update().catch(() => {})));
      }
    } catch {
      // ignore cache errors and proceed with reload
    }
    window.location.reload();
  }, []);

  const handleRefresh = useCallback(
    async (e?: React.MouseEvent<HTMLButtonElement>) => {
      if (e?.shiftKey) {
        await handleHardReload();
        return;
      }
      if (isRefreshing) return;
      setIsRefreshing(true);
      setRefreshFeedback(null);
      const ok = await onSync();
      setIsRefreshing(false);
      setRefreshFeedback(ok ? 'synced' : 'error');
      setTimeout(() => setRefreshFeedback(null), 2400);
    },
    [isRefreshing, onSync, handleHardReload]
  );

  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    if (isRefreshing || e.touches.length !== 1) return;
    const atTop =
      (typeof window !== 'undefined' ? window.scrollY <= 2 : true) &&
      (mainContentRef.current ? mainContentRef.current.scrollTop <= 2 : true);
    pullStartYRef.current = atTop ? e.touches[0].clientY : null;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLElement>) => {
    if (pullStartYRef.current === null || isRefreshing || e.touches.length !== 1) return;
    const delta = e.touches[0].clientY - pullStartYRef.current;
    if (delta <= 0) {
      setPullDistance(0);
      return;
    }
    setPullDistance(Math.min(92, Math.round(delta * 0.45)));
  };

  const handleTouchEnd = () => {
    if (pullStartYRef.current === null) return;
    const shouldRefresh = pullDistance >= PULL_THRESHOLD;
    pullStartYRef.current = null;
    setPullDistance(0);
    if (shouldRefresh) {
      void handleRefresh();
    }
  };

  return {
    isRefreshing,
    refreshFeedback,
    pullDistance,
    mainContentRef,
    handleHardReload,
    handleRefresh,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
}
