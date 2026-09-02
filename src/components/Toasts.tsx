import { cn } from "../lib/presets";
import { IconCheck, IconSparkle, IconX } from "./Icons";

export interface ToastItem {
  id: number;
  kind: "ok" | "err" | "info";
  msg: string;
}

export function Toasts({ items, onDismiss }: { items: ToastItem[]; onDismiss: (id: number) => void }) {
  return (
    <div className="pointer-events-none fixed right-4 top-16 z-[70] flex w-[min(340px,calc(100vw-2rem))] flex-col gap-2">
      {items.map((t) => (
        <button
          key={t.id}
          onClick={() => onDismiss(t.id)}
          className={cn(
            "animate-toast pointer-events-auto flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm shadow-2xl shadow-black/40 backdrop-blur-md transition-transform hover:scale-[1.02]",
            t.kind === "ok" && "border-mint-500/45 bg-panel/95 text-mint-400",
            t.kind === "err" && "border-coral-500/50 bg-panel/95 text-coral-400",
            t.kind === "info" && "border-line2 bg-panel/95 text-mid"
          )}
        >
          <span
            className={cn(
              "flex size-7 shrink-0 items-center justify-center rounded-full text-[15px]",
              t.kind === "ok" && "bg-mint-500/15",
              t.kind === "err" && "bg-coral-500/15",
              t.kind === "info" && "bg-gold-400/15 text-acc"
            )}
          >
            {t.kind === "ok" ? <IconCheck /> : t.kind === "err" ? <IconX /> : <IconSparkle />}
          </span>
          <span className="font-medium text-hi">{t.msg}</span>
        </button>
      ))}
    </div>
  );
}
