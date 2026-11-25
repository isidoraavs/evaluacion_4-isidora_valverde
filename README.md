# Portafolio de Isidora Valverde — Evaluación 4

Portafolio de ICINF1107, desarrollado con React, TypeScript y Vite a partir del diseño de la Evaluación 2. Conserva la fotografía, paleta, tipografías, textos, gráficos CSS y tarjetas académicas originales.

[Repositorio de entrega en GitHub](https://github.com/isidoraavs/evaluacion_4-isidora_valverde).

## Instalación y ejecución

Requiere Node.js 22.12 o superior y npm. Desde la carpeta del proyecto:

```powershell
npm ci
npm run dev
```

Abre la dirección que imprime Vite. En PowerShell, si la política de ejecución bloquea npm, usa `npm.cmd` en los mismos comandos.

```powershell
npm run typecheck
npm test
npm run build
npm run preview
```

`npm ci` instala las versiones del archivo de bloqueo. La compilación genera `dist/`. Al alojar la aplicación, el servidor debe devolver `index.html` para las rutas de React Router.

## Rutas, componentes y estado

| Ruta | Contenido |
| --- | --- |
| `/` | Portada y secciones originales de E2, con un único h1. |
| `/perfil` | Perfil e intereses. |
| `/proyectos` | Tarjetas originales y repositorios consultados desde GitHub. |
| `/contacto` | Enlaces originales y formulario validado que prepara un correo. |
| Cualquier otra | Vista 404 con regreso al inicio. |

`App` compone las páginas con Navbar y Footer. Los datos locales viven en `src/data/`; las interfaces, props y estados en `src/types/`. `ProjectCard` recibe datos por props. `ThemeContext` comparte la preferencia de tema entre las vistas y la conserva cuando el almacenamiento del navegador está disponible.

## API pública y contrato

```text
GET https://api.github.com/users/isidoraavs/repos?sort=updated&per_page=6
```

Se eligió GitHub porque aporta repositorios públicos reales al portafolio. No se utiliza una clave ni credenciales. `sort=updated` ordena por actualización y `per_page=6` limita la respuesta. El contrato documentado por [GitHub](https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user) contiene un arreglo del que se utilizan `id`, `name`, `description`, `html_url`, `language` y `stargazers_count`. Descripción y lenguaje admiten `null`.

El servicio recibe el JSON como `unknown`, verifica cada campo y acepta enlaces HTTPS de GitHub. El hook usa `fetch`, `useEffect` y `AbortController`, descarta respuestas anteriores y conserva resultados durante cinco minutos en memoria. Reintentar invalida la caché. Al recargar la pestaña, la caché desaparece.

| Estado visible | Comportamiento |
| --- | --- |
| Cargando | Indica que la consulta está pendiente mediante `role="status"`. |
| Éxito | Muestra HTTP 200 y tarjetas con nombre, descripción, lenguaje, estrellas y enlace. |
| Vacío | Una respuesta correcta sin repositorios muestra «No hay resultados para mostrar». |
| Error | Explica el HTTP 404, límite 403/429, fallo de conexión o respuesta inválida; ofrece reintento. |

El HTTP 404 de GitHub es un error de la consulta externa. La vista 404 de React Router corresponde a una dirección inexistente de este portafolio.

## Interacciones y accesibilidad

Se utilizan elementos semánticos, controles nativos, etiquetas asociadas con `htmlFor`/`id`, errores relacionados con `aria-invalid` y `aria-describedby`, anuncios con `aria-live`, foco visible, enlace para saltar al contenido y foco al cambiar de vista. El tema usa `aria-pressed`. Los encabezados identifican cada página. Los estilos incluyen adaptación móvil y preferencia de movimiento reducido.

El formulario valida los campos y prepara un enlace `mailto:`. El envío ocurre en la aplicación de correo que abra la persona; el portafolio no afirma haber enviado un mensaje.

Las clases siguen BEM, con modificadores como `header__nav-link--active`. Los estilos de Navbar y formulario están separados. Se preservan los colores de E2 y se ajustan textos y foco para mejorar contraste en ambos temas.

## Inventario, referencia e IA

- [INVENTARIO.md](INVENTARIO.md): qué se conservó, cambió y añadió.
- [Referencia original E2](docs/referencia-e2/index.html): copia sin modificar de HTML, CSS y fotografía para comparar el diseño. El proyecto E2 original permanece intacto.
- [uso_ia.md](uso_ia.md): herramientas, prompts, asistencia recibida, cambios, verificaciones y conclusión técnica.
- [Guía de defensa](docs/GUIA_DEFENSA.md): recorrido de componentes, props, rutas, estado, API y accesibilidad.
- [Verificación](docs/VERIFICACION.md): resultados y límites de la revisión.

**Pendiente visual:** guardar la captura real de la E2 como `docs/captura-e2.png`. La herramienta de navegador no pudo conectarse durante esta revisión; se incluyó la fuente original y no se fabricó una imagen. Tampoco se declara una puntuación de Lighthouse o una prueba visual móvil no ejecutada. La estudiante debe revisar la bitácora y ensayar su explicación personal.

## Git y entrega

El directorio exportado incluía un `evaluacion4.bundle`; se recuperó su historial de E4 y se trabajó en `fix/revision-final-frontend`. Las ramas originales conservan la migración y documentación anteriores. Los cambios se agrupan en commits de funcionalidad, corrección y documentación, con revisión mediante PR hacia `main`.

Para actualizar una copia ya vinculada a GitHub, primero guarda sus cambios locales y luego ejecuta:

```powershell
git switch main
git pull --ff-only origin main
```

La entrega es la URL del repositorio nuevo de E4; el repositorio de E2 se conserva aparte. El historial registra las fechas reales de los cambios.
