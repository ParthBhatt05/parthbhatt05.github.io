/* Auto-generated signature data-visualizations for the portfolio.
   Each viz_*() returns a self-contained inline SVG string. */

/* ==== licensePlate ==== */
function viz_licensePlate(){
  const NS='viz_licensePlate';
  const W=760, H=420;

  // ~8+ plate positions reading 'GJ 05 AB 1234'. 3 distorted positions carry candidate stacks.
  const positions=[
    {ch:'G',conf:1.00,distorted:false},
    {ch:'J',conf:1.00,distorted:false},
    {ch:'0',conf:1.00,distorted:false},
    {distorted:true,cands:[{c:'5',p:0.91},{c:'S',p:0.06},{c:'6',p:0.03}]},
    {ch:'A',conf:1.00,distorted:false},
    {distorted:true,cands:[{c:'B',p:0.88},{c:'8',p:0.09},{c:'R',p:0.03}]},
    {ch:'1',conf:1.00,distorted:false},
    {ch:'2',conf:1.00,distorted:false},
    {ch:'3',conf:1.00,distorted:false},
    {distorted:true,cands:[{c:'4',p:0.79},{c:'A',p:0.14},{c:'9',p:0.05},{c:'1',p:0.02}]}
  ];
  const resolved='GJ 05 AB 1234';

  const cellW=64, gap=9, n=positions.length;
  const gridW=n*cellW+(n-1)*gap;
  const padL=(W-gridW)/2;            // centered grid, ~19.5px each side
  const padT=98, headerH=26, candH=30, maxStack=4;
  const stackTop=padT+headerH+8;
  const bottomY=stackTop+maxStack*candH+6;

  const fmt=(p)=>p>=1?'1.00':p.toFixed(2);
  const num=(v)=>{let s=v.toFixed(2).replace(/0+$/,'').replace(/\.$/,'');return s===''?'0':s;};

  let svg='';
  svg+=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:760px;height:auto;display:block" role="img" aria-label="Distorted-plate OCR per-character confidence; max-probability assembly resolves to GJ 05 AB 1234; 625 of 700+ field-surveyed plates correct, about 89 percent">`;

  // Prefixed styles: hover highlight + gentle resting-safe animations
  svg+=`<style>.${NS}-cell:hover .${NS}-bg{stroke:#14A8AD;stroke-width:1.6;}.${NS}-cell:hover .${NS}-ct{fill:#F0F0F0;}`;
  svg+=`@keyframes ${NS}-pulse{0%,100%{opacity:.45}50%{opacity:1}}.${NS}-flow{animation:${NS}-pulse 3.4s ease-in-out infinite;}`;
  svg+=`@keyframes ${NS}-glow{0%,100%{opacity:.85}50%{opacity:1}}.${NS}-plate{animation:${NS}-glow 4s ease-in-out infinite;}</style>`;

  // background
  svg+=`<rect x="0" y="0" width="${W}" height="${H}" fill="#141414"/>`;

  // title block
  svg+=`<text x="24" y="30" font-family="Inter,sans-serif" font-size="13.5" font-weight="600" fill="#F0F0F0">Distorted-plate OCR: per-character confidence</text>`;
  svg+=`<text x="24" y="48" font-family="Inter,sans-serif" font-size="11" fill="#909090">Character-position confidence &#8594; max-probability assembly</text>`;

  // headline metric (amber, reserved)
  svg+=`<text x="${W-24}" y="34" text-anchor="end" font-family="Inter,sans-serif" font-size="28" font-weight="700" fill="#E8A838">~89%</text>`;
  svg+=`<text x="${W-24}" y="50" text-anchor="end" font-family="Inter,sans-serif" font-size="11" fill="#909090">625 of 700+ field-surveyed plates correct</text>`;

  // encoding legend
  svg+=`<text x="24" y="${padT-10}" font-family="Inter,sans-serif" font-size="10" fill="#707070">cell shade &#8733; confidence  &#183;  bright border + amber text = argmax  &#183;  hover to highlight</text>`;

  let x=padL;
  for(let i=0;i<positions.length;i++){
    const pos=positions[i];
    const cx=x+cellW/2;

    if(!pos.distorted){
      // clean confident character: header glyph + single argmax cell
      svg+=`<rect x="${num(x)}" y="${padT}" width="${cellW}" height="${headerH}" rx="3" fill="rgba(13,115,119,0.35)" stroke="#14A8AD" stroke-width="1"/>`;
      svg+=`<text x="${num(cx)}" y="${padT+18}" text-anchor="middle" font-family="Inter,sans-serif" font-size="15" font-weight="700" fill="#F0F0F0">${pos.ch}</text>`;
      const cy=stackTop;
      svg+=`<g class="${NS}-cell"><title>Position ${i+1}: '${pos.ch}' &#183; confidence ${fmt(pos.conf)} (clean read)</title>`;
      svg+=`<rect class="${NS}-bg" x="${num(x)}" y="${cy}" width="${cellW}" height="${candH}" rx="3" fill="rgba(13,115,119,0.35)" stroke="#14A8AD" stroke-width="1.4"/>`;
      svg+=`<text class="${NS}-ct" x="${num(x+22)}" y="${Math.round(cy+candH/2+4)}" text-anchor="middle" font-family="Inter,sans-serif" font-size="13" font-weight="700" fill="#E8A838">${pos.ch}</text>`;
      svg+=`<text x="${num(x+cellW-8)}" y="${Math.round(cy+candH/2+4)}" text-anchor="end" font-family="Inter,sans-serif" font-size="10" fill="#909090">${fmt(pos.conf)}</text>`;
      svg+=`</g>`;
    } else {
      // distorted position: header flagged + candidate stack
      svg+=`<rect x="${num(x)}" y="${padT}" width="${cellW}" height="${headerH}" rx="3" fill="#1A1A1A" stroke="#C75450" stroke-width="1" stroke-dasharray="3 2"/>`;
      svg+=`<text x="${num(cx)}" y="${padT+18}" text-anchor="middle" font-family="Inter,sans-serif" font-size="10.5" font-weight="600" fill="#C75450">distorted</text>`;
      for(let k=0;k<pos.cands.length;k++){
        const cand=pos.cands[k];
        const cy=stackTop+k*candH;
        const isMax=k===0;
        const op=(0.12+0.23*cand.p).toFixed(3);   // bg opacity proportional to confidence
        const border=isMax?'#14A8AD':'#262626';
        const bw=isMax?'1.4':'1';
        const txtFill=isMax?'#E8A838':'#F0F0F0';
        const ch=candH-3;
        svg+=`<g class="${NS}-cell"><title>Position ${i+1} candidate '${cand.c}' &#183; p=${fmt(cand.p)}${isMax?' &#183; argmax (selected)':''}</title>`;
        svg+=`<rect class="${NS}-bg" x="${num(x)}" y="${cy}" width="${cellW}" height="${ch}" rx="3" fill="rgba(13,115,119,${op})" stroke="${border}" stroke-width="${bw}"/>`;
        svg+=`<text class="${NS}-ct" x="${num(x+16)}" y="${Math.round(cy+ch/2+4)}" text-anchor="middle" font-family="Inter,sans-serif" font-size="13" font-weight="${isMax?700:500}" fill="${txtFill}">${cand.c}</text>`;
        svg+=`<text x="${num(x+cellW-8)}" y="${Math.round(cy+ch/2+4)}" text-anchor="end" font-family="Inter,sans-serif" font-size="10" fill="${isMax?'#F0F0F0':'#707070'}">${fmt(cand.p)}</text>`;
        const barW=(cellW-16)*cand.p;
        svg+=`<rect x="${num(x+8)}" y="${cy+ch-4}" width="${cellW-16}" height="2" rx="1" fill="rgba(255,255,255,0.06)"/>`;
        svg+=`<rect x="${num(x+8)}" y="${cy+ch-4}" width="${barW.toFixed(1)}" height="2" rx="1" fill="${isMax?'#14A8AD':'#0D7377'}"/>`;
        svg+=`</g>`;
      }
    }
    x+=cellW+gap;
  }

  // flow connector down to assembled string
  const asmY=352;
  const mid=Math.round(W/2);
  svg+=`<line class="${NS}-flow" x1="${mid}" y1="${bottomY}" x2="${mid}" y2="${asmY-46}" stroke="#0D7377" stroke-width="1.4"/>`;
  svg+=`<path class="${NS}-flow" d="M${mid-5},${asmY-52} L${mid},${asmY-44} L${mid+5},${asmY-52}" fill="none" stroke="#14A8AD" stroke-width="1.4"/>`;
  svg+=`<text x="${mid}" y="${bottomY+15}" text-anchor="middle" font-family="Inter,sans-serif" font-size="10" fill="#707070">take argmax at every position</text>`;

  // assembled resolved plate (large)
  const plateW=300, plateH=48, px=Math.round((W-plateW)/2), py=asmY-32;
  svg+=`<rect class="${NS}-plate" x="${px}" y="${py}" width="${plateW}" height="${plateH}" rx="6" fill="#101010" stroke="#0D7377" stroke-width="1.2"/>`;
  svg+=`<text x="${mid}" y="${py+32}" text-anchor="middle" font-family="Inter,sans-serif" font-size="25" font-weight="700" letter-spacing="3" fill="#F0F0F0">${resolved}</text>`;
  svg+=`<text x="${mid}" y="${py+plateH+16}" text-anchor="middle" font-family="Inter,sans-serif" font-size="10" fill="#909090">resolved plate string &#183; 3 distorted positions recovered via max probability</text>`;

  svg+=`</svg>`;
  return svg;
}

/* ==== musicMood ==== */
function viz_musicMood(){
  const NS = "viz_musicMood";
  const W = 760, H = 478;
  const N = 16, cell = 20, gx = 250, gy = 90;
  const half = N / 2;
  const right = gx + N * cell, bottom = gy + N * cell;
  const px = 40;

  // Quadrant base colours use ONLY the two legal teal RGBs. Amber is reserved
  // exclusively for the current-mood cell and the headline metric; red only for
  // the negative (skip) feedback path.
  const quads = {
    calm:  { name: "Calm",       r: 13, g: 115, b: 119 },
    energ: { name: "Energetic",  r: 20, g: 168, b: 173 },
    mela:  { name: "Melancholy", r: 13, g: 115, b: 119 },
    joy:   { name: "Joyful",     r: 20, g: 168, b: 173 }
  };
  const quadFor = (c, r) => {
    const left = c < half, top = r < half;
    if (top && left)  return "calm";
    if (top && !left) return "energ";
    if (!top && left) return "mela";
    return "joy";
  };
  const corner = { calm: [0, 0], energ: [N - 1, 0], mela: [0, N - 1], joy: [N - 1, N - 1] };
  const maxd = Math.sqrt(Math.pow(half - 1, 2) * 2);
  const intensity = (c, r, q) => {
    const co = corner[q];
    const d = Math.sqrt(Math.pow(c - co[0], 2) + Math.pow(r - co[1], 2));
    return Math.max(0, Math.min(1, 1 - d / maxd));
  };
  const baseAlpha = { calm: 0.10, energ: 0.13, mela: 0.07, joy: 0.16 };
  const spanAlpha = { calm: 0.50, energ: 0.30, mela: 0.55, joy: 0.30 };
  const cx = c => gx + c * cell + cell / 2;
  const cy = r => gy + r * cell + cell / 2;
  const n = v => { const s = (Math.round(v * 10) / 10).toString(); return s; };

  // ---- matrix cells ----
  let cells = "";
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const q = quadFor(c, r), Q = quads[q], t = intensity(c, r, q);
      const alpha = (baseAlpha[q] + t * spanAlpha[q]).toFixed(3);
      const x = gx + c * cell, y = gy + r * cell;
      const val = (c / (N - 1)).toFixed(2), en = (1 - r / (N - 1)).toFixed(2);
      cells += `<rect class="${NS}_cell" x="${x + 1}" y="${y + 1}" width="${cell - 2}" height="${cell - 2}" rx="1.5" fill="rgba(${Q.r},${Q.g},${Q.b},${alpha})"><title>${Q.name} — valence ${val}, energy ${en}</title></rect>`;
    }
  }

  // ---- listening-history song dots ----
  // (moved the dot that previously sat on the amber current cell (8,9) to (7,11)
  //  so the current-mood highlight stays clean.)
  const songs = [[2,3],[5,1],[3,6],[6,5],[12,2],[13,5],[11,8],[4,12],[2,14],[13,12],[7,11]];
  let dots = "";
  songs.forEach(p => {
    dots += `<circle cx="${n(cx(p[0]))}" cy="${n(cy(p[1]))}" r="3.6" fill="#F0F0F0" stroke="#14A8AD" stroke-width="1.4"><title>Song in listening history</title></circle>`;
  });

  // ---- current mood cell (amber) ----
  const cmC = 8, cmR = 9;
  const cmx = gx + cmC * cell, cmy = gy + cmR * cell;
  const current = `<rect x="${cmx + 0.5}" y="${cmy + 0.5}" width="${cell - 1}" height="${cell - 1}" rx="1.5" fill="rgba(232,168,56,0.20)" stroke="#E8A838" stroke-width="2"><title>Current mood cell</title></rect>`;

  // ---- recommended next cell: single ADJACENT neighbour matched to history ----
  const rnC = 9, rnR = 8;
  const rnx = gx + rnC * cell, rny = gy + rnR * cell;
  const recCell = `<rect class="${NS}_rec" x="${rnx + 1}" y="${rny + 1}" width="${cell - 2}" height="${cell - 2}" rx="1.5" fill="rgba(13,115,119,0.35)" stroke="#14A8AD" stroke-width="2"><title>Recommended next cell — adjacent neighbour matched to listening history</title></rect>`;
  const ax = cx(cmC), ay = cy(cmR), bx = cx(rnC), by = cy(rnR);
  const connector =
    `<path class="${NS}_conn" d="M${n(ax)} ${n(ay)} L${n(bx)} ${n(by)}" fill="none" stroke="#14A8AD" stroke-width="1.6"/>` +
    `<circle cx="${n(bx)}" cy="${n(by)}" r="2.2" fill="#14A8AD"/>`;

  // ---- quadrant + axis labels ----
  const qlab =
    `<text class="${NS}_q" x="${gx}" y="${gy - 9}" text-anchor="start">Calm</text>` +
    `<text class="${NS}_q" x="${right}" y="${gy - 9}" text-anchor="end">Energetic</text>` +
    `<text class="${NS}_q" x="${gx}" y="${bottom + 15}" text-anchor="start">Melancholy</text>` +
    `<text class="${NS}_q" x="${right}" y="${bottom + 15}" text-anchor="end">Joyful</text>`;
  const axes =
    `<text class="${NS}_ax" x="${gx}" y="${bottom + 30}" text-anchor="start">low valence</text>` +
    `<text class="${NS}_ax" x="${right}" y="${bottom + 30}" text-anchor="end">high valence</text>` +
    `<text class="${NS}_ax" x="${gx - 8}" y="${gy + 4}" text-anchor="end" transform="rotate(-90 ${gx - 8} ${gy + 4})">energy &#8594;</text>`;

  // ---- title + tech caption ----
  const title =
    `<text class="${NS}_t" x="${px}" y="40">Mood map + history-aware recommend + skip-feedback</text>` +
    `<text class="${NS}_st" x="${px}" y="58">Neural mood matrix &#183; feedback-driven reweighting</text>`;

  // ---- legend ----
  const ly = 104;
  const legend =
    `<text class="${NS}_h" x="${px}" y="${ly - 12}">Legend</text>` +
    `<circle cx="${px + 6}" cy="${ly}" r="3.6" fill="#F0F0F0" stroke="#14A8AD" stroke-width="1.4"/>` +
    `<text class="${NS}_lg" x="${px + 18}" y="${ly + 4}">history song (11 mapped)</text>` +
    `<rect x="${px}" y="${ly + 14}" width="12" height="12" rx="2" fill="rgba(232,168,56,0.20)" stroke="#E8A838" stroke-width="2"/>` +
    `<text class="${NS}_lg" x="${px + 18}" y="${ly + 24}">current mood cell</text>` +
    `<rect x="${px}" y="${ly + 31}" width="12" height="12" rx="2" fill="rgba(13,115,119,0.35)" stroke="#14A8AD" stroke-width="2"/>` +
    `<text class="${NS}_lg" x="${px + 18}" y="${ly + 41}">recommended next</text>`;

  // ---- skip-feedback loop block ----
  const fy = 204;
  const fb =
    `<text class="${NS}_h" x="${px}" y="${fy}">Skip-feedback loop</text>` +
    `<rect x="${px}" y="${fy + 12}" width="14" height="14" rx="3" fill="rgba(13,115,119,0.35)" stroke="#14A8AD" stroke-width="1.4"/>` +
    `<text class="${NS}_fbp" x="${px + 7}" y="${fy + 23}" text-anchor="middle">+</text>` +
    `<text class="${NS}_fb" x="${px + 23}" y="${fy + 18}">Played fully</text>` +
    `<text class="${NS}_fbs" x="${px + 23}" y="${fy + 31}">reinforce cell weight (+)</text>` +
    `<rect x="${px}" y="${fy + 44}" width="14" height="14" rx="3" fill="rgba(199,84,80,0.18)" stroke="#C75450" stroke-width="1.4"/>` +
    `<text class="${NS}_fbm" x="${px + 7}" y="${fy + 55}" text-anchor="middle">&#8211;</text>` +
    `<text class="${NS}_fb" x="${px + 23}" y="${fy + 50}">Skipped early</text>` +
    `<text class="${NS}_fbs" x="${px + 23}" y="${fy + 63}">down-weight &amp; reshape map (&#8722;)</text>`;

  // ---- curved arrow looping the user action back into the matrix ----
  // Loop label sits just under the feedback block; the curve now STARTS below the
  // label band so the dashed path never crosses the label text.
  const lpY = fy + 58 + 16;            // label baseline
  const loopStartX = px + 7, loopStartY = fy + 58 + 30; // start below label glyph band
  const loopEndX = cmx - 6, loopEndY = cmy + cell / 2;
  const loop =
    `<text class="${NS}_lp" x="${px}" y="${lpY}">user action &#8594; reweight matrix</text>` +
    `<path class="${NS}_loop" d="M${n(loopStartX)} ${n(loopStartY)} C${px - 24} ${loopStartY + 20}, ${gx - 58} ${loopEndY + 34}, ${n(loopEndX)} ${n(loopEndY)}" fill="none" stroke="#0D7377" stroke-width="1.5" stroke-dasharray="4 3"/>` +
    `<path d="M${n(loopEndX - 8)} ${n(loopEndY - 5)} L${n(loopEndX)} ${n(loopEndY)} L${n(loopEndX - 8)} ${n(loopEndY + 5)} Z" fill="#14A8AD"/>`;

  // ---- headline metric (amber) ----
  const my = 358;
  const metric =
    `<text class="${NS}_m" x="${px}" y="${my}">94%</text>` +
    `<text class="${NS}_msub" x="${px}" y="${my + 15}">of history-matched picks</text>` +
    `<text class="${NS}_msub" x="${px}" y="${my + 29}">played fully, not skipped</text>`;

  // ---- matched-to-history tag (right rail) ----
  const tagW = 148, tagH = 40;
  const tagX = right + 16;
  let tagY = rny - 26;
  if (tagY < gy) tagY = gy;
  const tag =
    `<g>` +
    `<rect x="${tagX}" y="${tagY}" width="${tagW}" height="${tagH}" rx="5" fill="#1A1A1A" stroke="#14A8AD" stroke-width="1"/>` +
    `<text class="${NS}_tagt" x="${tagX + 9}" y="${tagY + 16}">matched to history</text>` +
    `<text class="${NS}_tags" x="${tagX + 9}" y="${tagY + 30}">next track unlikely to skip</text>` +
    `<line x1="${tagX}" y1="${tagY + tagH / 2}" x2="${rnx + cell + 1}" y2="${n(cy(rnR))}" stroke="#14A8AD" stroke-width="1" stroke-dasharray="2 2"/>` +
    `</g>`;

  const css =
    `.${NS}_cell{transition:opacity .15s ease;}` +
    `.${NS}_cell:hover{opacity:1;stroke:#F0F0F0;stroke-width:1;}` +
    `@keyframes ${NS}_pulse{0%,100%{opacity:.55}50%{opacity:1}}` +
    `.${NS}_rec{animation:${NS}_pulse 3.4s ease-in-out infinite;}` +
    `@keyframes ${NS}_dash{to{stroke-dashoffset:-14;}}` +
    `.${NS}_conn{stroke-dasharray:4 3;animation:${NS}_dash 1.4s linear infinite;}` +
    `.${NS}_loop{animation:${NS}_dash 2s linear infinite;}` +
    `.${NS}_t{font-size:13.5px;font-weight:600;fill:#F0F0F0;font-family:Inter,sans-serif;}` +
    `.${NS}_st{font-size:11px;fill:#909090;font-family:Inter,sans-serif;}` +
    `.${NS}_q{font-size:11px;fill:#909090;font-weight:500;font-family:Inter,sans-serif;}` +
    `.${NS}_ax{font-size:10px;fill:#707070;font-family:Inter,sans-serif;}` +
    `.${NS}_lg{font-size:11px;fill:#909090;font-family:Inter,sans-serif;}` +
    `.${NS}_h{font-size:11.5px;font-weight:600;fill:#F0F0F0;font-family:Inter,sans-serif;}` +
    `.${NS}_fb{font-size:11px;fill:#F0F0F0;font-family:Inter,sans-serif;}` +
    `.${NS}_fbs{font-size:10px;fill:#909090;font-family:Inter,sans-serif;}` +
    `.${NS}_fbp{font-size:12px;font-weight:700;fill:#14A8AD;font-family:Inter,sans-serif;}` +
    `.${NS}_fbm{font-size:13px;font-weight:700;fill:#C75450;font-family:Inter,sans-serif;}` +
    `.${NS}_lp{font-size:10px;fill:#707070;font-family:Inter,sans-serif;}` +
    `.${NS}_tagt{font-size:10.5px;font-weight:600;fill:#14A8AD;font-family:Inter,sans-serif;}` +
    `.${NS}_tags{font-size:9.5px;fill:#909090;font-family:Inter,sans-serif;}` +
    `.${NS}_m{font-size:34px;font-weight:600;fill:#E8A838;font-family:Inter,sans-serif;}` +
    `.${NS}_msub{font-size:11px;fill:#909090;font-family:Inter,sans-serif;}`;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:760px;height:auto;display:block" role="img" aria-label="A 16 by 16 mood matrix split into Calm, Energetic, Melancholy and Joyful quadrants with 11 listening-history songs plotted as dots. One current-mood cell is highlighted in amber; an adjacent recommended-next cell matched to listening history is outlined in teal and connected to it. A skip-feedback loop shows played-fully tracks reinforcing cell weight and skipped tracks down-weighting and reshaping the mood map, with a curved arrow looping the user action back into the matrix.">`;
  svg += `<title>Mood map: history-aware recommend with skip-feedback loop</title>`;
  svg += `<style>${css}</style>`;
  svg += `<rect x="0" y="0" width="${W}" height="${H}" fill="#101010"/>`;
  svg += title;
  svg += `<rect x="${gx - 1}" y="${gy - 1}" width="${N * cell + 2}" height="${N * cell + 2}" fill="none" stroke="#262626" stroke-width="1"/>`;
  svg += cells;
  svg += `<line x1="${gx}" y1="${gy + half * cell}" x2="${right}" y2="${gy + half * cell}" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>`;
  svg += `<line x1="${gx + half * cell}" y1="${gy}" x2="${gx + half * cell}" y2="${bottom}" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>`;
  svg += recCell + current + connector + dots + qlab + axes + tag + legend + fb + loop + metric;
  svg += `</svg>`;
  return svg;
}

/* ==== depression ==== */
function viz_depression(){
  const x0=40, x1=720, smax=27, H=420;
  const sx = s => x0 + (s/smax)*(x1-x0);
  const bands = [
    {name:'Minimal', lo:0, hi:5, fill:'#0D7377', route:'Info content'},
    {name:'Mild', lo:5, hi:10, fill:'#0F8488', route:'Self-help'},
    {name:'Moderate', lo:10, hi:15, fill:'#14A8AD', route:'Curated articles'},
    {name:'Mod. Severe', lo:15, hi:20, fill:'#9C8A4E', route:'Targeted support'},
    {name:'Severe', lo:20, hi:27, fill:'#E8A838', route:'Nearest therapist (geo-matched)'}
  ];
  const score = 16;
  const mx = sx(score);
  const trackY = 168, trackH = 30;
  // t-SNE behavioural clusters (fixed positions), funnelling down toward the band
  const clusters = [
    {x:95,  y:96, r:13, n:7},
    {x:170, y:84, r:11, n:5},
    {x:255, y:100, r:15, n:9},
    {x:355, y:82, r:12, n:6},
    {x:455, y:98, r:18, n:11},
    {x:560, y:86, r:13, n:7},
    {x:660, y:100, r:10, n:4}
  ];
  // dots inside a cluster on a fixed deterministic ring (teal, palette-safe)
  const dotsFor = (c) => {
    let s='';
    for(let i=0;i<c.n;i++){
      const a = (i/c.n)*Math.PI*2 + i*0.6;
      const rr = (c.r-3) * (0.35 + ((i*37)%100)/140);
      const dx = c.x + Math.cos(a)*rr;
      const dy = c.y + Math.sin(a)*rr*0.7;
      s += `<circle cx="${dx.toFixed(1)}" cy="${dy.toFixed(1)}" r="2.1" fill="#14A8AD" opacity="0.75"/>`;
    }
    return s;
  };

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 ${H}" style="width:100%;max-width:760px;height:auto;display:block" role="img" aria-label="PHQ-9 severity ruler from 0 to 27 split into five bands shaded teal to amber, with a posterior score marker at 16 (Moderately Severe) and resource routing under each band">`;

  // defs: funnel pulse + marker drop keyframes (resting state complete when paused)
  svg += `<defs>
    <style>
      @keyframes viz_depression_drop {0%{opacity:0;transform:translateY(-6px)}100%{opacity:1;transform:translateY(0)}}
      @keyframes viz_depression_pulse {0%,100%{opacity:0.85}50%{opacity:0.45}}
      .viz_depression_funnel{stroke-dasharray:2 4;opacity:0.6;animation:viz_depression_pulse 4s ease-in-out infinite}
      .viz_depression_pin{animation:viz_depression_drop 900ms ease-out both}
      .viz_depression_band{transition:opacity .2s}
      .viz_depression_band:hover{opacity:0.82}
    </style>
  </defs>`;

  // background panel
  svg += `<rect x="0" y="0" width="760" height="${H}" fill="#141414"/>`;
  svg += `<rect x="16" y="16" width="728" height="${H-32}" rx="10" fill="#1A1A1A" stroke="#262626"/>`;

  // Title block (matches spec title)
  svg += `<text x="34" y="44" font-family="Inter,sans-serif" font-size="13.5" font-weight="600" fill="#F0F0F0">Behavioural signal &#8594; PHQ-9 band &#8594; resource routing</text>`;
  svg += `<text x="34" y="62" font-family="Inter,sans-serif" font-size="11" fill="#909090">Posterior PHQ-9 estimate routed to a resource tier</text>`;
  svg += `<text x="726" y="44" text-anchor="end" font-family="Inter,sans-serif" font-size="11" fill="#909090">no self-reported labels needed</text>`;

  // Cluster row label
  svg += `<text x="34" y="118" font-family="Inter,sans-serif" font-size="10" fill="#707070">t-SNE behavioural clusters</text>`;

  // clusters (teal, palette-safe) + funnel lines down toward marker zone
  clusters.forEach((c)=>{
    svg += `<circle cx="${c.x}" cy="${c.y}" r="${c.r}" fill="rgba(13,115,119,0.12)" stroke="rgba(13,115,119,0.35)"/>`;
    svg += dotsFor(c);
    const tx = mx + (c.x - mx)*0.35;
    svg += `<line class="viz_depression_funnel" x1="${c.x}" y1="${(c.y + c.r).toFixed(1)}" x2="${tx.toFixed(1)}" y2="${trackY-8}" stroke="#0D7377" stroke-width="1"/>`;
  });

  // Ruler track bands (teal -> amber gradient via palette ramp)
  bands.forEach(b=>{
    const bx = sx(b.lo), bw = sx(b.hi)-sx(b.lo);
    svg += `<g class="viz_depression_band"><rect x="${bx.toFixed(1)}" y="${trackY}" width="${bw.toFixed(1)}" height="${trackH}" fill="${b.fill}"><title>${b.name} (${b.lo}–${b.hi-(b.hi<27?1:0)}) → ${b.route}</title></rect></g>`;
    const cx = bx + bw/2;
    // band name centered above
    svg += `<text x="${cx.toFixed(1)}" y="${trackY-12}" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" fill="#909090">${b.name}</text>`;
    // routing action under band
    svg += `<text x="${cx.toFixed(1)}" y="${trackY+trackH+24}" text-anchor="middle" font-family="Inter,sans-serif" font-size="${b.name==='Severe'?'9.5':'10'}" fill="${b.name==='Severe'?'#E8A838':'#909090'}">${b.route}</text>`;
  });

  // band boundary ticks + numeric labels
  [0,5,10,15,20,27].forEach(s=>{
    const tx = sx(s);
    svg += `<line x1="${tx.toFixed(1)}" y1="${trackY+trackH}" x2="${tx.toFixed(1)}" y2="${trackY+trackH+6}" stroke="#262626" stroke-width="1"/>`;
    svg += `<text x="${tx.toFixed(1)}" y="${trackY+trackH+18}" text-anchor="middle" font-family="Inter,sans-serif" font-size="10" fill="#707070">${s}</text>`;
  });

  // subtle connectors from band bottom to routing label
  bands.forEach(b=>{
    const cx = sx(b.lo)+(sx(b.hi)-sx(b.lo))/2;
    svg += `<line x1="${cx.toFixed(1)}" y1="${trackY+trackH+7}" x2="${cx.toFixed(1)}" y2="${trackY+trackH+12}" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>`;
  });

  // POSTERIOR SCORE MARKER (headline, amber)
  svg += `<g class="viz_depression_pin">`;
  svg += `<line x1="${mx.toFixed(1)}" y1="${trackY-6}" x2="${mx.toFixed(1)}" y2="${trackY+trackH+6}" stroke="#E8A838" stroke-width="2"/>`;
  svg += `<rect x="${(mx-7).toFixed(1)}" y="${trackY+trackH/2-7}" width="14" height="14" rx="2" transform="rotate(45 ${mx.toFixed(1)} ${trackY+trackH/2})" fill="#E8A838" stroke="#1A1A1A" stroke-width="1.5"/>`;
  const lblY = trackY-30;
  svg += `<rect x="${(mx-66).toFixed(1)}" y="${lblY}" width="132" height="22" rx="11" fill="#E8A838"/>`;
  svg += `<text x="${mx.toFixed(1)}" y="${lblY+15}" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" font-weight="600" fill="#101010">Score 16 · Mod. Severe</text>`;
  svg += `<line x1="${mx.toFixed(1)}" y1="${lblY+22}" x2="${mx.toFixed(1)}" y2="${trackY-6}" stroke="#E8A838" stroke-width="1.5"/>`;
  svg += `</g>`;
  svg += `<text x="${mx.toFixed(1)}" y="${lblY-6}" text-anchor="middle" font-family="Inter,sans-serif" font-size="10" fill="#707070">sample posterior</text>`;

  // Resource routing section divider + label
  const ry = trackY+trackH+44;
  svg += `<line x1="34" y1="${ry}" x2="726" y2="${ry}" stroke="#262626" stroke-width="1"/>`;
  svg += `<text x="34" y="${ry+22}" font-family="Inter,sans-serif" font-size="10" fill="#707070">ROUTING ACTION</text>`;

  // highlighted routed outcome card (Mod. Severe -> Targeted support)
  const cardY = ry+34, cardW=300, cardX=34;
  svg += `<rect x="${cardX}" y="${cardY}" width="${cardW}" height="46" rx="8" fill="rgba(13,115,119,0.12)" stroke="#E8A838"/>`;
  svg += `<text x="${cardX+16}" y="${cardY+19}" font-family="Inter,sans-serif" font-size="11" fill="#909090">Routed action</text>`;
  svg += `<text x="${cardX+16}" y="${cardY+37}" font-family="Inter,sans-serif" font-size="13" font-weight="600" fill="#E8A838">Targeted support</text>`;

  // escalation note card (severe -> therapist)
  const c2X = cardX+cardW+24, c2W=358;
  svg += `<rect x="${c2X}" y="${cardY}" width="${c2W}" height="46" rx="8" fill="#101010" stroke="#262626"/>`;
  svg += `<text x="${c2X+16}" y="${cardY+19}" font-family="Inter,sans-serif" font-size="11" fill="#909090">If escalates to Severe (20+)</text>`;
  svg += `<text x="${c2X+16}" y="${cardY+37}" font-family="Inter,sans-serif" font-size="13" font-weight="600" fill="#14A8AD">Nearest therapist · geo-matched</text>`;

  svg += `</svg>`;
  return svg;
}

