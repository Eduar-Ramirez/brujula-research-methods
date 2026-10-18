/* =====================================================================
   REPASAR · tarjetas, test y emparejar (contenido de cada unidad)
   ===================================================================== */
(function (B) {
  "use strict";
  const MODOS = [["tarjetas", "🃏 Tarjetas"], ["test", "✅ Test"], ["emparejar", "🔗 Emparejar"]];
  const unidadesCon = (campo) => B.listaUnidades().filter((u) => (u[campo] || []).length);
  const campoDe = { tarjetas: "flash", test: "test", emparejar: "emparejar" };
  function selectorUnidad(modo, actual) {
    const us = unidadesCon(campoDe[modo]);
    return `<div class="filtro-u"><label for="rep-u">Unidad</label><select id="rep-u"><option value="todas">Todas las unidades</option>${us.map((u) => `<option value="${u.id}" ${u.id === actual ? "selected" : ""}>${u.icono} ${u.tema} · ${B.esc(u.titulo)} (${u[campoDe[modo]].length})</option>`).join("")}</select></div>`;
  }
  const pool = (modo, uid) => (uid && uid !== "todas" ? [B.unidades[uid]].filter(Boolean) : unidadesCon(campoDe[modo]))
    .flatMap((u) => (u[campoDe[modo]] || []).map((x, i) => ({ ...x, uid: u.id, clave: u.id + "/" + i })));

  B.vista("repasar", (main, [modo, uid]) => {
    if (!MODOS.some((m) => m[0] === modo)) modo = "tarjetas";
    uid = uid || "todas";
    main.innerHTML = `<section class="tarjeta cabecera-vista"><h1>Repasar</h1><p class="lead">Recupera lo aprendido: la práctica de recuperación (intentar recordar antes de mirar) es una de las formas más eficaces de consolidar.</p></section>
      ${B.subnav("repasar", MODOS, modo).replace(/href="#repasar\/(\w+)"/g, `href="#repasar/$1/${uid}"`)}
      <section class="tarjeta">${selectorUnidad(modo, uid)}<div id="rep-zona"></div></section>`;
    B.$("#rep-u").addEventListener("change", (e) => B.ir(`repasar/${modo}/${e.target.value}`));
    ({ tarjetas, test, emparejar })[modo](B.$("#rep-zona"), uid);
  });

  // ---------------- tarjetas ----------------
  function tarjetas(zona, uid) {
    const S = B.S(); let todas = pool("tarjetas", uid), soloPend = false, cola = [], i = 0, girada = false;
    const prepara = () => { cola = B.barajar(todas.filter((x) => !soloPend || S.flash[x.clave] !== 1)); i = 0; girada = false; };
    prepara();
    const pinta = () => {
      const sabidas = todas.filter((x) => S.flash[x.clave] === 1).length;
      const cab = `<div class="rep-cab"><span>${sabidas} de ${todas.length} marcadas como sabidas</span><label><input type="checkbox" id="fl-pend" ${soloPend ? "checked" : ""}> Solo las que aún no sé</label></div>
        <div class="pista-b" role="img" aria-label="${Math.round(100 * sabidas / Math.max(1, todas.length))} %"><div class="relleno alto" style="width:${100 * sabidas / Math.max(1, todas.length)}%"></div></div>`;
      if (!cola.length) { zona.innerHTML = cab + `<div class="vacio"><h3>¡No quedan tarjetas pendientes!</h3><button type="button" class="boton" id="fl-otra">Volver a empezar</button></div>`; }
      else if (i >= cola.length) { zona.innerHTML = cab + `<div class="vacio"><h3>Has pasado las ${cola.length} tarjetas</h3><p>Repite solo las que aún no sabes para fijarlas.</p><button type="button" class="boton" id="fl-otra">Otra vuelta</button></div>`; }
      else {
        const x = cola[i];
        zona.innerHTML = cab + `<p class="nota">Tarjeta ${i + 1} de ${cola.length} ${B.chipUnidad(x.uid)}</p>
          <button type="button" class="flash ${girada ? "girada" : ""}" id="fl-carta" aria-live="polite"><span class="cara">${girada ? `<b>${x.t}</b><span class="def">${x.d}</span>` : `<b class="grande">${x.t}</b><span class="nota">Piensa la definición y pulsa para comprobar</span>`}</span></button>
          <div class="botonera centro">${girada ? `<button type="button" class="boton gris" data-fl="0">↺ Repasar más</button><button type="button" class="boton exito" data-fl="1">✓ Lo sé</button>` : `<button type="button" class="boton" id="fl-girar">Ver definición</button>`}</div>`;
      }
      const g = () => { girada = true; pinta(); };
      zona.querySelector("#fl-carta")?.addEventListener("click", g); zona.querySelector("#fl-girar")?.addEventListener("click", g);
      zona.querySelectorAll("[data-fl]").forEach((b) => b.addEventListener("click", () => { S.flash[cola[i].clave] = Number(b.dataset.fl); B.guardar(); i++; girada = false; pinta(); }));
      zona.querySelector("#fl-otra")?.addEventListener("click", () => { soloPend = true; prepara(); pinta(); });
      zona.querySelector("#fl-pend").addEventListener("change", (e) => { soloPend = e.target.checked; prepara(); pinta(); });
    };
    pinta();
  }

  // ---------------- test ----------------
  function test(zona, uid) {
    const S = B.S(), N = 10; let preg = [], i = 0, aciertos = 0, resp = null, fallos = [];
    const empezar = () => { preg = B.barajar(pool("test", uid)).slice(0, N).map((q) => { const o = B.barajar(q.o.map((t, k) => ({ t, k }))); return { ...q, ob: o }; }); i = 0; aciertos = 0; resp = null; fallos = []; pinta(); };
    const pinta = () => {
      if (!preg.length) { zona.innerHTML = `<p class="vacio">No hay preguntas para esta selección.</p>`; return; }
      const mejor = S.test[uid] ? Math.round(100 * S.test[uid].mejor) : null;
      if (i >= preg.length) {
        const pct = aciertos / preg.length; const prev = S.test[uid]; S.test[uid] = { mejor: Math.max(pct, prev ? prev.mejor : 0), ultimo: pct, veces: (prev ? prev.veces || 0 : 0) + 1 }; B.guardar();
        zona.innerHTML = `<div class="vacio"><h3>${aciertos} de ${preg.length} correctas (${Math.round(100 * pct)} %)</h3><p>${pct >= 0.8 ? "¡Muy bien! Prueba a explicar en voz alta por qué son correctas." : pct >= 0.5 ? "Vas bien. Revisa los fallos y vuelve a intentarlo." : "Conviene repasar la teoría de la unidad antes de repetir."}</p>
          ${fallos.length ? `<div class="izq"><h4>Revisa</h4><ul>${fallos.map((q) => `<li><b>${q.q}</b><br>Correcta: ${q.o[q.a]}. <span class="nota">${q.fb || ""}</span></li>`).join("")}</ul></div>` : ""}
          <div class="botonera centro"><button type="button" class="boton" id="te-otra">Otro test</button>${uid !== "todas" ? `<a class="boton sec" href="#unidad/${uid}/comprender">Volver a la teoría</a>` : ""}</div></div>`;
        zona.querySelector("#te-otra").addEventListener("click", empezar); return;
      }
      const q = preg[i], cerr = resp !== null;
      zona.innerHTML = `<div class="rep-cab"><span>Pregunta ${i + 1} de ${preg.length} ${B.chipUnidad(q.uid)}</span><span>Aciertos: ${aciertos}${mejor !== null ? ` · tu mejor marca aquí: ${mejor} %` : ""}</span></div>
        <h3 class="pregunta">${q.q}</h3><div class="opciones">${q.ob.map((o) => `<button type="button" class="opcion opt-test ${cerr ? (o.k === q.a ? "correcta" : o.k === resp ? "erronea" : "bloqueada") : ""}" data-k="${o.k}" ${cerr ? "disabled" : ""}>${o.t}</button>`).join("")}</div>
        ${cerr ? `<div class="feedback ${resp === q.a ? "bien" : "mal"}"><p class="veredicto">${resp === q.a ? "Correcto" : "No es correcto"}</p><p>${q.fb || ""}</p></div><div class="botonera"><button type="button" class="boton" id="te-sig">${i === preg.length - 1 ? "Ver resultado" : "Siguiente →"}</button></div>` : ""}`;
      zona.querySelectorAll(".opt-test:not([disabled])").forEach((b) => b.addEventListener("click", () => { resp = Number(b.dataset.k); if (resp === q.a) aciertos++; else fallos.push(q); pinta(); B.eduar?.(resp === q.a ? "celebrando" : "reflexivo", resp === q.a ? "Bien razonado. Lee la explicación para afianzar la idea." : "Vamos a revisar esta idea. La explicación te ayudará a distinguir las opciones."); }));
      zona.querySelector("#te-sig")?.addEventListener("click", () => { i++; resp = null; pinta(); });
    };
    empezar();
  }

  // ---------------- emparejar ----------------
  function emparejar(zona, uid) {
    const S = B.S(), sets = pool("emparejar", uid); let si = 0, izq = null, hechos = {}, der = [], fallos = 0;
    const carga = () => { izq = null; hechos = {}; fallos = 0; der = B.barajar(sets[si].pairs.map((p, k) => ({ k, t: p.right }))); pinta(); };
    const pinta = () => {
      if (!sets.length) { zona.innerHTML = `<p class="vacio">No hay ejercicios de emparejar para esta selección.</p>`; return; }
      const st = sets[si], todos = Object.keys(hechos).length === st.pairs.length;
      if (todos && !S.empareja[st.clave]) { S.empareja[st.clave] = { fallos }; B.guardar(); }
      zona.innerHTML = `<div class="rep-cab"><span>${sets.length > 1 ? `<select id="em-set" aria-label="Ejercicio">${sets.map((s, k) => `<option value="${k}" ${k === si ? "selected" : ""}>${B.esc(s.label)}${B.S().empareja[s.clave] ? " ✓" : ""}</option>`).join("")}</select>` : B.esc(st.label)} ${B.chipUnidad(st.uid)}</span><span>${Object.keys(hechos).length} de ${st.pairs.length} · errores: ${fallos}</span></div>
        <p class="nota">Pulsa una situación de la izquierda y después el concepto que le corresponde.</p>
        <div class="empareja"><div>${st.pairs.map((p, k) => `<button type="button" class="em-i ${hechos[k] ? "ok" : izq === k ? "sel" : ""}" data-i="${k}" ${hechos[k] ? "disabled" : ""}>${p.left}${hechos[k] ? `<span class="exp">→ <b>${p.right}</b>. ${p.exp || ""}</span>` : ""}</button>`).join("")}</div>
          <div>${der.map((d) => `<button type="button" class="em-d ${hechos[d.k] ? "ok" : ""}" data-d="${d.k}" ${hechos[d.k] || izq === null ? "disabled" : ""}>${d.t}</button>`).join("")}</div></div>
        ${todos ? `<div class="feedback bien"><p class="veredicto">¡Completado${fallos ? ` con ${fallos} error${fallos > 1 ? "es" : ""}` : " sin errores"}!</p></div><div class="botonera"><button type="button" class="boton sec" id="em-rep">Repetir</button>${si < sets.length - 1 ? `<button type="button" class="boton" id="em-sig">Siguiente ejercicio →</button>` : ""}</div>` : ""}`;
      zona.querySelector("#em-set")?.addEventListener("change", (e) => { si = Number(e.target.value); carga(); });
      zona.querySelectorAll(".em-i:not([disabled])").forEach((b) => b.addEventListener("click", () => { izq = Number(b.dataset.i); pinta(); }));
      zona.querySelectorAll(".em-d:not([disabled])").forEach((b) => b.addEventListener("click", () => {
        const d = Number(b.dataset.d), p = st.pairs[izq];
        // varias situaciones pueden compartir el mismo concepto: vale si el texto coincide
        if (st.pairs[d].right === p.right) { hechos[izq] = true; izq = null; pinta(); B.eduar?.("celebrando", "Esa relación encaja. Sigue conectando situaciones y conceptos."); }
        else { fallos++; B.eduar?.("reflexivo", "Revisa qué caracteriza a esa situación antes de elegir el concepto."); b.classList.add("mal"); B.aviso("No corresponde. Vuelve a leer la situación."); setTimeout(() => pinta(), 700); }
      }));
      zona.querySelector("#em-rep")?.addEventListener("click", carga);
      zona.querySelector("#em-sig")?.addEventListener("click", () => { si++; carga(); });
    };
    if (sets.length) carga(); else pinta();
  }

  B.repasoResumen = (u) => {
    const S = B.S(), fl = (u.flash || []).length, sab = (u.flash || []).filter((_, i) => S.flash[u.id + "/" + i] === 1).length;
    const em = (u.emparejar || []).length, emh = (u.emparejar || []).filter((_, i) => S.empareja[u.id + "/" + i]).length;
    return { fl, sab, te: (u.test || []).length, mejor: S.test[u.id] ? S.test[u.id].mejor : null, em, emh };
  };
})(window.Brujula);
