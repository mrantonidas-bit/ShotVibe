/* Empaquetador: construye un HTML autónomo con toda la app inline.
   Funciona abriendo el archivo directamente (file://), sin servidor. */

export async function buildStandaloneHtml(): Promise<string> {
  const res = await fetch(window.location.href);
  if (!res.ok) throw new Error("fetch");
  const html = await res.text();
  const doc = new DOMParser().parseFromString(html, "text/html");

  /* inline estilos */
  for (const link of Array.from(doc.querySelectorAll('link[rel="stylesheet"]'))) {
    const href = link.getAttribute("href");
    if (!href) continue;
    try {
      const css = await fetch(new URL(href, window.location.href)).then((r) => r.text());
      const st = doc.createElement("style");
      st.textContent = css;
      link.replaceWith(st);
    } catch {
      /* se conserva el enlace original */
    }
  }

  /* inline scripts (como clásicos, para que funcionen desde file://) */
  for (const s of Array.from(doc.querySelectorAll("script[src]"))) {
    const src = s.getAttribute("src");
    if (!src) continue;
    try {
      const js = await fetch(new URL(src, window.location.href)).then((r) => r.text());
      const ns = doc.createElement("script");
      ns.textContent = js;
      s.replaceWith(ns);
    } catch {
      /* noop */
    }
  }

  doc.querySelectorAll("script").forEach((s) => {
    s.removeAttribute("crossorigin");
    s.removeAttribute("type");
  });

  const note = `<!-- ShotVibe Editor · copia local autónoma · generada el ${new Date().toLocaleString()} · abre este archivo directamente en tu navegador -->`;
  return `<!DOCTYPE html>\n${note}\n${doc.documentElement.outerHTML}`;
}

export const LAUNCHER_BAT = `@echo off\r\ntitle ShotVibe Editor\r\nstart "" "%~dp0shotvibe-editor.html"\r\nexit\r\n`;

export const LAUNCHER_COMMAND = `#!/bin/sh\nDIR="$(cd "$(dirname "$0")" && pwd)"\nif command -v open >/dev/null 2>&1; then\n  open "$DIR/shotvibe-editor.html"\nelif command -v xdg-open >/dev/null 2>&1; then\n  xdg-open "$DIR/shotvibe-editor.html"\nelse\n  echo "Abre manualmente: $DIR/shotvibe-editor.html"\nfi\n`;

export function downloadText(filename: string, content: string, mime = "text/plain") {
  const blob = new Blob([content], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
}
