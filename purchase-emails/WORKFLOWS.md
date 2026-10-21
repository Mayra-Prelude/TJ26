# Automatización propuesta — no activada

## Secuencias

| Paso | Disparador | Destinatario | CDMX | Tijuana |
| --- | --- | --- | --- | --- |
| 01 | Pago real verificado, una vez | Comprador | Recibimos tu pago · Pase VIP CDMX | Recibimos tu pago · Experiencia VIP Tijuana |
| 02 | 24 h desde pago, solo datos pendientes | Comprador | Faltan datos para tu Pase VIP CDMX | Completa tu registro para Tijuana |
| 03 | Pago verificado + registro completo | Comprador | Tu registro para CDMX está completo | Coordinemos tu llegada a Tijuana |
| 04 | Tres días antes, 10:00 local propuesta | Cada asistente registrado | Tu visita a CDMX: horario y ubicación | Tu agenda y traslados en Tijuana |
| 05 | Un día antes, 10:00 local propuesta | Cada asistente registrado | Nos vemos mañana en CDMX | Mañana comienza tu experiencia en Tijuana |
| 06 | Un día después del cierre, 12:00 local propuesta | Comprador elegible | Gracias por acompañarnos en CDMX | Gracias por compartir Tijuana con nosotros |

Fechas operativas de esta edición (2026; horas propuestas sujetas a aprobación):
- CDMX: evento 26 octubre. 04: 23 octubre; 05: 25 octubre; 06: 27 octubre. Zona IANA `America/Mexico_City`.
- Tijuana: evento 29–31 octubre. 04: 26 octubre; 05: 28 octubre; 06: 1 noviembre. Zona IANA `America/Tijuana`.
- Usar zonas IANA, no offsets fijos: Tijuana cambia horario el 1 de noviembre. Fecha/hora del cóctel y primer encuentro son variables, no estas horas propuestas de correo.

## Entrada, relación y prevención de duplicados

1. Disparador GHL/proveedor autenticado que confirme pago exitoso. No usar envío de formulario, visita a thank-you, captura de pantalla ni estado pendiente como prueba de pago.
2. Mapear IDs reales de producto a Gold / individual / dúo. Guardar `reservation_id`, pedido, transacción, cantidades, moneda, total cobrado y versión de términos. No enrutar solo por el nombre del producto ni por el correo del comprador. Si una orden mezcla ciudades, separar las reservas sin duplicar comprobante/importe.
3. Gold: 5 asistentes por unidad; individual: 1; dúo: 2. Una persona puede tener varias reservas. Datos de empresa y personas viven en Airtable existente; preservar nombres, empresa y logos al sincronizar.
4. Registro completo significa datos requeridos del Airtable existente y número esperado de personas completos; comprador cuenta solo si asiste. La aprobación interna del arte no vuelve incompleto un registro ya entregado. La recepción del logo se exige según las reglas existentes; no inventar una excepción.
5. Si el registro ya estaba completo antes del pago, enviar 01 y luego 03 (separación propuesta de 15 min para evitar dos mensajes simultáneos); nunca 02. Si se completa después, enviar 03 una sola vez. Actualizar el estado antes de evaluar los siguientes pasos.
6. Clave de idempotencia por edición + ciudad + reserva + paso + destinatario/registro asistente. Reintentos del webhook no duplican correos. No marcar enviado antes del resultado real del proveedor; registrar estados en cola/enviado/fallido y reintentos controlados.
7. Correo 02 una sola vez a las 24 h si sigue incompleto. Si se compra a menos de 24 h del evento, reducir espera a 2 h y crear tarea de atención; si no queda tiempo útil, gestionar manualmente. Releer el estado justo antes de enviar para evitar pedir datos completados durante la espera.
8. Los correos de acceso 04–05 se envían por registro de asistente. Si dos asistentes comparten legítimamente un correo, preservar sus identidades y accesos: se puede agrupar en un mensaje autorizado sin exponer información a personas ajenas. No deduplicar eliminando una plaza.

## Compras tardías y cambios

- Si la compra/registro ocurre después de la fecha prevista de 04, enviar una sola versión vigente de 04 cuando estén completos pago y registro. Coordinar 03 y 04 con al menos 15 min entre mensajes; evitar ráfagas.
- Si el envío tardío de 04 cae en la ventana de 05 (día anterior), enviar solo 04, que contiene la información completa; omitir 05. No enviar 05 si el día local ya es el del evento o posterior: su texto dice «mañana».
- Una compra durante el evento requiere revisión operativa y programa del próximo encuentro aplicable; no enviar instrucciones de llegada ya vencidas ni un agradecimiento automático por una asistencia no verificada. Rechazar/retener ventas fuera del periodo autorizado en la página de pago.
- Si faltan sede, acceso, contacto o URL al llegar la hora: retener plantilla y crear tarea al equipo; reintentar tras resolver solo si sigue siendo útil. Nunca rellenar con un dato supuesto.
- Cancelación, reembolso, contracargo o fraude pendiente: detener futuros mensajes operativos de asistencia y enviar a revisión. Una reducción de plazas exige recalcular asistentes y actualizar accesos; no cancelar automáticamente otras reservas del mismo contacto.
- Sustitución de asistente: actualizar Airtable, invalidar acceso anterior si procede y enviar información vigente al nuevo. Evitar que las colas sigan escribiendo al anterior. Aplicar términos reales por ciudad, sin prometer transferencias fuera de plazo.
- Cambios de programa: una tarea de aviso específico al responsable; no repetir confirmación de compra para comunicarlos.
- Correo 06 es opcional. Habilitar solo si el contenido/enlace está listo, el destinatario es elegible según preferencias y existe evidencia de participación o revisión del equipo. Omitir a cancelados/no asistentes; no inventar asistencia. Seguimiento de beneficios contratados CDMX puede gestionarse por tarea aunque no se autorice este correo.

## Matriz de pruebas para Claude (sandbox, sin cargos reales)

| Caso | Resultado esperado |
| --- | --- |
| Gold pagado, 5 registros completos | 01 y 03; sin 02; accesos separados a las 5 personas |
| Dúo pagado con 1 de 2 asistentes | 01, 02 condicionado; 03 y accesos retenidos hasta completar |
| Individual Tijuana pagado y completo | Un asistente, importe/moneda correctos, contacto de logística |
| 2 dúos o 2 Gold autorizados | 4 o 10 asistentes, respectivamente |
| Airtable completo, pago pendiente/fallido | Ningún correo de pago confirmado ni acceso |
| Webhook repetido / dos pedidos mismo comprador | Sin duplicados; importes y personas no se sobrescriben |
| Registro completado al vencer espera 02 | Revisión de estado evita recordatorio obsoleto |
| Compra día anterior / día del evento | Sin ráfaga de mensajes; nunca «mañana» el mismo día |
| Reembolso/cancelación/cambio de asistente | Colas actualizadas; acceso anterior no sigue activo |
| Logo recibido vs pendiente | No pedir de nuevo un archivo aprobado; responsable correcto |
| Imagen/URL/contacto faltante | Se bloquea la plantilla dependiente, no se envían marcadores |
| Tijuana 1 noviembre | Hora local correcta tras cambio horario |
| Baja/DND/rebote | Respetar política y crear tarea para aviso esencial si procede |
| Un asistente que no es comprador | No recibe precio, comprobante ni datos de otras personas |

Estas reglas son especificaciones: no se afirma haber conectado ni probado Airtable/GHL desde este entorno.
