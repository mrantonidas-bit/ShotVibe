import type { ReactNode } from "react";
import type { FrameTexts } from "../lib/types";

/* contexto que recibe cada marco PRO */
export interface FrameCtx {
  img: ReactNode;
  t: FrameTexts;
  r: number;
  sh: string;
  border?: string;
}
export type FrameRenderer = (c: FrameCtx) => ReactNode;

export const SANS = "'Instrument Sans', 'Segoe UI', sans-serif";
export const SERIF = "Georgia, 'Times New Roman', serif";
export const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
export const IMPACT = "Impact, 'Arial Black', sans-serif";
export const CAVEAT = "'Caveat', 'Segoe Script', cursive";

/* ---------- piezas reutilizables ---------- */

export function Sprockets({ n = 14, color = "#0b0c10", hole = "#e8e6df" }: { n?: number; color?: string; hole?: string }) {
  return (
    <span className="flex justify-between px-2 py-1" style={{ background: color }}>
      {Array.from({ length: n }).map((_, i) => (
        <i key={i} className="h-2.5 w-3.5 rounded-[2px]" style={{ background: hole }} />
      ))}
    </span>
  );
}

export function Brackets({ color = "#f6bc55", inset = 8 }: { color?: string; inset?: number }) {
  const s: React.CSSProperties = { position: "absolute", width: 22, height: 22, borderColor: color, borderStyle: "solid", borderWidth: 0 };
  return (
    <>
      <span style={{ ...s, top: inset, left: inset, borderTopWidth: 3, borderLeftWidth: 3 }} />
      <span style={{ ...s, top: inset, right: inset, borderTopWidth: 3, borderRightWidth: 3 }} />
      <span style={{ ...s, bottom: inset, left: inset, borderBottomWidth: 3, borderLeftWidth: 3 }} />
      <span style={{ ...s, bottom: inset, right: inset, borderBottomWidth: 3, borderRightWidth: 3 }} />
    </>
  );
}

export function Tape({ className = "", style, color = "rgba(246,231,178,0.85)" }: { className?: string; style?: React.CSSProperties; color?: string }) {
  return <span aria-hidden="true" className={className} style={{ position: "absolute", height: 22, width: 74, background: color, boxShadow: "0 1px 4px rgba(0,0,0,0.18)", ...style }} />;
}

export function Scanlines({ opacity = 0.22 }: { opacity?: number }) {
  return <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: `repeating-linear-gradient(0deg, rgba(0,0,0,${opacity}) 0 1px, transparent 1px 3px)` }} />;
}

export function Barcode({ w = 90, h = 26, color = "#15171d" }: { w?: number; h?: number; color?: string }) {
  return (
    <span className="flex items-end gap-[2px]" style={{ height: h }}>
      {[3, 1, 2, 1, 3, 2, 1, 3, 1, 2, 3, 1, 1, 2, 3, 2, 1, 3].map((x, i) => (
        <i key={i} style={{ width: x * 1.7, height: h - (i % 3 === 0 ? 0 : 3), background: color }} />
      ))}
      <i style={{ width: w / 6 }} />
    </span>
  );
}

export function Stamp({ text, color = "#c23a3a", rotate = -9 }: { text: string; color?: string; rotate?: number }) {
  return (
    <span
      className="px-2.5 py-1 text-[15px] font-black uppercase"
      style={{ fontFamily: IMPACT, letterSpacing: "0.18em", color, border: `3px double ${color}`, borderRadius: 4, transform: `rotate(${rotate}deg)`, background: "rgba(255,255,255,0.65)", textShadow: "none", opacity: 0.92 }}
    >
      {text}
    </span>
  );
}

export function Progress({ pct = 99, h = 12, track = "#2a3040", fill = "linear-gradient(90deg,#f6bc55,#2dd4bf)" }: { pct?: number; h?: number; track?: string; fill?: string }) {
  return (
    <span className="block overflow-hidden rounded-full" style={{ background: track, height: h }}>
      <i className="block h-full rounded-full" style={{ width: `${pct}%`, background: fill }} />
    </span>
  );
}

