/**
 * Dynamic Adaptive Color Extractor
 * Extracts dominant vibrant, secondary, and ambient glow colors from an image
 * using an off-screen HTML5 Canvas and clusters by HSL hue and saturation.
 * Injects dynamic CSS variables on :root to adapt the entire portfolio theme.
 */

export interface ExtractedPalette {
  primary: string;           // HEX e.g. #06b6d4
  primaryRgb: string;        // "6, 182, 212"
  secondary: string;         // HEX e.g. #3b82f6
  secondaryRgb: string;      // "59, 130, 246"
  accent: string;            // HEX e.g. #6366f1
  accentRgb: string;         // "99, 102, 241"
  glow: string;              // "rgba(6, 182, 212, 0.35)"
  glowSecondary: string;     // "rgba(59, 130, 246, 0.25)"
}

export const DEFAULT_PALETTE: ExtractedPalette = {
  primary: '#FF5722',
  primaryRgb: '255, 87, 34',
  secondary: '#FF7A00',
  secondaryRgb: '255, 122, 0',
  accent: '#E64A19',
  accentRgb: '230, 74, 25',
  glow: 'rgba(255, 87, 34, 0.45)',
  glowSecondary: 'rgba(255, 122, 0, 0.3)'
};

// Convert RGB to HSL
export function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h * 360, s, l];
}

// Convert HSL to RGB
export function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h = (h % 360 + 360) % 360;
  h /= 360;
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleanHex = hex.replace('#', '').trim();
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16);
    const g = parseInt(cleanHex[1] + cleanHex[1], 16);
    const b = parseInt(cleanHex[2] + cleanHex[2], 16);
    return { r, g, b };
  }
  if (cleanHex.length === 6) {
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return { r, g, b };
  }
  return null;
}

/**
 * Extracts a balanced cyber-dark theme palette from any image source.
 * Automatically boosts saturation and sets optimal luminance so colors
 * shine radiantly on the dark background.
 */
export async function extractColorsFromImage(imageSrc: string): Promise<ExtractedPalette> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(DEFAULT_PALETTE);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const size = 80;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          resolve(DEFAULT_PALETTE);
          return;
        }

        ctx.drawImage(img, 0, 0, size, size);
        const { data } = ctx.getImageData(0, 0, size, size);

        // 12 Hue Buckets (30 degrees each)
        const buckets: { [key: number]: { count: number; weight: number; hueSum: number; satSum: number } } = {};
        for (let i = 0; i < 12; i++) {
          buckets[i] = { count: 0, weight: 0, hueSum: 0, satSum: 0 };
        }

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];

          // Skip transparent or near-transparent pixels
          if (a < 120) continue;

          // Perceived brightness
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          // Skip pure black and pure white
          if (lum < 20 || lum > 245) continue;

          const [h, s] = rgbToHsl(r, g, b);
          // Skip completely desaturated gray/black
          if (s < 0.12) continue;

          const bin = Math.floor(h / 30) % 12;
          const weight = 1 + s * 3.5;

          buckets[bin].count += 1;
          buckets[bin].weight += weight;
          buckets[bin].hueSum += h * weight;
          buckets[bin].satSum += s * weight;
        }

        // Sort bins by weight
        const sortedBins = Object.entries(buckets)
          .map(([bin, val]) => ({ bin: parseInt(bin, 10), ...val }))
          .filter((b) => b.count > 5)
          .sort((a, b) => b.weight - a.weight);

        if (sortedBins.length === 0) {
          resolve(DEFAULT_PALETTE);
          return;
        }

        // 1. Primary Hue
        const primaryBin = sortedBins[0];
        const primaryHue = primaryBin.hueSum / primaryBin.weight;

        // 2. Secondary Hue: Pick a distinct bin (at least 45° away from primary)
        let secondaryHue = (primaryHue + 40) % 360;
        const distinctBin = sortedBins.find((b) => {
          const diff = Math.abs(b.bin * 30 - primaryBin.bin * 30);
          const circularDiff = Math.min(diff, 360 - diff);
          return circularDiff >= 45;
        });

        if (distinctBin) {
          secondaryHue = distinctBin.hueSum / distinctBin.weight;
        } else {
          // If all colors belong to same hue cluster, synthesize a pleasing harmonious analog
          secondaryHue = (primaryHue + 35) % 360;
        }

        // 3. Accent Hue (triadic or complementary shift)
        const accentHue = (primaryHue + 180) % 360;

        // Normalize for cyber dark theme:
        // High saturation (0.75 - 0.90) and vibrant lightness (0.50 - 0.60)
        const [pr, pg, pb] = hslToRgb(primaryHue, 0.85, 0.55);
        const [sr, sg, sb] = hslToRgb(secondaryHue, 0.80, 0.58);
        const [ar, ag, ab] = hslToRgb(accentHue, 0.78, 0.54);

        const primaryHex = rgbToHex(pr, pg, pb);
        const secondaryHex = rgbToHex(sr, sg, sb);
        const accentHex = rgbToHex(ar, ag, ab);

        const palette: ExtractedPalette = {
          primary: primaryHex,
          primaryRgb: `${pr}, ${pg}, ${pb}`,
          secondary: secondaryHex,
          secondaryRgb: `${sr}, ${sg}, ${sb}`,
          accent: accentHex,
          accentRgb: `${ar}, ${ag}, ${ab}`,
          glow: `rgba(${pr}, ${pg}, ${pb}, 0.35)`,
          glowSecondary: `rgba(${sr}, ${sg}, ${sb}, 0.25)`
        };

        resolve(palette);
      } catch (err) {
        console.warn('Could not extract colors from image, using default:', err);
        resolve(DEFAULT_PALETTE);
      }
    };

    img.onerror = () => {
      resolve(DEFAULT_PALETTE);
    };

    img.src = imageSrc;
  });
}

/**
 * Injects CSS variables onto :root to immediately tint the entire website.
 */
export function applyThemeColors(palette: ExtractedPalette) {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  root.style.setProperty('--theme-primary', palette.primary);
  root.style.setProperty('--theme-primary-rgb', palette.primaryRgb);
  root.style.setProperty('--theme-secondary', palette.secondary);
  root.style.setProperty('--theme-secondary-rgb', palette.secondaryRgb);
  root.style.setProperty('--theme-accent', palette.accent);
  root.style.setProperty('--theme-accent-rgb', palette.accentRgb);
  root.style.setProperty('--theme-glow', palette.glow);
  root.style.setProperty('--theme-glow-secondary', palette.glowSecondary);
  root.style.setProperty('--theme-glow-ambient', `rgba(${palette.primaryRgb}, 0.15)`);
}
