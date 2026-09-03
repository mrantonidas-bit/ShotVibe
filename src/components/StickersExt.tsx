import type { ReactNode } from "react";
import type { StickerType } from "../lib/types";

/* ==================================================================
   Stickers ampliados.
   Todo lo orgánico (caras, manos y cuerpo) y los objetos se renderizan
   con los emojis nativos del sistema: están ilustrados por Apple /
   Google / Microsoft, así que las manos PARECEN manos de verdad.
   Se pintan en un <canvas> —que sí tiene acceso a las fuentes de emoji
   del sistema— y se cachean como PNG, de modo que se ven nítidos tanto
   en el editor como en la exportación 4K (son <img> con data-URL).
   Los memes y las formas sin emoji (pajarita, bigote) mantienen el
   estilo vectorial plano dibujado a mano en SVG.
   ================================================================== */

const EMOJI_FONT = '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji","Twemoji Mozilla",sans-serif';
const emojiCache = new Map<string, string>();

function emojiSrc(emoji: string): string {
  const cached = emojiCache.get(emoji);
  if (cached !== undefined) return cached;
  let src = "";
  const size = 512; // sobrado para el sticker más grande escalado y para 4K
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.font = `${Math.round(size * 0.8)}px ${EMOJI_FONT}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(emoji, size / 2, size / 2 + size * 0.045);
    src = canvas.toDataURL("image/png");
  }
  emojiCache.set(emoji, src);
  return src;
}

function EmojiImg({ emoji }: { emoji: string }): ReactNode {
  const src = emojiSrc(emoji);
  if (!src) return null;
  return <img src={src} alt="" draggable={false} className="h-full w-full select-none" />;
}

const EMOJI: Partial<Record<StickerType, string>> = {
  /* ---------- caras ---------- */
  grin: "😄", joy: "😂", wink: "😉", coolface: "😎", loveeyes: "😍", angry: "😠",
  sad: "☹️", cry: "😭", surprised: "😱", sleepy: "😴", dizzy: "😵", silly: "🤪",
  smirk: "😏", thinking: "🤔", dead: "💀", stareyes: "🤩", devil: "😈", angel: "😇",
  clown: "🤡", robot: "🤖", blush: "😊", zipper: "🤐", partyface: "🥳", melting: "🫠",
  /* ---------- manos ---------- */
  thumbsup: "👍", thumbsdown: "👎", peace: "✌️", oksign: "👌", fist: "✊",
  pointing: "☝️", waving: "👋", rockon: "🤘", crossed: "🤞", stophand: "✋",
  muscle: "💪", handheart: "🫰", callme: "🤙", clap: "👏",
  /* ---------- cuerpo ---------- */
  eyepair: "👀", ear: "👂", nose: "👃", lips: "👄", brain: "🧠", tooth: "🦷",
  tongue: "👅", bone: "🦴", footprint: "🦶", heartorgan: "🫀", palm: "🤚",
  /* ---------- objetos ---------- */
  glasses: "🕶️", tophat: "🎩", cap: "🧢", lipstick: "💄", ring: "💍", key: "🔑",
  balloon: "🎈", gift: "🎁", bulb: "💡", magnet: "🧲", dice: "🎲", watch: "⌚",
  bell: "🔔", candle: "🕯️", anchor: "⚓", umbrella: "☂️", moneybag: "💰",
  dollar: "💸", lollipop: "🍭",
};

export function GlyphExt({ type }: { type: StickerType }): ReactNode {
  const emoji = EMOJI[type];
  if (emoji) return <EmojiImg emoji={emoji} />;

  /* ---------- los que no existen como emoji: SVG plano ---------- */
  switch (type) {
    case "mustache":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M50 46c-6-10-20-12-28-4-6-8-18-6-20 4 8 14 30 16 48-2 18 18 40 16 48 2-2-10-14-12-20-4-8-8-22-6-28 4z" fill="#57431f" stroke="#2e2210" strokeWidth="3.5" strokeLinejoin="round" transform="translate(0 4) scale(0.92)" />
        </svg>
      );
    case "bowtie":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M12 32l30 18-30 18z" fill="#e05a5a" stroke="#7f1d1d" strokeWidth="4" strokeLinejoin="round" />
          <path d="M88 32 58 50l30 18z" fill="#e05a5a" stroke="#7f1d1d" strokeWidth="4" strokeLinejoin="round" />
          <rect x="42" y="40" width="16" height="20" rx="4" fill="#c23a3a" stroke="#7f1d1d" strokeWidth="4" />
        </svg>
      );

    /* ---------- memes ---------- */
    case "doge":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M24 26 16 8l20 8zM76 26 84 8 64 16z" fill="#e8b878" stroke="#a97b3f" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="50" cy="52" r="36" fill="#e8b878" stroke="#a97b3f" strokeWidth="4" />
          <ellipse cx="50" cy="64" rx="16" ry="12" fill="#f5dcc0" />
          <circle cx="38" cy="44" r="4.5" fill="#2e2210" />
          <circle cx="62" cy="44" r="4.5" fill="#2e2210" />
          <ellipse cx="50" cy="58" rx="5" ry="4" fill="#2e2210" />
          <path d="M50 62c0 5-3 8-3 8M50 62c0 5 3 8 3 8" stroke="#2e2210" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      );
    case "trollface":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <circle cx="50" cy="50" r="42" fill="#e8e8e8" stroke="#333" strokeWidth="4" />
          <path d="M26 40c4-6 14-6 18 0M56 40c4-6 14-6 18 0" fill="none" stroke="#333" strokeWidth="4" strokeLinecap="round" />
          <path d="M22 56c10 18 46 18 56 0-6 4-14 2-18 6-6-6-12-2-16 2-6-6-14-6-22-8z" fill="#fff" stroke="#333" strokeWidth="3.5" strokeLinejoin="round" />
        </svg>
      );
    case "pepe":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M20 40c0-14 14-22 30-22s30 8 30 22c0 8-4 12-8 16 4 4 6 8 6 12 0 10-12 16-28 16S22 78 22 68c0-4 2-8 6-12-4-4-8-8-8-16z" fill="#7cb342" stroke="#33691e" strokeWidth="4" strokeLinejoin="round" />
          <circle cx="36" cy="40" r="9" fill="#fff" stroke="#33691e" strokeWidth="3" />
          <circle cx="64" cy="40" r="9" fill="#fff" stroke="#33691e" strokeWidth="3" />
          <circle cx="37" cy="41" r="3.5" fill="#212121" />
          <circle cx="63" cy="41" r="3.5" fill="#212121" />
          <path d="M32 64c8 8 28 8 36 0" fill="none" stroke="#33691e" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case "thisisfine":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M14 88c2-14 8-20 8-30 6 6 8 12 8 20 4-10 10-14 12-24 6 8 8 16 6 26 6-6 10-8 12-16 4 8 4 16 2 24z" fill="#f97316" stroke="#7c2d12" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="56" cy="42" r="24" fill="#e8b878" stroke="#a97b3f" strokeWidth="4" />
          <path d="M40 26l-6-12 16 6zM72 26l6-12-16 6z" fill="#e8b878" stroke="#a97b3f" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="48" cy="38" r="3.5" fill="#2e2210" />
          <circle cx="64" cy="38" r="3.5" fill="#2e2210" />
          <path d="M48 52h14" stroke="#2e2210" strokeWidth="3.5" strokeLinecap="round" />
          <rect x="30" y="52" width="12" height="9" rx="2" fill="#fff" stroke="#94a3b8" strokeWidth="2.5" />
        </svg>
      );
    case "stonks":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M12 78 36 54l14 12 26-30" fill="none" stroke="#22c55e" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M62 32h16v16" fill="none" stroke="#22c55e" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="30" cy="26" r="10" fill="#e8b878" stroke="#a97b3f" strokeWidth="3.5" />
          <path d="M16 48c0-8 6-12 14-12s14 4 14 12v6H16z" fill="#334155" />
        </svg>
      );
    case "nyan":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <rect x="4" y="38" width="40" height="6" fill="#e05a5a" />
          <rect x="4" y="44" width="40" height="6" fill="#f6bc55" />
          <rect x="4" y="50" width="40" height="6" fill="#fde047" />
          <rect x="4" y="56" width="40" height="6" fill="#4ade80" />
          <rect x="4" y="62" width="40" height="6" fill="#38bdf8" />
          <rect x="40" y="34" width="34" height="26" rx="4" fill="#f9a8d4" stroke="#8f1d5c" strokeWidth="3.5" />
          <circle cx="62" cy="44" r="14" fill="#94a3b8" stroke="#475569" strokeWidth="3.5" />
          <path d="M52 34l-2-8 8 5zM72 34l2-8-8 5z" fill="#94a3b8" stroke="#475569" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="57" cy="42" r="2.5" fill="#212121" />
          <circle cx="67" cy="42" r="2.5" fill="#212121" />
          <path d="M60 48h4" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "amongus":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M30 44c0-18 9-30 22-30s22 12 22 30v30a8 8 0 0 1-8 8h-6v-12h-16v12h-6a8 8 0 0 1-8-8z" fill="#e05a5a" stroke="#7f1d1d" strokeWidth="4" strokeLinejoin="round" />
          <path d="M34 34c4-8 10-12 16-12 2 6 2 12 0 18-8 0-14-2-16-6z" fill="#bae6fd" stroke="#0e7490" strokeWidth="3" strokeLinejoin="round" />
          <rect x="22" y="46" width="8" height="20" rx="4" fill="#c23a3a" stroke="#7f1d1d" strokeWidth="3" />
        </svg>
      );
    case "gigachad":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M30 20c0-6 8-10 20-10s20 4 20 10v26c0 6-2 10-6 14l4 16c-10 6-26 6-36 0l4-16c-4-4-6-8-6-14z" fill="#e8e8e8" stroke="#333" strokeWidth="4" strokeLinejoin="round" />
          <path d="M34 34h10M56 34h10" stroke="#333" strokeWidth="4" strokeLinecap="round" />
          <circle cx="39" cy="40" r="2.5" fill="#333" />
          <circle cx="61" cy="40" r="2.5" fill="#333" />
          <path d="M42 56c4 3 12 3 16 0" fill="none" stroke="#333" strokeWidth="4" strokeLinecap="round" />
          <path d="M30 20c4 6 12 8 20 8s16-2 20-8" fill="none" stroke="#333" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case "lefishe":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <ellipse cx="50" cy="50" rx="34" ry="40" fill="#e8e8e8" stroke="#333" strokeWidth="4" />
          <circle cx="50" cy="42" r="22" fill="#fff" stroke="#333" strokeWidth="3.5" />
          <circle cx="50" cy="42" r="6" fill="#212121" />
          <ellipse cx="50" cy="72" rx="10" ry="7" fill="#fff" stroke="#333" strokeWidth="3.5" />
        </svg>
      );
    case "wojak":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M28 44c0-18 10-30 22-30s22 12 22 30c0 10-2 18-6 26-2 6-6 10-16 10s-14-4-16-10c-4-8-6-16-6-26z" fill="#e8e8e8" stroke="#333" strokeWidth="4" strokeLinejoin="round" />
          <path d="M34 40c3-3 8-3 10 0M56 40c3-3 8-3 10 0" fill="none" stroke="#333" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="39" cy="46" r="2.5" fill="#333" />
          <circle cx="61" cy="46" r="2.5" fill="#333" />
          <path d="M40 62c4-4 16-4 20 0" fill="none" stroke="#333" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M46 66h8" stroke="#333" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/*  grupos ampliados                                                    */
/* ------------------------------------------------------------------ */

const T = (type: StickerType, label: string) => ({ type, label });

export const EXT_GROUPS = [
  {
    name: "Caras",
    items: [
      T("grin", "Sonrisa"), T("joy", "Risa"), T("wink", "Guiño"), T("coolface", "Gafas"), T("loveeyes", "Enamorado"),
      T("angry", "Enfado"), T("sad", "Triste"), T("cry", "Llorando"), T("surprised", "Sorpresa"), T("sleepy", "Sueño"),
      T("dizzy", "Mareado"), T("silly", "Lengua"), T("smirk", "Pícaro"), T("thinking", "Pensando"), T("dead", "KO"),
      T("stareyes", "Estrellas"), T("devil", "Diablillo"), T("angel", "Angelito"), T("clown", "Payaso"), T("robot", "Robot"),
      T("blush", "Sonrojado"), T("zipper", "Cremallera"), T("partyface", "Fiesta"), T("melting", "Derritiéndose"),
    ],
  },
  {
    name: "Manos",
    items: [
      T("thumbsup", "Pulgar arriba"), T("thumbsdown", "Pulgar abajo"), T("peace", "Victoria"), T("oksign", "OK"),
      T("fist", "Puño"), T("pointing", "Señalar"), T("waving", "Saludo"), T("rockon", "Rock"), T("crossed", "Cruzados"),
      T("stophand", "Alto"), T("muscle", "Músculo"), T("handheart", "Corazón"), T("callme", "Llámame"), T("clap", "Aplauso"),
    ],
  },
  {
    name: "Cuerpo",
    items: [
      T("eyepair", "Ojos"), T("ear", "Oreja"), T("nose", "Nariz"), T("lips", "Labios"), T("brain", "Cerebro"),
      T("tooth", "Diente"), T("tongue", "Lengua"), T("bone", "Hueso"), T("footprint", "Huella"), T("mustache", "Bigote"),
      T("heartorgan", "Corazón"), T("palm", "Palma"),
    ],
  },
  {
    name: "Objetos",
    items: [
      T("glasses", "Gafas"), T("tophat", "Chistera"), T("cap", "Gorra"), T("bowtie", "Pajarita"), T("lipstick", "Lápiz labial"),
      T("ring", "Anillo"), T("key", "Llave"), T("balloon", "Globo"), T("gift", "Regalo"), T("bulb", "Bombilla"),
      T("magnet", "Imán"), T("dice", "Dado"), T("watch", "Reloj"), T("bell", "Campana"), T("candle", "Vela"),
      T("anchor", "Ancla"), T("umbrella", "Paraguas"), T("moneybag", "Dinero"), T("dollar", "Billete"), T("lollipop", "Piruleta"),
    ],
  },
];

export const EXT_MEMES = [
  T("doge", "Doge"), T("trollface", "Troll"), T("pepe", "Pepe"), T("thisisfine", "This is fine"), T("stonks", "Stonks"),
  T("nyan", "Nyan"), T("amongus", "Impostor"), T("gigachad", "Gigachad"), T("lefishe", "Fishe"), T("wojak", "Wojak"),
];
