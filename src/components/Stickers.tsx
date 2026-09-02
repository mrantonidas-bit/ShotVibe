import { useRef } from "react";
import { cn } from "../lib/presets";
import type { StickerItem, StickerType } from "../lib/types";

/* Cada sticker es SVG dibujado a mano: nítido en la exportación 4K. */

function burst(spikes: number, outer: number, inner: number): string {
  const pts: string[] = [];
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (i * Math.PI) / spikes - Math.PI / 2;
    pts.push(`${(50 + r * Math.cos(a)).toFixed(1)},${(50 + r * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(" ");
}
const STAR = burst(12, 47, 33);
const IMPACT = "Impact, 'Arial Black', sans-serif";
const outline = { stroke: "#151a26", strokeWidth: 4, strokeLinejoin: "round" as const };

function Glyph({ type }: { type: StickerType }) {
  switch (type) {
    case "star":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M50 6l12.4 26.2L90 36.4 70 56.6l4.7 28.6L50 71.6 25.3 85.2 30 56.6 10 36.4l27.6-4.2z" fill="#f6bc55" {...outline} /><circle cx="38" cy="34" r="6" fill="#ffe3a6" /></svg>;
    case "heart":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M50 88S10 62 10 35.5C10 21 21 12 33 12c8 0 14 4 17 10 3-6 9-10 17-10 12 0 23 9 23 23.5C90 62 50 88 50 88z" fill="#f472b6" stroke="#8f1d5c" strokeWidth={4} strokeLinejoin="round" /><circle cx="32" cy="30" r="6" fill="#fbc7e4" /></svg>;
    case "spark":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M50 4l9 30 30 9-30 9-9 30-9-30-30-9 30-9z" fill="#43d9be" stroke="#0b6e60" strokeWidth={4} strokeLinejoin="round" /><path d="M82 70l4 12 12 4-12 4-4 12-4-12-12-4 12-4z" fill="#f6bc55" stroke="#7c5310" strokeWidth={3} strokeLinejoin="round" /></svg>;
    case "arrow":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M14 78C20 50 40 34 66 32" fill="none" stroke="#151a26" strokeWidth={15} strokeLinecap="round" /><path d="M14 78C20 50 40 34 66 32" fill="none" stroke="#f6bc55" strokeWidth={8} strokeLinecap="round" /><path d="M60 12l28 18-30 14z" fill="#f6bc55" stroke="#151a26" strokeWidth={5} strokeLinejoin="round" /></svg>;
    case "flame":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M52 6c4 16 26 26 26 52a28 28 0 0 1-56 0c0-14 8-22 14-30 4 6 8 8 8 8s-4-16 8-30z" fill="#f97316" stroke="#7c2d12" strokeWidth={4} strokeLinejoin="round" /><path d="M52 46c8 8 12 14 12 22a12 12 0 0 1-24 0c0-10 8-14 12-22z" fill="#fde047" /></svg>;
    case "crown":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M12 34l18 16L50 18l20 32 18-16-6 46H18z" fill="#f6bc55" stroke="#7c5310" strokeWidth={4} strokeLinejoin="round" /><circle cx="32" cy="62" r="4.5" fill="#e05a5a" /><circle cx="50" cy="62" r="4.5" fill="#43d9be" /><circle cx="68" cy="62" r="4.5" fill="#8b5cf6" /></svg>;
    case "bolt":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M56 4L20 56h22L38 96l42-58H56z" fill="#fde047" stroke="#7c5310" strokeWidth={4} strokeLinejoin="round" /></svg>;
    case "smiley":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="50" r="42" fill="#fde047" stroke="#7c5310" strokeWidth={4} /><circle cx="36" cy="42" r="5.5" fill="#3b2c07" /><circle cx="64" cy="42" r="5.5" fill="#3b2c07" /><path d="M30 58a22 22 0 0 0 40 0" fill="none" stroke="#3b2c07" strokeWidth={5.5} strokeLinecap="round" /></svg>;
    case "wow":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><polygon points={burst(12, 48, 34)} fill="#e05a5a" stroke="#5f1616" strokeWidth={4} strokeLinejoin="round" /><text x="50" y="58" textAnchor="middle" fontFamily={IMPACT} fontSize="24" fill="#ffffff">¡WOW!</text></svg>;
    case "like":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="50" r="42" fill="#43d9be" stroke="#0b6e60" strokeWidth={4} /><path d="M32 46h10V72H32a4 4 0 0 1-4-4V50a4 4 0 0 1 4-4zm10 0 10-18a6 6 0 0 1 6 6v8h14a5 5 0 0 1 5 6l-4 20a6 6 0 0 1-6 4H42z" fill="#ffffff" stroke="#0b6e60" strokeWidth={3} strokeLinejoin="round" /></svg>;
    case "moon":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M72 12A40 40 0 1 0 88 62 34 34 0 0 1 72 12z" fill="#c7d2fe" stroke="#3b4a8f" strokeWidth={4} strokeLinejoin="round" /><circle cx="40" cy="40" r="5" fill="#a5b4fc" /><circle cx="52" cy="62" r="4" fill="#a5b4fc" /></svg>;
    case "sun":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="50" r="20" fill="#fde047" stroke="#7c5310" strokeWidth={4} /><g stroke="#f59e0b" strokeWidth={5} strokeLinecap="round"><path d="M50 8v12M50 80v12M8 50h12M80 50h12M20 20l9 9M71 71l9 9M80 20l-9 9M29 71l-9 9" /></g></svg>;
    case "cloud":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M30 74a16 16 0 0 1-2-32 22 22 0 0 1 42-6 18 18 0 0 1 4 38z" fill="#e0f2fe" stroke="#5b7fa6" strokeWidth={4} strokeLinejoin="round" /></svg>;
    case "rainbow":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M12 78a38 38 0 0 1 76 0" fill="none" stroke="#e05a5a" strokeWidth={9} /><path d="M22 78a28 28 0 0 1 56 0" fill="none" stroke="#f6bc55" strokeWidth={9} /><path d="M32 78a18 18 0 0 1 36 0" fill="none" stroke="#43d9be" strokeWidth={9} /><circle cx="14" cy="82" r="8" fill="#fff" stroke="#94a3b8" strokeWidth={3} /><circle cx="86" cy="82" r="8" fill="#fff" stroke="#94a3b8" strokeWidth={3} /></svg>;
    case "rocket":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M50 6c14 10 20 26 20 44l-10 14H40L30 50C30 32 36 16 50 6z" fill="#e2e8f0" {...outline} /><circle cx="50" cy="36" r="8" fill="#38bdf8" stroke="#151a26" strokeWidth={3} /><path d="M30 50l-12 16 16-4M70 50l12 16-16-4" fill="#e05a5a" stroke="#151a26" strokeWidth={3} strokeLinejoin="round" /><path d="M42 64l8 22 8-22z" fill="#f97316" stroke="#151a26" strokeWidth={3} strokeLinejoin="round" /></svg>;
    case "planet":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="50" r="24" fill="#f9a8d4" stroke="#8f1d5c" strokeWidth={4} /><ellipse cx="50" cy="52" rx="40" ry="12" fill="none" stroke="#f6bc55" strokeWidth={5} transform="rotate(-18 50 52)" /><circle cx="42" cy="44" r="4" fill="#fbcfe8" /></svg>;
    case "gem":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M28 18h44l16 24-38 44L12 42z" fill="#67e8f9" stroke="#0e7490" strokeWidth={4} strokeLinejoin="round" /><path d="M12 42h76M28 18l10 24 12-24 12 24 10-24M38 42l12 44L62 42" fill="none" stroke="#0e7490" strokeWidth={3} /></svg>;
    case "trophy":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M30 14h40v26a20 20 0 0 1-40 0z" fill="#f6bc55" stroke="#7c5310" strokeWidth={4} strokeLinejoin="round" /><path d="M30 20H16a14 14 0 0 0 16 18M70 20h14a14 14 0 0 1-16 18" fill="none" stroke="#7c5310" strokeWidth={4} /><path d="M44 60h12v12H44zM32 78h36v8H32z" fill="#f6bc55" stroke="#7c5310" strokeWidth={3.5} /></svg>;
    case "medal":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M36 6h12l6 22h-8zM64 6H52l-6 22h8z" fill="#e05a5a" stroke="#5f1616" strokeWidth={3} /><circle cx="50" cy="56" r="26" fill="#f6bc55" stroke="#7c5310" strokeWidth={4} /><polygon points={burst(5, 14, 6)} transform="translate(50 56)" fill="#fff7e0" /></svg>;
    case "eye":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M8 50s16-26 42-26 42 26 42 26-16 26-42 26S8 50 8 50z" fill="#e0f2fe" stroke="#151a26" strokeWidth={4} /><circle cx="50" cy="50" r="14" fill="#38bdf8" stroke="#151a26" strokeWidth={3} /><circle cx="50" cy="50" r="6" fill="#151a26" /><circle cx="55" cy="45" r="3" fill="#fff" /></svg>;
    case "infinity":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M30 66c-9 0-16-7-16-16s7-16 16-16c14 0 26 32 40 32 9 0 16-7 16-16s-7-16-16-16c-6 0-11 5-15 10" fill="none" stroke="#8b5cf6" strokeWidth={9} strokeLinecap="round" /></svg>;
    case "music":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M38 76V22l40-8v52" fill="none" stroke="#151a26" strokeWidth={6} strokeLinejoin="round" /><circle cx="28" cy="76" r="11" fill="#43d9be" stroke="#151a26" strokeWidth={4} /><circle cx="68" cy="66" r="11" fill="#f472b6" stroke="#151a26" strokeWidth={4} /></svg>;
    case "camera":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M12 32h16l8-10h28l8 10h16v46H12z" fill="#334155" stroke="#151a26" strokeWidth={4} strokeLinejoin="round" /><circle cx="50" cy="52" r="16" fill="#0ea5e9" stroke="#151a26" strokeWidth={4} /><circle cx="56" cy="46" r="4" fill="#bae6fd" /></svg>;
    case "coffee":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M18 34h52v30a18 18 0 0 1-18 18H36a18 18 0 0 1-18-18z" fill="#fbbf24" stroke="#7c5310" strokeWidth={4} /><path d="M70 40h8a10 10 0 0 1 0 20h-8" fill="none" stroke="#7c5310" strokeWidth={4} /><path d="M32 8c4 6-4 8 0 14M48 8c4 6-4 8 0 14" fill="none" stroke="#94a3b8" strokeWidth={4} strokeLinecap="round" /></svg>;
    case "pizza":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M50 92 14 22a78 78 0 0 1 72 0z" fill="#fbbf24" stroke="#7c2d12" strokeWidth={4} strokeLinejoin="round" /><path d="M14 22a78 78 0 0 1 72 0l-5 10a66 66 0 0 0-62 0z" fill="#f59e0b" stroke="#7c2d12" strokeWidth={3} /><circle cx="44" cy="44" r="6" fill="#e05a5a" stroke="#7c2d12" strokeWidth={2.5} /><circle cx="60" cy="56" r="6" fill="#e05a5a" stroke="#7c2d12" strokeWidth={2.5} /><circle cx="48" cy="68" r="5" fill="#e05a5a" stroke="#7c2d12" strokeWidth={2.5} /></svg>;
    case "cherry":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M40 58C36 34 48 18 66 10M62 56c-4-20 4-34 4-46" fill="none" stroke="#3f6212" strokeWidth={5} strokeLinecap="round" /><circle cx="36" cy="70" r="18" fill="#e05a5a" stroke="#5f1616" strokeWidth={4} /><circle cx="66" cy="66" r="15" fill="#e05a5a" stroke="#5f1616" strokeWidth={4} /><circle cx="30" cy="64" r="4" fill="#fca5a5" /></svg>;
    case "flower":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><g fill="#f9a8d4" stroke="#8f1d5c" strokeWidth={3}>{[0, 60, 120, 180, 240, 300].map((a) => <circle key={a} cx={50 + 20 * Math.cos((a * Math.PI) / 180)} cy={50 + 20 * Math.sin((a * Math.PI) / 180)} r="14" />)}</g><circle cx="50" cy="50" r="12" fill="#fde047" stroke="#7c5310" strokeWidth={3} /></svg>;
    case "clover":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><g fill="#4ade80" stroke="#166534" strokeWidth={3.5}>{[[-14, -14], [14, -14], [-14, 14], [14, 14]].map(([x, y], i) => <circle key={i} cx={50 + x} cy={46 + y} r="16" />)}</g><path d="M50 60c2 14 6 22 14 28" fill="none" stroke="#166534" strokeWidth={5} strokeLinecap="round" /></svg>;
    case "target":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="50" r="40" fill="#fff" stroke="#151a26" strokeWidth={4} /><circle cx="50" cy="50" r="28" fill="#e05a5a" /><circle cx="50" cy="50" r="16" fill="#fff" /><circle cx="50" cy="50" r="6" fill="#e05a5a" /></svg>;
    case "verified":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><polygon points={burst(10, 46, 38)} fill="#38bdf8" stroke="#0c4a6e" strokeWidth={3} strokeLinejoin="round" /><path d="m34 50 11 11 21-22" fill="none" stroke="#fff" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" /></svg>;
    /* ---------- meme ---------- */
    case "lol":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><polygon points={burst(14, 48, 38)} fill="#fde047" stroke="#7c5310" strokeWidth={3.5} strokeLinejoin="round" /><text x="50" y="58" textAnchor="middle" fontFamily={IMPACT} fontSize="26" fill="#7c2d12">LOL</text></svg>;
    case "cien":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><rect x="8" y="28" width="84" height="44" rx="10" fill="#e05a5a" stroke="#5f1616" strokeWidth={4} transform="rotate(-6 50 50)" /><text x="50" y="60" textAnchor="middle" fontFamily={IMPACT} fontSize="34" fill="#fff" transform="rotate(-6 50 50)">100</text></svg>;
    case "xd":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="50" r="42" fill="#fde047" stroke="#7c5310" strokeWidth={4} /><path d="m24 34 16 10-16 10M40 44l-16 0M60 34l16 10-16 10M76 44l-16 0" stroke="#3b2c07" strokeWidth={5} strokeLinecap="round" fill="none" /><path d="M28 62a24 16 0 0 0 44 0z" fill="#3b2c07" /></svg>;
    case "pressf":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><rect x="14" y="22" width="72" height="56" rx="10" fill="#e2e8f0" {...outline} /><rect x="20" y="28" width="60" height="34" rx="5" fill="#f8fafc" stroke="#151a26" strokeWidth={3} /><text x="50" y="54" textAnchor="middle" fontFamily={IMPACT} fontSize="28" fill="#151a26">F</text><rect x="34" y="66" width="32" height="7" rx="3.5" fill="#94a3b8" /></svg>;
    case "rip":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M22 90V42a28 28 0 0 1 56 0v48z" fill="#94a3b8" stroke="#334155" strokeWidth={4} strokeLinejoin="round" /><path d="M30 90V44a20 20 0 0 1 40 0v46" fill="none" stroke="#64748b" strokeWidth={3} /><text x="50" y="56" textAnchor="middle" fontFamily={IMPACT} fontSize="20" fill="#334155">RIP</text></svg>;
    case "sus":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M30 24h34a18 18 0 0 1 18 18v34a10 10 0 0 1-10 10H62l-2-10H38l-2 10H28a10 10 0 0 1-10-10V56z" fill="#e05a5a" {...outline} /><path d="M40 34h22a12 12 0 0 1 12 12v4H36v-6a10 10 0 0 1 4-10z" fill="#bae6fd" stroke="#151a26" strokeWidth={3} /><rect x="14" y="52" width="10" height="20" rx="5" fill="#b91c1c" stroke="#151a26" strokeWidth={3} /></svg>;
    case "epico":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><rect x="6" y="30" width="88" height="40" rx="6" fill="#f6bc55" stroke="#151a26" strokeWidth={4} transform="rotate(-4 50 50)" /><text x="50" y="57" textAnchor="middle" fontFamily={IMPACT} fontSize="21" fill="#151a26" transform="rotate(-4 50 50)">ÉPICO</text></svg>;
    case "gg":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><polygon points="12,26 88,26 80,74 20,74" fill="#1e293b" stroke="#43d9be" strokeWidth={4} strokeLinejoin="round" /><text x="50" y="59" textAnchor="middle" fontFamily={IMPACT} fontSize="28" fill="#43d9be">GG</text></svg>;
    case "bruh":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><rect x="8" y="32" width="84" height="36" rx="8" fill="#fff" {...outline} /><text x="50" y="57" textAnchor="middle" fontFamily={IMPACT} fontSize="22" fill="#151a26">BRUH</text><path d="M20 68l-8 14 16-6" fill="#fff" stroke="#151a26" strokeWidth={4} strokeLinejoin="round" /></svg>;
    case "oof":
      return <svg viewBox="0 0 100 100" width="100%" height="100%"><ellipse cx="50" cy="50" rx="42" ry="34" fill="#c4b5fd" stroke="#4c1d95" strokeWidth={4} /><text x="50" y="60" textAnchor="middle" fontFamily={IMPACT} fontSize="28" fill="#4c1d95">OOF</text></svg>;
  }
}

const CLASICOS: Array<{ type: StickerType; label: string }> = [
  { type: "star", label: "Estrella" }, { type: "heart", label: "Corazón" }, { type: "spark", label: "Destello" },
  { type: "arrow", label: "Flecha" }, { type: "flame", label: "Fuego" }, { type: "crown", label: "Corona" },
  { type: "bolt", label: "Rayo" }, { type: "smiley", label: "Carita" }, { type: "wow", label: "¡Wow!" },
  { type: "like", label: "Me gusta" }, { type: "moon", label: "Luna" }, { type: "sun", label: "Sol" },
  { type: "cloud", label: "Nube" }, { type: "rainbow", label: "Arcoíris" }, { type: "rocket", label: "Cohete" },
  { type: "planet", label: "Planeta" }, { type: "gem", label: "Gema" }, { type: "trophy", label: "Trofeo" },
  { type: "medal", label: "Medalla" }, { type: "eye", label: "Ojo" }, { type: "infinity", label: "Infinito" },
  { type: "music", label: "Música" }, { type: "camera", label: "Cámara" }, { type: "coffee", label: "Café" },
  { type: "pizza", label: "Pizza" }, { type: "cherry", label: "Cereza" }, { type: "flower", label: "Flor" },
  { type: "clover", label: "Trébol" }, { type: "target", label: "Diana" }, { type: "verified", label: "Verificado" },
];
const MEME: Array<{ type: StickerType; label: string }> = [
  { type: "lol", label: "LOL" }, { type: "cien", label: "100" }, { type: "xd", label: "Cara XD" },
  { type: "pressf", label: "Press F" }, { type: "rip", label: "RIP" }, { type: "sus", label: "Sus" },
  { type: "epico", label: "Épico" }, { type: "gg", label: "GG" }, { type: "bruh", label: "Bruh" },
  { type: "oof", label: "Oof" },
];
export const STICKER_GROUPS = [
  { name: "Clásicos", items: CLASICOS },
  { name: "Estilo meme", items: MEME },
];
export const STICKER_LIST = [...CLASICOS, ...MEME];

export function StickerGlyph({ type, size }: { type: StickerType; size: number }) {
  return (
    <span style={{ width: size, height: size }} className="block">
      <Glyph type={type} />
    </span>
  );
}

/* Capa interactiva sobre el lienzo: arrastrar y seleccionar */
export function StickerLayer({
  items,
  selectedId,
  onSelect,
  onMove,
}: {
  items: StickerItem[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onMove: (id: string, x: number, y: number) => void;
}) {
  const layerRef = useRef<HTMLDivElement>(null);
  const dragId = useRef<string | null>(null);
  if (items.length === 0) return null;

  return (
    <div ref={layerRef} className="absolute inset-0 z-10" onPointerDown={() => onSelect(null)}>
      {items.map((s) => {
        const size = Math.round(72 * (s.scale / 100));
        const selected = s.id === selectedId;
        return (
          <div
            key={s.id}
            role="button"
            aria-label={`Sticker ${s.type}`}
            className={cn("absolute flex cursor-grab touch-none items-center justify-center rounded-full active:cursor-grabbing", selected && "z-20")}
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: size, height: size, transform: `translate(-50%, -50%) rotate(${s.rotate}deg)` }}
            onPointerDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onSelect(s.id);
              dragId.current = s.id;
              (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
            }}
            onPointerMove={(e) => {
              if (dragId.current !== s.id || !layerRef.current) return;
              const rect = layerRef.current.getBoundingClientRect();
              const x = Math.min(98, Math.max(2, ((e.clientX - rect.left) / rect.width) * 100));
              const y = Math.min(98, Math.max(2, ((e.clientY - rect.top) / rect.height) * 100));
              onMove(s.id, +x.toFixed(1), +y.toFixed(1));
            }}
            onPointerUp={() => (dragId.current = null)}
            onPointerCancel={() => (dragId.current = null)}
          >
            {selected && (
              <span aria-hidden="true" className="pointer-events-none absolute -inset-1.5 rounded-full border-2 border-dashed border-gold-500" style={{ boxShadow: "0 0 0 4px rgba(246,188,85,0.18)" }} />
            )}
            <span className={cn("block h-full w-full drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)] transition-transform duration-150", selected && "scale-[1.04]")}>
              <Glyph type={s.type} />
            </span>
          </div>
        );
      })}
    </div>
  );
}
