import { ProfileInfo } from '../types';

export interface ThemePreset {
  id: string;
  name: string;
  nameAr: string;
  primary: string;
  secondary: string;
  accent: string;
}

export const DEFAULT_THEME_COLORS: NonNullable<ProfileInfo['extractedColors']> = {
  primary: '#FF5722',
  primaryRgb: '255, 87, 34',
  secondary: '#FF7A00',
  secondaryRgb: '255, 122, 0',
  accent: '#E64A19',
  accentRgb: '230, 74, 25',
  glow: 'rgba(255, 87, 34, 0.45)',
  glowSecondary: 'rgba(255, 122, 0, 0.3)',
};

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'burnt-orange',
    name: 'Burnt Orange (Default)',
    nameAr: 'برتقالي ناري (الافتراضي)',
    primary: '#FF5722',
    secondary: '#FF7A00',
    accent: '#E64A19',
  },
  {
    id: 'royal-violet',
    name: 'Royal Violet',
    nameAr: 'بنفسجي ملكي',
    primary: '#8B5CF6',
    secondary: '#A78BFA',
    accent: '#7C3AED',
  },
  {
    id: 'crimson-rose',
    name: 'Crimson Rose',
    nameAr: 'وردي قرمزي',
    primary: '#F43F5E',
    secondary: '#FB7185',
    accent: '#E11D48',
  },
  {
    id: 'amber-gold',
    name: 'Amber Gold',
    nameAr: 'ذهبي عنبري',
    primary: '#F59E0B',
    secondary: '#FBBF24',
    accent: '#D97706',
  },
];

