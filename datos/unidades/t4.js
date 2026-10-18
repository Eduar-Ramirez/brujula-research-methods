/* Unidad «Experimentos con grupos distintos». Estado: activa | en-preparacion | oculta (se puede cambiar también en datos/configuracion.js). */
Brujula.unidad({
 "orden": 3,
 "bloque": "Bloque II · Diseños experimentales",
 "tema": "Tema 4",
 "titulo": "Experimentos con grupos distintos",
 "icono": "🧪",
 "color": "#0047E8",
 "estado": "activa",
 "libro": "León y Montero, cap. 6",
 "resumen": "Cada condición la recibe un grupo distinto. Asignación aleatoria, bloqueo, placebo, doble ciego y grupos ya formados.",
 "secciones": [
  {
   "id": "aleatorios",
   "titulo": "Grupos Aleatorios",
   "sub": "Experimentos con grupos distintos · Cap. 6",
   "html": "<div class=\"callout info\"><strong>Definición:</strong> Los individuos son <strong>asignados al azar</strong> a cada condición de la VI. Distintos participantes en cada nivel. Las medidas son independientes (cada valor procede de un individuo distinto).</div>\n\n  <div class=\"diagram-box\">\n    <svg width=\"100%\" viewBox=\"0 0 640 140\">\n      <defs><marker id=\"arr\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\"><path d=\"M2 1L8 5L2 9\" fill=\"none\" stroke=\"context-stroke\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></marker></defs>\n      <rect x=\"20\" y=\"48\" width=\"110\" height=\"44\" rx=\"8\" fill=\"#ede9fb\" stroke=\"#5b4fcf\" stroke-width=\"1.2\"/>\n      <text x=\"75\" y=\"65\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"600\" fill=\"#3d2fa8\" font-family=\"Inter,sans-serif\">Muestra total</text>\n      <text x=\"75\" y=\"82\" text-anchor=\"middle\" font-size=\"10\" fill=\"#6b60c0\" font-family=\"Inter,sans-serif\">N participantes</text>\n      <line x1=\"130\" y1=\"70\" x2=\"180\" y2=\"70\" stroke=\"#5b4fcf\" stroke-width=\"1.2\" marker-end=\"url(#arr)\"/>\n      <rect x=\"184\" y=\"48\" width=\"100\" height=\"44\" rx=\"8\" fill=\"#f0efe9\" stroke=\"#a09e98\" stroke-width=\"1\"/>\n      <text x=\"234\" y=\"65\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"600\" fill=\"#3d3b36\" font-family=\"Inter,sans-serif\">Asignación</text>\n      <text x=\"234\" y=\"82\" text-anchor=\"middle\" font-size=\"10\" fill=\"#6b6860\" font-family=\"Inter,sans-serif\">aleatoria (R)</text>\n      <line x1=\"284\" y1=\"55\" x2=\"340\" y2=\"36\" stroke=\"#5b4fcf\" stroke-width=\"1.2\" marker-end=\"url(#arr)\"/>\n      <line x1=\"284\" y1=\"85\" x2=\"340\" y2=\"104\" stroke=\"#6b6860\" stroke-width=\"1.2\" marker-end=\"url(#arr)\"/>\n      <rect x=\"344\" y=\"18\" width=\"130\" height=\"36\" rx=\"8\" fill=\"#ede9fb\" stroke=\"#5b4fcf\" stroke-width=\"1.2\"/>\n      <text x=\"409\" y=\"32\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"600\" fill=\"#3d2fa8\" font-family=\"Inter,sans-serif\">Grupo experimental</text>\n      <text x=\"409\" y=\"47\" text-anchor=\"middle\" font-size=\"10\" fill=\"#6b60c0\" font-family=\"Inter,sans-serif\">Nivel 1 VI → VD</text>\n      <rect x=\"344\" y=\"88\" width=\"130\" height=\"36\" rx=\"8\" fill=\"#f0efe9\" stroke=\"#a09e98\" stroke-width=\"1\"/>\n      <text x=\"409\" y=\"102\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"600\" fill=\"#3d3b36\" font-family=\"Inter,sans-serif\">Grupo control</text>\n      <text x=\"409\" y=\"117\" text-anchor=\"middle\" font-size=\"10\" fill=\"#6b6860\" font-family=\"Inter,sans-serif\">Nivel 2 VI → VD</text>\n      <line x1=\"474\" y1=\"36\" x2=\"520\" y2=\"36\" stroke=\"#5b4fcf\" stroke-width=\"1\" marker-end=\"url(#arr)\"/>\n      <line x1=\"474\" y1=\"106\" x2=\"520\" y2=\"106\" stroke=\"#6b6860\" stroke-width=\"1\" marker-end=\"url(#arr)\"/>\n      <text x=\"530\" y=\"40\" font-size=\"10\" fill=\"#5b4fcf\" font-family=\"Inter,sans-serif\" font-weight=\"500\">Medida VD</text>\n      <text x=\"530\" y=\"110\" font-size=\"10\" fill=\"#6b6860\" font-family=\"Inter,sans-serif\">Medida VD</text>\n    </svg>\n  </div>\n\n  <div class=\"sec\">Conceptos clave</div>\n  <div class=\"card-grid\">\n    <div class=\"card accent-bar\" style=\"border-left-color:var(--t4)\">\n      <h3>🎲 Asignación aleatoria</h3>\n      <p>Procedimiento basado en el azar para dividir participantes en grupos. Controla las variables extrañas <strong>por equilibrado</strong>, distribuyendo sus efectos entre los grupos.</p>\n    </div>\n    <div class=\"card accent-bar\" style=\"border-left-color:var(--t5)\">\n      <h3>⚠️ ≠ Selección aleatoria</h3>\n      <ul>\n        <li><strong>Selección aleatoria</strong> (descriptivos): busca representatividad → validez externa.</li>\n        <li><strong>Asignación aleatoria</strong> (experimentos): controla VE → validez interna.</li>\n      </ul>\n    </div>\n    <div class=\"card accent-bar\" style=\"border-left-color:var(--t6)\">\n      <h3>🛡️ Control de variables extrañas</h3>\n      <ul>\n        <li><strong>Eliminación:</strong> dejar fuera, antes del experimento, a quien presenta un valor de la VE que puede afectar a la VD (p. ej., quien no ha dormido la noche anterior).</li>\n        <li><strong>Constancia:</strong> mismo nivel de la VE en todos.</li>\n        <li><strong>Equilibrado:</strong> asignación al azar.</li>\n      </ul>\n    </div>\n    <div class=\"card accent-bar\" style=\"border-left-color:var(--t7)\">\n      <h3>📖 Ejemplo (Loftus &amp; Burns, 1982)</h3>\n      <p>250 estudiantes asignados al azar a ver una película con o sin escena violenta → prueba de memoria. VI: choque emocional. VD: calidad del recuerdo. Resultado: el choque deteriora el recuerdo de sucesos previos.</p>\n    </div>\n  </div>"
  },
  {
   "id": "bloques",
   "titulo": "Grupos con Bloques",
   "sub": "Bloqueo y emparejamiento · Cap. 6",
   "html": "<div class=\"callout warn\"><strong>¿Cuándo?</strong> El bloqueo es más efectivo que el simple equilibrado cuando los grupos son <strong>pequeños (&lt;30)</strong>. Con grupos grandes el azar ya distribuye bien las VE.</div>\n\n  <div class=\"sec\">Procedimiento de bloqueo (3 pasos)</div>\n  <div class=\"step-row\">\n    <div class=\"step-box\" style=\"border-color:var(--t4);color:var(--t4);background:var(--t4bg)\">1. Medir y ordenar en la VE de bloqueo</div>\n    <span class=\"step-arr\">→</span>\n    <div class=\"step-box\" style=\"border-color:var(--t4);color:var(--t4);background:var(--t4bg)\">2. Formar bloques (valores similares)</div>\n    <span class=\"step-arr\">→</span>\n    <div class=\"step-box\" style=\"border-color:var(--t4);color:var(--t4);background:var(--t4bg)\">3. Asignar al azar dentro de cada bloque</div>\n  </div>\n\n  <div class=\"callout ok\"><strong>Variable bloqueada:</strong> Al aplicar bloqueo, la VE pasa a ser una <strong>variable bloqueada</strong>: ya no es extraña porque está controlada explícitamente.</div>\n\n  <div class=\"sec\">Ejemplo: Programa Matematik (N=12)</div>\n  <div class=\"diagram-box\">\n    <svg width=\"100%\" viewBox=\"0 0 560 165\">\n      <rect x=\"10\" y=\"10\" width=\"110\" height=\"145\" rx=\"8\" fill=\"#ede9fb\" stroke=\"#5b4fcf\" stroke-width=\"1\"/>\n      <text x=\"65\" y=\"28\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"600\" fill=\"#3d2fa8\" font-family=\"Inter,sans-serif\">Bloque ALTO</text>\n      <text x=\"65\" y=\"46\" text-anchor=\"middle\" font-size=\"10\" fill=\"#6b60c0\" font-family=\"Inter,sans-serif\">S1 (10), S5 (10)</text>\n      <text x=\"65\" y=\"62\" text-anchor=\"middle\" font-size=\"10\" fill=\"#6b60c0\" font-family=\"Inter,sans-serif\">S11 (9), S12 (10)</text>\n      <text x=\"65\" y=\"84\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"600\" fill=\"#3d2fa8\" font-family=\"Inter,sans-serif\">Bloque MEDIO</text>\n      <text x=\"65\" y=\"102\" text-anchor=\"middle\" font-size=\"10\" fill=\"#6b60c0\" font-family=\"Inter,sans-serif\">S2 (7), S4 (8)</text>\n      <text x=\"65\" y=\"118\" text-anchor=\"middle\" font-size=\"10\" fill=\"#6b60c0\" font-family=\"Inter,sans-serif\">S6 (7), S7 (7)</text>\n      <text x=\"65\" y=\"140\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"600\" fill=\"#3d2fa8\" font-family=\"Inter,sans-serif\">Bloque BAJO</text>\n\n      <line x1=\"120\" y1=\"35\" x2=\"170\" y2=\"35\" stroke=\"#5b4fcf\" stroke-width=\"1\" marker-end=\"url(#arr)\" stroke-dasharray=\"4 3\"/>\n      <line x1=\"120\" y1=\"100\" x2=\"170\" y2=\"100\" stroke=\"#5b4fcf\" stroke-width=\"1\" marker-end=\"url(#arr)\" stroke-dasharray=\"4 3\"/>\n      <text x=\"145\" y=\"24\" text-anchor=\"middle\" font-size=\"9\" fill=\"#5b4fcf\" font-family=\"Inter,sans-serif\">azar</text>\n      <text x=\"145\" y=\"89\" text-anchor=\"middle\" font-size=\"9\" fill=\"#5b4fcf\" font-family=\"Inter,sans-serif\">azar</text>\n\n      <rect x=\"174\" y=\"18\" width=\"80\" height=\"34\" rx=\"6\" fill=\"#ede9fb\" stroke=\"#5b4fcf\" stroke-width=\"1\"/>\n      <text x=\"214\" y=\"33\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"600\" fill=\"#3d2fa8\" font-family=\"Inter,sans-serif\">2 EXP</text>\n      <text x=\"214\" y=\"46\" text-anchor=\"middle\" font-size=\"9\" fill=\"#6b60c0\" font-family=\"Inter,sans-serif\">(programa)</text>\n      <rect x=\"174\" y=\"56\" width=\"80\" height=\"34\" rx=\"6\" fill=\"#f0efe9\" stroke=\"#a09e98\" stroke-width=\"1\"/>\n      <text x=\"214\" y=\"71\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"600\" fill=\"#3d3b36\" font-family=\"Inter,sans-serif\">2 CTRL</text>\n      <text x=\"214\" y=\"84\" text-anchor=\"middle\" font-size=\"9\" fill=\"#6b6860\" font-family=\"Inter,sans-serif\">(sin programa)</text>\n\n      <rect x=\"174\" y=\"84\" width=\"80\" height=\"34\" rx=\"6\" fill=\"#ede9fb\" stroke=\"#5b4fcf\" stroke-width=\"1\"/>\n      <text x=\"214\" y=\"99\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"600\" fill=\"#3d2fa8\" font-family=\"Inter,sans-serif\">2 EXP</text>\n      <rect x=\"174\" y=\"122\" width=\"80\" height=\"34\" rx=\"6\" fill=\"#f0efe9\" stroke=\"#a09e98\" stroke-width=\"1\"/>\n      <text x=\"214\" y=\"137\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"600\" fill=\"#3d3b36\" font-family=\"Inter,sans-serif\">2 CTRL</text>\n\n      <text x=\"310\" y=\"50\" text-anchor=\"middle\" font-size=\"11\" fill=\"#1a7a5e\" font-weight=\"500\" font-family=\"Inter,sans-serif\">✓ Cada grupo tiene</text>\n      <text x=\"310\" y=\"68\" text-anchor=\"middle\" font-size=\"11\" fill=\"#1a7a5e\" font-weight=\"500\" font-family=\"Inter,sans-serif\">sujetos de todos</text>\n      <text x=\"310\" y=\"86\" text-anchor=\"middle\" font-size=\"11\" fill=\"#1a7a5e\" font-weight=\"500\" font-family=\"Inter,sans-serif\">los niveles de la VE</text>\n    </svg>\n  </div>"
  },
  {
   "id": "especiales",
   "titulo": "Casos Especiales",
   "sub": "Placebo, doble ciego y grupos ya formados · Cap. 6",
   "html": "<div class=\"card-grid\">\n    <div class=\"card accent-bar\" style=\"border-left-color:var(--t7)\">\n      <h3>💊 Efecto placebo</h3>\n      <p>Efecto producido por las <strong>expectativas</strong> del participante, no por la VI. Contamina la medida de la VD: no sabemos qué parte del efecto se debe a la VI y cuál a las expectativas.</p>\n    </div>\n    <div class=\"card accent-bar\" style=\"border-left-color:var(--t5)\">\n      <h3>🙈 Diseño ciego</h3>\n      <p>Los participantes <strong>no saben</strong> si están en la condición experimental o de placebo. Controla las expectativas del sujeto.</p>\n    </div>\n    <div class=\"card accent-bar\" style=\"border-left-color:var(--t4)\">\n      <h3>🙈🙈 Diseño doble ciego</h3>\n      <p>Ni el participante <strong>ni quien administra</strong> el tratamiento conocen la condición de cada sujeto. Elimina además el sesgo del experimentador al registrar la VD.</p>\n    </div>\n    <div class=\"card accent-bar\" style=\"border-left-color:var(--t6)\">\n      <h3>🏫 Grupos ya formados</h3>\n      <p>Cuando no es posible asignar individualmente (ej. aulas), se asignan <strong>grupos enteros al azar</strong> a las condiciones. Frecuente en contextos educativos. Reduce la validez interna respecto al diseño puro.</p>\n    </div>\n  </div>\n\n  <div class=\"callout\"><strong>Estadísticos:</strong> t de Student (2 grupos) o ANOVA de un factor (más de 2 niveles de la VI).</div>"
  }
 ],
 "flash": [
  {
   "t": "Asignación aleatoria",
   "d": "Procedimiento basado en el azar para dividir participantes en los grupos de un experimento. Controla por equilibrado las variables extrañas."
  },
  {
   "t": "Selección aleatoria",
   "d": "Procedimiento para seleccionar la muestra de la población. Su objetivo es representatividad y validez externa, NO el control de variables extrañas."
  },
  {
   "t": "Control por constancia",
   "d": "Forma de controlar una VE haciendo que tenga el mismo nivel en todos los participantes del experimento."
  },
  {
   "t": "Control por equilibrado",
   "d": "Forma de controlar una VE haciendo que sus distintos valores aparezcan de forma parecida, mediante el azar, en cada uno de los grupos."
  },
  {
   "t": "Diseño de grupos aleatorios",
   "d": "Diseño donde los individuos son asignados al azar a cada condición de la VI. Grupos distintos por condición. Medidas independientes."
  },
  {
   "t": "Bloqueo",
   "d": "Técnica de control que forma grupos en una variable extraña relacionada con la VD. Se asigna al azar dentro de cada bloque. La VE pasa a ser variable bloqueada."
  },
  {
   "t": "Efecto placebo",
   "d": "Efecto producido por las expectativas del participante, no por las propiedades reales del tratamiento. Fuente de contaminación de la VD."
  },
  {
   "t": "Diseño doble ciego",
   "d": "Ni el participante ni quien administra el tratamiento saben a qué condición pertenece cada sujeto. Elimina sesgos de expectativa de ambas partes."
  },
  {
   "t": "Grupos ya formados",
   "d": "Cuando no es posible asignar individualmente a las condiciones, se asignan grupos enteros al azar. Frecuente en contextos educativos."
  },
  {
   "t": "¿Cuál es el diseño más adecuado para evaluar una intervención en grupos ya formados en colegios?",
   "d": "<strong>Depende de cómo se asignen.</strong> Si se sortean grupos enteros (aulas) entre las condiciones, es el caso de <strong>grupos ya formados</strong> del diseño de grupos aleatorios (Tema 4). Si no hay ningún sorteo (p. ej., el centro decide qué aula recibe el programa), es un <strong>diseño cuasiexperimental</strong> con pretest, postest y grupo de comparación no equivalente."
  }
 ],
 "test": [
  {
   "q": "¿Cuál es el objetivo principal de la asignación aleatoria en los experimentos?",
   "o": [
    "Representar a la población",
    "Controlar variables extrañas por equilibrado",
    "Seleccionar una muestra aleatoria",
    "Aumentar la validez externa"
   ],
   "a": 1,
   "fb": "La asignación aleatoria controla las VE por equilibrado. No busca representar a la población (eso es la selección aleatoria)."
  },
  {
   "q": "El efecto placebo amenaza la validez interna porque…",
   "o": [
    "Aumenta la muestra necesaria",
    "Impide generalizar resultados",
    "Contamina la VD con el efecto de las expectativas",
    "Solo afecta estudios con animales"
   ],
   "a": 2,
   "fb": "El efecto placebo hace que parte de la mejoría se deba a expectativas, no a la VI."
  },
  {
   "q": "¿Cuándo es más efectiva la técnica de bloqueo frente al equilibrado simple?",
   "o": [
    "Con grupos grandes (>100)",
    "Cuando la VI tiene muchos niveles",
    "Con grupos pequeños (<30)",
    "Siempre es igual de efectiva"
   ],
   "a": 2,
   "fb": "Con grupos grandes el azar ya distribuye bien las VE. Con grupos pequeños el bloqueo ofrece mayor garantía."
  },
  {
   "q": "En el diseño doble ciego, ¿quiénes desconocen la condición del participante?",
   "o": [
    "Solo los participantes",
    "Solo quien analiza los datos",
    "Tanto el participante como quien administra el tratamiento",
    "Solo el director del estudio"
   ],
   "a": 2,
   "fb": "El doble ciego protege frente al sesgo del experimentador y frente a las expectativas del participante."
  }
 ],
 "glosario": [
  {
   "es": "Aleatorización",
   "en": "Randomization",
   "def": "Asignación al azar de los participantes a las condiciones. Controla por equilibrado las variables extrañas: hace probable (no seguro, sobre todo con grupos pequeños) que los grupos sean equivalentes; con N pequeño conviene el bloqueo."
  }
 ],
 "emparejar": [
  {
   "label": "Set 1 · Diseños T4",
   "pairs": [
    {
     "left": "250 estudiantes asignados al azar a ver una película violenta o neutra → prueba de memoria",
     "right": "Grupos aleatorios",
     "exp": "Loftus & Burns (1982): asignación aleatoria de los participantes a las dos condiciones de la VI (choque/no choque)."
    },
    {
     "left": "Se ordena a los alumnos por rendimiento previo en matemáticas y se asignan al azar dentro de cada trío",
     "right": "Grupos con bloques",
     "exp": "El bloqueo controla el rendimiento previo y luego se asigna al azar dentro de cada bloque."
    },
    {
     "left": "Ni el médico que inyecta ni el paciente saben si reciben el fármaco activo o la solución salina",
     "right": "Doble ciego",
     "exp": "El doble ciego elimina el sesgo del experimentador y el efecto placebo del participante."
    },
    {
     "left": "Se asignan aulas enteras al azar al programa de lectura o a la condición control",
     "right": "Grupos ya formados",
     "exp": "No es posible asignar individualmente, así que se asignan grupos naturales (aulas) al azar."
    }
   ]
  }
 ],
 "simuladores": [
  "dos-grupos"
 ],
 "id": "t4"
});
