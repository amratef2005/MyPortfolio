import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Camera, Sliders } from 'lucide-react';

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
  alt = 'UI/UX Designer Profile',
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

  // Smooth mouse tilt & parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const auraX = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);
  const auraY = useTransform(smoothY, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex items-center justify-center select-none ${containerSizes} ${className}`}
      style={{ perspective: 1000 }}
    >
      {/* 1. Deep Core Radiant Aura Bloom (Signature Circular Orange Glow) */}
      <motion.div
        style={{ x: auraX, y: auraY, opacity: Math.min(1.5, Math.max(0.3, glowIntensity)) }}
        className={`absolute rounded-full pointer-events-none ${auraSizes} z-0`}
      >
        {/* Intense Core Glow */}
        <div 
          className="w-full h-full rounded-full animate-breathe"
          style={{
            background: 'radial-gradient(circle, rgba(255, 87, 34, 0.85) 0%, rgba(255, 122, 0, 0.55) 38%, rgba(230, 74, 25, 0.3) 60%, transparent 75%)',
            filter: `blur(${Math.round(45 * glowIntensity)}px)`,
          }}
        />

        {/* Ambient Outer Halo */}
        <div 
          className="absolute inset-[-20%] rounded-full opacity-70 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255, 107, 0, 0.4) 0%, rgba(255, 61, 0, 0.15) 50%, transparent 70%)',
            filter: `blur(${Math.round(70 * glowIntensity)}px)`,
          }}
        />
      </motion.div>

      {/* 2. Concentric Orbit Accent Rings */}
      {showRings && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
          {/* Main Frame Circle */}
          <div 
            className={`rounded-full border border-orange-500/30 ${
              isHero ? 'w-[270px] h-[270px] xs:w-[320px] xs:h-[320px] sm:w-[390px] sm:h-[390px]' : 'w-[250px] h-[250px] sm:w-[330px] sm:h-[330px]'
            } shadow-[0_0_40px_rgba(255,87,34,0.35),inset_0_0_30px_rgba(255,122,0,0.15)]`}
          />
          {/* Outer Dashed Orbit */}
          <div 
            className={`absolute rounded-full border border-dashed border-orange-400/20 animate-spin-slow ${
              isHero ? 'w-[310px] h-[310px] xs:w-[360px] xs:h-[360px] sm:w-[440px] sm:h-[440px]' : 'w-[290px] h-[290px] sm:w-[370px] sm:h-[370px]'
            }`}
          />
        </div>
      )}

      {/* 3. The Portrait Silhouette Frame */}
      <motion.div
        style={{ rotateX, rotateY }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        className="relative z-10 w-full h-full flex items-end justify-center overflow-visible"
      >
        <img
          src={imageUrl}
          alt={alt}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = '/my_transparent.png';
          }}
          style={{
            transform: `scale(${scale}) translateY(${offsetY}px)`,
            transformOrigin: 'bottom center',
          }}
          className="max-h-full w-auto object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] filter brightness-105 contrast-105 transition-transform duration-200 pointer-events-none"
        />

        {/* Bottom subtle gradient fade to anchor with page */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent pointer-events-none" />
      </motion.div>

      {/* 4. On-Avatar Quick Edit Trigger Button */}
      {showEditButton && onEditClick && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEditClick();
          }}
          className="absolute top-3 end-3 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#050505]/85 hover:bg-gradient-to-r hover:from-[#FF5722] hover:to-[#FF7A00] border border-orange-500/40 text-[#FF7A00] hover:text-white text-xs font-mono font-bold shadow-[0_0_20px_rgba(255,87,34,0.45)] backdrop-blur-md transition-all duration-300 hover:scale-105 cursor-pointer"
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
