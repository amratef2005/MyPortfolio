import React, { Suspense, ComponentType } from 'react';
import { MotionConfig } from 'framer-motion';
import { PortfolioProvider, usePortfolio } from '@/app/providers/PortfolioContext';
import { AnimatedBackground } from '@shared/ui/AnimatedBackground';
import { SectionErrorBoundary } from '@shared/ui/SectionErrorBoundary';
import { Navbar, Hero, About, Footer } from '@modules/portfolio';

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

// Code-splitting & Lazy loading by module boundary
const LazyExperience = lazyWithRetry(() =>
  import('@modules/portfolio/components/Experience').then((m) => ({ default: m.Experience }))
);
const LazyProjects = lazyWithRetry(() =>
  import('@modules/portfolio/components/Projects').then((m) => ({ default: m.Projects }))
);
const LazyCertificates = lazyWithRetry(() =>
  import('@modules/portfolio/components/Certificates').then((m) => ({ default: m.Certificates }))
);
const LazySkills = lazyWithRetry(() =>
  import('@modules/portfolio/components/Skills').then((m) => ({ default: m.Skills }))
);
const LazyContact = lazyWithRetry(() =>
  import('@modules/contact/components/Contact').then((m) => ({ default: m.Contact }))
);
const LazyCVModal = lazyWithRetry(() =>
  import('@modules/cv/components/CVModal').then((m) => ({ default: m.CVModal }))
);
const LazyAdminDashboard = lazyWithRetry(() =>
  import('@modules/admin/shells/AdminModalShell').then((m) => ({ default: m.AdminModalShell }))
);

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
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

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
            <AnimatedBackground />
            <Navbar />

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

            <div className="defer-section relative z-10"><Footer /></div>
            <AdminShortcutHandler />

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
