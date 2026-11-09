/* =====================================================================
   CHARO IA · tutora socrática de Brújula
   Homenaje a Rosario (Charo) Martínez Arias. Panel lateral de conversación que envía
   la pregunta y el contexto de la pantalla a un Worker de Cloudflare (Gemini).
   Registra cada consulta en el navegador para la Tabla 5 de INDAGA (uso de IA).
   ===================================================================== */
(function (B) {
  "use strict";
  const $ = B.$, esc = B.esc, S = () => B.S();
  const CFG = () => window.CHARO_IA_CONFIG || {};
  const st = () => { const s = S(); s.charo = s.charo || { log: [], aviso: false, dia: "", n: 0 }; return s.charo; };
  let historial = [], ocupado = false, modoActual = "teoria", ctxExtra = "";

  // ---------- render seguro de la respuesta (negrita, cursiva, listas, párrafos) ----------
  function render(txt) {
    const lineas = esc(txt).split(/\n/); let html = "", lista = null;
    const inline = (s) => s.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/(^|[^*])\*(?!\s)(.+?)\*/g, "$1<i>$2</i>").replace(/`(.+?)`/g, "<code>$1</code>");
    for (const l of lineas) {
      const m = l.match(/^\s*(?:[-*•]|\d+[.)])\s+(.*)/);
      if (m) { if (!lista) { lista = /^\s*\d/.test(l) ? "ol" : "ul"; html += `<${lista}>`; } html += `<li>${inline(m[1])}</li>`; continue; }
      if (lista) { html += `</${lista}>`; lista = null; }
      if (l.trim()) html += `<p>${inline(l.replace(/^#+\s*/, ""))}</p>`;
    }
    if (lista) html += `</${lista}>`;
    return html;
  }

  // ---------- contexto de lo que el estudiante tiene en pantalla ----------
  function contexto() {
    const h = decodeURIComponent(location.hash.replace("#", "")) || "inicio", partes = h.split("/");
    const c = { pantalla: h, modo: modoActual };
    if (partes[0] === "caso" || partes[0] === "casos") {
      const id = S().casos.caso, caso = B.POR_CASO && B.POR_CASO[id];
      if (caso) { c.caso = `Misión ${caso.num}: ${caso.titulo}`; const paso = $(".paso h2, .paso h3, .paso-cab"); c.paso = paso ? paso.innerText.slice(0, 300) : "";
        const en = $(".paso .enunciado"); c.enunciado = en ? en.innerText.slice(0, 700) : ""; c.modo = "caso"; }
    }
    if (partes[0] === "unidad" && B.unidades[partes[1]]) c.unidad = B.unidades[partes[1]].titulo;
    if (partes[0] === "indaga") { c.modo = "indaga"; c.estacion = partes[1] || "muestra"; }
    if (partes[0] === "simulador" && B.simuladores[partes[1]]) c.simulador = B.simuladores[partes[1]].titulo;
    if (ctxExtra) c.extra = ctxExtra;
    return c;
  }
  const EST = { muestra: "población y muestra", instrumentos: "recogida de datos", etica: "aspectos éticos", analisis: "análisis de datos", borrador: "revisión del borrador" };
  const finalidad = (c) => c.modo === "indaga" ? `Proyecto INDAGA · apartado 6, ${EST[c.estacion] || "método"}` : c.caso ? `Practicar ${c.caso}` : c.unidad ? `Estudiar: ${c.unidad}` : "Consulta de teoría en Brújula";

  // ---------- interfaz ----------
  const html = `<button type="button" id="charo-boton" class="charo-boton" aria-controls="charo-panel" aria-expanded="false"><img src="img/charo/charo-avatar.jpg" alt=""><span>Pregúntale a <b>Charo IA</b></span></button>
    <div id="charo-fondo" class="charo-fondo" hidden></div>
    <aside id="charo-panel" class="charo-panel" aria-hidden="true" aria-labelledby="charo-tit" role="dialog">
      <header class="charo-cab"><img src="img/charo/charo-avatar.jpg" alt="Ilustración de Charo"><div><h2 id="charo-tit">Charo IA</h2><p>Tu tutora de métodos: pregunta, piensa y decide tú.</p></div>
        <button type="button" class="charo-x" id="charo-cerrar" aria-label="Cerrar">×</button></header>
      <div class="charo-modos" role="radiogroup" aria-label="Modo">${[["teoria", "Teoría"], ["caso", "Misión"], ["indaga", "INDAGA"]].map(([k, t]) => `<button type="button" role="radio" data-cmodo="${k}">${t}</button>`).join("")}</div>
      <p class="charo-ctx" id="charo-ctx" hidden></p>
      <div class="charo-msgs" id="charo-msgs" aria-live="polite"></div>
      <form id="charo-form" class="charo-form"><label for="charo-txt" class="saltar-l">Tu pregunta</label><textarea id="charo-txt" rows="2" maxlength="1500" placeholder="Escribe tu duda. No incluyas datos personales."></textarea>
        <div class="charo-acc"><button type="button" class="boton peq gris" id="charo-nueva">Nueva conversación</button><button type="submit" class="boton peq" id="charo-env">Enviar</button></div></form>
      <p class="charo-estado" id="charo-estado"></p>
      <p class="charo-pie">Charo es un homenaje a Rosario (Charo) Martínez Arias. <a href="#charo">Quién fue y cómo funciona</a>.</p>
    </aside>`;
  document.body.insertAdjacentHTML("beforeend", html);
  const panel = $("#charo-panel"), msgs = $("#charo-msgs"), txt = $("#charo-txt");

  function burbuja(rol, contenido, md) {
    const d = document.createElement("div"); d.className = "charo-b " + (rol === "user" ? "yo" : "ella");
    d.innerHTML = `<span class="charo-rol">${rol === "user" ? "Tú" : "Charo"}</span><div>${md ? render(contenido) : esc(contenido)}</div>`;
    msgs.append(d); msgs.scrollTop = msgs.scrollHeight; return d;
  }
  function pintaModo() { panel.querySelectorAll("[data-cmodo]").forEach((b) => b.setAttribute("aria-checked", String(b.dataset.cmodo === modoActual))); const c = contexto();
    const t = c.caso ? `${c.caso}${c.paso ? " · " + c.paso : ""}` : c.estacion ? `Taller del Método · estación «${c.estacion}»` : c.unidad ? `Unidad: ${c.unidad}` : c.simulador ? `Simulador: ${c.simulador}` : "";
    $("#charo-ctx").textContent = t ? "Contexto: " + t : ""; $("#charo-ctx").hidden = !t; }
  function saludo() {
    msgs.textContent = ""; historial = [];
    burbuja("model", modoActual === "indaga" ? "Hola. Vamos con vuestro método. **No lo voy a escribir por vosotros**, pero te ayudo a decidir. Para empezar: ¿cuál es vuestra pregunta de investigación y a quién queréis estudiar?"
      : modoActual === "caso" ? "Hola. Cuéntame en qué paso de la misión estás y qué has pensado. Te ayudaré con preguntas, sin darte la respuesta de entrada."
      : "Hola, soy Charo. ¿Qué concepto quieres entender? Si me dices qué has pensado tú, te ayudo a afinarlo.", true);
  }
  function abrir(modo, extra) {
    if (modo) modoActual = modo; else { const c = contexto(); modoActual = c.modo === "indaga" ? "indaga" : c.caso ? "caso" : "teoria"; }
    ctxExtra = extra || "";
    panel.classList.add("abierto"); panel.setAttribute("aria-hidden", "false"); $("#charo-fondo").hidden = false; $("#charo-boton").setAttribute("aria-expanded", "true");
    if (!msgs.children.length) saludo(); pintaModo();
    if (!st().aviso) avisoPrivacidad(); else txt.focus();
  }
  function cerrar() { panel.classList.remove("abierto"); panel.setAttribute("aria-hidden", "true"); $("#charo-fondo").hidden = true; $("#charo-boton").setAttribute("aria-expanded", "false"); $("#charo-boton").focus(); }
  function avisoPrivacidad() {
    const d = document.createElement("div"); d.className = "charo-aviso";
    d.innerHTML = `<b>Antes de empezar</b><ul><li>Charo usa un modelo de IA (Gemini, de Google) a través de un servidor de la asignatura. <b>No escribas datos personales</b> ni de participantes.</li><li>Puede equivocarse: contrasta lo que te diga con las diapositivas y con Brújula.</li><li>Te ayuda a pensar; no hace ejercicios evaluables por ti. Si la usas en INDAGA, <b>declara su uso</b> (Brújula guarda tus preguntas en este navegador para la Tabla 5).</li></ul><button type="button" class="boton peq" id="charo-acepto">Entendido</button>`;
    msgs.prepend(d); $("#charo-acepto").addEventListener("click", () => { st().aviso = true; B.guardar(); d.remove(); txt.focus(); });
  }

  async function enviar(e) {
    e.preventDefault(); if (ocupado) return;
    const t = txt.value.trim(); if (!t) return;
    if (!st().aviso) { $("#charo-estado").textContent = "Lee y acepta el aviso para continuar."; return; }
    if (/\b\d{8}[A-Za-z]\b|@[a-z0-9.-]+\.[a-z]{2,}|\b\d{9}\b/.test(t)) { $("#charo-estado").textContent = "Parece que hay un DNI, un correo o un teléfono. Quítalo antes de enviar."; return; }
    const hoy = new Date().toISOString().slice(0, 10); if (st().dia !== hoy) { st().dia = hoy; st().n = 0; }
    if (st().n >= (CFG().limiteDiario || 40)) { $("#charo-estado").textContent = "Has llegado al límite de consultas de hoy. Mañana más."; return; }
    const c = contexto();
    burbuja("user", t); txt.value = "";
    st().log.push({ fecha: new Date().toISOString(), prompt: t.slice(0, 1500), finalidad: finalidad(c), herramienta: CFG().herramienta || "Charo IA (Brújula) · Gemini" }); st().n++; B.guardar();
    const ep = CFG().endpoint;
    if (!ep) {
      const app = CFG().appUrl;
      if (app) { // Charo como app de Google AI Studio: se abre en otra pestaña con la pregunta y el contexto
        const ctxTxt = [c.unidad && "Unidad: " + c.unidad, c.caso && c.caso, c.paso && "Paso: " + c.paso, c.enunciado && "Enunciado: " + c.enunciado, c.estacion && "Taller del Método: " + (EST[c.estacion] || c.estacion), c.simulador && "Simulador: " + c.simulador, c.extra].filter(Boolean).join(" · ").slice(0, 1200);
        const url = app + (app.includes("?") ? "&" : "?") + new URLSearchParams({ origen: "brujula", modo: c.modo || "teoria", ctx: ctxTxt, q: t }).toString();
        const b = burbuja("model", "Te abro **Charo** en una pestaña nueva con tu pregunta y lo que tienes en pantalla. Si no se abre, usa el botón.", true);
        const a = document.createElement("a"); a.className = "boton peq"; a.href = url; a.target = "_blank"; a.rel = "noopener"; a.textContent = "Abrir Charo";
        b.append(a); window.open(url, "_blank", "noopener"); return;
      }
      // modo sin conexión: preparar la pregunta para copiarla en otra herramienta
      const paquete = `Pregunta de un estudiante de Métodos y Diseños de Investigación (Psicología).\nContexto: ${JSON.stringify(c)}\nPregunta: ${t}\nResponde como tutora socrática: una pregunta orientadora, sin dar la solución de entrada.`;
      const b = burbuja("model", "Todavía no estoy conectada a mi servidor. He preparado tu pregunta con su contexto: puedes copiarla y llevarla a tu asistente de IA institucional, o consultar la teoría de Brújula.", true);
      const bt = document.createElement("button"); bt.type = "button"; bt.className = "boton peq sec"; bt.textContent = "Copiar la pregunta con el contexto"; bt.addEventListener("click", () => navigator.clipboard?.writeText(paquete).then(() => B.aviso("Copiado")));
      b.append(bt); return;
    }
    ocupado = true; $("#charo-env").disabled = true; $("#charo-estado").textContent = "Charo está pensando…";
    const espera = burbuja("model", "…");
    try {
      const r = await fetch(ep, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: t, history: historial.slice(-8), context: c }) });
      const d = await r.json().catch(() => ({})); if (!r.ok) throw new Error(d.error || "Servicio no disponible");
      espera.remove(); burbuja("model", d.reply || "No he podido generar una respuesta.", true);
      historial.push({ role: "user", content: t }, { role: "model", content: d.reply || "" }); $("#charo-estado").textContent = "Respuesta generada con IA. Compruébala con tus materiales.";
    } catch (err) { espera.remove(); burbuja("model", "No he podido responder ahora (" + (err.message || "error de conexión") + "). Inténtalo más tarde o consulta la teoría de Brújula.", false); $("#charo-estado").textContent = ""; }
    finally { ocupado = false; $("#charo-env").disabled = false; txt.focus(); }
  }

  $("#charo-boton").addEventListener("click", () => abrir());
  $("#charo-cerrar").addEventListener("click", cerrar); $("#charo-fondo").addEventListener("click", cerrar);
  $("#charo-nueva").addEventListener("click", saludo);
  $("#charo-form").addEventListener("submit", enviar);
  txt.addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); $("#charo-form").requestSubmit(); } });
  panel.querySelectorAll("[data-cmodo]").forEach((b) => b.addEventListener("click", () => { modoActual = b.dataset.cmodo; pintaModo(); saludo(); }));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && panel.classList.contains("abierto")) cerrar(); });
  document.addEventListener("click", (e) => { const b = e.target.closest("[data-charo-modo]"); if (b) abrir(b.dataset.charoModo, b.dataset.charoCtx || ""); });
  window.addEventListener("hashchange", () => { if (panel.classList.contains("abierto")) pintaModo(); });
  B.charo = { abrir, cerrar };

  // ---------- página de homenaje ----------
  B.vista("charo", (main) => {
    main.innerHTML = `<p class="miga"><a href="#inicio">← Inicio</a></p><section class="charo-homenaje">
      <img src="img/charo/charo-retrato.jpg" alt="Ilustración de Charo con un libro de métodos de investigación delante de un edificio universitario" width="560" height="786">
      <div><p class="eyebrow">EN RECUERDO</p><h1>Charo IA</h1>
        <p class="lead">Charo IA es un homenaje a <b>Rosario (Charo) Martínez Arias</b>, catedrática de Metodología de las Ciencias del Comportamiento de la Universidad Complutense de Madrid y referente de la psicometría española, que nos dejó hace poco. Generaciones de psicólogas y psicólogos aprendieron con ella a medir con rigor y a diseñar investigaciones que respondan de verdad a sus preguntas.</p>
        <p>Esta tutora virtual <b>no es ella ni habla en su nombre</b>: lleva su nombre como agradecimiento. La ilustración ha sido generada con IA.</p>
        <h2>Cómo funciona</h2><ul><li>Responde con preguntas para que razones tú (método socrático) y solo da la solución tras varios intentos.</li><li>Conoce los contenidos de Brújula y de las diapositivas, y ve en qué pantalla estás: una misión, una unidad o el Taller del Método.</li><li>Usa un modelo de IA de Google (Gemini) a través de un servidor de la asignatura. No escribas datos personales.</li><li>Puede equivocarse: contrasta siempre con tus materiales.</li><li>Si la usas en el Proyecto INDAGA, declara su uso. Brújula guarda tus preguntas en este navegador para completar la Tabla 5.</li></ul>
        <div class="botonera"><button type="button" class="boton" data-charo-modo="teoria">Hablar con Charo</button><a class="boton sec" href="#indaga">Taller del Método</a></div></div></section>`;
    B.eduar && B.eduar("hablando", "Charo te ayudará con preguntas. Yo sigo aquí para orientarte por Brújula.");
  });
})(window.Brujula);
