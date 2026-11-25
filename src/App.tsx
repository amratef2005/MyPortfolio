import React, { Suspense } from 'react';
import { MotionConfig } from 'framer-motion';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';

// Code-splitting & Lazy loading for below-the-fold sections & heavy modals
const LazyExperience = React.lazy(() =>
  import('./components/Experience').then(module => ({ default: module.Experience }))
);
const LazyProjects = React.lazy(() =>
  import('./components/Projects').then(module => ({ default: module.Projects }))
);
const LazyCertificates = React.lazy(() =>
  import('./components/Certificates').then(module => ({ default: module.Certificates }))
);
const LazySkills = React.lazy(() =>
  import('./components/Skills').then(module => ({ default: module.Skills }))
);
const LazyContact = React.lazy(() =>
  import('./components/Contact').then(module => ({ default: module.Contact }))
);
const LazyFooter = React.lazy(() =>
  import('./components/Footer').then(module => ({ default: module.Footer }))
);
const LazyCVModal = React.lazy(() =>
  import('./components/cv/CVModal').then(module => ({ default: module.CVModal }))
);
const LazyAdminDashboard = React.lazy(() =>
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
      <PortfolioProvider>
        <div className="relative min-h-screen text-slate-100 selection:bg-theme-primary/30 selection:text-theme-secondary">
          {/* Living Animated Ambient Background (Direct GPU Driven) */}
          <AnimatedBackground />

          {/* Navigation Bar */}
          <Navbar />

          {/* Core Content Flow with Compact Professional Mobile Spacing */}
          <main className="space-y-0">
            <Hero />
            <About />
            <Suspense fallback={null}>
              <div className="defer-section"><LazyExperience /></div>
              <div className="defer-section"><LazyProjects /></div>
              <div className="defer-section"><LazyCertificates /></div>
              <div className="defer-section"><LazySkills /></div>
              <div className="defer-section"><LazyContact /></div>
            </Suspense>
          </main>

          {/* Global Footer */}
          <Suspense fallback={null}>
            <div className="defer-section"><LazyFooter /></div>
          </Suspense>

          {/* Global Admin Keyboard Shortcut Handler */}
          <AdminShortcutHandler />

          {/* Dynamic Modals loaded strictly on-demand */}
          <ModalsContainer />
        </div>
      </PortfolioProvider>
    </MotionConfig>
  );
};

export default App;
