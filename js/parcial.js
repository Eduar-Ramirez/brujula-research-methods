/* =====================================================================
   RUTA AL PARCIAL · requisito de práctica, simulacro de ítems e insignias
   Configuración en datos/configuracion.js (bloque «parcial»).
   ===================================================================== */
(function (B) {
  "use strict";
  const C = () => window.CONTENIDO || { casos: [] };
  const S = () => B.S();
  const P = () => B.conf.parcial;
  const pct = (x) => Math.round(100 * (x || 0));
  const barra = (x, cl = "alto") => `<div class="pista-b" role="img" aria-label="${pct(x)} %"><div class="relleno ${cl}" style="width:${Math.min(100, pct(x))}%"></div></div>`;
  const caso = (id) => C().casos.find((c) => c.id === id);
  const est = (cid, pid) => (S().casos.estado[cid] && S().casos.estado[cid][pid]) || {};
  const resuelto = (cid, pid) => { const e = est(cid, pid); return !!(e.resuelto && !e.revelado); };

  // ---------------- banco de ítems (codificado) ----------------
  let BANCO = null;
  function banco() {
    if (BANCO) return BANCO; const b = B._bancoCrudo; if (!b) return null;
    const k = "brujula-mdi-parcial1", bin = atob(b.datos), u8 = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i) ^ k.charCodeAt(i % k.length);
    BANCO = { temas: b.temas, unidad: b.unidad, items: JSON.parse(new TextDecoder().decode(u8)) }; return BANCO;
  }

  // ---------------- requisito: la ruta de práctica ----------------
  B.estadoRuta = () => {
    const filas = P().ruta.map((cid) => { const c = caso(cid); if (!c) return null;
      const pasos = c.pasos.filter((p) => p.tipo !== "jasp"), num = pasos.filter((p) => p.tipo === "numero");
      return { c, n: pasos.length, ok: pasos.filter((p) => resuelto(cid, p.id)).length, rev: pasos.filter((p) => est(cid, p.id).revelado).length,
        nj: num.length, okj: num.filter((p) => resuelto(cid, p.id)).length, fin: !!S().casos.fin[cid] }; }).filter(Boolean);
    const n = filas.reduce((a, f) => a + f.n, 0), ok = filas.reduce((a, f) => a + f.ok, 0), nj = filas.reduce((a, f) => a + f.nj, 0), okj = filas.reduce((a, f) => a + f.okj, 0);
    const g = n ? ok / n : 0, j = nj ? okj / nj : 1;
    const abierto = g >= P().umbral && j >= P().umbralJasp;
    if (abierto && !S().parcial.desbloqueado) { S().parcial.desbloqueado = new Date().toISOString(); B.guardar(); }
    return { filas, n, ok, nj, okj, g, j, abierto: abierto || !!S().parcial.desbloqueado };
  };
  const minutos = (f) => Math.round(f.n * 3 + (f.nj ? 15 : 0));
  const diasHasta = () => { const d = new Date(P().fecha) - new Date(); return Math.max(0, Math.ceil(d / 86400000)); };
  B.siguienteMision = () => { const r = B.estadoRuta(); const f = r.filas.find((x) => !x.fin) || null; return f ? f.c : null; };

  // ---------------- insignias ----------------
  const INSIGNIAS = [
    { id: "inicio", ic: "🧭", nom: "Rumbo fijado", txt: "Resuelve tu primer paso en un caso.", ok: () => Object.values(S().casos.estado).some((c) => Object.values(c).some((e) => e.resuelto && !e.revelado)) },
    { id: "jasp", ic: "📊", nom: "Analista JASP", txt: "Copia bien tu primera salida de JASP.", ok: () => C().casos.some((c) => c.pasos.some((p) => p.tipo === "numero" && resuelto(c.id, p.id))) },
    { id: "cuali", ic: "🏷️", nom: "Codificador/a", txt: "Completa el análisis cualitativo (caso 14).", ok: () => !!S().casos.fin.c14 },
    { id: "unico", ic: "📈", nom: "Ojo clínico", txt: "Completa el caso único (caso 15).", ok: () => !!S().casos.fin.c15 },
    { id: "inter", ic: "🔲", nom: "Detective de interacciones", txt: "Supera los tres retos del simulador factorial.", ok: () => !!(S().sims.factorial && (S().sims.factorial.retos || []).filter(Boolean).length >= 3) },
    { id: "lector", ic: "📖", nom: "Lectura a fondo", txt: "Marca como leídas todas las secciones de una unidad.", ok: () => B.listaUnidades().some((u) => u.secciones.length && u.secciones.every((s) => S().leido[u.id + "/" + s.id])) },
    { id: "constancia", ic: "🔥", nom: "Constancia", txt: "Trabaja en Brújula tres días distintos.", ok: () => (S().dias || []).length >= 3 },
    { id: "ruta", ic: "🔓", nom: "Ruta superada", txt: "Alcanza el 60 % de la ruta y desbloquea el simulacro.", ok: () => B.estadoRuta().abierto },
    { id: "simulacro", ic: "🏆", nom: "Listo/a para el parcial", txt: "Saca un 80 % o más en un simulacro.", ok: () => (S().parcial.intentos || []).some((x) => x.nota >= 0.8) }];
  B.insignias = () => INSIGNIAS.map((x) => ({ ...x, logro: !!x.ok() }));
  B.htmlInsignias = (peq) => `<div class="insignias ${peq ? "peq" : ""}">${B.insignias().map((x) => `<div class="insignia ${x.logro ? "logro" : ""}" title="${B.esc(x.txt)}"><span class="ic">${x.logro ? x.ic : "🔒"}</span><b>${x.nom}</b>${peq ? "" : `<small>${x.txt}</small>`}</div>`).join("")}</div>`;

  // ---------------- bloque de portada ----------------
  B.htmlMisionPortada = () => {
    if (!P()) return "";
    const r = B.estadoRuta(), sig = B.siguienteMision(), d = diasHasta();
    return `<section class="mision">
      <div class="mision-izq"><p class="sobre">Ruta al ${P().nombre}</p><h2>${d > 0 ? `Faltan <b>${d}</b> día${d === 1 ? "" : "s"}` : "¡Es hoy!"} <span>· ${new Date(P().fecha).toLocaleDateString("es-ES", { day: "numeric", month: "long" })}</span></h2>
        <p>${r.abierto ? "Has desbloqueado el <b>simulacro de 20 ítems</b>. Haz uno y mira dónde te falta entrenamiento." : `Resuelve al menos el <b>${pct(P().umbral)} %</b> de los problemas de la ruta (incluidos los análisis en JASP) para desbloquear el <b>simulacro de ítems</b>.`}</p>
        <div class="botonera">${sig ? `<a class="boton naranja" href="#caso/${sig.id}">▶ Siguiente misión: caso ${sig.num}</a>` : ""}<a class="boton blanco" href="#parcial">Ver la ruta completa</a>${r.abierto ? `<a class="boton blanco" href="#simulacro">🏁 Simulacro</a>` : ""}</div></div>
      <div class="mision-der">${anillo(r.g, P().umbral)}<div class="mini-b"><span>JASP ${pct(r.j)} %</span>${barra(r.j, r.j >= P().umbralJasp ? "alto" : "bajo")}</div></div></section>`;
  };
  function anillo(x, meta) {
    const R = 52, L = 2 * Math.PI * R, a = Math.min(1, x), m = meta * 360 - 90, mx = 60 + R * Math.cos(m * Math.PI / 180), my = 60 + R * Math.sin(m * Math.PI / 180);
    return `<svg viewBox="0 0 120 120" class="anillo" role="img" aria-label="${pct(x)} % de la ruta resuelto"><circle cx="60" cy="60" r="${R}" class="fondo-a"/><circle cx="60" cy="60" r="${R}" class="valor-a ${x >= meta ? "ok" : ""}" stroke-dasharray="${L * a} ${L}" transform="rotate(-90 60 60)"/>
      <circle cx="${mx}" cy="${my}" r="5" class="meta-a"/><text x="60" y="58" text-anchor="middle" class="num-a">${pct(x)} %</text><text x="60" y="76" text-anchor="middle" class="et-a">meta ${pct(meta)} %</text></svg>`;
  }

  // ---------------- vista de la ruta ----------------
  B.vista("parcial", (main) => {
    const r = B.estadoRuta(), bk = banco();
    const SEM = { c13: ["Semanas 1-2", "Método científico y tradiciones", "fund"], c14: ["Semana 3", "Análisis cualitativo", "cuali"], c01: ["Semana 4", "Grupos distintos", "t4"],
      c05: ["Semana 5", "El mismo grupo", "t5"], c09: ["Semana 6", "Factoriales: leer la interacción", "t6"], c10: ["Semana 6", "Factorial mixto (experimento de clase)", "t6"], c15: ["Semana 7", "Caso único", "t7"] };
    main.innerHTML = `<section class="tarjeta cabecera-vista"><h1>🗺️ Ruta al ${P().nombre}</h1>
        <p class="lead">Siete misiones, una por cada semana que entra en el examen (${new Date(P().fecha).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}). Cada misión es un caso completo: decides, analizas y redactas. Cuando resuelvas el <b>${pct(P().umbral)} %</b> de los problemas y el <b>${pct(P().umbralJasp)} %</b> de los análisis en JASP, se abrirá el <b>simulacro de 20 ítems</b>.</p>
        <div class="requisitos"><div><b>${r.ok} de ${r.n}</b> problemas resueltos (${pct(r.g)} %)${barra(r.g, r.g >= P().umbral ? "alto" : "medio")}<small>meta: ${pct(P().umbral)} %</small></div>
          <div><b>${r.okj} de ${r.nj}</b> lecturas de JASP correctas (${pct(r.j)} %)${barra(r.j, r.j >= P().umbralJasp ? "alto" : "medio")}<small>meta: ${pct(P().umbralJasp)} %</small></div></div>
        <p class="nota">Un problema cuenta como resuelto si llegas a la respuesta correcta sin pulsar «Ver la respuesta razonada». Si la ves, ese paso no cuenta, pero puedes <b>reiniciar el caso</b> e intentarlo de nuevo.</p></section>
      <div class="callout info jasp-cta"><b>¿Aún no tienes JASP?</b> Es gratuito y de código abierto (Windows, macOS y Linux). <a href="${P().jasp}" target="_blank" rel="noopener">Descárgalo desde la web oficial de JASP ↗</a>. Los casos están preparados para la versión 0.96 con la interfaz en español (Preferencias › Interfaz › Idioma). <button type="button" class="enlace" data-ayuda="jasp">Guía rápida de JASP</button></div>
      <ol class="ruta-mapa">${r.filas.map((f, i) => { const s = SEM[f.c.id] || [f.c.tema, f.c.titulo, null], estado = f.fin ? "hecha" : f.ok ? "en-curso" : "";
        return `<li class="parada ${estado}"><span class="nodo">${f.fin ? "✓" : i + 1}</span><div class="tarjeta"><p class="sobre">${s[0]} · ${s[1]}</p><h3>Caso ${f.c.num}: ${f.c.titulo}</h3><p>${f.c.resumen}</p>
          <div class="fila-p"><span>${f.ok} de ${f.n} resueltos${f.nj ? ` · JASP ${f.okj}/${f.nj}` : " · sin JASP"}${f.rev ? ` · ${f.rev} vistos` : ""}</span><span class="nota">⏱ unos ${minutos(f)} min</span></div>${barra(f.n ? f.ok / f.n : 0)}
          <div class="botonera"><a class="boton peq" href="#caso/${f.c.id}">${f.fin ? "Repasar" : f.ok ? "Continuar" : "Empezar"}</a>${s[2] && B.unidades[s[2]] ? `<a class="boton peq sec" href="#unidad/${s[2]}">Teoría</a>` : ""}${f.rev || f.fin ? `<button type="button" class="boton peq gris" data-reiniciar="${f.c.id}">Reiniciar caso</button>` : ""}</div></div></li>`; }).join("")}
        <li class="parada final ${r.abierto ? "hecha" : ""}"><span class="nodo">${r.abierto ? "🏁" : "🔒"}</span><div class="tarjeta"><p class="sobre">Meta</p><h3>Simulacro del ${P().nombre}</h3>
          <p>${P().items} ítems al azar basados en casos (${P().reparto[1]} fáciles, ${P().reparto[2]} medios y ${P().reparto[3]} difíciles) de un banco de ${bk ? bk.items.length : "—"}, con diagnóstico de lo que más te conviene entrenar.</p>
          ${r.abierto ? `<a class="boton" href="#simulacro">Hacer el simulacro</a>` : `<p class="nota">🔒 Se abre al alcanzar las dos metas de arriba.</p>`}</div></li></ol>`;
    main.querySelectorAll("[data-reiniciar]").forEach((b) => b.addEventListener("click", () => {
      const cid = b.dataset.reiniciar;
      B.modal("¿Reiniciar el caso?", `<p>Se borrarán tus respuestas del caso ${caso(cid).num} para que puedas resolverlo de nuevo. El resto de tu progreso no cambia.</p>`, `<button type="button" class="boton gris" data-cerrar>Cancelar</button><button type="button" class="boton" id="reini-si">Reiniciar</button>`);
      B.$("#reini-si").addEventListener("click", () => { const k = S().casos; ["estado", "ruta", "ver", "fin"].forEach((x) => { delete k[x][cid]; }); B.guardar(); B.cerrarModal(); B.render(); });
    }));
  });

  // ---------------- simulacro ----------------
  function sortear() {
    const bk = banco(), vistos = new Set(S().parcial.vistos || []), cuota = { ...P().temas }, dq = { ...P().reparto };
    for (let intento = 0; intento < 400; intento++) {
      const c = { ...cuota }, d = { ...dq }, elegidos = [];
      let orden = B.barajar(bk.items);
      if (intento < 200) orden = orden.filter((x) => !vistos.has(x.id)).concat(orden.filter((x) => vistos.has(x.id)));  // primero los no vistos
      for (const it of orden) if (c[it.t] > 0 && d[it.d] > 0) { elegidos.push(it); c[it.t]--; d[it.d]--; }
      if (elegidos.length === P().items) return B.barajar(elegidos).sort((a, b) => a.t.localeCompare(b.t));
    }
    return B.barajar(bk.items).slice(0, P().items);
  }
  let SIM = null;
  B.vista("simulacro", (main) => {
    const r = B.estadoRuta();
    if (!banco()) { main.innerHTML = `<div class="tarjeta vacio"><h2>No hay banco de ítems</h2></div>`; return; }
    if (!r.abierto) {
      main.innerHTML = `<section class="tarjeta vacio candado"><div class="cand">🔒</div><h1>Simulacro bloqueado</h1>
        <p class="lead">El banco de ítems se abre cuando has <b>practicado de verdad</b>: resuelve el ${pct(P().umbral)} % de los problemas de la ruta y el ${pct(P().umbralJasp)} % de las lecturas de JASP.</p>
        <div class="requisitos centro"><div><b>${pct(r.g)} %</b> problemas${barra(r.g, "medio")}</div><div><b>${pct(r.j)} %</b> JASP${barra(r.j, "medio")}</div></div>
        <p>¿Por qué? Los ítems solo te dicen <i>dónde</i> fallas. Lo que te prepara para el examen es tomar las decisiones, analizar y redactar. Memorizar respuestas (o pedírselas a una IA) daría un diagnóstico falso.</p>
        <a class="boton naranja" href="#parcial">Ir a la ruta</a></section>`; return;
    }
    if (SIM && !SIM.fin) return pintaItem(main);
    const ult = (S().parcial.intentos || []).slice(-1)[0];
    main.innerHTML = `<section class="tarjeta"><h1>🏁 Simulacro del ${P().nombre}</h1>
        <p class="lead">${P().items} ítems de opción múltiple basados en casos, sorteados de un banco de ${banco().items.length}: ${P().reparto[1]} fáciles, ${P().reparto[2]} de dificultad media y ${P().reparto[3]} difíciles, repartidos entre las siete semanas que entran en el examen.</p>
        <ul><li>No verás si aciertas hasta entregar: así se parece más al examen.</li><li>En cada ítem indica tu <b>seguridad</b>. Al final verás si tu confianza coincide con tus aciertos.</li><li>Cada simulacro da prioridad a ítems que aún no has visto.</li></ul>
        <label class="compromiso"><input type="checkbox" id="sim-comp"> Lo haré <b>sin apuntes ni IA</b>. Sé que el diagnóstico solo me sirve si refleja lo que sé hoy.</label>
        <div class="botonera"><button type="button" class="boton" id="sim-ir" disabled>Empezar el simulacro</button></div></section>
      ${(S().parcial.intentos || []).length ? `<section class="tarjeta"><h3>Tus simulacros</h3>${B.tabla(["Fecha", "Nota", "Tema más flojo"], S().parcial.intentos.map((x) => [new Date(x.fecha).toLocaleString("es-ES"), `${x.aciertos}/${x.n} (${pct(x.nota)} %)`, x.peor || "—"]))}${ult ? `<p><button type="button" class="enlace" id="sim-ver">Ver el informe del último simulacro</button></p>` : ""}</section>` : ""}`;
    B.$("#sim-comp").addEventListener("change", (e) => { B.$("#sim-ir").disabled = !e.target.checked; });
    B.$("#sim-ir").addEventListener("click", () => {
      SIM = { items: sortear().map((it) => ({ ...it, orden: B.barajar([0, 1, 2, 3]) })), i: 0, resp: {}, seg: {}, t0: Date.now(), tiempos: {}, entrada: Date.now(), salidas: 0, fin: false };
      pintaItem(main);
    });
    B.$("#sim-ver")?.addEventListener("click", () => { SIM = { ...ult.sim, fin: true }; pintaInforme(main, ult); });
  });
  document.addEventListener("visibilitychange", () => { if (document.hidden && SIM && !SIM.fin && location.hash === "#simulacro") SIM.salidas++; });

  function pintaItem(main) {
    const it = SIM.items[SIM.i], n = SIM.items.length, r = SIM.resp[it.id], sg = SIM.seg[it.id], bk = banco();
    SIM.entrada = Date.now();
    main.innerHTML = `<section class="tarjeta simulacro"><div class="rep-cab"><span>Ítem ${SIM.i + 1} de ${n} · ${bk.temas[it.t]}</span><span>${Object.keys(SIM.resp).length} respondidos</span></div>
      <div class="puntos-sim">${SIM.items.map((x, k) => `<button type="button" data-ir-item="${k}" class="${k === SIM.i ? "actual" : ""} ${SIM.resp[x.id] !== undefined ? "resp" : ""}" aria-label="Ítem ${k + 1}">${k + 1}</button>`).join("")}</div>
      <h3 class="pregunta">${it.s}</h3><div class="opciones">${it.orden.map((k, j) => `<label class="opcion"><input type="radio" name="sim-o" value="${k}" ${r === k ? "checked" : ""}><span><b>${"ABCD"[j]}.</b> ${it.o[k]}</span></label>`).join("")}</div>
      <div class="seguridad"><span>¿Qué seguridad tienes?</span>${[["seguro", "😎 Seguro/a"], ["dudo", "🤔 Dudo"], ["azar", "🎲 Al azar"]].map(([k, t]) => `<button type="button" class="boton peq ${sg === k ? "" : "sec"}" data-seg="${k}">${t}</button>`).join("")}</div>
      <div class="botonera"><button type="button" class="boton gris" id="sim-ant" ${SIM.i ? "" : "disabled"}>← Anterior</button>${SIM.i < n - 1 ? `<button type="button" class="boton" id="sim-sig">Siguiente →</button>` : ""}<button type="button" class="boton ${SIM.i === n - 1 ? "exito" : "sec"}" id="sim-fin">Entregar</button></div></section>`;
    const marca = () => { SIM.tiempos[it.id] = (SIM.tiempos[it.id] || 0) + (Date.now() - SIM.entrada); };
    main.querySelectorAll("input[name=sim-o]").forEach((x) => x.addEventListener("change", () => { SIM.resp[it.id] = Number(x.value); main.querySelector(`[data-ir-item="${SIM.i}"]`).classList.add("resp"); }));
    main.querySelectorAll("[data-seg]").forEach((b) => b.addEventListener("click", () => { SIM.seg[it.id] = b.dataset.seg; main.querySelectorAll("[data-seg]").forEach((x) => x.classList.toggle("sec", x !== b)); }));
    main.querySelectorAll("[data-ir-item]").forEach((b) => b.addEventListener("click", () => { marca(); SIM.i = Number(b.dataset.irItem); pintaItem(main); }));
    B.$("#sim-ant").addEventListener("click", () => { marca(); SIM.i--; pintaItem(main); });
    B.$("#sim-sig")?.addEventListener("click", () => { marca(); SIM.i++; pintaItem(main); });
    B.$("#sim-fin").addEventListener("click", () => {
      marca(); const sin = SIM.items.filter((x) => SIM.resp[x.id] === undefined).length;
      const entrega = () => { B.cerrarModal(); entregar(main); };
      if (sin) { B.modal("¿Entregar ya?", `<p>Te quedan <b>${sin}</b> ítem${sin > 1 ? "s" : ""} sin responder; contarán como fallos.</p>`, `<button type="button" class="boton gris" data-cerrar>Seguir respondiendo</button><button type="button" class="boton" id="sim-entrega">Entregar</button>`); B.$("#sim-entrega").addEventListener("click", entrega); }
      else entrega();
    });
    window.scrollTo(0, 0);
  }

  function entregar(main) {
    SIM.fin = true; const bk = banco(), its = SIM.items;
    const ok = (x) => SIM.resp[x.id] === x.a;
    const porTema = Object.keys(bk.temas).map((t) => { const l = its.filter((x) => x.t === t); return { t, n: l.length, ok: l.filter(ok).length }; }).filter((x) => x.n);
    const porDif = [1, 2, 3].map((d) => { const l = its.filter((x) => x.d === d); return { d, n: l.length, ok: l.filter(ok).length }; });
    const cal = ["seguro", "dudo", "azar"].map((k) => { const l = its.filter((x) => SIM.seg[x.id] === k); return { k, n: l.length, ok: l.filter(ok).length }; });
    const aciertos = its.filter(ok).length, peor = porTema.slice().sort((a, b) => a.ok / a.n - b.ok / b.n)[0];
    const reg = { fecha: new Date().toISOString(), n: its.length, aciertos, nota: aciertos / its.length, porTema, porDif, cal, peor: peor && peor.ok / peor.n < 1 ? bk.temas[peor.t] : null,
      tiempoMedio: Math.round(Object.values(SIM.tiempos).reduce((a, b) => a + b, 0) / its.length / 1000), salidas: SIM.salidas,
      sim: { items: its.map((x) => ({ id: x.id, orden: x.orden })), resp: SIM.resp, seg: SIM.seg } };
    const s = S().parcial; s.intentos = (s.intentos || []).concat([reg]); s.vistos = [...new Set((s.vistos || []).concat(its.map((x) => x.id)))]; B.guardar();
    pintaInforme(main, reg);
  }

  function pintaInforme(main, reg) {
    const bk = banco(), POR = Object.fromEntries(bk.items.map((x) => [x.id, x]));
    const its = reg.sim.items.map((x) => ({ ...POR[x.id], orden: x.orden })).filter((x) => x.id), resp = reg.sim.resp, seg = reg.sim.seg;
    const NOMSEG = { seguro: "Seguro/a", dudo: "Dudaba", azar: "Al azar" };
    const flojos = reg.porTema.filter((x) => x.ok / x.n < 0.6);
    const consejo = (t) => { const u = B.unidades[bk.unidad[t]], casoR = P().ruta.map(caso).find((c) => c && B.unidadesDeCaso(c).includes(bk.unidad[t]));
      return `<div class="consejo"><b>${bk.temas[t]}</b><p>Repasa la teoría${u ? ` de <a href="#unidad/${u.id}">${u.titulo}</a>` : ""}${casoR ? `, vuelve al <a href="#caso/${casoR.id}">caso ${casoR.num}</a>` : ""} y haz el <a href="#repasar/test/${bk.unidad[t]}">test de la unidad</a>.</p></div>`; };
    const calTxt = (() => { const s = reg.cal.find((x) => x.k === "seguro"); if (!s || !s.n) return reg.cal.some((x) => x.n) ? "No marcaste ningún ítem como «Seguro/a»: repasa los que dudabas y acertaste, porque ahí hay conocimiento que aún no te crees." : "Marca tu seguridad en cada ítem para ver si tu confianza es fiable.";
      const p = s.ok / s.n; return p >= 0.85 ? `Cuando te sientes seguro/a, aciertas el ${pct(p)} %: tu confianza es bastante fiable.` : `Cuando te sientes seguro/a solo aciertas el ${pct(p)} %: hay ideas que crees dominar y conviene revisar (mira los fallos marcados como «Seguro/a»).`; })();
    main.innerHTML = `<section class="tarjeta"><h1>Resultado del simulacro</h1>
      <div class="resumen-n"><div><b>${reg.aciertos}/${reg.n}</b>aciertos (${pct(reg.nota)} %)</div>${reg.porDif.map((x) => `<div><b>${x.ok}/${x.n}</b>${["", "fáciles", "medios", "difíciles"][x.d]}</div>`).join("")}<div><b>${reg.tiempoMedio} s</b>por ítem</div></div>
      ${reg.tiempoMedio < 20 ? `<div class="callout warn">Has respondido muy rápido (${reg.tiempoMedio} s por ítem). Los ítems son casos: leerlos con calma da un diagnóstico más útil.</div>` : ""}
      ${reg.salidas > 2 ? `<div class="callout warn">Saliste de la pestaña ${reg.salidas} veces durante el simulacro. Si consultaste algo, el diagnóstico sobrestima lo que sabes hoy.</div>` : ""}
      <div class="botonera"><button type="button" class="boton" id="sim-otro">Otro simulacro</button><a class="boton sec" href="#parcial">Volver a la ruta</a></div></section>
      <div class="dos-col"><section class="tarjeta"><h3>Por semana</h3>${reg.porTema.map((x) => { const p = x.ok / x.n, cl = p >= 0.8 ? "alto" : p >= 0.6 ? "medio" : "bajo";
          return `<div class="barra-comp"><div>${bk.temas[x.t]}</div>${barra(p, cl)}<div class="val">${x.ok}/${x.n}</div></div>`; }).join("")}<p class="nota">${calTxt}</p></section>
        <section class="tarjeta"><h3>Dónde te falta entrenamiento</h3>${flojos.length ? flojos.map((x) => consejo(x.t)).join("") : "<p>Ningún tema por debajo del 60 %. Haz otro simulacro: el banco tiene más ítems que aún no has visto.</p>"}</section></div>
      <section class="tarjeta"><h3>Revisión ítem a ítem</h3><div class="revision">${its.map((x, k) => { const r = resp[x.id], bien = r === x.a;
        return `<details class="rev-it ${bien ? "bien" : "mal"}"><summary><span class="ic">${bien ? "✓" : "✗"}</span> ${k + 1}. ${B.sinTags(x.s).slice(0, 110)}… <small>${bk.temas[x.t]} · ${["", "fácil", "medio", "difícil"][x.d]}${seg[x.id] ? ` · ${NOMSEG[seg[x.id]]}` : ""}</small></summary>
          <p><b>${x.s}</b></p><ul class="opts-rev">${x.orden.map((o) => `<li class="${o === x.a ? "correcta" : o === r ? "erronea" : ""}">${x.o[o]}<span class="por">${o === x.a ? "✓ " : o === r ? "✗ " : ""}${x.w[o]}</span></li>`).join("")}</ul>
          <p class="nota">${r === undefined ? "Sin responder. " : ""}${x.c}</p></details>`; }).join("")}</div></section>`;
    B.$("#sim-otro").addEventListener("click", () => { SIM = null; B.render(); });
    window.scrollTo(0, 0);
  }

  // ---------------- créditos y licencias ----------------
  B.vista("creditos", (main) => {
    main.innerHTML = `<section class="tarjeta"><h1>Créditos y licencias</h1>
      <p><b>Brújula · Laboratorio de Métodos y Diseños de Investigación</b>. © 2026 Eduar Ramírez Riveros, para la asignatura <i>Métodos, Diseño y Técnicas de Investigación en Psicología</i> (Grado en Psicología, ESIC University).</p>
      <h3>Licencias</h3><ul>
        <li><b>Contenidos</b> (textos, casos, ítems, datos simulados, imágenes propias): <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es" target="_blank" rel="license noopener">Creative Commons Atribución-NoComercial-CompartirIgual 4.0 Internacional (CC BY-NC-SA 4.0)</a>. Puedes copiarlos y adaptarlos citando la autoría, sin fines comerciales y compartiendo las adaptaciones con la misma licencia.</li>
        <li><b>Código</b> (HTML, CSS y JavaScript): licencia MIT (archivo LICENSE del repositorio).</li>
        <li><b>Logotipos de ESIC University</b>: marcas de su titular, excluidas de las licencias anteriores. No pueden reutilizarse sin su autorización.</li></ul>
      <p class="nota">Cita sugerida: Ramírez Riveros, E. (2026). <i>Brújula: laboratorio de métodos y diseños de investigación</i> [Recurso educativo abierto]. ESIC University.</p>
      <h3>Fuentes</h3><ul><li>León, O. G. y Montero, I. (2020). <i>Métodos de investigación en psicología y educación: las tradiciones cuantitativa y cualitativa</i> (4.ª ed.). McGraw-Hill.</li>
        <li>Diapositivas de la asignatura (temas 4 a 7) y guías interactivas previas del profesor (diseños, repaso, investigación cualitativa, banco de ítems).</li>
        <li>JASP Team. <i>JASP</i> [software libre]. <a href="https://jasp-stats.org/" target="_blank" rel="noopener">jasp-stats.org</a>.</li></ul>
      <p>Todos los datos de los casos y de los simuladores son <b>simulados</b> con fines docentes. Las personas de los casos son ficticias.</p></section>`;
  });
})(window.Brujula);
