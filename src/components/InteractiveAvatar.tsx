import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

interface InteractiveAvatarProps {
  imageSrc?: string;
}

export const InteractiveAvatar: React.FC<InteractiveAvatarProps> = ({ 
  imageSrc = "/my_transparent.png" 
}) => {
  const { lang, profile } = usePortfolio();
  const isEn = lang === 'en';
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  // Motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for gentle, organic feel
  const springX = useSpring(x, { stiffness: 60, damping: 18 });
  const springY = useSpring(y, { stiffness: 60, damping: 18 });

  // Transforms for very subtle tilt (gentle 3.5 degrees, no extreme rotation)
  const rotateX = useTransform(springY, [-0.5, 0.5], [3.5, -3.5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-3.5, 3.5]);
  
  // Very subtle parallax translation (only 4px shift)
  const avatarX = useTransform(springX, [-0.5, 0.5], [-4, 4]);
  const avatarY = useTransform(springY, [-0.5, 0.5], [-4, 4]);

  // Ambient aura subtle shift
  const auraX = useTransform(springX, [-0.5, 0.5], [4, -4]);
  const auraY = useTransform(springY, [-0.5, 0.5], [4, -4]);

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseXRel = (clientX - rect.left) / rect.width - 0.5;
    const mouseYRel = (clientY - rect.top) / rect.height - 0.5;

    x.set(mouseXRel);
    y.set(mouseYRel);
    setIsHovered(true);
    setCoords({
      x: Number((mouseXRel * 15).toFixed(1)),
      y: Number((-mouseYRel * 15).toFixed(1))
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    handlePointerMove(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  return (
    <div className="relative flex flex-col items-center w-full max-w-[420px] mx-auto select-none">
      {/* 3D Perspective Stage - Completely borderless, integrated directly into the page */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onTouchEnd={handleMouseLeave}
        className="relative w-full h-[430px] sm:h-[480px] flex items-center justify-center cursor-pointer"
        style={{ perspective: 1200 }}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d"
          }}
          className="relative w-full h-full flex flex-col items-center justify-center"
        >
          {/* Ambient Glowing Spotlight Behind Silhouette */}
          <motion.div 
            style={{
              x: auraX,
              y: auraY,
              transform: 'translateZ(-20px)',
            }}
            className="absolute w-72 sm:w-84 h-72 sm:h-84 rounded-full bg-gradient-to-tr from-cyan-500/25 via-blue-600/20 to-indigo-500/20 blur-[75px] pointer-events-none animate-pulse-glow" 
          />

          {/* Rotating Cyber Orbital Ring Framing the Portrait */}
          <motion.div 
            style={{
              transform: 'translateZ(10px)',
            }}
            className="absolute w-64 sm:w-76 h-64 sm:h-76 rounded-full border border-dashed border-cyan-500/20 pointer-events-none animate-spin-slow"
          />

          {/* The Silhouette Image with Seamless Bottom Fade */}
          <motion.div
            style={{
              x: avatarX,
              y: avatarY,
              transform: 'translateZ(20px)',
              transformStyle: 'preserve-3d',
              maskImage: 'linear-gradient(to bottom, black 72%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 72%, transparent 100%)'
            }}
            className="relative w-[320px] sm:w-[380px] h-[360px] sm:h-[420px] flex items-center justify-center pointer-events-none"
          >
            <img
              src={imageSrc}
              alt={isEn ? profile.name : profile.nameAr}
              className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] drop-shadow-[0_0_25px_rgba(56,189,248,0.25)]"
              loading="eager"
            />
          </motion.div>

          {/* Floating Glassmorphic Status Pill */}
          <motion.div 
            style={{
              transform: 'translateZ(25px)',
            }}
            className="absolute bottom-2 sm:bottom-4 z-20 flex flex-col items-center text-center px-4"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md text-cyan-400 text-xs font-mono font-semibold shadow-[0_10px_25px_-5px_rgba(0,0,0,0.8)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span>{isEn ? 'Available for High-Impact Roles' : 'جاهز للمشاريع والتحديات الهندسية'}</span>
            </div>
            
            <p className="text-slate-400 text-xs font-mono mt-1.5 drop-shadow-md">
              .NET 10 • Clean Architecture • Supabase
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle Interaction Hint */}
      <div className="mt-2 flex items-center gap-2 text-[11px] font-mono text-slate-500 text-center">
        <span className={`w-1.5 h-1.5 rounded-full transition-colors ${isHovered ? 'bg-cyan-400 shadow-[0_0_8px_#38bdf8]' : 'bg-slate-700'}`} />
        <span>
          {isHovered 
            ? (lang === 'ar' ? 'تفاعل هادئ متناسق' : 'Subtle Responsive Motion') 
            : (lang === 'ar' ? 'تفاعل هادئ مع حركة الماوس' : 'Gentle mouse reactive')}
        </span>
      </div>
    </div>
  );
};
