/* Ilustración de reserva de cada plato (se usa si su foto no carga).
   La clave debe coincidir con el id del plato en js/dishes.js. Firma: (ctx, ancho, alto, random). */
const ART={
 /* cuenco de sopa con dados de verdura */
 soup(ctx,w,h,R){const cx=w/2,cy=h/2,r=h*.4;bowl(ctx,cx,cy,r,"#c8562f");
   const g=ctx.createRadialGradient(cx-r*.2,cy-r*.2,0,cx,cy,r*.85);g.addColorStop(0,"#f2a24d");g.addColorStop(1,"#c7651f");ctx.beginPath();ctx.arc(cx,cy,r*.84,0,7);ctx.fillStyle=g;ctx.fill();
   for(let i=0;i<22;i++){const[x,y]=inCircle(R,r*.72);cube(ctx,R,cx+x,cy+y,r*.11,"#ff8a2a")}
   for(let i=0;i<14;i++){const[x,y]=inCircle(R,r*.72);cube(ctx,R,cx+x,cy+y,r*.09,"#9fcf5a")}
   for(let i=0;i<18;i++){const[x,y]=inCircle(R,r*.72);pea(ctx,cx+x,cy+y,r*.04)}
   for(let i=0;i<10;i++){const[x,y]=inCircle(R,r*.72);cube(ctx,R,cx+x,cy+y,r*.1,"#f3e3b8")}
   for(let i=0;i<30;i++){const[x,y]=inCircle(R,r*.75);blob(ctx,cx+x,cy+y,r*.012,"#2f6b1e")}},

 /* paellera pequeña, con menos detalle */
 paella(ctx,w,h){drawPaella(ctx,w/2,h/2,h*.42,3,.35)},

 /* arroz amarillo con pollo, guisantes y pimiento */
 chicken(ctx,w,h,R){const cx=w/2,cy=h/2,r=h*.42;plate(ctx,cx,cy,r);
   grains(ctx,R,cx,cy,r*.62,1400,["#ffd45a","#f6c13e","#ffe38a","#f0b230"],r*.035);
   for(let i=0;i<6;i++){const[x,y]=inCircle(R,r*.45);chickenPiece(ctx,R,cx+x,cy+y,r*.12)}
   for(let i=0;i<20;i++){const[x,y]=inCircle(R,r*.55);pea(ctx,cx+x,cy+y,r*.035)}
   for(let i=0;i<6;i++){const[x,y]=inCircle(R,r*.5);pepperStrip(ctx,R,cx+x,cy+y,r*.1)}},

 /* hamburguesa de perfil con gajos de boniato */
 burger(ctx,w,h,R){const cx=w/2,cy=h/2,r=h*.44;plate(ctx,cx,cy,r);
   for(let i=0;i<7;i++){const a=-.9+i*.3,x=cx+r*.18+Math.cos(a)*r*.5,y=cy+Math.sin(a)*r*.5;ctx.save();ctx.translate(x,y);ctx.rotate(a+1.6);shadow(ctx,1);ctx.beginPath();ctx.moveTo(-r*.22,0);ctx.quadraticCurveTo(0,-r*.14,r*.22,0);ctx.closePath();ctx.fillStyle="#f07a22";ctx.fill();shadow(ctx,0);ctx.strokeStyle="#9b3f12";ctx.lineWidth=r*.025;ctx.beginPath();ctx.moveTo(-r*.21,0);ctx.lineTo(r*.21,0);ctx.stroke();for(let k=0;k<4;k++)blob(ctx,(R()-.5)*r*.25,-r*.04,r*.008,"#3f6b25");ctx.restore()}
   const bx=cx-r*.28,by=cy;shadow(ctx,1);ctx.fillStyle="#e3a253";ctx.beginPath();ctx.roundRect(bx-r*.32,by+r*.12,r*.64,r*.12,r*.05);ctx.fill();shadow(ctx,0);
   ctx.fillStyle="#4c2715";ctx.beginPath();ctx.roundRect(bx-r*.34,by,r*.68,r*.13,r*.06);ctx.fill();
   for(let i=0;i<8;i++){ctx.strokeStyle="#2a120a";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(bx-r*.3+i*r*.08,by+r*.02);ctx.lineTo(bx-r*.27+i*r*.08,by+r*.11);ctx.stroke()}
   ctx.fillStyle="#e33b26";ctx.fillRect(bx-r*.33,by-r*.045,r*.66,r*.05);
   ctx.fillStyle="#7cc144";ctx.beginPath();ctx.moveTo(bx-r*.38,by-r*.02);for(let i=0;i<=10;i++)ctx.lineTo(bx-r*.38+i*r*.076,by-r*.02+(i%2?r*.05:-r*.01));ctx.lineTo(bx+r*.38,by-r*.06);ctx.lineTo(bx-r*.38,by-r*.06);ctx.fill();
   const g=ctx.createLinearGradient(0,by-r*.4,0,by-r*.05);g.addColorStop(0,"#f3b75e");g.addColorStop(1,"#c97a2c");ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(bx-r*.34,by-r*.06);ctx.quadraticCurveTo(bx-r*.34,by-r*.42,bx,by-r*.42);ctx.quadraticCurveTo(bx+r*.34,by-r*.42,bx+r*.34,by-r*.06);ctx.closePath();ctx.fill();
   for(let i=0;i<14;i++){const x=bx+(R()-.5)*r*.5,y=by-r*.3+(R()-.5)*r*.14;blob(ctx,x,y,r*.012,"#fff3d6",R()*3,1.6,1)}},

 /* arroz especiado con muslo de pollo, almendras y pasas */
 kabsa(ctx,w,h,R){const cx=w/2,cy=h/2,r=h*.44;plate(ctx,cx,cy,r,"#fff6ea");
   grains(ctx,R,cx,cy,r*.66,1500,["#e9923f","#d97a2e","#f2a85a","#c86a24","#f6bc77"],r*.04);
   ctx.save();ctx.translate(cx,cy-r*.05);ctx.rotate(-.5);shadow(ctx,1);ctx.shadowBlur=10;const g=ctx.createRadialGradient(-r*.1,-r*.1,2,0,0,r*.3);g.addColorStop(0,"#d78a3c");g.addColorStop(1,"#7d3a12");ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(0,0,r*.26,r*.18,0,0,7);ctx.fill();ctx.fillStyle="#f3e7d2";ctx.beginPath();ctx.roundRect(r*.2,-r*.035,r*.22,r*.07,r*.03);ctx.fill();ctx.beginPath();ctx.arc(r*.43,-r*.03,r*.04,0,7);ctx.arc(r*.43,r*.03,r*.04,0,7);ctx.fill();shadow(ctx,0);ctx.restore();
   for(let i=0;i<14;i++){const[x,y]=inCircle(R,r*.6);blob(ctx,cx+x,cy+y,r*.035,"#f1d9ab",R()*7,1.6,.8)}
   for(let i=0;i<14;i++){const[x,y]=inCircle(R,r*.6);blob(ctx,cx+x,cy+y,r*.025,"#4a1d10",R()*7,1.3,.9)}
   for(let i=0;i<25;i++){const[x,y]=inCircle(R,r*.6);blob(ctx,cx+x,cy+y,r*.01,"#3c7d26",R()*7,1.4,.7)}},

 /* cuscús con zanahoria, calabacín y garbanzos */
 couscous(ctx,w,h,R){const cx=w/2,cy=h/2,r=h*.44;plate(ctx,cx,cy,r,"#f6ece0","#c96a3a");
   for(let i=0;i<4500;i++){const[x,y]=inCircle(R,r*.75);ctx.fillStyle=["#f4d48a","#e9c271","#f8e0a6","#ddb460"][(R()*4)|0];ctx.fillRect(cx+x,cy+y,2,2)}
   for(let i=0;i<7;i++){const a=i/7*Math.PI*2;ctx.save();ctx.translate(cx+Math.cos(a)*r*.32,cy+Math.sin(a)*r*.32);ctx.rotate(a);shadow(ctx,1);ctx.fillStyle="#f27a1f";ctx.beginPath();ctx.roundRect(-r*.04,-r*.2,r*.08,r*.4,r*.04);ctx.fill();ctx.restore();
     ctx.save();ctx.translate(cx+Math.cos(a+.45)*r*.4,cy+Math.sin(a+.45)*r*.4);ctx.rotate(a+.45);ctx.fillStyle="#3d7e2b";ctx.beginPath();ctx.roundRect(-r*.05,-r*.16,r*.1,r*.32,r*.05);ctx.fill();ctx.fillStyle="#cfe39c";ctx.fillRect(-r*.025,-r*.13,r*.05,r*.26);shadow(ctx,0);ctx.restore()}
   for(let i=0;i<22;i++){const[x,y]=inCircle(R,r*.6);chickpea(ctx,cx+x,cy+y,r*.04)}
   for(let i=0;i<5;i++){const[x,y]=inCircle(R,r*.2);cube(ctx,R,cx+x,cy+y,r*.1,"#f4ead0")}},

 /* tres brochetas de carne, pimiento y cebolla */
 mashawi(ctx,w,h,R){const cx=w/2,cy=h/2,r=h*.44;plate(ctx,cx,cy,r,"#f3eadf","#9a8a7c");
   for(let k=0;k<3;k++){const yy=cy+(k-1)*r*.38;ctx.save();ctx.translate(cx,yy);ctx.rotate(-.18+k*.08);
     ctx.strokeStyle="#9da3aa";ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-r*.8,0);ctx.lineTo(r*.8,0);ctx.stroke();
     const seq=["m","p","m","o","m","p","m"];seq.forEach((t,i)=>{const x=-r*.6+i*r*.2;shadow(ctx,1);
       if(t==="m"){const g=ctx.createRadialGradient(x-4,-4,2,x,0,r*.12);g.addColorStop(0,"#b0602e");g.addColorStop(1,"#4f220e");ctx.fillStyle=g;ctx.beginPath();ctx.roundRect(x-r*.09,-r*.1,r*.18,r*.2,r*.05);ctx.fill();shadow(ctx,0);ctx.strokeStyle="rgba(20,8,2,.7)";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x-r*.06,-r*.07);ctx.lineTo(x+r*.06,r*.07);ctx.stroke()}
       else if(t==="p"){ctx.fillStyle=k%2?"#3e8c2c":"#e8261c";ctx.beginPath();ctx.roundRect(x-r*.07,-r*.09,r*.14,r*.18,r*.04);ctx.fill()}
       else{ctx.fillStyle="#efe3e8";ctx.beginPath();ctx.roundRect(x-r*.06,-r*.08,r*.12,r*.16,r*.04);ctx.fill();shadow(ctx,0);ctx.strokeStyle="#c9a3b8";ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(x-r*.02,-r*.07);ctx.lineTo(x-r*.02,r*.07);ctx.stroke()}
       shadow(ctx,0)});ctx.restore()}
   for(let i=0;i<4;i++)lemon(ctx,cx+r*.62,cy-r*.5+i*r*.08,r*.1,1.2)},

 /* hummus en espiral con aceite, garbanzos y pimentón */
 hummus(ctx,w,h,R){const cx=w/2,cy=h/2,r=h*.42;plate(ctx,cx,cy,r,"#e6ddd0","#3e5a7a");
   const g=ctx.createRadialGradient(cx-r*.2,cy-r*.2,0,cx,cy,r*.85);g.addColorStop(0,"#f6e6c4");g.addColorStop(1,"#d9bd8a");ctx.beginPath();ctx.arc(cx,cy,r*.82,0,7);ctx.fillStyle=g;ctx.fill();
   ctx.strokeStyle="rgba(150,110,60,.35)";ctx.lineWidth=r*.05;for(let i=1;i<4;i++){ctx.beginPath();ctx.arc(cx,cy,r*.18*i,i,i+4.5);ctx.stroke()}
   ctx.beginPath();ctx.arc(cx,cy,r*.38,0,7);ctx.fillStyle="rgba(196,160,30,.45)";ctx.fill();
   for(let i=0;i<10;i++){const[x,y]=inCircle(R,r*.3);chickpea(ctx,cx+x,cy+y,r*.05)}
   for(let i=0;i<70;i++){const[x,y]=inCircle(R,r*.7);blob(ctx,cx+x,cy+y,r*.012,"#c8321a")}
   for(let i=0;i<20;i++){const[x,y]=inCircle(R,r*.7);blob(ctx,cx+x,cy+y,r*.014,"#3d7c25",R()*7,1.5,.7)}},

 /* ensalada de perejil, bulgur y tomate */
 tabbouleh(ctx,w,h,R){const cx=w/2,cy=h/2,r=h*.44;plate(ctx,cx,cy,r);
   for(let i=0;i<900;i++){const[x,y]=inCircle(R,r*.72);blob(ctx,cx+x,cy+y,r*(.012+R()*.016),["#2f7d24","#3e9530","#57ad3a","#24661b"][(R()*4)|0],R()*7,1.6,.7)}
   for(let i=0;i<300;i++){const[x,y]=inCircle(R,r*.7);ctx.fillStyle="#e7cf98";ctx.fillRect(cx+x,cy+y,2.5,2.5)}
   for(let i=0;i<28;i++){const[x,y]=inCircle(R,r*.65);cube(ctx,R,cx+x,cy+y,r*.07,"#e4281c")}
   for(let i=0;i<8;i++){const[x,y]=inCircle(R,r*.6);blob(ctx,cx+x,cy+y,r*.03,"#e9f0d2",R()*7,1.4,.6)}
   lemon(ctx,cx+r*.5,cy+r*.5,r*.18,-.6);
   for(let i=0;i<4;i++){ctx.save();ctx.translate(cx-r*.55+i*r*.07,cy-r*.5);ctx.rotate(.4*i);ctx.fillStyle="#4b9b37";ctx.beginPath();ctx.ellipse(0,0,r*.07,r*.035,0,0,7);ctx.fill();ctx.restore()}}
};
