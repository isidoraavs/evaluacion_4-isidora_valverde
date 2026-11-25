# Portafolio académico — Isidora Valverde Santibáñez

Evaluación 4 · ICINF1107 · UCT. Migración del portafolio E2 a React, TypeScript y Vite.

## Ejecutar
```bash
npm install
npm run dev
npm run build
npm run preview
```
Abre la URL que indique Vite. La compilación genera dist/.

## Diseño original
[Captura de la Evaluación 2](docs/captura-e2.png). Se conservan la fotografía, colores, fuentes, ilustraciones CSS, textos y tarjetas. La página inicial conserva todas las secciones de la E2; el menú navega mediante rutas independientes. La API y el formulario adicional se muestran en sus respectivas rutas. Se agrega tema global y formulario que prepara un correo, sin simular envío.

## API
GET https://api.github.com/users/isidoraavs/repos?sort=updated&per_page=6
No necesita clave. sort=updated ordena por actualización y per_page=6 limita la lista. Devuelve un arreglo JSON con id, name, description (nullable), html_url, language (nullable) y stargazers_count. Se eligió porque complementa los proyectos académicos con repositorios públicos reales.
El servicio comprueba response.ok, el hook usa AbortController y caché en memoria. Se muestra estado de carga, HTTP 200, lista vacía o error HTTP (incluido 404), con botón de reintento.

## Rutas
/ Inicio; /perfil Perfil; /proyectos Proyectos; /contacto Contacto; cualquier otra ruta muestra 404.

## Accesibilidad y pruebas
HTML semántico, etiquetas asociadas mediante htmlFor, foco visible, aria-label, aria-hidden, aria-live, role=status y role=alert. Navegación con teclado y preferencia de movimiento reducido. Vite generó dist/ correctamente. Pendientes: verificación completa de tipos con tsc, estados en navegador, captura E2 y auditoría Lighthouse; no se presentan resultados no medidos.

## Git
Trabajar en una rama por funcionalidad, registrar commits convencionales y abrir PR hacia main. Después de fusionar, ejecutar git switch main y git pull origin main.

