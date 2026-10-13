/* Utilidades de dibujo compartidas por la paella del hero y las ilustraciones de platos. */

/* Generador pseudoaleatorio con semilla (mulberry32): el mismo seed da siempre el mismo dibujo. */
function rng(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Círculo/elipse rellena, con rotación y escala opcionales. */
function blob(ctx, x, y, r, col, rot = 0, sx = 1, sy = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.scale(sx, sy);
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, 7);
  ctx.fillStyle = col;
  ctx.fill();
  ctx.restore();
}

/* Punto aleatorio uniforme dentro de un círculo de radio r. */
function inCircle(R, r) {
  const a = R() * Math.PI * 2;
  const d = Math.sqrt(R()) * r;
  return [Math.cos(a) * d, Math.sin(a) * d];
}

/* n granos de arroz/cuscús repartidos en un círculo. */
function grains(ctx, R, cx, cy, rad, n, cols, len) {
  for (let i = 0; i < n; i++) {
    const [x, y] = inCircle(R, rad);
    ctx.save();
    ctx.translate(cx + x, cy + y);
    ctx.rotate(R() * 7);
    ctx.beginPath();
    ctx.ellipse(0, 0, len, len * .42, 0, 0, 7);
    ctx.fillStyle = cols[(R() * cols.length) | 0];
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,.25)";
    ctx.beginPath();
    ctx.ellipse(-len * .2, -len * .12, len * .45, len * .14, 0, 0, 7);
    ctx.fill();
    ctx.restore();
  }
}

/* Activa/desactiva una sombra suave para los ingredientes. */
function shadow(ctx, on) {
  if (on) {
    ctx.shadowColor = "rgba(60,20,0,.35)";
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 2;
  } else {
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;
  }
}
