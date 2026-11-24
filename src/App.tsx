import React from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Certificates } from './components/Certificates';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CVModal } from './components/cv/CVModal';
import { AdminDashboard } from './admin/AdminDashboard';

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

export const App: React.FC = () => {
  React.useEffect(() => {
    // Disable browser automatic scroll restoration and scroll to top on load
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // High-performance spotlight: ONLY compute for the card actively hovered (Zero reflow on scroll)
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const card = target.closest<HTMLElement>('.glass-panel, .glass-card, .ios-glass');
      if (card) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <PortfolioProvider>
      <div className="relative min-h-screen text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
        {/* Living Animated Ambient Background (Direct GPU Driven) */}
        <AnimatedBackground />

        {/* Navigation Bar */}
        <Navbar />

        {/* Core Content Flow with Compact Professional Mobile Spacing */}
        <main className="space-y-0">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Certificates />
          <Skills />
          <Contact />
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Global Admin Keyboard Shortcut Handler */}
        <AdminShortcutHandler />

        {/* Dynamic CV / Resume Builder Modal */}
        <CVModal />

        {/* Admin Dashboard CMS Modal */}
        <AdminDashboard />
      </div>
    </PortfolioProvider>
  );
};

export default App;
