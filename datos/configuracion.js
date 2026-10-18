/* =====================================================================
   CONFIGURACIÓN DEL PROFESOR
   Este es el único archivo que hace falta tocar para el día a día.
   ===================================================================== */
Brujula.config({

  /* Estado de cada unidad. Sobrescribe el que viene en su archivo de datos/unidades/.
     "activa"          → visible y completa
     "en-preparacion"  → visible con la etiqueta «En preparación» (teoría y repaso disponibles)
     "oculta"          → no aparece en ningún sitio
     Identificadores: fund, cuali, t4, t5, t6, t7, cuasi, epf, desc
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
    { sem: 8, titulo: "Diseños cuasiexperimentales", unidad: "cuasi", reto: "Reto 2 · Parcial 1 (29 de octubre)", parcial: true },
    { sem: 9, titulo: "Diseños no experimentales: descriptivos, correlacionales y ex post facto", unidad: "epf" },
    { sem: 10, titulo: "Selección de la muestra y recogida de datos", unidad: "desc" },
    { sem: 11, titulo: "Análisis de datos cuantitativos" },
    { sem: 12, titulo: "Presentación de datos (APA)", reto: "Reto 3 · 2.ª entrega del trabajo" },
    { sem: 13, titulo: "Consideraciones éticas" },
    { sem: 14, titulo: "Repaso general", reto: "Reto 4 · Parcial 2 (10 de diciembre)" },
    { sem: 15, titulo: "Defensa del trabajo", reto: "Reto 5 · Entrega final y póster" }
  ],

  /* Ruta al examen parcial y simulacro de ítems.
     - ruta: casos (en orden) que forman la ruta de práctica. Ids en la pestaña Casos (c01…c15).
     - umbral: proporción de problemas de la ruta que hay que resolver (sin ver la respuesta).
     - umbralJasp: proporción de lecturas de salidas de JASP correctas.
     - reparto: ítems fáciles (1), medios (2) y difíciles (3) del simulacro.
     - temas: ítems por semana del cronograma (S1…S7). La suma debe ser igual a «items».
     Para el parcial 2 bastará con cambiar fecha, ruta, temas y el banco de ítems.          */
  parcial: {
    nombre: "Parcial 1",
    fecha: "2026-10-29T09:00:00",
    ruta: ["c13", "c14", "c01", "c05", "c09", "c10", "c15"],
    umbral: 0.6,
    umbralJasp: 0.6,
    items: 20,
    reparto: { 1: 5, 2: 10, 3: 5 },
    temas: { S1: 2, S2: 2, S3: 3, S4: 4, S5: 3, S6: 3, S7: 3 },
    jasp: "https://jasp-stats.org/download/"
  }
});
