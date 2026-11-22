import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Mail, MapPin, CheckCircle, Send, ArrowUpRight, Copy, Check, Linkedin, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AssembleItem } from './motion/KineticAssemble';

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.477-.15-.678.15-.201.3-.778.978-.954 1.179-.176.2-.352.225-.653.075-1.543-.769-2.55-1.378-3.565-3.119-.269-.462-.027-.712.124-.862.135-.135.301-.351.452-.527.15-.175.201-.3.301-.5.101-.2.05-.376-.025-.526-.075-.15-.678-1.634-.929-2.238-.244-.588-.493-.508-.678-.518-.175-.01-.376-.01-.577-.01-.201 0-.527.075-.803.376s-1.054 1.029-1.054 2.509c0 1.48 1.079 2.91 1.23 3.111.15.201 2.121 3.239 5.139 4.542.718.311 1.279.497 1.716.636.722.23 1.379.197 1.898.12.578-.087 1.78-.727 2.031-1.43.251-.703.251-1.305.176-1.43-.075-.125-.276-.2-.577-.35z" />
    <path d="M12.004 2C6.48 2 2 6.48 2 12c0 1.947.56 3.765 1.53 5.305L2 22l4.836-1.503A9.957 9.957 0 0012.004 22c5.523 0 10.004-4.48 10.004-10s-4.481-10-10.004-10zm0 18.232c-1.637 0-3.15-.479-4.432-1.306l-.318-.204-2.871.893.91-2.793-.223-.332A8.187 8.187 0 013.77 12c0-4.54 3.694-8.232 8.234-8.232 4.54 0 8.232 3.692 8.232 8.232s-3.692 8.232-8.232 8.232z" />
  </svg>
);

