# Entrega de diseños — Ruta FemTech 2026

## Versión vigente

La instrucción más reciente pide **las tres páginas en español** y una identidad visual consistente con los skylines de la agenda y el newsletter. Las tres vistas son agenda, experiencia Tijuana y pase VIP CDMX; el newsletter también se entrega en español.

El contenido más reciente de Tijuana está archivado en `sources/CONTENIDO-TIJUANA-GHL.txt`. Sustituye el modelo anterior de experiencia únicamente por invitación y sin precio. El brief anterior se conserva como historial, no como fuente comercial vigente.

| Vista | Archivo para revisar | Archivo para implementar |
| --- | --- | --- |
| Tijuana VIP | `tijuana.html` | `tijuana-ghl-block.html` |
| CDMX · Pase VIP Gold | `cdmx.html` | `cdmx-ghl-block.html` |
| Agenda | `../newsletter/index.html` | Fuente y guía en `../newsletter/` |
| Newsletter | `../newsletter/email.html` (imágenes incrustadas) | `../newsletter/email-ghl.html`: alojar imágenes y sustituir sus rutas antes del envío |

## Diseño

Los skylines originales de Ciudad de México y Tijuana ocupan la portada, con fondo `#100812`, acento rosa `#ff71cc`, tipografía grande, trazos neón y disco de color detrás de la ciudad. Se repiten en los separadores del itinerario, como en la agenda. Las portadas de evento permanecen como marcadores pendientes, en un espacio propio dentro del programa.

Cada `*-ghl-block.html` contiene un `<style>` y un contenedor `.fm-page`. No necesita framework, compilación, JavaScript externo ni CSS externo. Los estilos están aislados del resto del constructor. Las fuentes solicitadas tienen alternativas locales; no se distribuyen archivos de fuente ni se inventan URLs con licencia.

## Tijuana: oferta actual

- 29–31 de octubre de 2026. Capacidad de referencia: 30 lugares VIP; no se afirma disponibilidad restante.
- **Un pase: USD 650. Dos pases: USD 980**, equivalente a USD 490 por persona y ahorro de USD 320 frente a dos pases individuales.
- Incluye el programa de tres días, lounge VIP y traslados entre las sedes del itinerario oficial.
- Comidas, hotel, vuelos y traslados fuera del itinerario oficial se reservan por separado.
- Hotel Indigo Tijuana: tarifa preferencial sujeta a reserva y pago directo al hotel. Enlace y código se comparten al confirmar el pase. No hay garantía de habitaciones.
- Día 29: liderazgo, recorridos de manufactura médica y bienvenida. Día 30: Summit, lounge, cóctel. Día 31: recorridos de hospital y cierre con la delegación.
- Se integraron los dos cambios de copy que el adjunto marcaba como pendientes: «Ocupa un lugar en la mesa donde se toman las decisiones» y «Recorridos…» en plural. Estos cambios se aplicaron a la revisión local; no se afirma que estén publicados en GHL.
- La sesión de Xesco conserva **(fecha por confirmar)** según la regla del brief anterior para materiales de pago. El nuevo texto publicado la sitúa dentro del día 29; se muestra ese contexto sin convertirlo en fecha definitiva. No se incorpora Xesco a las invitaciones gratuitas del Summit del 30.
- La biografía destacada usa la referencia a FC Barcelona y liderazgo/alto rendimiento, sin ampliar credenciales no verificadas.

Los términos y el aviso de privacidad del adjunto están en desplegables. La inclusión y exclusión de comidas se ajustó a la instrucción posterior de la organización: las comidas no están incluidas; se mantienen los traslados entre sedes oficiales. La fecha límite de cancelación con reembolso del 100% fue el **14 de octubre de 2026**, ya pasada en la fecha de revisión (20 de octubre, Ciudad de México). La FAQ lo explica expresamente. La transferencia sin costo está indicada hasta el **22 de octubre**. Los textos se reproducen como material proporcionado por la organización; esta sesión no verifica su publicación ni efectúa una revisión legal.

## CDMX: Pase VIP Gold

La organización cambió la denominación de CDMX: **Pase VIP Gold**, paquete de cinco asistentes por **MXN 30,000 de referencia**, con los beneficios actuales. El cóctel sigue por invitación. Mantener los términos en borrador y los pendientes de impuestos, entidad contratante, cancelación y privacidad antes de cobrar. El nombre visible en web, correo y producto GHL debe ser Pase VIP, no patrocinio.

## Registro de todos los asistentes y pago

Seguir **[AIRTABLE-GHL-REGISTRO-VIP.md](AIRTABLE-GHL-REGISTRO-VIP.md)**, que reemplaza las instrucciones anteriores de capturar asistentes dentro del formulario GHL.

Reutilizar el **Airtable ya creado** para empresa, logotipo y nombre completo, correo y teléfono de cada asistente. Una compra de dos lugares requiere dos registros; Gold CDMX requiere cinco. Los datos del comprador no sustituyen la lista de asistentes. Conectar esta reserva al enlace de pago GHL correcto mediante una referencia estable, verificar el pago y conciliar el número de personas con el paquete comprado.

