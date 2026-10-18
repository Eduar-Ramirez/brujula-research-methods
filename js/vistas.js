/* =====================================================================
   VISTAS · inicio, orientarse, unidades, consultar y progreso
   ===================================================================== */
(function (B) {
  "use strict";
  const S = () => B.S(), C = () => window.CONTENIDO || { casos: [], ayudas: {}, competencias: {}, consejos: {}, fases: {} };
  const pct = (x) => Math.round(100 * (x || 0));
  const barra = (x, cl = "alto") => `<div class="pista-b" role="img" aria-label="${pct(x)} %"><div class="relleno ${cl}" style="width:${pct(x)}%"></div></div>`;
  const MODOS = [
    ["comprender", "📖", "Comprender", "La teoría esencial de cada diseño, con ejemplos y esquemas."],
    ["experimentar", "🎛️", "Experimentar", "Simuladores de «¿qué pasaría si…?» para ver la lógica en acción."],
    ["investigar", "🔬", "Investigar", "Casos con datos simulados: decide, analiza en JASP y redacta."],
    ["repasar", "🧠", "Repasar", "Tarjetas, test y emparejar para consolidar."]];
  const porBloque = (us) => us.reduce((a, u) => { (a[u.bloque] = a[u.bloque] || []).push(u); return a; }, {});
  const visible = (id) => B.unidades[id] && B.estadoUnidad(B.unidades[id]) !== "oculta";

  function tarjetaUnidad(u) {
    const p = B.progresoUnidad(u), prep = B.estadoUnidad(u) === "en-preparacion", nc = B.casosDeUnidad(u.id).length, ns = (u.simuladores || []).filter((x) => B.simuladores[x]).length;
    return `<a class="unidad-t ${prep ? "es-prep" : ""}" href="#unidad/${u.id}" style="--uc:${u.color}"><span class="u-ic">${u.icono}</span>
      <span class="u-tema">${u.tema} ${B.etiquetaEstado(u)}</span><b>${u.titulo}</b><span class="u-res">${u.resumen}</span>
      <span class="u-cnt">📖 ${u.secciones.length} · 🎛️ ${ns} · 🔬 ${nc} · 🧠 ${(u.test || []).length + (u.flash || []).length}</span>${barra(p)}</a>`;
  }

  // ================================================================ INICIO
  B.vista("inicio", (main) => {
    const d = B.conf.destacado, cr = B.conf.cronograma || [], ini = new Date(B.conf.inicioCurso || Date.now());
    const semHoy = Math.floor((Date.now() - ini) / (7 * 86400000)) + 1;
    const ultCaso = S().casos.caso && B.POR_CASO && B.POR_CASO[S().casos.caso] && !S().casos.fin[S().casos.caso] ? B.POR_CASO[S().casos.caso] : null;
    const fecha = (n) => { const x = new Date(ini.getTime() + (n - 1) * 7 * 86400000); return x.toLocaleDateString("es-ES", { day: "numeric", month: "short" }); };
    const fila = (w) => {
      const u = w.unidad && B.unidades[w.unidad] && B.estadoUnidad(B.unidades[w.unidad]) !== "oculta" ? B.unidades[w.unidad] : null, c = w.caso && B.POR_CASO ? B.POR_CASO[w.caso] : null;
      const prep = u && B.estadoUnidad(u) === "en-preparacion", hecho = c && S().casos.fin[c.id], cl = w.sem === semHoy ? "hoy" : w.sem < semHoy ? "pasada" : "futura";
      return `<li class="semana ${cl} ${w.reto ? "con-reto" : ""}" style="--uc:${u ? u.color : "var(--borde)"}">
        <div class="sem-n"><b>${w.sem}</b><small>${fecha(w.sem)}</small></div>
        <div class="sem-c"><p class="sem-t">${w.sem === semHoy ? '<span class="ahora">Esta semana</span> ' : ""}${w.titulo}${prep ? ' <span class="prep">En preparación</span>' : ""}</p>
          ${w.reto ? `<p class="reto">${w.parcial ? "🏁" : "📌"} ${w.reto}${w.parcial && B.conf.parcial ? ` · <a href="#parcial">prepárate con la ruta</a>` : ""}</p>` : ""}
          <div class="sem-acc">${u ? `<a href="#unidad/${u.id}">📖 Teoría</a>` : ""}${u && (u.simuladores || []).some((x) => B.simuladores[x]) ? `<a href="#unidad/${u.id}/experimentar">🎛️ Simulador</a>` : ""}${c ? `<a href="#caso/${c.id}">${hecho ? "✅" : "🔬"} Caso ${c.num}</a>` : ""}${u && (u.test || []).length ? `<a href="#repasar/test/${u.id}">🧠 Test</a>` : ""}${!u && !c ? '<span class="nota">Materiales próximamente</span>' : ""}</div></div>
        ${u ? `<div class="sem-p">${barra(B.progresoUnidad(u))}</div>` : "<div></div>"}</li>`;
    };
    main.innerHTML = `<section class="hero compacto"><div><h1>Brújula</h1><p class="lead">Laboratorio de Métodos y Diseños de Investigación. Sigue la asignatura semana a semana: teoría, simuladores, casos con datos para JASP y repaso.</p>
        <div class="botonera">${ultCaso ? `<a class="boton naranja" href="#caso/${ultCaso.id}">▶ Continuar el caso ${ultCaso.num}</a>` : ""}<a class="boton blanco" href="#orientarse/brujula">🧭 ¿Qué diseño necesito?</a></div></div></section>
      ${B.htmlMisionPortada ? B.htmlMisionPortada() : ""}
      ${d ? `<div class="callout destacado"><b>${d.titulo || "Esta semana"}</b> ${d.texto || ""} ${d.enlace ? `<a href="${d.enlace}">${d.boton || "Ir →"}</a>` : ""}</div>` : ""}
      <section class="tarjeta"><h2>Semana a semana</h2><ol class="cronograma">${cr.map(fila).join("")}</ol></section>
      ${B.htmlInsignias ? `<section class="tarjeta"><h2>Insignias</h2>${B.htmlInsignias(true)}<p class="nota">Pasa el ratón (o mantén pulsado) sobre una insignia para ver cómo conseguirla.</p></section>` : ""}`;
  });

  // ================================================================ ORIENTARSE
  const fichaDiseno = (d) => `<div class="ficha-d" style="--uc:${d.color}"><p class="nota">${d.icono} ${d.etiqueta} · ${d.tema} · ${d.sub}</p><p>${d.que}</p>
    <div class="callout info"><b>Ejemplo.</b> ${d.ejemplo}</div>
    <div class="dos-col"><div><h4>Cuándo usarlo</h4><p>${d.cuando}</p><h4>Ventajas</h4><ul>${d.pros.map((x) => `<li>${x}</li>`).join("")}</ul></div>
    <div><h4>Cuándo no</h4><p>${d.no}</p><h4>Limitaciones</h4><ul>${d.contras.map((x) => `<li>${x}</li>`).join("")}</ul></div></div>
    <p><b>Pregunta típica:</b> ${d.pregunta}</p><div class="tags-b">${d.claves.map((x) => `<span>${x}</span>`).join("")}</div>
    ${B.tabla(["Manipula la VI", "Asignación aleatoria", "Validez interna", "Validez externa", "Permite causalidad"], [[d.manVi, d.aleat, d.vi, d.ve, d.caus]], "tabla mini")}</div>`;
  B.fichaDiseno = fichaDiseno;
  const abrirFicha = (id) => { const d = B.datosMapa.disenos.find((x) => x.id === id); if (!d) return;
    B.modal(d.name, fichaDiseno(d), `${visible(d.unidad) ? `<a class="boton" href="#unidad/${d.unidad}" data-cerrar>Ir a la unidad</a>` : ""}<button type="button" class="boton sec" data-cerrar>Cerrar</button>`); };
  document.addEventListener("click", (ev) => { const t = ev.target.closest("[data-ficha]"); if (t) abrirFicha(t.dataset.ficha); });

  let rutaArbol = [];
  B.vista("orientarse", (main, [sub]) => {
    sub = ["mapa", "brujula", "comparador"].includes(sub) ? sub : "mapa";
    main.innerHTML = `<section class="tarjeta cabecera-vista"><h1>Orientarse</h1><p class="lead">Antes de elegir un diseño hay que saber qué pregunta tienes y qué puedes hacer: ¿puedes manipular la variable?, ¿asignar al azar?, ¿quieres medir o comprender significados?</p></section>
      ${B.subnav("orientarse", [["mapa", "🗺️ Mapa de diseños"], ["brujula", "🧭 Brújula de decisión"], ["comparador", "⚖️ Comparador"]], sub)}<div id="or-zona"></div>`;
    const z = B.$("#or-zona"), ds = B.datosMapa.disenos;
    if (sub === "mapa") {
      const grupos = {}; ds.forEach((d) => { const u = B.unidades[d.unidad]; const g = u ? u.bloque : "Otros"; (grupos[g] = grupos[g] || []).push(d); });
      const orden = Object.keys(grupos).sort((a, b) => Math.min(...grupos[a].map((d) => B.unidades[d.unidad]?.orden ?? 99)) - Math.min(...grupos[b].map((d) => B.unidades[d.unidad]?.orden ?? 99)));
      z.innerHTML = `<p class="nota">Pulsa un diseño para ver su ficha: qué es, cuándo usarlo, un ejemplo, ventajas y limitaciones.</p>` + orden.map((g) => `<h2 class="nivel-tit">${g}</h2><div class="rejilla">${grupos[g].map((d) => `<button type="button" class="diseno-t" data-ficha="${d.id}" style="--uc:${d.color}"><span class="u-ic">${d.icono}</span><span class="u-tema">${d.tema} · ${d.etiqueta}</span><b>${d.name}</b><span class="u-res">${d.sub}</span></button>`).join("")}</div>`).join("");
    } else if (sub === "brujula") {
      const pinta = () => {
        let n = B.datosMapa.arbol; const miga = [];
        for (const k of rutaArbol) { const o = n.opts[k]; miga.push(o); if (o.next) n = o.next; else { n = null; break; } }
        const ultimo = miga[miga.length - 1], res = ultimo && ultimo.res;
        z.innerHTML = `<section class="tarjeta arbol">${miga.length ? `<ol class="miga-arbol">${miga.map((o, i) => `<li><button type="button" data-volver="${i}" title="Cambiar esta respuesta">${o.icon} ${o.label}</button></li>`).join("")}</ol>` : `<p class="nota">Responde a unas pocas preguntas sobre tu investigación. Al final te diremos qué diseño encaja y dónde estudiarlo.</p>`}
          ${res ? `<div class="resultado-a" style="--uc:${res.color}"><p class="sobre">Diseño recomendado</p><h2>${res.name}</h2><p>${res.why}</p><p class="nota">${res.tema}${B.unidades[res.unidad] ? ` · Unidad: ${B.unidades[res.unidad].titulo}` : ""}</p>
              <div class="botonera">${visible(res.unidad) ? `<a class="boton" href="#unidad/${res.unidad}">Estudiar esta unidad</a>` : ""}${B.casosDeUnidad(res.unidad).length ? `<a class="boton sec" href="#unidad/${res.unidad}/investigar">Practicar con un caso</a>` : ""}<button type="button" class="boton gris" id="ar-reset">Empezar de nuevo</button></div></div>`
            : `<h2 class="pregunta">${n.q}</h2><div class="opciones-a">${n.opts.map((o, k) => `<button type="button" class="opcion-a" data-op="${k}"><span class="ic">${o.icon}</span>${o.label}</button>`).join("")}</div>${miga.length ? `<button type="button" class="boton peq gris" data-volver="${miga.length - 1}">← Atrás</button>` : ""}`}</section>`;
        z.querySelectorAll("[data-op]").forEach((b) => b.addEventListener("click", () => { rutaArbol.push(Number(b.dataset.op)); pinta(); }));
        z.querySelectorAll("[data-volver]").forEach((b) => b.addEventListener("click", () => { rutaArbol = rutaArbol.slice(0, Number(b.dataset.volver)); pinta(); }));
        z.querySelector("#ar-reset")?.addEventListener("click", () => { rutaArbol = []; pinta(); });
      };
      pinta();
    } else {
      const sel = (id, v) => `<select id="${id}">${ds.map((d) => `<option value="${d.id}" ${d.id === v ? "selected" : ""}>${d.icono} ${B.esc(d.name)}</option>`).join("")}</select>`;
      z.innerHTML = `<section class="tarjeta"><h3>Todos los diseños de un vistazo</h3>
        <div class="scroll-x"><table class="tabla comparador"><tr><th>Diseño</th><th>Tema</th><th>Manipula la VI</th><th>Aleatoriza</th><th>Validez interna</th><th>Validez externa</th><th>Causalidad</th><th>Tradición</th></tr>
        ${ds.map((d) => `<tr><th><button type="button" class="enlace" data-ficha="${d.id}">${d.icono} ${d.name}</button></th><td>${d.tema}</td>${[d.manVi, d.aleat, d.vi, d.ve, d.caus].map((x) => `<td class="v-${/^(Sí|Alta)/.test(x) ? "si" : /^(No|Baja)/.test(x) ? "no" : "medio"}">${x}</td>`).join("")}<td>${d.trad}</td></tr>`).join("")}</table></div>
        <p class="nota">Pulsa el nombre de un diseño para abrir su ficha.</p></section>
        <section class="tarjeta"><h3>Compara dos diseños</h3><div class="dos-col"><div>${sel("cmp-a", "expg")}<div id="cmp-za"></div></div><div>${sel("cmp-b", "cuasi")}<div id="cmp-zb"></div></div></div></section>`;
      const pc = () => { ["a", "b"].forEach((k) => { const d = ds.find((x) => x.id === B.$("#cmp-" + k).value); B.$("#cmp-z" + k).innerHTML = `<h3>${d.name}</h3>` + fichaDiseno(d); }); };
      B.$("#cmp-a").addEventListener("change", pc); B.$("#cmp-b").addEventListener("change", pc); pc();
    }
  });

  // ================================================================ UNIDADES
  B.vista("unidades", (main) => {
    const us = B.listaUnidades();
    main.innerHTML = `<section class="tarjeta cabecera-vista"><h1>Unidades</h1><p class="lead">Las marcadas «en preparación» ya tienen teoría y repaso; sus simuladores y casos se irán incorporando.</p>
      <div class="modos4">${MODOS.map(([id, ic, nom, txt], i) => `<div class="modo4"><span class="n">${i + 1}</span><span class="ic">${ic}</span><b>${nom}</b><p>${txt}</p></div>`).join('<span class="flecha" aria-hidden="true">→</span>')}</div></section>` +
      Object.entries(porBloque(us)).map(([b, l]) => `<h2 class="nivel-tit">${b}</h2><div class="rejilla">${l.map(tarjetaUnidad).join("")}</div>`).join("");
  });

  const PEST = [["comprender", "📖 Comprender"], ["experimentar", "🎛️ Experimentar"], ["investigar", "🔬 Investigar"], ["repasar", "🧠 Repasar"]];
  B.vista("unidad", (main, [id, tab]) => {
    const u = B.unidades[id]; if (!u || B.estadoUnidad(u) === "oculta") { B.ir("unidades"); return; }
    tab = PEST.some((p) => p[0] === tab) ? tab : "comprender";
    const prep = B.estadoUnidad(u) === "en-preparacion", lista = B.listaUnidades(), pos = lista.findIndex((x) => x.id === id);
    main.innerHTML = `<p class="miga"><a href="#unidades">Unidades</a> › ${u.tema}</p>
      <section class="cab-unidad" style="--uc:${u.color}"><span class="u-ic">${u.icono}</span><div><p class="sobre">${u.bloque} · ${u.tema} · ${u.libro}</p><h1>${u.titulo} ${B.etiquetaEstado(u)}</h1><p>${u.resumen}</p></div>
        <div class="u-prog"><b>${pct(B.progresoUnidad(u))} %</b>${barra(B.progresoUnidad(u))}<span class="nota">progreso</span></div></section>
      ${B.subnav("unidad/" + id, PEST, tab)}
      ${prep ? `<div class="callout warn"><b>Unidad en preparación.</b> La teoría y el repaso ya están disponibles; los simuladores y los casos con datos se incorporarán más adelante.</div>` : ""}
      <div id="u-zona"></div>
      <nav class="pag-u">${pos > 0 ? `<a href="#unidad/${lista[pos - 1].id}">← ${lista[pos - 1].tema} · ${lista[pos - 1].titulo}</a>` : "<span></span>"}${pos < lista.length - 1 ? `<a href="#unidad/${lista[pos + 1].id}">${lista[pos + 1].tema} · ${lista[pos + 1].titulo} →</a>` : ""}</nav>`;
    const z = B.$("#u-zona");
    const sims = (u.simuladores || []).filter((x) => B.simuladores[x]).map((x) => B.simuladores[x]), casos = B.casosDeUnidad(id);
    const siguiente = () => sims.length ? `<div class="callout ok"><b>Siguiente paso:</b> comprueba la lógica en el simulador <a href="#simulador/${sims[0].id}">${sims[0].titulo}</a>${casos.length ? ` y después aplica lo aprendido en el <a href="#caso/${casos[0].id}">caso ${casos[0].num}</a>` : ""}.</div>` : `<div class="callout ok"><b>Siguiente paso:</b> <a href="#repasar/test/${id}">haz el test de la unidad</a>.</div>`;
    if (tab === "comprender") {
      const fichas = B.datosMapa.disenos.filter((d) => d.unidad === id);
      z.innerHTML = `<div class="comprender"><aside class="indice tarjeta"><h3>En esta unidad</h3><ol>${u.secciones.map((s) => `<li class="${S().leido[id + "/" + s.id] ? "leida" : ""}"><button type="button" data-sec="${s.id}">${s.titulo}</button></li>`).join("")}</ol>
          ${fichas.length ? `<h3>Fichas de diseño</h3><ul class="sin">${fichas.map((d) => `<li><button type="button" class="enlace" data-ficha="${d.id}">${d.icono} ${d.name}</button></li>`).join("")}</ul>` : ""}</aside>
        <div>${gancho(u)}${u.secciones.map((s) => { const l = S().leido[id + "/" + s.id];
          return `<section class="tarjeta teoria" id="sec-${s.id}" style="--uc:${u.color}"><p class="sobre">${s.sub || ""}</p><h2>${s.titulo}</h2>${s.html}
            <div class="botonera"><button type="button" class="boton ${l ? "exito" : "sec"}" data-leido="${s.id}" aria-pressed="${!!l}">${l ? "✓ Leída" : "Marcar como leída"}</button></div></section>`; }).join("")}${siguiente()}</div></div>`;
      z.querySelectorAll("[data-gancho]").forEach((b) => b.addEventListener("click", () => { const q = u.test[0], k = Number(b.dataset.gancho);
        z.querySelectorAll("[data-gancho]").forEach((x) => { x.disabled = true; const j = Number(x.dataset.gancho); x.classList.add(j === q.a ? "correcta" : j === k ? "erronea" : "bloqueada"); });
        B.$("#gancho-fb").innerHTML = `<div class="feedback ${k === q.a ? "bien" : "mal"}"><p class="veredicto">${k === q.a ? "¡Buena apuesta!" : "No era esa… ¡y ahora lo recordarás mejor!"}</p><p>${q.fb || ""}</p></div>`; }));
      z.querySelectorAll("[data-sec]").forEach((b) => b.addEventListener("click", () => document.getElementById("sec-" + b.dataset.sec).scrollIntoView({ behavior: "smooth" })));
      z.querySelectorAll("[data-leido]").forEach((b) => b.addEventListener("click", () => { const k = id + "/" + b.dataset.leido; if (S().leido[k]) delete S().leido[k]; else S().leido[k] = true; B.guardar();
        const y = window.scrollY; B.render(); window.scrollTo(0, y); }));
    } else if (tab === "experimentar") {
      z.innerHTML = sims.length ? `<div class="rejilla">${sims.map((s) => `<article class="caso-t"><div class="cab"><span class="icono-g">${s.icono}</span></div><h4>${s.titulo}</h4><p>${s.resumen}</p><div class="pie-t"><span class="estado">${(S().sims[s.id]?.retos || []).filter(Boolean).length} de ${s.retos.length} retos</span><a class="boton peq" href="#simulador/${s.id}">Abrir</a></div></article>`).join("")}</div>`
        : `<div class="tarjeta vacio"><h3>Aún no hay simulador para esta unidad</h3><p>Mientras tanto, prueba los <a href="#simuladores">simuladores disponibles</a> o la <a href="#orientarse/brujula">brújula de decisión</a>.</p></div>`;
    } else if (tab === "investigar") {
      z.innerHTML = casos.length ? `<p class="nota">Casos con datos simulados para JASP en los que este diseño es protagonista. Cada caso recorre las ocho fases: pregunta, variables, diseño, procedimiento, datos, análisis, interpretación y comunicación.</p><div class="rejilla">${casos.map(B.tarjetaCaso).join("")}</div>`
        : `<div class="tarjeta vacio"><h3>Casos en preparación</h3><p>${prep ? "Los casos con datos de esta unidad se incorporarán más adelante." : "Esta unidad no tiene casos propios: sus contenidos se aplican en los casos de los temas 4 a 6."}</p><a class="boton sec" href="#casos">Ver todos los casos</a></div>`;
    } else {
      const r = B.repasoResumen(u);
      z.innerHTML = `<div class="rejilla">
        ${r.fl ? `<a class="caso-t enlace-t" href="#repasar/tarjetas/${id}"><h4>🃏 Tarjetas</h4><p>${r.fl} conceptos clave. Sabes ${r.sab}.</p>${barra(r.sab / r.fl)}</a>` : ""}
        ${r.te ? `<a class="caso-t enlace-t" href="#repasar/test/${id}"><h4>✅ Test</h4><p>${Math.min(10, r.te)} preguntas al azar de ${r.te}. ${r.mejor !== null ? `Mejor marca: ${pct(r.mejor)} %.` : "Aún no lo has hecho."}</p>${barra(r.mejor || 0)}</a>` : ""}
        ${r.em ? `<a class="caso-t enlace-t" href="#repasar/emparejar/${id}"><h4>🔗 Emparejar</h4><p>${r.em} ejercicio${r.em > 1 ? "s" : ""}: situación ↔ concepto. Completado${r.em > 1 ? "s" : ""}: ${r.emh}.</p>${barra(r.emh / r.em)}</a>` : ""}</div>
        ${u.glosario && u.glosario.length ? `<section class="tarjeta"><h3>Glosario de la unidad</h3><dl class="glosario">${u.glosario.map((g) => `<dt>${g.es} <span class="en">(${g.en})</span></dt><dd>${g.def}</dd>`).join("")}</dl></section>` : ""}`;
    }
  });

  // pregunta de «apuesta» antes de leer (efecto de pretest: intentar responder antes mejora el aprendizaje posterior)
  function gancho(u) {
    const q = (u.test || [])[0]; if (!q) return "";
    return `<section class="tarjeta gancho" style="--uc:${u.color}"><p class="sobre">🎲 Antes de leer, apuesta</p><h3>${q.q}</h3>
      <div class="opciones">${q.o.map((o, k) => `<button type="button" class="opcion opt-test" data-gancho="${k}">${o}</button>`).join("")}</div><div id="gancho-fb"></div>
      <p class="nota">No cuenta para nada: intentar responder antes de estudiar ayuda a recordar mejor después.</p></section>`;
  }

  // ================================================================ CONSULTAR
  B.vista("consultar", (main, [sub]) => {
    sub = ["glosario", "amenazas", "ayudas"].includes(sub) ? sub : "glosario";
    main.innerHTML = `<section class="tarjeta cabecera-vista"><h1>Consultar</h1><p class="lead">Material de referencia rápida para cuando estés resolviendo un caso o preparando tu propio diseño.</p></section>
      ${B.subnav("consultar", [["glosario", "📚 Glosario"], ["amenazas", "⚠️ Amenazas a la validez"], ["ayudas", "📊 Fichas de análisis"]], sub)}<div id="co-zona"></div>`;
    const z = B.$("#co-zona");
    if (sub === "glosario") {
      const vistos = new Map();
      B.listaUnidades().forEach((u) => { (u.glosario || []).forEach((g) => { const k = B.sinTags(g.es).toLowerCase(); if (!vistos.has(k)) vistos.set(k, { t: g.es, en: g.en, d: g.def, uid: u.id }); });
        (u.flash || []).forEach((f) => { const k = B.sinTags(f.t).toLowerCase(); if (!vistos.has(k)) vistos.set(k, { t: f.t, d: f.d, uid: u.id }); }); });
      const todos = [...vistos.values()].sort((a, b) => B.sinTags(a.t).localeCompare(B.sinTags(b.t), "es"));
      z.innerHTML = `<section class="tarjeta"><input type="search" id="gl-q" placeholder="Busca un término (p. ej., contrabalanceo, interacción, validez)…" aria-label="Buscar en el glosario"><p class="nota" id="gl-n"></p><dl class="glosario" id="gl-l"></dl></section>`;
      const filtra = () => { const q = B.$("#gl-q").value.trim().toLowerCase(); const f = todos.filter((x) => !q || (B.sinTags(x.t) + " " + (x.en || "") + " " + B.sinTags(x.d)).toLowerCase().includes(q));
        B.$("#gl-n").textContent = `${f.length} término${f.length === 1 ? "" : "s"}`;
        B.$("#gl-l").innerHTML = f.map((x) => `<dt>${x.t}${x.en ? ` <span class="en">(${x.en})</span>` : ""} ${B.chipUnidad(x.uid)}</dt><dd>${x.d}</dd>`).join(""); };
      B.$("#gl-q").addEventListener("input", filtra); filtra();
    } else if (sub === "amenazas") {
      const A = B.datosMapa.amenazas, col = (l) => l.map((a) => `<div class="amenaza" style="--uc:${a.color}"><b>${a.name}</b> <span class="en">(${a.en})</span><p>${a.def}</p><div class="tags-b">${(a.affects || []).map((x) => `<span>${x}</span>`).join("")}</div></div>`).join("");
      z.innerHTML = `<div class="dos-col"><section class="tarjeta"><h3>Validez interna</h3><p class="nota">¿Podemos afirmar que el cambio en la VD se debe a la VI y no a otra cosa?</p>${col(A.internal)}</section>
        <section class="tarjeta"><h3>Validez externa</h3><p class="nota">¿Se pueden generalizar los resultados a otras personas, situaciones y momentos?</p>${col(A.external)}</section></div>
        <div class="callout info">Las etiquetas indican en qué diseños suele preocupar más cada amenaza. Los experimentos con asignación aleatoria y grupo control neutralizan la mayoría de amenazas a la validez interna; los cuasiexperimentos y los diseños ex post facto deben vigilarlas activamente.</div>`;
    } else {
      const g = {}; Object.entries(C().ayudas).forEach(([k, a]) => { (g[a.grupo] = g[a.grupo] || []).push([k, a]); });
      z.innerHTML = `<section class="tarjeta"><p>Fichas breves sobre decisiones de análisis, supuestos, JASP y redacción APA. Son las mismas que aparecen como ayuda dentro de los casos.</p>
        <p class="nota"><span class="origen diapositivas">Contenido de clase</span> procede de las diapositivas · <span class="origen mixto">Clase + complemento</span> · <span class="origen complemento">Complemento</span> amplía con bibliografía actual.</p></section>` +
        Object.entries(g).map(([n, l]) => `<h2 class="nivel-tit">${n}</h2><div class="rejilla chips">${l.map(([k, a]) => `<button type="button" class="ayuda-t" data-ayuda="${k}"><b>${a.titulo}</b><span class="origen ${a.origen.toLowerCase()}">${a.origen === "Diapositivas" ? "Clase" : a.origen === "Mixto" ? "Clase + complemento" : "Complemento"}</span></button>`).join("")}</div>`).join("");
    }
  });

  // ================================================================ PROGRESO
  function competencias() {
    const df = B.informeCasos ? B.informeCasos() : [];
    return { df, comp: Object.keys(C().competencias).map((cc) => { const s = df.filter((x) => x.comp === cc); return { comp: cc, n: s.length, media: s.length ? s.reduce((a, b) => a + b.punt, 0) / s.length : null, primera: s.filter((x) => x.punt === 1).length }; }) };
  }
  function filasUnidades() {
    return B.listaUnidades().map((u) => { const r = B.repasoResumen(u), nsec = u.secciones.length, nl = u.secciones.filter((s) => S().leido[u.id + "/" + s.id]).length;
      const sims = (u.simuladores || []).filter((x) => B.simuladores[x]), ca = B.casosDeUnidad(u.id);
      return { u, p: B.progresoUnidad(u), leidas: `${nl}/${nsec}`, sims: sims.length ? `${sims.filter((x) => S().sims[x]).length}/${sims.length}` : "—", casos: ca.length ? `${ca.filter((c) => S().casos.fin[c.id]).length}/${ca.length}` : "—", test: r.te ? (r.mejor !== null ? pct(r.mejor) + " %" : "sin hacer") : "—", flash: r.fl ? `${r.sab}/${r.fl}` : "—" }; });
  }
  B.vista("progreso", (main) => {
    const { df, comp } = competencias(), fu = filasUnidades(), err = B.erroresCasos ? B.erroresCasos() : [];
    const nLeidas = Object.keys(S().leido).length, nSims = Object.keys(S().sims).length, nCasos = Object.keys(S().casos.fin).length, nTest = Object.keys(S().test).length;
    const barras = comp.map((x) => { const cl = x.media == null ? "" : x.media >= 0.8 ? "alto" : x.media >= 0.55 ? "medio" : "bajo";
      return `<div class="barra-comp"><div>${C().competencias[x.comp]}</div>${barra(x.media || 0, cl)}<div class="val">${x.media == null ? "sin datos" : `${pct(x.media)} % · ${x.primera} de ${x.n} a la primera`}</div></div>`; }).join("");
    const debiles = comp.filter((x) => x.media != null && x.n >= 2 && x.media < 0.7);
    const consejos = debiles.length ? debiles.map((x) => `<div class="consejo"><b>${C().competencias[x.comp]}</b><p>${C().consejos[x.comp].txt}</p><div class="ayudas-paso">${C().consejos[x.comp].ayudas.map((a) => C().ayudas[a] ? `<button type="button" class="chip" data-ayuda="${a}">${C().ayudas[a].titulo}</button>` : "").join("")}</div></div>`).join("")
      : `<p>${df.length ? "Ninguna competencia por debajo del 70 % (con al menos dos decisiones)." : "Resuelve pasos de los casos para ver aquí tus competencias."}</p>`;
    main.innerHTML = `<section class="tarjeta"><h1>Mi progreso</h1>
        <div class="resumen-n"><div><b>${nLeidas}</b>secciones leídas</div><div><b>${nSims}</b>simuladores usados</div><div><b>${nCasos}</b>casos completados</div><div><b>${df.length}</b>decisiones en casos</div><div><b>${nTest}</b>tests hechos</div></div>
        <div class="botonera"><button type="button" class="boton" id="pr-desc">⬇ Descargar informe (HTML)</button><button type="button" class="boton gris" id="pr-borrar">Borrar mi progreso</button></div>
        <p class="nota">Tu progreso se guarda automáticamente en este navegador. Si cambias de ordenador o de navegador, empezarás de cero: descarga el informe si quieres conservarlo o entregarlo.</p></section>
      ${B.htmlInsignias ? `<section class="tarjeta"><h3>Insignias</h3>${B.htmlInsignias(false)}</section>` : ""}
      ${(S().parcial.intentos || []).length ? `<section class="tarjeta"><h3>Simulacros</h3>${B.tabla(["Fecha", "Aciertos", "Tema más flojo"], S().parcial.intentos.map((x) => [new Date(x.fecha).toLocaleString("es-ES"), `${x.aciertos}/${x.n} (${pct(x.nota)} %)`, x.peor || "—"]))}<p><a href="#simulacro">Ir al simulacro</a></p></section>` : ""}
      <section class="tarjeta"><h3>Por unidad</h3><div class="scroll-x"><table class="tabla prog-u"><tr><th>Unidad</th><th>Progreso</th><th>📖 Leídas</th><th>🎛️ Simuladores</th><th>🔬 Casos</th><th>✅ Test</th><th>🃏 Tarjetas</th></tr>
        ${fu.map((f) => `<tr><th><a href="#unidad/${f.u.id}">${f.u.icono} ${f.u.tema} · ${f.u.titulo}</a></th><td>${barra(f.p)}<span class="nota">${pct(f.p)} %</span></td><td>${f.leidas}</td><td>${f.sims}</td><td>${f.casos}</td><td>${f.test}</td><td>${f.flash}</td></tr>`).join("")}</table></div>
        <p class="nota">El progreso de cada unidad combina, a partes iguales, lo que tiene disponible: secciones leídas, simuladores usados, casos completados y mejor nota del test.</p></section>
      <div class="dos-col"><section class="tarjeta"><h3>Competencias en los casos</h3>${barras}<p class="nota">Puntuación: 1 si aciertas a la primera, 0,5 si aciertas tras reintentar, 0 si ves la respuesta razonada.</p></section>
        <section class="tarjeta"><h3>Conviene reforzar</h3>${consejos}</section></div>
      <section class="tarjeta"><h3>Errores en los casos y por qué</h3>${err.length ? `<div class="scroll-x"><table class="tabla"><tr><th>Caso</th><th>Fase</th><th>Tu respuesta</th><th>Por qué no era adecuada</th></tr>${err.slice(-25).reverse().map((x) => `<tr><td>${B.POR_CASO[x.caso] ? B.POR_CASO[x.caso].num : ""}</td><td>${C().fases[x.fase] || ""}</td><td>${B.esc(x.resp)}</td><td>${x.fb}</td></tr>`).join("")}</table></div>${err.length > 25 ? `<p class="nota">Se muestran los 25 más recientes; el informe descargado los incluye todos.</p>` : ""}` : "<p>No hay respuestas erróneas registradas.</p>"}</section>`;
    B.$("#pr-desc").addEventListener("click", descargar);
    B.$("#pr-borrar").addEventListener("click", () => B.modal("¿Borrar todo tu progreso?", "<p>Se borrarán las secciones leídas, los simuladores, los casos, los tests y las tarjetas de este navegador. No se puede deshacer.</p>",
      `<button type="button" class="boton gris" data-cerrar>Cancelar</button><button type="button" class="boton" id="pr-si">Sí, borrar</button>`));
  });
  document.addEventListener("click", (ev) => { if (ev.target.id === "pr-si") { B.reiniciar(); B.cerrarModal(); B.aviso("Progreso borrado"); B.render(); } });

  function descargar() {
    const { df, comp } = competencias(), fu = filasUnidades(), err = B.erroresCasos ? B.erroresCasos() : [];
    const t = (cab, filas) => `<table><tr>${cab.map((x) => `<th>${x}</th>`).join("")}</tr>${filas.map((f) => `<tr>${f.map((x) => `<td>${x}</td>`).join("")}</tr>`).join("")}</table>`;
    const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Informe de progreso · Brújula</title><style>body{font-family:Arial,sans-serif;max-width:960px;margin:2em auto;color:#001447;padding:0 1em}table{border-collapse:collapse;width:100%;margin:1em 0}td,th{border:1px solid #D6DCEA;padding:6px;text-align:left;vertical-align:top}th{background:#EEF2FD}h1,h2{color:#0047E8}</style></head><body>
      <h1>Informe de progreso · Brújula</h1><p>Laboratorio de Métodos y Diseños de Investigación · ESIC University · ${new Date().toLocaleString("es-ES")}</p>
      <h2>Por unidad</h2>${t(["Unidad", "Progreso", "Leídas", "Simuladores", "Casos", "Test (mejor)", "Tarjetas sabidas"], fu.map((f) => [`${f.u.tema} · ${f.u.titulo}`, pct(f.p) + " %", f.leidas, f.sims, f.casos, f.test, f.flash]))}
      <h2>Competencias en los casos</h2>${t(["Competencia", "Puntuación"], comp.map((x) => [C().competencias[x.comp], x.media == null ? "sin datos" : `${pct(x.media)} % (${x.n} decisiones, ${x.primera} a la primera)`]))}
      <h2>Decisiones en los casos</h2>${df.length ? t(["Caso", "Fase", "Decisión", "Resultado"], df.map((x) => [B.POR_CASO[x.caso] ? B.POR_CASO[x.caso].num + ". " + B.POR_CASO[x.caso].titulo : x.caso, C().fases[x.fase] || "", B.esc(x.titulo), x.punt === 1 ? "A la primera" : x.revelado ? "Respuesta razonada" : `Tras ${x.intentos} intentos`])) : "<p>Sin decisiones registradas.</p>"}
      <h2>Ruta al parcial</h2>${(() => { const r = B.estadoRuta ? B.estadoRuta() : null; return r ? `<p>Problemas resueltos: ${r.ok}/${r.n} (${pct(r.g)} %). Lecturas de JASP: ${r.okj}/${r.nj} (${pct(r.j)} %).</p>` : ""; })()}
      <h2>Simulacros</h2>${(S().parcial.intentos || []).length ? t(["Fecha", "Aciertos", "Por semana"], S().parcial.intentos.map((x) => [new Date(x.fecha).toLocaleString("es-ES"), `${x.aciertos}/${x.n}`, x.porTema.map((y) => `${y.t}: ${y.ok}/${y.n}`).join(" · ")])) : "<p>Sin simulacros.</p>"}
      <h2>Errores y explicación</h2>${err.length ? t(["Caso", "Fase", "Respuesta", "Por qué no era adecuada"], err.map((x) => [B.POR_CASO[x.caso] ? B.POR_CASO[x.caso].num : "", C().fases[x.fase] || "", B.esc(x.resp), x.fb])) : "<p>Sin errores registrados.</p>"}</body></html>`;
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([html], { type: "text/html;charset=utf-8" }));
    a.download = `brujula_progreso_${new Date().toISOString().slice(0, 10)}.html`; document.body.appendChild(a); a.click(); a.remove();
  }
})(window.Brujula);
