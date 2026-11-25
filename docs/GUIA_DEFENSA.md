# Guía para explicar el portafolio E4

Esta guía sigue los archivos de la implementación. Sirve para preparar una demostración y localizar el código que respalda cada explicación. El resultado de los comandos y de la revisión del navegador se registra en el [README](../README.md).

## Del HTML original a React

La E2 está en `Downloads/portafolio-main/portafolio-main`. Su portada dice «Construyendo lo que viene» y contiene la misma fotografía y las tres tarjetas académicas. El [inventario](../INVENTARIO.md) describe el traslado y enlaza la captura original.

`src/main.tsx` monta `App` dentro de `StrictMode`. `src/App.tsx` organiza el tema, el router, el encabezado, el contenido de cada ruta y el pie. Las páginas y componentes usan JSX para expresar el marcado que antes se encontraba en un único HTML.

## Rutas y props

| Archivo o prop | Qué permite explicar |
| --- | --- |
| `src/App.tsx` | Define `/`, `/perfil`, `/proyectos`, `/contacto` y la coincidencia `*` para una ruta desconocida. |
| `Navbar.tsx` | `Link` y `NavLink` cambian de vista y marcan la navegación activa. |
| `ProjectCard.tsx` | Recibe `project: ProjectItem`; la tarjeta presenta los datos que le entrega su página. |
| `portfolioData.ts` | Contiene las tres tarjetas académicas originales. |
| `ProjectsPage.tsx` | `showApi` determina si se añade la consulta de GitHub. |
| `ContactPage.tsx` | `showForm` determina si se añade el formulario. |

Las props transportan datos o una decisión de presentación desde un componente padre. El estado representa valores que cambian durante la interacción. En la portada, las props permiten conservar el conjunto original de secciones y mostrar los contenidos añadidos en sus rutas propias.

## Recorrido de la consulta de GitHub

1. `ProjectsPage` presenta las tarjetas del inventario y añade `GitHubProjects`.
2. `GitHubProjects` utiliza `useRepos` y renderiza su estado.
3. `useRepos` inicia la consulta mediante un efecto y llama a `getRepos`.
4. `apiService.ts` realiza `fetch`, interpreta el estado HTTP y comprueba el JSON.
5. El hook actualiza el estado y el componente presenta datos o un mensaje con reintento.

El endpoint es `https://api.github.com/users/isidoraavs/repos?sort=updated&per_page=6`. `sort=updated` ordena los repositorios y `per_page=6` limita el tamaño de la lista. La respuesta es pública y el cliente utiliza identificador, nombre, descripción, URL, lenguaje y estrellas.

`GitHubRepo` describe los campos que necesita la vista. El JSON se recibe como `unknown` y se verifica antes de usarlo. Descripción y lenguaje admiten `null`, por lo que se muestran textos de respaldo. La URL debe corresponder a un repositorio HTTPS de GitHub.

## Estados, efectos y caché

| Situación | Comportamiento que debe poder demostrarse |
| --- | --- |
| Petición pendiente | Mensaje de carga anunciado como estado. |
| HTTP correcto con repositorios | Tarjetas con sus enlaces. |
| HTTP correcto con arreglo vacío | Mensaje de ausencia de resultados. |
| HTTP 404 de GitHub | Error de recurso no encontrado y opción de reintentar. |
| HTTP 403 o 429 | Error de acceso o límite de solicitudes. |
| Fallo de conexión o JSON inválido | Mensaje de error controlado. |

El efecto de `useRepos` sincroniza la consulta con su ciclo de vida y el reintento. `AbortController` cancela la petición al abandonar ese ciclo. El control de la petición vigente evita que una respuesta anterior sustituya un resultado más reciente.

La caché vive en memoria y caduca a los cinco minutos. Volver a la vista dentro de ese plazo permite reutilizar el resultado. Una consulta iniciada después de ese plazo, o un reintento, obtiene una nueva respuesta. Esa memoria se pierde al recargar el sitio.

## Dos significados de 404

El **404 HTTP de GitHub** proviene de una respuesta del servidor externo y se procesa en el servicio de API. La aplicación puede seguir mostrando su página de proyectos y presentar allí el error.

La **vista 404 de la aplicación** es la ruta `*` de React Router. Se muestra al visitar una dirección desconocida dentro del sitio. La coincidencia de una ruta del cliente no establece por sí sola el estado HTTP que devuelve el servidor de alojamiento.

Para demostrar ambos casos, utiliza las pruebas controladas del servicio para el error externo y visita una ruta como `/ruta-inexistente` para la vista del router.

## Contexto y formulario

`ThemeProvider` comparte `theme` y la acción `toggle`. `Navbar` consume ese contexto con `useTheme`. Un efecto sincroniza la preferencia con el documento y su persistencia local. Los componentes pueden consultar el tema sin recibirlo mediante props en cada nivel.

`ContactForm` mantiene los valores de nombre, correo y mensaje en estado. Los campos son controlados porque su valor procede del estado y sus cambios lo actualizan. La validación identifica los errores por campo y dirige el foco al dato que requiere corrección.

Después de una validación correcta, se prepara un enlace `mailto:` con asunto y contenido codificados. El envío depende de la aplicación de correo que abra la persona.

## CSS y accesibilidad

BEM organiza las clases por bloque, elemento y modificador. Por ejemplo, `project-card` identifica una tarjeta, `project-card__project-body` su contenido y `project-card--featured` su variante destacada. Los estilos conservan los colores, fuentes y gráficos de E2 y contemplan el tema oscuro y la adaptación a pantallas pequeñas.

Para explicar accesibilidad, localiza el control para saltar al contenido, el foco visible, los títulos de cada vista y el estado activo del menú. En las tarjetas, `aria-hidden` oculta gráficos decorativos. En la API, los estados se anuncian con roles y regiones vivas. En el formulario, `aria-invalid` y `aria-describedby` relacionan los campos con sus errores.

## Recorrido de preparación

1. Ejecuta los comandos de instalación, pruebas y compilación del README.
2. Abre la portada y compárala con la captura E2.
3. Navega con teclado por las rutas y revisa el foco y el título.
4. Abre proyectos y explica los estados de la consulta y el reintento.
5. Cambia el tema y recarga para revisar su persistencia.
6. Envía el formulario vacío, corrige los datos y prepara un correo.
7. Visita una ruta desconocida y explica su diferencia con un error HTTP externo.

Durante la explicación, señala una prop, un estado, un efecto y un tipo en sus archivos correspondientes. Justifica qué cambio produce cada interacción y qué comprobación demuestra su comportamiento.
