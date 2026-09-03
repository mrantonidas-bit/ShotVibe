import { useState, type CSSProperties, type ReactNode } from "react";
import { ASPECTS, BG_PRESETS, FRAME_META, MAX_SLIDES, cn, type BgChoice } from "../lib/presets";
import type { LoadedImage, PhotoSettings, Settings, StickerItem } from "../lib/types";
import { FrameThumb } from "./Frames";
import { ProBenefitsPanel } from "./ProBenefits";
import { STICKER_GROUPS, StickerGlyph } from "./Stickers";
import {
  IconBorder, IconBriefcase, IconBrightness, IconCheck, IconCopy, IconCrown, IconDice, IconDroplet, IconFilm,
  IconFrame, IconImage, IconLock, IconPalette, IconPanH, IconPanV, IconPlus, IconRadius, IconRatio, IconReset,
  IconRotate, IconShadow, IconSmile, IconSticker, IconTrash, IconUpload, IconX, IconZoom,
} from "./Icons";

function SectionTitle({ icon, children, action, tone = "text-acc" }: { icon: ReactNode; children: ReactNode; action?: ReactNode; tone?: string }) {
  return (
    <div className="mb-3.5 flex items-center justify-between">
      <div className="flex items-center gap-2 text-mid">
        <span className={cn("flex size-6 items-center justify-center rounded-md border border-line bg-elev text-[13px]", tone)}>{icon}</span>
        <span className="text-[11px] font-bold uppercase tracking-[0.18em]">{children}</span>
      </div>
      {action}
    </div>
  );
}

function Slider({ icon, label, value, min, max, step, unit, onChange }: { icon: ReactNode; label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (v: number) => void }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="flex items-center gap-2 text-[13px] font-medium text-hi"><span className="text-[15px] text-low">{icon}</span>{label}</span>
        <span className="rounded-md border border-line bg-elev px-1.5 py-0.5 font-mono text-[11px] font-semibold text-acc">{value}{unit}</span>
      </div>
      <input type="range" className="sm-range" min={min} max={max} step={step} value={value} aria-label={label} style={{ "--fill": `${pct}%` } as CSSProperties} onChange={(e) => onChange(Number(e.target.value))} />
    </div>
  );
}

export interface ControlPanelProps {
  bg: BgChoice;
  onBg: (bg: BgChoice) => void;
  settings: Settings;
  onSettings: (patch: Partial<Settings>) => void;
  photo: PhotoSettings;
  onPhoto: (patch: Partial<PhotoSettings>) => void;
  onApplyToAll: () => void;
  images: LoadedImage[];
  activeIndex: number;
  onActive: (i: number) => void;
  onRemoveAt: (i: number) => void;
  onReorder: (from: number, to: number) => void;
  samples: { dash: string; orbit: string } | null;
  onPickFiles: (files: FileList | null) => void;
  onSample: (which: "dash" | "orbit") => void;
  selectedStickerId: string | null;
  onSelectSticker: (id: string | null) => void;
  onAddSticker: (type: StickerItem["type"]) => void;
  onUpdateSticker: (id: string, patch: Partial<StickerItem>) => void;
  onRemoveSticker: (id: string) => void;
  onDuplicateSticker: (id: string) => void;
  onClearStickers: () => void;
  onPickFrame: (id: string) => void;
  licensed: boolean;
  onReset: () => void;
  onRandom: () => void;
}

