/* Unidad «La lógica del experimento». Estado: activa | en-preparacion | oculta (se puede cambiar también en datos/configuracion.js). */
Brujula.unidad({
 "orden": 1,
 "bloque": "Bloque I · Fundamentos",
 "tema": "Semanas 1-2",
 "titulo": "Método científico y tradiciones",
 "icono": "🧭",
 "color": "#001447",
 "estado": "activa",
 "libro": "León y Montero (2020), caps. 1-2 y 6",
 "resumen": "Qué hace científico un conocimiento, cómo se formula una hipótesis contrastable, qué permite concluir cada tipo de pregunta y en qué se diferencian las tradiciones cuantitativa y cualitativa.",
 "secciones": [
  {
   "id": "metodo",
   "titulo": "El método científico",
   "sub": "Semana 1 · León y Montero, cap. 1 · complemento",
   "html": "<div class=\"callout info\"><strong>Idea clave:</strong> lo que hace científico un conocimiento no es el tema que estudia, sino el <strong>procedimiento</strong> con el que se obtiene y se justifica.</div><div class=\"card-grid\"><div class=\"card accent-bar\" style=\"border-left-color:var(--uc)\"><h3>🔍 Empírico</h3><p>Las afirmaciones se contrastan con observaciones, no con la autoridad, la tradición o la intuición.</p></div><div class=\"card accent-bar\" style=\"border-left-color:var(--uc)\"><h3>🧩 Sistemático y controlado</h3><p>Se decide de antemano qué observar, cómo medirlo y cómo descartar explicaciones alternativas.</p></div><div class=\"card accent-bar\" style=\"border-left-color:var(--uc)\"><h3>📢 Público y replicable</h3><p>Se comunica con detalle suficiente para que otros puedan repetirlo y criticarlo.</p></div><div class=\"card accent-bar\" style=\"border-left-color:var(--uc)\"><h3>♻️ Autocorrectivo</h3><p>Las hipótesis deben poder resultar falsas: los datos nuevos pueden corregir lo que creíamos.</p></div></div><div class=\"sec\">Otras formas de conocer (y sus límites)</div><table><tr><th>Fuente</th><th>Ejemplo</th><th>Problema</th></tr><tr><td>Autoridad</td><td>«Lo dice mi profesor»</td><td>No se comprueba; depende de quién lo dice.</td></tr><tr><td>Tradición o tenacidad</td><td>«Siempre se ha hecho así»</td><td>Se mantiene aunque los datos digan lo contrario.</td></tr><tr><td>Experiencia personal</td><td>«Lo veo todos los días»</td><td>Observación no sistemática, sujeta a sesgos de confirmación.</td></tr><tr><td>Razonamiento sin datos</td><td>«Es lógico que…»</td><td>Una deducción correcta puede partir de premisas falsas.</td></tr></table>"
  },
  {
   "id": "proceso",
   "titulo": "El proceso de investigación",
   "sub": "Semana 1 · de la pregunta a la comunicación",
   "html": "<div class=\"step-row\"><div class=\"step-box\" style=\"border-color:var(--uc)\">Problema</div><span class=\"step-arr\">→</span><div class=\"step-box\" style=\"border-color:var(--uc)\">Hipótesis o pregunta</div><span class=\"step-arr\">→</span><div class=\"step-box\" style=\"border-color:var(--uc)\">Procedimiento</div><span class=\"step-arr\">→</span><div class=\"step-box\" style=\"border-color:var(--uc)\">Datos</div><span class=\"step-arr\">→</span><div class=\"step-box\" style=\"border-color:var(--uc)\">Análisis</div><span class=\"step-arr\">→</span><div class=\"step-box\" style=\"border-color:var(--uc)\">Conclusiones y comunicación</div></div><p>Cada decisión condiciona la siguiente: el análisis depende del diseño y el diseño depende de la pregunta.</p><div class=\"card-grid\"><div class=\"card accent-bar\" style=\"border-left-color:var(--uc)\"><h3>🎯 Hipótesis contrastable</h3><p>Relaciona variables definidas y dice qué resultado la contradiría. «La música influye de algún modo» no lo es; «escuchar música con letra reduce el recuerdo de un texto» sí.</p></div><div class=\"card accent-bar\" style=\"border-left-color:var(--uc)\"><h3>📏 Definición operativa</h3><p>Traduce un concepto en una operación concreta: «ansiedad» = puntuación en el STAI-Estado antes de una exposición oral.</p></div><div class=\"card accent-bar\" style=\"border-left-color:var(--uc)\"><h3>🧪 Variables</h3><p>VI (lo que se manipula o compara), VD (lo que se mide) y variables extrañas (lo que puede influir en la VD y hay que controlar).</p></div></div>"
  },
  {
   "id": "niveles",
   "titulo": "Describir, relacionar, explicar",
   "sub": "Semana 1 · qué tipo de conclusión permite cada pregunta",
   "html": "<table><tr><th>Objetivo</th><th>Pregunta típica</th><th>Qué permite concluir</th></tr><tr><td><b>Describir</b></td><td>¿Cuántas horas usan el móvil los estudiantes?</td><td>Cómo es algo: medias, porcentajes.</td></tr><tr><td><b>Relacionar</b></td><td>¿Quien más usa el móvil duerme menos?</td><td>Que dos variables varían juntas. No qué causa qué.</td></tr><tr><td><b>Explicar</b></td><td>¿Dejar el móvil fuera del aula <i>produce</i> mejor comprensión?</td><td>Una relación causal, si se manipula la VI y se controlan las alternativas.</td></tr><tr><td><b>Comprender</b></td><td>¿Qué significa para ellos «estar siempre conectado»?</td><td>El sentido que las personas dan a su experiencia (tradición cualitativa).</td></tr></table><div class=\"callout warn\"><strong>Para hablar de causa</strong> hacen falta tres condiciones: <strong>covariación</strong> (varían juntas), <strong>antecedencia</strong> (la causa va antes) y <strong>eliminación de explicaciones alternativas</strong>. La tercera es la que consigue el experimento.</div>"
  },
  {
   "id": "tradiciones",
   "titulo": "Tradición cuantitativa y cualitativa",
   "sub": "Semana 2 · dos maneras de preguntar",
   "html": "<table><tr><th></th><th>Cuantitativa</th><th>Cualitativa</th></tr><tr><td><b>Objetivo</b></td><td>Describir, relacionar o explicar midiendo variables.</td><td>Comprender significados y experiencias desde quienes los viven.</td></tr><tr><td><b>Lógica</b></td><td>Sobre todo deductiva: teoría → hipótesis → datos.</td><td>Sobre todo inductiva: datos → categorías → teoría.</td></tr><tr><td><b>Datos</b></td><td>Números.</td><td>Palabras, imágenes, observaciones.</td></tr><tr><td><b>Participantes</b></td><td>Muestras amplias; probabilísticas si se quiere generalizar.</td><td>Pocos casos elegidos intencionalmente, hasta la saturación.</td></tr><tr><td><b>Investigador</b></td><td>Minimiza su influencia (control, ciego).</td><td>Forma parte del proceso y lo explicita (reflexividad).</td></tr><tr><td><b>Diseño</b></td><td>Cerrado, decidido antes de empezar.</td><td>Flexible y emergente.</td></tr><tr><td><b>Alcance</b></td><td>Generalización estadística.</td><td>Transferibilidad a contextos similares.</td></tr></table><div class=\"callout ok\"><strong>No compiten:</strong> responden a preguntas distintas. Los <strong>métodos mixtos</strong> las combinan: <em>explicativo</em> (cuestionario → entrevistas para explicar sus resultados) o <em>exploratorio</em> (entrevistas → cuestionario construido con sus categorías).</div>"
  },
  {
   "id": "idea",
   "titulo": "Idea central",
   "sub": "De la pregunta al diseño",
   "html": "<div class=\"callout info\"><strong>Idea central:</strong> En todo experimento el investigador manipula la <strong>VI</strong> para comprobar si influye en la <strong>VD</strong>. Las medidas pueden provenir de <strong>grupos distintos</strong> (inter-grupos, medidas independientes) o del <strong>mismo grupo</strong> (intra-grupo, medidas repetidas). Esta decisión define la familia de diseño.</div>"
  },
  {
   "id": "propiedades",
   "titulo": "Propiedades de todo experimento",
   "sub": "León y Montero, cap. 6",
   "html": "\n  <div class=\"card-grid\">\n    <div class=\"card\"><h3>🔁 Fiabilidad</h3><p>Al <strong>replicar</strong> el experimento con las mismas condiciones se obtienen los mismos resultados.</p></div>\n    <div class=\"card\"><h3>📡 Sensibilidad</h3><p>Los cambios en la VI se <strong>reflejan</strong> en la VD. Los instrumentos deben detectar esos cambios.</p></div>\n    <div class=\"card\"><h3>✅ Validez interna</h3><p>Los cambios en la VD se pueden <strong>atribuir con seguridad</strong> a la VI, descartando explicaciones alternativas.</p></div>\n    <div class=\"card\"><h3>🌐 Validez externa</h3><p>Capacidad de <strong>generalizar</strong> los resultados a otros contextos, sujetos o momentos.</p></div>\n  </div>"
  }
 ],
 "flash": [
  {
   "t": "Variable Independiente (VI)",
   "d": "Factor que el investigador manipula para comprobar si produce cambios en la VD. El investigador establece sus niveles antes del experimento."
  },
  {
   "t": "Variable Dependiente (VD)",
   "d": "Medida del efecto que se atribuye a los cambios en la VI. Es la variable observada y registrada como resultado."
  },
  {
   "t": "Fiabilidad del experimento",
   "d": "Al replicar el experimento con las mismas condiciones se obtienen los mismos resultados."
  },
  {
   "t": "Sensibilidad del experimento",
   "d": "Las manipulaciones de la VI se reflejan en cambios en la VD. Los instrumentos de medida deben ser finos para detectar esos cambios."
  },
  {
   "t": "Validez interna",
   "d": "Propiedad por la que los cambios en la VD se pueden atribuir con seguridad a las manipulaciones de la VI, descartando explicaciones alternativas."
  },
  {
   "t": "Validez externa",
   "d": "Poder de generalización de los resultados a otros contextos, sujetos o momentos. Vinculada a la representatividad de la muestra."
  },
  {
   "t": "Inter-grupos vs Intra-grupo",
   "d": "Inter-grupos: distintos participantes en cada condición (medidas independientes). Intra-grupo: los mismos en todas las condiciones (medidas repetidas)."
  },
  {
   "t": "¿Qué es la validez ecológica?",
   "d": "El grado en que los resultados de un estudio se pueden <strong>generalizar a situaciones de la vida real</strong>. Alta en estudios naturalistas, baja en experimentos de laboratorio muy controlados."
  },
  {
   "t": "¿Qué es la validez interna de un diseño?",
   "d": "El grado en que los cambios en la <strong>variable dependiente</strong> pueden atribuirse realmente a la <strong>variable independiente</strong> y no a otras variables extrañas. Máxima en experimentos con aleatorización."
  },
  {
   "t": "¿Qué es la validez externa?",
   "d": "El grado en que los resultados del estudio <strong>se pueden generalizar</strong> a otras poblaciones, contextos y momentos. Generalmente, a mayor control experimental, menor validez externa."
  },
  {
   "t": "Hipótesis contrastable",
   "d": "Relaciona variables definidas operativamente y especifica qué resultado la contradiría."
  },
  {
   "t": "Definición operativa",
   "d": "Indica las operaciones concretas con las que se mide o manipula una variable en un estudio."
  },
  {
   "t": "Covariación, antecedencia y control",
   "d": "Las tres condiciones para atribuir causalidad: varían juntas, la causa va antes y se eliminan las explicaciones alternativas."
  },
  {
   "t": "Transferibilidad",
   "d": "Criterio de alcance cualitativo: la descripción detallada del contexto permite valorar si los hallazgos se aplican a situaciones parecidas."
  },
  {
   "t": "Métodos mixtos",
   "d": "Combinan fases cuantitativas y cualitativas. Explicativo: cuanti → cuali. Exploratorio: cuali → cuanti."
  }
 ],
 "test": [
  {
   "q": "Un experimento mide el efecto de 2h vs 8h de sueño sobre la memoria. ¿Qué es la VI?",
   "o": [
    "La memoria",
    "La duración del sueño",
    "El número de sujetos",
    "La distribución en grupos"
   ],
   "a": 1,
   "fb": "La VI es lo que el investigador manipula: la duración del sueño. La memoria es la VD (lo que se mide)."
  },
  {
   "q": "¿Cuándo se considera que un experimento tiene alta validez interna?",
   "o": [
    "Cuando se generaliza a otros contextos",
    "Cuando los cambios en la VD se atribuyen con seguridad a la VI",
    "Cuando la muestra es representativa",
    "Cuando ha sido replicado muchas veces"
   ],
   "a": 1,
   "fb": "La validez interna hace referencia a la atribución causal. La generalización es la validez externa."
  },
  {
   "q": "Un investigador observa que los alumnos de matemáticas rinden mejor en el segundo semestre. Este cambio podría deberse simplemente a que han madurado. Esta amenaza se llama:",
   "o": [
    "Historia",
    "Maduración",
    "Regresión a la media",
    "Instrumentación"
   ],
   "a": 1,
   "fb": "La maduración se refiere a los cambios que ocurren en los participantes con el paso del tiempo (crecimiento, aprendizaje, fatiga) independientemente de la variable independiente."
  },
  {
   "q": "¿Qué rasgo distingue el conocimiento científico de la opinión de un experto?",
   "o": [
    "Que procede de alguien con un título universitario",
    "Que se obtiene con un procedimiento sistemático, público y replicable",
    "Que se publica en un medio de comunicación",
    "Que nadie lo pone en duda"
   ],
   "a": 1,
   "fb": "Lo científico es el procedimiento, no quién lo dice."
  },
  {
   "q": "¿Cuál de estas hipótesis es contrastable?",
   "o": [
    "El estrés afecta de algún modo a las personas",
    "Dormir menos de 6 horas reduce los aciertos en una prueba de atención",
    "La memoria es compleja",
    "Cada persona vive el estrés a su manera"
   ],
   "a": 1,
   "fb": "Define VI, VD y dirección: dice qué resultado la contradiría."
  },
  {
   "q": "Una encuesta encuentra que quien más estudia saca mejores notas. ¿Qué tipo de conclusión permite?",
   "o": [
    "Causal",
    "De asociación",
    "Cualitativa",
    "Ninguna"
   ],
   "a": 1,
   "fb": "Sin manipulación ni control de alternativas, solo asociación."
  },
  {
   "q": "¿Qué tradición encaja con «comprender cómo viven el duelo las madres tras una pérdida perinatal»?",
   "o": [
    "Cuantitativa experimental",
    "Cuantitativa descriptiva",
    "Cualitativa",
    "Ninguna"
   ],
   "a": 2,
   "fb": "Busca comprender una experiencia desde quien la vive."
  },
  {
   "q": "Un cuestionario a 500 personas seguido de entrevistas a 15 para explicar sus resultados es un diseño…",
   "o": [
    "Mixto secuencial explicativo",
    "Mixto secuencial exploratorio",
    "Cualitativo puro",
    "Experimental"
   ],
   "a": 0,
   "fb": "Primero cuantitativo, después cualitativo para explicar."
  }
 ],
 "glosario": [
  {
   "es": "Variable independiente",
   "en": "Independent variable (IV)",
   "def": "Variable que el investigador manipula deliberadamente."
  },
  {
   "es": "Variable dependiente",
   "en": "Dependent variable (DV)",
   "def": "Variable que se mide para ver el efecto de la manipulación."
  },
  {
   "es": "Validez interna",
   "en": "Internal validity",
   "def": "Grado en que los cambios en la VD pueden atribuirse realmente a la VI."
  },
  {
   "es": "Validez externa",
   "en": "External validity",
   "def": "Grado en que los resultados son generalizables a otros contextos y poblaciones."
  },
  {
   "es": "Validez ecológica",
   "en": "Ecological validity",
   "def": "Grado en que los resultados se pueden generalizar a situaciones de la vida real."
  },
  {
   "es": "Efecto del observador",
   "en": "Hawthorne effect",
   "def": "Los participantes cambian su conducta al saber que están siendo observados."
  },
  {
   "es": "Efecto de maduración",
   "en": "Maturation effect",
   "def": "Cambios en los participantes con el tiempo, independientes de la variable independiente."
  },
  {
   "es": "Historia",
   "en": "History",
   "def": "Eventos externos entre pretest y postest que pueden afectar a la variable dependiente."
  },
  {
   "es": "Regresión a la media",
   "en": "Regression to the mean",
   "def": "Las puntuaciones extremas tienden a ser menos extremas en una segunda medición."
  }
 ],
 "emparejar": [
  {
   "label": "Set 4 · Conceptos",
   "pairs": [
    {
     "left": "\"El choque emocional impide el recuerdo porque el foco atencional se estrecha sobre el estímulo traumático\"",
     "right": "Discusión / explicación teórica",
     "exp": "Esta es la fase de discusión: se propone una explicación teórica del mecanismo que produce los resultados observados."
    },
    {
     "left": "Se selecciona al azar a 500 personas del padrón municipal para encuestarles",
     "right": "Selección aleatoria",
     "exp": "La selección aleatoria busca representatividad de la población para la validez externa."
    },
    {
     "left": "Todos los sujetos ven la película en la misma sala, con el mismo televisor y a la misma hora del día",
     "right": "Control por constancia",
     "exp": "Se mantiene el mismo valor de las VE potenciales en todos los participantes para que no afecten a la VD."
    },
    {
     "left": "La luz extra mejora 8 puntos a quienes también hacen esquí (de 2 a 10) y solo 2 puntos a quienes no lo hacen (de 2 a 4)",
     "right": "Interacción entre VIs",
     "exp": "El efecto de la luz extra varía según el nivel de la otra VI (ejercicio). Las líneas NO son paralelas → interacción."
    }
   ]
  }
 ],
 "simuladores": [],
 "amenazas": true,
 "id": "fund"
});
