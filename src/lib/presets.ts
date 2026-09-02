import type { AspectId, FrameId, FrameTexts } from "./types";

/* ------------------------------------------------------------------ */
/*  fondos                                                             */
/* ------------------------------------------------------------------ */

export interface BgPreset {
  id: string;
  name: string;
  css: string;
}

const g = (a: string, b: string, deg = 135) => `linear-gradient(${deg}deg, ${a}, ${b})`;

export const BG_PRESETS: BgPreset[] = [
  { id: "indigo", name: "Índigo", css: g("#312e81", "#6366f1") },
  { id: "mint", name: "Menta", css: g("#0f766e", "#5eead4") },
  { id: "sunset", name: "Atardecer", css: g("#f59e0b", "#ef4444") },
  { id: "ocean", name: "Océano", css: g("#0ea5e9", "#1e3a8a") },
  { id: "rosa", name: "Rosa", css: g("#ec4899", "#f9a8d4") },
  { id: "lavanda", name: "Lavanda", css: g("#a78bfa", "#ddd6fe") },
  { id: "bosque", name: "Bosque", css: g("#14532d", "#86efac") },
  { id: "carbon", name: "Carbón", css: g("#111827", "#374151") },
  { id: "oro", name: "Oro", css: g("#b45309", "#fcd34d") },
  { id: "cereza", name: "Cereza", css: g("#881337", "#fb7185") },
  { id: "cielo", name: "Cielo", css: g("#bae6fd", "#e0f2fe", 180) },
  { id: "lima", name: "Lima", css: g("#3f6212", "#bef264") },
  { id: "vino", name: "Vino", css: g("#4c0519", "#9f1239") },
  { id: "turquesa", name: "Turquesa", css: g("#134e4a", "#2dd4bf") },
  { id: "melocoton", name: "Melocotón", css: g("#fdba74", "#fef3c7", 120) },
  { id: "grafito", name: "Grafito", css: g("#0b0e15", "#26304a") },
];

export type BgChoice = { kind: "preset"; id: string } | { kind: "solid"; color: string };

export function bgToCss(c: BgChoice): string {
  if (c.kind === "solid") return c.color;
  return BG_PRESETS.find((b) => b.id === c.id)?.css ?? BG_PRESETS[0].css;
}

/* ------------------------------------------------------------------ */
/*  formatos para redes sociales                                       */
/* ------------------------------------------------------------------ */

export interface AspectMeta {
  id: AspectId;
  label: string;
  hint: string;
  ratio: number | null;
}

export const ASPECTS: AspectMeta[] = [
  { id: "free", label: "Libre", hint: "original", ratio: null },
  { id: "1:1", label: "1:1", hint: "post cuadrado", ratio: 1 },
  { id: "4:5", label: "4:5", hint: "Instagram", ratio: 4 / 5 },
  { id: "3:4", label: "3:4", hint: "retrato", ratio: 3 / 4 },
  { id: "9:16", label: "9:16", hint: "Story · Reel · TikTok", ratio: 9 / 16 },
  { id: "16:9", label: "16:9", hint: "YouTube · X", ratio: 16 / 9 },
  { id: "2:3", label: "2:3", hint: "Pinterest", ratio: 2 / 3 },
  { id: "1.91:1", label: "1.91:1", hint: "LinkedIn · enlace", ratio: 1.91 },
];

export function aspectRatio(id: AspectId): number | null {
  return ASPECTS.find((a) => a.id === id)?.ratio ?? null;
}

export const MAX_SLIDES = 10;

