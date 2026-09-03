import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { cn } from "../lib/presets";
import { ProBenefitsPanel } from "./ProBenefits";
import { IconCrown, IconExternal, IconLoader, IconLock, IconShield, IconSparkle, IconUnlock, IconX } from "./Icons";

type Status = "idle" | "checking" | "ok" | "err";
const VALID_KEY = "DEMO123";

/* Paleta propia del modal: papel cálido + tinta, alto contraste en cualquier tema */
const INK = "#171c2b";
const PAPER = "#fffdf6";

export function LicenseModal({ open, onClose, onUnlocked }: { open: boolean; onClose: () => void; onUnlocked: (key: string) => void }) {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [shakeKey, setShakeKey] = useState(0);
  const [burstKey, setBurstKey] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (open) {
      setValue("");
      setStatus("idle");
      const t = window.setTimeout(() => inputRef.current?.focus(), 60);
      return () => window.clearTimeout(t);
    }
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && status !== "checking") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, status, onClose]);

  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        dx: Math.round(Math.random() * 300 - 150),
        dy: Math.round(Math.random() * 260 - 130),
        rot: Math.round(Math.random() * 320 - 160),
        delay: +(Math.random() * 0.12).toFixed(2),
        color: ["#f6bc55", "#2dd4bf", "#e05a5a", "#171c2b"][i % 4],
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [burstKey]
  );

  if (!open) return null;

  const validate = (method: "key" | "gumroad") => {
    if (status === "checking" || status === "ok") return;
    const key = value.trim();
    if (!key) {
      setStatus("err");
      setShakeKey((k) => k + 1);
      return;
    }
    setStatus("checking");
    timers.current.push(
      window.setTimeout(
        () => {
          if (key.toUpperCase() === VALID_KEY) {
            setStatus("ok");
            setBurstKey((k) => k + 1);
            timers.current.push(window.setTimeout(() => onUnlocked(key.toUpperCase()), 1250));
          } else {
            setStatus("err");
            setShakeKey((k) => k + 1);
          }
        },
        method === "gumroad" ? 1400 : 900
      )
    );
  };

  const ok = status === "ok";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="animate-fade absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => status !== "checking" && !ok && onClose()} />

      <div
        key={shakeKey}
        className={cn(
          "animate-pop relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-2xl shadow-[0_40px_120px_rgba(0,0,0,0.65)]",
          status === "err" && "animate-shake"
        )}
        style={{ background: PAPER, color: INK, border: `1px solid ${INK}` }}
      >
        {/* ---------- cabecera ---------- */}
        <div className="relative overflow-hidden px-7 pb-5 pt-6" style={{ background: INK }}>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-16 size-44 rounded-full opacity-25 blur-2xl"
            style={{ background: "#f6bc55" }}
          />
          <div className="relative flex items-center gap-3.5">
            <span
              className="flex size-12 shrink-0 items-center justify-center rounded-xl text-[22px]"
              style={{ background: "#f6bc55", color: INK, boxShadow: "0 6px 18px rgba(246,188,85,0.4)" }}
            >
              {ok ? <IconUnlock /> : status === "checking" ? <IconLoader className="animate-spin" /> : <IconLock />}
            </span>
            <span>
              <span className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.22em]" style={{ color: "#f6bc55" }}>
                <IconCrown className="text-[13px]" /> ShotVibe PRO
              </span>
              <span className="font-display mt-0.5 block text-[21px] font-bold leading-tight text-white">
                {ok ? "¡Licencia activada!" : "Desbloquea todo el potencial"}
              </span>
            </span>
          </div>
          {/* dientes de ticket */}
          <span aria-hidden="true" className="absolute -bottom-px left-0 right-0 flex justify-between px-2" style={{ height: 8 }}>
            {Array.from({ length: 24 }).map((_, i) => (
              <i key={i} className="size-2 rounded-t-full" style={{ background: PAPER }} />
            ))}
          </span>

          {ok &&
            particles.map((pt, i) => (
              <span
                key={`${burstKey}-${i}`}
                className="particle"
                style={{ "--dx": `${pt.dx}px`, "--dy": `${pt.dy}px`, "--rot": `${pt.rot}deg`, background: pt.color, animationDelay: `${pt.delay}s` } as CSSProperties}
              />
            ))}
        </div>

        <button
          onClick={onClose}
          disabled={status === "checking"}
          aria-label="Cerrar"
          className="absolute right-3.5 top-3.5 flex size-8 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-40"
        >
          <IconX />
        </button>

        {/* ---------- cuerpo ---------- */}
        <div className="px-7 pb-6 pt-5">
          {ok ? (
            <div className="animate-pop">
              <p className="text-sm font-medium leading-relaxed" style={{ color: "#3c4356" }}>
                La descarga <b style={{ color: INK }}>HD 4K</b> y los <b style={{ color: INK }}>70 marcos PRO</b> quedaron
                desbloqueados en este navegador. ¡A crear!
              </p>
              <div className="mt-4 flex items-center gap-2 rounded-xl px-4 py-3" style={{ background: "#e5f8f2", border: "1.5px solid #23b89f" }}>
                <IconShield className="shrink-0 text-[16px]" style={{ color: "#128a76" }} />
                <span className="text-[13px] font-bold" style={{ color: "#128a76" }}>
                  Licencia guardada en este equipo
                </span>
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm leading-relaxed" style={{ color: "#3c4356" }}>
                Exporta a <b style={{ color: INK }}>3840&nbsp;px</b> sin marca de agua y usa los{" "}
                <b style={{ color: INK }}>70 marcos PRO</b> con tu clave de licencia.
              </p>

              <div className="mt-5">
                <label htmlFor="license-key" className="mb-1.5 block text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: "#5a6172" }}>
                  Clave de licencia
                </label>
                <input
                  id="license-key"
                  ref={inputRef}
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value.toUpperCase());
                    if (status === "err") setStatus("idle");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && validate("key")}
                  placeholder="XXXX-XXXX-XXXX"
                  spellCheck={false}
                  autoComplete="off"
                  className="w-full rounded-xl bg-white px-4 py-3.5 text-center font-mono text-lg font-bold uppercase tracking-[0.22em] outline-none transition-all duration-150 placeholder:font-body placeholder:text-sm placeholder:font-normal placeholder:normal-case placeholder:tracking-normal"
                  style={{
                    color: INK,
                    border: `2px solid ${status === "err" ? "#e05a5a" : INK}`,
                    boxShadow: status === "err" ? "0 0 0 4px rgba(224,90,90,0.18)" : "0 2px 0 rgba(23,28,43,0.12)",
                    caretColor: "#c9832a",
                  }}
                />
                {status === "err" && (
                  <p className="animate-fade mt-2 flex items-center justify-center gap-1.5 text-center text-xs font-bold" style={{ color: "#c23a3a" }}>
                    <IconX className="text-[13px]" />
                    {value.trim() ? "Clave no válida. Revisa tu compra o usa la clave demo." : "Escribe una clave antes de validar."}
                  </p>
                )}
                {status === "checking" && (
                  <p className="animate-fade mt-2 flex items-center justify-center gap-2 text-center text-xs font-semibold" style={{ color: "#5a6172" }}>
                    <IconLoader className="animate-spin text-[14px]" style={{ color: "#c9832a" }} /> Consultando la licencia…
                  </p>
                )}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => validate("key")}
                  disabled={status === "checking"}
                  className="flex h-12 items-center justify-center gap-2 rounded-xl text-sm font-black transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(23,28,43,0.35)] active:translate-y-0 active:scale-[0.97] disabled:opacity-60"
                  style={{ background: INK, color: "#f6bc55" }}
                >
                  {status === "checking" ? <IconLoader className="animate-spin" /> : <IconLock />} Validar clave
                </button>
                <button
                  onClick={() => validate("gumroad")}
                  disabled={status === "checking"}
                  className="flex h-12 items-center justify-center gap-2 rounded-xl bg-white text-sm font-bold transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(23,28,43,0.18)] active:translate-y-0 active:scale-[0.97] disabled:opacity-60"
                  style={{ color: INK, border: `2px solid ${INK}` }}
                >
                  <IconExternal /> Validar con Gumroad
                </button>
              </div>

              <div className="mt-4">
                <ProBenefitsPanel />
              </div>

              <div className="mt-4 flex items-start gap-2.5 rounded-xl px-4 py-3" style={{ background: "#fdf3dc", border: "1.5px solid #e8cf9a" }}>
                <IconSparkle className="mt-0.5 shrink-0 text-[15px]" style={{ color: "#c9832a" }} />
                <p className="text-xs font-medium leading-relaxed" style={{ color: "#5c4a1e" }}>
                  ¿Solo quieres probar? Escribe{" "}
                  <kbd className="rounded-md border-b-2 px-1.5 py-0.5 font-mono text-[11px] font-black" style={{ background: "#fff", borderColor: INK, color: INK }}>
                    DEMO123
                  </kbd>{" "}
                  y valida. Si quieres una licencia permanente,{" "}
                  <a href="https://gumroad.com" target="_blank" rel="noreferrer" className="font-black underline underline-offset-2" style={{ color: "#128a76" }}>
                    consíguela en Gumroad
                  </a>
                  .
                </p>
              </div>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[11px] font-semibold" style={{ color: "#6b7280" }}>
                <IconShield style={{ color: "#128a76" }} /> La validación ocurre 100% en tu navegador — nada se envía a servidores.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
