/* =====================================================================
   BRÚJULA · Laboratorio de Métodos y Diseños de Investigación
   Núcleo: registro de contenidos, estado del estudiante, rutas y utilidades.
   Cada archivo de datos/ se registra llamando a Brujula.unidad(), Brujula.mapa()…
   ===================================================================== */
window.Brujula = (function () {
  "use strict";
  const B = { unidades: {}, vistas: {}, simuladores: {}, conf: { estados: {}, destacado: null, mostrarEnPreparacion: true, parcial: null } };

  // ---------- registro de contenidos ----------
  B.unidad = (u) => { B.unidades[u.id] = u; };
  B.mapa = (m) => { B.datosMapa = m; };
  B.banco = (b) => { B._bancoCrudo = b; };
  B.config = (c) => { Object.assign(B.conf, c); };
  B.vista = (nombre, fn) => { B.vistas[nombre] = fn; };
  B.simulador = (s) => { B.simuladores[s.id] = s; };
  B.estadoUnidad = (u) => B.conf.estados[u.id] || u.estado;
  B.listaUnidades = (incluirPrep = B.conf.mostrarEnPreparacion) => Object.values(B.unidades)
    .filter((u) => { const e = B.estadoUnidad(u); return e === "activa" || (incluirPrep && e === "en-preparacion"); })
    .sort((a, b) => a.orden - b.orden);

  // ---------- utilidades ----------
  B.$ = (s, r = document) => r.querySelector(s);
  B.$$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  B.esc = (s) => String(s ?? "").replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
  B.sinTags = (s) => String(s ?? "").replace(/<[a-z/][^>]*>/gi, "");
  B.barajar = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  B.chipUnidad = (id) => { const u = B.unidades[id]; return u ? `<a class="chip-u" href="#unidad/${id}" style="--uc:${u.color}">${u.icono} ${u.tema}</a>` : ""; };
  B.etiquetaEstado = (u) => B.estadoUnidad(u) === "en-preparacion" ? `<span class="prep">En preparación</span>` : "";

  // ---------- estado del estudiante (en este navegador) ----------
  const CLAVE = "brujula_mdi_v1";
  const nuevo = () => ({ modo: "guiado", casos: { caso: null, estado: {}, ruta: {}, ver: {}, log: [], fin: {}, desbloq: {} },
    leido: {}, sims: {}, flash: {}, test: {}, empareja: {}, parcial: { intentos: [], vistos: [] }, dias: [], ultima: null });
  let S = nuevo();
  try {
    const g = JSON.parse(localStorage.getItem(CLAVE) || "null");
    if (g) S = Object.assign(nuevo(), g);
    else { // migrar el progreso de la versión anterior (solo casos)
      const v = JSON.parse(localStorage.getItem("mdi_decide_web_v1") || "null");
      if (v && v.estado) { S.casos = Object.assign(S.casos, { caso: v.caso, estado: v.estado, ruta: v.ruta, ver: v.ver, log: v.log, fin: v.fin, desbloq: v.desbloq }); S.modo = v.modo || "guiado"; }
    }
  } catch (e) { /* sin almacenamiento */ }
  B.S = () => S;
  B.guardar = () => { const hoy = new Date().toISOString().slice(0, 10); if (!S.dias.includes(hoy)) S.dias.push(hoy); try { localStorage.setItem(CLAVE, JSON.stringify(S)); } catch (e) { /* nada */ } };
  B.reiniciar = () => { const m = S.modo; S = nuevo(); S.modo = m; B.guardar(); };

  // progreso de una unidad (0-1) combinando las cuatro formas de trabajo
  B.progresoUnidad = (u) => {
    const partes = [];
    if (u.secciones && u.secciones.length) partes.push(u.secciones.filter((s) => S.leido[u.id + "/" + s.id]).length / u.secciones.length);
    const sims = (u.simuladores || []).filter((x) => B.simuladores[x]);
    if (sims.length) partes.push(sims.filter((x) => S.sims[x]).length / sims.length);
    const casos = B.casosDeUnidad(u.id);
    if (casos.length) partes.push(casos.filter((c) => S.casos.fin[c.id]).length / casos.length);
    const t = S.test[u.id]; if ((u.test || []).length) partes.push(t ? Math.min(1, t.mejor) : 0);
    return partes.length ? partes.reduce((a, b) => a + b, 0) / partes.length : 0;
  };
  // casos con datos asociados a una unidad (a partir de su tema)
  B.unidadesDeCaso = (c) => { if (c.unidades && c.unidades.length) return c.unidades.filter((id) => B.unidades[id]); const m = String(c.tema).match(/\d+/g) || []; return m.map((n) => "t" + n).filter((id) => B.unidades[id]); };
  B.casosDeUnidad = (id) => (window.CONTENIDO ? window.CONTENIDO.casos.filter((c) => B.unidadesDeCaso(c).includes(id)) : []);

  // ---------- interfaz común ----------
  B.aviso = (t) => { const a = B.$("#aviso"); a.textContent = t; a.classList.add("ver"); clearTimeout(B.aviso.t); B.aviso.t = setTimeout(() => a.classList.remove("ver"), 2600); };
  B.modal = (titulo, cuerpo, pie = "") => {
    B.$("#modal-titulo").textContent = titulo; B.$("#modal-cuerpo").innerHTML = cuerpo;
    B.$("#modal-pie").innerHTML = pie || `<button type="button" class="boton sec" data-cerrar>Cerrar</button>`;
    B.$("#modal").hidden = false; B.modal.prev = document.activeElement; B.$(".modal-caja .cerrar").focus();
  };
  B.cerrarModal = () => { B.$("#modal").hidden = true; if (B.modal.prev && B.modal.prev.focus) B.modal.prev.focus(); };
  B.ayuda = (id) => {
    const a = window.CONTENIDO && window.CONTENIDO.ayudas[id]; if (!a) return;
    const o = a.origen === "Diapositivas" ? "Contenido de clase" : a.origen === "Mixto" ? "Clase + complemento" : "Complemento";
    B.modal(a.titulo, `<div class="ayuda"><span class="origen ${a.origen.toLowerCase()}">${o}</span>${a.html}</div>`);
  };
  B.tabla = (cols, filas, cl = "tabla") => `<div class="scroll-x"><table class="${cl}"><tr>${cols.map((x) => `<th>${B.esc(x)}</th>`).join("")}</tr>${filas.map((f) => `<tr>${f.map((x) => `<td>${B.esc(x)}</td>`).join("")}</tr>`).join("")}</table></div>`;
  B.subnav = (base, items, actual) => `<nav class="subnav" aria-label="Secciones">${items.map(([id, nom]) => `<a href="#${base}/${id}" class="${id === actual ? "activa" : ""}">${nom}</a>`).join("")}</nav>`;

  // ---------- rutas ----------
  B.ir = (h) => { if (location.hash === "#" + h) B.render(); else location.hash = h; };
  B.render = () => {
    const h = decodeURIComponent(location.hash.replace(/^#/, "")) || "inicio";
    const partes = h.split("/"); const v = partes[0];
    B.$$(".pestanas a").forEach((a) => a.classList.toggle("activa", a.dataset.vista === (B.alias[v] || v)));
    const fn = B.vistas[v] || B.vistas.inicio;
    const main = B.$("#principal");
    main.innerHTML = ""; fn(main, partes.slice(1));
    if (v !== "caso" && v !== "inicio") { S.ultima = h; B.guardar(); }
    main.focus({ preventScroll: true });
  };
  B.alias = { unidad: "unidades", simulador: "simuladores", caso: "casos", simulacro: "parcial" };

  // ---------- eventos globales ----------
  document.addEventListener("click", (ev) => {
    const t = ev.target.closest("[data-cerrar],[data-ayuda],[data-modo],[data-ir-unidad]"); if (!t) return;
    if (t.dataset.cerrar !== undefined) { B.cerrarModal(); if (t.tagName !== "A" && !t.dataset.irA) return; }
    if (t.dataset.ayuda) { B.ayuda(t.dataset.ayuda); return; }
    if (t.dataset.irUnidad) { B.ir("unidad/" + t.dataset.irUnidad); return; }
    if (t.dataset.modo) { S.modo = t.dataset.modo; B.guardar(); B.pintaModo(); B.render(); }
  });
  document.addEventListener("keydown", (ev) => { if (ev.key === "Escape" && !B.$("#modal").hidden) B.cerrarModal(); });
  B.pintaModo = () => B.$$(".modo button").forEach((b) => b.setAttribute("aria-checked", String(b.dataset.modo === S.modo)));
  B.arrancar = () => { B.pintaModo(); window.addEventListener("hashchange", B.render); B.render(); };
  return B;
})();
