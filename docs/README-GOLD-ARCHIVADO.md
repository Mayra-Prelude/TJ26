# Ruta FemTech 2026 — Patrocinio Gold

> Versión vigente: tres páginas en español con skylines compartidos. [Agenda](newsletter/index.html), [Tijuana VIP](sponsorship-designs/tijuana.html) y [CDMX Gold](sponsorship-designs/cdmx.html). Tijuana ofrece pases USD 650 / USD 980 según el último adjunto; CDMX conserva patrocinio por invitación. El newsletter también está en español. El sitio Gold original documentado abajo queda como borrador anterior. Ver las guías de handoff y el registro vigente de eventos.

Landing editorial en español de México, diseñada para GoHighLevel mediante HTML/CSS/JS sin framework. Incluye propuesta comercial, cinco beneficios, resumen, registro local de revisión, facturación condicional, condiciones expandibles y CTA móvil. No hay endpoints que reciban datos, persistencia de PII, rastreo ni cobros.

## Desarrollo

Requiere Node.js 24 (validado) y npm. Usar el checkout existente; no se necesita worktree.

```sh
cd /workspace/TJ26
npm ci --ignore-scripts
npm run dev
```

Servidor de desarrollo en puerto 3000. `PORT` permite cambiarlo. Solo expone archivos públicos de la página; no sirve documentos internos, `.git` ni dependencias.

```sh
npm run build
npm test
npm run test:browser
```

Las pruebas de navegador usan Chromium del sistema (`/usr/bin/chromium`) o `CHROMIUM_PATH`. Si no existe, instalar Chromium mediante el mecanismo del entorno o instalar el navegador verificado de Playwright con `npx playwright install chromium`. El build genera `dist/`, listo para hosting estático; no contiene docs, pruebas ni dependencias. Verificar también la salida compilada: `SERVE_DIR=dist PORT=3001 npm run dev`.

## Estado de integración

**Versión de revisión, no publicar ni cobrar todavía.** No se dispone de acceso GHL. No se han creado registros, workflows ni productos reales. El formulario local valida sin transmitir; mostrar campos válidos no significa registro confirmado. En producción, se sustituye con un único flujo GHL nativo de registro y checkout, sujeto a capacidades verificadas.

- [Arquitectura, campos, workflow y despliegue GHL](docs/GOHIGHLEVEL.md)
- [Plantillas de confirmación y onboarding](docs/COMUNICACIONES.md)
- [Validación y pendientes](docs/VALIDACION.md)

`config.js` es configuración **pública** sin secretos. Las aprobaciones impiden activación accidental; no sustituyen controles de servidor. Los estados de pago provienen exclusivamente del proveedor/GHL. Nunca confirmar pago por una URL de éxito.

## Pendientes de producción

Acceso a subcuenta GHL, proveedor y merchant, IVA, emisor fiscal, políticas y datos de responsable/privacidad, sede y horarios, condiciones completas (el brief recibido termina en el punto legal 13), contacto y assets oficiales, verificación de cifras CANACINTRA, fechas y logística de beneficios. Los wordmarks son texto provisional y el skyline es una interpretación original pendiente de aprobación; no son logos/arte oficiales. Las fuentes usan instalaciones locales o fallback geométrico y no distribuyen archivos de fuentes sin licencia. No hay imágenes de stock ni testimonios.

La página lleva `noindex, nofollow`. La publicación, la configuración en GHL y la activación de pagos no se han realizado. Aprobar el contenido definitivo y ejecutar la matriz sandbox documentada antes de activar.
