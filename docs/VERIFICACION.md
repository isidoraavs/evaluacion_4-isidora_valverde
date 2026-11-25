# Verificación del frontend

Revisión técnica del 25 de noviembre de 2026 sobre la carpeta abierta en VS Code: `Downloads/evaluacion4`.

| Comprobación ejecutada | Resultado |
| --- | --- |
| `npm test` | 45 pruebas aprobadas en seis archivos, 4,42 segundos. |
| `npm run build` | TypeScript estricto y compilación Vite aprobados. |
| Estados del servicio y hook | Respuesta 200 válida y vacía, 404, 403/429, red y JSON inválido, reintento, TTL, desmontaje, StrictMode y respuestas tardías. |
| Formulario | Correo con doble arroba rechazado, errores asociados, foco y preparación de correo comprobados. |
| Navegación | Un h1 por vista, ruta 404, navegación activa y foco al navegar comprobados en DOM de pruebas. |
| Tema | Preferencia recuperada y cambio funcional incluso con almacenamiento bloqueado. |
| API GitHub real | HTTP 200 desde el equipo durante la revisión. |
| Servidores locales de E4 y referencia E2 | Ambos respondieron HTTP 200. |
| Captura original E2 | Isidora proporcionó la imagen de la portada. Se agregó sin modificar como [captura-e2.png](captura-e2.png) y se enlazó desde README e inventario. |

Las pruebas usan Vitest, Testing Library y jsdom; las respuestas de error se preparan con dobles de `fetch`. Son comprobaciones automatizadas de lógica e interfaz en un DOM de pruebas. La compilación emitió dos avisos de la dependencia React Router sobre la directiva `use client`; terminó correctamente y esos avisos se conservaron.

## Comprobación posterior en Chrome

La conexión con el navegador volvió a estar disponible y se abrió la E4 actual en `http://127.0.0.1:4173/`.

| Recorrido observado | Resultado |
| --- | --- |
| Inicio | Portada, fotografía y secciones renderizadas, con un h1. [Captura](verificacion-e4-inicio.jpg). |
| Proyectos | Se observó carga y después HTTP 200 con los repositorios reales de GitHub. [Captura completa](verificacion-e4-proyectos.jpg). |
| Contacto | El formulario vacío mostró errores y enfocó Nombre. Datos de prueba válidos prepararon un enlace de correo; no se envió ningún mensaje. |
| Perfil y tema | Perfil mostró su h1; el control cambió a tema oscuro y luego se restauró el tema claro. |
| Ruta inexistente | Apareció «404 — Página no encontrada» con enlace al inicio. |
| Ancho de 320 píxeles | Inicio, Perfil y Contacto registraron 305 píxeles de ancho de documento frente a 320 de viewport, sin desbordamiento horizontal. [Captura de Inicio](verificacion-e4-movil.jpg). |
| Consola consultada | No se observaron entradas de error en el registro consultado. |

Se restauró el tamaño normal del navegador y se dejó abierta la portada E4. Esta comprobación corresponde al servidor local del proyecto; el enlace de GitHub entrega el código y no constituye un despliegue público del sitio.

## Límites

La revisión básica de Chrome no sustituye una auditoría completa WCAG o Lighthouse, ni pruebas en dispositivos reales. No se declara una puntuación de Lighthouse. La captura de E2 fue aportada por Isidora; el HTML, CSS y foto originales también se conservan sin modificar en `docs/referencia-e2/`.

No se atribuyen a la estudiante pruebas personales, reflexiones o ensayos que no haya realizado. La bitácora identifica el trabajo asistido por IA y la guía permite preparar la defensa.
