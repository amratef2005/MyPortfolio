import React, { useState, useEffect } from 'react';
import { Palette, RotateCcw, Check, Sparkles, Type, Activity, FolderGit2, Mail, ShieldCheck, Layers } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  THEME_PRESETS,
  DEFAULT_THEME_COLORS,
  buildThemeColors,
  buildAutoThemeColors,
  FONT_PRESETS,
  DEFAULT_FONT_PRESET,
  FontPresetId,
  ICON_PACKS,
  DEFAULT_ICON_PACK,
  IconPackId,
  ThemePreset,
} from '../utils/themeUtils';
import { adminTranslations } from './adminTranslations';
import { RgbColorSphere } from './RgbColorSphere';
import { ConfirmActionModal, ConfirmActionState } from './ConfirmActionModal';

const RECENT_COLORS_KEY = 'portfolio_recent_colors';

const FALLBACK_RECENT_COLORS: ThemePreset[] = THEME_PRESETS.slice(1, 4);

function loadRecentColors(): ThemePreset[] {
  try {
    const raw = localStorage.getItem(RECENT_COLORS_KEY);
    if (!raw) return FALLBACK_RECENT_COLORS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.slice(0, 3);
    }
  } catch {
    // ignore storage read errors
  }
  return FALLBACK_RECENT_COLORS;
}

