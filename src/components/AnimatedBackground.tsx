import React, { useEffect, useRef } from 'react';

/**
 * AnimatedBackground (High-Performance GPU Transform):
 * Uses direct DOM transform updates via requestAnimationFrame to achieve
 * a solid 60-120 FPS with ZERO React component re-renders.
 */
export const AnimatedBackground: React.FC = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    let frameId: number | null = null;
    let targetX = -1000;
    let targetY = -1000;
    let currentX = -1000;
    let currentY = -1000;
    let isVisible = false;

    const updatePosition = () => {
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      currentX += dx * 0.14;
      currentY += dy * 0.14;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${Math.round(currentX)}px, ${Math.round(currentY)}px, 0) translate(-50%, -50%)`;
      }

      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        frameId = requestAnimationFrame(updatePosition);
      } else {
        frameId = null;
      }
    };

    const scheduleFrame = () => {
      if (frameId === null) {
        frameId = requestAnimationFrame(updatePosition);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible && glowRef.current) {
        isVisible = true;
        currentX = targetX;
        currentY = targetY;
        glowRef.current.style.opacity = '1';
      }
      scheduleFrame();
    };

    const onMouseLeave = () => {
      isVisible = false;
      if (glowRef.current) {
        glowRef.current.style.opacity = '0';
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Base Deep Midnight Canvas */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Gentle Interactive Mouse Follower Glow (Direct GPU transform) */}
      <div
        ref={glowRef}
        style={{
          background: 'radial-gradient(circle, rgba(var(--theme-primary-rgb, 255, 87, 34), 0.16) 0%, rgba(var(--theme-secondary-rgb, 255, 122, 0), 0.08) 55%, transparent 75%)'
        }}
        className="absolute top-0 left-0 w-[440px] h-[440px] rounded-full blur-[56px] opacity-0 transition-opacity duration-500 pointer-events-none will-change-transform"
      />

      {/* Ambient Aurora Glows (Optimized sizing & blur for 60-120 FPS) */}
      <div 
        style={{
          background: 'radial-gradient(circle, rgba(var(--theme-primary-rgb, 255, 87, 34), 0.14) 0%, transparent 70%)'
        }}
        className="aurora-orb aurora-orb-1 absolute -top-[10%] -right-[5%] w-[320px] sm:w-[650px] h-[320px] sm:h-[650px] rounded-full blur-[40px] sm:blur-[64px]" 
      />
      <div 
        style={{
          background: 'radial-gradient(circle, rgba(var(--theme-secondary-rgb, 255, 122, 0), 0.11) 0%, transparent 70%)'
        }}
        className="aurora-orb aurora-orb-2 absolute top-[28%] -left-[10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full blur-[40px] sm:blur-[68px]" 
      />
      <div 
        style={{
          background: 'radial-gradient(circle, rgba(var(--theme-accent-rgb, 230, 74, 25), 0.10) 0%, transparent 70%)'
        }}
        className="aurora-orb aurora-orb-3 absolute top-[55%] -right-[8%] w-[280px] sm:w-[550px] h-[280px] sm:h-[550px] rounded-full blur-[36px] sm:blur-[60px]" 
      />

      {/* Apple-style Frosted Micro-Dot Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:28px_28px] opacity-50" />

      {/* Smooth Ambient Vignette Fade */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,5,0.85)_100%)] pointer-events-none" />
    </div>
  );
};

export default AnimatedBackground;
