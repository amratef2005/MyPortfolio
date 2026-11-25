import React, { Suspense, ComponentType } from 'react';
import { MotionConfig } from 'framer-motion';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { SectionErrorBoundary } from './components/SectionErrorBoundary';

/** Retries failed dynamic imports once before surfacing to ErrorBoundary (helps flaky mobile 4G). */
function lazyWithRetry<T extends ComponentType<any>>(
  loader: () => Promise<{ default: T }>
) {
  return React.lazy(async () => {
    try {
      return await loader();
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 450));
      return loader();
    }
  });
}

// Code-splitting & Lazy loading for heavy below-the-fold sections & modals
const LazyExperience = lazyWithRetry(() =>
  import('./components/Experience').then(module => ({ default: module.Experience }))
);
const LazyProjects = lazyWithRetry(() =>
  import('./components/Projects').then(module => ({ default: module.Projects }))
);
const LazyCertificates = lazyWithRetry(() =>
  import('./components/Certificates').then(module => ({ default: module.Certificates }))
);
const LazySkills = lazyWithRetry(() =>
  import('./components/Skills').then(module => ({ default: module.Skills }))
);
const LazyContact = lazyWithRetry(() =>
  import('./components/Contact').then(module => ({ default: module.Contact }))
);
const LazyCVModal = lazyWithRetry(() =>
  import('./components/cv/CVModal').then(module => ({ default: module.CVModal }))
);
const LazyAdminDashboard = lazyWithRetry(() =>
  import('./admin/AdminDashboard').then(module => ({ default: module.AdminDashboard }))
);

// Global keyboard shortcut to open Admin Panel (Ctrl+Shift+A or Cmd+Shift+A)
const AdminShortcutHandler: React.FC = () => {
  const { setIsAdminOpen } = usePortfolio();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsAdminOpen]);

  return null;
};

// Lazy Modals Manager
const ModalsContainer: React.FC = () => {
  const { isCVModalOpen, isAdminOpen } = usePortfolio();

  return (
    <Suspense fallback={null}>
      {isCVModalOpen && <LazyCVModal />}
      {isAdminOpen && <LazyAdminDashboard />}
    </Suspense>
  );
};

export const App: React.FC = () => {
  React.useEffect(() => {
    // Disable browser automatic scroll restoration and scroll to top on load
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // High-performance spotlight: ONLY compute for desktop pointers, throttled via rAF
    const isFinePointer = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;
    if (isFinePointer) {
      let rafId: number | null = null;
      let latestEvent: MouseEvent | null = null;

      const updateSpotlight = () => {
        rafId = null;
        if (!latestEvent) return;
        const target = latestEvent.target as HTMLElement | null;
        if (!target) return;
        const card = target.closest<HTMLElement>('.glass-panel, .glass-card, .ios-glass');
        if (card) {
          const rect = card.getBoundingClientRect();
          card.style.setProperty('--mouse-x', `${latestEvent.clientX - rect.left}px`);
          card.style.setProperty('--mouse-y', `${latestEvent.clientY - rect.top}px`);
        }
      };

      const handleMouseMove = (e: MouseEvent) => {
        latestEvent = e;
        if (rafId === null) {
          rafId = requestAnimationFrame(updateSpotlight);
        }
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
        }
      };
    }
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <SectionErrorBoundary>
        <PortfolioProvider>
          <div className="relative min-h-screen text-slate-100 selection:bg-theme-primary/30 selection:text-theme-secondary">
            {/* Living Animated Ambient Background (Direct GPU Driven) */}
            <AnimatedBackground />

            {/* Navigation Bar */}
            <Navbar />

            {/* Core Content Flow with Compact Professional Mobile Spacing */}
            <main className="relative z-10 space-y-0">
              <Hero />
              <About />
              <SectionErrorBoundary>
                <Suspense fallback={null}>
                  <div className="defer-section"><LazyExperience /></div>
                  <div className="defer-section"><LazyProjects /></div>
                  <div className="defer-section"><LazyCertificates /></div>
                  <div className="defer-section"><LazySkills /></div>
                  <div className="defer-section"><LazyContact /></div>
                </Suspense>
              </SectionErrorBoundary>
            </main>

            {/* Global Footer (Statically Bundled for Instant Bottom Scroll Availability) */}
            <div className="defer-section relative z-10"><Footer /></div>

            {/* Global Admin Keyboard Shortcut Handler */}
            <AdminShortcutHandler />

            {/* Dynamic Modals loaded strictly on-demand */}
            <SectionErrorBoundary>
              <ModalsContainer />
            </SectionErrorBoundary>
          </div>
        </PortfolioProvider>
      </SectionErrorBoundary>
    </MotionConfig>
  );
};

export default App;
