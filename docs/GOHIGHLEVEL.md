# Implementación en GoHighLevel

## Estado y decisión de arquitectura

No hay conector GHL disponible en esta sesión, variables GHL/HighLevel/Stripe/payment inyectadas ni metadatos de cuenta aportados. No se han inspeccionado ni modificado una subcuenta, campos, productos, workflows o pagos reales. No se asume API ni proveedor. La página no procesa tarjetas, no recibe datos y no marca pagos. `config.js` es público; nunca colocar secretos.

Se eligió HTML/CSS/JS sin framework para reutilizarlo en un funnel GHL, con **registro y checkout nativos juntos** dentro de un único flujo aprobado. El formulario local es exclusivamente de revisión: NO redirige al pago, no guarda PII, no usa parámetros URL con datos y no simula confirmaciones. En modo nativo se oculta y se sustituye por el funnel nativo completo. No se deben mostrar ambos formularios a un cliente ni pedirle capturar dos veces sus datos.

## Inspección previa obligatoria en la cuenta

1. Identificar location/subcuenta, permisos y dominio oficial. Revisar formularios, custom fields, tags y pipelines existentes para reutilizarlos sin duplicación.
2. Inspeccionar Products/Payments e integraciones disponibles. Confirmar merchant, proveedor soportado, MXN, métodos, comisiones, liquidación, emisor fiscal y política de reembolsos. Elegir checkout nativo o una ruta externa oficialmente soportada solo después de esa inspección.
3. Validar que el formulario u order form elegido capture todos los datos y consentimientos, vincule el contacto con la compra y soporte datos fiscales condicionales. Si no lo soporta, resolver esa capacidad en la cuenta antes de activar. No pegar una API key en JavaScript.
4. Validar protección de datos y almacenamiento de archivos en la cuenta. Confirmar mecanismos reales de deduplicación y disparadores de transacción; la lista de abajo es especificación, no configuración aplicada.

## Mapeo de campos

Los nombres nativos exactos y IDs dependen de la cuenta. Registrar los IDs verificados en una copia privada de este mapeo. No crear campos duplicados por traducción.

| Entrada / dato | Destino preferido | Regla |
|---|---|---|
| firstName / lastName | First Name / Last Name nativos | Capturados por separado |
| email / phone | Email / Phone nativos | Normalizar email; teléfono internacional |
| company | Company Name nativo | Razón social |
| brand | Campo existente o Commercial Brand | Texto |
| jobTitle | Job Title si existe, custom si no | Texto |
| Sponsor Tier | Campo existente o custom | Gold, establecido por workflow |
| Event Name | Campo existente o custom | Ruta FemTech 2026 |
| Sponsorship Amount | Producto/transacción y valor de oportunidad | Base MXN 30000; total solo según IVA aprobado |
| Payment Status / Transaction ID | Datos de transacción nativos | Espejo opcional; fuente de verdad servidor |
| invoiceRequired | Invoice Required | Boolean |
| rfc | RFC | Condicional; validación estructural no equivale a validación SAT |
| taxRegime / billingPostalCode / cfdiUse / billingAddress | Billing Information estructurada | Obligatorios si solicita factura |
| Logo Submitted | Campo existente o custom | Boolean + archivo controlado |
| VIP Attendee Count | Campo existente o custom | 0–5 por patrocinio |
| VIP Attendee Registration Status | Campo existente o custom | Pendiente / parcial / completo |
| Terms Accepted / Terms Version / Terms Acceptance Timestamp | Campos de consentimiento | Versión aprobada + hora UTC del servidor |
| Privacy Consent | Consentimiento nativo o custom | Registrar versión del aviso y timestamp |
| Six-Month Benefits Start / End Date | Campos de fecha | Organizador confirma fechas; no asumir 180 días |
| Sponsor Fulfillment Status | Campo existente o custom | Pendiente / en curso / completo |

**Compras repetidas:** datos de compra, consentimiento, asistentes, logo y entregables pertenecen a la oportunidad/compra, no únicamente al contacto. Si solo existen custom fields de contacto, estos no conservan el historial de múltiples patrocinios. Verificar objeto/campos de oportunidad o registro durable vinculado que soporte la cuenta. No sobrescribir evidencia de compras previas.

## Producto y pipeline

Crear un producto `Ruta FemTech 2026 — Patrocinio Gold`, cantidad fija 1, moneda MXN, base 30000. Cinco accesos son un beneficio; no crear cinco productos ni un precio individual. No activar precio final hasta confirmar IVA.

Pipeline: `Ruta FemTech 2026 — Sponsorships`:

1. New Interest
2. Registration Started
3. Payment Pending
4. Payment Confirmed
5. Sponsor Onboarding
6. Benefits Active
7. Benefits Completed
8. Closed / Cancelled

Tags: `RUTA-FEMTECH-2026`, `RUTA-FEMTECH-2026-GOLD`, `SPONSOR-INTERESTED`, `SPONSOR-PAYMENT-PENDING`, `SPONSOR-PAID`, `SPONSOR-ONBOARDING`, `SPONSOR-LOGO-PENDING`, `SPONSOR-VIP-REGISTRATION-PENDING`, `SPONSOR-ACTIVE`.

Usar identificador durable de compra, no solo correo ni ID del contacto. Reintentos del mismo registro usan esa clave; otra compra del mismo contacto recibe otra clave. Un contacto por persona según política de deduplicación de la cuenta; una oportunidad por compra. Confirmar soporte real de unicidad antes de prometer idempotencia.

## Automatizaciones a configurar y probar