export function uid(): string {
  try {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  } catch {
    /* noop */
  }
  return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

export function slugify(s: string): string {
  return (
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "captura"
  );
}

export const cn = (...xs: Array<string | false | null | undefined>) => xs.filter(Boolean).join(" ");

/* ------------------------------------------------------------------ */
/*  marcos                                                             */
/* ------------------------------------------------------------------ */

export interface SimpleSpec {
  bg?: string;
  pad?: number;
  border?: { w: number; style?: string; color: string };
  radius?: number;
  mat?: { color: string; w: number };
  filter?: string;
  overlay?: string;
  plate?: {
    slot: "top" | "bottom";
    key: keyof FrameTexts;
    bg: string;
    color: string;
    font?: "sans" | "mono" | "impact" | "serif";
    ls?: number;
    size?: number;
  };
}

export interface FrameMeta {
  id: FrameId;
  name: string;
  kind: "seria" | "graciosa" | "exclusiva";
  pro?: boolean;
  spec?: SimpleSpec;
  texts?: Array<{ key: keyof FrameTexts; placeholder: string }>;
}

const txt = (key: keyof FrameTexts, placeholder: string) => ({ key, placeholder });

export const FRAME_META: FrameMeta[] = [
  /* ================= SERIA · GRATIS (20) ================= */
  { id: "none", name: "Sin marco", kind: "seria" },
  { id: "browser", name: "Navegador", kind: "seria", texts: [txt("url", "shotvibe.app")] },
  { id: "phone", name: "Teléfono", kind: "seria" },
  { id: "caption", name: "Presentación", kind: "seria", texts: [txt("title", "Título de la captura"), txt("subtitle", "Subtítulo o descripción"), txt("tag", "shotvibe.app")] },
  { id: "quote", name: "Cita", kind: "seria", texts: [txt("title", "Escribe tu cita favorita…"), txt("subtitle", "— Autor de la cita")] },
  { id: "minimal", name: "Minimal", kind: "seria", texts: [txt("subtitle", "leyenda opcional")] },
  { id: "darkcard", name: "Tarjeta", kind: "seria", texts: [txt("title", "Título del proyecto"), txt("subtitle", "breve descripción")] },
  { id: "splitbar", name: "Banda", kind: "seria", texts: [txt("title", "TÍTULO")] },
  { id: "editorial", name: "Editorial", kind: "seria", texts: [txt("top", "EN PORTADA"), txt("title", "El titular va aquí"), txt("subtitle", "Por: tu nombre"), txt("tag", "PÁG. 12")] },
  { id: "social", name: "Post social", kind: "seria", texts: [txt("title", "Nombre"), txt("subtitle", "@usuario"), txt("tag", "hace 2 h")] },
  { id: "ribbon", name: "Etiqueta", kind: "seria", texts: [txt("badge", "NUEVO"), txt("title", "Anuncio importante")] },
  { id: "gradborder", name: "Borde arcoíris", kind: "seria" },
  { id: "certificate", name: "Certificado", kind: "seria", texts: [txt("title", "Nombre de la persona"), txt("subtitle", "por completar el curso")] },
  { id: "breaking", name: "Noticiero", kind: "seria", texts: [txt("badge", "EN VIVO"), txt("title", "Titular de última hora"), txt("subtitle", "ampliación de la noticia"), txt("tag", "21:47")] },
  { id: "album", name: "Álbum", kind: "seria", texts: [txt("title", "Nombre de la canción"), txt("subtitle", "Artista")] },
  { id: "poster", name: "Cartel", kind: "seria", texts: [txt("title", "TÍTULO EN GRANDE"), txt("subtitle", "un reparto de lujo"), txt("badge", "PRÓXIMAMENTE")] },
  { id: "cornerbadge", name: "Insignia", kind: "seria", texts: [txt("badge", "DESTACADO")] },
  { id: "mat", name: "Museo", kind: "seria", texts: [txt("subtitle", "«Obra sin título», 2026")] },
  { id: "carousel", name: "Carrusel", kind: "seria", texts: [txt("tag", "1/5")] },
  { id: "statbar", name: "Métricas", kind: "seria", texts: [txt("title", "Resultados de la semana")] },

  /* ================= GRACIOSA · GRATIS (20) ================= */
  { id: "meme", name: "Meme clásico", kind: "graciosa", texts: [txt("top", "TEXTO DE ARRIBA"), txt("bottom", "TEXTO DE ABAJO")] },
  { id: "polaroid", name: "Polaroid", kind: "graciosa", texts: [txt("subtitle", "recuerdo de aquel día")] },
  { id: "comic", name: "Cómic", kind: "graciosa", texts: [txt("top", "¡ZAS!")] },
  { id: "retro", name: "TV retro", kind: "graciosa" },
  { id: "sticker", name: "Pegatina", kind: "graciosa" },
  { id: "tabloid", name: "Tabloide", kind: "graciosa", texts: [txt("top", "EL CHISME ESTÉTICO"), txt("badge", "EXTRA"), txt("title", "¡EXCLUSIVA!"), txt("subtitle", "ampliaremos la información")] },
  { id: "vhs", name: "VHS", kind: "graciosa", texts: [txt("title", "verano del 98"), txt("tag", "SV 0:00:42")] },
  { id: "wanted", name: "Se busca", kind: "graciosa", texts: [txt("title", "POR DEMASIADO GUAY"), txt("subtitle", "$1.000.000")] },
  { id: "neon", name: "Neón", kind: "graciosa", texts: [txt("title", "Abierto 24h")] },
  { id: "arcade", name: "Arcade", kind: "graciosa", texts: [txt("title", "VIBE·CADE")] },
  { id: "ticket", name: "Entrada", kind: "graciosa", texts: [txt("title", "Festival Estético"), txt("subtitle", "12 JUL · 20:00")] },
  { id: "chat", name: "Chat", kind: "graciosa", texts: [txt("title", "Contacto"), txt("tag", "12:45")] },
  { id: "censored", name: "Censurado", kind: "graciosa", texts: [txt("badge", "CONFIDENCIAL")] },
  { id: "confetti", name: "Confeti", kind: "graciosa" },
  { id: "gilded", name: "Dorado", kind: "graciosa", texts: [txt("badge", "PREMIUM")] },
  { id: "notebook", name: "Cuaderno", kind: "graciosa", texts: [txt("subtitle", "mis apuntes favoritos")] },
  { id: "gameover", name: "Game Over", kind: "graciosa", texts: [txt("subtitle", "PRESS START"), txt("tag", "HIGH SCORE 999999")] },
  { id: "caution", name: "Precaución", kind: "graciosa", texts: [txt("title", "OBRA MAESTRA")] },
  { id: "price", name: "Rebajas", kind: "graciosa", texts: [txt("top", "-50%"), txt("tag", "Solo hoy")] },
  { id: "postal", name: "Postal", kind: "graciosa", texts: [txt("subtitle", "¡Saludos desde aquí!"), txt("tag", "2026")] },

  /* ================= SERIA · PRO (30) ================= */
  { id: "sepia", name: "Archivo", kind: "seria", pro: true, spec: { bg: "#f7f2e7", pad: 14, border: { w: 4, style: "double", color: "#8a6f3c" }, mat: { color: "#fffdf6", w: 10 }, filter: "sepia(0.45) contrast(1.02)" } },
  { id: "ejecutivo", name: "Ejecutivo", kind: "seria", pro: true, spec: { bg: "#0f1728", pad: 12, border: { w: 2, color: "#e3b04b" } } },
  { id: "paspartu", name: "Paspartú", kind: "seria", pro: true, spec: { bg: "#ffffff", pad: 8, mat: { color: "#ffffff", w: 26 }, border: { w: 1, color: "#d9dee8" } } },
  { id: "doblefilete", name: "Doble filete", kind: "seria", pro: true, spec: { bg: "#fbfaf7", pad: 16, border: { w: 6, style: "double", color: "#232a3b" } } },
  { id: "cabecera", name: "Cabecera", kind: "seria", pro: true, spec: { pad: 0, plate: { slot: "top", key: "title", bg: "#0e1626", color: "#ffffff", ls: 2, size: 15 } }, texts: [txt("title", "Cabecera del documento")] },
  { id: "informe", name: "Informe", kind: "seria", pro: true, spec: { pad: 0, plate: { slot: "bottom", key: "title", bg: "#0e1626", color: "#e8ecf6", ls: 1, size: 14 } }, texts: [txt("title", "Título del informe")] },
  { id: "cromo", name: "Cromo", kind: "seria", pro: true, spec: { bg: "linear-gradient(135deg,#e8ebf0,#b9c0cc 45%,#eef1f5 70%,#a9b1bf)", pad: 9 } },
  { id: "grafito2", name: "Grafito", kind: "seria", pro: true, spec: { bg: "#24282f", pad: 12, border: { w: 2, color: "#3a404b" } } },
  { id: "marfil", name: "Marfil", kind: "seria", pro: true, spec: { bg: "#f6f0e3", pad: 14, border: { w: 2, color: "#d9c9a3" } } },
  { id: "lino", name: "Lino", kind: "seria", pro: true, spec: { bg: "#ecebe5", pad: 8, mat: { color: "#ffffff", w: 14 } } },
  { id: "terciopelo", name: "Terciopelo", kind: "seria", pro: true, spec: { bg: "#3a1d31", pad: 12, border: { w: 2, color: "#7a4465" } } },
  { id: "roble", name: "Roble", kind: "seria", pro: true, spec: { bg: "linear-gradient(135deg,#8a5a33,#6d4426)", pad: 14 } },
  { id: "pizarra", name: "Pizarra", kind: "seria", pro: true, spec: { bg: "#2e3b37", pad: 12, border: { w: 2, style: "dashed", color: "#cfe0d8" } } },
  { id: "academia", name: "Academia", kind: "seria", pro: true, spec: { bg: "#fbf7ec", pad: 14, border: { w: 5, style: "double", color: "#b08d2e" } } },
  { id: "ministerio", name: "Ministerio", kind: "seria", pro: true, spec: { pad: 0, filter: "sepia(0.2)", plate: { slot: "top", key: "top", bg: "#1d2433", color: "#ffffff", ls: 3, size: 13 } }, texts: [txt("top", "MINISTERIO DE ESTILO")] },
  { id: "acero", name: "Acero", kind: "seria", pro: true, spec: { bg: "linear-gradient(135deg,#cfd6df,#9aa3b0)", pad: 8 } },
  { id: "carbon2", name: "Carbón", kind: "seria", pro: true, spec: { bg: "#17191d", pad: 12, border: { w: 5, color: "#2e333b" } } },
  { id: "niebla", name: "Niebla", kind: "seria", pro: true, spec: { bg: "#ffffff", pad: 8, mat: { color: "#eef1f5", w: 16 }, filter: "grayscale(0.65) brightness(1.04)" } },
  { id: "periodico", name: "Periódico", kind: "seria", pro: true, spec: { bg: "#f3f0e9", pad: 10, border: { w: 1, color: "#17191d" }, filter: "grayscale(1) contrast(1.12)", plate: { slot: "bottom", key: "subtitle", bg: "#17191d", color: "#f3f0e9", size: 13 } }, texts: [txt("subtitle", "Sección de sociedad")] },
  { id: "sello", name: "Sello", kind: "seria", pro: true, spec: { bg: "#fdf6ef", pad: 12, border: { w: 3, style: "dotted", color: "#b3452f" } } },
  { id: "memorando", name: "Memorando", kind: "seria", pro: true, spec: { pad: 0, plate: { slot: "top", key: "top", bg: "#ffffff", color: "#17191d", font: "mono", ls: 2, size: 12 } }, texts: [txt("top", "MEMO Nº 042")] },
  { id: "registro", name: "Registro", kind: "seria", pro: true, spec: { bg: "#f8f4ea", pad: 12, border: { w: 2, style: "dashed", color: "#a08c5c" }, filter: "sepia(0.3)" } },
  { id: "lamina", name: "Lámina", kind: "seria", pro: true, spec: { bg: "#ffffff", pad: 10, mat: { color: "#ffffff", w: 22 }, border: { w: 4, style: "double", color: "#8d97ad" } } },
  { id: "cobre", name: "Cobre", kind: "seria", pro: true, spec: { bg: "linear-gradient(135deg,#d9985f,#a9622f)", pad: 10 } },
  { id: "botanico", name: "Botánico", kind: "seria", pro: true, spec: { bg: "#1e3b2f", pad: 12, border: { w: 2, color: "#4a7a5f" } } },
  { id: "vinotinto", name: "Vino", kind: "seria", pro: true, spec: { bg: "#3b1420", pad: 12, border: { w: 2, color: "#7a3550" } } },
  { id: "cielo2", name: "Cielo", kind: "seria", pro: true, spec: { bg: "#e8f1f8", pad: 12, border: { w: 2, color: "#b9d4e8" } } },
  { id: "arena", name: "Arena", kind: "seria", pro: true, spec: { bg: "#e9dfc8", pad: 12, border: { w: 2, color: "#b8a67e" } } },
  { id: "contorno", name: "Contorno", kind: "seria", pro: true, spec: { pad: 12, border: { w: 3, color: "#14161c" } } },
  { id: "cinta", name: "Cinta", kind: "seria", pro: true, spec: { pad: 0, plate: { slot: "bottom", key: "title", bg: "linear-gradient(90deg,#f6bc55,#e05a5a)", color: "#14161c", ls: 3, size: 14 } }, texts: [txt("title", "TÍTULO")] },

  /* ================= GRACIOSA · PRO (30) ================= */
  { id: "neonrosa", name: "Neón rosa", kind: "graciosa", pro: true, spec: { bg: "#12080f", pad: 12, border: { w: 3, color: "#ff4fd8" }, radius: 18 } },
  { id: "neonverde", name: "Neón verde", kind: "graciosa", pro: true, spec: { bg: "#06110c", pad: 12, border: { w: 3, color: "#3dff8f" }, radius: 18 } },
  { id: "neonazul", name: "Neón azul", kind: "graciosa", pro: true, spec: { bg: "#070b14", pad: 12, border: { w: 3, color: "#38bdf8" }, radius: 18 } },
  { id: "caramelo", name: "Caramelo", kind: "graciosa", pro: true, spec: { bg: "linear-gradient(135deg,#ff9a9e,#fad0c4)", pad: 14, radius: 22 } },
  { id: "chicle", name: "Chicle", kind: "graciosa", pro: true, spec: { bg: "linear-gradient(135deg,#f78fb3,#f8a5c2)", pad: 14, border: { w: 4, color: "#ffffff" }, radius: 24 } },
  { id: "banana", name: "Banana", kind: "graciosa", pro: true, spec: { bg: "linear-gradient(135deg,#ffe259,#ffa751)", pad: 14 } },
  { id: "uva", name: "Uva", kind: "graciosa", pro: true, spec: { bg: "linear-gradient(135deg,#8e2de2,#4a00e0)", pad: 14 } },
  { id: "sorbete", name: "Sorbete", kind: "graciosa", pro: true, spec: { bg: "linear-gradient(135deg,#a8edea,#fed6e3)", pad: 14 } },
  { id: "mentita", name: "Menta", kind: "graciosa", pro: true, spec: { bg: "#dff5ec", pad: 14, border: { w: 3, color: "#7fd8be" } } },
  { id: "lava", name: "Lava", kind: "graciosa", pro: true, spec: { bg: "linear-gradient(135deg,#f83600,#f9d423)", pad: 12 } },
  { id: "hielo", name: "Hielo", kind: "graciosa", pro: true, spec: { bg: "linear-gradient(135deg,#e0eafc,#cfdef3)", pad: 14 } },
  { id: "bosque2", name: "Bosque", kind: "graciosa", pro: true, spec: { bg: "#14301f", pad: 12, border: { w: 2, color: "#3f7a52" } } },
  { id: "atardecer2", name: "Atardecer", kind: "graciosa", pro: true, spec: { bg: "linear-gradient(180deg,#ff9966,#ff5e62)", pad: 12 } },
  { id: "popdots", name: "Pop dots", kind: "graciosa", pro: true, spec: { bg: "radial-gradient(#14161c 1.2px, transparent 1.3px) 0 0 / 9px 9px, #ff7bac", pad: 14, border: { w: 3, color: "#14161c" } } },
  { id: "vhsazul", name: "VHS azul", kind: "graciosa", pro: true, spec: { bg: "#0d1b2a", pad: 12, border: { w: 2, color: "#41a0ff" }, filter: "saturate(1.25) contrast(1.05)" } },
  { id: "vintage", name: "Vintage", kind: "graciosa", pro: true, spec: { bg: "#efe3c8", pad: 14, border: { w: 4, style: "double", color: "#8a6f3c" }, filter: "sepia(0.7) contrast(0.95)" } },
  { id: "noir", name: "Noir", kind: "graciosa", pro: true, spec: { bg: "#0c0d10", pad: 8, mat: { color: "#0c0d10", w: 10 }, filter: "grayscale(1) contrast(1.25)" } },
  { id: "kitsch", name: "Kitsch 80s", kind: "graciosa", pro: true, spec: { bg: "linear-gradient(135deg,#fc466b,#3f5efb)", pad: 14 } },
  { id: "y2k", name: "Y2K", kind: "graciosa", pro: true, spec: { bg: "linear-gradient(135deg,#f6d5f7,#fbe9d7)", pad: 12, border: { w: 2, color: "#c084fc" } } },
  { id: "globo", name: "Globo", kind: "graciosa", pro: true, spec: { bg: "linear-gradient(135deg,#89f7fe,#66a6ff)", pad: 14 } },
  { id: "confetipro", name: "Confeti PRO", kind: "graciosa", pro: true, spec: { bg: "radial-gradient(#f6bc55 1.5px, transparent 2px) 0 0 / 10px 9px, radial-gradient(#2dd4bf 1.5px, transparent 2px) 5px 5px / 12px 11px, #ffffff", pad: 16, border: { w: 3, color: "#14161c" } } },
  { id: "rayas", name: "Rayas", kind: "graciosa", pro: true, spec: { bg: "repeating-linear-gradient(45deg,#ffd3e0 0 10px,#ffffff 10px 20px)", pad: 16 } },
  { id: "gelatina", name: "Gelatina", kind: "graciosa", pro: true, spec: { bg: "linear-gradient(135deg,#43e97b,#38f9d7)", pad: 14, radius: 26 } },
  { id: "soda", name: "Soda", kind: "graciosa", pro: true, spec: { bg: "linear-gradient(135deg,#fa709a,#fee140)", pad: 13 } },
  { id: "mostaza", name: "Mostaza", kind: "graciosa", pro: true, spec: { bg: "#e8b723", pad: 12, border: { w: 3, color: "#14161c" } } },
  { id: "salmon", name: "Salmón", kind: "graciosa", pro: true, spec: { bg: "#ffdab9", pad: 13, border: { w: 2, color: "#e07a5f" } } },
  { id: "pistacho", name: "Pistacho", kind: "graciosa", pro: true, spec: { bg: "#d9e8c9", pad: 13, border: { w: 2, color: "#8aa86e" } } },
  { id: "medianoche", name: "Medianoche", kind: "graciosa", pro: true, spec: { bg: "#101828", pad: 12, border: { w: 2, color: "#3d5a80" }, plate: { slot: "bottom", key: "subtitle", bg: "#3d5a80", color: "#e0fbfc", size: 13 } }, texts: [txt("subtitle", "una noche más")] },
  { id: "tebeo", name: "Tebeo", kind: "graciosa", pro: true, spec: { bg: "#fff3b0", pad: 12, border: { w: 4, color: "#14161c" }, radius: 6 } },
  { id: "vaporwave", name: "Vaporwave", kind: "graciosa", pro: true, spec: { bg: "linear-gradient(180deg,#1a0533,#5b2a86 55%,#ff6ec7)", pad: 12, filter: "saturate(1.3)" } },

  /* ================= EXCLUSIVOS · PRO (10) ================= */
  { id: "portada", name: "Portada", kind: "exclusiva", pro: true, texts: [txt("top", "Nº 42 · OTOÑO"), txt("title", "El gran titular"), txt("subtitle", "y el subtítulo de la historia"), txt("tag", "9,99 €")] },
  { id: "cine", name: "Cine 35mm", kind: "exclusiva", pro: true, texts: [txt("subtitle", "ESC. 12 · TOMA 3")] },
  { id: "holograma", name: "Holograma", kind: "exclusiva", pro: true, texts: [txt("badge", "HOLO·EDITION")] },
  { id: "marmol", name: "Mármol", kind: "exclusiva", pro: true, texts: [txt("subtitle", "pieza única")] },
  { id: "escenario", name: "Escenario", kind: "exclusiva", pro: true, texts: [txt("title", "en directo")] },
  { id: "oro", name: "Oro cepillado", kind: "exclusiva", pro: true, texts: [txt("badge", "GOLD EDITION")] },
  { id: "club", name: "Club neón", kind: "exclusiva", pro: true },
  { id: "synthwave", name: "Synthwave", kind: "exclusiva", pro: true, texts: [txt("title", "NEON DRIVE")] },
  { id: "galeria", name: "Galería", kind: "exclusiva", pro: true, texts: [txt("title", "Obra destacada"), txt("subtitle", "colección privada, 2026")] },
  { id: "cristal", name: "Cristal", kind: "exclusiva", pro: true, texts: [txt("subtitle", "edición limitada")] },
];

export function frameById(id: FrameId): FrameMeta | undefined {
  return FRAME_META.find((f) => f.id === id);
}
