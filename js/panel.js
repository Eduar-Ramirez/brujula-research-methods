/* =====================================================================
   PANEL SORPRESA · ítems del Parcial I con menor acierto (dos por semana)
   Intentar primero, indicar la seguridad y solo después ver la clave,
   el porcentaje de la clase que eligió cada opción y por qué.
   ===================================================================== */
(function (B) {
  "use strict";
  const $ = B.$, esc = B.esc, S = () => B.S();
  let DATOS = null;
  function datos() {
    if (DATOS) return DATOS; const p = B.panelSorpresa; if (!p) return null;
    const bin = atob(p.datos), u8 = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i) ^ p.clave.charCodeAt(i % p.clave.length);
    DATOS = { ...p, items: JSON.parse(new TextDecoder().decode(u8)) }; return DATOS;
  }
  const est = () => { const s = S(); s.panel = s.panel || { visto: false, resp: {} }; return s.panel; };
  const semana = (t) => "Semana " + t.replace("S", "");
  const orden = (it) => { // orden de opciones estable por ítem (no siempre la clave en la misma letra)
    let h = 0; for (const ch of it.id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    const o = it.o.map((_, k) => k); for (let i = o.length - 1; i > 0; i--) { h = (h * 1103515245 + 12345) >>> 0; const j = h % (i + 1); [o[i], o[j]] = [o[j], o[i]]; } return o; };
  B.panelResumen = () => { const d = datos(); if (!d) return null; const r = est().resp, hechos = d.items.filter((x) => r[x.id]);
    return { n: d.items.length, hechos: hechos.length, ok: hechos.filter((x) => r[x.id].ok).length, items: d.items, resp: r }; };

  B.vista("panel", (main, [filtro]) => {
    const d = datos(); if (!d) { main.innerHTML = '<p class="tarjeta">No hay panel disponible.</p>'; return; }
    const st = est(); st.visto = true; B.guardar();
    const temas = [...new Set(d.items.map((x) => x.t))];
    filtro = temas.includes(filtro) ? filtro : "todas";
    const lista = d.items.filter((x) => filtro === "todas" || x.t === filtro);
    const res = B.panelResumen();
    main.innerHTML = `<p class="miga"><a href="#desafios">← Desafíos</a></p>
      <header class="page-heading"><p class="eyebrow">PANEL SORPRESA · ${esc(d.examen)}</p><h1>Las preguntas que más costaron</h1>
      <p>Catorce ítems del Parcial I, dos por semana: los que menos acertó la clase. <b>Intenta responder antes de ver la clave</b>, indica tu seguridad y después lee por qué. Al lado verás qué eligió la clase (${d.n} estudiantes).</p></header>
      <div class="panel-resumen"><div><b>${res.hechos}/${res.n}</b>respondidos</div><div><b>${res.ok}</b>aciertos</div><div><b>${res.hechos ? Math.round(100 * res.ok / res.hechos) : 0} %</b>tu acierto</div></div>
      <div class="explora-toolbar"><nav class="subnav" aria-label="Semanas"><a href="#panel" class="${filtro === "todas" ? "activa" : ""}">Todas</a>${temas.map((t) => `<a href="#panel/${t}" class="${filtro === t ? "activa" : ""}">${semana(t)}</a>`).join("")}</nav></div>
      <ol class="panel-lista">${lista.map((it) => item(d, it)).join("")}</ol>
      <p class="nota">Estos ítems ya no se usarán en exámenes. Los porcentajes son de un grupo pequeño: tómalos como orientación.</p>`;
    lista.forEach((it) => engancha(main, d, it));
    B.eduar && B.eduar("sorpresa", "Sorpresa: estas son las preguntas del Parcial I que más costaron. Respóndelas antes de mirar: equivocarse aquí es la mejor forma de no equivocarse en el Parcial 2.");
  });

  function item(d, it) {
    const r = est().resp[it.id], o = orden(it), L = "ABC";
    const u = B.unidades[d.unidad[it.t]];
    const cab = `<div class="panel-cab"><span class="panel-sem">${semana(it.t)} · ${esc(d.temas[it.t])}</span><span class="panel-p">Acertó el ${Math.round(it.p * 100)} % de la clase</span></div>`;
    if (!r) return `<li class="panel-item" id="pi-${it.id}">${cab}<h3 class="pregunta">${it.s}</h3>
      <fieldset class="opciones"><legend class="nota">Elige una opción.</legend>${o.map((k, j) => `<label class="opcion"><input type="radio" name="pi-${it.id}" value="${k}"><span><b>${L[j]}.</b> ${esc(it.o[k])}</span></label>`).join("")}</fieldset>
      <div class="seguridad"><span>¿Qué seguridad tienes?</span>${[["seguro", "Seguro/a"], ["dudo", "Dudo"], ["azar", "Al azar"]].map(([k, t]) => `<button type="button" class="boton peq sec" data-pseg="${k}">${t}</button>`).join("")}</div>
      <div class="botonera"><button type="button" class="boton" data-pcomp disabled>Comprobar</button></div></li>`;
    const ok = r.r === it.a, masElegido = it.pct.map((v, k) => ({ v, k })).filter((x) => x.k !== it.a).sort((a, b) => b.v - a.v)[0];
    return `<li class="panel-item hecho ${ok ? "bien" : "mal"}" id="pi-${it.id}">${cab}<h3 class="pregunta">${it.s}</h3>
      <ul class="panel-opts">${o.map((k, j) => `<li class="${k === it.a ? "correcta" : k === r.r ? "erronea" : ""}"><div><b>${L[j]}.</b> ${esc(it.o[k])} ${k === it.a ? "✓" : k === r.r ? "✗ (tu respuesta)" : ""}<p class="por">${esc(it.w[k])}</p></div><div class="panel-barra" aria-label="${it.pct[k]} % de la clase"><i style="width:${it.pct[k]}%"></i><span>${it.pct[k]} %</span></div></li>`).join("")}</ul>
      ${it.blanco ? `<p class="nota">Lo dejó en blanco el ${it.blanco} % de la clase.</p>` : ""}
      <div class="feedback ${ok ? "bien" : "mal"}"><p class="veredicto">${ok ? "Correcto" : "No es correcto"}${r.seg ? ` · dijiste «${{ seguro: "seguro/a", dudo: "dudo", azar: "al azar" }[r.seg]}»` : ""}</p>
        <p>${esc(it.c)}</p>${masElegido && masElegido.v >= 20 ? `<p><b>La trampa:</b> el ${masElegido.v} % eligió «${esc(it.o[masElegido.k])}». ${esc(it.w[masElegido.k])}</p>` : ""}
        ${!ok && r.seg === "seguro" ? '<p class="callout warn">Fallaste estando seguro/a: es la idea que más conviene revisar.</p>' : ""}</div>
      <div class="botonera">${u ? `<a class="boton peq sec" href="#unidad/${u.id}">Repasar ${esc(u.titulo)}</a>` : ""}<a class="boton peq sec" href="#repasar/test/${d.unidad[it.t]}">Preguntas de esta semana</a><button type="button" class="boton peq gris" data-prep="${it.id}">Volver a intentarlo</button></div></li>`;
  }
  function engancha(main, d, it) {
    const li = main.querySelector("#pi-" + it.id); if (!li) return;
    let seg = null;
    const btn = li.querySelector("[data-pcomp]");
    const listo = () => { if (btn) btn.disabled = !(li.querySelector("input:checked") && seg); };
    li.querySelectorAll("input").forEach((x) => x.addEventListener("change", listo));
    li.querySelectorAll("[data-pseg]").forEach((b) => b.addEventListener("click", () => { seg = b.dataset.pseg; li.querySelectorAll("[data-pseg]").forEach((x) => x.classList.toggle("sec", x !== b)); listo(); }));
    btn && btn.addEventListener("click", () => {
      const r = Number(li.querySelector("input:checked").value), st = est();
      st.resp[it.id] = { r, seg, ok: r === it.a, fecha: new Date().toISOString(), intentos: ((st.resp[it.id] || {}).intentos || 0) + 1 };
      B.guardar(); li.outerHTML = item(d, it); engancha(main, d, it);
      const rs = B.panelResumen(), pr = main.querySelector(".panel-resumen"); if (pr) pr.innerHTML = `<div><b>${rs.hechos}/${rs.n}</b>respondidos</div><div><b>${rs.ok}</b>aciertos</div><div><b>${rs.hechos ? Math.round(100 * rs.ok / rs.hechos) : 0} %</b>tu acierto</div>`;
      B.eduar && B.eduar(r === it.a ? "celebrando" : "reflexivo", r === it.a ? "Esta ya no te la quitan. Lee igualmente por qué fallaron los demás." : "Esta es justo la que más costó. Mira qué eligió la clase y por qué esa opción engaña.");
      const nuevo = main.querySelector("#pi-" + it.id); nuevo && nuevo.scrollIntoView({ block: "nearest" });
    });
    li.querySelector("[data-prep]")?.addEventListener("click", () => { const st = est(); const prev = st.resp[it.id]; st.historial = (st.historial || []).concat(prev ? [{ id: it.id, ...prev }] : []); delete st.resp[it.id]; B.guardar(); li.outerHTML = item(d, it); engancha(main, d, it); });
  }

  // tarjeta en Desafíos
  const desafios = B.vistas.desafios;
  B.vista("desafios", (main, args) => {
    desafios(main, args);
    const r = B.panelResumen(); if (!r || B.conf.panelSorpresa === false) return;
    const tarjeta = document.createElement("a"); tarjeta.className = "panel-feature"; tarjeta.href = "#panel";
    tarjeta.innerHTML = `<span class="panel-glyph" aria-hidden="true">?!</span><div><p class="eyebrow">PANEL SORPRESA</p><h2>Las preguntas del Parcial I que más costaron</h2><p>${r.hechos ? `Llevas ${r.hechos} de ${r.n}.` : "Catorce ítems reales, dos por semana. Inténtalos antes de mirar la respuesta."}</p></div><span aria-hidden="true">↗</span>`;
    const ref = main.querySelector(".decision-feature"); ref ? ref.after(tarjeta) : main.prepend(tarjeta);
  });

  // aparición sorpresa (una sola vez, en la portada)
  const inicio = B.vistas.inicio;
  B.vista("inicio", (main, args) => {
    inicio(main, args);
    if (B.conf.panelSorpresa === false || !datos() || est().visto || est().aplazado === new Date().toISOString().slice(0, 10)) return;
    setTimeout(() => {
      if (!$("#modal").hidden || location.hash.replace("#", "") && location.hash !== "#inicio") return;
      B.modal("¡Sorpresa!", `<div class="sorpresa"><p class="sorpresa-big">14 preguntas</p><p>Hemos rescatado del <b>Parcial I</b> las preguntas que <b>más costaron</b> a la clase: dos de cada semana.</p><p>Inténtalas <b>antes</b> de ver la respuesta. Después verás qué eligió la clase y por qué la opción correcta lo es.</p></div>`,
        `<button type="button" class="boton gris" id="ps-luego">Más tarde</button><a class="boton naranja" href="#panel" data-cerrar>Abrir el panel</a>`);
      $("#ps-luego").addEventListener("click", () => { est().aplazado = new Date().toISOString().slice(0, 10); B.guardar(); B.cerrarModal(); });
    }, 900);
  });
  B.alias = Object.assign(B.alias || {}, { panel: "desafios" });
})(window.Brujula);
