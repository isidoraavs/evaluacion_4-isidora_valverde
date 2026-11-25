# Bitácora de uso de IA

## 1. Herramientas utilizadas

Usé ChatGPT para revisar la rúbrica, entender el código y trabajar en la migración de mi portafolio a React. También usé Gemini para organizar el README.md y la declaración de uso de IA.

## 2. Para qué pedí ayuda

Al principio me costaba entender qué se agregaba en la Evaluación 4. Sabía que tenía que ocupar mi portafolio de la E2, pero me confundía cómo incorporar lo que habíamos trabajado en React en la E3. Por eso pedí que me explicaran la pauta paso a paso, especialmente la parte de las rutas y la consulta a la API de GitHub.

## 3. Ejemplos de lo que pedí

Uno de mis mensajes fue «el profe dijo que hay q seguir el diseño de la 2», porque quería conservar la portada, mi foto y las tarjetas que ya había diseñado. También escribí «gestionar los tres estado cargando error codigo 200 el 404 y el cargando». En ese momento me confundía la diferencia entre esperar una respuesta y recibir un código de GitHub.

## 4. Qué recibí

ChatGPT me explicó cómo se relacionaba cada requisito con mi portafolio y generó código para separar las secciones en componentes, conectar el menú con las rutas y consultar mis repositorios. Me sirvió el ejemplo de la sección Proyectos. Mientras espera la respuesta, aparece «Cargando». Si GitHub responde con 200, se muestran los repositorios. Si responde con 404, aparece un mensaje que explica el error y permite reintentar.

## 5. Qué revisé y qué pedí ajustar

Leí el código y la documentación del proyecto. Durante la revisión insistí en que la página de inicio mantuviera el orden de las secciones de mi E2. Por eso la lista de repositorios se incorporó en la ruta Proyectos y la portada conservó sus tarjetas originales. Hasta ahora mi revisión ha sido mediante lectura. Me queda comprobar en el navegador cómo se ven los estados de la API y comparar la portada con la captura original.

## 6. Reflexión personal

La parte que más me costó fue entender las rutas. En mi E2, al hacer clic en «Proyectos», la página bajaba hasta esa sección. Ahora el enlace lleva a /proyectos y React muestra el componente asociado a esa dirección. Comparar esos dos comportamientos me ayudó a entender para qué sirve el cambio. Todavía necesito mirar el código para seguir ese recorrido desde el menú hasta el componente. Eso es lo que más quiero practicar para poder explicarlo con mis propias palabras.
