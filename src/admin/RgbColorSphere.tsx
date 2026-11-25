import React, { useEffect, useRef, useState, useCallback } from 'react';
import { hexToRgb, rgbToHex } from '../utils/themeUtils';

interface RgbColorSphereProps {
  color: string;
  onChange: (hex: string) => void;
  onCommit?: (hex: string) => void;
  brightnessLabel: string;
}

function hsvToRgb(h: number, s: number, v: number): { r: number; g: number; b: number } {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let rn = 0;
  let gn = 0;
  let bn = 0;

  if (h < 60) {
    rn = c; gn = x; bn = 0;
  } else if (h < 120) {
    rn = x; gn = c; bn = 0;
  } else if (h < 180) {
    rn = 0; gn = c; bn = x;
  } else if (h < 240) {
    rn = 0; gn = x; bn = c;
  } else if (h < 300) {
    rn = x; gn = 0; bn = c;
  } else {
    rn = c; gn = 0; bn = x;
  }

  return {
    r: Math.round((rn + m) * 255),
    g: Math.round((gn + m) * 255),
    b: Math.round((bn + m) * 255),
  };
}

function rgbToHsv(r: number, g: number, b: number): { h: number; s: number; v: number } {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const d = max - min;
  let h = 0;

  if (d !== 0) {
    if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) * 60;
    else if (max === gn) h = ((bn - rn) / d + 2) * 60;
    else h = ((rn - gn) / d + 4) * 60;
  }

  const s = max === 0 ? 0 : d / max;
  return { h, s, v: max };
}

