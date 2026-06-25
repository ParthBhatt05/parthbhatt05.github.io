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
  const N = 16, cell = 21, gx = 296, gy = 80;
  const half = N / 2;
  const right = gx + N * cell;
  const bottom = gy + N * cell;
  // All quadrants use ONLY legal teal RGBs (#0D7377 or #14A8AD). Amber is reserved
  // exclusively for the current-mood cell and the headline metric.
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
  // Differentiate the two teal hues by alpha range so quadrants read distinctly.
  const baseAlpha = { calm: 0.10, energ: 0.08, mela: 0.07, joy: 0.09 };
  const spanAlpha = { calm: 0.50, energ: 0.27, mela: 0.50, joy: 0.26 };
  const cx = c => gx + c * cell + cell / 2;
  const cy = r => gy + r * cell + cell / 2;

  let cells = "";
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const q = quadFor(c, r), Q = quads[q], t = intensity(c, r, q);
      const alpha = (baseAlpha[q] + t * spanAlpha[q]).toFixed(3);
      const x = gx + c * cell, y = gy + r * cell;
      const val = (c / (N - 1)).toFixed(2), en = (1 - r / (N - 1)).toFixed(2);
      cells += `<rect class="vz_cell" x="${x + 1}" y="${y + 1}" width="${cell - 2}" height="${cell - 2}" rx="2" fill="rgba(${Q.r},${Q.g},${Q.b},${alpha})"><title>${Q.name} — valence ${val}, energy ${en}</title></rect>`;
    }
  }

  const songs = [[2,3],[5,1],[3,6],[6,5],[10,2],[13,4],[11,7],[4,12],[2,14],[12,11],[14,13],[8,8]];
  let dots = "";
  songs.forEach(p => {
    dots += `<circle cx="${cx(p[0])}" cy="${cy(p[1])}" r="4.2" fill="#F0F0F0" stroke="#14A8AD" stroke-width="1.6"><title>Mapped song</title></circle>`;
  });

  const cmC = 9, cmR = 10;
  const cmx = gx + cmC * cell, cmy = gy + cmR * cell;
  const current = `<rect x="${cmx + 0.5}" y="${cmy + 0.5}" width="${cell - 1}" height="${cell - 1}" rx="2" fill="rgba(232,168,56,0.20)" stroke="#E8A838" stroke-width="2"><title>Current mood cell</title></rect>`;

  const ring = [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]];
  let recs = "";
  ring.forEach(d => {
    const c = cmC + d[0], r = cmR + d[1];
    if (c < 0 || c >= N || r < 0 || r >= N) return;
    const x = gx + c * cell, y = gy + r * cell;
    recs += `<rect x="${x + 1.5}" y="${y + 1.5}" width="${cell - 3}" height="${cell - 3}" rx="2" fill="none" stroke="#14A8AD" stroke-width="1.4" stroke-dasharray="3 2"><title>Recommended adjacent mood</title></rect>`;
  });

  const labels =
    `<text class="vz_q" x="${gx}" y="${gy - 10}" text-anchor="start">Calm</text>` +
    `<text class="vz_q" x="${right}" y="${gy - 10}" text-anchor="end">Energetic</text>` +
    `<text class="vz_q" x="${gx}" y="${bottom + 17}" text-anchor="start">Melancholy</text>` +
    `<text class="vz_q" x="${right}" y="${bottom + 17}" text-anchor="end">Joyful</text>`;
  const axes =
    `<text class="vz_ax" x="${gx}" y="${bottom + 34}" text-anchor="start">low valence</text>` +
    `<text class="vz_ax" x="${right}" y="${bottom + 34}" text-anchor="end">high valence</text>`;

  const lx = 40, ly = 150;
  const legend =
    `<circle cx="${lx + 6}" cy="${ly}" r="4.2" fill="#F0F0F0" stroke="#14A8AD" stroke-width="1.6"/>` +
    `<text class="vz_lg" x="${lx + 20}" y="${ly + 4}">song (12 mapped)</text>` +
    `<rect x="${lx}" y="${ly + 18}" width="13" height="13" rx="2" fill="rgba(232,168,56,0.20)" stroke="#E8A838" stroke-width="2"/>` +
    `<text class="vz_lg" x="${lx + 22}" y="${ly + 28}">current mood</text>` +
    `<rect x="${lx}" y="${ly + 40}" width="13" height="13" rx="2" fill="none" stroke="#14A8AD" stroke-width="1.4" stroke-dasharray="3 2"/>` +
    `<text class="vz_lg" x="${lx + 22}" y="${ly + 50}">recommended neighbour</text>`;

  const metric =
    `<text class="vz_m" x="40" y="${ly + 110}">8</text>` +
    `<text class="vz_msub" x="40" y="${ly + 130}">adjacent cells recommended</text>` +
    `<text class="vz_msub" x="40" y="${ly + 146}">around your current mood</text>`;

  const W = 760, H = 476;
  const css =
    ".vz_cell{transition:opacity .15s ease;}" +
    ".vz_cell:hover{opacity:1;stroke:#F0F0F0;stroke-width:1;}" +
    "@keyframes vz_musicMood_pulse{0%,100%{opacity:.5}50%{opacity:1}}" +
    ".vz_recs{animation:vz_musicMood_pulse 3.4s ease-in-out infinite;}" +
    ".vz_q{font-size:11px;fill:#909090;font-weight:500;font-family:Inter,sans-serif;}" +
    ".vz_ax{font-size:10px;fill:#707070;font-family:Inter,sans-serif;}" +
    ".vz_lg{font-size:11px;fill:#909090;font-family:Inter,sans-serif;}" +
    ".vz_m{font-size:36px;font-weight:600;fill:#E8A838;font-family:Inter,sans-serif;}" +
    ".vz_msub{font-size:11px;fill:#909090;font-family:Inter,sans-serif;}" +
    ".vz_t{font-size:13.5px;font-weight:600;fill:#F0F0F0;font-family:Inter,sans-serif;}" +
    ".vz_st{font-size:11px;fill:#909090;font-family:Inter,sans-serif;}";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:760px;height:auto;display:block" role="img" aria-label="A 16 by 16 mood matrix of 256 cells split into four emotion quadrants — Calm, Energetic, Melancholy and Joyful — with 12 songs plotted as dots, one current-mood cell highlighted in amber and its eight recommended neighbouring cells outlined in bright teal.">` +
    `<title>Mood matrix: songs mapped, neighbours recommended</title>` +
    `<desc>A 16 by 16 grid coloured by emotional quadrant, with song dots, a current-mood cell and recommended adjacent cells.</desc>` +
    `<style>${css}</style>` +
    `<rect x="0" y="0" width="${W}" height="${H}" fill="#101010"/>` +
    `<text class="vz_t" x="40" y="42">16x16 mood matrix</text>` +
    `<text class="vz_st" x="40" y="60">Mood matrix: songs mapped, neighbours recommended</text>` +
    `<rect x="${gx - 1}" y="${gy - 1}" width="${N * cell + 2}" height="${N * cell + 2}" fill="none" stroke="#262626" stroke-width="1"/>` +
    cells +
    `<line x1="${gx}" y1="${gy + half * cell}" x2="${right}" y2="${gy + half * cell}" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>` +
    `<line x1="${gx + half * cell}" y1="${gy}" x2="${gx + half * cell}" y2="${bottom}" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>` +
    `<g class="vz_recs">${recs}</g>` +
    current +
    dots +
    labels + axes + legend + metric +
    `</svg>`;
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
  const W = 760, H = 432;
  const PAD = 16;
  const NS = "http://www.w3.org/2000/svg";
  // palette (allowed only)
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

  // ---------- helpers ----------
  const esc = (s)=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  const r2 = (n)=>Math.round(n*100)/100;

  let s = '';
  s += '<svg xmlns="'+NS+'" viewBox="0 0 '+W+' '+H+'" style="width:100%;max-width:760px;height:auto;display:block" role="img" aria-label="CNC acoustic spectrogram showing a high-frequency degradation anomaly band, paired with a tool half-life decay curve crossing a failure threshold. Headline result: 25 percent downtime reduction and 1.2 million dollars incremental weekly revenue.">';

  // animation styles (prefixed)
  s += '<style>'
    + '@keyframes viz_parth_pulse{0%,100%{opacity:1}50%{opacity:0.55}}'
    + '@keyframes viz_parth_dash{to{stroke-dashoffset:-24}}'
    + '@keyframes viz_parth_draw{from{stroke-dashoffset:var(--vp-len)}to{stroke-dashoffset:0}}'
    + '@keyframes viz_parth_glow{0%,100%{opacity:0.85}50%{opacity:1}}'
    + '.viz_parth_anom{animation:viz_parth_pulse 3.2s ease-in-out infinite}'
    + '.viz_parth_thr{animation:viz_parth_dash 1.6s linear infinite}'
    + '.viz_parth_marker{animation:viz_parth_glow 2.6s ease-in-out infinite}'
    + '.viz_parth_cell{transition:opacity .15s ease}'
    + '.viz_parth_cell:hover{opacity:0.7}'
    + '</style>';

  // background
  s += '<rect x="0" y="0" width="'+W+'" height="'+H+'" fill="'+C.bg+'"/>';

  // ---------- title block ----------
  s += '<text x="'+PAD+'" y="26" font-family="Inter,sans-serif" font-size="13.5" font-weight="600" fill="'+C.text+'">CNC acoustic spectrogram + tool half-life</text>';
  s += '<text x="'+PAD+'" y="42" font-family="Inter,sans-serif" font-size="11" fill="'+C.muted+'">Acoustic anomaly &#8594; half-life prediction &#8594; service before failure</text>';

  // headline metric (amber) top-right
  const hlX = W - PAD;
  s += '<text x="'+hlX+'" y="24" text-anchor="end" font-family="Inter,sans-serif" font-size="18" font-weight="600" fill="'+C.amber+'">25% downtime reduction</text>';
  s += '<text x="'+hlX+'" y="42" text-anchor="end" font-family="Inter,sans-serif" font-size="12" fill="'+C.amber+'">+$1.2M incremental weekly revenue</text>';

  // ================= PANEL A : SPECTROGRAM =================
  const aX = PAD, aY = 60, aW = W - PAD*2, aTitleH = 16;
  const labW = 78;            // left label region
  const gridX = aX + labW;
  const gridY = aY + aTitleH + 6;
  const gridW = aW - labW - 8;
  const nBands = 10;          // frequency bands
  const nCols = 24;           // time cols
  const cellGap = 2;
  const gridH = 118;
  const cw = (gridW - (nCols-1)*cellGap)/nCols;
  const ch = (gridH - (nBands-1)*cellGap)/nBands;

  // panel A background
  s += '<rect x="'+aX+'" y="'+aY+'" width="'+aW+'" height="'+(aTitleH+gridH+34)+'" rx="6" fill="'+C.panel+'"/>';
  s += '<text x="'+(aX+12)+'" y="'+(aY+13)+'" font-family="Inter,sans-serif" font-size="11.5" font-weight="600" fill="'+C.text+'">(a) Acoustic spectrogram &#8212; degradation signature</text>';

  // deterministic intensity field; high-frequency anomaly band (top bands) brightens to amber over last third
  const anomThird = Math.floor(nCols*2/3); // last third starts here
  const noise = [0.12,0.34,0.21,0.47,0.18,0.29,0.41,0.15,0.33,0.24,0.19,0.38,0.27,0.16,0.31,0.44,0.22,0.36,0.13,0.28,0.40,0.17,0.25,0.30];
  const tealFills = [C.f12, C.f20, C.f35]; // only allowed teal fills

  for(let b=0;b<nBands;b++){
    for(let t=0;t<nCols;t++){
      const x = gridX + t*(cw+cellGap);
      const y = gridY + b*(ch+cellGap);
      const isHighFreq = b<=2; // top 3 bands carry the anomaly
      let fill, cls='', extra='', tip;
      const baseT = 0.18 + noise[t]*0.35 + (1-b/nBands)*0.12;
      if(isHighFreq && t>=anomThird){
        // anomaly: solid amber, intensity ramps via legal opacity attribute
        const ramp = (t-anomThird)/(nCols-1-anomThird || 1); // 0..1
        const bandBoost = (3-b)/3; // top band strongest
        const amberW = Math.min(1, ramp*0.85 + bandBoost*0.15);
        const op = r2(0.55 + amberW*0.45);
        fill = C.amber;
        extra = ' opacity="'+op+'"';
        cls = ' class="viz_parth_anom viz_parth_cell"';
        tip = 'High-frequency anomaly  band '+(nBands-b)+'  t'+(t+1)+'  intensity '+Math.round(op*100)+'%';
      } else {
        // dim teal field, quantized to one of the 3 allowed teal fills
        const lvl = baseT<0.30 ? 0 : (baseT<0.42 ? 1 : 2);
        fill = tealFills[lvl];
        cls = ' class="viz_parth_cell"';
        tip = 'band '+(nBands-b)+'  t'+(t+1);
      }
      s += '<rect'+cls+' x="'+r2(x)+'" y="'+r2(y)+'" width="'+r2(cw)+'" height="'+r2(ch)+'" rx="1.5" fill="'+fill+'"'+extra+'><title>'+esc(tip)+'</title></rect>';
    }
  }

  // anomaly bracket + label (amber) over the bright region
  const anomX = gridX + anomThird*(cw+cellGap) - cellGap;
  const anomBandBottom = gridY + 3*(ch+cellGap) - cellGap;
  s += '<rect x="'+r2(anomX)+'" y="'+gridY+'" width="'+r2(gridX+gridW-anomX)+'" height="'+r2(anomBandBottom-gridY)+'" rx="2" fill="none" stroke="'+C.amber+'" stroke-width="1.1" stroke-dasharray="3 3" opacity="0.85"/>';
  s += '<text x="'+r2(gridX+gridW)+'" y="'+r2(gridY-2)+'" text-anchor="end" font-family="Inter,sans-serif" font-size="10" fill="'+C.amber+'">anomaly band</text>';

  // y-axis label (Frequency) - rotated
  const yMid = gridY + gridH/2;
  s += '<text x="'+(aX+14)+'" y="'+r2(yMid)+'" transform="rotate(-90 '+(aX+14)+' '+r2(yMid)+')" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" fill="'+C.muted+'">Frequency</text>';
  // y ticks: high / low
  s += '<text x="'+(gridX-6)+'" y="'+(gridY+9)+'" text-anchor="end" font-family="Inter,sans-serif" font-size="10" fill="'+C.tick+'">high</text>';
  s += '<text x="'+(gridX-6)+'" y="'+(gridY+gridH)+'" text-anchor="end" font-family="Inter,sans-serif" font-size="10" fill="'+C.tick+'">low</text>';

  // x-axis (Time)
  const xAxisY = gridY+gridH+13;
  s += '<text x="'+r2(gridX)+'" y="'+xAxisY+'" font-family="Inter,sans-serif" font-size="10" fill="'+C.tick+'">t0</text>';
  s += '<text x="'+r2(gridX+gridW)+'" y="'+xAxisY+'" text-anchor="end" font-family="Inter,sans-serif" font-size="10" fill="'+C.tick+'">now</text>';
  s += '<text x="'+r2(gridX+gridW/2)+'" y="'+(xAxisY+12)+'" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" fill="'+C.muted+'">Time</text>';

  // ================= PANEL B : TOOL HALF-LIFE DECAY =================
  const bY = aY + (aTitleH+gridH+34) + 12;
  const bX = PAD, bW = W - PAD*2, bH = H - bY - PAD;
  s += '<rect x="'+bX+'" y="'+bY+'" width="'+bW+'" height="'+bH+'" rx="6" fill="'+C.panel+'"/>';
  s += '<text x="'+(bX+12)+'" y="'+(bY+16)+'" font-family="Inter,sans-serif" font-size="11.5" font-weight="600" fill="'+C.text+'">(b) Tool-tip half-life decay &#8212; remaining life vs cycles</text>';

  // plot region
  const pL = bX + 46;            // left for y axis
  const pR = bX + bW - 14;
  const pT = bY + 26;
  const pB = bY + bH - 24;
  const pW = pR - pL;
  const pH = pB - pT;

  // scales: x = cycles 0..100, y = remaining life 0..100%
  const sx = (cx)=>pL + (cx/100)*pW;
  const sy = (v)=>pB - (v/100)*pH;

  // gridlines + y ticks
  [0,25,50,75,100].forEach(v=>{
    const y = sy(v);
    s += '<line x1="'+r2(pL)+'" y1="'+r2(y)+'" x2="'+r2(pR)+'" y2="'+r2(y)+'" stroke="'+C.grid+'" stroke-width="1"/>';
    s += '<text x="'+(pL-6)+'" y="'+r2(y+3.5)+'" text-anchor="end" font-family="Inter,sans-serif" font-size="10" fill="'+C.tick+'">'+v+'</text>';
  });
  // x ticks
  [0,25,50,75,100].forEach(v=>{
    const x = sx(v);
    s += '<text x="'+r2(x)+'" y="'+(pB+14)+'" text-anchor="middle" font-family="Inter,sans-serif" font-size="10" fill="'+C.tick+'">'+v+'</text>';
  });
  // axis labels
  s += '<text x="'+(bX+14)+'" y="'+r2((pT+pB)/2)+'" transform="rotate(-90 '+(bX+14)+' '+r2((pT+pB)/2)+')" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" fill="'+C.muted+'">Remaining tool life %</text>';
  s += '<text x="'+r2((pL+pR)/2)+'" y="'+(pB+24)+'" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" fill="'+C.muted+'">Machining cycles</text>';

  // failure threshold line (dashed red), low remaining life
  const thr = 18; // % failure threshold
  const thrY = sy(thr);
  s += '<line class="viz_parth_thr" x1="'+r2(pL)+'" y1="'+r2(thrY)+'" x2="'+r2(pR)+'" y2="'+r2(thrY)+'" stroke="'+C.red+'" stroke-width="1.6" stroke-dasharray="6 4"/>';
  s += '<text x="'+r2(pL)+'" y="'+r2(thrY-5)+'" font-family="Inter,sans-serif" font-size="10" fill="'+C.red+'">failure threshold</text>';

  // half-life decay curve: remaining = 100 * 0.5^(cycles / halflife)
  const halflife = 100/Math.log2(100/thr) * 0.88; // tuned so curve crosses thr near ~88 cycles
  const decay = (cx)=> 100*Math.pow(0.5, cx/halflife);
  // build path
  let pathPts = [];
  for(let cx=0; cx<=100; cx+=2){
    pathPts.push([sx(cx), sy(decay(cx))]);
  }
  let d = 'M'+r2(pathPts[0][0])+','+r2(pathPts[0][1]);
  for(let i=1;i<pathPts.length;i++){ d += ' L'+r2(pathPts[i][0])+','+r2(pathPts[i][1]); }

  // crossing cycle (decay == thr)
  let crossCx = halflife * Math.log2(100/thr);
  const crossX = sx(crossCx), crossY = sy(thr);

  // area fill under curve (subtle teal)
  let area = d + ' L'+r2(sx(100))+','+r2(pB)+' L'+r2(sx(0))+','+r2(pB)+' Z';
  s += '<path d="'+area+'" fill="'+C.f12+'"/>';

  // the curve, with draw-on animation that rests fully drawn
  let plen = 0;
  for(let i=1;i<pathPts.length;i++){
    const dx=pathPts[i][0]-pathPts[i-1][0], dy=pathPts[i][1]-pathPts[i-1][1];
    plen += Math.sqrt(dx*dx+dy*dy);
  }
  plen = Math.ceil(plen);
  s += '<path d="'+d+'" fill="none" stroke="'+C.tealBright+'" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="--vp-len:'+plen+';stroke-dasharray:'+plen+';animation:viz_parth_draw 2.2s ease-out forwards"/>';

  // crossing point marker (red, semantic fault)
  s += '<circle cx="'+r2(crossX)+'" cy="'+r2(crossY)+'" r="4.5" fill="none" stroke="'+C.red+'" stroke-width="1.6"/>';
  s += '<text x="'+r2(crossX-7)+'" y="'+r2(crossY+15)+'" text-anchor="end" font-family="Inter,sans-serif" font-size="9.5" fill="'+C.red+'">predicted failure</text>';

  // "Replace by" marker (amber) BEFORE the crossing
  const repCx = crossCx - 16; // safely before crossing
  const repV = decay(repCx);
  const repX = sx(repCx), repY = sy(repV);
  // guide line down to axis
  s += '<line x1="'+r2(repX)+'" y1="'+r2(repY)+'" x2="'+r2(repX)+'" y2="'+r2(pB)+'" stroke="'+C.amber+'" stroke-width="1" stroke-dasharray="2 3" opacity="0.55"/>';
  // marker
  s += '<g class="viz_parth_marker">';
  s += '<circle cx="'+r2(repX)+'" cy="'+r2(repY)+'" r="6" fill="'+C.amber+'"/>';
  s += '<circle cx="'+r2(repX)+'" cy="'+r2(repY)+'" r="10.5" fill="none" stroke="'+C.amber+'" stroke-width="1.2" opacity="0.6"/>';
  s += '</g>';
  // label for Replace by
  const lblY = repY - 16;
  s += '<text x="'+r2(repX)+'" y="'+r2(lblY)+'" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" font-weight="600" fill="'+C.amber+'">Replace by</text>';
  s += '<text x="'+r2(repX)+'" y="'+r2(lblY+12)+'" text-anchor="middle" font-family="Inter,sans-serif" font-size="9.5" fill="'+C.amber+'">'+Math.round(repV)+'% life left</text>';

  // legend strip (top-right of panel b)
  const lgY = pT - 2;
  s += '<g font-family="Inter,sans-serif" font-size="9.5">';
  s += '<line x1="'+r2(pR-150)+'" y1="'+r2(lgY)+'" x2="'+r2(pR-136)+'" y2="'+r2(lgY)+'" stroke="'+C.tealBright+'" stroke-width="2.4"/>';
  s += '<text x="'+r2(pR-132)+'" y="'+r2(lgY+3.5)+'" fill="'+C.muted+'">remaining life</text>';
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

  const lx=W-padR-176, ly=padT-2;
  svg+='<g font-family="Inter,sans-serif" font-size="10" fill="'+COL.muted+'">';
  svg+='<rect x="'+lx+'" y="'+ly+'" width="11" height="11" rx="2" fill="rgba(13,115,119,0.35)" stroke="'+COL.teal+'" stroke-width="1.5"/>';
  svg+='<text x="'+(lx+16)+'" y="'+(ly+9)+'">increase</text>';
  svg+='<rect x="'+(lx+76)+'" y="'+ly+'" width="11" height="11" rx="2" fill="rgba(199,84,80,0.22)" stroke="'+COL.red+'" stroke-width="1.5"/>';
  svg+='<text x="'+(lx+92)+'" y="'+(ly+9)+'">decrease</text>';
  svg+='</g>';

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
  const enH = fullH;               // elastic net (taller)
  const ensH = PX(fullH * 0.88);   // ensemble (12% shorter)
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
  <line x1="${PX(b1x + barW / 2)}" y1="${PX(enTopY - 8)}" x2="${PX(b1x + barW / 2)}" y2="${PX(ensTopY - 22)}" stroke="#E8A838" stroke-width="1"/>
  <line x1="${PX(b2x + barW / 2)}" y1="${PX(ensTopY - 8)}" x2="${PX(b2x + barW / 2)}" y2="${PX(ensTopY - 22)}" stroke="#E8A838" stroke-width="1"/>
  <line x1="${PX(b1x + barW / 2)}" y1="${PX(ensTopY - 22)}" x2="${PX(b2x + barW / 2)}" y2="${PX(ensTopY - 22)}" stroke="#E8A838" stroke-width="1"/>
  <rect x="${PX((b1x + b2x) / 2 + barW / 2 - 38)}" y="${PX(ensTopY - 40)}" width="76" height="20" rx="4" fill="#1A1A1A" stroke="#E8A838" stroke-width="1"/>
  <text x="${PX((b1x + b2x) / 2 + barW / 2)}" y="${PX(ensTopY - 26)}" text-anchor="middle" font-family="Inter,sans-serif" font-size="11.5" font-weight="600" fill="#E8A838">&#8722;12% error</text>
