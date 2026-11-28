import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle, CheckCircle2, Trash2, X } from 'lucide-react';

export interface ConfirmActionState {
  isOpen: boolean;
  variant: 'danger' | 'edit';
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
}

interface ConfirmActionModalProps extends ConfirmActionState {
  onClose: () => void;
}

export const ConfirmActionModal: React.FC<ConfirmActionModalProps> = ({
  isOpen,
  variant,
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onClose,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === 'undefined') return null;

  const isDanger = variant === 'danger';

  return createPortal(
    <div
      className="fixed inset-0 z-[200] overflow-y-auto bg-black/80 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="min-h-full flex items-center justify-center p-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div
          className={`relative w-full max-w-md rounded-2xl bg-[#0F1015] border p-6 shadow-[0_25px_60px_rgba(0,0,0,0.85)] space-y-5 text-start animate-fadeIn ${
            isDanger ? 'border-red-500/35' : 'border-theme-primary/35'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 end-4 p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-3.5 pe-6">
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
                isDanger
                  ? 'bg-red-500/15 border-red-500/30 text-red-400'
                  : 'bg-theme-primary/15 border-theme-primary/30 text-theme-primary'
              }`}
            >
              {isDanger ? <Trash2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-bold text-white leading-snug">{title}</h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed break-words">
                {description}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-white/[0.07]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
            >
              {cancelLabel || 'إلغاء'}
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all cursor-pointer ${
                isDanger
                  ? 'bg-red-600 hover:bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.35)]'
                  : 'bg-gradient-to-r from-theme-primary to-theme-secondary hover:brightness-110 shadow-[0_0_20px_rgba(var(--theme-primary-rgb),0.4)]'
              }`}
            >
              {!isDanger && <CheckCircle2 className="w-3.5 h-3.5" />}
              <span>{confirmLabel || (isDanger ? 'تأكيد الحذف' : 'تأكيد التعديل')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
