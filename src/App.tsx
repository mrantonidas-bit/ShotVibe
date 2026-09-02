import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { domToBlob } from "modern-screenshot";
import { ControlPanel } from "./components/ControlPanel";
import { Stage } from "./components/Stage";
import { Toasts, type ToastItem } from "./components/Toasts";
import { LicenseModal } from "./components/LicenseModal";
import { LocalAppModal } from "./components/LocalAppModal";
import {
  IconCopy, IconCrown, IconDownload, IconFilm, IconLoader, IconLock, IconMoon, IconPackage, IconShield,
  IconSparkle, IconSun, IconUnlock, IconWand, IconX,
} from "./components/Icons";
import { FramedImage, type FrameSettings } from "./components/Frames";
import { StickerLayer } from "./components/Stickers";
import { BG_PRESETS, MAX_SLIDES, cn, frameById, slugify, uid, type BgChoice } from "./lib/presets";
import {
  DEFAULT_PHOTO, DEFAULT_SETTINGS, shadowFor, type LoadedImage, type PhotoSettings, type Settings,
  type StickerItem, type Theme,
} from "./lib/types";
import { makeDashboardSample, makeWallpaperSample } from "./lib/samples";

const LS_SETTINGS = "shotvibe.settings.v3";
const LS_BG = "shotvibe.bg.v3";
const LS_THEME = "shotvibe.theme.v1";
const LS_LICENSE = "shotvibe.license.v1";
const LS_IMAGES = "shotvibe.images.v3";

const SPARKLES = [
  { top: "14%", left: "8%", size: 18, delay: "0s" },
  { top: "70%", left: "5%", size: 12, delay: "1.2s" },
  { top: "22%", left: "88%", size: 14, delay: "0.6s" },
  { top: "82%", left: "90%", size: 20, delay: "2s" },
  { top: "48%", left: "95%", size: 11, delay: "1.6s" },
];

function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return { ...fallback, ...JSON.parse(raw) } as T;
  } catch {
    /* noop */
  }
  return fallback;
}

type ExportKind = "png-std" | "png-hd" | "jpg-hd" | "webp-hd" | "copy-hd";