</g>

<text x="${PX(rx0 - 6)}" y="${PX(lb + 50)}" font-family="Inter,sans-serif" font-size="10" fill="#707070">Bayesian hyperparameter optimization</text>
</svg>`;
  return svg;
}

/* ==== roboCar ==== */
function viz_roboCar(){
  var W=760,H=400,pad=16;
  // ---- track geometry (top-down circuit, left side) ----
  var ox=70, oy=92, ow=400, oh=250, orad=110;       // outer
  var lane=44;                                        // lane width
  var ix=ox+lane, iy=oy+lane, iw=ow-2*lane, ih=oh-2*lane, irad=orad-lane; // inner
  var cx=ox+ow/2, cy=oy+oh/2;

  // obstacles on the lane (fixed positions, no randomness)
  // type: barrel(square), cone(circle), car(rect) — all lie within the lane band
  var obs=[
    {t:'barrel', x:180, y:108, c:'#14A8AD', s:11, label:'Barrel'},
    {t:'cone',   x:392, y:138, c:'#14A8AD', r:7,  label:'Cone'},
    {t:'barrel', x:430, y:262, c:'#0D7377', s:11, label:'Barrel'},
    {t:'cone',   x:250, y:328, c:'#0D7377', r:7,  label:'Cone'},
    {t:'cone',   x:96,  y:255, c:'#14A8AD', r:7,  label:'Cone'},
    {t:'car',    x:300, y:114, c:'#C75450', w:22, h:13, label:'Moving car'}
  ];

  // racing / avoidance line — smooth teal-bright closed loop weaving inside the lane
  var racing="M 300 96 "
    + "C 360 96 412 116 432 158 "
    + "C 452 200 446 244 420 278 "
    + "C 392 314 332 322 270 322 "
    + "C 210 322 138 322 108 286 "
    + "C 80 252 80 206 96 166 "
    + "C 112 126 168 96 230 96 "
    + "C 256 96 280 96 300 96 Z";

  // marker car position — exact point on the racing path (top-right curve)
  var carMX=432, carMY=158;

  // ---- gauge geometry (right side) ----
  var gx=625, gy=216, gr=78, gsw=22;
  var pct=0.90;
  var circ=2*Math.PI*gr;
  var dash=circ*pct, gap=circ-dash;

  var s='';
  s+='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+W+' '+H+'" style="width:100%;max-width:760px;height:auto;display:block" role="img" aria-label="Top-down race circuit with autonomous avoidance racing line and a 90 percent obstacle-avoidance gauge">';

  // defs / styles
  s+='<defs>';
  s+='<style>'
    + '@keyframes viz_roboCar_dash{from{stroke-dashoffset:1480}to{stroke-dashoffset:0}}'
    + '.viz_roboCar_line{stroke-dasharray:1480;stroke-dashoffset:0;animation:viz_roboCar_dash 6s linear infinite}'
    + '@keyframes viz_roboCar_pulse{0%,100%{opacity:.85;transform:scale(1)}50%{opacity:.4;transform:scale(1.45)}}'
    + '.viz_roboCar_pulse{transform-box:fill-box;transform-origin:center;animation:viz_roboCar_pulse 2.6s ease-in-out infinite}'
    + '@keyframes viz_roboCar_gaugefill{from{stroke-dashoffset:'+circ+'}to{stroke-dashoffset:'+gap+'}}'
    + '.viz_roboCar_gauge{animation:viz_roboCar_gaugefill 1.8s ease-out forwards}'
    + '.viz_roboCar_ob{transition:opacity .2s}.viz_roboCar_ob:hover{opacity:.75}'
    + '</style>';
  s+='</defs>';

  // background panel
  s+='<rect x="0" y="0" width="'+W+'" height="'+H+'" fill="#141414"/>';

  // ---- titles (top-left) ----
  s+='<text x="'+pad+'" y="30" font-family="Inter,sans-serif" font-size="13.5" font-weight="600" fill="#F0F0F0">LIDAR + CNN → real-time avoidance path</text>';
  s+='<text x="'+pad+'" y="48" font-family="Inter,sans-serif" font-size="11" fill="#909090">Autonomous track navigation + avoidance gauge</text>';

  // ---- track lane (band between outer and inner rounded rects) ----
  s+='<rect x="'+ox+'" y="'+oy+'" rx="'+orad+'" ry="'+orad+'" width="'+ow+'" height="'+oh+'" fill="rgba(13,115,119,0.12)" stroke="#262626" stroke-width="1.5"/>';
  s+='<rect x="'+ix+'" y="'+iy+'" rx="'+irad+'" ry="'+irad+'" width="'+iw+'" height="'+ih+'" fill="#141414" stroke="#262626" stroke-width="1.5"/>';
  // dashed centerline
  s+='<rect x="'+(ox+lane/2)+'" y="'+(oy+lane/2)+'" rx="'+(orad-lane/2)+'" ry="'+(orad-lane/2)+'" width="'+(ow-lane)+'" height="'+(oh-lane)+'" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1.5" stroke-dasharray="6 10"/>';

  // infield label
  s+='<text x="'+cx+'" y="'+(cy-6)+'" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" fill="#909090">TRACK</text>';
  s+='<text x="'+cx+'" y="'+(cy+10)+'" text-anchor="middle" font-family="Inter,sans-serif" font-size="10" fill="#707070">top-down circuit</text>';

  // ---- racing / avoidance line ----
  s+='<path d="'+racing+'" fill="none" stroke="rgba(13,115,119,0.35)" stroke-width="7" stroke-linejoin="round"/>';
  s+='<path class="viz_roboCar_line" d="'+racing+'" fill="none" stroke="#14A8AD" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>';

  // ---- obstacles ----
  for(var i=0;i<obs.length;i++){
    var o=obs[i];
    if(o.t==='barrel'){
      s+='<g class="viz_roboCar_ob"><rect x="'+(o.x-o.s/2)+'" y="'+(o.y-o.s/2)+'" width="'+o.s+'" height="'+o.s+'" rx="2" fill="'+o.c+'" stroke="#101010" stroke-width="1"/><title>'+o.label+'</title></g>';
    } else if(o.t==='cone'){
      s+='<g class="viz_roboCar_ob"><circle cx="'+o.x+'" cy="'+o.y+'" r="'+o.r+'" fill="'+o.c+'" stroke="#101010" stroke-width="1"/><title>'+o.label+'</title></g>';
    } else if(o.t==='car'){
      s+='<g class="viz_roboCar_ob"><rect x="'+(o.x-o.w/2)+'" y="'+(o.y-o.h/2)+'" width="'+o.w+'" height="'+o.h+'" rx="2.5" fill="'+o.c+'" stroke="#101010" stroke-width="1"/><title>'+o.label+' (hazard)</title></g>';
    }
  }

  // ---- car marker on racing line (gentle halo pulse; resting state complete) ----
  s+='<g transform="translate('+carMX+','+carMY+')">';
  s+='<circle class="viz_roboCar_pulse" cx="0" cy="0" r="9" fill="rgba(13,115,119,0.35)"/>';
  s+='<rect x="-6" y="-4" width="12" height="8" rx="2" fill="#F0F0F0" stroke="#0D7377" stroke-width="1.5"/>';
  s+='<title>Autonomous car (on avoidance line)</title>';
  s+='</g>';

  // legend (below track)
  var ly=372;
  s+='<rect x="'+pad+'" y="'+(ly-9)+'" width="11" height="11" rx="2" fill="#14A8AD"/>';
  s+='<text x="'+(pad+18)+'" y="'+(ly)+'" font-family="Inter,sans-serif" font-size="10" fill="#909090">Barrel</text>';
  s+='<circle cx="'+(pad+82)+'" cy="'+(ly-3)+'" r="5.5" fill="#0D7377"/>';
  s+='<text x="'+(pad+92)+'" y="'+(ly)+'" font-family="Inter,sans-serif" font-size="10" fill="#909090">Cone</text>';
  s+='<rect x="'+(pad+140)+'" y="'+(ly-8)+'" width="14" height="9" rx="2" fill="#C75450"/>';
  s+='<text x="'+(pad+158)+'" y="'+(ly)+'" font-family="Inter,sans-serif" font-size="10" fill="#909090">Moving car</text>';
  s+='<line x1="'+(pad+232)+'" y1="'+(ly-3)+'" x2="'+(pad+258)+'" y2="'+(ly-3)+'" stroke="#14A8AD" stroke-width="2.5"/>';
  s+='<text x="'+(pad+264)+'" y="'+(ly)+'" font-family="Inter,sans-serif" font-size="10" fill="#909090">Avoidance line</text>';

  // ---- gauge (right) ----
  s+='<circle cx="'+gx+'" cy="'+gy+'" r="'+gr+'" fill="none" stroke="#262626" stroke-width="'+gsw+'"/>';
  s+='<g transform="rotate(-90 '+gx+' '+gy+')">';
  s+='<circle class="viz_roboCar_gauge" cx="'+gx+'" cy="'+gy+'" r="'+gr+'" fill="none" stroke="#E8A838" stroke-width="'+gsw+'" stroke-linecap="round" stroke-dasharray="'+dash+' '+gap+'" stroke-dashoffset="'+gap+'"/>';
  s+='</g>';
  s+='<text x="'+gx+'" y="'+(gy+4)+'" text-anchor="middle" font-family="Inter,sans-serif" font-size="34" font-weight="700" fill="#E8A838">90%</text>';
  s+='<text x="'+gx+'" y="'+(gy+26)+'" text-anchor="middle" font-family="Inter,sans-serif" font-size="10" fill="#909090">avoidance rate</text>';
  s+='<text x="'+gx+'" y="'+(gy-gr-16)+'" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" font-weight="600" fill="#F0F0F0">Obstacle avoidance</text>';

  // ---- stat note (right column, below gauge) ----
  var sx=540, syb=328;
  s+='<line x1="'+sx+'" y1="'+(syb-14)+'" x2="'+(sx+170)+'" y2="'+(syb-14)+'" stroke="#262626" stroke-width="1"/>';
  var stats=[
    ['9','NASCAR / F1-style tracks'],
    ['200+','obstacles encountered'],
    ['7','unplanned stops'],
    ['LIDAR+CNN','sensing + perception']
  ];
  for(var j=0;j<stats.length;j++){
    var yy=syb+j*16;
    s+='<text x="'+sx+'" y="'+yy+'" font-family="Inter,sans-serif" font-size="11" font-weight="600" fill="#14A8AD">'+stats[j][0]+'</text>';
    s+='<text x="'+(sx+72)+'" y="'+yy+'" font-family="Inter,sans-serif" font-size="10" fill="#909090">'+stats[j][1]+'</text>';
  }

  s+='</svg>';
  var svg=s;
  return svg;
}

/* ==== crypto ==== */
function viz_crypto(){
  const W=760, H=400, pad=16;
  // ---- color tokens ----
  const C={bgOuter:"#141414",panel:"#1A1A1A",inset:"#101010",teal:"#0D7377",tealBright:"#14A8AD",tealFill:"rgba(13,115,119,0.2)",tealFillSoft:"rgba(13,115,119,0.12)",amber:"#E8A838",text:"#F0F0F0",muted:"#909090",tick:"#707070",grid:"#262626",faint:"rgba(255,255,255,0.06)"};

  // ---- main chart geometry ----
  const N=20;
  const chL=pad+34, chR=W-200, chT=66, chB=H-44;            // plot box for main chart
  const plotW=chR-chL, plotH=chB-chT;

  // Sentiment leads price: sentiment turning points precede price by ~2 steps.
  // Both normalized to 0..1. Fixed (reproducible) arrays.
  const sentiment=[0.30,0.38,0.52,0.66,0.74,0.70,0.58,0.44,0.36,0.42,0.56,0.70,0.80,0.76,0.62,0.48,0.40,0.50,0.66,0.78];
  const price    =[0.34,0.32,0.36,0.46,0.60,0.70,0.72,0.64,0.50,0.40,0.40,0.50,0.64,0.74,0.76,0.66,0.52,0.44,0.50,0.62];

  const xAt=i=>chL + (plotW)*(i/(N-1));
  const yAt=v=>chB - plotH*v;

  const pathFrom=arr=>{
    let d="";
    for(let i=0;i<N;i++){ d += (i?"L":"M") + xAt(i).toFixed(1) + " " + yAt(arr[i]).toFixed(1); }
    return d;
  };
  const areaFrom=arr=>{
    let d="M"+chL.toFixed(1)+" "+chB.toFixed(1);
    for(let i=0;i<N;i++){ d += "L"+xAt(i).toFixed(1)+" "+yAt(arr[i]).toFixed(1); }
    d += "L"+chR.toFixed(1)+" "+chB.toFixed(1)+"Z";
    return d;
  };

  // ---- inset cross-correlation bar chart geometry ----
  const inL=chR+30, inR=W-pad-6, inT=110, inB=H-58;
  const insW=inR-inL, insH=inB-inT;
  // lag -3..+3 ; positive lag = sentiment leads price. Peak at +2 (amber).
  const lags=[-3,-2,-1,0,1,2,3];
  const corr=[-0.18,0.05,0.22,0.38,0.61,0.74,0.41];
  const peak=5; // index of lag +2
  const cMin=-0.3, cMax=0.8;
  const zeroY = inB - insH*((0-cMin)/(cMax-cMin));
  const barW = (insW/lags.length)*0.62;
  const barGap = insW/lags.length;
  const yC=v=> inB - insH*((v-cMin)/(cMax-cMin));

  // gridlines main chart (horizontal at 0,.25,.5,.75,1)
  let grid="";
  [0,0.25,0.5,0.75,1].forEach(v=>{
    const y=yAt(v).toFixed(1);
    grid+=`<line x1="${chL}" y1="${y}" x2="${chR}" y2="${y}" stroke="${C.grid}" stroke-width="1"/>`;
  });

  // x ticks (every 4 steps) main chart
  let xticks="";
  for(let i=0;i<N;i+=4){
    xticks+=`<text x="${xAt(i).toFixed(1)}" y="${chB+16}" font-size="10" fill="${C.tick}" text-anchor="middle">t${i}</text>`;
  }

  // y axis tick labels (price scale left, sentiment right hint)
  let yticks="";
  [["High",1],["",0.5],["Low",0]].forEach(([lab,v])=>{
    if(lab) yticks+=`<text x="${chL-8}" y="${(yAt(v)+3).toFixed(1)}" font-size="10" fill="${C.tick}" text-anchor="end">${lab}</text>`;
  });

  // lead markers: vertical guides connecting a sentiment peak to the price peak it precedes
  // sentiment peak at t4 -> price peak at t6 ; sentiment peak at t12 -> price peak at t14
  const leadPairs=[[4,6],[12,14]];
  let leads="";
  leadPairs.forEach(([si,pi])=>{
    const x1=xAt(si), x2=xAt(pi);
    const ya=yAt(sentiment[si]);
    // dashed connector across the lag at the top
    const topY=chT+10;
    leads+=`<line x1="${x1.toFixed(1)}" y1="${topY}" x2="${x1.toFixed(1)}" y2="${ya.toFixed(1)}" stroke="${C.amber}" stroke-width="1" stroke-dasharray="2 3" opacity="0.55"/>`;
    leads+=`<line x1="${x2.toFixed(1)}" y1="${topY}" x2="${x2.toFixed(1)}" y2="${yAt(price[pi]).toFixed(1)}" stroke="${C.tealBright}" stroke-width="1" stroke-dasharray="2 3" opacity="0.55"/>`;
    leads+=`<path d="M${x1.toFixed(1)} ${topY}L${x2.toFixed(1)} ${topY}" stroke="${C.amber}" stroke-width="1.2" fill="none" opacity="0.8"/>`;
    leads+=`<path d="M${(x2-5).toFixed(1)} ${(topY-3).toFixed(1)}L${x2.toFixed(1)} ${topY}L${(x2-5).toFixed(1)} ${(topY+3).toFixed(1)}" stroke="${C.amber}" stroke-width="1.2" fill="none" opacity="0.8"/>`;
    leads+=`<text x="${((x1+x2)/2).toFixed(1)}" y="${(topY-5).toFixed(1)}" font-size="9" fill="${C.amber}" text-anchor="middle">+2 lag</text>`;
  });

  // sentiment & price points (small dots)
  let dots="";
  for(let i=0;i<N;i++){
    dots+=`<circle cx="${xAt(i).toFixed(1)}" cy="${yAt(sentiment[i]).toFixed(1)}" r="1.8" fill="${C.amber}"/>`;
    dots+=`<circle cx="${xAt(i).toFixed(1)}" cy="${yAt(price[i]).toFixed(1)}" r="1.8" fill="${C.tealBright}"/>`;
  }

  // inset bars
  let bars="";
  for(let k=0;k<lags.length;k++){
    const cx=inL + barGap*(k+0.5);
    const v=corr[k];
    const yTop=yC(Math.max(v,0));
    const yBot=yC(Math.min(v,0));
    const h=Math.max(1,yBot-yTop);
    const isPeak=(k===peak);
    const fill=isPeak?C.amber:(v<0?C.tealFillSoft:C.tealFill);
    const stroke=isPeak?C.amber:C.teal;
    bars+=`<g><title>lag ${lags[k]>0?"+":""}${lags[k]}: r=${v.toFixed(2)}</title>`+
      `<rect x="${(cx-barW/2).toFixed(1)}" y="${yTop.toFixed(1)}" width="${barW.toFixed(1)}" height="${h.toFixed(1)}" rx="1.5" fill="${fill}" stroke="${stroke}" stroke-width="1"/></g>`;
    bars+=`<text x="${cx.toFixed(1)}" y="${(inB+13).toFixed(1)}" font-size="9" fill="${C.tick}" text-anchor="middle">${lags[k]>0?"+":""}${lags[k]}</text>`;
    if(isPeak){
      bars+=`<text x="${cx.toFixed(1)}" y="${(yTop-5).toFixed(1)}" font-size="10" font-weight="600" fill="${C.amber}" text-anchor="middle">.74</text>`;
    }
  }
  // inset zero line + frame
  const insetZero=`<line x1="${inL}" y1="${zeroY.toFixed(1)}" x2="${inR}" y2="${zeroY.toFixed(1)}" stroke="${C.grid}" stroke-width="1"/>`;

  // legend swatches (dual axis hint)
  const legend=
    `<g font-size="11" font-family="Inter,sans-serif">`+
      `<rect x="${chL}" y="${chT-22}" width="11" height="3" rx="1" fill="${C.tealBright}"/>`+
      `<text x="${chL+17}" y="${chT-18}" fill="${C.muted}">BTC price (left axis)</text>`+
      `<rect x="${chL+150}" y="${chT-22}" width="11" height="3" rx="1" fill="${C.amber}"/>`+
      `<text x="${chL+167}" y="${chT-18}" fill="${C.muted}">Twitter sentiment (right axis)</text>`+
    `</g>`;

  const svg=
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:760px;height:auto;display:block" role="img" aria-label="Line chart showing Twitter sentiment leading Bitcoin price turning points by about two time steps, with an inset cross-correlation bar chart peaking at lag plus two">
<style>
@keyframes viz_crypto_draw{from{stroke-dashoffset:1500}to{stroke-dashoffset:0}}
@keyframes viz_crypto_fade{from{opacity:0}to{opacity:1}}
.viz_crypto-price{stroke-dasharray:1500;stroke-dashoffset:0;animation:viz_crypto_draw 2.4s ease-out forwards}
.viz_crypto-sent{opacity:1;animation:viz_crypto_fade 1s ease-out 1.1s both}
.viz_crypto-late{opacity:1;animation:viz_crypto_fade 1s ease-out .9s both}
.viz_crypto-bar:hover rect{filter:brightness(1.15)}
</style>
<rect x="0" y="0" width="${W}" height="${H}" rx="10" fill="${C.bgOuter}"/>
<rect x="${pad}" y="${pad}" width="${W-2*pad}" height="${H-2*pad}" rx="8" fill="${C.panel}"/>

<text x="${pad+12}" y="${pad+22}" font-family="Inter,sans-serif" font-size="13.5" font-weight="600" fill="${C.text}">Does sentiment lead price? Cross-correlation says yes</text>
<text x="${pad+12}" y="${pad+39}" font-family="Inter,sans-serif" font-size="11" fill="${C.muted}">Sentiment-leads-price + cross-correlation</text>

${legend}

<g font-family="Inter,sans-serif">
${grid}
${yticks}
${xticks}

<path d="${areaFrom(price)}" fill="${C.tealFillSoft}" class="viz_crypto-late"/>
<path class="viz_crypto-price" d="${pathFrom(price)}" fill="none" stroke="${C.tealBright}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>
<path class="viz_crypto-sent" d="${pathFrom(sentiment)}" fill="none" stroke="${C.amber}" stroke-width="2" stroke-dasharray="6 4" stroke-linejoin="round" stroke-linecap="round"/>

<g class="viz_crypto-late">${leads}${dots}</g>
</g>

<text x="${chL}" y="${chB+34}" font-family="Inter,sans-serif" font-size="10" fill="${C.tick}">time step (≈20 windows)</text>

<rect x="${inL-14}" y="${inT-30}" width="${(inR-inL)+22}" height="${(inB-inT)+66}" rx="6" fill="${C.inset}" stroke="${C.grid}" stroke-width="1"/>
<text x="${inL-6}" y="${inT-16}" font-family="Inter,sans-serif" font-size="11" font-weight="600" fill="${C.text}">Cross-correlation by lag</text>
<text x="${inL-6}" y="${inT-3}" font-family="Inter,sans-serif" font-size="9.5" fill="${C.muted}">+ = sentiment leads price</text>
<g font-family="Inter,sans-serif">
${insetZero}
${bars}
<text x="${inL-6}" y="${(zeroY-3).toFixed(1)}" font-size="9" fill="${C.tick}">0</text>
<text x="${((inL+inR)/2).toFixed(1)}" y="${(inB+30).toFixed(1)}" font-size="9.5" fill="${C.muted}" text-anchor="middle">lag (steps)</text>
</g>

<text x="${pad+12}" y="${H-pad-4}" font-family="Inter,sans-serif" font-size="9.5" fill="${C.tick}">VADER vs TextBlob benchmarked; LSTM; Elephas on Spark</text>
</svg>`;
  return svg;
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
<text x="${pad}" y="30" font-family="Inter,sans-serif" font-size="13.5" font-weight="600" fill="${text}">Store-item clustering + RMSE gain</text>
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
<text x="${bxRaw+bw+45}" y="${(rawTop+afterTop)/2-3}" font-family="Inter,sans-serif" font-size="17" font-weight="600" fill="${amber}" text-anchor="middle">&#8722;${gain}%</text>
<text x="${bxRaw+bw+45}" y="${(rawTop+afterTop)/2+13}" font-family="Inter,sans-serif" font-size="9" fill="${amber}" text-anchor="middle">RMSE gain</text>
<text x="${bx0}" y="${H-22}" font-family="Inter,sans-serif" font-size="10" fill="${muted}">Forecast at cluster level &#8594; disaggregate to store-item.</text>
<text x="${bx0}" y="${H-9}" font-family="Inter,sans-serif" font-size="10" fill="${muted}">Recall thresholds maintained.</text>
</svg>`;
}

/* ==== plugPredict ==== */
function viz_plugPredict(){
  const W=760;
  const H=400;
  const pad=16;
  // layout anchors
  const axisY=176;            // baseline of the patient timeline
  const axisX0=40;            // left start of timeline
  const nowX=372;             // 'now' divider
  const axisX1=712;           // right edge for fan reach
  // past events (proportional positions along time axis)
  const events=[
    {t:0.06,label:"Dx",sub:"Diagnosis",c:"#14A8AD"},
    {t:0.26,label:"Rx",sub:"Prescription",c:"#14A8AD"},
    {t:0.46,label:"Proc",sub:"Procedure",c:"#14A8AD"},
    {t:0.66,label:"Surg",sub:"Surgery",c:"#14A8AD"},
    {t:0.88,label:"Note",sub:"Clinical note",c:"#14A8AD"}
  ];
  const ex=t=>axisX0+(nowX-axisX0-14)*t;

  // prediction horizons (fan)
  const horizons=[
    {m:"3 mo",x:nowX+96, spread:34, chips:[["Rx","Drug regimen"]]},
    {m:"6 mo",x:nowX+196,spread:58, chips:[["Proc","Procedure"]]},
    {m:"12 mo",x:nowX+300,spread:86,chips:[["Dx","Diagnosis"]]}
  ];

  // gauge geometry (72% precision, amber)
  const gx=648, gy=300, gr=44, gsw=10;
  const pct=0.72;
  const circ=2*Math.PI*gr;
  const dash=circ*pct;
  const gap=circ-dash;

  let s='';
  s+=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:760px;height:auto;display:block" role="img" aria-label="Patient history to 3, 6 and 12-month next-step prediction with 72 percent precision">`;

  // styles + gentle animation (prefixed). Resting state is fully visible (opacity:1).
  s+=`<style>
    .viz_plugPredict_chip{opacity:1;animation:viz_plugPredict_in .7s ease both}
    .viz_plugPredict_d1{animation-delay:.30s}
    .viz_plugPredict_d2{animation-delay:.55s}
    .viz_plugPredict_d3{animation-delay:.80s}
    @keyframes viz_plugPredict_in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
    .viz_plugPredict_pulse{animation:viz_plugPredict_pl 3.2s ease-in-out infinite}
    @keyframes viz_plugPredict_pl{0%,100%{opacity:.6}50%{opacity:1}}
    .viz_plugPredict_ev:hover circle{stroke:#F0F0F0}
  </style>`;

  // background panel
  s+=`<rect x="0" y="0" width="${W}" height="${H}" fill="#141414"/>`;
  s+=`<rect x="${pad}" y="${pad}" width="${W-2*pad}" height="${H-2*pad}" rx="10" fill="#1A1A1A" stroke="#262626"/>`;

  // title block
  s+=`<text x="${pad+18}" y="48" font-family="Inter,sans-serif" font-size="13.5" font-weight="600" fill="#F0F0F0">Patient history &#8594; 3/6/12-month next-step prediction</text>`;
  s+=`<text x="${pad+18}" y="68" font-family="Inter,sans-serif" font-size="11" fill="#909090">Deep neural net + ensemble on time-series patient data</text>`;

  // legend (left = history, right = forecast)
  s+=`<g font-family="Inter,sans-serif" font-size="10" fill="#707070">`;
  s+=`<rect x="${pad+18}" y="96" width="10" height="10" rx="2" fill="rgba(13,115,119,0.35)" stroke="#14A8AD"/>`;
  s+=`<text x="${pad+34}" y="105" fill="#909090">Recorded events</text>`;
  s+=`<rect x="${pad+150}" y="96" width="10" height="10" rx="2" fill="rgba(13,115,119,0.12)" stroke="#0D7377" stroke-dasharray="2 2"/>`;
  s+=`<text x="${pad+166}" y="105" fill="#909090">Predicted next step</text>`;
  s+=`</g>`;

  // ===== forecast fan (drawn first so it sits behind chips) =====
  const fanTop=axisY-90;
  const fanBot=axisY+90;
  s+=`<path d="M ${nowX} ${axisY} L ${axisX1} ${fanTop} L ${axisX1} ${fanBot} Z" fill="rgba(13,115,119,0.12)"/>`;
  // fan guide spokes
  s+=`<path d="M ${nowX} ${axisY} L ${axisX1} ${fanTop+22}" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>`;
  s+=`<path d="M ${nowX} ${axisY} L ${axisX1} ${axisY}" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>`;
  s+=`<path d="M ${nowX} ${axisY} L ${axisX1} ${fanBot-22}" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>`;

  // ===== timeline axis =====
  // history segment (solid)
  s+=`<line x1="${axisX0}" y1="${axisY}" x2="${nowX}" y2="${axisY}" stroke="#0D7377" stroke-width="2.5"/>`;
  // future segment (dashed) along center spoke
  s+=`<line x1="${nowX}" y1="${axisY}" x2="${axisX1}" y2="${axisY}" stroke="#0D7377" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.7"/>`;

  // axis tick labels (past / now)
  s+=`<text x="${axisX0}" y="${axisY+78}" font-family="Inter,sans-serif" font-size="10" fill="#707070">earlier history</text>`;

  // ===== past event markers =====
  events.forEach((e,i)=>{
    const x=ex(e.t);
    const up=i%2===0;
    const ly=up?axisY-22:axisY+22;
    const ty=up?axisY-30:axisY+38;
    // connector tick
    s+=`<line x1="${x}" y1="${axisY}" x2="${x}" y2="${ly}" stroke="#262626" stroke-width="1"/>`;
    s+=`<g class="viz_plugPredict_ev"><title>${e.sub}</title>`;
    s+=`<circle cx="${x}" cy="${axisY}" r="5.5" fill="#1A1A1A" stroke="#14A8AD" stroke-width="2"/>`;
    s+=`<circle cx="${x}" cy="${axisY}" r="2" fill="#14A8AD"/>`;
    // label chip
    const lw=e.label.length*6.6+14;
    s+=`<rect x="${x-lw/2}" y="${ty-(up?12:0)}" width="${lw}" height="15" rx="4" fill="rgba(13,115,119,0.2)" stroke="#0D7377"/>`;
    s+=`<text x="${x}" y="${ty-(up?1:-11)}" font-family="Inter,sans-serif" font-size="10" font-weight="600" fill="#F0F0F0" text-anchor="middle">${e.label}</text>`;
    s+=`</g>`;
  });

  // ===== NOW divider =====
  s+=`<line x1="${nowX}" y1="${axisY-104}" x2="${nowX}" y2="${axisY+104}" stroke="#909090" stroke-width="1.5" stroke-dasharray="3 4"/>`;
  s+=`<circle cx="${nowX}" cy="${axisY}" r="6" fill="#1A1A1A" stroke="#F0F0F0" stroke-width="1.5"/>`;
  s+=`<rect x="${nowX-22}" y="${axisY-126}" width="44" height="17" rx="4" fill="#101010" stroke="#262626"/>`;
  s+=`<text x="${nowX}" y="${axisY-114}" font-family="Inter,sans-serif" font-size="10.5" font-weight="600" fill="#F0F0F0" text-anchor="middle">NOW</text>`;

  // ===== horizon chips =====
  horizons.forEach((h,i)=>{
    const cls=`viz_plugPredict_chip viz_plugPredict_d${i+1}`;
    // horizon marker on center axis
    s+=`<circle cx="${h.x}" cy="${axisY}" r="3.5" fill="#0D7377" stroke="#14A8AD" stroke-width="1.5" class="viz_plugPredict_pulse"/>`;
    // horizon time label below axis
    s+=`<g class="${cls}">`;
    s+=`<text x="${h.x}" y="${axisY+76}" font-family="Inter,sans-serif" font-size="10.5" font-weight="600" fill="#14A8AD" text-anchor="middle">${h.m}</text>`;
    // predicted-step chip above axis; chips climb with the fan spread
    const [tag,full]=h.chips[0];
    const cw=92, ch=30;
    const cxp=h.x-cw/2;
    const chipY=axisY-58-(h.spread-34);
    s+=`<line x1="${h.x}" y1="${axisY}" x2="${h.x}" y2="${chipY+ch}" stroke="#262626" stroke-width="1" stroke-dasharray="2 3"/>`;
    s+=`<rect x="${cxp}" y="${chipY}" width="${cw}" height="${ch}" rx="6" fill="rgba(13,115,119,0.12)" stroke="#0D7377" stroke-dasharray="3 2"><title>Predicted ${full} at ${h.m}</title></rect>`;
    s+=`<text x="${h.x}" y="${chipY+13}" font-family="Inter,sans-serif" font-size="10.5" font-weight="600" fill="#F0F0F0" text-anchor="middle">${tag}</text>`;
    s+=`<text x="${h.x}" y="${chipY+24}" font-family="Inter,sans-serif" font-size="8.5" fill="#909090" text-anchor="middle">${full}</text>`;
    s+=`</g>`;
  });

  // forecast bracket label
  s+=`<text x="${(nowX+axisX1)/2}" y="${axisY-96}" font-family="Inter,sans-serif" font-size="10" fill="#707070" text-anchor="middle">predicted next steps</text>`;

  // ===== precision gauge (amber headline metric) =====
  s+=`<g transform="translate(${gx},${gy})">`;
  s+=`<circle r="${gr}" fill="none" stroke="#262626" stroke-width="${gsw}"/>`;
  s+=`<circle r="${gr}" fill="none" stroke="#E8A838" stroke-width="${gsw}" stroke-linecap="round" stroke-dasharray="${dash.toFixed(1)} ${gap.toFixed(1)}" transform="rotate(-90)">`;
  s+=`<animate attributeName="stroke-dasharray" from="0 ${circ.toFixed(1)}" to="${dash.toFixed(1)} ${gap.toFixed(1)}" dur="1.2s" begin="0s" fill="freeze" calcMode="spline" keySplines="0.25 0.1 0.25 1"/>`;
  s+=`</circle>`;
  s+=`<text x="0" y="2" font-family="Inter,sans-serif" font-size="22" font-weight="700" fill="#E8A838" text-anchor="middle">72%</text>`;
  s+=`<text x="0" y="18" font-family="Inter,sans-serif" font-size="9" fill="#909090" text-anchor="middle">precision</text>`;
  s+=`</g>`;
  s+=`<text x="${gx}" y="${gy+gr+22}" font-family="Inter,sans-serif" font-size="10" fill="#707070" text-anchor="middle">next-step accuracy</text>`;

  // ===== footnote stats =====
  const fy=H-30;
  s+=`<g font-family="Inter,sans-serif">`;
  // stat 1
  s+=`<text x="${pad+18}" y="${fy}" font-size="11"><tspan fill="#14A8AD" font-weight="600">12</tspan><tspan fill="#909090"> therapy areas</tspan></text>`;
  s+=`<line x1="${pad+148}" y1="${fy-11}" x2="${pad+148}" y2="${fy+1}" stroke="#262626"/>`;
  // stat 2 (highlighted reduction)
  s+=`<text x="${pad+162}" y="${fy}" font-size="11"><tspan fill="#E8A838" font-weight="600">2/3</tspan><tspan fill="#909090"> reduction in doctor prep time</tspan></text>`;
  s+=`</g>`;

  s+=`</svg>`;
  return s;
}

