import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { SignatureGlowAvatar } from './SignatureGlowAvatar';
import { AssembleItem } from './motion/KineticAssemble';
import { 
  FileDown, 
  Sparkles, 
  Heart, 
  CheckCircle2, 
  Layout, 
  Users, 
  Layers,
  Compass
} from 'lucide-react';

export const About: React.FC = () => {
  const { lang, profile, setIsCVModalOpen } = usePortfolio();

  const handleDownloadCV = () => {
    setIsCVModalOpen(true);
    setTimeout(() => {
      window.print();
    }, 350);
  };

  return (
    <section id="about" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background Subtle Orange Ambient Bloom */}
      <div 
        className="absolute top-1/2 -left-20 w-[450px] h-[450px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255, 87, 34, 0.12) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two-Column Grid: Left Portrait with Circular Orange Glow, Right Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Portrait with Signature Circular Orange Glow (Image 2) */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <AssembleItem direction="left" distance={80}>
              <SignatureGlowAvatar
                imageUrl={profile.aboutAvatarUrl || "/about_avatar.png"}
                alt={profile.name || "Amr Kandel"}
                variant="about"
                scale={profile.aboutImageScale ?? 1}
                offsetY={profile.aboutImageOffsetY ?? 0}
                glowIntensity={profile.aboutGlowIntensity ?? 1}
                showRings={profile.aboutShowRings ?? true}
                showEditButton={false}
              />
            </AssembleItem>
          </div>

          {/* Right Column: "Designing Is My Passion", Narrative & Download CV */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-start">
            <AssembleItem direction="right" distance={80}>
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121215] border border-orange-500/20 text-[#FF7A00] text-xs font-mono mb-2">
                <Heart className="w-3.5 h-3.5 text-[#FF5722] fill-[#FF5722]/20" />
                <span>{lang === 'ar' ? 'نبذة عني وشغفي' : 'About Me & Philosophy'}</span>
              </div>

              {/* Subtitle: "Designing Is My Passion" */}
              <p className="text-sm sm:text-base font-mono uppercase tracking-widest text-[#FF7A00] font-bold">
                {lang === 'ar' ? (profile.aboutSubtitleAr || 'التصميم هو شغفي وهويتي') : (profile.aboutSubtitle || 'Designing Is My Passion')}
              </p>

              {/* Section Main Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.2]">
                {lang === 'ar' ? (
                  profile.aboutHeadingAr || (
                    <>
                      تحويل الأفكار المعقدة إلى <span className="text-[#FF5722] drop-shadow-[0_0_20px_rgba(255,87,34,0.4)]">تجارب بصرية سلسة</span>
                    </>
                  )
                ) : (
                  profile.aboutHeading || (
                    <>
                      Transforming Complex Ideas Into <span className="text-[#FF5722] drop-shadow-[0_0_20px_rgba(255,87,34,0.4)]">Delightful Experiences</span>
                    </>
                  )
                )}
              </h2>

              {/* Main Bio Paragraph */}
              <p className="text-slate-300 text-base sm:text-lg leading-[1.8] mt-2">
                {lang === 'ar'
                  ? 'أنا مصممة واجهات وتجربة مستخدم (UI/UX Designer) أؤمن بأن التصميم العظيم ليس مجرد مظهر جميل، بل هو حل متقن لمشكلات حقيقية. أدمج بين الفهم العميق لسيكولوجية المستخدم، واستراتيجيات أبحاث تجربة المستخدم (UX Research)، وبناء أنظمة التصميم القابلة للتوسع (Design Systems) التي تسهم في تسريع وتوحيد لغة المنتج بين فرق التصميم والتطوير.'
                  : 'I am a passionate UI/UX Designer dedicated to crafting digital products that seamlessly bridge user needs with business goals. My work focuses on thorough user research, atomic design systems, rapid prototyping, and high-fidelity interaction design that delights users and scales effortlessly across web and mobile platforms.'}
              </p>

              {/* Core Strengths / Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3">
                <div className="p-4 rounded-2xl bg-[#0e0e12] border border-white/5 hover:border-orange-500/30 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-[#FF5722] shrink-0">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm sm:text-base">
                        {lang === 'ar' ? 'تصميم متمحور حول الإنسان' : 'Human-Centered UX'}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {lang === 'ar' ? 'أبحاث، استبيانات، واختبارات قابلية الاستخدام' : 'User personas, journey maps & usability tests'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#0e0e12] border border-white/5 hover:border-orange-500/30 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-[#FF7A00] shrink-0">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm sm:text-base">
                        {lang === 'ar' ? 'أنظمة تصميم متكاملة' : 'Scalable Design Systems'}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {lang === 'ar' ? 'مكونات متناسقة ونماذج تفاعلية عالية الدقة' : 'Design tokens, auto-layout & Figma variants'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic CV Generation & Download Button */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={handleDownloadCV}
                  className="flex items-center justify-center gap-2.5 h-12 sm:h-14 px-8 rounded-2xl bg-gradient-to-r from-[#FF5722] to-[#FF7A00] hover:from-[#FF6B00] hover:to-[#FF8A00] text-white font-bold text-base shadow-[0_0_25px_rgba(255,87,34,0.4)] hover:shadow-[0_0_40px_rgba(255,87,34,0.65)] transition-all active:scale-95 cursor-pointer"
                >
                  <FileDown className="w-5 h-5" />
                  <span>{lang === 'ar' ? 'توليد وتحميل السيرة الذاتية (PDF)' : 'Download CV (PDF)'}</span>
                </button>

                {/* Optional Smart Builder Preview Trigger */}
                <button
                  type="button"
                  onClick={() => setIsCVModalOpen(true)}
                  className="flex items-center justify-center gap-2 h-12 sm:h-14 px-6 rounded-2xl bg-[#121215] hover:bg-[#18181f] border border-white/10 text-slate-300 hover:text-white font-medium text-sm transition-colors cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#FF7A00]" />
                  <span>{lang === 'ar' ? 'معاينة وتعديل السيرة الذاتية' : 'Preview & Edit CV'}</span>
                </button>
              </div>

            </AssembleItem>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
