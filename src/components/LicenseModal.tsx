import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { cn } from "../lib/presets";
import { ProBenefitsPanel } from "./ProBenefits";
import { IconCrown, IconExternal, IconLoader, IconLock, IconShield, IconSparkle, IconUnlock, IconX } from "./Icons";

type Status = "idle" | "checking" | "ok" | "err";
const VALID_KEY = "DEMO123";

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
        color: ["#f6bc55", "#2dd4bf", "#f47c7c", "#e8ebf4"][i % 4],
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
      <div className="animate-fade absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => status !== "checking" && !ok && onClose()} />
      <div className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-2xl border border-line2 bg-panel p-7 shadow-[0_40px_120px_rgba(0,0,0,0.6)] sm:p-8">
        <div className={cn("pointer-events-none absolute -top-28 left-1/2 size-72 -translate-x-1/2 rounded-full blur-3xl", ok ? "bg-mint-500/20" : "bg-gold-400/15")} />
        <button onClick={onClose} disabled={status === "checking"} aria-label="Cerrar" className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-lg text-mid transition-colors hover:bg-elev hover:text-hi disabled:opacity-40">
          <IconX />
        </button>

        <div className="relative mb-5 flex justify-center">
          <div className={cn("relative flex size-16 items-center justify-center rounded-2xl border text-[26px] transition-all duration-500", ok ? "border-mint-500/40 bg-mint-500/10 text-acc2" : "border-gold-500/40 bg-gold-400/10 text-acc", status === "err" && "animate-wiggle")} style={{ animationName: status === "err" ? "shake" : undefined }}>
            {ok ? <IconUnlock /> : status === "checking" ? <IconLoader className="animate-spin" /> : <IconLock />}
            {ok &&
              particles.map((pt, i) => (
                <span key={`${burstKey}-${i}`} className="particle" style={{ "--dx": `${pt.dx}px`, "--dy": `${pt.dy}px`, "--rot": `${pt.rot}deg`, background: pt.color, animationDelay: `${pt.delay}s` } as CSSProperties} />
              ))}
          </div>
        </div>

        {ok ? (
          <div className="animate-pop relative text-center">
            <h2 className="font-display text-2xl font-bold text-hi">¡Licencia activada!</h2>
            <p className="mt-2 text-sm text-mid">
              La descarga <span className="font-semibold text-acc">HD 4K</span> y los 80 marcos PRO quedaron desbloqueados en este navegador.
            </p>
          </div>
        ) : (
          <div className="relative">
            <div className="text-center">
              <p className="mb-1 inline-flex items-center gap-1.5 rounded-full border border-gold-500/35 bg-gold-400/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.14em] text-acc">
                <IconCrown className="text-[13px]" /> ShotVibe PRO
              </p>
              <h2 className="font-display text-2xl font-bold leading-tight text-hi">Desbloquea todo el potencial</h2>
              <p className="mt-2 text-sm leading-relaxed text-mid">
                Exporta a <b className="text-hi">3840&nbsp;px</b> sin marca de agua y accede a los <b className="text-hi">80 marcos PRO</b> con tu clave de licencia.
              </p>
            </div>

            <div className="mt-6">
              <label htmlFor="license-key" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-low">Clave de licencia</label>
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
                className={cn(
                  "w-full rounded-xl border bg-page px-4 py-3 text-center font-mono text-base font-semibold uppercase tracking-[0.22em] text-hi placeholder:font-body placeholder:text-sm placeholder:font-normal placeholder:normal-case placeholder:tracking-normal placeholder:text-low focus:outline-none",
                  status === "err" ? "border-coral-500/70 focus:border-coral-400" : "border-line2 focus:border-gold-500/70"
                )}
              />
              {status === "err" && (
                <p className="animate-fade mt-2 text-center text-xs font-medium text-coral-500">
                  {value.trim() ? "Clave no válida. Revisa tu compra o usa la clave demo." : "Escribe una clave antes de validar."}
                </p>
              )}
              {status === "checking" && (
                <p className="animate-fade mt-2 flex items-center justify-center gap-2 text-center text-xs text-mid">
                  <IconLoader className="animate-spin text-acc" /> Consultando la licencia…
                </p>
              )}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <button onClick={() => validate("key")} disabled={status === "checking"} className="flex h-11 items-center justify-center gap-2 rounded-xl bg-gold-500 text-sm font-bold text-[#17130a] shadow-[0_10px_30px_rgba(237,166,59,0.3)] transition-all hover:bg-gold-400 active:scale-[0.97] disabled:opacity-60">
                {status === "checking" ? <IconLoader className="animate-spin" /> : <IconLock />} Validar clave
              </button>
              <button onClick={() => validate("gumroad")} disabled={status === "checking"} className="flex h-11 items-center justify-center gap-2 rounded-xl border border-line2 text-sm font-semibold text-hi transition-all hover:border-mint-400/70 hover:text-acc2 active:scale-[0.97] disabled:opacity-60">
                <IconExternal /> Validar con Gumroad
              </button>
            </div>

            <div className="mt-4">
              <ProBenefitsPanel />
            </div>

            <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-line bg-elev px-4 py-3">
              <IconSparkle className="mt-0.5 shrink-0 text-[15px] text-acc" />
              <p className="text-xs leading-relaxed text-mid">
                ¿Solo quieres probar? Escribe <kbd className="sm-kbd mx-0.5">DEMO123</kbd> y valida. Si quieres una licencia permanente,{" "}
                <a href="https://gumroad.com" target="_blank" rel="noreferrer" className="font-semibold text-acc2 underline-offset-2 hover:underline">consíguela en Gumroad</a>.
              </p>
            </div>

            <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[11px] text-low">
              <IconShield className="text-acc2" /> La validación ocurre 100% en tu navegador — nada se envía a servidores.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
