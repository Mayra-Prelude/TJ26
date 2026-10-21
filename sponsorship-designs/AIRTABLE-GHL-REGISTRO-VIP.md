# Instrucciones para Claude — pases VIP, Airtable y pago GHL

Esta instrucción directa de la organización prevalece sobre los textos anteriores de patrocinio y sobre la captura de asistentes dentro del checkout GHL.

## Oferta y destinos existentes

- **CDMX: Pase VIP Gold**, paquete de **cinco asistentes por MXN 30,000 de referencia**. Mantener beneficios actuales y condiciones fiscales pendientes. Cambiar el nombre visible y el producto GHL de patrocinio a pase VIP. No convertir el precio del paquete en precio por persona.
- **Tijuana individual:** USD 650, un asistente por unidad.
- **Tijuana dúo:** USD 980, dos asistentes por unidad.
- Tijuana conserva programa y traslados entre sedes oficiales; las comidas se pagan por separado.
- El formulario **Airtable ya está creado**. Localizar y reutilizar el formulario/base existentes de la organización; no crear una segunda base ni sustituirlos sin revisar lo disponible.
- La URL de Airtable y los enlaces específicos de pago GHL no se proporcionaron en esta conversación. Recuperarlos de la configuración existente. Registrar las URLs reales y el mapeo de productos en las notas de implementación; no inventar enlaces ni activar botones hacia marcadores.

## Flujo para quien compra

1. Elegir ciudad, paquete y cantidad de unidades. Explicar cuántas personas incluye la compra.
2. Abrir el enlace del Airtable existente. Registrar comprador/responsable, empresa, logotipo y **a cada persona que asistirá**.
3. Al completar los datos, continuar al **enlace de pago GHL** de la ciudad y paquete correctos. El cobro ocurre en GHL/proveedor, no dentro de Airtable.
4. Conservar una referencia de reserva que relacione el registro Airtable con la compra y su pago. Solo marcar la reserva como confirmada cuando el pago esté verificado y los datos de todos los asistentes estén completos.

Los botones actuales que bajan a `#cd-order-form` o `#tj-order-form` son navegación del diseño. Al implementar, sustituir o completar esa sección con el enlace real de Airtable y la continuación al pago GHL. No afirmar que el diseño ya registra asistentes. La elección de un paquete debe llegar al formulario y al pago sin perder ciudad, moneda o cantidad.

## Datos a recopilar en el Airtable existente

**Por reserva / empresa:** referencia de reserva, ciudad/evento, paquete, cantidad de unidades, número esperado de asistentes, nombre y datos de contacto del comprador/responsable, nombre de la empresa y carga de logotipo. Mostrar condiciones de uso del logotipo y aviso de privacidad aplicables. Recopilar el archivo mediante el campo de adjunto existente o el mecanismo autorizado; no usar un campo público de pago para subir logos.

**Por cada asistente:** nombre completo, correo electrónico, teléfono con código de país y empresa. Mantener el campo de nacionalidad de Tijuana previsto en el material anterior, si corresponde al formulario existente. El comprador debe quedar en la lista solo si también asistirá: sus datos no representan a todo el grupo.

**Relación:** una reserva puede incluir varias personas. Usar registros vinculados de asistentes, o los grupos de campos que ya tenga el formulario. No sobrescribir al primer asistente al añadir el segundo. Si el formulario existente no admite la cantidad necesaria, adaptar su estructura para recoger a todos y conservar el vínculo con la misma reserva.

| Compra | Personas que deben registrarse |
| --- | --- |
| 1 pase individual Tijuana | 1 nombre y contacto completos |
| 1 paquete dúo Tijuana | 2 nombres y contactos completos |
| 2 paquetes dúo Tijuana | 4 nombres y contactos completos |
| 1 paquete Gold CDMX | 5 nombres y contactos completos |
| 2 paquetes Gold CDMX, si se permite esta cantidad | 10 nombres y contactos completos |

La regla es **suma de unidades × asistentes incluidos en cada producto**. Una compra de dos lugares necesita dos asistentes; una de cinco necesita cinco. No contar al comprador dos veces ni exigir correos únicos si las personas legítimamente comparten un contacto; sí distinguir a cada asistente por su registro.

## Unión con el pago

- Reutilizar el identificador de reserva existente o uno opaco y estable. Vincularlo al pedido/transacción GHL y a los asistentes de Airtable. No depender solo del correo para unir reservas: una persona puede comprar varias veces.
- GHL mantiene producto, cantidad, moneda, total, estado del pago y referencia de transacción. Airtable mantiene empresa, logotipo, responsable y lista completa de asistentes, con la referencia del pago y su estado sincronizado.
- No incluir información personal, logotipos ni datos de tarjeta en parámetros públicos de enlaces. No recopilar tarjetas en Airtable.
- Verificar el pago mediante el estado real de GHL/proveedor o una automatización autenticada; abrir una página de éxito o enviar Airtable no prueba el cobro.
- Si se cambia la cantidad, recalcular los asistentes esperados y comprobar que el total y la lista coinciden. Si falla o se abandona el pago, conservar la reserva como pendiente. Reintentos de notificaciones no deben duplicar personas ni compras.
- Conservar los pendientes existentes: MXN e impuestos de CDMX; USD/PayPal y corrección del total reportado S$0.00 en Tijuana. No cambiar precios por esta modificación de registro.
- Actualizar los avisos aplicables para identificar al responsable, datos recabados, finalidades, uso del logotipo y proveedores de registro/pago realmente usados. El texto jurídico final sigue pendiente donde ya estaba señalado.

## Comprobación antes de entregar la implementación

Probar sin cobros reales una reserva individual, una dúo y una Gold de cinco personas: formularios, carga del logo, lista completa, vínculo al pedido correcto, moneda/total, pago fallido/pendiente y confirmación verificada. Comprobar móvil, actualización de datos y ausencia de duplicados al reintentar. Entregar URLs reales y evidencias de estas pruebas para revisión. No publicar, enviar invitaciones ni cobrar por el mero hecho de recibir esta guía.
