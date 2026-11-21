import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { CVDocument, CVOptions, AccentColor } from './CVDocument';
import { 
  X, 
  Printer, 
  FileCheck, 
  Check, 
  ZoomIn, 
  ZoomOut, 
  Sliders,
  ShieldCheck,
  Palette
} from 'lucide-react';

export const CVModal: React.FC = () => {
  const { isCVModalOpen, setIsCVModalOpen, profile, projects, certificates, skills, lang } = usePortfolio();

  const [options, setOptions] = useState<CVOptions>({
    template: 'classic', // Fixed to ATS-Standard
    language: 'en',      // Strictly English
    accentColor: 'slate',
    includedProjects: projects.map(p => p.id),
    roleTitle: '',
    isEditable: true,
  });

  const [zoom, setZoom] = useState<number>(100);
  const [showConfig, setShowConfig] = useState<boolean>(true);

  if (!isCVModalOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const accentThemes: { id: AccentColor; name: string; hex: string }[] = [
    { id: 'slate', name: 'Classic Slate', hex: '#0f172a' },
    { id: 'navy', name: 'Executive Navy', hex: '#1e3a8a' },
    { id: 'cyan', name: 'Tech Cyan', hex: '#0284c7' },
    { id: 'cobalt', name: 'Royal Cobalt', hex: '#1d4ed8' },
    { id: 'indigo', name: 'Deep Indigo', hex: '#4338ca' },
    { id: 'teal', name: 'Clean Teal', hex: '#0f766e' },
    { id: 'emerald', name: 'Forest Emerald', hex: '#047857' },
    { id: 'rose', name: 'Crimson Rose', hex: '#be123c' },
    { id: 'ruby', name: 'Deep Ruby', hex: '#991b1b' },
    { id: 'amber', name: 'Warm Amber', hex: '#b45309' },
    { id: 'violet', name: 'Royal Violet', hex: '#6d28d9' },
    { id: 'charcoal', name: 'Minimal Charcoal', hex: '#334155' },
  ];

  return (
    <div id="cv-modal-backdrop" className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-xl overflow-hidden animate-fadeIn">
      {/* Top Controls Toolbar */}
      <div id="cv-modal-toolbar" className="px-4 sm:px-6 py-3 bg-[#080c14] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
        {/* Title & Badge */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
              <span>{lang === 'ar' ? 'السيرة الذاتية القياسية (ATS-Friendly CV)' : 'ATS-Optimized Standard Resume'}</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-mono font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>100% ATS Verified</span>
              </span>
            </h3>
            <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
              {lang === 'ar' ? 'معتمدة لأنظمة الفحص الآلي ومجهزة بالكامل باللغة الإنجليزية ومقاس A4' : 'Single-Column ATS Standard • 100% English • Direct A4 Vector Print'}
            </p>
          </div>
        </div>

        {/* Action Buttons: Print, Toggle Options & Close */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Toggle Config Sidebar on small screens */}
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs flex items-center gap-1.5"
            title="إعدادات الألوان"
          >
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span className="text-[11px] font-mono">{showConfig ? 'Hide' : 'Colors'}</span>
          </button>

          {/* Print / Download Button */}
          <button
            onClick={handlePrint}
            className="px-4 sm:px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(56,189,248,0.4)] flex items-center gap-2 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>{lang === 'ar' ? 'طباعة / حفظ PDF' : 'Download PDF / Print'}</span>
          </button>

          {/* Close Modal */}
          <button
            onClick={() => setIsCVModalOpen(false)}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Container: Settings Sidebar + Live A4 Canvas */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Settings Sidebar - Accent Theme */}
        {showConfig && (
          <aside id="cv-sidebar" className="w-full lg:w-80 bg-[#090e18] border-b lg:border-b-0 lg:border-l border-slate-800/80 p-4 sm:p-5 overflow-y-auto shrink-0 space-y-4 text-start">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <label className="text-xs font-mono font-bold text-slate-200 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-cyan-400" />
                  <span>Accent Theme:</span>
                </label>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 font-semibold uppercase">
                  {options.accentColor}
                </span>
              </div>

              {/* Expanded Palette Grid */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {accentThemes.map((c) => {
                  const isSelected = options.accentColor === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setOptions({ ...options, accentColor: c.id })}
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl text-left border transition-all ${
                        isSelected
                          ? 'bg-slate-800/95 border-cyan-400 shadow-[0_0_14px_rgba(56,189,248,0.3)] text-white'
                          : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700 text-slate-300 hover:text-white'
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center shadow-md ring-1 ring-white/10"
                        style={{ backgroundColor: c.hex }}
                      >
                        {isSelected && <Check className="w-3 h-3 text-white drop-shadow" />}
                      </span>
                      <span className="text-xs font-medium truncate">{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>
        )}

        {/* Live A4 Canvas Area */}
        <div className="flex-1 bg-[#06080e] p-4 sm:p-8 overflow-y-auto flex flex-col items-center">
          {/* Zoom controls */}
          <div className="mb-4 inline-flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-300 shadow-md">
            <button
              onClick={() => setZoom(Math.max(60, zoom - 10))}
              className="p-1 hover:text-white"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2">{zoom}%</span>
            <button
              onClick={() => setZoom(Math.min(140, zoom + 10))}
              className="p-1 hover:text-white"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <span className="border-r border-slate-700 h-3 mx-1" />
            <span className="text-[10px] text-emerald-400 font-bold">Standard A4 ATS Sheet</span>
          </div>

          {/* Rendered Document Sheet */}
          <div 
            id="cv-print-root"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top center',
              transition: 'transform 0.2s ease',
            }}
            className="w-full flex justify-center pb-12"
          >
            <CVDocument
              options={options}
              profile={profile}
              projects={projects}
              certificates={certificates}
              skills={skills}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
