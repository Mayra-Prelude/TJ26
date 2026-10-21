"""Bundle the purchase-email deliverables and relevant registration/offer context."""
import hashlib,json
from pathlib import Path
from zipfile import ZipFile,ZIP_DEFLATED
root=Path(__file__).resolve().parents[1]
out=root/'entrega/FemTech-correos-compra.zip';out.parent.mkdir(exist_ok=True)
with ZipFile(out,'w',ZIP_DEFLATED) as z:
 z.writestr('START-HERE.md', '# Correos de compra FemTech\n\nAbre purchase-emails/index.html en el navegador para revisar los 12 diseños.\nLee purchase-emails/HANDOFF-CLAUDE-GHL.md y WORKFLOWS.md para implementar.\nUsa templates/ para GHL; preview/ solo para revisión. Los contactos y enlaces son pendientes, no conexiones reales. No se ha enviado ningún correo.\n\nLos skylines están incluidos en purchase-emails/assets/. Textos en COPY-EMAILS.md. El repositorio completo y sus pruebas están en https://github.com/Mayra-Prelude/TJ26.\n')
 for p in sorted((root/'purchase-emails').rglob('*')):
  if p.is_file():z.write(p,p.relative_to(root))
 for name in ['AIRTABLE-GHL-REGISTRO-VIP.md','HANDOFF-CLAUDE-GHL.md','cdmx-packages.json','tijuana.html']:
  p=root/'sponsorship-designs'/name;z.write(p,p.relative_to(root))
 manifest=[{'path':n,'bytes':len(z.read(n)),'sha256':hashlib.sha256(z.read(n)).hexdigest()} for n in z.namelist()]
 z.writestr('FILE-MANIFEST.json',json.dumps(manifest,ensure_ascii=False,indent=2))
with ZipFile(out) as z:
 assert z.testzip() is None
 for r in json.loads(z.read('FILE-MANIFEST.json')):assert hashlib.sha256(z.read(r['path'])).hexdigest()==r['sha256']
print(f'Verified {out.name}: {out.stat().st_size} bytes')
