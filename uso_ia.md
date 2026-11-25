# Bitácora de uso de IA

## 1. Herramienta y alcance

Se utilizó ChatGPT/Codex como asistente para leer archivos locales, revisar la migración, modificar el proyecto y preparar documentación. La asistencia abarcó React, TypeScript, CSS, consumo HTTP, accesibilidad y procedimientos de verificación.

La IA participó en la implementación y en las correcciones. Esta bitácora identifica esas intervenciones y distingue los resultados técnicos de la comprensión y validación personal de la estudiante.

## 2. Solicitudes representativas

Se conservan estos textos representativos de las instrucciones de la usuaria.

- «hay que hacerlo con mi portafolio de frontend que hice el primero»
- «gestionar los tres estado cargando error ... codigo 200 el 404»
- «uso de la ia el inventario.md lo que tenia antes git pull aplicar accesibilidad»
- «ya hazlo entonces»

Las solicitudes guiaron la selección del portafolio original, la revisión de carga, éxito, error y lista vacía, el inventario de la migración, la accesibilidad y la documentación del trabajo con Git.

## 3. Salidas y cambios asistidos

La asistencia produjo la separación del HTML en páginas y componentes React, datos y props tipados, rutas, un hook de consulta, contexto de tema y formulario controlado.

La revisión posterior localizó la E2 en `Downloads/portafolio-main/portafolio-main`. Se contrastaron su portada, marca, fotografía, textos, tarjetas y CSS con E4. El [inventario](INVENTARIO.md) distingue los elementos originales de las funciones añadidas. La fotografía se comparó por su huella SHA-256.

En el consumo de GitHub se trabajó la validación de un JSON de tipo `unknown`, los campos necesarios para las tarjetas, las URL de GitHub, la caché de cinco minutos y el descarte de respuestas tardías. También se revisaron errores HTTP, fallos de conexión, respuesta malformada, lista vacía y reintento.

La accesibilidad se revisó mediante foco al cambiar de ruta, títulos por vista, navegación activa, mensajes de estado y errores de formulario asociados con `aria-invalid` y `aria-describedby`. Se ajustaron los estilos de ambos temas, sus estados de foco y los modificadores BEM. El formulario prepara un correo después de validar los campos.

## 4. Decisiones y límites de la asistencia

La selección visual siguió la solicitud de usar el primer portafolio. La consulta de repositorios, el tema y el formulario se incorporaron como funciones nuevas. La organización mantuvo las tarjetas académicas originales separadas de los datos obtenidos desde GitHub.

El servicio HTTP concentra la interpretación de la respuesta externa. El hook administra la petición, su ciclo de vida y la caché. El componente presenta el estado correspondiente. Esta división permite revisar el origen de un fallo en el archivo responsable.

La IA redactó esta documentación y la guía de explicación. Las frases de esta bitácora describen decisiones y trabajo asistido. La validación personal y el ensayo de la defensa quedan por realizar por la estudiante.

## 5. Comprobaciones y evidencias

La revisión técnica considera tipos y compilación, casos controlados del servicio y del hook y navegación de las vistas. Los resultados ejecutados y sus límites se consignan en el [README](README.md).

Los estados que se deben poder observar son carga, respuesta correcta con datos, respuesta correcta vacía, recurso HTTP 404, otros errores HTTP y fallo de conexión. La vista 404 de React Router se comprueba por separado porque corresponde a una URL de la aplicación.

La captura de E2 debe provenir del sitio original servido en el navegador. Las puntuaciones de Lighthouse, los ensayos de la estudiante y las comprobaciones visuales solo pueden registrarse cuando exista una medición o una observación real que los respalde.

## 6. Conclusión técnica

La migración requiere conservar contenido y diseño mientras se hacen explícitos el estado de la interfaz y los contratos de datos. TypeScript ayuda a describir el resultado esperado, y la validación en ejecución comprueba lo que realmente entrega la API. La cancelación, el descarte de respuestas anteriores y la vigencia de la caché resuelven situaciones distintas del ciclo de una consulta.

La accesibilidad debe acompañar los cambios de estado y de ruta. Un error necesita un mensaje y una relación con el campo afectado; una vista nueva necesita un título y un foco que permita continuar con teclado. La [guía de defensa](docs/GUIA_DEFENSA.md) relaciona estas decisiones con los archivos para preparar una explicación personal.
