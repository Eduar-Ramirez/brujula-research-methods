/* Brújula 2 · navegación pedagógica y acompañamiento guionizado.
   Los contenidos y motores de evaluación originales siguen siendo la fuente de verdad. */
(function (B) {
  'use strict';
  const $ = B.$, esc = B.esc, S = B.S;
  const original = { ...B.vistas };
  const ui = () => (S().interfaz ||= {});
  const visible = id => B.unidades[id] && B.listaUnidades().some(u => u.id === id);
  const allCases = () => window.CONTENIDO.casos;
  const pct = x => Math.round((x || 0) * 100);
  const progress = (value, label) => `<div class="medidor" role="progressbar" aria-label="${esc(label)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct(value)}"><span style="width:${Math.max(0, Math.min(100, pct(value)))}%"></span></div>`;
  const meta = {
    fund: ['¿Cómo se convierte una idea en una investigación?', ['Pregunta y evidencia', 'Tradiciones de investigación', 'Lógica del experimento']],
    cuali: ['¿Cómo comprendemos experiencias y significados?', ['Diseños cualitativos', 'Recogida y análisis', 'Rigor e interpretación']],
    t4: ['¿Cómo comparar condiciones con personas distintas?', ['Asignación aleatoria', 'Bloqueo y control', 'Placebo y diseño ciego']],
    t5: ['¿Qué cambia cuando participan las mismas personas?', ['Medidas repetidas', 'Efectos del orden', 'Reequilibrado']],
    t6: ['¿Qué ocurre cuando dos factores actúan juntos?', ['Factores y niveles', 'Efectos principales', 'Interacción']],
    t7: ['¿Cómo estudiar un cambio en una sola persona?', ['Línea base', 'Fases de intervención', 'Análisis visual']],
    cuasi: ['¿Cómo investigar sin asignar individualmente al azar?', ['Grupos no equivalentes', 'Control', 'Validez interna']],
    epf: ['¿Cómo estudiar diferencias que ya existen?', ['Sin manipulación', 'Explicaciones alternativas', 'Límites causales']],
    desc: ['¿Cómo observar y recoger información?', ['Observación', 'Encuesta', 'Medición']]
  };
  const heading = (n, title, text) => `<header class="page-heading"><p class="eyebrow">${n}</p><h1>${title}</h1><p>${text}</p></header>`;
  const back = (href, text) => `<p class="miga"><a href="#${href}">← ${text}</a></p>`;
  const unitSelect = (id, value = 'todas') => `<label class="filtro-nuevo" for="${id}">Tema <select id="${id}"><option value="todas">Toda la materia</option>${B.listaUnidades().map(u => `<option value="${u.id}" ${u.id === value ? 'selected' : ''}>${esc(u.titulo)}</option>`).join('')}</select></label>`;
  const cleanText = text => B.sinTags(text).replace(/&nbsp;/g, ' ').replace(/&[a-z]+;/g, ' ');

  // One animated intervention at a time; motion never continues indefinitely.
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let avatarTimer, currentGesture = 'esperando';
  const times = { hablando: 3000, celebrando: 2500, sorpresa: 2500, reflexivo: 3000, esperando: 4000 };
  // Keep the resting portrait behind the GIF while an asset loads or fails.
  const portrait = $('#eduar-img');
  portrait.addEventListener('error', () => { portrait.style.visibility = 'hidden'; });
  portrait.addEventListener('load', () => { portrait.style.visibility = 'visible'; });
  const avatarCache = Object.keys(times).map(state => {
    const image = new Image(); image.src = `img/eduar/eduar-${state}.gif`; return image;
  });
  const canAnimate = () => !motion.matches && ui().animaciones !== false;
  function animate(state) {
    clearTimeout(avatarTimer);
    const img = $('#eduar-img');
    if (!img) return;
    currentGesture = state in times ? state : 'esperando';
    img.src = canAnimate() ? `img/eduar/eduar-${currentGesture}.gif` : 'img/eduar/eduar-reposo.png';
    avatarTimer = setTimeout(() => { img.src = 'img/eduar/eduar-reposo.png'; }, times[currentGesture]);
  }
  B.eduar = (state, text, actions = []) => {
    $('#eduar-texto').textContent = cleanText(text);
    $('#mentor-acciones').innerHTML = actions.map(a => `<a href="#${a[0]}">${esc(a[1])} →</a>`).join('');
    animate(state);
  };
  const motionControl = $('#eduar-motion');
  motionControl.checked = canAnimate();
  motionControl.disabled = motion.matches;
  motionControl.addEventListener('change', () => { ui().animaciones = motionControl.checked; B.guardar(); animate(currentGesture); });
  motion.addEventListener('change', () => { motionControl.checked = canAnimate(); motionControl.disabled = motion.matches; animate(currentGesture); });
  $('#eduar-repetir').addEventListener('click', () => animate(currentGesture));
  $('#mentor-toggle').addEventListener('click', () => {
    ui().mentorCerrado = !ui().mentorCerrado; B.guardar(); mentorVisibility();
  });
  function mentorVisibility() {
    const closed = !!ui().mentorCerrado;
    $('#mentor-cuerpo').hidden = closed;
    $('#mentor-toggle').textContent = closed ? '+' : '−';
    $('#mentor-toggle').setAttribute('aria-expanded', String(!closed));
    $('#mentor-toggle').setAttribute('aria-label', closed ? 'Mostrar a Eduar' : 'Contraer a Eduar');
  }
  mentorVisibility();
  document.querySelector('.saltar').addEventListener('click', event => { event.preventDefault(); $('#principal').focus(); $('#principal').scrollIntoView(); });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Tab' || $('#modal').hidden) return;
    const controls = Array.from($('#modal').querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled])')).filter(e => e.getClientRects().length);
    if (!controls.length) return;
    const first = controls[0], last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });

  B.vista('inicio', main => {
    const route = B.estadoRuta(), next = B.siguienteMision();
    const resume = ui().ultimaRuta || (S().casos.caso ? `caso/${S().casos.caso}` : S().ultima) || 'explora';
    main.innerHTML = `<section class="welcome"><p class="eyebrow">TU AVENTURA DE INVESTIGACIÓN</p><h1>Las buenas preguntas<br>abren caminos.</h1><p>Comprende la materia, pon a prueba tus ideas y resuelve investigaciones. A tu ritmo, con Eduar a tu lado.</p><a class="boton naranja" href="#${esc(resume)}">${ui().ultimaRuta || S().ultima || S().casos.caso ? 'Continuar donde lo dejé' : 'Empezar a explorar'} <span aria-hidden="true">↗</span></a><div class="welcome-orbit" aria-hidden="true"><span>✦</span></div><p class="welcome-foot">OBSERVA · PREGUNTA · DESCUBRE</p></section>
    <div class="section-label"><h2>Tres espacios, un recorrido</h2><span>Elige qué necesitas hoy</span></div>
    <div class="worlds">
      <a class="world world-explora" href="#explora"><span class="world-no">01 / COMPRENDER</span><span class="world-icon" aria-hidden="true">⌁</span><h2>Explora <br>la materia</h2><p>Un mapa claro de las ideas. Por semanas o por unidades.</p><span class="world-link">Ver el panorama <b>↗</b></span></a>
      <a class="world world-desafios" href="#desafios"><span class="world-no">02 / PRACTICAR</span><span class="world-icon" aria-hidden="true">✧</span><h2>Desafíos</h2><p>Recuerda, experimenta y decide como un investigador.</p><span class="world-link">Entrenar mis ideas <b>↗</b></span></a>
      <a class="world world-libera" href="#libera"><span class="world-no">03 / INVESTIGAR</span><span class="world-icon" aria-hidden="true">⚑</span><h2>Libera el <br>conocimiento</h2><p>Misiones con datos y decisiones que desbloquean el simulacro.</p><span class="world-link">Abrir las misiones <b>↗</b></span></a>
    </div>
    <section class="next-mission"><div><p class="eyebrow">TU SIGUIENTE PASO</p><h2>${route.abierto ? 'El simulacro está disponible' : next ? esc(next.titulo) : 'Revisa tu ruta de investigación'}</h2><p>${route.abierto ? 'Comprueba lo aprendido y descubre qué conviene reforzar.' : 'Cada decisión cuenta. La ruta conserva tus avances para que puedas continuar después.'}</p></div><a class="boton sec" href="#${route.abierto ? 'simulacro' : next ? 'caso/' + next.id : 'libera'}">${route.abierto ? 'Abrir simulacro' : 'Ir a la misión'} →</a></section>`;
    B.eduar('hablando', 'Hola, soy Eduar. Aquí puedes explorar la teoría, practicar tus ideas o entrar en una misión. Tú eliges el camino.');
  });

  function unitCard(u) {
    const read = u.secciones.filter(s => S().leido[u.id + '/' + s.id]).length;
    return `<a class="topic-card" href="#unidad/${u.id}"><p class="eyebrow">${u.tema} ${B.etiquetaEstado(u)}</p><h2>${esc(u.titulo)}</h2><p>${esc(meta[u.id]?.[0] || u.resumen)}</p><div class="topic-tags">${(meta[u.id]?.[1] || []).map(t => `<span>${esc(t)}</span>`).join('')}</div><div class="topic-bottom"><span>${read}/${u.secciones.length} secciones leídas</span><span aria-hidden="true">↗</span></div></a>`;
  }
  B.vista('explora', (main, [view]) => {
    view = ['semanas', 'unidades'].includes(view) ? view : ui().vistaTeoria || 'semanas';
    ui().vistaTeoria = view; B.guardar();
    main.innerHTML = heading('01 / COMPRENDER', 'Explora la materia', 'Primero, el panorama. Conecta las ideas y profundiza cuando lo necesites. La teoría está siempre disponible.') +
      `<div class="explora-toolbar">${B.subnav('explora', [['semanas', 'Por semanas'], ['unidades', 'Por unidades']], view)}<div class="text-links"><a href="#orientarse/mapa">Mapa de diseños ↗</a><a href="#orientarse/comparador">Comparador ↗</a></div></div>` +
      (view === 'unidades' ? `<div class="topics">${B.listaUnidades().map(unitCard).join('')}</div>` : `<ol class="week-list">${B.conf.cronograma.map(w => {
        const u = visible(w.unidad) ? B.unidades[w.unidad] : null;
        return `<li><div class="week-number"><small>SEMANA</small><b>${String(w.sem).padStart(2, '0')}</b></div><div><h2>${esc(w.titulo)}</h2><p>${u ? esc(u.resumen) : 'Esta semana aún no tiene una ficha de teoría asociada.'}</p>${u ? B.etiquetaEstado(u) : '<span class="prep">Material pendiente</span>'}</div>${u ? `<a class="boton sec" href="#unidad/${u.id}">Ver teoría <span aria-hidden="true">→</span></a>` : '<span class="nota">Próximamente</span>'}</li>`;
      }).join('')}</ol>`);
    B.eduar('esperando', 'Aquí solo encontrarás teoría. Cambia entre semanas y unidades: el contenido es el mismo, tú eliges cómo recorrerlo.');
  });
  B.vista('unidades', (main) => B.vistas.explora(main, ['unidades']));
  B.vista('unidad', (main, [id, tab]) => {
    if (!visible(id)) { B.vistas.explora(main, ['unidades']); return; }
    if (tab === 'investigar') { B.vistas.libera(main, ['todos', id]); return; }
    if (tab === 'repasar' || tab === 'experimentar') { B.vistas.desafios(main, [id]); return; }
    const u = B.unidades[id], read = u.secciones.filter(s => S().leido[id + '/' + s.id]).length;
    const related = B.datosMapa.disenos.filter(d => d.unidad === id);
    main.innerHTML = back('explora', 'Explora la materia') + heading(`${u.tema} / ${u.bloque}`, u.titulo, u.resumen) +
      `${B.estadoUnidad(u) === 'en-preparacion' ? '<p class="callout warn">Este tema está en preparación. Esta es la teoría disponible hasta ahora.</p>' : ''}
      <section class="overview"><p class="eyebrow">LA PREGUNTA CENTRAL</p><h2>${esc(meta[id]?.[0] || u.titulo)}</h2><div class="concept-chain">${(meta[id]?.[1] || []).map((x, i) => `<div><span>0${i + 1}</span><b>${esc(x)}</b></div>`).join('')}</div></section>
      <div class="section-label"><h2>Profundiza a tu ritmo</h2><span id="lectura-total">${read} de ${u.secciones.length} secciones leídas</span></div>
      <div class="reading-list">${u.secciones.map((s, i) => `<details class="reading-section" id="sec-${s.id}"><summary><span class="reading-num">${String(i + 1).padStart(2, '0')}</span><span>${s.titulo}</span><span class="read-mark" data-mark="${s.id}">${S().leido[id + '/' + s.id] ? 'Leída ✓' : 'Leer +'}</span></summary><div class="reading-content teoria">${s.html}<button type="button" class="boton sec" data-leer="${s.id}" aria-pressed="${!!S().leido[id + '/' + s.id]}">${S().leido[id + '/' + s.id] ? '✓ Leída' : 'Marcar como leída'}</button></div></details>`).join('')}</div>
      ${related.length ? `<section class="reference-strip"><h2>Diseños relacionados</h2>${related.map(d => `<button type="button" class="boton sec" data-ficha="${d.id}">${esc(d.name)}</button>`).join('')}</section>` : ''}
      <p class="nota">Referencia: ${esc(u.libro)}. ${esc(u.bloque)}.</p>`;
    main.querySelectorAll('[data-leer]').forEach(button => button.addEventListener('click', () => {
      const key = id + '/' + button.dataset.leer;
      if (S().leido[key]) delete S().leido[key]; else S().leido[key] = true;
      B.guardar(); const value = !!S().leido[key];
      button.setAttribute('aria-pressed', String(value)); button.textContent = value ? '✓ Leída' : 'Marcar como leída';
      main.querySelector(`[data-mark="${button.dataset.leer}"]`).textContent = value ? 'Leída ✓' : 'Leer +';
      $('#lectura-total').textContent = `${u.secciones.filter(s => S().leido[id + '/' + s.id]).length} de ${u.secciones.length} secciones leídas`;
    }));
    B.eduar('esperando', 'Lee primero el esquema. Abre después las secciones que quieras estudiar. Marcar una lectura no equivale a superar una misión.');
  });

  B.vista('desafios', (main, [uid]) => {
    uid = visible(uid) ? uid : 'todas';
    const units = uid === 'todas' ? B.listaUnidades() : [B.unidades[uid]];
    const count = field => units.reduce((n, u) => n + (u[field] || []).length, 0);
    const sims = Object.values(B.simuladores).filter(s => uid === 'todas' || s.unidad.includes(uid));
    main.innerHTML = heading('02 / PRACTICAR', 'Desafíos', 'Prueba una idea, recuerda un concepto o explora una decisión. Aquí los errores son una oportunidad para comprender.') + unitSelect('desafio-tema', uid) +
      `<a class="decision-feature" href="#decide"><span class="decision-glyph" aria-hidden="true">✧</span><div><p class="eyebrow">UN DIÁLOGO CON EDUAR</p><h2>Decide como un investigador</h2><p>De tu pregunta al diseño: toma decisiones y comprende por qué encajan.</p></div><span aria-hidden="true">↗</span></a>
      <div class="challenge-grid">${[
        ['tarjetas', 'Tarjetas de memoria', 'Recuerda primero. Descubre la respuesta después.', count('flash'), 'flash'],
        ['test', 'Preguntas rápidas', 'Comprueba lo que entiendes, con explicaciones.', count('test'), 'test'],
        ['emparejar', 'Conecta los conceptos', 'Relaciona cada situación con su concepto.', count('emparejar'), 'emparejar']
      ].map(([route, title, desc, n]) => `<article class="challenge-card"><p class="eyebrow">${n} ${route === 'emparejar' ? 'EJERCICIOS' : route === 'test' ? 'PREGUNTAS' : 'TARJETAS'}</p><h2>${title}</h2><p>${desc}</p>${n ? `<a class="boton sec" href="#repasar/${route}/${uid}">Practicar →</a>` : '<span class="nota">Sin actividades para este tema</span>'}</article>`).join('')}</div>
      <div class="section-label"><h2>Experimenta: ¿qué pasaría si…?</h2><span>${sims.length} simuladores</span></div><div class="topics">${sims.map(s => `<a class="topic-card" href="#simulador/${s.id}"><p class="eyebrow">LABORATORIO INTERACTIVO</p><h2>${s.titulo}</h2><p>${s.resumen}</p><span class="world-link">Abrir simulador ↗</span></a>`).join('') || '<p class="tarjeta">Este tema no tiene simulador. Puedes practicar con sus tarjetas y preguntas.</p>'}</div>`;
    $('#desafio-tema').addEventListener('change', e => B.ir('desafios/' + e.target.value));
    B.eduar('hablando', 'Podemos practicar juntos. Empieza por una actividad corta o acompáñame a decidir qué diseño necesita una investigación.');
  });

  // The decision tree and practice questions reuse the authored teaching content.
  let treePath = [];
  B.vista('decide', main => {
    function paint(focus = false) {
      let node = B.datosMapa.arbol, result = null;
      const trail = [];
      for (const index of treePath) {
        const option = node.opts[index]; trail.push(option.label);
        if (option.res) { result = option.res; break; }
        node = option.next;
      }
      main.innerHTML = back('desafios', 'Desafíos') + heading('02 / DIÁLOGO CON EDUAR', 'Decide como un investigador', 'Piensa en una investigación. Tus respuestas irán construyendo el camino hacia un diseño.') +
        `<ol class="decision-trail">${trail.map((t, i) => `<li><button type="button" data-tree-back="${i}">${esc(t)} <span aria-hidden="true">↶</span></button></li>`).join('')}</ol>` +
        (result ? `<section class="decision-result"><p class="eyebrow">TU RAZONAMIENTO NOS LLEVA A…</p><h2 tabindex="-1" id="tree-focus">${esc(result.name)}</h2><p>${result.why}</p><div class="botonera">${visible(result.unidad) ? `<a class="boton" href="#unidad/${result.unidad}">Consultar la teoría</a><button type="button" class="boton sec" id="tree-quiz">Probar una pregunta</button>` : ''}<button type="button" class="boton gris" id="tree-reset">Otra investigación</button></div><div id="mini-quiz"></div></section>` :
          `<section class="decision-question"><span class="dialogue-label">EDUAR · PASO ${treePath.length + 1}</span><h2 tabindex="-1" id="tree-focus">${node.q}</h2><p class="nota">Elige lo que describe tu investigación.</p><div class="decision-options">${node.opts.map((o, i) => `<button type="button" data-tree-answer="${i}"><span class="option-letter">${String.fromCharCode(65 + i)}</span><span>${o.label}</span><span aria-hidden="true">→</span></button>`).join('')}</div>${treePath.length ? `<button type="button" class="enlace" data-tree-back="${treePath.length - 1}">← Revisar mi decisión anterior</button>` : ''}</section>`);
      main.querySelectorAll('[data-tree-answer]').forEach(b => b.addEventListener('click', () => { treePath.push(Number(b.dataset.treeAnswer)); paint(true); }));
      main.querySelectorAll('[data-tree-back]').forEach(b => b.addEventListener('click', () => { treePath = treePath.slice(0, Number(b.dataset.treeBack)); paint(true); }));
      $('#tree-reset')?.addEventListener('click', () => { treePath = []; paint(true); });
      $('#tree-quiz')?.addEventListener('click', () => miniQuiz(result.unidad));
      B.eduar(result ? 'sorpresa' : 'hablando', result ? 'Ya tienes una orientación razonada. Revisa por qué encaja y, si quieres, probamos una pregunta de ese tema.' : cleanText(node.q));
      if (focus) $('#tree-focus').focus({ preventScroll: true });
    }
    paint();
  });
  function miniQuiz(uid) {
    const qs = B.unidades[uid]?.test || [], zone = $('#mini-quiz');
    if (!qs.length) { zone.innerHTML = '<p>No hay preguntas breves para este tema.</p>'; return; }
    const q = qs[Math.floor(Math.random() * qs.length)];
    zone.innerHTML = `<div class="mini-practice"><h3>${q.q}</h3><div class="decision-options">${q.o.map((o, k) => `<button type="button" data-mini="${k}">${o}</button>`).join('')}</div><div id="mini-feedback" role="status"></div></div>`;
    zone.querySelectorAll('[data-mini]').forEach(b => b.addEventListener('click', () => {
      const ok = Number(b.dataset.mini) === q.a;
      zone.querySelectorAll('[data-mini]').forEach(x => { x.disabled = true; });
      $('#mini-feedback').innerHTML = `<p class="feedback ${ok ? 'bien' : 'mal'}"><b>${ok ? 'Bien razonado.' : 'Revisemos la idea.'}</b> ${q.fb || ''}<br>Respuesta: ${q.o[q.a]}</p><a href="#repasar/test/${uid}">Seguir practicando →</a>`;
      B.eduar(ok ? 'celebrando' : 'reflexivo', ok ? 'Has conectado la idea con el diseño. Sigue así.' : 'Cada error nos indica qué revisar. Lee la explicación y vuelve a la teoría si lo necesitas.');
    }));
  }

  function caseStats(c) {
    const steps = c.pasos.filter(p => p.tipo !== 'jasp'), state = S().casos.estado[c.id] || {};
    const ok = steps.filter(p => state[p.id]?.resuelto && !state[p.id]?.revelado).length;
    const revealed = steps.filter(p => state[p.id]?.revelado).length;
    const done = !!S().casos.fin[c.id];
    return { n: steps.length, ok, revealed, done, status: ok === steps.length && done ? 'Resuelta' : done ? 'Recorrido terminado' : Object.keys(state).length ? 'En curso' : 'Disponible' };
  }
  function missionCard(c, i) {
    const st = caseStats(c), units = B.unidadesDeCaso(c);
    return `<article class="mission-card"><div class="mission-marker">${st.status === 'Resuelta' ? '✓' : String(i + 1).padStart(2, '0')}</div><div class="mission-body"><div class="mission-meta"><span>${units.map(id => B.unidades[id].tema).join(' · ') || esc(c.tema)}</span><span class="mission-status">${st.status}</span></div><h2>${esc(c.titulo)}</h2><p>${c.resumen}</p><div class="mission-metrics"><span>${st.ok}/${st.n} problemas resueltos</span><span>${c.datos?.length ? `${c.datos.length} base${c.datos.length > 1 ? 's' : ''} de datos` : 'Análisis sin descarga'}</span></div>${progress(st.ok / st.n, 'Problemas resueltos de ' + c.titulo)}${st.revealed ? `<p class="nota">${st.revealed} respuestas consultadas: no cuentan para el desbloqueo.</p>` : ''}<div class="botonera"><a class="boton" href="#caso/${c.id}">${st.status === 'Disponible' ? 'Empezar misión' : st.done ? 'Revisar misión' : 'Continuar misión'} →</a>${units[0] ? `<a class="boton sec" href="#unidad/${units[0]}">Teoría</a>` : ''}${st.done || st.revealed ? `<button type="button" class="enlace" data-reset-mission="${c.id}">Reintentar desde el inicio</button>` : ''}</div></div></article>`;
  }
  B.vista('libera', (main, [tab, uid]) => {
    tab = tab === 'todos' ? 'todos' : 'ruta'; uid = visible(uid) ? uid : 'todas';
    const r = B.estadoRuta(), p = B.conf.parcial;
    let cases = tab === 'ruta' ? p.ruta.map(id => allCases().find(c => c.id === id)).filter(Boolean) : allCases();
    if (uid !== 'todas') cases = cases.filter(c => B.unidadesDeCaso(c).includes(uid));
    const req = (label, ok, total, threshold) => `<div class="requirement"><div><b>${label}</b><span>${ok}/${total} · ${pct(total ? ok / total : 1)} %</span></div>${progress(total ? ok / total : 1, label)}<p>${Math.max(0, Math.ceil(total * threshold) - ok) ? `Faltan ${Math.max(0, Math.ceil(total * threshold) - ok)} para alcanzar el ${pct(threshold)} %.` : 'Meta alcanzada ✓'}</p></div>`;
    main.innerHTML = heading('03 / INVESTIGAR', 'Libera el conocimiento', 'Resuelve misiones, trabaja con datos y explica tus conclusiones. El simulacro se abre con tu práctica.') +
      `<section class="unlock-panel"><div><p class="eyebrow">RUTA AL ${esc(p.nombre).toUpperCase()}</p><h2>${r.abierto ? 'Tu simulacro está desbloqueado' : 'Tu práctica abre la siguiente puerta'}</h2><p class="nota">${esc(p.nombre)} · ${new Date(p.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p><p>Resuelve correctamente el ${pct(p.umbral)} % de los problemas de la ruta y el ${pct(p.umbralJasp)} % de las lecturas de JASP, sin consultar la respuesta razonada.</p></div><div>${req('Problemas de la ruta', r.ok, r.n, p.umbral)}${req('Lecturas de JASP', r.okj, r.nj, p.umbralJasp)}</div><div class="unlock-bottom"><span>${r.abierto ? 'Desbloqueo conservado en este navegador.' : 'Las dos metas son necesarias. Consultar una solución sirve para aprender, pero no suma.'}</span>${r.abierto ? '<a class="boton" href="#simulacro">Entrar al simulacro →</a>' : '<span class="locked-label">Simulacro pendiente</span>'}</div></section>
      <div class="explora-toolbar">${B.subnav('libera', [['ruta', `Ruta al ${p.nombre}`], ['todos', 'Todas las misiones']], tab)}${unitSelect('mision-tema', uid)}</div>
      <p class="nota">${tab === 'ruta' ? 'Siete misiones sobre los contenidos de las semanas 1 a 7. Las semanas 1–2 comparten una misión y la semana 6 tiene dos.' : 'Las quince misiones disponibles. Solo las incluidas en la ruta cuentan para desbloquear el simulacro.'} Terminar el recorrido y resolver los problemas son avances diferentes.</p>
      <div class="mission-list">${cases.map(missionCard).join('') || '<p class="tarjeta">Todavía no hay misiones para este tema.</p>'}</div>
      <section class="reference-strip"><h2>Tu mesa de trabajo</h2><div class="botonera"><a class="boton sec" href="${esc(p.jasp)}" target="_blank" rel="noopener">Descargar JASP ↗</a><button type="button" class="boton sec" data-ayuda="jasp">Guía de JASP</button><a class="boton sec" href="#consultar/ayudas">Fichas de análisis</a></div><p class="nota">Los datos son simulados. Los casos cualitativos tienen sus propias tareas, sin exigir JASP.</p></section>`;
    $('#mision-tema').addEventListener('change', e => B.ir(`libera/${tab}/${e.target.value}`));
    main.querySelectorAll('[data-reset-mission]').forEach(b => b.addEventListener('click', () => {
      const id = b.dataset.resetMission;
      B.modal('¿Reintentar esta misión?', '<p>Se borrarán las respuestas y el recorrido de esta misión. El resto del progreso se conserva.</p>', '<button class="boton gris" data-cerrar>Cancelar</button><button class="boton" id="confirm-reset">Reiniciar misión</button>');
      $('#confirm-reset').addEventListener('click', () => { ['estado', 'ruta', 'ver', 'fin', 'desbloq'].forEach(k => delete S().casos[k][id]); S().casos.log = S().casos.log.filter(x => x.caso !== id); B.guardar(); B.cerrarModal(); B.render(); });
    }));
    B.eduar(r.abierto ? 'celebrando' : 'hablando', r.abierto ? 'Tu práctica ha desbloqueado el simulacro. Puedes hacerlo o seguir investigando.' : 'Cada misión recorre una investigación. Si un dato no coincide, revisa la guía y vuelve a intentarlo.');
  });
  B.vista('parcial', main => B.vistas.libera(main, ['ruta']));
  B.vista('casos', main => B.vistas.libera(main, ['todos']));
  B.vista('orientarse', (main, args) => {
    if (args[0] === 'brujula') { B.vistas.decide(main); return; }
    original.orientarse(main, args);
    main.insertAdjacentHTML('afterbegin', back('explora', 'Explora la materia'));
    main.querySelector('h1').textContent = args[0] === 'comparador' ? 'Comparador de diseños' : 'Mapa de diseños';
    main.querySelector('a[href="#orientarse/brujula"]')?.remove();
    B.eduar('esperando', 'Compara las características de los diseños y consulta sus fichas.');
  });
  ['repasar', 'simuladores', 'simulador', 'consultar', 'simulacro', 'caso', 'progreso'].forEach(name => {
    B.vista(name, (main, args) => {
      original[name](main, args);
      if (name === 'repasar' || name.startsWith('simulador')) {
        main.insertAdjacentHTML('afterbegin', back('desafios', 'Desafíos'));
        if (name === 'repasar') main.querySelector('h1').textContent = { tarjetas: 'Tarjetas de memoria', test: 'Preguntas rápidas', emparejar: 'Conecta los conceptos' }[args[0]] || 'Tarjetas de memoria';
        B.eduar('esperando', name === 'repasar' ? 'Intenta responder antes de mirar la explicación. Puedes tomarte el tiempo que necesites.' : 'Cambia una cosa cada vez y observa qué ocurre. Después, explica el resultado con tus palabras.');
      } else if (name === 'caso') {
        const currentCase = B.POR_CASO[S().casos.caso];
        if (currentCase) main.insertAdjacentHTML('afterbegin', `<h1 class="case-title">Misión ${esc(currentCase.num)} · ${esc(currentCase.titulo)}</h1>`);
        main.querySelector('.miga a')?.setAttribute('href', '#libera');
        const mode = document.createElement('div'); mode.className = 'case-mode';
        mode.innerHTML = '<span>Cómo quieres trabajar</span><div class="modo" role="radiogroup" aria-label="Ayuda en esta misión"><button type="button" data-modo="guiado" role="radio">Con guía</button><button type="button" data-modo="practica" role="radio">Con autonomía</button></div>';
        main.prepend(mode); B.pintaModo();
      } else if (name === 'simulacro') {
        main.insertAdjacentHTML('afterbegin', back('libera', 'Libera el conocimiento'));
        B.eduar('esperando', 'Durante el simulacro trabaja por tu cuenta. Al terminar tendrás un diagnóstico para orientar tu repaso.');
      } else if (name === 'progreso') {
        main.querySelector('h1').textContent = 'Mi cuaderno de investigación';
        main.insertAdjacentHTML('beforeend', `<section class="tarjeta"><h2>Fechas y entregas del curso</h2><ul class="course-dates">${B.conf.cronograma.filter(w => w.reto).map(w => `<li><b>Semana ${w.sem}</b> · ${esc(w.reto)}</li>`).join('')}</ul></section>`);
        main.insertAdjacentHTML('beforeend', '<section class="tarjeta"><h2>Conserva tus avances</h2><p>El progreso se guarda en este navegador y dirección web. Exporta una copia antes de cambiar de dispositivo o de publicar una nueva dirección.</p><button type="button" class="boton sec" id="backup-export">Descargar copia de progreso</button><label class="backup-label">Restaurar copia <input type="file" id="backup-import" accept="application/json,.json"></label><p id="backup-status" role="status"></p></section>');
        setupBackup();
        B.eduar('esperando', 'Este es tu cuaderno: lecturas, práctica y misiones. Úsalo para elegir qué necesitas reforzar.');
      } else B.eduar('esperando', 'Consulta aquí los términos y las fichas que necesites.');
    });
  });
  function setupBackup() {
    $('#backup-export').addEventListener('click', () => {
      const blob = new Blob([JSON.stringify({ version: 1, app: 'brujula', progreso: S() }, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob), a = document.createElement('a'); a.href = url; a.download = 'brujula-progreso.json'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
    $('#backup-import').addEventListener('change', async e => {
      try {
        const f = e.target.files[0]; if (!f) return;
        if (f.size > 10000000) throw new Error('El archivo es demasiado grande.');
        const data = JSON.parse(await f.text());
        if (data.app !== 'brujula' || data.version !== 1 || !data.progreso || !data.progreso.casos || !Array.isArray(data.progreso.dias) || !data.progreso.parcial || !Array.isArray(data.progreso.parcial.intentos)) throw new Error('No es una copia de progreso válida de Brújula.');
        // Import only the known state schema; reject unsafe object keys and unexpected HTML.
        const raw = JSON.stringify(data.progreso);
        if (/"(?:__proto__|constructor|prototype)"\s*:/.test(raw)) throw new Error('La copia contiene claves no admitidas.');
        const state = data.progreso;
        for (const key of ['leido', 'sims', 'flash', 'test', 'empareja']) if (!state[key] || typeof state[key] !== 'object' || Array.isArray(state[key])) throw new Error('La copia está incompleta.');
        for (const key of ['estado', 'ruta', 'ver', 'fin', 'desbloq']) if (!state.casos[key] || typeof state.casos[key] !== 'object' || Array.isArray(state.casos[key])) throw new Error('La copia de misiones está incompleta.');
        if (!Array.isArray(state.casos.log)) throw new Error('Falta el historial de misiones.');
        for (const row of state.casos.log) { if (typeof row !== 'object' || !row) throw new Error('Historial no válido.'); if (row.fb) row.fb = esc(cleanText(row.fb)); }
        for (const caseState of Object.values(state.casos.estado)) { if (!caseState || typeof caseState !== 'object') throw new Error('Respuestas no válidas.'); for (const step of Object.values(caseState)) { if (!step || typeof step !== 'object') throw new Error('Respuesta no válida.'); if (step.fb) step.fb = esc(cleanText(step.fb)); } }
        B.modal('¿Restaurar el progreso?', '<p>La copia sustituirá los avances de este navegador. Descarga primero los actuales si quieres conservarlos.</p>', '<button class="boton gris" data-cerrar>Cancelar</button><button class="boton" id="backup-confirm">Restaurar</button>');
        $('#backup-confirm').addEventListener('click', () => { localStorage.setItem('brujula_mdi_v1', JSON.stringify(state)); location.reload(); });
      } catch (error) { $('#backup-status').textContent = error.message || 'No se ha podido leer la copia.'; }
    });
  }

  // Preserve legacy links and localStorage keys. The main navigation has three destinations.
  B.alias = { unidad: 'explora', unidades: 'explora', orientarse: 'explora', decide: 'desafios', repasar: 'desafios', simuladores: 'desafios', simulador: 'desafios', caso: 'libera', casos: 'libera', parcial: 'libera', simulacro: 'libera' };
  const render = B.render;
  B.render = () => {
    render();
    const parts = location.hash.replace(/^#/, '').split('/'), route = parts[0] || 'inicio';
    let section = B.alias[route] || route;
    if (route === 'orientarse' && parts[1] === 'brujula') section = 'desafios';
    if (route === 'unidad' && ['experimentar', 'repasar'].includes(parts[2])) section = 'desafios';
    if (route === 'unidad' && parts[2] === 'investigar') section = 'libera';
    document.body.dataset.section = section;
    $('.cuaderno-link').setAttribute('aria-current', route === 'progreso' ? 'page' : 'false');
    B.$$('.pestanas a').forEach(a => { const active = a.dataset.vista === section; a.classList.toggle('activa', active); if (active) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    if (!['inicio', 'progreso', 'consultar', 'creditos'].includes(route) && B.vistas[route]) { ui().ultimaRuta = location.hash.slice(1); B.guardar(); }
    document.title = `${$('#principal h1')?.innerText || 'Brújula'} · Brújula`;
    window.scrollTo(0, 0);
  };
})(window.Brujula);
