import React, { useCallback, useEffect, useRef, useState } from 'react';

export const PULL_THRESHOLD = 64;

const CURRENT_BUILD_ID = typeof __APP_BUILD_ID__ !== 'undefined' ? __APP_BUILD_ID__ : '';

async function clearAdminCachesAndUpdateSw(): Promise<void> {
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
      await Promise.all(
        regs.map(async (reg) => {
          reg.active?.postMessage({ type: 'CLEAR_CACHE' });
          reg.waiting?.postMessage({ type: 'SKIP_WAITING' });
          await reg.update().catch(() => {});
        })
      );
    }
  } catch {
    // ignore cache cleanup failures and continue reload
  }
}

async function checkRemoteAppVersion(): Promise<boolean> {
  if (!CURRENT_BUILD_ID) return false;
  try {
    const res = await fetch(`/version.json?t=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) return false;
    const data = await res.json();
    return Boolean(data?.buildId && data.buildId !== CURRENT_BUILD_ID);
  } catch {
    return false;
  }
}

export function usePullToRefresh(onSync: () => Promise<boolean>) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshFeedback, setRefreshFeedback] = useState<'synced' | 'error' | null>(null);
  const [pullDistance, setPullDistance] = useState(0);
  const pullStartYRef = useRef<number | null>(null);
  const mainContentRef = useRef<HTMLElement | null>(null);
  const isUpdatingRef = useRef(false);

  const handleHardReload = useCallback(async () => {
    if (isUpdatingRef.current) return;
    isUpdatingRef.current = true;
    await clearAdminCachesAndUpdateSw();
    // Same-origin replace stays inside iPhone standalone PWA and keeps localStorage login session intact
    window.location.replace(`${window.location.pathname}${window.location.search}`);
  }, []);

  const handleRefresh = useCallback(
    async (e?: React.MouseEvent<HTMLButtonElement>) => {
      if (e?.shiftKey) {
        await handleHardReload();
        return;
      }
      if (isRefreshing || isUpdatingRef.current) return;
      setIsRefreshing(true);
      setRefreshFeedback(null);

      const [ok, hasNewBuild] = await Promise.all([
        onSync(),
        checkRemoteAppVersion(),
      ]);

      if (hasNewBuild) {
        await handleHardReload();
        return;
      }

      setIsRefreshing(false);
      setRefreshFeedback(ok ? 'synced' : 'error');
      setTimeout(() => setRefreshFeedback(null), 2400);
    },
    [isRefreshing, onSync, handleHardReload]
  );

  // Automatically detect and apply newly deployed versions when returning to the iPhone PWA
  useEffect(() => {
    const checkOnResume = async () => {
      if (document.visibilityState !== 'visible' || isUpdatingRef.current) return;
      const hasNewBuild = await checkRemoteAppVersion();
      if (hasNewBuild) {
        await handleHardReload();
      }
    };

    document.addEventListener('visibilitychange', checkOnResume);
    return () => {
      document.removeEventListener('visibilitychange', checkOnResume);
    };
  }, [handleHardReload]);

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
