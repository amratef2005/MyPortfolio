import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Award, GraduationCap, Code2, CheckCheck, Compass } from 'lucide-react';

export const About: React.FC = () => {
  const { lang } = usePortfolio();

  return (
    <section id="about" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-mono mb-3">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lang === 'ar' ? 'رحلتي الهندسية والمعمارية' : 'Engineering Journey'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {lang === 'ar' ? (
              <>
                شغف بناء <span className="gradient-text-cyan">الأنظمة المعقدة</span> بأعلى معايير الجودة
              </>
            ) : (
              <>
                Building <span className="gradient-text-cyan">Scalable Systems</span> With Craftsmanship
              </>
            )}
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
            {lang === 'ar' 
              ? 'خريج معهد تكنولوجيا المعلومات (ITI)، أركز على المعمارية النظيفة، تقليل زمن الاستجابة، وتأمين الأنظمة السحابية الموزعة.'
              : 'ITI Graduate focused on Clean Architecture, latency minimization, and securing multi-tenant cloud enterprise solutions.'}
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1: ITI Training */}
          <div className="glass-panel glass-panel-hover p-6 sm:p-8 rounded-3xl relative overflow-hidden group border border-slate-800/80">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2.5">
              {lang === 'ar' ? 'تدريب ITI المكثف' : 'ITI Professional Graduate'}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {lang === 'ar' 
                ? 'خريج معهد تكنولوجيا المعلومات (ITI) التابع لوزارة الاتصالات المصرية، أحد أرقى البرامج التخصصية في إعداد نخبة مهندسي البرمجيات في الشرق الأوسط.'
                : 'Graduated from Information Technology Institute (ITI), mastering core software engineering, modern .NET ecosystem, algorithms, and enterprise solution design.'}
            </p>
            <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold">
              <CheckCheck className="w-4 h-4" />
              <span>{lang === 'ar' ? 'شهادة مهنية معتمدة' : 'Accredited Certification'}</span>
            </div>
          </div>

          {/* Card 2: Clean Architecture & CQRS */}
          <div className="glass-panel glass-panel-hover p-6 sm:p-8 rounded-3xl relative overflow-hidden group border border-slate-800/80">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2.5">
              {lang === 'ar' ? 'معمارية نظيفة و DDD' : 'Clean Architecture & DDD'}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {lang === 'ar' 
                ? 'تطبيق صارم لعزل طبقات الدومين عن البنية التحتية، وتنفيذ أنماط CQRS عبر MediatR مع خط أنابيب تدقيق مخصص لضمان استقرار الكود 100%.'
                : 'Strict separation of Domain from Infrastructure, applying CQRS patterns with MediatR pipeline behaviors to guarantee resilience and maintainability.'}
            </p>
            <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs font-mono text-indigo-400 font-semibold">
              <CheckCheck className="w-4 h-4" />
              <span>{lang === 'ar' ? '0 أخطاء و 0 تحذيرات' : '0 Errors / 0 Warnings Standard'}</span>
            </div>
          </div>

          {/* Card 3: Security & Multi-Tenancy */}
          <div className="glass-panel glass-panel-hover p-6 sm:p-8 rounded-3xl relative overflow-hidden group border border-slate-800/80">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2.5">
              {lang === 'ar' ? 'أمان الجلسات و Multi-Tenancy' : 'Security & Multi-Tenancy'}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {lang === 'ar' 
                ? 'تصميم أنظمة جلسات انزلاقية (Sliding Tokens) مع تشفير SHA-256 وكشف إعادة الاستخدام، وحماية بيانات المشتركين عبر IMustHaveTenant و IDOR Prevention.'
                : 'Implementing sliding session token rotation with reuse detection, SHA-256 hashes, tenant boundary enforcement, and granular IDOR security.'}
            </p>
            <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold">
              <CheckCheck className="w-4 h-4" />
              <span>{lang === 'ar' ? 'جاهزية إنتاجية آمنة' : 'Production Grade Security'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
