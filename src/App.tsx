import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Certificates } from './components/Certificates';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { CVModal } from './components/cv/CVModal';

export const App: React.FC = () => {
  React.useEffect(() => {
    // Disable browser automatic scroll restoration and scroll to top on load
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Subtle mouse position tracking for glass card spotlights
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll<HTMLElement>('.glass-panel, .glass-card, .ios-glass');
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (
          e.clientX >= rect.left - 40 &&
          e.clientX <= rect.right + 40 &&
          e.clientY >= rect.top - 40 &&
          e.clientY <= rect.bottom + 40
        ) {
          card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
          card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <PortfolioProvider>
      <div className="relative min-h-screen text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
        {/* Subtle Living Animated Ambient Background */}
        <AnimatedBackground />

        {/* Navigation Bar */}
        <Navbar />

        {/* Core Content Flow with Harmonious Spacing */}
        <main className="space-y-4 sm:space-y-8">
          <Hero />
          <About />
          <Projects />
          <Certificates />
          <Skills />
          <Contact />
        </main>

        {/* Dynamic CV / Resume Builder Modal */}
        <CVModal />
      </div>
    </PortfolioProvider>
  );
};

export default App;
