/* Unidad «Diseños ex post facto». Estado: activa | en-preparacion | oculta (se puede cambiar también en datos/configuracion.js). */
Brujula.unidad({
 "orden": 8,
 "bloque": "Bloque III · Diseños no experimentales",
 "tema": "Semana 9",
 "titulo": "Diseños ex post facto",
 "icono": "🕰️",
 "color": "#8E5B9E",
 "estado": "en-preparacion",
 "libro": "León y Montero, cap. 11",
 "resumen": "Variables que ya han ocurrido: se comparan grupos naturales o se estudian relaciones, sin manipulación. Retrospectivos y prospectivos.",
 "secciones": [
  {
   "id": "epf",
   "titulo": "Diseño después del hecho (ex post facto)",
   "sub": "Cap. 11 · ficha resumen",
   "html": "<div class=\"card-grid\"><div class=\"card\"><h3>¿Qué es?</h3><p>El investigador estudia variables que ya ocurrieron sin haberlas manipulado. Compara grupos que ya difieren de forma natural. No establece causalidad. Incluye estudios correlacionales, retrospectivos (del efecto hacia la causa) y prospectivos (de la causa hacia el efecto). En inglés: ex post facto design.</p></div><div class=\"card\"><h3>Ejemplo</h3><p>Miguel compara el rendimiento académico de alumnos con y sin diagnóstico previo de TDAH. El diagnóstico ya existía: Miguel no lo ha manipulado.</p><p class=\"nota\">Pregunta típica: ¿Los alumnos con TDAH rinden peor que los alumnos sin TDAH?</p></div><div class=\"card\"><h3>Cuándo usarlo</h3><p>Cuando la variable de interés ya ha ocurrido y no puede manipularse éticamente.</p><h3>Cuándo no</h3><p>Cuando necesitas establecer causalidad.</p></div><div class=\"card\"><h3>Ventajas y limitaciones</h3><ul class=\"pc\"><li>✓ Permite estudiar lo que no puede manipularse</li><li>✓ Bajo coste, accesible</li><li>✗ No permite establecer causalidad</li><li>✗ Variables de confusión</li></ul></div></div><div class=\"tags\"><span class=\"tag\">Correlación</span><span class=\"tag\">Variable de clasificación</span><span class=\"tag\">Estudio retrospectivo</span><span class=\"tag\">Estudio prospectivo</span></div>"
  }
 ],
 "flash": [
  {
   "t": "¿Qué diferencia un diseño después del hecho (ex post facto) de uno cuasi-experimental?",
   "d": "En el <strong>ex post facto</strong> no hay manipulación de ninguna variable: los grupos ya diferían antes. En el <strong>cuasi-experimental</strong> sí hay manipulación de la variable independiente, pero sin aleatorización."
  },
  {
   "t": "Un investigador estudia la relación entre horas de sueño y rendimiento sin manipular nada. ¿Qué diseño es?",
   "d": "<strong>Diseño después del hecho (ex post facto) correlacional.</strong> No hay manipulación de variables. El investigador solo mide y busca relaciones. No puede establecer causalidad."
  }
 ],
 "test": [
  {
   "q": "¿En qué tipo de diseño puede el investigador estudiar variables que no se pueden manipular éticamente?",
   "o": [
    "Experimento entre grupos",
    "Diseño factorial",
    "Diseño después del hecho (ex post facto)",
    "Diseño intrasujeto"
   ],
   "a": 2,
   "fb": "El diseño ex post facto (después del hecho) permite estudiar grupos que ya difieren en variables que no se pueden o no se deben manipular éticamente."
  },
  {
   "q": "¿Qué diferencia un estudio retrospectivo de uno prospectivo?",
   "o": [
    "El retrospectivo manipula la VI; el prospectivo no",
    "El retrospectivo parte del efecto para buscar la causa; el prospectivo parte de la causa para observar el efecto",
    "El prospectivo tiene grupo control; el retrospectivo no",
    "Son sinónimos"
   ],
   "a": 1,
   "fb": "El retrospectivo parte del efecto ya ocurrido y mira hacia atrás buscando causas. El prospectivo parte de la exposición a un factor y sigue a los participantes hacia el futuro para ver qué efectos aparecen."
  }
 ],
 "glosario": [
  {
   "es": "Diseño después del hecho",
   "en": "Ex post facto design",
   "def": "Se estudian variables que ya han ocurrido, sin posibilidad de manipulación."
  },
  {
   "es": "Estudio retrospectivo",
   "en": "Retrospective study",
   "def": "Parte del efecto ya ocurrido y busca hacia atrás las posibles causas."
  },
  {
   "es": "Estudio prospectivo",
   "en": "Prospective study",
   "def": "Parte de la exposición a un factor y sigue a los participantes para observar los efectos futuros."
  }
 ],
 "emparejar": [],
 "simuladores": [],
 "id": "epf"
});
