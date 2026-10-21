# Imágenes incluidas y pendientes

## Incluidas como archivos

En el ZIP, abre **`IMAGENES/skylines/`** para encontrar los skylines. También están en `newsletter/assets/skylines/`, la ubicación que usa el código. Se incluyen SVG para web y PNG para correo:

| Ciudad | Archivos | Dónde usar |
| --- | --- | --- |
| Cabecera con tres ciudades | `ruta-ciudades.svg`, `ruta-ciudades.png` | Cabecera del newsletter, con Ciudad de México, Tijuana y San Francisco |
| Ciudad de México | `cdmx.svg`, `cdmx.png` | Web, correo y página CDMX |
| Tijuana | `tijuana.svg`, `tijuana.png` | Web, correo y página Tijuana |
| San Francisco | `sf.svg`, `sf.png` | Web y correo |
| Lisboa | `lisbon.svg`, `lisbon.png` | Solo web; no incluir en este correo |
| Valle de Guadalupe | `valle.svg`, `valle.png` | Archivo histórico, sin uso en esta versión |

Las páginas incluyen sus skylines integrados. `newsletter/email.html` contiene las imágenes incrustadas para revisión sin carpetas externas. Para enviar, usar `email-ghl.html` y alojar sus imágenes en la biblioteca de medios. El archivo `email-preview.eml` adjunta las cuatro imágenes usadas en el correo: cabecera y tres separadores de ciudad.

## Originales que aún faltan

No se dispone de los archivos originales de las portadas mostradas en el chat. No están dentro del paquete como fotografías. Se conservan los marcadores autorizados, no imágenes inventadas. La descarga desde los enlaces de Luma fue bloqueada por el acceso de red de esta sesión (403).

Carpeta indicada por la organización:

`G:\My Drive\11 - Femtech Mx\06 - Eventos\MexicoTech Week 2026\FemTech Assets`

En Drive: **My Drive → 11 - Femtech Mx → 06 - Eventos → MexicoTech Week 2026 → FemTech Assets**.

| Original que debe recuperar Claude | Cómo reconocerlo | Dónde colocarlo |
| --- | --- | --- |
| Xesco / Mexico Tech Week | Retrato de Xesco, azul y verde lima, «Del atleta de élite a tu día a día», pie naranja | 26 de octubre y página Pase VIP CDMX |
| Summit FemTech México 2026 | Cartel rosa/morado, «Aquí empieza», 30 octubre, Tijuana | Actividades 29–31 y página Tijuana |
| Salud + Deeptech | Negro y rosa, órganos médicos, Tec de Monterrey / Novartis | 28 de octubre |
| Fotografía Startup World Cup | Fotografía aprobada por la organización; archivo exacto aún no identificado | Silicon Valley y Startup World Cup |
| Milken | Imagen aprobada de la participación, si existe | Fila informativa de Milken |
| Web Summit | Imagen aprobada, si existe | Solo web, no newsletter |
| Retrato Xesco | Fotografía oficial aprobada | Retrato de la página Tijuana |
| Logotipos de empresas | Los enviados por participantes | Recuperar desde el Airtable existente, con autorización de uso |

Referencias de Luma proporcionadas por la organización; son referencias, no archivos adjuntos en este paquete:

- Xesco: https://images.lumacdn.com/uploads/55/61084e8a-e37c-451a-afbc-f7782d596497.png
- Deeptech: https://images.lumacdn.com/uploads/09/622e2a7d-dc0b-44d6-a4d8-a66681bf2029.png
- Summit: https://images.lumacdn.com/uploads/3u/20af4bdf-6da7-4d94-818f-e9c734e57a95.jpg

El mapeo de eventos y selectores está en `newsletter/handoff/asset-map.json`. Registrar nombre original, URL de Drive y URL final de medios. Los nombres `*.jpg` de destino son propuestas: si el archivo es PNG, conservar su extensión real y ajustar la configuración `covers` en `newsletter/index.html` y el mapa. No renombrar una extensión sin convertir el archivo.

Copiar portadas a `newsletter/assets/covers/`, regenerar el correo y revisar cada imagen. En GHL, sustituir todas las rutas locales de `email-ghl.html` por URLs HTTPS reales; no enviar imágenes base64 del HTML de revisión. Mantener la proporción completa de los carteles. El cartel de Tijuana anuncia el Summit gratuito del 30; no debe ocultar que el pase de tres días es de pago.

Las páginas de CDMX y Tijuana tienen sus skylines integrados en SVG tanto en la cabecera como en el programa; no dependen de un enlace externo. Si el editor de GHL elimina SVG, alojar el PNG de la ciudad correspondiente y usar su URL real en un bloque de imagen. Mantenerlo visible en móvil. Los marcadores «Portada pendiente» son para carteles de eventos, no para skylines.
