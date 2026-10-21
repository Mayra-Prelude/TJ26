import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {mkdir,readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const server=spawn(process.execPath,['scripts/serve.mjs'],{env:{...process.env,SERVE_DIR:'newsletter',PORT:'3190'},stdio:['ignore','pipe','inherit']});
try{
 await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject)});
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  await mkdir('artifacts/newsletter',{recursive:true});const page=await browser.newPage({viewport:{width:1440,height:1100}});const errors=[],requests=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));
  await page.goto('http://127.0.0.1:3190/',{waitUntil:'networkidle'});
  assert.equal(await page.locator('.hero-art .hero-city-art svg').count(),2);
  assert.equal(await page.locator('.hero-route').evaluate(el=>el.parentElement.classList.contains('hero')),true);
  assert.equal(await page.locator('html').getAttribute('lang'),'es');assert.equal(await page.locator('.event').count(),10);
  assert.equal(await page.locator('.city-section').count(),5);assert.equal(await page.locator('.city-divider .city-skyline').count(),4);assert.equal(await page.locator('.event .city-skyline').count(),0);assert.equal(await page.locator('.event-cover').count(),10);
  for(const [filter,count] of [['cdmx',3],['tijuana',3],['private',1],['sf',2],['lisbon',1],['external',3],['all',10]]){await page.locator(`[data-filter="${filter}"]`).click();assert.equal(await page.locator('.event').count(),count);assert.equal(await page.locator('.city-section').evaluateAll(gs=>gs.every(g=>g.querySelector('.event'))),true)}
  for(const id of ['milken','cocktail']){await page.locator(`.event [data-detail="${id}"]`).click();assert.equal(await page.locator('#dialog-link').isVisible(),false);assert.equal(await page.locator('#calendar-download').isVisible(),false);await page.keyboard.press('Escape')}
  for(const id of ['industrial','hospitals']){assert.equal(await page.locator(`.event[data-event="${id}"] a`).getAttribute('href'),'https://ruta2026.prelude-health.com/vip-tijuana-page');assert.match(await page.locator(`.event[data-event="${id}"]`).innerText(),/USD 650.*USD 980/)}
  await page.evaluate(()=>{const e=events.find(e=>e.id==='industrial');e.paymentUrlApproved=false;render()});assert.equal(await page.locator('.event[data-event="industrial"] a').count(),0);
  await page.evaluate(()=>{const e=events.find(e=>e.id==='industrial');e.paymentUrlApproved=true;e.paymentUrl='javascript:alert(1)';const c=events.find(e=>e.id==='cocktail');c.bookingStatus='payment';c.paymentUrlApproved=true;c.paymentUrl='https://example.com/checkout';render()});assert.equal(await page.locator('.event[data-event="industrial"] a').count(),0);assert.equal(await page.locator('.event[data-event="cocktail"] a').count(),0);await page.reload();
  for(const [id,start] of [['ruta','20261026T230000Z'],['deeptech','20261028T230000Z'],['summit','20261030T150000Z']]){
   await page.locator(`.event [data-detail="${id}"]`).click();assert.equal(await page.locator('#dialog-link').getAttribute('href'),'https://luma.com/femtechmexico');
   const pending=page.waitForEvent('download');await page.locator('#calendar-download').click();const download=await pending;const ics=await readFile(await download.path(),'utf8');assert.ok(ics.includes('DTSTART:'+start));assert.match(ics,/STATUS:TENTATIVE/);assert.doesNotMatch(ics,/DTEND/);assert.ok(ics.split('\r\n').every(line=>Buffer.byteLength(line)<=75));await page.keyboard.press('Escape');
  }
  for(const [id,start,end] of [['startup-world-cup','20261104','20261107'],['websummit','20261109','20261113']]){
   await page.locator(`.event [data-detail="${id}"]`).click();const promise=page.waitForEvent('download');await page.locator('#calendar-download').click();const download=await promise;const ics=await readFile(await download.path(),'utf8');assert.ok(ics.includes('DTSTART;VALUE=DATE:'+start));assert.ok(ics.includes('DTEND;VALUE=DATE:'+end));await page.keyboard.press('Escape');
  }
  await page.locator('[data-sponsorship="cdmx"]').click();assert.equal(await page.locator('#dialog-link').getAttribute('href'),'mailto:hello@femtech.mx');assert.equal(await page.locator('#calendar-download').isVisible(),false);await page.keyboard.press('Escape');
  for(const width of [360,400,768,1440]){
   await page.setViewportSize({width,height:1100});await page.goto('http://127.0.0.1:3190/',{waitUntil:'networkidle'});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`agenda overflow ${width}`);
   assert.doesNotMatch(await page.locator('body').innerText(),/View program|Invitation only|Cover image pending|THE FUTURE|Check availability/);
   if(width===400)await page.screenshot({path:'artifacts/newsletter/mobile.png',fullPage:true});
   if(width===1440){await page.screenshot({path:'artifacts/newsletter/desktop.png',fullPage:true});await page.screenshot({path:'artifacts/newsletter/hero.png'});await page.locator('#privados').screenshot({path:'artifacts/newsletter/sponsorship-preview.png'});await page.locator('[data-city-section="tijuana"]').screenshot({path:'artifacts/newsletter/city-sections.png'})}
  }
  const expectedEvents=['ruta','cocktail','milken','deeptech','industrial','summit','hospitals','sf','startup-world-cup','websummit'];
  assert.deepEqual(await page.locator('.event').evaluateAll(es=>es.map(e=>e.dataset.event)),expectedEvents);
  assert.doesNotMatch(await page.locator('body').innerText(),/MedSummit|comidas indicadas|comida de bienvenida/i);
  assert.match(await page.locator('.event[data-event="milken"]').innerText(),/Mayra.*Jill Biden/);
  assert.equal(await page.locator('.event[data-event="summit"] a[href*="vip-tijuana-page"]').count(),1);
  assert.match(await page.locator('.event[data-event="hospitals"]').innerText(),/recorridos.*cierre/is);
  const ids=await page.locator('[id]').evaluateAll(es=>es.map(e=>e.id));assert.equal(new Set(ids).size,ids.length);assert.equal(await page.locator('a[href*="event/manage"]').count(),0);
  const email=await readFile('newsletter/email.html','utf8');assert.doesNotMatch(email,/Lisboa|Portugal|Web Summit|websummit|lisbon/i);assert.doesNotMatch(await readFile('newsletter/email.txt','utf8'),/Lisboa|Portugal|Web Summit|websummit|lisbon/i);assert.doesNotMatch(email,/<script|<form|event\/manage/);assert.match(email,/lang="es"/);assert.equal((email.match(/Registrarme en Luma →/g)||[]).length,3);
  await page.goto('http://127.0.0.1:3190/email.html',{waitUntil:'load'});assert.equal(await page.locator('img').evaluateAll(es=>es.every(e=>e.complete&&e.naturalWidth>0)),true);assert.equal(await page.locator('[data-newsletter-skyline]').count(),1);assert.equal(await page.locator('img').count(),4);assert.equal(await page.locator('[data-city-section]').count(),4);assert.equal(await page.locator('[data-event-cover]').count(),9);assert.match(await page.locator('body').innerText(),/650 dólares por persona · 980 dólares por dos/);
  assert.deepEqual(await page.locator('[data-event-id]').evaluateAll(es=>es.map(e=>e.dataset.eventId)),expectedEvents.filter(id=>id!=='websummit'));
  assert.match(await page.locator('body').innerText(),/30,000 pesos mexicanos por cinco accesos/);
  assert.match(await page.locator('body').innerText(),/Incluye el programa y traslados entre sedes. Comidas, hotel y vuelos por separado/);
  assert.doesNotMatch(await page.locator('body').innerText(),/MedSummit|comidas indicadas|comida de bienvenida/i);
  assert.match(await page.locator('[data-event-id="milken"]').innerText(),/Mayra.*Jill Biden/);
  assert.equal(await page.locator('[data-event-id="milken"] a').count(),0);
  assert.equal(await page.locator('[data-event-id="summit"] a[href*="vip-tijuana-page"]').count(),1);
  for(const width of [360,400,640]){await page.setViewportSize({width,height:1100});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`email overflow at ${width}`);if(width===400){await page.screenshot({path:'artifacts/newsletter/email-mobile.png',fullPage:true});await page.screenshot({path:'artifacts/newsletter/email-mobile-top.png'})}}

  await page.setViewportSize({width:760,height:1500});await page.screenshot({path:'artifacts/newsletter/email-top-preview.png'});await page.screenshot({path:'artifacts/newsletter/email.png',fullPage:true});
  // Reproduce opening the HTML alone, with no server or sibling asset directory.
  const isolated=await browser.newPage();const isolatedRequests=[];
  isolated.on('request',request=>isolatedRequests.push(request.url()));
  await isolated.route('**/*',route=>route.abort());
  await isolated.setContent(email,{waitUntil:'load'});
  assert.ok(await isolated.locator('img').count()>=4);
  assert.equal(await isolated.locator('img').evaluateAll(images=>images.every(img=>img.getAttribute('src').startsWith('data:image/')&&img.complete&&img.naturalWidth>0)),true,'downloaded newsletter images must render without assets or network');
  assert.deepEqual(isolatedRequests,[]);
  await isolated.close();
  const ghlEmail=await readFile('newsletter/email-ghl.html','utf8');
  assert.doesNotMatch(ghlEmail,/src="data:|Lisboa|Portugal|Web Summit|websummit|lisbon/i);
  await page.goto('http://127.0.0.1:3190/email-ghl.html',{waitUntil:'load'});
  assert.equal(await page.locator('img').evaluateAll(images=>images.every(img=>img.complete&&img.naturalWidth>0)),true);
  assert.deepEqual(errors,[]);assert.equal(requests.filter(url=>!url.startsWith('http://127.0.0.1:3190/')).length,0);
  console.log('PASS: agenda y newsletter en español; 10 actividades web / 9 correo sin Lisboa; ciudades y portadas; oferta Tijuana actualizada; cóctel privado y Milken informativo; calendarios y móvil.');
 }finally{await browser.close()}
}finally{server.kill()}
