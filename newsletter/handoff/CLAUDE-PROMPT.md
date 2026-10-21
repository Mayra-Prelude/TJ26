Continúa con la versión vigente en español de la agenda, newsletter, experiencia Tijuana y pase VIP CDMX. Lee `newsletter/HANDOFF-CLAUDE-GHL.md`, `newsletter/EVENTS-AND-ACCESS.md` y `sponsorship-designs/HANDOFF-CLAUDE-GHL.md`.

Mantén los skylines prominentes, la estética oscura y rosa neón, y las portadas independientes por evento. Recupera los originales de la carpeta Drive documentada; los marcadores siguen autorizados hasta disponer de archivos. No inventes URLs ni arte sustitutivo.

La última fuente Tijuana ofrece USD 650 individual y USD 980 dúo para tres días, con lounge y traslados oficiales. Sustituye el modelo anterior sin precio. CDMX conserva el cóctel por invitación y la propuesta Gold empresarial. Milken es solo informativo. Luma y los organizadores externos mantienen sus registros correspondientes.

Pega los bloques Tijuana/CDMX en elementos Custom Code/HTML. Conecta el Airtable existente para el registro de empresa, logotipo y todos los asistentes, y continúa al enlace de pago GHL. Sigue `sponsorship-designs/AIRTABLE-GHL-REGISTRO-VIP.md` (desde la raíz). No construyas formularios de tarjeta propios. Respeta los términos y pendientes descritos en la guía, incluida la fecha por confirmar de Xesco en material de pago. Prepara la implementación para revisión; esta entrega no instruye publicar, enviar correos ni realizar cargos.

## Corrección de agenda y pendiente Milken

La agenda vigente contiene **10 actividades**: un solo Summit el 30 de octubre, una sola experiencia VIP el 31 y sin MedSummit. Mantener el acceso público gratuito del Summit en Luma y los beneficios VIP dentro del mismo evento. Mayra participará junto con Jill Biden, según lo compartido por la organización. Antes de completar GHL, seguir `newsletter/handoff/MILKEN-GMAIL-PENDIENTE.md` (ruta desde la raíz de la entrega) para verificar el contexto en Gmail y actualizar web/correo. Esta sesión no dispone de Gmail. Milken permanece solo informativo y sin reservas ni cobros de FemTech.

**Última instrucción de Tijuana:** comidas no incluidas; se pagan por separado. Mantener los traslados entre sedes oficiales incluidos. Esta corrección prevalece sobre las fuentes archivadas. Precios sin cambios.

## Instrucción vigente: pases VIP y Airtable

CDMX es **Pase VIP Gold**, cinco asistentes por MXN 30,000 de referencia; ya no se presenta como patrocinio. Seguir `sponsorship-designs/AIRTABLE-GHL-REGISTRO-VIP.md` desde la raíz del paquete. Reutilizar el Airtable existente para empresa, logotipo y nombre completo, correo y teléfono de cada persona; dos lugares requieren dos registros, cinco requieren cinco. Vincular la reserva al enlace de pago GHL. Las URLs deben recuperarse de la configuración existente: no fueron proporcionadas en esta conversación.

Para el newsletter, `email.html` es solo la vista autónoma de navegador con imágenes incrustadas. Implementa `email-ghl.html`, alojando las imágenes en GHL y sustituyendo cada ruta local por su URL HTTPS real. `email-preview.eml` contiene imágenes adjuntas CID para revisar en un cliente de correo.

## Alcance vigente del newsletter

El correo tiene **9 actividades**, del 26 de octubre al 6 de noviembre: sin Lisboa, Portugal ni Web Summit. La web conserva las **10 actividades**. El texto breve del correo está en `newsletter/email-copy.json` (ruta desde la raíz). Para transferir todo, leer `handoff/TRANSFERENCIA-CLAUDE.md`, `handoff/IMAGENES.md` y `handoff/COPY-CLARO.md`.

La versión vigente del newsletter usa filas compactas, portadas laterales y skylines en cabecera y separadores. Diseño: `newsletter/render-email.mjs`; texto: `newsletter/email-copy.json` (rutas desde la raíz). Ver `handoff/NEWSLETTER-COMPACTO.md`. Conservar los nueve eventos y los datos de acceso; no volver al diseño anterior guardado para comparación.