export const Contact: React.FC = () => {
  const { profile, addMessage, lang } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedLinkedIn, setCopiedLinkedIn] = useState(false);

  const copyWhatsApp = () => {
    navigator.clipboard.writeText(profile.phone || 'amratefkandel');
    setCopiedWhatsApp(true);
    setTimeout(() => setCopiedWhatsApp(false), 2000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyLinkedIn = () => {
    navigator.clipboard.writeText(profile.linkedin);
    setCopiedLinkedIn(true);
    setTimeout(() => setCopiedLinkedIn(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    addMessage(formData);
    setSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header: Assembles from Top */}
        <AssembleItem direction="top">
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-mono mb-3">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>{lang === 'ar' ? 'قنوات التواصل المباشر' : 'Get in Touch'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              {lang === 'ar' ? (
                <>
                  دعنا نبني <span className="gradient-text-cyan">مشروعك القادم معاً</span>
                </>
              ) : (
                <>
                  Let's Build Something <span className="gradient-text-cyan">Exceptional Together</span>
                </>
              )}
            </h2>
            <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
              {lang === 'ar'
                ? 'متاح للمناقشات الفنية، المشاريع المؤسسية، والفرص الواعدة في هندسة النظم الخلفية.'
                : 'Available for technical leadership, enterprise consulting, and high-impact backend engineering roles.'}
            </p>
          </div>
        </AssembleItem>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-start items-start">
          {/* Left Column: Direct Info - Assembles from Left & Disperses to Left */}
          <AssembleItem direction="left" distance={130} rotation={-3} className="lg:col-span-5 space-y-4">
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800/80 space-y-6">
              <h3 className="text-xl font-bold text-white">
                {lang === 'ar' ? 'معلومات التواصل السريع' : 'Direct Channels'}
              </h3>

              {/* Email */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-slate-400">
                      {lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white truncate max-w-[170px] sm:max-w-none block">
                      {profile.email}
                    </span>
                  </div>
                </div>
                <button
                  onClick={copyEmail}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title={lang === 'ar' ? 'نسخ البريد الإلكتروني' : 'Copy Email'}
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* WhatsApp Card with Dynamic Availability Indicator */}
              {(() => {
                const isAvailable = profile.isWhatsAppAvailable !== false && profile.whatsappStatus !== 'offline';
                const isBusy = profile.whatsappStatus === 'busy';
                const noteText = lang === 'ar'
                  ? (profile.whatsappCustomNoteAr || (isBusy ? 'مشغول • الرد خلال ساعات' : isAvailable ? 'متاح الآن للرد الفوري' : 'غير متاح حالياً • اترك رسالة'))
                  : (profile.whatsappCustomNoteEn || (isBusy ? 'Busy • Replies within hours' : isAvailable ? 'Available for immediate reply' : 'Currently away • Leave a message'));
                const waUrl = profile.whatsapp || `https://wa.me/?text=Hello%20${encodeURIComponent(profile.name || 'Amr')}`;

                return (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-slate-900/70 border border-slate-800 gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`relative w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isBusy
                          ? 'bg-amber-500/15 border-amber-500/30 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                          : isAvailable
                            ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                            : 'bg-slate-800/80 border-slate-700 text-slate-500'
                      }`}>
                        <WhatsAppIcon className={`w-5 h-5 transition-colors ${
                          isBusy ? 'text-amber-400' : isAvailable ? 'text-emerald-400' : 'text-slate-500'
                        }`} />
                        {/* Status dot badge */}
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          {isAvailable && !isBusy && (
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          )}
                          <span className={`relative inline-flex rounded-full h-3 w-3 border-2 border-slate-900 ${
                            isBusy ? 'bg-amber-400' : isAvailable ? 'bg-emerald-400' : 'bg-slate-500'
                          }`} />
                        </span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-mono text-slate-400">
                            {lang === 'ar' ? 'واتساب' : 'WhatsApp'}
                          </span>
                          {/* Availability Badge */}
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium ${
                            isBusy 
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                              : isAvailable 
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                : 'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              isBusy ? 'bg-amber-400' : isAvailable ? 'bg-emerald-400' : 'bg-slate-500'
                            }`} />
                            {noteText}
                          </span>
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-white block truncate">
                          {profile.phone}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-semibold transition-colors"
                        title={lang === 'ar' ? 'مراسلة مباشرة على واتساب' : 'Chat directly on WhatsApp'}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>{lang === 'ar' ? 'مراسلة' : 'Chat'}</span>
                      </a>
                      <button
                        onClick={copyWhatsApp}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                        title={lang === 'ar' ? 'نسخ رقم الهاتف / واتساب' : 'Copy Phone'}
                      >
                        {copiedWhatsApp ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* LinkedIn */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-slate-400">
                      {lang === 'ar' ? 'لينكد إن' : 'LinkedIn'}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white">
                      {lang === 'ar' ? profile.nameAr : profile.name}
                    </span>
                  </div>
                </div>
                <button
                  onClick={copyLinkedIn}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title={lang === 'ar' ? 'نسخ رابط لينكد إن' : 'Copy LinkedIn'}
                >
                  {copiedLinkedIn ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900/50 border border-slate-800/60">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-mono text-slate-400">
                    {lang === 'ar' ? 'الموقع / الإقامة' : 'Location'}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white">
                    {lang === 'ar' ? 'القاهرة، مصر (متاح للعمل عن بُعد عالمياً)' : 'Cairo, Egypt (Available Globally / Remote)'}
                  </span>
                </div>
              </div>
            </div>
          </AssembleItem>

          {/* Right Column: Message Form - Assembles from Right & Disperses to Right */}
          <AssembleItem direction="right" distance={130} rotation={3} className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800/80 relative">
              <h3 className="text-xl font-bold text-white mb-6">
                {lang === 'ar' ? 'إرسال رسالة مباشرة للمهندس' : 'Send a Direct Message'}
              </h3>

              {submitted && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-400 text-sm">
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <span>
                    {lang === 'ar' 
                      ? 'تم إرسال رسالتك بنجاح! تم حفظها وسأقوم بالرد عليك سريعاً.' 
                      : 'Your message has been received! I will get back to you shortly.'}
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-2">
                      {lang === 'ar' ? 'الاسم الكريم' : 'Your Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={lang === 'ar' ? 'م. محمد أحمد' : 'Alex Mercer'}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white text-sm outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-2">
                      {lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white text-sm outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2">
                    {lang === 'ar' ? 'الموضوع أو نوع المشروع' : 'Subject / Project Focus'}
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder={lang === 'ar' ? 'استشارة معمارية .NET / بناء نظام سحابي' : 'Enterprise Consulting / High Throughput Backend'}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white text-sm outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2">
                    {lang === 'ar' ? 'تفاصيل الرسالة أو الاستفسار' : 'Message Details'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={lang === 'ar' ? 'أخبرني عن أهداف النظام، حجم البيانات المتوقع، أو التحديات الهندسية...' : 'Briefly describe your system requirements, architecture goals, or role expectations...'}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white text-sm outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(56,189,248,0.25)] hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all flex items-center justify-center gap-2 group"
                >
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span>{lang === 'ar' ? 'إرسال الرسالة الآن' : 'Dispatch Message'}</span>
                </button>
              </form>
            </div>
          </AssembleItem>
        </div>
      </div>
    </section>
  );
};
