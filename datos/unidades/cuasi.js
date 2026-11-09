/* Unidad «Diseños cuasiexperimentales». Estado: activa | en-preparacion | oculta (se puede cambiar también en datos/configuracion.js). Versión 3 (noviembre de 2026). */
Brujula.unidad({
 "orden": 7,
 "bloque": "Bloque II · Diseños experimentales",
 "tema": "Semana 8",
 "titulo": "Diseños cuasiexperimentales",
 "icono": "🔬",
 "color": "#4B6584",
 "estado": "activa",
 "libro": "León y Montero (2015), cap. 10",
 "resumen": "Se introduce la VI, pero los grupos no se forman al azar. Diseños pre-post, solo post y series temporales interrumpidas, sus amenazas y su análisis.",
 "id": "cuasi",
 "secciones": [
  {
   "id": "logica",
   "titulo": "La lógica del cuasi experimento",
   "sub": "Manipular sin asignar al azar",
   "html": "<div class=\"callout info\"><b>Idea clave.</b> En un cuasi experimento el investigador <b>introduce la VI</b> (un programa, una campaña, una norma), pero <b>no puede asignar al azar</b> a las personas a las condiciones: trabaja con grupos ya formados (aulas, centros, ciudades).</div><div class=\"card-grid\"><div class=\"card accent-bar\" style=\"border-left-color:var(--azul)\"><h3>Experimento</h3><p>Manipula la VI <b>y</b> asigna al azar. Los grupos son equivalentes en promedio.</p></div><div class=\"card accent-bar\" style=\"border-left-color:#4B6584\"><h3>Cuasi experimento</h3><p>Manipula la VI, <b>sin</b> asignar al azar. Los grupos pueden diferir desde el principio.</p></div><div class=\"card accent-bar\" style=\"border-left-color:#8E5B9E\"><h3>Ex post facto</h3><p>Ni manipula ni asigna: la VI ya estaba presente (Semana 9).</p></div></div><div class=\"sec\">¿Por qué existen?</div><div class=\"card-grid\"><div class=\"card\"><h3>Investigación aplicada</h3><p>Evaluar programas en contextos reales: escuelas, hospitales, empresas, ayuntamientos.</p></div><div class=\"card\"><h3>Validez interna y externa</h3><p>Se gana <b>validez externa</b> (situaciones reales) a cambio de <b>validez interna</b>: es más difícil descartar otras explicaciones.</p></div><div class=\"card\"><h3>Ejemplo de clase</h3><p>Un colegio aplica un programa contra la impulsividad en 3.º A y usa 3.º B como comparación. Nadie sorteó a los niños.</p></div></div><div class=\"sec\">Tres familias de diseños</div><div class=\"scroll-x\"><table class=\"tabla\"><tr><th>Familia</th><th>Qué se mide</th><th>Pregunta clave</th></tr><tr><td>Pre-post</td><td>Antes y después del tratamiento</td><td>¿Cambió más el grupo tratado que el de comparación?</td></tr><tr><td>Solo post</td><td>Solo después</td><td>¿Eran iguales los grupos antes? No lo sabemos</td></tr><tr><td>Serie temporal interrumpida</td><td>Muchas veces antes y después</td><td>¿Se rompe la tendencia justo al introducir el tratamiento?</td></tr></table></div>"
  },
  {
   "id": "prepost",
   "titulo": "Diseños pre-post",
   "sub": "Medir antes y después",
   "html": "<div class=\"callout info\"><b>Notación.</b> O = observación (medida de la VD); X = tratamiento; cada fila es un grupo. La <b>línea discontinua</b> indica que los grupos no se formaron al azar.</div><div class=\"card-grid\"><div class=\"card accent-bar\" style=\"border-left-color:#C93C3C\"><h3>Pre-post con un solo grupo</h3><div class=\"notacion\"><div>O<sub>1</sub>  X  O<sub>2</sub></div></div><p>El cambio puede deberse a la historia, la maduración, la práctica con la prueba o la regresión a la media. <b>Es el más débil.</b></p></div><div class=\"card accent-bar\" style=\"border-left-color:#4B6584\"><h3>Pre-post con grupo de cuasi control</h3><div class=\"notacion\"><div>O<sub>1</sub>  X  O<sub>2</sub></div><div>- - - - - - - -</div><div>O<sub>1</sub>     O<sub>2</sub></div></div><p>Se compara el <b>cambio</b> de cada grupo. Si los dos maduran igual, la diferencia de cambios apunta al tratamiento.</p></div><div class=\"card accent-bar\" style=\"border-left-color:#4B6584\"><h3>Pre-post con una segunda VD</h3><p>Un solo grupo, pero se miden dos VD: una que el tratamiento debería cambiar y otra igual de sensible que <b>no</b> debería cambiar.</p><p class=\"nota\">Ej.: economía de fichas en un hospital: mejora la higiene (VD tratada) pero no la puntualidad (VD control).</p></div><div class=\"card accent-bar\" style=\"border-left-color:#4B6584\"><h3>Cohorte previa como control</h3><p>El grupo de comparación es la promoción del curso anterior, que no recibió el programa. Útil en centros educativos, pero cuidado con las diferencias entre promociones.</p></div></div><div class=\"callout ok\"><b>Regla práctica:</b> cuanto más se parezcan los grupos en el pretest, más creíble es atribuir la diferencia en el postest al tratamiento.</div>"
  },
  {
   "id": "solopost",
   "titulo": "Diseños con medida solo post",
   "sub": "Cuando no se puede medir antes",
   "html": "<div class=\"card-grid\"><div class=\"card accent-bar\" style=\"border-left-color:#C93C3C\"><h3>Solo post con grupo de cuasi control</h3><div class=\"notacion\"><div>X  O</div><div>- - - - -</div><div>    O</div></div><p>No hay medida previa: no sabemos si los grupos eran iguales al principio. <b>La selección</b> es la gran amenaza.</p></div><div class=\"card accent-bar\" style=\"border-left-color:#4B6584\"><h3>Grupos duplicados</h3><p>Se repite el diseño con varios pares de grupos (varias aulas tratadas y varias de comparación). Si el efecto aparece en todas, la selección es menos probable.</p></div><div class=\"card accent-bar\" style=\"border-left-color:#4B6584\"><h3>Dos tratamientos</h3><p>Se comparan dos versiones del programa en grupos ya formados. Si difieren, al menos una explicación alternativa (la atención extra) pierde fuerza.</p></div></div><div class=\"callout warn\">Sin medida previa, medir variables relacionadas con la VD (nivel previo, edad, nivel socioeconómico) ayuda a valorar la equivalencia de los grupos.</div>"
  },
  {
   "id": "serie",
   "titulo": "Series temporales interrumpidas",
   "sub": "Muchas medidas antes y después",
   "html": "<div class=\"callout info\"><b>Serie temporal interrumpida.</b> Se mide la VD <b>muchas veces</b> antes y después de introducir el tratamiento. Si la serie cambia de <b>nivel</b> o de <b>pendiente</b> justo en ese punto, y no antes, el tratamiento es la explicación más probable.</div><div class=\"notacion\"><p class=\"notacion-tit\">Serie temporal interrumpida simple</p><div>O<sub>1</sub> O<sub>2</sub> O<sub>3</sub> O<sub>4</sub> O<sub>5</sub>  X  O<sub>6</sub> O<sub>7</sub> O<sub>8</sub> O<sub>9</sub> O<sub>10</sub></div></div><div class=\"card-grid\"><div class=\"card accent-bar\" style=\"border-left-color:#4B6584\"><h3>Simple</h3><p>Un solo grupo. Controla la maduración y la regresión a la media (se ve la tendencia previa), pero no la <b>historia</b>: algo que ocurra a la vez que X.</p></div><div class=\"card accent-bar\" style=\"border-left-color:#4B6584\"><h3>Con grupo de cuasi control</h3><p>Otra serie que no recibe el tratamiento. Si solo cambia la tratada, la historia es menos probable.</p><p class=\"nota\">Ej.: accidentes mensuales en una ciudad que limita la velocidad frente a otra que no.</p></div><div class=\"card accent-bar\" style=\"border-left-color:#4B6584\"><h3>Un grupo y dos VD</h3><p>Se registran dos series en la misma población: una afectada por el tratamiento y otra que no debería cambiar.</p></div></div><div class=\"callout ok\">Pruébalo en el <a href=\"#simulador/serie-temporal\">simulador de la serie temporal</a>: mueve el punto de intervención, añade tendencia y un grupo de comparación.</div>"
  },
  {
   "id": "amenazas",
   "titulo": "Amenazas a la validez interna",
   "sub": "Las explicaciones que compiten con el tratamiento",
   "html": "<div class=\"scroll-x\"><table class=\"tabla\"><tr><th>Amenaza</th><th>Qué es</th><th>Ejemplo</th><th>Cómo se combate</th></tr><tr><td>Historia</td><td>Un suceso ajeno coincide con el tratamiento</td><td>Cambia el profesorado a mitad del programa</td><td>Grupo de comparación; serie temporal con control</td></tr><tr><td>Maduración</td><td>Las personas cambian solas con el tiempo</td><td>Los niños mejoran su autocontrol al crecer</td><td>Grupo de comparación de la misma edad</td></tr><tr><td>Práctica (efecto del pretest)</td><td>Repetir la prueba mejora la puntuación</td><td>Segunda vez que hacen el mismo test</td><td>Formas paralelas; grupo de comparación</td></tr><tr><td>Regresión a la media</td><td>Si se elige a los extremos, se acercan a la media al volver a medir</td><td>Se trata solo a los más impulsivos</td><td>No seleccionar por puntuaciones extremas o tener comparación igual de extrema</td></tr><tr><td>Selección</td><td>Los grupos ya eran distintos</td><td>El aula tratada era la más motivada</td><td>Pretest; emparejar; covariables</td></tr><tr><td>Abandono</td><td>Se pierden participantes de forma desigual</td><td>Se van los que peor lo pasan</td><td>Registrar y comparar a quienes abandonan</td></tr><tr><td>Interacción selección × maduración</td><td>Un grupo madura más deprisa que el otro</td><td>Un aula de mayor edad</td><td>Grupos parecidos en el pretest y la edad</td></tr></table></div><div class=\"callout ok\">Pruébalo en el <a href=\"#simulador/regresion-media\">simulador de regresión a la media</a>: «mejoran» sin tratamiento.</div><div class=\"callout info\"><b>Del aula:</b> en la actividad «Lectura de la mirada» (05/11) el grupo entrenado no mejoró más que el de comparación. Lo analizamos en la <a href=\"#caso/c16\">misión 16</a>.</div>"
  },
  {
   "id": "analisis",
   "titulo": "Análisis de datos",
   "sub": "De la notación a la prueba",
   "html": "<div class=\"scroll-x\"><table class=\"tabla\"><tr><th>Diseño</th><th>Análisis habitual (JASP)</th><th>Idea</th></tr><tr><td>Pre-post con un grupo</td><td>t para muestras relacionadas (o Wilcoxon)</td><td>¿Cambia la media del pre al post?</td></tr><tr><td>Pre-post con cuasi control</td><td>ANCOVA con el pretest como covariable (alternativa: ANOVA mixto grupo × momento)</td><td>¿Difieren los grupos en el post a igualdad de pretest?</td></tr><tr><td>Solo post con cuasi control</td><td>t para muestras independientes o ANOVA</td><td>Interpretar con mucha cautela por la selección</td></tr><tr><td>Serie temporal interrumpida</td><td>Regresión segmentada (cambio de nivel y de pendiente)</td><td>¿Se rompe la serie en el punto de intervención?</td></tr></table></div><div class=\"sec\">Herramientas actuales (solo la idea)</div><div class=\"card-grid\"><div class=\"card\"><h3>Diferencias en diferencias</h3><p>Compara el cambio del grupo tratado con el cambio del de comparación. Supone que, sin tratamiento, habrían evolucionado en paralelo.</p></div><div class=\"card\"><h3>Regresión discontinua</h3><p>El tratamiento se asigna por un punto de corte (p. ej., una puntuación de cribado); se comparan los casos justo a ambos lados.</p></div><div class=\"card\"><h3>Puntuación de propensión</h3><p>Empareja o pondera a los participantes para que los grupos se parezcan en las covariables medidas.</p></div></div><div class=\"callout warn\">Ninguna técnica estadística sustituye al azar: solo iguala lo que se ha medido.</div>"
  }
 ],
 "flash": [
  {
   "t": "¿Qué diferencia un cuasi experimento de un experimento?",
   "d": "En el cuasi experimento <strong>no hay asignación aleatoria</strong>: se trabaja con grupos ya formados. Sí hay manipulación de la VI."
  },
  {
   "t": "¿Qué diferencia un cuasi experimento de un diseño ex post facto?",
   "d": "En el cuasi experimento el investigador <strong>introduce la VI</strong> (el programa). En el ex post facto la VI ya estaba presente y solo se selecciona."
  },
  {
   "t": "¿Por qué el pre-post con un solo grupo es el diseño más débil?",
   "d": "Porque el cambio puede deberse a <strong>historia, maduración, práctica o regresión a la media</strong>: no hay con quién comparar."
  },
  {
   "t": "¿Qué aporta un grupo de cuasi control en un pre-post?",
   "d": "Permite comparar <strong>cambios</strong>: si ambos grupos maduran o se acostumbran a la prueba igual, la diferencia de cambios apunta al tratamiento."
  },
  {
   "t": "¿Qué es la regresión a la media?",
   "d": "Si se selecciona a personas por puntuaciones <strong>extremas</strong>, al volver a medirlas tienden a acercarse a la media, aunque no haya tratamiento."
  },
  {
   "t": "¿Cuál es la gran amenaza del diseño solo post?",
   "d": "La <strong>selección</strong>: sin pretest no sabemos si los grupos eran iguales antes del tratamiento."
  },
  {
   "t": "¿Qué amenaza controla mal la serie temporal interrumpida simple?",
   "d": "La <strong>historia</strong>: un suceso que coincida con la intervención. Se reduce con una serie de cuasi control."
  },
  {
   "t": "¿Qué análisis se recomienda para un pre-post con cuasi control?",
   "d": "<strong>ANCOVA</strong> con el pretest como covariable (o ANOVA mixto grupo × momento)."
  },
  {
   "t": "¿Qué supone la técnica de diferencias en diferencias?",
   "d": "Que, sin tratamiento, los dos grupos habrían evolucionado <strong>en paralelo</strong>."
  },
  {
   "t": "¿Qué es una segunda VD de control?",
   "d": "Una variable igual de sensible que <strong>no debería cambiar</strong> con el tratamiento. Si solo cambia la VD tratada, otras explicaciones pierden fuerza."
  }
 ],
 "test": [
  {
   "q": "¿Qué característica principal distingue a un experimento de un diseño cuasiexperimental?",
   "o": [
    "La medición de una variable dependiente",
    "La asignación aleatoria de participantes a las condiciones",
    "La existencia de un grupo de comparación"
   ],
   "a": 1,
   "fb": "Un cuasi experimento puede tener grupo de comparación y manipulación, pero no asignación aleatoria."
  },
  {
   "q": "Un programa de relajación se aplica a un grupo y se mide la ansiedad antes y después, sin grupo de comparación. ¿Qué amenazas quedan sin controlar?",
   "o": [
    "Solo el sesgo del observador",
    "La historia y la maduración, entre otras",
    "Ninguna, porque hay pretest"
   ],
   "a": 1,
   "fb": "Sin grupo de comparación, cualquier suceso (historia) o cambio natural (maduración) entre el pre y el post puede explicar la mejora."
  },
  {
   "q": "Un colegio selecciona a los 20 niños más impulsivos para un programa. En el postest son menos impulsivos. ¿Qué amenaza es especialmente probable?",
   "o": [
    "Regresión a la media",
    "Difusión del tratamiento",
    "Efecto de cohorte"
   ],
   "a": 0,
   "fb": "Seleccionar por puntuaciones extremas hace que, al volver a medir, se acerquen a la media aunque el programa no funcione."
  },
  {
   "q": "Dos aulas ya formadas: una recibe un método de lectura y la otra no. Solo se mide al final. ¿Cuál es la principal limitación?",
   "o": [
    "No se sabe si las aulas eran iguales antes del método",
    "No se puede calcular una media",
    "La VI no está manipulada"
   ],
   "a": 0,
   "fb": "En el diseño solo post la selección es la gran amenaza: sin pretest no se puede valorar la equivalencia inicial."
  },
  {
   "q": "Una ciudad limita la velocidad en enero y se registran los accidentes mensuales durante tres años antes y dos después. ¿Qué diseño es?",
   "o": [
    "Pre-post con un solo grupo",
    "Serie temporal interrumpida",
    "Ex post facto retrospectivo"
   ],
   "a": 1,
   "fb": "Muchas medidas antes y después de introducir el tratamiento: serie temporal interrumpida."
  },
  {
   "q": "En la serie anterior se añade otra ciudad sin límite de velocidad. ¿Qué amenaza se reduce sobre todo?",
   "o": [
    "La regresión a la media",
    "La historia",
    "La práctica con la prueba"
   ],
   "a": 1,
   "fb": "Si un suceso general (una campaña nacional, el tiempo) explicara el cambio, también aparecería en la ciudad de comparación."
  },
  {
   "q": "Pre-post con grupo de cuasi control. ¿Qué análisis compara los grupos en el postest a igualdad de pretest?",
   "o": [
    "t para muestras relacionadas en cada grupo por separado",
    "ANCOVA con el pretest como covariable",
    "Correlación entre pretest y postest"
   ],
   "a": 1,
   "fb": "La ANCOVA ajusta las diferencias iniciales del pretest al comparar los grupos en el postest."
  },
  {
   "q": "Un hospital aplica una economía de fichas para mejorar la higiene y mide también la puntualidad, que no debería cambiar. ¿Qué función cumple la puntualidad?",
   "o": [
    "Es la VI del estudio",
    "Es una segunda VD que actúa como control",
    "Es una variable de selección de pacientes"
   ],
   "a": 1,
   "fb": "Si solo cambia la higiene y no la puntualidad, explicaciones generales (más atención, historia) pierden fuerza."
  }
 ],
 "glosario": [
  {
   "es": "Cuasi experimento",
   "en": "Quasi-experiment",
   "def": "Diseño en el que se manipula la VI sin asignación aleatoria de los participantes."
  },
  {
   "es": "Grupo de cuasi control",
   "en": "Non-equivalent comparison group",
   "def": "Grupo de comparación no formado al azar."
  },
  {
   "es": "Serie temporal interrumpida",
   "en": "Interrupted time series",
   "def": "Muchas medidas antes y después de introducir el tratamiento."
  },
  {
   "es": "Regresión a la media",
   "en": "Regression to the mean",
   "def": "Tendencia de las puntuaciones extremas a acercarse a la media al volver a medir."
  },
  {
   "es": "Diferencias en diferencias",
   "en": "Difference-in-differences",
   "def": "Compara el cambio del grupo tratado con el del grupo de comparación."
  }
 ],
 "emparejar": [
  {
   "label": "Set C1 · ¿Qué diseño cuasiexperimental es?",
   "pairs": [
    {
     "left": "Se mide el bienestar de un aula antes y después de un programa, sin otra aula",
     "right": "Pre-post con un solo grupo",
     "exp": "O₁ X O₂: el diseño más débil."
    },
    {
     "left": "Un aula recibe el programa y otra no; las dos se miden antes y después",
     "right": "Pre-post con grupo de cuasi control",
     "exp": "Se comparan los cambios de ambos grupos."
    },
    {
     "left": "Solo se mide al final a un aula tratada y a otra sin tratar",
     "right": "Solo post con cuasi control",
     "exp": "Sin pretest, la selección es la gran amenaza."
    },
    {
     "left": "Registros mensuales durante años, antes y después de una norma",
     "right": "Serie temporal interrumpida",
     "exp": "Se busca una ruptura de nivel o de pendiente en el punto de intervención."
    }
   ]
  },
  {
   "label": "Set C2 · Amenazas a la validez",
   "pairs": [
    {
     "left": "Cambia el profesorado justo cuando empieza el programa",
     "right": "Historia",
     "exp": "Un suceso ajeno coincide con el tratamiento."
    },
    {
     "left": "Se trata solo a quienes puntuaron peor en el pretest",
     "right": "Regresión a la media",
     "exp": "Los extremos tienden a acercarse a la media."
    },
    {
     "left": "El aula tratada ya era la más motivada",
     "right": "Selección",
     "exp": "Los grupos no eran equivalentes al empezar."
    },
    {
     "left": "Abandonan más los que peor lo están pasando en el grupo tratado",
     "right": "Abandono (mortalidad experimental)",
     "exp": "La pérdida desigual cambia la composición de los grupos."
    }
   ]
  }
 ],
 "simuladores": [
  "regresion-media",
  "serie-temporal"
 ]
});
