import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdir, readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const server = spawn(process.execPath, ['scripts/serve.mjs'], {env:{...process.env,PORT:'3187'}, stdio:['ignore','pipe','inherit']});
try {
  await new Promise((resolve,reject) => { server.stdout.once('data', resolve); server.once('error',reject); server.once('exit',code=>reject(new Error(`Server exit ${code}`))); });
  const browser = await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',args:['--no-sandbox']});
  try {
    await mkdir('artifacts', {recursive:true});
    const page = await browser.newPage({viewport:{width:1440,height:1000}});
    const issues=[]; page.on('pageerror',e=>issues.push(e.message));
    const requests=[]; page.on('request',r=>requests.push({url:r.url(),method:r.method()}));
    await page.goto('http://127.0.0.1:3187/', {waitUntil:'networkidle'});
    assert.equal(await page.title(),'Patrocinio Gold · Ruta FemTech 2026 | FemTech México™');
    assert.equal(await page.locator('h1').count(),1);
    assert.equal(await page.locator('#billing-fields').isVisible(),false);
    await page.locator('#sponsor-form button').click();
    assert.equal(await page.locator('#form-errors').isVisible(),true);
    assert.ok(await page.locator('[aria-invalid=true]').count() >= 8);
    for (const [name,value] of Object.entries({company:'Empresa de prueba',brand:'Marca de prueba',firstName:'Persona',lastName:'Prueba',jobTitle:'Dirección',email:'prueba@example.com',phone:'+52 55 1234 5678'})) await page.locator(`[name="${name}"]`).fill(value);
    await page.locator('[name="termsAccepted"]').check(); await page.locator('[name="privacyConsent"]').check();
    await page.locator('[name="invoiceRequired"][value="yes"]').check();
    assert.equal(await page.locator('#billing-fields').isVisible(),true);
    await page.locator('#sponsor-form button').click();
    assert.equal(await page.locator('[name="rfc"]').getAttribute('aria-invalid'),'true');
    for (const [name,value] of Object.entries({rfc:'XAXX010101000',taxRegime:'601',billingPostalCode:'01234',cfdiUse:'G03',billingAddress:'Domicilio de prueba'})) await page.locator(`[name="${name}"]`).fill(value);
    await page.locator('#sponsor-form button').click();
    assert.equal(await page.locator('#form-errors').isVisible(),false);
    assert.match(await page.locator('#form-result').textContent(),/No se ha enviado/);
    await page.locator('[name="invoiceRequired"][value="no"]').check();
    assert.equal(await page.locator('[name="rfc"]').isDisabled(),true);
    assert.equal(await page.locator('#form-result').isVisible(),false);
    await page.locator('[name="phone"]').fill('invalid');
    await page.locator('#sponsor-form button').click();
    assert.equal(await page.locator('[name="phone"]').getAttribute('aria-invalid'),'true');
    await page.locator('[name="phone"]').fill('+52 55 1234 5678');
    await page.locator('#sponsor-form button').click();
    assert.equal(await page.locator('#form-result').isVisible(),true);
    assert.equal(await page.evaluate(()=>localStorage.length + sessionStorage.length),0);
    assert.equal(requests.filter(r=>r.method!=='GET').length,0);
    assert.equal(requests.filter(r=>!r.url.startsWith('http://127.0.0.1:3187/')).length,0);
    await page.locator('#privacy-link').click();
    assert.equal(await page.locator('#privacidad').getAttribute('open'),'');
    await page.goto('http://127.0.0.1:3187/');
    await page.screenshot({path:'artifacts/desktop.png',fullPage:true});
    for (const width of [360,390,768,1440]) {
      await page.setViewportSize({width,height:844});
      await page.goto('http://127.0.0.1:3187/');
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth),true,`overflow at ${width}`);
      if(width===390) {
        assert.equal(await page.locator('.mobile-cta').isVisible(),true);
        await page.locator('.mobile-cta').click();
        await page.waitForTimeout(800);
        assert.equal(await page.locator('.mobile-cta').isVisible(),false);
        await page.goto('http://127.0.0.1:3187/');
        await page.screenshot({path:'artifacts/mobile.png',fullPage:true});
      }
    }
    // The native mode must fail closed with missing approval, HTTP or unapproved origin.
    const base={mode:'native',nativeRegistrationUrl:'https://example.com/form',approvedEmbedOrigins:['https://example.com'],privacyUrl:'https://example.com/privacy',termsUrl:'https://example.com/terms',approvals:Object.fromEntries(['offer','taxes','legal','privacy','branding','merchant','nativeWorkflowTested'].map(k=>[k,true]))};
    for(const change of [{approvals:{}},{nativeRegistrationUrl:'http://example.com/form'},{approvedEmbedOrigins:[]}]) {
      await page.route('**/config.js',route=>route.fulfill({contentType:'text/javascript',body:`window.FEMTECH_CONFIG=${JSON.stringify({...base,...change})}`}));
      await page.goto('http://127.0.0.1:3187/');
      assert.equal(await page.locator('#review-registration').isVisible(),true);
      assert.equal(await page.locator('iframe').count(),0);
      await page.unroute('**/config.js');
    }
    // Validate approved embed construction with a local mock; this is NOT a GHL capability test.
    await page.route('https://example.com/form',route=>route.fulfill({contentType:'text/html',body:'<html lang="es"><title>Mock</title><p>Flujo nativo de prueba</p></html>'}));
    await page.route('**/config.js',route=>route.fulfill({contentType:'text/javascript',body:`window.FEMTECH_CONFIG=${JSON.stringify(base)}`}));
    await page.goto('http://127.0.0.1:3187/');
    assert.equal(await page.locator('#review-registration').isVisible(),false);
    assert.equal(await page.locator('iframe').getAttribute('src'),'https://example.com/form');
    assert.equal(await page.locator('#native-registration a').getAttribute('href'),'https://example.com/form');
    assert.equal(issues.length,0,issues.join('\n'));
    assert.equal((await page.request.get('http://127.0.0.1:3187/.git/config')).status(),404);
    assert.equal((await page.request.post('http://127.0.0.1:3187/index.html',{data:'test'})).status(),405);
    console.log('PASS: validación, facturación, consentimiento, privacidad local, acordeón, 4 tamaños, CTA móvil, bloqueo de activación, embed simulado y servidor. No se probó cuenta GHL ni pago real.');
  } finally { await browser.close(); }
} finally { server.kill(); }
