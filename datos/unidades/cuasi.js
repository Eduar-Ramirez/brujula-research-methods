/* Unidad «Diseños cuasiexperimentales». Estado: activa | en-preparacion | oculta (se puede cambiar también en datos/configuracion.js). */
Brujula.unidad({
 "orden": 7,
 "bloque": "Bloque II · Diseños experimentales",
 "tema": "Semana 8",
 "titulo": "Diseños cuasiexperimentales",
 "icono": "🔬",
 "color": "#4B6584",
 "estado": "en-preparacion",
 "libro": "León y Montero, cap. 10",
 "resumen": "Se manipula la VI, pero sin asignación aleatoria. Grupos no equivalentes y series temporales interrumpidas.",
 "secciones": [
  {
   "id": "cuasi",
   "titulo": "Diseño cuasi-experimental",
   "sub": "Cap. 10 · ficha resumen",
   "html": "<div class=\"card-grid\"><div class=\"card\"><h3>¿Qué es?</h3><p>Como el experimento, pero sin asignación aleatoria. Se usa cuando no es posible o ético aleatorizar. Incluye el diseño de grupos no equivalentes (con pretest y postest) y las series temporales interrumpidas. En inglés: quasi-experimental design.</p></div><div class=\"card\"><h3>Ejemplo</h3><p>Miguel evalúa un programa de prevención del acoso en dos colegios ya formados: uno recibe el programa (experimental), el otro no (comparación). Sin aleatorización.</p><p class=\"nota\">Pregunta típica: ¿El programa de prevención del acoso reduce su incidencia en el colegio que lo recibe vs. el que no?</p></div><div class=\"card\"><h3>Cuándo usarlo</h3><p>Cuando puedes aplicar la intervención pero no asignar al azar ni a las personas ni a grupos enteros.</p><h3>Cuándo no</h3><p>Cuando no hay posibilidad de ningún grupo de comparación.</p></div><div class=\"card\"><h3>Ventajas y limitaciones</h3><ul class=\"pc\"><li>✓ Viable en contextos reales</li><li>✓ Útil para evaluar programas</li><li>✗ Menor validez interna</li><li>✗ Grupos pueden no ser equivalentes</li></ul></div></div><div class=\"tags\"><span class=\"tag\">Grupos no equivalentes</span><span class=\"tag\">Series temporales</span><span class=\"tag\">Pretest y postest</span><span class=\"tag\">Validez interna amenazada</span></div>"
  }
 ],
 "flash": [
  {
   "t": "¿Por qué los diseños cuasi-experimentales tienen menor validez interna que los experimentales?",
   "d": "Porque <strong>no hay asignación aleatoria</strong>, lo que impide controlar variables extrañas y garantizar la equivalencia inicial entre grupos."
  }
 ],
 "test": [
  {
   "q": "¿Qué característica principal distingue a un experimento verdadero de un diseño cuasi-experimental?",
   "o": [
    "La medición de una variable dependiente",
    "La asignación aleatoria de participantes a las condiciones",
    "La existencia de un grupo de control",
    "La manipulación de la variable independiente"
   ],
   "a": 1,
   "fb": "La característica definitoria del experimento es la asignación aleatoria, que controla por equilibrado las variables extrañas y hace que los grupos sean equivalentes en promedio. El cuasiexperimental puede tener grupo de control y manipulación, pero no asignación aleatoria."
  },
  {
   "q": "Un investigador aplica un programa de relajación y mide la ansiedad antes y después, sin grupo de comparación. ¿Cuál es la principal amenaza a la validez interna?",
   "o": [
    "El efecto del observador",
    "La maduración y la historia",
    "La regresión a la media",
    "El sesgo de selección"
   ],
   "a": 1,
   "fb": "Sin grupo control es imposible saber si la mejora se debe al programa o a la maduración natural o a otros eventos ocurridos entre pretest y postest (historia)."
  },
  {
   "q": "Miguel trabaja con dos clases ya formadas (A y B); la dirección del centro decide, sin ningún sorteo, qué clase recibe cada método de estudio. Mide el rendimiento antes y después. ¿Qué diseño es este?",
   "o": [
    "Experimento verdadero entre grupos",
    "Diseño de caso único",
    "Diseño cuasi-experimental con grupos no equivalentes",
    "Diseño ex post facto retrospectivo"
   ],
   "a": 2,
   "fb": "Es cuasi-experimental: hay manipulación de la variable independiente (el método de estudio), pero los grupos no se han formado mediante asignación aleatoria (son clases ya existentes)."
  }
 ],
 "glosario": [
  {
   "es": "Grupos no equivalentes",
   "en": "Non-equivalent groups",
   "def": "En diseños cuasi-experimentales, grupos no formados mediante asignación aleatoria."
  }
 ],
 "emparejar": [],
 "simuladores": [],
 "id": "cuasi"
});
