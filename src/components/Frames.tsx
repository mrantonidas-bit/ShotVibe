import type { CSSProperties, ReactNode } from "react";
import { aspectRatio, FRAME_META, frameById, cn, type SimpleSpec } from "../lib/presets";
import type { FrameTexts, LoadedImage, PhotoSettings, Settings } from "../lib/types";

export type FrameSettings = Settings & PhotoSettings;

const SANS = "'Instrument Sans', 'Segoe UI', sans-serif";
const SERIF = "Georgia, 'Times New Roman', serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const IMPACT = "Impact, 'Arial Black', sans-serif";
const CAVEAT = "'Caveat', 'Segoe Script', cursive";
const SCREEN = "linear-gradient(135deg,#64748b,#334155)";

function burstPoints(spikes: number, outer: number, inner: number): string {
  const pts: string[] = [];
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (i * Math.PI) / spikes - Math.PI / 2;
    pts.push(`${(50 + r * Math.cos(a)).toFixed(1)},${(50 + r * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(" ");
}
const STAR = burstPoints(12, 47, 33);
const memeOutline: CSSProperties = {
  textShadow: "2px 2px 0 #0a0a0a,-2px 2px 0 #0a0a0a,2px -2px 0 #0a0a0a,-2px -2px 0 #0a0a0a,0 3px 0 #0a0a0a,3px 0 0 #0a0a0a,-3px 0 0 #0a0a0a,0 -2px 0 #0a0a0a",
  WebkitTextStroke: "1px #0a0a0a",
};

/* ------------------------------------------------------------------ */
/*  marco genérico guiado por datos (marcos PRO)                       */
/* ------------------------------------------------------------------ */

function SimpleFrame({ spec, img, r, sh, border, t }: { spec: SimpleSpec; img: ReactNode; r: number; sh: string; border?: string; t: FrameTexts }) {
  const radius = spec.radius ?? r;
  const bd = border ?? (spec.border ? `${spec.border.w}px ${spec.border.style ?? "solid"} ${spec.border.color}` : undefined);
  const pad = spec.pad ?? (spec.bg || spec.border ? 12 : 0);
  const mediaRadius = Math.max(radius - pad - (spec.mat?.w ?? 0) - (bd ? 2 : 0), 0);
  const plate = spec.plate ? (
    <div className="flex items-center justify-center overflow-hidden px-4" style={{ height: 46, background: spec.plate.bg }}>
      <span
        className="truncate font-bold uppercase"
        style={{
          color: spec.plate.color,
          fontFamily: spec.plate.font === "mono" ? MONO : spec.plate.font === "impact" ? IMPACT : spec.plate.font === "serif" ? SERIF : SANS,
          letterSpacing: spec.plate.ls ?? 1.5,
          fontSize: spec.plate.size ?? 14,
        }}
      >
        {t[spec.plate.key]}
      </span>
    </div>
  ) : null;

  return (
    <div className="transition-[border-radius,box-shadow] duration-300" style={{ background: spec.bg, padding: pad, borderRadius: radius, boxShadow: sh, border: bd }}>
      {spec.plate?.slot === "top" && plate}
      <div style={spec.mat ? { background: spec.mat.color, padding: spec.mat.w, borderRadius: Math.max(mediaRadius + 2, 0) } : undefined}>
        <div className="overflow-hidden" style={{ borderRadius: mediaRadius }}>
          <div className="relative w-max max-w-full" style={spec.filter ? { filter: spec.filter } : undefined}>
            {img}
            {spec.overlay && <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: spec.overlay }} />}
          </div>
        </div>
      </div>
      {spec.plate?.slot === "bottom" && plate}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  marcos hechos a mano                                               */
/* ------------------------------------------------------------------ */

export function FramedImage({ image, settings, shadowCss }: { image: LoadedImage; settings: FrameSettings; shadowCss: string }) {
  const t = settings.texts;
  const filter = `saturate(${settings.saturation}%) brightness(${settings.brightness}%)`;
  const border = settings.border > 0 ? `${settings.border}px solid ${settings.borderColor}` : undefined;
  const r = settings.radius;
  const sh = shadowCss;
  const ratio = aspectRatio(settings.aspectId);

  const img = ratio ? (
    <div className="relative overflow-hidden" style={ratio >= 1 ? { width: "min(760px, 76vw)", aspectRatio: String(ratio) } : { height: "min(58vh, 620px)", aspectRatio: String(ratio) }}>
      <img src={image.url} alt={image.name} draggable={false} className="absolute inset-0 h-full w-full select-none object-cover" style={{ filter, objectPosition: `${settings.cropX}% ${settings.cropY}%`, transform: settings.cropZoom !== 100 ? `scale(${settings.cropZoom / 100})` : undefined }} />
    </div>
  ) : (
    <img src={image.url} alt={image.name} draggable={false} className="block h-auto w-auto max-w-full select-none" style={{ maxHeight: "min(58vh, 620px)", filter }} />
  );

  let card: ReactNode;

  switch (settings.frame) {
    /* ============ SERIA · GRATIS ============ */
    case "browser":
      card = (
        <div className="overflow-hidden transition-[border-radius,box-shadow] duration-300" style={{ borderRadius: r, boxShadow: sh, border }}>
          <div className="relative flex items-center gap-3 px-4" style={{ height: 46, background: "#0d111c" }}>
            <span className="flex items-center gap-2"><i className="size-3 rounded-full" style={{ background: "#ff5f57" }} /><i className="size-3 rounded-full" style={{ background: "#febc2e" }} /><i className="size-3 rounded-full" style={{ background: "#2ec747" }} /></span>
            <span className="absolute left-1/2 flex max-w-[60%] -translate-x-1/2 items-center gap-1.5 overflow-hidden rounded-lg px-3 py-1.5" style={{ background: "rgba(255,255,255,0.07)" }}>
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#7ee2c8" strokeWidth="2.2" strokeLinecap="round"><rect x="5" y="10.5" width="14" height="9.5" rx="2.2" /><path d="M8.2 10.5V8a3.8 3.8 0 0 1 7.6 0v2.5" /></svg>
              <span className="truncate text-[13px] font-medium text-slate-300">{t.url}</span>
            </span>
          </div>
          {img}
        </div>
      );
      break;

    case "phone":
      card = (
        <div className="relative transition-shadow duration-300" style={{ borderRadius: 46, border: border ? `12px solid ${settings.borderColor}` : "12px solid #262b38", background: "#05070c", boxShadow: `${sh === "none" ? "" : sh + ", "}inset 0 0 0 2px rgba(255,255,255,0.06)` }}>
          <div className="relative overflow-hidden" style={{ borderRadius: 30 }}>
            {img}
            <span className="absolute left-1/2 top-2.5 flex h-6 w-24 -translate-x-1/2 items-center justify-end rounded-full bg-black pr-2" aria-hidden="true"><i className="size-2.5 rounded-full" style={{ background: "#1d2330" }} /></span>
            <span className="absolute bottom-2 left-1/2 h-1.5 w-24 -translate-x-1/2 rounded-full bg-white/70" aria-hidden="true" />
          </div>
        </div>
      );
      break;

    case "caption":
      card = (
        <div className="overflow-hidden transition-[border-radius,box-shadow] duration-300" style={{ borderRadius: r, boxShadow: sh, border }}>
          {img}
          <div className="flex items-center gap-3 px-5" style={{ height: 62, background: "#0e1220", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg" style={{ background: "linear-gradient(135deg,#f6bc55,#e05a5a)" }}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="#161018"><path d="M12 3l2 5.2L19.2 10 14 12l-2 5.2L10 12l-5.2-2L10 8.2 12 3z" /></svg>
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[15px] font-bold leading-tight text-white">{t.title}</span>
              <span className="block truncate text-[12px] text-slate-400">{t.subtitle}</span>
            </span>
            <span className="ml-auto hidden font-mono text-[10px] uppercase tracking-[0.18em] text-slate-600 sm:block">{t.tag}</span>
          </div>
        </div>
      );
      break;

    case "quote":
      card = (
        <div className="overflow-hidden transition-[border-radius,box-shadow] duration-300" style={{ borderRadius: r, boxShadow: sh, border, background: "#ffffff" }}>
          {img}
          <div style={{ padding: "22px 26px 26px" }}>
            <div style={{ fontFamily: SERIF, fontSize: 62, lineHeight: 0.6, color: "#eda63b" }}>&ldquo;</div>
            <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 22, lineHeight: 1.4, color: "#1b2233", marginTop: 10 }}>{t.title}</p>
            <div className="mt-4 h-[3px] w-10 rounded-full" style={{ background: "#eda63b" }} />
            <p className="mt-3 text-[13px] font-semibold uppercase" style={{ letterSpacing: "0.14em", color: "#8d97ad" }}>{t.subtitle}</p>
          </div>
        </div>
      );
      break;

    case "minimal":
      card = (
        <div className="transition-shadow duration-300" style={{ background: "#ffffff", padding: 12, borderRadius: Math.min(r, 10), boxShadow: sh, border: border ?? "1px solid rgba(15,20,35,0.15)" }}>
          <div className="overflow-hidden" style={{ borderRadius: Math.max(Math.min(r, 10) - 6, 0) }}>{img}</div>
          <p className="mt-3 text-center text-[11px] font-semibold uppercase" style={{ letterSpacing: "0.28em", color: "#8d97ad", paddingBottom: 4 }}>{t.subtitle}</p>
        </div>
      );
      break;

    case "darkcard":
      card = (
        <div className="transition-[border-radius,box-shadow] duration-300" style={{ background: "#0e1116", padding: 14, borderRadius: r, boxShadow: sh, border: border ?? "1px solid rgba(255,255,255,0.06)" }}>
          <div className="overflow-hidden" style={{ borderRadius: Math.max(r - 8, 0) }}>{img}</div>
          <div className="mt-3 flex items-start gap-2.5 px-1.5 pb-1">
            <span className="mt-1.5 size-2 shrink-0 rounded-full" style={{ background: "#f6bc55" }} />
            <span className="min-w-0">
              <span className="block truncate text-[16px] font-bold text-white">{t.title}</span>
              <span className="block truncate text-[13px] text-slate-400">{t.subtitle}</span>
            </span>
          </div>
        </div>
      );
      break;

    case "splitbar":
      card = (
        <div className="flex overflow-hidden transition-[border-radius,box-shadow] duration-300" style={{ borderRadius: r, boxShadow: sh, border }}>
          <div className="flex w-[54px] shrink-0 items-center justify-center" style={{ background: "linear-gradient(180deg,#f6bc55,#e05a5a)" }}>
            <span className="whitespace-nowrap text-[17px] font-bold uppercase text-white" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.3em" }}>{t.title}</span>
          </div>
          {img}
        </div>
      );
      break;

    case "editorial":
      card = (
        <div className="transition-[border-radius,box-shadow] duration-300" style={{ background: "#ffffff", padding: 24, borderRadius: Math.min(r, 8), boxShadow: sh, border }}>
          <p className="text-[12px] font-bold uppercase" style={{ letterSpacing: "0.32em", color: "#c9832a" }}>{t.top}</p>
          <p style={{ fontFamily: SERIF, fontSize: 27, fontWeight: 700, lineHeight: 1.2, color: "#141926", marginTop: 8 }}>{t.title}</p>
          <div className="mt-3 h-px w-full" style={{ background: "#d8deea" }} />
          <div className="mt-4 overflow-hidden" style={{ borderRadius: 3, border: "1px solid #d8deea" }}>{img}</div>
          <div className="mt-3 flex items-baseline justify-between gap-4">
            <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14, color: "#55607a" }}>{t.subtitle}</p>
            <span className="shrink-0 text-[10px] font-semibold" style={{ fontFamily: MONO, letterSpacing: "0.14em", color: "#98a1b5" }}>{t.tag}</span>
          </div>
        </div>
      );
      break;

    case "social":
      card = (
        <div className="overflow-hidden transition-[border-radius,box-shadow] duration-300" style={{ background: "#ffffff", borderRadius: Math.max(r, 10), boxShadow: sh, border }}>
          <div className="flex items-center gap-3 px-4" style={{ height: 62 }}>
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full text-[16px] font-bold text-white" style={{ background: "linear-gradient(135deg,#f6bc55,#e05a5a)" }}>{(t.title.trim()[0] || "S").toUpperCase()}</span>
            <span className="min-w-0">
              <span className="block truncate text-[15px] font-bold text-[#141926]">{t.title}</span>
              <span className="block truncate text-[13px] text-[#8d97ad]">{t.subtitle}</span>
            </span>
            <span className="ml-auto text-[15px] font-bold text-[#c3cad8]">···</span>
          </div>
          {img}
          <div className="flex items-center gap-4 px-4" style={{ height: 52 }}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#8d97ad" strokeWidth="1.8"><path d="M12 20s-7.5-4.6-9.3-9A5.2 5.2 0 0 1 12 6.5 5.2 5.2 0 0 1 21.3 11c-1.8 4.4-9.3 9-9.3 9z" /></svg>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#8d97ad" strokeWidth="1.8"><path d="M21 12a8 8 0 0 1-8 8H5l-1.5 1.5V12a8 8 0 0 1 8-8h1.5a8 8 0 0 1 8 8z" /></svg>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#8d97ad" strokeWidth="1.8"><path d="M21 4 3.8 10.7l6.4 2.6 2.5 6.7L21 4z" /></svg>
            <span className="ml-auto text-[12px] text-[#98a1b5]">{t.tag}</span>
          </div>
        </div>
      );
      break;

    case "ribbon":
      card = (
        <div className="relative">
          <div className="overflow-hidden transition-[border-radius,box-shadow] duration-300" style={{ borderRadius: r, boxShadow: sh, border }}>
            {img}
            <div className="flex items-center justify-center px-5" style={{ height: 54, background: "#0e1220" }}>
              <span className="truncate text-[15px] font-bold uppercase text-white" style={{ letterSpacing: "0.12em" }}>{t.title}</span>
            </div>
          </div>
          <div className="pointer-events-none absolute right-0 top-0 h-36 w-36 overflow-hidden">
            <span className="absolute flex items-center justify-center text-[13px] text-white" style={{ top: 26, right: -38, width: 190, transform: "rotate(45deg)", background: "#e05a5a", fontFamily: IMPACT, letterSpacing: 3, paddingTop: 7, paddingBottom: 7, boxShadow: "0 3px 8px rgba(0,0,0,0.3)" }}>{t.badge}</span>
          </div>
        </div>
      );
      break;

    case "gradborder":
      card = (
        <div className="transition-shadow duration-300" style={{ padding: 7, borderRadius: r + 7, background: "linear-gradient(120deg,#f6bc55,#e05a5a,#2dd4bf,#38bdf8)", boxShadow: sh, border }}>
          <div className="overflow-hidden" style={{ borderRadius: r }}>{img}</div>
        </div>
      );
      break;

    case "certificate":
      card = (
        <div className="relative transition-shadow duration-300" style={{ background: "#fbfaf6", padding: 12, border: border ?? "3px solid #c9a227", borderRadius: Math.min(r, 8), boxShadow: sh }}>
          <div style={{ border: "1px solid #c9a227", padding: 16, borderRadius: 2 }}>
            <p className="text-center text-[12px] font-bold" style={{ fontFamily: SERIF, letterSpacing: "0.4em", color: "#8a6d1f" }}>★ CERTIFICADO DE ESTILO ★</p>
            <div className="mt-3 overflow-hidden" style={{ border: "1px solid #d9c98a", borderRadius: 2 }}>{img}</div>
            <p className="mt-4 text-center" style={{ fontFamily: SERIF, fontSize: 23, fontWeight: 700, color: "#2b2113" }}>{t.title}</p>
            <p className="mt-1 text-center text-[12px]" style={{ letterSpacing: "0.14em", color: "#8a7a4a" }}>{t.subtitle}</p>
          </div>
          <svg viewBox="0 0 100 100" className="absolute -bottom-7 -right-7 size-[74px] drop-shadow-lg" aria-hidden="true">
            <circle cx="50" cy="50" r="44" fill="#c9a227" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="#fbfaf6" strokeWidth="2.5" strokeDasharray="5 5" />
            <polygon points={STAR} transform="translate(15.5,15.5) scale(0.69)" fill="#fbfaf6" />
          </svg>
        </div>
      );
      break;

    case "breaking":
      card = (
        <div className="relative overflow-hidden transition-[border-radius,box-shadow] duration-300" style={{ borderRadius: Math.min(r, 10), boxShadow: sh, border }}>
          {img}
          <div className="absolute bottom-0 left-0 right-0">
            <div className="flex items-center px-4" style={{ height: 48, background: "#d31f2b" }}>
              <span className="mr-4 shrink-0 px-2 py-1 text-[12px] text-white" style={{ fontFamily: IMPACT, letterSpacing: 2, background: "#7f1219" }}>{t.badge}</span>
              <span className="truncate text-[17px] font-bold text-white" style={{ fontFamily: SANS }}>{t.title}</span>
            </div>
            <div className="flex items-center gap-3 px-4" style={{ height: 34, background: "#14161c" }}>
              <span className="truncate text-[12px] text-slate-300" style={{ fontFamily: MONO }}>{t.subtitle}</span>
              <span className="ml-auto shrink-0 text-[11px] text-slate-500" style={{ fontFamily: MONO }}>{t.tag}</span>
            </div>
          </div>
        </div>
      );
      break;

    case "album":
      card = (
        <div className="overflow-hidden transition-[border-radius,box-shadow] duration-300" style={{ background: "#101318", borderRadius: r, boxShadow: sh, border }}>
          {img}
          <div className="flex items-center gap-3 px-4" style={{ height: 58 }}>
            <span className="min-w-0">
              <span className="block truncate text-[15px] font-bold text-white">{t.title}</span>
              <span className="block truncate text-[12px] text-slate-500">{t.subtitle}</span>
            </span>
            <span className="ml-auto size-8 shrink-0 rounded-full" style={{ background: "conic-gradient(#334155 0 40deg,#1e293b 40deg 90deg,#334155 90deg 160deg,#1e293b 160deg 220deg,#334155 220deg 300deg,#1e293b 300deg)", border: "2px solid #475569" }} />
          </div>
        </div>
      );
      break;

    case "poster":
      card = (
        <div className="overflow-hidden transition-[border-radius,box-shadow] duration-300" style={{ background: "#14161c", borderRadius: Math.min(r, 10), boxShadow: sh, border }}>
          {img}
          <div className="px-6 pb-6 pt-4 text-center">
            <p className="text-[30px] leading-none text-white" style={{ fontFamily: IMPACT, letterSpacing: 2 }}>{t.title}</p>
            <p className="mt-1.5 text-[11px] font-bold" style={{ letterSpacing: "0.42em", color: "#f6bc55" }}>{t.badge}</p>
            <p className="mt-2 text-[11px] uppercase" style={{ letterSpacing: "0.18em", color: "#8d97ad" }}>{t.subtitle}</p>
          </div>
        </div>
      );
      break;

    case "cornerbadge":
      card = (
        <div className="relative">
          <div className="overflow-hidden transition-[border-radius,box-shadow] duration-300" style={{ borderRadius: r, boxShadow: sh, border }}>{img}</div>
          <span className="absolute left-4 top-4 rounded-full px-3 py-1.5 text-[12px] font-black uppercase text-[#17130a]" style={{ background: "#f6bc55", letterSpacing: "0.14em", transform: "rotate(-4deg)", boxShadow: "0 6px 14px rgba(0,0,0,0.35)" }}>{t.badge}</span>
        </div>
      );
      break;

    case "mat":
      card = (
        <div className="transition-shadow duration-300" style={{ background: "#ffffff", padding: 26, borderRadius: Math.min(r, 6), boxShadow: sh, border: border ?? "1px solid #d8deea" }}>
          <div className="overflow-hidden" style={{ border: "1px solid #c6cddd" }}>{img}</div>
          <p className="mt-4 text-center" style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15, color: "#55607a" }}>{t.subtitle}</p>
        </div>
      );
      break;

    case "carousel":
      card = (
        <div className="overflow-hidden transition-[border-radius,box-shadow] duration-300" style={{ background: "#ffffff", borderRadius: Math.max(r, 10), boxShadow: sh, border }}>
          {img}
          <div className="relative flex items-center justify-center" style={{ height: 40 }}>
            <span className="flex items-center gap-1.5">
              <i className="h-2 w-4 rounded-full" style={{ background: "#eda63b" }} />
              <i className="size-2 rounded-full" style={{ background: "#d8deea" }} />
              <i className="size-2 rounded-full" style={{ background: "#d8deea" }} />
            </span>
            <span className="absolute right-4 text-[11px] font-semibold" style={{ fontFamily: MONO, color: "#98a1b5" }}>{t.tag}</span>
          </div>
        </div>
      );
      break;

    case "statbar":
      card = (
        <div className="overflow-hidden transition-[border-radius,box-shadow] duration-300" style={{ borderRadius: r, boxShadow: sh, border }}>
          {img}
          <div className="flex items-center gap-4 px-5" style={{ height: 56, background: "#0e1116" }}>
            <span className="truncate text-[14px] font-bold text-white">{t.title}</span>
            <span className="ml-auto flex items-end gap-1">
              {[10, 16, 12, 20, 26].map((h, i) => (
                <i key={i} className="w-2.5 rounded-[2px]" style={{ height: h, background: i === 4 ? "#f6bc55" : "#3d4c74" }} />
              ))}
            </span>
          </div>
        </div>
      );
      break;

    /* ============ GRACIOSA · GRATIS ============ */
    case "meme":
      card = (
        <div className="overflow-hidden transition-[border-radius,box-shadow] duration-300" style={{ borderRadius: r, boxShadow: sh, border, background: "#f6f2e9" }}>
          <div className="px-4 text-center uppercase" style={{ paddingTop: 12, paddingBottom: 12, fontFamily: IMPACT, fontSize: 29, letterSpacing: 1, lineHeight: 1.12, color: "#fff", ...memeOutline }}>{t.top || " "}</div>
          {img}
          <div className="px-4 text-center uppercase" style={{ paddingTop: 12, paddingBottom: 12, fontFamily: IMPACT, fontSize: 29, letterSpacing: 1, lineHeight: 1.12, color: "#fff", ...memeOutline }}>{t.bottom || " "}</div>
        </div>
      );
      break;

    case "polaroid":
      card = (
        <div className="relative" style={{ paddingTop: 14 }}>
          <span aria-hidden="true" className="absolute z-10 h-6 w-20" style={{ top: -2, left: 26, background: "rgba(246,231,178,0.82)", transform: "rotate(-7deg)", boxShadow: "0 1px 4px rgba(0,0,0,0.18)" }} />
          <span aria-hidden="true" className="absolute z-10 h-6 w-20" style={{ top: -2, right: 26, background: "rgba(246,231,178,0.82)", transform: "rotate(7deg)", boxShadow: "0 1px 4px rgba(0,0,0,0.18)" }} />
          <div className="transition-shadow duration-300" style={{ background: "#f7f5f0", padding: "14px 14px 0", borderRadius: Math.min(r, 10), boxShadow: sh, border }}>
            <div className="overflow-hidden" style={{ borderRadius: Math.max(r - 8, 0) }}>{img}</div>
            <p className="truncate px-2 text-center" style={{ fontFamily: CAVEAT, fontSize: 24, lineHeight: 1.35, color: "#3c4150", paddingTop: 12, paddingBottom: 16 }}>{t.subtitle || "un recuerdo bonito"}</p>
          </div>
        </div>
      );
      break;

    case "comic":
      card = (
        <div className="relative transition-transform duration-300" style={{ background: "radial-gradient(#14161c 1.1px, transparent 1.2px) 0 0 / 9px 9px, #ffd93d", padding: 16, borderRadius: Math.max(r, 4), boxShadow: `9px 9px 0 #14161c${sh === "none" ? "" : ", " + sh}`, border }}>
          <div className="overflow-hidden" style={{ border: "5px solid #14161c", borderRadius: Math.max(r - 6, 0) }}>{img}</div>
          <svg viewBox="0 0 100 100" className="absolute -right-8 -top-9 size-24 drop-shadow-[3px_3px_0_rgba(20,22,28,0.9)]" style={{ transform: "rotate(12deg)" }} aria-hidden="true">
            <polygon points={STAR} fill="#ff5d5d" stroke="#14161c" strokeWidth="3" strokeLinejoin="round" />
            <text x="50" y="56" textAnchor="middle" fontFamily={IMPACT} fontSize="19" fill="#fff" stroke="#14161c" strokeWidth="0.8" style={{ transform: "rotate(-8deg)", transformOrigin: "50px 50px" }}>{(t.top || "¡ZAS!").slice(0, 10)}</text>
          </svg>
        </div>
      );
      break;

    case "retro":
      card = (
        <div className="relative transition-shadow duration-300" style={{ background: "#262a33", borderRadius: 26, padding: "14px 14px 10px", boxShadow: sh, border: border ?? "1px solid #343a47" }}>
          <div className="relative overflow-hidden" style={{ borderRadius: 14, background: "#000" }}>
            {img}
            <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.24) 0 1px, transparent 1px 3px)" }} />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "rgba(86,255,180,0.045)" }} />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(115% 90% at 50% 42%, transparent 55%, rgba(0,0,0,0.52))" }} />
            <span aria-hidden="true" className="absolute right-2.5 top-2 size-2.5 rounded-full" style={{ background: "#ff5d5d", boxShadow: "0 0 8px rgba(255,93,93,0.9)" }} />
          </div>
          <div className="mt-2.5 flex items-center gap-2.5 px-1 pb-0.5">
            <span className="text-[11px] font-black tracking-[0.24em] text-[#9aa3b5]" style={{ fontFamily: IMPACT }}>SHOT·TRONIC</span>
            <span className="ml-auto flex items-center gap-2">
              <i className="size-4 rounded-full" style={{ background: "#3a4050", border: "1.5px solid #4d5468" }} />
              <i className="size-4 rounded-full" style={{ background: "#3a4050", border: "1.5px solid #4d5468" }} />
            </span>
          </div>
        </div>
      );
      break;

    case "sticker":
      card = (
        <div className="transition-shadow duration-300" style={{ transform: "rotate(-2deg)", background: "#ffffff", padding: 10, borderRadius: 22, boxShadow: sh === "none" ? "0 14px 30px rgba(0,0,0,0.25)" : sh, border: border ?? "3px solid #ffffff" }}>
          <div className="overflow-hidden" style={{ borderRadius: 14 }}>{img}</div>
        </div>
      );
      break;

    case "tabloid":
      card = (
        <div className="overflow-hidden transition-shadow duration-300" style={{ background: "#ffe23d", padding: 12, borderRadius: Math.min(r, 6), boxShadow: sh, border: border ?? "3px solid #14161c" }}>
          <p className="py-1.5 text-center text-[15px] text-white" style={{ fontFamily: IMPACT, letterSpacing: 3, background: "#14161c" }}>{t.top}</p>
          <div className="relative mt-2 overflow-hidden" style={{ border: "3px solid #14161c" }}>
            {img}
            <svg viewBox="0 0 100 100" className="absolute -right-4 -top-5 size-20" style={{ transform: "rotate(10deg)" }} aria-hidden="true">
              <polygon points={STAR} fill="#e05a5a" stroke="#14161c" strokeWidth="3.5" strokeLinejoin="round" />
              <text x="50" y="57" textAnchor="middle" fontFamily={IMPACT} fontSize="20" fill="#fff">{(t.badge || "EXTRA").slice(0, 8)}</text>
            </svg>
          </div>
          <p className="mt-2 text-[22px] leading-none" style={{ fontFamily: IMPACT, color: "#14161c" }}>{t.title}</p>
          <p className="mt-1 text-[12px] font-semibold" style={{ color: "#57501b" }}>{t.subtitle}</p>
        </div>
      );
      break;

    case "vhs":
      card = (
        <div className="overflow-hidden transition-[border-radius,box-shadow] duration-300" style={{ background: "#14161c", borderRadius: Math.min(r, 8), boxShadow: sh, border: border ?? "1px solid #2c3038" }}>
          <div className="relative overflow-hidden">
            {img}
            <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.28) 0 1px, transparent 1px 3px), rgba(120,160,255,0.06)" }} />
            <span className="absolute left-3 top-2.5 flex items-center gap-1.5 text-[11px] font-bold text-white" style={{ fontFamily: MONO, textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}>
              <i className="size-2.5 rounded-full" style={{ background: "#ff4040", boxShadow: "0 0 8px rgba(255,64,64,0.9)" }} /> REC
            </span>
            <span className="absolute right-3 top-2.5 text-[12px] text-slate-200" style={{ fontFamily: MONO }}>{t.tag}</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5" style={{ background: "#f2f0ea" }}>
            <span className="h-5 w-10 rounded-[2px]" style={{ background: "#d31f2b" }} />
            <span className="truncate text-[15px] font-bold" style={{ fontFamily: CAVEAT, fontSize: 20, color: "#2b2f3a" }}>{t.title}</span>
            <span className="ml-auto text-[10px] font-bold" style={{ fontFamily: MONO, color: "#6b7280" }}>SV-98</span>
          </div>
        </div>
      );
      break;

    case "wanted":
      card = (
        <div className="transition-shadow duration-300" style={{ background: "#e9dfc8", padding: 18, borderRadius: Math.min(r, 4), boxShadow: sh, border: border ?? "2px solid #8a7a55" }}>
          <p className="text-center text-[30px] leading-none" style={{ fontFamily: IMPACT, letterSpacing: 4, color: "#2b2113" }}>SE BUSCA</p>
          <div className="mx-auto mt-2 h-[3px] w-24" style={{ background: "#2b2113" }} />
          <div className="mt-3 overflow-hidden" style={{ border: "3px solid #2b2113", filter: "sepia(0.55) contrast(1.05)" }}>{img}</div>
          <p className="mt-3 text-center text-[16px] font-black uppercase" style={{ letterSpacing: "0.2em", color: "#2b2113" }}>{t.title}</p>
          <p className="mt-1 text-center text-[20px] font-bold" style={{ fontFamily: SERIF, color: "#7a2e1f" }}>{t.subtitle}</p>
        </div>
      );
      break;

    case "neon":
      card = (
        <div className="transition-[border-radius,box-shadow] duration-300" style={{ background: "#0b0d14", padding: 14, borderRadius: Math.max(r, 12), boxShadow: `0 0 26px rgba(67,217,190,0.35)${sh === "none" ? "" : ", " + sh}`, border: border ?? "2px solid #43d9be" }}>
          <div className="overflow-hidden" style={{ borderRadius: Math.max(r - 6, 4) }}>{img}</div>
          <p className="mt-3 text-center text-[20px]" style={{ fontFamily: CAVEAT, fontSize: 26, color: "#7ff0dc", textShadow: "0 0 12px rgba(67,217,190,0.9), 0 0 30px rgba(67,217,190,0.5)" }}>{t.title}</p>
        </div>
      );
      break;

    case "arcade":
      card = (
        <div className="overflow-hidden transition-[border-radius,box-shadow] duration-300" style={{ background: "#101218", borderRadius: Math.min(r, 10), boxShadow: sh, border: border ?? "1px solid #2a2f3d" }}>
          <div className="flex items-center justify-center" style={{ height: 38, background: "#1b1e28" }}>
            <span className="text-[15px] font-bold" style={{ fontFamily: IMPACT, letterSpacing: 4, color: "#43d9be", textShadow: "2px 2px 0 #0b3f37" }}>{t.title}</span>
          </div>
          <div className="p-2.5">
            <div className="overflow-hidden" style={{ border: "3px solid #2a2f3d", borderRadius: 4 }}>{img}</div>
          </div>
          <div className="flex items-center justify-between px-4 pb-3">
            <span className="text-[10px] font-bold" style={{ fontFamily: MONO, color: "#43d9be" }}>1UP 004200</span>
            <span className="flex gap-1">{[0, 1, 2].map((i) => <i key={i} className="size-2 rounded-full" style={{ background: i === 0 ? "#f6bc55" : "#2a2f3d" }} />)}</span>
          </div>
        </div>
      );
      break;

    case "ticket":
      card = (
        <div className="flex overflow-hidden transition-[border-radius,box-shadow] duration-300" style={{ background: "#fbf6ea", borderRadius: Math.min(r, 10), boxShadow: sh, border: border ?? "1px solid #d8cba8" }}>
          <div className="min-w-0 flex-1 p-3">{img}</div>
          <div className="relative flex w-[120px] shrink-0 flex-col items-center justify-center gap-1.5 border-l-2 border-dashed border-[#b3a98e] px-2 py-4 text-center">
            <span className="text-[13px] font-black uppercase leading-tight" style={{ letterSpacing: "0.1em", color: "#2b2113" }}>{t.title}</span>
            <span className="text-[10px] font-semibold" style={{ fontFamily: MONO, color: "#8a7a55" }}>{t.subtitle}</span>
            <span className="mt-1 flex gap-[2px]">{[2, 1, 3, 1, 2, 1, 3, 2, 1].map((w, i) => <i key={i} style={{ width: w * 1.6, height: 18, background: "#2b2113" }} />)}</span>
          </div>
        </div>
      );
      break;

    case "chat":
      card = (
        <div className="overflow-hidden transition-[border-radius,box-shadow] duration-300" style={{ background: "#e7ebf2", borderRadius: Math.max(r, 12), boxShadow: sh, border }}>
          <div className="flex items-center gap-2.5 px-4" style={{ height: 48, background: "#f6f8fb", borderBottom: "1px solid #d9dee8" }}>
            <span className="flex size-7 items-center justify-center rounded-full text-[12px] font-bold text-white" style={{ background: "linear-gradient(135deg,#f6bc55,#e05a5a)" }}>{(t.title.trim()[0] || "C").toUpperCase()}</span>
            <span className="truncate text-[13px] font-bold text-[#1b2233]">{t.title}</span>
            <span className="ml-auto size-2 rounded-full" style={{ background: "#2ec747" }} />
          </div>
          <div className="p-4">
            <div className="relative w-max max-w-[85%] overflow-hidden rounded-2xl rounded-bl-[4px] border border-[#d9dee8] bg-white" style={{ boxShadow: "0 2px 8px rgba(20,30,55,0.08)" }}>
              {img}
            </div>
            <p className="mt-1.5 flex items-center gap-1.5 pl-2 text-[12px] font-semibold text-[#8b94a9]" style={{ fontFamily: MONO }}>
              {t.tag}
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#43b581" strokeWidth="2.4" strokeLinecap="round"><path d="m4 12.5 4.5 4.5L19 6.5" /></svg>
            </p>
          </div>
        </div>
      );
      break;

    case "censored":
      card = (
        <div className="relative overflow-hidden transition-[border-radius,box-shadow] duration-300" style={{ borderRadius: Math.min(r, 8), boxShadow: sh, border }}>
          {img}
          <span aria-hidden="true" className="absolute left-0 right-0 top-[16%] h-[9%]" style={{ background: "#0c0d11" }} />
          <span aria-hidden="true" className="absolute left-0 right-0 bottom-[14%] h-[7%]" style={{ background: "#0c0d11" }} />
          <span className="absolute right-4 top-4 rounded-[3px] border-2 px-2.5 py-1 text-[13px] font-black uppercase" style={{ color: "#e05a5a", borderColor: "#e05a5a", background: "rgba(255,255,255,0.82)", transform: "rotate(8deg)", letterSpacing: "0.18em" }}>{t.badge}</span>
        </div>
      );
      break;

    case "confetti":
      card = (
        <div className="transition-shadow duration-300" style={{ background: "radial-gradient(#f6bc55 1.5px, transparent 2px) 0 0/10px 9px, radial-gradient(#2dd4bf 1.5px, transparent 2px) 5px 5px/12px 11px, radial-gradient(#e05a5a 1.5px, transparent 2px) 3px 8px/9px 12px, #ffffff", padding: 16, borderRadius: r, boxShadow: sh, border }}>
          <div className="overflow-hidden" style={{ borderRadius: Math.max(r - 8, 0), border: "3px solid #ffffff" }}>{img}</div>
        </div>
      );
      break;

    case "gilded":
      card = (
        <div className="transition-shadow duration-300" style={{ background: "linear-gradient(135deg,#f9d976,#b8860b)", padding: 12, borderRadius: Math.max(r, 6), boxShadow: sh, border: border ?? "1px solid #8a6116" }}>
          <div className="overflow-hidden" style={{ borderRadius: Math.max(r - 6, 2), border: "1px solid rgba(138,97,22,0.7)" }}>{img}</div>
          <p className="mt-3 px-4 py-2 text-center text-[15px] text-[#f6d47c]" style={{ fontFamily: IMPACT, letterSpacing: 7, background: "#241a05" }}>{t.badge} ★</p>
        </div>
      );
      break;

    case "notebook":
      card = (
        <div className="transition-shadow duration-300" style={{ background: "repeating-linear-gradient(#ffffff 0 26px, #dbe4f0 26px 27px), #ffffff", padding: 18, borderRadius: Math.min(r, 6), boxShadow: sh, border: border ?? "1px solid #c6cddd", position: "relative" }}>
          <span aria-hidden="true" className="absolute bottom-0 left-8 top-0 w-px" style={{ background: "rgba(244,114,182,0.5)" }} />
          <div className="overflow-hidden" style={{ transform: "rotate(-1.5deg)", border: "6px solid #ffffff", boxShadow: "0 8px 20px rgba(20,30,55,0.18)" }}>{img}</div>
          <p className="mt-3 text-center" style={{ fontFamily: CAVEAT, fontSize: 24, color: "#3b4a6b" }}>{t.subtitle}</p>
        </div>
      );
      break;

    case "gameover":
      card = (
        <div className="overflow-hidden transition-[border-radius,box-shadow] duration-300" style={{ background: "#05060a", borderRadius: Math.min(r, 8), boxShadow: sh, border: border ?? "1px solid #1f2330" }}>
          <p className="pt-4 text-center text-[26px]" style={{ fontFamily: IMPACT, letterSpacing: 6, color: "#facc15", textShadow: "0 0 16px rgba(250,204,21,0.55)" }}>GAME OVER</p>
          <div className="p-3">
            <div className="overflow-hidden" style={{ border: "2px solid #1f2330", borderRadius: 4, filter: "saturate(0.85)" }}>{img}</div>
          </div>
          <p className="pb-1 text-center text-[14px] font-bold uppercase" style={{ letterSpacing: 5, color: "#f47c7c" }}>{t.subtitle}</p>
          <p className="pb-3 text-center text-[13px] font-bold" style={{ fontFamily: MONO, letterSpacing: 6, color: "#facc15" }}>{t.tag}</p>
        </div>
      );
      break;

    case "caution":
      card = (
        <div className="transition-shadow duration-300" style={{ background: "repeating-linear-gradient(45deg,#f7c948 0 14px,#15171d 14px 28px)", padding: 14, borderRadius: Math.min(r, 8), boxShadow: sh }}>
          <div style={{ background: "#ffffff", borderRadius: 6, padding: 12, border: "2px solid #15171d" }}>
            <div className="overflow-hidden" style={{ borderRadius: 3 }}>{img}</div>
            <p className="mt-2.5 py-1.5 text-center text-[16px] text-white" style={{ fontFamily: IMPACT, letterSpacing: 4, background: "#15171d" }}>{t.title}</p>
          </div>
        </div>
      );
      break;

    case "price":
      card = (
        <div className="relative">
          <div className="overflow-hidden transition-[border-radius,box-shadow] duration-300" style={{ borderRadius: r, boxShadow: sh, border }}>{img}</div>
          <svg viewBox="0 0 100 100" className="absolute -right-7 -top-8 size-28 drop-shadow-[3px_4px_0_rgba(0,0,0,0.25)]" style={{ transform: "rotate(-10deg)" }} aria-hidden="true">
            <polygon points={burstPoints(14, 48, 36)} fill="#e05a5a" stroke="#5f1616" strokeWidth="2.5" strokeLinejoin="round" />
            <text x="50" y="58" textAnchor="middle" fontFamily={IMPACT} fontSize="24" fill="#fff">{(t.top || "-50%").slice(0, 6)}</text>
          </svg>
          <span className="absolute -bottom-3 left-6 rounded-full px-3 py-1 text-[11px] font-black uppercase text-white" style={{ background: "#15171d", letterSpacing: "0.18em", transform: "rotate(-2deg)" }}>{t.tag}</span>
        </div>
      );
      break;

    case "postal":
      card = (
        <div className="transition-shadow duration-300" style={{ background: "#fdfcf8", padding: 14, borderRadius: Math.min(r, 6), boxShadow: sh, border: border ?? "1px solid #d9d2c0" }}>
          <div className="overflow-hidden" style={{ border: "1px solid #e4ddcb" }}>{img}</div>
          <div className="mt-3 flex items-center gap-4">
            <p className="min-w-0 flex-1 truncate" style={{ fontFamily: CAVEAT, fontSize: 24, color: "#4a5568" }}>{t.subtitle}</p>
            <span className="relative flex h-12 w-14 shrink-0 items-center justify-center border-2 border-dashed border-[#b3a98e]">
              <span className="text-[13px] font-black" style={{ fontFamily: SERIF, color: "#8a7a55" }}>{t.tag}</span>
            </span>
            <span className="size-9 shrink-0 rounded-full border-2 border-[#9aa5b5]" style={{ borderStyle: "double", opacity: 0.7 }} aria-hidden="true" />
          </div>
        </div>
      );
      break;

    /* ============ EXCLUSIVOS · PRO ============ */
    case "portada":
      card = (
        <div className="overflow-hidden transition-shadow duration-300" style={{ background: "#ffffff", borderRadius: Math.min(r, 6), boxShadow: sh, border: border ?? "1px solid #d8deea" }}>
          <div className="flex items-end justify-between px-6 pb-2 pt-5">
            <span style={{ fontFamily: SERIF, fontSize: 44, fontWeight: 800, lineHeight: 0.9, color: "#141926", letterSpacing: "-0.02em" }}>VIBE</span>
            <span className="pb-1 text-[10px] font-bold uppercase" style={{ fontFamily: MONO, letterSpacing: "0.22em", color: "#c9832a" }}>{t.top}</span>
          </div>
          <div className="mx-6 h-[3px]" style={{ background: "#141926" }} />
          <div className="p-4 pb-3">{img}</div>
          <div className="px-6 pb-5">
            <p style={{ fontFamily: SERIF, fontSize: 26, fontWeight: 800, lineHeight: 1.1, color: "#141926" }}>{t.title}</p>
            <p className="mt-1.5 text-[13px]" style={{ color: "#55607a" }}>{t.subtitle}</p>
            <div className="mt-3 flex items-end justify-between">
              <span className="flex items-end gap-[2px]">{[3, 1, 2, 1, 3, 2, 1, 3, 1, 2, 3, 1, 2, 3, 1, 2].map((w, i) => <i key={i} style={{ width: w * 1.5, height: 20, background: "#141926" }} />)}</span>
              <span className="text-[12px] font-bold" style={{ fontFamily: MONO, color: "#141926" }}>{t.tag}</span>
            </div>
          </div>
        </div>
      );
      break;

    case "cine":
      card = (
        <div className="overflow-hidden transition-shadow duration-300" style={{ background: "#0b0c10", borderRadius: Math.min(r, 8), boxShadow: sh, border: border ?? "1px solid #23252d", padding: "0 0 4px" }}>
          <div className="flex justify-between px-3 py-2">{Array.from({ length: 12 }).map((_, i) => <i key={i} className="h-3 w-4 rounded-[3px]" style={{ background: "#e8e6df" }} />)}</div>
          <div className="px-3">{img}</div>
          <p className="py-2 text-center text-[11px] font-bold" style={{ fontFamily: MONO, letterSpacing: "0.3em", color: "#9aa3b5" }}>{t.subtitle}</p>
          <div className="flex justify-between px-3 pb-1">{Array.from({ length: 12 }).map((_, i) => <i key={i} className="h-3 w-4 rounded-[3px]" style={{ background: "#e8e6df" }} />)}</div>
        </div>
      );
      break;

    case "holograma":
      card = (
        <div className="relative transition-shadow duration-300" style={{ background: "linear-gradient(120deg,#7ff0dc,#8ec5ff,#e0c3fc,#ffd6e8,#7ff0dc)", padding: 10, borderRadius: Math.max(r, 12), boxShadow: `0 0 30px rgba(142,197,255,0.4)${sh === "none" ? "" : ", " + sh}` }}>
          <div className="relative overflow-hidden" style={{ borderRadius: Math.max(r - 6, 6) }}>
            {img}
            <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "repeating-linear-gradient(0deg, rgba(255,255,255,0.12) 0 1px, transparent 1px 3px)" }} />
          </div>
          <span className="absolute -bottom-3 right-5 rounded-full px-3 py-1 text-[10px] font-black uppercase text-white" style={{ background: "linear-gradient(90deg,#0ea5e9,#8b5cf6)", letterSpacing: "0.2em", boxShadow: "0 6px 14px rgba(0,0,0,0.3)" }}>{t.badge}</span>
        </div>
      );
      break;

    case "marmol":
      card = (
        <div className="transition-shadow duration-300" style={{ background: "linear-gradient(120deg,#f4f2ee,#e2ddd5 30%,#f7f5f1 45%,#dcd6cc 70%,#f2efe9)", padding: 14, borderRadius: Math.min(r, 6), boxShadow: sh, border: border ?? "1px solid #c9c2b6" }}>
          <div style={{ background: "#faf8f4", padding: 12, border: "1px solid #d8cba8", borderRadius: 3 }}>
            <div className="overflow-hidden" style={{ borderRadius: 2 }}>{img}</div>
            <p className="mt-3 text-center text-[12px] uppercase" style={{ fontFamily: SERIF, fontStyle: "italic", letterSpacing: "0.24em", color: "#8a7a55" }}>{t.subtitle}</p>
          </div>
        </div>
      );
      break;

    case "escenario":
      card = (
        <div className="relative overflow-hidden transition-shadow duration-300" style={{ background: "#0a0a12", padding: 20, borderRadius: Math.min(r, 10), boxShadow: sh, border: border ?? "1px solid rgba(255,255,255,0.08)" }}>
          <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(60% 55% at 50% 30%, rgba(246,188,85,0.32), transparent 70%)" }} />
          <div className="relative overflow-hidden" style={{ borderRadius: 6, border: "1px solid rgba(255,255,255,0.14)" }}>{img}</div>
          <p className="relative mt-3 text-center" style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 19, color: "#f6d9a0" }}>{t.title}</p>
        </div>
      );
      break;

    case "oro":
      card = (
        <div className="transition-shadow duration-300" style={{ background: "linear-gradient(135deg,#f9d976,#b8860b 45%,#f6e27a 70%,#8a6116)", padding: 12, borderRadius: Math.max(r, 6), boxShadow: sh }}>
          <div style={{ background: "#17130a", padding: 6, borderRadius: Math.max(r - 6, 2) }}>
            <div className="overflow-hidden" style={{ borderRadius: Math.max(r - 8, 2) }}>{img}</div>
            <p className="mt-2 py-1.5 text-center text-[13px]" style={{ fontFamily: IMPACT, letterSpacing: 8, color: "#f6d47c" }}>{t.badge}</p>
          </div>
        </div>
      );
      break;

    case "club":
      card = (
        <div className="transition-shadow duration-300" style={{ background: "#0b0d14", padding: 14, borderRadius: Math.max(r, 12), border: border ?? "2px solid #43d9be", boxShadow: `0 0 28px rgba(67,217,190,0.4)${sh === "none" ? "" : ", " + sh}` }}>
          <div style={{ border: "2px solid #ff4fd8", borderRadius: Math.max(r - 6, 6), padding: 8, boxShadow: "inset 0 0 20px rgba(255,79,216,0.15)" }}>
            <div className="overflow-hidden" style={{ borderRadius: Math.max(r - 10, 4) }}>{img}</div>
          </div>
        </div>
      );
      break;

    case "synthwave":
      card = (
        <div className="overflow-hidden transition-shadow duration-300" style={{ background: "linear-gradient(180deg,#0b0121 0%,#3b0f6f 45%,#ff2a6d 100%)", borderRadius: Math.min(r, 10), boxShadow: sh, border: border ?? "1px solid rgba(255,255,255,0.15)" }}>
          <div className="relative overflow-hidden">
            {img}
            <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(transparent 40%, rgba(255,42,109,0.3)), repeating-linear-gradient(90deg, rgba(255,255,255,0.09) 0 1px, transparent 1px 26px), repeating-linear-gradient(0deg, rgba(255,255,255,0.09) 0 1px, transparent 1px 26px)" }} />
          </div>
          <p className="py-3 text-center text-[20px]" style={{ fontFamily: IMPACT, letterSpacing: 6, color: "#ff2a6d", textShadow: "0 0 18px rgba(255,42,109,0.8)" }}>{t.title}</p>
        </div>
      );
      break;

    case "galeria":
      card = (
        <div className="transition-shadow duration-300" style={{ background: "#26292f", padding: 18, borderRadius: Math.min(r, 4), boxShadow: sh }}>
          <div style={{ border: "10px solid #3c332a", background: "#f5f2ec", padding: 16, boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.25)" }}>
            <div className="overflow-hidden">{img}</div>
          </div>
          <div className="mt-3 text-center">
            <p className="text-[13px] font-bold uppercase" style={{ letterSpacing: "0.3em", color: "#e8e2d4" }}>{t.title}</p>
            <p className="mt-0.5 text-[12px]" style={{ fontFamily: SERIF, fontStyle: "italic", color: "#9aa3b5" }}>{t.subtitle}</p>
          </div>
        </div>
      );
      break;

    case "cristal":
      card = (
        <div className="relative overflow-hidden transition-shadow duration-300" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(224,234,252,0.95))", padding: 12, borderRadius: Math.max(r, 12), boxShadow: sh, border: border ?? "1px solid rgba(255,255,255,0.9)" }}>
          <div className="overflow-hidden" style={{ borderRadius: Math.max(r - 6, 6), border: "1px solid rgba(180,200,230,0.8)" }}>{img}</div>
          <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(115deg, rgba(255,255,255,0.55) 0%, transparent 38%)" }} />
          <p className="relative mt-3 text-center text-[12px] font-semibold uppercase" style={{ letterSpacing: "0.26em", color: "#33507a" }}>{t.subtitle}</p>
        </div>
      );
      break;

    /* ============ por datos / sin marco ============ */
    default: {
      const spec = frameById(settings.frame)?.spec;
      card = spec ? (
        <SimpleFrame spec={spec} img={img} r={r} sh={sh} border={border} t={t} />
      ) : (
        <div className="overflow-hidden transition-[border-radius,box-shadow] duration-300" style={{ borderRadius: r, boxShadow: sh, border }}>{img}</div>
      );
    }
  }

  return (
    <div className="mx-auto w-max max-w-full transition-transform duration-300 ease-out" style={{ transform: settings.rotate ? `rotate(${settings.rotate}deg)` : undefined }}>
      {card}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  miniaturas del selector                                            */
/* ------------------------------------------------------------------ */

function SpecThumb({ spec }: { spec: SimpleSpec }) {
  const bd = spec.border ? `${Math.max(1, Math.round(spec.border.w / 2))}px ${spec.border.style ?? "solid"} ${spec.border.color}` : undefined;
  return (
    <span className="flex h-10 w-full flex-col overflow-hidden rounded-md" style={{ background: spec.bg ?? "var(--sf-elev)", padding: spec.pad ? Math.min(4, Math.round(spec.pad / 4)) : 2, border: bd, borderRadius: spec.radius ? Math.min(7, Math.round(spec.radius / 3)) : 5 }}>
      {spec.plate?.slot === "top" && <i className="mb-[2px] block h-2 w-full rounded-[1px]" style={{ background: spec.plate.bg }} />}
      <span className="min-h-0 flex-1 rounded-[2px]" style={{ background: SCREEN, filter: spec.filter, opacity: 0.92, margin: spec.mat ? 2 : 0 }} />
      {spec.plate?.slot === "bottom" && <i className="mt-[2px] block h-2 w-full rounded-[1px]" style={{ background: spec.plate.bg }} />}
    </span>
  );
}

export function FrameThumb({ id }: { id: string }) {
  switch (id) {
    case "browser":
      return <span className="flex h-10 w-full flex-col overflow-hidden rounded-md border border-line2 bg-[#0d111c]"><span className="flex h-3 items-center gap-[3px] px-1.5"><i className="size-[4px] rounded-full bg-[#ff5f57]" /><i className="size-[4px] rounded-full bg-[#febc2e]" /><i className="size-[4px] rounded-full bg-[#2ec747]" /></span><span className="flex-1" style={{ background: SCREEN }} /></span>;
    case "phone":
      return <span className="flex h-10 w-full items-center justify-center rounded-md bg-elev"><span className="relative flex h-8 w-5 flex-col overflow-hidden rounded-[5px] border-2 border-[#262b38] bg-[#05070c]"><i className="mx-auto mt-[2px] h-[2px] w-2 rounded-full bg-slate-600" /><span className="mx-[2px] mb-[2px] mt-[2px] flex-1 rounded-[2px]" style={{ background: SCREEN }} /></span></span>;
    case "caption":
      return <span className="flex h-10 w-full flex-col overflow-hidden rounded-md border border-line2"><span className="flex-1" style={{ background: SCREEN }} /><span className="flex h-3.5 items-center gap-1 bg-[#0e1220] px-1.5"><i className="size-[5px] rounded-[2px] bg-gold-400" /><i className="h-[2px] w-6 rounded bg-slate-400" /></span></span>;
    case "quote":
      return <span className="flex h-10 w-full flex-col overflow-hidden rounded-md border border-line2 bg-white"><span className="flex-1" style={{ background: SCREEN }} /><span className="flex flex-col gap-[2px] bg-white px-1.5 py-1"><i className="h-[2px] w-7 rounded bg-slate-700" /><i className="h-[2px] w-4 rounded bg-gold-500" /></span></span>;
    case "minimal":
      return <span className="flex h-10 w-full flex-col rounded-md border border-line2 bg-white p-1"><span className="flex-1 rounded-[2px]" style={{ background: SCREEN }} /><i className="mx-auto mt-[3px] h-[2px] w-6 rounded bg-slate-300" /></span>;
    case "darkcard":
      return <span className="flex h-10 w-full flex-col rounded-md border border-line2 bg-[#0e1116] p-1"><span className="flex-1 rounded-[2px]" style={{ background: SCREEN }} /><span className="mt-[3px] flex items-center gap-1 px-[2px]"><i className="size-[4px] rounded-full bg-gold-400" /><i className="h-[2px] w-6 rounded bg-slate-500" /></span></span>;
    case "splitbar":
      return <span className="flex h-10 w-full overflow-hidden rounded-md border border-line2"><span className="w-2.5" style={{ background: "linear-gradient(180deg,#f6bc55,#e05a5a)" }} /><span className="flex-1" style={{ background: SCREEN }} /></span>;
    case "editorial":
      return <span className="flex h-10 w-full flex-col gap-[2px] rounded-md border border-line2 bg-white p-1"><i className="h-[2px] w-4 rounded bg-gold-500" /><i className="h-[3px] w-8 rounded bg-slate-800" /><span className="flex-1 rounded-[2px]" style={{ background: SCREEN }} /></span>;
    case "social":
      return <span className="flex h-10 w-full flex-col overflow-hidden rounded-md border border-line2 bg-white"><span className="flex h-3 items-center gap-1 px-1"><i className="size-[6px] rounded-full bg-gold-400" /><i className="h-[2px] w-5 rounded bg-slate-600" /></span><span className="flex-1" style={{ background: SCREEN }} /></span>;
    case "ribbon":
      return <span className="relative flex h-10 w-full flex-col overflow-hidden rounded-md border border-line2"><span className="flex-1" style={{ background: SCREEN }} /><span className="h-3 bg-[#0e1220]" /><span className="absolute right-0 top-0 h-3 w-3 bg-coral-500" style={{ clipPath: "polygon(0 0,100% 0,100% 100%)" }} /></span>;
    case "gradborder":
      return <span className="flex h-10 w-full items-center justify-center rounded-md p-[3px]" style={{ background: "linear-gradient(120deg,#f6bc55,#e05a5a,#2dd4bf,#38bdf8)" }}><span className="h-full w-full rounded-[3px]" style={{ background: SCREEN }} /></span>;
    case "certificate":
      return <span className="flex h-10 w-full items-center justify-center rounded-md border-2 border-[#c9a227] bg-[#fbfaf6]"><span className="h-6 w-9 border border-[#c9a227] p-[2px]"><span className="block h-full w-full" style={{ background: SCREEN }} /></span></span>;
    case "breaking":
      return <span className="flex h-10 w-full flex-col overflow-hidden rounded-md border border-line2"><span className="flex-1" style={{ background: SCREEN }} /><span className="flex h-2.5 items-center gap-1 bg-[#d31f2b] px-1"><i className="h-[3px] w-4 rounded-[1px] bg-white/80" /></span><span className="h-1.5 bg-[#14161c]" /></span>;
    case "album":
      return <span className="flex h-10 w-full flex-col overflow-hidden rounded-md border border-line2"><span className="flex-1" style={{ background: SCREEN }} /><span className="flex h-3.5 items-center justify-between bg-[#101318] px-1.5"><i className="h-[2px] w-7 rounded bg-slate-500" /><i className="size-[6px] rounded-full border border-slate-500" /></span></span>;
    case "poster":
      return <span className="flex h-10 w-full flex-col overflow-hidden rounded-md border border-line2 bg-[#14161c] p-[3px]"><span className="flex-[3] rounded-[2px]" style={{ background: SCREEN }} /><span className="flex flex-[2] flex-col items-center justify-center gap-[2px]"><i className="h-[3px] w-8 rounded bg-slate-300" /><i className="h-[2px] w-5 rounded bg-gold-400" /></span></span>;
    case "cornerbadge":
      return <span className="relative flex h-10 w-full items-center justify-center rounded-md bg-elev"><span className="h-7 w-9 rounded-[4px]" style={{ background: SCREEN }} /><span className="absolute left-1 top-1 h-2 w-5 -rotate-6 rounded-full bg-gold-400" /></span>;
    case "mat":
      return <span className="flex h-10 w-full items-center justify-center rounded-md border border-line2 bg-[#f2f3f5] p-1.5"><span className="flex h-full w-full items-center justify-center border border-line2 bg-white p-[2px]"><span className="h-full w-full" style={{ background: SCREEN }} /></span></span>;
    case "carousel":
      return <span className="flex h-10 w-full flex-col overflow-hidden rounded-md border border-line2 bg-white"><span className="flex-1" style={{ background: SCREEN }} /><span className="flex h-3 items-center justify-center gap-[3px]"><i className="h-[4px] w-[8px] rounded-full bg-gold-500" /><i className="size-[4px] rounded-full bg-slate-300" /><i className="size-[4px] rounded-full bg-slate-300" /></span></span>;
    case "statbar":
      return <span className="flex h-10 w-full flex-col overflow-hidden rounded-md border border-line2"><span className="flex-1" style={{ background: SCREEN }} /><span className="flex h-3.5 items-center justify-between bg-[#0e1116] px-1.5"><i className="h-[2px] w-5 rounded bg-slate-500" /><i className="h-[6px] w-6 rounded-[2px] bg-gold-400/80" /></span></span>;
    case "meme":
      return <span className="flex h-10 w-full flex-col overflow-hidden rounded-md border border-line2 bg-[#f6f2e9]"><span className="flex h-2.5 items-center justify-center"><i className="h-[2px] w-7 rounded bg-slate-800" /></span><span className="flex-1" style={{ background: SCREEN }} /><span className="flex h-2.5 items-center justify-center"><i className="h-[2px] w-7 rounded bg-slate-800" /></span></span>;
    case "polaroid":
      return <span className="flex h-10 w-full flex-col rounded-md border border-line2 bg-[#f7f5f0] p-[3px]"><span className="flex-[3] rounded-[2px]" style={{ background: SCREEN }} /><span className="flex flex-[2] items-center justify-center"><i className="h-[2px] w-7 -rotate-2 rounded bg-slate-400" /></span></span>;
    case "comic":
      return <span className="relative flex h-10 w-full items-center justify-center rounded-md border-2 border-[#14161c] bg-[#ffd93d]"><span className="h-5 w-8 rounded-[2px] border-2 border-[#14161c]" style={{ background: SCREEN }} /><svg viewBox="0 0 100 100" className="absolute -right-1.5 -top-2 size-5"><polygon points={STAR} fill="#ff5d5d" stroke="#14161c" strokeWidth="7" strokeLinejoin="round" /></svg></span>;
    case "retro":
      return <span className="flex h-10 w-full flex-col rounded-md border border-line2 bg-[#262a33] p-[3px]"><span className="flex-[3] rounded-[2px]" style={{ background: `repeating-linear-gradient(0deg, rgba(0,0,0,0.35) 0 1px, transparent 1px 2px), ${SCREEN}` }} /><span className="mt-[2px] flex items-center justify-end gap-[3px] px-[2px]"><i className="size-[5px] rounded-full bg-[#4d5468]" /><i className="size-[5px] rounded-full bg-[#4d5468]" /></span></span>;
    case "sticker":
      return <span className="flex h-10 w-full -rotate-2 items-center justify-center rounded-md bg-elev"><span className="h-7 w-9 rounded-lg border-2 border-white shadow-md" style={{ background: SCREEN }} /></span>;
    case "tabloid":
      return <span className="flex h-10 w-full flex-col rounded-md border border-[#14161c] bg-[#ffe23d] p-[3px]"><span className="h-2 rounded-[1px] bg-[#14161c]" /><span className="mt-[3px] flex-1 rounded-[1px] border border-[#14161c]" style={{ background: SCREEN }} /><span className="mt-[2px] flex flex-col gap-[2px]"><i className="h-[3px] w-full rounded bg-[#14161c]" /><i className="h-[2px] w-6 rounded bg-[#14161c]/60" /></span></span>;
    case "vhs":
      return <span className="relative flex h-10 w-full flex-col overflow-hidden rounded-md border border-line2 bg-[#14161c] p-[3px]"><span className="relative flex-[3] overflow-hidden rounded-[2px]" style={{ background: `repeating-linear-gradient(0deg, rgba(0,0,0,0.4) 0 1px, transparent 1px 2px), ${SCREEN}` }}><i className="absolute left-[3px] top-[3px] size-[4px] rounded-full bg-red-500" /></span><span className="mt-[2px] h-2 rounded-[1px] bg-[#f2f0ea]" /></span>;
    case "wanted":
      return <span className="flex h-10 w-full flex-col items-center justify-center gap-[2px] rounded-md border border-[#8a7a55] bg-[#e9dfc8] px-1.5"><i className="h-[3px] w-8 rounded bg-[#2b2113]" /><span className="h-4 w-8 border border-[#2b2113]" style={{ background: SCREEN, filter: "sepia(0.7)" }} /><i className="h-[2px] w-6 rounded bg-[#2b2113]/70" /></span>;
    case "neon":
      return <span className="flex h-10 w-full items-center justify-center rounded-md border border-line2 bg-[#0b0d14] p-1.5"><span className="h-full w-full rounded-[4px] border border-mint-400" style={{ background: SCREEN, boxShadow: "0 0 8px rgba(67,217,190,0.8), inset 0 0 6px rgba(67,217,190,0.3)" }} /></span>;
    case "arcade":
      return <span className="flex h-10 w-full flex-col rounded-md border border-line2 bg-[#101218] p-[3px]"><span className="h-2 rounded-[1px] bg-[#1b1e28]" /><span className="mt-[2px] flex-1 rounded-[1px] border-2 border-[#2a2f3d]" style={{ background: SCREEN }} /><span className="mt-[2px] flex justify-between"><i className="h-[2px] w-5 rounded bg-mint-400" /><i className="h-[2px] w-3 rounded bg-slate-600" /></span></span>;
    case "ticket":
      return <span className="flex h-10 w-full overflow-hidden rounded-md border border-line2 bg-[#fbf6ea]"><span className="m-[3px] flex-1 rounded-[3px]" style={{ background: SCREEN }} /><span className="my-[3px] mr-[3px] flex w-3 items-center justify-center border-l border-dashed border-[#b3a98e]"><i className="h-6 w-[2px] rounded bg-[#b3a98e]" /></span></span>;
    case "chat":
      return <span className="flex h-10 w-full items-end justify-start rounded-md bg-elev p-1"><span className="relative h-7 w-9 rounded-md rounded-bl-[2px] border border-line2 bg-white p-[2px]"><span className="block h-full w-full rounded-[2px]" style={{ background: SCREEN }} /></span></span>;
    case "censored":
      return <span className="relative flex h-10 w-full items-center justify-center rounded-md bg-elev p-1"><span className="relative h-7 w-10 overflow-hidden rounded-[3px]" style={{ background: SCREEN }}><i className="absolute left-0 right-0 top-1.5 h-[5px] bg-[#0c0d11]" /><i className="absolute bottom-1.5 left-0 right-0 h-[4px] bg-[#0c0d11]" /></span><span className="absolute right-1 top-1 rotate-12 rounded-[2px] border border-coral-500 bg-white/70 px-[3px] text-[5px] font-black text-coral-500">TOP</span></span>;
    case "confetti":
      return <span className="flex h-10 w-full items-center justify-center rounded-md border border-line2 p-1.5" style={{ background: "radial-gradient(#f6bc55 1.5px, transparent 2px) 0 0/10px 9px, radial-gradient(#2dd4bf 1.5px, transparent 2px) 5px 5px/12px 11px, radial-gradient(#e05a5a 1.5px, transparent 2px) 3px 8px/9px 12px, #ffffff" }}><span className="h-full w-full rounded-[3px] border-2 border-white" style={{ background: SCREEN }} /></span>;
    case "gilded":
      return <span className="flex h-10 w-full items-center justify-center rounded-md border border-[#8a6116] p-[3px]" style={{ background: "linear-gradient(135deg,#f9d976,#b8860b)" }}><span className="flex h-full w-full flex-col border border-[#8a6116] bg-[#f9d976]/20 p-[2px]"><span className="flex-[3] rounded-[1px]" style={{ background: SCREEN }} /><span className="mt-[2px] h-2 rounded-[1px] bg-[#241a05]" /></span></span>;
    case "notebook":
      return <span className="relative flex h-10 w-full items-center justify-center rounded-md border border-line2" style={{ background: "repeating-linear-gradient(#ffffff 0 5px, #dbe4f0 5px 6px)" }}><span className="absolute left-2 top-0 h-full w-px bg-coral-400/60" /><span className="h-6 w-8 -rotate-2 border-2 border-white bg-white shadow-sm" style={{ background: SCREEN }} /></span>;
    case "gameover":
      return <span className="flex h-10 w-full flex-col items-center justify-center gap-[2px] rounded-md border border-line2 bg-[#05060a]"><i className="h-[2px] w-8 rounded bg-yellow-400" /><span className="h-3.5 w-9 rounded-[1px] border border-[#1f2330]" style={{ background: SCREEN }} /><i className="h-[3px] w-10 rounded bg-coral-400" /></span>;
    case "caution":
      return <span className="flex h-10 w-full items-center justify-center rounded-md p-[5px]" style={{ background: "repeating-linear-gradient(45deg,#f7c948 0 5px,#15171d 5px 10px)" }}><span className="flex h-full w-full flex-col rounded-[2px] bg-white p-[2px]"><span className="flex-[3] rounded-[1px]" style={{ background: SCREEN }} /><span className="mt-[2px] h-2 rounded-[1px] bg-[#15171d]" /></span></span>;
    case "price":
      return <span className="relative flex h-10 w-full items-center justify-center rounded-md bg-elev"><span className="h-7 w-9 rounded-[4px]" style={{ background: SCREEN }} /><svg viewBox="0 0 100 100" className="absolute -right-1 -top-1.5 size-6"><polygon points={burstPoints(14, 48, 36)} fill="#e05a5a" /><text x="50" y="60" textAnchor="middle" fontFamily={IMPACT} fontSize="30" fill="#ffffff">%</text></svg></span>;
    case "postal":
      return <span className="flex h-10 w-full flex-col rounded-md border border-line2 bg-[#fdfcf8] p-[3px]"><span className="flex-[3] rounded-[2px]" style={{ background: SCREEN }} /><span className="mt-[2px] flex items-center justify-between"><i className="h-[2px] w-6 rounded bg-slate-400" /><i className="h-4 w-3 border border-dashed border-[#b3a98e]" /></span></span>;
    case "portada":
      return <span className="flex h-10 w-full flex-col rounded-md border border-line2 bg-white p-[3px]"><i className="h-[4px] w-7 rounded-[1px] bg-slate-900" /><i className="mt-[2px] h-[2px] w-full bg-slate-900" /><span className="mt-[2px] flex-1 rounded-[2px]" style={{ background: SCREEN }} /><i className="mt-[2px] h-[2px] w-8 rounded bg-slate-500" /></span>;
    case "cine":
      return <span className="flex h-10 w-full flex-col justify-between rounded-md border border-line2 bg-[#0b0c10] p-[3px]"><span className="flex justify-between">{[0, 1, 2, 3, 4, 5].map((i) => <i key={i} className="h-[3px] w-[5px] rounded-[1px] bg-[#e8e6df]" />)}</span><span className="flex-1 rounded-[2px] mx-[2px]" style={{ background: SCREEN }} /><span className="flex justify-between">{[0, 1, 2, 3, 4, 5].map((i) => <i key={i} className="h-[3px] w-[5px] rounded-[1px] bg-[#e8e6df]" />)}</span></span>;
    case "holograma":
      return <span className="flex h-10 w-full items-center justify-center rounded-md p-[3px]" style={{ background: "linear-gradient(120deg,#7ff0dc,#8ec5ff,#e0c3fc,#ffd6e8)" }}><span className="h-full w-full rounded-[4px]" style={{ background: `repeating-linear-gradient(0deg, rgba(255,255,255,0.25) 0 1px, transparent 1px 2px), ${SCREEN}` }} /></span>;
    case "marmol":
      return <span className="flex h-10 w-full items-center justify-center rounded-md border border-[#c9c2b6] p-[3px]" style={{ background: "linear-gradient(120deg,#f4f2ee,#dcd6cc 60%,#f2efe9)" }}><span className="h-full w-full border border-[#d8cba8] bg-[#faf8f4] p-[2px]"><span className="h-full w-full" style={{ background: SCREEN }} /></span></span>;
    case "escenario":
      return <span className="relative flex h-10 w-full items-center justify-center overflow-hidden rounded-md border border-line2 bg-[#0a0a12]"><span className="absolute inset-0" style={{ background: "radial-gradient(60% 70% at 50% 20%, rgba(246,188,85,0.4), transparent 70%)" }} /><span className="h-6 w-9 rounded-[2px] border border-white/20" style={{ background: SCREEN }} /></span>;
    case "oro":
      return <span className="flex h-10 w-full items-center justify-center rounded-md p-[3px]" style={{ background: "linear-gradient(135deg,#f9d976,#b8860b 45%,#f6e27a 70%,#8a6116)" }}><span className="flex h-full w-full flex-col rounded-[3px] bg-[#17130a] p-[2px]"><span className="flex-1 rounded-[1px]" style={{ background: SCREEN }} /><i className="mt-[2px] h-2 rounded-[1px] bg-[#f6d47c]/30" /></span></span>;
    case "club":
      return <span className="flex h-10 w-full items-center justify-center rounded-md border-2 border-mint-400 bg-[#0b0d14] p-[4px]" style={{ boxShadow: "0 0 8px rgba(67,217,190,0.6)" }}><span className="h-full w-full rounded-[4px] border-2 border-[#ff4fd8] p-[2px]"><span className="h-full w-full rounded-[2px]" style={{ background: SCREEN }} /></span></span>;
    case "synthwave":
      return <span className="flex h-10 w-full flex-col overflow-hidden rounded-md border border-line2"><span className="flex-[3]" style={{ background: `repeating-linear-gradient(90deg, rgba(255,255,255,0.12) 0 1px, transparent 1px 5px), repeating-linear-gradient(0deg, rgba(255,255,255,0.12) 0 1px, transparent 1px 5px), linear-gradient(180deg,#3b0f6f,#ff2a6d)` }} /><span className="flex h-2.5 items-center justify-center bg-[#0b0121]"><i className="h-[3px] w-8 rounded bg-[#ff2a6d]" /></span></span>;
    case "galeria":
      return <span className="flex h-10 w-full items-center justify-center rounded-md bg-[#26292f] p-[3px]"><span className="h-full w-full border-[3px] border-[#3c332a] bg-[#f5f2ec] p-[2px]"><span className="h-full w-full" style={{ background: SCREEN }} /></span></span>;
    case "cristal":
      return <span className="relative flex h-10 w-full items-center justify-center overflow-hidden rounded-md border border-white/70 p-[3px]" style={{ background: "linear-gradient(135deg,#ffffff,#e0eafc)" }}><span className="h-full w-full rounded-[4px] border border-[#b4c8e6]" style={{ background: SCREEN }} /><span className="absolute inset-0" style={{ background: "linear-gradient(115deg, rgba(255,255,255,0.7) 0%, transparent 40%)" }} /></span>;
    default: {
      const spec = frameById(id)?.spec;
      if (spec) return <SpecThumb spec={spec} />;
      return <span className="block h-10 w-full rounded-md border-2 border-dashed border-line2" style={{ background: SCREEN, opacity: 0.8 }} />;
    }
  }
}
