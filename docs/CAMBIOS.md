# Historial de cambios

## 09/11/2026 · Versión 3: Parcial 2 (semanas 8-13), Charo IA, panel sorpresa, Taller INDAGA y cuaderno

**Teoría y desafíos (semanas 8-13)**
- Unidades reescritas a partir de las diapositivas nuevas: `cuasi` (Semana 8), `epf` (Semana 9: descriptivos, correlacionales y ex post facto) y `desc` (Semana 10: muestra y recogida de datos). Seis secciones cada una.
- Unidades nuevas y breves: `analisis` (Semana 11, remite a JASP y a las fichas), `apa` (Semana 12: estructura del informe, resultados y citas en APA 7) y `etica` (Semana 13: casos históricos, principios y códigos actuales).
- Cronograma sin fusionar semanas; cada semana enlaza su unidad y su misión. Las preguntas rápidas nuevas tienen 3 opciones, como el examen.
- Las preguntas rápidas registran ahora el acierto de cada pregunta (`testItems`) para el mapa de dominio.

**Misiones 16-19** (`datos/casos_parcial2.js`, generado por `gen/casos_p2.py` fuera del repositorio)
- c16 · Lectura de la mirada: datos **reales** anonimizados de la actividad del 05/11 (códigos nuevos, sin sexo). ANCOVA, abandono, potencia y regresión a la media.
- c17 · Prospectivo de grupo único (regresión múltiple). c18 · Encuesta por conglomerados, preguntas mal formuladas y correlación. c19 · Retrospectivo con cuasi control (chi cuadrado).
- Nuevas fichas de análisis: cuasi, ANCOVA, ex post facto, regresión, chi cuadrado y muestreo.

**Seis simuladores nuevos** (`js/simuladores_p2.js`): regresión a la media, serie temporal interrumpida, tercera variable (Simpson), laboratorio de muestreo, potencia y acuerdo entre observadores (kappa). `js/simuladores.js` expone sus utilidades en `Brujula.simAux` y admite botones `data-sim-nuevo` y listas desplegables.

**Parcial 2**
- Ruta: c16, c19, c17, c18. Simulacro de 20 ítems (S8 4, S9 5, S10 4, S11 3, S12 2, S13 2; 5/10/5 por dificultad) sobre un banco de 65 ítems de 3 opciones (`datos/items_parcial2.js`), adaptados del TAI del profesor o nuevos, con el procedimiento de `crear-items`.
- `js/parcial.js`: clave del banco por archivo, etiquetas de la ruta en la configuración, número de opciones variable y estado separado por parcial (el del Parcial 1 se conserva en `parcial`; el del 2, en `parciales["Parcial 2"]`).

**Panel sorpresa** (`js/panel.js`, `datos/panel_sorpresa.js`): 14 ítems del Parcial I, dos por semana (los de menor acierto). Aparece una vez en la portada y siempre en Desafíos (`#panel`). Primero se responde y se indica la seguridad; después, la clave, el porcentaje de la clase que eligió cada opción y la «trampa».

**Taller del Método INDAGA** (`js/indaga.js`, `#indaga`): cuatro estaciones del apartado 6 (población y muestra, recogida de datos, ética y análisis), calculadora de tamaño, revisor de preguntas, sugerencia de prueba por hipótesis, borrador descargable en Word y tabla de uso de IA para la Tabla 5.

**Charo IA** (`js/charo.js`, `js/charo-config.js`, `backend-charo/`): tutora socrática con IA en un panel lateral, homenaje a Rosario (Charo) Martínez Arias. Mismo esquema que Antonio IA de Faro (Cloudflare Worker + Gemini). Modos teoría, misión e INDAGA; envía el contexto de la pantalla; aviso de privacidad, filtro de DNI, correo o teléfono y límite diario. Sin servidor configurado, prepara la pregunta para copiarla. Página `#charo`.

**Cuaderno de progresos** (`js/cuaderno.js`, `datos/cuaderno_conceptos.js`): mapa de dominio por concepto (18 conceptos de las semanas 8-13): dominado, repasar, prioritario o sin datos, con prioridades y enlaces de repaso. Imprimible.

**Coherencia**: barra superior «Métodos y Diseños de Investigación»; León y Montero (2015) en pie y créditos.


## 20/10/2026 · Tema 6 y documentación

**Simulador nuevo: «Laboratorio del café: simetría e independencia»** (`#simulador/cafe-2x2`)
- Archivo: `js/simuladores.js` (simulador 5) y estilos al final de `css/experiencia.css`.
- Café (sin / con) × horas de sueño (8 h / 4 h). Se pueden mover las cuatro casillas o, con «Mover los efectos», la media general, los dos efectos principales y la interacción.
- Dos gráficos con los mismos datos (sueño en el eje X y café en el eje X), con las separaciones entre líneas marcadas.
- Recuadros «Es simétrica» (la interacción calculada desde cada VI) y «Es independiente» (barras de los tres efectos).
- Cinco escenarios y tres retos, que se guardan en el progreso como los demás simuladores.
- Aparece en Desafíos › Diseños factoriales y se enlaza desde la sección «Efectos e Interacción» de la teoría.

**Desafíos del tema 6: todo sobre diseños factoriales**
- Tarjetas: de 5 a 17. Las 5 primeras se mantienen en su posición para no perder el progreso.
- Preguntas rápidas: de 4 a 15 (efectos simples y principales, interacción, simetría, independencia, ordinal o cruzada, diseño mixto, nº de F, gl y efecto suelo).
- Emparejar: el antiguo «Set 3 · Diseños T6–T7» mezclaba 3 parejas de caso único y 1 de factorial. Ahora hay 3 ejercicios solo de factoriales.
- Las 3 parejas de caso único pasan al tema 7 («Set · Diseños de caso único»), con una cuarta sobre el PND.

**Documentación**
- README reescrito: capturas de cada espacio (`docs/capturas/`), cifras actualizadas, configuración, publicación en GitHub Pages y límites.
- Corregido: el README decía «cuatro simuladores» y «la entrega no se ha publicado»; describía la versión anterior como actual.
- La documentación de la versión del 15/10 pasa a `docs/historial/`. El informe de las cinco fases conserva sus cifras del 18/10 con una nota de actualización.
- Licencia de contenidos: se precisan los archivos de logos excluidos y se añade una nota sobre las imágenes de Eduar.

## 18/10/2026 · Reorganización en tres espacios

Explora la materia, Desafíos y Libera el conocimiento, con Eduar como acompañante. Detalle en [`INFORME-5-FASES.md`](../INFORME-5-FASES.md).

## 15/10/2026 · Preparación del parcial 1

Ruta de siete casos, simulacro de 20 ítems, banco de 93 ítems y lectura de JASP. Documentación de esa versión en [`historial/README-version-15-10-2026.md`](historial/README-version-15-10-2026.md).