export default function App() {
  /* ---------- estado ---------- */
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return localStorage.getItem(LS_THEME) === "dark" ? "dark" : "light";
    } catch {
      return "light";
    }
  });
  const [settings, setSettings] = useState<Settings>(() => loadJSON(LS_SETTINGS, DEFAULT_SETTINGS));
  const [bg, setBg] = useState<BgChoice>(() => loadJSON(LS_BG, { kind: "preset", id: BG_PRESETS[0].id } as BgChoice));
  const [licensed, setLicensed] = useState<boolean>(() => {
    try {
      return localStorage.getItem(LS_LICENSE) === "1";
    } catch {
      return false;
    }
  });
  const [images, setImages] = useState<LoadedImage[]>(() => {
    try {
      const raw = localStorage.getItem(LS_IMAGES);
      if (raw) return JSON.parse(raw) as LoadedImage[];
    } catch {
      /* noop */
    }
    return [];
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);
  const [exporting, setExporting] = useState<ExportKind | "batch" | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [localOpen, setLocalOpen] = useState(false);
  const [proMenu, setProMenu] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [samples, setSamples] = useState<{ dash: string; orbit: string } | null>(null);

  const stageRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);
  const toastId = useRef(0);

  const push = useCallback((kind: ToastItem["kind"], msg: string) => {
    const id = ++toastId.current;
    setToasts((t) => [...t.slice(-3), { id, kind, msg }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200);
  }, []);

  /* ---------- ejemplos generados localmente ---------- */
  useEffect(() => {
    const t = window.setTimeout(() => {
      setSamples({ dash: makeDashboardSample(), orbit: makeWallpaperSample() });
    }, 60);
    return () => window.clearTimeout(t);
  }, []);

  /* ---------- tema ---------- */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(LS_THEME, theme);
    } catch {
      /* noop */
    }
  }, [theme]);

  /* ---------- persistencia ---------- */
  useEffect(() => {
    try {
      localStorage.setItem(LS_SETTINGS, JSON.stringify(settings));
    } catch {
      /* noop */
    }
  }, [settings]);
  useEffect(() => {
    try {
      localStorage.setItem(LS_BG, JSON.stringify(bg));
    } catch {
      /* noop */
    }
  }, [bg]);
  useEffect(() => {
    try {
      localStorage.setItem(LS_IMAGES, JSON.stringify(images));
    } catch {
      /* quota superada: se mantiene solo en memoria */
    }
  }, [images]);

  /* ---------- foto activa + ajustes fusionados ---------- */
  const activeImage = images[activeIndex] ?? null;
  const mergedFor = useCallback(
    (img: LoadedImage): FrameSettings => ({ ...settings, ...DEFAULT_PHOTO, ...img.photo }),
    [settings]
  );
  const effSettings: FrameSettings = useMemo(
    () => (activeImage ? mergedFor(activeImage) : { ...settings, ...DEFAULT_PHOTO }),
    [activeImage, mergedFor, settings]
  );
  const bgCss = useMemo(() => {
    if (bg.kind === "solid") return bg.color;
    return BG_PRESETS.find((b) => b.id === bg.id)?.css ?? BG_PRESETS[0].css;
  }, [bg]);
  const shadowCss = useMemo(() => shadowFor(settings.shadow), [settings.shadow]);

  const onSettings = useCallback((patch: Partial<Settings>) => {
    setSettings((s) => ({ ...s, ...patch }));
  }, []);
  const onPhoto = useCallback(
    (patch: Partial<PhotoSettings>) => {
      setImages((prev) =>
        prev.map((im, i) => (i === activeIndex ? { ...im, photo: { ...im.photo, ...patch } } : im))
      );
    },
    [activeIndex]
  );
  const onApplyToAll = useCallback(() => {
    setImages((prev) => {
      const src = prev[activeIndex];
      if (!src) return prev;
      return prev.map((im) => ({ ...im, photo: { ...src.photo } }));
    });
    push("ok", "Formato, encuadre y stickers aplicados a todas las fotos");
  }, [activeIndex, push]);

  /* ---------- stickers ---------- */
  const onAddSticker = useCallback(
    (type: StickerItem["type"]) => {
      const id = uid();
      const sticker: StickerItem = {
        id,
        type,
        x: 30 + Math.random() * 40,
        y: 25 + Math.random() * 40,
        scale: 100,
        rotate: 0,
      };
      setImages((prev) =>
        prev.map((im, i) => (i === activeIndex ? { ...im, photo: { ...im.photo, stickers: [...im.photo.stickers, sticker] } } : im))
      );
      setSelectedStickerId(id);
    },
    [activeIndex]
  );
  const mutateStickers = useCallback(
    (fn: (list: StickerItem[]) => StickerItem[]) => {
      setImages((prev) =>
        prev.map((im, i) => (i === activeIndex ? { ...im, photo: { ...im.photo, stickers: fn(im.photo.stickers) } } : im))
      );
    },
    [activeIndex]
  );
  const onUpdateSticker = useCallback(
    (id: string, patch: Partial<StickerItem>) => mutateStickers((l) => l.map((s) => (s.id === id ? { ...s, ...patch } : s))),
    [mutateStickers]
  );
  const onMoveSticker = useCallback(
    (id: string, x: number, y: number) => onUpdateSticker(id, { x, y }),
    [onUpdateSticker]
  );
  const onRemoveSticker = useCallback(
    (id: string) => {
      mutateStickers((l) => l.filter((s) => s.id !== id));
      setSelectedStickerId((cur) => (cur === id ? null : cur));
    },
    [mutateStickers]
  );
  const onDuplicateSticker = useCallback(
    (id: string) => {
      const nid = uid();
      mutateStickers((l) => {
        const src = l.find((s) => s.id === id);
        if (!src) return l;
        return [...l, { ...src, id: nid, x: Math.min(95, src.x + 8), y: Math.min(95, src.y + 8) }];
      });
      setSelectedStickerId(nid);
    },
    [mutateStickers]
  );
  const onClearStickers = useCallback(() => {
    mutateStickers(() => []);
    setSelectedStickerId(null);
  }, [mutateStickers]);

  /* ---------- carga de imágenes ---------- */
  const addDataUrl = useCallback((url: string, name: string) => {
    const im = new Image();
    im.onload = () => {
      setImages((prev) =>
        prev.length >= MAX_SLIDES
          ? prev
          : [...prev, { url, name, w: im.naturalWidth, h: im.naturalHeight, photo: { ...DEFAULT_PHOTO } }]
      );
      setActiveIndex((prev) => Math.min(prev + 1, MAX_SLIDES - 1));
    };
    im.src = url;
  }, []);

  const addImages = useCallback(
    (files: File[]) => {
      const imgs = files.filter((f) => f.type.startsWith("image/"));
      if (imgs.length === 0) {
        push("err", "Ese archivo no es una imagen");
        return;
      }
      const current = images.length;
      const space = MAX_SLIDES - current;
      if (space <= 0) {
        push("err", `Máximo ${MAX_SLIDES} fotos en el carrusel`);
        return;
      }
      const accepted = imgs.slice(0, space);
      if (imgs.length > space) push("info", `Carrusel lleno: solo se añadieron ${space} foto(s)`);
      accepted.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          addDataUrl(String(reader.result), file.name);
          if (accepted.length === 1) push("ok", `«${file.name}» añadida al carrusel`);
        };
        reader.onerror = () => push("err", "No se pudo leer el archivo");
        reader.readAsDataURL(file);
      });
      if (accepted.length > 1) push("ok", `${accepted.length} fotos añadidas al carrusel`);
    },
    [images.length, addDataUrl, push]
  );

  const onPickFiles = useCallback((files: FileList | null) => addImages(Array.from(files ?? [])), [addImages]);
  const onSample = useCallback(
    (which: "dash" | "orbit") => {
      if (!samples) return;
      addDataUrl(which === "dash" ? samples.dash : samples.orbit, which === "dash" ? "ejemplo-panel-nova.png" : "ejemplo-orbita.png");
      push("info", "Ejemplo añadido al carrusel");
    },
    [samples, addDataUrl, push]
  );
  const removeAt = useCallback(
    (i: number) => {
      const n = images.length;
      setImages((prev) => prev.filter((_, j) => j !== i));
      setActiveIndex((prev) => {
        if (n <= 1) return 0;
        if (i < prev) return prev - 1;
        return Math.max(0, Math.min(prev, n - 2));
      });
      setSelectedStickerId(null);
    },
    [images.length]
  );
  const reorderImages = useCallback((from: number, to: number) => {
    setImages((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
    setActiveIndex(to);
  }, []);

  /* ---------- pegar desde portapapeles ---------- */
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const f = Array.from(e.clipboardData?.files ?? [])[0];
      if (f && f.type.startsWith("image/")) {
        e.preventDefault();
        addImages([f]);
        return;
      }
      const item = Array.from(e.clipboardData?.items ?? []).find((i) => i.type.startsWith("image/"));
      const file = item?.getAsFile();
      if (file) {
        e.preventDefault();
        addImages([file]);
      }
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [addImages]);

  /* ---------- arrastrar y soltar ---------- */
  useEffect(() => {
    const hasFiles = (e: DragEvent) => Array.from(e.dataTransfer?.types ?? []).includes("Files");
    const onDragOver = (e: DragEvent) => {
      if (!hasFiles(e)) return;
      e.preventDefault();
      setDragActive(true);
    };
    const onDragLeave = (e: DragEvent) => {
      if (e.relatedTarget === null) setDragActive(false);
    };
    const onDrop = (e: DragEvent) => {
      if (!hasFiles(e)) return;
      e.preventDefault();
      setDragActive(false);
      addImages(Array.from(e.dataTransfer?.files ?? []));
    };
    window.addEventListener("dragover", onDragOver);
    window.addEventListener("dragleave", onDragLeave);
    window.addEventListener("drop", onDrop);
    return () => {
      window.removeEventListener("dragover", onDragOver);
      window.removeEventListener("dragleave", onDragLeave);
      window.removeEventListener("drop", onDrop);
    };
  }, [addImages]);

  /* ---------- teclado: navegar carrusel ---------- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (modalOpen || localOpen) return;
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.key === "ArrowRight") setActiveIndex((p) => Math.min(p + 1, images.length - 1));
      else setActiveIndex((p) => Math.max(0, p - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen, localOpen, images.length]);

  /* ---------- marcos (con puerta PRO) ---------- */
  const onPickFrame = useCallback(
    (id: string) => {
      const meta = frameById(id);
      if (meta?.pro && !licensed) {
        setModalOpen(true);
        push("info", `«${meta.name}» es un marco PRO — activa tu licencia`);
        return;
      }
      onSettings({ frame: id });
    },
    [licensed, onSettings, push]
  );

  const onRandom = useCallback(() => {
    const pool = ["meme", "polaroid", "comic", "retro", "tabloid", "vhs", "wanted", "neon", "arcade", "ticket", "gameover", "caution"];
    const frame = pool[Math.floor(Math.random() * pool.length)];
    const preset = BG_PRESETS[Math.floor(Math.random() * BG_PRESETS.length)];
    onSettings({ frame, rotate: [-6, -3, 0, 0, 0, 3, 6][Math.floor(Math.random() * 7)] });
    setBg({ kind: "preset", id: preset.id });
    push("info", `Marco «${frameById(frame)?.name}» + fondo «${preset.name}» al azar`);
  }, [onSettings, push]);

  const onReset = useCallback(() => {
    setSettings({ ...DEFAULT_SETTINGS, texts: { ...DEFAULT_SETTINGS.texts } });
    push("info", "Ajustes restablecidos");
  }, [push]);

  /* ---------- exportación (nodo fuera de pantalla) ---------- */
  const [job, setJob] = useState<{ img: LoadedImage; merged: FrameSettings; kind: ExportKind } | null>(null);

  const finalize = useCallback(
    async (blob: Blob, kind: ExportKind, name: string): Promise<void> => {
      const needsConvert = kind === "jpg-hd" || kind === "webp-hd" || kind === "png-std";
      if (kind === "copy-hd") {
        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
        push("ok", "Imagen 4K copiada al portapapeles");
        return;
      }
      let out = blob;
      if (needsConvert) {
        const url = URL.createObjectURL(blob);
        const imgEl = await new Promise<HTMLImageElement>((res, rej) => {
          const el = new Image();
          el.onload = () => res(el);
          el.onerror = rej;
          el.src = url;
        });
        const c = document.createElement("canvas");
        c.width = imgEl.naturalWidth;
        c.height = imgEl.naturalHeight;
        const ctx = c.getContext("2d")!;
        if (kind === "jpg-hd") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, c.width, c.height);
        }
        ctx.drawImage(imgEl, 0, 0);
        if (kind === "png-std") {
          /* marca de agua pequeña en la esquina */
          const size = Math.max(15, Math.round(c.width * 0.013));
          ctx.font = `700 ${size}px "Instrument Sans", "Segoe UI", sans-serif`;
          ctx.textAlign = "right";
          ctx.textBaseline = "alphabetic";
          const pad = size * 1.1;
          const tx = c.width - pad;
          const ty = c.height - pad * 0.85;
          ctx.shadowColor = "rgba(0,0,0,0.55)";
          ctx.shadowBlur = size * 0.4;
          ctx.shadowOffsetY = Math.max(1, size * 0.06);
          ctx.fillStyle = "rgba(255,255,255,0.92)";
          ctx.fillText("ShotVibe", tx, ty);
          const tw = ctx.measureText("ShotVibe").width;
          ctx.shadowBlur = size * 0.25;
          ctx.fillStyle = "#f6bc55";
          ctx.save();
          ctx.translate(tx - tw - size * 0.85, ty - size * 0.34);
          const r = size * 0.5;
          ctx.beginPath();
          ctx.moveTo(0, -r);
          ctx.quadraticCurveTo(0, 0, r, 0);
          ctx.quadraticCurveTo(0, 0, 0, r);
          ctx.quadraticCurveTo(0, 0, -r, 0);
          ctx.quadraticCurveTo(0, 0, 0, -r);
          ctx.fill();
          ctx.restore();
        }
        const mime = kind === "jpg-hd" ? "image/jpeg" : kind === "webp-hd" ? "image/webp" : "image/png";
        out = await new Promise<Blob>((res) => c.toBlob((b) => res(b ?? blob), mime, 0.92));
        URL.revokeObjectURL(url);
      }
      const a = document.createElement("a");
      a.href = URL.createObjectURL(out);
      a.download = name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.setTimeout(() => URL.revokeObjectURL(a.href), 4000);
      push("ok", `Descargado ${name}`);
    },
    [push]
  );

  useEffect(() => {
    if (!job) return;
    let cancelled = false;
    const run = async () => {
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      const node = exportRef.current;
      if (!node || cancelled) return;
      try {
        const width = node.offsetWidth || 800;
        const target = job.kind === "png-std" ? 1920 : 3840;
        const scale = Math.min(target / width, 4);
        const blob = await domToBlob(node, { scale, backgroundColor: null });
        if (cancelled) return;
        if (!blob) throw new Error("raster");
        const base = slugify(job.img.name);
        const wpx = Math.round(width * scale);
        const ext = job.kind === "jpg-hd" ? "jpg" : job.kind === "webp-hd" ? "webp" : "png";
        const suffix = images.length > 1 ? `-foto${images.indexOf(job.img) + 1}` : "";
        await finalize(blob, job.kind, job.kind === "copy-hd" ? "" : `shotvibe-${base}${suffix}-${wpx}.${ext}`);
      } catch {
        if (!cancelled) push("err", "No se pudo exportar la imagen");
      } finally {
        if (!cancelled) {
          setExporting(null);
          setJob(null);
        }
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [job, finalize, images, push]);

  const startExport = useCallback(
    (kind: ExportKind) => {
      if (!activeImage) {
        push("err", "Añade una imagen primero");
        return;
      }
      if ((kind === "png-hd" || kind === "jpg-hd" || kind === "webp-hd" || kind === "copy-hd") && !licensed) {
        setModalOpen(true);
        return;
      }
      setExporting(kind);
      setJob({ img: activeImage, merged: mergedFor(activeImage), kind });
    },
    [activeImage, licensed, mergedFor, push]
  );

  const onExportStd = useCallback(() => startExport("png-std"), [startExport]);
  const onExportHd = useCallback(() => {
    if (!licensed) {
      setModalOpen(true);
      return;
    }
    startExport("png-hd");
  }, [licensed, startExport]);

  const onBatch = useCallback(async () => {
    if (images.length === 0) return;
    if (!licensed) {
      setModalOpen(true);
      return;
    }
    setExporting("batch");
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      setJob({ img, merged: mergedFor(img), kind: "png-hd" });
      await new Promise((r) => window.setTimeout(r, 900));
    }
    setExporting(null);
  }, [images, licensed, mergedFor]);

  /* ---------- licencia ---------- */
  const onUnlocked = useCallback(() => {
    setLicensed(true);
    try {
      localStorage.setItem(LS_LICENSE, "1");
    } catch {
      /* noop */
    }
    setModalOpen(false);
    push("ok", "Licencia PRO activada — ¡a exportar en 4K!");
  }, [push]);
  const revokeLicense = useCallback(() => {
    setLicensed(false);
    try {
      localStorage.removeItem(LS_LICENSE);
    } catch {
      /* noop */
    }
    push("info", "Licencia retirada");
  }, [push]);

  /* ---------- render ---------- */
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-page">
      {/* capas ambientales */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="animate-breathe absolute -top-36 right-[-8%] size-[520px] rounded-full blur-[120px]" style={{ background: "var(--sf-ambg)" }} />
        <div className="animate-breathe-slow absolute bottom-[-22%] left-[-6%] size-[460px] rounded-full blur-[110px]" style={{ background: "var(--sf-ambm)" }} />
        <div className="noise absolute inset-0" />
        {SPARKLES.map((s, i) => (
          <IconSparkle key={i} className={cn("animate-breathe absolute", i % 2 === 0 ? "text-acc/40" : "text-acc2/40")} style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDelay: s.delay }} />
        ))}
      </div>

      {/* cabecera */}
      <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-3 border-b border-line bg-panel/85 px-4 backdrop-blur-md">
        <span className="flex size-8 items-center justify-center rounded-lg bg-[#0b0e15] text-[17px] text-gold-400 shadow-inner">
          <IconWand />
        </span>
        <span className="font-display text-[17px] font-bold tracking-tight text-hi">
          ShotVibe <span className="font-semibold text-acc">Editor</span>
        </span>
        <span className="hidden rounded-full border border-line bg-elev px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-mid md:inline">
          110 marcos
        </span>

        <div className="ml-auto flex items-center gap-2">
          {/* exportación */}
          <button onClick={onExportStd} disabled={!activeImage || exporting !== null} title="PNG Full HD · incluye marca de agua pequeña" className="flex h-9 items-center gap-1.5 rounded-lg border border-mint-500/50 px-2.5 text-xs font-bold text-acc2 transition-all duration-150 hover:border-mint-400 hover:bg-mint-500/10 active:scale-95 disabled:pointer-events-none disabled:opacity-40 sm:px-3">
            {exporting === "png-std" ? <IconLoader className="animate-spin" /> : <IconDownload className="text-[14px]" />}
            <span>PNG</span>
            <span className="hidden rounded bg-mint-500/15 px-1 py-px text-[9px] font-extrabold tracking-[0.08em] lg:inline">FULL HD</span>
          </button>

          <button onClick={onExportHd} disabled={!activeImage || exporting !== null} title={licensed ? "PNG 4K · sin marca de agua" : "Descarga HD 4K · requiere licencia PRO"} className={cn("flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-xs font-extrabold transition-all duration-150 active:scale-95 disabled:pointer-events-none disabled:opacity-40 sm:px-3", licensed ? "bg-gold-400 text-[#17130a] shadow-[0_8px_24px_rgba(237,166,59,0.35)] hover:bg-gold-300" : "bg-gradient-to-b from-gold-400 to-gold-500 text-[#17130a] shadow-[0_8px_24px_rgba(237,166,59,0.28)] hover:from-gold-300 hover:to-gold-400")}>
            {exporting === "png-hd" ? <IconLoader className="animate-spin" /> : licensed ? <IconUnlock className="text-[14px]" /> : <IconLock className="text-[14px]" />}
            <span>HD 4K</span>
            <span className="hidden rounded bg-black/10 px-1 py-px text-[9px] font-black tracking-[0.12em] md:inline">PRO</span>
          </button>

          {licensed && (
            <div className="relative">
              <button onClick={() => setProMenu((o) => !o)} aria-label="Más opciones PRO" title="Más opciones PRO" className={cn("flex h-9 w-8 items-center justify-center rounded-lg border border-gold-500/40 bg-gold-400/10 text-[15px] font-black tracking-[0.2em] text-acc transition-all duration-150 hover:bg-gold-400/20 active:scale-95", proMenu && "bg-gold-400/25")}>
                ···
              </button>
              {proMenu && (
                <>
                  <button className="fixed inset-0 z-40 cursor-default" aria-label="Cerrar menú" onClick={() => setProMenu(false)} />
                  <div className="animate-pop absolute right-0 top-11 z-50 w-60 rounded-xl border border-line bg-panel p-1.5 shadow-2xl">
                    {([
                      ["jpg-hd", "JPG 4K", "3840px"],
                      ["webp-hd", "WebP 4K", "3840px"],
                    ] as const).map(([k, label, hint]) => (
                      <button key={k} onClick={() => { setProMenu(false); startExport(k); }} disabled={!activeImage || exporting !== null} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-xs font-bold text-hi transition-colors hover:bg-elev disabled:pointer-events-none disabled:opacity-40">
                        <IconDownload className="text-[15px] text-acc" /> {label}
                        <span className="ml-auto font-mono text-[10px] font-semibold text-low">{hint}</span>
                      </button>
                    ))}
                    <button onClick={() => { setProMenu(false); startExport("copy-hd"); }} disabled={!activeImage || exporting !== null} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-xs font-bold text-hi transition-colors hover:bg-elev disabled:pointer-events-none disabled:opacity-40">
                      <IconCopy className="text-[15px] text-acc" /> Copiar 4K
                      <span className="ml-auto text-[10px] font-semibold text-low">portapapeles</span>
                    </button>
                    <div className="my-1 h-px bg-line" />
                    <button onClick={() => { setProMenu(false); void onBatch(); }} disabled={images.length === 0 || exporting !== null} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-xs font-bold text-hi transition-colors hover:bg-elev disabled:pointer-events-none disabled:opacity-40">
                      <IconFilm className="text-[15px] text-acc2" /> Exportar carrusel
                      <span className="ml-auto font-mono text-[10px] font-semibold text-low">{images.length} {images.length === 1 ? "foto" : "fotos"}</span>
                    </button>
                    <p className="px-3 pb-1.5 pt-2 text-[10px] text-low">Sin marca de agua · máxima resolución</p>
                  </div>
                </>
              )}
            </div>
          )}

          <span className="hidden h-6 w-px bg-line sm:block" />

          {/* app local */}
          <button onClick={() => setLocalOpen(true)} aria-label="Descargar app local" title="Llevarte ShotVibe como app local" className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-elev text-[16px] text-mid transition-all duration-150 hover:border-mint-400/70 hover:text-acc2 active:scale-95">
            <IconPackage />
          </button>

          {/* selector de tema */}
          <div className="relative flex rounded-full border border-line bg-elev p-1" role="group" aria-label="Cambiar tema">
            <span aria-hidden="true" className={cn("absolute left-1 top-1 size-7 rounded-full bg-panel shadow-md transition-transform duration-300 ease-out", theme === "dark" && "translate-x-7")} />
            <button onClick={() => setTheme("light")} aria-label="Tema claro" title="Tema claro" className={cn("relative z-10 flex size-7 items-center justify-center rounded-full text-[15px] transition-colors duration-200", theme === "light" ? "text-acc" : "text-low hover:text-mid")}>
              <IconSun />
            </button>
            <button onClick={() => setTheme("dark")} aria-label="Tema oscuro" title="Tema oscuro" className={cn("relative z-10 flex size-7 items-center justify-center rounded-full text-[15px] transition-colors duration-200", theme === "dark" ? "text-acc" : "text-low hover:text-mid")}>
              <IconMoon />
            </button>
          </div>

          <span className="hidden h-6 w-px bg-line sm:block" />

          {licensed ? (
            <div className="flex items-center gap-1 rounded-full border border-gold-500/40 bg-gold-400/15 py-1 pl-3 pr-1.5">
              <IconCrown className="text-[14px] text-acc" />
              <span className="text-xs font-bold text-acc">PRO activo</span>
              <button onClick={revokeLicense} aria-label="Retirar licencia" title="Retirar licencia" className="ml-0.5 flex size-5 items-center justify-center rounded-full text-[11px] text-mid transition-colors hover:bg-gold-400/20 hover:text-acc">
                <IconX />
              </button>
            </div>
          ) : (
            <button onClick={() => setModalOpen(true)} className="flex items-center gap-1.5 rounded-full border border-gold-500/50 bg-gold-400/10 px-3.5 py-1.5 text-xs font-bold text-acc transition-all duration-150 hover:bg-gold-400/20 hover:shadow-[0_6px_20px_rgba(237,166,59,0.25)] active:scale-95">
              <IconLock className="text-[13px]" /> Desbloquear PRO
            </button>
          )}
        </div>
      </header>

      {/* cuerpo */}
      <main className="relative z-10 mx-auto flex w-full max-w-[1700px] flex-1 flex-col overflow-hidden lg:flex-row">
        <ControlPanel
          bg={bg}
          onBg={setBg}
          settings={settings}
          onSettings={onSettings}
          photo={effSettings}
          onPhoto={onPhoto}
          onApplyToAll={onApplyToAll}
          images={images}
          activeIndex={activeIndex}
          onActive={setActiveIndex}
          onRemoveAt={removeAt}
          onReorder={reorderImages}
          samples={samples}
          onPickFiles={onPickFiles}
          onSample={onSample}
          selectedStickerId={selectedStickerId}
          onSelectSticker={setSelectedStickerId}
          onAddSticker={onAddSticker}
          onUpdateSticker={onUpdateSticker}
          onRemoveSticker={onRemoveSticker}
          onDuplicateSticker={onDuplicateSticker}
          onClearStickers={onClearStickers}
          onPickFrame={onPickFrame}
          licensed={licensed}
          onReset={onReset}
          onRandom={onRandom}
        />
        <section className="order-1 min-h-[42vh] flex-1 lg:order-2 lg:min-h-0">
          <Stage
            images={images}
            activeIndex={activeIndex}
            onActive={setActiveIndex}
            onRemoveAt={removeAt}
            onReorder={reorderImages}
            settings={effSettings}
            bgCss={bgCss}
            shadowCss={shadowCss}
            stageRef={stageRef}
            dragActive={dragActive}
            samples={samples}
            onPickFiles={onPickFiles}
            onSample={onSample}
            selectedStickerId={selectedStickerId}
            onSelectSticker={setSelectedStickerId}
            onMoveSticker={onMoveSticker}
          />
        </section>
      </main>

      {/* nodo de exportación fuera de pantalla */}
      {job && (
        <div aria-hidden="true" style={{ position: "fixed", left: -10000, top: 0, zIndex: -1 }}>
          <div ref={exportRef} style={{ background: bgCss, padding: settings.padding, width: "max-content", maxWidth: 1020 }}>
            <div style={{ position: "relative" }}>
              <FramedImage image={job.img} settings={job.merged} shadowCss={shadowCss} />
              <StickerLayer items={job.merged.stickers} selectedId={null} onSelect={() => {}} onMove={() => {}} />
            </div>
          </div>
        </div>
      )}

      {/* pie de privacidad */}
      <footer className="relative z-10 flex h-7 shrink-0 items-center justify-center gap-1.5 border-t border-line bg-page/85 px-4 text-center text-[10px] text-low">
        <IconShield className="shrink-0 text-[11px] text-acc2" />
        <span>
          Todo el procesamiento ocurre localmente
          <br className="sm:hidden" /> en tu navegador
        </span>
      </footer>

      <Toasts items={toasts} onDismiss={(id) => setToasts((t) => t.filter((x) => x.id !== id))} />
      <LicenseModal open={modalOpen} onClose={() => setModalOpen(false)} onUnlocked={onUnlocked} />
      <LocalAppModal open={localOpen} onClose={() => setLocalOpen(false)} onToast={(k, m) => push(k, m)} />
    </div>
  );
}
