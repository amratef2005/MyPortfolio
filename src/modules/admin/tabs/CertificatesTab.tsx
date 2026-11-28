import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { Certificate } from '@shared/types';
import { usePortfolio } from '@/app/providers/PortfolioContext';
import type { RequestConfirmFn } from '../types';

interface CertificatesTabProps {
  editingCert: Certificate | null;
  setEditingCert: (cert: Certificate | null) => void;
  isNewCert: boolean;
  setIsNewCert: (isNew: boolean) => void;
  requestConfirm: RequestConfirmFn;
  onSaved?: () => void;
}

export const CertificatesTab: React.FC<CertificatesTabProps> = ({
  editingCert,
  setEditingCert,
  isNewCert,
  setIsNewCert,
  requestConfirm,
  onSaved,
}) => {
  const { certificates, addCertificate, updateCertificate, deleteCertificate } = usePortfolio();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">الشهادات والاعتمادات ({certificates.length})</h2>
          <p className="text-xs text-slate-400 font-mono mt-0.5">إدارة وتعديل شهادات ITI والاعتمادات المهنية</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setIsNewCert(true);
            setEditingCert({
              id: 'cert_' + Date.now(),
              title: '',
              titleAr: '',
              issuer: '',
              issuerAr: '',
              date: '2024',
              fileUrl: '/iti.pdf',
              badge: 'Accredited Certificate',
              description: '',
              descriptionAr: '',
            });
          }}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-theme-primary hover:bg-theme-primary text-white text-xs font-bold"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة شهادة جديدة</span>
        </button>
      </div>

      {!editingCert ? (
        <div className="space-y-3">
          {certificates.map((cert) => (
            <div key={cert.id} className="p-4 quantix-card flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-emerald-400 font-semibold">{cert.badge}</span>
                <h4 className="font-bold text-white text-base">{cert.titleAr || cert.title}</h4>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  {cert.issuerAr} &bull; {cert.fileUrl}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingCert(cert);
                    setIsNewCert(false);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-[#14151B] hover:bg-slate-700 text-xs text-slate-200"
                >
                  تعديل
                </button>
                <button
                  type="button"
                  onClick={() =>
                    requestConfirm({
                      variant: 'danger',
                      title: 'تأكيد حذف الشهادة',
                      description: `سيتم حذف الشهادة "${cert.titleAr || cert.title}" نهائياً.`,
                      confirmLabel: 'تأكيد الحذف',
                      onConfirm: () => {
                        deleteCertificate(cert.id);
                        onSaved?.();
                      },
                    })
                  }
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4 quantix-card p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">اسم الشهادة (عربي)</label>
              <input
                type="text"
                value={editingCert.titleAr}
                onChange={(e) => setEditingCert({ ...editingCert, titleAr: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">الجهة المصدرة</label>
              <input
                type="text"
                value={editingCert.issuerAr}
                onChange={(e) => setEditingCert({ ...editingCert, issuerAr: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">رابط ملف الـ PDF (مثال: /iti.pdf أو رابط ويب)</label>
            <input
              type="text"
              value={editingCert.fileUrl}
              onChange={(e) => setEditingCert({ ...editingCert, fileUrl: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#0B0C10] border border-white/[0.08] text-white text-sm font-mono"
            />
          </div>

          <div className="flex items-center gap-3 pt-3">
            <button
              type="button"
              onClick={() =>
                requestConfirm({
                  variant: 'edit',
                  title: isNewCert ? 'تأكيد إضافة شهادة جديدة' : 'تأكيد تعديل الشهادة',
                  description: isNewCert
                    ? `هل تريد إضافة الشهادة "${editingCert.titleAr || editingCert.title}"؟`
                    : `هل تريد حفظ التعديلات على الشهادة "${editingCert.titleAr || editingCert.title}"؟`,
                  confirmLabel: isNewCert ? 'تأكيد الإضافة' : 'تأكيد الحفظ',
                  onConfirm: () => {
                    if (isNewCert) {
                      addCertificate(editingCert);
                    } else {
                      updateCertificate(editingCert.id, editingCert);
                    }
                    setEditingCert(null);
                    onSaved?.();
                  },
                })
              }
              className="px-6 py-2.5 rounded-xl bg-theme-primary hover:bg-theme-primary text-white font-bold text-xs"
            >
              حفظ الشهادة
            </button>
            <button
              type="button"
              onClick={() => setEditingCert(null)}
              className="px-4 py-2.5 rounded-xl border border-white/[0.08] text-slate-400 text-xs"
            >
              إلغاء
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