/* ==== parth ==== */
function viz_parth(){
  const W = 760, H = 478;
  const PAD = 16;
  const NS = "http://www.w3.org/2000/svg";
  const C = {
    bg: "#141414",
    panel: "#1A1A1A",
    grid: "#262626",
    teal: "#0D7377",
    tealBright: "#14A8AD",
    f12: "rgba(13,115,119,0.12)",
    f20: "rgba(13,115,119,0.2)",
    f35: "rgba(13,115,119,0.35)",
    amber: "#E8A838",
    text: "#F0F0F0",
    muted: "#909090",
    tick: "#707070",
    faint: "rgba(255,255,255,0.06)",
    red: "#C75450"
  };
  const r2 = (n)=>Math.round(n*100)/100;

  let s = '';
  s += '<svg xmlns="'+NS+'" viewBox="0 0 '+W+' '+H+'" style="width:100%;max-width:760px;height:auto;display:block" role="img" aria-label="CNC predictive maintenance. Panel A acoustic emission waveform: smooth low teal normal signature on the left, transitioning into growing-amplitude amber degradation with sharp anomaly spikes including two severe red peaks on the right. Panel B tool-tip half-life decay: remaining tool life percent versus machining cycles, descending and crossing a dashed red failure threshold, with an amber replace-by marker placed before the crossing. Headline result: 25 percent downtime reduction and 1.2 million dollars incremental weekly revenue.">';

  s += '<style>'
    + '@keyframes viz_parth_dash{to{stroke-dashoffset:-20}}'
    + '@keyframes viz_parth_draw{from{stroke-dashoffset:var(--vp-len)}to{stroke-dashoffset:0}}'
    + '@keyframes viz_parth_glow{0%,100%{opacity:.85}50%{opacity:1}}'
    + '@keyframes viz_parth_spk{0%,100%{opacity:.95}50%{opacity:.6}}'
    + '.viz_parth_thr{animation:viz_parth_dash 1.6s linear infinite}'
    + '.viz_parth_marker{animation:viz_parth_glow 2.6s ease-in-out infinite}'
    + '.viz_parth_spike{animation:viz_parth_spk 3s ease-in-out infinite}'
    + '</style>';

  s += '<rect x="0" y="0" width="'+W+'" height="'+H+'" fill="'+C.bg+'"/>';

  s += '<text x="'+PAD+'" y="25" font-family="Inter,sans-serif" font-size="13.5" font-weight="600" fill="'+C.text+'">Acoustic waveform anomaly &#8594; half-life prediction &#8594; service before failure</text>';
  s += '<text x="'+PAD+'" y="42" font-family="Inter,sans-serif" font-size="11" fill="'+C.muted+'">CNC predictive maintenance &#8212; acoustic emission monitoring + tool-tip remaining-life model</text>';

  const hbY = 54, hbH = 30;
  s += '<rect x="'+PAD+'" y="'+hbY+'" width="'+(W-PAD*2)+'" height="'+hbH+'" rx="5" fill="rgba(232,168,56,0.12)" stroke="'+C.amber+'" stroke-width="1"/>';
  s += '<circle cx="'+(PAD+15)+'" cy="'+(hbY+hbH/2)+'" r="3.2" fill="'+C.amber+'"/>';
  s += '<text x="'+(PAD+26)+'" y="'+(hbY+19)+'" font-family="Inter,sans-serif" font-size="14" font-weight="600" fill="'+C.amber+'">25% downtime reduction</text>';
  s += '<text x="'+(W-PAD-12)+'" y="'+(hbY+19)+'" text-anchor="end" font-family="Inter,sans-serif" font-size="14" font-weight="600" fill="'+C.amber+'">+$1.2M incremental weekly revenue</text>';
  s += '<line x1="'+r2(W/2)+'" y1="'+(hbY+7)+'" x2="'+r2(W/2)+'" y2="'+(hbY+hbH-7)+'" stroke="'+C.amber+'" stroke-width="1" opacity="0.4"/>';

  const aX = PAD, aY = hbY + hbH + 12, aW = W - PAD*2, aH = 172;
  s += '<rect x="'+aX+'" y="'+aY+'" width="'+aW+'" height="'+aH+'" rx="6" fill="'+C.panel+'"/>';
  s += '<text x="'+(aX+12)+'" y="'+(aY+17)+'" font-family="Inter,sans-serif" font-size="11.5" font-weight="600" fill="'+C.text+'">(a) Acoustic emission waveform &#8212; normal signature to degradation</text>';

  const wL = aX + 12, wR = aX + aW - 12, wTop = aY + 44, wBot = aY + aH - 24;
  const wMid = (wTop + wBot)/2, wW = wR - wL;
  const halfAmpMax = (wBot - wTop)/2 - 3;
  s += '<line x1="'+r2(wL)+'" y1="'+r2(wMid)+'" x2="'+r2(wR)+'" y2="'+r2(wMid)+'" stroke="'+C.grid+'" stroke-width="1"/>';
  const transFrac = 0.52, transX = wL + wW*transFrac;
  s += '<rect x="'+r2(wL)+'" y="'+r2(wTop)+'" width="'+r2(transX-wL)+'" height="'+r2(wBot-wTop)+'" fill="'+C.f12+'" opacity="0.5"/>';
  s += '<line x1="'+r2(transX)+'" y1="'+r2(wTop)+'" x2="'+r2(transX)+'" y2="'+r2(wBot)+'" stroke="'+C.faint+'" stroke-width="1" stroke-dasharray="3 3"/>';
  const lblBandY = aY + 34;
  s += '<text x="'+r2(wL+2)+'" y="'+lblBandY+'" font-family="Inter,sans-serif" font-size="11" font-weight="600" fill="'+C.tealBright+'">Normal signature</text>';
  s += '<text x="'+r2(wR-2)+'" y="'+lblBandY+'" text-anchor="end" font-family="Inter,sans-serif" font-size="11" font-weight="600" fill="'+C.amber+'">Anomaly &#8212; degradation</text>';

  const N = 320;
  const jit = [0.12,-0.34,0.21,-0.47,0.18,-0.29,0.41,-0.15,0.33,-0.24,0.19,-0.38,0.27,-0.16,0.31,-0.44,0.22,-0.36,0.13,-0.28,0.40,-0.17,0.25,-0.30,0.36,-0.11,0.29,-0.42,0.14,-0.33,0.23,-0.19];
  const spikes = [
    {f:0.66, amp:0.78, red:false},
    {f:0.74, amp:0.92, red:false},
    {f:0.81, amp:1.20, red:true},
    {f:0.88, amp:1.00, red:false},
    {f:0.955, amp:1.30, red:true}
  ];
  const ampEnv = (f)=>{
    if(f <= transFrac) return 0.14;
    const g = (f - transFrac)/(1 - transFrac);
    return 0.18 + g*g*0.42;
  };
  const baseFreq = (f)=> f<=transFrac ? 26 : 26 + (f-transFrac)*40;
  const sampleY = (i)=>{
    const f = i/N, env = ampEnv(f);
    let val = Math.sin(f*baseFreq(f)*Math.PI*2);
    if(f>transFrac){
      val += 0.35*Math.sin(f*baseFreq(f)*Math.PI*5.3);
      val += 0.18*jit[i % jit.length];
    } else {
      val += 0.06*jit[i % jit.length];
    }
    let spikeBoost = 0;
    for(const sp of spikes){
      const dx = f - sp.f, w = 0.012;
      const g = Math.exp(-(dx*dx)/(2*w*w));
      if(g>0.02){
        const dir = (Math.round(sp.f*100) % 2 === 0) ? 1 : -1;
        spikeBoost += dir*g*sp.amp;
      }
    }
    let y = wMid - (val*env + spikeBoost) * halfAmpMax / 1.4;
    return Math.max(wTop+1, Math.min(wBot-1, y));
  };
  const pts = [];
  for(let i=0;i<=N;i++){ pts.push([wL + (i/N)*wW, sampleY(i)]); }
  const isRed = (i)=>{
    const f = i/N;
    for(const sp of spikes){ if(sp.red && Math.abs(f-sp.f)<0.018) return true; }
    return false;
  };
  const splitI = Math.round(transFrac*N);
  let dNorm = 'M'+r2(pts[0][0])+','+r2(pts[0][1]);
  for(let i=1;i<=splitI;i++){ dNorm += ' L'+r2(pts[i][0])+','+r2(pts[i][1]); }
  let dDeg = 'M'+r2(pts[splitI][0])+','+r2(pts[splitI][1]);
  for(let i=splitI+1;i<=N;i++){ dDeg += ' L'+r2(pts[i][0])+','+r2(pts[i][1]); }

  const redSegs = [];
  let cur = null;
  for(let i=splitI;i<=N;i++){
    if(isRed(i)){ if(cur===null) cur=[i]; else cur.push(i); }
    else { if(cur!==null){ redSegs.push(cur); cur=null; } }
  }
  if(cur!==null) redSegs.push(cur);
  const redPaths = [];
  for(const seg of redSegs){
    const a = Math.max(splitI, seg[0]-1), b = Math.min(N, seg[seg.length-1]+1);
    let dp = 'M'+r2(pts[a][0])+','+r2(pts[a][1]);
    for(let i=a+1;i<=b;i++){ dp += ' L'+r2(pts[i][0])+','+r2(pts[i][1]); }
    redPaths.push(dp);
  }

  s += '<path d="'+dNorm+'" fill="none" stroke="'+C.teal+'" stroke-width="3.4" opacity="0.28" stroke-linejoin="round" stroke-linecap="round"/>';
  s += '<path d="'+dDeg+'" fill="none" stroke="'+C.amber+'" stroke-width="3.4" opacity="0.22" stroke-linejoin="round" stroke-linecap="round"/>';
  s += '<path d="'+dNorm+'" fill="none" stroke="'+C.tealBright+'" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/>';
  s += '<path d="'+dDeg+'" fill="none" stroke="'+C.amber+'" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/>';
  for(const dp of redPaths){
    s += '<path class="viz_parth_spike" d="'+dp+'" fill="none" stroke="'+C.red+'" stroke-width="2.1" stroke-linejoin="round" stroke-linecap="round"><title>Severe acoustic anomaly spike &#8212; tool/bearing fault signature</title></path>';
  }
  for(const sp of spikes){
    if(sp.red){
      const idx = Math.round(sp.f*N);
      s += '<circle class="viz_parth_spike" cx="'+r2(pts[idx][0])+'" cy="'+r2(pts[idx][1])+'" r="2.6" fill="'+C.red+'"/>';
    }
  }

  s += '<text x="'+r2(wL)+'" y="'+(wBot+15)+'" font-family="Inter,sans-serif" font-size="10" fill="'+C.tick+'">t0</text>';
  s += '<text x="'+r2(transX)+'" y="'+(wBot+15)+'" text-anchor="middle" font-family="Inter,sans-serif" font-size="10" fill="'+C.tick+'">degradation onset</text>';
  s += '<text x="'+r2(wR)+'" y="'+(wBot+15)+'" text-anchor="end" font-family="Inter,sans-serif" font-size="10" fill="'+C.tick+'">now</text>';

  const bY = aY + aH + 12, bX = PAD, bW = W - PAD*2, bH = H - bY - PAD;
  s += '<rect x="'+bX+'" y="'+bY+'" width="'+bW+'" height="'+bH+'" rx="6" fill="'+C.panel+'"/>';
  s += '<text x="'+(bX+12)+'" y="'+(bY+17)+'" font-family="Inter,sans-serif" font-size="11.5" font-weight="600" fill="'+C.text+'">(b) Tool-tip half-life decay &#8212; remaining life vs machining cycles</text>';

  const pL = bX + 46, pR = bX + bW - 14, pT = bY + 28, pB = bY + bH - 26;
  const pW = pR - pL, pH = pB - pT;
  const sx = (cx)=>pL + (cx/100)*pW;
  const sy = (v)=>pB - (v/100)*pH;
  [0,25,50,75,100].forEach(v=>{
    const y = sy(v);
    s += '<line x1="'+r2(pL)+'" y1="'+r2(y)+'" x2="'+r2(pR)+'" y2="'+r2(y)+'" stroke="'+(v===0?C.grid:C.faint)+'" stroke-width="1"/>';
    s += '<text x="'+(pL-7)+'" y="'+r2(y+3.5)+'" text-anchor="end" font-family="Inter,sans-serif" font-size="10" fill="'+C.tick+'">'+v+'</text>';
  });
  [0,25,50,75,100].forEach(v=>{
    const x = sx(v);
    s += '<text x="'+r2(x)+'" y="'+(pB+15)+'" text-anchor="middle" font-family="Inter,sans-serif" font-size="10" fill="'+C.tick+'">'+v+'</text>';
  });
  s += '<text x="'+(bX+14)+'" y="'+r2((pT+pB)/2)+'" transform="rotate(-90 '+(bX+14)+' '+r2((pT+pB)/2)+')" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" fill="'+C.muted+'">Remaining tool life %</text>';
  s += '<text x="'+r2((pL+pR)/2)+'" y="'+(pB+26)+'" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" fill="'+C.muted+'">Machining cycles</text>';

  const thr = 18, thrY = sy(thr);
  s += '<line class="viz_parth_thr" x1="'+r2(pL)+'" y1="'+r2(thrY)+'" x2="'+r2(pR)+'" y2="'+r2(thrY)+'" stroke="'+C.red+'" stroke-width="1.6" stroke-dasharray="6 4"/>';
  s += '<text x="'+r2(pL)+'" y="'+r2(thrY-5)+'" font-family="Inter,sans-serif" font-size="10" fill="'+C.red+'">failure threshold (18%)</text>';

  const halflife = 38;
  const decay = (cx)=> 100*Math.pow(0.5, cx/halflife);
  const pathPts = [];
  for(let cx=0; cx<=100; cx+=2){ pathPts.push([sx(cx), sy(decay(cx))]); }
  let d = 'M'+r2(pathPts[0][0])+','+r2(pathPts[0][1]);
  for(let i=1;i<pathPts.length;i++){ d += ' L'+r2(pathPts[i][0])+','+r2(pathPts[i][1]); }
  const crossCx = halflife * Math.log2(100/thr);
  const crossX = sx(crossCx), crossY = sy(thr);

  const area = d + ' L'+r2(sx(100))+','+r2(pB)+' L'+r2(sx(0))+','+r2(pB)+' Z';
  s += '<path d="'+area+'" fill="'+C.f12+'"/>';

  let plen = 0;
  for(let i=1;i<pathPts.length;i++){
    const dx=pathPts[i][0]-pathPts[i-1][0], dy=pathPts[i][1]-pathPts[i-1][1];
    plen += Math.sqrt(dx*dx+dy*dy);
  }
  plen = Math.ceil(plen);
  s += '<path d="'+d+'" fill="none" stroke="'+C.tealBright+'" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="--vp-len:'+plen+';stroke-dasharray:'+plen+';animation:viz_parth_draw 2.2s ease-out forwards"/>';

  s += '<circle cx="'+r2(crossX)+'" cy="'+r2(crossY)+'" r="4.5" fill="'+C.panel+'" stroke="'+C.red+'" stroke-width="1.6"/>';
  s += '<text x="'+r2(crossX-8)+'" y="'+r2(crossY+15)+'" text-anchor="end" font-family="Inter,sans-serif" font-size="9.5" fill="'+C.red+'">predicted failure</text>';

  const repCx = crossCx - 18;
  const repV = decay(repCx);
  const repX = sx(repCx), repY = sy(repV);
  s += '<line x1="'+r2(repX)+'" y1="'+r2(repY)+'" x2="'+r2(repX)+'" y2="'+r2(pB)+'" stroke="'+C.amber+'" stroke-width="1" stroke-dasharray="2 3" opacity="0.55"/>';
  s += '<g class="viz_parth_marker">';
  s += '<circle cx="'+r2(repX)+'" cy="'+r2(repY)+'" r="6" fill="'+C.amber+'"/>';
  s += '<circle cx="'+r2(repX)+'" cy="'+r2(repY)+'" r="10.5" fill="none" stroke="'+C.amber+'" stroke-width="1.2" opacity="0.6"/>';
  s += '</g>';
  const lblY = repY - 30;
  s += '<text x="'+r2(repX)+'" y="'+r2(lblY)+'" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" font-weight="600" fill="'+C.amber+'">Replace by</text>';
  s += '<text x="'+r2(repX)+'" y="'+r2(lblY+12)+'" text-anchor="middle" font-family="Inter,sans-serif" font-size="9.5" fill="'+C.amber+'">'+Math.round(repV)+'% life left</text>';

  const lgY = pT - 4;
  s += '<g font-family="Inter,sans-serif" font-size="9.5">';
  s += '<line x1="'+r2(pR-128)+'" y1="'+r2(lgY)+'" x2="'+r2(pR-114)+'" y2="'+r2(lgY)+'" stroke="'+C.tealBright+'" stroke-width="2.4"/>';
  s += '<text x="'+r2(pR-110)+'" y="'+r2(lgY+3.5)+'" fill="'+C.muted+'">remaining life</text>';
  s += '</g>';

  s += '</svg>';
  return s;
}

/* ==== energyGrid ==== */
function viz_energyGrid(){
  const C = {
    bg:'#141414', panel:'#1A1A1A', teal:'#0D7377', tealBright:'#14A8AD',
    fill12:'rgba(13,115,119,0.12)', fill20:'rgba(13,115,119,0.2)', fill35:'rgba(13,115,119,0.35)',
    amber:'#E8A838', text:'#F0F0F0', muted:'#909090', tick:'#707070',
    grid:'#262626', faint:'rgba(255,255,255,0.06)', red:'#C75450'
  };
  const W = 760, H = 432;
  // Fixed hand-placed node coordinates (graph canvas region roughly y 96..376)
  const N = {
    SUB:  {x:380, y:128, label:'Substation', sub:'69 kV bus', type:'sub'},
    F1:   {x:212, y:208, label:'Feeder A',  sub:'12.5 kV', type:'feeder'},
    F2:   {x:380, y:208, label:'Feeder B',  sub:'12.5 kV', type:'feeder'},
    F3:   {x:556, y:208, label:'Feeder C',  sub:'12.5 kV', type:'feeder'},
    T1:   {x:148, y:300, label:'Transformer T1', sub:'1.5 MVA', type:'xfmr'},
    T2:   {x:300, y:300, label:'Transformer T2', sub:'2.0 MVA - FAULT', type:'xfmr', fault:true},
    T3:   {x:380, y:300, label:'Transformer T3', sub:'1.0 MVA', type:'xfmr'},
    T4:   {x:556, y:300, label:'Transformer T4', sub:'1.5 MVA', type:'xfmr'},
    D1:   {x:120, y:208, label:'DER - Solar', sub:'PV 800 kW', type:'der'},
    D2:   {x:648, y:300, label:'DER - Battery', sub:'BESS 1 MWh', type:'der'},
    L:    {x:300, y:368, label:'Load L (stranded)', sub:'restored via reroute', type:'leaf'}
  };

  // Edges: a=from, b=to, w=load weight (stroke width), key for styling
  const edges = [
    {a:'D1', b:'F1', w:1.6, kind:'der'},
    {a:'SUB', b:'F1', w:3.4, kind:'normal'},
    {a:'SUB', b:'F2', w:3.0, kind:'normal'},
    {a:'SUB', b:'F3', w:3.6, kind:'normal'},
    {a:'F1', b:'T1', w:2.4, kind:'normal'},
    {a:'F3', b:'T4', w:2.6, kind:'normal'},
    {a:'F3', b:'D2', w:1.6, kind:'der'},
    {a:'F2', b:'T3', w:2.0, kind:'normal'},
    // primary feed to faulted transformer T2 -> becomes OUTAGE (dashed/dim)
    {a:'F2', b:'T2', w:2.6, kind:'outage'},
    // faulted transformer's downstream edge to load -> OUTAGE
    {a:'T2', b:'L', w:2.2, kind:'outage'},
    // REROUTE path: T3 -> L picks up the stranded load via tie switch
    {a:'T3', b:'L', w:2.4, kind:'reroute'}
  ];

  const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  let svg = '';
  svg += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:760px;height:auto;display:block" role="img" aria-label="Distribution grid fault and reroute graph: Transformer T2 faults, its downstream feed goes to outage, and an alternate teal path reroutes power from Transformer T3 to restore the stranded load. Result: 22 percent fewer circuit faults and 18 million dollars annual improvement.">`;

  // ---- styles + keyframes (prefixed) ----
  svg += `<style>
    @keyframes viz_energyGrid_pulse { 0%,100%{ opacity:0.55; transform:scale(0.82); } 50%{ opacity:0.2; transform:scale(1.18); } }
    @keyframes viz_energyGrid_faultGlow { 0%,100%{ opacity:1; } 50%{ opacity:0.55; } }
    @keyframes viz_energyGrid_dash { to { stroke-dashoffset:-16; } }
    @keyframes viz_energyGrid_rerouteGlow { 0%,100%{ opacity:0.85; } 50%{ opacity:1; } }
    @keyframes viz_energyGrid_flow { to { stroke-dashoffset:-22; } }
    .viz_energyGrid_pulseRing { transform-box:fill-box; transform-origin:center; animation: viz_energyGrid_pulse 2.4s ease-in-out infinite; }
    .viz_energyGrid_faultNode { animation: viz_energyGrid_faultGlow 2.4s ease-in-out infinite; }
    .viz_energyGrid_outage { animation: viz_energyGrid_dash 1.6s linear infinite; }
    .viz_energyGrid_reroute { animation: viz_energyGrid_rerouteGlow 2.2s ease-in-out infinite; }
    .viz_energyGrid_flowDot { animation: viz_energyGrid_flow 1.4s linear infinite; }
    .viz_energyGrid_node:hover { filter: brightness(1.25); }
  </style>`;

  // ---- background panel ----
  svg += `<rect x="0" y="0" width="${W}" height="${H}" rx="10" fill="${C.bg}"/>`;
  svg += `<rect x="0.5" y="0.5" width="${W-1}" height="${H-1}" rx="10" fill="none" stroke="${C.faint}"/>`;

  // ---- header ----
  svg += `<text x="20" y="30" font-family="Inter,sans-serif" font-size="13.5" font-weight="600" fill="${C.text}">Grid as graph: detect fault → compute reroute</text>`;
  svg += `<text x="20" y="48" font-family="Inter,sans-serif" font-size="11" fill="${C.muted}">Distribution grid fault + reroute graph</text>`;

  // ---- headline metric (amber) top-right ----
  const hx = W - 20;
  svg += `<text x="${hx}" y="28" text-anchor="end" font-family="Inter,sans-serif" font-size="20" font-weight="700" fill="${C.amber}">22% fewer circuit faults</text>`;
  svg += `<text x="${hx}" y="48" text-anchor="end" font-family="Inter,sans-serif" font-size="13" font-weight="600" fill="${C.amber}">$18M annual improvement</text>`;

  // ---- divider ----
  svg += `<line x1="20" y1="62" x2="${W-20}" y2="62" stroke="${C.grid}"/>`;

  // ---- edges ----
  function edgePath(e){
    const A = N[e.a], B = N[e.b];
    const x1=A.x, y1=A.y, x2=B.x, y2=B.y;
    let stroke, sw, extra='', dash='', opacity=0.9, title='';
    if(e.kind==='outage'){
      stroke=C.red; sw=Math.max(1.6,e.w*0.7); dash=`stroke-dasharray="6 7"`; opacity=0.5;
      extra=`class="viz_energyGrid_outage"`;
      title=`${N[e.a].label} → ${N[e.b].label}: OUTAGE (de-energized)`;
    } else if(e.kind==='reroute'){
      stroke=C.tealBright; sw=Math.max(2.4,e.w);
      extra=`class="viz_energyGrid_reroute"`;
      title=`${N[e.a].label} → ${N[e.b].label}: REROUTE (alternate feed restored)`;
    } else if(e.kind==='der'){
      stroke=C.teal; sw=e.w; opacity=0.7; dash=`stroke-dasharray="2 4"`;
      title=`${N[e.a].label} → ${N[e.b].label}: DER tie, load ${e.w.toFixed(1)}`;
    } else {
      stroke=C.teal; sw=e.w; opacity=0.85;
      title=`${N[e.a].label} → ${N[e.b].label}: line load ${e.w.toFixed(1)}`;
    }
    let s = `<g>`;
    s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw.toFixed(2)}" stroke-linecap="round" opacity="${opacity}" ${dash} ${extra}><title>${esc(title)}</title></line>`;
    // flow dot for the reroute path to show restored flow direction
    if(e.kind==='reroute'){
      const len = Math.hypot(x2-x1,y2-y1);
      s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.text}" stroke-width="2" stroke-linecap="round" stroke-dasharray="2 ${(len-2).toFixed(1)}" stroke-dashoffset="0" class="viz_energyGrid_flowDot" opacity="0.9"/>`;
    }
    s += `</g>`;
    return s;
  }
  edges.forEach(e=>{ svg += edgePath(e); });

  // ---- nodes ----
  function node(key){
    const n = N[key];
    let shape='', g=`<g class="viz_energyGrid_node">`;
    const tip = `${n.label} — ${n.sub}`;
    if(n.type==='sub'){
      const s=22;
      shape += `<rect x="${n.x-s/2}" y="${n.y-s/2}" width="${s}" height="${s}" rx="3" fill="${C.fill35}" stroke="${C.tealBright}" stroke-width="2"/>`;
      shape += `<rect x="${n.x-6}" y="${n.y-6}" width="12" height="12" rx="2" fill="${C.tealBright}"/>`;
    } else if(n.type==='feeder'){
      shape += `<circle cx="${n.x}" cy="${n.y}" r="11" fill="${C.fill20}" stroke="${C.teal}" stroke-width="2"/>`;
      shape += `<circle cx="${n.x}" cy="${n.y}" r="4" fill="${C.teal}"/>`;
    } else if(n.type==='xfmr'){
      if(n.fault){
        // pulsing ring behind faulted transformer (scale/opacity animation; resting state = static r=26)
        shape += `<circle cx="${n.x}" cy="${n.y}" r="26" fill="none" stroke="${C.red}" stroke-width="1.5" opacity="0.55" class="viz_energyGrid_pulseRing"/>`;
        shape += `<g class="viz_energyGrid_faultNode"><circle cx="${n.x}" cy="${n.y}" r="13" fill="rgba(199,84,80,0.25)" stroke="${C.red}" stroke-width="2.5"/>`;
        // fault bolt marker
        shape += `<path d="M${n.x-2} ${n.y-6} L${n.x+3} ${n.y-1} L${n.x} ${n.y} L${n.x+2} ${n.y+6} L${n.x-3} ${n.y+1} L${n.x} ${n.y} Z" fill="${C.red}"/></g>`;
      } else {
        shape += `<circle cx="${n.x}" cy="${n.y}" r="10" fill="${C.fill12}" stroke="${C.teal}" stroke-width="1.8"/>`;
        shape += `<circle cx="${n.x}" cy="${n.y}" r="3.5" fill="${C.teal}"/>`;
      }
    } else if(n.type==='der'){
      // diamond, distinct + teal-bright
      const r=10;
      shape += `<path d="M${n.x} ${n.y-r} L${n.x+r} ${n.y} L${n.x} ${n.y+r} L${n.x-r} ${n.y} Z" fill="${C.fill20}" stroke="${C.tealBright}" stroke-width="2"/>`;
      shape += `<circle cx="${n.x}" cy="${n.y}" r="3" fill="${C.tealBright}"/>`;
    } else if(n.type==='leaf'){
      // stranded load triangle, restored -> teal-bright outline
      const r=11;
      shape += `<path d="M${n.x} ${n.y-r} L${n.x+r} ${n.y+r*0.8} L${n.x-r} ${n.y+r*0.8} Z" fill="${C.fill20}" stroke="${C.tealBright}" stroke-width="2"/>`;
    }
    g += shape;
    g += `<title>${esc(tip)}</title></g>`;
    return g;
  }
  Object.keys(N).forEach(k=> svg += node(k));

  // ---- node labels ----
  function label(key, dy, anchor){
    const n = N[key];
    anchor = anchor || 'middle';
    let color = C.muted;
    if(n.fault) color = C.red;
    let x = n.x;
    if(anchor==='start') x = n.x + 16;
    if(anchor==='end') x = n.x - 16;
    let s = `<text x="${x}" y="${n.y+dy}" text-anchor="${anchor}" font-family="Inter,sans-serif" font-size="10.5" fill="${color}" font-weight="${n.fault?600:400}">${esc(n.label)}</text>`;
    return s;
  }
  svg += label('SUB', -18);
  svg += label('F1', -16);
  svg += label('F2', -16);
  svg += label('F3', -16);
  svg += label('T1', 24);
  // T2 label nudged to the left side so it does not sit on the vertical T2->L outage line
  svg += label('T2', 4, 'end');
  svg += label('T3', 24);
  svg += label('T4', 24);
  svg += `<text x="${N.D1.x}" y="${N.D1.y-16}" text-anchor="middle" font-family="Inter,sans-serif" font-size="10.5" fill="${C.tealBright}">DER • Solar</text>`;
  svg += `<text x="${N.D2.x}" y="${N.D2.y+24}" text-anchor="middle" font-family="Inter,sans-serif" font-size="10.5" fill="${C.tealBright}">DER • Battery</text>`;
  svg += `<text x="${N.L.x}" y="${N.L.y+24}" text-anchor="middle" font-family="Inter,sans-serif" font-size="10.5" fill="${C.tealBright}" font-weight="600">Load L • restored</text>`;

  // ---- legend (bottom, in its own band clear of node labels) ----
  const ly = H - 18;
  // separator above the legend band
  svg += `<line x1="20" y1="${ly-16}" x2="${W-20}" y2="${ly-16}" stroke="${C.grid}"/>`;
  let lx = 20;
  function legItem(drawer, txt, gap){
    let s = `<g>` + drawer(lx) + `<text x="${lx+22}" y="${ly+4}" font-family="Inter,sans-serif" font-size="10.5" fill="${C.muted}">${esc(txt)}</text></g>`;
    lx += 22 + txt.length*6.1 + (gap||22);
    return s;
  }
  svg += legItem(x=>`<line x1="${x}" y1="${ly}" x2="${x+16}" y2="${ly}" stroke="${C.teal}" stroke-width="3" stroke-linecap="round"/>`, 'Energized line (width = load)');
  svg += legItem(x=>`<line x1="${x}" y1="${ly}" x2="${x+16}" y2="${ly}" stroke="${C.red}" stroke-width="2.5" stroke-dasharray="5 5" stroke-linecap="round"/>`, 'Outage');
  svg += legItem(x=>`<line x1="${x}" y1="${ly}" x2="${x+16}" y2="${ly}" stroke="${C.tealBright}" stroke-width="3" stroke-linecap="round"/>`, 'Reroute');
  svg += legItem(x=>`<circle cx="${x+8}" cy="${ly}" r="6" fill="rgba(199,84,80,0.25)" stroke="${C.red}" stroke-width="2"/>`, 'Fault (transformer)');

  svg += `</svg>`;
  return svg;
}

