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
   "html": "<div class=\"card-grid\">\n    <div class=\"card accent-bar\" style=\"border-left-color:var(--t6)\"><h3>1️⃣ Efecto simple</h3><p>Efecto de una VI sobre la VD <strong>fijando un nivel</strong> de la otra VI. Un diseño 2×2 tiene dos efectos simples por cada VI.</p></div>\n    <div class=\"card accent-bar\" style=\"border-left-color:var(--t6)\"><h3>📊 Efecto principal</h3><p>Efecto <strong>promedio</strong> de una VI, colapsando sobre los niveles de la otra. Sin interacción se interpreta directamente; con interacción ordinal, con cautela; con interacción cruzada se informa su F pero no se interpreta.</p></div>\n    <div class=\"card accent-bar\" style=\"border-left-color:var(--t6)\"><h3>≡ Sin interacción</h3><p>Líneas <strong>paralelas</strong> en la gráfica. La VI actúa igual independientemente del nivel de la otra VI → se informan los efectos principales.</p></div>\n    <div class=\"card accent-bar\" style=\"border-left-color:var(--t7)\"><h3>✕ Con interacción</h3><p>Líneas <strong>no paralelas</strong>. La VI actúa de forma diferente según el nivel de la otra VI → interpretar los efectos simples por separado.</p></div>\n  </div>\n\n  <div class=\"callout info\"><strong>Interacción ordinal o cruzada:</strong> si los efectos simples tienen el <strong>mismo signo</strong> (interacción ordinal), se informa el efecto principal con cautela y se matiza con los efectos simples (si uno de ellos es nulo, como el del esquí, 6 y 0, mejor informar los simples). Si tienen <strong>signos opuestos</strong> (interacción cruzada), el efecto principal engaña: se informan las tres F, pero solo se interpretan los efectos simples.</div>\n\n  <div class=\"callout\"><strong>Estadístico:</strong> Entre × entre: ANOVA factorial de dos factores; intra × intra: ANOVA de medidas repetidas de dos factores; entre × intra: ANOVA mixto. En los tres casos hay tres F (efecto principal VI₁, efecto principal VI₂ e interacción VI₁×VI₂), cada una con su p y su η²p. Si la interacción es significativa, se analizan los efectos simples; las comparaciones post hoc solo tienen sentido en factores con más de dos niveles.</div>\n<div class=\"callout info\"><strong>Para entenderlo moviendo los datos:</strong> abre el <a href=\"#simulador/cafe-2x2\">Laboratorio del café</a>. Verás en dos gráficos por qué la interacción es <b>simétrica</b> (sale el mismo número desde las dos VI) e <b>independiente</b> de los efectos principales.</div>"
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
  },
  {
   "t": "Factor y nivel",
   "d": "<b>Factor</b> = cada VI del diseño. <b>Nivel</b> = cada valor que toma (p. ej., café: sin / con). Un 2 × 3 tiene dos factores: uno con 2 niveles y otro con 3."
  },
  {
   "t": "Celda",
   "d": "Cada combinación de niveles de los factores. Su número es el producto de los niveles: un 2 × 2 tiene 4 celdas; un 3 × 2 × 5, 30."
  },
  {
   "t": "Medias marginales",
   "d": "Media de una fila o de una columna de la tabla, promediando el otro factor. Los efectos principales se calculan con ellas (p. ej., media con café − media sin café)."
  },
  {
   "t": "Interacción = diferencia de diferencias",
   "d": "Se calcula restando los dos efectos simples de una VI. Ejemplo: el café sube 3 puntos con 4 h de sueño y 0 con 8 h → interacción = 3 − 0 = 3."
  },
  {
   "t": "La interacción es simétrica",
   "d": "Sale el <b>mismo número</b> se calcule desde una VI o desde la otra: (efecto del café con 4 h − con 8 h) = (efecto del sueño con café − sin café). No hay una VI «que interactúa» y otra que no."
  },
  {
   "t": "Los tres efectos son independientes",
   "d": "Efecto principal de A, efecto principal de B e interacción A × B pueden aparecer en cualquier combinación: puede haber interacción sin efectos principales y efectos principales sin interacción. Por eso el ANOVA da tres F."
  },
  {
   "t": "Interacción ordinal",
   "d": "Los efectos simples tienen el <b>mismo signo</b> pero distinto tamaño (p. ej., +8 y +2). El efecto principal se puede informar, matizándolo con los efectos simples."
  },
  {
   "t": "Interacción cruzada (desordinal)",
   "d": "Los efectos simples tienen <b>signo contrario</b> (p. ej., +3 y −3). El efecto principal engaña porque promedia efectos opuestos: se interpretan los efectos simples."
  },
  {
   "t": "Factorial entre, intra y mixto",
   "d": "<b>Entre grupos</b>: cada persona en una sola celda. <b>Intrasujeto</b>: cada persona pasa por todas. <b>Mixto</b>: un factor entre y otro intra (p. ej., incentivo entre × dificultad intra)."
  },
  {
   "t": "Factorial completo e incompleto",
   "d": "Completo: están presentes todas las combinaciones de niveles. Incompleto: falta alguna, y entonces no se pueden estimar todos los efectos ni la interacción completa."
  },
  {
   "t": "ANOVA factorial",
   "d": "Para un 2 × 2 da tres pruebas F: efecto principal de A, de B y la interacción, cada una con su p y su η² parcial. Se mira primero la interacción."
  },
  {
   "t": "Efecto techo y efecto suelo",
   "d": "Si casi todos aciertan (techo) o casi nadie (suelo) en una condición, no queda margen para que la otra VI actúe: la interacción puede aparecer o esconderse por un artefacto de medida."
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
   "fb": "3 × 2 × 4 = 24 combinaciones (celdas). Tiene 3 VI con 3, 2 y 4 niveles."
  },
  {
   "q": "¿Qué indica que dos VI interactúan al actuar sobre una VD?",
   "o": [
    "Que sus efectos principales son iguales",
    "Que el efecto de una VI varía según el nivel de la otra",
    "Que ambas VI producen el mismo efecto",
    "Que las líneas del gráfico son paralelas"
   ],
   "a": 1,
   "fb": "Hay interacción cuando el efecto de una VI depende del nivel de la otra. Gráficamente, las líneas NO son paralelas."
  },
  {
   "q": "Los efectos simples de una VI tienen signos opuestos (+3 y −3). ¿Cómo se interpreta?",
   "o": [
    "Basta con el efecto principal",
    "Se interpretan los efectos simples",
    "Se ignora la interacción",
    "Hay que repetir el experimento"
   ],
   "a": 1,
   "fb": "Es una interacción cruzada: el efecto principal promedia efectos de signo contrario y engañaría. Se informan las tres F, pero la historia se cuenta con los efectos simples."
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
   "fb": "El número de condiciones es el producto de los niveles: 2 × 3 = 6."
  },
  {
   "q": "¿Cuál es el efecto simple del café en quienes durmieron 4 h?<br><span class='nota'>Atención media: sin café, 8 h = 8 y 4 h = 4; con café, 8 h = 8 y 4 h = 7.</span>",
   "o": [
    "+3",
    "+1,5",
    "0",
    "−4"
   ],
   "a": 0,
   "fb": "Efecto simple = diferencia dentro de un nivel de la otra VI: con 4 h, con café (7) − sin café (4) = +3."
  },
  {
   "q": "Con los mismos datos, ¿cuál es el efecto principal del café?<br><span class='nota'>Atención media: sin café, 8 h = 8 y 4 h = 4; con café, 8 h = 8 y 4 h = 7.</span>",
   "o": [
    "+3",
    "+1,5",
    "0",
    "+7,5"
   ],
   "a": 1,
   "fb": "Es el promedio de los efectos simples, (0 + 3) / 2 = +1,5; o la diferencia de medias marginales: 7,5 − 6 = +1,5."
  },
  {
   "q": "Con los mismos datos, ¿cuánto vale la interacción café × sueño?<br><span class='nota'>Atención media: sin café, 8 h = 8 y 4 h = 4; con café, 8 h = 8 y 4 h = 7.</span>",
   "o": [
    "+1,5",
    "−2,5",
    "+3",
    "0"
   ],
   "a": 2,
   "fb": "Interacción = diferencia entre los efectos simples del café: (+3) − (0) = +3. Desde el sueño sale lo mismo: (−1) − (−4) = +3."
  },
  {
   "q": "Calculas la interacción desde el sueño en lugar de desde el café. ¿Qué obtienes?",
   "o": [
    "El mismo valor",
    "El valor con el signo cambiado",
    "La mitad del valor",
    "Un valor que depende del eje X"
   ],
   "a": 0,
   "fb": "La interacción es simétrica: es una sola diferencia de diferencias, se mire desde una VI o desde la otra. Cambiar de eje cambia el gráfico, no el número."
  },
  {
   "q": "¿Puede haber interacción sin ningún efecto principal?",
   "o": [
    "No, primero tiene que haber efectos principales",
    "Sí, por ejemplo con líneas que forman una X",
    "Solo en diseños intrasujeto",
    "Solo si la muestra es pequeña"
   ],
   "a": 1,
   "fb": "Los tres efectos son independientes. Con líneas en X (p. ej., 8, 4 / 4, 8) los efectos simples se compensan: ambos efectos principales valen 0 y la interacción es grande."
  },
  {
   "q": "En el gráfico de un 2 × 2 las dos líneas son paralelas y una está por encima de la otra. ¿Qué concluyes?",
   "o": [
    "Hay interacción ordinal",
    "Hay interacción cruzada",
    "Hay efecto principal sin interacción",
    "No hay ningún efecto"
   ],
   "a": 2,
   "fb": "Paralelas = el efecto de una VI es el mismo en los dos niveles de la otra (sin interacción). Que una línea esté por encima indica un efecto principal de la VI representada por las líneas."
  },
  {
   "q": "Los efectos simples de la luz son +8 (con esquí) y +2 (sin esquí). ¿Qué tipo de interacción es?",
   "o": [
    "Ordinal",
    "Cruzada",
    "No hay interacción",
    "Un efecto suelo"
   ],
   "a": 0,
   "fb": "Mismo signo y distinto tamaño: ordinal. La luz ayuda siempre, pero mucho más con esquí; el efecto principal (+5) se informa con ese matiz."
  },
  {
   "q": "El incentivo se asigna entre grupos y todos resuelven ítems fáciles y difíciles. ¿Qué diseño es?",
   "o": [
    "Factorial 2 × 2 entre grupos",
    "Factorial 2 × 2 intrasujeto",
    "Factorial mixto 2 × 2",
    "Dos experimentos simples"
   ],
   "a": 2,
   "fb": "Un factor entre grupos (incentivo) y otro intrasujeto (dificultad): diseño factorial mixto, que se analiza con un ANOVA mixto."
  },
  {
   "q": "¿Cuántas pruebas F da un ANOVA factorial de un diseño 2 × 2?",
   "o": [
    "1",
    "2",
    "3",
    "4"
   ],
   "a": 2,
   "fb": "Tres: efecto principal de A, efecto principal de B e interacción A × B. Cada una con su p y su η² parcial."
  },
  {
   "q": "ANOVA mixto con 38 personas repartidas en dos grupos. ¿Cómo se escribe la F de la interacción?",
   "o": [
    "F(1, 36)",
    "F(2, 38)",
    "F(1, 37)",
    "F(4, 34)"
   ],
   "a": 0,
   "fb": "En un 2 × 2 cada efecto tiene 1 gl; el error intra tiene N − número de grupos = 38 − 2 = 36."
  },
  {
   "q": "Casi nadie acierta los ítems difíciles en ninguna condición. ¿Qué ocurre con la interacción incentivo × dificultad?",
   "o": [
    "Queda demostrado que no existe",
    "No puede evaluarse bien: hay un efecto suelo",
    "Se vuelve cruzada",
    "Aumenta la potencia"
   ],
   "a": 1,
   "fb": "Si no hay margen para mejorar, el incentivo no puede notarse en esa condición: el efecto suelo esconde (o fabrica) interacciones. Hay que ajustar la dificultad."
  }
 ],
 "glosario": [],
 "emparejar": [
  {
   "label": "Set 3 · Tipos de diseño factorial",
   "pairs": [
    {
     "left": "Luz extra (sí/no) × ejercicio (sí/no): cuatro grupos de personas distintas",
     "right": "Factorial 2 × 2 entre grupos",
     "exp": "Cada persona está en una sola celda. Permite estudiar la interacción luz × ejercicio."
    },
    {
     "left": "El café se asigna entre grupos y todos resuelven ítems fáciles y difíciles",
     "right": "Factorial mixto",
     "exp": "Un factor entre grupos (café o incentivo) y otro intrasujeto (dificultad)."
    },
    {
     "left": "Cada persona pasa por tres dosis de cafeína en cuatro horas del día",
     "right": "Factorial 3 × 4 intrasujeto",
     "exp": "12 celdas por las que pasa cada persona: hay que controlar el orden (tema 5)."
    },
    {
     "left": "Se estudian dos VI, pero falta la combinación «sin luz y sin esquí»",
     "right": "Factorial incompleto",
     "exp": "Al faltar una celda no se pueden estimar todos los efectos ni la interacción completa."
    }
   ]
  },
  {
   "label": "Set 3b · Efectos en un 2 × 2",
   "pairs": [
    {
     "left": "Entre quienes durmieron 4 h, el café sube la atención 3 puntos",
     "right": "Efecto simple",
     "exp": "Efecto de una VI (café) en un nivel concreto de la otra (4 h)."
    },
    {
     "left": "Con café la media es 7,5 y sin café 6, promediando las horas de sueño",
     "right": "Efecto principal",
     "exp": "Diferencia entre medias marginales: +1,5."
    },
    {
     "left": "El café sube 3 puntos con 4 h de sueño y 0 con 8 h",
     "right": "Interacción ordinal",
     "exp": "Los efectos simples tienen el mismo signo (o uno es nulo) pero distinto tamaño."
    },
    {
     "left": "El café ayuda a quien durmió poco y perjudica a quien durmió mucho",
     "right": "Interacción cruzada",
     "exp": "Efectos simples de signo contrario: el efecto principal engañaría."
    }
   ]
  },
  {
   "label": "Set 3c · Leer los resultados",
   "pairs": [
    {
     "left": "Las dos líneas del gráfico son paralelas",
     "right": "Sin interacción",
     "exp": "El efecto de una VI es igual en todos los niveles de la otra."
    },
    {
     "left": "La interacción calculada desde el café y desde el sueño da el mismo número",
     "right": "Simetría de la interacción",
     "exp": "Es una sola diferencia de diferencias; da igual qué VI pongas en el eje X."
    },
    {
     "left": "Hay interacción aunque los dos efectos principales valen 0",
     "right": "Independencia de los efectos",
     "exp": "Los tres efectos del 2 × 2 pueden darse en cualquier combinación: por eso hay tres F."
    },
    {
     "left": "Casi nadie acierta los ítems difíciles, con o sin incentivo",
     "right": "Efecto suelo",
     "exp": "Sin margen para mejorar, la interacción no puede evaluarse bien."
    }
   ]
  }
 ],
 "simuladores": [
  "factorial",
  "cafe-2x2"
 ],
 "id": "t6"
});
