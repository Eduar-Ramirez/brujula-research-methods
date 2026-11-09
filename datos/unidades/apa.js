/* Unidad «Presentación de datos e informe (APA 7)». Estado: activa | en-preparacion | oculta (se puede cambiar también en datos/configuracion.js). Versión 3 (noviembre de 2026). */
Brujula.unidad({
 "orden": 11,
 "bloque": "Bloque IV · Del dato al informe",
 "tema": "Semana 12",
 "titulo": "Presentación de datos e informe (APA 7)",
 "icono": "📝",
 "color": "#B5651D",
 "estado": "activa",
 "libro": "American Psychological Association (2020). Publication manual (7.ª ed.)",
 "resumen": "Estructura de un informe de investigación, cómo se informan los resultados y cómo se citan y referencian las fuentes según la 7.ª edición de APA.",
 "id": "apa",
 "secciones": [
  {
   "id": "estructura",
   "titulo": "Estructura de un informe",
   "sub": "De la introducción a las referencias",
   "html": "<div class=\"scroll-x\"><table class=\"tabla\"><tr><th>Apartado</th><th>Qué contiene</th><th>Pregunta que responde</th></tr><tr><td>Título</td><td>Variables y población, sin abreviaturas</td><td>¿De qué trata?</td></tr><tr><td>Resumen (abstract)</td><td>150-250 palabras: objetivo, método, resultados principales y conclusión; palabras clave</td><td>¿Qué se hizo y qué se encontró?</td></tr><tr><td>Introducción</td><td>Marco teórico, lo que se sabe y lo que falta; objetivos e hipótesis al final</td><td>¿Por qué este estudio?</td></tr><tr><td>Método · Participantes</td><td>Población, muestreo, tamaño y características</td><td>¿Con quién?</td></tr><tr><td>Método · Instrumentos</td><td>Nombre, autoría, ítems, escala, fiabilidad y validez</td><td>¿Con qué?</td></tr><tr><td>Método · Procedimiento</td><td>Cómo, cuándo y dónde se recogieron los datos; ética</td><td>¿Cómo?</td></tr><tr><td>Método · Análisis de datos</td><td>Software y prueba para cada hipótesis</td><td>¿Cómo se analizó?</td></tr><tr><td>Resultados</td><td>Descriptivos y contrastes, sin interpretar; tablas y figuras numeradas</td><td>¿Qué se encontró?</td></tr><tr><td>Discusión</td><td>Interpretación, comparación con la literatura, limitaciones y prospectiva</td><td>¿Qué significa?</td></tr><tr><td>Referencias</td><td>Todas las obras citadas, en orden alfabético</td><td>¿De dónde sale?</td></tr></table></div><div class=\"callout info\">El <b>Proyecto INDAGA</b> sigue esta estructura. El método debe permitir que otra persona replique el estudio.</div>"
  },
  {
   "id": "resultados",
   "titulo": "Cómo informar los resultados",
   "sub": "Estadísticos, tablas y figuras",
   "html": "<div class=\"card-grid\"><div class=\"card\"><h3>Estadísticos en cursiva</h3><p><i>M</i>, <i>DT</i>, <i>t</i>, <i>F</i>, <i>p</i>, <i>r</i>, <i>n</i>, <i>N</i>. Las letras griegas no van en cursiva.</p></div><div class=\"card\"><h3>Valores p</h3><p>Exactos con tres decimales y sin cero inicial: <i>p</i> = .032; si es menor, <i>p</i> < .001.</p></div><div class=\"card\"><h3>Cero inicial</h3><p>Sin cero en valores que no pueden superar 1 (<i>p</i>, <i>r</i>, η²); con cero en el resto (<i>d</i> = 0.45).</p></div></div><div class=\"sec\">Ejemplos de redacción</div><ul><li><i>t</i>(38) = 2.45, <i>p</i> = .019, <i>d</i> = 0.77</li><li><i>F</i>(2, 57) = 4.12, <i>p</i> = .021, η²<sub>p</sub> = .13</li><li><i>r</i>(98) = −.32, <i>p</i> = .001</li><li>χ²(1, <i>N</i> = 120) = 5.40, <i>p</i> = .020</li></ul><div class=\"callout warn\">Tablas y figuras: número en negrita («<b>Tabla 1</b>»), título en cursiva en la línea siguiente y notas debajo. En español se usa la coma decimal según la revista; en Brújula y JASP verás el punto.</div>"
  },
  {
   "id": "citas",
   "titulo": "Citas y referencias (7.ª edición)",
   "sub": "En el texto y en la lista final",
   "html": "<div class=\"scroll-x\"><table class=\"tabla\"><tr><th>Tipo de cita</th><th>Un autor</th><th>Dos autores</th><th>Tres o más</th></tr><tr><td>Parentética</td><td>(García, 2023)</td><td>(García y López, 2023)</td><td>(García et al., 2023)</td></tr><tr><td>Narrativa</td><td>García (2023)</td><td>García y López (2023)</td><td>García et al. (2023)</td></tr></table></div><div class=\"sec\">Referencias más frecuentes</div><ul><li><b>Artículo:</b> Orben, A., y Przybylski, A. K. (2019). The association between adolescent well-being and digital technology use. <i>Nature Human Behaviour, 3</i>(2), 173-182. https://doi.org/10.1038/s41562-018-0506-1</li><li><b>Libro:</b> León, O. G., y Montero, I. (2015). <i>Métodos de investigación en psicología y educación: las tradiciones cuantitativa y cualitativa</i> (4.ª ed.). McGraw-Hill.</li><li><b>Capítulo:</b> Autor, A. (año). Título del capítulo. En E. Editor (Ed.), <i>Título del libro</i> (pp. xx-xx). Editorial.</li><li><b>Página web:</b> Organización. (año, día de mes). <i>Título</i>. URL</li></ul><div class=\"callout warn\"><b>Reglas que más se olvidan:</b> sangría francesa; orden alfabético; DOI como URL; hasta 20 autores en la referencia; «et al.» desde la primera cita con tres o más autores; toda cita está en las referencias y viceversa. Las herramientas de IA se declaran (Tabla 5 de INDAGA) y la referencia es al artículo original, nunca al resumen generado.</div>"
  }
 ],
 "flash": [
  {
   "t": "¿Dónde van las hipótesis en un informe?",
   "d": "Al final de la <strong>introducción</strong>."
  },
  {
   "t": "¿Qué subapartados tiene el método?",
   "d": "Participantes, instrumentos, procedimiento y análisis de datos."
  },
  {
   "t": "Cita con tres o más autores",
   "d": "<strong>(García et al., 2023)</strong> desde la primera vez."
  },
  {
   "t": "¿Cómo se informa p = 0,0004?",
   "d": "<strong><i>p</i> < .001</strong>."
  },
  {
   "t": "¿Se interpretan los resultados en el apartado de resultados?",
   "d": "<strong>No</strong>: la interpretación va en la discusión."
  },
  {
   "t": "¿Qué formato tiene la lista de referencias?",
   "d": "Orden alfabético y <strong>sangría francesa</strong>."
  }
 ],
 "test": [
  {
   "q": "¿En qué apartado se explica cómo se seleccionó a los participantes?",
   "o": [
    "Introducción",
    "Método",
    "Discusión"
   ],
   "a": 1,
   "fb": "Participantes es un subapartado del método."
  },
  {
   "q": "¿Cuál es la cita parentética correcta (APA 7) de un artículo de Ruiz, Pardo y San Martín de 2010?",
   "o": [
    "(Ruiz, Pardo y San Martín, 2010)",
    "(Ruiz et al., 2010)",
    "(Ruiz y cols., 2010)"
   ],
   "a": 1,
   "fb": "Con tres o más autores se usa «et al.» desde la primera cita."
  },
  {
   "q": "¿Cuál es la forma correcta de informar un contraste?",
   "o": [
    "t(38) = 2.45, p = .019, d = 0.77, con los estadísticos en cursiva",
    "t = 2,45 (p < 0,05) significativo",
    "p = 0.019 (t de 38)"
   ],
   "a": 0,
   "fb": "Grados de libertad, valor exacto de p y tamaño del efecto."
  },
  {
   "q": "Un informe dice en Resultados: «Esto demuestra que la teoría de X es correcta». ¿Qué falla?",
   "o": [
    "Interpreta en Resultados, y eso va en la Discusión",
    "Falta el valor p",
    "Debería estar en el Resumen"
   ],
   "a": 0,
   "fb": "Los resultados se presentan sin interpretar."
  }
 ],
 "glosario": [
  {
   "es": "Sangría francesa",
   "en": "Hanging indent",
   "def": "Formato de las referencias: la primera línea al margen y las siguientes sangradas."
  },
  {
   "es": "DOI",
   "en": "Digital Object Identifier",
   "def": "Identificador permanente de un artículo; en APA 7 se escribe como URL."
  }
 ],
 "emparejar": [
  {
   "label": "Set P1 · ¿En qué apartado va?",
   "pairs": [
    {
     "left": "Hipótesis contrastables",
     "right": "Introducción (al final)",
     "exp": "Tras el marco teórico y el objetivo."
    },
    {
     "left": "Fiabilidad del cuestionario usado",
     "right": "Método · Instrumentos",
     "exp": "Con autoría, ítems y escala."
    },
    {
     "left": "t(38) = 2.45, p = .019",
     "right": "Resultados",
     "exp": "Sin interpretar."
    },
    {
     "left": "Limitaciones y líneas futuras",
     "right": "Discusión",
     "exp": "Con una mejora asociada a cada limitación."
    }
   ]
  }
 ],
 "simuladores": []
});
