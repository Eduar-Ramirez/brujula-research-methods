# Brújula · Aprende a investigar

**Una herramienta interactiva para comprender los diseños de investigación y su relación con el análisis de datos y la estadística inferencial.**

Brújula acompaña el estudio autónomo de Métodos y Técnicas de Investigación a través de teoría, práctica y casos guiados. Permite recorrer el proceso de una investigación: formular una pregunta, elegir un diseño, analizar datos, interpretar los resultados y comunicar las conclusiones.

Está dirigida a estudiantes universitarios, especialmente de Psicología y otras disciplinas que utilizan métodos de investigación cuantitativos y cualitativos.

## Tres espacios para aprender

### 1. Explora la materia

Ofrece una visión general de la asignatura y permite consultar la teoría **por semanas o por unidades**. Cada tema comienza con una pregunta central y un esquema de conceptos, seguido de secciones desplegables para profundizar al ritmo de cada estudiante.

Incluye un mapa y un comparador de diseños. La teoría permanece accesible en todo momento, sin requisitos de desbloqueo.

![Vista de teoría organizada por unidades](docs/images/explora.jpg)

### 2. Desafíos

Un espacio de entrenamiento breve para recordar, relacionar y aplicar conceptos:

- **Tarjetas de memoria:** intentar recordar antes de consultar la respuesta.
- **Preguntas rápidas:** practicar con explicaciones de las respuestas.
- **Ejercicios de emparejar:** conectar situaciones con conceptos.
- **Simuladores:** explorar cómo cambian los resultados al modificar las condiciones.
- **Decide como un investigador:** recorrer un árbol de decisiones para orientar la elección de un diseño según la pregunta y las posibilidades del estudio.

### 3. Libera el conocimiento

El núcleo práctico de Brújula: **misiones que recorren investigaciones completas**, desde la pregunta inicial hasta el reporte de resultados.

Los casos cuantitativos que requieren trabajar con datos incluyen bases descargables, diccionarios de variables e instrucciones para analizarlas con [JASP](https://jasp-stats.org/download/). Las actividades cualitativas permiten practicar la codificación, la categorización y la interpretación.

Los datos utilizados son **simulados con fines educativos**.

![Ruta de misiones y condiciones para desbloquear el simulacro](docs/images/misiones.jpg)

## Aprender haciendo

La herramienta permite practicar decisiones sobre:

- El método científico y las tradiciones cuantitativa y cualitativa.
- Los experimentos con grupos distintos y con medidas repetidas.
- Los diseños factoriales y la interpretación de interacciones.
- Los diseños de caso único.
- La elección e interpretación de análisis adecuados al diseño.
- La comunicación de resultados y los límites de las conclusiones.

La versión actual reúne **9 unidades, 33 secciones teóricas, 70 tarjetas, 50 preguntas de práctica, 15 casos guiados y 4 simuladores**. Algunas unidades están identificadas como «En preparación» y ciertas semanas todavía no tienen una ficha teórica asociada.

## Simulacro desbloqueable

La ruta al primer parcial contiene siete misiones. Para acceder al simulacro se deben alcanzar **las dos metas**:

1. Resolver correctamente al menos el **60 % de los problemas de la ruta**.
2. Resolver correctamente al menos el **60 % de las lecturas de resultados de JASP**.

Consultar una respuesta razonada ayuda a aprender, pero ese paso no suma para el desbloqueo. Terminar el recorrido de una misión no equivale necesariamente a resolver correctamente todos sus problemas.

El simulacro presenta veinte preguntas y ofrece un diagnóstico para orientar el repaso. Se plantea como preparación para el examen; no garantiza que sus preguntas aparezcan literalmente en él.

## Acompañamiento y autonomía

Un **avatar animado de profesor** presenta orientaciones y reacciona a los avances mediante diálogos guionizados. Sus estados incluyen explicación, espera, celebración, sorpresa y reflexión ante un error.

- Modo **con guía** o **con autonomía** dentro de las misiones.
- Animaciones desactivables y respeto a la preferencia de movimiento reducido.
- Panel del profesor que puede contraerse.
- Diseño adaptable a escritorio y móvil.
- Biblioteca con glosario, amenazas a la validez y fichas de análisis.

## Mi cuaderno de investigación

El cuaderno reúne lecturas, actividades, misiones, insignias y resultados de simulacros. Permite descargar un informe y exportar una copia del progreso para restaurarla posteriormente.

Los avances se guardan **en el navegador y la dirección web utilizados**. Para cambiar de dispositivo, navegador o dirección, conviene exportar primero una copia desde el cuaderno.

## Probar la herramienta

Brújula está desarrollada con **HTML, CSS y JavaScript**, sin compilación ni servidor de aplicación. No requiere cuenta de usuario ni servicios de IA para funcionar.

Descarga el repositorio y abre `index.html` en un navegador. También puedes utilizar un servidor local desde la carpeta del proyecto:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Después abre [http://127.0.0.1:8765](http://127.0.0.1:8765).

Los recursos de la herramienta están incluidos en el repositorio. El análisis de las bases de datos se realiza por separado en JASP.

## Adaptación docente

El archivo [`datos/configuracion.js`](datos/configuracion.js) permite ajustar las unidades visibles, el cronograma, la fecha del parcial, los casos de la ruta y los umbrales de desbloqueo.

```text
index.html              Entrada de la aplicación
css/                    Estilos y diseño adaptable
js/                     Navegación, actividades y seguimiento
datos/                 Contenidos, configuración y bases de datos
graficos/              Gráficos de referencia
img/                   Imágenes y animaciones
docs/images/           Capturas utilizadas en este README
```

El seguimiento y el desbloqueo se ejecutan en el navegador. Están pensados como apoyo al aprendizaje, no como un sistema seguro de evaluación o custodia de preguntas de examen.

## Licencias

- **Código:** [licencia MIT](LICENSE).
- **Contenidos educativos:** condiciones recogidas en [LICENCIA-CONTENIDOS.md](LICENCIA-CONTENIDOS.md).
- Los logotipos institucionales quedan excluidos de estas licencias.