export function StarRow({ n = 3, color = "#c9a227", size = 12 }: { n?: number; color?: string; size?: number }) {
  return (
    <span className="flex items-center gap-1.5">
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" width={size} height={size} fill={color} aria-hidden="true">
          <path d="M12 2l2.6 6.6L21 9.8l-5 4.4 1.5 6.8L12 17.3 6.5 21 8 14.2l-5-4.4 6.4-1.2z" />
        </svg>
      ))}
    </span>
  );
}

export function Squiggle({ color = "#e05a5a", w = 46 }: { color?: string; w?: number }) {
  return (
    <svg viewBox="0 0 60 16" width={w} height={(w * 16) / 60} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" aria-hidden="true">
      <path d="M3 8c6-8 10 8 16 0s10 8 16 0 10 8 16 0" />
    </svg>
  );
}

export function Heart({ color = "#f472b6", size = 16 }: { color?: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={color} aria-hidden="true">
      <path d="M12 21S3.5 15.6 3.5 9.3C3.5 6 6 4 8.5 4c1.8 0 3 .9 3.5 2 .5-1.1 1.7-2 3.5-2 2.5 0 5 2 5 5.3C20.5 15.6 12 21 12 21z" />
    </svg>
  );
}

export function Invader({ color = "#7ff0dc", size = 26 }: { color?: string; size?: number }) {
  return (
    <svg viewBox="0 0 11 8" width={size} height={(size * 8) / 11} fill={color} shapeRendering="crispEdges" aria-hidden="true">
      <path d="M2 0h1v1H2zM8 0h1v1H8zM3 1h5v1H3zM2 2h7v1H2zM1 3h2v1H1zM4 3h3v1H4zM8 3h2v1H8zM0 4h11v1H0zM0 5h1v2H0zM2 5h7v1H2zM10 5h1v2h-1zM3 6h2v1H3zM6 6h2v1H6z" />
    </svg>
  );
}

export function WinButton({ label }: { label: string }) {
  return (
    <span
      className="flex size-[18px] items-center justify-center text-[11px] font-bold leading-none"
      style={{ background: "#c0c0c0", border: "1.5px solid", borderColor: "#ffffff #6d6d6d #6d6d6d #ffffff", color: "#1a1a1a" }}
    >
      {label}
    </span>
  );
}

export function zigzagClip(n: number): string {
  const w = 100 / n;
  let top = "";
  let bottom = "";
  for (let i = 0; i < n; i++) {
    top += `${(i * w).toFixed(2)}% 2.4%, ${((i + 0.5) * w).toFixed(2)}% 0%, `;
    bottom += `${((i + 0.5) * w).toFixed(2)}% 100%, ${((i + 1) * w).toFixed(2)}% 97.6%, `;
  }
  return `polygon(${top}100% 2.4%, 100% 97.6%, ${bottom}0% 97.6%, 0% 2.4%)`;
}

/* fondos CSS con textura */
export const BG_BRICK = `repeating-linear-gradient(0deg, transparent 0 16px, rgba(0,0,0,0.28) 16px 18px), repeating-linear-gradient(90deg, transparent 0 34px, rgba(0,0,0,0.28) 34px 36px), #4a3230`;
export const BG_CORK = `radial-gradient(rgba(90,58,26,0.5) 1px, transparent 1.6px) 0 0/7px 7px, radial-gradient(rgba(255,235,200,0.35) 1px, transparent 1.6px) 3px 4px/9px 9px, #b98d5a`;
export const BG_GRID_BLUE = `linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px) 0 0/22px 22px, linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px) 0 0/22px 22px, #0f4c81`;
export const BG_HALFTONE = `radial-gradient(rgba(20,22,28,0.3) 1.2px, transparent 1.6px) 0 0/8px 8px`;
export const BG_STARS = `radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1.6px) 0 0/26px 22px, radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1.6px) 12px 14px/34px 30px`;
