import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionStyle } from 'framer-motion';

export type AssembleDirection = 'left' | 'right' | 'top' | 'bottom' | 'center';

interface AssembleItemProps {
  children: React.ReactNode;
  direction?: AssembleDirection;
  className?: string;
  distance?: number;
  rotation?: number;
  delay?: number;
  style?: MotionStyle;
}

/**
 * AssembleItem:
 * - When scrolling into view: Elements fly in & assemble from the periphery (Left, Right, Top, Bottom, or Center).
 * - In reading viewport: Fully assembled (x: 0, y: 0, opacity: 1, scale: 1, rotate: 0).
 * - When scrolling past/away: Disperses/scatters outward to the edges.
 */
export const AssembleItem: React.FC<AssembleItemProps> = ({
  children,
  direction = 'bottom',
  className = '',
  distance = 110,
  rotation = 4,
  style = {}
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Adaptive distance and rotation for mobile
  const effectiveDistance = isMobile ? Math.min(distance * 0.35, 40) : distance;
  const effectiveRot = isMobile ? Math.min(rotation * 0.4, 2) : rotation;

  // Track item's own scroll progress relative to viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 95%', 'end 5%']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.6
  });

  // Calculate transform ranges based on direction:
  // [startEntering (0.0), fullyAssembled (0.28), startLeaving (0.76), fullyDispersed (1.0)]
  const progressBreakpoints = [0, 0.28, 0.76, 1];

  let xRange = [0, 0, 0, 0];
  let yRange = [0, 0, 0, 0];
  let rotRange = [0, 0, 0, 0];
  let scaleRange = [1, 1, 1, 1];

  switch (direction) {
    case 'left':
      xRange = [-effectiveDistance, 0, 0, -effectiveDistance * 1.3];
      rotRange = [-effectiveRot, 0, 0, -effectiveRot * 1.5];
      scaleRange = [0.94, 1, 1, 0.94];
      break;
    case 'right':
      xRange = [effectiveDistance, 0, 0, effectiveDistance * 1.3];
      rotRange = [effectiveRot, 0, 0, effectiveRot * 1.5];
      scaleRange = [0.94, 1, 1, 0.94];
      break;
    case 'top':
      yRange = [-effectiveDistance * 0.7, 0, 0, -effectiveDistance * 0.9];
      rotRange = [0, 0, 0, 0];
      scaleRange = [0.96, 1, 1, 0.96];
      break;
    case 'bottom':
      yRange = [effectiveDistance * 0.7, 0, 0, effectiveDistance * 0.9];
      rotRange = [0, 0, 0, 0];
      scaleRange = [0.96, 1, 1, 0.96];
      break;
    case 'center':
      scaleRange = [0.84, 1, 1, 1.08];
      rotRange = [-effectiveRot * 0.5, 0, 0, effectiveRot * 0.5];
      break;
  }

  // Smooth transforms
  const x = useTransform(smoothProgress, progressBreakpoints, xRange);
  const y = useTransform(smoothProgress, progressBreakpoints, yRange);
  const rotate = useTransform(smoothProgress, progressBreakpoints, rotRange);
  const scale = useTransform(smoothProgress, progressBreakpoints, scaleRange);
  const opacity = useTransform(smoothProgress, [0, 0.22, 0.82, 1], [0, 1, 1, 0]);

  const motionStyle: MotionStyle = {
    x,
    y,
    rotate,
    scale,
    opacity,
    willChange: 'transform, opacity',
    ...style
  };

  return (
    <motion.div
      ref={ref}
      style={motionStyle}
      className={`transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
};

interface VoidEmergenceProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * VoidEmergence:
 * Dedicated to the Hero section (Portrait & Introduction).
 * - Initial state: Emerges dramatically from pitch darkness / void on mount.
 * - Scroll down: Gradually dissolves and fades out into darkness.
 */
export const VoidEmergence: React.FC<VoidEmergenceProps> = ({
  children,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track Hero scrolling out through the top of the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24
  });

  // Fade out into darkness as user scrolls down past Hero
  const scrollOpacity = useTransform(smoothProgress, [0, 0.65, 1], [1, 0.4, 0]);
  const scrollY = useTransform(smoothProgress, [0, 1], [0, -70]);
  const scrollScale = useTransform(smoothProgress, [0, 1], [1, 0.92]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Dark Void Veil that dissolves away upon initial mount */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none fixed inset-0 z-50 bg-[#030712]"
      />

      {/* Hero Content with emergence from darkness and scroll fade-out */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, filter: 'blur(14px) brightness(0.2)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px) brightness(1)' }}
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        style={{
          opacity: scrollOpacity,
          y: scrollY,
          scale: scrollScale,
          willChange: 'transform, opacity, filter'
        }}
        className="transform-gpu w-full"
      >
        {children}
      </motion.div>
    </div>
  );
};
