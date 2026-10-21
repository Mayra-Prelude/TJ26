# Ruta FemTech México 2026 — agenda y newsletter

Versión vigente **en español**, solicitada directamente por la usuaria. Comparte skylines y estética oscura/rosa neón con las páginas de Tijuana y CDMX en `../sponsorship-designs/`.

## Oferta y contenido actual

- Agenda de 10 actividades, agrupadas por ciudad, del 26 de octubre al 12 de noviembre de 2026.
- Cuatro skylines: Ciudad de México, Tijuana, San Francisco y Lisboa. El evento de Tec de Monterrey conserva una sección de ciudad por confirmar.
- Separadores con skyline y portadas de evento independientes. Las portadas siguen como marcadores autorizados para el handoff.
- Tijuana usa el último texto compartido de la página GHL: pase individual **USD 650**, dúo **USD 980** para el programa del 29–31. Incluye lounge y traslados oficiales; comidas, hotel y vuelos por separado.
- CDMX: cóctel por invitación y solicitudes de pase VIP. Los eventos públicos de CDMX y el Summit Tijuana tienen registro gratuito en Luma.
- Milken: Mayra participará junto con Jill Biden según la organización; detalles pendientes de revisar en Gmail. Solo información, sin gestión de reservas ni pagos. Startup World Cup y Web Summit usan enlaces oficiales.
- Algunos horarios/sedes y acceso de Silicon Valley siguen pendientes. Xesco en Tijuana lleva fecha por confirmar en materiales de pago.

Consulta [EVENTS-AND-ACCESS.md](EVENTS-AND-ACCESS.md) para fechas, contenido, acceso y páginas de pago. El último adjunto Tijuana está en `../sponsorship-designs/sources/CONTENIDO-TIJUANA-GHL.txt`; sustituye las descripciones anteriores de experiencia sin precio. No se ha verificado la cuenta GHL ni su publicación desde esta sesión.

## Archivos

- `index.html`: agenda autónoma con CSS/SVG integrados, filtros, detalles y fechas de calendario.
- `email.html`: vista autónoma para navegador, con imágenes incrustadas. Puede abrirse sola sin la carpeta de imágenes.
- `email-ghl.html`: plantilla para GHL/correo; sustituir rutas de imágenes por URLs HTTPS de medios alojados antes de enviar.
- `email.txt`: versión de texto.
- `email-preview.eml`: vista de correo sin enviar, con imágenes utilizadas adjuntas por CID.
- `assets/skylines/`: ilustraciones SVG y PNG. Valle de Guadalupe queda archivado sin figurar en la ruta actual.
- `handoff/asset-map.json`: asignación de portadas, descripción visual, datos pendientes de Drive y medios GHL.
- [HANDOFF-CLAUDE-GHL.md](HANDOFF-CLAUDE-GHL.md): instrucciones de transferencia.

## Generar y revisar

Desde la raíz del paquete:

- `npm run dev:newsletter` — puerto 3010; `/email.html` muestra el correo.
- `npm run build:newsletter` — genera correo, PNGs y salida `dist/newsletter/`.
- `python3 newsletter/package-email.py` — crea la vista MIME sin destinatarios ni envío.
- `npm run test:newsletter` — comprueba ciudades, filtros, oferta, reglas de registro, archivos ICS y móvil.

Chromium: `/usr/bin/chromium` o `CHROMIUM_PATH`. Las portadas configuradas en `covers` se integran al sitio si existen en disco; si faltan, se conserva su marcador. La generación del correo sobreescribe `email.html`: editar la fuente y regenerar, no solo el archivo exportado.

Las fechas de calendario son reservas tentativas de fecha, no admisión. El servidor solo expone páginas/medios permitidos. Los documentos internos y fuentes no se sirven públicamente. No se ha publicado, enviado o cobrado desde esta entrega.

Corrección vigente: un Summit el 30, una experiencia VIP el 31 y MedSummit retirado. Instrucción para completar Milken: [MILKEN-GMAIL-PENDIENTE.md](handoff/MILKEN-GMAIL-PENDIENTE.md).

## Alcance vigente del newsletter

El correo tiene **9 actividades**, del 26 de octubre al 6 de noviembre: sin Lisboa, Portugal ni Web Summit. La web conserva las **10 actividades**. El texto breve del correo está en `newsletter/email-copy.json` (ruta desde la raíz). Para transferir todo, leer `handoff/TRANSFERENCIA-CLAUDE.md`, `handoff/IMAGENES.md` y `handoff/COPY-CLARO.md`.

La versión vigente del newsletter usa filas compactas, portadas laterales y skylines en cabecera y separadores. Diseño: `newsletter/render-email.mjs`; texto: `newsletter/email-copy.json` (rutas desde la raíz). Ver `handoff/NEWSLETTER-COMPACTO.md`. Conservar los nueve eventos y los datos de acceso; no volver al diseño anterior guardado para comparación.
