/* Mapa de diseños, árbol de decisión y amenazas a la validez (todo el curso). */
Brujula.mapa({
 "disenos": [
  {
   "id": "expg",
   "name": "Experimento entre grupos",
   "tema": "Tema 4",
   "color": "#f472b6",
   "manVi": "Sí",
   "aleat": "Sí",
   "vi": "Alta",
   "ve": "Media",
   "caus": "Sí",
   "trad": "Cuantitativa",
   "cuando": "Cuando puedes asignar aleatoriamente y cada sujeto solo puede estar en una condición.",
   "no": "Cuando tienes pocos participantes o no puedes aleatorizar.",
   "pregunta": "¿El mindfulness reduce la ansiedad respecto a no recibirlo?",
   "unidad": "t4",
   "icono": "⚗️",
   "etiqueta": "Entre sujetos",
   "sub": "Cada participante en una sola condición · Asignación aleatoria",
   "que": "Diseño en que cada sujeto pertenece a una sola condición experimental. La asignación aleatoria garantiza la equivalencia inicial de los grupos. También llamado diseño entre sujetos (en inglés: between-subjects design).",
   "ejemplo": "Miguel asigna al azar 60 estudiantes: 30 reciben un programa de mindfulness durante 8 semanas y 30 no. Compara la ansiedad al final.",
   "pros": [
    "Alta validez interna",
    "Sin efectos de práctica"
   ],
   "contras": [
    "Requiere muchos participantes",
    "Variabilidad entre sujetos"
   ],
   "claves": [
    "Aleatorización",
    "Grupo control",
    "Variable independiente",
    "Variable dependiente"
   ]
  },
  {
   "id": "expm",
   "name": "Experimento mismo grupo",
   "tema": "Tema 5",
   "color": "#facc15",
   "manVi": "Sí",
   "aleat": "Sí",
   "vi": "Alta",
   "ve": "Media",
   "caus": "Sí",
   "trad": "Cuantitativa",
   "cuando": "Cuando los mismos sujetos pueden pasar por todas las condiciones sin que una afecte irreversiblemente a la otra.",
   "no": "Cuando hay aprendizaje irreversible o efectos de arrastre imposibles de controlar.",
   "pregunta": "¿Rinde más la memoria con música o sin música?",
   "unidad": "t5",
   "icono": "🔄",
   "etiqueta": "Intrasujeto",
   "sub": "El mismo participante en todas las condiciones · Requiere contrabalanceo",
   "que": "Todos los participantes pasan por todas las condiciones. El sujeto actúa como su propio control. Requiere reequilibrado (contrabalanceo) (ej. cuadrado latino) para neutralizar los efectos de orden, práctica y arrastre entre condiciones. En inglés: within-subjects design.",
   "ejemplo": "Miguel estudia si la música afecta la memoria: todos realizan la tarea con y sin música, en orden contrabalanceado.",
   "pros": [
    "Controla diferencias individuales",
    "Necesita menos participantes"
   ],
   "contras": [
    "Efectos de orden y práctica",
    "Inviable si el aprendizaje es irreversible"
   ],
   "claves": [
    "Reequilibrado",
    "Efecto de la práctica",
    "Persistencia diferencial",
    "Cuadrado latino"
   ]
  },
  {
   "id": "fact",
   "name": "Diseño factorial",
   "tema": "Tema 6",
   "color": "#fb923c",
   "manVi": "Sí (varias)",
   "aleat": "Sí",
   "vi": "Alta",
   "ve": "Media",
   "caus": "Sí",
   "trad": "Cuantitativa",
   "cuando": "Cuando quieres estudiar simultáneamente el efecto de dos o más variables y sus interacciones.",
   "no": "Cuando solo tienes una variable independiente.",
   "pregunta": "¿El efecto del tipo de retroalimentación depende de la dificultad de la tarea?",
   "unidad": "t6",
   "icono": "🔢",
   "etiqueta": "Factorial",
   "sub": "Dos o más variables independientes · Permite estudiar interacciones",
   "que": "Incluye simultáneamente dos o más factores (variables independientes). Un diseño 2×2 tiene 2 factores con 2 niveles cada uno → 4 condiciones. Lo más valioso es la interacción: el efecto de un factor depende del nivel del otro. En inglés: factorial design.",
   "ejemplo": "Miguel estudia retroalimentación (positiva / negativa) × dificultad de la tarea (fácil / difícil) sobre el rendimiento: diseño factorial 2×2, 4 condiciones.",
   "pros": [
    "Eficiente: varios factores a la vez",
    "Detecta interacciones"
   ],
   "contras": [
    "Mayor complejidad analítica",
    "Necesita más participantes"
   ],
   "claves": [
    "Interacción",
    "Efecto principal",
    "Diseño 2×2",
    "Análisis de varianza factorial"
   ]
  },
  {
   "id": "caso",
   "name": "Diseño caso único (N=1)",
   "tema": "Tema 7",
   "color": "#c084fc",
   "manVi": "Sí",
   "aleat": "No",
   "vi": "Media",
   "ve": "Baja",
   "caus": "Sí en ABAB y línea base múltiple; no en AB",
   "trad": "Cuantitativa",
   "cuando": "Cuando trabajas con un solo sujeto (contexto clínico, modificación de conducta) y puedes replicar la intervención.",
   "no": "Cuando necesitas generalizar a una población.",
   "pregunta": "¿El programa de economía de fichas reduce las conductas disruptivas de este niño?",
   "unidad": "t7",
   "icono": "👤",
   "etiqueta": "Intrasujeto",
   "sub": "Un solo participante · Replicación intrasujeto a lo largo del tiempo",
   "que": "Permite establecer causalidad con un solo participante mediante replicación a lo largo del tiempo. Se alterna la presencia/ausencia del tratamiento (diseño A-B-A-B; si no se puede retirar, línea base múltiple). La lógica es que si la conducta mejora solo cuando se aplica el tratamiento, es el tratamiento el que la causa. Fundamental en modificación de conducta. En inglés: single-case design.",
   "ejemplo": "Niño con TDAH: línea de base A (sin intervención) → economía de fichas B → retirada A → reaplicación B. El patrón de cambio demuestra el efecto.",
   "pros": [
    "Útil en clínica con pocos sujetos",
    "Alta relevancia clínica"
   ],
   "contras": [
    "Baja generalización",
    "No siempre se puede retirar el tratamiento"
   ],
   "claves": [
    "Línea de base",
    "Diseño A-B-A",
    "Replicación intrasujeto",
    "Modificación de conducta"
   ]
  },
  {
   "id": "cuasi",
   "name": "Diseño cuasi-experimental",
   "tema": "Cap. 10",
   "color": "#4ade80",
   "manVi": "Sí",
   "aleat": "No",
   "vi": "Media-baja",
   "ve": "Alta",
   "caus": "Limitada",
   "trad": "Cuantitativa",
   "cuando": "Cuando puedes aplicar la intervención pero no asignar al azar ni a las personas ni a grupos enteros.",
   "no": "Cuando no hay posibilidad de ningún grupo de comparación.",
   "pregunta": "¿El programa de prevención del acoso reduce su incidencia en el colegio que lo recibe vs. el que no?",
   "unidad": "cuasi",
   "icono": "🔬",
   "etiqueta": "Cuasi-exp",
   "sub": "Manipulación de la variable independiente sin asignación aleatoria",
   "que": "Como el experimento, pero sin asignación aleatoria. Se usa cuando no es posible o ético aleatorizar. Incluye el diseño de grupos no equivalentes (con pretest y postest) y las series temporales interrumpidas. En inglés: quasi-experimental design.",
   "ejemplo": "Miguel evalúa un programa de prevención del acoso en dos colegios ya formados: uno recibe el programa (experimental), el otro no (comparación). Sin aleatorización.",
   "pros": [
    "Viable en contextos reales",
    "Útil para evaluar programas"
   ],
   "contras": [
    "Menor validez interna",
    "Grupos pueden no ser equivalentes"
   ],
   "claves": [
    "Grupos no equivalentes",
    "Series temporales",
    "Pretest y postest",
    "Validez interna amenazada"
   ]
  },
  {
   "id": "epf",
   "name": "Diseño después del hecho (ex post facto)",
   "tema": "Cap. 11",
   "color": "#e879f9",
   "manVi": "No",
   "aleat": "No",
   "vi": "Baja",
   "ve": "Alta",
   "caus": "No",
   "trad": "Cuantitativa",
   "cuando": "Cuando la variable de interés ya ha ocurrido y no puede manipularse éticamente.",
   "no": "Cuando necesitas establecer causalidad.",
   "pregunta": "¿Los alumnos con TDAH rinden peor que los alumnos sin TDAH?",
   "unidad": "epf",
   "icono": "🕰️",
   "etiqueta": "No experimental",
   "sub": "Variables que ya han ocurrido · Sin manipulación ni aleatorización",
   "que": "El investigador estudia variables que ya ocurrieron sin haberlas manipulado. Compara grupos que ya difieren de forma natural. No establece causalidad. Incluye estudios correlacionales, retrospectivos (del efecto hacia la causa) y prospectivos (de la causa hacia el efecto). En inglés: ex post facto design.",
   "ejemplo": "Miguel compara el rendimiento académico de alumnos con y sin diagnóstico previo de TDAH. El diagnóstico ya existía: Miguel no lo ha manipulado.",
   "pros": [
    "Permite estudiar lo que no puede manipularse",
    "Bajo coste, accesible"
   ],
   "contras": [
    "No permite establecer causalidad",
    "Variables de confusión"
   ],
   "claves": [
    "Correlación",
    "Variable de clasificación",
    "Estudio retrospectivo",
    "Estudio prospectivo"
   ]
  },
  {
   "id": "obs",
   "name": "Observación sistemática",
   "tema": "Cap. 4",
   "color": "#5eead4",
   "manVi": "No",
   "aleat": "No",
   "vi": "Baja",
   "ve": "Alta",
   "caus": "No",
   "trad": "Cuantitativa",
   "q": "¿Qué estudia?",
   "desc": "Registro planificado de conductas en su contexto natural sin intervenir.",
   "cuando": "Cuando quieres describir conductas naturales sin interferir en ellas.",
   "no": "Cuando necesitas establecer relaciones causales.",
   "pregunta": "¿Cuántas veces interrumpen los alumnos en una clase?",
   "unidad": "desc",
   "icono": "👁️",
   "etiqueta": "Descriptivo",
   "sub": "Registro planificado de conductas en su contexto natural",
   "que": "Registro planificado, objetivo y replicable de conductas sin intervenir en ellas. El investigador define categorías antes de observar y usa sistemas de muestreo: por intervalos de tiempo, por eventos o de tiempo total.",
   "ejemplo": "Miguel registra las conductas disruptivas en clase durante 3 semanas usando intervalos de 30 segundos, sin interactuar con los alumnos.",
   "pros": [
    "Validez ecológica alta",
    "Capta conducta espontánea"
   ],
   "contras": [
    "No permite inferir causalidad",
    "Efecto del observador"
   ],
   "claves": [
    "Fiabilidad entre jueces",
    "Muestreo por intervalos",
    "Observador externo",
    "Categorías observacionales"
   ]
  },
  {
   "id": "enc",
   "name": "Encuestas y cuestionarios",
   "tema": "Cap. 5",
   "color": "#7dd3fc",
   "manVi": "No",
   "aleat": "No",
   "vi": "Baja",
   "ve": "Alta",
   "caus": "No",
   "trad": "Cuantitativa",
   "cuando": "Cuando quieres conocer actitudes, opiniones o prevalencia en una población grande.",
   "no": "Cuando necesitas causalidad o datos observacionales.",
   "pregunta": "¿Cuál es el nivel de estrés académico en universitarios españoles?",
   "unidad": "desc",
   "icono": "📋",
   "etiqueta": "Descriptivo",
   "sub": "Recogida masiva de datos mediante preguntas estandarizadas",
   "que": "Método para obtener datos sobre actitudes, opiniones o conductas de una muestra representativa. Puede ser transversal (un momento puntual) o longitudinal (varios momentos en el tiempo).",
   "ejemplo": "Miguel aplica un cuestionario de estrés académico (escala Likert de 5 puntos) a 500 estudiantes universitarios de Madrid seleccionados aleatoriamente.",
   "pros": [
    "Recoge muchos datos rápido",
    "Permite generalización"
   ],
   "contras": [
    "Depende del autoinforme",
    "Deseabilidad social"
   ],
   "claves": [
    "Escala Likert",
    "Muestra aleatoria",
    "Estudio transversal",
    "Estudio longitudinal"
   ]
  },
  {
   "id": "etno",
   "name": "Etnografía",
   "tema": "Cap. 13",
   "color": "#38bdf8",
   "manVi": "No",
   "aleat": "No",
   "vi": "N/A",
   "ve": "Transferible",
   "caus": "No",
   "trad": "Cualitativa",
   "cuando": "Cuando quieres comprender la cultura y las prácticas de un grupo desde dentro.",
   "no": "Cuando necesitas datos cuantificables o generalizables.",
   "pregunta": "¿Cómo se construye la identidad de «buen estudiante» en un instituto de élite?",
   "unidad": "cuali",
   "icono": "🌍",
   "etiqueta": "Cualitativo",
   "sub": "Inmersión cultural prolongada para comprender un grupo desde dentro",
   "que": "Describe y comprende la cultura de un grupo desde dentro mediante observación participante prolongada. El investigador convive con el grupo. Raíces en la antropología (Malinowski, Geertz). El resultado es una «descripción densa»: no solo se describe qué ocurre, sino qué significa para los propios participantes.",
   "ejemplo": "Miguel convive 6 meses en un instituto para entender la cultura escolar adolescente: jerarquías, rituales, lenguaje y normas informales.",
   "pros": [
    "Comprensión profunda del contexto",
    "Perspectiva holística"
   ],
   "contras": [
    "Requiere mucho tiempo",
    "Riesgo de «nativización»"
   ],
   "claves": [
    "Observación participante",
    "Trabajo de campo",
    "Descripción densa",
    "Informante clave"
   ]
  },
  {
   "id": "feno",
   "name": "Fenomenología",
   "tema": "Cap. 13",
   "color": "#38bdf8",
   "manVi": "No",
   "aleat": "No",
   "vi": "N/A",
   "ve": "Transferible",
   "caus": "No",
   "trad": "Cualitativa",
   "cuando": "Cuando quieres describir la estructura de la experiencia vivida de un fenómeno concreto.",
   "no": "Cuando buscas frecuencias o relaciones entre variables.",
   "pregunta": "¿Cómo viven el síndrome del impostor los estudiantes de medicina?",
   "unidad": "cuali",
   "icono": "💭",
   "etiqueta": "Cualitativo",
   "sub": "Estructura de la experiencia vivida tal como aparece a la conciencia",
   "que": "Estudia la experiencia vivida en primera persona. El investigador busca la «esencia» del fenómeno mediante análisis de narrativas. Se aplica la reducción fenomenológica (poner entre paréntesis los propios supuestos). El Análisis Fenomenológico Interpretativo (AFI) es el método más usado en psicología actual.",
   "ejemplo": "Miguel entrevista a 10 personas en duelo y analiza cómo describen la experiencia de la pérdida, buscando la estructura esencial del fenómeno.",
   "pros": [
    "Capta la experiencia subjetiva",
    "Muy útil en psicología clínica"
   ],
   "contras": [
    "Difícil de validar",
    "Alta dependencia del investigador"
   ],
   "claves": [
    "Reducción fenomenológica",
    "Experiencia vivida",
    "Esencia",
    "Análisis Fenomenológico Interpretativo"
   ]
  },
  {
   "id": "casos",
   "name": "Estudio de casos",
   "tema": "Cap. 14",
   "color": "#38bdf8",
   "manVi": "No",
   "aleat": "No",
   "vi": "N/A",
   "ve": "Transferible",
   "caus": "No",
   "trad": "Cualitativa",
   "cuando": "Cuando quieres analizar en profundidad una unidad concreta en su contexto real.",
   "no": "Cuando necesitas datos representativos de una población.",
   "pregunta": "¿Cómo ha conseguido este colegio implementar con éxito la inclusión educativa?",
   "unidad": "cuali",
   "icono": "📁",
   "etiqueta": "Cualitativo",
   "sub": "Análisis en profundidad de una unidad en su contexto real",
   "que": "Examina en profundidad una unidad (persona, grupo, institución, evento) en su contexto real usando múltiples fuentes de evidencia. Puede ser instrumental (el caso ilustra un fenómeno) o intrínseco (el caso es interesante en sí mismo). Autores de referencia: Yin y Stake. En inglés: case study.",
   "ejemplo": "Miguel analiza un colegio exitoso en inclusión educativa, combinando entrevistas a profesores, observaciones de aula y análisis de documentos.",
   "pros": [
    "Riqueza y profundidad",
    "Permite triangulación"
   ],
   "contras": [
    "No generalizable directamente",
    "Requiere acceso negociado"
   ],
   "claves": [
    "Triangulación",
    "Caso instrumental",
    "Múltiples fuentes",
    "Yin · Stake"
   ]
  },
  {
   "id": "ia",
   "name": "Investigación-Acción",
   "tema": "Cap. 14",
   "color": "#38bdf8",
   "manVi": "No",
   "aleat": "No",
   "vi": "N/A",
   "ve": "Transferible",
   "caus": "No",
   "trad": "Cualitativa",
   "cuando": "Cuando buscas simultáneamente generar conocimiento y transformar la realidad junto a los participantes.",
   "no": "Cuando la observación no participante es necesaria.",
   "pregunta": "¿Cómo podemos mejorar nuestra metodología de enseñanza de forma colaborativa?",
   "unidad": "cuali",
   "icono": "⚡",
   "etiqueta": "Cualitativo",
   "sub": "Ciclos de acción y reflexión para transformar la realidad",
   "que": "Persigue simultáneamente generar conocimiento y transformar la realidad. Los participantes son co-investigadores. Se trabaja en ciclos: planificar → actuar → observar → reflexionar. Muy usada en educación. Autores: Lewin y Freire. En inglés: action research.",
   "ejemplo": "Miguel y los docentes de un colegio diseñan juntos mejoras en la metodología, las implementan, observan los resultados y vuelven a mejorar en nuevos ciclos.",
   "pros": [
    "Transforma la realidad",
    "Empodera a los participantes"
   ],
   "contras": [
    "Tensión entre rigor y acción",
    "Rol ambiguo del investigador"
   ],
   "claves": [
    "Ciclos acción-reflexión",
    "Participativa",
    "Emancipadora",
    "Lewin · Freire"
   ]
  }
 ],
 "arbol": {
  "q": "¿Cuál es tu objetivo principal de investigación?",
  "opts": [
   {
    "icon": "🔍",
    "label": "Describir o explorar un fenómeno (sin manipular nada)",
    "next": {
     "q": "¿Qué perspectiva te interesa?",
     "opts": [
      {
       "icon": "📊",
       "label": "Medir y cuantificar (frecuencias, actitudes, correlaciones)",
       "next": {
        "q": "¿Qué tipo de datos necesitas?",
        "opts": [
         {
          "icon": "👁️",
          "label": "Conducta observable en su contexto natural",
          "res": {
           "color": "#5eead4",
           "name": "Observación Sistemática",
           "why": "Cuando quieres registrar conductas reales sin interferir. Define categorías, elige tu sistema de registro y sal al campo.",
           "tema": "Cap. 4",
           "unidad": "desc"
          }
         },
         {
          "icon": "📋",
          "label": "Opiniones, actitudes o prevalencia en una población",
          "res": {
           "color": "#7dd3fc",
           "name": "Encuesta / Cuestionario",
           "why": "Para conocer características de una población de forma eficiente. Asegúrate de tener muestra representativa y escalas validadas.",
           "tema": "Cap. 5",
           "unidad": "desc"
          }
         },
         {
          "icon": "🔗",
          "label": "Relaciones entre variables ya existentes",
          "res": {
           "color": "#e879f9",
           "name": "Diseño después del hecho (ex post facto) correlacional",
           "why": "Para estudiar relaciones entre variables que ya existen sin manipularlas. Recuerda: la correlación no implica causalidad.",
           "tema": "Cap. 11",
           "unidad": "epf"
          }
         }
        ]
       }
      },
      {
       "icon": "🌿",
       "label": "Comprender significados, experiencias o culturas",
       "next": {
        "q": "¿Qué aspecto quieres comprender?",
        "opts": [
         {
          "icon": "🌍",
          "label": "La cultura y las prácticas de un grupo social",
          "res": {
           "color": "#38bdf8",
           "name": "Etnografía",
           "why": "Si quieres entender una cultura desde dentro necesitas inmersión prolongada y observación participante.",
           "tema": "Cap. 13",
           "unidad": "cuali"
          }
         },
         {
          "icon": "💭",
          "label": "La experiencia vivida de un fenómeno concreto",
          "res": {
           "color": "#38bdf8",
           "name": "Estudio Fenomenológico",
           "why": "Si tu pregunta es «¿cómo viven X las personas?», la fenomenología o el Análisis Fenomenológico Interpretativo son tu diseño.",
           "tema": "Cap. 13",
           "unidad": "cuali"
          }
         },
         {
          "icon": "📁",
          "label": "En profundidad una persona, grupo o institución concreta",
          "res": {
           "color": "#38bdf8",
           "name": "Estudio de Casos",
           "why": "Cuando el caso en sí mismo es lo interesante o cuando quieres ilustrar un fenómeno con un ejemplo rico. Triangula múltiples fuentes.",
           "tema": "Cap. 14",
           "unidad": "cuali"
          }
         },
         {
          "icon": "⚡",
          "label": "Una realidad que quiero transformar junto a los participantes",
          "res": {
           "color": "#38bdf8",
           "name": "Investigación-Acción",
           "why": "Si tu meta no es solo conocer sino cambiar una situación, trabaja en ciclos de acción-reflexión junto a los protagonistas.",
           "tema": "Cap. 14",
           "unidad": "cuali"
          }
         }
        ]
       }
      }
     ]
    }
   },
   {
    "icon": "⚗️",
    "label": "Demostrar que X causa Y (establecer causalidad)",
    "next": {
     "q": "¿Puedes asignar aleatoriamente a los participantes?",
     "opts": [
      {
       "icon": "✅",
       "label": "Sí, tengo control total sobre la asignación",
       "next": {
        "q": "¿Cuántos participantes y qué tipo de variable independiente?",
        "opts": [
         {
          "icon": "👥",
          "label": "Varios grupos, cada uno en una sola condición",
          "res": {
           "color": "#f472b6",
           "name": "Experimento entre grupos distintos",
           "why": "Diseño clásico: aleatoriza, manipula la variable independiente, mide la variable dependiente y compara.",
           "tema": "Tema 4",
           "unidad": "t4"
          }
         },
         {
          "icon": "🔄",
          "label": "Los mismos sujetos pasan por todas las condiciones",
          "res": {
           "color": "#facc15",
           "name": "Experimento con el mismo grupo (intrasujeto)",
           "why": "Requiere menos participantes y controla las diferencias individuales. Imprescindible: controla el efecto de la práctica con reequilibrado (2 niveles) o cuadrado latino (3 o más) y descarta antes la persistencia diferencial (si existe, usa grupos distintos).",
           "tema": "Tema 5",
           "unidad": "t5"
          }
         },
         {
          "icon": "🔢",
          "label": "Quiero estudiar simultáneamente varias variables independientes",
          "res": {
           "color": "#fb923c",
           "name": "Diseño Factorial",
           "why": "Cuando te preguntas si el efecto de una variable independiente depende del nivel de otra (interacción). Más complejo pero más realista.",
           "tema": "Tema 6",
           "unidad": "t6"
          }
         }
        ]
       }
      },
      {
       "icon": "❌",
       "label": "No: no puedo asignar al azar ni a las personas ni a grupos enteros (si puedo sortear grupos ya formados entre condiciones, es un experimento de grupos distintos, Tema 4)",
       "next": {
        "q": "¿Puedes aplicar una intervención (manipular la variable independiente)?",
        "opts": [
         {
          "icon": "🔬",
          "label": "Sí, puedo aplicar la intervención aunque no pueda aleatorizar",
          "res": {
           "color": "#4ade80",
           "name": "Diseño Cuasi-experimental",
           "why": "Ideal para evaluación de programas en contextos reales. Sin aleatorización la validez interna es menor, pero puedes mejorarla con pretest, grupo de comparación y series temporales.",
           "tema": "Cap. 10",
           "unidad": "cuasi"
          }
         },
         {
          "icon": "🕰️",
          "label": "No, la variable ya ocurrió y no puedo manipularla",
          "res": {
           "color": "#e879f9",
           "name": "Diseño Después del Hecho (ex post facto)",
           "why": "Cuando estudias variables ya existentes (diagnósticos, sexo, nivel socioeconómico). Compara grupos naturales pero no puedes establecer causalidad.",
           "tema": "Cap. 11",
           "unidad": "epf"
          }
         }
        ]
       }
      },
      {
       "icon": "👤",
       "label": "Trabajo con un solo participante (o muy pocos) y puedo registrar su conducta repetidamente",
       "res": {
        "color": "#c084fc",
        "name": "Diseño de Caso Único (N=1)",
        "why": "Perfecto en clínica o intervención individual. Usa la lógica de reversión A-B-A-B (línea base → tratamiento → retirada → reintroducción); si retirar el tratamiento no es ético o el cambio es irreversible, usa una línea base múltiple (escalonada en conductas, situaciones o personas).",
        "tema": "Tema 7",
        "unidad": "t7"
       }
      }
     ]
    }
   }
  ]
 },
 "amenazas": {
  "internal": [
   {
    "name": "Historia",
    "en": "History",
    "def": "Eventos externos que ocurren entre pretest y postest y pueden afectar a la variable dependiente (una huelga, un cambio de ley...).",
    "affects": [
     "Sin grupo control",
     "Cuasi-experimental"
    ],
    "color": "#f87171"
   },
   {
    "name": "Maduración",
    "en": "Maturation",
    "def": "Cambios en los participantes con el paso del tiempo (crecimiento, aprendizaje natural, fatiga) independientes de la variable independiente.",
    "affects": [
     "Estudios longitudinales",
     "Sin grupo control"
    ],
    "color": "#f87171"
   },
   {
    "name": "Regresión a la media",
    "en": "Regression to the mean",
    "def": "Las puntuaciones extremas tienden a ser menos extremas en una segunda medición aunque no haya ninguna intervención.",
    "affects": [
     "Selección de grupos extremos"
    ],
    "color": "#fb923c"
   },
   {
    "name": "Instrumentación",
    "en": "Instrumentation",
    "def": "Cambios en el instrumento de medida o en los observadores entre pretest y postest que distorsionan los resultados.",
    "affects": [
     "Estudios longitudinales"
    ],
    "color": "#fb923c"
   },
   {
    "name": "Sesgo de selección",
    "en": "Selection bias",
    "def": "Diferencias previas entre grupos no debidas a la variable independiente que pueden explicar las diferencias en la variable dependiente.",
    "affects": [
     "Cuasi-experimental",
     "Ex post facto"
    ],
    "color": "#f87171"
   },
   {
    "name": "Mortalidad experimental",
    "en": "Attrition / Mortality",
    "def": "Pérdida diferencial de participantes durante el estudio. Si los que abandonan lo hacen por razones sistemáticas, se sesgan los resultados.",
    "affects": [
     "Estudios longitudinales",
     "Experimentales"
    ],
    "color": "#fb923c"
   },
   {
    "name": "Efecto de práctica",
    "en": "Practice effect",
    "def": "Cambio en la VD asociado a la posición en que se presenta un nivel (1.º, 2.º, 3.º…), sea cual sea ese nivel. Mezcla aprendizaje, fatiga y motivación, y puede mejorar o empeorar el rendimiento. No se elimina: se controla con el orden de presentación (aleatorización, reequilibrado, cuadrado latino).",
    "affects": [
     "Diseño intrasujeto"
    ],
    "color": "#facc15"
   },
   {
    "name": "Efecto del observador",
    "en": "Hawthorne effect",
    "def": "Los participantes modifican su conducta al saber que están siendo observados o que forman parte de un estudio.",
    "affects": [
     "Todos los diseños"
    ],
    "color": "#f87171"
   }
  ],
  "external": [
   {
    "name": "Efecto de pretestado",
    "en": "Pretest sensitization",
    "def": "El pretest puede sensibilizar a los participantes, haciendo que respondan de forma distinta al tratamiento de como lo haría alguien sin pretest.",
    "affects": [
     "Diseños con pretest"
    ],
    "color": "#c084fc"
   },
   {
    "name": "Interacción selección-tratamiento",
    "en": "Selection-treatment interaction",
    "def": "Los resultados pueden no generalizarse porque la muestra tiene características especiales que la hacen especialmente susceptible al tratamiento.",
    "affects": [
     "Muestras no representativas"
    ],
    "color": "#c084fc"
   },
   {
    "name": "Reactividad a los procedimientos",
    "en": "Reactive effects of experimental arrangements",
    "def": "La artificialidad del laboratorio limita la generalización a situaciones reales.",
    "affects": [
     "Experimentos de laboratorio"
    ],
    "color": "#c084fc"
   },
   {
    "name": "Interferencia entre tratamientos",
    "en": "Multiple-treatment interference",
    "def": "En diseños intrasujeto o factoriales, la exposición a varias condiciones puede producir efectos que no ocurrirían con una sola condición.",
    "affects": [
     "Diseño intrasujeto",
     "Factorial con algún factor intra (medidas repetidas o mixto)"
    ],
    "color": "#a5b4fc"
   }
  ]
 }
});