export const ThemePickerPanel: React.FC<{ onSaved?: () => void }> = ({ onSaved }) => {
  const { profile, updateProfile, lang } = usePortfolio();
  const t = adminTranslations[lang].theme;

  const currentPrimary = profile.extractedColors?.primary || DEFAULT_THEME_COLORS.primary;
  const currentSecondary = profile.extractedColors?.secondary || DEFAULT_THEME_COLORS.secondary;
  const currentAccent = profile.extractedColors?.accent || DEFAULT_THEME_COLORS.accent;
  const currentFont: FontPresetId = profile.fontPreset || DEFAULT_FONT_PRESET;
  const currentIconPack: IconPackId = profile.iconPack || DEFAULT_ICON_PACK;

  const [recentColors, setRecentColors] = useState<ThemePreset[]>(loadRecentColors);
  const [draftColor, setDraftColor] = useState<string>(currentPrimary);
  const [confirmState, setConfirmState] = useState<ConfirmActionState>({
    isOpen: false,
    variant: 'edit',
    title: '',
    description: '',
    onConfirm: () => {},
  });

  useEffect(() => {
    setDraftColor(currentPrimary);
  }, [currentPrimary]);

  const requestConfirm = (opts: Omit<ConfirmActionState, 'isOpen'>) => {
    setConfirmState({ ...opts, isOpen: true });
  };

  const recordRecentColor = (primary: string, secondary: string, accent: string) => {
    const upper = primary.toUpperCase();
    if (upper === DEFAULT_THEME_COLORS.primary.toUpperCase()) return;

    setRecentColors((prev) => {
      const filtered = prev.filter((item) => item.primary.toUpperCase() !== upper);
      const entry: ThemePreset = {
        id: `custom-${upper}`,
        name: upper,
        nameAr: upper,
        primary: upper,
        secondary: secondary.toUpperCase(),
        accent: accent.toUpperCase(),
      };
      const next = [entry, ...filtered].slice(0, 3);
      try {
        localStorage.setItem(RECENT_COLORS_KEY, JSON.stringify(next));
      } catch {
        // ignore storage write errors
      }
      return next;
    });
  };

  const applyPreset = (primary: string, secondary: string, accent: string) => {
    requestConfirm({
      variant: 'edit',
      title: lang === 'ar' ? 'تأكيد تغيير اللون' : 'Confirm Color Change',
      description:
        lang === 'ar'
          ? `هل تريد تطبيق اللون ${primary} وتدرجاته على البورتفوليو ولوحة التحكم؟`
          : `Apply color ${primary} and its gradient shades to Portfolio & Dashboard?`,
      confirmLabel: lang === 'ar' ? 'تطبيق اللون' : 'Apply Color',
      cancelLabel: lang === 'ar' ? 'إلغاء' : 'Cancel',
      onConfirm: () => {
        updateProfile({
          extractedColors: buildThemeColors(primary, secondary, accent),
        });
        onSaved?.();
      },
    });
  };

  const handleSphereChange = (hex: string) => {
    setDraftColor(hex);
  };

  const handleSphereCommit = (hex: string) => {
    const built = buildAutoThemeColors(hex);
    requestConfirm({
      variant: 'edit',
      title: lang === 'ar' ? 'تأكيد تطبيق اللون المختار' : 'Confirm Selected RGB Color',
      description:
        lang === 'ar'
          ? `هل تريد تطبيق اللون ${built.primary} (والثانوي ${built.secondary}) على البورتفوليو ولوحة التحكم؟`
          : `Apply ${built.primary} (secondary ${built.secondary}) to Portfolio & Dashboard?`,
      confirmLabel: lang === 'ar' ? 'تطبيق اللون' : 'Apply Color',
      cancelLabel: lang === 'ar' ? 'إلغاء' : 'Cancel',
      onConfirm: () => {
        updateProfile({ extractedColors: built });
        recordRecentColor(built.primary, built.secondary || built.primary, built.accent || built.primary);
        onSaved?.();
      },
    });
  };

  const handleCustomChange = (field: 'primary' | 'secondary', hex: string) => {
    const built =
      field === 'primary'
        ? buildAutoThemeColors(hex)
        : buildThemeColors(currentPrimary, hex, currentAccent);
    requestConfirm({
      variant: 'edit',
      title: lang === 'ar' ? 'تأكيد تعديل اللون' : 'Confirm Color Update',
      description:
        lang === 'ar'
          ? `هل تريد تطبيق اللون ${hex.toUpperCase()} على البورتفوليو ولوحة التحكم؟`
          : `Apply ${hex.toUpperCase()} to Portfolio & Dashboard?`,
      confirmLabel: lang === 'ar' ? 'تأكيد التعديل' : 'Apply Color',
      cancelLabel: lang === 'ar' ? 'إلغاء' : 'Cancel',
      onConfirm: () => {
        updateProfile({ extractedColors: built });
        recordRecentColor(built.primary, built.secondary || built.primary, built.accent || built.primary);
        onSaved?.();
      },
    });
  };

  const handleFontSelect = (fontId: FontPresetId) => {
    const selected = FONT_PRESETS.find((f) => f.id === fontId);
    const label = lang === 'ar' ? (selected?.nameAr || fontId) : (selected?.name || fontId);
    requestConfirm({
      variant: 'edit',
      title: lang === 'ar' ? 'تأكيد تغيير الخط' : 'Confirm Font Change',
      description:
        lang === 'ar'
          ? `هل تريد تطبيق خط "${label}" على البورتفوليو ولوحة التحكم بالكامل؟`
          : `Apply "${label}" font across Portfolio & Dashboard?`,
      confirmLabel: lang === 'ar' ? 'تطبيق الخط' : 'Apply Font',
      cancelLabel: lang === 'ar' ? 'إلغاء' : 'Cancel',
      onConfirm: () => {
        updateProfile({ fontPreset: fontId });
        onSaved?.();
      },
    });
  };

  const handleIconPackSelect = (packId: IconPackId) => {
    const selected = ICON_PACKS.find((p) => p.id === packId);
    const label = lang === 'ar' ? (selected?.nameAr || packId) : (selected?.name || packId);
    requestConfirm({
      variant: 'edit',
      title: lang === 'ar' ? 'تأكيد تغيير حزمة الأيقونات' : 'Confirm Icon Pack Change',
      description:
        lang === 'ar'
          ? `هل تريد تطبيق حزمة "${label}" على كل أيقونات البورتفوليو ولوحة التحكم؟`
          : `Apply "${label}" across all Portfolio & Admin icons?`,
      confirmLabel: lang === 'ar' ? 'تطبيق الحزمة' : 'Apply Icons',
      cancelLabel: lang === 'ar' ? 'إلغاء' : 'Cancel',
      onConfirm: () => {
        updateProfile({ iconPack: packId });
        onSaved?.();
      },
    });
  };

  const handleReset = () => {
    requestConfirm({
      variant: 'danger',
      title: lang === 'ar' ? 'تأكيد إعادة تعيين المظهر بالكامل' : 'Confirm Full Appearance Reset',
      description:
        lang === 'ar'
          ? 'سيتم إرجاع الألوان والخطوط وحزمة الأيقونات إلى الإعدادات الافتراضية.'
          : 'This will reset colors, typography, and icon pack back to default settings.',
      confirmLabel: lang === 'ar' ? 'تأكيد الإعادة' : 'Reset Default',
      cancelLabel: lang === 'ar' ? 'إلغاء' : 'Cancel',
      onConfirm: () => {
        updateProfile({
          extractedColors: DEFAULT_THEME_COLORS,
          fontPreset: DEFAULT_FONT_PRESET,
          iconPack: DEFAULT_ICON_PACK,
        });
        onSaved?.();
      },
    });
  };

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10"
            style={{
              background: `linear-gradient(135deg, rgba(var(--theme-primary-rgb), 0.22), rgba(var(--theme-secondary-rgb), 0.12))`,
              color: 'var(--theme-primary)',
            }}
          >
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">{t.title}</h3>
            <p className="text-xs text-slate-400">{t.subtitle}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-medium text-slate-300 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{t.reset}</span>
        </button>
      </div>

      {/* Presets: Default on Top + Last 3 Applied Colors Below */}
      <div className="space-y-3">
        {(() => {
          const defaultPreset = THEME_PRESETS[0];
          const renderPresetCard = (preset: (typeof THEME_PRESETS)[number]) => {
            const isSelected = currentPrimary.toLowerCase() === preset.primary.toLowerCase();
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset.primary, preset.secondary, preset.accent)}
                className={`quantix-card quantix-card-interactive group relative p-4 text-start flex items-center justify-between gap-3 w-full ${
                  isSelected ? 'border-theme-primary/50 shadow-lg' : ''
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className="w-9 h-9 rounded-xl shrink-0 border border-white/20 shadow-inner"
                    style={{
                      background: `linear-gradient(135deg, ${preset.primary}, ${preset.secondary})`,
                      boxShadow: isSelected ? `0 0 18px ${preset.primary}66` : undefined,
                    }}
                  />
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white truncate">
                      {lang === 'ar' ? preset.nameAr : preset.name}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400">{preset.primary}</div>
                  </div>
                </div>
                {isSelected && (
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0"
                    style={{ backgroundColor: preset.primary }}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </span>
                )}
              </button>
            );
          };

          return (
            <>
              {defaultPreset && renderPresetCard(defaultPreset)}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {recentColors.map(renderPresetCard)}
              </div>
            </>
          );
        })()}
      </div>

      {/* RGB Color Sphere + Live Preview */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-7 quantix-card p-5 space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-theme-primary" />
              {t.customTitle}
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">{t.rgbSphereHint}</p>
          </div>

          <RgbColorSphere
            color={draftColor}
            onChange={handleSphereChange}
            onCommit={handleSphereCommit}
            brightnessLabel={t.brightness}
          />

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/[0.06]">
            <label className="flex items-center justify-between gap-3 p-3 rounded-xl bg-black/40 border border-white/[0.08] cursor-pointer">
              <div>
                <div className="text-xs font-semibold text-slate-200">{t.primaryColor}</div>
                <div className="text-[11px] font-mono text-slate-400">{currentPrimary}</div>
              </div>
              <input
                type="color"
                value={currentPrimary}
                onChange={(e) => handleCustomChange('primary', e.target.value)}
                className="w-9 h-9 rounded-lg bg-transparent border-0 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between gap-3 p-3 rounded-xl bg-black/40 border border-white/[0.08] cursor-pointer">
              <div>
                <div className="text-xs font-semibold text-slate-200">{t.secondaryColor}</div>
                <div className="text-[11px] font-mono text-slate-400">{currentSecondary}</div>
              </div>
              <input
                type="color"
                value={currentSecondary}
                onChange={(e) => handleCustomChange('secondary', e.target.value)}
                className="w-9 h-9 rounded-lg bg-transparent border-0 cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Live Preview */}
        <div className="xl:col-span-5 quantix-card p-5 flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">{t.livePreview}</span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold border border-theme-primary/35 bg-theme-primary/15 text-theme-primary">
              {t.activeTheme}
            </span>
          </div>

          {/* 3-Shade Gradient Swatch Bar */}
          <div className="space-y-2">
            <div className="text-[11px] font-mono text-slate-400">{t.derivedShades}</div>
            <div
              className="h-3 w-full rounded-full border border-white/10"
              style={{
                background: `linear-gradient(90deg, ${currentAccent}, ${currentPrimary}, ${currentSecondary})`,
              }}
            />
            <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
              <div className="p-2 rounded-lg bg-black/40 border border-white/[0.06]">
                <span className="block w-full h-1.5 rounded-full mb-1" style={{ backgroundColor: currentPrimary }} />
                <span className="text-slate-300 block truncate">{t.primaryColor}</span>
                <span className="text-slate-500">{currentPrimary}</span>
              </div>
              <div className="p-2 rounded-lg bg-black/40 border border-white/[0.06]">
                <span className="block w-full h-1.5 rounded-full mb-1" style={{ backgroundColor: currentSecondary }} />
                <span className="text-slate-300 block truncate">{t.secondaryColor}</span>
                <span className="text-slate-500">{currentSecondary}</span>
              </div>
              <div className="p-2 rounded-lg bg-black/40 border border-white/[0.06]">
                <span className="block w-full h-1.5 rounded-full mb-1" style={{ backgroundColor: currentAccent }} />
                <span className="text-slate-300 block truncate">{t.accentColor}</span>
                <span className="text-slate-500">{currentAccent}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg"
              style={{
                background: `linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))`,
                boxShadow: `0 8px 24px -6px rgba(var(--theme-primary-rgb), 0.55)`,
              }}
            >
              {t.primaryBtn}
            </div>
            <div className="px-4 py-2.5 rounded-xl text-xs font-semibold border border-theme-primary/40 bg-white/[0.03] text-theme-secondary">
              {t.badgeHighlight}
            </div>
          </div>
        </div>
      </div>

      {/* Arabic & English Font Pairing Selector */}
      <div className="pt-4 border-t border-white/[0.07] space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 bg-theme-primary/15 text-theme-primary">
            <Type className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">{t.fontsTitle}</h3>
            <p className="text-xs text-slate-400">{t.fontsSubtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {FONT_PRESETS.map((font) => {
            const isSelected = currentFont === font.id;
            return (
              <button
                key={font.id}
                type="button"
                onClick={() => handleFontSelect(font.id)}
                className={`quantix-card quantix-card-interactive p-4 text-start flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'border-theme-primary/50 shadow-lg'
                    : ''
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-sm font-bold text-white">
                      {lang === 'ar' ? font.nameAr : font.name}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {lang === 'ar' ? font.subtitleAr : font.subtitle}
                    </div>
                  </div>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-theme-primary text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] space-y-1">
                  <div
                    className="text-xs font-semibold text-slate-200 truncate"
                    style={{ fontFamily: font.displayEn }}
                  >
                    {t.fontPreviewEn}
                  </div>
                  <div
                    className="text-xs font-semibold text-theme-primary truncate"
                    style={{ fontFamily: font.displayAr }}
                    dir="rtl"
                  >
                    {t.fontPreviewAr}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Global Icon Pack Selector (3 Packs Applied Everywhere) */}
      <div className="pt-4 border-t border-white/[0.07] space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 bg-theme-primary/15 text-theme-primary">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">{t.iconsTitle}</h3>
            <p className="text-xs text-slate-400">{t.iconsSubtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {ICON_PACKS.map((pack) => {
            const isSelected = currentIconPack === pack.id;
            const previewClass =
              pack.id === 'duotone-glow'
                ? 'icon-preview-duotone'
                : pack.id === 'apple-bold'
                ? 'icon-preview-apple'
                : 'icon-preview-crisp';

            return (
              <button
                key={pack.id}
                type="button"
                onClick={() => handleIconPackSelect(pack.id)}
                className={`quantix-card quantix-card-interactive p-4 text-start flex flex-col justify-between gap-3.5 ${
                  isSelected ? 'border-theme-primary/60 shadow-lg ring-1 ring-theme-primary/35' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-white truncate">
                      {lang === 'ar' ? pack.nameAr : pack.name}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      {lang === 'ar' ? pack.descriptionAr : pack.description}
                    </p>
                  </div>
                  {isSelected && (
                    <span className="w-6 h-6 rounded-full bg-theme-primary text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>

                {/* Live Sample Icons Bar using that Pack's isolated preview CSS */}
                <div
                  className={`p-3 rounded-xl bg-black/40 border border-white/[0.06] flex items-center justify-between gap-2 ${previewClass}`}
                >
                  {[Activity, FolderGit2, Mail, ShieldCheck, Sparkles].map((SampleIcon, i) => (
                    <span
                      key={i}
                      className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-theme-primary"
                    >
                      <SampleIcon className="w-4 h-4" />
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <ConfirmActionModal
        {...confirmState}
        onClose={() => {
          setDraftColor(currentPrimary);
          setConfirmState((prev) => ({ ...prev, isOpen: false }));
        }}
      />
    </div>
  );
};