export const RgbColorSphere: React.FC<RgbColorSphereProps> = ({
  color,
  onChange,
  onCommit,
  brightnessLabel,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const { r, g, b } = hexToRgb(color);
  const hsv = rgbToHsv(r, g, b);
  const brightness = Math.max(0.2, hsv.v);

  const size = 210;
  const radius = size / 2;

  // Draw the 3D-shaded RGB color sphere
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = ctx.createImageData(size, size);
    const data = img.data;

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const dx = x - radius;
        const dy = y - radius;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const idx = (y * size + x) * 4;

        if (dist <= radius) {
          const sat = Math.min(1, dist / radius);
          let angle = (Math.atan2(dy, dx) * 180) / Math.PI;
          if (angle < 0) angle += 360;

          const rgb = hsvToRgb(angle, sat, brightness);

          // Subtle 3D spherical shading (top-left specular highlight + edge depth)
          const nx = dx / radius;
          const ny = dy / radius;
          const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));
          const light = Math.max(0.75, Math.min(1.14, 0.78 + 0.36 * (nz * 0.85 - nx * 0.25 - ny * 0.25)));

          data[idx] = Math.min(255, Math.round(rgb.r * light));
          data[idx + 1] = Math.min(255, Math.round(rgb.g * light));
          data[idx + 2] = Math.min(255, Math.round(rgb.b * light));
          data[idx + 3] = dist > radius - 1.5 ? Math.round((radius - dist) * 170) : 255;
        } else {
          data[idx + 3] = 0;
        }
      }
    }

    ctx.putImageData(img, 0, 0);
  }, [brightness]);

  const pickFromPoint = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = size / rect.width;
      const scaleY = size / rect.height;
      const dx = (clientX - rect.left) * scaleX - radius;
      const dy = (clientY - rect.top) * scaleY - radius;
      const dist = Math.min(radius, Math.sqrt(dx * dx + dy * dy));
      const sat = dist / radius;
      let angle = (Math.atan2(dy, dx) * 180) / Math.PI;
      if (angle < 0) angle += 360;

      const next = hsvToRgb(angle, sat, brightness);
      onChange(rgbToHex(next.r, next.g, next.b));
    },
    [brightness, onChange, radius]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    pickFromPoint(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    pickFromPoint(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    if (isDragging) {
      setIsDragging(false);
      onCommit?.(color);
    }
  };

  // Marker coordinates on the sphere
  const markerAngle = (hsv.h * Math.PI) / 180;
  const markerDist = hsv.s * (radius - 6);
  const markerX = ((radius + Math.cos(markerAngle) * markerDist) / size) * 100;
  const markerY = ((radius + Math.sin(markerAngle) * markerDist) / size) * 100;

  const handleRgbChannel = (channel: 'r' | 'g' | 'b', val: number) => {
    const clamped = Math.max(0, Math.min(255, Number.isNaN(val) ? 0 : val));
    const next = { r, g, b, [channel]: clamped };
    onChange(rgbToHex(next.r, next.g, next.b));
  };

  const handleBrightnessChange = (val: number) => {
    const next = hsvToRgb(hsv.h, hsv.s, val);
    onChange(rgbToHex(next.r, next.g, next.b));
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-5">
      {/* Interactive 3D RGB Sphere */}
      <div className="relative shrink-0 flex flex-col items-center gap-2.5">
        <div
          className="relative w-[190px] h-[190px] rounded-full p-1"
          style={{
            boxShadow: `0 0 38px -6px rgba(${r}, ${g}, ${b}, 0.55), inset 0 0 16px rgba(255,255,255,0.08)`,
          }}
        >
          <canvas
            ref={canvasRef}
            width={size}
            height={size}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="w-full h-full rounded-full cursor-crosshair touch-none select-none"
          />
          {/* Active Color Marker */}
          <span
            className="pointer-events-none absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_10px_rgba(0,0,0,0.9)]"
            style={{
              left: `${markerX}%`,
              top: `${markerY}%`,
              backgroundColor: color,
            }}
          />
        </div>

        <span className="px-2.5 py-0.5 rounded-full bg-black/50 border border-white/10 text-[11px] font-mono text-slate-300">
          RGB({r}, {g}, {b}) • {color}
        </span>
      </div>

      {/* R / G / B & Brightness Sliders */}
      <div className="w-full flex-1 space-y-3">
        {[
          { key: 'r' as const, label: 'R', value: r, accent: '#EF4444' },
          { key: 'g' as const, label: 'G', value: g, accent: '#10B981' },
          { key: 'b' as const, label: 'B', value: b, accent: '#3B82F6' },
        ].map((ch) => (
          <div key={ch.key} className="flex items-center gap-2.5">
            <span
              className="w-5 text-xs font-mono font-bold text-center"
              style={{ color: ch.accent }}
            >
              {ch.label}
            </span>
            <input
              type="range"
              min={0}
              max={255}
              value={ch.value}
              onChange={(e) => handleRgbChannel(ch.key, parseInt(e.target.value, 10))}
              onPointerUp={() => onCommit?.(color)}
              className="flex-1 cursor-pointer"
              style={{ accentColor: ch.accent }}
            />
            <input
              type="number"
              min={0}
              max={255}
              value={ch.value}
              onChange={(e) => {
                const clamped = Math.max(0, Math.min(255, parseInt(e.target.value, 10) || 0));
                const next = { r, g, b, [ch.key]: clamped };
                const hex = rgbToHex(next.r, next.g, next.b);
                onChange(hex);
                onCommit?.(hex);
              }}
              className="w-14 px-2 py-1 rounded-lg bg-black/50 border border-white/10 text-xs font-mono text-white text-center outline-none focus:border-theme-primary"
            />
          </div>
        ))}

        {/* Brightness Slider */}
        <div className="pt-1 border-t border-white/[0.06] space-y-1">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>{brightnessLabel}</span>
            <span className="text-slate-200">{Math.round(brightness * 100)}%</span>
          </div>
          <input
            type="range"
            min={0.2}
            max={1}
            step={0.01}
            value={brightness}
            onChange={(e) => handleBrightnessChange(parseFloat(e.target.value))}
            onPointerUp={() => onCommit?.(color)}
            className="w-full accent-[var(--theme-primary)] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