Los `*-ghl-block.html` se pegan como Custom Code / HTML. Sus secciones `#tj-order-form` y `#cd-order-form` describen los pasos; Claude debe conectar allí el enlace real de Airtable y la continuación al pago en GHL. Los diseños locales no contienen formularios operativos. No inventar URLs: el formulario existe, pero su URL y los enlaces específicos de pago no se proporcionaron en esta conversación.

Mantener PayPal/USD y corregir el total S$0.00 reportado para Tijuana. Validar importe y condiciones de CDMX. La página Tijuana de referencia es `https://ruta2026.prelude-health.com/vip-tijuana-page`; no se verificó ni modificó su configuración desde esta sesión.

## Imágenes: dónde obtenerlas

```text
G:\My Drive\11 - Femtech Mx\06 - Eventos\MexicoTech Week 2026\FemTech Assets
```

En Drive web: **My Drive → 11 - Femtech Mx → 06 - Eventos → MexicoTech Week 2026 → FemTech Assets**. No se proporcionaron enlace de carpeta, IDs ni nombres originales; no inventarlos.

- Tijuana `[data-cover="summit"]`: cartel morado/rosa «Summit FemTech México.26», «Aquí Empieza», 30 de octubre, Tijuana.
- CDMX `[data-cover="xesco-tech-week"]`: retrato de Xesco, cartel azul/lima «Del atleta de élite a tu día a día», pie naranja Femtech/Mexico Tech Week.
- Tijuana `[data-portrait="xesco-espar"]`: retrato oficial aprobado de Xesco Espar. No se incluye un archivo de retrato en esta entrega.
- Logos de empresas: recopilarlos mediante el Airtable existente; no inventar marcas ni participantes confirmados.

Subir los originales a la biblioteca de medios y usar URLs HTTPS absolutas en `<img>`, con texto alternativo y proporción completa. Los marcadores actuales están autorizados para la revisión. El cartel compartido del Summit dice «30 de octubre / entrada libre»; mantener visibles el periodo 29–31 y el precio del pase, porque el cartel se usa como portada de la ruta, no como definición comercial del paquete.

## Validación y entrega

Revisar las capturas de `previews/`. Las pruebas de navegador comprueban español, anchos 360/400/768/1440, skylines, importes, navegación, términos, ausencia de formularios de pago propios y aislamiento del bloque en un contenedor similar al del builder. No equivalen a una prueba dentro de la cuenta GHL.

La agenda y el correo usan la misma oferta Tijuana y la distinción CDMX/Milken. Su guía y mapa de portadas están en `../newsletter/`. Nada se publicó, envió ni cobró desde esta entrega.

## Instrucción para Claude

Implementa los diseños en español con los skylines actuales y texto breve. CDMX se llama Pase VIP Gold, con cinco accesos; no uses «5 invitaciones · 6 meses». Conserva los seis meses solo en el detalle del beneficio correspondiente. Reutiliza el Airtable existente para empresa, logotipo y cada asistente, y vincula la reserva al enlace de pago GHL. Sigue AIRTABLE-GHL-REGISTRO-VIP.md. Mantén precios, comidas de Tijuana por separado y marcadores de imágenes. Prepara la revisión funcional sin publicar ni cobrar.

### Datos de CDMX para implementar

`cdmx-packages.json` documenta Gold, sus cinco beneficios, condiciones y campos pendientes. La organización confirmó usar lo ya proporcionado para CDMX y ahora lo denomina Pase VIP Gold: no se agregan otros niveles. Los paquetes archivados de Tijuana no se ofrecen en CDMX. El CTA de Gold lleva a `#cd-terms`; la consulta se dirige a `hello@femtech.mx`. El registro Airtable y el enlace de pago GHL se conectan siguiendo AIRTABLE-GHL-REGISTRO-VIP.md después de completar las condiciones pendientes.

## Corrección de agenda y pendiente Milken

La agenda vigente contiene **10 actividades**: un solo Summit el 30 de octubre, una sola experiencia VIP el 31 y sin MedSummit. Mantener el acceso público gratuito del Summit en Luma y los beneficios VIP dentro del mismo evento. Mayra participará junto con Jill Biden, según lo compartido por la organización. Antes de completar GHL, seguir `newsletter/handoff/MILKEN-GMAIL-PENDIENTE.md` (ruta desde la raíz de la entrega) para verificar el contexto en Gmail y actualizar web/correo. Esta sesión no dispone de Gmail. Milken permanece solo informativo y sin reservas ni cobros de FemTech.

## Última corrección: comidas de Tijuana

La organización indicó que Tijuana **no incluye comidas; sí incluye traslados entre sedes oficiales**. Se corrigieron programa, beneficios, FAQ, términos, agenda y correo. Prevalece sobre el contenido archivado de GHL. No restablecer comidas como beneficio al pegar el bloque o configurar productos. Precios USD 650 / USD 980 sin cambios.

## Alcance vigente del newsletter

El correo tiene **9 actividades**, del 26 de octubre al 6 de noviembre: sin Lisboa, Portugal ni Web Summit. La web conserva las **10 actividades**. El texto breve del correo está en `newsletter/email-copy.json` (ruta desde la raíz). Para transferir todo, leer `handoff/TRANSFERENCIA-CLAUDE.md`, `handoff/IMAGENES.md` y `handoff/COPY-CLARO.md`.
