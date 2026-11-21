import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Award, Download, Eye } from 'lucide-react';
import { AssembleItem } from './motion/KineticAssemble';

export const Certificates: React.FC = () => {
  const { certificates, lang } = usePortfolio();

  return (
    <section id="certificates" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Assembles from Top */}
        <AssembleItem direction="top">
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-mono mb-3">
              <Award className="w-3.5 h-3.5 text-cyan-400" />
              <span>{lang === 'ar' ? 'الشهادات المعتمدة والاعتمادات' : 'Accreditations & Certificates'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              {lang === 'ar' ? (
                <>
                  شهادات <span className="gradient-text-cyan">ITI وهندسة C#</span> المعتمدة
                </>
              ) : (
                <>
                  Verified <span className="gradient-text-cyan">ITI & C# Credentials</span>
                </>
              )}
            </h2>
            <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
              {lang === 'ar'
                ? 'شهادات رسمية تثبت التدريب الاحترافي وإتقان التقنيات المتقدمة في هندسة البرمجيات.'
                : 'Official accreditations validating advanced C# engineering, algorithms, and software development.'}
            </p>
          </div>
        </AssembleItem>

        {/* Certificates Grid: Left flies in from Left, Right flies in from Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {certificates.map((cert, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <AssembleItem 
                key={cert.id}
                direction={isLeft ? 'left' : 'right'}
                distance={125}
                rotation={isLeft ? -3 : 3}
                className="h-full"
              >
                <div className="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 h-full">
                  <div className="text-start">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
                        {cert.badge}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {cert.date}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                      {lang === 'ar' ? cert.titleAr : cert.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-cyan-400 mb-4">
                      {lang === 'ar' ? cert.issuerAr : cert.issuer}
                    </p>

                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                      {lang === 'ar' ? cert.descriptionAr : cert.description}
                    </p>
                  </div>

                  {/* Actions: View & Download */}
                  <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                    <a
                      href={cert.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold transition-colors"
                    >
                      <Eye className="w-4 h-4 text-cyan-400" />
                      <span>{lang === 'ar' ? 'معاينة المستند' : 'Preview Document'}</span>
                    </a>

                    <a
                      href={cert.fileUrl}
                      download
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/30 text-cyan-300 text-xs font-semibold transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>{lang === 'ar' ? 'تحميل الملف (PDF / PNG)' : 'Download'}</span>
                    </a>
                  </div>
                </div>
              </AssembleItem>
            );
          })}
        </div>
      </div>
    </section>
  );
};