/* ==== causalML ==== */
function viz_causalML(){
  const W=760, pad=16, H=432;
  const lx=pad, lw=380;
  const plotTop=96, plotBot=286, plotH=plotBot-plotTop;
  const axisX=lx+44;
  const channels=[
    {name:"Promotions", naive:88, causal:41},
    {name:"Pricing",    naive:72, causal:54},
    {name:"Digital",    naive:64, causal:23},
    {name:"In-store",   naive:49, causal:31}
  ];
  const maxVal=100;
  const yOf=v=>plotBot-(v/maxVal)*plotH;
  const groupW=(lw-(axisX-lx)-12)/channels.length;
  const barW=26, gap=8;

  let grid="";
  for(let g=0; g<=4; g++){
    const gv=g*25, gy=yOf(gv);
    grid+=`<line x1="${axisX}" y1="${gy.toFixed(1)}" x2="${lx+lw}" y2="${gy.toFixed(1)}" stroke="#262626" stroke-width="1"/>`;
    grid+=`<text x="${axisX-8}" y="${(gy+3).toFixed(1)}" font-family="Inter,sans-serif" font-size="10" fill="#707070" text-anchor="end">${gv}</text>`;
  }

  let bars="";
  channels.forEach((c,i)=>{
    const gx=axisX+8+i*groupW;
    const naiveX=gx, causalX=gx+barW+gap;
    const nY=yOf(c.naive), cY=yOf(c.causal);
    const nH=plotBot-nY, cH=plotBot-cY;
    bars+=`<rect x="${naiveX.toFixed(1)}" y="${nY.toFixed(1)}" width="${barW}" height="${nH.toFixed(1)}" rx="2" fill="rgba(13,115,119,0.2)" stroke="#0D7377" stroke-width="1"><title>${c.name} — Naive correlation: ${c.naive}</title></rect>`;
    bars+=`<rect x="${causalX.toFixed(1)}" y="${cY.toFixed(1)}" width="${barW}" height="${cH.toFixed(1)}" rx="2" fill="#14A8AD"><title>${c.name} — Causal effect: ${c.causal}</title></rect>`;
    bars+=`<line x1="${causalX.toFixed(1)}" y1="${nY.toFixed(1)}" x2="${(causalX+barW).toFixed(1)}" y2="${nY.toFixed(1)}" stroke="#909090" stroke-width="1" stroke-dasharray="2 2" opacity="0.55"/>`;
    bars+=`<text x="${(gx+barW+gap/2).toFixed(1)}" y="${plotBot+16}" font-family="Inter,sans-serif" font-size="10" fill="#909090" text-anchor="middle">${c.name}</text>`;
  });

  const axis=`<line x1="${axisX}" y1="${plotTop}" x2="${axisX}" y2="${plotBot}" stroke="#262626" stroke-width="1"/><line x1="${axisX}" y1="${plotBot}" x2="${lx+lw}" y2="${plotBot}" stroke="#262626" stroke-width="1"/>`;

  const legY=plotBot+30;
  const legend=`<rect x="${axisX}" y="${legY}" width="12" height="12" rx="2" fill="rgba(13,115,119,0.2)" stroke="#0D7377" stroke-width="1"/>`+
    `<text x="${axisX+18}" y="${legY+10}" font-family="Inter,sans-serif" font-size="11" fill="#909090">Naive correlation (overstated)</text>`+
    `<rect x="${axisX+208}" y="${legY}" width="12" height="12" rx="2" fill="#14A8AD"/>`+
    `<text x="${axisX+226}" y="${legY+10}" font-family="Inter,sans-serif" font-size="11" fill="#909090">Causal effect</text>`;

  const rx=pad+402, rw=W-pad-rx;
  const rPlotL=rx+34, rPlotR=rx+rw;
  const rTop=120, rBot=262;
  const observed=[40,44,49,55,62,70,77,83,88,92];
  const counter =[40,42,45,48,52,55,59,62,65,68];
  const n=observed.length, rmax=100, rmin=30;
  const xOf=i=>rPlotL+(i/(n-1))*(rPlotR-rPlotL);
  const ryOf=v=>rBot-((v-rmin)/(rmax-rmin))*(rBot-rTop);

  let rgrid="";
  for(let g=0; g<=3; g++){
    const gv=rmin+g*((rmax-rmin)/3), gy=ryOf(gv);
    rgrid+=`<line x1="${rPlotL}" y1="${gy.toFixed(1)}" x2="${rPlotR}" y2="${gy.toFixed(1)}" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>`;
  }

  let gapPts="";
  for(let i=0;i<n;i++){ gapPts+=`${xOf(i).toFixed(1)},${ryOf(observed[i]).toFixed(1)} `; }
  for(let i=n-1;i>=0;i--){ gapPts+=`${xOf(i).toFixed(1)},${ryOf(counter[i]).toFixed(1)} `; }
  const gapPoly=`<polygon class="viz_causalML_gap" points="${gapPts.trim()}" fill="rgba(232,168,56,0.2)"/>`;

  const obsPath="M"+observed.map((v,i)=>`${xOf(i).toFixed(1)},${ryOf(v).toFixed(1)}`).join(" L");
  const cfPath ="M"+counter.map((v,i)=>`${xOf(i).toFixed(1)},${ryOf(v).toFixed(1)}`).join(" L");
  const cfLine=`<path d="${cfPath}" fill="none" stroke="#909090" stroke-width="2" stroke-dasharray="5 4" stroke-linejoin="round" stroke-linecap="round"/>`;
  const obsLine=`<path class="viz_causalML_obs" d="${obsPath}" fill="none" stroke="#14A8AD" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  const obsDot=`<circle cx="${xOf(n-1).toFixed(1)}" cy="${ryOf(observed[n-1]).toFixed(1)}" r="3.5" fill="#14A8AD"/>`;
  const cfDot=`<circle cx="${xOf(n-1).toFixed(1)}" cy="${ryOf(counter[n-1]).toFixed(1)}" r="3" fill="#1A1A1A" stroke="#909090" stroke-width="1.5"/>`;

  const gMidY=(ryOf(observed[n-1])+ryOf(counter[n-1]))/2;
  const gapLabel=`<line x1="${(xOf(n-1)-5).toFixed(1)}" y1="${ryOf(observed[n-1]).toFixed(1)}" x2="${(xOf(n-1)-5).toFixed(1)}" y2="${ryOf(counter[n-1]).toFixed(1)}" stroke="#E8A838" stroke-width="2"/>`+
    `<text x="${(xOf(n-1)-12).toFixed(1)}" y="${(gMidY+4).toFixed(1)}" font-family="Inter,sans-serif" font-size="12" font-weight="600" fill="#E8A838" text-anchor="end">+7% causal lift</text>`;

  const rAxis=`<line x1="${rPlotL}" y1="${rTop}" x2="${rPlotL}" y2="${rBot}" stroke="#262626" stroke-width="1"/><line x1="${rPlotL}" y1="${rBot}" x2="${rPlotR}" y2="${rBot}" stroke="#262626" stroke-width="1"/>`;
  let rticks="";
  [["T0",0],["T5",5],["T9",9]].forEach(t=>{
    rticks+=`<text x="${xOf(t[1]).toFixed(1)}" y="${rBot+15}" font-family="Inter,sans-serif" font-size="10" fill="#707070" text-anchor="middle">${t[0]}</text>`;
  });
  const obsLbl=`<text x="${xOf(1).toFixed(1)}" y="${(ryOf(observed[1])-9).toFixed(1)}" font-family="Inter,sans-serif" font-size="11" fill="#14A8AD">Observed</text>`;
  const cfLbl=`<text x="${xOf(6).toFixed(1)}" y="${(ryOf(counter[6])+18).toFixed(1)}" font-family="Inter,sans-serif" font-size="11" fill="#909090" text-anchor="middle">Counterfactual (no intervention)</text>`;

  const title=`<text x="${pad}" y="28" font-family="Inter,sans-serif" font-size="13.5" font-weight="600" fill="#F0F0F0">Isolating true treatment effect from confounders</text>`;
  const sub=`<text x="${pad}" y="46" font-family="Inter,sans-serif" font-size="11" fill="#909090">Causal attribution vs correlation + counterfactual</text>`;
  const lTitle=`<text x="${lx}" y="78" font-family="Inter,sans-serif" font-size="11" fill="#909090">Attributed effect by channel (index)</text>`;
  const rTitle=`<text x="${rx}" y="78" font-family="Inter,sans-serif" font-size="11" fill="#909090">Sales: observed vs counterfactual</text>`;

  const bandY=384;
  const hlDiv=`<line x1="${pad}" y1="${bandY-44}" x2="${W-pad}" y2="${bandY-44}" stroke="#262626" stroke-width="1"/>`;
  const headline=`<text x="${pad}" y="${bandY+6}" font-family="Inter,sans-serif" font-size="28" font-weight="700" fill="#E8A838">+7%</text>`+
    `<text x="${pad+66}" y="${bandY-4}" font-family="Inter,sans-serif" font-size="12" fill="#F0F0F0">sales uplift</text>`+
    `<text x="${pad+66}" y="${bandY+12}" font-family="Inter,sans-serif" font-size="10.5" fill="#909090">attributable to true treatment</text>`+
    `<line x1="${pad+250}" y1="${bandY-22}" x2="${pad+250}" y2="${bandY+12}" stroke="#262626" stroke-width="1"/>`+
    `<text x="${pad+274}" y="${bandY+6}" font-family="Inter,sans-serif" font-size="28" font-weight="700" fill="#E8A838">+22%</text>`+
    `<text x="${pad+362}" y="${bandY-4}" font-family="Inter,sans-serif" font-size="12" fill="#F0F0F0">recommendation acceptance</text>`+
    `<text x="${pad+362}" y="${bandY+12}" font-family="Inter,sans-serif" font-size="10.5" fill="#909090">vs correlation-based targeting</text>`;
  const divider=`<line x1="${pad+390}" y1="64" x2="${pad+390}" y2="${bandY-52}" stroke="#262626" stroke-width="1"/>`;

  const css=`<style>@keyframes viz_causalML_draw{from{stroke-dashoffset:640}to{stroke-dashoffset:0}}@keyframes viz_causalML_fade{from{opacity:0}to{opacity:1}}.viz_causalML_obs{stroke-dasharray:640;stroke-dashoffset:0;animation:viz_causalML_draw 1.8s ease-out forwards}.viz_causalML_gap{animation:viz_causalML_fade 1.1s ease-out 1s both}</style>`;

  const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:760px;height:auto;display:block" role="img" aria-label="Isolating true treatment effect from confounders. Left: grouped bars for four channels (Promotions, Pricing, Digital, In-store) where faint teal naive-correlation bars overstate impact versus the smaller solid teal causal-effect bars. Right: an observed sales line rising above a counterfactual no-intervention line over ten time points, the amber gap labelled plus 7 percent causal lift. Headline: 7 percent sales uplift and 22 percent better recommendation acceptance.">`+
    css+
    `<rect x="0" y="0" width="${W}" height="${H}" fill="#141414"/>`+
    `<rect x="8" y="8" width="${W-16}" height="${H-16}" rx="6" fill="#1A1A1A"/>`+
    title+sub+lTitle+rTitle+divider+
    grid+axis+bars+legend+
    rgrid+rAxis+gapPoly+cfLine+obsLine+obsDot+cfDot+gapLabel+rticks+obsLbl+cfLbl+
    hlDiv+headline+
    `</svg>`;
  return svg;
}

/* ==== forecastExplain ==== */
function viz_forecastExplain(){
  const W=760, H=420, padL=72, padR=24, padT=96, padB=84;
  const plotW=W-padL-padR, plotH=H-padT-padB;
  const baseY=padT+plotH;
  const axisMax=130, axisMin=0;
  const yOf=v=>baseY-(v-axisMin)/(axisMax-axisMin)*plotH;
  const fmt=v=>(v>0?"+":(v<0?"−":""))+Math.abs(v);

  const steps=[
    {label:"Last Year", type:"anchor", value:100, start:0, end:100},
    {label:"Seasonality", type:"pos", value:14},
    {label:"Price", type:"neg", value:-8},
    {label:"Promo", type:"pos", value:9},
    {label:"Distribution", type:"pos", value:6},
    {label:"Macro", type:"neg", value:-5},
    {label:"Current Forecast", type:"final", value:116, start:0, end:116}
  ];
  let run=100;
  for(let i=1;i<steps.length-1;i++){const s=steps[i]; s.start=run; run+=s.value; s.end=run;}

  const n=steps.length;
  const slot=plotW/n;
  const barW=Math.min(64, slot*0.56);
  const cx=i=>padL+slot*i+slot/2;

  const COL={surface:"#141414",teal:"#14A8AD",tealDim:"#0D7377",red:"#C75450",amber:"#E8A838",
    text:"#F0F0F0",muted:"#909090",tick:"#707070",grid:"#262626",faint:"rgba(255,255,255,0.06)"};

  let svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+W+' '+H+'" style="width:100%;max-width:760px;height:auto;display:block" role="img" aria-label="Forecast-change waterfall: Last Year 100, plus Seasonality 14, minus Price 8, plus Promo 9, plus Distribution 6, minus Macro 5, equals Current Forecast 116.">';

  svg+='<style>'
    +'.viz_forecastExplain_bar{opacity:1;animation:viz_forecastExplain_rise .6s ease-out both}'
    +'@keyframes viz_forecastExplain_rise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}'
    +'.viz_forecastExplain_lbl{opacity:1;animation:viz_forecastExplain_fade .5s ease-out both}'
    +'@keyframes viz_forecastExplain_fade{from{opacity:0}to{opacity:1}}'
    +'.viz_forecastExplain_g:hover .viz_forecastExplain_bar{opacity:.85}'
    +'.viz_forecastExplain_dash{stroke-dasharray:4 4}'
    +'</style>';

  svg+='<rect x="0" y="0" width="'+W+'" height="'+H+'" fill="#101010"/>';

  svg+='<text x="20" y="30" font-family="Inter,sans-serif" font-size="13.5" font-weight="600" fill="'+COL.text+'">Why the forecast moved: driver attribution</text>';
  svg+='<text x="20" y="48" font-family="Inter,sans-serif" font-size="11" fill="'+COL.muted+'">Forecast-change waterfall — Last Year → Current decomposed by driver</text>';
  svg+='<text x="20" y="65" font-family="Inter,sans-serif" font-size="11" fill="'+COL.muted+'">Surrogate model + elasticity + dynamic programming; deployed in Anaplan</text>';

  const ticks=[0,25,50,75,100,125];
  for(const t of ticks){
    const y=yOf(t);
    svg+='<line x1="'+padL+'" y1="'+y.toFixed(1)+'" x2="'+(W-padR)+'" y2="'+y.toFixed(1)+'" stroke="'+(t===0?COL.grid:COL.faint)+'" stroke-width="1"/>';
    svg+='<text x="'+(padL-10)+'" y="'+(y+3.5).toFixed(1)+'" font-family="Inter,sans-serif" font-size="10" fill="'+COL.tick+'" text-anchor="end">'+t+'</text>';
  }
  const axisMidY=(padT+plotH/2).toFixed(1);
  svg+='<text x="22" y="'+axisMidY+'" font-family="Inter,sans-serif" font-size="10" fill="'+COL.tick+'" transform="rotate(-90 22 '+axisMidY+')" text-anchor="middle">index vs Last Year</text>';

  let delay=0;
  for(let i=0;i<n;i++){
    const s=steps[i];
    const x=cx(i)-barW/2;
    const top=yOf(Math.max(s.start,s.end));
    const bot=yOf(Math.min(s.start,s.end));
    const h=Math.max(2,bot-top);
    let fill,stroke;
    if(s.type==="final"){fill=COL.amber;stroke=COL.amber;}
    else if(s.type==="anchor"){fill="rgba(13,115,119,0.2)";stroke=COL.tealDim;}
    else if(s.type==="pos"){fill="rgba(13,115,119,0.35)";stroke=COL.teal;}
    else {fill="rgba(199,84,80,0.22)";stroke=COL.red;}

    svg+='<g class="viz_forecastExplain_g">';
    svg+='<title>'+s.label+': '+(s.type==="anchor"||s.type==="final"?s.value:fmt(s.value))+'</title>';
    svg+='<rect class="viz_forecastExplain_bar" style="animation-delay:'+delay.toFixed(2)+'s;transform-origin:'+cx(i).toFixed(1)+'px '+bot.toFixed(1)+'px" x="'+x.toFixed(1)+'" y="'+top.toFixed(1)+'" width="'+barW.toFixed(1)+'" height="'+h.toFixed(1)+'" rx="2" fill="'+fill+'" stroke="'+stroke+'" stroke-width="1.5"/>';
    svg+='</g>';

    const valY=top-7;
    const valColor=(s.type==="final")?COL.amber:(s.type==="anchor"?COL.text:(s.type==="pos"?COL.teal:COL.red));
    const valTxt=(s.type==="anchor"||s.type==="final")?String(s.value):fmt(s.value);
    const valWeight=(s.type==="final")?"700":"600";
    const valSize=(s.type==="final")?"15":"12";
    svg+='<text class="viz_forecastExplain_lbl" style="animation-delay:'+(delay+0.25).toFixed(2)+'s" x="'+cx(i).toFixed(1)+'" y="'+valY.toFixed(1)+'" font-family="Inter,sans-serif" font-size="'+valSize+'" font-weight="'+valWeight+'" fill="'+valColor+'" text-anchor="middle">'+valTxt+'</text>';

    const words=s.label.split(" ");
    if(words.length>1){
      svg+='<text x="'+cx(i).toFixed(1)+'" y="'+(baseY+18)+'" font-family="Inter,sans-serif" font-size="10.5" fill="'+(s.type==="final"?COL.amber:COL.muted)+'" font-weight="'+(s.type==="final"?"600":"400")+'" text-anchor="middle">'+words[0]+'</text>';
      svg+='<text x="'+cx(i).toFixed(1)+'" y="'+(baseY+31)+'" font-family="Inter,sans-serif" font-size="10.5" fill="'+(s.type==="final"?COL.amber:COL.muted)+'" font-weight="'+(s.type==="final"?"600":"400")+'" text-anchor="middle">'+words[1]+'</text>';
    } else {
      const isAnchor=s.type==="anchor";
      svg+='<text x="'+cx(i).toFixed(1)+'" y="'+(baseY+18)+'" font-family="Inter,sans-serif" font-size="10.5" fill="'+(isAnchor?COL.text:COL.muted)+'" font-weight="'+(isAnchor?"600":"400")+'" text-anchor="middle">'+s.label+'</text>';
    }
    delay+=0.12;
  }

  for(let i=0;i<n-1;i++){
    const a=steps[i];
    const yConnect=yOf((a.type==="anchor"||a.type==="final")?a.value:a.end);
    const x1=cx(i)+barW/2;
    const x2=cx(i+1)-barW/2;
    svg+='<line class="viz_forecastExplain_dash" x1="'+x1.toFixed(1)+'" y1="'+yConnect.toFixed(1)+'" x2="'+x2.toFixed(1)+'" y2="'+yConnect.toFixed(1)+'" stroke="'+COL.tick+'" stroke-width="1"/>';
  }

  // legend removed — it merged with the waterfall bars

  svg+='</svg>';
  return svg;
}

