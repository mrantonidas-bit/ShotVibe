import { useState } from "react";
import { buildStandaloneHtml, downloadText, LAUNCHER_BAT, LAUNCHER_COMMAND } from "../lib/standalone";
import { IconDownload, IconExternal, IconLoader, IconPackage, IconShield, IconX } from "./Icons";

export function LocalAppModal({ open, onClose, onToast }: { open: boolean; onClose: () => void; onToast: (kind: "ok" | "err", msg: string) => void }) {
  const [packing, setPacking] = useState(false);
  if (!open) return null;

  const buildHtml = async () => {
    setPacking(true);
    try {
      const html = await buildStandaloneHtml();
      downloadText("shotvibe-editor.html", html, "text/html");
      onToast("ok", "shotvibe-editor.html descargado — ábrelo con doble clic");
    } catch {
      onToast("err", "No se pudo empaquetar la app en este entorno");
    } finally {
      setPacking(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="animate-fade absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="animate-pop relative w-full max-w-md overflow-hidden rounded-2xl border border-line2 bg-panel p-7 shadow-[0_40px_120px_rgba(0,0,0,0.6)] sm:p-8">
        <div className="pointer-events-none absolute -top-24 left-1/2 size-64 -translate-x-1/2 rounded-full bg-mint-400/10 blur-3xl" />
        <button onClick={onClose} aria-label="Cerrar" className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-lg text-mid transition-colors hover:bg-elev hover:text-hi">
          <IconX />
        </button>

        <div className="relative">
          <div className="mb-5 flex justify-center">
            <span className="flex size-16 items-center justify-center rounded-2xl border border-mint-400/40 bg-mint-400/10 text-[26px] text-acc2">
              <IconPackage />
            </span>
          </div>

          <div className="text-center">
            <h2 className="font-display text-2xl font-bold text-hi">Llévate ShotVibe contigo</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-mid">
              Empaqueta toda la aplicación en <b className="text-hi">un solo archivo HTML</b> que funciona con doble
              clic, sin servidor ni instalación. Tus fotos nunca salen de tu equipo.
            </p>
          </div>

          <ol className="mt-5 space-y-1.5">
            {[
              "Descarga shotvibe-editor.html",
              "Guárdalo donde quieras (escritorio, USB…)",
              "Ábrelo con tu navegador — listo",
            ].map((s, i) => (
              <li key={s} className="flex items-center gap-2.5 text-[13px] text-mid">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-mint-400/15 font-mono text-[11px] font-bold text-acc2">{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>

          <div className="mt-5 space-y-2.5">
            <button onClick={buildHtml} disabled={packing} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-mint-500 text-sm font-extrabold text-[#05201b] shadow-[0_12px_32px_rgba(35,184,159,0.35)] transition-all duration-150 hover:bg-mint-400 active:scale-[0.98] disabled:opacity-60">
              {packing ? <IconLoader className="animate-spin" /> : <IconDownload />}
              {packing ? "Empaquetando la aplicación…" : "Descargar ShotVibe (HTML único)"}
            </button>
            <div className="grid grid-cols-2 gap-2.5">
              <button onClick={() => { downloadText("iniciar-shotvibe.bat", LAUNCHER_BAT); onToast("ok", "Lanzador de Windows descargado"); }} className="flex h-10 items-center justify-center gap-2 rounded-xl border border-line2 text-[13px] font-bold text-hi transition-all hover:border-mint-400/70 hover:text-acc2 active:scale-[0.97]">
                <IconExternal /> Lanzador Windows
              </button>
              <button onClick={() => { downloadText("iniciar-shotvibe.command", LAUNCHER_COMMAND); onToast("ok", "Lanzador macOS/Linux descargado"); }} className="flex h-10 items-center justify-center gap-2 rounded-xl border border-line2 text-[13px] font-bold text-hi transition-all hover:border-mint-400/70 hover:text-acc2 active:scale-[0.97]">
                <IconExternal /> Lanzador macOS
              </button>
            </div>
          </div>

          <p className="mt-4 text-center text-[11px] leading-relaxed text-low">
            Coloca el lanzador junto al HTML y haz doble clic en él. Las tipografías se descargan de Google Fonts la
            primera vez; sin internet, la app usa las del sistema.
          </p>

          <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-low">
            <IconShield className="text-acc2" /> El empaquetado ocurre en tu navegador — nada se sube a ningún servidor.
          </p>
        </div>
      </div>
    </div>
  );
}
