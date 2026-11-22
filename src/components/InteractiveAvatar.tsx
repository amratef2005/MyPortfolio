import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

interface InteractiveAvatarProps {
  imageSrc?: string;
}

export const InteractiveAvatar: React.FC<InteractiveAvatarProps> = ({ 
  imageSrc
}) => {
  const { lang, profile } = usePortfolio();
  const currentSrc = imageSrc || profile.heroAvatarUrl || "/drama_hero.png";
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
          {/* Ambient Glowing Spotlight Behind Silhouette dynamically tinted */}
          <motion.div 
            style={{
              x: auraX,
              y: auraY,
              transform: 'translateZ(-20px)',
              background: 'radial-gradient(circle, rgba(var(--theme-primary-rgb, 56, 189, 248), 0.32) 0%, rgba(var(--theme-secondary-rgb, 99, 102, 241), 0.22) 55%, transparent 75%)'
            }}
            className="absolute w-72 sm:w-84 h-72 sm:h-84 rounded-full blur-[75px] pointer-events-none animate-pulse-glow" 
          />

          {/* Rotating Cyber Orbital Ring Framing the Portrait */}
          <motion.div 
            style={{
              transform: 'translateZ(10px)',
              borderColor: 'rgba(var(--theme-primary-rgb, 56, 189, 248), 0.25)'
            }}
            className="absolute w-64 sm:w-76 h-64 sm:h-76 rounded-full border border-dashed pointer-events-none animate-spin-slow"
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
              src={currentSrc}
              alt={isEn ? profile.name : profile.nameAr}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/drama_hero.png";
              }}
              style={{
                filter: 'drop-shadow(0 20px 35px rgba(0,0,0,0.9)) drop-shadow(0 0 25px rgba(var(--theme-primary-rgb, 56, 189, 248), 0.3))'
              }}
              className="w-full h-full object-contain"
              loading="eager"
            />
          </motion.div>

          {/* Floating Glassmorphic Status Pill */}
          {profile.showAvailabilityBadge !== false && (
            <motion.div 
              style={{
                transform: 'translateZ(25px)',
              }}
              className="absolute bottom-2 sm:bottom-4 z-20 flex flex-col items-center text-center px-4"
            >
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border backdrop-blur-md text-xs font-mono font-semibold shadow-[0_10px_25px_-5px_rgba(0,0,0,0.8)] ${
                (profile.availabilityStatus || 'available') === 'available'
                  ? 'border-emerald-500/40 text-emerald-300'
                  : (profile.availabilityStatus === 'busy'
                    ? 'border-amber-500/40 text-amber-300'
                    : 'border-slate-700 text-slate-400')
              }`}>
                <span className="relative flex h-2 w-2 shrink-0">
                  {(profile.availabilityStatus || 'available') === 'available' && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  )}
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${
                    (profile.availabilityStatus || 'available') === 'available'
                      ? 'bg-emerald-400'
                      : (profile.availabilityStatus === 'busy' ? 'bg-amber-400' : 'bg-slate-500')
                  }`} />
                </span>
                <span>
                  {isEn
                    ? (profile.availabilityNoteEn || (
                        profile.availabilityStatus === 'busy'
                          ? 'Busy with Ongoing Projects'
                          : profile.availabilityStatus === 'offline'
                            ? 'Currently Unavailable'
                            : 'Available for High-Impact Roles'
                      ))
                    : (profile.availabilityNoteAr || (
                        profile.availabilityStatus === 'busy'
                          ? 'مشغول حالياً بمشاريع قائمة'
                          : profile.availabilityStatus === 'offline'
                            ? 'غير متاح حالياً لاستقبال مشاريع'
                            : 'جاهز للمشاريع والتحديات الهندسية'
                      ))}
                </span>
              </div>
              
              <p className="text-slate-400 text-xs font-mono mt-1.5 drop-shadow-md">
                {lang === 'ar' ? '.NET 10 • معمارية نظيفة • Supabase' : '.NET 10 • Clean Architecture • Supabase'}
              </p>
            </motion.div>
          )}
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
