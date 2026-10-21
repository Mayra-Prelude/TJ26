"""Generate review HTML and unmapped GHL templates; never sends mail."""
import base64,html,json,re,shutil
from pathlib import Path
R=Path(__file__).resolve().parent
content=json.loads((R/'content.json').read_text())['emails']
variables=json.loads((R/'variables.json').read_text())
for folder in ['assets','templates','preview','text']:(R/folder).mkdir(exist_ok=True)
for city in ['cdmx','tijuana']:
 shutil.copyfile(R.parent/f'newsletter/assets/skylines/{city}.png',R/f'assets/{city}.png')
def esc(x):return html.escape(str(x),quote=True)
def token(k):return '{{FM_'+k+'}}'
def render(e):
 city=e['city']; label='Ciudad de México · 26 octubre' if city=='cdmx' else 'Tijuana · 29–31 octubre'
 p=lambda s:f'<p style="margin:0 0 14px;font-size:16px;line-height:1.6;color:#e5d7e9">{esc(s)}</p>'
 details=''.join(f'<tr><td style="padding:8px 12px;border-bottom:1px solid #543257;font-size:12px;line-height:1.4;color:#ffb7e3;width:32%">{esc(k)}</td><td style="padding:8px 12px;border-bottom:1px solid #543257;font-size:14px;line-height:1.5;color:#fff;overflow-wrap:anywhere">{esc(v)}</td></tr>' for k,v in e['details'])
 detailtable=f'<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#2c1832;margin:4px 0 20px;table-layout:fixed">{details}</table>' if details else ''
 receipt=f'<p style="margin:20px 0 0;font-size:13px"><a href="{token("COMPROBANTE_URL")}" style="color:#ffb7e3;text-decoration:underline">Ver comprobante de pago</a></p>' if e['step']==1 else ''
 notes=''.join(f'<p style="margin:0 0 10px;color:#d8c6de;font-size:13px;line-height:1.6;overflow-wrap:anywhere">{esc(n)}</p>' for n in e['notes'])
 return f'''<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><title>{esc(e['subject'])}</title><style>@media only screen and (max-width:480px){{.pad{{padding-left:22px!important;padding-right:22px!important}}.title{{font-size:29px!important}}.outer{{padding:12px 6px!important}}}}</style></head><body style="margin:0;background:#100812;font-family:Arial,Helvetica,sans-serif"><div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all">{esc(e['preheader'])}</div><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#100812"><tr><td class="outer" align="center" style="padding:28px 12px"><!--[if mso]><table role="presentation" width="600"><tr><td><![endif]--><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;border:1px solid #4a2a50;background:#1b0e20"><tr><td class="pad" style="padding:26px 32px 0"><p style="margin:0 0 26px;font-size:24px;letter-spacing:-1px;color:#fff;font-weight:bold">femtech <span style="font-size:10px;letter-spacing:2px;color:#ff9ad9">MÉXICO™</span></p><p style="margin:0 0 8px;font-size:11px;letter-spacing:2px;color:#ff9ad9">RUTA FEMTECH 2026 · PASE VIP</p><p style="margin:0;font-size:14px;color:#e7c4df">{label}</p><img src="{token('SKYLINE_'+city.upper()+'_URL')}" width="534" alt="Skyline de {'Ciudad de México' if city=='cdmx' else 'Tijuana'}" style="display:block;width:100%;max-width:534px;height:auto;border:0;margin:18px 0 0"></td></tr><tr><td class="pad" style="padding:26px 32px 28px;border-top:1px solid #85446f"><h1 class="title" style="margin:0 0 20px;font-size:34px;line-height:1.12;letter-spacing:-.8px;color:#ff80cf">{esc(e['title'])}</h1>{p('Hola, '+token('NOMBRE')+'.')}{''.join(p(x) for x in e['paragraphs'])}{detailtable}<table role="presentation" cellspacing="0" cellpadding="0"><tr><td bgcolor="#ff80cf" style="border-radius:4px;text-align:center"><a data-primary="true" href="{esc(e['cta']['url'])}" style="display:inline-block;border:14px solid #ff80cf;border-left-width:20px;border-right-width:20px;border-radius:4px;background:#ff80cf;color:#210d27;font-size:15px;line-height:20px;font-weight:bold;text-decoration:none">{esc(e['cta']['label'])} →</a></td></tr></table>{receipt}<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:24px;border-top:1px solid #513057"><tr><td style="padding-top:18px">{notes}</td></tr></table></td></tr><tr><td class="pad" style="padding:20px 32px;background:#140a18;border-top:1px solid #4a2a50;font-size:11px;line-height:1.6;color:#c8b4cf"><p style="margin:0 0 8px">FemTech México · {token('PIE_LEGAL')}</p><p style="margin:0 0 8px">Recibes este correo por tu reserva de Ruta FemTech.</p><a href="{token('PRIVACIDAD_URL')}" style="color:#ffb7e3">Privacidad</a> · <a href="{token('PREFERENCIAS_URL')}" style="color:#ffb7e3">Preferencias de correo</a></td></tr></table><!--[if mso]></td></tr></table><![endif]--></td></tr></table></body></html>'''
