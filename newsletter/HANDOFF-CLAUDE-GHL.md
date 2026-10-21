# Agenda y newsletter — entrega a Claude / GHL

## Modelo vigente

Todo el contenido se entrega **en español**. La agenda, Tijuana y CDMX comparten fondo oscuro, rosa neón y skylines. El newsletter mantiene los separadores por ciudad y las mismas portadas.

La nueva fuente Tijuana, `../sponsorship-designs/sources/CONTENIDO-TIJUANA-GHL.txt`, sustituye el modelo anterior sin precio: **USD 650 individual / USD 980 dúo**, programa completo del 29–31. El cóctel CDMX sigue por invitación y admite pase VIP Gold. Milken es solo información. Consulta `EVENTS-AND-ACCESS.md` para las 10 actividades y sus condiciones.

## Originales y marcadores

Carpeta proporcionada:

```text
G:\My Drive\11 - Femtech Mx\06 - Eventos\MexicoTech Week 2026\FemTech Assets
```

Drive web: **My Drive → 11 - Femtech Mx → 06 - Eventos → MexicoTech Week 2026 → FemTech Assets**. La ruta local no otorga acceso automático. Faltan URL de carpeta, IDs y nombres originales; no inventarlos.

| Clave | Colocación | Cómo reconocer el original |
| --- | --- | --- |
| `xesco-tech-week` | 26 oct: conferencia y cóctel CDMX | Xesco Espar, azul/lima, «Del atleta de élite a tu día a día», pie naranja Femtech/Mexico Tech Week |
| `deeptech` | 28 oct: Tec de Monterrey | Negro/rosa, órganos, Salud + Deeptech, marcas Mexico Tech Week / Novartis / Distrito Tlalpan |
| `summit` | Todos los eventos Tijuana 29–31 | Cartel morado/rosa Summit FemTech México.26, «Aquí Empieza», 30 de octubre Tijuana |
| `startup-world-cup` | Silicon Valley y Startup World Cup | Fotografía solicitada de Startup World Cup; original exacto aún no identificado |
| `milken` | Milken | Sin portada aprobada recibida; conservar marcador si falta |
| `websummit` | Web Summit | Sin portada aprobada recibida; conservar marcador si falta |

Las tres referencias inline de Xesco, Summit y Deeptech se pudieron ver, pero sus archivos originales no están en este paquete. Los marcadores fueron autorizados por la usuaria. El mapa legible por máquina está en `handoff/asset-map.json`.

## Sitio y correo

1. Obtener originales, guardar procedencia/URL real en el mapa y añadir los archivos en `assets/covers/`. Sus nombres de destino propuestos están en el mapa y `covers` de `index.html`; respetar la extensión real.
2. Generar con `npm run build:newsletter` y `python3 newsletter/package-email.py`. La agenda incluye las imágenes disponibles como datos integrados; el correo mantiene referencias de archivos locales para su exportación.
3. Subir portadas y los cuatro PNG de skyline activos a medios de GHL. Registrar las URLs HTTPS públicas en el mapa. No usar rutas G:, enlaces de vista previa de Drive o CID como fuentes de imagen del correo enviado.
4. Para implementar el newsletter usar `email-ghl.html` en un editor compatible con HTML de correo. `email.html` es una vista de navegador con imágenes incrustadas; no usarla como HTML de envío. Sustituir las tablas marcadoras `[data-event-cover="CLAVE"]` por imágenes del medio correcto; cambiar también todos los `src` de skylines por URLs alojadas. Conservar fecha, acceso, título y botón de cada actividad. No importar JavaScript del sitio al correo.
5. Para la agenda general, recrear la estructura en el builder o colocar el contenido mediante elementos de código compatibles. El HTML completo no reemplaza automáticamente una página GHL. Probar filtros, diálogos y navegación en el constructor real.
6. Las **páginas independientes de Tijuana y CDMX** tienen bloques específicos `*-ghl-block.html` e instrucciones en `../sponsorship-designs/HANDOFF-CLAUDE-GHL.md`. Conectar el Airtable existente para los asistentes y el enlace de pago GHL según `../sponsorship-designs/AIRTABLE-GHL-REGISTRO-VIP.md`.
7. Integrar remitente, domicilio y baja con las funciones reales de GHL. Revisar móvil, medios, CTA y condiciones antes de enviar. Un cambio manual en GHL no modifica las fuentes; regenerar recrea los enlaces locales del email y exige reaplicar el mapa de medios.

