# Brújula · Informe de las cinco fases

Entrega: 18 de octubre de 2026. Proyecto original conservado; cambios realizados en una copia independiente.

## 1. Inventario y organización

Se conservan nueve unidades, 33 secciones teóricas, 70 tarjetas, 50 preguntas de práctica, quince casos con 160 pasos y cuatro simuladores. También se conservan los ejercicios de emparejar, glosario, ayudas, banco de simulacro, trece bases CSV con sus diccionarios y trece gráficos SVG.

| Unidad | Estado | Secciones | Tarjetas | Preguntas | Casos |
|---|---|---:|---:|---:|---|
| Método científico y tradiciones | activa | 6 | 15 | 8 | 13 |
| Investigación cualitativa | activa | 13 | 23 | 14 | 14 |
| Experimentos con grupos distintos | activa | 3 | 10 | 4 | 1, 2, 3, 4, 12 |
| Experimentos con el mismo grupo | activa | 3 | 8 | 9 | 5, 6, 7, 8, 12 |
| Diseños factoriales | activa | 2 | 5 | 4 | 9, 10, 11 |
| Diseños de caso único | activa | 2 | 5 | 5 | 15 |
| Diseños cuasiexperimentales | en-preparacion | 1 | 1 | 3 | Pendientes |
| Diseños ex post facto | en-preparacion | 1 | 2 | 2 | Pendientes |
| Observación y encuesta | en-preparacion | 2 | 1 | 1 | Pendientes |

La teoría tiene una sola fuente: la vista por semanas y la vista por unidades enlazan al mismo contenido. Las semanas 1–2 comparten fundamentos y la semana 6 tiene dos misiones en la ruta. Se corrige el texto que anteriormente afirmaba que había una misión por cada semana.

### Mapa de traslado

| Antes | Ahora |
|---|---|
| Inicio con múltiples accesos, cronograma y cuenta atrás | Portada con tres espacios y continuar donde lo dejé |
| Unidades / Comprender | Explora / lectura teórica sin preguntas |
| Orientarse / mapa y comparador | Recursos teóricos de Explora |
| Orientarse / brújula de decisión | Desafíos / Decide como un investigador |
| Repasar / tarjetas, test y emparejar | Desafíos, filtrados por tema |
| Simuladores y Experimentar | Desafíos / Experimenta |
| Casos, Investigar y Parcial 1 | Libera / ruta y catálogo completo |
| Progreso e insignias | Mi cuaderno de investigación |
| Consultar | Biblioteca de consulta permanente |

Se conservan enlaces antiguos como `#unidad/t4`, `#caso/c01`, `#parcial` o `#orientarse/brujula`.

## 2. Navegación y diseño

Tres destinos principales; biblioteca y cuaderno como accesos secundarios. Fondo claro, tipografía legible, jerarquía de títulos y tarjetas sin duplicar menús de actividades dentro de la teoría. Cada tema presenta una pregunta central y tres conceptos de orientación antes de las secciones completas. En la portada se puede retomar la última actividad.

Eduar acompaña en un panel con burbuja textual y cinco estados: hablando, esperando, celebrando, sorprendido y reflexivo. Las reacciones se activan por decisiones y correcciones; no incorporan respuestas generadas en tiempo real. La teoría permanece abierta y sin requisitos.

## 3. Piloto completo

Tema piloto: **Experimentos con grupos distintos**. Incluye esquema, tres secciones teóricas, tarjetas, preguntas, simulador de dos grupos y caso c01 «Choque emocional y memoria». Se ha probado un error, un acierto, el cambio de paso y el feedback del avatar. La lectura marcada persiste al volver a la unidad.

## 4. Extensión a toda la herramienta

Aplicado a las nueve unidades, quince casos y cuatro simuladores. Todos los archivos de datos, CSV y SVG se compararon con el original y permanecen idénticos. Se conservan motores de evaluación, tolerancias numéricas y almacenamiento v1. Los GIF se copian al proyecto: no depende de archivos fuera de esta carpeta.

Las misiones muestran problemas resueltos, respuestas consultadas, disponibilidad de datos y estados distintos para «Recorrido terminado» y «Resuelta». El simulacro conserva su doble requisito. Las fechas de entrega se trasladan al cuaderno.

Se incorpora copia/restauración del progreso JSON para cambiar de dirección o dispositivo. Se mantiene el informe HTML previo. Las fuentes R y scripts generadores del banco no estaban en el ZIP; no se han recreado ni alterado sus archivos generados.

## 5. Verificación

- Renderizado automatizado en DOM de 89 rutas, incluidas todas las unidades, sus prácticas, las quince misiones, cuatro simuladores y enlaces heredados.
- Recorrido de las trece hojas del árbol y feedback de la pregunta breve.
- Renderizado de cada paso de los quince casos y comprobación de sus descargas.
- Error, acierto y continuación del caso piloto; reacción correcta de Eduar.
- Persistencia de lectura y reutilización del estado v1 tras recarga.
- El recorrido terminado y las respuestas reveladas no desbloquean el simulacro.
- El 60 % general sin la meta de JASP no abre el acceso; ambas condiciones sí lo hacen y el desbloqueo permanece.
- Simulacro de veinte ítems: inicio, respuestas, confianza, entrega y registro del resultado.
- Desactivación de animaciones y apertura/cierre del panel.
- Revisión visual en el navegador integrado, con pantalla de escritorio y ancho móvil de 390 px. Se detectó y corrigió un estilo heredado que ocultaba la situación inicial del caso en móvil.
- Recursos locales y ficheros de contenido conservados. La verificación funcional no sustituye una revisión científica independiente de todos los textos y análisis originales.

Resultados automatizados: `VERIFICACION.json`. Las pruebas se ejecutaron sobre una instancia aislada; no alteran el progreso de los estudiantes. El navegador integrado se usó para comprobaciones visuales e interacción representativa. La ejecución de Chrome externo automatizado no estuvo disponible; se utilizó DOM simulado para las pruebas exhaustivas y navegador integrado para la revisión real.

## Alcance y decisiones pendientes

La reorganización de lo existente está completa. El contenido que ya estaba en preparación sigue identificado como tal. No se han creado preguntas nuevas de examen ni se ha cambiado la regla de desbloqueo a una condición por tema. El avatar usa los GIF aprobados, con fondo blanco y sin voz. No se ha publicado la web ni conectado un servidor de alumnos.

Para una siguiente revisión docente, conviene decidir si el banco será exclusivamente de preparación o contendrá preguntas exactas del parcial; esta entrega conserva la primera presentación y la arquitectura local original.
