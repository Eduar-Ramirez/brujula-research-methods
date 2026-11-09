/* =====================================================================
   SIMULADORES DEL PARCIAL 2 (semanas 8-11) · versión 3, noviembre de 2026
   Regresión a la media, serie temporal interrumpida, tercera variable (Simpson),
   muestreo, potencia y acuerdo entre observadores. Datos generados con fines docentes.
   ===================================================================== */
(function (B) {
  "use strict";
  const { lienzo, deslizador, lee, rng, normal, f1, f2, phi } = B.simAux;
  const media = (x) => x.reduce((a, b) => a + b, 0) / (x.length || 1);
  const dt = (x) => { const m = media(x); return Math.sqrt(x.reduce((a, b) => a + (b - m) ** 2, 0) / Math.max(1, x.length - 1)); };
  const corr = (x, y) => { const mx = media(x), my = media(y); let n = 0, a = 0, b = 0; x.forEach((v, i) => { n += (v - mx) * (y[i] - my); a += (v - mx) ** 2; b += (y[i] - my) ** 2; }); return n / Math.sqrt(a * b); };
  const coma = (s) => String(s).replace(".", ",");
  // cuantil normal (Acklam)
  function qnorm(p) {
    const a = [-39.6968302866538, 220.946098424521, -275.928510446969, 138.357751867269, -30.6647980661472, 2.50662827745924], b = [-54.4760987982241, 161.585836858041, -155.698979859887, 66.8013118877197, -13.2806815528857],
      c = [-0.00778489400243029, -0.322396458041136, -2.40075827716184, -2.54973253934373, 4.37466414146497, 2.93816398269878], d = [0.00778469570904146, 0.32246712907004, 2.445134137143, 3.75440866190742];
    const pl = 0.02425; let q, r;
    if (p < pl) { q = Math.sqrt(-2 * Math.log(p)); return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
    if (p > 1 - pl) { q = Math.sqrt(-2 * Math.log(1 - p)); return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
    q = p - 0.5; r = q * q; return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  }
  B.qnorm = qnorm;

  // ================================================================ 6. regresión a la media
  B.simulador({ id: "regresion-media", unidad: ["cuasi"], icono: "↩️", titulo: "Regresión a la media: mejorar sin tratamiento",
    resumen: "Selecciona a quienes peor puntúan en un pretest y míralos «mejorar» en el postest sin recibir nada. Descubre qué papel juega la fiabilidad de la medida.",
    caso: "c16",
    html: () => `<p class="contexto">Contexto: 300 estudiantes responden dos veces la misma prueba de atención, con dos semanas de diferencia. <b>Nadie recibe ningún tratamiento.</b> Cada puntuación = nivel real + error de medida.</p>
      <div class="desls">${deslizador("rm-fia", "Fiabilidad de la prueba", 0.3, 0.98, 0.01, 0.6)}${deslizador("rm-sel", "Se selecciona al … % con peor pretest", 5, 50, 5, 10, " %")}</div>
      <p><label><input type="checkbox" id="rm-ctrl"> Añadir un grupo de comparación igual de extremo (tampoco recibe nada)</label> <button type="button" class="boton peq sec" data-sim-nuevo>Otra muestra</button></p>
      <div class="sim-cuerpo"><div id="rm-graf"></div><div id="rm-res" class="sim-res"></div></div>`,
    retos: [{ txt: "Consigue que el grupo seleccionado «mejore» más de 5 puntos sin ningún tratamiento." },
            { txt: "Sube la fiabilidad por encima de .90 y comprueba que la mejora aparente casi desaparece." },
            { txt: "Activa el grupo de comparación: ¿cuánto «mejora» respecto al seleccionado?" }],
    semilla: 11,
    actualizar() {
      const fia = lee("rm-fia"), sel = lee("rm-sel") / 100, ctrl = document.getElementById("rm-ctrl").checked, r = rng(this.semilla);
      const sdT = 10 * Math.sqrt(fia), sdE = 10 * Math.sqrt(1 - fia), N = 300;
      const gen = () => Array.from({ length: N }, () => { const t = 50 + sdT * normal(r); return { pre: t + sdE * normal(r), post: t + sdE * normal(r) }; });
      const P = gen(), corte = P.map((p) => p.pre).sort((a, b) => a - b)[Math.floor(N * sel) - 1];
      const S = P.filter((p) => p.pre <= corte);
      let C = []; if (ctrl) { const Q = gen(); const c2 = Q.map((p) => p.pre).sort((a, b) => a - b)[Math.floor(N * sel) - 1]; C = Q.filter((p) => p.pre <= c2); }
      const L = lienzo(420, 300, [15, 85], [15, 85], { xlab: "Pretest", ylab: "Postest", titulo: "Pretest frente a postest" });
      let g = L.s + `<line x1="${L.X(15)}" y1="${L.Y(15)}" x2="${L.X(85)}" y2="${L.Y(85)}" class="media-fase"/><line x1="${L.X(corte)}" x2="${L.X(corte)}" y1="${L.Y(15)}" y2="${L.Y(85)}" class="eje-l" stroke-dasharray="3 3"/>`;
      P.forEach((p) => { const s = p.pre <= corte; g += `<circle cx="${L.X(Math.max(15, Math.min(85, p.pre)))}" cy="${L.Y(Math.max(15, Math.min(85, p.post)))}" r="${s ? 3.4 : 2.2}" class="${s ? "serie2 p" : "rm-gris"}"/>`; });
      document.getElementById("rm-graf").innerHTML = L.fin(g) + `<p class="leyenda-sim">Naranja: seleccionados. Diagonal: misma puntuación en pre y post.</p>`;
      const mpre = media(S.map((p) => p.pre)), mpost = media(S.map((p) => p.post)), mej = mpost - mpre;
      const mejC = ctrl ? media(C.map((p) => p.post)) - media(C.map((p) => p.pre)) : null;
      document.getElementById("rm-res").innerHTML = `<div class="kpis"><div><b>${f1(mpre)}</b>pretest de los seleccionados</div><div><b>${f1(mpost)}</b>postest</div><div><b>${mej > 0 ? "+" : ""}${f1(mej)}</b>«mejora» sin tratamiento</div>${ctrl ? `<div><b>${mejC > 0 ? "+" : ""}${f1(mejC)}</b>«mejora» del grupo de comparación</div>` : ""}</div>
        <div class="callout ${mej > 3 ? "warn" : "info"}">${mej > 3 ? "Los seleccionados se acercan a la media (50) en el postest aunque nadie haya hecho nada: parte de su pretest tan bajo era <b>mala suerte</b> (error de medida) que no se repite." : "Con una medida fiable, el pretest refleja casi solo el nivel real y la regresión a la media es pequeña."}</div>
        ${ctrl ? `<p>Si este grupo hubiera recibido un programa, su efecto real sería la <b>diferencia de mejoras</b>: ${f1(mej - mejC)} puntos. Por eso un grupo de comparación igual de extremo neutraliza la regresión a la media.</p>` : "<p>Si aquí hubiéramos aplicado un programa, habríamos atribuido toda esta «mejora» al programa.</p>"}
        <p class="nota">La regresión a la media es mayor cuanto más extremos son los seleccionados y cuanto menos fiable es la medida (correlación pre-post = ${f2(corr(P.map((p) => p.pre), P.map((p) => p.post)))}).</p>`;
      return [mej > 5, fia >= 0.9 && Math.abs(mej) < 2, ctrl && Math.abs(mej - mejC) < 1.5];
    } });

  // ================================================================ 7. serie temporal interrumpida
  B.simulador({ id: "serie-temporal", unidad: ["cuasi"], icono: "📉", titulo: "Serie temporal interrumpida",
    resumen: "Una ciudad limita la velocidad en el mes 25. Ajusta la tendencia previa, el efecto y un suceso histórico, y compara con una ciudad que no cambió nada.",
    html: () => `<p class="contexto">Contexto: accidentes mensuales durante 4 años. La norma entra en vigor en el mes 25 (línea vertical). Datos generados con fines didácticos.</p>
      <div class="desls">${deslizador("st-ten", "Tendencia previa (accidentes por mes)", -0.6, 0.6, 0.05, 0)}${deslizador("st-niv", "Efecto de la norma: cambio de nivel", -20, 5, 1, -10)}${deslizador("st-pen", "Efecto de la norma: cambio de pendiente", -0.8, 0.4, 0.05, 0)}${deslizador("st-ruido", "Variabilidad mensual", 1, 10, 0.5, 4)}</div>
      <p><label><input type="checkbox" id="st-hist"> Suceso histórico en el mes 25 (una campaña nacional que baja 8 accidentes en todas partes)</label><br><label><input type="checkbox" id="st-ctrl"> Mostrar la ciudad de comparación (sin la norma)</label> <button type="button" class="boton peq sec" data-sim-nuevo>Otra muestra</button></p>
      <div class="sim-cuerpo"><div id="st-graf"></div><div id="st-res" class="sim-res"></div></div>`,
    retos: [{ txt: "Pon el efecto de la norma a 0 y una tendencia previa descendente: ¿qué concluiría quien solo comparara la media de antes con la de después?" },
            { txt: "Activa el suceso histórico y la ciudad de comparación: ¿se puede atribuir la caída a la norma?" },
            { txt: "Crea un efecto que solo cambie la pendiente (nivel 0, pendiente negativa)." }],
    semilla: 5,
    actualizar() {
      const ten = lee("st-ten"), niv = lee("st-niv"), pen = lee("st-pen"), ru = lee("st-ruido"), hist = document.getElementById("st-hist").checked, ctrl = document.getElementById("st-ctrl").checked, r = rng(this.semilla);
      const T = 48, k = 25, base = 60;
      const tr = [], co = [];
      for (let t = 1; t <= T; t++) { const post = t >= k; const h = hist && post ? -8 : 0;
        tr.push(base + ten * (t - k) + (post ? niv + pen * (t - k) : 0) + h + ru * normal(r));
        co.push(base - 5 + ten * (t - k) + h + ru * normal(r)); }
      // regresión segmentada: y = b0 + b1 t + b2 D + b3 (t-k)D
      const X = tr.map((_, i) => { const t = i + 1, D = t >= k ? 1 : 0; return [1, t - k, D, (t - k) * D]; });
      const beta = ols(X, tr), betaC = ols(X, co);
      const mAntes = media(tr.slice(0, k - 1)), mDesp = media(tr.slice(k - 1));
      const lo = Math.min(...tr, ...(ctrl ? co : [])) - 5, hi = Math.max(...tr, ...(ctrl ? co : [])) + 5;
      const L = lienzo(560, 260, [1, T], [Math.floor(lo), Math.ceil(hi)], { xlab: "Mes", ylab: "Accidentes", titulo: "Serie temporal" });
      let g = L.s + `<line x1="${L.X(k - 0.5)}" x2="${L.X(k - 0.5)}" y1="${L.m.t}" y2="${L.Y(Math.floor(lo))}" class="eje-l" stroke-dasharray="4 3"/><text x="${L.X(k - 0.5) + 4}" y="${L.m.t + 12}" class="eje fuerte">norma</text>`;
      const linea = (y, cl) => `<polyline points="${y.map((v, i) => L.X(i + 1) + "," + L.Y(v)).join(" ")}" class="${cl}"/>` + y.map((v, i) => `<circle cx="${L.X(i + 1)}" cy="${L.Y(v)}" r="2.6" class="${cl} p"/>`).join("");
      if (ctrl) g += linea(co, "serie2");
      g += linea(tr, "serie1");
      const ajuste = (b, desde, hasta) => { let pts = []; for (let t = desde; t <= hasta; t++) { const D = t >= k ? 1 : 0; pts.push(L.X(t) + "," + L.Y(b[0] + b[1] * (t - k) + b[2] * D + b[3] * (t - k) * D)); } return `<polyline points="${pts.join(" ")}" class="media-fase"/>`; };
      g += ajuste(beta, 1, k - 1) + ajuste(beta, k, T);
      document.getElementById("st-graf").innerHTML = L.fin(g) + `<p class="leyenda-sim">Azul: ciudad con la norma${ctrl ? "; naranja: ciudad de comparación" : ""}. Discontinua: recta ajustada antes y después.</p>`;
      const sg = (x) => (x > 0 ? "+" : "") + f1(x);
      document.getElementById("st-res").innerHTML = `<div class="kpis"><div><b>${sg(mDesp - mAntes)}</b>media después − media antes</div><div><b>${sg(beta[2])}</b>cambio de nivel estimado</div><div><b>${sg(beta[3])}</b>cambio de pendiente estimado</div>${ctrl ? `<div><b>${sg(betaC[2])}</b>cambio de nivel en la ciudad de comparación</div>` : ""}</div>
        <div class="callout ${Math.abs(mDesp - mAntes) > 5 && Math.abs(niv) < 1 && Math.abs(pen) < 0.05 ? "warn" : "info"}">${Math.abs(niv) < 1 && Math.abs(pen) < 0.05 && Math.abs(ten) > 0.2 ? "La norma no tiene efecto, pero la media de después es distinta de la de antes porque la serie <b>ya cambiaba</b>. Un pre-post con dos medidas lo atribuiría a la norma; la serie larga lo desenmascara." : "La regresión segmentada estima si la serie se rompe justo en el mes de la norma: un salto (nivel) o un cambio de inclinación (pendiente)."}</div>
        ${hist ? `<div class="callout warn"><b>Historia:</b> la campaña coincide con la norma. ${ctrl ? `La ciudad de comparación también baja (${sg(betaC[2])}): parte de la caída no se debe a la norma. El efecto atribuible es aproximadamente ${sg(beta[2] - betaC[2])}.` : "Sin una serie de comparación no podemos separar el efecto de la norma del de la campaña."}</div>` : ""}
        <p class="nota">Análisis: regresión segmentada (cambio de nivel y de pendiente). Simulador descriptivo; no calcula la autocorrelación de la serie.</p>`;
      return [Math.abs(niv) < 1 && Math.abs(pen) < 0.05 && ten <= -0.3 && mDesp - mAntes < -4, hist && ctrl, Math.abs(niv) < 1 && pen <= -0.2];
    } });
  function ols(X, y) { // mínimos cuadrados con 4 columnas (ecuaciones normales + Gauss)
    const p = X[0].length, A = Array.from({ length: p }, () => Array(p + 1).fill(0));
    X.forEach((x, i) => { for (let a = 0; a < p; a++) { for (let b = 0; b < p; b++) A[a][b] += x[a] * x[b]; A[a][p] += x[a] * y[i]; } });
    for (let c = 0; c < p; c++) { let m = c; for (let r = c + 1; r < p; r++) if (Math.abs(A[r][c]) > Math.abs(A[m][c])) m = r; [A[c], A[m]] = [A[m], A[c]];
      for (let r = 0; r < p; r++) if (r !== c) { const f = A[r][c] / A[c][c]; for (let k = c; k <= p; k++) A[r][k] -= f * A[c][k]; } }
    return A.map((row, i) => row[p] / row[i]);
  }

  // ================================================================ 8. tercera variable / Simpson
  B.simulador({ id: "tercera-variable", unidad: ["epf"], icono: "🔀", titulo: "La tercera variable y la paradoja de Simpson",
    resumen: "Ejercicio y colesterol en jóvenes y mayores. Mueve el papel de la edad y mira cómo la correlación global puede llegar a invertir la de cada grupo.",
    html: () => `<p class="contexto">Contexto: 120 personas (60 jóvenes y 60 mayores). Medimos horas de ejercicio a la semana y colesterol. Datos generados con fines didácticos.</p>
      <div class="desls">${deslizador("tv-ej", "Cuánto más ejercicio hacen los mayores (h/semana)", 0, 6, 0.5, 4)}${deslizador("tv-edad", "Cuánto más colesterol tienen los mayores", 0, 60, 5, 40)}${deslizador("tv-ef", "Efecto del ejercicio dentro de cada edad (por hora)", -8, 4, 1, -4)}</div>
      <p><button type="button" class="boton peq sec" data-sim-nuevo>Otra muestra</button></p>
      <div class="sim-cuerpo"><div id="tv-graf"></div><div id="tv-res" class="sim-res"></div></div>`,
    retos: [{ txt: "Consigue que la correlación global sea positiva mientras dentro de cada grupo es negativa (paradoja de Simpson)." },
            { txt: "Haz que la correlación global sea casi 0 (|r| < .10) aunque el ejercicio tenga efecto dentro de cada grupo." },
            { txt: "Quita la diferencia de colesterol entre edades: ¿se parecen ahora la correlación global y la de cada grupo?" }],
    semilla: 21,
    actualizar() {
      const dej = lee("tv-ej"), ded = lee("tv-edad"), ef = lee("tv-ef"), r = rng(this.semilla);
      const P = []; ["joven", "mayor"].forEach((gr, k) => { for (let i = 0; i < 60; i++) { const ej = Math.max(0, 3 + k * dej + 1.3 * normal(r)); P.push({ gr, ej, co: 180 + k * ded + ef * (ej - (3 + k * dej)) + 12 * normal(r) }); } });
      const rg = corr(P.map((p) => p.ej), P.map((p) => p.co)), rj = corr(P.filter((p) => p.gr === "joven").map((p) => p.ej), P.filter((p) => p.gr === "joven").map((p) => p.co)), rm = corr(P.filter((p) => p.gr === "mayor").map((p) => p.ej), P.filter((p) => p.gr === "mayor").map((p) => p.co));
      const lo = Math.min(...P.map((p) => p.co)) - 5, hi = Math.max(...P.map((p) => p.co)) + 5;
      const L = lienzo(460, 290, [0, 12], [Math.floor(lo / 10) * 10, Math.ceil(hi / 10) * 10], { xlab: "Horas de ejercicio a la semana", ylab: "Colesterol", titulo: "Ejercicio y colesterol" });
      let g = L.s; P.forEach((p) => { g += `<circle cx="${L.X(Math.min(12, p.ej))}" cy="${L.Y(p.co)}" r="3" class="${p.gr === "joven" ? "serie1" : "serie2"} p"/>`; });
      document.getElementById("tv-graf").innerHTML = L.fin(g) + `<p class="leyenda-sim">Azul: jóvenes. Naranja: mayores.</p>`;
      const v = (x) => (x > 0 ? "+" : "") + x.toFixed(2).replace("0.", ".");
      const simpson = Math.sign(rg) !== Math.sign((rj + rm) / 2) && Math.abs(rg) > 0.1 && Math.abs((rj + rm) / 2) > 0.1;
      document.getElementById("tv-res").innerHTML = `<div class="kpis"><div><b>${v(rg)}</b>r con todos juntos</div><div><b>${v(rj)}</b>r en jóvenes</div><div><b>${v(rm)}</b>r en mayores</div></div>
        <div class="callout ${simpson ? "warn" : "info"}">${simpson ? "<b>Paradoja de Simpson.</b> Mirando a todos juntos la relación va en un sentido y dentro de cada edad va en el contrario. La edad es una <b>tercera variable (confusora)</b>: influye a la vez en el ejercicio y en el colesterol." : "Compara la r global con la de cada grupo. Si la edad influye en las dos variables, la r global mezcla el efecto del ejercicio con el de la edad."}</div>
        <p class="nota">En un estudio correlacional, «tener en cuenta» la edad (analizar por grupos o con regresión múltiple) ayuda, pero solo con las terceras variables que se han medido.</p>`;
      return [rg > 0.1 && rj < -0.1 && rm < -0.1, Math.abs(rg) < 0.1 && Math.abs(ef) >= 2, ded === 0 && Math.abs(rg - (rj + rm) / 2) < 0.15];
    } });

  // ================================================================ 9. muestreo
  const POB = (() => { const r = rng(2026), P = []; // 10.000 estudiantes en 400 aulas de 25; 4 cursos
    for (let a = 0; a < 400; a++) { const curso = 1 + (a % 4), efA = normal(r) * 0.45, base = [-0.2, 0, 0.3, 0.6][curso - 1];
      for (let i = 0; i < 25; i++) { const insta = r() < 0.45 + 0.05 * (4 - curso); const z = -0.35 + base + efA + (insta ? 0.9 : -0.4) + 0.6 * normal(r); P.push({ curso, aula: a, insta, y: z > 0 ? 1 : 0 }); } }
    return P; })();
  const verdad = media(POB.map((p) => p.y));
  B.simulador({ id: "muestreo", unidad: ["desc"], icono: "🎯", titulo: "Laboratorio de muestreo",
    resumen: "Una población virtual de 10.000 estudiantes. Saca muchas muestras con distintas técnicas y comprueba qué le pasa al sesgo y al margen de error.",
    html: () => `<p class="contexto">Pregunta: ¿qué porcentaje de estudiantes usa redes sociales más de 3 h al día? En esta población virtual, el valor real es <b>${coma(f1(verdad * 100))} %</b> (en la realidad no lo conoceríamos).</p>
      <div class="desls">${deslizador("mu-n", "Tamaño de cada muestra", 50, 2000, 50, 200)}</div>
      <p><label for="mu-tec">Técnica </label><select id="mu-tec"><option value="simple">Aleatorio simple</option><option value="estrat">Estratificado por curso (proporcional)</option><option value="cong">Por conglomerados (aulas de 25)</option><option value="insta">Conveniencia: encuesta difundida por Instagram</option></select> <button type="button" class="boton peq sec" data-sim-nuevo>Sacar otras 200 muestras</button></p>
      <div class="sim-cuerpo"><div id="mu-graf"></div><div id="mu-res" class="sim-res"></div></div>`,
    retos: [{ txt: "Con la encuesta por Instagram, sube la muestra a 1.500 o más: ¿desaparece el sesgo?" },
            { txt: "Con aleatorio simple, consigue que el 95 % de las muestras caiga a menos de 3 puntos del valor real." },
            { txt: "Compara conglomerados y aleatorio simple con la misma n: ¿cuál da estimaciones más dispersas?" }],
    semilla: 3,
    actualizar() {
      const n = lee("mu-n"), tec = document.getElementById("mu-tec").value, r = rng(this.semilla), K = 200;
      const pick = (arr, k) => { const out = []; for (let i = 0; i < k; i++) out.push(arr[Math.floor(r() * arr.length)]); return out; };
      const insta = POB.filter((p) => p.insta), noInsta = POB.filter((p) => !p.insta);
      const ests = [];
      for (let s = 0; s < K; s++) { let m;
        if (tec === "simple") m = pick(POB, n);
        else if (tec === "estrat") { m = []; [1, 2, 3, 4].forEach((c) => { m = m.concat(pick(POB.filter((p) => p.curso === c), Math.round(n / 4))); }); }
        else if (tec === "cong") { m = []; const na = Math.max(1, Math.round(n / 25)); for (let i = 0; i < na; i++) { const a = Math.floor(r() * 400); m = m.concat(POB.slice(a * 25, a * 25 + 25)); } }
        else m = pick(insta, Math.round(n * 0.85)).concat(pick(noInsta, Math.round(n * 0.15)));
        ests.push(media(m.map((p) => p.y)) * 100); }
      const sorted = ests.slice().sort((a, b) => a - b), e95 = sorted.map((e) => Math.abs(e - verdad * 100)).sort((a, b) => a - b)[Math.floor(K * 0.95) - 1];
      const sesgo = media(ests) - verdad * 100, sd = dt(ests);
      const L = lienzo(520, 200, [0, 100], [0, 1], { xlab: "Porcentaje estimado en cada muestra", titulo: "200 muestras" });
      let g = L.s.replace(/<text[^>]*class="eje"[^>]*>[^<]*<\/text>/g, (t) => t.includes('text-anchor="end"') ? "" : t);
      g += `<line x1="${L.X(verdad * 100)}" x2="${L.X(verdad * 100)}" y1="${L.m.t}" y2="${L.Y(0)}" class="serie2" stroke-width="2"/>`;
      const cub = {}; ests.forEach((e) => { const b = Math.round(e * 2) / 2; cub[b] = (cub[b] || 0) + 1; const yy = 0.04 + 0.045 * (cub[b] - 1); g += `<circle cx="${L.X(e)}" cy="${L.Y(Math.min(0.97, yy))}" r="2.6" class="serie1 p"/>`; });
      document.getElementById("mu-graf").innerHTML = L.fin(g) + `<p class="leyenda-sim">Cada punto es la estimación de una muestra. Línea naranja: valor real.</p>`;
      document.getElementById("mu-res").innerHTML = `<div class="kpis"><div><b>${coma(f1(media(ests)))} %</b>media de las estimaciones</div><div><b>${sesgo > 0 ? "+" : ""}${coma(f1(sesgo))}</b>sesgo (puntos)</div><div><b>± ${coma(f1(e95))}</b>el 95 % cae a menos de…</div></div>
        <div class="callout ${Math.abs(sesgo) > 3 ? "warn" : "info"}">${tec === "insta" ? "<b>Muestra de conveniencia:</b> responden sobre todo usuarios de Instagram, que usan más las redes. Aumentar la muestra estrecha la nube… alrededor de un valor equivocado. <b>El tamaño no arregla el sesgo</b> (como el Literary Digest)." : tec === "cong" ? "<b>Conglomerados:</b> sin sesgo, pero los estudiantes de una misma aula se parecen, así que 25 de un aula aportan menos información que 25 de 25 aulas: la nube es más ancha que con el aleatorio simple." : "Sin sesgo: las estimaciones se reparten alrededor del valor real. Aumentar la muestra reduce el error (para dividirlo por dos, multiplica n por cuatro)."}</div>`;
      this._u = this._u || {}; this._u[tec] = { n, sd };
      const cmp = this._u.simple && this._u.cong && this._u.simple.n === this._u.cong.n && this._u.cong.sd > this._u.simple.sd;
      return [tec === "insta" && n >= 1500 && Math.abs(sesgo) > 3, tec === "simple" && e95 < 3, !!cmp];
    } });

  // ================================================================ 10. potencia
  B.simulador({ id: "potencia", unidad: ["desc", "analisis"], icono: "🔦", titulo: "Potencia: ¿cuántas personas necesito?",
    resumen: "Elige el tamaño del efecto esperado y el número de personas por grupo, y mira la probabilidad de detectarlo. Incluye el caso de «Lectura de la mirada».",
    caso: "c16",
    html: () => `<p class="contexto">Comparación de dos grupos independientes (t de Student, bilateral). La potencia es la probabilidad de obtener p &lt; α si el efecto existe.</p>
      <div class="desls">${deslizador("po-d", "Tamaño del efecto esperado (d)", 0.1, 1.2, 0.05, 0.5)}${deslizador("po-n", "Personas por grupo", 5, 400, 1, 20)}</div>
      <p><label for="po-a">α </label><select id="po-a"><option value="0.05">.05</option><option value="0.01">.01</option></select></p>
      <div class="sim-cuerpo"><div id="po-graf"></div><div id="po-res" class="sim-res"></div></div>`,
    retos: [{ txt: "Consigue una potencia de al menos el 80 % con un efecto pequeño (d = 0,20)." },
            { txt: "Reproduce la actividad de la mirada: 9 personas por grupo y un efecto medio (d = 0,50). ¿Qué potencia había?" },
            { txt: "Encuentra cuántas personas por grupo hacen falta para un efecto medio (d = 0,50) con potencia del 80 %." }],
    actualizar() {
      const d = lee("po-d"), n = lee("po-n"), a = Number(document.getElementById("po-a").value), z = qnorm(1 - a / 2);
      const pot = (nn) => { const del = d * Math.sqrt(nn / 2); return 1 - phi(z - del) + phi(-z - del); };
      let n80 = 2; while (pot(n80) < 0.8 && n80 < 5000) n80++;
      const L = lienzo(460, 240, [0, 400], [0, 1], { xlab: "Personas por grupo", ylab: "Potencia", titulo: "Curva de potencia" });
      let g = L.s, pts = []; for (let x = 2; x <= 400; x += 2) pts.push(L.X(x) + "," + L.Y(pot(x)));
      g += `<line x1="${L.X(0)}" x2="${L.X(400)}" y1="${L.Y(0.8)}" y2="${L.Y(0.8)}" class="media-fase"/><polyline points="${pts.join(" ")}" class="serie1"/><circle cx="${L.X(n)}" cy="${L.Y(pot(n))}" r="6" class="serie2 p"/>`;
      document.getElementById("po-graf").innerHTML = L.fin(g) + `<p class="leyenda-sim">Discontinua: potencia del 80 %. Punto naranja: tu elección.</p>`;
      const p = pot(n);
      document.getElementById("po-res").innerHTML = `<div class="kpis"><div><b>${Math.round(p * 100)} %</b>potencia con ${n} por grupo</div><div><b>${n80 > 4999 ? "> 5.000" : n80}</b>por grupo para el 80 %</div><div><b>${n80 > 4999 ? "—" : 2 * n80}</b>personas en total</div></div>
        <div class="callout ${p < 0.5 ? "warn" : "info"}">${p < 0.5 ? `Con esta muestra, aunque el efecto exista, lo más probable es <b>no detectarlo</b> (p ≥ α). Un resultado no significativo diría muy poco.` : p >= 0.8 ? "Buena potencia: si el efecto existe, es muy probable detectarlo." : "Potencia intermedia: hay bastante riesgo de no detectar el efecto."}</div>
        <p class="nota">Aproximación normal; G*Power da valores prácticamente iguales (d = 0,5 → 64 por grupo; d = 0,2 → 394).</p>`;
      return [Math.abs(d - 0.2) < 0.001 && p >= 0.8, n === 9 && Math.abs(d - 0.5) < 0.001, Math.abs(d - 0.5) < 0.001 && n >= 63 && n <= 65 && p >= 0.79];
    } });

  // ================================================================ 11. acuerdo entre observadores
  B.simulador({ id: "kappa", unidad: ["desc"], icono: "👀", titulo: "Dos observadores: acuerdo y kappa",
    resumen: "Dos personas registran la misma sesión de recreo en 40 intervalos. Cambia lo frecuente que es la conducta y lo bien que observa cada una, y compara el porcentaje de acuerdo con el kappa.",
    html: () => `<p class="contexto">Conducta registrada: agresión física en el recreo (aparece / no aparece en cada intervalo de 10 s). Datos generados con fines didácticos.</p>
      <div class="desls">${deslizador("ka-f", "Frecuencia real de la conducta", 5, 60, 5, 30, " %")}${deslizador("ka-a", "Precisión del observador A", 60, 100, 5, 95, " %")}${deslizador("ka-b", "Precisión del observador B", 60, 100, 5, 85, " %")}</div>
      <p><button type="button" class="boton peq sec" data-sim-nuevo>Otra sesión</button></p>
      <div class="sim-cuerpo"><div id="ka-graf"></div><div id="ka-res" class="sim-res"></div></div>`,
    retos: [{ txt: "Consigue un acuerdo del 85 % o más con un kappa por debajo de .50 (pista: una conducta muy poco frecuente)." },
            { txt: "Consigue un kappa de al menos .80." },
            { txt: "Con la conducta muy frecuente (50 % o más), baja la precisión de B a 70 %: ¿qué le pasa al kappa?" }],
    semilla: 9,
    actualizar() {
      const f = lee("ka-f") / 100, pa = lee("ka-a") / 100, pb = lee("ka-b") / 100, r = rng(this.semilla), N = 40;
      const real = Array.from({ length: N }, () => r() < f), A = real.map((x) => (r() < pa ? x : !x)), Bo = real.map((x) => (r() < pb ? x : !x));
      const acu = A.filter((x, i) => x === Bo[i]).length / N, pA = A.filter(Boolean).length / N, pB = Bo.filter(Boolean).length / N;
      const pe = pA * pB + (1 - pA) * (1 - pB), k = pe >= 1 ? 1 : (acu - pe) / (1 - pe);
      const cel = (x, dis) => `<span class="ka-c ${x ? "si" : ""} ${dis ? "dis" : ""}"></span>`;
      document.getElementById("ka-graf").innerHTML = `<div class="ka-fila"><b>A</b>${A.map((x, i) => cel(x, x !== Bo[i])).join("")}</div><div class="ka-fila"><b>B</b>${Bo.map((x, i) => cel(x, x !== A[i])).join("")}</div><p class="leyenda-sim">Relleno: la conducta aparece. Borde rojo: desacuerdo.</p>`;
      document.getElementById("ka-res").innerHTML = `<div class="kpis"><div><b>${Math.round(acu * 100)} %</b>acuerdo observado</div><div><b>${Math.round(pe * 100)} %</b>acuerdo esperable por azar</div><div><b>${k.toFixed(2).replace("0.", ".")}</b>kappa de Cohen</div></div>
        <div class="callout ${acu >= 0.85 && k < 0.5 ? "warn" : "info"}">${acu >= 0.85 && k < 0.5 ? "Mucho acuerdo… pero casi todo es en «no aparece», que también acertaría alguien que marcara siempre «no». <b>Kappa descuenta ese acuerdo por azar.</b>" : "Kappa = (acuerdo observado − acuerdo por azar) / (1 − acuerdo por azar). Orientativo: > .60 aceptable; > .80 muy bueno."}</div>
        <p class="nota">Para mejorar el acuerdo: definir mejor las categorías con ejemplos y entrenar a los observadores con grabaciones.</p>`;
      return [acu >= 0.85 && k < 0.5, k >= 0.8, f >= 0.5 && Math.abs(pb - 0.7) < 0.001];
    } });
})(window.Brujula);
