import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Award, GraduationCap, Code2, CheckCheck, Compass, Users } from 'lucide-react';
import { AssembleItem } from './motion/KineticAssemble';

export const About: React.FC = () => {
  const { lang, profile } = usePortfolio();

  return (
    <section id="about" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Assembles from Top and disperses up */}
        <AssembleItem direction="top" className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-mono mb-3">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>{lang === 'ar' ? 'رحلتي الأكاديمية والهندسية' : 'Engineering & Academic Journey'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              {lang === 'ar' ? (
                <>
                  شغف بناء <span className="gradient-text-cyan">الأنظمة القابلة للتوسع</span> بأعلى المعايير
                </>
              ) : (
                <>
                  Designing & Developing <span className="gradient-text-cyan">Scalable Systems</span> With Craftsmanship
                </>
              )}
            </h2>
            <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
              {lang === 'ar' 
                ? 'طالب علوم حاسب ومطور نظم خلفية .NET، أركز على المعمارية النظيفة (Clean Architecture)، أنماط CQRS، وبناء أنظمة سحابية متعددة المستأجرين آمنة وعالية الكفاءة.'
                : 'Computer Science student and .NET Backend Developer focused on Clean Architecture, CQRS patterns, secure multi-tenant SaaS, and scalable cloud APIs.'}
            </p>
          </div>
        </AssembleItem>

        {/* 3 Pillars Grid: Left Card flies in from Left, Center from Depth, Right from Right */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch mb-8">
          {/* Card 1: Academic & Computer Science Foundation */}
          <AssembleItem direction="left" distance={130} rotation={4} className="h-full">
            <div className="glass-panel glass-panel-hover p-6 sm:p-8 rounded-3xl relative overflow-hidden group border border-slate-800/80 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2.5">
                  {lang === 'ar' ? 'جامعة قناة السويس - علوم حاسب' : 'Computer Science Foundation'}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {lang === 'ar' 
                    ? 'طالب بالفرقة الرابعة بكلية العلوم – جامعة قناة السويس (برنامج الرياضيات وعلوم الحاسب). دراسة أكاديمية متعمقة في الخوارزميات، هياكل البيانات، وقواعد البيانات العلائقية ومبادئ هندسة البرمجيات.'
                    : 'Fourth-year Computer Science student at Suez Canal University, Faculty of Science (B.Sc. in Mathematics – Computer Science Program). Solid theoretical and algorithmic groundwork for software engineering.'}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold">
                <CheckCheck className="w-4 h-4" />
                <span>{lang === 'ar' ? 'بكالوريوس العلوم (الفرقة الرابعة)' : 'B.Sc. In Progress (Fourth Year)'}</span>
              </div>
            </div>
          </AssembleItem>

          {/* Card 2: Clean Architecture & CQRS */}
          <AssembleItem direction="center" className="h-full">
            <div className="glass-panel glass-panel-hover p-6 sm:p-8 rounded-3xl relative overflow-hidden group border border-slate-800/80 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2.5">
                  {lang === 'ar' ? 'معمارية نظيفة ونمط CQRS' : 'Clean Architecture & CQRS'}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {lang === 'ar' 
                    ? 'فصل صارم بين طبقات الدومين والتطبيق والبنية التحتية، ونمط Modular Monolith، واستخدام أنماط CQRS لتنظيم ومعالجة الأوامر والاستعلامات بكفاءة مع اختبارات مؤتمتة بنسبة نجاح 100%.'
                    : 'Strict separation of Domain, Application, Infrastructure, and Presentation layers. Modular Monolith design, CQRS pattern, and automated testing achieving 49 passing tests with a 100% pass rate.'}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs font-mono text-indigo-400 font-semibold">
                <CheckCheck className="w-4 h-4" />
                <span>{lang === 'ar' ? '49 اختباراً مؤتمتاً ناجحاً (100%)' : '49 Automated Tests (100% Pass)'}</span>
              </div>
            </div>
          </AssembleItem>

          {/* Card 3: Security & Multi-Tenancy */}
          <AssembleItem direction="right" distance={130} rotation={4} className="h-full">
            <div className="glass-panel glass-panel-hover p-6 sm:p-8 rounded-3xl relative overflow-hidden group border border-slate-800/80 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2.5">
                  {lang === 'ar' ? 'الأمان وتعدد المستأجرين (SaaS)' : 'SaaS Multi-Tenancy & Security'}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {lang === 'ar' 
                    ? 'تصميم أنظمة جلسات انزلاقية (Sliding Expiration) مع تدوير الـ Refresh Tokens وتشفيرها بـ SHA-256 وكشف إعادة الاستخدام، وعزل بيانات المشتركين تلقائياً ومنع ثغرات IDOR.'
                    : 'Engineered sliding session token rotation, token reuse detection, SHA-256 token hashing, strict multi-tenant isolation, JWT/OAuth/OTP authentication, and IDOR prevention.'}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold">
                <CheckCheck className="w-4 h-4" />
                <span>{lang === 'ar' ? 'حماية وعزل بيانات عالي الأمان' : 'Production-Grade Security'}</span>
              </div>
            </div>
          </AssembleItem>
        </div>

        {/* Teamwork & Collaboration Banner */}
        <AssembleItem direction="bottom" distance={60}>
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/80 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/90">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-1 md:mt-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 flex items-center gap-2">
                    <span>{lang === 'ar' ? 'العمل الجماعي والتعاون البرمجي' : 'Teamwork & Collaboration'}</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      Cross-Functional
                    </span>
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
                    {lang === 'ar'
                      ? 'العمل ضمن فرق تطوير برمجية متكاملة تضم مطوري Backend و Mobile و Frontend؛ تولي مسؤولية معمارية النظام الخلفي، تطوير الـ APIs، وتكامل قواعد البيانات، مع المشاركة الفعالة في المناقشات والقرارات الهندسية.'
                      : 'Worked in development teams of Backend, Mobile, and Frontend developers. Took responsibility for backend architecture, API development, and database integration while collaborating to integrate backend services and contributing to technical decisions.'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0 self-stretch md:self-auto justify-end">
                <span className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-mono">
                  {lang === 'ar' ? 'تكامل API سلس' : 'Smooth API Integration'}
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-mono">
                  {lang === 'ar' ? 'قرارات معمارية مشتركة' : 'Architectural Discussions'}
                </span>
              </div>
            </div>
          </div>
        </AssembleItem>
      </div>
    </section>
  );
};