export function hexToRgbString(hex: string): string {
  const { r, g, b } = hexToRgb(hex);
  return `${r}, ${g}, ${b}`;
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace('#', '').trim();
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean;
  const num = parseInt(full, 16);
  if (Number.isNaN(num)) return { r: 255, g: 87, b: 34 };
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return (
    '#' +
    [clamp(r), clamp(g), clamp(b)]
      .map((v) => v.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase()
  );
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === rn) h = (gn - bn) / d + (gn < bn ? 6 : 0);
    else if (max === gn) h = (bn - rn) / d + 2;
    else h = (rn - gn) / d + 4;
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex(h: number, s: number, l: number): string {
  const hn = (((h % 360) + 360) % 360) / 360;
  const sn = Math.max(0, Math.min(100, s)) / 100;
  const ln = Math.max(0, Math.min(100, l)) / 100;

  if (sn === 0) {
    const val = Math.round(ln * 255);
    return rgbToHex(val, val, val);
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };

  const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
  const p = 2 * ln - q;
  return rgbToHex(
    hue2rgb(p, q, hn + 1 / 3) * 255,
    hue2rgb(p, q, hn) * 255,
    hue2rgb(p, q, hn - 1 / 3) * 255
  );
}

/** Derives harmonious secondary (brighter/warmer) and accent (deeper) shades from a primary color. */
export function buildAutoThemeColors(
  primaryHex: string
): NonNullable<ProfileInfo['extractedColors']> {
  const { r, g, b } = hexToRgb(primaryHex);
  const { h, s, l } = rgbToHsl(r, g, b);

  const secondaryHex = hslToHex(h + 14, Math.min(100, Math.max(s, 85)), Math.min(60, Math.max(48, l + 4)));
  const accentHex = hslToHex(h - 4, Math.min(100, s), Math.max(28, l - 8));

  return buildThemeColors(rgbToHex(r, g, b), secondaryHex, accentHex);
}

export function buildThemeColors(
  primary: string,
  secondary: string,
  accent?: string
): NonNullable<ProfileInfo['extractedColors']> {
  const primaryRgb = hexToRgbString(primary);
  const secondaryRgb = hexToRgbString(secondary);
  const finalAccent = accent || primary;
  const accentRgb = hexToRgbString(finalAccent);

  return {
    primary,
    primaryRgb,
    secondary,
    secondaryRgb,
    accent: finalAccent,
    accentRgb,
    glow: `rgba(${primaryRgb}, 0.45)`,
    glowSecondary: `rgba(${secondaryRgb}, 0.3)`,
  };
}

/** Applies the active theme colors to :root CSS variables for both Portfolio & Admin Dashboard. */
export function applyThemeColors(colors?: ProfileInfo['extractedColors']) {
  if (typeof document === 'undefined') return;
  let active = colors?.primary ? colors : DEFAULT_THEME_COLORS;

  if (
    active.primary &&
    (!active.secondary ||
      !active.accent ||
      active.secondary.toLowerCase() === active.primary.toLowerCase())
  ) {
    const derived = buildAutoThemeColors(active.primary);
    active = {
      ...derived,
      ...active,
      secondary:
        active.secondary && active.secondary.toLowerCase() !== active.primary.toLowerCase()
          ? active.secondary
          : derived.secondary,
      secondaryRgb:
        active.secondary && active.secondary.toLowerCase() !== active.primary.toLowerCase()
          ? active.secondaryRgb || hexToRgbString(active.secondary)
          : derived.secondaryRgb,
      accent: active.accent || derived.accent,
      accentRgb: active.accent ? active.accentRgb || hexToRgbString(active.accent) : derived.accentRgb,
    };
  }

  const root = document.documentElement.style;

  const pRgb = active.primaryRgb || hexToRgbString(active.primary);
  const sRgb = active.secondaryRgb || hexToRgbString(active.secondary || active.primary);
  const aRgb = active.accentRgb || hexToRgbString(active.accent || active.primary);

  root.setProperty('--theme-primary', active.primary);
  root.setProperty('--theme-primary-rgb', pRgb);
  root.setProperty('--theme-primary-space', pRgb.replace(/,\s*/g, ' '));
  root.setProperty('--theme-secondary', active.secondary || active.primary);
  root.setProperty('--theme-secondary-rgb', sRgb);
  root.setProperty('--theme-secondary-space', sRgb.replace(/,\s*/g, ' '));
  root.setProperty('--theme-accent', active.accent || active.primary);
  root.setProperty('--theme-accent-rgb', aRgb);
  root.setProperty('--theme-accent-space', aRgb.replace(/,\s*/g, ' '));
  root.setProperty('--theme-glow', active.glow || `rgba(${pRgb}, 0.45)`);
  root.setProperty('--theme-glow-secondary', active.glowSecondary || `rgba(${sRgb}, 0.3)`);
  root.setProperty('--theme-glow-ambient', `rgba(${pRgb}, 0.15)`);
}

export type FontPresetId = 'plex-jakarta' | 'cairo-outfit' | 'alexandria-dm' | 'ruqaa-dancing';

export interface FontPreset {
  id: FontPresetId;
  name: string;
  nameAr: string;
  subtitle: string;
  subtitleAr: string;
  sansEn: string;
  displayEn: string;
  sansAr: string;
  displayAr: string;
}

export const DEFAULT_FONT_PRESET: FontPresetId = 'plex-jakarta';

export const FONT_PRESETS: FontPreset[] = [
  {
    id: 'plex-jakarta',
    name: 'Plus Jakarta Sans + IBM Plex Arabic',
    nameAr: 'IBM Plex Sans Arabic + Plus Jakarta',
    subtitle: 'Modern dark-UI precision with Space Grotesk headings',
    subtitleAr: 'عصري وفخم، متناسق جداً مع تصميم الداشبورد الداكن',
    sansEn: '"Plus Jakarta Sans", "Inter", sans-serif',
    displayEn: '"Space Grotesk", "Plus Jakarta Sans", sans-serif',
    sansAr: '"IBM Plex Sans Arabic", "Cairo", sans-serif',
    displayAr: '"IBM Plex Sans Arabic", "Cairo", sans-serif',
  },
  {
    id: 'cairo-outfit',
    name: 'Outfit + Cairo',
    nameAr: 'Cairo + Outfit + Inter',
    subtitle: 'Bold geometric headings with crisp Inter body',
    subtitleAr: 'هندسي وجريء، ممتاز للعناوين الكبيرة في البورتفوليو',
    sansEn: '"Inter", "Plus Jakarta Sans", sans-serif',
    displayEn: '"Outfit", "Inter", sans-serif',
    sansAr: '"Cairo", "IBM Plex Sans Arabic", sans-serif',
    displayAr: '"Cairo", "IBM Plex Sans Arabic", sans-serif',
  },
  {
    id: 'alexandria-dm',
    name: 'DM Sans + Alexandria',
    nameAr: 'Alexandria + DM Sans',
    subtitle: 'Ultra-clean, soft, and highly readable minimal pairing',
    subtitleAr: 'بسيط وناعم وحديث، قراءة مريحة جداً',
    sansEn: '"DM Sans", "Inter", sans-serif',
    displayEn: '"DM Sans", "Space Grotesk", sans-serif',
    sansAr: '"Alexandria", "IBM Plex Sans Arabic", sans-serif',
    displayAr: '"Alexandria", "IBM Plex Sans Arabic", sans-serif',
  },
  {
    id: 'ruqaa-dancing',
    name: 'Dancing Script + Aref Ruqaa',
    nameAr: 'الرقة + Dancing Script',
    subtitle: 'Elegant handwritten script pairing for headings & body',
    subtitleAr: 'خط الرقة العربي مع خط Dancing Script الإنجليزي لكل النصوص',
    sansEn: '"Dancing Script", cursive',
    displayEn: '"Dancing Script", cursive',
    sansAr: '"Aref Ruqaa", "Cairo", serif',
    displayAr: '"Aref Ruqaa", "Cairo", serif',
  },
];

/** Applies the active Arabic & English font pairing to :root CSS variables. */
export function applyFontPreset(presetId?: FontPresetId) {
  if (typeof document === 'undefined') return;
  const preset = FONT_PRESETS.find((f) => f.id === presetId) || FONT_PRESETS[0];
  const root = document.documentElement.style;

  root.setProperty('--font-sans-en', preset.sansEn);
  root.setProperty('--font-display-en', preset.displayEn);
  root.setProperty('--font-sans-ar', preset.sansAr);
  root.setProperty('--font-display-ar', preset.displayAr);
}

export const THEME_CACHE_KEY = 'portfolio_theme_cache';

/** Stores a compact theme cache so pre-paint scripts can hydrate colors/fonts immediately on reload. */
export function persistThemeCache(
  extractedColors?: ProfileInfo['extractedColors'],
  fontPreset?: FontPresetId
) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    if (!extractedColors?.primary && !fontPreset) {
      localStorage.removeItem(THEME_CACHE_KEY);
      return;
    }
    localStorage.setItem(
      THEME_CACHE_KEY,
      JSON.stringify({
        extractedColors: extractedColors?.primary ? extractedColors : null,
        fontPreset: fontPreset || null,
      })
    );
  } catch {
    // ignore storage quota errors
  }
}
