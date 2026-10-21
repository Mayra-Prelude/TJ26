# Validación de entrega

## Ejecutado en este entorno

- Instalación npm con verificación de integridad y lockfile. Caché en `/workspace/.npm-cache` porque el directorio HOME no permite escritura en este entorno.
- Build estático `npm run build`.
- Dos pruebas Node: anclas/IDs y configuración de revisión sin captura de tarjetas.
- Prueba Chromium real: errores obligatorios, correo/teléfono, factura sí/no, RFC/código postal, consentimiento explícito, resultado honesto de revisión, ausencia de envíos y almacenamiento del formulario, apertura de privacidad, CTA móvil y ausencia de desbordamiento a 360/390/768/1440 píxeles.
- Bloqueo de modo nativo sin aprobación, con HTTP o con origen no aprobado. Construcción del iframe aprobado **con un mock local**, sin verificar capacidades de GHL.
- Servidor: `.git` inaccesible y rechazo de POST; sin errores JavaScript durante el recorrido probado.
- Capturas de escritorio y móvil en `artifacts/` (generadas localmente e ignoradas por Git), revisadas visualmente.

## No ejecutado / pendiente

Cuenta GHL real, creación de contactos/oportunidades, compra sandbox, webhooks/reintentos reales, emails/SMS, archivo de logo, registro persistente de cinco invitados, seguimiento automatizado, proveedor e impuestos, revisión legal, verificación de cifras y publicación. La especificación y plantillas se entregan en docs, no como automatizaciones instaladas.

No se afirma cumplimiento legal ni accesibilidad certificada. Se incluyen labels, foco visible, errores asociados, regiones live, enlaces de salto, acordeones nativos y reducción de movimiento. Los colores, teclado, navegación y checkout deben revisarse también dentro del builder y dominio final.
