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

    let frameId: number;
    let targetX = -1000;
    let targetY = -1000;
    let currentX = -1000;
    let currentY = -1000;
    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible && glowRef.current) {
        isVisible = true;
        glowRef.current.style.opacity = '1';
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      if (glowRef.current) {
        glowRef.current.style.opacity = '0';
      }
    };

    const updatePosition = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${Math.round(currentX)}px, ${Math.round(currentY)}px, 0) translate(-50%, -50%)`;
      }
      frameId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    frameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(frameId);
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
        className="absolute top-0 left-0 w-[440px] h-[440px] rounded-full blur-[90px] opacity-0 transition-opacity duration-500 pointer-events-none will-change-transform"
      />

      {/* Ambient Aurora Glows */}
      <div 
        style={{
          background: 'radial-gradient(circle, rgba(var(--theme-primary-rgb, 255, 87, 34), 0.16) 0%, transparent 70%)'
        }}
        className="aurora-orb aurora-orb-1 absolute -top-[10%] -right-[5%] w-[480px] sm:w-[650px] h-[480px] sm:h-[650px] rounded-full blur-[80px] sm:blur-[110px] will-change-transform" 
      />
      <div 
        style={{
          background: 'radial-gradient(circle, rgba(var(--theme-secondary-rgb, 255, 122, 0), 0.13) 0%, transparent 70%)'
        }}
        className="aurora-orb aurora-orb-2 absolute top-[28%] -left-[10%] w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] rounded-full blur-[80px] sm:blur-[120px] will-change-transform" 
      />
      <div 
        style={{
          background: 'radial-gradient(circle, rgba(var(--theme-accent-rgb, 230, 74, 25), 0.12) 0%, transparent 70%)'
        }}
        className="aurora-orb aurora-orb-3 absolute top-[55%] -right-[8%] w-[420px] sm:w-[550px] h-[420px] sm:h-[550px] rounded-full blur-[70px] sm:blur-[100px] will-change-transform" 
      />

      {/* Apple-style Frosted Micro-Dot Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:28px_28px] opacity-50" />

      {/* Smooth Ambient Vignette Fade */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,5,0.85)_100%)] pointer-events-none" />
    </div>
  );
};

export default AnimatedBackground;
