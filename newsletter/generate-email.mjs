import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
import vm from 'node:vm';
import {chromium} from 'playwright';
import {renderEmail} from './render-email.mjs';
let html=await readFile(new URL('./index.html',import.meta.url),'utf8');
const dataScript=html.slice(html.indexOf('const events='),html.indexOf('const arrow='));
const {events,bookingTarget,covers,groupedEvents}=vm.runInNewContext(dataScript+'\n({events,bookingTarget,covers,groupedEvents});',{URL,LUMA:'https://luma.com/femtechmexico'});
// Newsletter scope and plain-language copy are independent from the full website agenda.
const emailCopy=JSON.parse(await readFile(new URL('./email-copy.json',import.meta.url),'utf8'));
const emailEvents=events.filter(event=>!emailCopy.excluded_regions.includes(event.region)).map(event=>({...event,...emailCopy.events[event.id]}));
// Embed supplied artwork in the standalone site; missing uploads remain explicit draft slots.
for(const cover of Object.values(covers)){
 try{
  const file=new URL('./'+cover.file,import.meta.url);
  const bytes=await readFile(file);
  const ext=cover.file.split('.').pop().toLowerCase();
  const mime={jpg:'image/jpeg',jpeg:'image/jpeg',png:'image/png',webp:'image/webp'}[ext];
  if(!mime)throw new Error('Unsupported cover image type: '+ext);
  cover.src=`data:${mime};base64,${bytes.toString('base64')}`;
 }catch(error){if(error.code!=='ENOENT')throw error;cover.src=null}
}
html=html.replace(/\/\/ COVER_DATA_START[\s\S]*?\/\/ COVER_DATA_END/,'// COVER_DATA_START\nconst covers='+JSON.stringify(covers,null,2)+';\n// COVER_DATA_END');
await writeFile(new URL('./index.html',import.meta.url),html);
// Rasterized city illustrations work in email clients that cannot render inline SVG.
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
try{
 const page=await browser.newPage({viewport:{width:1000,height:400},deviceScaleFactor:1});
 for(const key of ['cdmx','tijuana','valle','sf','lisbon']){
  const svg=await readFile(new URL(`./assets/skylines/${key}.svg`,import.meta.url),'utf8');
  await page.setContent('<style>body{margin:0;background:#100812}svg{display:block;width:1000px;height:400px}</style>'+svg);
  await page.screenshot({path:new URL(`./assets/skylines/${key}.png`,import.meta.url).pathname});
 }
 // Header illustration uses the same supplied city drawings as the section dividers.
 const cities=[['cdmx','CIUDAD DE MÉXICO'],['tijuana','TIJUANA'],['sf','SAN FRANCISCO']];
 const pieces=await Promise.all(cities.map(async([key,label],index)=>{
  const svg=(await readFile(new URL(`./assets/skylines/${key}.svg`,import.meta.url),'utf8')).replace(/<text[\s\S]*?<\/text>/g,'');
  const nested=svg.replace('<svg ',`<svg x="${index*400}" y="15" width="400" height="160" `);
  return nested+`<text x="${index*400+200}" y="205" text-anchor="middle" fill="#efa1d8" font-family="Arial,sans-serif" font-size="19" letter-spacing="2">${label}</text>`;
 }));
 const headerSvg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 225" role="img" aria-label="Ciudad de México, Tijuana y San Francisco"><rect width="1200" height="225" fill="#100812"/>${pieces.join('')}</svg>`;
 await writeFile(new URL('./assets/skylines/ruta-ciudades.svg',import.meta.url),headerSvg);
 await page.setViewportSize({width:1200,height:225});
 await page.setContent('<style>body{margin:0;background:#100812}svg{display:block;width:1200px;height:225px}svg svg{width:400px;height:160px}</style>'+headerSvg);
 await page.screenshot({path:new URL('./assets/skylines/ruta-ciudades.png',import.meta.url).pathname});
}finally{await browser.close()}
const email=renderEmail({emailCopy,emailEvents,covers,bookingTarget,groupedEvents});
// The browser preview must also work when opened as a single downloaded file.
// Keep the email-platform template separate: email clients need hosted media or CID.
await writeFile(new URL('./email-ghl.html',import.meta.url),email);
let standaloneEmail=email;
const imageFiles=[...new Set([...email.matchAll(/<img[^>]+src="(assets\/[^"]+)"/g)].map(match=>match[1]))];
const embeddedImages=await Promise.all(imageFiles.map(async relative=>{
 const mime={png:'image/png',jpg:'image/jpeg',jpeg:'image/jpeg',webp:'image/webp'}[relative.split('.').pop().toLowerCase()];
 if(!mime||relative.split('/').includes('..'))throw new Error('Invalid email image: '+relative);
 const bytes=await readFile(new URL('./'+relative,import.meta.url));
 return [relative,`data:${mime};base64,${bytes.toString('base64')}`];
}));
for(const [relative,src] of embeddedImages)standaloneEmail=standaloneEmail.replaceAll(`src="${relative}"`,`src="${src}"`);
await writeFile(new URL('./email.html',import.meta.url),standaloneEmail);
const text='ASUNTO: '+emailCopy.subject+'\nPREENCABEZADO: '+emailCopy.preheader+'\n\nVISTA DE REVISIÓN — PENDIENTE DE ENVÍO\n\nTe invitamos a encuentros sobre salud de la mujer. Consulta qué incluye cada evento y cómo reservar.\n\nTijuana, 29–31 de octubre: 650 dólares por persona o 980 dólares por dos. Precios en dólares estadounidenses. Incluye el programa y traslados entre sedes. Comidas, hotel y vuelos por separado.\n\n'+groupedEvents(emailEvents).map(group=>group.name.toUpperCase()+'\n\n'+group.events.map(e=>e.day+' de '+(e.month==='NOV'?'noviembre':'octubre')+' de 2026 | '+e.city+'\n'+e.title+(e.venue?'\n'+e.venue:'')+(e.timeLabel?'\n'+e.timeLabel:'')+'\n'+e.description+(e.sessions?'\n'+e.sessions.replace(/<[^>]*>/g,''):'')+(e.accessNote?'\n'+e.accessNote:'')+(e.secondaryUrl?'\n'+e.secondaryLabel+': '+e.secondaryUrl:'')+(e.id==='cocktail'?'\nConsultar pase Gold: mailto:hello@femtech.mx':'')+(bookingTarget(e)?'\n'+(e.button||bookingTarget(e).label)+': '+bookingTarget(e).url:'')).join('\n\n')).join('\n\n')+'\n\nPara los pases VIP, registra nombre, correo y teléfono de cada asistente, empresa y logotipo antes del pago. Dudas: hello@femtech.mx. Integra remitente y enlace de baja antes de enviar.';
await writeFile(new URL('./email.txt',import.meta.url),text);
await mkdir(new URL('../dist/newsletter/assets/skylines/',import.meta.url),{recursive:true});
for(const name of ['index.html','email.html','email-ghl.html','email.txt'])await copyFile(new URL(name,import.meta.url),new URL('../dist/newsletter/'+name,import.meta.url));
for(const key of ['cdmx','tijuana','valle','sf','lisbon','ruta-ciudades'])for(const ext of ['png','svg'])await copyFile(new URL(`./assets/skylines/${key}.${ext}`,import.meta.url),new URL(`../dist/newsletter/assets/skylines/${key}.${ext}`,import.meta.url));
await mkdir(new URL('../dist/newsletter/assets/covers/',import.meta.url),{recursive:true});
for(const cover of Object.values(covers))if(cover.src)await copyFile(new URL('./'+cover.file,import.meta.url),new URL('../dist/newsletter/'+cover.file,import.meta.url));
console.log('Generadas agenda y newsletter en español; skylines y portadas preparados para revisión.');
