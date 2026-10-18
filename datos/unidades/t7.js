/* Unidad «Diseños de caso único». Estado: activa | en-preparacion | oculta (se puede cambiar también en datos/configuracion.js). */
Brujula.unidad({
 "orden": 6,
 "bloque": "Bloque II · Diseños experimentales",
 "tema": "Tema 7",
 "titulo": "Diseños de caso único",
 "icono": "👤",
 "color": "#7A3E9D",
 "estado": "activa",
 "libro": "León y Montero, cap. 9",
 "resumen": "Un participante medido repetidamente: línea base, diseños AB, ABAB y línea base múltiple. Análisis visual.",
 "secciones": [
  {
   "id": "caso-unico",
   "titulo": "Diseños de Caso Único",
   "sub": "Experimentación con un solo participante · Cap. 9",
   "html": "<div class=\"callout\" style=\"border-color:var(--t7);background:var(--t7bg)\"><strong>Lógica (Skinner):</strong> Si un fenómeno es lo suficientemente básico, se producirá de forma similar en todos los individuos. Las diferencias individuales se tratan como fuente de información, no como error estadístico que difuminar.</div>\n\n  <div class=\"sec\">Fases de la experimentación</div>\n  <div class=\"step-row\">\n    <div class=\"step-box\" style=\"border-color:var(--t7);color:var(--t7);background:var(--t7bg)\">A · Línea base<br><small>Medición previa sin intervención</small></div>\n    <span class=\"step-arr\">→</span>\n    <div class=\"step-box\" style=\"border-color:var(--t7);color:var(--t7);background:var(--t7bg)\">B · Intervención<br><small>Se aplica el tratamiento</small></div>\n    <span class=\"step-arr\">→</span>\n    <div class=\"step-box\" style=\"border-color:var(--t7);color:var(--t7);background:var(--t7bg)\">Interpretación<br><small>¿Cambia la VD justo al introducir (y, si se retira, al retirar) el tratamiento?</small></div>\n  </div>\n\n  <div class=\"card-grid\">\n    <div class=\"card accent-bar\" style=\"border-left-color:var(--t7)\"><h3>📏 Línea base</h3><p>Medición repetida de la VD <strong>antes de cualquier intervención</strong>. Sirve de referencia. Requisito: debe ser <strong>estable</strong> antes de introducir el tratamiento.</p></div>\n    <div class=\"card accent-bar\" style=\"border-left-color:var(--t7)\"><h3>🔧 Intervención</h3><p>Se introduce el tratamiento y se continúa registrando la VD. Se evalúan efectos a corto y largo plazo comparando con la línea base.</p></div>\n    <div class=\"card accent-bar\" style=\"border-left-color:var(--t7)\"><h3>📈 Análisis de datos</h3><ul><li><strong>Cambios de nivel:</strong> diferencia entre el último dato de una fase y el primero de la siguiente.</li><li><strong>Cambios de tendencia:</strong> variación en la pendiente de los datos.</li><li><strong>Índice de cambio significativo.</strong></li></ul></div>\n    <div class=\"card accent-bar\" style=\"border-left-color:var(--t5)\"><h3>⚠️ Validez</h3><ul><li>Se asume que el caso es <strong>representativo</strong> de la población con esa característica.</li><li>Si los efectos son grandes, se generalizan con mayor confianza.</li><li>No conveniente cuando las diferencias individuales son muy grandes.</li></ul></div>\n  </div>"
  },
  {
   "id": "tipos",
   "titulo": "Tipos de Diseños",
   "sub": "AB, ABAB y Línea base múltiple · Cap. 9",
   "html": "<div class=\"card-grid\">\n    <div class=\"card accent-bar\" style=\"border-left-color:var(--t7)\"><h3>A→B · Diseño AB</h3><p>Diseño básico. Fase A (línea base) + fase B (intervención). <strong>Limitación:</strong> no descarta historia ni maduración como explicaciones alternativas (no hay vuelta atrás).</p></div>\n    <div class=\"card accent-bar\" style=\"border-left-color:var(--t7)\"><h3>A→B→A→B · Diseño ABAB</h3><p>Diseño de <em>reversión</em>. Al retirar el tratamiento en A₂, si la conducta vuelve al nivel basal → confirma la causalidad. Se reintroduce en B₂ por ética y verificación.</p></div>\n    <div class=\"card accent-bar\" style=\"border-left-color:var(--t7)\"><h3>🔀 Línea base múltiple</h3><p>Extensión del AB. La intervención se introduce <strong>escalonadamente</strong> en distintas conductas, situaciones o personas. Confirma causalidad sin necesidad de retirar el tratamiento.</p></div>\n  </div>\n\n  <div class=\"diagram-box\">\n    <svg width=\"100%\" viewBox=\"0 0 560 100\">\n      <text x=\"10\" y=\"16\" font-size=\"10\" font-weight=\"600\" fill=\"#a0305a\" font-family=\"Inter,sans-serif\">ABAB — Ejemplo: tratamiento alcoholismo</text>\n      <rect x=\"10\" y=\"24\" width=\"120\" height=\"26\" rx=\"5\" fill=\"#faedf3\" stroke=\"#a0305a\" stroke-width=\"1\"/>\n      <text x=\"70\" y=\"40\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"600\" fill=\"#6b1f3c\" font-family=\"Inter,sans-serif\">A₁ Sin tratamiento</text>\n      <rect x=\"136\" y=\"24\" width=\"120\" height=\"26\" rx=\"5\" fill=\"#e6f5ef\" stroke=\"#1a7a5e\" stroke-width=\"1\"/>\n      <text x=\"196\" y=\"40\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"600\" fill=\"#0e4d38\" font-family=\"Inter,sans-serif\">B₁ Con tratamiento</text>\n      <rect x=\"262\" y=\"24\" width=\"120\" height=\"26\" rx=\"5\" fill=\"#faedf3\" stroke=\"#a0305a\" stroke-width=\"1\"/>\n      <text x=\"322\" y=\"40\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"600\" fill=\"#6b1f3c\" font-family=\"Inter,sans-serif\">A₂ Sin tratamiento</text>\n      <rect x=\"388\" y=\"24\" width=\"120\" height=\"26\" rx=\"5\" fill=\"#e6f5ef\" stroke=\"#1a7a5e\" stroke-width=\"1\"/>\n      <text x=\"448\" y=\"40\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"600\" fill=\"#0e4d38\" font-family=\"Inter,sans-serif\">B₂ Con tratamiento</text>\n      <line x1=\"130\" y1=\"37\" x2=\"134\" y2=\"37\" stroke=\"#6b6860\" stroke-width=\"1\" marker-end=\"url(#arr)\"/>\n      <line x1=\"256\" y1=\"37\" x2=\"260\" y2=\"37\" stroke=\"#6b6860\" stroke-width=\"1\" marker-end=\"url(#arr)\"/>\n      <line x1=\"382\" y1=\"37\" x2=\"386\" y2=\"37\" stroke=\"#6b6860\" stroke-width=\"1\" marker-end=\"url(#arr)\"/>\n      <text x=\"70\" y=\"66\" text-anchor=\"middle\" font-size=\"9\" fill=\"#a0305a\" font-family=\"Inter,sans-serif\">VD alta (muchas horas)</text>\n      <text x=\"196\" y=\"66\" text-anchor=\"middle\" font-size=\"9\" fill=\"#1a7a5e\" font-family=\"Inter,sans-serif\">VD baja ✓</text>\n      <text x=\"322\" y=\"66\" text-anchor=\"middle\" font-size=\"9\" fill=\"#a0305a\" font-family=\"Inter,sans-serif\">VD sube → causalidad</text>\n      <text x=\"448\" y=\"66\" text-anchor=\"middle\" font-size=\"9\" fill=\"#1a7a5e\" font-family=\"Inter,sans-serif\">VD baja de nuevo ✓</text>\n      <text x=\"280\" y=\"92\" text-anchor=\"middle\" font-size=\"10\" fill=\"#6b6860\" font-family=\"Inter,sans-serif\">← Si A₂ sube: el tratamiento era la causa (no maduración u otro factor)</text>\n    </svg>\n  </div>\n\n  <div class=\"sec\">Línea base múltiple: 3 modalidades</div>\n  <div class=\"card-grid\">\n    <div class=\"card\"><h3>a) Misma persona, distintas condiciones</h3><p>Ej: programa de refuerzo de asertividad aplicado sucesivamente en casa → escuela → amigos.</p></div>\n    <div class=\"card\"><h3>b) Distintas conductas, misma persona</h3><p>Ej: en alcoholismo se refuerza primero \"decir no\" y después la relajación ante el estímulo.</p></div>\n    <div class=\"card\"><h3>c) Distintas personas, misma conducta</h3><p>La intervención se aplica escalonadamente. Cada sujeto tiene su propia línea base; los demás actúan como control mientras esperan.</p></div>\n  </div>"
  }
 ],
 "flash": [
  {
   "t": "Línea base (caso único)",
   "d": "Medición repetida de la VD antes de cualquier intervención. Sirve de referencia para evaluar el efecto del tratamiento. Debe ser estable."
  },
  {
   "t": "Diseño AB (caso único)",
   "d": "Fase A (línea base) + fase B (intervención). Diseño básico. Limitación: no descarta historia ni maduración como explicaciones alternativas."
  },
  {
   "t": "Diseño ABAB",
   "d": "A₁ → B₁ → A₂ → B₂. La retirada en A₂ confirma que el cambio se debía al tratamiento si la conducta vuelve al nivel basal."
  },
  {
   "t": "Línea base múltiple",
   "d": "La intervención se introduce escalonadamente en distintas conductas, situaciones o personas. Confirma causalidad sin necesidad de retirar el tratamiento."
  },
  {
   "t": "¿Qué es la línea de base en un diseño de caso único?",
   "d": "La <strong>fase A</strong>: período de registro de la conducta sin ninguna intervención. Sirve como referencia para comparar los efectos del tratamiento (fase B)."
  }
 ],
 "test": [
  {
   "q": "¿Cuál es la función de la línea base en los diseños de caso único?",
   "o": [
    "Introducir la intervención gradualmente",
    "Servir de medida de referencia para evaluar el efecto del tratamiento",
    "Asignar al azar los tratamientos",
    "Equilibrar las variables extrañas"
   ],
   "a": 1,
   "fb": "La línea base proporciona la medida basal de la VD antes de la intervención."
  },
  {
   "q": "¿Por qué el diseño ABAB ofrece más control que el diseño AB?",
   "o": [
    "Porque usa más participantes",
    "Porque la retirada del tratamiento en A₂ confirma que el cambio se debía a la intervención",
    "Porque incluye un grupo de control",
    "Porque la VD se mide más veces"
   ],
   "a": 1,
   "fb": "Si al retirar el tratamiento la conducta vuelve al nivel basal (A₂) y mejora al reintroducirlo (B₂), queda demostrada la causalidad."
  },
  {
   "q": "¿Cuál es la diferencia fundamental entre la línea base múltiple con varios individuos y un diseño de grupo clásico?",
   "o": [
    "No hay ninguna diferencia",
    "En la línea base múltiple la intervención se introduce de forma escalonada, cada individuo tiene su propia línea base",
    "En el diseño de grupo se usa un solo participante",
    "En la línea base múltiple no se usa ningún tratamiento"
   ],
   "a": 1,
   "fb": "En la línea base múltiple cada individuo tiene su propio registro basal y la intervención se aplica secuencialmente."
  },
  {
   "q": "La línea base múltiple confirma la causalidad sin retirar el tratamiento porque…",
   "o": [
    "Usa el reequilibrado entre fases",
    "La introducción escalonada hace que cada unidad sirva de control de las demás",
    "Se comparan varios grupos simultáneamente",
    "La VD se mide en varias condiciones"
   ],
   "a": 1,
   "fb": "Al introducir la intervención en momentos distintos, cada línea base que aún no ha recibido el tratamiento sirve de control."
  },
  {
   "q": "En un diseño A-B-A, si la conducta mejora solo en la fase B y empeora al volver a A, ¿qué se demuestra?",
   "o": [
    "Una correlación entre conducta y tiempo",
    "Causalidad: la intervención causa el cambio",
    "Que el diseño tiene baja validez externa",
    "Efectos de maduración"
   ],
   "a": 1,
   "fb": "La replicación del cambio siguiendo la presencia/ausencia de la intervención es la lógica que permite inferir causalidad en los diseños de caso único."
  }
 ],
 "glosario": [
  {
   "es": "Línea de base",
   "en": "Baseline",
   "def": "Fase de registro sin ninguna intervención, en diseños de caso único."
  }
 ],
 "emparejar": [],
 "simuladores": [
  "abab"
 ],
 "id": "t7"
});
