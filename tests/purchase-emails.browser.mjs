import {chromium} from 'playwright';
import {readFile,mkdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
const root='purchase-emails';
const emails=JSON.parse(await readFile(`${root}/content.json`,'utf8')).emails;
const vars=JSON.parse(await readFile(`${root}/variables.json`,'utf8'));
const manifest=JSON.parse(await readFile(`${root}/manifest.json`,'utf8'));
assert.equal(emails.length,12);
for(const city of ['cdmx','tijuana'])assert.deepEqual(emails.filter(e=>e.city===city).map(e=>e.step),[1,2,3,4,5,6]);
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
const metrics=[];
try{
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',r=>r.abort()); // Preview must work without any network or adjacent assets.
 await mkdir(`${root}/screenshots`,{recursive:true});
 for(const e of emails){
  const template=await readFile(`${root}/templates/${e.id}.html`,'utf8');
  const preview=await readFile(`${root}/preview/${e.id}.html`,'utf8');
  const plain=await readFile(`${root}/text/${e.id}.txt`,'utf8');
  assert.doesNotMatch(template,/<script|<form|<iframe|src="data:|pendiente\.invalid|event\/manage/i);
  assert.equal((template.match(/data-primary="true"/g)||[]).length,1);
  for(const token of template.matchAll(/\{\{FM_(\w+)\}\}/g))assert.ok(vars[token[1]],token[1]);
  assert.deepEqual(manifest.find(m=>m.id===e.id).required_tokens,[...new Set([...template.matchAll(/\{\{FM_(\w+)\}\}/g)].map(m=>m[1]))].sort());
  assert.doesNotMatch(preview,/\{\{FM_/);
  assert.ok(plain.includes(e.subject));assert.ok(plain.includes(e.cta.url));
  if(e.step===1)assert.ok(template.includes('FM_TOTAL_PAGADO')&&template.includes('FM_COMPROBANTE_URL'));
  if([4,5].includes(e.step))assert.doesNotMatch(template,/FM_ASISTENTES|FM_TOTAL_PAGADO|FM_COMPROBANTE_URL/);
  for(const width of [360,400,760]){
   await page.setViewportSize({width,height:1000});await page.setContent(preview,{waitUntil:'load'});
   assert.equal(await page.locator('html').getAttribute('lang'),'es');
   assert.equal(await page.locator('img').count(),1);
   assert.equal(await page.locator('img').evaluateAll(es=>es.every(e=>e.complete&&e.naturalWidth>0)),true,e.id);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`${e.id}: overflow ${width}`);
   assert.equal(await page.locator('[data-primary]').count(),1);
   const height=await page.evaluate(()=>document.documentElement.scrollHeight);
   metrics.push({id:e.id,width,height});
   if(width===760)await page.screenshot({path:`${root}/screenshots/${e.id}.png`,fullPage:true});
   if(width===400&&e.step===1)await page.screenshot({path:`${root}/screenshots/${e.city}-mobile.png`,fullPage:true});
  }
 }
 assert.deepEqual(errors,[]);
 // Imported template must still fit once resolved with unusually long real-world values.
 let long=await readFile(`${root}/preview/cdmx-01.html`,'utf8');
 long=long.replace('Andrea','María Fernanda de los Ángeles Hernández de la Torre').replace('VISTA-001','RESERVA-'.repeat(12));
 await page.setViewportSize({width:360,height:1000});await page.setContent(long);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'long booking fields overflow');
 console.log(`PASS: ${emails.length} emails, 3 widths, offline skyline loading, field registry, recipient privacy and long-field wrapping. Screenshots saved.`);
 console.log(JSON.stringify(metrics));
}finally{await browser.close()}