export function ControlPanel(p: ControlPanelProps) {
  const customColor = p.bg.kind === "solid" ? p.bg.color : "#0ea5e9";
  const [thumbDrag, setThumbDrag] = useState<number | null>(null);
  const [thumbOver, setThumbOver] = useState<number | null>(null);
  const hasImages = p.images.length > 0;
  const frameMeta = FRAME_META.find((f) => f.id === p.photo.frame);
  const selectedSticker = p.photo.stickers.find((s) => s.id === p.selectedStickerId) ?? null;

  return (
    <aside className="order-2 z-10 flex min-h-0 w-full flex-1 flex-col overflow-hidden border-t border-line bg-panel/60 backdrop-blur-sm lg:order-1 lg:h-auto lg:w-[332px] lg:flex-none lg:border-r lg:border-t-0 xl:w-[354px]">
      <div className="flex-1 space-y-8 overflow-y-auto p-5">
        {/* ---------- IMAGEN / CARRUSEL ---------- */}
        <section className="animate-rise" style={{ animationDelay: "40ms" }}>
          <SectionTitle icon={<IconImage />}>
            Carrusel <span className="font-mono text-low">{p.images.length}/{MAX_SLIDES}</span>
          </SectionTitle>
          <label className={cn("group flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border-2 border-dashed px-4 py-4 text-center transition-all duration-200 active:scale-[0.99]", hasImages ? "border-line2 bg-elev/60 hover:border-gold-500/70" : "border-line2 bg-elev/60 hover:border-gold-500/70")}>
            <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => { p.onPickFiles(e.target.files); e.target.value = ""; }} />
            <span className="flex size-9 items-center justify-center rounded-full bg-gold-400/15 text-lg text-acc transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:scale-110"><IconUpload /></span>
            <span className="text-[13px] font-bold text-hi">{hasImages ? "Añadir más fotos" : "Subir imágenes"}</span>
            <span className="text-[11px] text-low">PNG · JPG · WebP — o pega con <kbd className="sm-kbd">Ctrl</kbd> <kbd className="sm-kbd">V</kbd></span>
          </label>

          {hasImages && (
            <>
              <div className="mt-3 grid grid-cols-5 gap-1.5">
                {p.images.map((im, i) => (
                  <div
                    key={im.url.slice(-24) + i}
                    draggable
                    onDragStart={(e) => { setThumbDrag(i); e.dataTransfer.effectAllowed = "move"; }}
                    onDragOver={(e) => { if (thumbDrag === null) return; e.preventDefault(); if (thumbOver !== i) setThumbOver(i); }}
                    onDragLeave={() => setThumbOver((o) => (o === i ? null : o))}
                    onDrop={(e) => { e.preventDefault(); if (thumbDrag !== null && thumbDrag !== i) p.onReorder(thumbDrag, i); setThumbDrag(null); setThumbOver(null); }}
                    onDragEnd={() => { setThumbDrag(null); setThumbOver(null); }}
                    className={cn("group relative cursor-grab active:cursor-grabbing", thumbDrag === i && "opacity-40", thumbOver === i && thumbDrag !== null && thumbDrag !== i && "scale-105")}
                  >
                    <button onClick={() => p.onActive(i)} aria-label={`Foto ${i + 1}`} className={cn("block w-full overflow-hidden rounded-md border-2 transition-all", i === p.activeIndex ? "border-gold-500 shadow-[0_0_0_2px_rgba(246,188,85,0.25)]" : "border-line opacity-70 hover:opacity-100", thumbOver === i && thumbDrag !== null && thumbDrag !== i && "border-gold-500/80")}>
                      <img src={im.url} alt={im.name} className="pointer-events-none aspect-[4/3] w-full object-cover" />
                    </button>
                    <span className="absolute bottom-0.5 left-0.5 rounded bg-black/60 px-1 font-mono text-[9px] font-bold text-white">{i + 1}</span>
                    <button onClick={() => p.onRemoveAt(i)} aria-label={`Quitar foto ${i + 1}`} className="absolute -right-1 -top-1 hidden size-4 items-center justify-center rounded-full bg-coral-500 text-[8px] text-white shadow group-hover:flex"><IconX /></button>
                  </div>
                ))}
                {p.images.length < MAX_SLIDES && (
                  <label className="flex aspect-[4/3] cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-line2 text-low transition-colors hover:border-gold-500/70 hover:text-acc">
                    <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => { p.onPickFiles(e.target.files); e.target.value = ""; }} />
                    <IconPlus />
                  </label>
                )}
              </div>
              <p className="mt-2 text-[11px] text-low">Arrastra las miniaturas para reordenar el carrusel.</p>
              <button onClick={p.onApplyToAll} disabled={p.images.length < 2} className="mt-2.5 flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-mint-500/50 text-[12px] font-bold text-acc2 transition-all duration-150 hover:border-mint-400 hover:bg-mint-500/10 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40">
                <IconCopy className="text-[14px]" /> Aplicar formato y stickers a todas
              </button>
            </>
          )}

          <p className="mb-2 mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-low">Prueba rápida</p>
          <div className="grid grid-cols-2 gap-2">
            {([["dash", "Panel Nova", "UI"], ["orbit", "Órbita", "fondo"]] as const).map(([which, name, tag]) => (
              <button key={which} onClick={() => p.onSample(which)} disabled={!p.samples} className="group overflow-hidden rounded-lg border border-line bg-elev text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-gold-500/60 disabled:opacity-50">
                {p.samples && <img src={which === "dash" ? p.samples.dash : p.samples.orbit} alt={name} className="h-14 w-full object-cover transition-transform duration-300 group-hover:scale-[1.06]" />}
                <span className="flex items-center justify-between px-2.5 py-1.5"><span className="text-[11px] font-semibold text-hi">{name}</span><span className="text-[10px] text-low">{tag}</span></span>
              </button>
            ))}
          </div>
        </section>

        {/* ---------- FORMATO ---------- */}
        <section className="animate-rise" style={{ animationDelay: "90ms" }}>
          <SectionTitle icon={<IconRatio />}>Formato</SectionTitle>
          <div className="grid grid-cols-4 gap-1.5">
            {ASPECTS.map((a) => {
              const active = p.photo.aspectId === a.id;
              return (
                <button key={a.id} onClick={() => p.onPhoto({ aspectId: a.id })} className={cn("rounded-lg border px-1 py-2 text-center transition-all duration-150 hover:-translate-y-0.5", active ? "border-gold-500 bg-gold-400/10 shadow-[0_0_0_2px_rgba(246,188,85,0.2)]" : "border-line bg-elev hover:border-line2")}>
                  <span className={cn("block font-mono text-[12px] font-bold", active ? "text-acc" : "text-hi")}>{a.label}</span>
                  <span className="mt-0.5 block truncate text-[9px] leading-tight text-low">{a.hint}</span>
                </button>
              );
            })}
          </div>

          {p.photo.aspectId !== "free" && (
            <div className="animate-fade mt-3 space-y-4 rounded-xl border border-line bg-elev/70 p-3">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-low">Ajustar encuadre</p>
                <button onClick={() => p.onPhoto({ cropX: 50, cropY: 50, cropZoom: 100 })} className="flex items-center gap-1 rounded-md px-1.5 py-1 text-[11px] font-semibold text-mid transition-colors hover:bg-panel hover:text-acc"><IconReset className="text-[12px]" /> Centrar</button>
              </div>
              <Slider icon={<IconPanH />} label="Horizontal" value={p.photo.cropX} min={0} max={100} step={1} unit="%" onChange={(v) => p.onPhoto({ cropX: v })} />
              <Slider icon={<IconPanV />} label="Vertical" value={p.photo.cropY} min={0} max={100} step={1} unit="%" onChange={(v) => p.onPhoto({ cropY: v })} />
              <Slider icon={<IconZoom />} label="Zoom" value={p.photo.cropZoom} min={100} max={200} step={5} unit="%" onChange={(v) => p.onPhoto({ cropZoom: v })} />
              <p className="text-[10px] leading-relaxed text-low">El encuadre se guarda solo para la foto {p.activeIndex + 1}.</p>
            </div>
          )}
        </section>

        {/* ---------- MARCOS ---------- */}
        <section className="animate-rise" style={{ animationDelay: "110ms" }}>
          <SectionTitle
            icon={<IconFrame />}
            action={
              <button onClick={p.onRandom} title="Marco gracioso + fondo al azar" className="flex items-center gap-1 rounded-md px-1.5 py-1 text-[11px] font-semibold text-mid transition-colors hover:bg-elev hover:text-acc">
                <IconDice className="text-[13px]" /> Aleatorio
              </button>
            }
          >
            Marcos · 110
          </SectionTitle>

          {([
            ["seria", "Seria", <IconBriefcase key="s" />, "text-acc"],
            ["graciosa", "Graciosa", <IconSmile key="g" />, "text-acc2"],
            ["exclusiva", "Exclusivos", <IconCrown key="e" />, "text-acc"],
          ] as const).map(([kind, label, icon, tone]) => {
            const list = FRAME_META.filter((f) => f.kind === kind);
            return (
              <div key={kind} className="mb-4 last:mb-0">
                <div className="mb-2 flex items-center justify-between">
                  <span className={cn("flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em]", tone)}>{icon} {label}</span>
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-low">
                    {kind === "exclusiva" ? <IconLock className="text-[11px] text-acc" /> : null}
                    {list.length} {kind === "exclusiva" ? "PRO" : `· ${list.filter((f) => !f.pro).length} gratis / ${list.filter((f) => f.pro).length} PRO`}
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {list.map((f) => {
                    const active = p.photo.frame === f.id;
                    const locked = !!f.pro && !p.licensed;
                    return (
                      <button
                        key={f.id}
                        title={`${f.name}${f.pro ? " · PRO" : ""}`}
                        onClick={() => p.onPickFrame(f.id)}
                        className={cn(
                          "group relative rounded-md border p-[3px] transition-all duration-150 hover:z-10 hover:scale-[1.08]",
                          active ? "z-10 scale-[1.04] border-gold-500 bg-elev shadow-[0_0_0_2px_rgba(246,188,85,0.25)]" : "border-line bg-elev/70 hover:border-line2",
                          locked && "opacity-85"
                        )}
                      >
                        <FrameThumb id={f.id} />
                        {f.pro && (
                          <span className={cn("absolute -right-1 -top-1 flex size-[15px] items-center justify-center rounded-full text-[8px] shadow", p.licensed ? "bg-gold-500 text-[#17130a]" : "bg-elev text-acc border border-gold-500/50")}>
                            {p.licensed ? <IconCheck /> : <IconLock />}
                          </span>
                        )}
                        <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-1 hidden -translate-x-1/2 whitespace-nowrap rounded bg-[#141926] px-1.5 py-0.5 text-[9px] font-semibold text-white group-hover:block">{f.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <p className="mt-1 text-[11px] text-low">
            El marco se aplica a la foto {p.activeIndex + 1}. Los que llevan <IconLock className="inline text-[10px] text-acc" /> son PRO.
          </p>
        </section>

        {/* ---------- TEXTOS DEL MARCO ---------- */}
        {frameMeta?.texts && frameMeta.texts.length > 0 && (
          <section className="animate-fade">
            <SectionTitle icon={<IconFrame />} tone="text-acc2">Textos · {frameMeta.name}</SectionTitle>
            <div className="space-y-2">
              {frameMeta.texts.map(({ key, placeholder }) => (
                <input
                  key={key}
                  value={p.settings.texts[key]}
                  onChange={(e) => p.onSettings({ texts: { ...p.settings.texts, [key]: e.target.value } })}
                  placeholder={placeholder}
                  className="w-full rounded-lg border border-line bg-elev px-3 py-2 text-[13px] text-hi placeholder:text-low focus:border-gold-500/70 focus:outline-none"
                />
              ))}
            </div>
          </section>
        )}

        {/* ---------- FONDO ---------- */}
        <section className="animate-rise" style={{ animationDelay: "180ms" }}>
          <SectionTitle icon={<IconPalette />} tone="text-acc2">Fondo</SectionTitle>
          <div className="grid grid-cols-8 gap-1.5">
            {BG_PRESETS.map((preset) => {
              const active = p.bg.kind === "preset" && p.bg.id === preset.id;
              return (
                <button key={preset.id} title={preset.name} aria-label={`Fondo ${preset.name}`} onClick={() => p.onBg({ kind: "preset", id: preset.id })} className={cn("relative h-8 rounded-md border transition-all duration-150 hover:z-10 hover:scale-110", active ? "z-10 scale-105 border-gold-500 shadow-[0_0_0_2px_rgba(246,188,85,0.25)]" : "border-line hover:border-line2")} style={{ background: preset.css }}>
                  {active && <IconCheck className="absolute inset-0 m-auto size-3.5 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]" />}
                </button>
              );
            })}
          </div>
          <label className={cn("mt-3 flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors", p.bg.kind === "solid" ? "border-gold-500/60 bg-gold-400/5" : "border-line bg-elev hover:border-line2")}>
            <span className="relative block size-8 shrink-0 overflow-hidden rounded-lg border border-line2 shadow-inner">
              <input type="color" className="sm-color absolute -inset-2 h-[calc(100%+16px)] w-[calc(100%+16px)]" value={customColor} aria-label="Color de fondo personalizado" onChange={(e) => p.onBg({ kind: "solid", color: e.target.value })} />
            </span>
            <span className="flex-1">
              <span className="block text-xs font-bold text-hi">Color sólido</span>
              <span className="block font-mono text-[11px] uppercase text-low">{p.bg.kind === "solid" ? p.bg.color : "elige uno"}</span>
            </span>
            {p.bg.kind === "solid" && <IconCheck className="text-[15px] text-acc" />}
          </label>
        </section>

        {/* ---------- STICKERS ---------- */}
        <section className="animate-rise" style={{ animationDelay: "300ms" }}>
          <SectionTitle
            icon={<IconSticker />}
            action={p.photo.stickers.length > 0 ? (
              <button onClick={p.onClearStickers} className="flex items-center gap-1 rounded-md px-1.5 py-1 text-[11px] font-semibold text-mid transition-colors hover:bg-elev hover:text-coral-500"><IconTrash className="text-[12px]" /> Quitar todos</button>
            ) : undefined}
          >
            Stickers <span className="font-mono text-low">{p.photo.stickers.length}</span>
          </SectionTitle>
          {STICKER_GROUPS.map((grp) => (
            <div key={grp.name} className="mb-3 last:mb-0">
              <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-low">{grp.name} · {grp.items.length}</p>
              <div className="grid grid-cols-8 gap-1.5">
                {grp.items.map((s) => (
                  <button key={s.type} onClick={() => p.onAddSticker(s.type)} title={s.label} aria-label={`Añadir sticker ${s.label}`} className="flex aspect-square items-center justify-center rounded-md border border-line bg-elev p-1 transition-all duration-150 hover:scale-110 hover:border-gold-500/60 hover:shadow-md active:scale-95">
                    <StickerGlyph type={s.type} size={26} />
                  </button>
                ))}
              </div>
            </div>
          ))}

          {selectedSticker ? (
            <div className="animate-fade mt-3 space-y-4 rounded-xl border border-gold-500/40 bg-gold-400/5 p-3">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-2 text-[12px] font-bold text-hi"><StickerGlyph type={selectedSticker.type} size={20} /> Editando sticker</p>
                <div className="flex gap-1">
                  <button onClick={() => p.onDuplicateSticker(selectedSticker.id)} title="Duplicar" className="flex size-7 items-center justify-center rounded-md border border-line text-mid transition-colors hover:border-gold-500/60 hover:text-acc"><IconCopy className="text-[13px]" /></button>
                  <button onClick={() => p.onRemoveSticker(selectedSticker.id)} title="Eliminar" className="flex size-7 items-center justify-center rounded-md border border-line text-mid transition-colors hover:border-coral-500/60 hover:text-coral-500"><IconTrash className="text-[13px]" /></button>
                </div>
              </div>
              <Slider icon={<IconZoom />} label="Tamaño" value={selectedSticker.scale} min={40} max={220} step={5} unit="%" onChange={(v) => p.onUpdateSticker(selectedSticker.id, { scale: v })} />
              <Slider icon={<IconRotate />} label="Giro" value={selectedSticker.rotate} min={-180} max={180} step={5} unit="°" onChange={(v) => p.onUpdateSticker(selectedSticker.id, { rotate: v })} />
            </div>
          ) : (
            <p className="mt-2.5 text-[11px] leading-relaxed text-low">
              {p.photo.stickers.length > 0
                ? `Haz clic en un sticker para editarlo o arrástralo para moverlo. Solo viven en la foto ${p.activeIndex + 1}.`
                : "Añade stickers y arrástralos sobre tu captura. Se guardan por foto y salen en la exportación."}
            </p>
          )}
        </section>

        {/* ---------- GEOMETRÍA ---------- */}
        <section className="animate-rise" style={{ animationDelay: "340ms" }}>
          <SectionTitle icon={<IconRadius />} tone="text-hi" action={<button onClick={p.onReset} className="flex items-center gap-1 rounded-md px-1.5 py-1 text-[11px] font-semibold text-low transition-colors hover:bg-elev hover:text-acc"><IconReset className="text-[12px]" /> Restablecer</button>}>
            Geometría
          </SectionTitle>
          <div className="space-y-5">
            <Slider icon={<IconRadius />} label="Esquinas" value={p.settings.radius} min={0} max={48} step={2} unit="px" onChange={(v) => p.onSettings({ radius: v })} />
            <Slider icon={<IconFrame />} label="Padding del lienzo" value={p.settings.padding} min={16} max={160} step={4} unit="px" onChange={(v) => p.onSettings({ padding: v })} />
            <Slider icon={<IconRotate />} label="Rotación" value={p.settings.rotate} min={-15} max={15} step={1} unit="°" onChange={(v) => p.onSettings({ rotate: v })} />
          </div>
        </section>

        {/* ---------- EFECTOS ---------- */}
        <section className="animate-rise" style={{ animationDelay: "380ms" }}>
          <SectionTitle icon={<IconShadow />} tone="text-hi">Efectos</SectionTitle>
          <div className="space-y-5">
            <Slider icon={<IconShadow />} label="Sombra" value={p.settings.shadow} min={0} max={100} step={1} unit="%" onChange={(v) => p.onSettings({ shadow: v })} />
            <Slider icon={<IconDroplet />} label="Saturación" value={p.settings.saturation} min={0} max={200} step={5} unit="%" onChange={(v) => p.onSettings({ saturation: v })} />
            <Slider icon={<IconBrightness />} label="Brillo" value={p.settings.brightness} min={50} max={150} step={5} unit="%" onChange={(v) => p.onSettings({ brightness: v })} />
            <div>
              <Slider icon={<IconBorder />} label="Borde" value={p.settings.border} min={0} max={16} step={1} unit="px" onChange={(v) => p.onSettings({ border: v })} />
              {p.settings.border > 0 && (
                <label className="animate-fade mt-2.5 flex items-center gap-2.5 rounded-lg border border-line bg-elev px-3 py-2">
                  <span className="relative block size-6 shrink-0 overflow-hidden rounded-md border border-line2">
                    <input type="color" className="sm-color absolute -inset-2 h-[calc(100%+16px)] w-[calc(100%+16px)]" value={p.settings.borderColor} aria-label="Color del borde" onChange={(e) => p.onSettings({ borderColor: e.target.value })} />
                  </span>
                  <span className="text-xs font-semibold text-hi">Color del borde</span>
                  <span className="ml-auto font-mono text-[11px] uppercase text-low">{p.settings.borderColor}</span>
                </label>
              )}
            </div>
          </div>
        </section>

        {/* ---------- PRO incluye ---------- */}
        <section className="animate-rise" style={{ animationDelay: "420ms" }}>
          <ProBenefitsPanel />
        </section>
      </div>
    </aside>
  );
}
