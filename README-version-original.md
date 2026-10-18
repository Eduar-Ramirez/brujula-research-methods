# 🧭 Brújula · Laboratorio de Métodos y Diseños de Investigación

Brújula es el laboratorio de la asignatura *Métodos, Diseño y Técnicas de Investigación en Psicología* (Grado en Psicología, ESIC University). Es una web estática (HTML, CSS y JavaScript, sin servidor ni librerías externas) organizada según el cronograma del curso.

## Qué encuentra el estudiante

| Espacio | Contenido |
|---|---|
| **Inicio** | Cuenta atrás al parcial y siguiente misión. El cronograma, semana a semana, con la semana actual resaltada; cada semana enlaza a su teoría, su simulador, su caso y su test. Insignias. |
| **🏁 Parcial 1** | La ruta de práctica: 7 casos, uno por cada semana del examen. El requisito del 60 % (problemas y lecturas de JASP) y el enlace de instalación de JASP. |
| **Simulacro** | 20 ítems basados en casos (5 fáciles, 10 medios y 5 difíciles), sorteados de un banco de 93. Se abre solo cuando se cumple el requisito. Termina con un diagnóstico por semana, la calibración de la confianza y la revisión de cada ítem. |
| **Orientarse** | Mapa de diseños, brújula de decisión y comparador. |
| **Unidades** | Cada unidad tiene cuatro pestañas: Comprender (con una pregunta de «apuesta» antes de leer), Experimentar, Investigar y Repasar. |
| **Simuladores** | Dos grupos, mismo grupo, factorial 2 × 2 y caso único ABAB. |
| **Casos** | 15 casos guiados, de la pregunta a la redacción. Los cuantitativos tienen datos simulados para JASP. |
| **Repasar** | Tarjetas, test y emparejar. |
| **Consultar** | Glosario, amenazas a la validez y fichas de análisis. |
| **Mi progreso** | Progreso por unidad, competencias, simulacros, insignias e informe descargable. |

### La lectura de JASP

En cada análisis se pide **un solo dato clave** (la p, la F o la ε). Antes de pedirlo se explica en lenguaje sencillo qué es y qué papel juega. Después hay una pregunta de comprensión sobre qué significa ese número en el caso.

- La tolerancia acepta los redondeos de JASP, el signo invertido y el formato «< .001».
- Si el valor no coincide, el desplegable «¿No te coincide?» recoge las causas habituales.
- La salida completa de referencia se desbloquea al acertar.

## Configuración (profesor)

Todo lo del día a día está en **`datos/configuracion.js`**:

- `estados`: activa, en preparación u oculta cada unidad.
- `destacado`: aviso en la portada.
- `inicioCurso` y `cronograma`: semanas, títulos, unidad y caso de cada semana, y retos.
- `parcial`:
  - fecha del examen;
  - casos de la ruta;
  - umbrales (0,6 por defecto);
  - reparto de dificultad;
  - ítems por semana.

  Para el parcial 2 basta con cambiar estos valores y generar otro banco.

## Sobre el requisito y la integridad

- El requisito del 60 % y el progreso se calculan **en el navegador del estudiante** (localStorage). No hay servidor: quien sepa manipular el navegador podría saltárselo. Es una barrera pedagógica, no un control de examen. Para evaluar con garantías, usa Canvas.
- El banco de ítems (`datos/items_parcial1.js`) está **codificado** para que las respuestas no se lean a simple vista en GitHub. No es un cifrado seguro.
- La versión legible del banco (`banco_parcial1_revision.csv`) se entrega aparte y **no debe subirse** al repositorio.
- Medidas contra el estudio superficial:
  - los ítems solo se abren tras practicar;
  - el compromiso de hacerlo sin apuntes ni IA;
  - la corrección se ve al final, no ítem a ítem;
  - se priorizan ítems no vistos;
  - se registra la seguridad en cada respuesta;
  - aviso si se responde muy rápido o se sale de la pestaña (solo lo ve el propio estudiante).

## Carpetas

```
index.html                 página única
css/brujula.css            estilos (identidad ESIC)
js/nucleo.js               registro de contenidos, estado, rutas, utilidades
js/simuladores.js          simuladores (SVG propio)
js/casos.js                motor de los casos
js/repaso.js               tarjetas, test, emparejar
js/vistas.js               inicio (cronograma), orientarse, unidades, consultar, progreso
js/parcial.js              ruta al parcial, simulacro, insignias, créditos
datos/configuracion.js     ← configuración del profesor
datos/mapa.js              diseños, árbol de decisión, amenazas
datos/unidades/*.js        una unidad por archivo
datos/contenido.js         casos (GENERADO desde la app R: no editar a mano)
datos/items_parcial1.js    banco de ítems codificado (GENERADO)
datos/*.csv                datos simulados y diccionarios
graficos/*.svg             gráficos de referencia
```

## Tareas habituales

- **Activar una unidad:** `estados: { cuasi: "activa" }` en `configuracion.js`.
- **Añadir una unidad:**
  1. Copia un archivo de `datos/unidades/` y cambia `id`, `orden`, `bloque`, `tema` y `titulo`.
  2. Añade su `<script>` en `index.html`.
  3. Enlázala en el `cronograma`.
- **Casos:** se escriben en la app de R (`app/codigo/casos_*.R`) y se exportan con `DESTINO_WEB=../brujula Rscript exportar_web.R`. El dato clave de cada análisis se elige en `app/codigo/jasp_clave.R`.
- **Banco de ítems:** se edita en `desarrollo/items/` y se regenera con `python3 construir_banco.py`.

## Publicar en GitHub Pages

1. Sube el contenido de esta carpeta a un repositorio, con `index.html` en la raíz. El archivo `.nojekyll` ya está incluido.
2. En Settings › Pages, elige la rama `main` y la carpeta `/ (root)`.
3. Para probarlo en local: `python3 -m http.server` en esta carpeta.

## Licencias

- **Contenidos:** © 2026 Eduar Ramírez Riveros, [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es). Ver `LICENCIA-CONTENIDOS.md`.
- **Código:** licencia MIT. Ver `LICENSE`.
- **Logotipos de ESIC University:** excluidos de ambas licencias.

Todos los datos son **simulados** con fines docentes. Referencia principal: León, O. G. y Montero, I. (2020). *Métodos de investigación en psicología y educación* (4.ª ed.). McGraw-Hill.
