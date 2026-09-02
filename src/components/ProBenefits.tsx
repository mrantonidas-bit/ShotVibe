import { IconCheck, IconCrown } from "./Icons";

export const PRO_BENEFITS = [
  "Los 70 marcos PRO (incluidos los 10 exclusivos)",
  "Exportación HD 4K en PNG, JPG y WebP",
  "Copiar al portapapeles en máxima resolución",
  "Exportar el carrusel completo de una sola vez",
  "Sin marca de agua en tus imágenes",
];

export function ProChecklist({ tone = "text-acc2" }: { tone?: string }) {
  return (
    <ul className="space-y-1.5">
      {PRO_BENEFITS.map((b) => (
        <li key={b} className="flex items-start gap-2 text-[11px] leading-snug text-mid">
          <IconCheck className={`mt-px shrink-0 text-[12px] ${tone}`} />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

export function ProBenefitsPanel() {
  return (
    <div className="rounded-xl border border-gold-500/30 bg-gold-400/5 p-3">
      <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-acc">
        <IconCrown className="text-[13px]" /> PRO incluye
      </p>
      <ProChecklist />
    </div>
  );
}
