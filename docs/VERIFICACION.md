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

Las pruebas usan Vitest, Testing Library y jsdom; las respuestas de error se preparan con dobles de `fetch`. Son comprobaciones automatizadas de lógica e interfaz en un DOM de pruebas. La compilación emitió dos avisos de la dependencia React Router sobre la directiva `use client`; terminó correctamente y esos avisos se conservaron.

## Límites pendientes

El control de navegador falló al conectar con su servicio. No se obtuvo una captura real de E2 ni una revisión visual completa de escritorio/móvil o Lighthouse. El HTML, CSS y foto de E2 se incluyeron sin modificar en `docs/referencia-e2/`; para cerrar el requisito visual, abrir esa referencia y guardar una captura real como `docs/captura-e2.png`.

No se atribuyen a la estudiante pruebas personales, reflexiones o ensayos que no haya realizado. La bitácora identifica el trabajo asistido por IA y la guía permite preparar la defensa.
