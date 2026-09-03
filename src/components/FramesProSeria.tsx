import {
  BG_BRICK, BG_CORK, BG_GRID_BLUE, Barcode, Brackets, CAVEAT, IMPACT, MONO, SANS, SERIF,
  Scanlines, Sprockets, StarRow, Tape, type FrameCtx, type FrameRenderer,
} from "./framebits";

/* 30 marcos SERIOS PRO — temáticos y elaborados */

export const PRO_SERIA: Record<string, FrameRenderer> = {
  /* Pitch deck: diapositiva con marca y numeración */
  pitch: ({ img, t, r, sh, border }) => (
    <div className="overflow-hidden transition-shadow duration-300" style={{ background: "#0c1020", borderRadius: Math.min(r, 10), boxShadow: sh, border: border ?? "1px solid rgba(255,255,255,0.06)" }}>
      <div className="flex items-center gap-2 px-5 pt-4">
        <i className="size-2.5 rounded-full" style={{ background: "#f6bc55" }} />
        <i className="size-2.5 rounded-full" style={{ background: "#2dd4bf" }} />
        <span className="ml-auto text-[11px] font-bold uppercase" style={{ fontFamily: MONO, letterSpacing: "0.2em", color: "#5b6a8f" }}>confidencial</span>
      </div>
      <div className="p-4 pb-3">{img}</div>
      <div className="flex items-center justify-between px-5 pb-4">
        <span className="truncate text-[16px] font-bold text-white" style={{ fontFamily: SANS }}>{t.title}</span>
        <span className="shrink-0 pl-4 text-[13px] font-bold" style={{ fontFamily: MONO, color: "#f6bc55" }}>{t.tag}</span>
      </div>
      <div className="h-[3px]" style={{ background: "linear-gradient(90deg,#f6bc55,#2dd4bf)" }} />
    </div>
  ),

  /* HUD: corchetes de visor + telemetría */
  hud: ({ img, t, r, sh, border }) => (
    <div className="relative overflow-hidden transition-shadow duration-300" style={{ background: "#070a10", borderRadius: Math.min(r, 8), boxShadow: sh, border: border ?? "1px solid #1f2937", padding: 10 }}>
      <div className="relative overflow-hidden" style={{ borderRadius: Math.max(Math.min(r, 8) - 5, 0) }}>
        {img}
        <Scanlines opacity={0.14} />
        <Brackets color="#f6bc55" inset={10} />
      </div>
      <div className="flex items-center justify-between px-1 pt-2">
        <span className="text-[10px] font-bold uppercase" style={{ fontFamily: MONO, letterSpacing: "0.2em", color: "#2dd4bf" }}>● objetivo fijado</span>
        <span className="text-[11px]" style={{ fontFamily: MONO, color: "#9aa3b5" }}>{t.tag}</span>
      </div>
    </div>
  ),

  /* Brutalist: borde grueso, sombra dura, cinta tipográfica */
  brutalist: ({ img, t, r, sh, border }) => (
    <div className="transition-shadow duration-300" style={{ background: "#f4f1ea", border: border ?? "4px solid #111318", borderRadius: Math.min(r, 4), boxShadow: `10px 10px 0 #111318${sh === "none" ? "" : ", " + sh}` }}>
      <div className="flex items-center justify-between px-4 py-2" style={{ background: "#111318" }}>
        <span className="truncate text-[17px] text-white" style={{ fontFamily: IMPACT, letterSpacing: 3 }}>{t.title}</span>
        <span className="shrink-0 border border-white px-1.5 py-0.5 text-[9px] font-bold" style={{ fontFamily: MONO, letterSpacing: "0.16em", color: "#fff" }}>{t.badge}</span>
      </div>
      <div className="p-3">{img}</div>
    </div>
  ),

  /* Documento tipo Notion: icono, migas y checkboxes */
  notion: ({ img, t, r, sh, border }) => (
    <div className="overflow-hidden transition-shadow duration-300" style={{ background: "#ffffff", borderRadius: Math.min(r, 10), boxShadow: sh, border: border ?? "1px solid #e3e6ec" }}>
      <div className="flex items-center gap-2.5 px-4 pt-3.5">
        <span className="flex size-7 items-center justify-center rounded-md text-[13px] font-black text-white" style={{ background: "linear-gradient(135deg,#f6bc55,#e05a5a)" }}>S</span>
        <span className="truncate text-[14px] font-semibold" style={{ color: "#1b2233" }}>{t.title}</span>
        <span className="truncate text-[12px]" style={{ color: "#9aa3b5" }}>/ capturas</span>
      </div>
      <div className="p-4 pb-2">{img}</div>
      <div className="space-y-1.5 px-4 pb-4">
        <span className="flex items-center gap-2"><i className="flex size-4 items-center justify-center rounded-[4px] border-2" style={{ borderColor: "#2dd4bf", background: "#2dd4bf" }}><svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round"><path d="m5 13 4 4L19 7" /></svg></i><i className="h-2 w-40 rounded" style={{ background: "#d8deea" }} /></span>
        <span className="flex items-center gap-2"><i className="size-4 rounded-[4px] border-2" style={{ borderColor: "#c6cddd" }} /><i className="h-2 w-28 rounded" style={{ background: "#e6eaf1" }} /></span>
        <span className="block text-right text-[11px]" style={{ fontFamily: MONO, color: "#b0b8c8" }}>{t.tag}</span>
      </div>
    </div>
  ),

  /* Negativo de película con perforaciones */
  filmstrip: ({ img, t, r, sh, border }) => (
    <div className="overflow-hidden transition-shadow duration-300" style={{ background: "#17181c", borderRadius: Math.min(r, 6), boxShadow: sh, border: border ?? "1px solid #2c2f38" }}>
      <Sprockets />
      <div className="px-3 py-2">{img}</div>
      <div className="flex items-center justify-between px-3 pb-1">
        <span className="text-[10px] font-bold" style={{ fontFamily: MONO, letterSpacing: "0.2em", color: "#f6bc55" }}>▸ 400</span>
        <span className="text-[11px]" style={{ fontFamily: MONO, color: "#9aa3b5" }}>{t.tag}</span>
      </div>
      <Sprockets />
    </div>
  ),

  /* Plano blueprint con cajetín */
  blueprint: ({ img, t, r, sh, border }) => (
    <div className="relative transition-shadow duration-300" style={{ background: BG_GRID_BLUE, border: border ?? "2px dashed rgba(255,255,255,0.55)", borderRadius: Math.min(r, 4), boxShadow: sh, padding: 12 }}>
      <div className="overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.4)" }}>{img}</div>
      <div className="mt-2 flex items-center justify-between gap-3">
        <span className="text-[11px] font-bold uppercase" style={{ fontFamily: MONO, letterSpacing: "0.18em", color: "#dbeafe" }}>plano · revisión 3</span>
        <span className="flex items-center gap-3 border border-white/50 bg-white/10 px-2.5 py-1">
          <span className="truncate text-[12px] font-bold" style={{ color: "#fff" }}>{t.title}</span>
          <span className="text-[10px]" style={{ fontFamily: MONO, color: "#bfdbfe" }}>{t.tag}</span>
        </span>
      </div>
    </div>
  ),

  /* Terminal con prompt y cursor */
  terminal: ({ img, t, r, sh, border }) => (
    <div className="overflow-hidden transition-shadow duration-300" style={{ background: "#0b0e14", borderRadius: Math.min(r, 10), boxShadow: sh, border: border ?? "1px solid #232a3b" }}>
      <div className="flex items-center gap-2 px-4" style={{ height: 38, background: "#11151f", borderBottom: "1px solid #232a3b" }}>
        <i className="size-2.5 rounded-full" style={{ background: "#ff5f57" }} /><i className="size-2.5 rounded-full" style={{ background: "#febc2e" }} /><i className="size-2.5 rounded-full" style={{ background: "#2ec747" }} />
        <span className="ml-2 text-[11px]" style={{ fontFamily: MONO, color: "#6b7280" }}>shotvibe — zsh</span>
      </div>
      <div className="p-3 pb-2">{img}</div>
      <div className="flex items-center gap-2 px-4 pb-3.5">
        <span className="text-[13px] font-bold" style={{ fontFamily: MONO, color: "#2dd4bf" }}>➜</span>
        <span className="truncate text-[13px]" style={{ fontFamily: MONO, color: "#e8ebf4" }}>$ {t.title}</span>
        <i className="h-4 w-2 shrink-0" style={{ background: "#f6bc55" }} />
      </div>
    </div>
  ),

  /* Reproductor con barra de progreso y controles */
  player: ({ img, t, r, sh, border }) => (
    <div className="overflow-hidden transition-shadow duration-300" style={{ background: "#12141a", borderRadius: Math.min(r, 10), boxShadow: sh, border: border ?? "1px solid #262b38" }}>
      <div className="p-3 pb-2">{img}</div>
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between gap-3">
          <span className="min-w-0">
            <span className="block truncate text-[15px] font-bold text-white">{t.title}</span>
            <span className="block truncate text-[12px]" style={{ color: "#8d97ad" }}>{t.subtitle}</span>
          </span>
          <span className="flex shrink-0 items-center gap-3 text-slate-300">
            <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M6 5h2.5v14H6zM20 5v14L9.5 12z" /></svg>
            <span className="flex size-9 items-center justify-center rounded-full" style={{ background: "#f6bc55" }}><svg viewBox="0 0 24 24" width="15" height="15" fill="#17130a"><path d="M7 4.5v15l13-7.5z" /></svg></span>
            <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M18 5h-2.5v14H18zM4 5v14l10.5-7z" /></svg>
          </span>
        </div>
        <div className="mt-3 flex items-center gap-2.5">
          <span className="text-[10px]" style={{ fontFamily: MONO, color: "#8d97ad" }}>2:47</span>
          <span className="relative block h-1.5 flex-1 rounded-full" style={{ background: "#3d4c74" }}>
            <i className="absolute inset-y-0 left-0 rounded-full" style={{ width: "62%", background: "linear-gradient(90deg,#f6bc55,#e05a5a)" }} />
            <i className="absolute top-1/2 size-3 -translate-y-1/2 rounded-full bg-white shadow" style={{ left: "62%" }} />
          </span>
          <span className="text-[10px]" style={{ fontFamily: MONO, color: "#8d97ad" }}>4:28</span>
        </div>
      </div>
    </div>
  ),

  /* Foco de museo: pared oscura, halo de luz y marco dorado */
  foco: ({ img, t, r, sh, border }) => (
    <div className="relative transition-shadow duration-300" style={{ background: "#1b1d24", borderRadius: Math.min(r, 4), boxShadow: sh, border: border ?? "1px solid #2a2d37", padding: 26 }}>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(55% 45% at 50% 12%, rgba(246,220,160,0.22), transparent 70%)" }} />
      <div className="relative" style={{ border: "10px solid #6b5a33", boxShadow: "inset 0 0 0 2px #d8c07a, 0 16px 34px rgba(0,0,0,0.5)" }}>
        {img}
      </div>
      <div className="relative mx-auto mt-4 w-max max-w-full px-4 py-1.5 text-center" style={{ background: "#b8a05e", boxShadow: "0 2px 6px rgba(0,0,0,0.4)" }}>
        <span className="block truncate text-[12px] font-bold uppercase" style={{ fontFamily: SERIF, letterSpacing: "0.2em", color: "#3a2f14" }}>{t.title}</span>
        <span className="block truncate text-[10px]" style={{ fontFamily: SERIF, fontStyle: "italic", color: "#5c4a20" }}>{t.subtitle}</span>
      </div>
    </div>
  ),

  /* Scrapbook: washi tape, borde garabato y dedicatoria */
  scrapbook: ({ img, t, r, sh, border }) => (
    <div className="relative transition-shadow duration-300" style={{ background: "#fdf6ec", border: border ?? "2px dashed #d8b98a", borderRadius: 4, boxShadow: sh, padding: 16 }}>
      <Tape style={{ top: -9, left: 22, transform: "rotate(-8deg)" }} />
      <Tape style={{ top: -9, right: 22, transform: "rotate(7deg)", background: "rgba(190,227,213,0.9)" }} />
      <div className="overflow-hidden" style={{ border: "1px solid #ead9bd" }}>{img}</div>
      <div className="mt-3 flex items-center justify-center gap-2.5">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="#e05a5a" aria-hidden="true"><path d="M12 21S3.5 15.6 3.5 9.3C3.5 6 6 4 8.5 4c1.8 0 3 .9 3.5 2 .5-1.1 1.7-2 3.5-2 2.5 0 5 2 5 5.3C20.5 15.6 12 21 12 21z" /></svg>
        <span className="truncate text-center" style={{ fontFamily: CAVEAT, fontSize: 23, color: "#7a5c3a" }}>{t.subtitle}</span>
        <svg viewBox="0 0 24 24" width="15" height="15" fill="#f6bc55" aria-hidden="true"><path d="M12 2l2.6 6.6L21 9.8l-5 4.4 1.5 6.8L12 17.3 6.5 21 8 14.2l-5-4.4 6.4-1.2z" /></svg>
      </div>
    </div>
  ),

  /* Anuario: borde punteado, estrellas y promoción */
  yearbook: ({ img, t, r, sh, border }) => (
    <div className="transition-shadow duration-300" style={{ background: "#ffffff", border: border ?? "3px dashed #2b59c3", borderRadius: Math.min(r, 6), boxShadow: sh, padding: 14 }}>
      <div className="overflow-hidden" style={{ border: "1px solid #d8deea" }}>{img}</div>
      <div className="mt-3 text-center">
        <span className="block text-[19px] font-bold" style={{ fontFamily: SERIF, color: "#1d2a4a" }}>{t.title}</span>
        <span className="mt-1.5 flex items-center justify-center gap-2"><i className="h-px w-8" style={{ background: "#c9a227" }} /><StarRow n={3} /><i className="h-px w-8" style={{ background: "#c9a227" }} /></span>
        <span className="mt-1.5 block text-[11px] font-bold uppercase" style={{ fontFamily: MONO, letterSpacing: "0.3em", color: "#8d97ad" }}>{t.tag}</span>
      </div>
    </div>
  ),

  /* Vinilo asomando de la funda */
  vinyl: ({ img, t, r, sh, border }) => (
    <div className="relative transition-shadow duration-300" style={{ background: "linear-gradient(135deg,#1f2430,#10131a)", borderRadius: Math.min(r, 8), boxShadow: sh, border: border ?? "1px solid #2c3342", padding: 14 }}>
      <div className="relative overflow-hidden" style={{ borderRadius: Math.max(Math.min(r, 8) - 6, 0), border: "1px solid rgba(255,255,255,0.08)" }}>{img}</div>
      <div className="mt-3 flex items-center gap-3.5">
        <span className="relative size-14 shrink-0 rounded-full" style={{ background: "conic-gradient(#2c3342 0 30deg,#11151f 30deg 60deg,#2c3342 60deg 120deg,#11151f 120deg 170deg,#2c3342 170deg 230deg,#11151f 230deg 290deg,#2c3342 290deg)", border: "2px solid #3d4c74" }}>
          <i className="absolute inset-0 m-auto size-5 rounded-full" style={{ background: "#e05a5a", border: "2px solid #11151f" }} />
          <i className="absolute inset-0 m-auto size-1.5 rounded-full bg-[#11151f]" />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[15px] font-bold text-white">{t.title}</span>
          <span className="block truncate text-[12px]" style={{ color: "#8d97ad" }}>{t.subtitle}</span>
        </span>
        <span className="ml-auto shrink-0 text-[10px] font-bold uppercase" style={{ fontFamily: MONO, letterSpacing: "0.2em", color: "#f6bc55" }}>33⅓</span>
      </div>
    </div>
  ),

  /* Invitación de lujo: doble filete y florituras */
  invitation: ({ img, t, r, sh, border }) => (
    <div className="transition-shadow duration-300" style={{ background: "#fbf7ef", border: border ?? "1px solid #c9a227", borderRadius: Math.min(r, 4), boxShadow: sh, padding: 10 }}>
      <div className="relative px-4 py-4 text-center" style={{ border: "3px double #c9a227" }}>
        {["left-1.5 top-1.5", "right-1.5 top-1.5", "left-1.5 bottom-1.5", "right-1.5 bottom-1.5"].map((pos) => (
          <i key={pos} aria-hidden="true" className={`absolute ${pos} size-2 rotate-45`} style={{ background: "#c9a227" }} />
        ))}
        <span className="block text-[11px] font-bold uppercase" style={{ fontFamily: SERIF, letterSpacing: "0.4em", color: "#8a6d1f" }}>· invitación ·</span>
        <span className="mt-1 block" style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 22, color: "#3b2f1a" }}>{t.title}</span>
        <div className="mx-auto my-3 overflow-hidden" style={{ border: "1px solid #e0d3ac" }}>{img}</div>
        <span className="block text-[11px] uppercase" style={{ fontFamily: SERIF, letterSpacing: "0.28em", color: "#8a7a4a" }}>{t.subtitle}</span>
      </div>
    </div>
  ),

  /* Herbario: papel botánico, cinta y etiqueta de espécimen */
  herbario: ({ img, t, r, sh, border }) => (
    <div className="relative transition-shadow duration-300" style={{ background: "#2e4a38", borderRadius: Math.min(r, 4), boxShadow: sh, border: border ?? "1px solid #4a6b55", padding: 16 }}>
      <Tape style={{ top: -8, left: 30, transform: "rotate(-6deg)", background: "rgba(255,255,255,0.4)" }} />
      <Tape style={{ top: -8, right: 30, transform: "rotate(6deg)", background: "rgba(255,255,255,0.4)" }} />
      <div style={{ background: "#f2ead6", padding: 8 }}>
        <div className="overflow-hidden" style={{ border: "1px solid #d8cba8" }}>{img}</div>
        <div className="mt-2 flex items-center justify-between gap-3">
          <span className="truncate" style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 16, color: "#2b3a2f" }}>{t.title}</span>
          <span className="shrink-0 text-[10px] font-bold" style={{ fontFamily: MONO, letterSpacing: "0.14em", color: "#7a6a45" }}>{t.tag} · 2026</span>
        </div>
      </div>
      <svg viewBox="0 0 24 24" width="22" height="22" fill="#9dc3a8" className="absolute -bottom-2 -right-2 rotate-12" aria-hidden="true"><path d="M20 4C10 4 4 10 4 20c10 0 16-6 16-16zM4 20C9 15 15 9 20 4" stroke="#2e4a38" strokeWidth="1.2" fill="none" /></svg>
    </div>
  ),

  /* Dark academia: pergamino, sello de lacre y serif */
  academia: ({ img, t, r, sh, border }) => (
    <div className="relative transition-shadow duration-300" style={{ background: "#efe4c9", border: border ?? "1px solid #b09a6a", borderRadius: Math.min(r, 4), boxShadow: sh, padding: 16 }}>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(120% 100% at 50% 50%, transparent 55%, rgba(122,92,46,0.2))" }} />
      <div className="relative" style={{ border: "4px solid #7a5c2e", padding: 6, background: "#f7efdb" }}>
        <div className="overflow-hidden">{img}</div>
      </div>
      <div className="relative mt-3 text-center">
        <span className="block text-[17px] font-bold" style={{ fontFamily: SERIF, color: "#3b2f1a" }}>{t.title}</span>
        <span className="block text-[12px]" style={{ fontFamily: SERIF, fontStyle: "italic", color: "#7a6a45" }}>{t.subtitle}</span>
      </div>
      <span className="absolute -bottom-4 -right-4 flex size-14 items-center justify-center rounded-full" style={{ background: "radial-gradient(circle at 35% 30%, #b03243, #7f1219 70%)", boxShadow: "0 4px 10px rgba(0,0,0,0.35), inset 0 0 0 3px rgba(255,255,255,0.15)" }}>
        <span style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 800, color: "#f3d9dc" }}>S</span>
      </span>
    </div>
  ),

  /* Cromo Y2K: metal líquido y destello */
  chrome: ({ img, t, r, sh, border }) => (
    <div className="relative transition-shadow duration-300" style={{ background: "linear-gradient(160deg,#f8fafc,#9aa7bd 28%,#e8eef7 48%,#6b7a94 74%,#dfe7f2)", borderRadius: r + 8, boxShadow: sh, border, padding: 8 }}>
      <div className="overflow-hidden" style={{ borderRadius: r }}>{img}</div>
      <span aria-hidden="true" className="pointer-events-none absolute right-6 top-3 size-10 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.95), rgba(255,255,255,0) 70%)" }} />
      <div className="py-2 text-center">
        <span className="text-[13px] font-black uppercase" style={{ fontFamily: SANS, letterSpacing: "0.42em", color: "#4a5568", textShadow: "0 1px 0 rgba(255,255,255,0.9)" }}>{t.badge}</span>
      </div>
    </div>
  ),

  /* Tarjeta holográfica con código de serie */
  holocard: ({ img, t, r, sh, border }) => (
    <div className="relative transition-shadow duration-300" style={{ background: "linear-gradient(120deg,#7ff0dc,#8ec5ff,#e0c3fc,#ffd6e8,#7ff0dc)", borderRadius: Math.max(r, 12), boxShadow: `0 0 26px rgba(142,197,255,0.35)${sh === "none" ? "" : ", " + sh}`, border, padding: 8 }}>
      <div className="overflow-hidden" style={{ background: "#0d1017", borderRadius: Math.max(r - 5, 4), padding: 10 }}>
        <div className="relative overflow-hidden" style={{ borderRadius: Math.max(r - 9, 2) }}>
          {img}
          <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(115deg, rgba(255,255,255,0.28) 0%, transparent 32%)" }} />
        </div>
        <div className="mt-2.5 flex items-center justify-between gap-3">
          <Barcode h={22} color="#cfd6e4" />
          <span className="text-right">
            <span className="block text-[10px] font-black uppercase" style={{ letterSpacing: "0.2em", color: "#cfd6e4" }}>{t.badge}</span>
            <span className="block text-[10px]" style={{ fontFamily: MONO, color: "#7ff0dc" }}>{t.tag}</span>
          </span>
        </div>
      </div>
    </div>
  ),

  /* Muro de neón sobre ladrillo */
  neonwall: ({ img, t, r, sh, border }) => (
    <div className="relative transition-shadow duration-300" style={{ background: BG_BRICK, borderRadius: Math.min(r, 8), boxShadow: sh, border: border ?? "1px solid rgba(0,0,0,0.4)", padding: 18 }}>
      <div className="overflow-hidden" style={{ borderRadius: Math.max(Math.min(r, 8) - 6, 0), border: "3px solid #111318" }}>{img}</div>
      <div className="mt-3 text-center">
        <span className="text-[24px] font-bold italic" style={{ fontFamily: SANS, color: "#ff9de2", textShadow: "0 0 10px rgba(255,157,226,0.9), 0 0 34px rgba(255,157,226,0.5)" }}>{t.title}</span>
        <span className="mx-auto mt-1 block h-[3px] w-24 rounded-full" style={{ background: "#43d9be", boxShadow: "0 0 12px rgba(67,217,190,0.9)" }} />
      </div>
    </div>
  ),

  /* Monitor CRT con bisel de plástico */
  crt: ({ img, t, r, sh, border }) => (
    <div className="transition-shadow duration-300" style={{ background: "#d7dade", borderRadius: 16, boxShadow: sh, border: border ?? "1px solid #aab0bb", padding: 12 }}>
      <div className="relative overflow-hidden" style={{ borderRadius: 10, background: "#000", border: "3px solid #9aa0ab" }}>
        {img}
        <Scanlines opacity={0.16} />
        <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(115% 95% at 50% 45%, transparent 60%, rgba(0,0,0,0.4))" }} />
      </div>
      <div className="mt-2.5 flex items-center gap-3 px-1">
        <span className="text-[11px] font-black uppercase" style={{ fontFamily: SANS, letterSpacing: "0.18em", color: "#5a6170" }}>{t.tag}</span>
        <span className="ml-auto h-2 w-16 rounded-full" style={{ background: "repeating-linear-gradient(90deg,#9aa0ab 0 3px, transparent 3px 6px)" }} />
        <i className="size-2.5 rounded-full" style={{ background: "#2ec747", boxShadow: "0 0 8px rgba(46,199,71,0.9)" }} />
      </div>
    </div>
  ),

  /* Recorte de periódico con borde rasgado */
  clipping: ({ img, t, r, sh, border }) => (
    <div className="transition-shadow duration-300" style={{ background: "#efe7cf", borderRadius: 2, boxShadow: sh, border, padding: "10px 14px 14px", clipPath: "polygon(0 1.6%, 4% 0%, 9% 1.4%, 15% 0.2%, 22% 1.6%, 30% 0.4%, 38% 1.5%, 47% 0.2%, 55% 1.4%, 63% 0.3%, 72% 1.5%, 81% 0.4%, 89% 1.6%, 95% 0.3%, 100% 1.4%, 100% 98.6%, 94% 100%, 87% 98.7%, 79% 99.8%, 70% 98.6%, 61% 99.7%, 52% 98.5%, 43% 99.8%, 34% 98.6%, 26% 99.7%, 18% 98.5%, 10% 99.8%, 4% 98.8%, 0% 99.6%)" }}>
      <div className="flex items-baseline justify-between gap-3" style={{ borderBottom: "2px solid #241a05", paddingBottom: 6 }}>
        <span className="text-[19px] font-bold" style={{ fontFamily: SERIF, letterSpacing: "0.08em", color: "#241a05" }}>{t.top}</span>
        <span className="shrink-0 text-[9px] uppercase" style={{ fontFamily: MONO, letterSpacing: "0.14em", color: "#8a7a55" }}>edición especial</span>
      </div>
      <div className="mt-2 overflow-hidden" style={{ filter: "grayscale(0.35) sepia(0.18)" }}>{img}</div>
      <span className="mt-2.5 block text-[21px] leading-none" style={{ fontFamily: IMPACT, letterSpacing: 1, color: "#241a05" }}>{t.title}</span>
      <span className="mt-1 block text-[11px]" style={{ fontFamily: SERIF, fontStyle: "italic", color: "#5c4a20" }}>Nuestro corresponsal confirma: la estética no es negociable.</span>
    </div>
  ),

  /* Tablón de corcho con chincheta y nota */
  cork: ({ img, t, r, sh, border }) => (
    <div className="relative transition-shadow duration-300" style={{ background: BG_CORK, borderRadius: Math.min(r, 6), boxShadow: sh, border: border ?? "4px solid #8a6136", padding: 20 }}>
      <span className="absolute left-1/2 top-2 z-10 -translate-x-1/2">
        <i className="block size-4 rounded-full" style={{ background: "radial-gradient(circle at 35% 30%, #ff7b7b, #c23a3a 70%)", boxShadow: "0 3px 5px rgba(0,0,0,0.4)" }} />
      </span>
      <div className="mx-auto mt-2 w-max max-w-full rotate-[-1deg]" style={{ background: "#fdfcf8", padding: 10, boxShadow: "0 10px 22px rgba(60,35,10,0.35)" }}>
        <div className="overflow-hidden">{img}</div>
        <span className="mt-2 block text-center" style={{ fontFamily: CAVEAT, fontSize: 21, color: "#5c4a20" }}>{t.subtitle}</span>
      </div>
    </div>
  ),

  /* Moodboard: rejilla, cinta y paleta de color */
  moodboard: ({ img, t, r, sh, border }) => (
    <div className="relative transition-shadow duration-300" style={{ background: "radial-gradient(#cfd4de 1px, transparent 1.4px) 0 0/18px 18px, #f5f3ee", borderRadius: Math.min(r, 6), boxShadow: sh, border: border ?? "1px solid #d8dde6", padding: 16 }}>
      <Tape style={{ top: -8, left: 26, transform: "rotate(-7deg)", background: "rgba(168,201,224,0.85)" }} />
      <Tape style={{ top: -8, right: 26, transform: "rotate(6deg)", background: "rgba(246,188,85,0.7)" }} />
      <div className="overflow-hidden" style={{ border: "5px solid #ffffff", boxShadow: "0 8px 20px rgba(30,40,60,0.18)" }}>{img}</div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="truncate text-[11px] font-bold uppercase" style={{ fontFamily: MONO, letterSpacing: "0.18em", color: "#5a6170" }}>{t.title}</span>
        <span className="flex shrink-0 gap-1.5">
          {["#171c2b", "#c9832a", "#2dd4bf", "#e05a5a", "#f2f0ea"].map((c) => (
            <i key={c} className="size-5 rounded-[4px]" style={{ background: c, border: "1px solid rgba(0,0,0,0.15)" }} />
          ))}
        </span>
      </div>
    </div>
  ),

  /* Expediente: carpeta manila, clip y sello de aprobado */
  expediente: ({ img, t, r, sh, border }) => (
    <div className="relative transition-shadow duration-300" style={{ background: "#d9c9a3", borderRadius: 4, boxShadow: sh, border: border ?? "1px solid #b09a6a", padding: 14 }}>
      <span className="absolute -top-5 left-6 flex h-6 w-32 items-center justify-center rounded-t-md" style={{ background: "#cbb88d", border: "1px solid #b09a6a", borderBottom: "none" }}>
        <span className="text-[9px] font-black uppercase" style={{ fontFamily: MONO, letterSpacing: "0.2em", color: "#5c4a20" }}>EXP. 042-B</span>
      </span>
      <svg viewBox="0 0 24 60" width="16" height="40" className="absolute -top-3 right-8 z-10" aria-hidden="true">
        <path d="M8 4a4 4 0 0 1 8 0v30a6 6 0 0 1-12 0V14a4 4 0 0 1 8 0v18" fill="none" stroke="#6b7280" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
      <div className="overflow-hidden" style={{ border: "1px solid #b09a6a" }}>{img}</div>
      <div className="mt-2.5 flex items-center justify-between gap-3">
        <span className="truncate text-[13px] font-bold uppercase" style={{ fontFamily: MONO, letterSpacing: "0.1em", color: "#3b2f1a" }}>{t.title}</span>
        <span className="shrink-0" style={{ transform: "scale(0.85)", transformOrigin: "right center" }}>
          <span className="px-2.5 py-1 text-[15px] font-black uppercase" style={{ fontFamily: IMPACT, letterSpacing: "0.18em", color: "#c23a3a", border: "3px double #c23a3a", borderRadius: 4, transform: "rotate(-9deg)", display: "inline-block", opacity: 0.92 }}>{t.badge}</span>
        </span>
      </div>
    </div>
  ),

  /* Diapositiva 35mm en su marco de cartón */
  slide35: ({ img, t, r, sh, border }) => (
    <div className="transition-shadow duration-300" style={{ background: "#f2f0ea", borderRadius: Math.min(r, 4), boxShadow: sh, border: border ?? "1px solid #cfd0d6", padding: 10 }}>
      <div className="overflow-hidden" style={{ border: "3px solid #17181c" }}>{img}</div>
      <div className="mt-2 flex items-center justify-between gap-3">
        <span className="text-[11px]" style={{ fontFamily: MONO, letterSpacing: "0.16em", color: "#5a6170" }}>◂</span>
        <span className="truncate text-[11px] font-bold uppercase" style={{ fontFamily: MONO, letterSpacing: "0.22em", color: "#3b3f4a" }}>shotvibe color 35 · {t.tag}</span>
        <span className="text-[11px]" style={{ fontFamily: MONO, letterSpacing: "0.16em", color: "#5a6170" }}>▸</span>
      </div>
    </div>
  ),

  /* Noir deluxe: keyline dorada y leyenda serif */
  luxdark: ({ img, t, r, sh, border }) => (
    <div className="transition-shadow duration-300" style={{ background: "#0c0d10", borderRadius: Math.min(r, 8), boxShadow: sh, border: border ?? "1px solid #23252d", padding: 14 }}>
      <div style={{ border: "1px solid #c9a227", padding: 10, borderRadius: Math.max(Math.min(r, 8) - 6, 0) }}>
        <div className="overflow-hidden" style={{ borderRadius: Math.max(Math.min(r, 8) - 9, 0) }}>{img}</div>
      </div>
      <div className="mt-3 flex items-center justify-center gap-3">
        <i className="size-1.5 rotate-45" style={{ background: "#c9a227" }} />
        <span className="truncate text-center" style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 16, color: "#d8c07a" }}>{t.subtitle}</span>
        <i className="size-1.5 rotate-45" style={{ background: "#c9a227" }} />
      </div>
    </div>
  ),

  /* Polaroids apiladas */
  polarstack: ({ img, t, r, sh, border }) => (
    <div className="relative transition-shadow duration-300" style={{ width: "max-content", maxWidth: "100%" }}>
      <span aria-hidden="true" className="absolute inset-0 -rotate-6" style={{ background: "#efece4", borderRadius: 6, boxShadow: "0 8px 20px rgba(0,0,0,0.25)" }} />
      <span aria-hidden="true" className="absolute inset-0 rotate-[4deg]" style={{ background: "#f4f1ea", borderRadius: 6, boxShadow: "0 8px 20px rgba(0,0,0,0.22)" }} />
      <div className="relative" style={{ background: "#ffffff", borderRadius: Math.min(r, 8), boxShadow: sh, border, padding: "12px 12px 0" }}>
        <div className="overflow-hidden">{img}</div>
        <span className="block truncate px-2 pb-3 pt-2 text-center" style={{ fontFamily: CAVEAT, fontSize: 23, color: "#3c4150" }}>{t.subtitle}</span>
      </div>
    </div>
  ),

  /* Pasaporte con escudo y zona MRZ */
  passport: ({ img, t, r, sh, border }) => (
    <div className="transition-shadow duration-300" style={{ background: "#1d2a4a", borderRadius: 8, boxShadow: sh, border: border ?? "1px solid #2c3d66", padding: 14 }}>
      <div className="flex flex-col items-center gap-1 pb-3">
        <span className="flex size-10 items-center justify-center rounded-full" style={{ border: "2px solid #c9a227" }}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="#c9a227" aria-hidden="true"><path d="M12 2l2.6 6.6L21 9.8l-5 4.4 1.5 6.8L12 17.3 6.5 21 8 14.2l-5-4.4 6.4-1.2z" /></svg>
        </span>
        <span className="text-[11px] font-bold uppercase" style={{ fontFamily: SERIF, letterSpacing: "0.4em", color: "#c9a227" }}>pasaporte · {t.tag}</span>
      </div>
      <div className="overflow-hidden" style={{ border: "2px solid #c9a227", borderRadius: 4 }}>{img}</div>
      <div className="mt-2.5 flex items-center justify-between gap-3">
        <span className="truncate text-[14px] font-bold uppercase" style={{ fontFamily: MONO, letterSpacing: "0.14em", color: "#dbe4f5" }}>{t.title}</span>
        <span className="shrink-0 text-[9px]" style={{ fontFamily: MONO, letterSpacing: "0.1em", color: "#7e93c4" }}>P&lt;SVB&lt;&lt;{t.title.replace(/\s+/g, "<<").toUpperCase().slice(0, 14)}</span>
      </div>
    </div>
  ),

  /* Anuncio de revista con cupón recortable */
  magad: ({ img, t, r, sh, border }) => (
    <div className="transition-shadow duration-300" style={{ background: "#ffffff", borderRadius: Math.min(r, 4), boxShadow: sh, border: border ?? "1px solid #d8deea", padding: 16 }}>
      <div className="flex items-center gap-3">
        <i className="h-px flex-1" style={{ background: "#c6cddd" }} />
        <span className="text-[10px] font-bold uppercase" style={{ fontFamily: SERIF, letterSpacing: "0.4em", color: "#8d97ad" }}>publicidad</span>
        <i className="h-px flex-1" style={{ background: "#c6cddd" }} />
      </div>
      <div className="mt-3 overflow-hidden">{img}</div>
      <span className="mt-3 block text-center" style={{ fontFamily: SERIF, fontWeight: 800, fontSize: 21, color: "#141926" }}>{t.title}</span>
      <div className="mt-3 flex items-center gap-3" style={{ borderTop: "2px dashed #c6cddd", paddingTop: 10 }}>
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#8d97ad" strokeWidth="1.8" aria-hidden="true"><circle cx="6" cy="7" r="2.6" /><circle cx="6" cy="17" r="2.6" /><path d="M8.3 8.6 20 18M8.3 15.4 20 6" /></svg>
        <span className="text-[10px] font-bold uppercase" style={{ fontFamily: MONO, letterSpacing: "0.2em", color: "#8d97ad" }}>recorta y presenta · {t.tag}</span>
      </div>
    </div>
  ),

  /* Visor de cámara con punto de enfoque y datos EXIF */
  camera: ({ img, t, r, sh, border }) => (
    <div className="relative overflow-hidden transition-shadow duration-300" style={{ borderRadius: Math.min(r, 10), boxShadow: sh, border: border ?? "2px solid #17181c" }}>
      {img}
      <Brackets color="#f6bc55" inset={14} />
      <span className="absolute left-3 top-2.5 flex items-center gap-1.5 text-[11px] font-bold" style={{ fontFamily: MONO, color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.7)" }}>
        <i className="size-2 rounded-full" style={{ background: "#2ec747" }} /> AF
      </span>
      <span className="absolute right-3 top-2.5 flex items-center gap-1" aria-hidden="true">
        <i className="flex h-3 w-6 items-center gap-[2px] rounded-[3px] border border-white/80 p-[2px]"><i className="h-full w-1/2 rounded-[1px] bg-white/90" /><i className="h-full w-1/4 rounded-[1px] bg-white/90" /></i>
      </span>
      <span className="absolute inset-x-0 bottom-0 flex items-center justify-center px-4 py-2" style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.65))" }}>
        <span className="text-[11px] font-bold" style={{ fontFamily: MONO, letterSpacing: "0.14em", color: "#fff" }}>{t.tag}</span>
      </span>
    </div>
  ),

  /* Ónix: tarjeta negra con canto dorado */
  onyx: ({ img, t, r, sh, border }) => (
    <div className="overflow-hidden transition-shadow duration-300" style={{ background: "linear-gradient(160deg,#17181d,#0b0c10)", borderRadius: Math.min(r, 10), boxShadow: sh, border: border ?? "1px solid rgba(201,162,39,0.4)" }}>
      <div className="flex">
        <span className="w-1.5 shrink-0" style={{ background: "linear-gradient(180deg,#f6e27a,#c9a227,#8a6116)" }} />
        <div className="min-w-0 flex-1 p-3.5">
          <div className="overflow-hidden" style={{ borderRadius: Math.max(Math.min(r, 10) - 6, 0), border: "1px solid rgba(255,255,255,0.08)" }}>{img}</div>
          <div className="mt-3 flex items-center justify-between gap-3">
            <span className="truncate text-[13px] font-bold uppercase" style={{ fontFamily: SERIF, letterSpacing: "0.3em", color: "#e8d9a8" }}>{t.title}</span>
            <span className="shrink-0 rounded-full px-2.5 py-1 text-[9px] font-black uppercase" style={{ letterSpacing: "0.16em", color: "#f6d47c", border: "1px solid rgba(201,162,39,0.6)" }}>{t.badge}</span>
          </div>
        </div>
      </div>
    </div>
  ),
};
