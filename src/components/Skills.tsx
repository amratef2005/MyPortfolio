import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Cpu, Server, Database, Cloud, Code } from 'lucide-react';

export const Skills: React.FC = () => {
  const { skills, lang } = usePortfolio();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Server': return <Server className="w-5 h-5 text-cyan-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-indigo-400" />;
      case 'Database': return <Database className="w-5 h-5 text-emerald-400" />;
      case 'Cloud': return <Cloud className="w-5 h-5 text-amber-400" />;
      default: return <Code className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-mono mb-3">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lang === 'ar' ? 'الترسانة التقنية' : 'Technical Arsenal'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {lang === 'ar' ? (
              <>
                المهارات والأدوات <span className="gradient-text-cyan">المستخدمة في المشاريع</span>
              </>
            ) : (
              <>
                Skills & <span className="gradient-text-cyan">Core Technologies</span>
              </>
            )}
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
            {lang === 'ar'
              ? 'أحدث معايير تطوير الويب والنظم الموزعة وفق بيئة .NET 10 الحديثة وقواعد البيانات المتقدمة.'
              : 'Modern web enterprise standards utilizing .NET 10, Clean Architecture, and high-performance databases.'}
          </p>
        </div>

        {/* Skills Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {skills.map((category, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/80 hover:border-slate-700 transition-all text-start"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                  {getIcon(category.icon)}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {lang === 'ar' ? category.nameAr : category.name}
                </h3>
              </div>

              {/* Skill Bars & Tags */}
              <div className="space-y-4">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-200 font-semibold">{skill.name}</span>
                      <span className="text-cyan-400">{skill.tag || `${skill.level}%`}</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800/50">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
