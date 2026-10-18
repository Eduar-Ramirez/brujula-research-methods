# Brújula · Versión reorganizada

Herramienta de estudio autónomo de Eduar Ramírez Riveros. Esta entrega desarrolla las cinco fases aprobadas a partir del ZIP original e integra los cinco GIF del profesor.

## Abrir y probar

Abre `index.html` en un navegador de escritorio. Todos los recursos de la aplicación son locales; no requiere instalación, compilación ni servicios de IA.

Para probarla con una dirección web local:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Abre `http://127.0.0.1:8765`. Ejecuta el comando desde esta carpeta.

## Tres espacios

1. **Explora la materia**: teoría por semanas o unidades, esquemas iniciales, lecturas desplegables, mapa y comparador.
2. **Desafíos**: tarjetas, preguntas rápidas, emparejar, cuatro simuladores y diálogo «Decide como un investigador».
3. **Libera el conocimiento**: siete misiones de la ruta al parcial, catálogo completo de quince casos, descargas y simulacro.

**Mi cuaderno** conserva el progreso, las insignias, diagnósticos, informes y fechas de entrega. **Biblioteca de consulta** conserva el glosario, las amenazas y las fichas de análisis.

## Eduar

Sus intervenciones son guionizadas, basadas en los contenidos y acciones. No hay conversación libre con un modelo de IA. Los GIF se reproducen una vez por intervención y vuelven a una imagen fija. Se pueden desactivar y el sistema respeta la preferencia de movimiento reducido. El panel se puede contraer, también en móvil. Los GIF actuales conservan fondo blanco.

## Progreso y migración

Se mantiene la clave `brujula_mdi_v1` y los identificadores originales de unidades, casos, pasos y preguntas. Si se sustituye la versión en la misma dirección/origen y navegador, continúa el progreso existente. Otra dirección, puerto, navegador o dispositivo tiene almacenamiento diferente.

En **Mi cuaderno** puedes descargar una copia JSON y restaurarla en la nueva dirección. La restauración pide confirmación antes de sustituir los avances del navegador. La copia HTML de informe original sigue disponible, pero no sirve para restaurar el estado.

## Configuración docente

Sigue en `datos/configuracion.js`: unidades visibles, cronograma, fecha, ruta y umbrales. Los contenidos y las bases de datos originales no se han reescrito.

- Presentación y nuevas vistas: `js/experiencia.js`.
- Estilos nuevos: `css/experiencia.css`.
- Recursos del avatar: `img/eduar/`.
- Motores originales: `js/casos.js`, `js/repaso.js`, `js/simuladores.js`, `js/parcial.js`.
- Archivo de referencia original: `README-version-original.md`.

El desbloqueo exige **60 % de problemas y 60 % de lecturas de JASP** de la ruta. En esta configuración: al menos 45 de 74 problemas y 4 de 6 lecturas. Las soluciones reveladas no suman. Terminar un recorrido no implica haberlo resuelto; ambos estados se muestran por separado. Un desbloqueo obtenido se conserva, como en la versión original.

## Publicación

La entrega no se ha publicado. Para GitHub Pages, sube el contenido de esta carpeta con `index.html` en la raíz del sitio; se incluye `.nojekyll`. Mantén la misma dirección si quieres conservar automáticamente el progreso local.

## Límites del material original

Cuasiexperimentales, ex post facto y observación/encuesta siguen en preparación. Las semanas 11–15 no tienen fichas teóricas asociadas y se muestran como pendientes. El simulacro es material de preparación: no se presenta como una promesa de preguntas exactas del examen. El bloqueo y el banco permanecen en el navegador; no son un control seguro de examen.

Consulta `INFORME-5-FASES.md` para el inventario y las comprobaciones. Se mantienen las licencias y atribuciones del original.