/* ==== vaccine ==== */
function viz_vaccine(){
  const W = 760, H = 400;
  const padL = 56, padR = 18, padT = 64, padB = 70;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const x0 = padL, y0 = padT;
  const x1 = padL + plotW, y1 = padT + plotH;

  const maxUnits = 1000;
  const sx = (t) => x0 + (t / 28) * plotW;
  const sy = (u) => y1 - (u / maxUnits) * plotH;

  // On-hand inventory sawtooth: declines with demand, jumps at each auto-reorder.
  const pts = [
    {t:0,  u:920},
    {t:2,  u:760},
    {t:4,  u:600},
    {t:5,  u:430},
    {t:6,  u:880},
    {t:8,  u:700},
    {t:10, u:520},
    {t:11, u:380},
    {t:12, u:840},
    {t:14, u:640},
    {t:16, u:430},
    {t:17, u:300},
    {t:18, u:820},
    {t:20, u:660},
    {t:22, u:500},
    {t:23, u:360},
    {t:24, u:810},
    {t:26, u:640},
    {t:28, u:500}
  ];

  // Dynamic reorder threshold per period (varies slightly), stepwise.
  const thr = [
    {t:0,  u:420},
    {t:6,  u:420},
    {t:6,  u:400},
    {t:12, u:400},
    {t:12, u:380},
    {t:18, u:380},
    {t:18, u:410},
    {t:24, u:410},
    {t:24, u:430},
    {t:28, u:430}
  ];

  // Auto-order events (amber dots) where inventory crosses threshold.
  const orders = [
    {t:5,  u:430},
    {t:11, u:380},
    {t:17, u:300},
    {t:23, u:360}
  ];

  const invPath = pts.map((p,i)=> (i===0?"M":"L") + sx(p.t).toFixed(1) + " " + sy(p.u).toFixed(1)).join(" ");
  const invArea = "M" + sx(pts[0].t).toFixed(1) + " " + y1.toFixed(1) + " " +
    pts.map(p=> "L" + sx(p.t).toFixed(1) + " " + sy(p.u).toFixed(1)).join(" ") +
    " L" + sx(pts[pts.length-1].t).toFixed(1) + " " + y1.toFixed(1) + " Z";
  const thrPath = thr.map((p,i)=> (i===0?"M":"L") + sx(p.t).toFixed(1) + " " + sy(p.u).toFixed(1)).join(" ");

  // Stockout-avoided zone: vertical band around the deep trough (t 16 -> 18).
  const zL = sx(16.0), zR = sx(18.0);
  const zoneTopU = 380;
  const zoneTopY = sy(zoneTopU);

  // Axis ticks
  const yTicks = [0, 250, 500, 750, 1000];
  const xTicks = [0, 7, 14, 21, 28];

  let s = '';
  s += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+W+' '+H+'" style="width:100%;max-width:760px;height:auto;display:block" role="img" aria-label="Threshold crossed, order fires automatically: an on-hand inventory sawtooth declines with demand and jumps at each auto-reorder. A dashed dynamic reorder threshold triggers automatic orders, marked by amber dots, with a stockout-avoided zone near a deep trough that stays above zero. Reorder point per SKU per channel; pilot to full rollout achieved about 34 percent stockout reduction.">';

  // defs
  s += '<defs>';
  s += '<style>'+
    '@keyframes viz_vaccinePulse{0%,100%{r:4.4;opacity:1}50%{r:6.6;opacity:.55}}'+
    '@keyframes viz_vaccineDraw{from{stroke-dashoffset:2600}to{stroke-dashoffset:0}}'+
    '.viz_vaccine-dot{animation:viz_vaccinePulse 3.2s ease-in-out infinite}'+
    '.viz_vaccine-inv{stroke-dasharray:2600;stroke-dashoffset:0;animation:viz_vaccineDraw 2.6s ease-out forwards}'+
    '</style>';
  s += '</defs>';

  // background panel
  s += '<rect x="0" y="0" width="'+W+'" height="'+H+'" rx="10" fill="#141414"/>';
  s += '<rect x="'+x0+'" y="'+y0+'" width="'+plotW+'" height="'+plotH+'" fill="#101010"/>';

  // title block
  s += '<text x="16" y="26" font-family="Inter,sans-serif" font-size="13.5" font-weight="600" fill="#F0F0F0">Threshold crossed → order fires automatically</text>';
  s += '<text x="16" y="44" font-family="Inter,sans-serif" font-size="11" fill="#909090">Smart reorder: on-hand inventory vs. dynamic threshold</text>';

  // gridlines + y ticks
  for(const v of yTicks){
    const yy = sy(v);
    s += '<line x1="'+x0+'" y1="'+yy.toFixed(1)+'" x2="'+x1+'" y2="'+yy.toFixed(1)+'" stroke="#262626" stroke-width="1"/>';
    s += '<text x="'+(x0-8)+'" y="'+(yy+3.5).toFixed(1)+'" text-anchor="end" font-family="Inter,sans-serif" font-size="10" fill="#707070">'+v+'</text>';
  }
  // x ticks
  for(const v of xTicks){
    const xx = sx(v);
    s += '<text x="'+xx.toFixed(1)+'" y="'+(y1+18)+'" text-anchor="middle" font-family="Inter,sans-serif" font-size="10" fill="#707070">w'+v+'</text>';
  }
  // axis labels
  s += '<text x="'+((x0+x1)/2).toFixed(0)+'" y="'+(y1+38)+'" text-anchor="middle" font-family="Inter,sans-serif" font-size="10" fill="#707070">time (weeks)</text>';
  s += '<text x="14" y="'+((y0+y1)/2).toFixed(0)+'" text-anchor="middle" font-family="Inter,sans-serif" font-size="10" fill="#707070" transform="rotate(-90 14 '+((y0+y1)/2).toFixed(0)+')">units on hand</text>';

  // stockout-avoided zone (shaded band near deep trough, stays above zero)
  s += '<rect x="'+zL.toFixed(1)+'" y="'+zoneTopY.toFixed(1)+'" width="'+(zR-zL).toFixed(1)+'" height="'+(y1-zoneTopY).toFixed(1)+'" fill="rgba(13,115,119,0.2)" stroke="#0D7377" stroke-width="1" stroke-dasharray="3 3">';
  s += '<title>Stockout avoided: deepest trough held at 300 units, above zero</title></rect>';
  s += '<text x="'+((zL+zR)/2).toFixed(1)+'" y="'+(zoneTopY-6).toFixed(1)+'" text-anchor="middle" font-family="Inter,sans-serif" font-size="9.5" fill="#14A8AD">stockout avoided</text>';

  // inventory area fill
  s += '<path d="'+invArea+'" fill="rgba(13,115,119,0.12)"/>';

  // dynamic threshold (dashed)
  s += '<path d="'+thrPath+'" fill="none" stroke="#909090" stroke-width="1.5" stroke-dasharray="6 4"/>';

  // inventory sawtooth line (resting state fully drawn; animation only re-draws it)
  s += '<path class="viz_vaccine-inv" d="'+invPath+'" fill="none" stroke="#14A8AD" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>';

  // auto-order amber dots at crossings
  for(const o of orders){
    const cx = sx(o.t), cy = sy(o.u);
    s += '<line x1="'+cx.toFixed(1)+'" y1="'+cy.toFixed(1)+'" x2="'+cx.toFixed(1)+'" y2="'+sy(o.u+460).toFixed(1)+'" stroke="#E8A838" stroke-width="1" stroke-dasharray="2 3" opacity="0.5"/>';
    s += '<circle class="viz_vaccine-dot" cx="'+cx.toFixed(1)+'" cy="'+cy.toFixed(1)+'" r="4.4" fill="#E8A838" stroke="#101010" stroke-width="1.4">';
    s += '<title>Auto-order fired at week '+o.t+' — inventory '+o.u+' units hit reorder point</title></circle>';
  }
  // arrow label for the order mechanic (on first order)
  s += '<text x="'+sx(5).toFixed(1)+'" y="'+sy(900).toFixed(1)+'" text-anchor="middle" font-family="Inter,sans-serif" font-size="9.5" fill="#E8A838">auto-order</text>';

  // headline metric chip (amber, prominent) top-right
  const chipW = 158, chipH = 40, chipX = W - padR - chipW, chipY = 14;
  s += '<rect x="'+chipX+'" y="'+chipY+'" width="'+chipW+'" height="'+chipH+'" rx="6" fill="rgba(13,115,119,0.12)" stroke="#262626"/>';
  s += '<text x="'+(chipX+12)+'" y="'+(chipY+27)+'" font-family="Inter,sans-serif" font-size="20" font-weight="600" fill="#E8A838">-34%</text>';
  s += '<text x="'+(chipX+72)+'" y="'+(chipY+18)+'" font-family="Inter,sans-serif" font-size="10" fill="#F0F0F0">stockout</text>';
  s += '<text x="'+(chipX+72)+'" y="'+(chipY+31)+'" font-family="Inter,sans-serif" font-size="10" fill="#909090">reduction</text>';

  // legend (bottom)
  const lgY = H - 16;
  let lx = 16;
  // on-hand inventory
  s += '<line x1="'+lx+'" y1="'+(lgY-4)+'" x2="'+(lx+20)+'" y2="'+(lgY-4)+'" stroke="#14A8AD" stroke-width="2.2"/>';
  s += '<text x="'+(lx+26)+'" y="'+(lgY)+'" font-family="Inter,sans-serif" font-size="11" fill="#909090">on-hand inventory</text>';
  lx += 150;
  // dynamic threshold
  s += '<line x1="'+lx+'" y1="'+(lgY-4)+'" x2="'+(lx+20)+'" y2="'+(lgY-4)+'" stroke="#909090" stroke-width="1.5" stroke-dasharray="6 4"/>';
  s += '<text x="'+(lx+26)+'" y="'+(lgY)+'" font-family="Inter,sans-serif" font-size="11" fill="#909090">dynamic reorder threshold</text>';
  lx += 196;
  // auto-order event
  s += '<circle cx="'+(lx+8)+'" cy="'+(lgY-4)+'" r="4.4" fill="#E8A838" stroke="#101010" stroke-width="1.2"/>';
  s += '<text x="'+(lx+20)+'" y="'+(lgY)+'" font-family="Inter,sans-serif" font-size="11" fill="#909090">auto-order event</text>';
  lx += 132;
  // stockout avoided swatch
  s += '<rect x="'+lx+'" y="'+(lgY-10)+'" width="14" height="11" fill="rgba(13,115,119,0.2)" stroke="#0D7377" stroke-width="1" stroke-dasharray="3 3"/>';
  s += '<text x="'+(lx+20)+'" y="'+(lgY)+'" font-family="Inter,sans-serif" font-size="11" fill="#909090">stockout avoided</text>';

  // note line (above legend, under plot)
  s += '<text x="16" y="'+(H-34)+'" font-family="Inter,sans-serif" font-size="10" fill="#909090">reorder point per SKU per channel · pilot → full rollout</text>';

  s += '</svg>';
  return s;
}

