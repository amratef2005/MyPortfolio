import React, { useRef, useState, useEffect } from 'react';
import { motion, MotionStyle } from 'framer-motion';

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
 * AssembleItem (High-Performance GPU-Accelerated):
 * - Uses Framer Motion whileInView with hardware-accelerated transforms.
 * - When entering viewport: Snappily flies in & converges from edges into position.
 * - When in reading viewport: 100% assembled, stable, interactive, zero lag.
 * - When scrolling past/away: Quickly scatters/disperses outward.
 */
export const AssembleItem: React.FC<AssembleItemProps> = ({
  children,
  direction = 'bottom',
  className = '',
  distance = 70,
  rotation = 3,
  delay = 0,
  style = {}
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const effDistance = isMobile ? Math.min(distance * 0.4, 25) : distance;
  const effRot = isMobile ? 0 : rotation;

  // Initial / Scatter Out State (Periphery)
  const getInitial = () => {
    switch (direction) {
      case 'left':
        return { x: -effDistance, y: 0, rotate: -effRot, scale: 0.96, opacity: 0 };
      case 'right':
        return { x: effDistance, y: 0, rotate: effRot, scale: 0.96, opacity: 0 };
      case 'top':
        return { x: 0, y: -effDistance * 0.7, rotate: 0, scale: 0.97, opacity: 0 };
      case 'bottom':
        return { x: 0, y: effDistance * 0.7, rotate: 0, scale: 0.97, opacity: 0 };
      case 'center':
        return { x: 0, y: 0, rotate: 0, scale: 0.88, opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={{
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 220,
          damping: 22,
          mass: 0.6,
          delay: isMobile ? 0 : delay
        }
      }}
      viewport={{ once: false, amount: 0.12 }}
      style={{
        willChange: 'transform, opacity',
        ...style
      }}
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
 * VoidEmergence (High-Performance):
 * - Initial load: Smooth, fast emergence from darkness in 0.5s.
 * - Scroll down: Quickly fades out into darkness when leaving view.
 */
export const VoidEmergence: React.FC<VoidEmergenceProps> = ({
  children,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1]
        }
      }}
      viewport={{ once: false, amount: 0.25 }}
      style={{ willChange: 'transform, opacity' }}
      className={`relative transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
};
