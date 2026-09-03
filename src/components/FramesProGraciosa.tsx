import {
  BG_BRICK, BG_CORK, BG_HALFTONE, BG_STARS, CAVEAT, Heart, IMPACT, Invader, MONO, SANS,
  Scanlines, Squiggle, Stamp, StarRow, Tape, WinButton, type FrameCtx, type FrameRenderer,
} from "./framebits";

/* 30 marcos GRACIOSOS PRO — cultura meme y nostalgia viral */

export const PRO_GRACIOSA: Record<string, FrameRenderer> = {
  /* Ventana Windows 95 */
  win95: ({ img, t, r, sh, border }) => (
    <div className="transition-shadow duration-300" style={{ background: "#c0c0c0", border: "2px solid", borderColor: "#ffffff #6d6d6d #6d6d6d #ffffff", boxShadow: `4px 4px 0 rgba(0,0,0,0.35)${sh === "none" ? "" : ", " + sh}`, borderRadius: 2 }}>
      <div className="flex items-center gap-2 px-2" style={{ height: 30, background: "linear-gradient(90deg,#000080,#1084d0)" }}>
        <i className="flex size-4 items-center justify-center rounded-[2px]" style={{ background: "#c0c0c0" }}><i className="size-2.5" style={{ background: "linear-gradient(135deg,#f6bc55,#e05a5a)" }} /></i>
        <span className="truncate text-[12px] font-bold text-white">{t.title}</span>
        <span className="ml-auto flex gap-[2px]"><WinButton label="–" /><WinButton label="□" /><WinButton label="×" /></span>
      </div>
      <div className="p-2.5">
        <div className="overflow-hidden" style={{ border: "2px solid", borderColor: "#6d6d6d #ffffff #ffffff #6d6d6d" }}>{img}</div>
        <div className="mt-2 flex items-center gap-2 px-1 py-1" style={{ border: "1.5px solid", borderColor: "#6d6d6d #ffffff #ffffff #6d6d6d" }}>
          <span className="truncate text-[11px]" style={{ fontFamily: MONO, color: "#1a1a1a" }}>listo</span>
          <span className="ml-auto shrink-0 text-[11px]" style={{ fontFamily: MONO, color: "#1a1a1a" }}>{t.tag || "100%"}</span>
        </div>
      </div>
    </div>
  ),

  /* Pop-up clásico "¡Felicidades!" */
  popup: ({ img, t, r, sh, border }) => (
    <div className="transition-shadow duration-300" style={{ background: "#c0c0c0", border: "2px solid", borderColor: "#ffffff #6d6d6d #6d6d6d #ffffff", boxShadow: `8px 8px 0 rgba(0,0,0,0.3)${sh === "none" ? "" : ", " + sh}`, borderRadius: 2 }}>
      <div className="flex items-center gap-2 px-2" style={{ height: 28, background: "linear-gradient(90deg,#000080,#1084d0)" }}>
        <span className="truncate text-[12px] font-bold text-white">aviso-importante.exe</span>
        <span className="ml-auto"><WinButton label="×" /></span>
      </div>
      <div className="p-3.5">
        <p className="text-center text-[19px] text-[#b91c1c]" style={{ fontFamily: IMPACT, letterSpacing: 2 }}>{t.title}</p>
        <p className="mt-0.5 text-center text-[12px] font-semibold" style={{ color: "#1a1a1a" }}>{t.badge}</p>
        <div className="mt-2.5 overflow-hidden" style={{ border: "2px solid", borderColor: "#6d6d6d #ffffff #ffffff #6d6d6d" }}>{img}</div>
        <div className="mt-3 flex justify-center gap-2.5">
          <span className="px-5 py-1.5 text-[12px] font-bold" style={{ background: "#c0c0c0", border: "2px solid", borderColor: "#ffffff #6d6d6d #6d6d6d #ffffff", color: "#1a1a1a" }}>Aceptar</span>
          <span className="px-5 py-1.5 text-[12px]" style={{ background: "#c0c0c0", border: "2px solid", borderColor: "#ffffff #6d6d6d #6d6d6d #ffffff", color: "#6d6d6d" }}>Cancelar</span>
        </div>
      </div>
    </div>
  ),

  /* Logro desbloqueado */
  achievement: ({ img, t, r, sh, border }) => (
    <div className="overflow-hidden transition-shadow duration-300" style={{ background: "#10131a", borderRadius: Math.min(r, 10), boxShadow: sh, border: border ?? "1px solid #262b38" }}>
      <div className="p-3 pb-2.5">{img}</div>
      <div className="mx-3 mb-3 flex items-center gap-3 rounded-lg px-3.5 py-2.5" style={{ background: "linear-gradient(180deg,#2a3040,#171b26)", border: "1px solid #3d4c74" }}>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full" style={{ background: "radial-gradient(circle at 35% 30%, #f9d976, #c9a227 75%)", boxShadow: "0 0 14px rgba(201,162,39,0.5)" }}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="#3b2f1a" aria-hidden="true"><path d="M12 2l2.6 6.6L21 9.8l-5 4.4 1.5 6.8L12 17.3 6.5 21 8 14.2l-5-4.4 6.4-1.2z" /></svg>
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[13px] font-bold text-white">{t.title}</span>
          <span className="block text-[11px] font-semibold" style={{ color: "#2dd4bf" }}>Logro desbloqueado</span>
        </span>
        <span className="ml-auto shrink-0 text-[15px] font-black" style={{ fontFamily: MONO, color: "#f6bc55" }}>{t.tag}</span>
      </div>
    </div>
  ),

  /* Diálogo RPG */
  rpg: ({ img, t, r, sh, border }) => (
    <div className="transition-shadow duration-300" style={{ background: `${BG_STARS}, #0e1430`, borderRadius: Math.min(r, 8), boxShadow: sh, border: border ?? "1px solid #2a3460", padding: 14 }}>
      <div className="overflow-hidden" style={{ border: "3px solid #e8e6df", borderRadius: 6 }}>{img}</div>
      <div className="relative mt-4 rounded-lg px-4 pb-3 pt-4" style={{ background: "#0e1430", border: "3px double #e8e6df" }}>
        <span className="absolute -top-3.5 left-4 px-2 text-[12px] font-black uppercase" style={{ background: "#e8e6df", color: "#0e1430", letterSpacing: "0.12em" }}>{t.title}</span>
        <p className="text-[14px] leading-snug text-white" style={{ fontFamily: SANS }}>{t.subtitle}</p>
        <span className="mt-1.5 block text-right text-[13px] font-bold" style={{ color: "#f6bc55" }}>▼</span>
      </div>
    </div>
  ),

  /* Carta coleccionable */
  trading: ({ img, t, r, sh, border }) => (
    <div className="relative transition-shadow duration-300" style={{ background: "linear-gradient(160deg,#fdf6e0,#f3e4b8)", border: border ?? "6px solid #c9a227", borderRadius: 14, boxShadow: sh, padding: 10 }}>
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-[17px]" style={{ fontFamily: IMPACT, letterSpacing: 1, color: "#7a2e1f" }}>{t.title}</span>
        <span className="flex shrink-0 items-center gap-1.5">
          <span className="flex size-5 items-center justify-center rounded-full" style={{ background: "#f97316", border: "2px solid #7a2e1f" }}>
            <svg viewBox="0 0 24 24" width="10" height="10" fill="#fff7e0" aria-hidden="true"><path d="M12 2c3 4 6 6 6 10a6 6 0 0 1-12 0c0-4 3-6 6-10z" /></svg>
          </span>
          <span className="text-[13px] font-black" style={{ fontFamily: SANS, color: "#b91c1c" }}>{t.tag}</span>
        </span>
      </div>
      <div className="mt-1.5 overflow-hidden" style={{ border: "3px solid #7a5c2e", borderRadius: 6, background: "#17181c" }}>{img}</div>
      <div className="mt-2 rounded-md px-2.5 py-1.5" style={{ background: "rgba(255,255,255,0.55)", border: "1.5px solid #c9a227" }}>
        <span className="flex items-center justify-between gap-2 text-[12px] font-bold" style={{ color: "#3b2f1a" }}>
          <span className="truncate">★ {t.subtitle}</span><span className="shrink-0" style={{ fontFamily: MONO }}>120</span>
        </span>
      </div>
      <div className="mt-1.5 flex items-center justify-between">
        <span className="flex gap-1">{[0, 1, 2].map((i) => <i key={i} className="size-2.5 rotate-45" style={{ background: i < 2 ? "#c9a227" : "#e0d3ac" }} />)}</span>
        <span className="text-[9px] font-bold" style={{ fontFamily: MONO, letterSpacing: "0.12em", color: "#8a6d1f" }}>042/500 · ED. HOLO</span>
      </div>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[8px]" style={{ background: "linear-gradient(115deg, rgba(255,255,255,0.5) 0%, transparent 26%)" }} />
    </div>
  ),

  /* Viñeta manga con tramas y onomatopeya */
  manga: ({ img, t, r, sh, border }) => (
    <div className="relative transition-shadow duration-300" style={{ background: "#ffffff", border: border ?? "4px solid #14161c", borderRadius: Math.min(r, 4), boxShadow: `7px 7px 0 #14161c${sh === "none" ? "" : ", " + sh}` }}>
      <div className="relative overflow-hidden">
        <span style={{ display: "block", filter: "grayscale(0.35) contrast(1.15)" }}>{img}</span>
        <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: BG_HALFTONE, opacity: 0.5 }} />
        <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "repeating-linear-gradient(85deg, rgba(20,22,28,0.09) 0 2px, transparent 2px 10px)" }} />
      </div>
      <span className="absolute -left-4 -top-5 flex size-24 items-center justify-center" style={{ transform: "rotate(-10deg)" }}>
        <svg viewBox="0 0 100 100" className="absolute inset-0" aria-hidden="true"><polygon points="50,3 59,32 88,22 68,44 97,58 65,60 70,92 50,68 30,92 35,60 3,58 32,44 12,22 41,32" fill="#ffd93d" stroke="#14161c" strokeWidth="3.5" strokeLinejoin="round" /></svg>
        <span className="relative text-[19px]" style={{ fontFamily: IMPACT, color: "#14161c" }}>{t.top}</span>
      </span>
      <div className="flex items-center justify-between px-3 py-1.5" style={{ background: "#14161c" }}>
        <span className="text-[10px] font-bold" style={{ fontFamily: MONO, letterSpacing: "0.24em", color: "#fff" }}>{t.tag}</span>
        <span className="text-[10px]" style={{ fontFamily: MONO, color: "#9aa3b5" }}>cap. 042</span>
      </div>
    </div>
  ),

  /* Deep fried */
  deepfried: ({ img, t, r, sh, border }) => (
    <div className="relative overflow-hidden transition-shadow duration-300" style={{ borderRadius: Math.min(r, 6), boxShadow: sh, border: border ?? "3px solid #14161c" }}>
      <span style={{ display: "block", filter: "saturate(2.3) contrast(1.65) brightness(1.05)" }}>{img}</span>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(120% 100% at 50% 50%, transparent 45%, rgba(255,30,0,0.35))" }} />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: BG_HALFTONE, opacity: 0.35, mixBlendMode: "overlay" }} />
      <span className="absolute -bottom-3 -right-3 flex size-16 items-center justify-center rounded-full" style={{ background: "#14161c", border: "3px solid #fff", transform: "rotate(12deg)" }}>
        <svg viewBox="0 0 24 24" width="30" height="30" fill="#fff" aria-hidden="true"><path d="M12 2a8 8 0 0 0-8 8c0 3 1.6 5 3 6v3h10v-3c1.4-1 3-3 3-6a8 8 0 0 0-8-8zM8.5 21h7v1h-7zM9 10a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" /></svg>
      </span>
      <span className="absolute left-2 top-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold" style={{ fontFamily: MONO, color: "#7ff0dc" }}>{t.badge}</span>
    </div>
  ),

  /* OSD de videocámara 2004 */
  camcorder: ({ img, t, r, sh, border }) => (
    <div className="relative overflow-hidden transition-shadow duration-300" style={{ borderRadius: Math.min(r, 6), boxShadow: sh, border: border ?? "3px solid #14161c" }}>
      {img}
      <Scanlines opacity={0.12} />
      <span className="absolute left-2.5 top-2.5 flex items-center gap-1.5" aria-hidden="true">
        <i className="flex h-3.5 w-7 items-center gap-[2px] rounded-[3px] border-2 border-white/90 p-[2px]"><i className="h-full w-1/3 bg-white/90" /><i className="h-full w-1/3 bg-white/90" /><i className="h-full w-1/3 bg-white/90" /></i>
        <i className="size-2.5 rounded-full" style={{ background: "#ff4040", boxShadow: "0 0 8px rgba(255,64,64,0.9)" }} />
      </span>
      <span className="absolute right-2.5 top-2.5 text-[12px] font-bold" style={{ fontFamily: MONO, color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>{t.tag}</span>
      <span className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 text-[14px] font-black" style={{ fontFamily: SANS, color: "#fff", textShadow: "0 1px 5px rgba(0,0,0,0.8)" }}>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="#fff" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" /></svg> PLAY
      </span>
      <span className="absolute bottom-2.5 right-2.5 text-[12px] font-bold" style={{ fontFamily: MONO, color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>SP 0:00</span>
    </div>
  ),

  /* Protector DVD */
  dvd: ({ img, t, r, sh, border }) => (
    <div className="relative overflow-hidden transition-shadow duration-300" style={{ background: "#05060a", borderRadius: Math.min(r, 8), boxShadow: sh, border: border ?? "1px solid #1f2330", padding: 0 }}>
      <span style={{ display: "block", opacity: 0.92 }}>{img}</span>
      <span className="absolute left-[8%] top-[10%] rounded-lg px-3 py-1.5 text-[14px] font-black italic" style={{ border: "2.5px solid #38bdf8", color: "#38bdf8", textShadow: "0 0 14px rgba(56,189,248,0.9)", boxShadow: "0 0 22px rgba(56,189,248,0.35)", fontFamily: SANS }}>
        {t.title} <span className="text-[9px] not-italic" style={{ letterSpacing: "0.2em" }}>VIDEO</span>
      </span>
      <span className="absolute bottom-2.5 right-3 text-[11px] font-bold" style={{ fontFamily: MONO, color: "#f6bc55" }}>{t.tag}</span>
    </div>
  ),

  /* Instalando estilo… 99% */
  loading: ({ img, t, r, sh, border }) => (
    <div className="overflow-hidden transition-shadow duration-300" style={{ background: "#10131a", borderRadius: Math.min(r, 10), boxShadow: sh, border: border ?? "1px solid #262b38", padding: 12 }}>
      <div className="overflow-hidden" style={{ borderRadius: Math.max(Math.min(r, 10) - 6, 0) }}>{img}</div>
      <div className="mt-3 rounded-lg px-4 py-3" style={{ background: "#171b26", border: "1px solid #3d4c74" }}>
        <div className="flex items-center justify-between gap-3">
          <span className="truncate text-[13px] font-bold text-white">{t.title}</span>
          <span className="shrink-0 text-[12px] font-black" style={{ fontFamily: MONO, color: "#f6bc55" }}>99%</span>
        </div>
        <span className="mt-2 block h-3 overflow-hidden rounded-full" style={{ background: "#2a3040" }}>
          <i className="block h-full rounded-full" style={{ width: "99%", background: "linear-gradient(90deg,#f6bc55,#2dd4bf)" }} />
        </span>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[11px] italic" style={{ color: "#8d97ad" }}>no cierres la app…</span>
          <span className="rounded px-2.5 py-1 text-[11px] font-semibold" style={{ border: "1px solid #3d4c74", color: "#8d97ad" }}>Cancelar</span>
        </div>
      </div>
    </div>
  ),

  /* Pantalla azul */
  error: ({ img, t, r, sh, border }) => (
    <div className="overflow-hidden transition-shadow duration-300" style={{ background: "#1f4fd8", borderRadius: Math.min(r, 6), boxShadow: sh, border, padding: 18 }}>
      <span className="block text-[46px] font-bold leading-none text-white" style={{ fontFamily: SANS }}>:(</span>
      <p className="mt-3 max-w-md text-[15px] leading-snug text-white">{t.title}. Recopilamos la estética y la reiniciaremos.</p>
      <div className="mt-4 flex items-center gap-4">
        <span className="flex size-16 items-center justify-center" style={{ background: "rgba(255,255,255,0.9)" }}>
          <span className="block h-10 w-10" style={{ background: "repeating-conic-gradient(#1f4fd8 0 25%, #fff 0 50%) 0 0/8px 8px" }} />
        </span>
        <span className="text-[12px] text-white/85">
          <span className="block font-bold" style={{ fontFamily: MONO }}>{t.tag}</span>
          <span className="mt-1 block">Si llamas a soporte, enseña esta captura.</span>
        </span>
      </div>
      <div className="mt-4 overflow-hidden" style={{ border: "2px solid rgba(255,255,255,0.5)", opacity: 0.9 }}>{img}</div>
    </div>
  ),

  /* Sticker bomb */
  stickerbomb: ({ img, t, r, sh, border }) => (
    <div className="relative transition-shadow duration-300" style={{ background: "#ffffff", borderRadius: Math.min(r, 10), boxShadow: sh, border: border ?? "3px solid #14161c", padding: 12 }}>
      <div className="overflow-hidden" style={{ borderRadius: Math.max(Math.min(r, 10) - 6, 0) }}>{img}</div>
      <svg viewBox="0 0 100 100" width="58" height="58" className="absolute -left-5 -top-5 rotate-[-14deg] drop-shadow-md" aria-hidden="true"><polygon points="50,3 59,32 88,22 68,44 97,58 65,60 70,92 50,68 30,92 35,60 3,58 32,44 12,22 41,32" fill="#ff5d5d" stroke="#14161c" strokeWidth="3" strokeLinejoin="round" /><text x="50" y="58" textAnchor="middle" fontFamily={IMPACT} fontSize="26" fill="#fff">¡POP!</text></svg>
      <span className="absolute -right-4 top-6 flex size-14 rotate-12 items-center justify-center rounded-full text-[13px] font-black uppercase" style={{ background: "#43d9be", border: "3px solid #14161c", color: "#0b3f37", fontFamily: IMPACT, letterSpacing: 1 }}>wow</span>
      <span className="absolute -bottom-4 left-8 -rotate-6 rounded-full px-3 py-1 text-[12px] font-black uppercase" style={{ background: "#f6bc55", border: "3px solid #14161c", color: "#14161c", fontFamily: IMPACT, letterSpacing: 2 }}>vibe</span>
      <svg viewBox="0 0 24 24" width="30" height="30" className="absolute -bottom-3 right-10 rotate-[18deg]" fill="#f472b6" stroke="#14161c" strokeWidth="1.6" aria-hidden="true"><path d="M12 21S3.5 15.6 3.5 9.3C3.5 6 6 4 8.5 4c1.8 0 3 .9 3.5 2 .5-1.1 1.7-2 3.5-2 2.5 0 5 2 5 5.3C20.5 15.6 12 21 12 21z" /></svg>
      <span className="absolute -right-3 -top-3 flex size-10 rotate-[24deg] items-center justify-center rounded-md text-[16px] font-black" style={{ background: "#8b5cf6", border: "3px solid #14161c", color: "#fff", fontFamily: IMPACT }}>!</span>
    </div>
  ),

  /* Memphis 84 */
  memphis: ({ img, t, r, sh, border }) => (
    <div className="relative transition-shadow duration-300" style={{ background: "#eef3ec", borderRadius: Math.min(r, 8), boxShadow: sh, border: border ?? "2px solid #14161c", padding: 16 }}>
      <span className="absolute left-2.5 top-2.5"><Squiggle color="#e05a5a" w={52} /></span>
      <svg viewBox="0 0 40 36" width="34" height="30" className="absolute right-3 top-2.5" aria-hidden="true"><path d="M20 3 37 33H3z" fill="none" stroke="#2b59c3" strokeWidth="4" strokeLinejoin="round" /></svg>
      <svg viewBox="0 0 24 24" width="26" height="26" className="absolute bottom-2.5 left-3" aria-hidden="true"><circle cx="12" cy="12" r="8" fill="none" stroke="#f6bc55" strokeWidth="4" /></svg>
      <span className="absolute bottom-3 right-3"><Squiggle color="#2dd4bf" w={44} /></span>
      <div className="overflow-hidden" style={{ border: "3px solid #14161c", borderRadius: 4 }}>{img}</div>
    </div>
  ),

  /* Disco: bola de espejos */
  disco: ({ img, t, r, sh, border }) => (
    <div className="relative transition-shadow duration-300" style={{ background: "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1.6px) 0 0/14px 14px, radial-gradient(rgba(246,188,85,0.5) 1px, transparent 1.6px) 7px 7px/18px 18px, #17131f", borderRadius: Math.min(r, 10), boxShadow: sh, border: border ?? "3px solid #c9a227", padding: 14 }}>
      <div className="overflow-hidden" style={{ borderRadius: Math.max(Math.min(r, 10) - 6, 0), border: "1px solid rgba(201,162,39,0.6)" }}>{img}</div>
      <div className="mt-3 text-center">
        <span className="text-[22px]" style={{ fontFamily: CAVEAT, color: "#f6d47c", textShadow: "0 0 16px rgba(246,212,124,0.8)" }}>{t.title}</span>
      </div>
    </div>
  ),

  /* Envoltorio de caramelo */
  candy: ({ img, t, r, sh, border }) => (
    <div className="relative transition-shadow duration-300" style={{ background: "repeating-linear-gradient(45deg, rgba(255,255,255,0.28) 0 12px, transparent 12px 24px), linear-gradient(135deg,#ff9ac1,#ff6fa5)", borderRadius: Math.min(r, 10), boxShadow: sh, border, padding: "14px 26px" }}>
      <span aria-hidden="true" className="absolute -left-4 top-1/2 h-14 w-8 -translate-y-1/2" style={{ background: "#ff6fa5", clipPath: "polygon(100% 0, 100% 100%, 0 88%, 30% 75%, 0 62%, 30% 50%, 0 38%, 30% 25%, 0 12%)", filter: "brightness(0.92)" }} />
      <span aria-hidden="true" className="absolute -right-4 top-1/2 h-14 w-8 -translate-y-1/2" style={{ background: "#ff6fa5", clipPath: "polygon(0 0, 0 100%, 100% 88%, 70% 75%, 100% 62%, 70% 50%, 100% 38%, 70% 25%, 100% 12%)", filter: "brightness(0.92)" }} />
      <div className="overflow-hidden" style={{ borderRadius: Math.max(Math.min(r, 10) - 8, 2), border: "3px solid #ffffff" }}>{img}</div>
      <div className="mt-2.5 text-center">
        <span className="rounded-full px-3.5 py-1 text-[14px] text-white" style={{ fontFamily: IMPACT, letterSpacing: 3, background: "#d6336c", display: "inline-block", transform: "rotate(-2deg)", boxShadow: "2px 2px 0 rgba(0,0,0,0.2)" }}>{t.badge}</span>
      </div>
    </div>
  ),

  /* Kawaii con orejitas */
  kawaii: ({ img, t, r, sh, border }) => (
    <div className="relative transition-shadow duration-300" style={{ background: "radial-gradient(rgba(244,114,182,0.35) 2px, transparent 2.6px) 0 0/26px 22px, #fdf1f5", borderRadius: Math.min(r, 12), boxShadow: sh, border: border ?? "2px solid #f9a8d4", padding: 16 }}>
      <span aria-hidden="true" className="absolute left-[26%] top-1 size-8" style={{ background: "#f9a8d4", clipPath: "polygon(50% 0, 100% 100%, 0 100%)", borderRadius: "40% 40% 0 0" }} />
      <span aria-hidden="true" className="absolute right-[26%] top-1 size-8" style={{ background: "#f9a8d4", clipPath: "polygon(50% 0, 100% 100%, 0 100%)", borderRadius: "40% 40% 0 0" }} />
      <div className="mt-4 overflow-hidden" style={{ borderRadius: 18, border: "4px solid #ffffff", boxShadow: "0 8px 20px rgba(214,51,108,0.2)" }}>{img}</div>
      <div className="mt-3 flex items-center justify-center gap-2">
        <Heart size={15} />
        <span className="truncate text-center" style={{ fontFamily: CAVEAT, fontSize: 23, color: "#d6336c" }}>{t.subtitle}</span>
        <Heart size={15} />
      </div>
    </div>
  ),

  /* RGB gamer */
  gamer: ({ img, t, r, sh, border }) => (
    <div className="relative transition-shadow duration-300" style={{ background: "conic-gradient(from 0deg, #f472b6, #a855f7, #22d3ee, #4ade80, #f472b6)", borderRadius: Math.max(r, 12), boxShadow: `0 0 20px rgba(168,85,247,0.55), 0 0 44px rgba(34,211,238,0.3)${sh === "none" ? "" : ", " + sh}`, border, padding: 7 }}>
      <div className="relative overflow-hidden" style={{ background: "#0b0d14", borderRadius: Math.max(r - 5, 6), padding: 8 }}>
        <div className="overflow-hidden" style={{ borderRadius: Math.max(r - 9, 3) }}>{img}</div>
        <span className="absolute right-3 top-3 rounded px-2 py-0.5 text-[11px] font-black" style={{ fontFamily: MONO, letterSpacing: "0.12em", color: "#4ade80", background: "rgba(11,13,20,0.85)", border: "1px solid rgba(74,222,128,0.5)", textShadow: "0 0 10px rgba(74,222,128,0.8)" }}>{t.tag}</span>
      </div>
    </div>
  ),

  /* Grafiti sobre muro */
  graffiti: ({ img, t, r, sh, border }) => (
    <div className="relative transition-shadow duration-300" style={{ background: BG_BRICK, borderRadius: Math.min(r, 6), boxShadow: sh, border: border ?? "1px solid rgba(0,0,0,0.45)", padding: 16 }}>
      <div className="-rotate-1 overflow-hidden" style={{ border: "4px solid #14161c", borderRadius: 4, boxShadow: "0 12px 26px rgba(0,0,0,0.45)" }}>{img}</div>
      <span className="absolute -top-4 left-5 -rotate-6 text-[27px] font-black italic" style={{ fontFamily: IMPACT, letterSpacing: 2, color: "#7ff0dc", textShadow: "0 0 14px rgba(127,240,220,0.9), 3px 3px 0 rgba(20,22,28,0.8)" }}>
        {t.title}
        <i className="absolute -bottom-2 left-4 block h-3 w-1.5 rounded-b-full" style={{ background: "#7ff0dc" }} />
      </span>
      <span className="absolute bottom-3 right-4 text-[10px] font-bold uppercase" style={{ fontFamily: MONO, letterSpacing: "0.2em", color: "rgba(255,255,255,0.75)" }}>crew 2026</span>
    </div>
  ),

  /* Tragamonedas 777 */
  slot: ({ img, t, r, sh, border }) => (
    <div className="overflow-hidden transition-shadow duration-300" style={{ background: "#5c0f24", borderRadius: Math.min(r, 10), boxShadow: sh, border: border ?? "4px double #c9a227" }}>
      <div className="flex items-center justify-center gap-2 py-2" style={{ background: "#3d0a18" }}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <i key={i} className="size-2 rounded-full" style={{ background: i % 2 ? "#f6d47c" : "#e05a5a", boxShadow: "0 0 8px rgba(246,212,124,0.7)" }} />
        ))}
      </div>
      <div className="flex items-center justify-center gap-3 py-1.5">
        {["7", "7", "7"].map((n, i) => (
          <span key={i} className="flex h-10 w-9 items-center justify-center rounded-md text-[24px]" style={{ fontFamily: IMPACT, color: "#f6d47c", background: "#fff7e0", border: "2px solid #c9a227", textShadow: "1px 1px 0 #c9a227" }}>{n}</span>
        ))}
      </div>
      <div className="px-3 pb-3">{img}</div>
      <div className="flex items-center justify-between px-4 pb-3">
        <span className="text-[15px] text-[#f6d47c]" style={{ fontFamily: IMPACT, letterSpacing: 4, textShadow: "0 0 12px rgba(246,212,124,0.7)" }}>{t.title || "JACKPOT"}</span>
        <span className="text-[10px] font-bold" style={{ fontFamily: MONO, letterSpacing: "0.14em", color: "#f0b9c8" }}>{t.tag}</span>
      </div>
    </div>
  ),

  /* Galleta de la fortuna */
  fortune: ({ img, t, r, sh, border }) => (
    <div className="relative transition-shadow duration-300" style={{ background: "#fdf8ec", borderRadius: Math.min(r, 6), boxShadow: sh, border: border ?? "1px solid #e0d3ac", padding: 14 }}>
      <div className="overflow-hidden" style={{ border: "1px solid #e0d3ac" }}>{img}</div>
      <div className="relative mx-auto mt-3 w-max max-w-full -rotate-1 px-5 py-2.5 text-center" style={{ background: "#ffffff", border: "1px solid #d9cfae", boxShadow: "0 6px 14px rgba(122,92,46,0.15)" }}>
        <span className="block text-[9px] font-black uppercase" style={{ fontFamily: MONO, letterSpacing: "0.3em", color: "#b09a6a" }}>tu fortuna dice</span>
        <span className="block" style={{ fontFamily: CAVEAT, fontSize: 23, color: "#7a5c2e" }}>{t.subtitle}</span>
      </div>
      <span aria-hidden="true" className="absolute -bottom-4 -left-3 size-12 rotate-[-20deg] rounded-t-full" style={{ background: "linear-gradient(160deg,#f0c48a,#d9985f)", border: "2px solid #b97e3f" }} />
    </div>
  ),

  /* Tira cómica de 3 viñetas */
  vineta: ({ img, t, r, sh, border }) => (
    <div className="transition-shadow duration-300" style={{ background: "#ffffff", borderRadius: Math.min(r, 4), boxShadow: sh, border: border ?? "3px solid #14161c", padding: 10 }}>
      <div className="flex gap-2">
        <span className="relative flex w-24 shrink-0 items-center justify-center overflow-hidden" style={{ background: `${BG_HALFTONE}, #ffd93d`, border: "3px solid #14161c", borderRadius: 3 }}>
          <span className="-rotate-6 text-[16px]" style={{ fontFamily: IMPACT, color: "#14161c" }}>{t.top}</span>
        </span>
        <span className="min-w-0 flex-1 overflow-hidden" style={{ border: "3px solid #14161c", borderRadius: 3 }}>{img}</span>
        <span className="relative flex w-24 shrink-0 flex-col items-center justify-center gap-1 overflow-hidden" style={{ background: `${BG_HALFTONE}, #7ff0dc`, border: "3px solid #14161c", borderRadius: 3 }}>
          <StarRow n={1} color="#14161c" size={20} />
          <span className="rotate-3 text-[13px]" style={{ fontFamily: IMPACT, color: "#14161c" }}>¡!!</span>
        </span>
      </div>
      <div className="mt-2 flex items-center justify-between px-1 py-1" style={{ background: "#14161c", borderRadius: 3 }}>
        <span className="px-2 text-[10px] font-bold" style={{ fontFamily: MONO, letterSpacing: "0.24em", color: "#fff" }}>{t.tag}</span>
        <span className="px-2 text-[10px]" style={{ fontFamily: MONO, color: "#9aa3b5" }}>tira nº 42</span>
      </div>
    </div>
  ),

  /* Máquina de garra */
  garra: ({ img, t, r, sh, border }) => (
    <div className="relative overflow-hidden transition-shadow duration-300" style={{ background: "repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 26px, transparent 26px 52px), #0e2233", borderRadius: 12, boxShadow: sh, border: border ?? "4px solid #2a3f55", padding: 12 }}>
      <svg viewBox="0 0 60 46" width="52" height="40" className="absolute left-1/2 top-1 -translate-x-1/2" aria-hidden="true">
        <path d="M30 0v14" stroke="#9aa3b5" strokeWidth="4" />
        <path d="M30 14c-10 2-14 10-13 20M30 14c10 2 14 10 13 20M30 14v22" stroke="#cfd6e4" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      </svg>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(55% 45% at 50% 30%, rgba(246,212,124,0.2), transparent 70%)" }} />
      <div className="relative mt-8 overflow-hidden" style={{ borderRadius: 8, border: "2px solid rgba(255,255,255,0.18)" }}>{img}</div>
      <div className="relative mt-2.5 text-center">
        <span className="inline-block -rotate-2 rounded-full px-4 py-1 text-[15px] text-[#17130a]" style={{ fontFamily: IMPACT, letterSpacing: 3, background: "#f6d47c", boxShadow: "0 4px 12px rgba(0,0,0,0.4)" }}>{t.badge}</span>
      </div>
    </div>
  ),

  /* Marcianitos */
  marcianitos: ({ img, t, r, sh, border }) => (
    <div className="transition-shadow duration-300" style={{ background: `${BG_STARS}, #05060f`, borderRadius: Math.min(r, 8), boxShadow: sh, border: border ?? "2px solid #1f2937", padding: 12 }}>
      <div className="mb-2 flex items-center justify-between px-1">
        <span className="flex gap-2.5">{[0, 1, 2, 3, 4].map((i) => <Invader key={i} size={20} color={["#7ff0dc", "#f472b6", "#f6bc55", "#4ade80", "#8ec5ff"][i]} />)}</span>
        <span className="text-[11px] font-bold" style={{ fontFamily: MONO, letterSpacing: "0.14em", color: "#4ade80" }}>{t.tag}</span>
      </div>
      <div className="overflow-hidden" style={{ border: "2px solid #1f2937", borderRadius: 4 }}>{img}</div>
      <div className="mt-2 flex items-center justify-between px-1">
        <span className="text-[11px] font-bold" style={{ fontFamily: MONO, letterSpacing: "0.14em", color: "#7ff0dc" }}>SCORE 042000</span>
        <Invader size={18} color="#f472b6" />
      </div>
    </div>
  ),

  /* Pixel art */
  pixel: ({ img, t, r, sh, border }) => (
    <div className="transition-shadow duration-300" style={{ background: "#1a1c2c", borderRadius: 4, boxShadow: sh, border: border ?? "6px solid #3b4368", padding: 10 }}>
      <div className="overflow-hidden" style={{ border: "3px solid #12131f", imageRendering: "pixelated" }}>{img}</div>
      <div className="mt-2.5 flex items-center justify-center gap-3">
        <i className="size-3 rounded-full" style={{ background: "#f6bc55", boxShadow: "0 0 8px rgba(246,188,85,0.8)" }} />
        <span className="text-[14px] font-black uppercase" style={{ fontFamily: MONO, letterSpacing: "0.3em", color: "#f6bc55", textShadow: "2px 2px 0 #12131f" }}>{t.tag}</span>
        <i className="size-3 rounded-full" style={{ background: "#f6bc55", boxShadow: "0 0 8px rgba(246,188,85,0.8)" }} />
      </div>
    </div>
  ),

  /* Teoría conspirativa: corcho, hilo rojo y notas */
  conspiracion: ({ img, t, r, sh, border }) => (
    <div className="relative transition-shadow duration-300" style={{ background: BG_CORK, borderRadius: Math.min(r, 6), boxShadow: sh, border: border ?? "4px solid #8a6136", padding: 18 }}>
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 600 400" preserveAspectRatio="none" aria-hidden="true">
        <path d="M36 56 L 300 30 L 528 76 L 372 220" stroke="#c23a3a" strokeWidth="2.5" fill="none" />
      </svg>
      <i className="absolute left-[6%] top-[9%] size-3.5 rounded-full" style={{ background: "radial-gradient(circle at 35% 30%, #ff7b7b, #c23a3a 70%)", boxShadow: "0 2px 4px rgba(0,0,0,0.4)" }} />
      <i className="absolute right-[8%] top-[14%] size-3.5 rounded-full" style={{ background: "radial-gradient(circle at 35% 30%, #ff7b7b, #c23a3a 70%)", boxShadow: "0 2px 4px rgba(0,0,0,0.4)" }} />
      <span className="absolute right-[4%] top-[3%] rotate-6 px-2 py-1 text-[10px] font-black uppercase" style={{ background: "#fff7d6", fontFamily: MONO, letterSpacing: "0.1em", color: "#5c4a20", boxShadow: "0 3px 8px rgba(0,0,0,0.3)" }}>{t.top}</span>
      <div className="relative mx-auto mt-3 w-max max-w-full rotate-[1deg]" style={{ background: "#fdfcf8", padding: 8, boxShadow: "0 10px 22px rgba(60,35,10,0.35)" }}>
        <div className="overflow-hidden">{img}</div>
      </div>
      <div className="relative mt-3 text-center"><Stamp text={t.badge} /></div>
    </div>
  ),

  /* Glitch */
  glitch: ({ img, t, r, sh, border }) => (
    <div className="relative overflow-hidden transition-shadow duration-300" style={{ borderRadius: Math.min(r, 6), boxShadow: sh, border: border ?? "2px solid #14161c", background: "#0b0d14" }}>
      {img}
      <span aria-hidden="true" className="absolute left-0 top-[18%] h-2.5 w-[62%]" style={{ background: "rgba(34,211,238,0.8)" }} />
      <span aria-hidden="true" className="absolute right-0 top-[46%] h-4 w-[38%]" style={{ background: "rgba(244,114,182,0.75)" }} />
      <span aria-hidden="true" className="absolute bottom-[24%] left-[8%] h-1.5 w-[30%]" style={{ background: "rgba(255,255,255,0.85)" }} />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: BG_HALFTONE, opacity: 0.25 }} />
      <span className="absolute bottom-2.5 left-3 rounded bg-black/70 px-2 py-1 text-[11px] font-bold" style={{ fontFamily: MONO, letterSpacing: "0.12em", color: "#22d3ee" }}>// {t.badge}</span>
      <span className="absolute right-3 top-2.5 text-[11px] font-bold" style={{ fontFamily: MONO, color: "#f472b6" }}>ERR_042</span>
    </div>
  ),

  /* Cómic pop con bocadillo */
  burbuja: ({ img, t, r, sh, border }) => (
    <div className="relative transition-shadow duration-300" style={{ background: `${BG_HALFTONE}, #ffd93d`, borderRadius: Math.min(r, 8), boxShadow: sh, border: border ?? "3px solid #14161c", padding: 14 }}>
      <div className="overflow-hidden" style={{ borderRadius: Math.max(Math.min(r, 8) - 6, 2), border: "4px solid #14161c" }}>{img}</div>
      <span className="absolute -top-6 right-4 max-w-[70%]">
        <span className="block rounded-3xl border-[3px] border-[#14161c] bg-white px-4 py-2 text-[17px]" style={{ fontFamily: IMPACT, letterSpacing: 1, color: "#14161c", boxShadow: "3px 3px 0 #14161c" }}>{t.top}</span>
        <i className="absolute -bottom-2 right-8 block size-4 rotate-45 border-b-[3px] border-r-[3px] border-[#14161c] bg-white" />
      </span>
    </div>
  ),

  /* Lámpara de lava */
  lavalamp: ({ img, t, r, sh, border }) => (
    <div className="relative overflow-hidden transition-shadow duration-300" style={{ background: "linear-gradient(180deg,#2a0f3d,#4a1259)", borderRadius: Math.min(r, 12), boxShadow: sh, border: border ?? "2px solid #e8b4f0", padding: 14 }}>
      <span aria-hidden="true" className="absolute -left-4 top-6 size-16 rounded-full" style={{ background: "radial-gradient(circle at 35% 30%, #ffb347, #f97316)", filter: "blur(2px)" }} />
      <span aria-hidden="true" className="absolute -right-5 top-1/2 size-20 rounded-full" style={{ background: "radial-gradient(circle at 35% 30%, #ff9ac1, #e05a9a)", filter: "blur(3px)" }} />
      <span aria-hidden="true" className="absolute bottom-4 left-1/3 size-10 rounded-full" style={{ background: "radial-gradient(circle at 35% 30%, #fde047, #f59e0b)", filter: "blur(2px)" }} />
      <div className="relative overflow-hidden" style={{ borderRadius: Math.max(Math.min(r, 12) - 6, 4), border: "2px solid rgba(232,180,240,0.7)" }}>{img}</div>
      <div className="relative mt-2.5 text-center"><span className="text-[21px]" style={{ fontFamily: CAVEAT, color: "#f5c6ec" }}>{t.tag}</span></div>
    </div>
  ),

  /* Rockola */
  rockola: ({ img, t, r, sh, border }) => (
    <div className="transition-shadow duration-300" style={{ background: "#1c0f0f", borderRadius: Math.min(r, 12), boxShadow: sh, border: border ?? "3px solid #c9a227", padding: 12 }}>
      <div className="relative overflow-hidden rounded-t-full px-6 pb-2 pt-8 text-center" style={{ background: "linear-gradient(180deg,#7f1d1d,#c2410c)", border: "3px solid #c9a227", borderBottom: "none" }}>
        <span className="absolute inset-x-6 top-3 h-8 rounded-t-full" style={{ border: "2px dashed rgba(246,212,124,0.8)", borderBottom: "none" }} />
        <span className="text-[20px] text-[#f6d47c]" style={{ fontFamily: CAVEAT, textShadow: "0 0 14px rgba(246,212,124,0.9)" }}>{t.title}</span>
      </div>
      <div className="overflow-hidden" style={{ border: "3px solid #c9a227", borderTop: "none" }}>{img}</div>
      <div className="mt-2.5 flex items-center justify-center gap-3">
        {["#e05a5a", "#f6bc55", "#2dd4bf", "#8ec5ff"].map((c) => <i key={c} className="size-3.5 rounded-full" style={{ background: c, boxShadow: `0 0 10px ${c}` }} />)}
        <span className="text-[11px] font-bold" style={{ fontFamily: MONO, letterSpacing: "0.24em", color: "#f0b9c8" }}>45 RPM</span>
      </div>
    </div>
  ),

  /* Fiesta con globos y confeti */
  fiesta: ({ img, t, r, sh, border }) => (
    <div className="relative transition-shadow duration-300" style={{ background: "radial-gradient(rgba(224,90,90,0.4) 1.5px, transparent 2px) 0 0/22px 20px, radial-gradient(rgba(45,212,191,0.4) 1.5px, transparent 2px) 10px 12px/26px 24px, radial-gradient(rgba(246,188,85,0.5) 1.5px, transparent 2px) 5px 6px/18px 18px, #fdf3f8", borderRadius: Math.min(r, 12), boxShadow: sh, border: border ?? "2px solid #f9a8d4", padding: 16 }}>
      <svg viewBox="0 0 40 70" width="34" height="58" className="absolute left-3 top-1 -rotate-6" aria-hidden="true">
        <ellipse cx="20" cy="18" rx="14" ry="17" fill="#e05a5a" /><path d="M20 35c-2 10 4 16-2 30" stroke="#8d97ad" strokeWidth="1.5" fill="none" /><path d="M16 34h8l-4 6z" fill="#c23a3a" />
      </svg>
      <svg viewBox="0 0 40 70" width="30" height="52" className="absolute right-4 top-2 rotate-6" aria-hidden="true">
        <ellipse cx="20" cy="18" rx="14" ry="17" fill="#2dd4bf" /><path d="M20 35c2 10-4 16 2 30" stroke="#8d97ad" strokeWidth="1.5" fill="none" /><path d="M16 34h8l-4 6z" fill="#178f7c" />
      </svg>
      <div className="relative mt-6 overflow-hidden" style={{ borderRadius: 16, border: "5px solid #ffffff", boxShadow: "0 12px 26px rgba(214,51,108,0.25)" }}>{img}</div>
      <div className="mt-3 text-center">
        <span className="text-[21px] text-[#d6336c]" style={{ fontFamily: IMPACT, letterSpacing: 3 }}>{t.title}</span>
      </div>
    </div>
  ),
};
