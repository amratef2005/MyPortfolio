import React, { useState } from 'react';
import { usePortfolio } from '@/app/providers/PortfolioContext';
import { 
  Laptop, 
  Smartphone, 
  Tablet, 
  ExternalLink, 
  Layers, 
  QrCode, 
  Activity, 
  Wifi, 
  Battery, 
  Signal, 
  Search,
  ShoppingCart,
  CheckCircle2,
  TrendingUp,
  Clock
} from 'lucide-react';

export const DeviceShowcase: React.FC = () => {
  const { lang } = usePortfolio();
  const [activeDevice, setActiveDevice] = useState<'all' | 'laptop' | 'mobile' | 'tablet'>('all');

  return (
    <section id="devices" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Soft Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {lang === 'ar' ? (
              <>
                الأنظمة تعمل بكفاءة على <span className="gradient-text-cyan">الهواتف، الأجهزة اللوحية، والحواسيب</span>
              </>
            ) : (
              <>
                Engineered for <span className="gradient-text-cyan">Mobiles, Tablets, and Laptops</span>
              </>
            )}
          </h2>

          <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
            {lang === 'ar'
              ? 'معمارية مرنة تتكيف فورياً مع مختلف مقاسات الشاشات، من أحدث هواتف الآيفون والأندرويد إلى الأجهزة اللوحية وشاشات الحواسيب المكتبية.'
              : 'Fluid enterprise responsive design adapting effortlessly across modern mobile displays, tablets, laptops, and ultra-wide desktops.'}
          </p>

          {/* Device Filter Buttons */}
          <div className="mt-8 inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800/80 max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveDevice('all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all shrink-0 ${
                activeDevice === 'all'
                  ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'عرض مجمع (الكل)' : 'All Devices'}</span>
            </button>

            <button
              onClick={() => setActiveDevice('laptop')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all shrink-0 ${
                activeDevice === 'laptop'
                  ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'لابتوب (MacBook)' : 'Laptop Display'}</span>
            </button>

            <button
              onClick={() => setActiveDevice('mobile')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all shrink-0 ${
                activeDevice === 'mobile'
                  ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'موبايل (iPhone)' : 'Mobile Phone'}</span>
            </button>

            <button
              onClick={() => setActiveDevice('tablet')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all shrink-0 ${
                activeDevice === 'tablet'
                  ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'تابلت (iPad)' : 'Tablet Screen'}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Responsive Device Stage */}
        <div className="relative w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 min-h-[500px]">
          
          {/* 1. LAPTOP MOCKUP (MacBook Pro) - Showing MOT7KM Admin Dashboard */}
          {(activeDevice === 'all' || activeDevice === 'laptop') && (
            <div className={`transition-all duration-500 w-full ${activeDevice === 'laptop' ? 'max-w-4xl' : 'lg:w-7/12'} flex flex-col items-center`}>
              <div className="w-full macbook-frame overflow-hidden">
                {/* Browser Top Bar */}
                <div className="bg-[#12161f] px-4 py-2.5 flex items-center justify-between border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block" />
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block" />
                    <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block" />
                  </div>
                  {/* URL Bar */}
                  <div className="bg-[#0b0e14] px-4 py-1 rounded-md text-[11px] font-mono text-slate-400 border border-white/5 flex items-center gap-2 w-1/2 max-w-sm justify-center">
                    <span className="text-emerald-400">🔒</span>
                    <span className="truncate">https://admin.mot7km.com/dashboard/overview</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-xs">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-[10px] font-mono hidden sm:inline text-cyan-400">SignalR Active</span>
                  </div>
                </div>

                {/* Dashboard Screen Content */}
                <div className="p-4 sm:p-6 bg-[#080b12] text-white font-cairo space-y-4">
                  {/* Top Dashboard Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-white flex items-center gap-2">
                        <span>MOT7KM &bull; لوحة الإدارة المركزية</span>
                        <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-mono">Multi-Tenant</span>
                      </h4>
                      <p className="text-[11px] text-slate-400 font-mono">الفرع النشط: الفرع الرئيسي (القاهرة)</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 animate-pulse" />
                        <span>14 طلب نشط بالمطبخ</span>
                      </div>
                    </div>
                  </div>

                  {/* 3 Metric Cards */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    <div className="p-2.5 sm:p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="text-[10px] sm:text-xs text-slate-400 block font-mono">زيارات الـ QR الحية</span>
                      <span className="text-sm sm:text-xl font-bold text-cyan-400 font-mono">4,892</span>
                      <span className="text-[9px] sm:text-[10px] text-emerald-400 font-mono block mt-0.5">+24.5% هذا الأسبوع</span>
                    </div>

                    <div className="p-2.5 sm:p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="text-[10px] sm:text-xs text-slate-400 block font-mono">إجمالي المبيعات</span>
                      <span className="text-sm sm:text-xl font-bold text-white font-mono">84,320 ج.م</span>
                      <span className="text-[9px] sm:text-[10px] text-cyan-400 font-mono block mt-0.5">زمن الاستجابة &lt;20ms</span>
                    </div>

                    <div className="p-2.5 sm:p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="text-[10px] sm:text-xs text-slate-400 block font-mono">رؤى الذكاء الاصطناعي</span>
                      <span className="text-xs sm:text-sm font-bold text-indigo-400 block truncate">عرض كومبو العشاء</span>
                      <span className="text-[9px] sm:text-[10px] text-slate-400 font-mono block mt-0.5">توصية ذكية نشطة</span>
                    </div>
                  </div>

                  {/* Orders & Menu Mini Preview */}
                  <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span className="font-semibold text-slate-200">طلب جديد #1092 عبر QR Code الطاولة 7</span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded">مكتمل تلقائياً</span>
                  </div>
                </div>
              </div>
              {/* MacBook Base */}
              <div className="w-[102%] macbook-base" />
              <p className="text-[11px] font-mono text-slate-400 mt-3 text-center">
                💻 {lang === 'ar' ? 'واجهة لوحة التحكم على شاشات الحواسيب المكتبية والمحمولة' : 'Admin Dashboard on Desktop & Laptop screens'}
              </p>
            </div>
          )}

          {/* 2. MOBILE PHONE MOCKUP (iPhone 16 Pro) - Showing Public QR Menu */}
          {(activeDevice === 'all' || activeDevice === 'mobile') && (
            <div className={`transition-all duration-500 flex flex-col items-center ${activeDevice === 'mobile' ? 'w-full max-w-sm' : 'lg:w-4/12'}`}>
              <div className="w-[285px] sm:w-[310px] iphone-frame p-2.5 relative">
                {/* Physical Glass Glare Specular Reflection */}
                <div className="iphone-glare" />

                {/* iPhone Screen Container */}
                <div className="rounded-[38px] bg-[#070a10] overflow-hidden border border-white/10 h-[530px] flex flex-col justify-between relative shadow-inner">
                  {/* Subtle Screen Ambient Aurora Wallpaper */}
                  <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/40 via-cyan-950/20 to-[#070a10] pointer-events-none" />
                  <div className="absolute -top-8 -right-8 w-36 h-36 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute top-44 -left-8 w-36 h-36 bg-purple-500/15 rounded-full blur-2xl pointer-events-none" />

                  {/* Status Bar with Dynamic Island */}
                  <div className="px-5 pt-3 pb-2 flex items-center justify-between text-white text-[10px] font-mono relative z-10">
                    <span className="font-semibold text-white/90">9:41</span>
                    <div className="dynamic-island flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
                      <span className="text-[9px] text-slate-200 font-sans font-medium">QR Menu</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Signal className="w-3 h-3" />
                      <Wifi className="w-3 h-3" />
                      <Battery className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Public QR Menu Header (Frosted Glass) */}
                  <div className="p-3 bg-slate-900/50 backdrop-blur-xl border-b border-white/10 relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-white text-xs shadow-md">
                          M
                        </div>
                        <div>
                          <h5 className="font-bold text-xs text-white">مطعم الشيف الإيطالي</h5>
                          <p className="text-[9px] text-cyan-400 font-mono">طاولة رقم 04 &bull; منيو سريع</p>
                        </div>
                      </div>
                      <span className="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">مفتوح</span>
                    </div>

                    {/* Search & Category Pills (iOS Frosted Glass Pills) */}
                    <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                      <span className="px-2.5 py-1 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-bold shrink-0 shadow-sm">الأطباق الرئيسية</span>
                      <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-slate-200 text-[10px] shrink-0">المقبلات</span>
                      <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-slate-200 text-[10px] shrink-0">المشروبات</span>
                    </div>
                  </div>

                  {/* Food Item Cards Preview (Apple Frosted Glass) */}
                  <div className="p-3 space-y-2.5 flex-1 overflow-y-auto relative z-10">
                    <div className="p-2.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-between transition-all">
                      <div>
                        <h6 className="font-bold text-xs text-white">بيتزا ترافل إيطالية</h6>
                        <p className="text-[10px] text-slate-300 line-clamp-1">جبن موزاريلا، فطر بري، صوص ترافل</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-bold text-cyan-400 font-mono">195 ج.م</span>
                          <span className="text-[8px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded-full">حساسية ألبان</span>
                        </div>
                      </div>
                      <button className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold text-[10px] shadow-sm">
                        طلب +
                      </button>
                    </div>

                    <div className="p-2.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-between transition-all">
                      <div>
                        <h6 className="font-bold text-xs text-white">باستا فيتوتشيني ألفريدو</h6>
                        <p className="text-[10px] text-slate-300 line-clamp-1">كريمة طازجة، دجاج مشوي، بارميزان</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-bold text-cyan-400 font-mono">160 ج.م</span>
                          <span className="text-[8px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded-full">الأكثر طلباً</span>
                        </div>
                      </div>
                      <button className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold text-[10px] shadow-sm">
                        طلب +
                      </button>
                    </div>
                  </div>

                  {/* iOS Floating Bottom Glass Dock */}
                  <div className="relative z-10 px-3 pb-2 pt-1">
                    <div className="p-2 rounded-2xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 shadow-lg flex items-center justify-around text-slate-300 text-[10px]">
                      <span className="text-cyan-400 font-bold">المنيو</span>
                      <span>العروض</span>
                      <span>طلباتي (1)</span>
                      <span>الفاتورة</span>
                    </div>
                    {/* Apple Home Indicator */}
                    <div className="home-indicator" />
                  </div>
                </div>
              </div>
              <p className="text-[11px] font-mono text-slate-400 mt-3 text-center">
                📱 {lang === 'ar' ? 'منيو الويب التفاعلي فائق السرعة عبر مسح الـ QR للهواتف الذكية' : 'Public QR Interactive Web Menu on Mobile Phones'}
              </p>
            </div>
          )}

          {/* 3. TABLET MOCKUP (iPad Pro) - Showing StudySync Academic Platform */}
          {activeDevice === 'tablet' && (
            <div className="transition-all duration-500 w-full max-w-2xl flex flex-col items-center">
              <div className="w-full rounded-[28px] border-4 border-slate-800 bg-[#090d16] p-3 shadow-2xl">
                <div className="rounded-[20px] bg-dark-950 border border-slate-800 p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h4 className="font-bold text-base text-white">منصة StudySync &bull; بوابة الأستاذ الجامعي</h4>
                      <p className="text-xs text-slate-400 font-mono">مقرر: هندسة البرمجيات المتقدمة (.NET 10)</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-bold">
                      49 Tests Passing 100%
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-xs text-slate-400 block">الطلاب المسجلين</span>
                      <span className="text-xl font-bold text-white font-mono">148</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-xs text-slate-400 block">نسبة الحضور الذكي</span>
                      <span className="text-xl font-bold text-emerald-400 font-mono">96.4%</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-xs text-slate-400 block">رمز الـ QR للمحاضرة</span>
                      <span className="text-xs font-mono text-cyan-400 block mt-1">نشط (صالح لـ 90 ثانية)</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-[11px] font-mono text-slate-400 mt-3 text-center">
                📟 {lang === 'ar' ? 'واجهة التابلت للأجهزة اللوحية والتعليم الأكاديمي' : 'Tablet View for Academic & Enterprise users'}
              </p>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
