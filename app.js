(() => {
  'use strict';
  const config = window.FEMTECH_CONFIG || {};
  const safeUrl = value => {
    try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password ? url : null; }
    catch { return null; }
  };
  const privacy = safeUrl(config.privacyUrl);
  const terms = safeUrl(config.termsUrl);
  if (privacy) { const link = document.querySelector('#privacy-link'); link.href = privacy.href; link.rel = 'noopener'; }
  if (/^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(config.contactEmail || '')) {
    const target = document.querySelector('#contacto');
    target.replaceChildren(document.createTextNode('Contacto oficial: '));
    const link = document.createElement('a'); link.href = `mailto:${config.contactEmail}`; link.textContent = config.contactEmail; target.append(link);
  }
  // A customer browser never verifies payment or activates paid benefits.
  // Production delegates registration AND payment to the approved native GHL funnel.
  const requiredApprovals = ['offer', 'taxes', 'legal', 'privacy', 'branding', 'merchant', 'nativeWorkflowTested'];
  const nativeUrl = safeUrl(config.nativeRegistrationUrl);
  const canUseNative = config.mode === 'native' && privacy && terms &&
    nativeUrl && Array.isArray(config.approvedEmbedOrigins) && config.approvedEmbedOrigins.includes(nativeUrl.origin) &&
    requiredApprovals.every(key => config.approvals?.[key] === true);
  if (canUseNative) {
    document.querySelector('#review-registration').hidden = true;
    const container = document.querySelector('#native-registration'); container.hidden = false;
    const notice = document.createElement('p'); notice.className = 'native-notice';
    notice.textContent = 'Completa el registro y continúa al pago en el formulario seguro de la organización. Si no carga, ';
    const direct = document.createElement('a'); direct.href = nativeUrl.href; direct.textContent = 'abre el registro seguro'; direct.target = '_blank'; direct.rel = 'noopener noreferrer'; notice.append(direct);
    const frame = document.createElement('iframe'); frame.src = nativeUrl.href; frame.title = 'Registro y pago seguro del Patrocinio Gold'; frame.className = 'native-frame'; frame.loading = 'lazy'; frame.referrerPolicy = 'strict-origin-when-cross-origin';
    container.append(notice, frame);
    document.querySelector('#review-banner').textContent = 'REGISTRO SEGURO · Confirma el total y las condiciones antes de pagar';
    // Approval of integration is independent from publication/indexing approval.
  }
  const form = document.querySelector('#sponsor-form');
  const billing = document.querySelector('#billing-fields');
  const errors = document.querySelector('#form-errors');
  const result = document.querySelector('#form-result');
  const invoiceFields = [...billing.querySelectorAll('input, textarea')];
  function updateBilling() {
    const active = form.elements.invoiceRequired.value === 'yes';
    billing.hidden = !active;
    invoiceFields.forEach(field => { field.required = active; field.disabled = !active; field.removeAttribute('aria-invalid'); field.removeAttribute('aria-describedby'); });
    billing.querySelectorAll('.field-error').forEach(el => el.remove());
    result.hidden = true;
  }
  form.querySelectorAll('[name="invoiceRequired"]').forEach(el => el.addEventListener('change', updateBilling));
  updateBilling();
  const labels = {company:'Empresa / razón social',brand:'Nombre comercial',firstName:'Nombre(s)',lastName:'Apellido(s)',jobTitle:'Cargo',email:'Correo electrónico',phone:'Teléfono / WhatsApp',rfc:'RFC',taxRegime:'Régimen fiscal',billingPostalCode:'Código postal fiscal',cfdiUse:'Uso de CFDI',billingAddress:'Domicilio fiscal',termsAccepted:'Aceptación de términos',privacyConsent:'Confirmación de privacidad'};
  form.addEventListener('input', () => { result.hidden = true; });
  form.addEventListener('submit', event => {
    event.preventDefault();
    result.hidden = true; errors.replaceChildren(); errors.hidden = true;
    form.querySelectorAll('.field-error').forEach(el => el.remove());
    const invalid = [];
    [...form.elements].filter(field => field.name && !field.disabled && labels[field.name]).forEach(field => {
      field.removeAttribute('aria-invalid');
      if (field.name === 'phone') field.setAttribute('aria-describedby', 'phone-hint'); else field.removeAttribute('aria-describedby');
      let message = '';
      if (field.required && (field.type === 'checkbox' ? !field.checked : !field.value.trim())) message = 'Completa este campo.';
      else if (field.type === 'email' && !field.validity.valid) message = 'Escribe un correo electrónico válido.';
      else if (field.name === 'phone' && (!/^\+?[\d\s().-]+$/.test(field.value) || field.value.replace(/\D/g, '').length < 10 || field.value.replace(/\D/g, '').length > 15)) message = 'Escribe un teléfono válido de 10 a 15 dígitos, con clave de país.';
      else if (field.name === 'rfc' && !/^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/.test(field.value.trim().toUpperCase())) message = 'Escribe un RFC de 12 o 13 caracteres con formato válido.';
      else if (field.name === 'billingPostalCode' && !/^\d{5}$/.test(field.value.trim())) message = 'Escribe los 5 dígitos del código postal fiscal.';
      if (!message) return;
      field.setAttribute('aria-invalid', 'true');
      const detail = document.createElement('small'); detail.className = 'field-error'; detail.id = `error-${field.name}`; detail.textContent = message;
      field.setAttribute('aria-describedby', `${field.name === 'phone' ? 'phone-hint ' : ''}${detail.id}`);
      field.closest('label').append(detail); invalid.push(`${labels[field.name]}: ${message}`);
    });
    if (invalid.length) {
      const intro = document.createElement('strong'); intro.textContent = 'Revisa los siguientes datos:';
      const list = document.createElement('ul'); invalid.forEach(message => { const li = document.createElement('li'); li.textContent = message; list.append(li); });
      errors.append(intro, list); errors.hidden = false; errors.focus(); return;
    }
    // No localStorage, analytics payload, network request, or pretend CRM/payment success.
    result.textContent = 'Los campos están completos para la revisión. No se ha enviado el registro ni se ha realizado un pago. La contratación estará disponible cuando la organización habilite su formulario y checkout seguros.';
    result.hidden = false; result.focus();
  });
  // Open legal disclosures when followed by an anchor, including keyboard navigation.
  function revealAnchor() { const id = location.hash.slice(1); const el = document.getElementById(id); if (el?.tagName === 'DETAILS') el.open = true; }
  addEventListener('hashchange', revealAnchor); revealAnchor();
  document.querySelectorAll('a[href="#privacidad"]').forEach(link => link.addEventListener('click', () => { document.querySelector('#privacidad').open = true; }));
  const sticky = document.querySelector('.mobile-cta');
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => entries.forEach(entry => sticky.classList.toggle('is-hidden', entry.isIntersecting)), {threshold:0}).observe(document.querySelector('#registro'));
  document.addEventListener('focusin', event => { if (event.target.matches('input,textarea')) sticky.classList.add('is-hidden'); });
})();
