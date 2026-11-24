import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Award, Download, Eye, ExternalLink, CheckCircle2, ShieldCheck, X } from 'lucide-react';
import { AssembleItem } from './motion/KineticAssemble';
import { Certificate } from '../types';

export const Certificates: React.FC = () => {
  const { certificates, lang } = usePortfolio();
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  if (!certificates || certificates.length === 0) return null;

  return (
    <section id="certificates" className="py-8 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Background Soft Glow */}
      <div 
        className="absolute top-1/3 -right-20 w-[420px] h-[420px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255, 87, 34, 0.1) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <AssembleItem direction="top">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121215] border border-orange-500/20 text-[#FF7A00] text-xs font-mono mb-3">
              <Award className="w-3.5 h-3.5 text-[#FF5722]" />
              <span>{lang === 'ar' ? 'الشهادات والاعتمادات الاحترافية' : 'Verified Credentials & Certificates'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.2]">
              {lang === 'ar' ? (
                <>
                  اعتمادات موثوقة في <span className="text-[#FF5722] drop-shadow-[0_0_20px_rgba(255,87,34,0.4)]">تطوير النظم الخلفية وهندسة البرمجيات</span>
                </>
              ) : (
                <>
                  Certified Excellence in <span className="text-[#FF5722] drop-shadow-[0_0_20px_rgba(255,87,34,0.4)]">Backend Engineering & Architecture</span>
                </>
              )}
            </h2>
            <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
              {lang === 'ar'
                ? 'شهادات واعتمادات مهنية تثبت الكفاءة في تطوير النظم الخلفية، معمارية البرمجيات، وأحدث التقنيات الهندسية.'
                : 'Recognized professional credentials validating backend architecture, enterprise engineering, and modern software standards.'}
            </p>
          </div>
        </AssembleItem>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {certificates.map((cert, idx) => {
            const isLeft = idx % 2 === 0;

            return (
              <AssembleItem 
                key={cert.id}
                direction={isLeft ? 'left' : 'right'}
                distance={100}
                className="h-full"
              >
                <div className="p-4 sm:p-6 lg:p-8 rounded-3xl bg-[#0e0e12] border border-white/10 hover:border-orange-500/40 flex flex-col justify-between group overflow-hidden transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_15px_35px_rgba(255,87,34,0.15)] h-full relative">
                  
                  {/* Subtle Corner Ambient Light */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl group-hover:bg-orange-500/15 transition-all pointer-events-none" />

                  <div>
                    {/* Badge & Date */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#FF7A00] text-xs font-mono font-medium">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#FF5722]" />
                        {lang === 'ar' ? (cert.badgeAr || cert.badge || 'شهادة معتمدة') : (cert.badge || 'Certified')}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {cert.date}
                      </span>
                    </div>

                    {/* Certificate Title */}
                    <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-[#FF7A00] transition-colors mb-2">
                      {lang === 'ar' ? cert.titleAr : cert.title}
                    </h3>

                    {/* Issuer Organization */}
                    <p className="text-sm font-semibold text-orange-400/90 mb-4 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-[#FF5722] shrink-0" />
                      <span>{lang === 'ar' ? cert.issuerAr : cert.issuer}</span>
                    </p>

                    {/* Description */}
                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                      {lang === 'ar' ? cert.descriptionAr : cert.description}
                    </p>
                  </div>

                  {/* Actions: View Certificate & Download */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-[#FF7A00] hover:text-white text-xs sm:text-sm font-bold transition-all active:scale-95"
                    >
                      <Eye className="w-4 h-4" />
                      <span>{lang === 'ar' ? 'معاينة الشهادة' : 'View Certificate'}</span>
                    </button>

                    <a
                      href={cert.fileUrl}
                      download
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#18181f] hover:bg-[#22222b] border border-white/10 text-slate-300 hover:text-white transition-colors"
                      title={lang === 'ar' ? 'تحميل ملف PDF' : 'Download PDF'}
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>

                </div>
              </AssembleItem>
            );
          })}
        </div>

      </div>

      {/* Certificate Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-[#0e0e12] border border-orange-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-5 end-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="text-start">
              <span className="text-xs font-mono text-[#FF7A00] font-semibold uppercase tracking-wider">
                {lang === 'ar' ? selectedCert.issuerAr : selectedCert.issuer}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1 mb-3">
                {lang === 'ar' ? selectedCert.titleAr : selectedCert.title}
              </h3>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                {lang === 'ar' ? selectedCert.descriptionAr : selectedCert.description}
              </p>

              {/* PDF Preview Frame or Embed */}
              <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-[#050505] border border-white/10 flex items-center justify-center mb-6">
                <iframe
                  src={selectedCert.fileUrl}
                  title={selectedCert.title}
                  className="w-full h-full border-0"
                />
              </div>

              {/* Download / Open full file */}
              <div className="flex justify-end gap-3">
                <a
                  href={selectedCert.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5722] to-[#FF7A00] text-white font-bold text-sm shadow-[0_0_20px_rgba(255,87,34,0.4)]"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'فتح في علامة تبويب جديدة' : 'Open Full Certificate'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certificates;
