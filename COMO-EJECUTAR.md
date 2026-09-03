# ▶ Cómo ejecutar ShotVibe Editor

La app ya está **compilada** y todas las dependencias instaladas. Tienes dos formas de ejecutarla:

---

## Opción A — Carpeta `dist/` (compilación estándar)

El build de producción vive en `dist/` (`index.html` + `assets/`).

```bash
# servir con cualquier servidor estático, por ejemplo:
npx serve dist
# o
python -m http.server 8080 --directory dist
```

Abre la URL que te indique (p. ej. `http://localhost:8080`).

> ⚠️ `dist/` usa rutas absolutas, así que necesita servirse (no abrir el archivo directamente).
> Para doble clic sin servidor, usa la Opción B.

---

## Opción B — Un solo archivo HTML (recomendada) ⭐

Convierte la compilación en **un único `shotvibe-editor.html`** que funciona con doble clic,
sin servidor, sin instalación y sin internet (las tipografías de Google son opcionales;
sin conexión se usan las del sistema).

```bash
# 1. compila (solo necesario si cambiaste el código; ya está hecho)
npm run build

# 2. genera el archivo único
node scripts/make-single-file.mjs
```

El script incrusta estilos, scripts e iconos dentro del HTML y crea en la raíz del proyecto:

| Archivo | Qué es |
|---|---|
| `shotvibe-editor.html` | **La app completa en un solo archivo** — doble clic y funciona |
| `iniciar-shotvibe.bat` | Lanzador para Windows (doble clic) |
| `iniciar-shotvibe.command` | Lanzador para macOS / Linux |

Puedes copiar `shotvibe-editor.html` a un USB, enviarlo por correo o guardarlo donde
quieras: es 100% autónomo.

---

## Notas

- **Todo el procesamiento es local**: las fotos, ajustes y exportaciones nunca salen de tu equipo.
- La licencia PRO demo es `DEMO123` (se guarda en el navegador).
- Si el navegador bloquea algo al abrir por `file://`, usa la Opción A.
