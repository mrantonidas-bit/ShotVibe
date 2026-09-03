#!/usr/bin/env node
/*
 * ─────────────────────────────────────────────────────────────────
 *  ShotVibe Editor · Generador de HTML único
 * ─────────────────────────────────────────────────────────────────
 *  Convierte la compilación (carpeta dist/) en UN SOLO archivo HTML
 *  que funciona con doble clic: sin servidor, sin instalación y sin
 *  conexión a internet (las tipografías de Google son opcionales;
 *  sin red se usan las del sistema).
 *
 *  Uso:
 *    1. npm run build                 (solo si cambiaste el código)
 *    2. node scripts/make-single-file.mjs
 *
 *  Genera en la raíz del proyecto:
 *    · shotvibe-editor.html          ← la app completa en un archivo
 *    · iniciar-shotvibe.bat          ← lanzador para Windows
 *    · iniciar-shotvibe.command      ← lanzador para macOS / Linux
 *
 *  Todo ocurre en tu equipo; nada se sube a ningún servidor.
 * ─────────────────────────────────────────────────────────────────
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const indexPath = join(dist, "index.html");

if (!existsSync(indexPath)) {
  console.error("✗ No se encontró dist/index.html.");
  console.error("  Compila primero con:  npm run build");
  process.exit(1);
}

let html = readFileSync(indexPath, "utf8");
let inlined = 0;

const readAsset = (href) => {
  const clean = href.replace(/^\//, "").split("?")[0];
  const full = join(dist, clean);
  return existsSync(full) ? readFileSync(full) : null;
};

/* 1 · estilos → <style> en línea */
html = html.replace(/<link[^>]+rel="stylesheet"[^>]*>/gi, (tag) => {
  const m = tag.match(/href="([^"]+)"/);
  const buf = m && readAsset(m[1]);
  if (!buf) return tag;
  inlined++;
  return `<style>${buf.toString("utf8")}</style>`;
});

/* 2 · scripts → <script> en línea */
html = html.replace(/<script[^>]+src="([^"]+)"[^>]*>\s*<\/script>/gi, (tag, src) => {
  const buf = readAsset(src);
  if (!buf) return tag;
  inlined++;
  return `<script type="module">${buf.toString("utf8")}</script>`;
});

/* 3 · precargas de módulos → ya no aplican, se eliminan */
html = html.replace(/<link[^>]+rel="modulepreload"[^>]*>/gi, () => {
  inlined++;
  return "";
});

/* 4 · iconos e imágenes locales → data-URL (base64) */
html = html.replace(/(href|src)="\/(?!\/)([^"]+)"/g, (tag, attr, path) => {
  const buf = readAsset("/" + path);
  if (!buf) return tag;
  const ext = path.split(".").pop().toLowerCase();
  const mime =
    ext === "svg" ? "image/svg+xml" :
    ext === "png" ? "image/png" :
    ext === "ico" ? "image/x-icon" :
    ext === "jpg" || ext === "jpeg" ? "image/jpeg" :
    ext === "webp" ? "image/webp" : null;
  if (!mime) return tag;
  inlined++;
  return `${attr}="data:${mime};base64,${buf.toString("base64")}"`;
});

const stamp = new Date().toLocaleString();
html =
  `<!-- ═══════════════════════════════════════════════════════════\n` +
  `     ShotVibe Editor · copia local autónoma\n` +
  `     Generada: ${stamp}\n` +
  `     Ábreme con doble clic — funciono sin servidor ni internet.\n` +
  `     ═══════════════════════════════════════════════════════════ -->\n` +
  html;

/* ── escribir resultados ── */
const outHtml = join(root, "shotvibe-editor.html");
writeFileSync(outHtml, html, "utf8");

writeFileSync(
  join(root, "iniciar-shotvibe.bat"),
  '@echo off\r\ntitle ShotVibe Editor\r\nstart "" "%~dp0shotvibe-editor.html"\r\nexit\r\n'
);

writeFileSync(
  join(root, "iniciar-shotvibe.command"),
  [
    "#!/bin/sh",
    'DIR="$(cd "$(dirname "$0")" && pwd)"',
    'if command -v open >/dev/null 2>&1; then',
    '  open "$DIR/shotvibe-editor.html"',
    'elif command -v xdg-open >/dev/null 2>&1; then',
    '  xdg-open "$DIR/shotvibe-editor.html"',
    "else",
    '  echo "Abre manualmente: $DIR/shotvibe-editor.html"',
    "fi",
    "",
  ].join("\n")
);

const kb = (Math.round((Buffer.byteLength(html) / 1024) * 10) / 10).toFixed(1);
console.log("─".repeat(56));
console.log("✓ Compilación encontrada en dist/");
console.log(`✓ ${inlined} recursos incrustados (estilos, scripts, iconos)`);
console.log(`✓ shotvibe-editor.html  →  raíz del proyecto (${kb} KB)`);
console.log("✓ iniciar-shotvibe.bat  (Windows)");
console.log("✓ iniciar-shotvibe.command  (macOS / Linux)");
console.log("─".repeat(56));
console.log("  Doble clic en shotvibe-editor.html y listo. 🎬");
