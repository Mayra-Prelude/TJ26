import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {readFile,mkdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
const server=spawn(process.execPath,['scripts/serve.mjs'],{env:{...process.env,SERVE_DIR:'sponsorship-designs',PORT:'3192'},stdio:['ignore','pipe','inherit']});
try{
 await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject)});
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  await mkdir('artifacts/sponsorship-designs',{recursive:true});const page=await browser.newPage();const errors=[],remote=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1:3192/'))remote.push(r.url())});
  for(const [city,key] of [['tijuana','tj'],['cdmx','cd']]){
   const block=await readFile(`sponsorship-designs/${city}-ghl-block.html`,'utf8');
   assert.doesNotMatch(block,/<script|<form|<input|<iframe|<link|<!doctype|position:\s*fixed|var\(--/i);
   assert.match(block,/<style>/);assert.match(block,/lang="es"/);
   for(const width of [360,400,768,1440]){
    await page.setViewportSize({width,height:1100});await page.goto(`http://127.0.0.1:3192/${city}.html`,{waitUntil:'networkidle'});
    assert.equal(await page.locator('html').getAttribute('lang'),'es');
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`${city} overflow at ${width}`);
    assert.equal(await page.locator('[data-vip-registration]').count(),1);assert.match(await page.locator('[data-vip-registration]').innerText(),/Nombre, correo y teléfono de cada persona/);
    assert.equal(await page.locator('h1').count(),1);assert.equal(await page.locator('input,form,iframe').count(),0);
    assert.equal(await page.locator('.fm-hero-skyline svg').count(),1);assert.equal(await page.locator('.fm-hero-skyline svg').isVisible(),true);assert.equal(await page.locator('.fm-city-divider svg').count(),1);assert.equal(await page.locator('.fm-cover').count(),1);
    assert.doesNotMatch(await page.locator('body').innerText(),/By invitation|Explore sponsorship|DESIGN REVIEW|To be confirmed|PLACEHOLDER/);
    for(const href of await page.locator('a[href^="#"]').evaluateAll(els=>els.map(el=>el.getAttribute('href'))))assert.equal(await page.locator(href).count(),1);
    await page.locator('.fm-hero .fm-btn').click();assert.equal(new URL(page.url()).hash,`#${key}-sponsorship`);
    await page.locator('summary').first().click();assert.equal(await page.locator('details').first().getAttribute('open'),'');
    await page.goto(`http://127.0.0.1:3192/${city}.html`,{waitUntil:'networkidle'});
    if(width===360)await page.screenshot({path:`artifacts/sponsorship-designs/${city}-mobile-hero.png`});
    if(width===400)await page.screenshot({path:`artifacts/sponsorship-designs/${city}-mobile.png`,fullPage:true});
    if(width===1440){await page.screenshot({path:`artifacts/sponsorship-designs/${city}-desktop.png`,fullPage:true});await page.screenshot({path:`artifacts/sponsorship-designs/${city}-hero.png`});await page.locator(`#${key}-sponsorship`).screenshot({path:`artifacts/sponsorship-designs/${city}-offer.png`})}
   }
   if(city==='tijuana'){
    assert.match(await page.locator('body').innerText(),/Las comidas no están incluidas/);assert.doesNotMatch(await page.locator('body').innerText(),/Comidas y traslados|comidas indicadas|transporte, alimentos/i);
    assert.equal(await page.locator('.fm-day').count(),3);assert.match(await page.locator('body').innerText(),/fecha por confirmar/);
    assert.equal(await page.locator('.fm-ticket').count(),2);assert.match(await page.locator('.fm-ticket').nth(0).innerText(),/USD 650/);assert.match(await page.locator('.fm-ticket').nth(1).innerText(),/USD 980/);
    assert.match(await page.locator('.fm-ticket').nth(1).innerText(),/490.*320/);
    await page.locator('.fm-ticket .fm-btn').first().click();assert.equal(new URL(page.url()).hash,'#tj-order-form');
    await page.locator('#tj-terms summary').click();assert.match(await page.locator('#tj-terms').innerText(),/15 de octubre de 2026/);assert.match(await page.locator('#tj-terms').innerText(),/22 de octubre de 2026/);
    await page.locator('#tj-privacy summary').click();assert.match(await page.locator('#tj-privacy').innerText(),/32 Pekin Street/);
   }else {
    assert.match(await page.locator('.fm-price').innerText(),/MXN 30,000/);
    assert.doesNotMatch(await page.locator('body').innerText(),/patrocini|5 invitaciones · 6 meses/i);
    assert.match(await page.locator('[data-package=gold]').innerText(),/5 accesos/);
    assert.equal(await page.locator('[data-package]').count(),1);
    assert.equal(await page.locator('[data-package-pending]').count(),0);
    assert.equal(await page.locator('[data-cdmx-term]').count(),11);
    assert.equal(await page.locator('.fm-package-benefits li').count(),5);
    await page.locator('[data-package=gold] .fm-btn').click();assert.equal(new URL(page.url()).hash,'#cd-terms');
    await page.locator('[data-cdmx-term="9"] summary').click();assert.match(await page.locator('[data-cdmx-term="9"]').innerText(),/pendiente de confirmación/);
    assert.doesNotMatch(await page.locator('#cd-terms').innerText(),/14 de octubre|15 de octubre|USD 650|USD 980/);
    await page.locator('#cd-privacy summary').click();assert.match(await page.locator('#cd-privacy').innerText(),/aviso específico de CDMX/);
    await page.locator('#cd-legal').screenshot({path:'artifacts/sponsorship-designs/cdmx-terms.png'});
   }
  }
  assert.deepEqual(errors,[]);assert.deepEqual(remote,[]);
  await page.setViewportSize({width:400,height:1100});await page.setContent('<style>body{margin:0}#outside{color:rgb(0, 80, 0)}</style><h2 id="outside">Encabezado GHL</h2><div style="max-width:380px;margin:auto">'+await readFile('sponsorship-designs/tijuana-ghl-block.html','utf8')+'</div>');
  assert.equal(await page.locator('#outside').evaluate(el=>getComputedStyle(el).color),'rgb(0, 80, 0)');assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  console.log('PASS: dos páginas en español; skyline protagonista; cuatro tamaños; precios Tijuana y términos; enlaces y FAQs; bloques GHL aislados sin checkout propio.');
 }finally{await browser.close()}
}finally{server.kill()}