| Disparador verificado | Acciones | Protección |
|---|---|---|
| Registro nativo válido + consentimientos | Guardar contacto, evidencia legal y compra; upsert oportunidad; tags de evento, Gold y pendiente | Clave de compra durable, no duplicar por reenvío |
| Pago pendiente/fallido | Conservar registro, ofrecer enlace seguro de reintento de la misma compra | Sin activar beneficios ni enviar confirmación de pago |
| Transacción exitosa verificada | Comprobar merchant, producto, moneda, importe fiscal aprobado y estado; guardar transaction ID; etapa Payment Confirmed; SPONSOR-PAID | Procesamiento único por proveedor + transaction ID; no por URL de éxito |
| Primer pago confirmado | Confirmación al patrocinador; aviso al equipo; Sponsor Onboarding; tags logo y asistentes pendientes | Una notificación/onboarding por compra |
| Logo/asistentes entregados | Validar archivos y exactamente 5 asistentes máximos; actualizar pendientes | Formulario seguro ligado a la compra; no IDs de contacto públicos como autenticación |
| Beneficios iniciados por organización | Fechas aprobadas, Benefits Active, SPONSOR-ACTIVE; seguimiento mensual | No calcular inicio desde una visita a página |
| Beneficios completados | Cierre de entregables y etapa Benefits Completed | Registro revisable |
| Reembolso/cancelación confirmados | Estado y oportunidad coherentes; revisión humana de beneficios y comunicaciones | No borrar historial de pago/consentimiento |

En GHL usar eventos de pago confirmados oficialmente soportados. Si se requiere backend/webhook externo, verificar firma con SDK/documentación del proveedor, reintentos, persistencia transaccional y unicidad antes de habilitar. Este repositorio no incluye un webhook ficticio ni almacén temporal inseguro.

## Onboarding posterior al pago

Crear formulario nativo seguro de marca: archivo de logo SVG/PNG/PDF según especificación final, nombre comercial, autorización de uso, lineamientos, contacto de marca. Limitar tamaño/tipo, validar contenido y revisar adjuntos; no servir SVG de terceros sin sanitizar. Confirmar capacidades de carga de la cuenta.

Crear registro seguro de cinco invitados: nombre(s), apellidos, email y campos estrictamente necesarios por invitado; informar privacidad, fecha límite confirmada y cómo cambiar representantes. Vincular al patrocinio con acceso autorizado. Permitir entrega posterior y guardado parcial si la cuenta lo soporta. No recolectar salud u otros datos sensibles innecesarios.

Plantillas editables: `docs/COMUNICACIONES.md`. No se ha enviado ningún mensaje.

## Despliegue compatible con GHL

Opción A, page builder con custom code: subir CSS, JS y skyline a alojamiento HTTPS aprobado; pegar el contenido del body sin el script global del builder, enlazar `styles.css`, después `config.js` y `app.js` como scripts defer. Evitar duplicar header/footer. Revisar selectores y estilos del builder: este HTML es una página completa, no un widget aislado. Probar en el dominio final. Si GHL filtra scripts, servir la página estática en el dominio aprobado o usar bloque/hosting oficialmente soportado; no afirmar que el builder se ha probado.

Opción B, hosting estático del contenido de `dist/` en dominio oficial y funnel GHL nativo embebido. Copiar la URL del funnel publicado aprobado a `nativeRegistrationUrl`, su origen HTTPS exacto a `approvedEmbedOrigins`, aviso a `privacyUrl`, términos definitivos a `termsUrl`, y correo verificado a `contactEmail`. No usar URLs inventadas. Confirmar permisos de iframe y proveedores de pago dentro del embed; si impiden embebido, usar el enlace directo seguro visible sobre el formulario. El cliente nunca interpreta esa navegación como pago confirmado.

Para habilitar `mode: 'native'`, todas las aprobaciones de `config.js` deben ser verdaderas tras pruebas reales. Son un bloqueo operativo contra activación accidental, **no una barrera de seguridad ni aprobación legal**. El código cliente es público y modificable. Los controles de dinero y estados pertenecen a GHL/proveedor.

Antes de publicar: sustituir wordmarks/ilustración por assets aprobados; incorporar condiciones y aviso definitivos (reemplazar borradores, no solo añadir enlaces), contacto, impuestos, fechas, sede y políticas. Retirar cifras no verificadas. El brief suministrado termina en el punto 13 de términos: solicitar el resto antes del cierre legal. Cargar fuentes licenciadas, si disponibles. Mantener `noindex` en revisión. Solo tras aprobación editorial, configurar canonical/og:url/imagen social con URLs oficiales y cambiar robots para indexación. No inventar logos, cifras de alcance o testimonios.

## Matriz de aceptación real (pendiente de cuenta)

- Compra de prueba completa en sandbox: contacto + oportunidad + consentimiento + pago + confirmación + onboarding.
- Reenvío y webhook duplicado: una compra, una activación, un mensaje por transacción.
- Fallo, abandono y reintento: datos conservados, sin beneficios hasta pago verificado.
- Acceso directo a success URL: ningún estado pagado.
- Importe/moneda/producto incorrectos: sin activación.
- Dos compras del mismo contacto: oportunidades independientes con evidencia preservada.
- Factura sí/no, campos fiscales; total aprobado visible antes del cobro.
- Cinco asistentes, cambios, entrega de logo y seguimiento seis meses.
- Cancelación/reembolso y cambios materiales de fecha según condiciones aprobadas.
- Navegación por teclado, móvil, privacidad, iframe y checkout en dominio final.

La activación de pagos en producción y la publicación requieren aprobación expresa y configuración verificada. No están realizadas en esta entrega.
