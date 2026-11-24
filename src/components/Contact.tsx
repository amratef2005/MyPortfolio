import React, { useState } from 'react';
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
  Sparkles,
  MessageSquare
} from 'lucide-react';
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
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF5722', '#FF7A00', '#FF8A00', '#FFFFFF']
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-8 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Background Subtle Orange Glow */}
      <div 
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255, 87, 34, 0.14) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: "Contact Me" & "Have Any Project? Let's Chat" */}
        <AssembleItem direction="top">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121215] border border-orange-500/20 text-[#FF7A00] text-xs font-mono mb-3">
              <MessageSquare className="w-3.5 h-3.5 text-[#FF5722]" />
              <span>{lang === 'ar' ? 'تواصل معي' : 'Contact Me'}</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.2]">
              {lang === 'ar' ? (
                <>
                  لديك مشروع جديد؟ <span className="text-[#FF5722] drop-shadow-[0_0_20px_rgba(255,87,34,0.4)]">دعنا نتحدث الآن</span>
                </>
              ) : (
                <>
                  Have Any Project? <span className="text-[#FF5722] drop-shadow-[0_0_20px_rgba(255,87,34,0.4)]">Let's Chat</span>
                </>
              )}
            </h2>
            
            <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
              {lang === 'ar'
                ? 'سواء كنت ترغب في بدء مشروع جديد، إعادة تصميم منتجك، أو استشارة سريعة في الـ UI/UX، يسعدني دائماً تواصلك.'
                : 'Whether you have a new venture, want to redesign an existing product, or need a UI/UX consultation, I would love to hear from you.'}
            </p>
          </div>
        </AssembleItem>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-start items-start">
          
          {/* Left Column: Direct Contact Info Channels */}
          <AssembleItem direction="left" distance={100} className="lg:col-span-5 space-y-4">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0e0e12] border border-white/10 space-y-5">
              <h3 className="text-xl font-bold text-white mb-2">
                {lang === 'ar' ? 'قنوات التواصل المباشرة' : 'Direct Channels'}
              </h3>

              {/* Email */}
              <div 
                onClick={() => window.location.href = `mailto:${profile.email}`}
                className="group flex items-center justify-between p-4 rounded-2xl bg-[#15151c] border border-white/5 hover:border-orange-500/40 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-[#FF5722] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-slate-400 uppercase">
                      {lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                    </span>
                    <span className="text-sm font-bold text-white group-hover:text-[#FF7A00] transition-colors truncate max-w-[180px] sm:max-w-none block">
                      {profile.email}
                    </span>
                  </div>
                </div>
                <button
                  onClick={copyEmail}
                  className="p-2 rounded-lg bg-white/5 hover:bg-orange-500/20 text-slate-400 hover:text-[#FF7A00] transition-colors"
                  title="Copy email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* WhatsApp */}
              <div 
                onClick={() => window.open(getWhatsAppUrl(), '_blank')}
                className="group flex items-center justify-between p-4 rounded-2xl bg-[#15151c] border border-white/5 hover:border-emerald-500/40 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <WhatsAppIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-slate-400 uppercase">
                      {lang === 'ar' ? 'محادثة واتساب سريعة' : 'WhatsApp Chat'}
                    </span>
                    <span className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {profile.phone || 'Online'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={copyWhatsApp}
                  className="p-2 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-400 transition-colors"
                  title="Copy WhatsApp"
                >
                  {copiedWhatsApp ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#15151c] border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-[#FF5722] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-slate-400 uppercase">
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
                  className="flex items-center justify-between p-4 rounded-2xl bg-[#15151c] border border-white/5 hover:border-blue-500/40 text-slate-300 hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono text-slate-400 uppercase">LinkedIn</span>
                      <span className="text-sm font-bold text-white">Connect on LinkedIn</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </a>
              )}

            </div>
          </AssembleItem>

          {/* Right Column: Contact Message Form */}
          <AssembleItem direction="right" distance={100} className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0e0e12] border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.7)]">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
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
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
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
                        className="w-full px-4 py-3 rounded-xl bg-[#15151c] border border-white/10 focus:border-[#FF5722] focus:ring-1 focus:ring-[#FF5722] text-white text-sm outline-none transition-colors"
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
                        className="w-full px-4 py-3 rounded-xl bg-[#15151c] border border-white/10 focus:border-[#FF5722] focus:ring-1 focus:ring-[#FF5722] text-white text-sm outline-none transition-colors"
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
                      placeholder={lang === 'ar' ? 'تصميم تطبيق موبايل جديد / موقع إلكتروني' : 'New Mobile App Design / Web UI'}
                      className="w-full px-4 py-3 rounded-xl bg-[#15151c] border border-white/10 focus:border-[#FF5722] focus:ring-1 focus:ring-[#FF5722] text-white text-sm outline-none transition-colors"
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
                      className="w-full px-4 py-3 rounded-xl bg-[#15151c] border border-white/10 focus:border-[#FF5722] focus:ring-1 focus:ring-[#FF5722] text-white text-sm outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button ("Let's Chat") */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 h-14 rounded-2xl bg-gradient-to-r from-[#FF5722] via-[#FF6B00] to-[#FF7A00] hover:from-[#FF6B00] hover:to-[#FF8A00] text-white font-bold text-base shadow-[0_0_30px_rgba(255,87,34,0.4)] hover:shadow-[0_0_40px_rgba(255,87,34,0.6)] transition-all active:scale-98 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>
                      {submitting
                        ? (lang === 'ar' ? 'جاري الإرسال...' : 'Sending...')
                        : (lang === 'ar' ? 'دعنا نتحدث (Let\'s Chat)' : "Let's Chat")}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </AssembleItem>

        </div>

      </div>
    </section>
  );
};

export default Contact;
