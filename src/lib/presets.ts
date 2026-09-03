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
/*  marcos · 110 en total                                              */
/* ------------------------------------------------------------------ */

export interface FrameMeta {
  id: FrameId;
  name: string;
  kind: "seria" | "graciosa" | "exclusiva";
  pro?: boolean;
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

  /* ================= SERIA · PRO (30) — temáticos y virales ================= */
  { id: "pitch", name: "Pitch Deck", kind: "seria", pro: true, texts: [txt("title", "Título de la diapositiva"), txt("tag", "01 / 12")] },
  { id: "hud", name: "HUD", kind: "seria", pro: true, texts: [txt("tag", "X:0042 · Y:0113")] },
  { id: "brutalist", name: "Brutalist", kind: "seria", pro: true, texts: [txt("title", "SIN TÍTULO"), txt("badge", "EST. 2026")] },
  { id: "notion", name: "Documento", kind: "seria", pro: true, texts: [txt("title", "Mi documento"), txt("tag", "editado hace 2 min")] },
  { id: "filmstrip", name: "Negativo", kind: "seria", pro: true, texts: [txt("tag", "400TX ▸ 24A")] },
  { id: "blueprint", name: "Plano", kind: "seria", pro: true, texts: [txt("title", "Proyecto Aurora"), txt("tag", "ESC 1:100")] },
  { id: "terminal", name: "Terminal", kind: "seria", pro: true, texts: [txt("title", "shotvibe render --4k")] },
  { id: "player", name: "Reproductor", kind: "seria", pro: true, texts: [txt("title", "Mi captura (Remix)"), txt("subtitle", "ShotVibe Records")] },
  { id: "foco", name: "Foco", kind: "seria", pro: true, texts: [txt("title", "Obra en exposición"), txt("subtitle", "sala 3 · pared norte")] },
  { id: "scrapbook", name: "Scrapbook", kind: "seria", pro: true, texts: [txt("subtitle", "recuerdos pegados con cariño")] },
  { id: "yearbook", name: "Anuario", kind: "seria", pro: true, texts: [txt("title", "Promoción Estelar"), txt("tag", "clase de 2026")] },
  { id: "vinyl", name: "Vinilo", kind: "seria", pro: true, texts: [txt("title", "Lado B"), txt("subtitle", "33⅓ RPM")] },
  { id: "invitation", name: "Invitación", kind: "seria", pro: true, texts: [txt("title", "Estás invitado"), txt("subtitle", "gala de estilo · 21:00")] },
  { id: "herbario", name: "Herbario", kind: "seria", pro: true, texts: [txt("title", "Specimen capturus"), txt("tag", "Nº 042")] },
  { id: "academia", name: "Dark Academia", kind: "seria", pro: true, texts: [txt("title", "Biblioteca Central"), txt("subtitle", "sección restringida")] },
  { id: "chrome", name: "Cromo 2000", kind: "seria", pro: true, texts: [txt("badge", "CHROME EDITION")] },
  { id: "holocard", name: "Tarjeta Holo", kind: "seria", pro: true, texts: [txt("badge", "EDICIÓN LIMITADA"), txt("tag", "042/500")] },
  { id: "neonwall", name: "Muro Neón", kind: "seria", pro: true, texts: [txt("title", "abierto toda la noche")] },
  { id: "crt", name: "Monitor CRT", kind: "seria", pro: true, texts: [txt("tag", "VIBETRON 2100")] },
  { id: "clipping", name: "Recorte", kind: "seria", pro: true, texts: [txt("top", "EL DIARIO"), txt("title", "LA CAPTURA DEL AÑO")] },
  { id: "cork", name: "Corcho", kind: "seria", pro: true, texts: [txt("subtitle", "no olvidar: esto es arte")] },
  { id: "moodboard", name: "Moodboard", kind: "seria", pro: true, texts: [txt("title", "paleta · invierno 26")] },
  { id: "expediente", name: "Expediente", kind: "seria", pro: true, texts: [txt("title", "Caso: estilo perdido"), txt("badge", "APROBADO")] },
  { id: "slide35", name: "Diapositiva", kind: "seria", pro: true, texts: [txt("tag", "Nº 07")] },
  { id: "luxdark", name: "Noir", kind: "seria", pro: true, texts: [txt("subtitle", "una pieza en la oscuridad")] },
  { id: "polarstack", name: "Polaroids", kind: "seria", pro: true, texts: [txt("subtitle", "aquella tarde")] },
  { id: "passport", name: "Pasaporte", kind: "seria", pro: true, texts: [txt("title", "ESTELAR"), txt("tag", "SVB")] },
  { id: "magad", name: "Anuncio", kind: "seria", pro: true, texts: [txt("title", "El marco que tu captura merece"), txt("tag", "pág. 42")] },
  { id: "camera", name: "Visor", kind: "seria", pro: true, texts: [txt("tag", "ISO 400 · f/1.8 · 1/250")] },
  { id: "onyx", name: "Ónix", kind: "seria", pro: true, texts: [txt("title", "COLECCIÓN ORO"), txt("badge", "SÉRIE 042")] },

