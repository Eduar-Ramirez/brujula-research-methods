/* =====================================================================
   TALLER DEL MÉTODO · Proyecto INDAGA, Fase 2 (Reto 3)
   Cuatro estaciones que siguen el apartado 6 de la plantilla INDAGA:
   población y muestra, recogida de datos, aspectos éticos y análisis de datos.
   Todo se guarda en este navegador. El borrador se descarga para seguir en Word.
   ===================================================================== */
(function (B) {
  "use strict";
  const $ = B.$, esc = B.esc, S = () => B.S();
  const st = () => { const s = S(); s.indaga = s.indaga || { v: {}, hechas: {} }; return s.indaga; };
  const val = (k) => (st().v[k] || "").toString();
  const ESTACIONES = [["muestra", "1 · Población y muestra"], ["instrumentos", "2 · Recogida de datos"], ["etica", "3 · Aspectos éticos"], ["analisis", "4 · Análisis de datos"], ["borrador", "Borrador y comprobación"]];

  // ------------------------------------------------ ayudas de cálculo
  function nPotencia(tipo, efecto) { // α = .05 bilateral, potencia .80 (aproximación normal)
    const za = 1.959964, zb = 0.841621;
    if (tipo === "grupos") return Math.ceil(2 * ((za + zb) / efecto) ** 2) + 1;               // por grupo (t de Student)
    if (tipo === "correlacion") return Math.ceil(((za + zb) / (0.5 * Math.log((1 + efecto) / (1 - efecto)))) ** 2 + 3); // total
    return null;
  }
  const margen = (n) => (1.96 * Math.sqrt(0.25 / n) * 100);
  function pruebaSugerida(h) {
    if (!h.tipo) return "";
    if (h.tipo === "relacion") return h.vd === "categorica" || h.vi === "categorica" ? "Chi cuadrado (tabla de contingencia)" : h.npred === "varias" ? "Regresión lineal múltiple" : "Correlación de Pearson (o Spearman si no se cumple la normalidad)";
    if (h.vd === "categorica") return "Chi cuadrado (tabla de contingencia)";
    const rel = h.medidas === "mismas";
    if (h.grupos === "dos") return rel ? "t para muestras relacionadas (alternativa: Wilcoxon)" : "t para muestras independientes (alternativa: U de Mann-Whitney)";
    if (h.grupos === "tres") return rel ? "ANOVA de medidas repetidas (alternativa: Friedman)" : "ANOVA de un factor (alternativa: Kruskal-Wallis)";
    if (h.grupos === "prepost") return "ANCOVA con el pretest como covariable (o ANOVA mixto grupo × momento)";
    if (h.grupos === "factorial") return "ANOVA factorial (entre grupos, intrasujeto o mixto)";
    return "";
  }
  // revisor sencillo de preguntas de cuestionario
  function revisa(texto) {
    return texto.split(/\n+/).map((l) => l.trim()).filter(Boolean).map((p) => {
      const a = [];
      if (/\b(y|o)\b.+\?/.test(p) && p.split(/\s(?:y|o)\s/).length > 1 && /¿/.test(p)) a.push("Puede preguntar dos cosas a la vez («y», «o»).");
      if (/¿\s*no\s+(crees|te parece|estás|piensas|es cierto)/i.test(p)) a.push("Induce la respuesta: formula la pregunta de forma neutral.");
      if ((p.match(/\bno\b/gi) || []).length >= 2) a.push("Posible doble negación.");
      if (/\b(pierdes|desperdicias|malgastas|abusas|demasiad)/i.test(p)) a.push("Da algo por supuesto o usa una palabra cargada.");
      if (/\b(siempre|nunca|todo el mundo|nadie)\b/i.test(p)) a.push("Términos absolutos: difíciles de responder con matices.");
      if (p.length > 160) a.push("Es larga: intenta acortarla.");
      if (/\b(cuantitativ|operacionaliz|constructo|psicométric)/i.test(p)) a.push("Usa jerga técnica que los participantes pueden no entender.");
      return { p, a };
    });
  }

  // ------------------------------------------------ vista
  B.vista("indaga", (main, [est]) => {
    est = ESTACIONES.some((e) => e[0] === est) ? est : "muestra";
    const conf = B.conf.indaga || {};
    main.innerHTML = `<p class="miga"><a href="#libera">← Libera el conocimiento</a></p>
      <header class="page-heading"><p class="eyebrow">PROYECTO INDAGA · FASE 2 · RETO 3${conf.entrega ? " · ENTREGA " + esc(conf.entrega).toUpperCase() : ""}</p><h1>Taller del Método</h1>
      <p>Cuatro estaciones para preparar el <b>apartado 6. Método</b> de la plantilla: población y muestra, recogida de datos, aspectos éticos y análisis de datos. Al final tendrás un <b>borrador</b> y una lista de comprobación. El texto final lo redactáis vosotros.</p></header>
      ${B.subnav("indaga", ESTACIONES.map(([k, n]) => [k, (st().hechas[k] ? "✓ " : "") + n]), est)}<section class="tarjeta indaga" id="ind-zona"></section>
      <p class="nota">Se guarda en este navegador. Si trabajáis en equipo, que una persona lleve el taller y comparta el borrador. Si usáis a Charo IA para alguna estación, sus conversaciones aparecerán en la tabla de uso de IA del borrador.</p>`;
    const z = $("#ind-zona");
    ({ muestra, instrumentos, etica, analisis, borrador })[est](z);
    z.querySelectorAll("[data-k]").forEach((x) => x.addEventListener(x.tagName === "SELECT" || x.type === "checkbox" ? "change" : "input", () => {
      st().v[x.dataset.k] = x.type === "checkbox" ? (x.checked ? "1" : "") : x.value; B.guardar(); z.dispatchEvent(new Event("cambio"));
    }));
    z.querySelector("[data-hecha]")?.addEventListener("click", (e) => { st().hechas[est] = true; B.guardar(); const i = ESTACIONES.findIndex((x) => x[0] === est); B.ir("indaga/" + ESTACIONES[i + 1][0]); });
    B.eduar && B.eduar("hablando", { muestra: "Empezad por definir bien a quién queréis estudiar. Del muestreo depende a quién podréis generalizar.", instrumentos: "Un instrumento validado ahorra muchos problemas. Si escribís preguntas propias, pasadlas por el revisor.", etica: "La ética se planifica antes de recoger el primer dato.", analisis: "Cada hipótesis necesita su análisis. Si no sabéis cuál, volved al diseño.", borrador: "Revisad la lista de comprobación y reescribid el borrador con vuestras palabras." }[est]);
  });

  const campo = (k, et, ph = "", filas = 2, ayuda = "") => `<label class="campo"><span>${et}</span>${ayuda ? `<small>${ayuda}</small>` : ""}<textarea data-k="${k}" rows="${filas}" placeholder="${esc(ph)}">${esc(val(k))}</textarea></label>`;
  const linea = (k, et, ph = "", tipo = "text") => `<label class="campo"><span>${et}</span><input type="${tipo}" data-k="${k}" value="${esc(val(k))}" placeholder="${esc(ph)}"></label>`;
  const sel = (k, et, ops) => `<label class="campo"><span>${et}</span><select data-k="${k}"><option value="">Elige…</option>${ops.map(([v, t]) => `<option value="${v}" ${val(k) === v ? "selected" : ""}>${t}</option>`).join("")}</select></label>`;
  const check = (k, t) => `<label class="check"><input type="checkbox" data-k="${k}" ${val(k) ? "checked" : ""}> ${t}</label>`;
  const fin = (t = "Estación terminada → siguiente") => `<div class="botonera"><button type="button" class="boton" data-hecha>${t}</button></div>`;
  const charo = (modo, txt) => `<button type="button" class="boton peq sec charo-btn" data-charo-modo="${modo}" data-charo-ctx="${esc(txt)}">Pregúntale a Charo IA</button>`;

  const MUESTREOS = [["simple", "Aleatorio simple"], ["sistematico", "Sistemático"], ["estratificado", "Estratificado"], ["conglomerados", "Por conglomerados"], ["conveniencia", "De conveniencia (accidental)"], ["cuotas", "Por cuotas"], ["intencional", "Intencional"], ["bola", "Bola de nieve"]];
  const NOMMUE = Object.fromEntries(MUESTREOS);
  function muestra(z) {
    z.innerHTML = `<h2>1 · Población y muestra</h2>
      <div class="dos-col"><div>${campo("pob", "Población de referencia", "Ej.: estudiantes de Psicología de universidades de Madrid", 2)}
        ${campo("acceso", "¿Cómo accederéis a los participantes?", "Ej.: difusión del cuestionario en las aulas de 1.º y 2.º de ESIC", 2)}
        ${sel("muestreo", "Procedimiento de muestreo", MUESTREOS)}<div id="mu-ayuda"></div>
        ${campo("criterios", "Criterios de inclusión y exclusión", "Ej.: mayores de 18 años, matriculados este curso; se excluye a quien no complete el cuestionario", 3)}</div>
      <div><div class="callout info"><b>¿Qué muestreo podéis usar?</b><ul><li>¿Tenéis una <b>lista</b> de toda la población? Si no, el muestreo probabilístico es difícil.</li><li>¿Queréis asegurar <b>grupos</b> (curso, sexo)? Estratificado (con azar) o cuotas (sin azar).</li><li>¿La población está <b>repartida en grupos</b> (aulas, centros)? Conglomerados.</li><li>¿Es una población <b>oculta</b>? Bola de nieve.</li></ul>En un TFG lo habitual es una muestra de <b>conveniencia</b>: es válido si lo decís y lo tenéis en cuenta en las limitaciones.</div>
        <h3>Tamaño de la muestra</h3>${sel("justif", "¿Cómo justificáis el tamaño?", [["potencia", "Potencia (detectar un efecto)"], ["precision", "Precisión (margen de error de un porcentaje)"], ["recursos", "Recursos disponibles (la que podemos conseguir)"], ["poblacion", "Población entera"]])}
        <div class="dos-col">${sel("pot_tipo", "Análisis principal", [["grupos", "Comparar dos grupos"], ["correlacion", "Relacionar dos variables"]])}${sel("pot_ef", "Efecto esperado", [["peq", "Pequeño"], ["med", "Medio"], ["gra", "Grande"]])}</div>
        ${linea("n", "Tamaño previsto (n)", "Ej.: 120", "number")}<div id="mu-calc" class="sim-res"></div></div></div>
      ${charo("indaga", "Estoy en la estación 1 del Taller del Método (población y muestra) del Proyecto INDAGA.")}${fin()}`;
    const pinta = () => {
      const m = val("muestreo"), prob = ["simple", "sistematico", "estratificado", "conglomerados"].includes(m);
      $("#mu-ayuda").innerHTML = m ? `<p class="nota">${prob ? "Probabilístico: podéis calcular el margen de error. Necesitáis una lista o un marco muestral." : "No probabilístico: describid bien la muestra y no generalicéis más allá de personas parecidas. Mencionadlo en las limitaciones."}</p>` : "";
      const t = val("pot_tipo"), e = val("pot_ef"), n = Number(val("n")) || 0;
      const efv = t === "grupos" ? { peq: 0.2, med: 0.5, gra: 0.8 }[e] : { peq: 0.1, med: 0.3, gra: 0.5 }[e];
      let h = "";
      if (t && e) { const req = nPotencia(t, efv); h += `<p>Para detectar un efecto ${{ peq: "pequeño", med: "medio", gra: "grande" }[e]} (${t === "grupos" ? "d = " : "r = "}${String(efv).replace(".", ",")}) con α = .05 y potencia del 80 % necesitáis unas <b>${req}</b> personas ${t === "grupos" ? "por grupo" : "en total"}.</p>`; }
      if (n) h += `<p>Con n = ${n}, el margen de error de un porcentaje sería de unos <b>±${margen(n).toFixed(1).replace(".", ",")}</b> puntos (si la muestra fuera aleatoria).</p>`;
      $("#mu-calc").innerHTML = h || '<p class="nota">Elegid el análisis principal y el efecto esperado para orientar el tamaño.</p>';
    };
    z.addEventListener("cambio", pinta); pinta();
  }

  function instrumentos(z) {
    const ins = (i) => `<fieldset class="instrumento"><legend>Instrumento ${i}</legend><div class="dos-col">${linea(`i${i}_nom`, "Nombre", "Ej.: Escala de Satisfacción con la Vida (SWLS)")}${linea(`i${i}_aut`, "Autoría y año (adaptación española)", "Ej.: Diener et al. (1985); Vázquez et al. (2013)")}
      ${linea(`i${i}_var`, "Variable que mide", "Ej.: satisfacción con la vida")}${linea(`i${i}_items`, "N.º de ítems y escala de respuesta", "Ej.: 5 ítems, Likert de 1 a 7")}</div>${linea(`i${i}_fia`, "Evidencia de fiabilidad o validez", "Ej.: α = .88 en la adaptación española")}</fieldset>`;
    z.innerHTML = `<h2>2 · Recogida de datos</h2><p>Para cada instrumento: nombre, autoría y año, variable, número de ítems, escala y una evidencia breve de fiabilidad o validez. <b>Mejor un instrumento validado</b> que uno inventado; si viene de otro idioma, usad la adaptación española.</p>
      ${ins(1)}${ins(2)}${ins(3)}
      ${campo("proc", "Procedimiento: formato, lugar, duración y secuencia", "Ej.: cuestionario en línea (Google Forms), en clase, unos 10 minutos; primero el consentimiento, luego los datos sociodemográficos al final…", 3)}
      <h3>Revisor de preguntas propias</h3><p class="nota">Si escribís preguntas propias (por ejemplo, sociodemográficas o de uso de redes), pegadlas aquí, una por línea. El revisor señala errores frecuentes; no sustituye a la entrevista cognitiva.</p>
      ${campo("preguntas", "Vuestras preguntas", "¿Cuántas horas al día usas redes sociales?", 4)}<div id="rev-res"></div>
      ${check("pretest", "Probaremos el cuestionario con 2-3 compañeros (entrevista cognitiva: «¿qué has entendido por…?») antes de pasarlo.")}
      ${charo("indaga", "Estoy en la estación 2 del Taller del Método (instrumentos de recogida de datos) del Proyecto INDAGA.")}${fin()}`;
    const pinta = () => { const r = revisa(val("preguntas"));
      $("#rev-res").innerHTML = r.length ? `<ul class="revisor">${r.map((x) => `<li class="${x.a.length ? "aviso-p" : "ok-p"}"><b>${esc(x.p)}</b>${x.a.length ? `<ul>${x.a.map((a) => `<li>${a}</li>`).join("")}</ul>` : " <span>Sin problemas evidentes.</span>"}</li>`).join("")}</ul>` : ""; };
    z.addEventListener("cambio", pinta); pinta();
  }

  const ETICA = [["e_cons", "Consentimiento informado: objetivo, duración, riesgos y uso de los datos."], ["e_vol", "Participación voluntaria y derecho a retirarse sin consecuencias."], ["e_anon", "Anonimato: no se piden nombres; si hace falta emparejar, códigos."],
    ["e_min", "Minimización: solo se recogen los datos necesarios."], ["e_cust", "Custodia: quién guarda los datos, dónde y cuándo se borran."], ["e_menor", "Si hay menores, consentimiento de padres o tutores (o se excluyen)."], ["e_ia", "Declaración del uso de IA en la Tabla 5."]];
  function etica(z) {
    z.innerHTML = `<h2>3 · Aspectos éticos</h2><p>Resumid el consentimiento informado, la participación voluntaria, la anonimización y la custodia de los datos (RGPD y Ley Orgánica 3/2018).</p>
      <div class="checks">${ETICA.map(([k, t]) => check(k, t)).join("")}</div>
      ${campo("custodia", "¿Quién custodia los datos y cuándo se eliminan?", "Ej.: el equipo, en una carpeta de la universidad; se eliminarán al terminar la asignatura", 2)}
      <div class="callout info"><b>Texto orientativo</b> (adaptadlo): «La participación fue voluntaria y anónima. Antes de responder, los participantes leyeron la información del estudio y dieron su consentimiento informado; podían abandonar en cualquier momento sin consecuencias. No se recogieron datos identificativos y los datos se custodian…».</div>
      ${charo("indaga", "Estoy en la estación 3 del Taller del Método (aspectos éticos) del Proyecto INDAGA.")}${fin()}`;
  }

  function analisis(z) {
    const h = (i) => `<fieldset class="instrumento"><legend>Hipótesis u objetivo específico ${i}</legend>${campo(`h${i}`, "Formulación", i === 1 ? "Ej.: Quienes usan más las redes sociales presentarán menor satisfacción con la vida" : "", 2)}
      <div class="tres-col">${sel(`h${i}_tipo`, "¿Qué busca?", [["diferencias", "Diferencias entre grupos o condiciones"], ["relacion", "Relación entre variables"]])}${sel(`h${i}_vd`, "Tipo de VD (o criterio)", [["cuantitativa", "Cuantitativa (puntuación)"], ["categorica", "Categórica"]])}
      ${sel(`h${i}_grupos`, "Grupos o momentos", [["dos", "Dos"], ["tres", "Tres o más"], ["prepost", "Pre-post con grupo de comparación"], ["factorial", "Dos VI cruzadas"]])}${sel(`h${i}_medidas`, "¿Las mismas personas en todas las condiciones?", [["distintas", "No, grupos distintos"], ["mismas", "Sí, las mismas"]])}
      ${sel(`h${i}_vi`, "Tipo de VI (o predictor)", [["cuantitativa", "Cuantitativa"], ["categorica", "Categórica"]])}${sel(`h${i}_npred`, "Número de predictores", [["uno", "Uno"], ["varias", "Varios"]])}</div><p class="sugerencia" id="sug${i}"></p></fieldset>`;
    z.innerHTML = `<h2>4 · Análisis de datos</h2><p>Indicad el software y la técnica de análisis para <b>cada</b> objetivo específico o hipótesis. Debe haber una correspondencia directa entre cada hipótesis y su análisis.</p>
      ${linea("software", "Software", "JASP (versión 0.96)")}${campo("desc", "Análisis descriptivo previo", "Ej.: medias, desviaciones típicas y frecuencias de las variables y de la muestra", 2)}
      ${h(1)}${h(2)}${h(3)}
      <p class="nota">La sugerencia es orientativa: revisad los supuestos (normalidad, homogeneidad) y consultad las <a href="#consultar/ayudas">fichas de análisis</a>.</p>
      ${charo("indaga", "Estoy en la estación 4 del Taller del Método (análisis de datos) del Proyecto INDAGA.")}${fin()}`;
    const pinta = () => [1, 2, 3].forEach((i) => { const s = pruebaSugerida({ tipo: val(`h${i}_tipo`), vd: val(`h${i}_vd`), vi: val(`h${i}_vi`), grupos: val(`h${i}_grupos`), medidas: val(`h${i}_medidas`), npred: val(`h${i}_npred`) }); $("#sug" + i).innerHTML = s ? `Análisis sugerido: <b>${s}</b>` : ""; });
    z.addEventListener("cambio", pinta); pinta();
  }

  // ------------------------------------------------ borrador
  function textoBorrador() {
    const v = st().v, P = [];
    const mu = NOMMUE[v.muestreo] ? `mediante un muestreo ${NOMMUE[v.muestreo].toLowerCase()}` : "[procedimiento de muestreo]";
    P.push(["Población y muestra", `La población de referencia está formada por ${v.pob || "[población]"}. ${v.acceso ? "El acceso a los participantes será " + v.acceso.replace(/^[A-ZÁÉÍÓÚ]/, (c) => c.toLowerCase()) + ". " : ""}La muestra prevista es de ${v.n || "[n]"} personas, seleccionadas ${mu}. ${v.criterios ? "Criterios de inclusión y exclusión: " + v.criterios : "[Criterios de inclusión y exclusión]"}. ${{ potencia: "El tamaño se justificó mediante un análisis de potencia.", precision: "El tamaño se justificó por la precisión deseada (margen de error).", recursos: "El tamaño responde a los recursos disponibles; se discutirá como limitación.", poblacion: "Se estudia a toda la población accesible." }[v.justif] || "[Justificación del tamaño]"}`]);
    const ins = [1, 2, 3].filter((i) => v[`i${i}_nom`]).map((i) => `${v[`i${i}_nom`]} (${v[`i${i}_aut`] || "[autoría, año]"}), que evalúa ${v[`i${i}_var`] || "[variable]"} mediante ${v[`i${i}_items`] || "[ítems y escala]"}${v[`i${i}_fia`] ? "; " + v[`i${i}_fia`] : ""}.`);
    P.push(["Recogida de datos", (ins.length ? "Se utilizarán los siguientes instrumentos: " + ins.join(" ") : "[Instrumentos]") + " " + (v.proc || "[Procedimiento: formato, lugar, duración y secuencia]") + (v.pretest ? " Antes de la recogida, el cuestionario se probará con dos o tres personas para comprobar que las preguntas se entienden." : "")]);
    const et = ETICA.filter(([k]) => v[k]).map(([, t]) => t.split(":")[0].toLowerCase());
    P.push(["Aspectos éticos", `${et.length ? "Se garantizarán: " + et.join("; ") + "." : "[Consentimiento, voluntariedad, anonimato y custodia]"} ${v.custodia || ""}`.trim()]);
    const hs = [1, 2, 3].filter((i) => v[`h${i}`]).map((i, k) => `Para la hipótesis ${k + 1} (${v[`h${i}`]}) se usará ${pruebaSugerida({ tipo: v[`h${i}_tipo`], vd: v[`h${i}_vd`], vi: v[`h${i}_vi`], grupos: v[`h${i}_grupos`], medidas: v[`h${i}_medidas`], npred: v[`h${i}_npred`] }) || "[análisis]"}.`);
    P.push(["Análisis de datos", `Los análisis se realizarán con ${v.software || "[software]"}. ${v.desc || "[Análisis descriptivo]"}. ${hs.join(" ") || "[Un análisis por hipótesis]"}`]);
    return P;
  }
  const COMPROBAR = [["Describimos la población, el muestreo, el tamaño y los criterios de inclusión y exclusión.", (v) => v.pob && v.muestreo && v.n && v.criterios],
    ["Cada instrumento tiene nombre, autoría, ítems, escala y una evidencia de fiabilidad o validez.", (v) => v.i1_nom && v.i1_aut && v.i1_items && v.i1_fia],
    ["El procedimiento indica formato, lugar, duración y secuencia.", (v) => (v.proc || "").length > 40],
    ["Los aspectos éticos cubren consentimiento, voluntariedad, anonimato y custodia.", (v) => v.e_cons && v.e_vol && v.e_anon && v.e_cust],
    ["Hay un análisis para cada hipótesis u objetivo específico.", (v) => v.h1 && v.h1_tipo],
    ["Hemos revisado los apartados de la Fase 1 con el feedback recibido.", () => false],
    ["Hemos completado la declaración de uso de IA (Tabla 5).", (v) => v.e_ia]];
  function borrador(z) {
    const P = textoBorrador(), v = st().v, log = (S().charo && S().charo.log) || [];
    z.innerHTML = `<h2>Borrador del apartado 6. Método</h2><p class="callout warn">Es un <b>borrador generado a partir de vuestras respuestas</b>. Reescribidlo con vuestras palabras, en APA 7 y con 400-500 palabras. Lo que aparece entre corchetes falta por completar.</p>
      <div class="borrador" id="ind-texto"><h3>6. Método</h3>${P.map(([t, x]) => `<h4>${t}</h4><p>${esc(x)}</p>`).join("")}</div>
      <h3>Lista de comprobación de la Fase 2</h3><ul class="comprobacion">${COMPROBAR.map(([t, f]) => `<li class="${f(v) ? "si" : ""}">${f(v) ? "✓" : "○"} ${t}</li>`).join("")}</ul>
      <h3>Uso de IA registrado en Brújula (para la Tabla 5)</h3>${log.length ? B.tabla(["Herramienta y versión", "Fecha", "Finalidad y apartado", "Prompt (literal)"], log.slice(-30).map((x) => [x.herramienta || "Charo IA (Brújula) · Gemini", new Date(x.fecha).toLocaleDateString("es-ES"), x.finalidad || "", x.prompt])) + '<p class="nota">Completad la última columna de la Tabla 5 (uso de la respuesta y verificación) con lo que hicisteis.</p>' : '<p class="nota">No hay conversaciones con Charo IA registradas en este navegador.</p>'}
      <div class="botonera"><button type="button" class="boton" id="ind-doc">Descargar borrador (Word)</button><button type="button" class="boton sec" id="ind-copiar">Copiar el texto</button><button type="button" class="boton gris" id="ind-borrar">Empezar de nuevo</button></div>`;
    $("#ind-doc").addEventListener("click", () => {
      const filasIA = log.slice(-30).map((x) => `<tr><td>${esc(x.herramienta || "Charo IA (Brújula) · Gemini")}</td><td>${new Date(x.fecha).toLocaleDateString("es-ES")}</td><td>${esc(x.finalidad || "")}</td><td>${esc(x.prompt)}</td><td></td></tr>`).join("");
      const html = `<html><head><meta charset="utf-8"><title>Método INDAGA</title><style>body{font-family:Calibri,Arial;font-size:12pt;line-height:1.5}h1{font-size:14pt}h2{font-size:12pt}table{border-collapse:collapse}td,th{border:1px solid #999;padding:4px;font-size:10pt}</style></head><body>
        <h1>6. Método (borrador generado en el Taller del Método de Brújula)</h1>${P.map(([t, x]) => `<h2>${t}</h2><p>${esc(x)}</p>`).join("")}
        <h1>Tabla 5. Registro de uso de IA (desde Brújula)</h1><table><tr><th>Herramienta y versión</th><th>Fecha</th><th>Finalidad y apartado</th><th>Prompt (literal)</th><th>Uso de la respuesta y verificación</th></tr>${filasIA || '<tr><td colspan="5">Sin registros</td></tr>'}</table>
        <p><i>Borrador: reescribidlo con vuestras palabras antes de entregarlo.</i></p></body></html>`;
      const url = URL.createObjectURL(new Blob(["﻿" + html], { type: "application/msword" })), a = document.createElement("a"); a.href = url; a.download = "INDAGA_Metodo_borrador.doc"; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
    $("#ind-copiar").addEventListener("click", () => { navigator.clipboard?.writeText(P.map(([t, x]) => t + "\n" + x).join("\n\n")).then(() => B.aviso("Texto copiado")).catch(() => B.aviso("No se ha podido copiar")); });
    $("#ind-borrar").addEventListener("click", () => B.modal("¿Empezar de nuevo?", "<p>Se borrarán las respuestas del taller en este navegador.</p>", '<button class="boton gris" data-cerrar>Cancelar</button><button class="boton" id="ind-si">Borrar</button>'));
    document.addEventListener("click", function h(e) { if (e.target.id === "ind-si") { S().indaga = { v: {}, hechas: {} }; B.guardar(); B.cerrarModal(); B.ir("indaga/muestra"); document.removeEventListener("click", h); } });
  }

  // acceso desde Libera
  const libera = B.vistas.libera;
  B.vista("libera", (main, args) => {
    libera(main, args);
    const t = document.createElement("a"); t.className = "decision-feature indaga-feature"; t.href = "#indaga";
    const n = Object.keys(st().hechas).length;
    t.innerHTML = `<span class="decision-glyph" aria-hidden="true">§6</span><div><p class="eyebrow">PROYECTO INDAGA · FASE 2</p><h2>Taller del Método</h2><p>Población y muestra, instrumentos, ética y análisis: prepara el apartado 6 de vuestro informe. ${n ? `Llevas ${n} de 4 estaciones.` : ""}</p></div><span aria-hidden="true">↗</span>`;
    const ref = main.querySelector(".unlock-panel"); ref ? ref.after(t) : main.prepend(t);
  });
  B.alias = Object.assign(B.alias || {}, { indaga: "libera" });
})(window.Brujula);
