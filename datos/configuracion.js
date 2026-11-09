/* =====================================================================
   CONFIGURACIÓN DEL PROFESOR
   Este es el único archivo que hace falta tocar para el día a día.
   ===================================================================== */
Brujula.config({

  /* Estado de cada unidad. Sobrescribe el que viene en su archivo de datos/unidades/.
     "activa"          → visible y completa
     "en-preparacion"  → visible con la etiqueta «En preparación» (teoría y repaso disponibles)
     "oculta"          → no aparece en ningún sitio
     Identificadores: fund, cuali, t4, t5, t6, t7, cuasi, epf, desc, analisis, apa, etica
     Ejemplo: estados: { cuasi: "activa", desc: "oculta" }                                */
  estados: {},

  /* Aviso destacado en la portada (o null para no mostrar nada).
     Ejemplo:
     destacado: { titulo: "Esta semana:", texto: "practicamos el diseño factorial mixto.",
                  enlace: "#caso/c10", boton: "Abrir el caso 10 →" },                       */
  destacado: null,

  /* Mostrar u ocultar de golpe todas las unidades «en preparación». */
  mostrarEnPreparacion: true,

  /* Cronograma de la asignatura: ordena la portada semana a semana.
     inicio: lunes de la semana 1. Cada semana puede enlazar una unidad (teoría) y un caso (misión).
     reto: texto que se resalta (entregas y exámenes).                                      */
  inicioCurso: "2026-09-07",
  cronograma: [
    { sem: 1, titulo: "El método científico", unidad: "fund", caso: "c13" },
    { sem: 2, titulo: "Tradiciones cualitativa y cuantitativa", unidad: "fund", caso: "c13" },
    { sem: 3, titulo: "Métodos y análisis cualitativos", unidad: "cuali", caso: "c14" },
    { sem: 4, titulo: "Experimentos con dos o más grupos", unidad: "t4", caso: "c01" },
    { sem: 5, titulo: "Experimentos con un solo grupo", unidad: "t5", caso: "c05", reto: "Reto 1 · 1.ª entrega del trabajo" },
    { sem: 6, titulo: "Diseños factoriales", unidad: "t6", caso: "c09" },
    { sem: 7, titulo: "Diseño de caso único", unidad: "t7", caso: "c15" },
    { sem: 8, titulo: "Diseños cuasiexperimentales", unidad: "cuasi", caso: "c16", reto: "Reto 2 · Parcial 1 (29 de octubre)" },
    { sem: 9, titulo: "Diseños no experimentales: descriptivos, correlacionales y ex post facto", unidad: "epf", caso: "c17" },
    { sem: 10, titulo: "Selección de la muestra y recogida de datos", unidad: "desc", caso: "c18" },
    { sem: 11, titulo: "Análisis de datos cuantitativos", unidad: "analisis" },
    { sem: 12, titulo: "Presentación de datos (APA)", unidad: "apa", reto: "Reto 3 · 2.ª entrega del trabajo (INDAGA, Método: 25-26 de noviembre)" },
    { sem: 13, titulo: "Consideraciones éticas", unidad: "etica" },
    { sem: 14, titulo: "Repaso general", reto: "Reto 4 · Parcial 2 (jueves 10 de diciembre)", parcial: true },
    { sem: 15, titulo: "Defensa del trabajo", reto: "Reto 5 · Entrega final y póster" }
  ],

  /* Ruta al examen parcial y simulacro de ítems.
     - ruta: casos (en orden) que forman la ruta de práctica. Ids en la pestaña Casos (c01…c15).
     - umbral: proporción de problemas de la ruta que hay que resolver (sin ver la respuesta).
     - umbralJasp: proporción de lecturas de salidas de JASP correctas.
     - reparto: ítems fáciles (1), medios (2) y difíciles (3) del simulacro.
     - temas: ítems por semana del cronograma (S1…S7). La suma debe ser igual a «items».
     Para cambiar de parcial: fecha, ruta, etiquetas, temas y el banco de ítems (datos/items_parcialN.js).          */
  parcial: {
    nombre: "Parcial 2",
    fecha: "2026-12-10T09:00:00",
    semanas: "8 a 13",
    ruta: ["c16", "c19", "c17", "c18"],
    // etiqueta de cada parada de la ruta: [semana, tema, unidad]
    etiquetas: { c16: ["Semana 8", "Cuasi experimento de clase", "cuasi"], c19: ["Semana 9", "Ex post facto retrospectivo", "epf"],
                 c17: ["Semana 9", "Ex post facto prospectivo", "epf"], c18: ["Semana 10", "Muestreo, encuesta y correlación", "desc"] },
    umbral: 0.6,
    umbralJasp: 0.6,
    items: 20,
    reparto: { 1: 5, 2: 10, 3: 5 },
    temas: { S8: 4, S9: 5, S10: 4, S11: 3, S12: 2, S13: 2 },
    jasp: "https://jasp-stats.org/download/"
  },

  /* Panel sorpresa con ítems del Parcial I: se abre solo una vez (y siempre desde Desafíos). false para desactivarlo. */
  panelSorpresa: true,

  /* Taller del Método (Proyecto INDAGA, Fase 2). */
  indaga: { entrega: "25 y 26 de noviembre de 2026" }
});