  /* ================= GRACIOSA · PRO (30) — cultura meme ================= */
  { id: "win95", name: "Windows 95", kind: "graciosa", pro: true, texts: [txt("title", "shotvibe.exe"), txt("tag", "100%")] },
  { id: "popup", name: "Pop-up", kind: "graciosa", pro: true, texts: [txt("title", "¡HAS GANADO!"), txt("badge", "1.000.000 de likes")] },
  { id: "achievement", name: "Logro", kind: "graciosa", pro: true, texts: [txt("title", "Captura legendaria"), txt("tag", "+20G")] },
  { id: "rpg", name: "Diálogo RPG", kind: "graciosa", pro: true, texts: [txt("title", "HÉROE"), txt("subtitle", "¡Tu captura subió al nivel 99!")] },
  { id: "trading", name: "Carta", kind: "graciosa", pro: true, texts: [txt("title", "CAPTURACHO"), txt("tag", "HP 999"), txt("subtitle", "Destello Estelar")] },
  { id: "manga", name: "Manga", kind: "graciosa", pro: true, texts: [txt("top", "¡DON!"), txt("tag", "CONTINUARÁ…")] },
  { id: "deepfried", name: "Frito", kind: "graciosa", pro: true, texts: [txt("badge", "calidad 144p")] },
  { id: "camcorder", name: "Cámara 2004", kind: "graciosa", pro: true, texts: [txt("tag", "01.01.04 · 00:14")] },
  { id: "dvd", name: "DVD", kind: "graciosa", pro: true, texts: [txt("title", "DVD"), txt("tag", "ESQUINA: 0")] },
  { id: "loading", name: "Cargando", kind: "graciosa", pro: true, texts: [txt("title", "instalando estilo…")] },
  { id: "error", name: "Pantalla azul", kind: "graciosa", pro: true, texts: [txt("title", "tu captura fue demasiado estética"), txt("tag", "CÓDIGO: GUAY_EXCESS")] },
  { id: "stickerbomb", name: "Sticker Bomb", kind: "graciosa", pro: true },
  { id: "memphis", name: "Memphis 84", kind: "graciosa", pro: true },
  { id: "disco", name: "Disco", kind: "graciosa", pro: true, texts: [txt("title", "fiebre del sábado")] },
  { id: "candy", name: "Caramelo", kind: "graciosa", pro: true, texts: [txt("badge", "¡DULCE!")] },
  { id: "kawaii", name: "Kawaii", kind: "graciosa", pro: true, texts: [txt("subtitle", "muy uwu")] },
  { id: "gamer", name: "RGB Gamer", kind: "graciosa", pro: true, texts: [txt("tag", "240 FPS")] },
  { id: "graffiti", name: "Grafiti", kind: "graciosa", pro: true, texts: [txt("title", "VIBE KING")] },
  { id: "slot", name: "Tragamonedas", kind: "graciosa", pro: true, texts: [txt("title", "JACKPOT"), txt("tag", "créditos: ∞")] },
  { id: "fortune", name: "Galleta", kind: "graciosa", pro: true, texts: [txt("subtitle", "hoy tu captura brillará")] },
  { id: "vineta", name: "Viñeta", kind: "graciosa", pro: true, texts: [txt("top", "¡ZAS!"), txt("tag", "CONTINUARÁ…")] },
  { id: "garra", name: "Garra", kind: "graciosa", pro: true, texts: [txt("badge", "¡PREMIO!")] },
  { id: "marcianitos", name: "Marcianitos", kind: "graciosa", pro: true, texts: [txt("tag", "HI 999999")] },
  { id: "pixel", name: "Pixel", kind: "graciosa", pro: true, texts: [txt("tag", "PRESS START")] },
  { id: "conspiracion", name: "Conspiración", kind: "graciosa", pro: true, texts: [txt("top", "¿CASUALIDAD?"), txt("badge", "NO CONFÍES")] },
  { id: "glitch", name: "Glitch", kind: "graciosa", pro: true, texts: [txt("badge", "SISTEMA_CORRUPTO")] },
  { id: "burbuja", name: "Burbuja", kind: "graciosa", pro: true, texts: [txt("top", "¡¿QUÉ?!")] },
  { id: "lavalamp", name: "Lava", kind: "graciosa", pro: true, texts: [txt("tag", "groovy")] },
  { id: "rockola", name: "Rockola", kind: "graciosa", pro: true, texts: [txt("title", "noches de rockola")] },
  { id: "fiesta", name: "Fiesta", kind: "graciosa", pro: true, texts: [txt("title", "¡A CELEBRAR!")] },

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
