/* =====================================================================
   CUADERNO DE PROGRESOS · mapa de dominio por concepto (estilo Faro)
   Combina las evidencias de misiones, simuladores, preguntas rápidas y simulacros
   y clasifica cada concepto: dominado, repasar o prioritario.
   ===================================================================== */
(function (B) {
  "use strict";
  const S = () => B.S(), esc = B.esc;
  const ESTADOS = { dominado: ["Dominado", "✓"], repasar: ["Repasar", "↻"], prioritario: ["Prioritario", "!"], sin: ["Sin datos suficientes", "·"] };

  function evidencias(c) {
    const ev = [], st = S();
    (c.pasos || []).forEach(([cid, pid]) => { const e = st.casos.estado[cid] && st.casos.estado[cid][pid]; if (!e || !e.intentos && !e.revelado) return;
      ev.push({ tipo: "misión", v: e.revelado ? 0 : e.resuelto ? (e.primer_ok ? 1 : 0.6) : 0.2 }); });
    (c.sims || []).forEach((id) => { const s = st.sims[id], sim = B.simuladores[id]; if (!s || !sim) return; const n = (s.retos || []).filter(Boolean).length; ev.push({ tipo: "simulador", v: n / sim.retos.length }); });
    const bk = B.bancoParcial && B.bancoParcial(), porId = bk ? Object.fromEntries(bk.items.map((x) => [x.id, x])) : {};
    const ult = {}; ((B.estadoParcial ? B.estadoParcial().intentos : []) || []).forEach((r) => Object.entries((r.sim && r.sim.resp) || {}).forEach(([id, resp]) => { ult[id] = resp; }));
    (c.items || []).forEach((id) => { if (ult[id] === undefined || !porId[id]) return; ev.push({ tipo: "simulacro", v: ult[id] === porId[id].a ? 1 : 0 }); });
    const ti = st.testItems || {};
    (c.test || []).forEach(([uid, expr]) => { const re = new RegExp(expr, "i"); Object.entries(ti).forEach(([k, ok]) => { const [u, q] = k.split("|"); if (u === uid && re.test(q)) ev.push({ tipo: "pregunta", v: ok ? 1 : 0 }); }); });
    return ev;
  }
  function estado(ev) {
    if (ev.length < 2) return { e: "sin", v: null, n: ev.length };
    const v = ev.reduce((a, b) => a + b.v, 0) / ev.length;
    return { e: v >= 0.75 ? "dominado" : v >= 0.5 ? "repasar" : "prioritario", v, n: ev.length };
  }
  B.mapaDominio = () => (B.conceptosCuaderno || []).map((c) => { const ev = evidencias(c); return { c, ev, ...estado(ev) }; });

  function htmlMapa(imprimir) {
    const m = B.mapaDominio(), cuenta = (e) => m.filter((x) => x.e === e).length;
    const prior = m.filter((x) => x.e === "prioritario" || x.e === "repasar").sort((a, b) => a.v - b.v).slice(0, 5);
    const temas = (B.bancoParcial && B.bancoParcial() && B.bancoParcial().temas) || {};
    const porSem = [...new Set(m.map((x) => x.c.sem))];
    return `<div class="dominio-resumen">${["dominado", "repasar", "prioritario", "sin"].map((e) => `<div class="dom-${e}"><b>${cuenta(e)}</b>${ESTADOS[e][0].toLowerCase()}</div>`).join("")}</div>
      ${prior.length ? `<div class="dominio-prior"><h3>Tus prioridades</h3><ol>${prior.map((x) => `<li><b>${esc(x.c.nombre)}</b> (${Math.round(x.v * 100)} %) → ${x.c.repasar.map(([h, t]) => imprimir ? esc(t) : `<a href="#${h}">${esc(t)}</a>`).join(" · ")}</li>`).join("")}</ol></div>` : ""}
      ${porSem.map((s) => `<h3 class="dom-sem">${s.replace("S", "Semana ")} · ${esc(temas[s] || "")}</h3><ul class="dominio">${m.filter((x) => x.c.sem === s).map((x) => `<li class="dom-${x.e}"><span class="dom-ic" aria-hidden="true">${ESTADOS[x.e][1]}</span><div><b>${esc(x.c.nombre)}</b><small>${ESTADOS[x.e][0]}${x.v !== null ? ` · ${Math.round(x.v * 100)} %` : ""} · ${x.n} evidencia${x.n === 1 ? "" : "s"}${x.n ? ` (${[...new Set(x.ev.map((e) => e.tipo))].join(", ")})` : ""}</small></div>${x.e !== "dominado" && !imprimir ? `<a class="dom-ir" href="#${x.c.repasar[0][0]}">${x.e === "sin" ? "Practicar" : "Repasar"} →</a>` : ""}</li>`).join("")}</ul>`).join("")}`;
  }

  const progreso = B.vistas.progreso;
  B.vista("progreso", (main, args) => {
    progreso(main, args);
    const sec = document.createElement("section"); sec.className = "tarjeta cuaderno-dominio";
    const p = B.conf.parcial || {};
    sec.innerHTML = `<div class="dom-cab"><div><p class="eyebrow">MAPA DE DOMINIO · ${esc((p.nombre || "").toUpperCase())}</p><h2>Lo que ya dominas y lo que te conviene repasar</h2>
      <p class="nota">Se calcula con tus misiones, simuladores, preguntas rápidas y simulacros de las semanas ${esc(p.semanas || "")}. Con menos de dos evidencias, el concepto aparece «sin datos suficientes».</p></div>
      <button type="button" class="boton sec" id="dom-imprimir">Imprimir o guardar en PDF</button></div>${htmlMapa(false)}
      ${B.panelResumen && B.panelResumen() ? `<p class="nota">Panel sorpresa del Parcial I: ${B.panelResumen().hechos} de ${B.panelResumen().n} respondidos, ${B.panelResumen().ok} aciertos. <a href="#panel">Abrir el panel</a>.</p>` : ""}`;
    const h1 = main.querySelector("h1"); const primera = main.querySelector("section");
    primera ? primera.after(sec) : main.prepend(sec);
    B.$("#dom-imprimir").addEventListener("click", imprimir);
  });
  function imprimir() {
    const w = window.open("", "_blank"); if (!w) { B.aviso("Permite las ventanas emergentes para imprimir"); return; }
    const d = new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
    w.document.write(`<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Mi cuaderno · Brújula</title><style>body{font-family:Arial,sans-serif;color:#001447;max-width:820px;margin:24px auto;padding:0 16px}h1{font-size:22px}h3{margin:18px 0 6px;font-size:15px}
      .dominio-resumen{display:flex;gap:10px}.dominio-resumen div{border:1px solid #ccd;border-radius:8px;padding:8px 12px}.dominio-resumen b{display:block;font-size:20px}ul.dominio{list-style:none;padding:0;margin:0}ul.dominio li{display:flex;gap:10px;padding:6px 0;border-bottom:1px solid #eee}ul.dominio small{display:block;color:#5a6472}
      .dom-ic{width:22px;text-align:center;font-weight:bold}.dom-dominado .dom-ic{color:#0a8f7b}.dom-repasar .dom-ic{color:#c76a00}.dom-prioritario .dom-ic{color:#c93c3c}</style></head><body>
      <h1>Mi cuaderno de investigación · Brújula</h1><p>Métodos y Diseños de Investigación · ESIC University · ${d}</p>${htmlMapa(true)}<p style="color:#5a6472;font-size:12px">Generado en este navegador a partir de la práctica en Brújula. Es una orientación para el repaso, no una calificación.</p></body></html>`);
    w.document.close(); w.focus(); setTimeout(() => w.print(), 300);
  }
})(window.Brujula);
