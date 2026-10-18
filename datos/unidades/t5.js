/* Unidad «Experimentos con el mismo grupo». Estado: activa | en-preparacion | oculta (se puede cambiar también en datos/configuracion.js). */
Brujula.unidad({
 "orden": 4,
 "bloque": "Bloque II · Diseños experimentales",
 "tema": "Tema 5",
 "titulo": "Experimentos con el mismo grupo",
 "icono": "🔁",
 "color": "#C2410C",
 "estado": "activa",
 "libro": "León y Montero, cap. 7",
 "resumen": "Las mismas personas pasan por todas las condiciones. Ventajas, efecto de la práctica, técnicas de control del orden y persistencia diferencial.",
 "secciones": [
  {
   "id": "medidas-repetidas",
   "titulo": "Medidas Repetidas",
   "sub": "Diseños intrasujeto · Cap. 7",
   "html": "<div class=\"callout warn\"><strong>Definición:</strong> El <strong>mismo grupo</strong> recibe todos los niveles de la VI. La VI se aplica intra-grupo. Cada sujeto proporciona puntuaciones en todas las condiciones.</div>\n\n  <div class=\"diagram-box\">\n    <svg width=\"100%\" viewBox=\"0 0 560 90\">\n      <rect x=\"10\" y=\"23\" width=\"100\" height=\"44\" rx=\"8\" fill=\"#fdf0e7\" stroke=\"#c2602a\" stroke-width=\"1.2\"/>\n      <text x=\"60\" y=\"41\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"600\" fill=\"#8a3a14\" font-family=\"Inter,sans-serif\">Grupo único</text>\n      <text x=\"60\" y=\"58\" text-anchor=\"middle\" font-size=\"10\" fill=\"#c2602a\" font-family=\"Inter,sans-serif\">N participantes</text>\n      <line x1=\"110\" y1=\"45\" x2=\"148\" y2=\"45\" stroke=\"#c2602a\" stroke-width=\"1.2\" marker-end=\"url(#arr)\"/>\n      <rect x=\"152\" y=\"23\" width=\"88\" height=\"44\" rx=\"8\" fill=\"#fdf0e7\" stroke=\"#c2602a\" stroke-width=\"1\"/>\n      <text x=\"196\" y=\"43\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"600\" fill=\"#8a3a14\" font-family=\"Inter,sans-serif\">Condición A</text>\n      <text x=\"196\" y=\"58\" text-anchor=\"middle\" font-size=\"9\" fill=\"#c2602a\" font-family=\"Inter,sans-serif\">Medida VD</text>\n      <line x1=\"240\" y1=\"45\" x2=\"268\" y2=\"45\" stroke=\"#c2602a\" stroke-width=\"1.2\" marker-end=\"url(#arr)\"/>\n      <rect x=\"272\" y=\"23\" width=\"88\" height=\"44\" rx=\"8\" fill=\"#fdf0e7\" stroke=\"#c2602a\" stroke-width=\"1\"/>\n      <text x=\"316\" y=\"43\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"600\" fill=\"#8a3a14\" font-family=\"Inter,sans-serif\">Condición B</text>\n      <text x=\"316\" y=\"58\" text-anchor=\"middle\" font-size=\"9\" fill=\"#c2602a\" font-family=\"Inter,sans-serif\">Medida VD</text>\n      <line x1=\"360\" y1=\"45\" x2=\"388\" y2=\"45\" stroke=\"#c2602a\" stroke-width=\"1.2\" marker-end=\"url(#arr)\"/>\n      <rect x=\"392\" y=\"23\" width=\"88\" height=\"44\" rx=\"8\" fill=\"#fdf0e7\" stroke=\"#c2602a\" stroke-width=\"1\"/>\n      <text x=\"436\" y=\"43\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"600\" fill=\"#8a3a14\" font-family=\"Inter,sans-serif\">Condición C</text>\n      <text x=\"436\" y=\"58\" text-anchor=\"middle\" font-size=\"9\" fill=\"#c2602a\" font-family=\"Inter,sans-serif\">Medida VD</text>\n      <text x=\"510\" y=\"48\" font-size=\"18\" fill=\"#c2602a\" font-family=\"Inter,sans-serif\">…</text>\n    </svg>\n  </div>\n\n  <div class=\"card-grid\">\n    <div class=\"card accent-bar\" style=\"border-left-color:var(--t6)\">\n      <h3>✅ Ventajas</h3>\n      <ul>\n        <li>Necesita <strong>menos participantes</strong>.</li>\n        <li>Cada sujeto es su <strong>propio control</strong>: se eliminan las diferencias individuales.</li>\n        <li>Mayor <strong>potencia estadística</strong>.</li>\n      </ul>\n    </div>\n    <div class=\"card accent-bar\" style=\"border-left-color:var(--t7)\">\n      <h3>⚠️ Efectos distorsionantes</h3>\n      <ul>\n        <li><strong>Aprendizaje:</strong> la práctica mejora el rendimiento.</li>\n        <li><strong>Fatiga:</strong> la repetición lo reduce.</li>\n        <li><strong>Motivación:</strong> el interés varía entre condiciones.</li>\n        <li><strong>Práctica / Orden:</strong> suma de los anteriores; asociado al orden de presentación.</li>\n      </ul>\n    </div>\n  </div>\n\n  <div class=\"callout warn\"><strong>Ejemplo (Craik &amp; Tulving):</strong> Un solo grupo recibió 3 niveles de procesamiento (gráfico → fonético → semántico). VD: porcentaje de palabras recordadas. El procesamiento semántico produjo mayor recuerdo que el fonético, y éste mayor que el gráfico.</div>"
  },
  {
   "id": "control-orden",
   "titulo": "Control del Orden",
   "sub": "Técnicas para manejar el efecto de la práctica · Cap. 7",
   "html": "<div class=\"card-grid\">\n    <div class=\"card accent-bar\" style=\"border-left-color:var(--t5)\">\n      <h3>🔀 Aleatorización simple</h3>\n      <p>Asignar aleatoriamente el orden de presentación de los niveles para cada sujeto. Básico; puede no distribuir uniformemente el efecto.</p>\n    </div>\n    <div class=\"card accent-bar\" style=\"border-left-color:var(--t5)\">\n      <h3>📦 Aleatorización por bloques</h3>\n      <p>Un <em>bloque</em> = secuencia completa de todos los niveles en orden aleatorio. Se preparan tantos bloques como repeticiones se deseen. El efecto de la práctica queda distribuido homogéneamente.</p>\n    </div>\n    <div class=\"card accent-bar\" style=\"border-left-color:var(--t4)\">\n      <h3>↩️ Reequilibrado completo (ABBA)</h3>\n      <p>Cada sujeto recibe los tratamientos en <strong>todos los órdenes posibles</strong>. Con 2 condiciones: presentación ABBA (4 tareas). El efecto de un orden se anula al invertirse.</p>\n    </div>\n    <div class=\"card accent-bar\" style=\"border-left-color:var(--t4)\">\n      <h3>↪️ Reequilibrado incompleto (AB/BA)</h3>\n      <p>Mitad del grupo: orden AB. Otra mitad: orden BA. Solo 2 tareas por sujeto. Mismo control, menos esfuerzo. Ejemplo: Rasinski (1990) — métodos de lectura.</p>\n    </div>\n    <div class=\"card accent-bar\" style=\"border-left-color:var(--t6)\">\n      <h3>🔳 Cuadrado latino</h3>\n      <p>Para <strong>&ge;3 condiciones</strong>. Se eligen tantas secuencias como niveles, cumpliendo que ningún nivel aparezca dos veces en la misma posición. Económico frente al reequilibrado completo.</p>\n    </div>\n    <div class=\"card accent-bar\" style=\"border-left-color:var(--t7)\">\n      <h3>🚨 Persistencia diferencial</h3>\n      <p>El efecto de un nivel <strong>contamina asimétricamente</strong> el siguiente según el orden. Cuando existe este riesgo: usar diseño con grupos independientes.</p>\n    </div>\n  </div>\n\n  <div class=\"sec\">Cuadrado latino: ejemplo con 3 niveles (A, B, C)</div>\n  <div class=\"diagram-box\">\n    <svg width=\"100%\" viewBox=\"0 0 440 120\">\n      <text x=\"20\" y=\"22\" font-size=\"11\" font-weight=\"600\" fill=\"#1a7a5e\" font-family=\"Inter,sans-serif\">Secuencia</text>\n      <text x=\"140\" y=\"22\" font-size=\"11\" font-weight=\"600\" fill=\"#1a7a5e\" font-family=\"Inter,sans-serif\">1ª posición</text>\n      <text x=\"250\" y=\"22\" font-size=\"11\" font-weight=\"600\" fill=\"#1a7a5e\" font-family=\"Inter,sans-serif\">2ª posición</text>\n      <text x=\"360\" y=\"22\" font-size=\"11\" font-weight=\"600\" fill=\"#1a7a5e\" font-family=\"Inter,sans-serif\">3ª posición</text>\n      <line x1=\"10\" y1=\"28\" x2=\"430\" y2=\"28\" stroke=\"#e2e0d8\" stroke-width=\"1\"/>\n      <text x=\"30\" y=\"52\" font-size=\"11\" fill=\"#6b6860\" font-family=\"Inter,sans-serif\">Secuencia 1</text>\n      <rect x=\"128\" y=\"38\" width=\"60\" height=\"24\" rx=\"5\" fill=\"#ede9fb\" stroke=\"#5b4fcf\" stroke-width=\"1\"/>\n      <text x=\"158\" y=\"53\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"600\" fill=\"#3d2fa8\" font-family=\"Inter,sans-serif\">B</text>\n      <rect x=\"238\" y=\"38\" width=\"60\" height=\"24\" rx=\"5\" fill=\"#fdf0e7\" stroke=\"#c2602a\" stroke-width=\"1\"/>\n      <text x=\"268\" y=\"53\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"600\" fill=\"#8a3a14\" font-family=\"Inter,sans-serif\">C</text>\n      <rect x=\"348\" y=\"38\" width=\"60\" height=\"24\" rx=\"5\" fill=\"#e6f5ef\" stroke=\"#1a7a5e\" stroke-width=\"1\"/>\n      <text x=\"378\" y=\"53\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"600\" fill=\"#0e4d38\" font-family=\"Inter,sans-serif\">A</text>\n      <text x=\"30\" y=\"85\" font-size=\"11\" fill=\"#6b6860\" font-family=\"Inter,sans-serif\">Secuencia 2</text>\n      <rect x=\"128\" y=\"70\" width=\"60\" height=\"24\" rx=\"5\" fill=\"#fdf0e7\" stroke=\"#c2602a\" stroke-width=\"1\"/>\n      <text x=\"158\" y=\"85\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"600\" fill=\"#8a3a14\" font-family=\"Inter,sans-serif\">C</text>\n      <rect x=\"238\" y=\"70\" width=\"60\" height=\"24\" rx=\"5\" fill=\"#e6f5ef\" stroke=\"#1a7a5e\" stroke-width=\"1\"/>\n      <text x=\"268\" y=\"85\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"600\" fill=\"#0e4d38\" font-family=\"Inter,sans-serif\">A</text>\n      <rect x=\"348\" y=\"70\" width=\"60\" height=\"24\" rx=\"5\" fill=\"#ede9fb\" stroke=\"#5b4fcf\" stroke-width=\"1\"/>\n      <text x=\"378\" y=\"85\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"600\" fill=\"#3d2fa8\" font-family=\"Inter,sans-serif\">B</text>\n      <text x=\"30\" y=\"118\" font-size=\"11\" fill=\"#6b6860\" font-family=\"Inter,sans-serif\">Secuencia 3</text>\n      <rect x=\"128\" y=\"102\" width=\"60\" height=\"24\" rx=\"5\" fill=\"#e6f5ef\" stroke=\"#1a7a5e\" stroke-width=\"1\"/>\n      <text x=\"158\" y=\"117\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"600\" fill=\"#0e4d38\" font-family=\"Inter,sans-serif\">A</text>\n      <rect x=\"238\" y=\"102\" width=\"60\" height=\"24\" rx=\"5\" fill=\"#ede9fb\" stroke=\"#5b4fcf\" stroke-width=\"1\"/>\n      <text x=\"268\" y=\"117\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"600\" fill=\"#3d2fa8\" font-family=\"Inter,sans-serif\">B</text>\n      <rect x=\"348\" y=\"102\" width=\"60\" height=\"24\" rx=\"5\" fill=\"#fdf0e7\" stroke=\"#c2602a\" stroke-width=\"1\"/>\n      <text x=\"378\" y=\"117\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"600\" fill=\"#8a3a14\" font-family=\"Inter,sans-serif\">C</text>\n    </svg>\n  </div>\n  <div class=\"callout ok\">Cada letra aparece <strong>exactamente una vez</strong> en cada posición → el efecto de la práctica se distribuye uniformemente entre las condiciones.</div>"
  },
  {
   "id": "cuando",
   "titulo": "¿Cuándo usarlos?",
   "sub": "Criterios de uso óptimo · Cap. 7",
   "html": "<div class=\"card-grid\">\n    <div class=\"card accent-bar\" style=\"border-left-color:var(--t7)\"><h3>🚫 Imposible cuando…</h3><ul><li>La VI es una variable de <strong>grupo natural</strong> (género, edad, personalidad): no se puede revertir el valor.</li><li>La aplicación de un nivel crea una situación <strong>irreversible</strong> (ej. lesión cerebral en animales).</li></ul></div>\n    <div class=\"card accent-bar\" style=\"border-left-color:var(--t5)\"><h3>⚠️ No recomendable cuando…</h3><ul><li>El tratamiento dura <strong>mucho tiempo</strong>: el reequilibrado requeriría multiplicar ese período.</li><li>Hay riesgo de <strong>persistencia diferencial</strong>: las instrucciones de una condición contaminan la siguiente asimétricamente.</li></ul></div>\n    <div class=\"card accent-bar\" style=\"border-left-color:var(--t6)\"><h3>✅ Recomendable cuando…</h3><ul><li>La muestra disponible es <strong>pequeña</strong>.</li><li>Las diferencias individuales son grandes y se quiere eliminar su influencia.</li><li>El efecto de práctica es controlable y no hay persistencia diferencial.</li></ul></div>\n    <div class=\"card\"><h3>📊 Estadísticos</h3><p>2 condiciones: t de Student para muestras relacionadas. 3 o más: ANOVA de medidas repetidas (esfericidad con la prueba de Mauchly; si no se cumple, corrección de Greenhouse-Geisser; post hoc con Bonferroni).</p></div>\n  </div>"
  }
 ],
 "flash": [
  {
   "t": "Medidas repetidas / Intrasujeto",
   "d": "Diseño donde el mismo grupo recibe todos los niveles de la VI. Necesita menos sujetos pero genera efectos de práctica."
  },
  {
   "t": "Efecto de la práctica",
   "d": "Variable distorsionante en diseños intrasujeto. Suma de efectos de aprendizaje, fatiga y motivación, asociada al orden de presentación de los niveles."
  },
  {
   "t": "Reequilibrado completo (ABBA)",
   "d": "Técnica de control donde cada sujeto recibe los tratamientos en todos los órdenes posibles, incluyendo la inversión. Ejemplo: ABBA con 2 condiciones."
  },
  {
   "t": "Reequilibrado incompleto",
   "d": "Mitad del grupo recibe el orden AB y la otra mitad BA. Economiza esfuerzo consiguiendo el mismo control que el reequilibrado completo."
  },
  {
   "t": "Cuadrado latino",
   "d": "Para ≥3 condiciones. Se seleccionan secuencias de presentación donde cada nivel aparece solo una vez en cada posición del orden."
  },
  {
   "t": "Persistencia diferencial",
   "d": "El efecto de un nivel contamina el siguiente de forma asimétrica según el orden. Cuando existe, se recomienda usar diseños con grupos independientes."
  },
  {
   "t": "¿Cuál es la diferencia principal entre un diseño entre grupos y un diseño intrasujeto?",
   "d": "En el <strong>diseño entre grupos</strong> cada participante pertenece a una sola condición. En el <strong>diseño intrasujeto</strong> el mismo participante pasa por todas, actuando como su propio control."
  },
  {
   "t": "¿Para qué sirve el reequilibrado (contrabalanceo) en un diseño intrasujeto?",
   "d": "Para controlar el <strong>efecto de la práctica</strong> (mezcla de aprendizaje, fatiga y motivación ligada a la posición): se hace que cada nivel ocupe en promedio la misma posición. Con 2 niveles, <strong>reequilibrado</strong> (completo ABBA o incompleto AB/BA); con 3 o más, <strong>cuadrado latino</strong>. No corrige la <strong>persistencia diferencial</strong>: si se sospecha, mejor grupos distintos."
  }
 ],
 "test": [
  {
   "q": "¿Cuál es la principal ventaja de los diseños intrasujeto respecto a los de grupos distintos?",
   "o": [
    "Mayor generalización",
    "Menos participantes y se eliminan las diferencias individuales",
    "Son más simples de implementar",
    "No presentan efectos distorsionantes"
   ],
   "a": 1,
   "fb": "Al pasar todos los sujetos por todas las condiciones se eliminan las diferencias individuales y se necesita menos gente."
  },
  {
   "q": "El efecto de la práctica en los diseños intrasujeto es una mezcla de…",
   "o": [
    "VI y VD",
    "Aprendizaje, fatiga y motivación",
    "Bloqueo y aleatorización",
    "Validez interna y externa"
   ],
   "a": 1,
   "fb": "León y Montero definen el efecto de la práctica como la suma del aprendizaje, la fatiga y la motivación no controlados."
  },
  {
   "q": "¿En cuál de estos casos NO se puede usar un diseño intrasujeto?",
   "o": [
    "La VD es el tiempo de reacción",
    "La VI es el género de los participantes",
    "Hay tres niveles en la VI",
    "La muestra es pequeña"
   ],
   "a": 1,
   "fb": "El género es una variable de grupo natural: no se puede asignar a los sujetos a distintos géneros ni revertir su valor."
  },
  {
   "q": "¿Qué condición debe cumplir un cuadrado latino?",
   "o": [
    "Todos los niveles aparecen el mismo número de veces en total",
    "Cada nivel aparece solo una vez en cada posición",
    "Los participantes se asignan al azar a cada nivel",
    "La VD se mide antes y después de cada nivel"
   ],
   "a": 1,
   "fb": "El cuadrado latino garantiza que ningún nivel se repita en la misma posición, distribuyendo el efecto de la práctica sistemáticamente."
  },
  {
   "q": "La persistencia diferencial se produce cuando…",
   "o": [
    "El efecto de la práctica es igual en todos los órdenes",
    "Las instrucciones de una condición impiden realizar naturalmente la siguiente",
    "El experimentador no contrabalancea los niveles",
    "El sujeto olvida las instrucciones"
   ],
   "a": 1,
   "fb": "La persistencia diferencial ocurre cuando el efecto residual del primer nivel contamina el segundo asimétricamente."
  },
  {
   "q": "¿Cuál de las siguientes es una técnica de control del orden propia de los diseños con el mismo grupo (medidas repetidas)?",
   "o": [
    "Grupos aleatorios con bloques",
    "Cuadrado latino",
    "Diseño con grupos ya formados",
    "Línea base múltiple con varios individuos"
   ],
   "a": 1,
   "fb": "El cuadrado latino es una técnica de control del efecto de la práctica aplicada en diseños intrasujeto."
  },
  {
   "q": "En un experimento con reequilibrado incompleto con condiciones A y B, ¿cómo se organiza la presentación?",
   "o": [
    "ABBA para todos",
    "AB para la mitad, BA para la otra mitad",
    "Al azar para cada sujeto",
    "Siempre A antes que B"
   ],
   "a": 1,
   "fb": "El reequilibrado incompleto asigna AB a una mitad y BA a la otra, consiguiendo el mismo control con solo 2 tareas por sujeto."
  },
  {
   "q": "¿Qué ventaja principal tiene el diseño intrasujeto sobre el diseño entre grupos?",
   "o": [
    "Mayor validez externa",
    "Control de las diferencias individuales entre participantes",
    "Elimina los efectos de orden",
    "Mayor generalización"
   ],
   "a": 1,
   "fb": "Al ser el mismo sujeto en todas las condiciones, las diferencias individuales quedan controladas automáticamente. Por eso el diseño intrasujeto tiene mayor potencia estadística con el mismo N."
  },
  {
   "q": "¿Qué es el efecto de arrastre (carry-over) en un diseño intrasujeto?",
   "o": [
    "El efecto del orden de presentación",
    "La influencia de una condición anterior sobre el rendimiento en la siguiente",
    "La mejora general por práctica repetida",
    "La fatiga acumulada"
   ],
   "a": 1,
   "fb": "El efecto de arrastre ocurre cuando los efectos de una condición \"se arrastran\" afectando al rendimiento en condiciones posteriores. Por eso el diseño intrasujeto no siempre es viable."
  }
 ],
 "glosario": [
  {
   "es": "Diseño entre sujetos",
   "en": "Between-subjects design",
   "def": "Cada participante pertenece a una sola condición experimental."
  },
  {
   "es": "Diseño intrasujeto",
   "en": "Within-subjects design",
   "def": "El mismo participante pasa por todas las condiciones."
  },
  {
   "es": "Reequilibrado (contrabalanceo)",
   "en": "Counterbalancing",
   "def": "Técnica de control del efecto de la práctica: presentar la secuencia de niveles y repetirla en orden inverso. Completo: ABBA dentro de cada persona. Incompleto: AB a una mitad de la muestra y BA a la otra."
  },
  {
   "es": "Efecto de arrastre",
   "en": "Carry-over effect",
   "def": "Influencia que una condición tiene sobre el rendimiento en condiciones posteriores. Cuando esa huella es distinta según el orden, se llama persistencia diferencial (término del curso): el reequilibrado no la corrige y conviene usar grupos distintos."
  },
  {
   "es": "Efecto de orden",
   "en": "Order effect",
   "def": "Cambio en el rendimiento producido por el orden en que se presentan las condiciones."
  },
  {
   "es": "Cuadrado latino",
   "en": "Latin square",
   "def": "Diseño de contrabalanceo donde cada condición aparece igual número de veces en cada posición."
  }
 ],
 "emparejar": [
  {
   "label": "Set 2 · Diseños T5",
   "pairs": [
    {
     "left": "Cada sujeto recibe los tres tipos de procesamiento: gráfico, fonético y semántico",
     "right": "Medidas repetidas",
     "exp": "Craik & Tulving: el mismo grupo pasa por todos los niveles de la VI (niveles de procesamiento)."
    },
    {
     "left": "Primero lectura repetida, luego \"escuchar mientras se lee\"; a la otra mitad, al revés",
     "right": "Reequilibrado incompleto",
     "exp": "Rasinski (1990): AB a la mitad y BA a la otra mitad. Control del efecto de la práctica con solo 2 tareas."
    },
    {
     "left": "30 sujetos conducen sin alcohol, con 0,4 g/l y con 0,8 g/l; se forman 3 secuencias en las que cada nivel ocupa una sola vez cada posición y se asignan al azar 10 sujetos a cada secuencia",
     "right": "Cuadrado latino",
     "exp": "Con 3 condiciones se usa cuadrado latino para que ninguna condición aparezca dos veces en la misma posición."
    },
    {
     "left": "Los efectos de \"aprendizaje intencional\" persisten cuando se intenta hacer \"aprendizaje incidental\" → se usa diseño inter-grupos",
     "right": "Persistencia diferencial",
     "exp": "El efecto residual del primer nivel contamina el segundo asimétricamente, así que se recomiendan grupos independientes."
    }
   ]
  }
 ],
 "simuladores": [
  "mismo-grupo"
 ],
 "id": "t5"
});