## Reglas de acceso

- Luma: https://luma.com/femtechmexico. No publicar URLs administrativas de gestión.
- Tijuana VIP: https://ruta2026.prelude-health.com/vip-tijuana-page. Pase de tres días; no vender las actividades del 29, 30 y 31 como entradas diarias independientes.
- CDMX: pase VIP e invitaciones con la organización. Contacto recibido: hello@femtech.mx.
- Milken: no CTA de reserva/pago.
- Startup World Cup y Web Summit: sus organizadores controlan precios, registro y pago.
- Silicon Valley: mantener las incertidumbres explícitas. MedSummit se retiró por indicación de la organización.

## Conciliaciones para revisar

La oferta Tijuana incluye precios y traslados entre sedes oficiales. Por la instrucción más reciente, las comidas se pagan por separado. La sesión de Xesco conserva `(fecha por confirmar)` en materiales de pago; no agregarlo a la invitación pública gratuita del 30. El inicio de CDMX difiere entre Luma (17:00) y cartel (17:30); reconfirmar llegada/sesión. El cartel reutilizado del Summit anuncia entrada libre el 30, mientras que el pase completo incluye otros servicios de pago; mantener claras ambas condiciones.

El adjunto Tijuana indica PayPal y reporta un total `S$0.00` pendiente de corrección. Esta sesión no ha validado su configuración: el implementador debe comprobar USD, importes, cantidades y datos por asistente en el order form real. Los términos publicados en el adjunto fijan el 14 de octubre como límite de reembolso voluntario y el 22 para transferencia; la nueva página lo muestra. No se realizaron cobros ni modificaciones en GHL.

## Corrección de agenda y pendiente Milken

La agenda vigente contiene **10 actividades**: un solo Summit el 30 de octubre, una sola experiencia VIP el 31 y sin MedSummit. Mantener el acceso público gratuito del Summit en Luma y los beneficios VIP dentro del mismo evento. Mayra participará junto con Jill Biden, según lo compartido por la organización. Antes de completar GHL, seguir `newsletter/handoff/MILKEN-GMAIL-PENDIENTE.md` (ruta desde la raíz de la entrega) para verificar el contexto en Gmail y actualizar web/correo. Esta sesión no dispone de Gmail. Milken permanece solo informativo y sin reservas ni cobros de FemTech.

**Última instrucción de Tijuana:** comidas no incluidas; se pagan por separado. Mantener los traslados entre sedes oficiales incluidos. Esta corrección prevalece sobre las fuentes archivadas. Precios sin cambios.

## Instrucción vigente: pases VIP y Airtable

CDMX es **Pase VIP Gold**, cinco asistentes por MXN 30,000 de referencia; ya no se presenta como patrocinio. Seguir `sponsorship-designs/AIRTABLE-GHL-REGISTRO-VIP.md` desde la raíz del paquete. Reutilizar el Airtable existente para empresa, logotipo y nombre completo, correo y teléfono de cada persona; dos lugares requieren dos registros, cinco requieren cinco. Vincular la reserva al enlace de pago GHL. Las URLs deben recuperarse de la configuración existente: no fueron proporcionadas en esta conversación.

## Alcance vigente del newsletter

El correo tiene **9 actividades**, del 26 de octubre al 6 de noviembre: sin Lisboa, Portugal ni Web Summit. La web conserva las **10 actividades**. El texto breve del correo está en `newsletter/email-copy.json` (ruta desde la raíz). Para transferir todo, leer `handoff/TRANSFERENCIA-CLAUDE.md`, `handoff/IMAGENES.md` y `handoff/COPY-CLARO.md`.
