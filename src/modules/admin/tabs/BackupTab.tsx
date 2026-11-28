import React from 'react';
import { Download, RefreshCw, RotateCcw } from 'lucide-react';
import { usePortfolio } from '@/app/providers/PortfolioContext';
import type { RequestConfirmFn } from '../types';

interface BackupTabProps {
  requestConfirm: RequestConfirmFn;
  onSaved?: () => void;
  onHardReload?: () => Promise<void>;
}

export const BackupTab: React.FC<BackupTabProps> = ({ requestConfirm, onSaved, onHardReload }) => {
  const { exportData, importData, resetToDefault } = usePortfolio();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">النسخ الاحتياطي والاستعادة</h2>
        <p className="text-xs text-slate-400 font-mono mt-0.5">تصدير واستيراد بيانات البرتفوليو بملفات JSON</p>
      </div>

      {onHardReload && (
        <div className="p-5 sm:p-6 quantix-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-white text-sm">تحديث وإعادة تحميل التطبيق (Clear App Cache)</h3>
            <p className="text-xs text-slate-400 mt-1">
              يمسح الكاش المؤقت للواجهة ويجلب أحدث إصدار فوراً مع بقاء الجلسة مفتوحة.
            </p>
          </div>
          <button
            type="button"
            onClick={() => void onHardReload()}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-theme-primary/15 hover:bg-theme-primary/25 border border-theme-primary/35 text-theme-primary font-bold text-xs cursor-pointer shrink-0 transition-all active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            <span>إعادة تحميل التطبيق</span>
          </button>
        </div>
      )}

      <div className="p-6 quantix-card space-y-4">
        <h3 className="font-bold text-white text-sm">تصدير كامل بيانات البرتفوليو (JSON):</h3>
        <p className="text-xs text-slate-400">
          تنزيل نسخة احتياطية من جميع المشاريع، الشهادات، المهارات، والبيانات الشخصية.
        </p>
        <button
          type="button"
          onClick={exportData}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-theme-primary hover:bg-theme-primary text-white font-bold text-xs cursor-pointer shadow-md"
        >
          <Download className="w-4 h-4" />
          <span>تصدير البيانات (Export JSON)</span>
        </button>
      </div>

      <div className="p-6 quantix-card space-y-4">
        <h3 className="font-bold text-white text-sm">استيراد بيانات من ملف JSON:</h3>
        <input
          type="file"
          accept=".json"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (event) => {
              const content = event.target?.result as string;
              if (!content) return;
              requestConfirm({
                variant: 'edit',
                title: 'تأكيد استيراد النسخة الاحتياطية',
                description: 'سيتم استبدال بيانات البورتفوليو الحالية بمحتوى ملف JSON المختار.',
                confirmLabel: 'تأكيد الاستيراد',
                onConfirm: () => {
                  if (!importData(content)) {
                    alert('الملف غير صالح أو تالف.');
                  } else {
                    onSaved?.();
                  }
                },
              });
            };
            reader.readAsText(file);
          }}
          className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#14151B] file:text-slate-200 hover:file:bg-slate-700"
        />
      </div>

      <div className="p-6 rounded-2xl bg-red-950/20 border border-red-900/40 space-y-3">
        <h3 className="font-bold text-red-400 text-sm">إعادة ضبط المصنع (Reset Defaults):</h3>
        <p className="text-xs text-slate-400">
          استعادة المشاريع والشهادات والإعدادات الأولية الافتراضية.
        </p>
        <button
          type="button"
          onClick={() =>
            requestConfirm({
              variant: 'danger',
              title: 'تأكيد إعادة ضبط المصنع',
              description: 'سيتم مسح التعديلات واستعادة كافة البيانات إلى الإعدادات الأولية الافتراضية.',
              confirmLabel: 'إعادة ضبط المصنع',
              onConfirm: () => {
                resetToDefault();
                onSaved?.();
              },
            })
          }
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>إعادة ضبط المصنع</span>
        </button>
      </div>
    </div>
  );
};
