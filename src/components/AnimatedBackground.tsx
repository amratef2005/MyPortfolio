import React, { useEffect, useState } from 'react';

/**
 * AnimatedBackground
 * Provides an organic, elegant ambient background with subtle flowing colors,
 * an Apple-inspired frosted grid texture, and a gentle mouse follower ambient light.
 */
export const AnimatedBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isPointerActive, setIsPointerActive] = useState(false);

  useEffect(() => {
    // Only track fine pointer devices (mice / trackpads), not touch screens
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    let frameId: number;
    let targetX = -1000;
    let targetY = -1000;
    let currentX = -1000;
    let currentY = -1000;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isPointerActive) setIsPointerActive(true);
    };

    const onMouseLeave = () => {
      setIsPointerActive(false);
    };

    // Smooth lerp (0.07) for graceful, buttery trailing light
    const updatePosition = () => {
      currentX += (targetX - currentX) * 0.07;
      currentY += (targetY - currentY) * 0.07;
      setMousePos({ x: Math.round(currentX), y: Math.round(currentY) });
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
  }, [isPointerActive]);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Base Deep Midnight Canvas */}
      <div className="absolute inset-0 bg-[#030712]" />

      {/* Gentle Interactive Mouse Follower Glow (Subtle and Soft) */}
      <div
        className="absolute w-[460px] h-[460px] rounded-full bg-gradient-to-tr from-cyan-500/10 via-sky-500/6 to-indigo-500/6 blur-[110px] -translate-x-1/2 -translate-y-1/2 will-change-transform transition-opacity duration-700 pointer-events-none"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          opacity: isPointerActive ? 1 : 0,
        }}
      />

      {/* Aurora Blob 1: Electric Cyan & Sky Blue */}
      <div className="aurora-orb aurora-orb-1 absolute -top-[10%] -right-[5%] w-[500px] sm:w-[720px] h-[500px] sm:h-[720px] rounded-full bg-gradient-to-br from-cyan-500/16 via-sky-500/10 to-transparent blur-[90px] sm:blur-[130px] will-change-transform" />

      {/* Aurora Blob 2: Vibrant Indigo & Royal Violet */}
      <div className="aurora-orb aurora-orb-2 absolute top-[28%] -left-[10%] w-[480px] sm:w-[680px] h-[480px] sm:h-[680px] rounded-full bg-gradient-to-tr from-indigo-600/16 via-purple-500/10 to-transparent blur-[90px] sm:blur-[140px] will-change-transform" />

      {/* Aurora Blob 3: Mint Teal & Aqua Glow */}
      <div className="aurora-orb aurora-orb-3 absolute top-[55%] -right-[8%] w-[450px] sm:w-[640px] h-[450px] sm:h-[640px] rounded-full bg-gradient-to-bl from-teal-500/12 via-cyan-400/8 to-transparent blur-[80px] sm:blur-[120px] will-change-transform" />

      {/* Aurora Blob 4: Deep Sapphire & Electric Blue */}
      <div className="aurora-orb aurora-orb-4 absolute bottom-[-5%] left-[15%] w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full bg-gradient-to-t from-blue-600/14 via-indigo-500/8 to-transparent blur-[90px] sm:blur-[130px] will-change-transform" />

      {/* Aurora Blob 5: Subtle Magenta & Pink Sheen */}
      <div className="aurora-orb aurora-orb-5 absolute top-[12%] left-[25%] w-[380px] sm:w-[500px] h-[380px] sm:h-[500px] rounded-full bg-gradient-to-tr from-fuchsia-500/8 via-pink-500/5 to-transparent blur-[100px] sm:blur-[130px] will-change-transform" />

      {/* Apple-style Frosted Micro-Dot Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px] opacity-60" />

      {/* Smooth Ambient Vignette Fade */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(3,7,18,0.7)_100%)] pointer-events-none" />
    </div>
  );
};

export default AnimatedBackground;
