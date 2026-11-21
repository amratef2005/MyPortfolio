import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Mail, MapPin, CheckCircle, Send, ArrowUpRight, Copy, Check, Linkedin } from 'lucide-react';
import confetti from 'canvas-confetti';

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
    <section id="contact" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-start">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/80 flex flex-col justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
                {lang === 'ar' ? 'معلومات التواصل' : 'Contact Information'}
              </h3>

              <div className="space-y-6">
                {/* Email Item */}
                <div className="flex items-start gap-4 group">
                  <a
                    href={`mailto:${profile.email}`}
                    className="relative w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-500/25 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.45)]"
                    title={lang === 'ar' ? 'إرسال بريد إلكتروني' : 'Send an Email'}
                  >
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping opacity-75" />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400" />
                    <Mail className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                  </a>
                  <div className="flex-1 min-w-0">
                    <span className="block text-xs font-mono text-slate-400">
                      {lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <a href={`mailto:${profile.email}`} className="text-white hover:text-cyan-400 font-semibold text-sm transition-colors truncate">
                        {profile.email}
                      </a>
                      <button
                        type="button"
                        onClick={copyEmail}
                        className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors shrink-0"
                        title={lang === 'ar' ? 'نسخ البريد الإلكتروني' : 'Copy Email'}
                      >
                        {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Item */}
                <div className="flex items-start gap-4 group">
                  <a
                    href={profile.whatsapp || "https://wa.me/?text=Hello%20Amr"}
                    target="_blank"
                    rel="noreferrer"
                    className="relative w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-500/25 group-hover:border-emerald-400 group-hover:shadow-[0_0_20px_rgba(37,211,102,0.45)]"
                    title={lang === 'ar' ? 'محادثة مباشرة عبر واتساب' : 'Chat on WhatsApp'}
                  >
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-75" />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <WhatsAppIcon className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                  </a>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="block text-xs font-mono text-slate-400">
                        {lang === 'ar' ? 'واتساب' : 'WhatsApp'}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold">
                        {lang === 'ar' ? 'تفاعلي • متاح' : 'Interactive • Online'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <a
                        href={profile.whatsapp || "https://wa.me/?text=Hello%20Amr"}
                        target="_blank"
                        rel="noreferrer"
                        className="text-white hover:text-emerald-400 font-semibold text-sm font-mono transition-colors tracking-wide flex items-center gap-1.5"
                      >
                        <span>{profile.phone}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                      </a>
                      <button
                        type="button"
                        onClick={copyWhatsApp}
                        className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors shrink-0"
                        title={lang === 'ar' ? 'نسخ معرف الواتساب' : 'Copy WhatsApp handle'}
                      >
                        {copiedWhatsApp ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* LinkedIn Item */}
                <div className="flex items-start gap-4 group">
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="relative w-10 h-10 rounded-2xl bg-[#0A66C2]/15 border border-[#0A66C2]/30 flex items-center justify-center text-[#0A66C2] shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#0A66C2]/25 group-hover:border-[#0A66C2] group-hover:shadow-[0_0_20px_rgba(10,102,194,0.45)]"
                    title={lang === 'ar' ? 'الملف الشخصي على لينكد إن' : 'LinkedIn Profile'}
                  >
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping opacity-75" />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <Linkedin className="w-5 h-5 text-[#0A66C2] group-hover:text-blue-300 transition-colors" />
                  </a>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="block text-xs font-mono text-slate-400">
                        {lang === 'ar' ? 'لينكد إن' : 'LinkedIn'}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 font-semibold">
                        {lang === 'ar' ? 'الملف العام' : 'Public Profile'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="text-white hover:text-blue-400 font-semibold text-sm font-mono transition-colors tracking-wide flex items-center gap-1.5 truncate"
                      >
                        <span className="truncate">Amr Atef | LinkedIn</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-blue-400/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                      </a>
                      <button
                        type="button"
                        onClick={copyLinkedIn}
                        className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors shrink-0"
                        title={lang === 'ar' ? 'نسخ رابط لينكد إن' : 'Copy LinkedIn link'}
                      >
                        {copiedLinkedIn ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Location Item */}
                <div className="flex items-start gap-4 group">
                  <div className="relative w-10 h-10 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                    <MapPin className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-slate-400">
                      {lang === 'ar' ? 'الموقع الجغرافي' : 'Location'}
                    </span>
                    <span className="text-white font-semibold text-sm mt-0.5 block">
                      {lang === 'ar' ? profile.locationAr : profile.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/80">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-white">
                  {lang === 'ar' ? 'تم إرسال رسالتك بنجاح!' : 'Message Sent Successfully!'}
                </h4>
                <p className="text-slate-300 text-sm max-w-md mx-auto">
                  {lang === 'ar'
                    ? 'شكراً لتواصلك. تم حفظ رسالتك في لوحة التحكم وسأقوم بالرد عليك في أقرب وقت.'
                    : 'Thank you for reaching out. Your message is safely stored in the Admin inbox.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      {lang === 'ar' ? 'الاسم الكريم' : 'Your Name'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={lang === 'ar' ? 'مثال: أحمد محمد' : 'e.g. John Doe'}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-500 text-white text-sm outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      {lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-500 text-white text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    {lang === 'ar' ? 'الموضوع' : 'Subject'}
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder={lang === 'ar' ? 'استشارة معمارية / مشروع جديد' : 'Architecture Consultation / New Project'}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-500 text-white text-sm outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    {lang === 'ar' ? 'الرسالة' : 'Your Message'} *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={lang === 'ar' ? 'اكتب تفاصيل طلبك أو استفسارك هنا...' : 'Describe your project or inquiry...'}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-500 text-white text-sm outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all flex items-center justify-center gap-2 group"
                >
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span>{lang === 'ar' ? 'إرسال الرسالة الآن' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
