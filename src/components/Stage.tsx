import { useLayoutEffect, useRef, useState, type RefObject } from "react";
import { ASPECTS, FRAME_META, cn } from "../lib/presets";
import type { LoadedImage } from "../lib/types";
import { FramedImage, type FrameSettings } from "./Frames";
import { StickerLayer } from "./Stickers";
import { IconChevronL, IconChevronR, IconClipboard, IconDownload, IconImage, IconLock, IconSparkle, IconSticker, IconTrash, IconUpload, IconWand, IconX } from "./Icons";

export interface StageProps {
  images: LoadedImage[];
  activeIndex: number;
  onActive: (i: number) => void;
  onRemoveAt: (i: number) => void;
  onReorder: (from: number, to: number) => void;
  settings: FrameSettings;
  proPreview: boolean;
  bgCss: string;
  shadowCss: string;
  stageRef: RefObject<HTMLDivElement>;
  dragActive: boolean;
  samples: { dash: string; orbit: string } | null;
  onPickFiles: (files: FileList | null) => void;
  onSample: (which: "dash" | "orbit") => void;
  selectedStickerId: string | null;
  onSelectSticker: (id: string | null) => void;
  onMoveSticker: (id: string, x: number, y: number) => void;
}

export function Stage(p: StageProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [stripDrag, setStripDrag] = useState<number | null>(null);
  const [stripOver, setStripOver] = useState<number | null>(null);
  const image = p.images[p.activeIndex] ?? null;
  const many = p.images.length > 1;
  const frameName = FRAME_META.find((f) => f.id === p.settings.frame)?.name ?? "Sin marco";
  const aspectMeta = ASPECTS.find((a) => a.id === p.settings.aspectId);
  const effPadding =
    p.settings.frame === "comic" || p.settings.frame === "price" || p.settings.frame === "cornerbadge"
      ? Math.max(p.settings.padding, 70)
      : p.settings.padding;

  /* zoom general del lienzo (solo visual, no afecta la exportación) */
  const [zoom, setZoom] = useState(1);
  const [zoomSize, setZoomSize] = useState({ w: 0, h: 0 });
  useLayoutEffect(() => {
    const el = p.stageRef.current;
    if (!el) return;
    const update = () => setZoomSize({ w: el.offsetWidth, h: el.offsetHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [p.stageRef, image?.url]);

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      {/* ---------- área de lienzo ---------- */}
      <div className="relative min-h-0 flex-1">
        <div className="absolute inset-0 overflow-auto">
          <div className="dot-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />

          {image ? (
            <div className="relative flex min-h-full min-w-full p-5 md:p-10">
              <div className="m-auto w-full max-w-[1020px]">
                {/* caja de tamaño: anima width/height = tamaño natural × zoom */}
                <div className="relative mx-auto transition-[width,height] duration-200 ease-out" style={{ width: zoomSize.w ? zoomSize.w * zoom : "auto", height: zoomSize.h ? zoomSize.h * zoom : "auto" }}>
                  {/* capa escalada: ancho natural explícito para que nada la restrinja (evita el bucle de medición) */}
                  <div className="transition-transform duration-200 ease-out" style={{ transform: `scale(${zoom})`, transformOrigin: "top left", width: zoomSize.w || "auto" }}>
                    <div ref={p.stageRef} className="animate-pop w-max transition-[padding,background] duration-300 ease-out" style={{ background: p.bgCss, padding: effPadding }}>
                      <div className="relative">
                        <FramedImage image={image} settings={p.settings} shadowCss={p.shadowCss} />
                        <StickerLayer items={p.settings.stickers} selectedId={p.selectedStickerId} onSelect={p.onSelectSticker} onMove={p.onMoveSticker} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative flex min-h-full items-center justify-center p-6">
              <div className="animate-rise w-full max-w-xl rounded-2xl border-2 border-dashed border-line2 bg-panel/80 px-7 py-10 text-center shadow-[0_24px_70px_rgba(21,26,38,0.1)] backdrop-blur-sm transition-colors duration-300 hover:border-gold-500/60 sm:px-12 sm:py-12">
                <div className="relative mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl border border-gold-500/35 bg-gold-400/15 text-[28px] text-acc shadow-[0_0_50px_rgba(246,188,85,0.2)]">
                  <IconWand />
                  <IconSparkle className="animate-floaty absolute -right-2.5 -top-2.5 text-[15px] text-acc2" />
                  <IconSparkle className="animate-floaty absolute -bottom-2 -left-2 text-[11px] text-acc" style={{ animationDelay: "1.4s" }} />
                </div>

                <h1 className="font-display text-[26px] font-bold leading-tight text-hi sm:text-3xl">
                  Convierte tu captura en <span className="text-acc">algo hermoso</span>
                </h1>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-mid">
                  Sube hasta 10 fotos, elige entre 110 marcos —serios para el portfolio o graciosos para tus redes—,
                  añade stickers y expórtalas listas para presumir.
                </p>

                <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => { p.onPickFiles(e.target.files); e.target.value = ""; }} />

                <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                  <button onClick={() => fileRef.current?.click()} className="flex h-11 items-center gap-2 rounded-xl bg-gold-500 px-5 text-sm font-bold text-[#17130a] shadow-[0_10px_30px_rgba(237,166,59,0.35)] transition-all duration-150 hover:bg-gold-400 hover:shadow-[0_14px_36px_rgba(237,166,59,0.45)] active:scale-[0.97]">
                    <IconUpload /> Subir imágenes
                  </button>
                  <span className="text-xs font-medium text-low">o empieza con un ejemplo</span>
                </div>

                <div className="mx-auto mt-5 flex max-w-xs items-center justify-center gap-3">
                  {([["dash", "Panel Nova"], ["orbit", "Órbita"]] as const).map(([which, name], i) => (
                    <button key={which} onClick={() => p.onSample(which)} disabled={!p.samples} className="animate-rise group w-32 overflow-hidden rounded-xl border border-line bg-elev text-left transition-all duration-200 hover:-translate-y-1 hover:border-gold-500/60 hover:shadow-[0_16px_40px_rgba(21,26,38,0.18)] disabled:opacity-50" style={{ animationDelay: `${350 + i * 110}ms` }}>
                      {p.samples && <img src={which === "dash" ? p.samples.dash : p.samples.orbit} alt={name} className="h-16 w-full object-cover transition-transform duration-300 group-hover:scale-[1.07]" />}
                      <span className="block px-2.5 py-1.5 text-[11px] font-semibold text-hi">{name}</span>
                    </button>
                  ))}
                </div>

                <p className="mt-7 text-xs text-low">
                  Arrastra y suelta en cualquier parte · pega desde el portapapeles con <kbd className="sm-kbd">Ctrl</kbd> <kbd className="sm-kbd">V</kbd>
                </p>
              </div>
            </div>
          )}

          {p.dragActive && (
            <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center border-2 border-dashed border-gold-500 bg-gold-400/15 backdrop-blur-[3px]">
              <div className="animate-pop flex items-center gap-3 rounded-2xl border border-gold-500/50 bg-panel/95 px-7 py-4 text-lg font-bold text-acc shadow-2xl">
                <IconDownload className="rotate-180 text-[22px]" /> Suelta las imágenes aquí
              </div>
            </div>
          )}
        </div>

        {/* aviso de marco PRO en vista previa (no se exporta) */}
        {image && p.proPreview && (
          <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex justify-center px-4">
            <span className="animate-pop flex items-center gap-2 rounded-full border border-gold-500/60 bg-[#17130a]/90 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-gold-300 shadow-2xl backdrop-blur">
              <IconLock className="text-[12px]" />
              Vista previa PRO — la exportación se desbloquea con la licencia
            </span>
          </div>
        )}

        {/* ---------- navegación del carrusel ---------- */}
        {image && many && (
          <div className="pointer-events-none absolute inset-0 z-20">
            <span className="absolute left-1/2 top-3 -translate-x-1/2 rounded-full border border-line bg-panel/90 px-3.5 py-1 font-mono text-[12px] font-bold text-hi shadow-md backdrop-blur">
              {p.activeIndex + 1} / {p.images.length}
            </span>
            <button onClick={() => p.onActive(Math.max(0, p.activeIndex - 1))} disabled={p.activeIndex === 0} aria-label="Foto anterior" className="pointer-events-auto absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-panel/90 text-[18px] text-hi shadow-lg backdrop-blur transition-all duration-150 hover:scale-110 hover:border-gold-500/60 hover:text-acc active:scale-95 disabled:pointer-events-none disabled:opacity-30">
              <IconChevronL />
            </button>
            <button onClick={() => p.onActive(Math.min(p.images.length - 1, p.activeIndex + 1))} disabled={p.activeIndex === p.images.length - 1} aria-label="Foto siguiente" className="pointer-events-auto absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-panel/90 text-[18px] text-hi shadow-lg backdrop-blur transition-all duration-150 hover:scale-110 hover:border-gold-500/60 hover:text-acc active:scale-95 disabled:pointer-events-none disabled:opacity-30">
              <IconChevronR />
            </button>
          </div>
        )}

        {/* ---------- zoom general del lienzo ---------- */}
        {image && (
          <div className="absolute right-4 top-4 z-20 flex items-center gap-0.5 rounded-full border border-line bg-panel/90 p-1 shadow-lg backdrop-blur">
            <button onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.1).toFixed(2)))} disabled={zoom <= 0.5} aria-label="Alejar el lienzo" title="Alejar" className="flex size-7 items-center justify-center rounded-full text-[16px] font-bold leading-none text-mid transition-all duration-150 hover:bg-elev hover:text-hi active:scale-90 disabled:pointer-events-none disabled:opacity-30">−</button>
            <button onClick={() => setZoom(1)} title="Restablecer zoom" className="w-12 rounded-full py-1 text-center font-mono text-[11px] font-bold text-hi transition-colors hover:bg-elev">{Math.round(zoom * 100)}%</button>
            <button onClick={() => setZoom((z) => Math.min(1.6, +(z + 0.1).toFixed(2)))} disabled={zoom >= 1.6} aria-label="Acercar el lienzo" title="Acercar" className="flex size-7 items-center justify-center rounded-full text-[16px] font-bold leading-none text-mid transition-all duration-150 hover:bg-elev hover:text-hi active:scale-90 disabled:pointer-events-none disabled:opacity-30">+</button>
          </div>
        )}
      </div>

      {/* ---------- tira de miniaturas (arrastra para reordenar) ---------- */}
      {many && (
        <div className="flex h-[74px] shrink-0 items-center gap-2 overflow-x-auto border-t border-line bg-panel/85 px-3 backdrop-blur">
          {p.images.map((im, i) => (
            <div
              key={`strip-${i}`}
              draggable
              onDragStart={(e) => { setStripDrag(i); e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", String(i)); }}
              onDragOver={(e) => { if (stripDrag === null) return; e.preventDefault(); e.dataTransfer.dropEffect = "move"; if (stripOver !== i) setStripOver(i); }}
              onDragLeave={() => setStripOver((o) => (o === i ? null : o))}
              onDrop={(e) => { e.preventDefault(); if (stripDrag !== null && stripDrag !== i) p.onReorder(stripDrag, i); setStripDrag(null); setStripOver(null); }}
              onDragEnd={() => { setStripDrag(null); setStripOver(null); }}
              className={cn("group relative shrink-0 cursor-grab active:cursor-grabbing", stripDrag === i && "z-10 opacity-40", stripOver === i && stripDrag !== null && stripDrag !== i && "-translate-x-0.5 scale-[1.07]")}
            >
              <button onClick={() => p.onActive(i)} aria-label={`Ir a la foto ${i + 1}`} className={cn("block h-12 w-[76px] overflow-hidden rounded-md border-2 transition-all duration-150", i === p.activeIndex ? "border-gold-500 shadow-[0_0_0_2px_rgba(246,188,85,0.25)]" : "border-line opacity-65 hover:border-line2 hover:opacity-100", stripOver === i && stripDrag !== null && stripDrag !== i && "border-gold-500/80")}>
                <img src={im.url} alt={im.name} className="pointer-events-none h-full w-full object-cover" />
              </button>
              <button onClick={() => p.onRemoveAt(i)} aria-label={`Quitar foto ${i + 1}`} className="absolute -right-1.5 -top-1.5 hidden size-[17px] items-center justify-center rounded-full bg-coral-500 text-[9px] text-white shadow-md transition-transform hover:scale-110 group-hover:flex">
                <IconX />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ---------- barra de estado ---------- */}
      {image && (
        <div className="flex h-11 shrink-0 items-center gap-3 border-t border-line bg-panel/85 px-4 text-xs text-mid backdrop-blur">
          <IconImage className="shrink-0 text-[15px] text-low" />
          <span className="max-w-[180px] truncate font-semibold text-hi">{image.name}</span>
          <span className="text-line2">•</span>
          <span className="hidden sm:inline">{image.w}×{image.h}px</span>
          <span className="hidden text-line2 md:inline">•</span>
          <span className="hidden items-center gap-1 md:flex">marco <b className="text-acc">{frameName}</b></span>
          {aspectMeta && aspectMeta.id !== "free" && (
            <>
              <span className="hidden text-line2 md:inline">•</span>
              <span className="hidden font-mono font-bold text-acc2 md:inline">{aspectMeta.label}</span>
            </>
          )}
          {p.settings.stickers.length > 0 && (
            <>
              <span className="hidden text-line2 lg:inline">•</span>
              <span className="hidden items-center gap-1 lg:flex"><IconSticker className="text-[13px] text-acc" /> {p.settings.stickers.length}</span>
            </>
          )}
          {many && (
            <>
              <span className="text-line2">•</span>
              <span className="font-mono">foto {p.activeIndex + 1}/{p.images.length}</span>
            </>
          )}
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden items-center gap-1.5 xl:flex">
              <IconClipboard className="text-[14px] text-low" /> pega con <kbd className="sm-kbd">Ctrl</kbd> <kbd className="sm-kbd">V</kbd>
            </span>
            <button onClick={() => p.onRemoveAt(p.activeIndex)} className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-semibold text-mid transition-colors hover:bg-coral-500/10 hover:text-coral-400">
              <IconTrash className="text-[14px]" /> Quitar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
