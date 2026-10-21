# Empezar aquí — entrega completa para Claude

## Versiones vigentes

| Entrega | Archivo |
| --- | --- |
| Agenda web: 10 actividades, incluye Lisboa | `newsletter/index.html` |
| Newsletter: 9 actividades, sin Lisboa | `newsletter/email.html` (revisión autónoma) |
| Newsletter para implementar | `newsletter/email-ghl.html`, `newsletter/email.txt` |
| Correo de revisión con imágenes adjuntas | `newsletter/email-preview.eml` |
| Página Pase VIP CDMX | `sponsorship-designs/cdmx.html` |
| Página experiencia Tijuana | `sponsorship-designs/tijuana.html` |
| Bloques para pegar en GHL | `sponsorship-designs/cdmx-ghl-block.html`, `tijuana-ghl-block.html` |
| Skylines listos para usar | `IMAGENES/skylines/` y `newsletter/assets/skylines/`; ver `handoff/IMAGENES.md` |
| Capturas para comparar | `previews/` |

## Instrucción para Claude

Implementa estas versiones en español. Mantén el diseño oscuro y rosa, los skylines en los separadores de ciudad y las portadas de cada evento en su espacio. Usa texto corto y directo según `handoff/COPY-CLARO.md`. El correo tiene un skyline de las tres ciudades en cabecera y un skyline por separador; las páginas incluyen el de su ciudad en cabecera y programa. No reconstruyas la oferta a partir de fuentes históricas.

El newsletter termina el 6 de noviembre en San Francisco: no incluir Lisboa, Portugal ni Web Summit en el correo. La web conserva Web Summit. El texto breve del correo se edita en `newsletter/email-copy.json` y se genera con `newsletter/generate-email.mjs`.

Para los pases VIP, reutiliza el Airtable ya creado. Recoge empresa, logotipo y nombre, correo y teléfono de cada asistente: dos lugares requieren dos personas; cinco requieren cinco. Vincula la reserva al enlace de pago GHL correcto. Sigue `sponsorship-designs/AIRTABLE-GHL-REGISTRO-VIP.md`. No inventes enlaces ni afirmes que los formularios de esta entrega ya están conectados.

CDMX es **Pase VIP Gold · 5 accesos**, 30,000 pesos mexicanos de referencia. Tijuana cuesta 650 dólares estadounidenses por persona o 980 por dos; incluye programa y traslados, sin comidas. Conserva los términos y pendientes de cada ciudad. Un Summit el 30 y una experiencia VIP el 31; sin MedSummit.

Para Milken, verifica la invitación en Gmail según `newsletter/handoff/MILKEN-GMAIL-PENDIENTE.md`. Mayra participa junto con Jill Biden según la organización; no inventes sesión, formato ni horario. FemTech no gestiona reservas para ese evento.

Recupera las portadas pendientes según `handoff/IMAGENES.md`; están documentadas pero no adjuntas como originales. Mantén marcadores hasta conseguirlas. El mapa de colocación está en `newsletter/handoff/asset-map.json`.

Para GHL usa `email-ghl.html` con imágenes alojadas y URLs HTTPS reales. `email.html` contiene base64 para revisión en navegador y no es la plantilla de envío. Integra remitente, domicilio y enlace de baja. No publicar, enviar ni cobrar automáticamente al recibir este paquete; entregar la implementación para revisión.

## Historial y archivos técnicos

Los archivos en `newsletter/sources/`, `sponsorship-designs/sources/` y el sitio Gold antiguo en la raíz se incluyen como historial. Sus instrucciones anteriores de patrocinio, comidas o agenda no prevalecen sobre esta guía. El archivo `docs/README-GOLD-ARCHIVADO.md` documenta ese sitio anterior.

No se incluyen dependencias instaladas, secretos, `.git` ni copias redundantes de compilación. Están los fuentes y scripts para reconstruir las entregas. Instalar dependencias con `npm ci`. Usar Chromium del sistema o `CHROMIUM_PATH`.

- Revisar agenda/correo: `npm run dev:newsletter`.
- Revisar páginas: `npm run dev:sponsorships`.
- Regenerar correo: `npm run build:newsletter` y `python3 newsletter/package-email.py`.
- Verificar: `npm run test:newsletter` y `npm run test:sponsorships`.

`FILE-MANIFEST.json` enumera los archivos del ZIP, tamaños y huellas SHA-256 para verificar la transferencia.

La versión vigente del newsletter usa filas compactas, portadas laterales y skylines en cabecera y separadores. Diseño: `newsletter/render-email.mjs`; texto: `newsletter/email-copy.json` (rutas desde la raíz). Ver `handoff/NEWSLETTER-COMPACTO.md`. Conservar los nueve eventos y los datos de acceso; no volver al diseño anterior guardado para comparación.

Para transferir esta carpeta mediante Drive o adjuntos, sigue `handoff/COMO-COMPARTIR-CON-CLAUDE.md` y copia `handoff/PEGAR-EN-CLAUDE.txt`. El enlace real de Drive debe obtenerse después de subir la carpeta; no se ha creado uno desde esta sesión.

## Correos posteriores a la compra

Se añadieron 12 correos (6 CDMX / 6 Tijuana) en `purchase-emails/`, con textos, HTML para GHL, vistas previas autónomas, PNG, variables y reglas de automatización. Leer `purchase-emails/HANDOFF-CLAUDE-GHL.md` y `purchase-emails/WORKFLOWS.md`. El registro previo al pago sigue vigente: los correos solo solicitan pendientes y nunca duplican un Airtable ya completo. No están conectados ni enviados.
