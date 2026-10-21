# Entrega a Claude — correos de compra CDMX y Tijuana

Estado: **12 borradores diseñados y redactados, sin conexión ni envío**. Implementar en modo borrador y entregar pruebas para revisión. No activar workflows ni enviar a compradores reales al importar.

## Archivos y revisión

- `index.html`: galería local con los 12 correos. Descargar la carpeta/repositorio y abrir en navegador. GitHub muestra código, no ejecuta HTML.
- `preview/*.html`: cada correo autónomo, skyline incrustado y datos de muestra claramente marcados. NO importar ni enviar estas versiones.
- `templates/*.html`: HTML de correo con tablas, estilos inline, PNG y ajustes móviles; usar estas versiones en GHL.
- `text/*.txt`: alternativa de texto plano, mismo mensaje.
- `COPY-EMAILS.md`: los 12 textos para leer sin abrir HTML.
- `content.json`: textos editables, asunto, preheader, destinatario y disparador.
- `variables.json`: origen y tipo de cada variable. Los valores de ejemplo no son datos reales.
- `manifest.json`: archivos y variables requeridas por correo.
- `assets/cdmx.png`, `assets/tijuana.png`: skylines incluidos, del mismo diseño de web/newsletter.
- `WORKFLOWS.md`: condiciones, horarios y pruebas de automatización.
- `screenshots/`: muestras del diseño en escritorio/móvil, para revisar en GitHub.

Regenerar: `python3 purchase-emails/generate.py`. No editar solo HTML generado. La galería contiene datos ficticios para revisión; no registra ni procesa pagos.

## Importación de HTML y campos

1. Reutilizar productos GHL y Airtable existentes según `sponsorship-designs/AIRTABLE-GHL-REGISTRO-VIP.md`. El recorrido original sigue siendo Airtable → pago GHL. Estos correos son posteriores al pago: no pedir un segundo registro si ya está completo.
2. Crear carpetas de plantillas separadas: `Ruta 2026 / CDMX / Compra` y `Ruta 2026 / Tijuana / Compra`. Importar los seis HTML correspondientes, asunto, preheader y texto plano de `manifest.json`.
3. **Los marcadores `{{FM_...}}` son especificaciones de entrega, NO sintaxis nativa validada de GHL.** Mapear a campos reales comprobados en esa cuenta. Mantener una tabla del marcador → campo real → fuente. Usar campos por reserva/pedido, no solo campos de contacto que una segunda compra pueda sobrescribir. Si GHL no soporta una relación o rama, documentar la integración necesaria sin afirmar que ya funciona.
4. Subir los dos PNG a la biblioteca de medios GHL. Sustituir `FM_SKYLINE_*_URL` por URLs HTTPS públicas que devuelvan `image/png`. Conservar alt, ancho fluido y altura automática. No SVG/base64/rutas locales en correo de envío.
5. Los datos insertados deben escapar HTML. Validar todos los enlaces: HTTPS autorizado; bloquear `javascript:`, `data:`, enlaces de administración, dominios `.invalid` y marcadores. Los nombres/empresa largos deben ajustar línea.
6. Configurar remitente, Reply-To atendido, identidad/domicilio y privacidad. Respetar baja, DND, rebotes y preferencias del proveedor. Clasificar los avisos operativos según la configuración real; no eludir restricciones. El seguimiento opcional/encuesta solo se envía a destinatarios elegibles. Si no se puede entregar un aviso esencial, crear tarea para atención por canal autorizado.
7. Crear la versión individual para correos 04 y 05 con saludo y acceso de cada asistente. No reenviar al grupo una lista de nombres, teléfonos, correos ni comprobantes. Correos 01, 02, 03 y 06 van al comprador. El 03 resume nombres de su propia reserva únicamente.

## Datos que faltan antes de habilitar

