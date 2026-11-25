import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Mail,
  MapPin,
  Send,
  ArrowUpRight,
  Copy,
  Check,
  Linkedin,
  CheckCircle2,
  MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AssembleItem, MOTION_EASE } from './motion/KineticAssemble';

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

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false);

  const copyEmail = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyWhatsApp = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigator.clipboard.writeText(profile.phone || 'amratefkandel');
    setCopiedWhatsApp(true);
    setTimeout(() => setCopiedWhatsApp(false), 2000);
  };

  const getWhatsAppUrl = () => {
    const rawWa = (profile.whatsapp || '').trim();
    if (rawWa && rawWa.startsWith('http')) return rawWa;
    const target = (profile.phone || rawWa || 'amratefkandel').replace(/^@/, '').trim();
    return `https://wa.me/${target}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);

    try {
      // 1. Post to Backend API
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      }).catch(() => {
        // Fallback gracefully if running purely offline
      });

      // 2. Add to Local State / Context
      addMessage(formData);
      setSubmitted(true);

      // 3. Trigger Celebration Confetti
      const styles = getComputedStyle(document.documentElement);
      const pColor = styles.getPropertyValue('--theme-primary').trim() || '#FF5722';
      const sColor = styles.getPropertyValue('--theme-secondary').trim() || '#FF7A00';
      const aColor = styles.getPropertyValue('--theme-accent').trim() || '#E64A19';
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: [pColor, sColor, aColor, '#FFFFFF']
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-8 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Background Subtle Theme Glow */}
      <div
        className="absolute bottom-0 right-1/4 w-[440px] h-[440px] rounded-full blur-[64px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(var(--theme-primary-rgb), 0.12) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header: "Contact Me" & "Have Any Project? Let's Chat" */}
        <AssembleItem direction="top" distance={22} delay={0.12}>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121215] border border-theme-primary/20 text-theme-secondary text-xs font-mono mb-3">
              <MessageSquare className="w-3.5 h-3.5 text-theme-primary" />
              <span>{lang === 'ar' ? 'تواصل معي' : 'Contact Me'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.2]">
              {lang === 'ar' ? (
                <>
                  لديك مشروع جديد؟ <span className="text-theme-primary drop-shadow-[0_0_20px_rgba(var(--theme-primary-rgb),0.4)]">دعنا نتحدث الآن</span>
                </>
              ) : (
                <>
                  Have Any Project? <span className="text-theme-primary drop-shadow-[0_0_20px_rgba(var(--theme-primary-rgb),0.4)]">Let's Chat</span>
                </>
              )}
            </h2>

            <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
              {lang === 'ar'
                ? 'سواء كنت ترغب في بناء نظام خلفي جديد، تطوير واجهات APIs، أو استشارة معمارية في .NET وClean Architecture، يسعدني تواصلك.'
                : 'Whether you have a new backend platform, scalable RESTful API, or .NET Clean Architecture consultation, I would love to hear from you.'}
            </p>
          </div>
        </AssembleItem>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-start items-start">

          {/* Left Column: Direct Contact Info Channels */}
          <AssembleItem direction="left" distance={24} delay={0.14} className="lg:col-span-5 space-y-4">
            <div className="premium-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
              <h3 className="text-xl font-bold text-white mb-2">
                {lang === 'ar' ? 'قنوات التواصل المباشرة' : 'Direct Channels'}
              </h3>

              {/* Email */}
              <div
                onClick={() => window.location.href = `mailto:${profile.email}`}
                className="group flex items-center justify-between p-4 rounded-2xl bg-[#15151c] border border-white/5 hover:border-theme-primary/40 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-theme-primary/10 border border-theme-primary/20 flex items-center justify-center text-theme-primary shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      {lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                    </span>
                    <span className="text-sm font-bold text-white group-hover:text-theme-secondary transition-colors truncate max-w-[180px] sm:max-w-none block">
                      {profile.email}
                    </span>
                  </div>
                </div>
                <button
                  onClick={copyEmail}
                  className="p-2 rounded-lg bg-white/5 hover:bg-theme-primary/20 text-slate-400 hover:text-theme-secondary transition-colors"
                  title="Copy email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* WhatsApp */}
              <div
                onClick={() => window.open(getWhatsAppUrl(), '_blank')}
                className="group flex items-center justify-between p-4 rounded-lg bg-[#121215] border border-white/10 hover:border-emerald-500/45 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                    <WhatsAppIcon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      {lang === 'ar' ? 'محادثة واتساب سريعة' : 'WhatsApp Chat'}
                    </span>
                    <span className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors block truncate">
                      {profile.phone || 'Online'}
                    </span>
                    {profile.showWhatsAppStatus !== false && (() => {
                      const waStatus = profile.whatsappStatus || 'online';
                      const waText =
                        lang === 'ar'
                          ? (profile.whatsappNoteAr ||
                              (waStatus === 'online'
                                ? 'متاح الآن للرد الفوري'
                                : waStatus === 'delayed'
                                ? 'مشغول • الرد خلال ساعات'
                                : 'غير متصل حالياً • اترك رسالة'))
                          : (profile.whatsappNoteEn ||
                              (waStatus === 'online'
                                ? 'Online • Fast Reply'
                                : waStatus === 'delayed'
                                ? 'Busy • Replies within hours'
                                : 'Offline • Leave a message'));
                      const waColor =
                        waStatus === 'online'
                          ? 'text-emerald-400'
                          : waStatus === 'delayed'
                          ? 'text-amber-400'
                          : 'text-slate-400';
                      const waDot =
                        waStatus === 'online'
                          ? 'bg-emerald-400 animate-pulse'
                          : waStatus === 'delayed'
                          ? 'bg-amber-400'
                          : 'bg-slate-500';
                      return (
                        <span className={`mt-1 inline-flex items-center gap-1.5 text-[11px] font-mono font-medium ${waColor}`}>
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${waDot}`} />
                          <span className="truncate">{waText}</span>
                        </span>
                      );
                    })()}
                  </div>
                </div>
                <button
                  onClick={copyWhatsApp}
                  className="p-2 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-400 transition-colors shrink-0"
                  title="Copy WhatsApp"
                >
                  {copiedWhatsApp ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#15151c] border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-theme-primary/10 border border-theme-primary/20 flex items-center justify-center text-theme-primary shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    {lang === 'ar' ? 'الموقع' : 'Location'}
                  </span>
                  <span className="text-sm font-bold text-white">
                    {lang === 'ar' ? (profile.locationAr || 'القاهرة، مصر') : (profile.location || 'Cairo, Egypt')}
                  </span>
                </div>
              </div>

              {/* Social Link: LinkedIn */}
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 rounded-lg bg-[#121215] border border-white/10 hover:border-theme-primary/50 text-slate-300 hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-theme-primary/10 border border-theme-primary/45 flex items-center justify-center text-theme-primary shrink-0">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">LinkedIn</span>
                      <span className="text-sm font-bold text-white">Connect on LinkedIn</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-theme-primary" />
                </a>
              )}

            </div>
          </AssembleItem>

          {/* Right Column: Contact Message Form */}
          <AssembleItem direction="right" distance={24} delay={0.2} className="lg:col-span-7">
            <div className="premium-card p-6 sm:p-8 rounded-3xl border border-white/10">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="contact-success"
                    initial={{ opacity: 0, scale: 0.96, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -12 }}
                    transition={{ duration: 0.38, ease: MOTION_EASE }}
                    className="text-center py-12 space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {lang === 'ar' ? 'تم استلام رسالتك بنجاح!' : 'Message Sent Successfully!'}
                    </h3>
                    <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                      {lang === 'ar'
                        ? 'شكراً لتواصلك، سأقوم بمراجعة تفاصيل مشروعك والرد عليك في أقرب وقت ممكن.'
                        : 'Thank you for reaching out. I have received your note and will get back to you shortly.'}
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', subject: '', message: '' });
                      }}
                      className="mt-4 px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-mono font-semibold"
                    >
                      {lang === 'ar' ? 'إرسال رسالة أخرى' : 'Send Another Note'}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.34, ease: MOTION_EASE }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">
                        {lang === 'ar' ? 'الاسم الكامل' : 'Your Name'} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={lang === 'ar' ? 'سارة محمد' : 'Jane Doe'}
                        className="w-full px-4 py-3 rounded-xl bg-[#15151c] border border-white/10 focus:border-theme-primary focus:ring-1 focus:ring-theme-primary text-white text-sm outline-none transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">
                        {lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jane@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#15151c] border border-white/10 focus:border-theme-primary focus:ring-1 focus:ring-theme-primary text-white text-sm outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Subject / Project Type */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-2">
                      {lang === 'ar' ? 'نوع المشروع أو الموضوع' : 'Project Type or Subject'}
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder={lang === 'ar' ? 'نظام SaaS خلفي / واجهة ASP.NET Core API' : 'Multi-Tenant SaaS Backend / ASP.NET Core API'}
                      className="w-full px-4 py-3 rounded-xl bg-[#15151c] border border-white/10 focus:border-theme-primary focus:ring-1 focus:ring-theme-primary text-white text-sm outline-none transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-2">
                      {lang === 'ar' ? 'تفاصيل المشروع والرسالة' : 'Project Details & Goals'} *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={lang === 'ar' ? 'أخبرني عن أهداف مشروعك، الفئة المستهدفة، والجدول الزمني المتوقع...' : 'Tell me about your product goals, timeline, and vision...'}
                      className="w-full px-4 py-3 rounded-xl bg-[#15151c] border border-white/10 focus:border-theme-primary focus:ring-1 focus:ring-theme-primary text-white text-sm outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button ("Let's Chat") */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-sheen w-full flex items-center justify-center gap-2 h-14 rounded-2xl bg-gradient-to-r from-theme-primary to-theme-secondary hover:brightness-110 text-white font-bold text-base shadow-[0_0_30px_rgba(var(--theme-primary-rgb),0.4)] hover:shadow-[0_0_40px_rgba(var(--theme-primary-rgb),0.6)] transition-all active:scale-98 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>
                      {submitting
                        ? (lang === 'ar' ? 'جاري الإرسال...' : 'Sending...')
                        : (lang === 'ar' ? 'دعنا نتحدث (Let\'s Chat)' : "Let's Chat")}
                    </span>
                  </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </AssembleItem>

        </div>

      </div>
    </section>
  );
};

export default Contact;
