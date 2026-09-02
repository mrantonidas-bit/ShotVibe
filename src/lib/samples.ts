/* Imágenes de ejemplo generadas proceduralmente con <canvas>. 100% local. */

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rad = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rad, y);
  ctx.arcTo(x + w, y, x + w, y + h, rad);
  ctx.arcTo(x + w, y + h, x, y + h, rad);
  ctx.arcTo(x, y + h, x, y, rad);
  ctx.arcTo(x, y, x + w, y, rad);
  ctx.closePath();
}

function star(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string, alpha = 1) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y - r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.quadraticCurveTo(x, y, x, y + r);
  ctx.quadraticCurveTo(x, y, x - r, y);
  ctx.quadraticCurveTo(x, y, x, y - r);
  ctx.fill();
  ctx.restore();
}

export function makeDashboardSample(): string {
  const W = 1600, H = 1000;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#0d1322";
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = "#111a2e";
  ctx.fillRect(0, 0, 250, H);
  ctx.fillStyle = "#eda63b";
  ctx.beginPath(); ctx.arc(52, 58, 15, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#0d1322";
  ctx.beginPath(); ctx.arc(52, 58, 6.5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#e8ecf6";
  ctx.font = "700 23px sans-serif";
  ctx.fillText("Nova Analytics", 80, 66);

  [136, 194, 252, 310, 368].forEach((y, i) => {
    if (i === 0) {
      ctx.fillStyle = "#1b2a4a"; rr(ctx, 20, y, 210, 44, 12); ctx.fill();
      ctx.fillStyle = "#2dd4bf"; rr(ctx, 20, y + 8, 4, 28, 2); ctx.fill();
    }
    ctx.fillStyle = i === 0 ? "#7fe8d8" : "#55648a";
    rr(ctx, 42, y + 14, 16, 16, 4); ctx.fill();
    ctx.fillStyle = i === 0 ? "#dde6f5" : "#44527a";
    rr(ctx, 72, y + 18, 88 + i * 10, 9, 4.5); ctx.fill();
  });

  ctx.fillStyle = "#0f1729";
  ctx.fillRect(250, 0, W - 250, 92);
  ctx.fillStyle = "#18233c"; rr(ctx, 292, 26, 330, 40, 20); ctx.fill();
  ctx.fillStyle = "#3d4c74"; rr(ctx, 348, 41, 120, 9, 4.5); ctx.fill();
  ctx.fillStyle = "#23b89f";
  ctx.beginPath(); ctx.arc(W - 66, 46, 19, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#0d1322";
  ctx.font = "700 17px sans-serif";
  ctx.fillText("AL", W - 75, 52);

  ctx.fillStyle = "#eef2fb";
  ctx.font = "700 40px sans-serif";
  ctx.fillText("Panel de ventas", 292, 168);
  ctx.fillStyle = "#7c89a6";
  ctx.font = "500 20px sans-serif";
  ctx.fillText("Resumen de los últimos 30 días", 292, 202);

  const stats = [
    { v: "€48,2K", d: "+12,4%", up: true },
    { v: "8.942", d: "+3,1%", up: true },
    { v: "2,4%", d: "−0,8%", up: false },
  ];
  stats.forEach((s, i) => {
    const x = 292 + i * 424;
    ctx.fillStyle = "#121a2c"; rr(ctx, x, 236, 392, 152, 18); ctx.fill();
    ctx.fillStyle = "#5b6a8f"; rr(ctx, x + 28, 264, 130, 10, 5); ctx.fill();
    ctx.fillStyle = "#f2f6ff"; ctx.font = "700 42px sans-serif"; ctx.fillText(s.v, x + 26, 336);
    ctx.fillStyle = s.up ? "rgba(45,212,191,0.16)" : "rgba(244,124,124,0.16)";
    rr(ctx, x + 28, 352, 92, 26, 13); ctx.fill();
    ctx.fillStyle = s.up ? "#2dd4bf" : "#f47c7c";
    ctx.font = "700 15px sans-serif"; ctx.fillText(s.d, x + 42, 370);
  });

  ctx.fillStyle = "#121a2c"; rr(ctx, 292, 420, 824, 544, 18); ctx.fill();
  ctx.fillStyle = "#eef2fb"; ctx.font = "700 24px sans-serif"; ctx.fillText("Ingresos", 324, 470);
  ctx.fillStyle = "#2dd4bf"; ctx.beginPath(); ctx.arc(956, 462, 6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#8d97af"; ctx.font = "500 15px sans-serif"; ctx.fillText("Este año", 970, 468);
  ctx.fillStyle = "#eda63b"; ctx.beginPath(); ctx.arc(1056, 462, 6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#8d97af"; ctx.fillText("Anterior", 1070, 468);

  const cx0 = 324, cx1 = 1084, cy0 = 510, cy1 = 900;
  ctx.strokeStyle = "rgba(255,255,255,0.06)";
  ctx.lineWidth = 1.5;
  for (let i = 0; i <= 4; i++) {
    const y = cy0 + ((cy1 - cy0) / 4) * i;
    ctx.beginPath(); ctx.moveTo(cx0, y); ctx.lineTo(cx1, y); ctx.stroke();
  }
  const vals = [0.72, 0.58, 0.66, 0.47, 0.55, 0.36, 0.44, 0.28, 0.34, 0.2, 0.24, 0.1];
  const px = (i: number) => cx0 + ((cx1 - cx0) / (vals.length - 1)) * i;
  const py = (v: number) => cy0 + (cy1 - cy0) * v;

  const grad = ctx.createLinearGradient(0, cy0, 0, cy1);
  grad.addColorStop(0, "rgba(45,212,191,0.3)");
  grad.addColorStop(1, "rgba(45,212,191,0)");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(px(0), cy1);
  vals.forEach((v, i) => ctx.lineTo(px(i), py(v)));
  ctx.lineTo(px(vals.length - 1), cy1);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "#2dd4bf"; ctx.lineWidth = 4.5; ctx.lineJoin = "round"; ctx.lineCap = "round";
  ctx.beginPath();
  vals.forEach((v, i) => (i === 0 ? ctx.moveTo(px(i), py(v)) : ctx.lineTo(px(i), py(v))));
  ctx.stroke();

  ctx.strokeStyle = "#eda63b"; ctx.lineWidth = 3.5;
  ctx.beginPath();
  vals.forEach((v, i) => {
    const y = py(Math.min(1, v + 0.16 + Math.sin(i * 1.7) * 0.03));
    i === 0 ? ctx.moveTo(px(i), y) : ctx.lineTo(px(i), y);
  });
  ctx.stroke();

  ctx.fillStyle = "#0d1322";
  ctx.beginPath(); ctx.arc(px(8), py(vals[8]), 11, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "#2dd4bf"; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.arc(px(8), py(vals[8]), 9, 0, Math.PI * 2); ctx.stroke();

  ctx.fillStyle = "#121a2c"; rr(ctx, 1148, 420, 412, 544, 18); ctx.fill();
  ctx.fillStyle = "#eef2fb"; ctx.font = "700 24px sans-serif"; ctx.fillText("Conversión", 1180, 470);
  const arc = (from: number, to: number, color: string) => {
    ctx.strokeStyle = color; ctx.lineWidth = 34; ctx.lineCap = "butt";
    ctx.beginPath();
    ctx.arc(1354, 640, 104, from * Math.PI * 2 - Math.PI / 2, to * Math.PI * 2 - Math.PI / 2);
    ctx.stroke();
  };
  arc(0, 1, "#22304f"); arc(0, 0.62, "#2dd4bf"); arc(0.62, 0.84, "#eda63b");
  ctx.fillStyle = "#f2f6ff"; ctx.font = "700 52px sans-serif"; ctx.textAlign = "center";
  ctx.fillText("62%", 1354, 658);
  ctx.textAlign = "left";

  [
    { w: 300, color: "#2dd4bf" },
    { w: 210, color: "#eda63b" },
    { w: 130, color: "#465273" },
  ].forEach((r, i) => {
    const y = 800 + i * 52;
    ctx.fillStyle = "#5b6a8f"; rr(ctx, 1180, y, 96, 10, 5); ctx.fill();
    ctx.fillStyle = "#22304f"; rr(ctx, 1180, y + 20, 348, 12, 6); ctx.fill();
    ctx.fillStyle = r.color; rr(ctx, 1180, y + 20, r.w, 12, 6); ctx.fill();
  });

  return c.toDataURL("image/png");
}

export function makeWallpaperSample(): string {
  const W = 1600, H = 1000;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const ctx = c.getContext("2d")!;

  const base = ctx.createLinearGradient(0, 0, W, H);
  base.addColorStop(0, "#131c2e");
  base.addColorStop(1, "#0a0f1b");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, W, H);

  const glow = (x: number, y: number, r: number, color: string) => {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, color);
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  };
  glow(1150, 260, 620, "rgba(45,212,191,0.34)");
  glow(420, 820, 560, "rgba(237,166,59,0.3)");
  glow(840, 520, 420, "rgba(37,99,235,0.18)");

  ctx.strokeStyle = "rgba(232,236,246,0.14)";
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(1150, 300, 220, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = "rgba(232,236,246,0.07)";
  ctx.beginPath(); ctx.arc(1150, 300, 300, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = "rgba(246,188,85,0.22)";
  ctx.beginPath(); ctx.arc(430, 780, 170, 0, Math.PI * 2); ctx.stroke();

  ctx.strokeStyle = "rgba(232,236,246,0.06)";
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.ellipse(800, 520, 640, 300, -0.28, 0, Math.PI * 2); ctx.stroke();

  ctx.fillStyle = "#f6bc55";
  ctx.beginPath(); ctx.arc(512, 306, 9, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#2dd4bf";
  ctx.beginPath(); ctx.arc(934, 706, 7, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "rgba(232,236,246,0.85)";
  ctx.beginPath(); ctx.arc(1340, 560, 5, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(300, 480, 4, 0, Math.PI * 2); ctx.fill();

  star(ctx, 1150, 300, 26, "#e8ecf6", 0.95);
  star(ctx, 430, 780, 20, "#f6bc55", 0.9);
  star(ctx, 700, 210, 13, "#2dd4bf", 0.85);
  star(ctx, 1260, 760, 12, "#e8ecf6", 0.6);
  star(ctx, 560, 560, 9, "#e8ecf6", 0.5);
  star(ctx, 1030, 130, 8, "#f6bc55", 0.6);

  return c.toDataURL("image/png");
}
