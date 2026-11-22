import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ExternalLink, X } from 'lucide-react';

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.477-.15-.678.15-.201.3-.778.978-.954 1.179-.176.2-.352.225-.653.075-1.543-.769-2.55-1.378-3.565-3.119-.269-.462-.027-.712.124-.862.135-.135.301-.351.452-.527.15-.175.201-.3.301-.5.101-.2.05-.376-.025-.526-.075-.15-.678-1.634-.929-2.238-.244-.588-.493-.508-.678-.518-.175-.01-.376-.01-.577-.01-.201 0-.527.075-.803.376s-1.054 1.029-1.054 2.509c0 1.48 1.079 2.91 1.23 3.111.15.201 2.121 3.239 5.139 4.542.718.311 1.279.497 1.716.636.722.23 1.379.197 1.898.12.578-.087 1.78-.727 2.031-1.43.251-.703.251-1.305.176-1.43-.075-.125-.276-.2-.577-.35z" />
    <path d="M12.004 2C6.48 2 2 6.48 2 12c0 1.947.56 3.765 1.53 5.305L2 22l4.836-1.503A9.957 9.957 0 0012.004 22c5.523 0 10.004-4.48 10.004-10s-4.481-10-10.004-10zm0 18.232c-1.637 0-3.15-.479-4.432-1.306l-.318-.204-2.871.893.91-2.793-.223-.332A8.187 8.187 0 013.77 12c0-4.54 3.694-8.232 8.234-8.232 4.54 0 8.232 3.692 8.232 8.232s-3.692 8.232-8.232 8.232z" />
  </svg>
);

export const FloatingWhatsApp: React.FC = () => {
  const { profile, lang } = usePortfolio();
  const [isHovered, setIsHovered] = useState(false);

  // If floating widget is explicitly disabled in admin settings
  if (profile.showFloatingWhatsApp === false) {
    return null;
  }

  const isAvailable = profile.isWhatsAppAvailable !== false && profile.whatsappStatus !== 'offline';
  const isBusy = profile.whatsappStatus === 'busy';

  // Get status note according to language
  const getStatusText = () => {
    if (lang === 'ar') {
      if (profile.whatsappCustomNoteAr) return profile.whatsappCustomNoteAr;
      if (isBusy) return 'مشغول • الرد خلال ساعات';
      if (isAvailable) return 'متاح الآن للرد الفوري';
      return 'غير متاح حالياً • اترك رسالة';
    } else {
      if (profile.whatsappCustomNoteEn) return profile.whatsappCustomNoteEn;
      if (isBusy) return 'Busy • Replies within hours';
      if (isAvailable) return 'Available for immediate reply';
      return 'Currently away • Leave a message';
    }
  };

  const statusLabel = getStatusText();

  // WhatsApp chat destination URL
  const waUrl = profile.whatsapp || `https://wa.me/?text=Hello%20${encodeURIComponent(profile.name || 'Amr')}`;

  return (
    <aside 
      aria-label={lang === 'ar' ? 'التواصل السريع عبر واتساب' : 'Quick WhatsApp Contact'}
      className="fixed bottom-6 end-6 z-40 flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: lang === 'ar' ? -12 : 12, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: lang === 'ar' ? -12 : 12, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`hidden sm:flex items-center gap-2 py-2 px-3.5 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] ${
              lang === 'ar' ? 'ml-3' : 'mr-3'
            }`}
          >
            {/* Status Indicator inside tooltip */}
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              {isAvailable && !isBusy && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              )}
              <span 
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  isBusy 
                    ? 'bg-amber-400' 
                    : isAvailable 
                      ? 'bg-emerald-500' 
                      : 'bg-slate-500'
                }`} 
              />
            </span>
            <div className="flex flex-col text-start">
              <span className="text-xs font-bold text-white leading-tight">
                {lang === 'ar' ? 'واتساب مباشر' : 'WhatsApp Chat'}
              </span>
              <span className={`text-[11px] font-mono leading-tight ${
                isBusy 
                  ? 'text-amber-400' 
                  : isAvailable 
                    ? 'text-emerald-400' 
                    : 'text-slate-400'
              }`}>
                {statusLabel}
              </span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0 ms-1" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Circular Floating Button */}
      <motion.a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={lang === 'ar' ? 'تحدث معي على واتساب' : 'Chat on WhatsApp'}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className={`relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full text-white shadow-2xl transition-all duration-300 ${
          isAvailable && !isBusy
            ? 'bg-gradient-to-tr from-emerald-600 to-emerald-400 shadow-[0_0_24px_rgba(16,185,129,0.45)] hover:shadow-[0_0_32px_rgba(16,185,129,0.65)] ring-2 ring-emerald-400/30'
            : isBusy
              ? 'bg-gradient-to-tr from-amber-600 to-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.35)] ring-2 ring-amber-400/30'
              : 'bg-gradient-to-tr from-slate-700 to-slate-800 shadow-[0_0_15px_rgba(0,0,0,0.4)] opacity-85 hover:opacity-100 ring-1 ring-slate-600'
        }`}
      >
        <WhatsAppIcon className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow" />

        {/* Floating status dot on top edge of button */}
        <span className="absolute top-0 end-0 flex h-3.5 w-3.5">
          {isAvailable && !isBusy && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-80" />
          )}
          <span 
            className={`relative inline-flex rounded-full h-3.5 w-3.5 border-2 border-slate-900 ${
              isBusy 
                ? 'bg-amber-400' 
                : isAvailable 
                  ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' 
                  : 'bg-slate-500'
            }`} 
          />
        </span>
      </motion.a>
    </aside>
  );
};
