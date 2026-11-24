import React from 'react';
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
 * AssembleItem (High-Performance Apple/Linear Style):
 * - Smooth, subtle upward/directional emergence with zero chaotic tilt.
 * - Hardware accelerated (transform-gpu, will-change).
 * - once: true prevents annoying re-scattering on scroll and guarantees 60-120fps touch scrolling.
 */
export const AssembleItem: React.FC<AssembleItemProps> = ({
  children,
  direction = 'bottom',
  className = '',
  distance = 24,
  rotation = 0,
  delay = 0,
  style = {}
}) => {
  // Gentle, refined offset
  const getInitial = () => {
    switch (direction) {
      case 'left':
        return { x: -distance, y: 0, opacity: 0 };
      case 'right':
        return { x: distance, y: 0, opacity: 0 };
      case 'top':
        return { x: 0, y: -distance, opacity: 0 };
      case 'bottom':
        return { x: 0, y: distance, opacity: 0 };
      case 'center':
        return { x: 0, y: 0, scale: 0.95, opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={{
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 190,
          damping: 24,
          mass: 0.5,
          delay: delay
        }
      }}
      viewport={{ once: true, amount: 0.08 }}
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
 * VoidEmergence (Smooth & Chill Ambient Entrance):
 * - Clean fade-in with micro scale transition (0.97 -> 1).
 */
export const VoidEmergence: React.FC<VoidEmergenceProps> = ({
  children,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1]
        }
      }}
      viewport={{ once: true, amount: 0.1 }}
      style={{ willChange: 'transform, opacity' }}
      className={`relative transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
};
