/* Ingredientes y vajilla dibujados en canvas. Código de dibujo compacto a propósito. */

/* Gamba curvada con antenas */
function prawn(ctx,x,y,s,rot){
  ctx.save();ctx.translate(x,y);ctx.rotate(rot);shadow(ctx,1);
  for(let i=0;i<6;i++){const a=i*0.42,r=s*(1-i*.11);ctx.beginPath();
    ctx.arc(Math.cos(a)*s*.9,Math.sin(a)*s*.9,r*.42,0,7);ctx.fillStyle=i%2?"#ff6a3d":"#ff8352";ctx.fill()}
  shadow(ctx,0);ctx.strokeStyle="rgba(255,240,220,.7)";ctx.lineWidth=s*.06;
  for(let i=0;i<5;i++){const a=i*0.42+.2;ctx.beginPath();ctx.arc(0,0,s*.9,a-.12,a+.05);ctx.stroke()}
  ctx.fillStyle="#e2401f";ctx.beginPath();ctx.moveTo(Math.cos(2.4)*s*.9,Math.sin(2.4)*s*.9);
  ctx.lineTo(Math.cos(2.4)*s*1.3-s*.2,Math.sin(2.4)*s*1.3+s*.3);ctx.lineTo(Math.cos(2.4)*s*.9+s*.3,Math.sin(2.4)*s*.9+s*.3);ctx.fill();
  ctx.strokeStyle="#c0391b";ctx.lineWidth=s*.04;ctx.beginPath();ctx.moveTo(s*.9,0);ctx.quadraticCurveTo(s*1.6,-s*.6,s*2.1,-s*.2);ctx.stroke();
  ctx.beginPath();ctx.moveTo(s*.9,0);ctx.quadraticCurveTo(s*1.7,-s*.2,s*2.2,s*.3);ctx.stroke();
  blob(ctx,s*.95,-s*.15,s*.08,"#1a0d08");ctx.restore()}

/* Mejillón abierto */
function mussel(ctx,x,y,s,rot){
  ctx.save();ctx.translate(x,y);ctx.rotate(rot);shadow(ctx,1);
  ctx.beginPath();ctx.ellipse(0,0,s,s*.55,0,0,7);const g=ctx.createLinearGradient(-s,0,s,0);g.addColorStop(0,"#1b1a26");g.addColorStop(.6,"#3a3550");g.addColorStop(1,"#14131c");ctx.fillStyle=g;ctx.fill();shadow(ctx,0);
  ctx.beginPath();ctx.ellipse(s*.05,0,s*.72,s*.36,0,0,7);ctx.fillStyle="#f29a52";ctx.fill();
  ctx.beginPath();ctx.ellipse(-s*.1,-s*.05,s*.4,s*.16,0,0,7);ctx.fillStyle="#ffc085";ctx.fill();
  ctx.strokeStyle="rgba(255,255,255,.18)";ctx.lineWidth=s*.05;ctx.beginPath();ctx.ellipse(0,0,s*.93,s*.5,0,3.6,5.6);ctx.stroke();ctx.restore()}

/* Gajo de limón */
function lemon(ctx,x,y,s,rot){
  ctx.save();ctx.translate(x,y);ctx.rotate(rot);shadow(ctx,1);
  ctx.beginPath();ctx.moveTo(-s,0);ctx.quadraticCurveTo(0,-s*1.05,s,0);ctx.closePath();ctx.fillStyle="#f5d53b";ctx.fill();shadow(ctx,0);
  ctx.beginPath();ctx.moveTo(-s*.82,-s*.04);ctx.quadraticCurveTo(0,-s*.86,s*.82,-s*.04);ctx.closePath();ctx.fillStyle="#fff2a6";ctx.fill();
  ctx.strokeStyle="#f2d54a";ctx.lineWidth=s*.05;for(let i=-2;i<=2;i++){ctx.beginPath();ctx.moveTo(0,-s*.02);ctx.lineTo(i*s*.32,-s*.55+Math.abs(i)*s*.12);ctx.stroke()}
  ctx.restore()}

