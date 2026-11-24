import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Cpu, 
  Sparkles, 
  Globe, 
  Palette, 
  Smartphone, 
  Layers, 
  Camera, 
  TrendingUp, 
  Code,
  Layout
} from 'lucide-react';
import { AssembleItem } from './motion/KineticAssemble';

export const Skills: React.FC = () => {
  const { skills, profile, lang } = usePortfolio();

  // The 6 Integrated Services mentioned in the design description
  const services = [
    {
      icon: <Globe className="w-6 h-6 text-[#FF5722]" />,
      titleAr: "تطوير وتصميم الويب",
      titleEn: "Web Design & Development",
      descAr: "تصميم واجهات وتجارب مواقع ويب عصرية وسريعة الاستجابة ومتوافقة مع كافة الشاشات.",
      descEn: "Crafting modern, ultra-responsive web interfaces with cutting-edge visual hierarchy."
    },
    {
      icon: <Palette className="w-6 h-6 text-[#FF7A00]" />,
      titleAr: "تصميم الجرافيك والهوية",
      titleEn: "Graphic Design & Branding",
      descAr: "بناء هويات بصرية مميزة، لوحات ألوان، ونظم تيبوغرافي تعكس شخصية وقيم البراند.",
      descEn: "Building distinctive visual identities, brand guidelines, and balanced color palettes."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-[#FF5722]" />,
      titleAr: "التسويق الرقمي وتجربة التحويل",
      titleEn: "Digital Marketing & CRO",
      descAr: "تحسين معدلات التحويل وتصميم صفحات هبوط (Landing Pages) تضاعف مبيعات وتفاعل الزوار.",
      descEn: "Conversion rate optimization (CRO) and high-impact landing page design."
    },
    {
      icon: <Layers className="w-6 h-6 text-[#FF7A00]" />,
      titleAr: "تصميم الأيقونات والأنظمة",
      titleEn: "Iconography & Design Systems",
      descAr: "رسم أيقونات مخصصة بالبكسل وبناء مكتبات مكونات قابلة لإعادة الاستخدام في فيجما.",
      descEn: "Pixel-perfect custom icon packs and reusable design token libraries in Figma."
    },
    {
      icon: <Camera className="w-6 h-6 text-[#FF5722]" />,
      titleAr: "التصوير ومعالجة الوسائط",
      titleEn: "Photography & Media Editing",
      descAr: "إخراج ومعالجة الصور الترويجية والمنتجات بجودة سينمائية فائقة التباين.",
      descEn: "High-contrast product photography, visual grading, and creative media curation."
    },
    {
      icon: <Smartphone className="w-6 h-6 text-[#FF7A00]" />,
      titleAr: "تصميم تطبيقات الموبايل",
      titleEn: "Mobile App UI/UX",
      descAr: "هندسة رحلات مستخدم سلسة لنظامي iOS و Android مع مراعاة إرشادات التصميم العالمية.",
      descEn: "Seamless iOS and Android user journeys adhering strictly to HIG & Material Design."
    }
  ];

  // Default skills with big percentages if not already populated
  const displaySkills = [
    { name: "Figma & UI/UX", level: 95 },
    { name: "Design Systems", level: 92 },
    { name: "HTML & Semantic Web", level: 90 },
    { name: "CSS & Tailwind CSS", level: 88 },
    { name: "Wireframing & Prototyping", level: 85 },
    { name: "JavaScript & Interactivity", level: 80 },
    { name: "User Research & Usability", level: 85 },
    { name: "Adobe Creative Suite", level: 82 }
  ];

  return (
    <section id="skills" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Ambient Radial Lighting */}
      <div 
        className="absolute top-1/4 -left-20 w-[450px] h-[450px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255, 87, 34, 0.12) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <AssembleItem direction="top">
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121215] border border-orange-500/20 text-[#FF7A00] text-xs font-mono mb-3">
              <Cpu className="w-3.5 h-3.5 text-[#FF5722]" />
              <span>{lang === 'ar' ? 'المهارات والقدرات التقنية' : 'Skills & Capabilities'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.2]">
              {lang === 'ar' ? (
                <>
                  أدوات احترافية بنسب إتقان <span className="text-[#FF5722] drop-shadow-[0_0_20px_rgba(255,87,34,0.4)]">عالية ودقيقة</span>
                </>
              ) : (
                <>
                  Technical Mastery Measured in <span className="text-[#FF5722] drop-shadow-[0_0_20px_rgba(255,87,34,0.4)]">Bold Percentages</span>
                </>
              )}
            </h2>
            <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
              {lang === 'ar'
                ? 'مزيج متكامل بين الحس الجمالي، التفكير الهندسي، وإتقان أدوات التصميم وبرمجة الواجهات الأمامية.'
                : 'A hybrid blend of user-centric aesthetic mastery, structured design thinking, and frontend prototyping.'}
            </p>
          </div>
        </AssembleItem>

        {/* Highlight Card: Bio Intro + Years of Experience in Big Orange */}
        <AssembleItem direction="top" distance={50}>
          <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-[#0e0e12] border border-orange-500/25 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
            <div className="text-start max-w-2xl">
              <h3 className="text-xl font-bold text-white mb-2">
                {lang === 'ar' ? 'خبرة عملية مبنية على الممارسة المستمرة' : 'Continuous Craftsmanship & Evolution'}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {lang === 'ar'
                  ? 'من خلال العمل على منتجات واقعية، طوّرت مهارات عميقة في تحويل المتطلبات إلى مكونات قابلة لإعادة الاستخدام، واختبار نماذج التفاعل، وبناء شاشات متجاوبة بنسبة 100% مع معايير الـ W3C وإمكانية الوصول (Accessibility).'
                  : 'Over years of hands-on delivery, I have refined the ability to translate high-level vision into scalable components, robust atomic design libraries, and verified accessibility standards.'}
              </p>
            </div>

            {/* Big Orange Number */}
            <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-orange-500/10 border border-orange-500/30 shrink-0">
              <span className="text-5xl sm:text-6xl font-black text-[#FF5722] font-mono drop-shadow-[0_0_20px_rgba(255,87,34,0.5)]">
                +{profile.yearsOfExperience || 3}
              </span>
              <div className="flex flex-col text-start">
                <span className="text-white font-bold text-sm">
                  {lang === 'ar' ? 'سنوات من الإبداع' : 'Years Experience'}
                </span>
                <span className="text-xs text-[#FF7A00] font-mono">
                  {lang === 'ar' ? 'تصميم واجهات وتطوير' : 'UI/UX & Prototyping'}
                </span>
              </div>
            </div>
          </div>
        </AssembleItem>

        {/* Skills with Big Percentages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {displaySkills.map((skill, idx) => (
            <AssembleItem key={idx} direction="top" distance={40 + idx * 10}>
              <div className="p-6 rounded-3xl bg-[#0e0e12] border border-white/10 hover:border-orange-500/40 transition-all duration-300 group relative overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.6)]">
                {/* Big Orange Percentage Number */}
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-4xl sm:text-5xl font-black text-[#FF5722] font-mono group-hover:text-[#FF7A00] transition-colors drop-shadow-[0_0_15px_rgba(255,87,34,0.3)]">
                    {skill.level}%
                  </span>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5722] group-hover:scale-125 transition-transform" />
                </div>

                {/* Skill Name */}
                <h4 className="text-base sm:text-lg font-bold text-white mb-3">
                  {skill.name}
                </h4>

                {/* Progress Track */}
                <div className="w-full h-2 rounded-full bg-[#18181f] overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-[#FF5722] to-[#FF7A00] transition-all duration-1000 shadow-[0_0_10px_rgba(255,87,34,0.5)]"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            </AssembleItem>
          ))}
        </div>

        {/* Integrated Services Sub-Section ("My Services") */}
        <div className="pt-8 border-t border-white/10">
          <AssembleItem direction="top">
            <div className="text-start mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#FF7A00] text-xs font-mono mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'الخدمات التي أقدمها' : 'Specialized Services'}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {lang === 'ar' ? 'حلول تصميم رقمية متكاملة' : 'Full-Spectrum Digital Services'}
              </h3>
            </div>
          </AssembleItem>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, sIdx) => (
              <AssembleItem key={sIdx} direction="top" distance={50 + sIdx * 10}>
                <div className="p-6 rounded-3xl bg-[#0e0e12] border border-white/5 hover:border-orange-500/30 transition-all duration-300 group h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      {service.icon}
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-[#FF7A00] transition-colors">
                      {lang === 'ar' ? service.titleAr : service.titleEn}
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {lang === 'ar' ? service.descAr : service.descEn}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-white/5 flex items-center gap-1.5 text-xs font-mono text-[#FF5722]">
                    <span>{lang === 'ar' ? 'خدمة احترافية' : 'Premium Delivery'}</span>
                    <span className="text-[#FF7A00]">&rarr;</span>
                  </div>
                </div>
              </AssembleItem>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