/* ==== salesForecast ==== */
function viz_salesForecast(){
  const W = 760, H = 360;
  const pad = 16;
  const PX = (n) => Math.round(n * 100) / 100;

  // ---- Left line chart geometry ----
  const lx = pad + 8;           // plot left
  const lw = 430;               // plot width
  const ly = 78;                // plot top
  const lh = 200;               // plot height
  const lr = lx + lw;           // plot right
  const lb = ly + lh;           // plot bottom

  const months = ["J","F","M","A","M","J","J","A","S","O","N","D"];
  // Actual sales (indexed values), 12 months
  const actual   = [62, 58, 71, 80, 76, 88, 96, 92, 105, 113, 121, 130];
  // Ensemble forecast tracks closely
  const forecast = [60, 60, 69, 78, 79, 86, 93, 95, 103, 110, 118, 132];
  // Confidence band half-width per month
  const ci       = [7, 7, 8, 8, 9, 9, 10, 10, 11, 12, 13, 14];

  const vMin = 40, vMax = 150;
  const sx = (i) => lx + (lw * i) / (months.length - 1);
  const sy = (v) => lb - (lh * (v - vMin)) / (vMax - vMin);

  // gridlines
  let grid = "";
  const yticks = [40, 70, 100, 130];
  yticks.forEach((v) => {
    grid += `<line x1="${PX(lx)}" y1="${PX(sy(v))}" x2="${PX(lr)}" y2="${PX(sy(v))}" stroke="#262626" stroke-width="1"/>`;
    grid += `<text x="${PX(lx - 8)}" y="${PX(sy(v) + 3.5)}" text-anchor="end" font-family="Inter,sans-serif" font-size="10" fill="#707070">${v}</text>`;
  });

  // month ticks
  let xlabels = "";
  months.forEach((m, i) => {
    xlabels += `<text x="${PX(sx(i))}" y="${PX(lb + 16)}" text-anchor="middle" font-family="Inter,sans-serif" font-size="10" fill="#707070">${m}</text>`;
  });

  // confidence band polygon (upper then lower reversed)
  let bandTop = "", bandBot = "";
  forecast.forEach((v, i) => {
    bandTop += `${PX(sx(i))},${PX(sy(v + ci[i]))} `;
  });
  for (let i = forecast.length - 1; i >= 0; i--) {
    bandBot += `${PX(sx(i))},${PX(sy(forecast[i] - ci[i]))} `;
  }
  const bandPts = (bandTop + bandBot).trim();

  // line path builder
  const pathOf = (arr) => {
    let d = "";
    arr.forEach((v, i) => {
      d += (i === 0 ? "M" : "L") + PX(sx(i)) + " " + PX(sy(v)) + " ";
    });
    return d.trim();
  };
  const dActual = pathOf(actual);
  const dForecast = pathOf(forecast);

  // markers on forecast line
  let fdots = "";
  forecast.forEach((v, i) => {
    fdots += `<circle cx="${PX(sx(i))}" cy="${PX(sy(v))}" r="2.4" fill="#14A8AD"/>`;
  });

  // ---- Right error-bar panel ----
  const rx0 = 540;                 // bars left baseline x
  const rBaseY = lb;               // shared baseline with chart bottom
  const barTop = ly + 24;          // top reference for tallest bar
  const barW = 56;
  const gap = 56;
  const b1x = rx0;                 // Elastic Net
  const b2x = rx0 + barW + gap;    // Ensemble

  // Elastic Net error = 100% (relative). Ensemble = 88% (12% shorter).
  const fullH = rBaseY - barTop;   // pixels for 100%
  const enH = PX(fullH * 0.84);          // elastic net (taller) — headroom left for callout
  const ensH = PX(fullH * 0.84 * 0.88);  // ensemble (12% shorter)
  const enTopY = PX(rBaseY - enH);
  const ensTopY = PX(rBaseY - ensH);

  // baseline for right panel
  const rBaseline = `<line x1="${PX(rx0 - 6)}" y1="${PX(rBaseY)}" x2="${PX(b2x + barW + 6)}" y2="${PX(rBaseY)}" stroke="#262626" stroke-width="1"/>`;

  // SMIL grow animations (resting state = final height/y already on rect, so safe if stripped)
  const enAnim = `<animate attributeName="height" from="0" to="${PX(enH)}" dur="1s" begin="0s" fill="freeze" calcMode="spline" keySplines="0.22 1 0.36 1"/><animate attributeName="y" from="${PX(rBaseY)}" to="${enTopY}" dur="1s" begin="0s" fill="freeze" calcMode="spline" keySplines="0.22 1 0.36 1"/>`;
  const ensAnim = `<animate attributeName="height" from="0" to="${ensH}" dur="1s" begin="0.15s" fill="freeze" calcMode="spline" keySplines="0.22 1 0.36 1"/><animate attributeName="y" from="${PX(rBaseY)}" to="${ensTopY}" dur="1s" begin="0.15s" fill="freeze" calcMode="spline" keySplines="0.22 1 0.36 1"/>`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:760px;height:auto;display:block" role="img" aria-label="Ensemble forecast accuracy: actual versus Bayesian-tuned ensemble forecast tracking closely over twelve months, with the tuned ensemble cutting forecast error 12 percent below the Elastic Net baseline.">
<style>
@keyframes viz_salesForecast_draw { from { stroke-dashoffset: 1400; } to { stroke-dashoffset: 0; } }
@keyframes viz_salesForecast_fade { from { opacity: 0; } to { opacity: 1; } }
@media (prefers-reduced-motion: no-preference) {
  .viz_salesForecast_line { stroke-dasharray: 1400; stroke-dashoffset: 1400; animation: viz_salesForecast_draw 1.6s ease-out forwards; }
  .viz_salesForecast_l2 { animation-delay: 0.25s; }
  .viz_salesForecast_dots { opacity: 0; animation: viz_salesForecast_fade 0.6s ease-out 1.5s forwards; }
  .viz_salesForecast_callout { opacity: 0; animation: viz_salesForecast_fade 0.7s ease-out 1.2s forwards; }
}
</style>
<rect x="0" y="0" width="${W}" height="${H}" fill="#141414"/>

<text x="${pad}" y="30" font-family="Inter,sans-serif" font-size="13.5" font-weight="600" fill="#F0F0F0">Ensemble forecast accuracy</text>
<text x="${pad}" y="48" font-family="Inter,sans-serif" font-size="11" fill="#909090">Elastic Net baseline &#8594; Bayesian-tuned ensemble</text>

<rect x="${PX(lx - 0.5)}" y="${ly}" width="${PX(lw + 1)}" height="${lh}" fill="#101010" stroke="#262626" stroke-width="1"/>
${grid}

<polygon points="${bandPts}" fill="rgba(13,115,119,0.20)"/>

<path d="${dActual}" fill="none" stroke="#F0F0F0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="viz_salesForecast_line"/>
<path d="${dForecast}" fill="none" stroke="#14A8AD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="viz_salesForecast_line viz_salesForecast_l2"/>
<g class="viz_salesForecast_dots">${fdots}</g>

${xlabels}
<text x="${PX(lx)}" y="${PX(lb + 34)}" font-family="Inter,sans-serif" font-size="10" fill="#707070">Months (indexed sales volume)</text>

<g font-family="Inter,sans-serif">
  <line x1="${PX(lx)}" y1="64" x2="${PX(lx + 20)}" y2="64" stroke="#F0F0F0" stroke-width="2"/>
  <text x="${PX(lx + 26)}" y="67.5" font-size="11" fill="#909090">Actual</text>
  <line x1="${PX(lx + 86)}" y1="64" x2="${PX(lx + 106)}" y2="64" stroke="#14A8AD" stroke-width="2"/>
  <text x="${PX(lx + 112)}" y="67.5" font-size="11" fill="#909090">Ensemble forecast</text>
  <rect x="${PX(lx + 232)}" y="59" width="11" height="10" fill="rgba(13,115,119,0.20)"/>
  <text x="${PX(lx + 248)}" y="67.5" font-size="11" fill="#909090">95% confidence</text>
</g>

<text x="${PX(rx0 - 6)}" y="64" font-family="Inter,sans-serif" font-size="11" fill="#909090">Forecast error (relative)</text>
${rBaseline}

<rect x="${PX(b1x)}" y="${enTopY}" width="${barW}" height="${PX(enH)}" fill="rgba(13,115,119,0.35)" stroke="#0D7377" stroke-width="1">
  <title>Elastic Net baseline — relative forecast error 100%</title>
  ${enAnim}
</rect>
<rect x="${PX(b2x)}" y="${ensTopY}" width="${barW}" height="${ensH}" fill="#14A8AD">
  <title>Bayesian-tuned LGBM + LSTM + TS ensemble — 12% lower error</title>
  ${ensAnim}
</rect>

<text x="${PX(b1x + barW / 2)}" y="${PX(rBaseY + 16)}" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" fill="#909090">Elastic Net</text>
<text x="${PX(b1x + barW / 2)}" y="${PX(rBaseY + 30)}" text-anchor="middle" font-family="Inter,sans-serif" font-size="10" fill="#707070">baseline</text>

<text x="${PX(b2x + barW / 2)}" y="${PX(rBaseY + 16)}" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" fill="#F0F0F0">Ensemble</text>
<text x="${PX(b2x + barW / 2)}" y="${PX(rBaseY + 30)}" text-anchor="middle" font-family="Inter,sans-serif" font-size="10" fill="#707070">LGBM+LSTM+TS</text>

<g class="viz_salesForecast_callout">
  <rect x="${PX((b1x + b2x) / 2 + barW / 2 - 48)}" y="78" width="96" height="22" rx="5" fill="#1A1A1A" stroke="#E8A838" stroke-width="1.2"/>
  <text x="${PX((b1x + b2x) / 2 + barW / 2)}" y="93" text-anchor="middle" font-family="Inter,sans-serif" font-size="11.5" font-weight="700" fill="#E8A838">&#8722;12% error</text>
  <line x1="${PX((b1x + b2x) / 2 + barW / 2)}" y1="100" x2="${PX((b1x + b2x) / 2 + barW / 2)}" y2="110" stroke="#E8A838" stroke-width="1.2"/>
  <line x1="${PX(b1x + barW / 2)}" y1="110" x2="${PX(b2x + barW / 2)}" y2="110" stroke="#E8A838" stroke-width="1.2"/>
  <line x1="${PX(b1x + barW / 2)}" y1="110" x2="${PX(b1x + barW / 2)}" y2="${PX(enTopY - 8)}" stroke="#E8A838" stroke-width="1.2"/>
  <path d="M${PX(b1x + barW / 2 - 4)},${PX(enTopY - 9)} L${PX(b1x + barW / 2)},${PX(enTopY - 2)} L${PX(b1x + barW / 2 + 4)},${PX(enTopY - 9)} Z" fill="#E8A838"/>
  <line x1="${PX(b2x + barW / 2)}" y1="110" x2="${PX(b2x + barW / 2)}" y2="${PX(ensTopY - 8)}" stroke="#E8A838" stroke-width="1.2"/>
  <path d="M${PX(b2x + barW / 2 - 4)},${PX(ensTopY - 9)} L${PX(b2x + barW / 2)},${PX(ensTopY - 2)} L${PX(b2x + barW / 2 + 4)},${PX(ensTopY - 9)} Z" fill="#E8A838"/>
</g>

<text x="${PX(rx0 - 6)}" y="${PX(lb + 50)}" font-family="Inter,sans-serif" font-size="10" fill="#707070">Bayesian hyperparameter optimization</text>
</svg>`;
  return svg;
}

/* ==== roboCar ==== */
function viz_roboCar(){
  var W=760,H=400,pad=16;

  // --- centerline of a windy closed circuit (hairpin + S-curve chicane + sweepers) ---
  var CENTER="M 140.0 152.0 C 149.6 149.4 194.2 129.0 208.0 126.0 C 221.8 123.0 265.2 119.8 278.0 122.0 C 290.8 124.2 327.8 141.8 336.0 148.0 C 344.2 154.2 361.4 177.4 360.0 184.0 C 358.6 190.6 325.0 206.0 322.0 214.0 C 319.0 222.0 324.8 255.6 330.0 264.0 C 335.2 272.4 363.6 293.8 374.0 298.0 C 384.4 302.2 423.4 307.2 434.0 306.0 C 444.6 304.8 472.6 291.8 480.0 286.0 C 487.4 280.2 506.0 255.8 508.0 248.0 C 510.0 240.2 504.4 213.8 500.0 208.0 C 495.6 202.2 471.2 190.4 464.0 190.0 C 456.8 189.6 433.0 199.0 428.0 204.0 C 423.0 209.0 414.4 231.8 414.0 240.0 C 413.6 248.2 424.2 277.8 424.0 286.0 C 423.8 294.2 420.0 316.0 412.0 322.0 C 404.0 328.0 360.8 343.2 344.0 346.0 C 327.2 348.8 262.2 350.8 244.0 350.0 C 225.8 349.2 176.0 342.6 162.0 338.0 C 148.0 333.4 112.0 312.6 104.0 304.0 C 96.0 295.4 84.4 262.4 82.0 252.0 C 79.6 241.6 78.8 208.4 80.0 200.0 C 81.2 191.6 90.8 172.8 94.0 168.0 C 97.2 163.2 107.4 153.6 112.0 152.0 C 116.6 150.4 130.4 154.6 140.0 152.0 Z";
  // --- chosen avoidance racing line: smooth path swerving around the obstacles, kept inside the lane ---
  var RACE="M 140.0 151.9 C 141.1 151.5 148.8 148.5 151.4 147.1 C 154.0 145.8 165.2 139.4 168.4 137.3 C 171.5 135.2 182.9 126.4 185.9 124.5 C 189.0 122.5 198.9 116.5 201.6 115.8 C 204.4 115.1 213.0 116.4 216.1 116.8 C 219.1 117.2 231.2 119.6 234.7 120.0 C 238.2 120.4 251.2 120.9 254.5 121.0 C 257.9 121.1 268.8 121.2 271.4 121.4 C 274.0 121.5 280.2 122.5 282.5 123.1 C 284.9 123.7 294.1 127.2 296.9 128.3 C 299.7 129.5 310.6 134.3 313.4 135.7 C 316.3 137.1 325.9 141.9 328.0 143.1 C 330.2 144.3 335.4 147.5 336.8 148.7 C 338.3 149.9 342.6 154.4 343.9 156.0 C 345.2 157.6 350.0 164.3 351.0 166.3 C 352.0 168.2 354.5 175.9 354.5 177.4 C 354.5 179.0 351.7 182.8 351.1 183.1 C 350.6 183.3 349.5 179.4 348.6 180.0 C 347.7 180.6 342.8 188.0 341.2 190.0 C 339.6 192.0 333.1 200.2 331.5 202.1 C 329.9 204.1 324.4 209.6 323.5 211.1 C 322.5 212.6 321.4 216.7 321.2 218.4 C 321.1 220.2 321.5 228.2 321.8 230.6 C 322.0 233.1 323.6 242.6 324.1 245.1 C 324.6 247.6 326.7 256.0 327.4 257.9 C 328.1 259.8 330.2 264.3 331.3 265.8 C 332.5 267.3 337.9 272.6 339.8 274.3 C 341.7 275.9 349.6 282.3 351.9 284.0 C 354.1 285.6 362.3 291.4 364.3 292.6 C 366.3 293.9 372.1 297.2 374.1 297.9 C 376.0 298.5 382.9 299.7 385.5 299.8 C 388.0 299.9 399.0 299.2 402.1 298.8 C 405.2 298.4 416.5 295.7 419.2 295.3 C 421.9 295.0 429.4 295.0 431.2 295.4 C 433.0 295.7 437.0 298.7 438.9 299.0 C 440.8 299.3 449.6 299.1 452.1 298.7 C 454.5 298.2 463.1 295.1 465.3 294.2 C 467.5 293.2 474.5 289.6 476.0 288.7 C 477.6 287.7 481.2 285.0 482.5 283.7 C 483.8 282.5 488.7 277.1 490.1 275.3 C 491.6 273.6 496.9 266.5 498.3 264.6 C 499.7 262.7 504.1 256.0 505.1 254.4 C 506.1 252.9 508.4 248.8 509.1 247.3 C 509.8 245.8 511.7 240.1 512.4 238.1 C 513.0 236.1 515.7 227.6 515.9 225.3 C 516.0 223.0 515.2 214.8 514.3 212.9 C 513.4 211.1 507.6 206.1 506.0 205.2 C 504.4 204.2 498.2 203.0 496.4 202.3 C 494.5 201.7 488.1 199.0 486.2 198.2 C 484.3 197.4 477.3 194.3 475.6 193.6 C 473.8 192.8 468.0 190.7 466.6 190.4 C 465.2 190.1 461.7 190.1 460.3 190.3 C 458.9 190.5 452.9 192.2 451.1 192.8 C 449.3 193.4 442.5 196.0 440.8 196.8 C 439.0 197.6 433.2 200.4 431.9 201.2 C 430.6 202.0 427.8 204.2 427.0 205.2 C 426.1 206.3 423.6 210.9 422.8 212.4 C 422.1 214.0 419.4 220.5 418.7 222.3 C 418.0 224.1 415.9 230.7 415.5 232.3 C 415.0 233.9 414.0 238.5 414.0 240.0 C 414.0 241.5 414.8 246.8 415.2 248.7 C 415.6 250.6 417.8 258.8 418.4 261.1 C 419.0 263.4 421.3 271.9 421.9 274.0 C 422.4 276.1 423.7 282.5 423.9 284.1 C 424.1 285.7 423.8 289.6 423.6 291.1 C 423.4 292.6 422.4 298.7 422.0 300.5 C 421.7 302.3 420.1 308.8 419.6 310.7 C 419.2 312.5 418.0 318.6 417.4 320.5 C 416.7 322.4 414.1 329.4 412.4 331.3 C 410.7 333.2 401.9 339.7 398.8 341.0 C 395.6 342.2 382.1 344.4 378.3 344.9 C 374.5 345.3 360.8 345.7 357.5 345.8 C 354.2 346.0 345.5 346.6 342.2 346.8 C 339.0 347.0 326.5 347.8 322.1 348.1 C 317.7 348.3 299.6 349.2 294.5 349.4 C 289.5 349.5 271.2 350.0 266.7 350.1 C 262.3 350.1 249.4 350.2 246.0 350.1 C 242.6 350.0 233.3 349.2 229.8 348.9 C 226.3 348.5 212.1 346.9 208.0 346.3 C 204.0 345.8 189.2 343.6 185.4 343.0 C 181.7 342.3 170.0 340.1 167.2 339.4 C 164.4 338.7 157.8 336.4 155.3 335.4 C 152.9 334.3 143.1 329.4 140.2 327.8 C 137.3 326.2 126.6 320.1 123.9 318.3 C 121.2 316.5 112.2 310.3 110.5 308.6 C 108.8 306.9 105.8 301.9 105.2 299.9 C 104.7 297.9 104.7 289.6 104.3 287.1 C 103.9 284.6 101.8 274.9 100.7 272.4 C 99.6 270.0 93.5 262.0 92.0 260.1 C 90.5 258.2 85.4 253.2 84.3 251.5 C 83.3 249.8 81.4 243.8 81.0 241.6 C 80.6 239.4 79.9 230.0 79.8 227.4 C 79.6 224.8 79.4 215.3 79.4 213.0 C 79.5 210.6 79.6 203.6 79.8 202.0 C 79.9 200.4 80.8 196.5 81.2 195.0 C 81.7 193.6 83.8 188.1 84.5 186.5 C 85.2 184.9 87.9 179.2 88.6 177.7 C 89.3 176.3 91.8 171.7 92.4 170.6 C 93.0 169.5 94.4 167.1 94.8 166.2 C 95.3 165.2 97.0 161.7 97.3 160.4 C 97.7 159.1 98.6 153.4 99.1 152.0 C 99.5 150.5 101.2 145.2 102.3 144.4 C 103.3 143.6 109.0 142.8 110.4 143.1 C 111.8 143.5 116.4 147.4 117.6 148.2 C 118.9 149.0 122.9 151.2 124.2 151.7 C 125.5 152.1 130.3 152.7 131.7 152.8 C 133.0 152.8 138.3 152.3 139.0 152.2 C 139.8 152.1 138.9 152.4 140.0 151.9 Z";
  var LANE=30; // lane width (uniform, stroked)

  // obstacles ON the lane (sampled on the centerline). teal barrels/cones + two red + one moving car.
  var obs=[
    {t:"barrel",x:203.9,y:127.1,c:"#14A8AD",s:11,label:"Barrel"},
    {t:"cone",  x:356.9,y:188.0,c:"#0D7377",r:7, label:"Cone"},
    {t:"car",   x:426.6,y:306.1,c:"#C75450",w:22,h:12,a:12,label:"Moving car"},
    {t:"cone",  x:504.5,y:219.2,c:"#14A8AD",r:7, label:"Cone"},
    {t:"barrel",x:394.5,y:330.3,c:"#0D7377",s:11,label:"Barrel"},
    {t:"barrel",x:90.9, y:278.7,c:"#C75450",s:11,label:"Barrel"},
    {t:"cone",  x:109.3,y:153.4,c:"#14A8AD",r:7, label:"Cone"}
  ];
  var carX=296.9,carY=128.3; // car marker on the racing line (on the top sweeper)

  // gauge
  var gx=636,gy=210,gr=76,gsw=20,pct=0.90;
  var circ=2*Math.PI*gr, dash=circ*pct, gap=circ-dash;

  var s='';
  s+='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+W+' '+H+'" style="width:100%;max-width:760px;height:auto;display:block" role="img" aria-label="Top-down windy race circuit with a hairpin, an S-curve chicane and sweeping bends. Seven obstacles sit on the lane and a smooth teal avoidance racing line swerves around them. An amber gauge shows 90 percent obstacle avoidance.">';

  // styles + keyframes (prefixed); resting state is complete without animation
  s+='<defs><style>'
    +'@keyframes viz_roboCar_dash{from{stroke-dashoffset:1370}to{stroke-dashoffset:0}}'
    +'.viz_roboCar_line{stroke-dasharray:1370;animation:viz_roboCar_dash 7s linear infinite}'
    +'@keyframes viz_roboCar_pulse{0%,100%{opacity:.8;transform:scale(1)}50%{opacity:.3;transform:scale(1.5)}}'
    +'.viz_roboCar_pulse{transform-box:fill-box;transform-origin:center;animation:viz_roboCar_pulse 2.6s ease-in-out infinite}'
    +'@keyframes viz_roboCar_gaugefill{from{stroke-dashoffset:'+circ.toFixed(1)+'}to{stroke-dashoffset:'+gap.toFixed(1)+'}}'
    +'.viz_roboCar_gauge{animation:viz_roboCar_gaugefill 1.8s ease-out forwards}'
    +'.viz_roboCar_ob{transition:opacity .2s}.viz_roboCar_ob:hover{opacity:.7}'
    +'</style></defs>';

  // background
  s+='<rect x="0" y="0" width="'+W+'" height="'+H+'" fill="#141414"/>';

  // titles (top-left)
  s+='<text x="'+pad+'" y="30" font-family="Inter,sans-serif" font-size="13.5" font-weight="600" fill="#F0F0F0">LIDAR + CNN → real-time avoidance path</text>';
  s+='<text x="'+pad+'" y="48" font-family="Inter,sans-serif" font-size="11" fill="#909090">Top-down circuit · perception-planned racing line around obstacles</text>';

  // track lane: two parallel offset borders rendered as a wider edge stroke + asphalt fill stroke
  s+='<path d="'+CENTER+'" fill="none" stroke="#262626" stroke-width="'+(LANE+3)+'" stroke-linejoin="round" stroke-linecap="round"/>';
  s+='<path d="'+CENTER+'" fill="none" stroke="rgba(13,115,119,0.12)" stroke-width="'+LANE+'" stroke-linejoin="round" stroke-linecap="round"/>';
  // dashed lane centerline marking
  s+='<path d="'+CENTER+'" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1.2" stroke-dasharray="4 10"/>';

  // infield label (placed in the open left-loop interior, clear of the lane)
  s+='<text x="205" y="236" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" fill="#909090">CIRCUIT</text>';
  s+='<text x="205" y="252" text-anchor="middle" font-family="Inter,sans-serif" font-size="10" fill="#707070">hairpin · chicane · sweepers</text>';

  // avoidance racing line: dark outline + teal base + bright animated top (resting = bright line)
  s+='<path d="'+RACE+'" fill="none" stroke="#101010" stroke-width="5.2" stroke-linejoin="round" stroke-linecap="round" opacity="0.9"/>';
  s+='<path d="'+RACE+'" fill="none" stroke="#0D7377" stroke-width="3.6" stroke-linejoin="round" stroke-linecap="round"/>';
  s+='<path class="viz_roboCar_line" d="'+RACE+'" fill="none" stroke="#14A8AD" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>';

  // obstacles
  for(var i=0;i<obs.length;i++){
    var o=obs[i];
    if(o.t==="barrel"){
      s+='<g class="viz_roboCar_ob"><rect x="'+(o.x-o.s/2).toFixed(1)+'" y="'+(o.y-o.s/2).toFixed(1)+'" width="'+o.s+'" height="'+o.s+'" rx="2" fill="'+o.c+'" stroke="#101010" stroke-width="1"/><title>'+o.label+'</title></g>';
    } else if(o.t==="cone"){
      s+='<g class="viz_roboCar_ob"><circle cx="'+o.x+'" cy="'+o.y+'" r="'+o.r+'" fill="'+o.c+'" stroke="#101010" stroke-width="1"/><title>'+o.label+'</title></g>';
    } else if(o.t==="car"){
      s+='<g class="viz_roboCar_ob" transform="translate('+o.x+','+o.y+') rotate('+o.a+')"><rect x="'+(-o.w/2).toFixed(1)+'" y="'+(-o.h/2).toFixed(1)+'" width="'+o.w+'" height="'+o.h+'" rx="2.5" fill="'+o.c+'" stroke="#101010" stroke-width="1"/><title>'+o.label+' (hazard)</title></g>';
    }
  }

  // car marker on the racing line (gentle halo pulse; resting state complete)
  s+='<g transform="translate('+carX+','+carY+')">';
  s+='<circle class="viz_roboCar_pulse" cx="0" cy="0" r="9" fill="rgba(13,115,119,0.35)"/>';
  s+='<rect x="-6" y="-4" width="12" height="8" rx="2" fill="#F0F0F0" stroke="#0D7377" stroke-width="1.5"/>';
  s+='<title>Autonomous car (on avoidance line)</title></g>';

  // legend (bottom)
  var ly=384;
  s+='<rect x="'+pad+'" y="'+(ly-9)+'" width="11" height="11" rx="2" fill="#14A8AD"/>';
  s+='<text x="'+(pad+18)+'" y="'+ly+'" font-family="Inter,sans-serif" font-size="10" fill="#909090">Barrel</text>';
  s+='<circle cx="'+(pad+82)+'" cy="'+(ly-3)+'" r="5.5" fill="#0D7377"/>';
  s+='<text x="'+(pad+92)+'" y="'+ly+'" font-family="Inter,sans-serif" font-size="10" fill="#909090">Cone</text>';
  s+='<rect x="'+(pad+140)+'" y="'+(ly-8)+'" width="14" height="9" rx="2" fill="#C75450"/>';
  s+='<text x="'+(pad+158)+'" y="'+ly+'" font-family="Inter,sans-serif" font-size="10" fill="#909090">Moving car</text>';
  s+='<line x1="'+(pad+232)+'" y1="'+(ly-3)+'" x2="'+(pad+258)+'" y2="'+(ly-3)+'" stroke="#14A8AD" stroke-width="2.4"/>';
  s+='<text x="'+(pad+264)+'" y="'+ly+'" font-family="Inter,sans-serif" font-size="10" fill="#909090">Avoidance line</text>';

  // gauge (right) — 90% filled in amber (single highlight)
  s+='<circle cx="'+gx+'" cy="'+gy+'" r="'+gr+'" fill="none" stroke="#262626" stroke-width="'+gsw+'"/>';
  s+='<g transform="rotate(-90 '+gx+' '+gy+')">';
  s+='<circle class="viz_roboCar_gauge" cx="'+gx+'" cy="'+gy+'" r="'+gr+'" fill="none" stroke="#E8A838" stroke-width="'+gsw+'" stroke-linecap="round" stroke-dasharray="'+dash.toFixed(1)+' '+gap.toFixed(1)+'" stroke-dashoffset="'+gap.toFixed(1)+'"/>';
  s+='</g>';
  s+='<text x="'+gx+'" y="'+(gy+4)+'" text-anchor="middle" font-family="Inter,sans-serif" font-size="34" font-weight="700" fill="#E8A838">90%</text>';
  s+='<text x="'+gx+'" y="'+(gy+24)+'" text-anchor="middle" font-family="Inter,sans-serif" font-size="10" fill="#909090">obstacle avoidance</text>';
  s+='<text x="'+gx+'" y="'+(gy-gr-14)+'" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" font-weight="600" fill="#F0F0F0">Avoidance rate</text>';

  // stat note (right, below gauge)
  var sx=552,syb=316;
  s+='<line x1="'+sx+'" y1="'+(syb-14)+'" x2="'+(sx+184)+'" y2="'+(syb-14)+'" stroke="#262626" stroke-width="1"/>';
  var stats=[["9","NASCAR / F1-style tracks"],["200+","obstacles encountered"],["7","unplanned stops"],["LIDAR+CNN","sensing + perception"]];
  for(var j=0;j<stats.length;j++){
    var yy=syb+j*16;
    s+='<text x="'+sx+'" y="'+yy+'" font-family="Inter,sans-serif" font-size="11" font-weight="600" fill="#14A8AD">'+stats[j][0]+'</text>';
    s+='<text x="'+(sx+74)+'" y="'+yy+'" font-family="Inter,sans-serif" font-size="10" fill="#909090">'+stats[j][1]+'</text>';
  }

  s+='</svg>';
  var svg=s;
  return svg;
}

/* ==== crypto ==== */
function viz_crypto(){
  var H=384;
  var leftBoxX=16, leftBoxY=46, leftBoxW=420, leftBoxH=296;
  var rightBoxX=472, rightBoxY=46, rightBoxW=272, rightBoxH=296;
  var plotX0=72, plotX1=412, plotY0=82, plotY1=276;
  var n=16;
  var sent=[0.30,0.40,0.55,0.70,0.80,0.74,0.58,0.42,0.34,0.44,0.62,0.78,0.86,0.80,0.66,0.52];
  var price=[0.26,0.30,0.34,0.45,0.60,0.72,0.79,0.72,0.56,0.42,0.36,0.46,0.62,0.76,0.83,0.77];
  function xAt(i){ return plotX0+(plotX1-plotX0)*(i/(n-1)); }
  function yAt(v){ return plotY1-(plotY1-plotY0)*v; }
  function smooth(arr){
    var pts=[],i;
    for(i=0;i<n;i++) pts.push([xAt(i),yAt(arr[i])]);
    var d="M"+pts[0][0].toFixed(1)+" "+pts[0][1].toFixed(1);
    for(i=0;i<pts.length-1;i++){
      var p0=pts[i>0?i-1:i], p1=pts[i], p2=pts[i+1], p3=pts[i+2<pts.length?i+2:i+1];
      var c1x=p1[0]+(p2[0]-p0[0])/6, c1y=p1[1]+(p2[1]-p0[1])/6;
      var c2x=p2[0]-(p3[0]-p1[0])/6, c2y=p2[1]-(p3[1]-p1[1])/6;
      d+=" C"+c1x.toFixed(1)+" "+c1y.toFixed(1)+" "+c2x.toFixed(1)+" "+c2y.toFixed(1)+" "+p2[0].toFixed(1)+" "+p2[1].toFixed(1);
    }
    return d;
  }
  var sentPath=smooth(sent), pricePath=smooth(price);
  var dayTicks=[0,3,6,9,12,15], dayLabels=["D1","D4","D7","D10","D13","D16"];
  var lags=[-3,-2,-1,0,1,2,3], corr=[0.10,0.22,0.40,0.58,0.86,0.62,0.30], peakIdx=4;
  var rPlotX0=rightBoxX+34, rPlotX1=rightBoxX+rightBoxW-18, rPlotY0=96, rPlotY1=250;
  var bw=(rPlotX1-rPlotX0)/lags.length, barW=bw*0.62;
  var s='';
  s+='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 '+H+'" style="width:100%;max-width:760px;height:auto;display:block" role="img" aria-label="Twitter sentiment leads Bitcoin price; cross-correlation peaks at a positive lag of about two days.">';
  s+='<rect x="0" y="0" width="760" height="'+H+'" fill="#101010"/>';
  s+='<rect x="'+leftBoxX+'" y="'+leftBoxY+'" width="'+leftBoxW+'" height="'+leftBoxH+'" rx="6" fill="#1A1A1A" stroke="#262626"/>';
  s+='<rect x="'+rightBoxX+'" y="'+rightBoxY+'" width="'+rightBoxW+'" height="'+rightBoxH+'" rx="6" fill="#141414" stroke="#262626"/>';
  s+='<text x="16" y="24" font-family="Inter,sans-serif" font-size="13.5" font-weight="600" fill="#F0F0F0">Does sentiment lead Bitcoin price?</text>';
  s+='<text x="16" y="40" font-family="Inter,sans-serif" font-size="11" fill="#909090">Cross-correlation confirms a short lead</text>';
  s+='<text x="'+(leftBoxX+16)+'" y="'+(leftBoxY+20)+'" font-family="Inter,sans-serif" font-size="11" fill="#909090">Normalized series over 16 days</text>';
  var lgX=268, lgY=leftBoxY+16;
  s+='<line x1="'+lgX+'" y1="'+lgY+'" x2="'+(lgX+16)+'" y2="'+lgY+'" stroke="#14A8AD" stroke-width="2.5"/>';
  s+='<text x="'+(lgX+22)+'" y="'+(lgY+3.5)+'" font-family="Inter,sans-serif" font-size="10" fill="#F0F0F0">BTC price</text>';
  s+='<line x1="'+(lgX+84)+'" y1="'+lgY+'" x2="'+(lgX+100)+'" y2="'+lgY+'" stroke="#E8A838" stroke-width="2.5"/>';
  s+='<text x="'+(lgX+106)+'" y="'+(lgY+3.5)+'" font-family="Inter,sans-serif" font-size="10" fill="#F0F0F0">Sentiment</text>';
  s+='<line x1="'+plotX0+'" y1="'+plotY1+'" x2="'+plotX1+'" y2="'+plotY1+'" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>';
  for(var i=0;i<dayTicks.length;i++){
    var tx=xAt(dayTicks[i]);
    s+='<line x1="'+tx.toFixed(1)+'" y1="'+plotY1+'" x2="'+tx.toFixed(1)+'" y2="'+(plotY1+4)+'" stroke="#262626" stroke-width="1"/>';
    s+='<text x="'+tx.toFixed(1)+'" y="'+(plotY1+16)+'" font-family="Inter,sans-serif" font-size="10" fill="#707070" text-anchor="middle">'+dayLabels[i]+'</text>';
  }
  s+='<path d="'+sentPath+'" fill="none" stroke="#E8A838" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" opacity="0.92"/>';
  s+='<path d="'+pricePath+'" fill="none" stroke="#14A8AD" stroke-width="2.25" stroke-linejoin="round" stroke-linecap="round"/>';
  var sPeakX=xAt(4), pPeakX=xAt(6), brkY=plotY0+2;
  s+='<line x1="'+sPeakX.toFixed(1)+'" y1="'+brkY+'" x2="'+pPeakX.toFixed(1)+'" y2="'+brkY+'" stroke="#909090" stroke-width="1"/>';
  s+='<line x1="'+sPeakX.toFixed(1)+'" y1="'+brkY+'" x2="'+sPeakX.toFixed(1)+'" y2="'+(brkY+5)+'" stroke="#909090" stroke-width="1"/>';
  s+='<line x1="'+pPeakX.toFixed(1)+'" y1="'+brkY+'" x2="'+pPeakX.toFixed(1)+'" y2="'+(brkY+5)+'" stroke="#909090" stroke-width="1"/>';
  s+='<text x="'+((sPeakX+pPeakX)/2).toFixed(1)+'" y="'+(brkY-5)+'" font-family="Inter,sans-serif" font-size="10" fill="#E8A838" text-anchor="middle">sentiment leads ~2 days</text>';
  s+='<text x="'+(rightBoxX+16)+'" y="'+(rightBoxY+20)+'" font-family="Inter,sans-serif" font-size="11.5" font-weight="600" fill="#F0F0F0">Cross-correlation by lag</text>';
  s+='<line x1="'+rPlotX0+'" y1="'+rPlotY1+'" x2="'+rPlotX1+'" y2="'+rPlotY1+'" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>';
  for(var j=0;j<lags.length;j++){
    var cx=rPlotX0+bw*j+bw/2, bh=(rPlotY1-rPlotY0)*corr[j], by=rPlotY1-bh;
    var isPk=(j===peakIdx);
    var fillc=isPk?'rgba(232,168,56,0.35)':'rgba(13,115,119,0.35)';
    var stroke=isPk?'#E8A838':'#14A8AD';
    s+='<rect x="'+(cx-barW/2).toFixed(1)+'" y="'+by.toFixed(1)+'" width="'+barW.toFixed(1)+'" height="'+bh.toFixed(1)+'" rx="2" fill="'+fillc+'" stroke="'+stroke+'" stroke-width="1.2"/>';
    var lab=(lags[j]>0?'+':'')+lags[j];
    s+='<text x="'+cx.toFixed(1)+'" y="'+(rPlotY1+15)+'" font-family="Inter,sans-serif" font-size="10" fill="#707070" text-anchor="middle">'+lab+'</text>';
  }
  var pkCx=rPlotX0+bw*peakIdx+bw/2, pkBy=rPlotY1-(rPlotY1-rPlotY0)*corr[peakIdx];
  s+='<text x="'+pkCx.toFixed(1)+'" y="'+(pkBy-6).toFixed(1)+'" font-family="Inter,sans-serif" font-size="10" font-weight="600" fill="#E8A838" text-anchor="middle">peak</text>';
  s+='<text x="'+(rightBoxX+rightBoxW/2)+'" y="'+(rPlotY1+34)+'" font-family="Inter,sans-serif" font-size="10" fill="#909090" text-anchor="middle">+lag = sentiment leads price</text>';
  s+='<text x="16" y="'+(H-12)+'" font-family="Inter,sans-serif" font-size="10" fill="#707070">VADER / TextBlob · LSTM · Elephas on Spark</text>';
  s+='</svg>';
  return s;
}

/* ==== nlToPython ==== */
function viz_nlToPython(){
  const W = 760, pad = 16;
  const cardX = pad, cardW = W - pad*2;
  const enY = 96, enH = 78;
  const pyY = enY + enH + 18;

  const colors = { k:"#14A8AD", s:"#E8A838", c:"#707070", i:"#F0F0F0" };

  const codeLines = [
    [["import","k"],[" pandas ","i"],["as","k"],[" pd","i"]],
    [["import","k"],[" matplotlib.pyplot ","i"],["as","k"],[" plt","i"]],
    [["# load data and aggregate revenue by region","c"]],
    [["df ","i"],["= pd.read_csv(","i"],["\"sales.csv\"","s"],[")","i"]],
    [["by_region ","i"],["= df.groupby(","i"],["\"region\"","s"],[")","i"]],
    [["by_region[","i"],["\"revenue\"","s"],["].resample(","i"],["\"M\"","s"],[").sum().plot()","i"]]
  ];

  const lineH = 22;
  const codeTop = pyY + 44;
  const gutterW = 30;
  const codeX = cardX + 18 + gutterW;
  const pyH = 44 + codeLines.length*lineH + 18;
  const tagY = pyY + pyH + 30;
  const H = tagY + 24;

  const esc = (str) => str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

  const p = [];
  p.push('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 '+H+'" style="width:100%;max-width:760px;height:auto;display:block" role="img" aria-label="A two-pane code card showing a plain English instruction transformed into working pandas and matplotlib Python code, with a note that this Seq2Seq with Attention model predates GitHub Copilot by over three years.">');

  p.push('<style>'
    + '@keyframes viz_nlToPython_blink{0%,45%{opacity:1;}55%,100%{opacity:0;}}'
    + '.viz_nlToPython_caret{animation:viz_nlToPython_blink 1.1s steps(1) infinite;}'
    + '@keyframes viz_nlToPython_pulse{0%,100%{opacity:0.55;}50%{opacity:1;}}'
    + '.viz_nlToPython_arrow{animation:viz_nlToPython_pulse 2.6s ease-in-out infinite;}'
    + '</style>');

  p.push('<rect x="'+(cardX-4)+'" y="'+(pad-4)+'" width="'+(cardW+8)+'" height="'+(H-pad)+'" rx="10" fill="#141414" stroke="#262626"/>');

  p.push('<text x="'+(cardX+4)+'" y="'+(pad+22)+'" font-family="Inter,sans-serif" font-size="13.5" font-weight="600" fill="#F0F0F0">Plain English in, working Python out</text>');
  p.push('<text x="'+(cardX+4)+'" y="'+(pad+42)+'" font-family="Inter,sans-serif" font-size="11" fill="#909090">Natural-language instruction translated into runnable pandas + matplotlib</text>');

  p.push('<rect x="'+cardX+'" y="'+enY+'" width="'+cardW+'" height="'+enH+'" rx="8" fill="#1A1A1A" stroke="#262626"/>');
  p.push('<text x="'+(cardX+16)+'" y="'+(enY+22)+'" font-family="Inter,sans-serif" font-size="11" font-weight="600" fill="#909090" letter-spacing="0.5">ENGLISH</text>');
  p.push('<text x="'+(cardX+16)+'" y="'+(enY+50)+'" font-family="Inter,sans-serif" font-size="14.5" fill="#F0F0F0">Read sales.csv, group by region, and plot monthly revenue.</text>');

  const arrCx = cardX + Math.floor(cardW/2);
  p.push('<g class="viz_nlToPython_arrow"><line x1="'+arrCx+'" y1="'+(enY+enH+2)+'" x2="'+arrCx+'" y2="'+(pyY-4)+'" stroke="#0D7377" stroke-width="2"/><path d="M '+(arrCx-5)+' '+(pyY-9)+' L '+arrCx+' '+(pyY-3)+' L '+(arrCx+5)+' '+(pyY-9)+'" fill="none" stroke="#14A8AD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g>');

  p.push('<rect x="'+cardX+'" y="'+pyY+'" width="'+cardW+'" height="'+pyH+'" rx="8" fill="#101010" stroke="#262626"/>');
  p.push('<line x1="'+cardX+'" y1="'+(pyY+32)+'" x2="'+(cardX+cardW)+'" y2="'+(pyY+32)+'" stroke="#262626"/>');
  p.push('<circle cx="'+(cardX+18)+'" cy="'+(pyY+16)+'" r="3.5" fill="#262626"/><circle cx="'+(cardX+32)+'" cy="'+(pyY+16)+'" r="3.5" fill="#262626"/><circle cx="'+(cardX+46)+'" cy="'+(pyY+16)+'" r="3.5" fill="#262626"/>');
  p.push('<text x="'+(cardX+cardW-16)+'" y="'+(pyY+20)+'" text-anchor="end" font-family="Inter,sans-serif" font-size="11" font-weight="600" fill="#909090" letter-spacing="0.5">PYTHON</text>');
  p.push('<text x="'+(cardX+62)+'" y="'+(pyY+20)+'" font-family="Inter,sans-serif" font-size="10.5" fill="#707070">revenue_report.py</text>');
  p.push('<line x1="'+(cardX+18+gutterW-8)+'" y1="'+(pyY+40)+'" x2="'+(cardX+18+gutterW-8)+'" y2="'+(pyY+pyH-8)+'" stroke="#262626"/>');

  let lastRight = codeX;
  for (let li=0; li<codeLines.length; li++){
    const line = codeLines[li];
    const ly = codeTop + li*lineH + 12;
    const begin = (0.15 + li*0.28).toFixed(2) + 's';
    p.push('<text x="'+(cardX+18+gutterW-16)+'" y="'+ly+'" text-anchor="end" font-family="ui-monospace,Menlo,monospace" font-size="10" fill="#707070">'+(li+1)+'</text>');
    let tspans = '';
    let approx = codeX;
    for (let si=0; si<line.length; si++){
      const txt = line[si][0], c = line[si][1];
      tspans += '<tspan fill="'+colors[c]+'">'+esc(txt)+'</tspan>';
      approx += txt.length * 7.7;
    }
    const smil = '<animate attributeName="opacity" from="0" to="1" begin="'+begin+'" dur="0.45s" fill="freeze"/>'
      + '<animateTransform attributeName="transform" type="translate" from="-8 0" to="0 0" begin="'+begin+'" dur="0.45s" fill="freeze"/>';
    p.push('<g opacity="1"><text x="'+codeX+'" y="'+ly+'" font-family="ui-monospace,Menlo,monospace" font-size="13" font-weight="500" xml:space="preserve">'+tspans+'</text>'+smil+'</g>');
    if (li === codeLines.length-1) lastRight = approx;
  }

  const caretX = Math.min(lastRight + 4, cardX + cardW - 20);
  const caretY = codeTop + (codeLines.length-1)*lineH + 2;
  p.push('<rect class="viz_nlToPython_caret" x="'+caretX.toFixed(1)+'" y="'+caretY+'" width="7" height="15" fill="#14A8AD" opacity="0.9"/>');

  p.push('<rect x="'+(cardX+4)+'" y="'+(tagY-13)+'" width="9" height="9" rx="2" fill="#E8A838"/>');
  p.push('<text x="'+(cardX+20)+'" y="'+(tagY-4)+'" font-family="Inter,sans-serif" font-size="11.5" font-weight="600" fill="#E8A838">Seq2Seq + Attention &#8212; predates GitHub Copilot by 3+ years</text>');

  p.push('</svg>');
  const svg = p.join('');
  return svg;
}

/* ==== transliteration ==== */
function viz_transliteration(){
  const src = ["maru","dil","ek","dariyo","chhe"];
  const tgt = ["my","heart","is","an","ocean"];
  // rows = English output tokens (tgt), cols = source tokens (src)
  // weights[row][col] in 0..1 ; idiomatic remap, not a clean diagonal
  const W = [
    [0.82, 0.10, 0.04, 0.06, 0.05], // my    <- maru
    [0.14, 0.88, 0.05, 0.10, 0.06], // heart <- dil
    [0.05, 0.07, 0.30, 0.12, 0.62], // is    <- chhe (off-diagonal, far right)
    [0.06, 0.05, 0.20, 0.55, 0.10], // an    <- dariyo (slight remap)
    [0.05, 0.08, 0.06, 0.95, 0.08]  // ocean <- dariyo (BRIGHTEST -> amber)
  ];

  const W_px = 760;
  const padL = 92, padR = 26, padT = 86, padB = 66;
  const nCols = src.length, nRows = tgt.length;
  const gridW = W_px - padL - padR;
  const cell = Math.floor(gridW / nCols); // square-ish cells
  const gridPxW = cell * nCols;
  const gridPxH = cell * nRows;
  const H = padT + gridPxH + padB;

  // find brightest cell for amber highlight
  let bestR = 0, bestC = 0, bestV = -1;
  for (let r = 0; r < nRows; r++)
    for (let c = 0; c < nCols; c++)
      if (W[r][c] > bestV) { bestV = W[r][c]; bestR = r; bestC = c; }

  const teal = "#0D7377";
  const muted = "#909090";
  const txt = "#F0F0F0";
  const amber = "#E8A838";

  let s = '';
  s += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 ' + H + '" style="width:100%;max-width:760px;height:auto;display:block" role="img" aria-label="Attention alignment heatmap mapping romanized Gujarati source tokens to English output tokens, showing idiomatic remapping where dariyo maps to ocean and dil maps to heart rather than a literal word-for-word diagonal">';

  // styles + gentle pulse on amber cell
  s += '<style>'
    + '.viz_transliteration_cell{transition:opacity .2s ease;}'
    + '.viz_transliteration_cellgrp:hover .viz_transliteration_cell{stroke:#14A8AD;stroke-width:1.5;}'
    + '@keyframes viz_transliteration_glow{0%,100%{opacity:.92;}50%{opacity:1;}}'
    + '.viz_transliteration_amber{animation:viz_transliteration_glow 3.6s ease-in-out infinite;}'
    + '</style>';

  // background panel
  s += '<rect x="0" y="0" width="760" height="' + H + '" fill="#141414"/>';
  s += '<rect x="' + (padL-1) + '" y="' + (padT-1) + '" width="' + (gridPxW+2) + '" height="' + (gridPxH+2) + '" fill="#101010"/>';

  // Title + subtitle (spec title is the bold title)
  s += '<text x="16" y="26" font-family="Inter,sans-serif" font-size="13.5" font-weight="600" fill="' + txt + '">Where the model looks: meaning over literal order</text>';
  s += '<text x="16" y="44" font-family="Inter,sans-serif" font-size="11" fill="' + muted + '">Attention alignment heatmap &#183; source tokens (cols) &#8594; English output (rows)</text>';
  s += '<text x="16" y="60" font-family="Inter,sans-serif" font-size="11" fill="' + muted + '">Bahdanau attention, LSTM</text>';

  // legend: opacity scale (right-aligned, within bounds)
  s += '<defs><linearGradient id="viz_transliteration_grad" x1="0" y1="0" x2="1" y2="0">'
    + '<stop offset="0" stop-color="' + teal + '" stop-opacity="0.08"/>'
    + '<stop offset="1" stop-color="' + teal + '" stop-opacity="0.92"/>'
    + '</linearGradient></defs>';
  const lgRight = padL + gridPxW;       // 732
  const lgStripW = 84;
  const lgStripX = lgRight - lgStripW;  // 648
  s += '<text x="' + (lgStripX - 6) + '" y="22" text-anchor="end" font-family="Inter,sans-serif" font-size="10" fill="#707070">low</text>';
  s += '<rect x="' + lgStripX + '" y="14" width="' + lgStripW + '" height="8" rx="2" fill="url(#viz_transliteration_grad)"/>';
  s += '<text x="' + lgRight + '" y="36" text-anchor="end" font-family="Inter,sans-serif" font-size="10" fill="#707070">high attention</text>';

  // axis group labels
  s += '<text x="' + (padL + gridPxW/2) + '" y="' + (padT - 12) + '" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" fill="' + muted + '">source: romanized Gujarati</text>';
  s += '<text x="' + (padL - 74) + '" y="' + (padT + gridPxH/2) + '" transform="rotate(-90 ' + (padL - 74) + ' ' + (padT + gridPxH/2) + ')" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" fill="' + muted + '">English output</text>';

  // cells
  let animDelay = 0;
  for (let r = 0; r < nRows; r++) {
    for (let c = 0; c < nCols; c++) {
      const x = padL + c * cell;
      const y = padT + r * cell;
      const w = W[r][c];
      const isBest = (r === bestR && c === bestC);
      // teal opacity scaled by attention weight (min floor so weak cells faintly visible)
      const op = (0.06 + w * 0.86).toFixed(3);
      const fill = isBest ? amber : teal;
      const cellFillOp = isBest ? Math.max(0.62, w).toFixed(3) : op;

      s += '<g class="viz_transliteration_cellgrp">';
      // base dark tile so gaps read on dark bg
      s += '<rect x="' + (x+1.5) + '" y="' + (y+1.5) + '" width="' + (cell-3) + '" height="' + (cell-3) + '" rx="3" fill="#1A1A1A"/>';
      s += '<rect class="viz_transliteration_cell' + (isBest ? ' viz_transliteration_amber' : '') + '" x="' + (x+1.5) + '" y="' + (y+1.5) + '" width="' + (cell-3) + '" height="' + (cell-3) + '" rx="3" fill="' + fill + '" fill-opacity="' + cellFillOp + '" stroke="rgba(255,255,255,0.06)" stroke-width="1">';
      // gentle fade-in (resting state = full)
      s += '<animate attributeName="opacity" values="0;1" dur="0.5s" begin="' + (animDelay).toFixed(2) + 's" fill="freeze"/>';
      s += '<title>' + tgt[r] + ' &#8592; ' + src[c] + '  (attention ' + w.toFixed(2) + ')</title>';
      s += '</rect>';
      // label strong cells with weight value
      if (w >= 0.5) {
        const lblColor = isBest ? "#101010" : txt;
        s += '<text x="' + (x + cell/2) + '" y="' + (y + cell/2 + 4) + '" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" font-weight="600" fill="' + lblColor + '">' + w.toFixed(2) + '</text>';
      }
      s += '</g>';
      animDelay += 0.04;
    }
  }

  // X axis token labels (source)
  for (let c = 0; c < nCols; c++) {
    const x = padL + c * cell + cell/2;
    const isAmberCol = (c === bestC);
    s += '<text x="' + x + '" y="' + (padT + gridPxH + 18) + '" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" font-weight="' + (isAmberCol ? '600' : '400') + '" fill="' + (isAmberCol ? amber : txt) + '">' + src[c] + '</text>';
  }
  // Y axis token labels (target)
  for (let r = 0; r < nRows; r++) {
    const y = padT + r * cell + cell/2 + 4;
    const isAmberRow = (r === bestR);
    s += '<text x="' + (padL - 10) + '" y="' + y + '" text-anchor="end" font-family="Inter,sans-serif" font-size="11" font-weight="' + (isAmberRow ? '600' : '400') + '" fill="' + (isAmberRow ? amber : txt) + '">' + tgt[r] + '</text>';
  }

  // note line (own row below axis labels, no overlap)
  s += '<text x="' + padL + '" y="' + (padT + gridPxH + 46) + '" text-anchor="start" font-family="Inter,sans-serif" font-size="10" fill="#707070">preserves metaphor &amp; tonal stress, not word-for-word &#183; brightest cell: dariyo &#8594; ocean</text>';

  s += '</svg>';
  return s;
}

/* ==== cabDemand ==== */
function viz_cabDemand(){
  // ---- layout constants ----
  const W = 760, H = 392;
  const pad = 16;
  // grid geometry
  const gridX = pad + 4;      // 20
  const gridY = 86;
  const cell = 44;            // cell size
  const N = 6;                // 6x6
  const gridW = cell * N;     // 264
  const gridH = cell * N;     // 264

  // demand intensity 0..1 per zone (row-major, 6x6). Most cool, 2-3 amber hotspots.
  // fixed values (no randomness) -> reproducible
  const demand = [
    [0.10,0.14,0.20,0.18,0.12,0.08],
    [0.16,0.26,0.34,0.30,0.20,0.12],
    [0.22,0.40,0.62,0.55,0.30,0.16],
    [0.18,0.48,0.78,0.92,0.50,0.22],
    [0.12,0.30,0.58,0.74,0.96,0.34],
    [0.09,0.18,0.28,0.40,0.55,0.30]
  ];

  // color ramp: teal (cool) -> teal-bright -> amber (hot)
  // anchors as rgb
  const cool   = [15,58,62];    // clear teal-tinted cool surface
  const mid    = [13,115,119];  // #0D7377 teal
  const bright = [20,168,173];  // #14A8AD teal-bright
  const hot    = [232,168,56];  // #E8A838 amber
  const lerp = (a,b,t)=>[
    Math.round(a[0]+(b[0]-a[0])*t),
    Math.round(a[1]+(b[1]-a[1])*t),
    Math.round(a[2]+(b[2]-a[2])*t)
  ];
  const ramp = (v)=>{
    // 0..0.40 cool->mid ; 0.40..0.70 mid->bright ; 0.70..1 bright->hot
    let c;
    if(v < 0.40)      c = lerp(cool,  mid,    v/0.40);
    else if(v < 0.70) c = lerp(mid,   bright,(v-0.40)/0.30);
    else              c = lerp(bright,hot,   (v-0.70)/0.30);
    return `rgb(${c[0]},${c[1]},${c[2]})`;
  };

  const cx = (col)=> gridX + col*cell + cell/2;
  const cy = (row)=> gridY + row*cell + cell/2;

  // ---- build cells ----
  let cells = '';
  for(let r=0;r<N;r++){
    for(let c=0;c<N;c++){
      const v = demand[r][c];
      const x = gridX + c*cell;
      const y = gridY + r*cell;
      const fill = ramp(v);
      const isHot = v >= 0.85;
      const pct = Math.round(v*100);
      const zoneId = `Z${r+1}${c+1}`;
      // subtle pulse only on the hottest amber cells, resting state = full opacity
      const pulse = isHot
        ? `<animate attributeName="opacity" values="0.82;1;0.82" dur="3.4s" repeatCount="indefinite"/>`
        : '';
      cells += `<rect x="${x+1.5}" y="${y+1.5}" width="${cell-3}" height="${cell-3}" rx="3" fill="${fill}" opacity="${isHot?1:0.95}">`
        + `<title>Zone ${zoneId} — predicted demand ${pct}%</title>${pulse}</rect>`;
    }
  }

  // ---- grid lines ----
  let lines = '';
  for(let i=0;i<=N;i++){
    const gx = gridX + i*cell;
    const gy = gridY + i*cell;
    lines += `<line x1="${gx}" y1="${gridY}" x2="${gx}" y2="${gridY+gridH}" stroke="#262626" stroke-width="1"/>`;
    lines += `<line x1="${gridX}" y1="${gy}" x2="${gridX+gridW}" y2="${gy}" stroke="#262626" stroke-width="1"/>`;
  }

  // ---- a couple zone labels ----
  let zlabels = '';
  zlabels += `<text x="${cx(0)}" y="${cy(0)+3}" font-size="9" fill="#909090" text-anchor="middle" font-family="Inter,sans-serif">Z11</text>`;
  zlabels += `<text x="${cx(5)}" y="${cy(0)+3}" font-size="9" fill="#909090" text-anchor="middle" font-family="Inter,sans-serif">Z16</text>`;
  zlabels += `<text x="${cx(0)}" y="${cy(5)+3}" font-size="9" fill="#909090" text-anchor="middle" font-family="Inter,sans-serif">Z61</text>`;

  // ---- routing path: cab on a cool zone -> hottest zone (modified Dijkstra) ----
  // cab start: cool zone at row0,col1
  // hottest zone: row4,col4 (0.96)
  const wp = [
    {r:0,c:1}, // cab
    {r:1,c:2},
    {r:2,c:2},
    {r:3,c:3},
    {r:4,c:4}  // hotspot
  ];
  const pts = wp.map(p=>({x:cx(p.c),y:cy(p.r)}));
  // path string
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for(let i=1;i<pts.length;i++){ d += ` L ${pts[i].x} ${pts[i].y}`; }

  // path length for dash animation (approx)
  let plen = 0;
  for(let i=1;i<pts.length;i++){
    plen += Math.hypot(pts[i].x-pts[i-1].x, pts[i].y-pts[i-1].y);
  }
  plen = Math.round(plen);

  // arrowhead pointing into hotspot
  const aEnd = pts[pts.length-1];
  const aPrev = pts[pts.length-2];
  const ang = Math.atan2(aEnd.y-aPrev.y, aEnd.x-aPrev.x);
  // bring arrow tip just shy of cell center
  const tipX = aEnd.x - Math.cos(ang)*9;
  const tipY = aEnd.y - Math.sin(ang)*9;
  const ah = 9;       // arrow length
  const aw = 5.5;     // half width
  const bx = tipX - Math.cos(ang)*ah;
  const by = tipY - Math.sin(ang)*ah;
  const lx = bx + Math.cos(ang+Math.PI/2)*aw;
  const ly = by + Math.sin(ang+Math.PI/2)*aw;
  const rx = bx + Math.cos(ang-Math.PI/2)*aw;
  const ry = by + Math.sin(ang-Math.PI/2)*aw;
  const arrow = `<polygon points="${tipX.toFixed(1)},${tipY.toFixed(1)} ${lx.toFixed(1)},${ly.toFixed(1)} ${rx.toFixed(1)},${ry.toFixed(1)}" fill="#E8A838"/>`;

  // edge-weight node dots along path
  let nodes = '';
  for(let i=0;i<pts.length;i++){
    if(i===0) continue;
    if(i===pts.length-1) continue;
    nodes += `<circle cx="${pts[i].x}" cy="${pts[i].y}" r="2.6" fill="#101010" stroke="#14A8AD" stroke-width="1.3"/>`;
  }

  // routing path with travelling dash (resting state: solid teal-bright path visible)
  const pathEls =
    `<path d="${d}" fill="none" stroke="#0D7377" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.35"/>`
    + `<path d="${d}" fill="none" stroke="#14A8AD" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">`
    + `<animate attributeName="stroke-dasharray" values="0,${plen};${plen},0" dur="2.6s" fill="freeze" repeatCount="1"/></path>`
    // travelling pulse dash on top, loops gently; underneath solid path keeps resting state correct
    + `<path d="${d}" fill="none" stroke="#F0F0F0" stroke-width="2.2" stroke-linecap="round" stroke-dasharray="10 ${plen}" opacity="0.55">`
    + `<animate attributeName="stroke-dashoffset" values="0;-${plen+10}" dur="3.2s" repeatCount="indefinite"/></path>`;

  // ---- cab marker on cool start zone ----
  const cab = pts[0];
  const cabMarker =
    `<g>`
    + `<circle cx="${cab.x}" cy="${cab.y}" r="9" fill="#101010" stroke="#14A8AD" stroke-width="1.6"/>`
    + `<circle cx="${cab.x}" cy="${cab.y}" r="9" fill="none" stroke="#14A8AD" stroke-width="1.4" opacity="0.6">`
    + `<animate attributeName="r" values="9;15;9" dur="2.8s" repeatCount="indefinite"/>`
    + `<animate attributeName="opacity" values="0.6;0;0.6" dur="2.8s" repeatCount="indefinite"/></circle>`
    // tiny cab glyph
    + `<rect x="${cab.x-4.5}" y="${cab.y-2.6}" width="9" height="5.2" rx="1.4" fill="#14A8AD"/>`
    + `<rect x="${cab.x-2.6}" y="${cab.y-4.4}" width="5.2" height="3" rx="1" fill="#14A8AD"/>`
    + `<title>Cab — current position (cool zone Z12)</title>`
    + `</g>`;

  // hotspot ring marker (amber) on hottest zone
  const hsRing = `<circle cx="${aEnd.x}" cy="${aEnd.y}" r="15" fill="none" stroke="#E8A838" stroke-width="1.4" opacity="0.55">`
    + `<animate attributeName="r" values="13;20;13" dur="2.6s" repeatCount="indefinite"/>`
    + `<animate attributeName="opacity" values="0.55;0;0.55" dur="2.6s" repeatCount="indefinite"/></circle>`;

  // ---- legend (demand color scale) ----
  const legX = gridX + gridW + 56;   // ~340
  const legTop = gridY + 6;
  const stops = 18;
  let legGrad = '';
  const legCellH = 11.4;
  for(let i=0;i<stops;i++){
    const v = i/(stops-1);
    legGrad += `<rect x="${legX}" y="${(legTop + i*legCellH).toFixed(2)}" width="14" height="${(legCellH+0.5).toFixed(2)}" fill="${ramp(v)}"/>`;
  }
  const legH = stops*legCellH;
  const legend =
    `<g font-family="Inter,sans-serif">`
    + `<text x="${legX}" y="${legTop-10}" font-size="11" fill="#909090">Predicted demand</text>`
    + legGrad
    + `<rect x="${legX}" y="${legTop}" width="14" height="${legH.toFixed(1)}" fill="none" stroke="#262626" stroke-width="1"/>`
    + `<text x="${legX+22}" y="${legTop+8}" font-size="10" fill="#707070">High</text>`
    + `<text x="${legX+22}" y="${(legTop+legH/2+4).toFixed(1)}" font-size="10" fill="#707070">Med</text>`
    + `<text x="${legX+22}" y="${(legTop+legH).toFixed(1)}" font-size="10" fill="#707070">Low</text>`
    + `</g>`;

  // ---- headline metric (amber) ----
  const metricX = legX + 70;
  const metricY = gridY + 70;
  const headline =
    `<g font-family="Inter,sans-serif">`
    + `<text x="${metricX}" y="${metricY}" font-size="11" fill="#909090">Peak zone demand</text>`
    + `<text x="${metricX}" y="${metricY+38}" font-size="40" font-weight="700" fill="#E8A838">96%</text>`
    + `<text x="${metricX}" y="${metricY+58}" font-size="11" fill="#909090">Zone Z55 · next 15-min window</text>`
    + `<g transform="translate(${metricX},${metricY+78})">`
    + `<rect x="0" y="0" width="11" height="11" rx="2" fill="#E8A838"/>`
    + `<text x="18" y="9.5" font-size="10.5" fill="#909090">target hotspot</text>`
    + `<rect x="120" y="0" width="11" height="11" rx="2" fill="#101010" stroke="#14A8AD" stroke-width="1.3"/>`
    + `<text x="138" y="9.5" font-size="10.5" fill="#909090">routed cab</text>`
    + `</g>`
    + `</g>`;

  // ---- titles ----
  const titles =
    `<g font-family="Inter,sans-serif">`
    + `<text x="${pad}" y="28" font-size="13.5" font-weight="600" fill="#F0F0F0">Predicted demand → shortest weighted path to the hotspot</text>`
    + `<text x="${pad}" y="46" font-size="11" fill="#909090">NYC zone demand heatmap with modified-Dijkstra routing overlay</text>`
    + `</g>`;

  // ---- footer note ----
  const note =
    `<text x="${pad}" y="${H-16}" font-size="10.5" fill="#707070" font-family="Inter,sans-serif">`
    + `LSTM demand per zone × time window · edge weights = traffic + demand signal · modified Dijkstra shortest path`
    + `</text>`;

  // grid frame
  const frame = `<rect x="${gridX}" y="${gridY}" width="${gridW}" height="${gridH}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>`;

  // axis caption under grid
  const axisCap = `<text x="${gridX}" y="${gridY+gridH+18}" font-size="10" fill="#707070" font-family="Inter,sans-serif">6 × 6 zone grid · Manhattan service area</text>`;

  // ---- assemble ----
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:760px;height:auto;display:block" role="img" aria-label="NYC 6 by 6 zone demand heatmap shaded teal to amber, with a cab marker on a cool zone and a modified Dijkstra routing path arrowing into the hottest amber zone at 96 percent predicted demand. Legend maps the demand color scale.">`
    + `<rect x="0" y="0" width="${W}" height="${H}" fill="#141414"/>`
    + `<rect x="${pad-2}" y="58" width="${W-2*(pad-2)}" height="${H-58-30}" rx="6" fill="#1A1A1A"/>`
    + titles
    + cells
    + lines
    + frame
    + zlabels
    + axisCap
    + pathEls
    + nodes
    + hsRing
    + arrow
    + cabMarker
    + legend
    + headline
    + note
    + `</svg>`;

  return svg;
}

