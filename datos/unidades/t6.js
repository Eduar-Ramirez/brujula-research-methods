/* Unidad «Diseños factoriales». Estado: activa | en-preparacion | oculta (se puede cambiar también en datos/configuracion.js). */
Brujula.unidad({
 "orden": 5,
 "bloque": "Bloque II · Diseños experimentales",
 "tema": "Tema 6",
 "titulo": "Diseños factoriales",
 "icono": "🔲",
 "color": "#0A8F7B",
 "estado": "activa",
 "libro": "León y Montero, cap. 8",
 "resumen": "Dos o más VI cruzadas. Notación, efectos principales y simples, interacción ordinal o cruzada y ANOVA factorial y mixto.",
 "secciones": [
  {
   "id": "factoriales",
   "titulo": "Diseños Factoriales",
   "sub": "Varias VIs combinadas simultáneamente · Cap. 8",
   "html": "<div class=\"callout ok\"><strong>Definición:</strong> Diseño en el que se estudian <strong>dos o más VIs simultáneamente</strong>, cuyos niveles se combinan. Si se combinan todos los niveles de todas las VIs → factorial <em>completo</em>.</div>\n\n  <div class=\"card-grid\">\n    <div class=\"card\"><h3>🔢 Notación</h3><ul><li><strong>2×2</strong> → 2 VIs, cada una con 2 niveles (4 celdas)</li><li><strong>3×4</strong> → 12 celdas</li><li><strong>3×2×5</strong> → 3 VIs, 30 celdas</li></ul></div>\n    <div class=\"card\"><h3>💡 ¿Por qué usarlos?</h3><ul><li>Permiten estudiar <strong>interacciones</strong> entre VIs.</li><li>Más eficientes: más información con los mismos participantes.</li><li>Detectan efectos que no aparecerían en experimentos simples.</li></ul></div>\n  </div>\n\n  <div class=\"sec\">Ejemplo: Desorden Afectivo Estacional (DAE) — diseño 2×2</div>\n  <div class=\"diagram-box\">\n    <svg width=\"100%\" viewBox=\"0 0 500 160\">\n      <rect x=\"120\" y=\"10\" width=\"160\" height=\"28\" rx=\"6\" fill=\"#e6f5ef\" stroke=\"#1a7a5e\" stroke-width=\"1\"/>\n      <text x=\"200\" y=\"28\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"600\" fill=\"#0e4d38\" font-family=\"Inter,sans-serif\">VI₂: Luz extra</text>\n      <rect x=\"120\" y=\"42\" width=\"76\" height=\"24\" rx=\"4\" fill=\"#f0efe9\" stroke=\"#a09e98\" stroke-width=\"1\"/>\n      <text x=\"158\" y=\"57\" text-anchor=\"middle\" font-size=\"10\" fill=\"#6b6860\" font-family=\"Inter,sans-serif\">Sin luz</text>\n      <rect x=\"204\" y=\"42\" width=\"76\" height=\"24\" rx=\"4\" fill=\"#e6f5ef\" stroke=\"#1a7a5e\" stroke-width=\"1\"/>\n      <text x=\"242\" y=\"57\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"600\" fill=\"#0e4d38\" font-family=\"Inter,sans-serif\">Con luz</text>\n      <rect x=\"20\" y=\"70\" width=\"96\" height=\"28\" rx=\"6\" fill=\"#e6f5ef\" stroke=\"#1a7a5e\" stroke-width=\"1\"/>\n      <text x=\"68\" y=\"88\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"600\" fill=\"#0e4d38\" font-family=\"Inter,sans-serif\">VI₁: Ejercicio</text>\n      <rect x=\"20\" y=\"102\" width=\"96\" height=\"28\" rx=\"4\" fill=\"#e6f5ef\" stroke=\"#1a7a5e\" stroke-width=\"1\"/>\n      <text x=\"68\" y=\"120\" text-anchor=\"middle\" font-size=\"10\" fill=\"#1a7a5e\" font-family=\"Inter,sans-serif\">Con esquí</text>\n      <rect x=\"20\" y=\"134\" width=\"96\" height=\"22\" rx=\"4\" fill=\"#f0efe9\" stroke=\"#a09e98\" stroke-width=\"1\"/>\n      <text x=\"68\" y=\"148\" text-anchor=\"middle\" font-size=\"10\" fill=\"#6b6860\" font-family=\"Inter,sans-serif\">Sin esquí</text>\n      <rect x=\"120\" y=\"100\" width=\"76\" height=\"30\" rx=\"4\" fill=\"#f0efe9\" stroke=\"#a09e98\" stroke-width=\"1\"/>\n      <text x=\"158\" y=\"118\" text-anchor=\"middle\" font-size=\"11\" fill=\"#6b6860\" font-family=\"Inter,sans-serif\">media=2</text>\n      <rect x=\"204\" y=\"100\" width=\"76\" height=\"30\" rx=\"4\" fill=\"#e6f5ef\" stroke=\"#1a7a5e\" stroke-width=\"1.5\"/>\n      <text x=\"242\" y=\"118\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"700\" fill=\"#0e4d38\" font-family=\"Inter,sans-serif\">media=10 ✦</text>\n      <rect x=\"120\" y=\"132\" width=\"76\" height=\"24\" rx=\"4\" fill=\"#f0efe9\" stroke=\"#a09e98\" stroke-width=\"1\"/>\n      <text x=\"158\" y=\"147\" text-anchor=\"middle\" font-size=\"11\" fill=\"#6b6860\" font-family=\"Inter,sans-serif\">media=2</text>\n      <rect x=\"204\" y=\"132\" width=\"76\" height=\"24\" rx=\"4\" fill=\"#fdf0e7\" stroke=\"#c2602a\" stroke-width=\"1\"/>\n      <text x=\"242\" y=\"147\" text-anchor=\"middle\" font-size=\"11\" fill=\"#8a3a14\" font-family=\"Inter,sans-serif\">media=4</text>\n      <text x=\"320\" y=\"118\" font-size=\"10\" fill=\"#1a7a5e\" font-family=\"Inter,sans-serif\">← Interacción:</text>\n      <text x=\"320\" y=\"133\" font-size=\"10\" fill=\"#1a7a5e\" font-family=\"Inter,sans-serif\">la luz mejora más</text>\n      <text x=\"320\" y=\"148\" font-size=\"10\" fill=\"#1a7a5e\" font-family=\"Inter,sans-serif\">cuando hay esquí</text>\n    </svg>\n  </div>"
  },
  {
   "id": "interaccion",
   "titulo": "Efectos e Interacción",
   "sub": "Efectos simples, principales e interacción · Cap. 8",
   "html": "<div class=\"card-grid\">\n    <div class=\"card accent-bar\" style=\"border-left-color:var(--t6)\"><h3>1️⃣ Efecto simple</h3><p>Efecto de una VI sobre la VD <strong>fijando un nivel</strong> de la otra VI. Un diseño 2×2 tiene dos efectos simples por cada VI.</p></div>\n    <div class=\"card accent-bar\" style=\"border-left-color:var(--t6)\"><h3>📊 Efecto principal</h3><p>Efecto <strong>promedio</strong> de una VI, colapsando sobre los niveles de la otra. Sin interacción se interpreta directamente; con interacción ordinal, con cautela; con interacción cruzada se informa su F pero no se interpreta.</p></div>\n    <div class=\"card accent-bar\" style=\"border-left-color:var(--t6)\"><h3>≡ Sin interacción</h3><p>Líneas <strong>paralelas</strong> en la gráfica. La VI actúa igual independientemente del nivel de la otra VI → se informan los efectos principales.</p></div>\n    <div class=\"card accent-bar\" style=\"border-left-color:var(--t7)\"><h3>✕ Con interacción</h3><p>Líneas <strong>no paralelas</strong>. La VI actúa de forma diferente según el nivel de la otra VI → interpretar los efectos simples por separado.</p></div>\n  </div>\n\n  <div class=\"callout info\"><strong>Interacción ordinal o cruzada:</strong> si los efectos simples tienen el <strong>mismo signo</strong> (interacción ordinal), se informa el efecto principal con cautela y se matiza con los efectos simples (si uno de ellos es nulo, como el del esquí, 6 y 0, mejor informar los simples). Si tienen <strong>signos opuestos</strong> (interacción cruzada), el efecto principal engaña: se informan las tres F, pero solo se interpretan los efectos simples.</div>\n\n  <div class=\"callout\"><strong>Estadístico:</strong> Entre × entre: ANOVA factorial de dos factores; intra × intra: ANOVA de medidas repetidas de dos factores; entre × intra: ANOVA mixto. En los tres casos hay tres F (efecto principal VI₁, efecto principal VI₂ e interacción VI₁×VI₂), cada una con su p y su η²p. Si la interacción es significativa, se analizan los efectos simples; las comparaciones post hoc solo tienen sentido en factores con más de dos niveles.</div>"
  }
 ],
 "flash": [
  {
   "t": "Diseño factorial",
   "d": "Diseño con dos o más VIs cuyos niveles se combinan simultáneamente. Si se combinan todos los niveles de todas las VIs: factorial completo."
  },
  {
   "t": "Interacción entre VIs",
   "d": "El efecto de una VI sobre la VD varía según el nivel de la otra VI. Gráficamente las líneas de los efectos simples NO son paralelas."
  },
  {
   "t": "Efecto simple",
   "d": "Efecto de una VI sobre la VD fijando un nivel específico de la otra VI. Un diseño 2×2 tiene dos efectos simples por cada VI."
  },
  {
   "t": "Efecto principal",
   "d": "Efecto promedio de una VI (medias marginales), promediando sobre los niveles de la otra. Sin interacción se interpreta directamente; con interacción ordinal, con cautela y matizado por los efectos simples; con interacción cruzada no se interpreta (engaña)."
  },
  {
   "t": "¿Qué es una interacción en un diseño factorial?",
   "d": "Cuando el efecto de un factor sobre la variable dependiente <strong>depende del nivel del otro factor</strong>. Es lo más interesante y específico del diseño factorial."
  }
 ],
 "test": [
  {
   "q": "Un diseño 3×2×4 tiene…",
   "o": [
    "9 celdas",
    "24 celdas",
    "14 celdas",
    "3 variables dependientes"
   ],
   "a": 1,
   "fb": "3×2×4 = 24 combinaciones (celdas). Tiene 3 VIs con 3, 2 y 4 niveles respectivamente."
  },
  {
   "q": "¿Qué indica que dos VIs interactúan al actuar sobre una VD?",
   "o": [
    "Los efectos principales son iguales",
    "El efecto de una VI varía según el nivel de la otra",
    "Ambas VIs producen el mismo efecto",
    "Las líneas de los efectos simples son paralelas"
   ],
   "a": 1,
   "fb": "La interacción existe cuando el efecto de una VI sobre la VD depende del nivel de la otra VI. Gráficamente las líneas NO son paralelas."
  },
  {
   "q": "Cuando los efectos simples tienen signos de pendiente opuestos (+/−), ¿qué se debe hacer?",
   "o": [
    "Interpretar solo el efecto principal",
    "Ignorar la interacción",
    "Interpretar los efectos simples; el efecto principal se informa pero no se interpreta, porque promedia efectos de signo contrario (interacción cruzada)",
    "Repetir el experimento"
   ],
   "a": 2,
   "fb": "Con signos opuestos la interacción es cruzada (desordinal): el efecto principal engañaría porque promedia efectos de signo contrario. Se informan las tres F, pero la interpretación se hace con los efectos simples."
  },
  {
   "q": "En un diseño factorial 2×3, ¿cuántas condiciones experimentales hay?",
   "o": [
    "2",
    "3",
    "5",
    "6"
   ],
   "a": 3,
   "fb": "En un diseño factorial el número de condiciones es el producto de los niveles de cada factor: 2 × 3 = 6 condiciones."
  }
 ],
 "glosario": [],
 "emparejar": [
  {
   "label": "Set 3 · Diseños T6–T7",
   "pairs": [
    {
     "left": "Se estudia simultáneamente el efecto de la luz extra Y del ejercicio aeróbico sobre los síntomas depresivos",
     "right": "Factorial 2×2",
     "exp": "Dos VIs combinadas: luz extra (sí/no) × ejercicio (sí/no). 4 grupos. Permite estudiar la interacción."
    },
    {
     "left": "Se registran las horas de consumo de alcohol de un paciente durante 2 semanas, se aplica tratamiento 2 semanas, se retira 2 semanas y se vuelve a aplicar",
     "right": "ABAB",
     "exp": "Ejemplo didáctico: A₁B₁A₂B₂. Si el consumo vuelve al nivel basal al retirar el tratamiento (A₂) y baja de nuevo al reintroducirlo (B₂), el tratamiento es responsable de la mejora."
    },
    {
     "left": "Se entrena a un niño primero en preguntas conversacionales, luego en contacto visual, luego en respuestas conversacionales",
     "right": "Línea base múltiple",
     "exp": "Fernández et al. (1997): la intervención se introduce escalonadamente en distintas conductas del mismo sujeto."
    },
    {
     "left": "Se miden las horas de consumo durante 1 semana sin tratamiento y se introduce el programa en la 2ª semana",
     "right": "Diseño AB",
     "exp": "Diseño básico de caso único: una fase de línea base (A) seguida de una fase de intervención (B)."
    }
   ]
  }
 ],
 "simuladores": [
  "factorial"
 ],
 "id": "t6"
});
