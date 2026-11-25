import React from 'react';
import {
  Sparkles,
  Laptop,
  Clock,
  BadgeCheck,
  Terminal,
  Code2,
  Rocket,
  Zap,
  Flame,
  Target,
  ShieldCheck,
  Briefcase,
  Cpu,
  Globe,
  Coffee,
  Moon,
  Minus,
} from 'lucide-react';
import type { AvailabilityIconId } from '../types';

export type AvailabilityStatusType = 'available' | 'busy' | 'offline';

export interface AvailabilityIconOption {
  id: AvailabilityIconId;
  labelAr: string;
  labelEn: string;
  descAr: string;
  descEn: string;
  isAuto?: boolean;
}

export const AVAILABILITY_ICON_OPTIONS: AvailabilityIconOption[] = [
  {
    id: 'auto',
    labelAr: 'تلقائي عصري',
    labelEn: 'Auto Modern',
    descAr: 'يتغير تلقائياً حسب الحالة (Sparkles / Laptop / Clock)',
    descEn: 'Adapts by status (Sparkles / Laptop / Clock)',
    isAuto: true,
  },
  {
    id: 'auto-tech',
    labelAr: 'تلقائي تقني',
    labelEn: 'Auto Dev',
    descAr: 'طابع المطور (BadgeCheck / Terminal / Moon)',
    descEn: 'Developer mode (BadgeCheck / Terminal / Moon)',
    isAuto: true,
  },
  { id: 'badge-check', labelAr: 'توثيق وجاهزية', labelEn: 'Verified', descAr: 'شارة تحقق', descEn: 'Verified badge' },
  { id: 'terminal', labelAr: 'موجه الأوامر', labelEn: 'Terminal', descAr: 'طابع Backend', descEn: 'Backend dev' },
  { id: 'code', labelAr: 'أكواد نظيفة', labelEn: 'Code', descAr: 'تطوير وبرمجة', descEn: 'Coding icon' },
  { id: 'rocket', labelAr: 'انطلاق وسرعة', labelEn: 'Rocket', descAr: 'جاهز للمشاريع', descEn: 'Ready to launch' },
  { id: 'zap', labelAr: 'استجابة فورية', labelEn: 'Lightning', descAr: 'نشط وسريع', descEn: 'Fast response' },
  { id: 'flame', labelAr: 'حماس ونشاط', labelEn: 'Flame', descAr: 'متاح بقوة', descEn: 'High energy' },
  { id: 'target', labelAr: 'تركيز ودقة', labelEn: 'Target', descAr: 'إنجاز دقيق', descEn: 'Goal focused' },
  { id: 'shield', labelAr: 'حماية وثقة', labelEn: 'Shield', descAr: 'نظم موثوقة', descEn: 'Trusted engineering' },
  { id: 'briefcase', labelAr: 'أعمال وعقود', labelEn: 'Work', descAr: 'وظائف وعقود', descEn: 'Contracts & roles' },
  { id: 'cpu', labelAr: 'هندسة النظم', labelEn: 'System', descAr: 'معمارية أنظمة', descEn: 'Architecture' },
  { id: 'globe', labelAr: 'عمل عن بُعد', labelEn: 'Remote', descAr: 'متاح عالمياً', descEn: 'Global remote' },
  { id: 'coffee', labelAr: 'وضع القهوة', labelEn: 'Coffee', descAr: 'عمل هادئ / استراحة', descEn: 'Focus / break' },
  { id: 'none', labelAr: 'بدون أيقونة', labelEn: 'Dot Only', descAr: 'نقطة الحالة فقط', descEn: 'Minimal status dot' },
];

const AUTO_MODERN_MAP: Record<AvailabilityStatusType, React.ComponentType<{ className?: string }>> = {
  available: Sparkles,
  busy: Laptop,
  offline: Clock,
};

const AUTO_TECH_MAP: Record<AvailabilityStatusType, React.ComponentType<{ className?: string }>> = {
  available: BadgeCheck,
  busy: Terminal,
  offline: Moon,
};

const STATIC_ICON_MAP: Record<Exclude<AvailabilityIconId, 'auto' | 'auto-tech' | 'none'>, React.ComponentType<{ className?: string }>> = {
  'badge-check': BadgeCheck,
  terminal: Terminal,
  code: Code2,
  rocket: Rocket,
  zap: Zap,
  flame: Flame,
  target: Target,
  shield: ShieldCheck,
  briefcase: Briefcase,
  cpu: Cpu,
  globe: Globe,
  coffee: Coffee,
};

export function resolveAvailabilityIconComponent(
  icon: AvailabilityIconId | undefined,
  status: AvailabilityStatusType = 'available'
): React.ComponentType<{ className?: string }> | null {
  const mode = icon || 'auto';
  if (mode === 'none') return null;
  if (mode === 'auto') return AUTO_MODERN_MAP[status] || Sparkles;
  if (mode === 'auto-tech') return AUTO_TECH_MAP[status] || BadgeCheck;
  return STATIC_ICON_MAP[mode] || Sparkles;
}

export const AvailabilityBadgeIcon: React.FC<{
  icon?: AvailabilityIconId;
  status?: AvailabilityStatusType;
  className?: string;
}> = ({ icon = 'auto', status = 'available', className = 'w-3.5 h-3.5 shrink-0 opacity-90' }) => {
  const IconComp = resolveAvailabilityIconComponent(icon, status);
  if (!IconComp) return null;
  return <IconComp className={className} />;
};

export const AvailabilityPreviewGlyph: React.FC<{
  icon: AvailabilityIconId;
  status?: AvailabilityStatusType;
  className?: string;
}> = ({ icon, status = 'available', className = 'w-4 h-4 shrink-0' }) => {
  if (icon === 'none') {
    return <Minus className={className} />;
  }
  const IconComp = resolveAvailabilityIconComponent(icon, status);
  return IconComp ? <IconComp className={className} /> : null;
};
