# Newsletter compacto — versión vigente

La versión actual está en `newsletter/email.html` y `newsletter/email-ghl.html`. Conserva nueve actividades, sin Lisboa.

## Cambios de diseño y texto

1. **Cabecera corta:** marca, fecha, una frase de invitación y skyline de las tres ciudades.
2. **Separadores de ciudad más bajos:** título a la izquierda, skyline a la derecha.
3. **Filas compactas:** portada pequeña a la izquierda; fecha, acceso, título y descripción a la derecha. No repetir la ciudad en cada fila.
4. **Una descripción por evento:** el resto del texto se limita a sede, horario y condiciones necesarias.
5. **Precios donde se necesitan:** Gold en su evento; el pase de tres días al inicio de Tijuana. No repetir el precio en cada actividad incluida.
6. **Botones con tareas concretas:** «Registrarme en Luma», «Consultar pase Gold» y «Ver boletos oficiales». Milken y el encuentro sin registro no tienen botones de reserva.
7. **Una nota final de registro:** nombre y contacto de cada asistente, empresa y logotipo.

No eliminar para ahorrar espacio: moneda, número de accesos, comidas excluidas, registro gratuito del Summit, acceso VIP distinto, fechas pendientes, origen de la información de Milken ni clasificación para competir en Startup World Cup.

## Comparación y revisión

A 760 píxeles de ancho, la vista pasa de **6,664 a 2,757 píxeles de alto**, un **59 % menos**. El texto pasa de aproximadamente 781 a 481 palabras. Medición de la vista de revisión con las portadas pendientes, no de todos los clientes de correo.

Se revisaron 360, 400 y 640 píxeles de ancho: nueve actividades, cuatro imágenes visibles y sin desbordamiento horizontal. Se verificó que el archivo autónomo abre sin acceso a carpetas de imágenes ni red. Los archivos CID del correo de revisión conservan las cuatro imágenes.

La versión anterior está en `previews/newsletter/before-compact/` solo para comparación. No implementarla.

## Edición e implementación

- Texto y alcance: `newsletter/email-copy.json`.
- Diseño compacto: `newsletter/render-email.mjs`.
- Generación e integración de imágenes: `newsletter/generate-email.mjs`.
- Revisión en navegador: `newsletter/email.html`.
- Plantilla para GHL: `newsletter/email-ghl.html`, con imágenes alojadas y URLs HTTPS reales antes de enviar.

Conservar las tablas y estilos en línea. La regla para móvil reduce las portadas, no el texto principal. Las imágenes originales deben conservar su proporción; evitar recortar texto o logos del cartel. No añadir todos los términos ni instrucciones técnicas de Airtable/GHL al cuerpo del correo. Mantener las condiciones aplicables en las páginas correspondientes y el detalle de implementación en las guías.
