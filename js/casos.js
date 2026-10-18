/* =====================================================================
   INVESTIGAR · casos con decisiones paso a paso y datos para JASP
   El contenido de los casos está en datos/contenido.js (generado desde R).
   ===================================================================== */
(function (B) {
  "use strict";
  const C = window.CONTENIDO; if (!C) return;
  const CASOS = C.casos, POR_ID = Object.fromEntries(CASOS.map((c) => [c.id, c]));
  const { $, $$, esc, sinTags } = B;
  const S = () => B.S().casos, modo = () => B.S().modo, guardar = B.guardar;
  const sinPunto = (s) => String(s).replace(/\.\s*$/, "");
  // descartar progreso de pasos que ya no existan
  Object.keys(S().ruta).forEach((cid) => { const c = POR_ID[cid]; if (!c || !S().ruta[cid].every((p) => c.pasos.some((q) => q.id === p))) { delete S().ruta[cid]; delete S().estado[cid]; delete S().ver[cid]; } });

  const est = (cid, pid) => (S().estado[cid] && S().estado[cid][pid]) || { intentos: 0, resuelto: false, revelado: false, primer_ok: null, fb: null, ok: null, resp: null, pista: false, ir: null };
  const setEst = (cid, pid, e) => { (S().estado[cid] = S().estado[cid] || {})[pid] = e; guardar(); };
  const paso = (c, pid) => c.pasos.find((p) => p.id === pid);
  const actual = () => { const c = POR_ID[S().caso]; return paso(c, S().ruta[c.id][S().ver[c.id]]); };
  function orden(n, semilla) {
    let h = 2166136261; for (const ch of semilla) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
    const rnd = () => { h += 0x6D2B79F5; let t = h; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    const o = [...Array(n).keys()]; for (let i = n - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [o[i], o[j]] = [o[j], o[i]]; } return o;
  }

  // ---------------------------------------------------------------- comprobación
  function leeNum(x) { x = String(x ?? "").trim().replace(",", "."); if (/^<\s*\.?0*\.?001$/.test(x)) return -1; x = x.replace(/^=\s*/, ""); return x === "" ? NaN : Number(x); }
  function comprueba(p, resp) {
    if (p.tipo === "eleccion") { if (resp == null) return null; const o = p.opciones[resp]; return { ok: o.ok, fb: o.fb, etiquetas: !o.ok && o.etiqueta ? [o.etiqueta] : [], ir: o.ir }; }
    if (p.tipo === "multiple") {
      if (!resp.length) return null;
      const okset = p.opciones.map((o, i) => (o.ok ? i : -1)).filter((i) => i >= 0);
      const sobran = resp.filter((i) => !okset.includes(i)), faltan = okset.filter((i) => !resp.includes(i)), ok = !sobran.length && !faltan.length;
      let fb = ok ? okset.map((i) => `<li>${p.opciones[i].fb}</li>`).join("") : sobran.map((i) => `<li><b>Sobra:</b> «${sinPunto(sinTags(p.opciones[i].texto))}». ${p.opciones[i].fb}</li>`).join("");
      if (!ok && faltan.length) fb += `<li><b>Te falta ${faltan.length === 1 ? "una opción" : faltan.length + " opciones"}.</b> Revisa las que no has marcado.</li>`;
      return { ok, fb: `<ul>${fb}</ul>`, etiquetas: sobran.map((i) => p.opciones[i].etiqueta).filter(Boolean) };
    }
    if (p.tipo === "clasificar") {
      if (resp.some((r) => !r)) return { incompleto: true, fb: "Clasifica todos los elementos antes de comprobar." };
      const mal = p.items.map((x, i) => (resp[i] !== x.correcta ? i : -1)).filter((i) => i >= 0);
      if (!mal.length) return { ok: true, fb: "<ul>" + p.items.map((x) => `<li><b>${x.texto}</b>: ${x.correcta}. ${x.fb}</li>`).join("") + "</ul>", etiquetas: [] };
      return { ok: false, fb: `<p>${mal.length} de ${p.items.length} elementos mal clasificados:</p><ul>` + mal.map((i) => `<li><b>${p.items[i].texto}</b> no es «${esc(resp[i])}». ${p.items[i].fb}</li>`).join("") + "</ul>", etiquetas: [p.id + "-clasif"] };
    }
    if (p.tipo === "ordenar") {
      const pos = resp.map(Number);
      if (pos.some((x) => !x)) return { incompleto: true, fb: "Asigna una posición a cada paso." };
      if (new Set(pos).size !== pos.length) return { incompleto: true, fb: "Has repetido alguna posición: cada paso debe tener un número distinto." };
      const mal = pos.filter((x, i) => x !== i + 1).length;
      return { ok: !mal, fb: mal ? `<p>Hay ${mal} pasos fuera de su lugar. Piensa qué tiene que estar hecho antes de cada uno.</p>` : "<p>Orden correcto.</p>", etiquetas: mal ? [p.id + "-orden"] : [] };
    }
    if (p.tipo === "numero") {
      const v = resp.map(leeNum);
      if (v.some((x) => Number.isNaN(x))) return { incompleto: true, fb: "Escribe un número en cada casilla (coma o punto decimal; para p muy pequeñas, «< .001»)." };
      const res = p.campos.map((c, i) => c.tipo === "p" && c.valor < 0.001 ? (v[i] === -1 || Math.abs(v[i]) < 0.001) : c.tipo === "p" ? Math.abs(v[i] - c.valor) <= Math.max(c.tol, 0.0015) : Math.abs(Math.abs(v[i]) - Math.abs(c.valor)) <= c.tol + 1e-9);
      const signo = p.campos.some((c, i) => res[i] && c.tipo === "num" && c.valor !== 0 && Math.sign(v[i]) !== Math.sign(c.valor));
      const extra = signo ? "<p class='nota'>Algún valor tiene el signo contrario al de referencia: es correcto si JASP ha ordenado los grupos o condiciones al revés. Lo importante es la dirección: ¿qué condición tiene la media más alta?</p>" : "";
      const ok = res.every(Boolean);
      return { ok, fb: ok ? "<p>Todos los valores coinciden con la salida de referencia.</p>" + extra : "<ul>" + p.campos.map((c, i) => res[i] ? "" : `<li><b>${c.etiqueta}</b>: ese valor no coincide con la salida. ${c.donde}</li>`).join("") + "</ul>" + extra, etiquetas: ok ? [] : [p.id + "-lectura"] };
    }
    if (p.tipo === "redaccion") {
      if (!resp || resp.trim().length < 20) return { incompleto: true, fb: "Escribe al menos una frase completa antes de comprobar." };
      const cumple = p.rubrica.map((r) => { try { return new RegExp(r.patron, "i").test(resp); } catch (e) { return false; } });
      const lista = p.rubrica.map((r, i) => { const cl = cumple[i] ? "si" : r.obligatorio ? "no" : "opc";
        return `<li class="${cl}">${cumple[i] ? "✓" : r.obligatorio ? "✗" : "○"} ${r.desc}${r.obligatorio ? "" : " (opcional)"}${cumple[i] ? "" : ` <span class="nota">${r.fb}</span>`}</li>`; }).join("");
      const ok = p.rubrica.every((r, i) => cumple[i] || !r.obligatorio);
      return { ok, fb: `<p>Revisión automática de tu texto (comprueba que estén los elementos, no su calidad):</p><ul class="rubrica">${lista}</ul>`, etiquetas: ok ? [] : [p.id + "-redaccion"] };
    }
    return null;
  }
  function solucion(p) {
    if (p.tipo === "eleccion") return p.opciones.filter((o) => o.ok).map((o) => `<p><b>${sinPunto(o.texto)}</b>. ${o.fb}</p>`).join("");
    if (p.tipo === "multiple") return "<p>Las opciones adecuadas son:</p><ul>" + p.opciones.filter((o) => o.ok).map((o) => `<li><b>${sinPunto(o.texto)}</b>. ${o.fb}</li>`).join("") + "</ul>";
    if (p.tipo === "clasificar") return "<ul>" + p.items.map((x) => `<li><b>${x.texto}</b>: ${x.correcta}. ${x.fb}</li>`).join("") + "</ul>";
    if (p.tipo === "ordenar") return "<ol>" + p.elementos.map((x) => `<li>${x}</li>`).join("") + "</ol>";
    if (p.tipo === "numero") return "<ul>" + p.campos.map((c) => `<li>${c.etiqueta}: <b>${c.mostrar}</b>. ${c.donde}</li>`).join("") + "</ul>";
    if (p.tipo === "redaccion") return `<p>Un ejemplo de redacción (hay otras formas válidas):</p><blockquote>${p.modelo}</blockquote>`;
    return "";
  }
  function leeResp(p) {
    const n = `r_${S().caso}_${p.id}`;
    if (p.tipo === "eleccion") { const x = $(`input[name="${n}"]:checked`); return x ? Number(x.value) : null; }
    if (p.tipo === "multiple") return $$(`input[name="${n}"]:checked`).map((x) => Number(x.value));
    if (p.tipo === "clasificar") return p.items.map((_, i) => $(`#${n}_${i}`).value);
    if (p.tipo === "ordenar") return p.elementos.map((_, i) => $(`#${n}_${i}`).value);
    if (p.tipo === "numero") return p.campos.map((_, i) => $(`#${n}_${i}`).value);
    if (p.tipo === "redaccion") return $(`#${n}`).value;
  }
  function resumenResp(p, r) {
    if (p.tipo === "eleccion") return sinTags(p.opciones[r].texto);
    if (p.tipo === "multiple") return r.map((i) => sinTags(p.opciones[i].texto)).join(" · ");
    if (p.tipo === "redaccion") return r.slice(0, 300);
    return [].concat(r).join(" · ");
  }
  const registra = (x) => { S().log.push(Object.assign({ caso: S().caso, modo: modo(), hora: new Date().toISOString() }, x)); guardar(); };

  // ---------------------------------------------------------------- acciones
  function comprobar() {
    const c = POR_ID[S().caso], p = actual(), e = est(c.id, p.id), resp = leeResp(p), r = comprueba(p, resp);
    if (!r) { B.aviso("Elige una respuesta antes de comprobar."); return; }
    e.resp = resp;
    if (r.incompleto) { e.fb = r.fb; e.ok = false; e.incompleto = true; setEst(c.id, p.id, e); pintaPaso(); return; }
    e.incompleto = false; e.intentos += 1; e.fb = r.fb; e.ok = r.ok;
    if (e.intentos === 1) e.primer_ok = r.ok;
    if (r.ok) { e.resuelto = true; e.ir = r.ir || null; if (p.salida) desbloquea(c.id, p.datos); }
    setEst(c.id, p.id, e);
    registra({ paso: p.id, fase: p.fase, comp: p.comp, intento: e.intentos, ok: r.ok, etiquetas: r.etiquetas, fb: r.fb, resp: resumenResp(p, resp) });
    pintaPaso(); B.eduar?.(r.ok ? "celebrando" : "reflexivo", r.ok ? "Bien hecho. Antes de seguir, fíjate en por qué esta decisión funciona." : "Paremos un momento y revisemos el razonamiento. Puedes volver a intentarlo."); enfocar(".feedback");
  }
  function revelar() {
    const c = POR_ID[S().caso], p = actual(), e = est(c.id, p.id);
    e.revelado = true; e.ok = false; e.fb = solucion(p);
    if (p.tipo === "eleccion") { const o = p.opciones.find((x) => x.ok); e.ir = o && o.ir ? o.ir : null; }
    if (p.salida) desbloquea(c.id, p.datos);
    setEst(c.id, p.id, e); registra({ paso: p.id, fase: p.fase, comp: p.comp, intento: e.intentos, ok: false, etiquetas: ["revelada"], fb: "", resp: "" });
    pintaPaso(); enfocar(".feedback");
  }
  function pista() { const p = actual(), e = est(S().caso, p.id); e.pista = true; setEst(S().caso, p.id, e); registra({ paso: p.id, fase: p.fase, comp: p.comp, intento: e.intentos, ok: null, etiquetas: ["pista"], fb: "", resp: "" }); pintaPaso(); }
  function desbloquea(cid, k) { if (!k) return; const d = (S().desbloq[cid] = S().desbloq[cid] || []); if (!d.includes(k)) d.push(k); guardar(); }
  function siguienteId(c, p, e) { if (e.ir) return e.ir; if (p.ir) return p.ir === "FIN" ? null : p.ir; const i = c.pasos.findIndex((q) => q.id === p.id); return i < c.pasos.length - 1 ? c.pasos[i + 1].id : null; }
  function siguiente() {
    const c = POR_ID[S().caso], p = actual(), e = est(c.id, p.id);
    if (p.tipo === "jasp" && !e.resuelto) { e.resuelto = true; setEst(c.id, p.id, e); }
    const nx = siguienteId(c, p, e);
    if (!nx) { S().fin[c.id] = true; guardar(); modalFin(c); return; }
    S().ruta[c.id].push(nx); S().ver[c.id] = S().ruta[c.id].length - 1; guardar(); pintaPaso(); arriba();
  }
  function irA(i) { S().ver[S().caso] = i; guardar(); pintaPaso(); arriba(); }
  function enfocar(sel) { const x = $(sel); if (x) { x.setAttribute("tabindex", "-1"); x.focus({ preventScroll: true }); x.scrollIntoView({ block: "nearest", behavior: "smooth" }); } }
  function arriba() { const x = $("#zona-paso"); if (x) x.scrollIntoView({ block: "start", behavior: "smooth" }); }
  const ayudaChip = (a) => C.ayudas[a] ? `<button type="button" class="chip" data-ayuda="${a}">${C.ayudas[a].titulo}</button>` : "";
  function modalFin(c) {
    B.eduar?.("sorpresa", "Has llegado al final de la misión. Revisa tus decisiones y lo que has aprendido en tu cuaderno.");
    const pasos = [...new Set(S().log.filter((x) => x.caso === c.id && x.ok !== null).map((x) => x.paso))];
    const primera = pasos.filter((p) => est(c.id, p).primer_ok === true).length, rev = pasos.filter((p) => est(c.id, p).revelado).length;
    const i = CASOS.findIndex((x) => x.id === c.id), sig = CASOS[i + 1];
    B.modal(`Caso ${c.num} completado`, `<p>Has revisado ${pasos.length} decisiones: ${primera} a la primera y ${rev} con la respuesta razonada a la vista.</p>` + (c.cierre ? `<div class="explicacion"><b>Idea para llevarte. </b>${c.cierre}</div>` : ""),
      `<a class="boton sec" href="#progreso" data-cerrar>Ver mi progreso</a>` + (sig ? `<a class="boton" href="#caso/${sig.id}" data-cerrar>Siguiente caso →</a>` : "") + `<button type="button" class="boton gris" data-cerrar>Cerrar</button>`);
  }

  // ---------------------------------------------------------------- vistas
  B.vista("casos", (main) => {
    const niveles = C.niveles;
    main.innerHTML = `<section class="tarjeta cabecera-vista"><h1>Casos de investigación</h1>
      <p class="lead">Toma, paso a paso, las decisiones de una investigación real: pregunta, variables, diseño, procedimiento, datos, análisis en JASP, interpretación y redacción. Cada caso trae una base de datos <b>simulada</b>.</p>
      <p class="nota">Modo guiado: recordatorios y pistas en cada paso. Modo práctica: más autonomía. Cámbialo arriba a la derecha.</p></section>` +
      Object.entries(niveles).map(([n, nom]) => `<h2 class="nivel-tit">${nom}</h2><div class="rejilla">` + CASOS.filter((c) => String(c.nivel) === n).map(tarjetaCaso).join("") + "</div>").join("");
  });
  function tarjetaCaso(c) {
    const e = S().estado[c.id] || {}, n_res = Object.values(e).filter((z) => z.resuelto || z.revelado).length;
    const estado = S().fin[c.id] ? "Completado" : n_res ? "En curso" : "Sin empezar";
    const cl = estado === "Completado" ? "completado" : estado === "En curso" ? "en-curso" : "";
    return `<article class="caso-t ${cl}"><div class="cab"><span class="num">${c.num}</span>${B.unidadesDeCaso(c).map(B.chipUnidad).join("")}<span class="dif" aria-label="Dificultad ${c.dificultad} de 4">${"●".repeat(c.dificultad)}${"○".repeat(4 - c.dificultad)}</span></div>
      <h4>${c.titulo}</h4><p>${c.resumen}</p>
      <div class="pie-t"><span class="estado">${estado}</span><a class="boton peq" href="#caso/${c.id}">${estado === "Sin empezar" ? "Empezar" : estado === "En curso" ? "Continuar" : "Repasar"}</a></div></article>`;
  }
  B.tarjetaCaso = tarjetaCaso;

  B.vista("caso", (main, [cid]) => {
    if (!cid || !POR_ID[cid]) cid = S().caso;
    if (!cid || !POR_ID[cid]) { B.ir("casos"); return; }
    if (!S().ruta[cid]) { S().ruta[cid] = [POR_ID[cid].pasos[0].id]; S().ver[cid] = 0; }
    S().caso = cid; guardar();
    const c = POR_ID[cid];
    main.innerHTML = `<p class="miga"><a href="#casos">Casos</a> › Caso ${c.num} ${B.unidadesDeCaso(c).map(B.chipUnidad).join("")}</p><div class="caso">
      <aside class="lateral">
        <section class="tarjeta"><h3><span class="num">${c.num}</span>${c.titulo}</h3><div class="situacion">${c.situacion}</div><p class="nota">Datos simulados con fines docentes.</p></section>
        <section class="tarjeta cuaderno" id="cuaderno"></section><section id="datos-caso"></section>
      </aside>
      <div><details class="tarjeta solo-movil" open><summary><span class="num">${c.num}</span> ${c.titulo} · situación</summary><div class="situacion">${c.situacion}</div></details>
        <div class="fases" id="fases"></div><div id="zona-paso"></div><div id="zona-salida"></div></div></div>`;
    pintaPaso(); window.scrollTo(0, 0);
  });

  function pintaPaso() {
    const c = POR_ID[S().caso], ruta = S().ruta[c.id], iv = S().ver[c.id], pid = ruta[iv], p = paso(c, pid), e = est(c.id, pid);
    const cerrado = e.resuelto || e.revelado, ultimo = iv === ruta.length - 1, m = modo(), n = `r_${c.id}_${pid}`;
    const fasesCaso = Object.keys(C.fases).filter((f) => c.pasos.some((q) => q.fase === f));
    const hechas = new Set(ruta.filter((x) => { const z = est(c.id, x); return z.resuelto || z.revelado; }).map((x) => paso(c, x).fase));
    $("#fases").innerHTML = fasesCaso.map((f) => `<span class="fase ${f === p.fase ? "actual" : hechas.has(f) ? "hecha" : ""}">${C.fases[f]}</span>`).join("");
    let entrada = ""; const dis = cerrado ? "disabled" : "";
    if (p.tipo === "eleccion" || p.tipo === "multiple") {
      const o = p.fijo ? [...p.opciones.keys()] : orden(p.opciones.length, c.id + p.id), tipo = p.tipo === "eleccion" ? "radio" : "checkbox";
      const marcado = (i) => p.tipo === "eleccion" ? e.resp === i : Array.isArray(e.resp) && e.resp.includes(i);
      entrada = `<fieldset class="opciones"><legend class="nota">${p.tipo === "multiple" ? "Marca todas las que correspondan." : "Elige una opción."}</legend>` +
        o.map((i) => `<label class="opcion ${cerrado ? "bloqueada" : ""}"><input type="${tipo}" name="${n}" value="${i}" ${marcado(i) ? "checked" : ""} ${dis}><span>${p.opciones[i].texto}</span></label>`).join("") + "</fieldset>";
    } else if (p.tipo === "clasificar") {
      entrada = `<div class="filas-sel">` + p.items.map((x, i) => `<div class="fila-sel"><label for="${n}_${i}">${x.texto}</label><select id="${n}_${i}" ${dis}><option value="">— elige —</option>${p.categorias.map((k) => `<option ${e.resp && e.resp[i] === k ? "selected" : ""}>${esc(k)}</option>`).join("")}</select></div>`).join("") + "</div>";
    } else if (p.tipo === "ordenar") {
      const o = orden(p.elementos.length, c.id + p.id);
      entrada = `<p class="nota">Asigna a cada paso su posición (1 = primero).</p><div class="filas-sel">` + o.map((i) => `<div class="fila-sel"><label for="${n}_${i}">${p.elementos[i]}</label><select id="${n}_${i}" ${dis}><option value="">—</option>${p.elementos.map((_, k) => `<option ${e.resp && String(e.resp[i]) === String(k + 1) ? "selected" : ""}>${k + 1}</option>`).join("")}</select></div>`).join("") + "</div>";
    } else if (p.tipo === "numero") {
      entrada = `<div class="campos">` + p.campos.map((x, i) => `<div><label for="${n}_${i}">${x.etiqueta}</label><input type="text" inputmode="decimal" autocomplete="off" id="${n}_${i}" value="${esc(e.resp ? e.resp[i] : "")}" ${dis}></div>`).join("") + "</div>";
    } else if (p.tipo === "redaccion") {
      entrada = `<label class="nota" for="${n}">Tu párrafo de resultados</label><textarea id="${n}" ${dis} placeholder="Escribe aquí tu párrafo de resultados...">${esc(e.resp || "")}</textarea>`;
    }
    const recTxt = p.recuerda || (p.tipo === "jasp" || p.tipo === "numero" ? C.recuerdaJasp : C.recuerdaFase[p.fase]);
    const recuerda = m === "guiado" && !cerrado ? `<div class="recuerda"><b>Recuerda. </b>${recTxt}</div>` : "";
    const pistaVis = p.pista && !cerrado && !e.pista && (m === "guiado" || e.intentos >= 2);
    const revelarVis = !cerrado && p.tipo !== "jasp" && e.intentos >= (m === "guiado" ? 2 : 3);
    const fb = e.fb ? `<div class="feedback ${e.ok ? "bien" : "mal"}"><span class="veredicto">${e.ok ? (e.intentos === 1 ? "Correcto a la primera." : "Correcto.") : e.revelado ? "Respuesta razonada" : "Todavía no."}</span>${e.fb}${!e.ok && !e.revelado && !e.incompleto ? `<p class="nota">Revisa tu respuesta y vuelve a intentarlo.</p>` : ""}</div>` : "";
    const explic = cerrado && p.explicacion ? `<div class="explicacion"><b>Por qué importa. </b>${p.explicacion}</div>` : "";
    const pistaHtml = e.pista && p.pista ? `<div class="pista"><b>Pista. </b>${p.pista}</div>` : "";
    const jasp = p.tipo === "jasp" ? (() => { const d = c.datos.find((x) => x.clave === p.datos);
      return `<div class="jasp"><div class="descargas"><a class="boton peq" href="datos/${d.archivo}" download>⬇ Datos: ${d.archivo}</a><a class="boton peq sec" href="datos/${d.diccionario_archivo}" download>⬇ Diccionario de variables</a></div>${d.jasp}<p class="nota">Instrucciones para JASP 0.96 con la interfaz en español; entre paréntesis, el nombre en inglés.</p></div>`; })() : "";
    const sigTxt = siguienteId(c, p, e) ? "Siguiente paso →" : "Terminar el caso";
    const botones = [iv > 0 ? `<button type="button" class="boton gris" data-accion-caso="anterior">← Paso anterior</button>` : "",
      !cerrado && p.tipo !== "jasp" ? `<button type="button" class="boton" data-accion-caso="comprobar">Comprobar</button>` : "",
      pistaVis ? `<button type="button" class="boton sec" data-accion-caso="pista">Pista</button>` : "",
      revelarVis ? `<button type="button" class="boton sec" data-accion-caso="revelar">Ver respuesta razonada</button>` : "",
      (cerrado || p.tipo === "jasp") && ultimo ? `<button type="button" class="boton exito" data-accion-caso="siguiente">${sigTxt}</button>` : "",
      !ultimo ? `<button type="button" class="boton exito" data-accion-caso="actual">Volver al paso actual →</button>` : ""].join("");
    $("#zona-paso").innerHTML = `<section class="tarjeta paso" data-pid="${pid}" data-tipo="${p.tipo}" data-cerrado="${cerrado}">
      <div class="paso-cab"><span class="et-fase">${C.fases[p.fase]}</span><span class="et-comp">${C.competencias[p.comp]}</span></div>
      ${p.titulo ? `<h3>${p.titulo}</h3>` : ""}<div class="enunciado">${p.enunciado}</div>${p.html || ""}${jasp}${recuerda}${entrada}${pistaHtml}${fb}${explic}
      ${p.ayudas.length ? `<div class="ayudas-paso">Ayudas: ${p.ayudas.map(ayudaChip).join("")}</div>` : ""}<div class="botonera">${botones}</div></section>`;
    pintaCuaderno(c); pintaDatos(c); pintaSalida(c);
    B.eduar?.("hablando", p.tipo === "jasp" ? "Descarga los datos y sigue la guía de JASP. Después traerás aquí un dato de tu análisis." : "Lee la situación con calma. " + (p.recuerda ? B.sinTags(p.recuerda) : "Elige tu respuesta y comprueba el razonamiento."));
  }
  function pintaCuaderno(c) {
    $("#cuaderno").innerHTML = `<h3>Tu recorrido</h3><ol>` + S().ruta[c.id].map((pid, i) => {
      const p = paso(c, pid), e = est(c.id, pid);
      const [ic, cl] = p.tipo === "jasp" ? ["▶", "c-reint"] : e.primer_ok === true ? ["✓", "c-bien"] : e.revelado ? ["◉", "c-rev"] : e.resuelto ? ["↻", "c-reint"] : ["…", "c-pend"];
      return `<li class="${cl} ${i === S().ver[c.id] ? "actual" : ""}"><button type="button" data-ir-paso="${i}"><span class="ic" aria-hidden="true">${ic}</span><span><span class="fz">${C.fases[p.fase]}</span>${p.titulo || sinTags(p.enunciado).slice(0, 70)}</span></button></li>`;
    }).join("") + `</ol><p class="leyenda">✓ a la primera · ↻ tras reintentar · ◉ respuesta razonada · ▶ consulta</p>`;
  }
  function pintaDatos(c) {
    const vistos = [...new Set(S().ruta[c.id].map((x) => paso(c, x).datos).filter(Boolean))];
    $("#datos-caso").innerHTML = !vistos.length ? "" : `<div class="tarjeta"><h3>Datos del caso</h3>` + vistos.map((k) => { const d = c.datos.find((x) => x.clave === k);
      return `<p><b>${d.titulo}</b> <span class="nota">(simulados)</span></p><div class="descargas"><a class="boton peq" href="datos/${d.archivo}" download>⬇ CSV</a><a class="boton peq sec" href="datos/${d.diccionario_archivo}" download>⬇ Diccionario</a></div>
        <details><summary>Diccionario de variables</summary>${B.tabla(d.diccionario.cols, d.diccionario.filas)}</details>
        <details><summary>Cómo refleja la base el diseño</summary>${d.estructura}</details>
        <details><summary>Primeras filas</summary>${B.tabla(d.primeras.cols, d.primeras.filas, "tabla mini")}</details>`; }).join("") + "</div>";
  }
  function pintaSalida(c) {
    $("#zona-salida").innerHTML = (S().desbloq[c.id] || []).map((k) => { const x = c.datos.find((z) => z.clave === k); if (!x || !x.salida) return "";
      return `<section class="tarjeta"><div class="salida-cab"><h3>Salida de referencia</h3><span class="nota">${x.titulo}</span></div>${x.salida}
        ${x.grafico ? `<img class="grafico" src="${x.grafico}" alt="Gráfico de los resultados: ${esc(x.titulo)}">` : ""}
        <p class="nota">Valores calculados en R con la base que has descargado. JASP debe darte las mismas cifras (puede variar el último decimal de algún intervalo).</p></section>`; }).join("");
  }

  document.addEventListener("click", (ev) => {
    const t = ev.target.closest("[data-accion-caso],[data-ir-paso]"); if (!t) return;
    if (t.dataset.irPaso !== undefined) { irA(Number(t.dataset.irPaso)); return; }
    const a = t.dataset.accionCaso;
    if (a === "comprobar") comprobar(); else if (a === "revelar") revelar(); else if (a === "pista") pista(); else if (a === "siguiente") siguiente();
    else if (a === "anterior") irA(Math.max(0, S().ver[S().caso] - 1)); else if (a === "actual") irA(S().ruta[S().caso].length - 1);
  });

  // datos para el informe
  B.informeCasos = () => {
    const L = S().log.filter((x) => x.ok !== null);
    const claves = [...new Set(L.map((x) => x.caso + "::" + x.paso))];
    return claves.map((k) => { const [cid, pid] = k.split("::"), c = POR_ID[cid]; if (!c) return null; const p = paso(c, pid); if (!p) return null; const e = est(cid, pid);
      return { caso: cid, paso: pid, comp: p.comp, fase: p.fase, punt: e.primer_ok === true ? 1 : e.resuelto && !e.revelado ? 0.5 : 0, revelado: e.revelado, intentos: e.intentos, titulo: p.titulo || sinTags(p.enunciado).slice(0, 90) }; }).filter(Boolean);
  };
  B.erroresCasos = () => S().log.filter((x) => x.ok === false && x.fb);
  B.POR_CASO = POR_ID;
})(window.Brujula);
