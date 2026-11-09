/* Unidad «Selección de la muestra y recogida de datos». Estado: activa | en-preparacion | oculta (se puede cambiar también en datos/configuracion.js). Versión 3 (noviembre de 2026). */
Brujula.unidad({
 "orden": 9,
 "bloque": "Bloque III · Diseños no experimentales",
 "tema": "Semana 10",
 "titulo": "Selección de la muestra y recogida de datos",
 "icono": "📋",
 "color": "#3867D6",
 "estado": "activa",
 "libro": "León y Montero (2015), cap. 5",
 "resumen": "Muestreo probabilístico y no probabilístico, tamaño de la muestra y principales instrumentos: cuestionarios, entrevistas y observación.",
 "id": "desc",
 "secciones": [
  {
   "id": "poblacion",
   "titulo": "Población, muestra y representatividad",
   "sub": "¿De quién queremos hablar?",
   "html": "<div class=\"step-row\"><div class=\"step-box\">Población<br><small>todos los universitarios españoles</small></div><span class=\"step-arr\">→</span><div class=\"step-box\">Marco muestral<br><small>listados de matrícula</small></div><span class=\"step-arr\">→</span><div class=\"step-box\">Muestra<br><small>1.500 estudiantes</small></div><span class=\"step-arr\">→</span><div class=\"step-box\">Generalización<br><small>«el 60 % está satisfecho»</small></div></div><div class=\"definicion\"><b>Muestra representativa.</b> subconjunto de la población que tiene sus mismas características generales. Si no lo es, decimos que está <b>sesgada</b>.</div><div class=\"callout info\"><b>La analogía de la sopa:</b> para saber si está bien de sal basta una cucharada… siempre que antes la hayas <b>removido</b>. Remover = seleccionar al azar.</div><div class=\"sec\">Cuatro errores que alejan la encuesta de la población</div><div class=\"card-grid\"><div class=\"card accent-bar\" style=\"border-left-color:#C93C3C\"><h3>Cobertura</h3><p>El marco deja fuera a parte de la población (quien no usa internet).</p></div><div class=\"card accent-bar\" style=\"border-left-color:var(--azul)\"><h3>Muestreo</h3><p>Cada muestra al azar sale algo distinta. Es el único que baja al aumentar n.</p></div><div class=\"card accent-bar\" style=\"border-left-color:#001447\"><h3>No respuesta</h3><p>Quienes no responden son distintos de quienes sí.</p></div><div class=\"card accent-bar\" style=\"border-left-color:#0A8F7B\"><h3>Medida</h3><p>Preguntas confusas o respuestas poco sinceras.</p></div></div><div class=\"callout warn\"><b>Literary Digest (1936):</b> 2,4 millones de respuestas, sacadas de guías de teléfono y registros de coches, predijeron que perdería Roosevelt. Gallup, con unas 50.000 bien elegidas, acertó. <b>El tamaño no arregla el sesgo.</b></div><div class=\"callout info\"><b>Muestras WEIRD</b> (Henrich et al., 2010): alrededor del 96 % de los participantes de la investigación psicológica procedía de países que suman un 12 % de la población mundial.</div>"
  },
  {
   "id": "probabilistico",
   "titulo": "Muestreo probabilístico",
   "sub": "Que el azar decida quién entra",
   "html": "<div class=\"callout info\">En el muestreo <b>probabilístico</b> cada elemento tiene una probabilidad <b>conocida</b> (y mayor que cero) de entrar en la muestra. Eso permite calcular el margen de error.</div><div class=\"scroll-x\"><table class=\"tabla\"><tr><th>Técnica</th><th>Cómo se elige</th><th>Cuándo usarlo</th><th>Riesgo</th></tr><tr><td>Aleatorio simple</td><td>Sorteo directo de la lista</td><td>Población con lista completa</td><td>Puede dejar fuera grupos pequeños</td></tr><tr><td>Sistemático</td><td>Uno de cada k (k = N/n), con inicio al azar</td><td>Listas largas</td><td>Orden periódico en la lista</td></tr><tr><td>Estratificado</td><td>Sorteo dentro de cada estrato</td><td>Asegurar grupos (cursos, sexo)</td><td>Hay que conocer los estratos</td></tr><tr><td>Por conglomerados</td><td>Se sortean grupos enteros (aulas, municipios)</td><td>Población grande y dispersa</td><td>Los miembros de un grupo se parecen</td></tr><tr><td>Polietápico</td><td>Varias etapas encadenadas</td><td>Encuestas nacionales (CIS)</td><td>Complejo</td></tr></table></div><div class=\"sec\">Ejemplo de afijación proporcional</div><div class=\"scroll-x\"><table class=\"tabla\"><tr><th>Curso</th><th>Alumnos</th><th>Proporción</th><th>× 40</th><th>En la muestra</th></tr><tr><td>1.º</td><td>100</td><td>0,33</td><td>13,2</td><td>13</td></tr><tr><td>2.º</td><td>100</td><td>0,33</td><td>13,2</td><td>13</td></tr><tr><td>3.º</td><td>50</td><td>0,17</td><td>6,8</td><td>7</td></tr><tr><td>4.º</td><td>50</td><td>0,17</td><td>6,8</td><td>7</td></tr><tr><td>Total</td><td>300</td><td>1</td><td>40</td><td>40</td></tr></table></div><div class=\"callout ok\"><b>Afijación simple:</b> el mismo número por estrato (p. ej., 10 por curso). Útil si se quieren comparar estratos pequeños.</div>"
  },
  {
   "id": "noprob",
   "titulo": "Muestreo no probabilístico y muestras online",
   "sub": "Cuando no hay lista",
   "html": "<div class=\"scroll-x\"><table class=\"tabla\"><tr><th>No probabilístico</th><th>Cómo funciona</th><th>Ejemplo</th></tr><tr><td>Accidental o de conveniencia</td><td>Personas a nuestro alcance</td><td>Mis compañeros; quien responde en redes</td></tr><tr><td>Por cuotas</td><td>Se fijan cuotas por grupo, sin azar</td><td>50 hombres y 50 mujeres por franja de edad</td></tr><tr><td>Intencional (a propósito)</td><td>Un experto elige casos informativos</td><td>Terapeutas con más de 20 años de experiencia</td></tr><tr><td>Bola de nieve</td><td>Cada participante recluta a otros</td><td>Personas con una enfermedad poco frecuente</td></tr></table></div><div class=\"card-grid\"><div class=\"card accent-bar\" style=\"border-left-color:#C93C3C\"><h3>Muestras online</h3><p>Rápidas y baratas, pero con autoselección, participantes «profesionales» y sin quienes no usan internet.</p></div><div class=\"card accent-bar\" style=\"border-left-color:var(--azul)\"><h3>Ponderar</h3><p>Dar más peso a los grupos que faltan: peso = % en la población ÷ % en la muestra. Solo corrige lo que se conoce y se mide.</p></div><div class=\"card accent-bar\" style=\"border-left-color:#0A8F7B\"><h3>Calidad de los datos</h3><p>Preguntas de atención, tiempos mínimos, revisar respuestas abiertas y decidir (y preregistrar) los criterios de exclusión antes de ver los datos. Ojo con los bots y agentes de IA.</p></div></div>"
  },
  {
   "id": "tamano",
   "titulo": "Tamaño de la muestra",
   "sub": "Margen de error y potencia",
   "html": "<div class=\"sec\">Para estimar un porcentaje: el margen de error</div><div class=\"scroll-x\"><table class=\"tabla\"><tr><th>Tamaño de la muestra</th><th>Margen de error (95 %)</th></tr><tr><td>100</td><td>± 9,8 puntos</td></tr><tr><td>400</td><td>± 4,9 puntos</td></tr><tr><td>1.000</td><td>± 3,1 puntos</td></tr><tr><td>2.500</td><td>± 2,0 puntos</td></tr></table></div><div class=\"callout info\">Con n = 100, si el 27 % opina que debería legalizarse el cannabis, el valor real estaría entre el 17 % y el 37 %. Para reducir el error a la mitad, hay que <b>cuadruplicar</b> la muestra.</div><div class=\"sec\">Para detectar un efecto: la potencia</div><div class=\"definicion\"><b>Potencia estadística.</b> probabilidad de detectar un efecto si realmente existe. Se suele exigir al menos un 80 %.</div><div class=\"scroll-x\"><table class=\"tabla\"><tr><th>Objetivo</th><th>Efecto esperado</th><th>Muestra (α = .05, potencia 80 %)</th></tr><tr><td>Comparar dos grupos</td><td>Medio (d = 0,5)</td><td>64 por grupo</td></tr><tr><td>Comparar dos grupos</td><td>Pequeño (d = 0,2)</td><td>394 por grupo</td></tr><tr><td>Detectar una correlación</td><td>r = .30</td><td>84 personas</td></tr><tr><td>Detectar una correlación</td><td>r = .10</td><td>782 personas</td></tr></table></div><div class=\"callout ok\">Justifica el tamaño (Lakens, 2022): población entera, recursos disponibles, potencia o precisión. SEM: varios cientos de personas. Cualitativa: saturación. Pruébalo en el <a href=\"#simulador/potencia\">simulador de potencia</a> y en el <a href=\"#simulador/muestreo\">laboratorio de muestreo</a>.</div>"
  },
  {
   "id": "cuestionarios",
   "titulo": "Cuestionarios y entrevistas",
   "sub": "Cómo preguntar",
   "html": "<div class=\"scroll-x\"><table class=\"tabla\"><tr><th></th><th>Cuestionario</th><th>Entrevista estructurada</th><th>Entrevista no estructurada</th></tr><tr><td>¿Entrevistador?</td><td>No</td><td>Sí</td><td>Sí</td></tr><tr><td>¿Preguntas fijas?</td><td>Sí</td><td>Sí</td><td>No: temas guía</td></tr><tr><td>Tipo de pregunta</td><td>Sobre todo cerradas</td><td>Abiertas o cerradas</td><td>Abiertas</td></tr><tr><td>Codificación</td><td>Muy fácil</td><td>Intermedia</td><td>Laboriosa</td></tr></table></div><div class=\"sec\">Una buena pregunta es clara, neutral y pregunta una sola cosa</div><div class=\"scroll-x\"><table class=\"tabla\"><tr><th>Error</th><th>Mejor no…</th><th>Mejor así</th></tr><tr><td>Dos en una</td><td>¿Estás satisfecho con tus profesores y con los horarios?</td><td>Dos preguntas separadas</td></tr><tr><td>Induce la respuesta</td><td>¿No crees que las redes perjudican a los jóvenes?</td><td>¿Qué efecto crees que tienen las redes en los jóvenes?</td></tr><tr><td>Negación doble</td><td>¿No estás en desacuerdo con no prohibir el móvil?</td><td>¿Estás de acuerdo con prohibir el móvil en clase?</td></tr><tr><td>Da algo por supuesto</td><td>¿Cuántas horas al día pierdes en redes?</td><td>¿Cuántas horas al día usas redes sociales?</td></tr></table></div><div class=\"card-grid\"><div class=\"card\"><h3>Escala y orden</h3><p>Likert de 5 o 7 puntos con etiquetas; decidir punto medio y «no sé». De lo general a lo concreto; lo delicado y los datos personales, al final.</p></div><div class=\"card\"><h3>Sesgos de respuesta</h3><p>Deseabilidad social, aquiescencia, tendencia central o extrema y fatiga. Se reducen con anonimato, ítems invertidos y cuestionarios breves.</p></div><div class=\"card\"><h3>Pretest y entrevista cognitiva</h3><p>Probar antes con un grupo pequeño: «¿qué has entendido por…?». Mejor un instrumento validado; si viene de otro idioma, adaptarlo, no solo traducirlo.</p></div></div><div class=\"scroll-x\"><table class=\"tabla\"><tr><th>Medio</th><th>Coste</th><th>Tasa de respuesta</th><th>Control de quién responde</th><th>Deseabilidad social</th></tr><tr><td>Presencial</td><td>Alto</td><td>Alta</td><td>Alto</td><td>Más alta</td></tr><tr><td>Teléfono</td><td>Medio</td><td>Media-baja</td><td>Medio</td><td>Media</td></tr><tr><td>Correo</td><td>Bajo</td><td>Baja</td><td>Bajo</td><td>Baja</td></tr><tr><td>Online</td><td>Muy bajo</td><td>Variable</td><td>Bajo</td><td>Baja</td></tr></table></div><div class=\"callout info\">La <b>entrevista semiestructurada</b> (guion de temas con libertad para profundizar) es la más usada en investigación cualitativa (Semana 3).</div>"
  },
  {
   "id": "observacion",
   "titulo": "Observación y nuevas fuentes",
   "sub": "Registrar lo que la gente hace",
   "html": "<div class=\"scroll-x\"><table class=\"tabla\"><tr><th>Contexto \\ Papel</th><th>No participante</th><th>Participante</th></tr><tr><td>Natural</td><td>Juego de niños en el recreo, desde fuera</td><td>Un voluntario que estudia la dinámica de un centro</td></tr><tr><td>Preparado</td><td>Interacción madre-hijo grabada en una sala</td><td>Juego de rol en el que interviene el investigador</td></tr></table></div><div class=\"card-grid\"><div class=\"card\"><h3>Sistema de categorías</h3><p>Lista de conductas definidas con ejemplos. <b>Exhaustivas</b> (cubren todo) y <b>mutuamente excluyentes</b> (cada conducta, en una sola).</p></div><div class=\"card\"><h3>Registro</h3><p>Continuo (todo), por intervalos (¿aparece en cada tramo de 10 s?) o muestreo de tiempo (1 minuto de cada 10).</p></div><div class=\"card\"><h3>Reactividad</h3><p>Las personas cambian si saben que las observan. Habituación, observadores discretos o grabaciones.</p></div></div><div class=\"definicion\"><b>Kappa de Cohen.</b> acuerdo entre dos observadores <b>corregido por el azar</b>. Orientativo: > .60 aceptable; > .80 muy bueno. En JASP: Frecuencias → Fiabilidad entre observadores.</div><div class=\"card-grid\"><div class=\"card\"><h3>Muestreo de experiencias (EMA)</h3><p>Preguntas breves en el móvil varias veces al día: menos sesgo de memoria y más validez ecológica.</p></div><div class=\"card\"><h3>Sensores pasivos</h3><p>Tiempo de pantalla, pasos o sueño registrados sin preguntar.</p></div><div class=\"card\"><h3>Traza digital</h3><p>Publicaciones y búsquedas. Riesgos: privacidad y uso de datos sensibles.</p></div></div><div class=\"callout ok\">Pruébalo en el <a href=\"#simulador/kappa\">simulador de acuerdo entre observadores</a>. Para el Proyecto INDAGA, usa el <a href=\"#indaga\">Taller del Método</a>.</div>"
  }
 ],
 "flash": [
  {
   "t": "¿Qué es una muestra representativa?",
   "d": "Un subconjunto con las <strong>mismas características generales</strong> que la población."
  },
  {
   "t": "¿Qué enseña el caso Literary Digest?",
   "d": "Que una muestra <strong>enorme pero sesgada</strong> es peor que una pequeña bien elegida."
  },
  {
   "t": "¿Qué define el muestreo probabilístico?",
   "d": "Que la probabilidad de cada elemento de entrar es <strong>conocida</strong>, lo que permite calcular el error."
  },
  {
   "t": "Estratificado frente a conglomerados",
   "d": "Estratificado: personas <strong>de todos</strong> los grupos. Conglomerados: <strong>algunos grupos</strong> completos."
  },
  {
   "t": "¿Qué es la afijación proporcional?",
   "d": "Cada estrato pesa en la muestra lo mismo que en la población."
  },
  {
   "t": "¿Cuándo usar bola de nieve?",
   "d": "Con <strong>poblaciones ocultas</strong> o difíciles de localizar: cada participante recluta a otros."
  },
  {
   "t": "¿Cómo se reduce a la mitad el margen de error?",
   "d": "<strong>Cuadruplicando</strong> la muestra."
  },
  {
   "t": "¿Qué es la potencia estadística?",
   "d": "La probabilidad de <strong>detectar un efecto</strong> si existe. Se suele exigir el 80 %."
  },
  {
   "t": "Cuatro errores de redacción de preguntas",
   "d": "Dos en una, inducir la respuesta, negación doble y dar algo por supuesto."
  },
  {
   "t": "¿Qué es la deseabilidad social?",
   "d": "Responder lo que «queda bien» en lugar de lo que se piensa o se hace."
  },
  {
   "t": "¿Para qué sirve la entrevista cognitiva?",
   "d": "Para descubrir cómo <strong>entienden</strong> las personas cada pregunta antes de aplicar el cuestionario."
  },
  {
   "t": "¿Qué corrige el kappa de Cohen?",
   "d": "El acuerdo entre observadores que se debería al <strong>azar</strong>."
  }
 ],
 "test": [
  {
   "q": "Se quiere encuestar a 40 de los 300 estudiantes de Psicología asegurando que todos los cursos estén representados en su proporción. ¿Qué muestreo conviene?",
   "o": [
    "Estratificado con afijación proporcional",
    "Por conglomerados",
    "Bola de nieve"
   ],
   "a": 0,
   "fb": "Los cursos son estratos y se elige al azar dentro de cada uno, en proporción a su tamaño."
  },
  {
   "q": "Para una encuesta nacional se sortean municipios, dentro de ellos secciones censales y, en ellas, hogares. ¿Qué muestreo es?",
   "o": [
    "Aleatorio simple",
    "Polietápico",
    "Por cuotas"
   ],
   "a": 1,
   "fb": "Varias etapas de conglomerados encadenadas hasta llegar a la persona."
  },
  {
   "q": "Un TFG difunde un cuestionario por Instagram y responden sobre todo mujeres jóvenes universitarias. ¿Qué limita más sus conclusiones?",
   "o": [
    "El margen de error de las preguntas abiertas",
    "La autoselección de una muestra de conveniencia",
    "La falta de un grupo de control"
   ],
   "a": 1,
   "fb": "Es una muestra de conveniencia: no permite generalizar a la población general."
  },
  {
   "q": "Con n = 100, el margen de error de un porcentaje es de unos ±10 puntos. ¿Qué muestra hace falta para unos ±5?",
   "o": [
    "Unas 200 personas",
    "Unas 400 personas",
    "Unas 1.000 personas"
   ],
   "a": 1,
   "fb": "El error depende de la raíz de n: para reducirlo a la mitad hay que cuadruplicar la muestra."
  },
  {
   "q": "Se espera una correlación pequeña (r = .10) entre dos variables. ¿Qué implica para el tamaño de la muestra?",
   "o": [
    "Basta con unas 30 personas",
    "Hacen falta cientos de personas para tener una potencia aceptable",
    "El tamaño no influye en la potencia"
   ],
   "a": 1,
   "fb": "Con α = .05 y potencia del 80 % harían falta unas 780 personas."
  },
  {
   "q": "¿Qué problema tiene la pregunta «¿No crees que las redes perjudican a los jóvenes?»?",
   "o": [
    "Pregunta dos cosas a la vez",
    "Induce la respuesta",
    "Usa una escala demasiado larga"
   ],
   "a": 1,
   "fb": "La formulación sugiere la respuesta esperada; mejor: «¿Qué efecto crees que tienen…?»."
  },
  {
   "q": "Dos observadores coinciden en el 90 % de los intervalos, pero la conducta casi nunca aparece. ¿Qué índice informa mejor de su acuerdo?",
   "o": [
    "El porcentaje de acuerdo",
    "El kappa de Cohen",
    "La correlación de Pearson"
   ],
   "a": 1,
   "fb": "Kappa corrige el acuerdo que se daría por azar, que es alto cuando la conducta es rara."
  },
  {
   "q": "Unos niños se comportan de otra forma los primeros días porque saben que los observan. ¿Cómo se llama el problema?",
   "o": [
    "Reactividad",
    "Aquiescencia",
    "Efecto de cohorte"
   ],
   "a": 0,
   "fb": "Se reduce con periodos de habituación u observación discreta."
  }
 ],
 "glosario": [
  {
   "es": "Marco muestral",
   "en": "Sampling frame",
   "def": "Lista o fuente desde la que se eligen los participantes."
  },
  {
   "es": "Muestreo estratificado",
   "en": "Stratified sampling",
   "def": "Muestreo al azar dentro de grupos (estratos) definidos de antemano."
  },
  {
   "es": "Muestreo por conglomerados",
   "en": "Cluster sampling",
   "def": "Se sortean grupos enteros en lugar de personas."
  },
  {
   "es": "Margen de error",
   "en": "Margin of error",
   "def": "Cuánto puede diferir el resultado de la muestra del valor de la población."
  },
  {
   "es": "Potencia estadística",
   "en": "Statistical power",
   "def": "Probabilidad de detectar un efecto si existe."
  },
  {
   "es": "Entrevista cognitiva",
   "en": "Cognitive interviewing",
   "def": "Técnica de pretest para saber cómo se entienden las preguntas."
  },
  {
   "es": "Kappa de Cohen",
   "en": "Cohen's kappa",
   "def": "Acuerdo entre observadores corregido por el azar."
  }
 ],
 "emparejar": [
  {
   "label": "Set M1 · Técnicas de muestreo",
   "pairs": [
    {
     "left": "Se sortean 30 colegios y se encuesta a todos sus alumnos de 4.º de ESO",
     "right": "Por conglomerados",
     "exp": "La unidad sorteada es el colegio."
    },
    {
     "left": "De una lista de 3.000, se elige al azar el 7 y luego uno de cada 10",
     "right": "Sistemático",
     "exp": "k = N/n = 10 con inicio aleatorio."
    },
    {
     "left": "50 hombres y 50 mujeres por franja de edad, sin sorteo",
     "right": "Por cuotas",
     "exp": "Se parecen al estratificado, pero sin azar."
    },
    {
     "left": "Cada persona con una enfermedad rara recluta a otras",
     "right": "Bola de nieve",
     "exp": "Útil con poblaciones ocultas."
    }
   ]
  },
  {
   "label": "Set M2 · Instrumentos y sesgos",
   "pairs": [
    {
     "left": "Responder lo que queda bien",
     "right": "Deseabilidad social",
     "exp": "Se reduce con anonimato y preguntas indirectas."
    },
    {
     "left": "Decir «de acuerdo» a todo",
     "right": "Aquiescencia",
     "exp": "Se detecta con ítems redactados en sentido inverso."
    },
    {
     "left": "«¿Qué has entendido por uso problemático?»",
     "right": "Entrevista cognitiva",
     "exp": "Forma de pretest del cuestionario."
    },
    {
     "left": "Guion de temas con libertad para profundizar",
     "right": "Entrevista semiestructurada",
     "exp": "La más usada en investigación cualitativa."
    }
   ]
  }
 ],
 "simuladores": [
  "muestreo",
  "potencia",
  "kappa"
 ]
});
