import React, { useState } from 'react';
import { motion, MotionStyle, Variants } from 'framer-motion';

export type AssembleDirection = 'left' | 'right' | 'top' | 'bottom' | 'center';

/**
 * Shared Motion System Constants:
 * - Expo-out curve for calm, deliberate, visually perceptible reveals.
 * - Higher viewport threshold (0.18) + subtle base delay so visitors clearly catch every transition.
 */
export const MOTION_EASE = [0.22, 1, 0.36, 1] as const;
export const MOTION_VIEWPORT = { once: true, amount: 0.18 } as const;

interface AssembleItemProps {
  children: React.ReactNode;
  direction?: AssembleDirection;
  className?: string;
  distance?: number;
  rotation?: number;
  delay?: number;
  duration?: number;
  amount?: number;
  style?: MotionStyle;
}

/**
 * AssembleItem:
 * - Restrained directional entrance synchronized with reading flow & deliberate delay.
 * - GPU-only transform & opacity transitions for steady 60-120 FPS scrolling.
 */
export const AssembleItem: React.FC<AssembleItemProps> = ({
  children,
  direction = 'bottom',
  className = '',
  distance = 22,
  delay = 0.12,
  duration = 0.78,
  amount = 0.18,
  style = {}
}) => {
  const [settled, setSettled] = useState(false);

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
        return { x: 0, y: 0, scale: 0.96, opacity: 0 };
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
          duration,
          delay,
          ease: MOTION_EASE,
        }
      }}
      viewport={{ once: true, amount }}
      onAnimationComplete={() => setSettled(true)}
      style={{
        willChange: settled ? 'auto' : 'transform, opacity',
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
  delay?: number;
  duration?: number;
}

/**
 * VoidEmergence:
 * - Clean fade-in with gentle micro scale settle (0.985 -> 1).
 */
export const VoidEmergence: React.FC<VoidEmergenceProps> = ({
  children,
  className = '',
  delay = 0.08,
  duration = 0.8
}) => {
  const [settled, setSettled] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.985 }}
      whileInView={{
        opacity: 1,
        scale: 1,
        transition: {
          duration,
          delay,
          ease: MOTION_EASE
        }
      }}
      viewport={MOTION_VIEWPORT}
      onAnimationComplete={() => setSettled(true)}
      style={{ willChange: settled ? 'auto' : 'transform, opacity' }}
      className={`relative transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
};

interface StaggerGroupProps {
  children: React.ReactNode;
  className?: string;
  mode?: 'inView' | 'mount';
  delay?: number;
  stagger?: number;
  amount?: number;
}

/**
 * StaggerGroup:
 * - Coordinates sibling elements so they appear sequentially in visual reading order.
 * - Use mode="mount" for above-the-fold Hero choreography, and "inView" below the fold.
 */
export const StaggerGroup: React.FC<StaggerGroupProps> = ({
  children,
  className = '',
  mode = 'inView',
  delay = 0.14,
  stagger = 0.1,
  amount = 0.16,
}) => {
  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  };

  if (mode === 'mount') {
    return (
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps {
  children: React.ReactNode;
  direction?: AssembleDirection;
  distance?: number;
  duration?: number;
  className?: string;
}

/**
 * StaggerItem:
 * - Child item inside StaggerGroup for synchronized cascading entrance.
 */
export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  direction = 'bottom',
  distance = 20,
  duration = 0.72,
  className = '',
}) => {
  const hiddenState =
    direction === 'left'
      ? { opacity: 0, x: -distance, y: 0 }
      : direction === 'right'
      ? { opacity: 0, x: distance, y: 0 }
      : direction === 'top'
      ? { opacity: 0, x: 0, y: -distance }
      : direction === 'center'
      ? { opacity: 0, scale: 0.96 }
      : { opacity: 0, x: 0, y: distance };

  const variants: Variants = {
    hidden: hiddenState,
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration,
        ease: MOTION_EASE,
      },
    },
  };

  return (
    <motion.div variants={variants} className={`transform-gpu ${className}`}>
      {children}
    </motion.div>
  );
};

interface AnimatedProgressBarProps {
  level: number;
  delay?: number;
  isRtl?: boolean;
  className?: string;
}

/**
 * AnimatedProgressBar:
 * - GPU-driven scaleX progress bar fill triggered when entering the viewport,
 *   delayed slightly so the fill motion is clearly noticeable after card reveal.
 */
export const AnimatedProgressBar: React.FC<AnimatedProgressBarProps> = ({
  level,
  delay = 0.24,
  isRtl = false,
  className = '',
}) => {
  const normalizedScale = Math.max(0, Math.min(1, level / 100));

  return (
    <div className={`w-full h-1.5 rounded-full bg-[#18181f] overflow-hidden ${className}`}>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: normalizedScale }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.95, delay, ease: MOTION_EASE }}
        style={{ transformOrigin: isRtl ? 'right center' : 'left center' }}
        className="w-full h-full rounded-full bg-gradient-to-r from-theme-primary to-theme-secondary shadow-[0_0_10px_rgba(var(--theme-primary-rgb),0.5)] transform-gpu"
      />
    </div>
  );
};