| Dato | Uso / responsable |
| --- | --- |
| Responsable de reservas: nombre, correo y opcional WhatsApp | Confirmación, registro y seguimiento |
| Responsable de logotipos: nombre, correo y opcional WhatsApp | CDMX 03 y Tijuana 03 |
| Responsable presencial CDMX: nombre y WhatsApp | CDMX 04–05 |
| Responsable de logística Tijuana: nombre, correo y WhatsApp | Tijuana 03–05 |
| Plazo de logotipo y requisitos de exhibición CDMX | CDMX 03; no prometer medidas, equipo ni posiciones sin acuerdo |
| Airtable: registro, actualización de materiales y datos de llegada | Reutilizar vistas/formulario existentes; no duplicar base |
| Sede, dirección, horario y acceso del cóctel CDMX | No asumir que son los de la conferencia pública |
| Programa/traslados Tijuana y primer encuentro | No prometer aeropuerto/hotel; solo sedes oficiales incluidas |
| Accesos individuales o método real de entrada | No generar QR ficticio |
| Identidad fiscal/IVA/total y condiciones CDMX | Pendientes de la página de pago; bloquear cobro hasta resolución |
| Comprobante real por pedido | No confundir con factura fiscal |
| Seguimiento de beneficios CDMX y encuesta Tijuana | Desactivar correo 06 si no están listos |
| Remitente, privacidad, preferencias y datos legales | En todos los correos |

Ningún pendiente debe llegar como texto de muestra a clientes. Si falta un dato requerido, retener ese envío y crear tarea al responsable. No detener un recibo operativo válido porque la encuesta futura aún no exista: las dependencias son por plantilla.

## Ofertas y alcance

CDMX: Gold incluye cinco personas por paquete, precio de referencia MXN 30,000. Mostrar en el correo el **importe realmente pagado**, no ese precio antes de conocer impuestos. Presencia de logo, pequeño espacio de exhibición y vinculación de seis meses según calendario. No prometer afiliación ni ponencia. Sede/hora del cóctel pendientes; invitación privada, no registro público de conferencia.

Tijuana: individual USD 650 / dúo USD 980, multiplicados por unidades autorizadas; total recibido desde el pago verificado. Incluye programa del 29–31 y traslados entre sedes oficiales. **No incluye comidas, hotel ni vuelos**. Pedir empresa/logotipo conforme al Airtable existente no crea derechos de exposición ni convierte el pase en patrocinio. No añadir exhibición o promoción de marca a Tijuana sin un beneficio documentado.

El 30 hay un Summit. El 31 hay una experiencia que agrupa recorridos y cierre. No MedSummit. No mezclar eventos de Milken, Silicon Valley o Lisboa en estas secuencias poscompra.

Los correos no modifican los términos aceptados. Consultar los términos vigentes por ciudad ante cambios/cancelaciones; no copiar políticas entre ciudades ni renovar plazos vencidos.

## Logotipos y logística

- Usar el adjunto y el contacto de materiales existentes en Airtable; logo en SVG o PNG de alta resolución, preferentemente transparente. Registrar pendiente/recibido/en revisión/aprobado y fecha límite acordada.
- No volver a pedir archivos aprobados. `FM_ESTADO_LOGOTIPO` debe mostrar el estado real. Escalar materiales tardíos al responsable, sin prometer producción si el plazo venció.
- Datos de llegada: fecha/hora local y lugar de llegada solo si hacen falta para coordinar; teléfono disponible durante viaje. Vuelo/alojamiento solo cuando la logística aprobada lo necesite. No pasaportes, tarjetas ni documentos sensibles por correo.
- `FM_CONTACTO_LOGOTIPOS`, `FM_CONTACTO_LOGISTICA`, `FM_CONTACTO_CDMX` y `FM_CONTACTO_RESERVAS` contienen nombre y canales de contacto reales, no el cargo aislado. El equipo puede compartir responsable, pero la función debe quedar clara.

## Entrega que esperamos de Claude

Plantillas y workflows en borrador; mapeo de productos, campos, Airtable y destinos; capturas móvil/escritorio; mensajes de prueba enviados solo a direcciones autorizadas; evidencia de los casos de `WORKFLOWS.md`; lista breve de pendientes. Probar Outlook, Gmail y Apple Mail con la herramienta disponible: la revisión en navegador no prueba todos los clientes de correo.