/* Trozo de pollo dorado e irregular */
function chickenPiece(ctx,R,x,y,s){
  ctx.save();ctx.translate(x,y);ctx.rotate(R()*7);shadow(ctx,1);ctx.beginPath();
  for(let i=0;i<8;i++){const a=i/8*Math.PI*2,r=s*(.75+R()*.35);ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r*.8)}
  ctx.closePath();const g=ctx.createRadialGradient(-s*.3,-s*.3,1,0,0,s*1.2);g.addColorStop(0,"#e9b06a");g.addColorStop(1,"#a8591f");ctx.fillStyle=g;ctx.fill();shadow(ctx,0);
  for(let i=0;i<4;i++)blob(ctx,(R()-.5)*s,(R()-.5)*s*.8,s*.12,"rgba(90,40,10,.35)");ctx.restore()}

/* Tira de pimiento rojo */
function pepperStrip(ctx,R,x,y,s){ctx.save();ctx.translate(x,y);ctx.rotate(R()*7);shadow(ctx,1);ctx.beginPath();ctx.roundRect(-s,-s*.16,s*2,s*.32,s*.16);ctx.fillStyle="#e8261c";ctx.fill();shadow(ctx,0);ctx.fillStyle="rgba(255,255,255,.35)";ctx.fillRect(-s*.8,-s*.1,s*1.4,s*.06);ctx.restore()}

/* Guisante */
function pea(ctx,x,y,s){const g=ctx.createRadialGradient(x-s*.3,y-s*.3,0,x,y,s);g.addColorStop(0,"#b6e36a");g.addColorStop(1,"#4c8f22");ctx.beginPath();ctx.arc(x,y,s,0,7);ctx.fillStyle=g;ctx.fill()}

/* Garbanzo */
function chickpea(ctx,x,y,s){const g=ctx.createRadialGradient(x-s*.3,y-s*.3,0,x,y,s);g.addColorStop(0,"#f6dca0");g.addColorStop(1,"#c99a52");ctx.beginPath();ctx.arc(x,y,s,0,7);ctx.fillStyle=g;ctx.fill();ctx.strokeStyle="rgba(120,80,30,.4)";ctx.lineWidth=1;ctx.beginPath();ctx.arc(x+s*.2,y-s*.1,s*.5,1,2.6);ctx.stroke()}

/* Dado de verdura/queso */
function cube(ctx,R,x,y,s,col){ctx.save();ctx.translate(x,y);ctx.rotate(R()*7);shadow(ctx,1);ctx.shadowBlur=3;ctx.fillStyle=col;ctx.beginPath();ctx.roundRect(-s/2,-s/2,s,s,s*.2);ctx.fill();shadow(ctx,0);ctx.fillStyle="rgba(255,255,255,.3)";ctx.fillRect(-s*.35,-s*.35,s*.4,s*.15);ctx.restore()}

/* Plato llano visto desde arriba */
function plate(ctx,cx,cy,r,col="#fffaf3",rim="#eadccd"){shadow(ctx,1);ctx.shadowBlur=18;ctx.beginPath();ctx.arc(cx,cy,r,0,7);ctx.fillStyle=rim;ctx.fill();shadow(ctx,0);ctx.beginPath();ctx.arc(cx,cy,r*.93,0,7);ctx.fillStyle=col;ctx.fill();ctx.beginPath();ctx.arc(cx,cy,r*.72,0,7);ctx.fillStyle="rgba(0,0,0,.03)";ctx.fill()}

/* Cuenco hondo visto desde arriba */
function bowl(ctx,cx,cy,r,col){shadow(ctx,1);ctx.shadowBlur=18;ctx.beginPath();ctx.arc(cx,cy,r,0,7);ctx.fillStyle=col;ctx.fill();shadow(ctx,0);ctx.beginPath();ctx.arc(cx,cy,r*.86,0,7);ctx.fillStyle="rgba(0,0,0,.12)";ctx.fill()}
