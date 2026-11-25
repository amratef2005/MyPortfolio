import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Camera } from 'lucide-react';

interface SignatureGlowAvatarProps {
  imageUrl?: string;
  alt?: string;
  variant?: 'hero' | 'about' | 'nav';
  className?: string;
  showRings?: boolean;
  scale?: number;
  offsetY?: number;
  glowIntensity?: number;
  showEditButton?: boolean;
  onEditClick?: () => void;
}

export const SignatureGlowAvatar: React.FC<SignatureGlowAvatarProps> = ({
  imageUrl = '/drama_hero.png',
  alt = 'Amr Atef - .NET Backend Developer',
  variant = 'hero',
  className = '',
  showRings = true,
  scale = 1,
  offsetY = 0,
  glowIntensity = 1,
  showEditButton = false,
  onEditClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsFinePointer(window.matchMedia('(pointer: fine)').matches);
    }
  }, []);

  // Smooth mouse tilt & parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-7, 7]);
  const auraX = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);
  const auraY = useTransform(smoothY, [-0.5, 0.5], [-14, 14]);
  const lightX = useTransform(smoothX, [-0.5, 0.5], [-28, 28]);
  const lightY = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);

  const handleMouseEnter = () => {
    if (!isFinePointer || !containerRef.current) return;
    rectRef.current = containerRef.current.getBoundingClientRect();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isFinePointer || !containerRef.current) return;
    const rect = rectRef.current || containerRef.current.getBoundingClientRect();
    rectRef.current = rect;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    mouseX.set(0);
    mouseY.set(0);
  };

  // Dimensions based on variant
  const isHero = variant === 'hero';
  const isAbout = variant === 'about';

  const containerSizes = isHero
    ? 'w-[300px] h-[340px] xs:w-[350px] xs:h-[400px] sm:w-[420px] sm:h-[480px] lg:w-[450px] lg:h-[520px]'
    : isAbout
    ? 'w-[280px] h-[320px] xs:w-[320px] xs:h-[370px] sm:w-[380px] sm:h-[440px]'
    : 'w-10 h-10';

  const auraSizes = isHero
    ? 'w-[260px] h-[260px] xs:w-[310px] xs:h-[310px] sm:w-[380px] sm:h-[380px]'
    : 'w-[240px] h-[240px] sm:w-[320px] sm:h-[320px]';

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex items-center justify-center select-none ${containerSizes} ${className}`}
      style={{ perspective: 1000 }}
    >
      {/* 1. Optimized Studio Backlight Aura (Soft radial gradients, low-cost GPU blur) */}
      <motion.div
        style={{
          x: isFinePointer ? auraX : 0,
          y: isFinePointer ? auraY : 0,
          opacity: Math.min(1.5, Math.max(0.3, glowIntensity)),
        }}
        className={`absolute rounded-full pointer-events-none ${auraSizes} z-0`}
      >
        {/* Core Radiance + Outer Studio Bloom merged */}
        <div
          className="w-full h-full rounded-full animate-breathe"
          style={{
            background:
              'radial-gradient(circle at 50% 42%, rgba(var(--theme-secondary-rgb), 0.85) 0%, rgba(var(--theme-primary-rgb), 0.52) 34%, rgba(var(--theme-accent-rgb), 0.18) 58%, transparent 74%)',
            filter: `blur(${Math.min(34, Math.round(26 * glowIntensity))}px)`,
          }}
        />
        {/* Subtle Top-Down Keylight Halo */}
        <div
          className="absolute -top-12 inset-x-0 h-36 opacity-55 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(var(--theme-secondary-rgb), 0.55) 0%, rgba(var(--theme-primary-rgb), 0.18) 50%, transparent 75%)',
          }}
        />
      </motion.div>

      {/* 2. Concentric Orbit Accent Rings with Specular Light */}
      {showRings && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
          {/* Main Frame Circle with Glowing Theme Border */}
          <div 
            className={`rounded-full border border-theme-primary/35 ${
              isHero ? 'w-[270px] h-[270px] xs:w-[320px] xs:h-[320px] sm:w-[390px] sm:h-[390px]' : 'w-[250px] h-[250px] sm:w-[330px] sm:h-[330px]'
            } shadow-[0_0_45px_rgba(var(--theme-primary-rgb),0.45),inset_0_0_35px_rgba(var(--theme-secondary-rgb),0.2)]`}
          />
          {/* Outer Dashed Orbit with Cinematic Shimmer */}
          <div 
            className={`absolute rounded-full border border-dashed border-theme-secondary/25 animate-spin-slow ${
              isHero ? 'w-[310px] h-[310px] xs:w-[360px] xs:h-[360px] sm:w-[440px] sm:h-[440px]' : 'w-[290px] h-[290px] sm:w-[370px] sm:h-[370px]'
            }`}
          />
        </div>
      )}

      {/* 3. Portrait Silhouette + Feathered Edges + Cinematic Face Lighting */}
      <motion.div
        style={isFinePointer ? { rotateX, rotateY } : undefined}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        className="relative z-10 w-full h-full flex items-end justify-center overflow-visible"
      >
        {/* Isolated & Feathered Portrait Container (melts any rectangular PNG edges) */}
        <div
          className="relative w-full h-full flex items-end justify-center"
          style={{
            isolation: 'isolate',
            maskImage:
              'radial-gradient(ellipse 76% 84% at 50% 48%, black 56%, transparent 96%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 76% 84% at 50% 48%, black 56%, transparent 96%)',
          }}
        >
          {/* Main Portrait with Balanced Cinematic Color Grading */}
          <img
            src={imageUrl}
            alt={alt}
            loading={isHero ? 'eager' : 'lazy'}
            fetchPriority={isHero ? 'high' : 'auto'}
            decoding="async"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = '/my_transparent.png';
            }}
            style={{
              transform: `scale(${scale}) translateY(${offsetY}px)`,
              transformOrigin: 'bottom center',
              filter: 'contrast(1.06) saturate(1.04) brightness(1.01)',
            }}
            className="max-h-full w-auto object-contain object-bottom transition-transform duration-200 pointer-events-none relative z-10"
          />

          {/* Masked Foreground Cinematic Lighting (Clips strictly to face/body silhouette) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none z-20 overflow-hidden"
            style={{
              transform: `scale(${scale}) translateY(${offsetY}px)`,
              transformOrigin: 'bottom center',
              maskImage: `url(${imageUrl})`,
              WebkitMaskImage: `url(${imageUrl})`,
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              maskPosition: 'bottom center',
              WebkitMaskPosition: 'bottom center',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
            }}
          >
            {/* Focused Theme Key Light on face & cheekbone (mouse-reactive on desktop) */}
            <motion.div
              style={{
                x: isFinePointer ? lightX : 0,
                y: isFinePointer ? lightY : 0,
                background:
                  'radial-gradient(ellipse 46% 40% at 58% 30%, rgba(var(--theme-secondary-rgb), 0.36) 0%, rgba(var(--theme-primary-rgb), 0.16) 48%, transparent 78%)',
                mixBlendMode: 'soft-light',
              }}
              className="absolute inset-[-8%]"
            />

            {/* Subtle Theme Rim Light along right shoulder & cheek without washing out hair */}
            <div
              style={{
                background:
                  'radial-gradient(ellipse 35% 58% at 78% 48%, rgba(var(--theme-secondary-rgb), 0.24) 0%, transparent 70%)',
                mixBlendMode: 'soft-light',
              }}
              className="absolute inset-0"
            />

            {/* Subtle Cool Teal Shadow Fill on opposite side for Teal & Orange contrast */}
            <div
              style={{
                background:
                  'radial-gradient(ellipse 52% 60% at 20% 44%, rgba(56, 189, 248, 0.16) 0%, transparent 65%)',
                mixBlendMode: 'soft-light',
              }}
              className="absolute inset-0"
            />
          </div>
        </div>

        {/* Smooth Bottom Fade to anchor suit seamlessly into page background */}
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent pointer-events-none z-30" />
      </motion.div>

      {/* 4. On-Avatar Quick Edit Trigger Button */}
      {showEditButton && onEditClick && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEditClick();
          }}
          className="absolute top-3 end-3 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#050505]/85 hover:bg-gradient-to-r hover:from-theme-primary hover:to-theme-secondary border border-theme-primary/40 text-theme-secondary hover:text-white text-xs font-mono font-bold shadow-[0_0_20px_rgba(var(--theme-primary-rgb),0.45)] backdrop-blur-md transition-all duration-300 hover:scale-105 cursor-pointer"
          title="تعديل وضبط الصورة"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>تعديل الصورة</span>
        </button>
      )}
    </div>
  );
};

export default SignatureGlowAvatar;
