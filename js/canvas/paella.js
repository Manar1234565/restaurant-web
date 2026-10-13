/* Paellera completa (hero e ilustración del plato) y animación giratoria del hero. */

/* Dibuja una paellera centrada en (cx, cy). detail < 1 reduce granos para miniaturas. */
function drawPaella(ctx,cx,cy,R0,seed,detail=1){
  const R=rng(seed);const pan=R0, food=R0*.86;
  // asas
  for(const a of [0,Math.PI]){ctx.save();ctx.translate(cx,cy);ctx.rotate(a);ctx.beginPath();ctx.ellipse(pan*1.06,0,pan*.12,pan*.07,0,0,7);ctx.lineWidth=pan*.035;ctx.strokeStyle="#2b2b30";ctx.stroke();ctx.restore()}
  // borde metálico
  let g=ctx.createRadialGradient(cx-pan*.3,cy-pan*.3,pan*.2,cx,cy,pan);g.addColorStop(0,"#5b5b62");g.addColorStop(.8,"#2e2e33");g.addColorStop(1,"#151518");
  ctx.beginPath();ctx.arc(cx,cy,pan,0,7);ctx.fillStyle=g;ctx.fill();
  ctx.beginPath();ctx.arc(cx,cy,pan*.94,0,7);ctx.fillStyle="#3c3a3a";ctx.fill();
  // base de arroz
  g=ctx.createRadialGradient(cx,cy,food*.1,cx,cy,food);g.addColorStop(0,"#f5b545");g.addColorStop(.75,"#e99a2c");g.addColorStop(.95,"#b86418");g.addColorStop(1,"#7a3c0d");
  ctx.beginPath();ctx.arc(cx,cy,food,0,7);ctx.fillStyle=g;ctx.fill();
  grains(ctx,R,cx,cy,food*.97,Math.round(5200*detail),["#ffcf6a","#f7b443","#eea235","#f9c25b","#e38d27","#ffd98a"],food*.03);
  // socarrat
  ctx.save();ctx.beginPath();ctx.arc(cx,cy,food,0,7);ctx.arc(cx,cy,food*.9,0,7,true);ctx.fillStyle="rgba(110,50,8,.35)";ctx.fill();ctx.restore();
  // ingredientes
  for(let i=0;i<40*detail;i++){const[x,y]=inCircle(R,food*.9);pea(ctx,cx+x,cy+y,food*.022)}
  for(let i=0;i<14;i++){const[x,y]=inCircle(R,food*.8);pepperStrip(ctx,R,cx+x,cy+y,food*.07)}
  for(let i=0;i<9;i++){const[x,y]=inCircle(R,food*.7);chickenPiece(ctx,R,cx+x,cy+y,food*.07)}
  for(let i=0;i<10;i++){const a=i/10*Math.PI*2+.3,d=food*.72;mussel(ctx,cx+Math.cos(a)*d,cy+Math.sin(a)*d,food*.085,a+Math.PI/2)}
  for(let i=0;i<7;i++){const a=i/7*Math.PI*2,d=food*.42;prawn(ctx,cx+Math.cos(a)*d,cy+Math.sin(a)*d,food*.085,a+1.2)}
  for(let i=0;i<4;i++){const a=i/4*Math.PI*2+.8,d=food*.15;lemon(ctx,cx+Math.cos(a)*d,cy+Math.sin(a)*d,food*.11,a)}
  // perejil
  for(let i=0;i<120*detail;i++){const[x,y]=inCircle(R,food*.9);blob(ctx,cx+x,cy+y,food*.008,"#3f8a2a",R()*7,1,.6)}
  // brillo
  g=ctx.createRadialGradient(cx-pan*.4,cy-pan*.45,0,cx-pan*.4,cy-pan*.45,pan*.8);g.addColorStop(0,"rgba(255,255,255,.18)");g.addColorStop(1,"rgba(255,255,255,0)");
  ctx.beginPath();ctx.arc(cx,cy,pan,0,7);ctx.fillStyle=g;ctx.fill();
}

/* Paella girando en el hero. Se pausa si no está en pantalla o la pestaña está oculta. */
function initHeroPaella() {
  const canvas = document.getElementById("paella");
  if (!canvas) return;

  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Se dibuja una sola vez en un canvas oculto; cada frame solo lo rota.
  const SIZE = 900;
  const source = document.createElement("canvas");
  source.width = source.height = SIZE;
  drawPaella(source.getContext("2d"), SIZE / 2, SIZE / 2, SIZE * .43, 7, 1);

  const ctx = canvas.getContext("2d");
  let cssSize = 0;
  let angle = 0;
  let last = 0;
  let running = false;
  let onScreen = true;

  function fit() {
    const w = canvas.clientWidth;
    if (w !== cssSize) {
      cssSize = w;
      canvas.width = canvas.height = w * dpr;
    }
  }

  function render() {
    fit();
    const w = canvas.width;
    ctx.clearRect(0, 0, w, w);
    ctx.save();
    ctx.translate(w / 2, w / 2);
    // sombra difusa bajo la paellera
    ctx.beginPath();
    ctx.ellipse(w * .02, w * .04, w * .47, w * .47, 0, 0, 7);
    ctx.fillStyle = "rgba(120,40,0,.18)";
    ctx.filter = "blur(" + (w * .02) + "px)";
    ctx.fill();
    ctx.filter = "none";
    ctx.rotate(angle);
    ctx.drawImage(source, -w / 2, -w / 2, w, w);
    ctx.restore();
  }

  function frame(t) {
    if (!running) return;
    const dt = last ? Math.min(50, t - last) : 16;
    last = t;
    angle += dt * 0.00012;
    render();
    requestAnimationFrame(frame);
  }

  function update() {
    const shouldRun = !reduceMotion && onScreen && !document.hidden;
    if (shouldRun && !running) {
      running = true;
      last = 0;
      requestAnimationFrame(frame);
    } else if (!shouldRun) {
      running = false;
    }
  }

  render();
  addEventListener("resize", () => { if (!running) render(); });
  document.addEventListener("visibilitychange", update);
  new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    update();
  }).observe(canvas);
}