/* ==== battery ==== */
function viz_battery(){
  const W=760,H=400,pad=16;
  const text="#F0F0F0",muted="#909090",tick="#707070",faint="#262626";
  const teal="#0D7377",tealB="#14A8AD",amber="#E8A838";
  const surf="#141414";
  const sx0=70,sx1=410,sy0=70,sy1=320;
  const cl=[
    {fill:"#0D7377",stroke:"#14A8AD",cx:0.30,cy:0.68,name:"High-velocity / stable"},
    {fill:"#14A8AD",stroke:"#14A8AD",cx:0.62,cy:0.40,name:"Mid-velocity"},
    {fill:"rgba(13,115,119,0.35)",stroke:"#0D7377",cx:0.78,cy:0.78,name:"Low-velocity / tail"},
    {fill:"#E8A838",stroke:"#E8A838",cx:0.40,cy:0.20,name:"Volatile outliers"}
  ];
  const pts=[
    [0.26,0.62,0],[0.31,0.71,0],[0.22,0.66,0],[0.35,0.64,0],[0.29,0.74,0],
    [0.24,0.58,0],[0.33,0.69,0],[0.38,0.72,0],[0.27,0.78,0],[0.20,0.70,0],
    [0.58,0.36,1],[0.64,0.44,1],[0.55,0.32,1],[0.68,0.41,1],[0.60,0.47,1],
    [0.66,0.34,1],[0.52,0.39,1],[0.70,0.45,1],[0.57,0.30,1],[0.63,0.49,1],
    [0.74,0.74,2],[0.80,0.81,2],[0.76,0.70,2],[0.83,0.77,2],[0.71,0.79,2],
    [0.85,0.73,2],[0.78,0.84,2],[0.73,0.66,2],[0.81,0.86,2],[0.88,0.80,2],
    [0.36,0.16,3],[0.43,0.24,3],[0.38,0.12,3],[0.46,0.19,3],[0.34,0.27,3],
    [0.48,0.14,3],[0.41,0.30,3],[0.44,0.10,3],[0.39,0.22,3],[0.50,0.26,3]
  ];
  const px=v=>sx0+v*(sx1-sx0);
  const py=v=>sy1-v*(sy1-sy0);
  let dots="";
  for(let i=0;i<pts.length;i++){
    const p=pts[i],c=cl[p[2]];
    dots+=`<circle class="viz_battery_dot" cx="${px(p[0]).toFixed(1)}" cy="${py(p[1]).toFixed(1)}" r="4.5" fill="${c.fill}" stroke="${c.stroke}" stroke-width="1" opacity="0.95" style="animation-delay:${(i*22)}ms"><title>${c.name}</title></circle>`;
  }
  let crosses="";
  for(let i=0;i<cl.length;i++){
    const c=cl[i],cxp=px(c.cx),cyp=py(c.cy),col=i===3?amber:tealB;
    crosses+=`<g opacity="0.85"><line x1="${(cxp-7).toFixed(1)}" y1="${cyp.toFixed(1)}" x2="${(cxp+7).toFixed(1)}" y2="${cyp.toFixed(1)}" stroke="${col}" stroke-width="1.4"/><line x1="${cxp.toFixed(1)}" y1="${(cyp-7).toFixed(1)}" x2="${cxp.toFixed(1)}" y2="${(cyp+7).toFixed(1)}" stroke="${col}" stroke-width="1.4"/><circle cx="${cxp.toFixed(1)}" cy="${cyp.toFixed(1)}" r="11" fill="none" stroke="${col}" stroke-width="0.8" stroke-dasharray="2 2" opacity="0.6"/></g>`;
  }
  let grid="";
  for(let i=0;i<=4;i++){
    const gx=sx0+i*(sx1-sx0)/4, gy=sy0+i*(sy1-sy0)/4;
    grid+=`<line x1="${gx.toFixed(1)}" y1="${sy0}" x2="${gx.toFixed(1)}" y2="${sy1}" stroke="${faint}" stroke-width="1"/>`;
    grid+=`<line x1="${sx0}" y1="${gy.toFixed(1)}" x2="${sx1}" y2="${gy.toFixed(1)}" stroke="${faint}" stroke-width="1"/>`;
  }
  const bx0=470,bxRaw=540,bxAfter=640,bw=56;
  const baseY=320,topY=110;
  const rmseRaw=2.84,rmseAfter=1.61,maxR=3.1;
  const scaleR=(baseY-topY)/maxR;
  const rawH=rmseRaw*scaleR, afterH=rmseAfter*scaleR;
  const rawTop=baseY-rawH, afterTop=baseY-afterH;
  const gain=Math.round((1-rmseAfter/rmseRaw)*100);
  let bgrid="";
  for(let v=0;v<=3;v++){
    const gy=baseY-v*scaleR;
    bgrid+=`<line x1="${bx0}" y1="${gy.toFixed(1)}" x2="710" y2="${gy.toFixed(1)}" stroke="${faint}" stroke-width="1"/>`;
    bgrid+=`<text x="${bx0-6}" y="${(gy+3.5).toFixed(1)}" font-family="Inter,sans-serif" font-size="10" fill="${tick}" text-anchor="end">${v.toFixed(1)}</text>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:760px;height:auto;display:block" role="img" aria-label="Store-item clustering scatter and RMSE improvement after outlier treatment and clustering">
<style>
.viz_battery_dot{transform-box:fill-box;transform-origin:center;animation:viz_battery_pop 600ms ease-out backwards}
@keyframes viz_battery_pop{0%{opacity:0;transform:scale(0)}100%{opacity:0.95;transform:scale(1)}}
.viz_battery_bar{transform-origin:bottom;animation:viz_battery_grow 900ms cubic-bezier(.4,0,.2,1) backwards}
@keyframes viz_battery_grow{0%{transform:scaleY(0)}100%{transform:scaleY(1)}}
</style>
<rect x="0" y="0" width="${W}" height="${H}" fill="#101010"/>
<text x="${pad}" y="30" font-family="Inter,sans-serif" font-size="13.5" font-weight="600" fill="${text}">Store-item clustering + RMSE improved</text>
<text x="${pad}" y="48" font-family="Inter,sans-serif" font-size="11" fill="${muted}">Cluster the noise out &#8594; forecast &#8594; disaggregate</text>
<rect x="${sx0}" y="${sy0}" width="${sx1-sx0}" height="${sy1-sy0}" fill="${surf}" stroke="${faint}" stroke-width="1"/>
${grid}
${crosses}
${dots}
<line x1="${sx0}" y1="${sy0}" x2="${sx0}" y2="${sy1}" stroke="${faint}" stroke-width="1.4"/>
<line x1="${sx0}" y1="${sy1}" x2="${sx1}" y2="${sy1}" stroke="${faint}" stroke-width="1.4"/>
<text x="${(sx0+sx1)/2}" y="${sy1+26}" font-family="Inter,sans-serif" font-size="10" fill="${tick}" text-anchor="middle">sales velocity &#8594;</text>
<text x="${sx0-12}" y="${(sy0+sy1)/2}" font-family="Inter,sans-serif" font-size="10" fill="${tick}" text-anchor="middle" transform="rotate(-90 ${sx0-12} ${(sy0+sy1)/2})">demand volatility &#8594;</text>
<text x="${sx0}" y="${sy0-8}" font-family="Inter,sans-serif" font-size="10.5" fill="${muted}">40 store-items &#183; 4 k-means clusters</text>
<g font-family="Inter,sans-serif" font-size="10">
<circle cx="${sx0+4}" cy="${sy1+40}" r="4" fill="${teal}" stroke="${tealB}" stroke-width="1"/><text x="${sx0+12}" y="${sy1+43}" fill="${muted}">stable</text>
<circle cx="${sx0+70}" cy="${sy1+40}" r="4" fill="${tealB}"/><text x="${sx0+78}" y="${sy1+43}" fill="${muted}">mid</text>
<circle cx="${sx0+118}" cy="${sy1+40}" r="4" fill="rgba(13,115,119,0.35)" stroke="${teal}" stroke-width="1"/><text x="${sx0+126}" y="${sy1+43}" fill="${muted}">tail</text>
<circle cx="${sx0+158}" cy="${sy1+40}" r="4" fill="${amber}"/><text x="${sx0+166}" y="${sy1+43}" fill="${amber}">volatile outliers</text>
</g>
<text x="${bx0}" y="${sy0-8}" font-family="Inter,sans-serif" font-size="10.5" fill="${muted}">Forecast error (RMSE)</text>
${bgrid}
<rect class="viz_battery_bar" x="${bxRaw}" y="${rawTop.toFixed(1)}" width="${bw}" height="${rawH.toFixed(1)}" fill="rgba(13,115,119,0.35)" stroke="${teal}" stroke-width="1"><title>Raw RMSE (with outliers): ${rmseRaw.toFixed(2)}</title></rect>
<rect class="viz_battery_bar" x="${bxAfter}" y="${afterTop.toFixed(1)}" width="${bw}" height="${afterH.toFixed(1)}" fill="${teal}" stroke="${tealB}" stroke-width="1" style="animation-delay:200ms"><title>RMSE after outlier treatment + clustering: ${rmseAfter.toFixed(2)}</title></rect>
<text x="${bxRaw+bw/2}" y="${rawTop-8}" font-family="Inter,sans-serif" font-size="12" font-weight="600" fill="${text}" text-anchor="middle">${rmseRaw.toFixed(2)}</text>
<text x="${bxAfter+bw/2}" y="${afterTop-8}" font-family="Inter,sans-serif" font-size="12" font-weight="600" fill="${text}" text-anchor="middle">${rmseAfter.toFixed(2)}</text>
<text x="${bxRaw+bw/2}" y="${baseY+15}" font-family="Inter,sans-serif" font-size="10" fill="${muted}" text-anchor="middle">Raw</text>
<text x="${bxRaw+bw/2}" y="${baseY+27}" font-family="Inter,sans-serif" font-size="9.5" fill="${tick}" text-anchor="middle">with outliers</text>
<text x="${bxAfter+bw/2}" y="${baseY+15}" font-family="Inter,sans-serif" font-size="10" fill="${muted}" text-anchor="middle">Treated</text>
<text x="${bxAfter+bw/2}" y="${baseY+27}" font-family="Inter,sans-serif" font-size="9.5" fill="${tick}" text-anchor="middle">+ clustering</text>
<line x1="${bxRaw+bw/2}" y1="${rawTop.toFixed(1)}" x2="${bxRaw+bw/2}" y2="${afterTop.toFixed(1)}" stroke="${amber}" stroke-width="1.2" stroke-dasharray="3 2" opacity="0.8"/>
<line x1="${bxRaw+bw/2}" y1="${afterTop.toFixed(1)}" x2="${bxAfter+bw/2}" y2="${afterTop.toFixed(1)}" stroke="${amber}" stroke-width="1.2" stroke-dasharray="3 2" opacity="0.8"/>
<rect x="${bxRaw+bw+14}" y="${(rawTop+afterTop)/2-22}" width="62" height="42" rx="5" fill="rgba(232,168,56,0.12)" stroke="${amber}" stroke-width="1"/>
<text x="${bxRaw+bw+45}" y="${(rawTop+afterTop)/2-3}" font-family="Inter,sans-serif" font-size="17" font-weight="600" fill="${amber}" text-anchor="middle">${gain}%</text>
<text x="${bxRaw+bw+45}" y="${(rawTop+afterTop)/2+13}" font-family="Inter,sans-serif" font-size="8.5" fill="${amber}" text-anchor="middle">lower RMSE</text>
<text x="${bx0}" y="${H-22}" font-family="Inter,sans-serif" font-size="10" fill="${muted}">Forecast at cluster level &#8594; disaggregate to store-item.</text>
<text x="${bx0}" y="${H-9}" font-family="Inter,sans-serif" font-size="10" fill="${muted}">Recall thresholds maintained.</text>
</svg>`;
}

/* ==== plugPredict ==== */
function viz_plugPredict(){
  const W=760, H=440, pad=16;
  const axisY=210, axisX0=44, nowX=296;
  const rightEdge=W-pad-16;

  const events=[
    {t:0.06,label:"Dx",sub:"Initial diagnosis"},
    {t:0.27,label:"Rx",sub:"Prescription"},
    {t:0.49,label:"Proc",sub:"Procedure"},
    {t:0.71,label:"Surg",sub:"Surgery"},
    {t:0.93,label:"Note",sub:"Clinical note"}
  ];
  const ex=t=>axisX0+(nowX-axisX0-20)*t;

  const horizons=[
    {m:"3 mo",x:nowX+34},
    {m:"6 mo",x:nowX+82},
    {m:"12 mo",x:nowX+132}
  ];

  const nodeCx=410, nodeCy=axisY-46, nodeW=130, nodeH=48;
  const nodeL=nodeCx-nodeW/2, nodeR=nodeCx+nodeW/2;
  const recX=556, recW=156, recH=42;
  const recRxY=axisY-70, recPrY=axisY+2;

  const bandTop=axisY-108, bandBot=axisY+96;

  const gx=118, gy=H-78, gr=29, gsw=8;
  const pct=0.72;
  const circ=2*Math.PI*gr;
  const dash=circ*pct, gap=circ-dash;

  let s='';
  s+=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:760px;height:auto;display:block" role="img" aria-label="Patient history timeline leading to a predicted future diagnosis that drives recommended drug regimen and procedures, with 72 percent precision">`;

  s+=`<style>
    .viz_plugPredict_flow{stroke-dasharray:5 4;animation:viz_plugPredict_dash 1.5s linear infinite}
    @keyframes viz_plugPredict_dash{to{stroke-dashoffset:-18}}
    .viz_plugPredict_pulse{animation:viz_plugPredict_pl 3.2s ease-in-out infinite}
    @keyframes viz_plugPredict_pl{0%,100%{opacity:.55}50%{opacity:1}}
    .viz_plugPredict_ev:hover circle{stroke:#F0F0F0}
    .viz_plugPredict_chip:hover rect{stroke:#14A8AD}
  </style>`;

  s+=`<defs>`;
  s+=`<marker id="viz_plugPredict_arr" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="#14A8AD"/></marker>`;
  s+=`</defs>`;

  s+=`<rect x="0" y="0" width="${W}" height="${H}" fill="#141414"/>`;
  s+=`<rect x="${pad}" y="${pad}" width="${W-2*pad}" height="${H-2*pad}" rx="10" fill="#1A1A1A" stroke="#262626"/>`;

  s+=`<text x="${pad+18}" y="46" font-family="Inter,sans-serif" font-size="13.5" font-weight="600" fill="#F0F0F0">Patient history &#8594; predicted diagnosis &#8594; drug &amp; procedure recommendations</text>`;
  s+=`<text x="${pad+18}" y="66" font-family="Inter,sans-serif" font-size="11" fill="#909090">The model predicts the likely future diagnosis, which drives the drug &amp; procedure recommendations</text>`;

  s+=`<g font-family="Inter,sans-serif" font-size="10">`;
  s+=`<rect x="${pad+18}" y="86" width="10" height="10" rx="2" fill="rgba(13,115,119,0.35)" stroke="#14A8AD"/>`;
  s+=`<text x="${pad+34}" y="95" fill="#909090">Recorded history</text>`;
  s+=`<rect x="${pad+148}" y="86" width="10" height="10" rx="2" fill="rgba(13,115,119,0.12)" stroke="#0D7377" stroke-dasharray="2 2"/>`;
  s+=`<text x="${pad+164}" y="95" fill="#909090">Predicted output</text>`;
  s+=`</g>`;

  s+=`<rect x="${nowX}" y="${bandTop}" width="${rightEdge-nowX}" height="${bandBot-bandTop}" rx="8" fill="rgba(13,115,119,0.12)"/>`;
  s+=`<text x="${rightEdge-8}" y="${bandTop-7}" font-family="Inter,sans-serif" font-size="10" fill="#707070" text-anchor="end">prediction horizon (3 / 6 / 12 mo)</text>`;

  s+=`<line x1="${axisX0}" y1="${axisY}" x2="${nowX}" y2="${axisY}" stroke="#0D7377" stroke-width="2.5"/>`;
  s+=`<line x1="${nowX}" y1="${axisY}" x2="${rightEdge-8}" y2="${axisY}" stroke="#0D7377" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.6"/>`;
  s+=`<text x="${axisX0}" y="${axisY+44}" font-family="Inter,sans-serif" font-size="10" fill="#707070">earlier history</text>`;

  horizons.forEach(h=>{
    s+=`<line x1="${h.x}" y1="${axisY}" x2="${h.x}" y2="${axisY+24}" stroke="#262626" stroke-width="1" stroke-dasharray="2 3"/>`;
    s+=`<circle cx="${h.x}" cy="${axisY}" r="3" fill="#0D7377" stroke="#14A8AD" stroke-width="1.2" class="viz_plugPredict_pulse"/>`;
    s+=`<text x="${h.x}" y="${axisY+38}" font-family="Inter,sans-serif" font-size="10.5" font-weight="600" fill="#14A8AD" text-anchor="middle">${h.m}</text>`;
  });

  events.forEach((e,i)=>{
    const x=ex(e.t);
    const up=i%2===0;
    const ly=up?axisY-22:axisY+22;
    const ty=up?axisY-37:axisY+24;
    s+=`<line x1="${x}" y1="${axisY}" x2="${x}" y2="${ly}" stroke="#262626" stroke-width="1"/>`;
    s+=`<g class="viz_plugPredict_ev"><title>${e.sub}</title>`;
    s+=`<circle cx="${x}" cy="${axisY}" r="5.5" fill="#1A1A1A" stroke="#14A8AD" stroke-width="2"/>`;
    s+=`<circle cx="${x}" cy="${axisY}" r="2" fill="#14A8AD"/>`;
    const lw=e.label.length*6.6+14;
    s+=`<rect x="${x-lw/2}" y="${ty}" width="${lw}" height="15" rx="4" fill="rgba(13,115,119,0.2)" stroke="#0D7377"/>`;
    s+=`<text x="${x}" y="${ty+11}" font-family="Inter,sans-serif" font-size="10" font-weight="600" fill="#F0F0F0" text-anchor="middle">${e.label}</text>`;
    s+=`</g>`;
  });

  s+=`<line x1="${nowX}" y1="${axisY-112}" x2="${nowX}" y2="${axisY+112}" stroke="#909090" stroke-width="1.5" stroke-dasharray="3 4"/>`;
  s+=`<circle cx="${nowX}" cy="${axisY}" r="6" fill="#1A1A1A" stroke="#F0F0F0" stroke-width="1.5"/>`;
  s+=`<rect x="${nowX-22}" y="${axisY-130}" width="44" height="17" rx="4" fill="#101010" stroke="#262626"/>`;
  s+=`<text x="${nowX}" y="${axisY-118}" font-family="Inter,sans-serif" font-size="10.5" font-weight="600" fill="#F0F0F0" text-anchor="middle">NOW</text>`;

  s+=`<path class="viz_plugPredict_flow" d="M ${nowX+8} ${axisY-14} C ${nowX+34} ${axisY-14}, ${nodeL-30} ${nodeCy}, ${nodeL-4} ${nodeCy}" fill="none" stroke="#14A8AD" stroke-width="2" marker-end="url(#viz_plugPredict_arr)"/>`;
  s+=`<text x="${(nowX+nodeL)/2}" y="${nodeCy-20}" font-family="Inter,sans-serif" font-size="9" fill="#707070" text-anchor="middle">predict</text>`;

  s+=`<g class="viz_plugPredict_chip"><title>The model predicts the likely future diagnosis first</title>`;
  s+=`<rect x="${nodeL}" y="${nodeCy-nodeH/2}" width="${nodeW}" height="${nodeH}" rx="8" fill="rgba(13,115,119,0.35)" stroke="#14A8AD" stroke-width="1.5"/>`;
  s+=`<circle cx="${nodeL+16}" cy="${nodeCy-nodeH/2+15}" r="8" fill="#0D7377" stroke="#14A8AD" stroke-width="1"/>`;
  s+=`<text x="${nodeL+16}" y="${nodeCy-nodeH/2+18.5}" font-family="Inter,sans-serif" font-size="9" font-weight="700" fill="#F0F0F0" text-anchor="middle">1</text>`;
  s+=`<text x="${nodeCx+10}" y="${nodeCy-5}" font-family="Inter,sans-serif" font-size="8.5" fill="#909090" text-anchor="middle">PREDICTED</text>`;
  s+=`<text x="${nodeCx+10}" y="${nodeCy+12}" font-family="Inter,sans-serif" font-size="13" font-weight="600" fill="#F0F0F0" text-anchor="middle">Diagnosis</text>`;
  s+=`</g>`;

  s+=`<path class="viz_plugPredict_flow" d="M ${nodeR+2} ${nodeCy-6} C ${nodeR+34} ${nodeCy-6}, ${recX-34} ${recRxY+recH/2}, ${recX-4} ${recRxY+recH/2}" fill="none" stroke="#14A8AD" stroke-width="2" marker-end="url(#viz_plugPredict_arr)"/>`;
  s+=`<path class="viz_plugPredict_flow" d="M ${nodeR+2} ${nodeCy+10} C ${nodeR+34} ${nodeCy+10}, ${recX-34} ${recPrY+recH/2}, ${recX-4} ${recPrY+recH/2}" fill="none" stroke="#14A8AD" stroke-width="2" marker-end="url(#viz_plugPredict_arr)"/>`;
  s+=`<text x="${(nodeR+recX)/2}" y="${nodeCy-26}" font-family="Inter,sans-serif" font-size="9" fill="#707070" text-anchor="middle">informs</text>`;

  function recChip(y,n,tag,full){
    s+=`<g class="viz_plugPredict_chip"><title>${full}, recommended from the predicted diagnosis</title>`;
    s+=`<rect x="${recX}" y="${y}" width="${recW}" height="${recH}" rx="8" fill="rgba(13,115,119,0.12)" stroke="#0D7377" stroke-dasharray="3 2"/>`;
    s+=`<rect x="${recX}" y="${y}" width="3" height="${recH}" rx="1.5" fill="#14A8AD"/>`;
    s+=`<circle cx="${recX+18}" cy="${y+14}" r="8" fill="#1A1A1A" stroke="#0D7377" stroke-width="1"/>`;
    s+=`<text x="${recX+18}" y="${y+17.5}" font-family="Inter,sans-serif" font-size="9" font-weight="700" fill="#14A8AD" text-anchor="middle">${n}</text>`;
    s+=`<text x="${recX+34}" y="${y+18}" font-family="Inter,sans-serif" font-size="11.5" font-weight="600" fill="#F0F0F0">${tag}</text>`;
    s+=`<text x="${recX+14}" y="${y+34}" font-family="Inter,sans-serif" font-size="9.5" fill="#909090">${full}</text>`;
    s+=`</g>`;
  }
  recChip(recRxY,"2","Drug regimen","Recommended medications");
  recChip(recPrY,"3","Procedures","Recommended interventions");

  s+=`<g transform="translate(${gx},${gy})">`;
  s+=`<circle r="${gr}" fill="none" stroke="#262626" stroke-width="${gsw}"/>`;
  s+=`<circle r="${gr}" fill="none" stroke="#E8A838" stroke-width="${gsw}" stroke-linecap="round" stroke-dasharray="${dash.toFixed(1)} ${gap.toFixed(1)}" transform="rotate(-90)">`;
  s+=`<animate attributeName="stroke-dasharray" from="0 ${circ.toFixed(1)}" to="${dash.toFixed(1)} ${gap.toFixed(1)}" dur="1.2s" begin="0s" fill="freeze" calcMode="spline" keySplines="0.25 0.1 0.25 1"/>`;
  s+=`</circle>`;
  s+=`<text x="0" y="2" font-family="Inter,sans-serif" font-size="17" font-weight="700" fill="#E8A838" text-anchor="middle">72%</text>`;
  s+=`<text x="0" y="15" font-family="Inter,sans-serif" font-size="8" fill="#909090" text-anchor="middle">precision</text>`;
  s+=`</g>`;
  s+=`<text x="${gx+gr+16}" y="${gy-4}" font-family="Inter,sans-serif" font-size="11" font-weight="600" fill="#F0F0F0">Diagnosis prediction precision</text>`;
  s+=`<text x="${gx+gr+16}" y="${gy+12}" font-family="Inter,sans-serif" font-size="10" fill="#707070">measured on held-out patient histories</text>`;

  const fy=H-24;
  s+=`<g font-family="Inter,sans-serif">`;
  s+=`<text x="${pad+18}" y="${fy}" font-size="11"><tspan fill="#14A8AD" font-weight="600">12</tspan><tspan fill="#909090"> therapy areas</tspan></text>`;
  s+=`<line x1="${pad+148}" y1="${fy-11}" x2="${pad+148}" y2="${fy+1}" stroke="#262626"/>`;
  s+=`<text x="${pad+162}" y="${fy}" font-size="11"><tspan fill="#E8A838" font-weight="600">2/3</tspan><tspan fill="#909090"> reduction in doctor prep time</tspan></text>`;
  s+=`<line x1="${pad+388}" y1="${fy-11}" x2="${pad+388}" y2="${fy+1}" stroke="#262626"/>`;
  s+=`<text x="${pad+402}" y="${fy}" font-size="11"><tspan fill="#909090">deep neural net + ensemble</tspan></text>`;
  s+=`</g>`;

  s+=`</svg>`;
  return s;
}

/* ==== vaccine ==== */
function viz_vaccine(){
  const W = 760, H = 470;
  const padL = 52, padR = 18, padT = 88, padB = 116;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const x0 = padL, y0 = padT;
  const x1 = padL + plotW, y1 = padT + plotH;
  const PX = (n) => '' + (Math.round(n * 100) / 100);

  const months = ["Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun"];
  const maxUnits = 1000;
  const sx = (i) => x0 + (plotW * i) / (months.length - 1);
  const sy = (u) => y1 - (u / maxUnits) * plotH;

  // Pre-season forecast: set early, steadier baseline routine stock (broad seasonal plateau).
  const preseason = [200, 280, 400, 520, 600, 640, 630, 560, 440, 320, 240, 200];
  // In-season forecast: reactive, tracks the actual demand surge (sharper, higher fall/winter peak).
  const inseason  = [180, 250, 420, 650, 850, 920, 830, 640, 440, 300, 220, 185];
  // On-hand inventory: replenished by orders; sawtooth declining with demand, jumping on each order.
  const onhand    = [560, 470, 600, 410, 560, 350, 540, 470, 600, 520, 470, 540];

  // Routine orders: scheduled/baseline, driven by the pre-season plan (small teal squares).
  const routine = [
    {i:0, u:onhand[0]},
    {i:2, u:onhand[2]},
    {i:6, u:onhand[6]},
    {i:8, u:onhand[8]}
  ];
  // Ad-hoc orders: reactive spikes triggered when in-season demand exceeds plan (amber dots).
  const adhoc = [
    {i:4, u:onhand[4]},
    {i:5, u:onhand[5]}
  ];

  const yTicks = [0, 250, 500, 750, 1000];

  const pathOf = (arr) => arr.map((v,i)=> (i===0?"M":"L") + PX(sx(i)) + " " + PX(sy(v))).join(" ");
  const dPre = pathOf(preseason);
  const dIn  = pathOf(inseason);
  const dInv = pathOf(onhand);

  // Light demand envelope fill under the in-season line.
  const inArea = "M" + PX(sx(0)) + " " + PX(y1) + " " +
    inseason.map((v,i)=> "L" + PX(sx(i)) + " " + PX(sy(v))).join(" ") +
    " L" + PX(sx(months.length-1)) + " " + PX(y1) + " Z";

  // Surge gap band: where in-season exceeds pre-season (drives the ad-hoc orders).
  const gapIdx = [3,4,5,6];
  let gapPts = gapIdx.map(i=> PX(sx(i)) + "," + PX(sy(inseason[i]))).join(" ") + " " +
    gapIdx.slice().reverse().map(i=> PX(sx(i)) + "," + PX(sy(preseason[i]))).join(" ");

  let s = '';
  s += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+W+' '+H+'" style="width:100%;max-width:760px;height:auto;display:block" role="img" aria-label="Pre-season plus in-season forecasts driving routine and ad-hoc vaccine orders across a flu season. A steadier pre-season forecast line sets baseline routine stock while a reactive in-season forecast tracks the autumn-winter demand surge. An on-hand inventory line is replenished by scheduled routine orders shown as small teal squares and by reactive ad-hoc orders shown as amber dots that fire when in-season demand exceeds the pre-season plan. Pilot to full rollout cut stockouts by 34 percent.">';

  // defs: gentle, additive animation. Resting state is fully drawn (dashoffset defaults to 0; inventory keeps its 5 4 dash).
  s += '<defs><style>'+
    '@keyframes viz_vaccineDraw{from{stroke-dashoffset:1600}to{stroke-dashoffset:0}}'+
    '@keyframes viz_vaccineFade{from{opacity:0}to{opacity:1}}'+
    '@keyframes viz_vaccinePop{0%,100%{transform:scale(1)}50%{transform:scale(1.16)}}'+
    '@media (prefers-reduced-motion: no-preference){'+
      '.viz_vaccine-fline{stroke-dasharray:1600;animation:viz_vaccineDraw 1.8s ease-out}'+
      '.viz_vaccine-l2{animation-delay:.3s}'+
      '.viz_vaccine-inv{animation:viz_vaccineFade 1s ease-out .55s both}'+
      '.viz_vaccine-adhoc{transform-box:fill-box;transform-origin:center;animation:viz_vaccinePop 3s ease-in-out infinite 2s}'+
    '}'+
    '.viz_vaccine-hit{transition:opacity .15s}.viz_vaccine-hit:hover{opacity:1}'+
    '</style></defs>';

  // panels
  s += '<rect x="0" y="0" width="'+W+'" height="'+H+'" rx="10" fill="#141414"/>';
  s += '<rect x="'+x0+'" y="'+y0+'" width="'+plotW+'" height="'+plotH+'" fill="#101010" stroke="#262626" stroke-width="1"/>';

  // title block
  s += '<text x="16" y="28" font-family="Inter,sans-serif" font-size="13.5" font-weight="600" fill="#F0F0F0">Pre-season + in-season forecasts &#8594; routine &amp; ad-hoc orders</text>';
  s += '<text x="16" y="46" font-family="Inter,sans-serif" font-size="11" fill="#909090">Smart vaccine ordering across a flu season &#183; forecast tracks demand, orders replenish stock</text>';

  // headline metric chip (amber, prominent) top-right
  const chipW = 150, chipH = 40, chipX = W - padR - chipW, chipY = 12;
  s += '<rect x="'+chipX+'" y="'+chipY+'" width="'+chipW+'" height="'+chipH+'" rx="6" fill="rgba(13,115,119,0.12)" stroke="#262626"/>';
  s += '<text x="'+(chipX+12)+'" y="'+(chipY+28)+'" font-family="Inter,sans-serif" font-size="20" font-weight="600" fill="#E8A838">&#8722;34%</text>';
  s += '<text x="'+(chipX+70)+'" y="'+(chipY+18)+'" font-family="Inter,sans-serif" font-size="10" fill="#F0F0F0">stockouts</text>';
  s += '<text x="'+(chipX+70)+'" y="'+(chipY+31)+'" font-family="Inter,sans-serif" font-size="10" fill="#909090">vs. baseline</text>';

  // gridlines + y ticks
  for(const v of yTicks){
    const yy = sy(v);
    s += '<line x1="'+x0+'" y1="'+PX(yy)+'" x2="'+x1+'" y2="'+PX(yy)+'" stroke="#262626" stroke-width="1"/>';
    s += '<text x="'+(x0-8)+'" y="'+PX(yy+3.5)+'" text-anchor="end" font-family="Inter,sans-serif" font-size="10" fill="#707070">'+v+'</text>';
  }
  // x ticks (months)
  months.forEach((m,i)=>{
    s += '<text x="'+PX(sx(i))+'" y="'+(y1+17)+'" text-anchor="middle" font-family="Inter,sans-serif" font-size="10" fill="#707070">'+m+'</text>';
  });
  // axis labels
  s += '<text x="'+PX((x0+x1)/2)+'" y="'+(y1+34)+'" text-anchor="middle" font-family="Inter,sans-serif" font-size="10" fill="#707070">flu season (months, peak fall/winter)</text>';
  s += '<text x="13" y="'+PX((y0+y1)/2)+'" text-anchor="middle" font-family="Inter,sans-serif" font-size="10" fill="#707070" transform="rotate(-90 13 '+PX((y0+y1)/2)+')">doses (units)</text>';

  // demand envelope fill + surge gap band
  s += '<path d="'+inArea+'" fill="rgba(13,115,119,0.12)"/>';
  s += '<polygon points="'+gapPts+'" fill="rgba(13,115,119,0.2)"/>';

  // pre-season forecast line (steadier, darker teal)
  s += '<path class="viz_vaccine-fline" d="'+dPre+'" fill="none" stroke="#0D7377" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/>';
  // in-season forecast line (reactive, teal-bright)
  s += '<path class="viz_vaccine-fline viz_vaccine-l2" d="'+dIn+'" fill="none" stroke="#14A8AD" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/>';
  // on-hand inventory line (muted dashed, replenished by orders) -- own fade so the 5 4 dash is preserved
  s += '<path class="viz_vaccine-inv" d="'+dInv+'" fill="none" stroke="#909090" stroke-width="1.4" stroke-dasharray="5 4" stroke-linejoin="round" stroke-linecap="round"/>';

  // surge annotation near the peak
  s += '<text x="'+PX(sx(5))+'" y="'+PX(sy(inseason[5])-9)+'" text-anchor="middle" font-family="Inter,sans-serif" font-size="9.5" fill="#E8A838">demand &gt; plan</text>';

  // routine order markers (small teal squares on the inventory line)
  for(const o of routine){
    const cx = sx(o.i), cy = sy(o.u);
    s += '<rect class="viz_vaccine-hit" x="'+PX(cx-4)+'" y="'+PX(cy-4)+'" width="8" height="8" rx="1" fill="#0D7377" stroke="#F0F0F0" stroke-width="1" opacity="0.95"><title>Routine order &#183; '+months[o.i]+' &#8212; scheduled replenishment from the pre-season plan</title></rect>';
  }
  // ad-hoc order markers (amber dots, reactive) with leaders up to in-season demand
  for(const o of adhoc){
    const cx = sx(o.i), cy = sy(o.u);
    s += '<line x1="'+PX(cx)+'" y1="'+PX(cy)+'" x2="'+PX(cx)+'" y2="'+PX(sy(inseason[o.i]))+'" stroke="#E8A838" stroke-width="1" stroke-dasharray="2 3" opacity="0.5"/>';
    s += '<circle class="viz_vaccine-adhoc viz_vaccine-hit" cx="'+PX(cx)+'" cy="'+PX(cy)+'" r="4.8" fill="#E8A838" stroke="#101010" stroke-width="1.4"><title>Ad-hoc order &#183; '+months[o.i]+' &#8212; reactive top-up: in-season demand exceeded the pre-season plan</title></circle>';
  }

  // note line (under axis, above legend)
  s += '<text x="16" y="'+(y1+52)+'" font-family="Inter,sans-serif" font-size="10" fill="#909090">reorder point per SKU per channel &#183; pilot &#8594; full rollout</text>';

  // ---- legend: two rows (forecasts | orders) ----
  const lgY1 = H - 34, lgY2 = H - 14;
  let lx = 16;
  s += '<text x="'+lx+'" y="'+lgY1+'" font-family="Inter,sans-serif" font-size="10" fill="#707070">Forecasts</text>'; lx += 62;
  s += '<line x1="'+lx+'" y1="'+(lgY1-4)+'" x2="'+(lx+20)+'" y2="'+(lgY1-4)+'" stroke="#0D7377" stroke-width="2.6"/>';
  s += '<text x="'+(lx+26)+'" y="'+lgY1+'" font-family="Inter,sans-serif" font-size="11" fill="#909090">Pre-season (baseline)</text>'; lx += 160;
  s += '<line x1="'+lx+'" y1="'+(lgY1-4)+'" x2="'+(lx+20)+'" y2="'+(lgY1-4)+'" stroke="#14A8AD" stroke-width="2.6"/>';
  s += '<text x="'+(lx+26)+'" y="'+lgY1+'" font-family="Inter,sans-serif" font-size="11" fill="#909090">In-season (reactive)</text>'; lx += 152;
  s += '<line x1="'+lx+'" y1="'+(lgY1-4)+'" x2="'+(lx+20)+'" y2="'+(lgY1-4)+'" stroke="#909090" stroke-width="1.4" stroke-dasharray="5 4"/>';
  s += '<text x="'+(lx+26)+'" y="'+lgY1+'" font-family="Inter,sans-serif" font-size="11" fill="#909090">On-hand inventory</text>';

  let mx = 16;
  s += '<text x="'+mx+'" y="'+lgY2+'" font-family="Inter,sans-serif" font-size="10" fill="#707070">Orders</text>'; mx += 62;
  s += '<rect x="'+mx+'" y="'+(lgY2-8)+'" width="8" height="8" rx="1" fill="#0D7377" stroke="#F0F0F0" stroke-width="1"/>';
  s += '<text x="'+(mx+16)+'" y="'+lgY2+'" font-family="Inter,sans-serif" font-size="11" fill="#909090">Routine (scheduled)</text>'; mx += 156;
  s += '<circle cx="'+(mx+4)+'" cy="'+(lgY2-4)+'" r="4.8" fill="#E8A838" stroke="#101010" stroke-width="1.2"/>';
  s += '<text x="'+(mx+14)+'" y="'+lgY2+'" font-family="Inter,sans-serif" font-size="11" fill="#909090">Ad-hoc (reactive)</text>'; mx += 140;
  s += '<rect x="'+mx+'" y="'+(lgY2-9)+'" width="14" height="10" fill="rgba(13,115,119,0.2)"/>';
  s += '<text x="'+(mx+20)+'" y="'+lgY2+'" font-family="Inter,sans-serif" font-size="11" fill="#909090">demand &gt; plan</text>';

  s += '</svg>';
  return s;
}

/* ==== patientCare ==== */
function viz_patientCare(){
  const W = 760;
  const rows = ["Dermatology","Allergy","ENT","Pulmonology","Oncology","Rare Disease","Gastroenterology","Immunology"];
  const cols = ["New Patient Prediction","Next Best Action","Smart Alerts","Customer Journey","Next Best Content","HCP Targeting","Competitive Launch Readiness","Patient Support","OCCP"];
  // delivery-coverage matrix, values 2..4 (most cells well covered = consistent delivery). value 5 = flagship (amber), exactly 5 cells.
  const m = [
    [5,3,4,3,3,4,3,3,3],
    [4,3,3,3,4,3,3,3,2],
    [3,3,3,4,3,3,2,3,3],
    [3,4,3,3,3,5,3,2,3],
    [4,3,3,3,3,3,4,3,5],
    [3,2,4,3,3,3,3,4,3],
    [3,3,3,3,5,3,2,3,3],
    [4,3,3,3,3,4,3,5,3]
  ];
  // teal fill ramp by coverage
  const tealFill = (v)=>{
    if(v<=1) return "rgba(13,115,119,0.12)";
    if(v===2) return "rgba(13,115,119,0.2)";
    if(v===3) return "rgba(13,115,119,0.35)";
    return "#0D7377"; // v===4 strongest teal
  };
  const tealStroke = (v)=> v>=4 ? "#14A8AD" : "#262626";
  // layout
  const padL = 16, padT = 16;
  const labelW = 116;             // left row-label column (fits "Gastroenterology")
  const topLabelH = 112;          // rotated column labels (clears "Competitive Launch Readiness")
  const titleSub = 44;            // title + subtitle vertical space
  const gridX = padL + labelW;
  const gridTop = padT + titleSub + topLabelH;
  const sideW = 176;              // right metric block
  const sideGap = 18;
  const gridRight = W - padL - sideW - sideGap;
  const gridW = gridRight - gridX;
  const nCols = cols.length, nRows = rows.length;
  const gap = 4;
  const cellW = (gridW - gap*(nCols-1)) / nCols;
  const cellH = 23;
  const gridH = cellH*nRows + gap*(nRows-1);
  const H = gridTop + gridH + 36;

  let s = "";
  s += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:760px;height:auto;display:block" role="img" aria-label="Patient-care portfolio coverage matrix: 8 therapy indications by 9 use cases, shaded teal by delivery coverage with five amber flagship cells, alongside a side metric block showing about 120 million dollars profit impact across 12 use cases delivered and 8 indications">`;

  // style: gentle fade-in on cells, pulse on flagship cells, hover highlight + tooltips (resting state fully visible)
  s += `<style>`
     + `.viz_patientCare-cell{opacity:1;animation:viz_patientCare-fade 0.5s ease both}`
     + `@keyframes viz_patientCare-fade{from{opacity:0}to{opacity:1}}`
     + `.viz_patientCare-cell:hover{stroke:#14A8AD;stroke-width:1.5}`
     + `.viz_patientCare-flag{animation:viz_patientCare-pulse 3.4s ease-in-out infinite}`
     + `@keyframes viz_patientCare-pulse{0%,100%{opacity:1}50%{opacity:0.82}}`
     + `</style>`;

  // background panel
  s += `<rect x="0" y="0" width="${W}" height="${H}" fill="#141414"/>`;
  s += `<rect x="${padL-6}" y="${padT-6}" width="${W-2*padL+12}" height="${H-2*padT+12}" rx="8" fill="#1A1A1A" stroke="#262626"/>`;

  // title + subtitle
  s += `<text x="${padL+2}" y="${padT+14}" font-family="Inter,sans-serif" font-size="13.5" font-weight="600" fill="#F0F0F0">Patient-care portfolio: 8 indications x 9 use cases</text>`;
  s += `<text x="${padL+2}" y="${padT+31}" font-family="Inter,sans-serif" font-size="11" fill="#909090">Delivery coverage across the patient-care use-case grid</text>`;

  // rotated column labels (anchored at start, rotate -42deg so long labels clear the title and each other)
  for(let c=0;c<nCols;c++){
    const cx = gridX + c*(cellW+gap) + cellW/2;
    const cy = gridTop - 9;
    s += `<text transform="translate(${cx.toFixed(1)} ${cy}) rotate(-42)" font-family="Inter,sans-serif" font-size="10" fill="#909090" text-anchor="start">${cols[c]}</text>`;
  }

  // row labels + cells
  let delay = 0;
  for(let r=0;r<nRows;r++){
    const ry = gridTop + r*(cellH+gap);
    s += `<text x="${gridX-10}" y="${(ry+cellH/2+3.5).toFixed(1)}" font-family="Inter,sans-serif" font-size="11" fill="#F0F0F0" text-anchor="end">${rows[r]}</text>`;
    for(let c=0;c<nCols;c++){
      const cx = gridX + c*(cellW+gap);
      const v = m[r][c];
      const flag = v===5;
      const fill = flag ? "#E8A838" : tealFill(v);
      const stroke = flag ? "#E8A838" : tealStroke(v);
      const cls = flag ? "viz_patientCare-cell viz_patientCare-flag" : "viz_patientCare-cell";
      const qLabel = flag ? "flagship" : (v>=4?"strong":v===3?"consistent":v===2?"developing":"early");
      delay += 0.013;
      s += `<rect class="${cls}" x="${cx.toFixed(1)}" y="${ry.toFixed(1)}" width="${cellW.toFixed(1)}" height="${cellH}" rx="3" fill="${fill}" stroke="${stroke}" stroke-width="${flag?1.2:0.75}" style="animation-delay:${delay.toFixed(2)}s">`
         + `<title>${rows[r]} · ${cols[c]} — ${qLabel} delivery</title></rect>`;
      if(flag){
        s += `<circle cx="${(cx+cellW/2).toFixed(1)}" cy="${(ry+cellH/2).toFixed(1)}" r="2.4" fill="#1A1A1A"/>`;
      }
    }
  }

  // legend (bottom-left under grid)
  const legY = gridTop + gridH + 22;
  const legItems = [
    {f:"rgba(13,115,119,0.2)",t:"developing"},
    {f:"rgba(13,115,119,0.35)",t:"consistent"},
    {f:"#0D7377",t:"strong"},
    {f:"#E8A838",t:"flagship"}
  ];
  let lx = gridX-10;
  for(let i=0;i<legItems.length;i++){
    s += `<rect x="${lx}" y="${legY-9}" width="12" height="12" rx="2" fill="${legItems[i].f}" stroke="#262626" stroke-width="0.75"/>`;
    s += `<text x="${lx+17}" y="${legY+1}" font-family="Inter,sans-serif" font-size="10" fill="#707070">${legItems[i].t}</text>`;
    lx += 17 + legItems[i].t.length*5.6 + 18;
  }

  // ===== side metric block (amber accent) =====
  const sx = gridRight + sideGap;
  const sy = gridTop;
  const sH = gridH;
  s += `<rect x="${sx}" y="${sy.toFixed(1)}" width="${sideW}" height="${sH.toFixed(1)}" rx="6" fill="#101010" stroke="#262626"/>`;
  s += `<rect x="${sx}" y="${sy.toFixed(1)}" width="3" height="${sH.toFixed(1)}" rx="1.5" fill="#E8A838"/>`;

  s += `<text x="${sx+16}" y="${(sy+22).toFixed(1)}" font-family="Inter,sans-serif" font-size="11" fill="#909090">Business impact</text>`;
  s += `<text x="${sx+16}" y="${(sy+52).toFixed(1)}" font-family="Inter,sans-serif" font-size="30" font-weight="600" fill="#E8A838">~$2B</text>`;
  s += `<text x="${sx+16}" y="${(sy+69).toFixed(1)}" font-family="Inter,sans-serif" font-size="10" fill="#707070">delivered across portfolio</text>`;

  // divider
  s += `<line x1="${sx+16}" y1="${(sy+86).toFixed(1)}" x2="${sx+sideW-16}" y2="${(sy+86).toFixed(1)}" stroke="#262626"/>`;

  const stats = [
    {n:"12", l:"use cases delivered"},
    {n:"8", l:"indications"}
  ];
  let syy = sy+114;
  for(let i=0;i<stats.length;i++){
    s += `<text x="${sx+16}" y="${syy.toFixed(1)}" font-family="Inter,sans-serif" font-size="22" font-weight="600" fill="#F0F0F0">${stats[i].n}</text>`;
    s += `<text x="${sx+50}" y="${syy.toFixed(1)}" font-family="Inter,sans-serif" font-size="11" fill="#909090">${stats[i].l}</text>`;
    syy += 32;
  }

  // small footer note inside block
  s += `<text x="${sx+16}" y="${(sy+sH-14).toFixed(1)}" font-family="Inter,sans-serif" font-size="10" fill="#707070">5 flagship cells</text>`;
  s += `<rect x="${sx+sideW-26}" y="${(sy+sH-23).toFixed(1)}" width="10" height="10" rx="2" fill="#E8A838"/>`;

  s += `</svg>`;
  return s;
}

/* ==== impactDashboard ==== */
function viz_impactDashboard(){
  const W = 760, H = 252;
  const teal = "#0D7377", tealBright = "#14A8AD", amber = "#E8A838";
  const text = "#F0F0F0", muted = "#909090";
  const stroke = "#262626";
  const fill12 = "rgba(13,115,119,0.12)", fill20 = "rgba(13,115,119,0.2)";

  const pad = 16;
  const titleH = 48;
  const cols = 3, rows = 2;
  const gridX = pad, gridY = titleH;
  const gridW = W - pad * 2;
  const gridH = H - titleH - pad;
  const cellW = gridW / cols;
  const cellH = gridH / rows;

  const tiles = [
    { value: "$2B+", label: "Client value influenced", type: "ring", ratio: 1.0, hero: true },
    { value: "700+", label: "Practitioners trained", type: "bars", bars: [0.35, 0.55, 0.72, 0.9, 1.0] },
    { value: "$50M+", label: "New firm revenue", type: "bars", bars: [0.45, 0.62, 0.8, 1.0] },
    { value: "22%", label: "Fewer circuit faults", type: "ring", ratio: 0.22 },
    { value: "25%", label: "Less downtime", type: "ring", ratio: 0.25 },
    { value: "72%", label: "Prediction precision", type: "spark", points: [0.2, 0.32, 0.28, 0.5, 0.62, 0.58, 0.78, 0.85, 0.72] }
  ];

  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const parts = [];

  parts.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:760px;height:auto;display:block" role="img" aria-label="Impact, by the numbers: 2 billion dollars plus in client value influenced, 700 plus practitioners trained, 50 million dollars plus new firm revenue, 22 percent fewer circuit faults, 25 percent less downtime, 72 percent prediction precision.">`);

  parts.push(`<rect x="0" y="0" width="${W}" height="${H}" rx="10" fill="#141414"/>`);
  parts.push(`<rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="10" fill="none" stroke="${stroke}"/>`);

  parts.push(`<text x="${pad}" y="27" font-family="Inter,sans-serif" font-size="13.5" font-weight="600" fill="${text}">Impact, by the numbers</text>`);
  parts.push(`<text x="${pad}" y="42" font-family="Inter,sans-serif" font-size="11" fill="${muted}">Outcomes delivered across engagements</text>`);
  parts.push(`<line x1="${pad}" y1="${titleH - 0.5}" x2="${W - pad}" y2="${titleH - 0.5}" stroke="${stroke}"/>`);

  for (let c = 1; c < cols; c++) {
    const x = gridX + cellW * c;
    parts.push(`<line x1="${x}" y1="${gridY + 10}" x2="${x}" y2="${gridY + gridH - 10}" stroke="${stroke}"/>`);
  }
  const midY = gridY + cellH;
  parts.push(`<line x1="${gridX + 6}" y1="${midY}" x2="${W - pad - 6}" y2="${midY}" stroke="${stroke}"/>`);

  tiles.forEach((t, i) => {
    const r = Math.floor(i / cols);
    const c = i % cols;
    const cx = gridX + cellW * c + cellW / 2;
    const cyTop = gridY + cellH * r;
    const gTop = cyTop + 8;

    const valY = cyTop + cellH - 22;
    const labY = cyTop + cellH - 7;
    const valColor = t.hero ? amber : text;

    parts.push(`<g font-family="Inter,sans-serif"><title>${esc(t.value)} — ${esc(t.label)}</title>`);

    if (t.type === "ring") {
      const rad = 19;
      const sw = 6;
      const circ = 2 * Math.PI * rad;
      const ringColor = t.hero ? amber : tealBright;
      const ringCy = gTop + rad;
      parts.push(`<circle cx="${cx}" cy="${ringCy}" r="${rad}" fill="none" stroke="${fill20}" stroke-width="${sw}"/>`);
      const dashFull = (t.ratio * circ).toFixed(2);
      const gap = (circ - t.ratio * circ).toFixed(2);
      parts.push(`<circle cx="${cx}" cy="${ringCy}" r="${rad}" fill="none" stroke="${ringColor}" stroke-width="${sw}" stroke-linecap="round" stroke-dasharray="${dashFull} ${gap}" transform="rotate(-90 ${cx} ${ringCy})">`);
      parts.push(`<animate attributeName="stroke-dasharray" from="0 ${circ.toFixed(2)}" to="${dashFull} ${gap}" dur="1.1s" begin="${(0.15 * i).toFixed(2)}s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1"/></circle>`);
      parts.push(`<text x="${cx}" y="${ringCy + 3.5}" text-anchor="middle" font-size="10" fill="${muted}">${esc(t.value)}</text>`);
    } else if (t.type === "bars") {
      const n = t.bars.length;
      const totalW = 60;
      const bw = totalW / (n * 1.6);
      const gapW = (totalW - bw * n) / (n - 1);
      const maxH = 34;
      const baseY = gTop + 36;
      const startX = cx - totalW / 2;
      for (let b = 0; b < n; b++) {
        const bx = startX + b * (bw + gapW);
        const bh = (t.bars[b] * maxH).toFixed(2);
        const by = baseY - bh;
        const col = b === n - 1 ? tealBright : teal;
        parts.push(`<rect x="${bx.toFixed(2)}" y="${by}" width="${bw.toFixed(2)}" height="${bh}" rx="1.5" fill="${col}">`);
        parts.push(`<animate attributeName="height" from="0" to="${bh}" dur="0.8s" begin="${(0.12 * i + 0.07 * b).toFixed(2)}s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1"/>`);
        parts.push(`<animate attributeName="y" from="${baseY}" to="${by}" dur="0.8s" begin="${(0.12 * i + 0.07 * b).toFixed(2)}s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1"/></rect>`);
      }
      parts.push(`<line x1="${(startX - 3).toFixed(2)}" y1="${baseY + 1}" x2="${(startX + totalW + 3).toFixed(2)}" y2="${baseY + 1}" stroke="${stroke}"/>`);
    } else if (t.type === "spark") {
      const n = t.points.length;
      const totalW = 66;
      const maxH = 34;
      const baseY = gTop + 36;
      const startX = cx - totalW / 2;
      const step = totalW / (n - 1);
      let d = "";
      const coords = [];
      for (let p = 0; p < n; p++) {
        const px = startX + p * step;
        const py = baseY - t.points[p] * maxH;
        coords.push([px, py]);
        d += (p === 0 ? "M" : "L") + px.toFixed(2) + " " + py.toFixed(2) + " ";
      }
      const last = coords[coords.length - 1];
      const area = d + `L${(startX + totalW).toFixed(2)} ${baseY} L${startX.toFixed(2)} ${baseY} Z`;
      parts.push(`<path d="${area}" fill="${fill12}" stroke="none"/>`);
      const lineLen = 260;
      parts.push(`<path d="${d.trim()}" fill="none" stroke="${tealBright}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${lineLen}" stroke-dashoffset="0">`);
      parts.push(`<animate attributeName="stroke-dashoffset" from="${lineLen}" to="0" dur="1.1s" begin="${(0.15 * i).toFixed(2)}s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1"/></path>`);
      parts.push(`<circle cx="${last[0].toFixed(2)}" cy="${last[1].toFixed(2)}" r="3" fill="${tealBright}"><animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="${(0.15 * i + 0.9).toFixed(2)}s" fill="freeze"/></circle>`);
      parts.push(`<line x1="${startX.toFixed(2)}" y1="${baseY + 1}" x2="${(startX + totalW).toFixed(2)}" y2="${baseY + 1}" stroke="${stroke}"/>`);
    }

    parts.push(`<text x="${cx}" y="${valY}" text-anchor="middle" font-size="25" font-weight="600" fill="${valColor}" letter-spacing="-0.5">${esc(t.value)}</text>`);
    parts.push(`<text x="${cx}" y="${labY}" text-anchor="middle" font-size="11" fill="${muted}">${esc(t.label)}</text>`);

    parts.push(`</g>`);
  });

  parts.push(`</svg>`);

  return parts.join("");
}

/* ==== skillsRadar ==== */
function viz_skillsRadar(){
  const W=460,H=366,cx=230,cy=204,R=112;
  const axes=[
    {k:"Causal Inference",v:0.95},
    {k:"Forecasting",v:0.92},
    {k:"Deep Learning",v:0.90},
    {k:"NLP",v:0.86},
    {k:"Optimization",v:0.82},
    {k:"Explainability",v:0.90},
    {k:"Leadership",v:0.94}
  ];
  const n=axes.length;
  const ang=i=>(-90+i*360/n)*Math.PI/180;
  const PX=x=>Math.round(x*100)/100;
  const pt=(i,r)=>[PX(cx+r*Math.cos(ang(i))),PX(cy+r*Math.sin(ang(i)))];
  let rings="";
  [0.25,0.5,0.75,1].forEach(level=>{
    let p="";
    for(let i=0;i<n;i++){const a=pt(i,R*level);p+=(i?"L":"M")+a[0]+" "+a[1]+" ";}
    rings+=`<path d="${p}Z" fill="none" stroke="#262626" stroke-width="1"/>`;
  });
  let spokes="";
  for(let i=0;i<n;i++){const a=pt(i,R);spokes+=`<line x1="${cx}" y1="${cy}" x2="${a[0]}" y2="${a[1]}" stroke="#262626" stroke-width="1"/>`;}
  let poly="",dots="";
  for(let i=0;i<n;i++){const a=pt(i,R*axes[i].v);poly+=(i?"L":"M")+a[0]+" "+a[1]+" ";dots+=`<circle cx="${a[0]}" cy="${a[1]}" r="3.2" fill="#14A8AD"/>`;}
  poly+="Z";
  let labels="";
  for(let i=0;i<n;i++){
    const a=ang(i),co=Math.cos(a),si=Math.sin(a);
    const lx=PX(cx+(R+16)*co),ly=PX(cy+(R+16)*si);
    const anchor=co>0.25?"start":(co<-0.25?"end":"middle");
    const dy=si>0.4?12:(si<-0.4?-2:4);
    labels+=`<text x="${lx}" y="${ly+dy}" text-anchor="${anchor}" font-family="Inter,sans-serif" font-size="12" fill="#C8C8C8">${axes[i].k}</text>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:${W}px;height:auto;display:block" role="img" aria-label="Capability radar across seven dimensions — causal inference, forecasting, deep learning, NLP, optimization, explainability and leadership — all rated high.">
  <style>@keyframes viz_skillsRadar_in{from{transform:scale(0.15);opacity:0}to{transform:scale(1);opacity:1}}
  @media (prefers-reduced-motion: no-preference){.viz_skillsRadar_poly{transform-box:fill-box;transform-origin:${cx}px ${cy}px;animation:viz_skillsRadar_in .9s cubic-bezier(.22,1,.36,1) forwards}}</style>
  <rect x="0" y="0" width="${W}" height="${H}" fill="#1A1A1A"/>
  <text x="18" y="28" font-family="Inter,sans-serif" font-size="14" font-weight="600" fill="#F0F0F0">Capability profile</text>
  <text x="18" y="46" font-family="Inter,sans-serif" font-size="11" fill="#909090">Proficiency across seven dimensions</text>
  ${rings}${spokes}
  <g class="viz_skillsRadar_poly"><path d="${poly}" fill="rgba(20,168,173,0.22)" stroke="#14A8AD" stroke-width="2" stroke-linejoin="round"/>${dots}</g>
  ${labels}
</svg>`;
}

function viz_domainDonut(){
  const W=520,H=300,cx=120,cy=166,r=76,sw=26;
  const circ=2*Math.PI*r;
  const PX=x=>Math.round(x*100)/100;
  const segs=[
    {k:"Healthcare & Life Sciences",v:30,c:"#E8A838"},
    {k:"CPG & Retail",v:22,c:"#14A8AD"},
    {k:"Energy & Utilities",v:20,c:"#0D7377"},
    {k:"Manufacturing",v:16,c:"#2f8f86"},
    {k:"Financial Planning",v:12,c:"#5cb0a8"}
  ];
  let arcs="",acc=0;
  segs.forEach(s=>{
    const dash=PX(s.v/100*circ);
    arcs+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${s.c}" stroke-width="${sw}" stroke-dasharray="${dash} ${PX(circ-dash)}" stroke-dashoffset="${PX(-acc/100*circ)}" transform="rotate(-90 ${cx} ${cy})"><title>${s.k}: ${s.v}%</title></circle>`;
    acc+=s.v;
  });
  let legend="",lx=242,ly0=94,step=33;
  segs.forEach((s,i)=>{
    const y=ly0+i*step;
    legend+=`<rect x="${lx}" y="${y-12}" width="14" height="14" rx="3" fill="${s.c}"/>`;
    legend+=`<text x="${lx+22}" y="${y}" font-family="Inter,sans-serif" font-size="13" fill="#D0D0D0">${s.k}</text>`;
    legend+=`<text x="${W-18}" y="${y}" text-anchor="end" font-family="Inter,sans-serif" font-size="13" font-weight="600" fill="${i===0?'#E8A838':'#909090'}">${s.v}%</text>`;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:${W}px;height:auto;display:block" role="img" aria-label="Domain coverage: Healthcare and Life Sciences 30 percent, CPG and Retail 22 percent, Energy and Utilities 20 percent, Manufacturing 16 percent, Financial Planning 12 percent.">
  <style>@keyframes viz_domainDonut_in{from{opacity:0;transform:scale(.6)}to{opacity:1;transform:scale(1)}}
  @media (prefers-reduced-motion: no-preference){.viz_domainDonut_ring{transform-box:fill-box;transform-origin:${cx}px ${cy}px;animation:viz_domainDonut_in .8s cubic-bezier(.22,1,.36,1) forwards}}</style>
  <rect x="0" y="0" width="${W}" height="${H}" fill="#1A1A1A"/>
  <text x="18" y="28" font-family="Inter,sans-serif" font-size="14" font-weight="600" fill="#F0F0F0">Where the work lands</text>
  <text x="18" y="46" font-family="Inter,sans-serif" font-size="11" fill="#909090">Engagements by industry</text>
  <g class="viz_domainDonut_ring">${arcs}</g>
  <text x="${cx}" y="${cy-2}" text-anchor="middle" font-family="Inter,sans-serif" font-size="16" font-weight="700" fill="#F0F0F0">Domains</text>
  <text x="${cx}" y="${cy+16}" text-anchor="middle" font-family="Inter,sans-serif" font-size="10.5" fill="#909090">5 industries</text>
  ${legend}
</svg>`;
}

/* ==== homeAuto ==== */
function viz_homeAuto(){
  const NS='viz_homeAuto';
  const W=760, H=444;

  // ---------- deterministic stylised waveform samples (no Math.random) ----------
  const owner=[0.22,0.40,0.62,0.85,0.70,0.48,0.66,0.92,0.78,0.55,0.74,0.96,0.82,0.60,0.78,0.90,0.66,0.44,0.62,0.80,0.58,0.38,0.52,0.34,0.24,0.16];
  const unkn =[0.30,0.18,0.46,0.26,0.58,0.34,0.20,0.52,0.30,0.62,0.24,0.44,0.66,0.28,0.50,0.22,0.40,0.60,0.26,0.48,0.32,0.18,0.42,0.24,0.36,0.20];

  const n=owner.length;

  // helper: build a centred waveform strip inside a box
  const waveStrip=(x,y,w,h,data,stroke)=>{
    const midY=y+h/2;
    const gap=2.2;
    const bw=(w-(n-1)*gap)/n;
    let s='';
    for(let i=0;i<n;i++){
      const bx=x+i*(bw+gap);
      const bh=Math.max(2,data[i]*(h*0.86));
      s+=`<rect x="${bx.toFixed(2)}" y="${(midY-bh/2).toFixed(2)}" width="${bw.toFixed(2)}" height="${bh.toFixed(2)}" rx="${Math.min(1.6,bw/2).toFixed(2)}" fill="${stroke}"/>`;
    }
    return s;
  };

  let svg='';
  svg+=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:760px;height:auto;display:block" role="img" aria-label="Owner-only home automation. Panel A: a CNN speaker-identification gate accepts the owner voice (teal, check) and rejects an unknown voice (red, x); false-acceptance rate under 0.1 percent at sub-200 millisecond latency. Panel B: a self-learned 24-hour schedule with on-windows for lights, thermostat, water heater and coffee maker, inferred automatically from routine on a Raspberry Pi.">`;

  // ---------- prefixed styles: gentle, resting-safe ----------
  svg+=`<style>`
    +`@keyframes ${NS}-flow{0%,100%{opacity:.45}50%{opacity:1}}`
    +`.${NS}-flow{animation:${NS}-flow 3.6s ease-in-out infinite;}`
    +`@keyframes ${NS}-acc{0%,100%{opacity:.85}50%{opacity:1}}`
    +`.${NS}-acc{animation:${NS}-acc 4s ease-in-out infinite;}`
    +`@keyframes ${NS}-bar{0%,100%{opacity:.9}50%{opacity:1}}`
    +`.${NS}-now{animation:${NS}-bar 3.8s ease-in-out infinite;}`
    +`.${NS}-strip:hover rect{fill:#14A8AD;}`
    +`</style>`;

  // ---------- background ----------
  svg+=`<rect x="0" y="0" width="${W}" height="${H}" fill="#101010"/>`;

  // ---------- title block ----------
  svg+=`<text x="24" y="30" font-family="Inter,sans-serif" font-size="13.5" font-weight="600" fill="#F0F0F0">Owner-only voice control + self-learned routine</text>`;
  svg+=`<text x="24" y="48" font-family="Inter,sans-serif" font-size="11" fill="#909090">Voice + IoT-sensor home automation that responds only to its owner</text>`;

  // ---------- headline metric (amber, reserved) ----------
  svg+=`<text x="${W-24}" y="34" text-anchor="end" font-family="Inter,sans-serif" font-size="24" font-weight="700" fill="#E8A838">&lt; 0.1%</text>`;
  svg+=`<text x="${W-24}" y="50" text-anchor="end" font-family="Inter,sans-serif" font-size="11" fill="#909090">false-acceptance rate &#183; sub-200ms latency</text>`;

  // ========================================================================
  // PANEL A — speaker-identity gate
  // ========================================================================
  const aY=70, aH=146;
  svg+=`<rect x="16" y="${aY}" width="${W-32}" height="${aH}" rx="6" fill="#141414" stroke="#262626" stroke-width="1"/>`;
  svg+=`<text x="32" y="${aY+22}" font-family="Inter,sans-serif" font-size="11" font-weight="600" fill="#909090">A &#183; Speaker-identity gate</text>`;

  // strip geometry
  const stripW=190, stripH=58, stripY=aY+38;
  const leftX=36, rightX=W-36-stripW;

  // central CNN node
  const cnnCX=W/2, cnnY=aY+38, cnnW=130, cnnH=38;
  const cnnX=cnnCX-cnnW/2;

  // -- Owner strip (left) --
  svg+=`<text x="${leftX}" y="${stripY-8}" font-family="Inter,sans-serif" font-size="11" fill="#F0F0F0">Owner</text>`;
  svg+=`<rect x="${leftX}" y="${stripY}" width="${stripW}" height="${stripH}" rx="4" fill="#101010" stroke="#262626" stroke-width="1"/>`;
  svg+=`<g class="${NS}-strip">${waveStrip(leftX+8,stripY,stripW-16,stripH,owner,'#14A8AD')}<title>Owner voice sample &#8594; enrolled speaker embedding</title></g>`;

  // -- Unknown strip (right) --
  svg+=`<text x="${rightX}" y="${stripY-8}" font-family="Inter,sans-serif" font-size="11" fill="#F0F0F0">Unknown voice</text>`;
  svg+=`<rect x="${rightX}" y="${stripY}" width="${stripW}" height="${stripH}" rx="4" fill="#101010" stroke="#262626" stroke-width="1"/>`;
  svg+=`<g class="${NS}-strip">${waveStrip(rightX+8,stripY,stripW-16,stripH,unkn,'#0D7377')}<title>Unknown voice sample &#8594; does not match enrolled speaker</title></g>`;

  // -- flow arrows from each strip into central CNN node --
  const stripMidY=stripY+stripH/2;
  // left -> cnn
  svg+=`<line class="${NS}-flow" x1="${leftX+stripW}" y1="${stripMidY}" x2="${cnnX-7}" y2="${stripMidY}" stroke="#0D7377" stroke-width="1.4"/>`;
  svg+=`<path d="M${cnnX-7},${stripMidY-4} L${cnnX},${stripMidY} L${cnnX-7},${stripMidY+4} Z" fill="#14A8AD"/>`;
  // right -> cnn
  svg+=`<line class="${NS}-flow" x1="${rightX}" y1="${stripMidY}" x2="${cnnX+cnnW+7}" y2="${stripMidY}" stroke="#0D7377" stroke-width="1.4"/>`;
  svg+=`<path d="M${cnnX+cnnW+7},${stripMidY-4} L${cnnX+cnnW},${stripMidY} L${cnnX+cnnW+7},${stripMidY+4} Z" fill="#14A8AD"/>`;

  // -- central CNN speaker-ID node --
  svg+=`<rect x="${cnnX}" y="${cnnY}" width="${cnnW}" height="${cnnH}" rx="5" fill="rgba(13,115,119,0.2)" stroke="#14A8AD" stroke-width="1.2"/>`;
  svg+=`<text x="${cnnCX}" y="${cnnY+16}" text-anchor="middle" font-family="Inter,sans-serif" font-size="11.5" font-weight="700" fill="#F0F0F0">CNN speaker ID</text>`;
  svg+=`<text x="${cnnCX}" y="${cnnY+30}" text-anchor="middle" font-family="Inter,sans-serif" font-size="9.5" fill="#909090">embedding match gate</text>`;

  // -- decision badges below each strip --
  const badgeY=stripY+stripH+14, badgeH=26;
  // ACCEPT (left, teal, check)
  const accW=132, accX=leftX+(stripW-accW)/2;
  svg+=`<g class="${NS}-acc"><rect x="${accX}" y="${badgeY}" width="${accW}" height="${badgeH}" rx="13" fill="rgba(13,115,119,0.35)" stroke="#14A8AD" stroke-width="1.4"/>`;
  svg+=`<path d="M${accX+22},${badgeY+13} l4,5 l8,-10" fill="none" stroke="#14A8AD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  svg+=`<text x="${accX+44}" y="${badgeY+17}" font-family="Inter,sans-serif" font-size="12" font-weight="700" fill="#F0F0F0">ACCEPT</text></g>`;
  // REJECT (right, red, x)
  const rejW=132, rejX=rightX+(stripW-rejW)/2;
  svg+=`<rect x="${rejX}" y="${badgeY}" width="${rejW}" height="${badgeH}" rx="13" fill="#1A1A1A" stroke="#C75450" stroke-width="1.4"/>`;
  svg+=`<path d="M${rejX+22},${badgeY+9} l10,8 M${rejX+32},${badgeY+9} l-10,8" fill="none" stroke="#C75450" stroke-width="2" stroke-linecap="round"/>`;
  svg+=`<text x="${rejX+46}" y="${badgeY+17}" font-family="Inter,sans-serif" font-size="12" font-weight="700" fill="#C75450">REJECT</text>`;

  // ========================================================================
  // PANEL B — self-learned daily schedule
  // ========================================================================
  const bY=228, bH=185;
  svg+=`<rect x="16" y="${bY}" width="${W-32}" height="${bH}" rx="6" fill="#141414" stroke="#262626" stroke-width="1"/>`;
  svg+=`<text x="32" y="${bY+20}" font-family="Inter,sans-serif" font-size="11" font-weight="600" fill="#909090">B &#183; Self-learned daily schedule</text>`;

  // sensor-context chips (top-right of panel B), right-aligned
  let chx=W-32;
  const chipY=bY+9, chipH=18;
  const chipDefs=[['light',58],['motion',64],['temp',52]];
  for(let i=0;i<chipDefs.length;i++){
    const cw=chipDefs[i][1];
    chx-=cw;
    svg+=`<rect x="${chx}" y="${chipY}" width="${cw}" height="${chipH}" rx="9" fill="#101010" stroke="#0D7377" stroke-width="1"/>`;
    svg+=`<circle cx="${chx+11}" cy="${chipY+chipH/2}" r="2.6" fill="#14A8AD"/>`;
    svg+=`<text x="${chx+19}" y="${chipY+13}" font-family="Inter,sans-serif" font-size="10" fill="#909090">${chipDefs[i][0]}</text>`;
    chx-=8;
  }

  // timeline geometry
  const tlX=140, tlRight=W-40, tlW=tlRight-tlX;
  const rowsTop=bY+40, rowH=22, rowGap=6;
  const hourToX=(h)=>tlX+(h/24)*tlW;

  // appliance rows with learned ON windows (24h)
  const rows=[
    {name:'Lights',      win:[[18,23]]},
    {name:'Thermostat',  win:[[18,22]]},
    {name:'Water heater',win:[[6,7],[19,21]]},
    {name:'Coffee maker',win:[[6,8]]}
  ];

  // vertical gridlines + axis ticks at 0,6,12,18,24
  const ticks=[0,6,12,18,24];
  const gridBottom=rowsTop+rows.length*(rowH+rowGap)-rowGap;
  for(let i=0;i<ticks.length;i++){
    const gx=hourToX(ticks[i]);
    svg+=`<line x1="${gx.toFixed(1)}" y1="${rowsTop-6}" x2="${gx.toFixed(1)}" y2="${gridBottom+4}" stroke="#262626" stroke-width="1"/>`;
    svg+=`<text x="${gx.toFixed(1)}" y="${gridBottom+16}" text-anchor="middle" font-family="Inter,sans-serif" font-size="10" fill="#707070">${ticks[i]}h</text>`;
  }

  // muted "now" indicator at 6.4h (time cursor; amber reserved for the headline + key learned rule)
  const nowH=6.4, nowX=hourToX(nowH);

  // rows: label + track + learned bars
  for(let r=0;r<rows.length;r++){
    const ry=rowsTop+r*(rowH+rowGap);
    const cy=ry+rowH/2;
    // label
    svg+=`<text x="${tlX-12}" y="${cy+4}" text-anchor="end" font-family="Inter,sans-serif" font-size="11" fill="#F0F0F0">${rows[r].name}</text>`;
    // track baseline
    svg+=`<rect x="${tlX}" y="${ry}" width="${tlW}" height="${rowH}" rx="4" fill="#101010" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>`;
    // learned ON windows
    const isCoffee=rows[r].name==='Coffee maker';
    for(let w=0;w<rows[r].win.length;w++){
      const a=rows[r].win[w][0], b=rows[r].win[w][1];
      const bx=hourToX(a), bw=hourToX(b)-hourToX(a);
      const hilite=isCoffee; // single amber highlight: the self-learned 6-8am coffee rule
      if(hilite){
        svg+=`<rect class="${NS}-now" x="${bx.toFixed(1)}" y="${ry+4}" width="${bw.toFixed(1)}" height="${rowH-8}" rx="3" fill="rgba(232,168,56,0.35)" stroke="#E8A838" stroke-width="1.4"><title>${rows[r].name}: learned ON ${a}:00&#8211;${b}:00 &#183; headline self-learned rule</title></rect>`;
      } else {
        svg+=`<rect x="${bx.toFixed(1)}" y="${ry+4}" width="${bw.toFixed(1)}" height="${rowH-8}" rx="3" fill="rgba(13,115,119,0.35)" stroke="#14A8AD" stroke-width="1.2"><title>${rows[r].name}: learned ON ${a}:00&#8211;${b}:00</title></rect>`;
      }
    }
  }

  // muted "now" vertical line drawn last so it sits above tracks
  svg+=`<line x1="${nowX.toFixed(1)}" y1="${rowsTop-6}" x2="${nowX.toFixed(1)}" y2="${gridBottom+4}" stroke="#909090" stroke-width="1.2" stroke-dasharray="3 2"/>`;
  svg+=`<text x="${nowX.toFixed(1)}" y="${rowsTop-10}" text-anchor="middle" font-family="Inter,sans-serif" font-size="9.5" fill="#909090">now</text>`;

  // legend for ON window
  const lgY=gridBottom+30;
  svg+=`<rect x="140" y="${lgY-9}" width="14" height="10" rx="2" fill="rgba(13,115,119,0.35)" stroke="#14A8AD" stroke-width="1.1"/>`;
  svg+=`<text x="160" y="${lgY}" font-family="Inter,sans-serif" font-size="10" fill="#707070">learned ON window</text>`;
  svg+=`<rect x="296" y="${lgY-9}" width="14" height="10" rx="2" fill="rgba(232,168,56,0.35)" stroke="#E8A838" stroke-width="1.1"/>`;
  svg+=`<text x="316" y="${lgY}" font-family="Inter,sans-serif" font-size="10" fill="#707070">key morning rule</text>`;

  // ---------- footnote ----------
  svg+=`<text x="24" y="${H-12}" font-family="Inter,sans-serif" font-size="10.5" fill="#909090">Schedule rules learned automatically from routine &#8212; no manual programming &#183; Raspberry Pi</text>`;

  svg+=`</svg>`;
  return svg;
}

/* ==== libraryRec ==== */
function viz_libraryRec(){
  const W=760, H=496;
  const COL={bg:"#141414",panel:"#1A1A1A",panel2:"#101010",teal:"#14A8AD",tealDim:"#0D7377",
    f12:"rgba(13,115,119,0.12)",f20:"rgba(13,115,119,0.2)",f35:"rgba(13,115,119,0.35)",
    amber:"#E8A838",text:"#F0F0F0",muted:"#909090",tick:"#707070",grid:"#262626",faint:"rgba(255,255,255,0.06)"};
  const NS="viz_libraryRec";

  // (1) LDA topic mixture — sums to 100
  const topics=[
    {name:"Mystery",pct:38},
    {name:"Historical",pct:27},
    {name:"Sci-Fi",pct:21},
    {name:"Biography",pct:14}
  ];
  // (4) Ranked recommendations — genre labels + relevance scores
  const recs=[
    {label:"Historical fiction",score:0.94,top:true},
    {label:"Mystery / thriller",score:0.89},
    {label:"Literary fiction",score:0.83},
    {label:"Sci-fi",score:0.77},
    {label:"Biography",score:0.71}
  ];

  let svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+W+' '+H+'" style="width:100%;max-width:760px;height:auto;display:block" role="img" aria-label="Library book recommender pipeline: user-intent LDA topic mixture (Mystery 38 percent, Historical 27 percent, Sci-Fi 21 percent, Biography 14 percent) plus a reading-history vector feed a CatBoost plus AdaBoost ensemble, producing a ranked recommendation list led by Historical fiction at 0.94, then Mystery thriller 0.89, Literary fiction 0.83, Sci-fi 0.77, Biography 0.71. Deployed live on the library site.">';

  // prefixed styles: resting-safe animation + hover
  svg+='<style>'
    +'@keyframes '+NS+'-flow{0%,100%{opacity:.4}50%{opacity:1}}'
    +'.'+NS+'-flow{animation:'+NS+'-flow 3.4s ease-in-out infinite}'
    +'@keyframes '+NS+'-grow{from{transform:scaleX(.001)}to{transform:scaleX(1)}}'
    +'.'+NS+'-bar{transform-origin:left center;animation:'+NS+'-grow .9s cubic-bezier(.4,0,.2,1) both}'
    +'.'+NS+'-row:hover .'+NS+'-rowbg{stroke:#14A8AD;stroke-width:1.4}'
    +'.'+NS+'-tbar:hover{opacity:.85}'
    +'</style>';

  svg+='<rect x="0" y="0" width="'+W+'" height="'+H+'" fill="'+COL.bg+'"/>';

  // ---- title block ----
  svg+='<text x="22" y="30" font-family="Inter,sans-serif" font-size="13.5" font-weight="600" fill="'+COL.text+'">Intent + history &#8594; ranked recommendations</text>';
  svg+='<text x="22" y="48" font-family="Inter,sans-serif" font-size="11" fill="'+COL.muted+'">LDA intent mixture + reading-history vector &#8594; gradient-boosting ensemble</text>';

  // headline tag (amber, reserved) — deployed live
  const tagText="Deployed live on the library site", tagW=224, tagX=W-22-tagW, tagY=20, tagH=24;
  svg+='<rect x="'+tagX+'" y="'+tagY+'" width="'+tagW+'" height="'+tagH+'" rx="12" fill="rgba(232,168,56,0.12)" stroke="'+COL.amber+'" stroke-width="1.2"/>';
  svg+='<circle cx="'+(tagX+16)+'" cy="'+(tagY+tagH/2)+'" r="3.4" fill="'+COL.amber+'"/>';
  svg+='<text x="'+(tagX+28)+'" y="'+(tagY+tagH/2+4)+'" font-family="Inter,sans-serif" font-size="11" font-weight="600" fill="'+COL.amber+'">'+tagText+'</text>';

  // ================= INPUTS COLUMN (left) =================
  const inX=22, inW=300;

  // (1) LDA topic mixture panel
  const lpY=74, lpH=132;
  svg+='<rect x="'+inX+'" y="'+lpY+'" width="'+inW+'" height="'+lpH+'" rx="6" fill="'+COL.panel+'" stroke="'+COL.grid+'" stroke-width="1"/>';
  svg+='<text x="'+(inX+14)+'" y="'+(lpY+20)+'" font-family="Inter,sans-serif" font-size="11.5" font-weight="600" fill="'+COL.text+'">User-intent topic mixture</text>';
  svg+='<text x="'+(inX+14)+'" y="'+(lpY+35)+'" font-family="Inter,sans-serif" font-size="10" fill="'+COL.tick+'">LDA &#183; 4 topics &#183; sums to 100%</text>';

  const barX=inX+96, barTrack=(inX+inW-14)-barX, tBarH=12, tGap=20, tStartY=lpY+52;
  for(let i=0;i<topics.length;i++){
    const t=topics[i], by=tStartY+i*tGap, bw=barTrack*(t.pct/100);
    svg+='<text x="'+(barX-8)+'" y="'+(by+tBarH-2.5)+'" text-anchor="end" font-family="Inter,sans-serif" font-size="10.5" fill="'+COL.muted+'">'+t.name+'</text>';
    svg+='<rect x="'+barX+'" y="'+by+'" width="'+barTrack+'" height="'+tBarH+'" rx="3" fill="'+COL.faint+'"/>';
    svg+='<g class="'+NS+'-tbar"><title>'+t.name+' &#183; '+t.pct+'% of intent</title>';
    svg+='<rect class="'+NS+'-bar" style="animation-delay:'+(0.05*i).toFixed(2)+'s" x="'+barX+'" y="'+by+'" width="'+bw.toFixed(1)+'" height="'+tBarH+'" rx="3" fill="'+COL.f35+'" stroke="'+COL.teal+'" stroke-width="1"/>';
    svg+='</g>';
    svg+='<text x="'+(barX+bw+8)+'" y="'+(by+tBarH-2.5)+'" font-family="Inter,sans-serif" font-size="10.5" font-weight="600" fill="'+COL.teal+'">'+t.pct+'%</text>';
  }

  // (2) reading-history vector chip
  const cY=lpY+lpH+14, cH=44;
  svg+='<rect x="'+inX+'" y="'+cY+'" width="'+inW+'" height="'+cH+'" rx="6" fill="'+COL.panel2+'" stroke="'+COL.grid+'" stroke-width="1"/>';
  svg+='<text x="'+(inX+14)+'" y="'+(cY+18)+'" font-family="Inter,sans-serif" font-size="11" font-weight="600" fill="'+COL.text+'">Reading-history vector</text>';
  // small token cells
  const tokVals=[0.8,0.3,0.95,0.55,0.2,0.7,0.4,0.85];
  const tokX=inX+150, tokW=15, tokG=3, tokTop=cY+12, tokH=20;
  svg+='<text x="'+(inX+14)+'" y="'+(cY+34)+'" font-family="Inter,sans-serif" font-size="10" fill="'+COL.tick+'">embedded token</text>';
  for(let i=0;i<tokVals.length;i++){
    const tx=tokX+i*(tokW+tokG), op=(0.12+0.23*tokVals[i]).toFixed(3);
    svg+='<rect x="'+tx+'" y="'+tokTop+'" width="'+tokW+'" height="'+tokH+'" rx="2" fill="rgba(13,115,119,'+op+')" stroke="'+COL.tealDim+'" stroke-width="1"/>';
  }

  // ================= ENSEMBLE NODE (center-right of inputs) =================
  const nodeX=inX+inW+62, nodeW=298, nodeY=120, nodeH=70;
  // (3) arrows from inputs into node
  const aFromX=inX+inW, aMidX=nodeX-10;
  const lda_cy=lpY+lpH/2, hist_cy=cY+cH/2, node_cy=nodeY+nodeH/2;
  svg+='<path class="'+NS+'-flow" d="M'+aFromX+','+lda_cy.toFixed(1)+' C'+(aFromX+30)+','+lda_cy.toFixed(1)+' '+(aMidX-30)+','+node_cy+' '+aMidX+','+node_cy+'" fill="none" stroke="'+COL.tealDim+'" stroke-width="1.4"/>';
  svg+='<path class="'+NS+'-flow" d="M'+aFromX+','+hist_cy.toFixed(1)+' C'+(aFromX+30)+','+hist_cy.toFixed(1)+' '+(aMidX-30)+','+node_cy+' '+aMidX+','+node_cy+'" fill="none" stroke="'+COL.tealDim+'" stroke-width="1.4"/>';
  svg+='<path d="M'+(aMidX-7)+','+(node_cy-5)+' L'+aMidX+','+node_cy+' L'+(aMidX-7)+','+(node_cy+5)+'" fill="none" stroke="'+COL.teal+'" stroke-width="1.4"/>';

  // node box
  svg+='<rect x="'+nodeX+'" y="'+nodeY+'" width="'+nodeW+'" height="'+nodeH+'" rx="8" fill="'+COL.f12+'" stroke="'+COL.teal+'" stroke-width="1.4"/>';
  svg+='<text x="'+(nodeX+nodeW/2)+'" y="'+(nodeY+30)+'" text-anchor="middle" font-family="Inter,sans-serif" font-size="13" font-weight="700" fill="'+COL.text+'">CatBoost + AdaBoost ensemble</text>';
  svg+='<text x="'+(nodeX+nodeW/2)+'" y="'+(nodeY+50)+'" text-anchor="middle" font-family="Inter,sans-serif" font-size="10.5" fill="'+COL.muted+'">combines topic vector + history vector</text>';

  // arrow from node DOWN into ranked list
  const listY=286;
  const nodeBotX=nodeX+nodeW/2;
  svg+='<line class="'+NS+'-flow" x1="'+nodeBotX+'" y1="'+(nodeY+nodeH)+'" x2="'+nodeBotX+'" y2="'+(listY-22)+'" stroke="'+COL.tealDim+'" stroke-width="1.4"/>';
  svg+='<path class="'+NS+'-flow" d="M'+(nodeBotX-5)+','+(listY-28)+' L'+nodeBotX+','+(listY-20)+' L'+(nodeBotX+5)+','+(listY-28)+'" fill="none" stroke="'+COL.teal+'" stroke-width="1.4"/>';
  // caption placed BESIDE the arrow (left-aligned) so it never overlaps the connector/arrowhead
  svg+='<text x="'+(nodeBotX+12)+'" y="'+(nodeY+nodeH+15)+'" font-family="Inter,sans-serif" font-size="10" fill="'+COL.tick+'">rank by relevance score</text>';

  // ================= CENTERPIECE: RANKED RECOMMENDATION LIST =================
  const listX=22, listW=W-44;
  svg+='<text x="'+listX+'" y="'+(listY-6)+'" font-family="Inter,sans-serif" font-size="11.5" font-weight="600" fill="'+COL.text+'">Ranked recommendations</text>';
  svg+='<text x="'+(listX+listW)+'" y="'+(listY-6)+'" text-anchor="end" font-family="Inter,sans-serif" font-size="10" fill="'+COL.tick+'">relevance score &#8226; top match highlighted</text>';

  const rowH=32, rowG=6, rankW=30, labelX=listX+rankW+14, scoreBarX=listX+300;
  const scoreTrack=(listX+listW-58)-scoreBarX, maxScore=1.0;
  for(let i=0;i<recs.length;i++){
    const r=recs[i], ry=listY+8+i*(rowH+rowG);
    const isTop=r.top;
    const rowStroke=isTop?COL.amber:COL.grid;
    const rowFill=isTop?"rgba(232,168,56,0.10)":COL.panel;
    const barFill=isTop?COL.amber:COL.f35;
    const barStroke=isTop?COL.amber:COL.teal;
    const scoreColor=isTop?COL.amber:COL.teal;
    const labelColor=COL.text;
    const bw=scoreTrack*(r.score/maxScore);

    svg+='<g class="'+NS+'-row"><title>#'+(i+1)+' '+r.label+' &#183; relevance '+r.score.toFixed(2)+(isTop?' &#183; top match':'')+'</title>';
    svg+='<rect class="'+NS+'-rowbg" x="'+listX+'" y="'+ry+'" width="'+listW+'" height="'+rowH+'" rx="5" fill="'+rowFill+'" stroke="'+rowStroke+'" stroke-width="'+(isTop?'1.4':'1')+'"/>';
    // rank number
    svg+='<text x="'+(listX+16)+'" y="'+(ry+rowH/2+4.5)+'" text-anchor="middle" font-family="Inter,sans-serif" font-size="12" font-weight="700" fill="'+(isTop?COL.amber:COL.tick)+'">'+(i+1)+'</text>';
    // label
    svg+='<text x="'+labelX+'" y="'+(ry+rowH/2+4.5)+'" font-family="Inter,sans-serif" font-size="'+(isTop?'12.5':'12')+'" font-weight="'+(isTop?'600':'500')+'" fill="'+labelColor+'">'+r.label+(isTop?'  &#9733;':'')+'</text>';
    // score bar track
    svg+='<rect x="'+scoreBarX+'" y="'+(ry+rowH/2-5)+'" width="'+scoreTrack+'" height="10" rx="3" fill="'+COL.faint+'"/>';
    svg+='<rect class="'+NS+'-bar" style="animation-delay:'+(0.08*i).toFixed(2)+'s" x="'+scoreBarX+'" y="'+(ry+rowH/2-5)+'" width="'+bw.toFixed(1)+'" height="10" rx="3" fill="'+barFill+'" stroke="'+barStroke+'" stroke-width="1"/>';
    // score value
    svg+='<text x="'+(listX+listW-8)+'" y="'+(ry+rowH/2+4)+'" text-anchor="end" font-family="Inter,sans-serif" font-size="11.5" font-weight="'+(isTop?'700':'600')+'" fill="'+scoreColor+'">'+r.score.toFixed(2)+'</text>';
    svg+='</g>';
  }

  svg+='</svg>';
  return svg;
}

/* ==== itemPlan ==== */
function viz_itemPlan(){
  const W = 760;
  const C = {
    bg:'#141414', panel:'#1A1A1A', deep:'#101010', grid:'#262626',
    teal:'#0D7377', tealBright:'#14A8AD',
    f12:'rgba(13,115,119,0.12)', f20:'rgba(13,115,119,0.2)', f35:'rgba(13,115,119,0.35)',
    amber:'#E8A838', text:'#F0F0F0', muted:'#909090', tick:'#707070',
    faint:'rgba(255,255,255,0.06)'
  };
  const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const r1 = n => Math.round(n*10)/10;

  // ---- data ----
  const cols = ['Flagship','Urban','Suburban','Rural'];
  const rows = ['Seasonal','Core','Premium','Value','Local'];
  // relative store count per cluster (sums ~1.0); Suburban largest, Flagship smallest
  const share = { Flagship:0.10, Urban:0.24, Suburban:0.42, Rural:0.24 };
  const storeN = { Flagship:248, Urban:596, Suburban:1042, Rural:596 };
  // assortment depth 1..4 per [row][col]; depth 5 marks the amber priority cells
  // priority cells: Premium x Flagship, Local x Rural, Seasonal x Urban
  const depth = [
    // Flagship, Urban, Suburban, Rural
    [3, 5, 4, 2],  // Seasonal  -> Urban priority
    [4, 4, 4, 3],  // Core
    [5, 3, 3, 1],  // Premium   -> Flagship priority
    [2, 3, 4, 4],  // Value
    [2, 2, 3, 5]   // Local     -> Rural priority
  ];
  const tealFill = v => v<=1 ? C.f12 : v===2 ? C.f20 : v===3 ? C.f35 : C.teal;
  const tealStroke = v => v>=4 ? C.tealBright : C.grid;
  const depthWord = v => v>=4 ? 'deep' : v===3 ? 'broad' : v===2 ? 'curated' : 'edited';

  // ---- layout ----
  const padL = 16, padT = 16;
  const labelW = 86;
  const gridX = padL + labelW + 8;
  const gridRight = W - padL - 18;
  const gridW = gridRight - gridX;
  const nCols = cols.length, nRows = rows.length;
  const gap = 6;
  const cellW = (gridW - gap*(nCols-1)) / nCols;
  const colCx = i => gridX + i*(cellW+gap) + cellW/2;

  // cluster band (part a)
  const bubY = 118;          // bubble centre row
  const matTop = 200;        // matrix cells start
  const cellH = 30;
  const gridH = cellH*nRows + gap*(nRows-1);
  const matBottom = matTop + gridH;
  const colLabY = matBottom + 15;   // column labels under matrix
  const legY = matBottom + 42;      // legend + sparkline band (extra gap below col labels)
  const noteY = legY + 24;
  const H = noteY + 14;

  let s = '';
  s += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:760px;height:auto;display:block" role="img" aria-label="Two-part retail item plan. Part a: four store clusters from K-means, Flagship Urban Suburban and Rural, shown as bubbles sized by relative store count with Suburban the largest. Part b centerpiece: a five-by-four assortment-depth matrix, rows Seasonal Core Premium Value Local against the four clusters, cells shaded teal by planned assortment depth with three amber priority cells, Seasonal in Urban, Premium in Flagship and Local in Rural. Headline: forecasting at store-item granularity across about 2,482 stores.">`;

  // ---- styles (prefixed, resting state complete) ----
  s += `<style>`
    + `.viz_itemPlan_cell{opacity:1;animation:viz_itemPlan_fade .5s ease both}`
    + `@keyframes viz_itemPlan_fade{from{opacity:0}to{opacity:1}}`
    + `.viz_itemPlan_cell:hover{stroke:${C.tealBright};stroke-width:1.6}`
    + `.viz_itemPlan_pri{animation:viz_itemPlan_pulse 3.2s ease-in-out infinite}`
    + `@keyframes viz_itemPlan_pulse{0%,100%{opacity:1}50%{opacity:.82}}`
    + `.viz_itemPlan_bub{transition:opacity .15s ease}`
    + `.viz_itemPlan_bub:hover{opacity:.8}`
    + `.viz_itemPlan_spark{stroke-dasharray:240;stroke-dashoffset:0;animation:viz_itemPlan_draw 1.6s ease-out both}`
    + `@keyframes viz_itemPlan_draw{from{stroke-dashoffset:240}to{stroke-dashoffset:0}}`
    + `</style>`;

  // ---- background ----
  s += `<rect x="0" y="0" width="${W}" height="${H}" fill="${C.bg}"/>`;
  s += `<rect x="${padL-6}" y="${padT-6}" width="${W-2*padL+12}" height="${H-2*padT+12}" rx="8" fill="${C.panel}" stroke="${C.grid}"/>`;

  // ---- title block ----
  s += `<text x="${padL+2}" y="${padT+14}" font-family="Inter,sans-serif" font-size="13.5" font-weight="600" fill="${C.text}">Cluster stores &#8594; plan assortment per cluster</text>`;
  s += `<text x="${padL+2}" y="${padT+31}" font-family="Inter,sans-serif" font-size="11" fill="${C.muted}">K-means store clusters &#183; assortment depth planned for each cluster</text>`;

  // ---- headline metric (amber, top-right) ----
  const hx = W - padL - 2;
  s += `<text x="${hx}" y="${padT+15}" text-anchor="end" font-family="Inter,sans-serif" font-size="20" font-weight="700" fill="${C.amber}">~2,482 stores</text>`;
  s += `<text x="${hx}" y="${padT+31}" text-anchor="end" font-family="Inter,sans-serif" font-size="11" fill="${C.muted}">forecast at store-item granularity</text>`;

  // ---- section (a) label ----
  s += `<text x="${padL+2}" y="68" font-family="Inter,sans-serif" font-size="10" fill="${C.tick}">(a) STORE CLUSTERS &#183; sized by relative store count</text>`;
  s += `<text x="${hx}" y="68" text-anchor="end" font-family="Inter,sans-serif" font-size="10" fill="${C.tick}">sales velocity &#183; format &#183; regional demand &#183; item perf.</text>`;

  // ---- cluster bubbles (part a) ----
  for(let i=0;i<nCols;i++){
    const name = cols[i];
    const cx = colCx(i);
    const rr = 11 + Math.sqrt(share[name]) * 32;   // area ~ store count
    const isLargest = name==='Suburban';
    const fill = isLargest ? C.f35 : C.f20;
    const stroke = isLargest ? C.tealBright : C.teal;
    s += `<g class="viz_itemPlan_bub">`
      + `<title>${esc(name)} cluster &#183; ${storeN[name]} stores (${Math.round(share[name]*100)}% of fleet)</title>`
      + `<circle cx="${r1(cx)}" cy="${bubY}" r="${r1(rr)}" fill="${fill}" stroke="${stroke}" stroke-width="1.2"/>`
      + `<text x="${r1(cx)}" y="${bubY+4}" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" font-weight="600" fill="${C.text}">${Math.round(share[name]*100)}%</text>`
      + `</g>`;
    // cluster name + count under bubble
    s += `<text x="${r1(cx)}" y="${bubY+rr+16}" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" font-weight="600" fill="${C.text}">${name}</text>`;
    s += `<text x="${r1(cx)}" y="${bubY+rr+29}" text-anchor="middle" font-family="Inter,sans-serif" font-size="10" fill="${C.muted}">${storeN[name]} stores</text>`;
  }

  // ---- divider between (a) and (b) ----
  s += `<line x1="${padL+2}" y1="180" x2="${W-padL-2}" y2="180" stroke="${C.grid}"/>`;
  s += `<text x="${padL+2}" y="${matTop-8}" font-family="Inter,sans-serif" font-size="10" fill="${C.tick}">(b) ASSORTMENT PLAN &#183; category depth per cluster</text>`;

  // ---- column header connectors (link bubbles to matrix columns) ----
  for(let i=0;i<nCols;i++){
    const cx = colCx(i);
    s += `<line x1="${r1(cx)}" y1="184" x2="${r1(cx)}" y2="${matTop-4}" stroke="${C.faint}" stroke-width="1"/>`;
  }

  // ---- matrix cells (part b, centerpiece) ----
  let delay = 0;
  for(let r=0;r<nRows;r++){
    const ry = matTop + r*(cellH+gap);
    // row label (right-aligned, fully legible)
    s += `<text x="${gridX-12}" y="${r1(ry+cellH/2+3.5)}" text-anchor="end" font-family="Inter,sans-serif" font-size="11" fill="${C.text}">${rows[r]}</text>`;
    for(let c=0;c<nCols;c++){
      const cx = gridX + c*(cellW+gap);
      const v = depth[r][c];
      const pri = v===5;
      const fill = pri ? C.amber : tealFill(v);
      const stroke = pri ? C.amber : tealStroke(v);
      const cls = pri ? 'viz_itemPlan_cell viz_itemPlan_pri' : 'viz_itemPlan_cell';
      const word = pri ? 'priority &#183; expanded assortment' : depthWord(v)+' assortment';
      delay += 0.018;
      s += `<rect class="${cls}" x="${r1(cx)}" y="${r1(ry)}" width="${r1(cellW)}" height="${cellH}" rx="3" fill="${fill}" stroke="${stroke}" stroke-width="${pri?1.3:0.75}" style="animation-delay:${delay.toFixed(2)}s">`
        + `<title>${rows[r]} &#215; ${cols[c]} &#8212; ${word}</title></rect>`;
      // depth label inside cell + priority glyph (always light-on-fill, never dark-on-dark)
      if(pri){
        s += `<text x="${r1(cx+cellW/2)}" y="${r1(ry+cellH/2+4)}" text-anchor="middle" font-family="Inter,sans-serif" font-size="10.5" font-weight="700" fill="${C.deep}">PRIORITY</text>`;
      } else {
        const col = v>=4 ? C.text : C.muted;
        s += `<text x="${r1(cx+cellW/2)}" y="${r1(ry+cellH/2+4)}" text-anchor="middle" font-family="Inter,sans-serif" font-size="10" fill="${col}">${depthWord(v)}</text>`;
      }
    }
  }

  // ---- compact column labels under the matrix ----
  for(let i=0;i<nCols;i++){
    const cx = colCx(i);
    s += `<text x="${r1(cx)}" y="${colLabY}" text-anchor="middle" font-family="Inter,sans-serif" font-size="10" font-weight="600" fill="${C.muted}">${cols[i]}</text>`;
  }

  // ---- legend: depth ramp (bottom-left) ----
  const legItems = [
    {f:C.f12, t:'edited'},
    {f:C.f20, t:'curated'},
    {f:C.f35, t:'broad'},
    {f:C.teal, t:'deep'},
    {f:C.amber, t:'priority'}
  ];
  let lx = gridX - 12;
  s += `<text x="${lx}" y="${legY+1}" font-family="Inter,sans-serif" font-size="10" fill="${C.tick}">depth</text>`;
  lx += 36;
  for(let i=0;i<legItems.length;i++){
    s += `<rect x="${lx}" y="${legY-9}" width="12" height="12" rx="2" fill="${legItems[i].f}" stroke="${C.grid}" stroke-width="0.75"/>`;
    s += `<text x="${lx+17}" y="${legY+1}" font-family="Inter,sans-serif" font-size="10" fill="${C.muted}">${legItems[i].t}</text>`;
    lx += 17 + legItems[i].t.length*5.8 + 16;
  }

  // ---- tiny item-level forecast sparkline (corner: legend row, right side) ----
  const pts = [0.30,0.42,0.36,0.55,0.48,0.66,0.60,0.78,0.86];
  const spkW = 70, spkH = 18;
  const spkX = W - padL - 18 - spkW;
  const spkY = legY - 12;          // top of spark band
  const baseY = spkY + spkH;
  const stepx = spkW/(pts.length-1);
  let d = '';
  for(let p=0;p<pts.length;p++){
    const px = spkX + p*stepx;
    const py = baseY - pts[p]*spkH;
    d += (p===0?'M':'L') + r1(px) + ' ' + r1(py) + ' ';
  }
  const area = d + `L${r1(spkX+spkW)} ${r1(baseY)} L${r1(spkX)} ${r1(baseY)} Z`;
  s += `<text x="${spkX-8}" y="${legY+1}" text-anchor="end" font-family="Inter,sans-serif" font-size="10" fill="${C.tick}">item forecast</text>`;
  s += `<path d="${area}" fill="${C.f12}" stroke="none"/>`;
  s += `<path class="viz_itemPlan_spark" d="${d.trim()}" fill="none" stroke="${C.tealBright}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`;
  const lastX = spkX+(pts.length-1)*stepx, lastY = baseY-pts[pts.length-1]*spkH;
  s += `<circle cx="${r1(lastX)}" cy="${r1(lastY)}" r="2.4" fill="${C.tealBright}"/>`;

  // ---- footer note ----
  s += `<text x="${padL+2}" y="${noteY}" font-family="Inter,sans-serif" font-size="10" fill="${C.tick}">forecast at store-item granularity &#183; assortment aligned to local demand</text>`;

  s += `</svg>`;
  return s;
}

/* ==== skillsMap ==== */
function viz_skillsMap(){
  const NS='viz_skillsMap';
  const W=760, H=620;

  // ---- helpers (self-contained) ----
  const PX=v=>Math.round(v*100)/100;
  const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const charW=6.18, padX=11, pillH=23;
  const pillW=t=>Math.round(t.length*charW+padX*2);

  // ---- category clusters (NON-quantified: no scores / numbers) ----
  const cats=[
    {name:'MODELING & ML', skills:['Causal Inference','Time Series Forecasting','Deep Learning','Reinforcement Learning','Unsupervised (t-SNE, LDA, K-means)','Ensemble Methods','Explainability','Predictive Maintenance']},
    {name:'NLP & SIGNAL', skills:['Topic Modeling','Intent Matching','Transliteration','FFT / Spectrograms','NLP Pipelines']},
    {name:'ENGINEERING & PLATFORMS', skills:['Python','R','SQL','Spark','GCP','AWS','Azure','Snowflake','MLFlow','Docker','Anaplan']},
    {name:'DOMAINS', skills:['Healthcare & Life Sciences','CPG & Retail','Energy & Utilities','Manufacturing','Financial Planning']}
  ];

  // ---- layout anchors: two balanced columns, hub centered above each pillset ----
  const LX=200, RX=560;          // hub centre x: left column / right column
  const HUB_TOP=96;              // top-row hub y
  const rowgap=31, pillStart=38; // vertical rhythm

  // vertical stack of centred pills below a hub
  const colCluster=(cx,hy,skills)=>{
    const out=[]; let y=hy+pillStart;
    for(const s of skills){ const w=pillW(s); out.push({t:s,x:cx-w/2,y:y,w:w}); y+=rowgap; }
    return {pills:out, bottom:y-rowgap+pillH};
  };
  // wrapped grid of centred rows below a hub (for many short pills)
  const gridCluster=(cx,hy,skills,rows)=>{
    const out=[]; let y=hy+pillStart, i=0; const colgap=10;
    for(const cnt of rows){
      const rs=skills.slice(i,i+cnt); i+=cnt;
      const ws=rs.map(pillW);
      let total=ws.reduce((a,b)=>a+b,0)+colgap*(rs.length-1);
      let x=cx-total/2;
      for(let k=0;k<rs.length;k++){ out.push({t:rs[k],x:x,y:y,w:ws[k]}); x+=ws[k]+colgap; }
      y+=rowgap;
    }
    return {pills:out, bottom:y-rowgap+pillH};
  };

  const mod=colCluster(LX,HUB_TOP,cats[0].skills);
  const nlp=colCluster(RX,HUB_TOP,cats[1].skills);
  const BOTHUB=Math.max(mod.bottom,nlp.bottom)+42;
  const eng=gridCluster(LX,BOTHUB,cats[2].skills,[3,3,3,2]); // 11 short pills, balanced rows
  const dom=colCluster(RX,BOTHUB,cats[3].skills);

  const regions=[
    {name:cats[0].name, hub:[LX,HUB_TOP], pills:mod.pills},
    {name:cats[1].name, hub:[RX,HUB_TOP], pills:nlp.pills},
    {name:cats[2].name, hub:[LX,BOTHUB], pills:eng.pills},
    {name:cats[3].name, hub:[RX,BOTHUB], pills:dom.pills}
  ];

  let svg='';
  svg+=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:${W}px;height:auto;display:block" role="img" aria-label="Skillset map: a clustered network of four skill categories — Modeling and ML, NLP and Signal, Engineering and Platforms, and Domains — each a labelled hub connected to its skills as pill labels.">`;

  // prefixed styles: gentle resting-safe hub pulse + hover highlight on pills
  svg+=`<style>`;
  svg+=`@keyframes ${NS}-pulse{0%,100%{opacity:.55}50%{opacity:1}}`;
  svg+=`@media (prefers-reduced-motion: no-preference){.${NS}-ring{transform-box:fill-box;transform-origin:center;animation:${NS}-pulse 3.6s ease-in-out infinite}}`;
  svg+=`.${NS}-pill:hover .${NS}-pb{stroke:#14A8AD;stroke-width:1.5;fill:rgba(13,115,119,0.2)}`;
  svg+=`.${NS}-pill:hover .${NS}-pt{fill:#F0F0F0}`;
  svg+=`</style>`;

  // background
  svg+=`<rect x="0" y="0" width="${W}" height="${H}" fill="#1A1A1A"/>`;

  // faint vertical gutter divider between the two columns
  svg+=`<line x1="${W/2}" y1="84" x2="${W/2}" y2="${H-22}" stroke="#262626" stroke-width="1"/>`;

  // title block
  svg+=`<text x="24" y="32" font-family="Inter,sans-serif" font-size="13.5" font-weight="600" fill="#F0F0F0">Skillset map</text>`;
  svg+=`<text x="24" y="51" font-family="Inter,sans-serif" font-size="11" fill="#909090">Modeling &#183; Signal &#183; Engineering &#183; Domains</text>`;
  svg+=`<text x="${W-24}" y="44" text-anchor="end" font-family="Inter,sans-serif" font-size="10" fill="#707070">four clusters &#183; hover a skill to highlight</text>`;

  // ---- connectors first (under pills): hub bottom -> each pill top-centre ----
  for(const r of regions){
    const [hx,hy]=r.hub;
    for(const p of r.pills){
      const tx=p.x+p.w/2, ty=p.y;          // pill top-centre
      const my=(hy+ty)/2;                  // control midpoint
      svg+=`<path d="M${PX(hx)},${PX(hy+9)} C${PX(hx)},${PX(my)} ${PX(tx)},${PX(ty-12)} ${PX(tx)},${PX(ty)}" fill="none" stroke="rgba(13,115,119,0.35)" stroke-width="1"/>`;
    }
  }

  // ---- hubs (teal-bright dot + single amber accent ring) + category label ----
  for(const r of regions){
    const [hx,hy]=r.hub;
    svg+=`<g><title>${esc(r.name)} &#8212; ${r.pills.length} skills</title>`;
    svg+=`<circle class="${NS}-ring" cx="${hx}" cy="${hy}" r="9.5" fill="none" stroke="#E8A838" stroke-width="1.4"/>`;
    svg+=`<circle cx="${hx}" cy="${hy}" r="5" fill="#14A8AD"/>`;
    svg+=`<circle cx="${hx}" cy="${hy}" r="2" fill="#101010"/>`;
    svg+=`</g>`;
    // category label centred above the dot
    svg+=`<text x="${hx}" y="${hy-16}" text-anchor="middle" font-family="Inter,sans-serif" font-size="12" font-weight="600" letter-spacing="0.6" fill="#F0F0F0">${esc(r.name)}</text>`;
  }

  // ---- skill pills ----
  for(const r of regions){
    for(const p of r.pills){
      svg+=`<g class="${NS}-pill"><title>${esc(r.name)}: ${esc(p.t)}</title>`;
      svg+=`<rect class="${NS}-pb" x="${PX(p.x)}" y="${PX(p.y)}" width="${p.w}" height="${pillH}" rx="${pillH/2}" fill="#1A1A1A" stroke="#0D7377" stroke-width="1"/>`;
      svg+=`<text class="${NS}-pt" x="${PX(p.x+p.w/2)}" y="${PX(p.y+pillH/2+3.8)}" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" fill="#F0F0F0">${esc(p.t)}</text>`;
      svg+=`</g>`;
    }
  }

  svg+=`</svg>`;
  return svg;
}

/* ==== renderSkills — skills board (HTML) ==== */
function renderSkills(groups){
  var accents = [
    {dot:'#14A8AD', tintBg:'rgba(20,168,173,0.10)', tintBorder:'rgba(20,168,173,0.28)', tintText:'#7fd6da'},
    {dot:'#0D7377', tintBg:'rgba(13,115,119,0.12)', tintBorder:'rgba(13,115,119,0.30)', tintText:'#5db8bb'},
    {dot:'#2BB9A4', tintBg:'rgba(43,185,164,0.10)', tintBorder:'rgba(43,185,164,0.28)', tintText:'#8ad8cc'},
    {dot:'#E8A838', tintBg:'rgba(232,168,56,0.10)', tintBorder:'rgba(232,168,56,0.26)', tintText:'#e8c587'},
    {dot:'#1C8F9E', tintBg:'rgba(28,143,158,0.11)', tintBorder:'rgba(28,143,158,0.29)', tintText:'#74c2cd'},
    {dot:'#3FC9C2', tintBg:'rgba(63,201,194,0.10)', tintBorder:'rgba(63,201,194,0.27)', tintText:'#94ddd9'}
  ];
  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  var css = ''
    + '.sk_board{font-family:inherit;color:#F0F0F0;box-sizing:border-box;}'
    + '.sk_board *{box-sizing:border-box;}'
    + '.sk_grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;width:100%;max-width:852px;margin:0 auto;}'
    + '.sk_card{position:relative;background:#1A1A1A;border:1px solid #262626;border-radius:14px;padding:18px 18px 16px 20px;overflow:hidden;}'
    + '.sk_card::before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--sk_acc);}'
    + '.sk_head{display:flex;align-items:center;gap:9px;margin:0 0 14px;}'
    + '.sk_dot{width:9px;height:9px;border-radius:50%;background:var(--sk_acc);flex:0 0 auto;box-shadow:0 0 0 4px rgba(255,255,255,0.03);}'
    + '.sk_label{font-size:13px;font-weight:600;letter-spacing:.03em;text-transform:uppercase;color:#F0F0F0;line-height:1.3;}'
    + '.sk_chips{display:flex;flex-wrap:wrap;gap:7px;}'
    + '.sk_chip{font-size:12.5px;line-height:1.35;font-weight:500;color:var(--sk_ct);background:var(--sk_cbg);border:1px solid var(--sk_cbd);border-radius:7px;padding:5px 10px;white-space:normal;word-break:break-word;}'
    + '@media (prefers-reduced-motion: no-preference){'
    +   '.sk_card{opacity:0;transform:translateY(8px);animation:sk_rise .5s cubic-bezier(.2,.7,.3,1) forwards;}'
    +   '.sk_chip{transition:transform .18s ease,background .18s ease,border-color .18s ease;}'
    +   '.sk_chip:hover{transform:translateY(-2px);}'
    +   '@keyframes sk_rise{to{opacity:1;transform:translateY(0);}}'
    + '}'
    + '@media (max-width:680px){'
    +   '.sk_grid{grid-template-columns:1fr;gap:12px;}'
    +   '.sk_card{padding:16px 16px 14px 18px;}'
    +   '.sk_label{font-size:12px;}'
    +   '.sk_chip{font-size:12px;}'
    + '}';
  var html = '<div class="sk_board"><style>' + css + '</style><div class="sk_grid">';
  for(var g=0; g<groups.length; g++){
    var grp = groups[g];
    var a = accents[g % accents.length];
    var st = '--sk_acc:'+a.dot+';--sk_cbg:'+a.tintBg+';--sk_cbd:'+a.tintBorder+';--sk_ct:'+a.tintText+';';
    html += '<div class="sk_card" style="'+st+'animation-delay:'+(g*0.07)+'s;">';
    html += '<div class="sk_head"><span class="sk_dot"></span><span class="sk_label">'+esc(grp.label)+'</span></div>';
    html += '<div class="sk_chips">';
    var items = grp.items || [];
    for(var i=0; i<items.length; i++){
      html += '<span class="sk_chip">'+esc(items[i])+'</span>';
    }
    html += '</div></div>';
  }
  html += '</div></div>';
  return html;
}

/* ==== registry + wiring ==== */
var NAME2KEY = {"Voice & Sensor Home Automation":"homeAuto","Library Book Recommendation System":"libraryRec","Major US Retailer | Item Plan & Demand Forecasting":"itemPlan","License Plate Recognition": "licensePlate", "RoboCar": "roboCar", "Music Mood Recommendation System": "musicMood", "Gujarati/Hindi → English Transliteration": "transliteration", "Natural Language → Python Platform": "nlToPython", "Plug & Predict — Treatment Pathway Predictor": "plugPredict", "Depression Detection via Social Media": "depression", "NYC Cab Demand Prediction + Dynamic Routing": "cabDemand", "Crypto Sentiment Analysis — Twitter → Bitcoin Price": "crypto", "PARTH — Predictive Analytics & Real-Time Heuristics": "parth", "Annual Sales Forecasting Revamp": "salesForecast", "Major US Energy Utility | Distribution Fault Prediction & Rerouting": "energyGrid", "Global Battery Manufacturer | Demand Forecasting": "battery", "Global Pharma Client | Patient Care Portfolio": "patientCare", "Global Pharma Client | Vaccine Smart Ordering": "vaccine", "CPG Manufacturer | Forecast Explainability": "forecastExplain"};
var VIZ = {skillsMap:viz_skillsMap,homeAuto:viz_homeAuto,libraryRec:viz_libraryRec,itemPlan:viz_itemPlan,licensePlate:viz_licensePlate, musicMood:viz_musicMood, depression:viz_depression, parth:viz_parth, energyGrid:viz_energyGrid, causalML:viz_causalML, forecastExplain:viz_forecastExplain, salesForecast:viz_salesForecast, roboCar:viz_roboCar, crypto:viz_crypto, nlToPython:viz_nlToPython, transliteration:viz_transliteration, cabDemand:viz_cabDemand, battery:viz_battery, plugPredict:viz_plugPredict, vaccine:viz_vaccine, patientCare:viz_patientCare, impactDashboard:viz_impactDashboard, skillsRadar:viz_skillsRadar, domainDonut:viz_domainDonut};

(function(){
  function put(id, fn){
    var el=document.getElementById(id);
    if(el && typeof fn==='function'){ try{ el.innerHTML=fn(); }catch(e){ console.error('viz '+id+' failed', e); } }
  }
  function init(){
    // skills rendered as an HTML board (renderSkills) from index.html
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
