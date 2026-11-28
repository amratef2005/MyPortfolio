import React from 'react';
import { usePortfolio } from '@/app/providers/PortfolioContext';
import type { RequestConfirmFn } from '@modules/admin/types';

interface InboxTabProps {
  requestConfirm: RequestConfirmFn;
}

export const InboxTab: React.FC<InboxTabProps> = ({ requestConfirm }) => {
  const { messages, markMessageRead, deleteMessage } = usePortfolio();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-white">صندوق الرسائل الواردة ({messages.length})</h2>
        <p className="text-xs text-slate-400 font-mono mt-0.5">رسائل العملاء الواردة من نموذج الاتصال</p>
      </div>

      {messages.length === 0 ? (
        <div className="p-12 text-center bg-[#08090C] rounded-2xl border border-white/[0.08] text-slate-500 text-xs font-mono">
          لا توجد رسائل واردة حتى الآن.
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-5 rounded-2xl border transition-all ${
                msg.read
                  ? 'bg-[#08090C] border-white/[0.08]/80'
                  : 'bg-theme-primary/10 border-theme-primary/40 shadow-[0_0_15px_rgba(var(--theme-primary-rgb),0.1)]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{msg.name}</span>
                  <span className="text-xs text-slate-400 font-mono">&lt;{msg.email}&gt;</span>
                </div>
                <span className="text-[11px] font-mono text-slate-500">
                  {new Date(msg.createdAt).toLocaleDateString('ar-EG')}
                </span>
              </div>

              {msg.subject && (
                <p className="text-xs font-mono text-theme-primary font-semibold mb-2">الموضوع: {msg.subject}</p>
              )}

              <p className="text-slate-300 text-xs leading-relaxed bg-[#0B0C10] p-3.5 rounded-xl border border-white/[0.08]/80">
                {msg.message}
              </p>

              <div className="flex items-center gap-4 mt-3 pt-2 border-t border-white/[0.08]/60">
                <a
                  href={`mailto:${msg.email}?subject=رد: ${encodeURIComponent(msg.subject || 'تواصل')}`}
                  className="text-xs text-theme-primary hover:underline font-mono"
                >
                  الرد عبر البريد الإلكتروني
                </a>
                {!msg.read && (
                  <button
                    type="button"
                    onClick={() => markMessageRead(msg.id)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    تحديد كمقروء
                  </button>
                )}
                <button
                  type="button"
                  onClick={() =>
                    requestConfirm({
                      variant: 'danger',
                      title: 'تأكيد حذف الرسالة',
                      description: `سيتم حذف رسالة "${msg.name}" نهائياً من صندوق الوارد.`,
                      confirmLabel: 'تأكيد الحذف',
                      onConfirm: () => deleteMessage(msg.id),
                    })
                  }
                  className="text-xs text-red-400 hover:underline mr-auto"
                >
                  حذف الرسالة
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
