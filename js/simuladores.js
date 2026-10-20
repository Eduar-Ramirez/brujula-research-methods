/* =====================================================================
   EXPERIMENTAR · simuladores (SVG propio, sin librerías externas)
   ===================================================================== */
(function (B) {
  "use strict";
  // ---------------- estadística mínima ----------------
  function lgamma(x) { const g = 7, c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
    if (x < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * x)) - lgamma(1 - x);
    x -= 1; let a = c[0]; const t = x + g + 0.5; for (let i = 1; i < 9; i++) a += c[i] / (x + i); return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a); }
  function betacf(a, b, x) { let qab = a + b, qap = a + 1, qam = a - 1, c = 1, d = 1 - qab * x / qap; if (Math.abs(d) < 1e-30) d = 1e-30; d = 1 / d; let h = d;
    for (let m = 1; m <= 200; m++) { const m2 = 2 * m; let aa = m * (b - m) * x / ((qam + m2) * (a + m2)); d = 1 + aa * d; if (Math.abs(d) < 1e-30) d = 1e-30; c = 1 + aa / c; if (Math.abs(c) < 1e-30) c = 1e-30; d = 1 / d; h *= d * c;
      aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2)); d = 1 + aa * d; if (Math.abs(d) < 1e-30) d = 1e-30; c = 1 + aa / c; if (Math.abs(c) < 1e-30) c = 1e-30; d = 1 / d; const del = d * c; h *= del; if (Math.abs(del - 1) < 3e-14) break; } return h; }
  function ibeta(x, a, b) { if (x <= 0) return 0; if (x >= 1) return 1; const bt = Math.exp(lgamma(a + b) - lgamma(a) - lgamma(b) + a * Math.log(x) + b * Math.log(1 - x));
    return x < (a + 1) / (a + b + 2) ? bt * betacf(a, b, x) / a : 1 - bt * betacf(b, a, 1 - x) / b; }
  const pT = (t, df) => ibeta(df / (df + t * t), df / 2, 0.5);                // p bilateral
  function qT(p, df) { let lo = 0, hi = 50; for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (pT(m, df) > p) lo = m; else hi = m; } return (lo + hi) / 2; } // t crítico (p bilateral)
  const phi = (z) => 0.5 * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * (z + 0.044715 * z ** 3) * 1.0));
  const fmtp = (p) => p < 0.001 ? "< .001" : "= " + p.toFixed(3).replace(/^0/, "");
  const f2 = (x) => (Math.round(x * 100) / 100).toFixed(2), f1 = (x) => (Math.round(x * 10) / 10).toFixed(1);
  const magnitud = (d) => { d = Math.abs(d); return d < 0.2 ? "despreciable" : d < 0.5 ? "pequeño" : d < 0.8 ? "mediano" : "grande"; };
  function rng(seed) { let s = seed >>> 0; return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  const normal = (r) => { let u = 0, v = 0; while (!u) u = r(); while (!v) v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };

  // ---------------- gráficos SVG ----------------
  function lienzo(w, h, xr, yr, opt = {}) {
    const m = { l: 46, r: 14, t: 14, b: opt.bx ? 46 : 34 }, X = (x) => m.l + (x - xr[0]) / (xr[1] - xr[0]) * (w - m.l - m.r), Y = (y) => h - m.b - (y - yr[0]) / (yr[1] - yr[0]) * (h - m.t - m.b);
    const tk = (a, b, n) => { const st = Math.pow(10, Math.floor(Math.log10((b - a) / n))), e = [1, 2, 2.5, 5, 10].map((k) => k * st).find((k) => (b - a) / k <= n) || st * 10; const r = []; for (let v = Math.ceil(a / e) * e; v <= b + 1e-9; v += e) r.push(+v.toFixed(6)); return r; };
    let s = `<svg viewBox="0 0 ${w} ${h}" class="sim-svg" role="img" aria-label="${B.esc(opt.titulo || "Gráfico")}">`;
    tk(yr[0], yr[1], 5).forEach((v) => { s += `<line x1="${m.l}" x2="${w - m.r}" y1="${Y(v)}" y2="${Y(v)}" class="rejilla-l"/><text x="${m.l - 6}" y="${Y(v) + 4}" text-anchor="end" class="eje">${v}</text>`; });
    if (!opt.sinX) tk(xr[0], xr[1], 8).forEach((v) => { s += `<text x="${X(v)}" y="${h - m.b + 16}" text-anchor="middle" class="eje">${v}</text>`; });
    s += `<line x1="${m.l}" x2="${w - m.r}" y1="${h - m.b}" y2="${h - m.b}" class="eje-l"/>`;
    if (opt.ylab) s += `<text transform="translate(12 ${(h - m.b + m.t) / 2}) rotate(-90)" text-anchor="middle" class="eje">${opt.ylab}</text>`;
    if (opt.xlab) s += `<text x="${(m.l + w - m.r) / 2}" y="${h - 4}" text-anchor="middle" class="eje">${opt.xlab}</text>`;
    return { X, Y, m, w, h, s, fin: (x) => x + "</svg>" };
  }
  const deslizador = (id, etiqueta, min, max, paso, valor, sufijo = "") =>
    `<div class="desl"><label for="${id}">${etiqueta} <output id="${id}-v">${valor}${sufijo}</output></label><input type="range" id="${id}" min="${min}" max="${max}" step="${paso}" value="${valor}" data-suf="${sufijo}"></div>`;
  const lee = (id) => Number(document.getElementById(id).value);
  function retosHtml(retos, hechos) { return `<ul class="retos">` + retos.map((r, i) => `<li class="${hechos[i] ? "hecho" : ""}"><span class="ck">${hechos[i] ? "✓" : "○"}</span><span>${r.txt}</span></li>`).join("") + "</ul>"; }
  function marcaSim(id, retos) { const S = B.S(); const prev = S.sims[id] || { usado: true, retos: [] }; prev.usado = true; prev.retos = retos.map((x, i) => x || !!(prev.retos && prev.retos[i])); S.sims[id] = prev; B.guardar(); return prev.retos; }

  // ================================================================ 1. dos grupos
  B.simulador({ id: "dos-grupos", unidad: ["fund", "t4"], icono: "📊", titulo: "Dos grupos: significación e importancia",
    resumen: "Mueve la diferencia, la dispersión y el tamaño de los grupos y observa qué pasa con t, p, el intervalo y la d de Cohen.",
    caso: "c01",
    html: () => `<p class="contexto">Contexto: réplica de Loftus y Burns. VD = aciertos de 0 a 20 en dos grupos distintos (versión no violenta y violenta).</p>
      <div class="desls">${deslizador("dg-ma", "Media no violenta", 5, 18, 0.1, 12.8)}${deslizador("dg-mb", "Media violenta", 5, 18, 0.1, 10.7)}${deslizador("dg-sd", "Desviación típica (en cada grupo)", 0.5, 6, 0.1, 3.3)}${deslizador("dg-n", "Personas por grupo", 4, 300, 1, 32)}</div>
      <div class="sim-cuerpo"><div id="dg-graf"></div><div id="dg-res" class="sim-res"></div></div>`,
    retos: [{ txt: "Consigue p &lt; .05 con un efecto <b>pequeño</b> (d &lt; 0,3). ¿Qué has tenido que cambiar?" },
            { txt: "Consigue un efecto <b>grande</b> (d ≥ 0,8) que <b>no</b> sea significativo." },
            { txt: "Con 32 personas por grupo, busca la d más pequeña que todavía da p &lt; .05." }],
    actualizar() {
      const ma = lee("dg-ma"), mb = lee("dg-mb"), sd = lee("dg-sd"), n = lee("dg-n"), dif = ma - mb, d = dif / sd, se = sd * Math.sqrt(2 / n), df = 2 * n - 2, t = dif / se, p = pT(t, df), tc = qT(0.05, df);
      const pot = phi(Math.abs(d) * Math.sqrt(n / 2) - 1.96) + phi(-Math.abs(d) * Math.sqrt(n / 2) - 1.96);
      const L = lienzo(560, 250, [0, 20], [0, 0.42 * 3.3 / Math.max(sd, 1) + 0.02], { xlab: "Aciertos", ylab: "Densidad", titulo: "Distribuciones de los dos grupos" });
      const curva = (mu, cl) => { let pts = ""; for (let x = 0; x <= 20; x += 0.2) pts += `${L.X(x)},${L.Y(Math.exp(-0.5 * ((x - mu) / sd) ** 2) / (sd * Math.sqrt(2 * Math.PI)))} `; return `<polyline points="${pts}" class="${cl}"/><line x1="${L.X(mu)}" x2="${L.X(mu)}" y1="${L.Y(0)}" y2="${L.m.t}" class="${cl} media"/>`; };
      document.getElementById("dg-graf").innerHTML = L.fin(L.s + curva(ma, "serie1") + curva(mb, "serie2")) + `<p class="leyenda-sim"><span class="s1">■ No violenta</span> <span class="s2">■ Violenta</span> · líneas verticales: medias</p>`;
      const sig = p < 0.05;
      document.getElementById("dg-res").innerHTML = `<div class="kpis"><div><b>${f2(dif)}</b>diferencia</div><div><b>${f2(d)}</b>d de Cohen</div><div><b>t(${df}) = ${f2(t)}</b>p ${fmtp(p)}</div><div><b>${Math.round(pot * 100)} %</b>potencia aprox.</div></div>
        <p>IC 95 % de la diferencia: [${f2(dif - tc * se)}, ${f2(dif + tc * se)}] aciertos.</p>
        <div class="callout ${sig ? "ok" : "warn"}">${sig ? "<b>Diferencia significativa.</b>" : "<b>Sin evidencia suficiente de diferencia.</b>"} El efecto es <b>${magnitud(d)}</b> (d = ${f2(d)}). ${sig && Math.abs(d) < 0.3 ? "Fíjate: es significativo solo porque los grupos son muy grandes. Significación no es importancia." : ""}${!sig && Math.abs(d) >= 0.5 ? "Fíjate: el efecto podría ser relevante, pero con tan pocas personas el estudio no tiene potencia para detectarlo. Ausencia de evidencia no es evidencia de ausencia." : ""}</div>`;
      return [sig && Math.abs(d) < 0.3, !sig && Math.abs(d) >= 0.8, n === 32 && sig && Math.abs(d) < 0.55];
    } });

  // ================================================================ 2. mismo grupo vs grupos distintos
  B.simulador({ id: "mismo-grupo", unidad: ["t5"], icono: "🔁", titulo: "¿Por qué el mismo grupo es más potente?",
    resumen: "Compara, con la misma diferencia, una t para grupos distintos y una t relacionada. La clave es la correlación entre condiciones.",
    caso: "c12",
    html: () => `<p class="contexto">Contexto: móvil sobre la mesa frente a guardado. VD = comprensión (0-20). Mismo número de medidas en los dos diseños.</p>
      <div class="desls">${deslizador("mg-dif", "Diferencia de medias", 0, 4, 0.1, 1.2)}${deslizador("mg-sd", "Desviación típica", 1, 6, 0.1, 3.2)}${deslizador("mg-r", "Correlación entre las dos condiciones (intra)", 0, 0.95, 0.05, 0.8)}${deslizador("mg-n", "Personas (intra) / por grupo (inter)", 5, 100, 1, 26)}</div>
      <div class="sim-cuerpo"><div id="mg-graf"></div><div id="mg-res" class="sim-res"></div></div>`,
    retos: [{ txt: "Encuentra una combinación en la que el diseño intra sea significativo y el de grupos distintos no." },
            { txt: "Pon la correlación a 0: ¿sigue ganando el diseño intra? Explica por qué." },
            { txt: "Con r = .80, ¿cuántas personas necesita el diseño intra para p &lt; .05 con una diferencia de 1?" }],
    actualizar() {
      const dif = lee("mg-dif"), sd = lee("mg-sd"), r = lee("mg-r"), n = lee("mg-n");
      const tI = dif / (sd * Math.sqrt(2 / n)), dfI = 2 * n - 2, pI = pT(tI, dfI);
      const sdd = sd * Math.sqrt(2 * (1 - r)), tR = dif / (sdd / Math.sqrt(n)), dfR = n - 1, pR = pT(tR, dfR);
      const L = lienzo(560, 230, [0, 3], [0, Math.max(6, tI * 1.2, tR * 1.2)], { sinX: true, ylab: "Valor de t", titulo: "t de cada diseño" });
      const tcI = qT(0.05, dfI), tcR = qT(0.05, dfR), bar = (x, t, cl, et) => `<rect x="${L.X(x - 0.35)}" y="${L.Y(t)}" width="${L.X(x + 0.35) - L.X(x - 0.35)}" height="${L.Y(0) - L.Y(t)}" class="${cl}" rx="4"/><text x="${L.X(x)}" y="${L.h - 18}" text-anchor="middle" class="eje">${et}</text>`;
      const crit = (x, tc) => `<line x1="${L.X(x - 0.45)}" x2="${L.X(x + 0.45)}" y1="${L.Y(tc)}" y2="${L.Y(tc)}" class="critico"/>`;
      document.getElementById("mg-graf").innerHTML = L.fin(L.s + bar(0.9, tI, "barra1", "Grupos distintos") + crit(0.9, tcI) + bar(2.1, tR, "barra2", "Mismo grupo") + crit(2.1, tcR)) + `<p class="leyenda-sim">Línea discontinua: valor de t necesario para p &lt; .05</p>`;
      document.getElementById("mg-res").innerHTML = `<div class="kpis"><div><b>t(${dfI}) = ${f2(tI)}</b>grupos distintos · p ${fmtp(pI)}</div><div><b>t(${dfR}) = ${f2(tR)}</b>mismo grupo · p ${fmtp(pR)}</div></div>
        <p>En el diseño intra, la variabilidad que cuenta es la de las <b>diferencias</b> de cada persona: DT de las diferencias = ${f2(sd)} × √(2·(1 − ${r.toFixed(2)})) = <b>${f2(sdd)}</b>. ${r > 0.5 ? "Como las dos medidas de cada persona se parecen mucho, ese ruido es pequeño." : "Con una correlación baja, las diferencias son casi tan ruidosas como las puntuaciones."}</p>
        <div class="callout info">Cuanto más se parecen las dos medidas de una misma persona (r alta), más ventaja tiene el diseño intra. Con r ≈ 0 apenas gana, e incluso pierde algo de gl. Por eso conviene cuando las diferencias individuales son grandes y estables.</div>`;
      return [pR < 0.05 && pI >= 0.05, r === 0, Math.abs(r - 0.8) < 0.01 && Math.abs(dif - 1) < 0.01 && pR < 0.05];
    } });

  // ================================================================ 3. factorial 2x2
  B.simulador({ id: "factorial", unidad: ["t6"], icono: "🔲", titulo: "Factorial 2 × 2: leer la interacción",
    resumen: "Ajusta las cuatro medias de celda y observa las medias marginales, los efectos simples y el tipo de interacción.",
    caso: "c09",
    html: () => `<p class="contexto">Contexto: trastorno afectivo estacional (León y Montero, tema 6). VD = mejoría en el inventario de Beck. Valores de partida: los de las diapositivas.</p>
      <div class="desls">${deslizador("fa-11", "Sin luz · sin esquí", 0, 12, 0.5, 2)}${deslizador("fa-12", "Sin luz · con esquí", 0, 12, 0.5, 2)}${deslizador("fa-21", "Con luz · sin esquí", 0, 12, 0.5, 4)}${deslizador("fa-22", "Con luz · con esquí", 0, 12, 0.5, 10)}</div>
      <p><label><input type="checkbox" id="fa-giro"> Poner el esquí en el eje horizontal</label></p>
      <div class="sim-cuerpo"><div id="fa-graf"></div><div id="fa-res" class="sim-res"></div></div>`,
    retos: [{ txt: "Construye un patrón <b>sin interacción</b> con los dos efectos principales distintos de cero." },
            { txt: "Construye una interacción <b>cruzada</b> en la que ningún efecto principal exista." },
            { txt: "Construye una interacción <b>ordinal</b> para la luz (siempre ayuda, pero no lo mismo)." }],
    actualizar() {
      const c = { s11: lee("fa-11"), s12: lee("fa-12"), s21: lee("fa-21"), s22: lee("fa-22") }, giro = document.getElementById("fa-giro").checked;
      const luzSin = c.s21 - c.s11, luzCon = c.s22 - c.s12, esqSin = c.s12 - c.s11, esqCon = c.s22 - c.s21;
      const mLuz = [(c.s11 + c.s12) / 2, (c.s21 + c.s22) / 2], mEsq = [(c.s11 + c.s21) / 2, (c.s12 + c.s22) / 2], inter = luzCon - luzSin, umbral = 0.75;
      const tipo = (a, b) => Math.abs(a - b) < umbral ? "sin" : (Math.abs(a) < umbral || Math.abs(b) < umbral) ? "nulo" : Math.sign(a) === Math.sign(b) ? "ordinal" : "cruzada";
      const tLuz = tipo(luzSin, luzCon), tEsq = tipo(esqSin, esqCon);
      const L = lienzo(560, 250, [0, 1], [0, 12], { sinX: true, ylab: "Mejoría (Beck)", titulo: "Gráfico de interacción", bx: true });
      const xs = [L.X(0.2), L.X(0.8)], linea = (a, b, cl) => `<polyline points="${xs[0]},${L.Y(a)} ${xs[1]},${L.Y(b)}" class="${cl}"/><circle cx="${xs[0]}" cy="${L.Y(a)}" r="5" class="${cl} p"/><circle cx="${xs[1]}" cy="${L.Y(b)}" r="5" class="${cl} p"/>`;
      const et = giro ? ["Sin esquí", "Con esquí"] : ["Sin luz", "Con luz"], leg = giro ? ["Sin luz", "Con luz"] : ["Sin esquí", "Con esquí"];
      const g = giro ? linea(c.s11, c.s12, "serie2") + linea(c.s21, c.s22, "serie1") : linea(c.s11, c.s21, "serie2") + linea(c.s12, c.s22, "serie1");
      document.getElementById("fa-graf").innerHTML = L.fin(L.s + g + `<text x="${xs[0]}" y="${L.h - 26}" text-anchor="middle" class="eje">${et[0]}</text><text x="${xs[1]}" y="${L.h - 26}" text-anchor="middle" class="eje">${et[1]}</text>`) +
        `<p class="leyenda-sim"><span class="s2">■ ${leg[0]}</span> <span class="s1">■ ${leg[1]}</span></p>`;
      const txt = { sin: "no depende del otro factor (sin interacción): su efecto principal se interpreta directamente.", nulo: "solo actúa en uno de los niveles del otro factor: mejor informar sus efectos simples.", ordinal: "siempre va en la misma dirección, pero con distinta intensidad (interacción ordinal): su efecto principal se interpreta con cautela.", cruzada: "cambia de signo según el otro factor (interacción cruzada): su efecto principal engaña; solo se interpretan los efectos simples." };
      document.getElementById("fa-res").innerHTML = `<table class="tabla mini"><tr><th></th><th>Sin esquí</th><th>Con esquí</th><th>Media marginal</th></tr>
        <tr><th>Sin luz</th><td>${c.s11}</td><td>${c.s12}</td><td>${f1(mLuz[0])}</td></tr><tr><th>Con luz</th><td>${c.s21}</td><td>${c.s22}</td><td>${f1(mLuz[1])}</td></tr>
        <tr><th>Media marginal</th><td>${f1(mEsq[0])}</td><td>${f1(mEsq[1])}</td><td></td></tr></table>
        <p><b>Efectos principales:</b> luz ${f1(mLuz[1] - mLuz[0])}; esquí ${f1(mEsq[1] - mEsq[0])}.<br><b>Efectos simples de la luz:</b> sin esquí ${f1(luzSin)}, con esquí ${f1(luzCon)}.<br><b>Efectos simples del esquí:</b> sin luz ${f1(esqSin)}, con luz ${f1(esqCon)}.<br><b>Interacción</b> (diferencia entre efectos simples): ${f1(inter)}.</p>
        <div class="callout ${tLuz === "sin" ? "ok" : tLuz === "cruzada" || tEsq === "cruzada" ? "warn" : "info"}"><b>Luz:</b> su efecto ${txt[tLuz]}<br><b>Esquí:</b> su efecto ${txt[tEsq]}</div>
        <p class="nota">Simulador descriptivo: trabaja con medias, sin error muestral. Que una interacción sea significativa depende además de la variabilidad y del tamaño de la muestra (ANOVA).</p>`;
      const ef = (x) => Math.abs(x) >= umbral;
      return [tLuz === "sin" && ef(mLuz[1] - mLuz[0]) && ef(mEsq[1] - mEsq[0]), (tLuz === "cruzada" || tEsq === "cruzada") && !ef(mLuz[1] - mLuz[0]) && !ef(mEsq[1] - mEsq[0]), tLuz === "ordinal" && luzSin > 0];
    } });

  // ================================================================ 4. caso único ABAB
  B.simulador({ id: "abab", unidad: ["t7"], icono: "📈", titulo: "Caso único: análisis visual de un ABAB",
    resumen: "Genera registros de una persona en fases A y B y aprende a juzgar nivel, tendencia, variabilidad y solapamiento.",
    html: () => `<p class="contexto">Contexto: consumo de alcohol registrado a diario por una persona (unidades por día). A = sin tratamiento; B = con tratamiento. Datos generados con fines didácticos.</p>
      <div class="desls">${deslizador("ab-a", "Nivel en las fases A", 2, 16, 0.5, 10)}${deslizador("ab-b", "Nivel en las fases B", 0, 16, 0.5, 4)}${deslizador("ab-v", "Variabilidad diaria", 0, 4, 0.1, 1.5)}${deslizador("ab-t", "Tendencia en la línea base (por sesión)", -0.6, 0.6, 0.05, 0)}${deslizador("ab-n", "Sesiones por fase", 3, 10, 1, 7)}</div>
      <p><label><input type="checkbox" id="ab-ab"> Diseño AB (sin retirada)</label> <button type="button" class="boton peq sec" id="ab-nuevo">Otra muestra</button></p>
      <div class="sim-cuerpo"><div id="ab-graf"></div><div id="ab-res" class="sim-res"></div></div>`,
    retos: [{ txt: "Haz que la línea base ya vaya bajando (tendencia negativa) y comprueba por qué un diseño AB no permitiría atribuir la mejora al tratamiento." },
            { txt: "Consigue un PND del 100 % en todas las fases B con una variabilidad de al menos 2." },
            { txt: "Con el diseño ABAB, ¿qué esperas ver en la segunda fase A si el tratamiento es la causa?" }],
    semilla: 7,
    actualizar() {
      const a = lee("ab-a"), b = lee("ab-b"), v = lee("ab-v"), tr = lee("ab-t"), n = lee("ab-n"), soloAB = document.getElementById("ab-ab").checked, r = rng(this.semilla);
      const fases = soloAB ? ["A", "B"] : ["A", "B", "A", "B"], datos = []; let k = 0;
      fases.forEach((f, i) => { for (let j = 0; j < n; j++) { const base = (f === "A" ? a : b) + (i === 0 ? tr * (j - (n - 1) / 2) : 0); datos.push({ f, i, x: k++, y: Math.max(0, base + v * normal(r)) }); } });
      const L = lienzo(560, 250, [0, k - 1], [0, 20], { xlab: "Sesión", ylab: "Unidades por día", titulo: "Registro por fases" });
      let g = L.s;
      fases.forEach((f, i) => { const xs = datos.filter((d) => d.i === i); const x0 = L.X(xs[0].x) - 6, x1 = L.X(xs[xs.length - 1].x) + 6;
        g += `<rect x="${x0}" y="${L.m.t}" width="${x1 - x0}" height="${L.Y(0) - L.m.t}" class="${f === "A" ? "faseA" : "faseB"}"/><text x="${(x0 + x1) / 2}" y="${L.m.t + 14}" text-anchor="middle" class="eje fuerte">${f}${Math.floor(i / 2) + 1}</text>`;
        const m = xs.reduce((s, d) => s + d.y, 0) / xs.length; g += `<line x1="${x0 + 4}" x2="${x1 - 4}" y1="${L.Y(m)}" y2="${L.Y(m)}" class="media-fase"/>`;
        g += `<polyline points="${xs.map((d) => L.X(d.x) + "," + L.Y(d.y)).join(" ")}" class="serie1"/>` + xs.map((d) => `<circle cx="${L.X(d.x)}" cy="${L.Y(d.y)}" r="3.5" class="serie1 p"/>`).join(""); });
      document.getElementById("ab-graf").innerHTML = L.fin(g) + `<p class="leyenda-sim">Línea discontinua: media de cada fase</p>`;
      const fase = (i) => datos.filter((d) => d.i === i).map((d) => d.y), media = (x) => x.reduce((s, y) => s + y, 0) / x.length;
      const pnd = (ai, bi) => { const mn = Math.min(...fase(ai)); return fase(bi).filter((y) => y < mn).length / fase(bi).length; };
      const pnds = soloAB ? [pnd(0, 1)] : [pnd(0, 1), pnd(2, 3)];
      const pend = (() => { const xs = fase(0), mx = (xs.length - 1) / 2; let num = 0, den = 0; xs.forEach((y, j) => { num += (j - mx) * (y - media(xs)); den += (j - mx) ** 2; }); return num / den; })();
      document.getElementById("ab-res").innerHTML = `<div class="kpis">${fases.map((f, i) => `<div><b>${f1(media(fase(i)))}</b>media ${f}${Math.floor(i / 2) + 1}</div>`).join("")}</div>
        <p><b>No solapamiento (PND):</b> ${pnds.map((x, i) => `B${i + 1}: ${Math.round(x * 100)} %`).join(" · ")} de los puntos de B quedan por debajo del mínimo de la A anterior.</p>
        <p><b>Tendencia en la primera línea base:</b> ${f2(pend)} por sesión. ${pend < -0.2 ? "<b>Cuidado:</b> el consumo ya bajaba antes del tratamiento; parte de la mejora podría deberse a esa tendencia (o a la historia o la maduración)." : pend > 0.2 ? "El consumo subía antes del tratamiento: un descenso en B sería más convincente." : "Línea base estable: buena referencia."}</p>
        <div class="callout ${soloAB ? "warn" : "info"}">${soloAB ? "<b>Diseño AB:</b> aunque el cambio sea claro, cualquier suceso que coincida con el inicio de B podría explicarlo. Es el diseño de caso único con menos validez interna." : "<b>Diseño ABAB:</b> si el consumo vuelve a subir al retirar el tratamiento (A2) y baja de nuevo al reintroducirlo (B2), es difícil que otra cosa explique ese patrón doble. Si la retirada no es ética o el cambio es irreversible, se usa una línea base múltiple."}</div>
        <p class="nota">El análisis visual mira cuatro cosas: nivel, tendencia, variabilidad y solapamiento entre fases.</p>`;
      return [soloAB && pend < -0.2, pnds.every((x) => x === 1) && v >= 2, !soloAB && media(fase(2)) > media(fase(1)) + 2 && media(fase(3)) < media(fase(2)) - 2];
    } });

  // ================================================================ 5. laboratorio del café (simetría e independencia)
  B.simulador({ id: "cafe-2x2", unidad: ["t6"], icono: "☕", titulo: "Laboratorio del café: simetría e independencia",
    resumen: "Café × horas de sueño. Mueve las casillas o los efectos y comprueba por qué la interacción es la misma desde las dos VI y por qué no depende de los efectos principales.",
    caso: "c09",
    html() { this.prev = null; return `<p class="contexto">Contexto: dos VI, <b>café</b> (sin / con) y <b>horas de sueño</b> (8 h / 4 h). VD = atención (0-14 puntos). Datos de ejemplo, sin error muestral.</p>
      <div class="cf-esc" role="group" aria-label="Escenarios">${[["Ejemplo del café", "8,4,8,7"], ["Solo café", "5,5,8,8"], ["Dos efectos sin interacción", "8,4,10,6"], ["Interacción cruzada", "8,4,5,7"], ["Sin efectos principales", "8,4,4,8"]].map(([t, v]) => `<button type="button" class="boton peq sec" data-cf="${v}">${t}</button>`).join("")}</div>
      <p><label><input type="checkbox" id="cf-modo"> Mover los <b>efectos</b> en lugar de las casillas</label></p>
      <div class="desls" id="cf-celdas">${deslizador("cf-n8", "Sin café · 8 h", 0, 14, 0.5, 8)}${deslizador("cf-n4", "Sin café · 4 h", 0, 14, 0.5, 4)}${deslizador("cf-c8", "Con café · 8 h", 0, 14, 0.5, 8)}${deslizador("cf-c4", "Con café · 4 h", 0, 14, 0.5, 7)}</div>
      <div class="desls" id="cf-efectos" hidden>${deslizador("cf-mu", "Media general", 2, 12, 0.25, 6.75)}${deslizador("cf-a", "Efecto principal del café", -6, 6, 0.5, 1.5)}${deslizador("cf-b", "Efecto principal de dormir 4 h", -6, 6, 0.5, -2.5)}${deslizador("cf-i", "Interacción", -8, 8, 0.5, 3)}</div>
      <p class="nota" id="cf-aviso"></p>
      <div class="cf-graficos"><div><h4>Sueño en el eje X · café como líneas</h4><div id="cf-gA"></div><p class="leyenda-sim"><span class="s1">■ Sin café</span> <span class="s2">■ Con café</span></p><p class="cf-pie" id="cf-pA"></p></div>
        <div><h4>Café en el eje X · sueño como líneas</h4><div id="cf-gB"></div><p class="leyenda-sim"><span class="s3">■ 8 h de sueño</span> <span class="s4">■ 4 h de sueño</span></p><p class="cf-pie" id="cf-pB"></p></div></div>
      <div id="cf-res" class="sim-res"></div>`; },
    retos: [{ txt: "Consigue <b>líneas paralelas</b> (interacción 0) con un efecto del café distinto de cero. ¿Cuánto vale la interacción en el otro gráfico?" },
            { txt: "Consigue una interacción de <b>±4</b> con los <b>dos efectos principales a 0</b>. Pista: activa «Mover los efectos»." },
            { txt: "Busca un patrón <b>cruzado en un gráfico y ordinal en el otro</b>. Pista: prueba 8, 2, 6, 4." }],
    actualizar() {
      const ids = { n8: "cf-n8", n4: "cf-n4", c8: "cf-c8", c4: "cf-c4" }, eids = { mu: "cf-mu", a: "cf-a", b: "cf-b", i: "cf-i" };
      const set = (id, v) => { const el = document.getElementById(id); el.value = v; document.getElementById(id + "-v").textContent = el.value; };
      const modoEf = document.getElementById("cf-modo").checked;
      document.getElementById("cf-celdas").hidden = modoEf; document.getElementById("cf-efectos").hidden = !modoEf;
      // escenarios (se enlazan una vez)
      document.querySelectorAll("[data-cf]").forEach((b) => { if (b.dataset.on) return; b.dataset.on = 1; b.addEventListener("click", () => {
        const v = b.dataset.cf.split(",").map(Number); document.getElementById("cf-modo").checked = false;
        ["cf-n8", "cf-n4", "cf-c8", "cf-c4"].forEach((id, k) => set(id, v[k])); this.prev = null; document.getElementById("cf-n8").dispatchEvent(new Event("input", { bubbles: true })); }); });
      // estado exacto en this.C (los deslizadores redondean; así no se pierde precisión al cambiar de modo)
      const deCeldas = (c) => ({ mu: (c.n8 + c.n4 + c.c8 + c.c4) / 4, a: ((c.c8 + c.c4) - (c.n8 + c.n4)) / 2, b: ((c.n4 + c.c4) - (c.n8 + c.c8)) / 2, i: (c.c4 - c.n4) - (c.c8 - c.n8) });
      const deEfectos = (e) => ({ n8: e.mu - e.a / 2 - e.b / 2 + e.i / 4, n4: e.mu - e.a / 2 + e.b / 2 - e.i / 4, c8: e.mu + e.a / 2 - e.b / 2 - e.i / 4, c4: e.mu + e.a / 2 + e.b / 2 + e.i / 4 });
      const leeG = (m) => Object.fromEntries(Object.entries(m).map(([k, id]) => [k, lee(id)]));
      const igual = (x, y) => Object.keys(x).every((k) => Math.abs(x[k] - y[k]) < 1e-9);
      const SC = leeG(ids), SE = leeG(eids);
      if (!this.prev) this.C = { ...SC };
      else if (!modoEf && !igual(SC, this.prev.SC)) this.C = { ...SC };
      else if (modoEf && !igual(SE, this.prev.SE)) this.C = deEfectos(SE);
      let C = this.C; const E = deCeldas(C);
      if (modoEf) Object.entries(ids).forEach(([k, id]) => set(id, C[k])); else Object.entries(eids).forEach(([k, id]) => set(id, E[k]));
      if (!modoEf) Object.entries(ids).forEach(([k, id]) => { document.getElementById(id + "-v").textContent = String(Math.round(C[k] * 100) / 100).replace(".", ","); });
      else Object.entries(eids).forEach(([k, id]) => { document.getElementById(id + "-v").textContent = String(Math.round(SE[k] * 100) / 100).replace(".", ","); });
      this.prev = { SC: leeG(ids), SE: leeG(eids) };
      const fuera = Object.values(C).some((v) => v < -1e-9 || v > 14 + 1e-9);
      document.getElementById("cf-aviso").textContent = fuera ? "Alguna casilla queda fuera de la escala 0-14; el gráfico amplía el eje." : "";
      const s = (x) => { const r = Math.round(x * 100) / 100; return (r > 0 ? "+" : r < 0 ? "−" : "") + String(Math.abs(r)).replace(".", ","); }, n = (x) => String(Math.round(x * 100) / 100).replace(".", ",");
      const cafe8 = C.c8 - C.n8, cafe4 = C.c4 - C.n4, suenoNo = C.n4 - C.n8, suenoSi = C.c4 - C.c8;
      const U = 0.25, tipo = (e1, e2) => Math.abs(e1 - e2) < U ? "sin" : (Math.abs(e1) < U || Math.abs(e2) < U) ? "nulo" : Math.sign(e1) === Math.sign(e2) ? "ordinal" : "cruzada";
      const tA = tipo(cafe8, cafe4), tB = tipo(suenoNo, suenoSi);
      const vals = Object.values(C), lo = Math.min(0, Math.floor(Math.min(...vals))), hi = Math.max(14, Math.ceil(Math.max(...vals)));
      const graf = (l1, l2, c1, c2, cats, n1, n2) => {
        const L = lienzo(420, 260, [0, 1], [lo, hi], { sinX: true, bx: true, ylab: "Atención", titulo: "Gráfico de interacción" }), xs = [L.X(0.22), L.X(0.72)];
        let g = L.s;
        [0, 1].forEach((j) => { const a = l1[j], b = l2[j]; if (Math.abs(a - b) < 0.01) return; const xx = xs[j] - 20;
          g += `<line x1="${xx}" x2="${xx}" y1="${L.Y(a)}" y2="${L.Y(b)}" class="cf-sep"/><line x1="${xx - 4}" x2="${xx + 4}" y1="${L.Y(a)}" y2="${L.Y(a)}" class="cf-sep"/><line x1="${xx - 4}" x2="${xx + 4}" y1="${L.Y(b)}" y2="${L.Y(b)}" class="cf-sep"/><text x="${xx - 6}" y="${(L.Y(a) + L.Y(b)) / 2 + 4}" text-anchor="end" class="eje cf-sep-t">${s(b - a)}</text>`; });
        [[l1, c1, n1], [l2, c2, n2]].forEach(([l, c, nm], k) => { g += `<polyline points="${xs[0]},${L.Y(l[0])} ${xs[1]},${L.Y(l[1])}" class="${c}"/><circle cx="${xs[0]}" cy="${L.Y(l[0])}" r="5" class="${c} p"/><circle cx="${xs[1]}" cy="${L.Y(l[1])}" r="5" class="${c} p"/>`;
          const dy = L.Y(l1[1]) - L.Y(l2[1]), cerca = Math.abs(dy) < 16, arriba = k === 0 ? dy <= 0 : dy > 0;
          g += `<text x="${xs[1] + 10}" y="${L.Y(l[1]) + (cerca ? (arriba ? -6 : 14) : 4)}" class="eje fuerte">${nm} (${n(l[1])})</text>`; });
        g += `<text x="${xs[0]}" y="${L.h - 26}" text-anchor="middle" class="eje fuerte">${cats[0]}</text><text x="${xs[1]}" y="${L.h - 26}" text-anchor="middle" class="eje fuerte">${cats[1]}</text>`;
        return L.fin(g); };
      document.getElementById("cf-gA").innerHTML = graf([C.n8, C.n4], [C.c8, C.c4], "serie1", "serie2", ["8 h", "4 h"], "Sin café", "Con café");
      document.getElementById("cf-gB").innerHTML = graf([C.n8, C.c8], [C.n4, C.c4], "serie3", "serie4", ["Sin café", "Con café"], "8 h", "4 h");
      const nombre = { sin: "líneas paralelas, sin interacción", nulo: "la VI solo actúa en uno de los niveles", ordinal: "interacción ordinal en este gráfico", cruzada: "interacción cruzada en este gráfico" };
      document.getElementById("cf-pA").innerHTML = `Separación (efecto del café): <b>${s(cafe8)}</b> con 8 h y <b>${s(cafe4)}</b> con 4 h. Cambia en <b>${s(cafe4 - cafe8)}</b>: ${nombre[tA]}.`;
      document.getElementById("cf-pB").innerHTML = `Separación (efecto de dormir 4 h): <b>${s(suenoNo)}</b> sin café y <b>${s(suenoSi)}</b> con café. Cambia en <b>${s(suenoSi - suenoNo)}</b>: ${nombre[tB]}.`;
      const barra = (et, v, max, cl) => { const w = Math.min(50, Math.abs(v) / max * 50); return `<div class="cf-barra"><span>${et}</span><span class="cf-pista"><i class="${cl}" style="width:${w}%;left:${v >= 0 ? 50 : 50 - w}%"></i></span><b>${s(v)}</b></div>`; };
      const hay = Math.abs(E.i) >= U;
      const ver = !hay ? `El efecto del café es el mismo con 8 h y con 4 h (${s(cafe8)}): <b>no hay interacción</b> y el efecto principal del café (${s(E.a)}) resume bien los datos.`
        : `El efecto del café cambia según el sueño (${s(cafe8)} con 8 h, ${s(cafe4)} con 4 h): <b>hay interacción</b> de ${s(E.i)}. ` +
          (tA === "cruzada" || tB === "cruzada" ? "Al menos en un gráfico cambia de signo (cruzada): el efecto principal promedia efectos opuestos; cuenta la historia con los efectos simples." : `El efecto principal del café (${s(E.a)}) es un promedio que no describe a nadie en concreto: matízalo con los efectos simples.`);
      document.getElementById("cf-res").innerHTML = `<table class="tabla mini"><tr><th></th><th>8 h</th><th>4 h</th><th>Media marginal</th></tr>
          <tr><th>Sin café</th><td>${n(C.n8)}</td><td>${n(C.n4)}</td><td>${n((C.n8 + C.n4) / 2)}</td></tr><tr><th>Con café</th><td>${n(C.c8)}</td><td>${n(C.c4)}</td><td>${n((C.c8 + C.c4) / 2)}</td></tr>
          <tr><th>Media marginal</th><td>${n((C.n8 + C.c8) / 2)}</td><td>${n((C.n4 + C.c4) / 2)}</td><td>${n(E.mu)}</td></tr></table>
        <div class="kpis"><div><b>${s(cafe8)} / ${s(cafe4)}</b>efectos simples del café (8 h / 4 h)</div><div><b>${s(E.a)}</b>efecto principal del café</div><div><b>${s(E.b)}</b>efecto principal de dormir 4 h</div><div><b>${s(E.i)}</b>interacción</div></div>
        <div class="callout ${hay ? "warn" : "ok"}">${ver}</div>
        <div class="cf-ideas"><div class="callout info"><b>1 · Es simétrica.</b> Desde el café: (${s(cafe4)}) − (${s(cafe8)}) = <b>${s(cafe4 - cafe8)}</b>. Desde el sueño: (${s(suenoSi)}) − (${s(suenoNo)}) = <b>${s(suenoSi - suenoNo)}</b>. Siempre sale el mismo número: la interacción es de las dos VI.</div>
          <div class="callout info"><b>2 · Es independiente.</b> Activa «Mover los efectos» y mueve solo la interacción: cambian las casillas, pero los efectos principales no.${barra("Café", E.a, 6, "cf-b1")}${barra("Sueño", E.b, 6, "cf-b2")}${barra("Interacción", E.i, 8, "cf-b3")}</div></div>
        <p class="nota">Simulador descriptivo: trabaja con medias, sin error muestral. En el ANOVA, cada uno de estos tres efectos tiene su propia F.</p>`;
      const ef = (x) => Math.abs(x) >= U;
      return [!hay && ef(E.a), Math.abs(Math.abs(E.i) - 4) < 0.01 && !ef(E.a) && !ef(E.b), (tA === "cruzada" && tB === "ordinal") || (tA === "ordinal" && tB === "cruzada")];
    } });

  // ---------------- vistas ----------------
  B.vista("simuladores", (main) => {
    main.innerHTML = `<section class="tarjeta cabecera-vista"><h1>Simuladores</h1><p class="lead">Laboratorios de «¿qué pasaría si…?». Mueve los controles, observa y completa los retos: así se entiende por qué cambian la p, el tamaño del efecto o la lectura de un gráfico.</p></section>
      <div class="rejilla">${Object.values(B.simuladores).map((s) => { const est = B.S().sims[s.id]; const n = est ? (est.retos || []).filter(Boolean).length : 0;
        return `<article class="caso-t ${n === s.retos.length ? "completado" : est ? "en-curso" : ""}"><div class="cab"><span class="icono-g">${s.icono}</span>${s.unidad.map(B.chipUnidad).join("")}</div><h4>${s.titulo}</h4><p>${s.resumen}</p>
          <div class="pie-t"><span class="estado">${n} de ${s.retos.length} retos</span><a class="boton peq" href="#simulador/${s.id}">Abrir</a></div></article>`; }).join("")}</div>`;
  });
  B.vista("simulador", (main, [id]) => {
    const s = B.simuladores[id]; if (!s) { B.ir("simuladores"); return; }
    main.innerHTML = `<p class="miga"><a href="#simuladores">Simuladores</a> › ${s.titulo} ${s.unidad.map(B.chipUnidad).join("")}</p>
      <section class="tarjeta sim"><h1>${s.icono} ${s.titulo}</h1><p class="lead">${s.resumen}</p>${s.html()}</section>
      <section class="tarjeta"><h3>Retos</h3><div id="sim-retos"></div>${s.caso && B.POR_CASO && B.POR_CASO[s.caso] ? `<p class="nota">Para practicar con datos: <a href="#caso/${s.caso}">caso ${B.POR_CASO[s.caso].num} · ${B.POR_CASO[s.caso].titulo}</a>.</p>` : ""}</section>`;
    // los retos solo cuentan cuando el estudiante mueve algo (no con los valores de partida)
    const pinta = (interaccion) => { B.$$(".desl input").forEach((x) => { document.getElementById(x.id + "-v").textContent = x.value + (x.dataset.suf || ""); }); const r = s.actualizar();
      const prev = B.S().sims[s.id], hechos = interaccion ? marcaSim(s.id, r) : s.retos.map((_, i) => !!(prev && prev.retos && prev.retos[i])); document.getElementById("sim-retos").innerHTML = retosHtml(s.retos, hechos); };
    main.querySelectorAll("input").forEach((x) => x.addEventListener("input", () => pinta(true)));
    const nuevo = document.getElementById("ab-nuevo"); if (nuevo) nuevo.addEventListener("click", () => { s.semilla += 1; pinta(true); });
    pinta(false);
  });
  B.estad = { pT, qT };
})(window.Brujula);