/* ==== patientCare ==== */
function viz_patientCare(){
  const W = 760;
  const rows = ["Oncology","Cardiology","Immunology","Neurology","Respiratory","Endocrine","Rare Disease","Dermatology"];
  const cols = ["Patient finding","Adherence","Next-best-action","Concomitant-symptom detection","HCP targeting","Treatment reco","Risk scoring","Journey mapping","Channel optimization"];
  // delivery-quality matrix, values 2..4 (most cells well filled). value 5 = flagship (amber).
  const m = [
    [5,3,3,2,4,4,3,3,3],
    [4,4,3,3,3,3,5,3,2],
    [3,3,4,3,3,4,3,3,3],
    [3,2,3,5,3,3,3,2,3],
    [3,3,3,3,4,3,3,3,4],
    [3,3,3,2,3,3,4,3,3],
    [4,2,3,3,2,5,3,2,2],
    [3,3,4,3,3,3,3,3,5]
  ];
  // teal fill ramp by quality
  const tealFill = (v)=>{
    if(v<=1) return "rgba(13,115,119,0.12)";
    if(v===2) return "rgba(13,115,119,0.20)";
    if(v===3) return "rgba(13,115,119,0.35)";
    return "#0D7377"; // v===4 strongest teal
  };
  const tealStroke = (v)=> v>=4 ? "#14A8AD" : "#262626";
  // layout
  const padL = 16, padT = 16;
  const labelW = 116;          // left row-label column
  const topLabelH = 122;       // rotated column labels (raised to clear title/subtitle)
  const gridX = padL + labelW;
  const gridTop = padT + 26 + topLabelH; // title space + col labels
  const sideW = 168;           // right metric block
  const gridRight = W - padL - sideW - 18;
  const gridW = gridRight - gridX;
  const nCols = cols.length, nRows = rows.length;
  const gap = 4;
  const cellW = (gridW - gap*(nCols-1)) / nCols;
  const cellH = 27;
  const gridH = cellH*nRows + gap*(nRows-1);
  const H = gridTop + gridH + 38;

  let s = "";
  s += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:760px;height:auto;display:block" role="img" aria-label="Consistent delivery matrix: 8 therapy indications by 9 use cases, shaded teal by delivery quality with five amber flagship cells, and a side metric block showing 120 million dollars profit impact across 12 use cases and 8 indications">`;

  // style / animation (resting state is fully visible; fade is from 0 to 1)
  s += `<style>`
     + `.viz_patientCare-cell{opacity:1;animation:viz_patientCare-fade 0.5s ease both}`
     + `@keyframes viz_patientCare-fade{from{opacity:0}to{opacity:1}}`
     + `.viz_patientCare-cell:hover{stroke:#14A8AD;stroke-width:1.5}`
     + `.viz_patientCare-flag{animation:viz_patientCare-pulse 3.2s ease-in-out infinite}`
     + `@keyframes viz_patientCare-pulse{0%,100%{opacity:1}50%{opacity:0.82}}`
     + `</style>`;

  // background panel
  s += `<rect x="0" y="0" width="${W}" height="${H}" fill="#141414"/>`;
  s += `<rect x="${padL-6}" y="${padT-6}" width="${W-2*padL+12}" height="${H-2*padT+12}" rx="8" fill="#1A1A1A" stroke="#262626"/>`;

  // title (spec headline) + sublabel
  s += `<text x="${padL+2}" y="${padT+14}" font-family="Inter,sans-serif" font-size="13.5" font-weight="600" fill="#F0F0F0">Consistent delivery: 8 indications x use-case portfolio</text>`;
  s += `<text x="${padL+2}" y="${padT+31}" font-family="Inter,sans-serif" font-size="11" fill="#909090">Delivery-quality coverage across the patient-care use-case grid</text>`;

  // rotated column labels
  for(let c=0;c<nCols;c++){
    const cx = gridX + c*(cellW+gap) + cellW/2;
    const cy = gridTop - 8;
    s += `<text transform="translate(${cx.toFixed(1)} ${cy}) rotate(-45)" font-family="Inter,sans-serif" font-size="10" fill="#909090" text-anchor="start">${cols[c]}</text>`;
  }

  // row labels + cells
  let delay = 0;
  for(let r=0;r<nRows;r++){
    const ry = gridTop + r*(cellH+gap);
    // row label
    s += `<text x="${gridX-10}" y="${(ry+cellH/2+3.5).toFixed(1)}" font-family="Inter,sans-serif" font-size="11" fill="#F0F0F0" text-anchor="end">${rows[r]}</text>`;
    for(let c=0;c<nCols;c++){
      const cx = gridX + c*(cellW+gap);
      const v = m[r][c];
      const flag = v===5;
      const fill = flag ? "#E8A838" : tealFill(v);
      const stroke = flag ? "#E8A838" : tealStroke(v);
      const cls = flag ? "viz_patientCare-cell viz_patientCare-flag" : "viz_patientCare-cell";
      const qLabel = flag ? "flagship" : (v>=4?"strong":v===3?"consistent":v===2?"developing":"early");
      delay += 0.014;
      s += `<rect class="${cls}" x="${cx.toFixed(1)}" y="${ry.toFixed(1)}" width="${cellW.toFixed(1)}" height="${cellH}" rx="3" fill="${fill}" stroke="${stroke}" stroke-width="${flag?1.2:0.75}" style="animation-delay:${delay.toFixed(2)}s">`
         + `<title>${rows[r]} · ${cols[c]} — ${qLabel} delivery</title></rect>`;
      if(flag){
        s += `<circle cx="${(cx+cellW/2).toFixed(1)}" cy="${(ry+cellH/2).toFixed(1)}" r="2.6" fill="#1A1A1A"/>`;
      }
    }
  }

  // legend (bottom-left)
  const legY = gridTop + gridH + 22;
  const legItems = [
    {f:"rgba(13,115,119,0.20)",t:"developing"},
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

  // ===== side metric block (amber) =====
  const sx = gridRight + 18;
  const sy = gridTop;
  const sH = gridH;
  s += `<rect x="${sx}" y="${sy.toFixed(1)}" width="${sideW}" height="${sH.toFixed(1)}" rx="6" fill="#101010" stroke="#262626"/>`;
  s += `<rect x="${sx}" y="${sy.toFixed(1)}" width="3" height="${sH.toFixed(1)}" rx="1.5" fill="#E8A838"/>`;

  s += `<text x="${sx+16}" y="${(sy+22).toFixed(1)}" font-family="Inter,sans-serif" font-size="11" fill="#909090">Profit impact</text>`;
  s += `<text x="${sx+16}" y="${(sy+54).toFixed(1)}" font-family="Inter,sans-serif" font-size="32" font-weight="600" fill="#E8A838">~$120M</text>`;
  s += `<text x="${sx+16}" y="${(sy+72).toFixed(1)}" font-family="Inter,sans-serif" font-size="10" fill="#707070">delivered across portfolio</text>`;

  // divider
  s += `<line x1="${sx+16}" y1="${(sy+90).toFixed(1)}" x2="${sx+sideW-16}" y2="${(sy+90).toFixed(1)}" stroke="#262626"/>`;

  const stats = [
    {n:"12", l:"use cases"},
    {n:"8", l:"indications"}
  ];
  let syy = sy+118;
  for(let i=0;i<stats.length;i++){
    s += `<text x="${sx+16}" y="${syy.toFixed(1)}" font-family="Inter,sans-serif" font-size="22" font-weight="600" fill="#F0F0F0">${stats[i].n}</text>`;
    s += `<text x="${sx+50}" y="${syy.toFixed(1)}" font-family="Inter,sans-serif" font-size="11" fill="#909090">${stats[i].l}</text>`;
    syy += 34;
  }

  // small footer note inside block
  s += `<text x="${sx+16}" y="${(sy+sH-16).toFixed(1)}" font-family="Inter,sans-serif" font-size="10" fill="#707070">5 flagship cells</text>`;
  s += `<rect x="${sx+sideW-26}" y="${(sy+sH-25).toFixed(1)}" width="10" height="10" rx="2" fill="#E8A838"/>`;

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

/* ==== registry + wiring ==== */
var NAME2KEY = {"Voice & Sensor Home Automation":"homeAuto","Library Book Recommendation System":"libraryRec","Major US Retailer | Item Plan & Demand Forecasting":"itemPlan","License Plate Recognition": "licensePlate", "RoboCar": "roboCar", "Music Mood Recommendation System": "musicMood", "Gujarati/Hindi → English Transliteration": "transliteration", "Natural Language → Python Platform": "nlToPython", "Plug & Predict — Treatment Pathway Predictor": "plugPredict", "Depression Detection via Social Media": "depression", "NYC Cab Demand Prediction + Dynamic Routing": "cabDemand", "Crypto Sentiment Analysis — Twitter → Bitcoin Price": "crypto", "PARTH — Predictive Analytics & Real-Time Heuristics": "parth", "Annual Sales Forecasting Revamp": "salesForecast", "Major US Energy Utility | Distribution Fault Prediction & Rerouting": "energyGrid", "Global Battery Manufacturer | Demand Forecasting": "battery", "Global Pharma Client | Patient Care Portfolio": "patientCare", "Global Pharma Client | Vaccine Smart Ordering": "vaccine", "CPG Manufacturer | Forecast Explainability": "forecastExplain"};
var VIZ = {homeAuto:viz_homeAuto,libraryRec:viz_libraryRec,itemPlan:viz_itemPlan,licensePlate:viz_licensePlate, musicMood:viz_musicMood, depression:viz_depression, parth:viz_parth, energyGrid:viz_energyGrid, causalML:viz_causalML, forecastExplain:viz_forecastExplain, salesForecast:viz_salesForecast, roboCar:viz_roboCar, crypto:viz_crypto, nlToPython:viz_nlToPython, transliteration:viz_transliteration, cabDemand:viz_cabDemand, battery:viz_battery, plugPredict:viz_plugPredict, vaccine:viz_vaccine, patientCare:viz_patientCare, impactDashboard:viz_impactDashboard, skillsRadar:viz_skillsRadar, domainDonut:viz_domainDonut};

(function(){
  function put(id, fn){
    var el=document.getElementById(id);
    if(el && typeof fn==='function'){ try{ el.innerHTML=fn(); }catch(e){ console.error('viz '+id+' failed', e); } }
  }
  function init(){
    put('skillsRadarViz', typeof viz_skillsRadar==='function' ? viz_skillsRadar : null);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
