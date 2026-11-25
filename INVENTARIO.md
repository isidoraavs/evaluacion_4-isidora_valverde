# Inventario de la migración E2 → E4

## Fuente original comprobada

La referencia recuperada es `portafolio-main/portafolio-main`. Su README identifica el portafolio de la evaluación P2 de ICINF1107. Se incluye en `docs/referencia-e2/` con `index.html`, `css/style.css` e `img/isidora-valverde.jpeg`, la marca **IV.** y la portada **«Construyendo lo que viene»**.

La fotografía original y `public/img/isidora-valverde.jpeg` de E4 tienen el mismo SHA-256. Las ilustraciones de las tarjetas proceden del CSS original. Las fuentes son Manrope y DM Mono, cargadas desde Google Fonts.

Se incluye una [copia sin modificar de la referencia original](docs/referencia-e2/index.html), con su CSS y fotografía. Falta guardar una captura real como `docs/captura-e2.png`: el servicio de navegador no estuvo disponible durante la revisión. La E2 original se conserva para comparar el resultado.

## Elementos conservados y adaptación

| Elemento en E2 | Implementación en E4 | Adaptación |
| --- | --- | --- |
| Marca IV., menú Perfil, Proyectos y Contacto y enlace a GitHub | `src/components/Navbar.tsx` | `Link` y `NavLink` conectan rutas de React Router y señalan la página activa. |
| Portada, fotografía, órbitas y cruces | `src/pages/HomePage.tsx` y `public/img/isidora-valverde.jpeg` | Se mantiene la composición y se adapta el marcado a JSX. |
| Perfil, textos académicos y tres áreas de interés | `src/pages/ProfilePage.tsx` | Se conserva el contenido y se presenta también en una ruta propia. |
| API REST de estudiantes y dos tarjetas de aprendizaje | `portfolioData.ts`, `ProjectsPage.tsx` y `ProjectCard.tsx` | Los datos se tipan con `ProjectItem` y cada tarjeta recibe su contenido mediante props. |
| Contacto por Gmail, `mailto:` y GitHub | `src/pages/ContactPage.tsx` | Se conservan los enlaces de contacto. |
| Pie con marca, ubicación y datos académicos | `src/components/Footer.tsx` | Se convierte en componente compartido. |
| Azul petróleo, crema, amarillo, ocre y burdeo; fuentes y gráficos CSS | `src/index.css` e `index.html` | Se trasladan los estilos y se organizan clases de bloque, elemento y modificador BEM. |
| Animaciones de entrada, órbitas y movimiento reducido | `src/index.css` | Se conservan las animaciones decorativas. La aparición mediante `IntersectionObserver` se adapta a la entrada de las vistas React. |
| Navegación a secciones por anclas | `src/App.tsx` | Se añaden `/`, `/perfil`, `/proyectos`, `/contacto` y una vista para rutas desconocidas. |
| Inicio con todas las secciones | Composición de páginas en `src/App.tsx` | Reúne perfil, tarjetas originales y contacto. Los contenidos añadidos se activan en sus rutas correspondientes. |

## Funciones añadidas en E4

| Función nueva | Archivos principales | Comportamiento |
| --- | --- | --- |
| Repositorios públicos de GitHub | `apiService.ts`, `useRepos.ts` y `GitHubProjects.tsx` | Consulta externa con carga, éxito HTTP, lista vacía, errores y reintento. |
| Validación del JSON externo | `src/services/apiService.ts` | Comprueba campos utilizados y direcciones de GitHub antes de tratar la respuesta como `GitHubRepo[]`. |
| Caché y control de peticiones | `src/hooks/useRepos.ts` | Caché en memoria de cinco minutos, cancelación y descarte de resultados de peticiones anteriores. |
| Tema claro y oscuro | `ThemeContext.tsx`, `Navbar.tsx` y CSS | Estado compartido y persistencia de la preferencia. |
| Formulario controlado | `src/components/ContactForm.tsx` | Valida nombre, correo y mensaje, relaciona errores con campos y prepara un enlace de correo. |
| Accesibilidad de vistas y estados | Componentes, rutas y CSS | Foco, títulos por página, navegación activa y anuncios de carga, error y validación. |

El HTML de E2 contiene navegación visible por anclas y JavaScript para animaciones al desplazarse. El formulario, el tema y la consulta de GitHub se incorporan en E4. En la referencia original no aparecen controles de filtrado ni un menú hamburguesa.

Los resultados de compilación, pruebas y revisión visual se registran en el [README](README.md). La [bitácora de IA](uso_ia.md) documenta la asistencia y la [guía de defensa](docs/GUIA_DEFENSA.md) permite seguir las decisiones en los archivos.
