/* Unidad «Análisis de datos cuantitativos». Estado: activa | en-preparacion | oculta (se puede cambiar también en datos/configuracion.js). Versión 3 (noviembre de 2026). */
Brujula.unidad({
 "orden": 10,
 "bloque": "Bloque IV · Del dato al informe",
 "tema": "Semana 11",
 "titulo": "Análisis de datos cuantitativos",
 "icono": "📊",
 "color": "#2E7D6B",
 "estado": "activa",
 "libro": "León y Montero (2015) y fichas de análisis de Brújula",
 "resumen": "Elegir la prueba a partir del diseño, ejecutarla en JASP y leer lo esencial: descriptivos, p, intervalo de confianza y tamaño del efecto.",
 "id": "analisis",
 "secciones": [
  {
   "id": "elegir",
   "titulo": "Del diseño a la prueba",
   "sub": "Cuatro preguntas para elegir el análisis",
   "html": "<div class=\"callout info\">Esta semana se trabaja sobre todo <b>con JASP</b> y con los casos de Brújula. Esta ficha resume la lógica: <b>el diseño decide el análisis</b>.</div><div class=\"step-row\"><div class=\"step-box\">1 · ¿Diferencias o relaciones?<br><small>comparar grupos o condiciones / relacionar variables</small></div><span class=\"step-arr\">→</span><div class=\"step-box\">2 · ¿Cuántos grupos?<br><small>dos o más</small></div><span class=\"step-arr\">→</span><div class=\"step-box\">3 · ¿Mismas personas?<br><small>independientes o relacionadas</small></div><span class=\"step-arr\">→</span><div class=\"step-box\">4 · ¿Supuestos?<br><small>normalidad, homogeneidad</small></div></div><div class=\"scroll-x\"><table class=\"tabla\"><tr><th>Situación</th><th>Prueba paramétrica</th><th>Alternativa no paramétrica</th></tr><tr><td>Dos grupos independientes</td><td>t de Student (o Welch)</td><td>U de Mann-Whitney</td></tr><tr><td>Dos medidas de las mismas personas</td><td>t para muestras relacionadas</td><td>Wilcoxon</td></tr><tr><td>Tres o más grupos independientes</td><td>ANOVA de un factor</td><td>Kruskal-Wallis</td></tr><tr><td>Tres o más medidas repetidas</td><td>ANOVA de medidas repetidas</td><td>Friedman</td></tr><tr><td>Dos o más VI</td><td>ANOVA factorial (entre, intra o mixto)</td><td>—</td></tr><tr><td>Pre-post con grupo de comparación</td><td>ANCOVA (pretest como covariable)</td><td>—</td></tr><tr><td>Dos variables cuantitativas</td><td>Correlación de Pearson / regresión</td><td>Spearman</td></tr><tr><td>Dos variables categóricas</td><td>Chi cuadrado</td><td>—</td></tr></table></div><div class=\"callout ok\">Consulta las <a href=\"#consultar/ayudas\">fichas de análisis</a> y practica con las <a href=\"#libera/todos\">misiones con datos</a>.</div>"
  },
  {
   "id": "leer",
   "titulo": "Qué leer en la salida",
   "sub": "Descriptivos, p, intervalo y tamaño del efecto",
   "html": "<div class=\"card-grid\"><div class=\"card\"><h3>Descriptivos</h3><p>Media y desviación típica (o mediana), por grupo o condición. Siempre antes que la p.</p></div><div class=\"card\"><h3>Valor p</h3><p>Probabilidad de obtener un resultado igual o más extremo si H₀ fuera cierta. No es la probabilidad de que H₀ sea cierta.</p></div><div class=\"card\"><h3>Intervalo de confianza</h3><p>Rango de valores compatibles con los datos para el parámetro (al 95 %).</p></div><div class=\"card\"><h3>Tamaño del efecto</h3><p>Cuánto: d de Cohen, η²<sub>p</sub>, r. Orientativo para d: 0,2 pequeño, 0,5 medio, 0,8 grande.</p></div></div><div class=\"callout warn\"><b>Significativo no es lo mismo que importante:</b> con muestras grandes, efectos diminutos dan p < .05. Con muestras pequeñas, efectos reales pueden no salir significativos (falta de potencia).</div><div class=\"callout info\"><b>Ausencia de evidencia no es evidencia de ausencia.</b> Un p > .05 no demuestra que no haya efecto.</div>"
  },
  {
   "id": "plan",
   "titulo": "Plan de análisis y transparencia",
   "sub": "Antes y después de los datos",
   "html": "<div class=\"card-grid\"><div class=\"card\"><h3>Antes de analizar</h3><p>Revisa el tipo de cada variable en JASP (nominal, ordinal, escala), los valores perdidos y los datos imposibles.</p></div><div class=\"card\"><h3>Plan de análisis</h3><p>Cada objetivo o hipótesis tiene su análisis. Escríbelo antes de recoger los datos (preregistro).</p></div><div class=\"card\"><h3>Transparencia</h3><p>Informa de todos los análisis hechos, no solo de los significativos; comparte datos y código si es posible.</p></div></div><div class=\"callout ok\">Para el apartado «Análisis de datos» del Proyecto INDAGA usa la estación 4 del <a href=\"#indaga\">Taller del Método</a>.</div>"
  }
 ],
 "flash": [
  {
   "t": "Dos grupos independientes, VD cuantitativa",
   "d": "<strong>t de Student</strong> (o Welch); alternativa: U de Mann-Whitney."
  },
  {
   "t": "Las mismas personas medidas dos veces",
   "d": "<strong>t para muestras relacionadas</strong>; alternativa: Wilcoxon."
  },
  {
   "t": "Tres o más grupos independientes",
   "d": "<strong>ANOVA de un factor</strong>; alternativa: Kruskal-Wallis."
  },
  {
   "t": "Dos variables categóricas",
   "d": "<strong>Chi cuadrado</strong>."
  },
  {
   "t": "¿Qué es el valor p?",
   "d": "La probabilidad de un resultado igual o más extremo <strong>si H₀ fuera cierta</strong>."
  },
  {
   "t": "¿Para qué sirve el tamaño del efecto?",
   "d": "Para saber <strong>cuánto</strong>, no solo si hay diferencia."
  }
 ],
 "test": [
  {
   "q": "Se compara la ansiedad de 40 personas antes y después de un taller. ¿Qué prueba corresponde si se cumplen los supuestos?",
   "o": [
    "t para muestras independientes",
    "t para muestras relacionadas",
    "Chi cuadrado"
   ],
   "a": 1,
   "fb": "Son las mismas personas medidas dos veces."
  },
  {
   "q": "Se quiere saber si el tipo de bachillerato (tres modalidades) se relaciona con aprobar o suspender. ¿Qué prueba corresponde?",
   "o": [
    "ANOVA de un factor",
    "Chi cuadrado",
    "Correlación de Pearson"
   ],
   "a": 1,
   "fb": "Dos variables categóricas."
  },
  {
   "q": "Un estudio con 5.000 personas encuentra p < .001 y d = 0,05. ¿Qué conclusión es adecuada?",
   "o": [
    "El efecto es grande porque p es muy pequeño",
    "Hay una diferencia estadísticamente significativa pero muy pequeña",
    "No hay ningún efecto"
   ],
   "a": 1,
   "fb": "Con muestras enormes, efectos diminutos son significativos."
  },
  {
   "q": "Con 9 personas por grupo se obtiene p = .30. ¿Qué se puede concluir?",
   "o": [
    "Que el tratamiento no tiene efecto",
    "Que los datos no permiten detectar un efecto, quizá por falta de potencia",
    "Que los grupos son idénticos"
   ],
   "a": 1,
   "fb": "Ausencia de evidencia no es evidencia de ausencia."
  }
 ],
 "glosario": [
  {
   "es": "Tamaño del efecto",
   "en": "Effect size",
   "def": "Magnitud de una diferencia o relación, independiente del tamaño de la muestra."
  },
  {
   "es": "Intervalo de confianza",
   "en": "Confidence interval",
   "def": "Rango de valores del parámetro compatibles con los datos."
  }
 ],
 "emparejar": [
  {
   "label": "Set A1 · Del diseño a la prueba",
   "pairs": [
    {
     "left": "Dos grupos independientes, VD cuantitativa",
     "right": "t de Student",
     "exp": "O Welch si las varianzas difieren."
    },
    {
     "left": "Pre-post con grupo de comparación",
     "right": "ANCOVA",
     "exp": "El pretest actúa como covariable."
    },
    {
     "left": "Horas de sueño y ansiedad en la misma muestra",
     "right": "Correlación de Pearson",
     "exp": "Dos variables cuantitativas."
    },
    {
     "left": "Sexo y elección de carrera",
     "right": "Chi cuadrado",
     "exp": "Dos variables categóricas."
    }
   ]
  }
 ],
 "simuladores": [
  "potencia"
 ]
});
