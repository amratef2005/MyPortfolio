import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, Upload, Sliders, Check, RotateCcw, Image as ImageIcon } from 'lucide-react';
import { SignatureGlowAvatar } from './SignatureGlowAvatar';

interface ImageCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'home' | 'about';
}

export const ImageCustomizerModal: React.FC<ImageCustomizerModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'home',
}) => {
  const { profile, updateProfile, lang } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'home' | 'about'>(initialTab);

  // Home image state
  const [heroImage, setHeroImage] = useState(profile.heroAvatarUrl || '/drama_hero.png');
  const [heroScale, setHeroScale] = useState(profile.heroImageScale ?? 1);
  const [heroOffsetY, setHeroOffsetY] = useState(profile.heroImageOffsetY ?? 0);
  const [heroGlow, setHeroGlow] = useState(profile.heroGlowIntensity ?? 1);
  const [heroRings, setHeroRings] = useState(profile.heroShowRings ?? true);

  // About image state
  const [aboutImage, setAboutImage] = useState(profile.aboutAvatarUrl || profile.heroAvatarUrl || '/my_transparent.png');
  const [aboutScale, setAboutScale] = useState(profile.aboutImageScale ?? 1);
  const [aboutOffsetY, setAboutOffsetY] = useState(profile.aboutImageOffsetY ?? 0);
  const [aboutGlow, setAboutGlow] = useState(profile.aboutGlowIntensity ?? 1);
  const [aboutRings, setAboutRings] = useState(profile.aboutShowRings ?? true);

  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'home' | 'about') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (base64) {
          if (target === 'home') setHeroImage(base64);
          else setAboutImage(base64);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateProfile({
      heroAvatarUrl: heroImage,
      heroImageScale: heroScale,
      heroImageOffsetY: heroOffsetY,
      heroGlowIntensity: heroGlow,
      heroShowRings: heroRings,
      aboutAvatarUrl: aboutImage,
      aboutImageScale: aboutScale,
      aboutImageOffsetY: aboutOffsetY,
      aboutGlowIntensity: aboutGlow,
      aboutShowRings: aboutRings,
    });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  const handleReset = (target: 'home' | 'about') => {
    if (target === 'home') {
      setHeroImage('/drama_hero.png');
      setHeroScale(1);
      setHeroOffsetY(0);
      setHeroGlow(1);
      setHeroRings(true);
    } else {
      setAboutImage('/my_transparent.png');
      setAboutScale(1);
      setAboutOffsetY(0);
      setAboutGlow(1);
      setAboutRings(true);
    }
  };

  const isHome = activeTab === 'home';
  const currentImage = isHome ? heroImage : aboutImage;
  const currentScale = isHome ? heroScale : aboutScale;
  const currentOffsetY = isHome ? heroOffsetY : aboutOffsetY;
  const currentGlow = isHome ? heroGlow : aboutGlow;
  const currentRings = isHome ? heroRings : aboutRings;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-[#0c0d10] border border-theme-primary/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden my-6 text-start"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 end-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-theme-primary/10 border border-theme-primary/25 text-theme-secondary text-xs font-mono mb-2">
            <Sliders className="w-3.5 h-3.5 text-theme-primary" />
            <span>{lang === 'ar' ? 'أداة ضبط ومعالجة الصور المباشرة' : 'Live Image Controller'}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            {lang === 'ar' ? 'التحكم في صور Home و About' : 'Customize Home & About Images'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {lang === 'ar'
              ? 'قم برفع صورتك، أو تكبيرها وتصغيرها ومحاذاتها بدقة داخل الهالة الدائرية البرتقالية.'
              : 'Upload custom portraits, adjust scale, position, and tune the circular halo in real time.'}
          </p>
        </div>

        {/* Tab Switcher: Home vs About */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#14151a] border border-white/10 mb-6 max-w-md">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
              activeTab === 'home'
                ? 'bg-gradient-to-r from-theme-primary to-theme-secondary text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'ar' ? 'صورة 1 (الصفحة الأساسية - Home)' : 'Image 1 (Home Section)'}
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
              activeTab === 'about'
                ? 'bg-gradient-to-r from-theme-primary to-theme-secondary text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'ar' ? 'صورة 2 (الصفحة الثانية - About)' : 'Image 2 (About Section)'}
          </button>
        </div>

        {/* Two-Column Editor Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Live Interactive Preview */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#070709] border border-white/5 relative">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
              {lang === 'ar' ? 'المعاينة اللحظية المباشرة' : 'Live Real-Time Preview'}
            </span>

            <div className="w-full flex items-center justify-center min-h-[300px]">
              <SignatureGlowAvatar
                imageUrl={currentImage}
                alt="Live Preview"
                variant={isHome ? 'hero' : 'about'}
                scale={currentScale}
                offsetY={currentOffsetY}
                glowIntensity={currentGlow}
                showRings={currentRings}
                showEditButton={false}
              />
            </div>

            <span className="text-[10px] font-mono text-theme-secondary mt-2">
              {lang === 'ar' ? 'التغييرات تنعكس فوراً مع تحريك الأشرطة' : 'Changes reflect immediately'}
            </span>
          </div>

          {/* Right Column: Controls & Sliders */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* File Upload from PC */}
            <div className="p-4 rounded-2xl bg-[#14151a] border border-white/5 space-y-2">
              <label className="block text-xs font-mono text-white font-semibold">
                {lang === 'ar' ? 'رفع صورة جديدة من جهازك:' : 'Upload Image from Computer:'}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, activeTab)}
                className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-gradient-to-r file:from-theme-primary file:to-theme-secondary file:text-white hover:file:opacity-90 cursor-pointer"
              />

              {/* Presets */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs text-slate-400 font-mono">
                  {lang === 'ar' ? 'صور جاهزة:' : 'Presets:'}
                </span>
                <button
                  onClick={() => isHome ? setHeroImage('/drama_hero.png') : setAboutImage('/drama_hero.png')}
                  className="px-2.5 py-1 rounded-lg bg-[#1e1f26] hover:bg-theme-primary/20 text-xs text-slate-300 border border-white/5"
                >
                  drama_hero.png
                </button>
                <button
                  onClick={() => isHome ? setHeroImage('/my_transparent.png') : setAboutImage('/my_transparent.png')}
                  className="px-2.5 py-1 rounded-lg bg-[#1e1f26] hover:bg-theme-primary/20 text-xs text-slate-300 border border-white/5"
                >
                  my_transparent.png
                </button>
                <button
                  onClick={() => isHome ? setHeroImage('/my.jpg') : setAboutImage('/my.jpg')}
                  className="px-2.5 py-1 rounded-lg bg-[#1e1f26] hover:bg-theme-primary/20 text-xs text-slate-300 border border-white/5"
                >
                  my.jpg
                </button>
              </div>
            </div>

            {/* Slider 1: Scale / Zoom */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">
                  {lang === 'ar' ? 'التكبير والتصغير (Scale/Zoom)' : 'Zoom & Scale'}
                </span>
                <span className="text-theme-secondary font-bold">{Math.round(currentScale * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.7"
                max="1.4"
                step="0.02"
                value={currentScale}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  if (isHome) setHeroScale(val);
                  else setAboutScale(val);
                }}
                className="w-full accent-[var(--theme-primary)] cursor-pointer"
              />
            </div>

            {/* Slider 2: Vertical Position (Offset Y) */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">
                  {lang === 'ar' ? 'الموضع الرأسي (رفع وخفض الصورة داخل الهالة)' : 'Vertical Position (Offset Y)'}
                </span>
                <span className="text-theme-secondary font-bold">{currentOffsetY}px</span>
              </div>
              <input
                type="range"
                min="-60"
                max="60"
                step="1"
                value={currentOffsetY}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  if (isHome) setHeroOffsetY(val);
                  else setAboutOffsetY(val);
                }}
                className="w-full accent-[var(--theme-primary)] cursor-pointer"
              />
            </div>

            {/* Slider 3: Glow Intensity & Brightness */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">
                  {lang === 'ar' ? 'شدة وسطوع الهالة (Glow Intensity)' : 'Glow Intensity'}
                </span>
                <span className="text-theme-secondary font-bold">{Math.round(currentGlow * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.4"
                max="1.8"
                step="0.05"
                value={currentGlow}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  if (isHome) setHeroGlow(val);
                  else setAboutGlow(val);
                }}
                className="w-full accent-[var(--theme-primary)] cursor-pointer"
              />
            </div>

            {/* Checkbox: Show Rings */}
            <div className="flex items-center gap-3 pt-1">
              <input
                type="checkbox"
                id="orbit-rings-toggle"
                checked={currentRings}
                onChange={(e) => {
                  const checked = e.target.checked;
                  if (isHome) setHeroRings(checked);
                  else setAboutRings(checked);
                }}
                className="w-4 h-4 accent-[var(--theme-primary)] rounded cursor-pointer"
              />
              <label htmlFor="orbit-rings-toggle" className="text-xs font-mono text-slate-300 cursor-pointer">
                {lang === 'ar' ? 'إظهار الحلقات المدارية الدائرية (Orbit Accent Rings)' : 'Show Orbit Accent Rings'}
              </label>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => handleReset(activeTab)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-white/10 text-xs font-mono text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'استعادة الافتراضي' : 'Reset'}</span>
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-theme-primary to-theme-secondary hover:brightness-110 text-white font-bold text-sm shadow-[0_0_25px_rgba(var(--theme-primary-rgb),0.4)] active:scale-95 transition-all"
              >
                {saved ? <Check className="w-4 h-4 text-emerald-300" /> : <Sliders className="w-4 h-4" />}
                <span>
                  {saved 
                    ? (lang === 'ar' ? 'تم الحفظ بنجاح!' : 'Saved Successfully!') 
                    : (lang === 'ar' ? 'حفظ وتطبيق الآن' : 'Save & Apply')}
                </span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ImageCustomizerModal;