def demo(e,s):
 def sub(m):
  k=m.group(1); val=variables[k]['preview']
  if k.startswith('SKYLINE_'):
   data=(R/f'assets/{e["city"]}.png').read_bytes();return 'data:image/png;base64,'+base64.b64encode(data).decode()
  if variables[k]['type']=='url':return '#pendiente'
  if k=='PASE': val='Pase VIP Gold' if e['city']=='cdmx' else 'Experiencia VIP · dúo'
  if k=='ACCESOS':val='5' if e['city']=='cdmx' else '2'
  if k=='ASISTENTES':val=' · '.join('Asistente '+str(i) for i in range(1,6 if e['city']=='cdmx' else 3))
  return esc(val)
 s=re.sub(r'\{\{FM_(\w+)\}\}',sub,s)
 return s.replace('<table role="presentation" width="100%"', '<div style="background:#fff2c7;color:#392306;text-align:center;padding:10px;font:12px Arial">VISTA DE DISEÑO · Datos de muestra · Enlaces sin conectar</div><table role="presentation" width="100%"',1)
manifest=[];copy=['# Correos de compra · Ruta FemTech 2026','Borradores en español. Los marcadores FM requieren mapeo; no son campos nativos de GHL.']
for e in content:
 s=render(e);(R/f'templates/{e["id"]}.html').write_text(s);(R/f'preview/{e["id"]}.html').write_text(demo(e,s))
 plain='\n\n'.join(['Asunto: '+e['subject'],'Vista previa: '+e['preheader'],'Hola, '+token('NOMBRE')+'.',*e['paragraphs'],*[(k+': '+v) for k,v in e['details']],e['cta']['label']+': '+e['cta']['url'],*(['Ver comprobante de pago: '+token('COMPROBANTE_URL')] if e['step']==1 else []),*e['notes'],'FemTech México · '+token('PIE_LEGAL'),'Privacidad: '+token('PRIVACIDAD_URL'),'Preferencias: '+token('PREFERENCIAS_URL')])+'\n'
 (R/f'text/{e["id"]}.txt').write_text(plain)
 used=sorted(set(re.findall(r'\{\{FM_(\w+)\}\}',s)))
 assert all(k in variables for k in used)
 manifest.append({**{k:e[k] for k in ['id','subject','preheader','recipient','trigger','optional']},'template':f'templates/{e["id"]}.html','plain_text':f'text/{e["id"]}.txt','required_tokens':used})
 copy+=['\n## '+e['id'],'```text\n'+plain+'```']
(R/'COPY-EMAILS.md').write_text('\n\n'.join(copy)+'\n')
(R/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
cards=''.join(f'<article><div class="label"><b>{e["id"]} · {esc(e["subject"])}</b><p>{esc(e["preheader"])}</p><a href="preview/{e["id"]}.html" target="_blank">Abrir correo completo ↗</a></div><iframe title="{esc(e["subject"])}" src="preview/{e["id"]}.html" loading="lazy"></iframe></article>' for e in content)
(R/'index.html').write_text(f'''<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Correos de compra · FemTech</title><style>*{{box-sizing:border-box}}body{{margin:0;background:#100812;color:#fff;font:16px/1.5 Arial}}header,main{{max-width:1360px;margin:auto;padding:28px}}h1{{font-size:40px;line-height:1.1;color:#ff80cf}}a{{color:#ffb7e3}}main{{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:28px}}article{{min-width:0;background:#24122c;border:1px solid #59315e;border-radius:10px;overflow:hidden}}.label{{padding:20px}}.label p{{font-size:13px;color:#cfb9d5}}iframe{{display:block;width:100%;height:1150px;border:0}}@media(max-width:800px){{main{{grid-template-columns:1fr;padding:12px}}header{{padding:22px}}h1{{font-size:32px}}}}</style></head><body><header><p>FEMTECH MÉXICO · ENTREGA PARA CLAUDE / GHL</p><h1>Dos compras.<br>Una atención clara.</h1><p>6 correos CDMX · 6 correos Tijuana · Español · Borradores sin enviar</p><p>Los nombres son ejemplos. Contactos, horarios y enlaces siguen pendientes de conectar.</p><a href="COPY-EMAILS.md">Leer los 12 textos</a> · <a href="HANDOFF-CLAUDE-GHL.md">Instrucciones de implementación</a></header><main>{cards}</main></body></html>''')
print('Generated 12 templates, 12 self-contained previews, 12 plain-text emails, gallery and manifest.')
