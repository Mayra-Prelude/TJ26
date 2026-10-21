"""Package current design previews and sources for the Claude/GHL transfer."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import hashlib
import json

root = Path(__file__).resolve().parents[1]
artifacts = root / 'artifacts'
artifacts.mkdir(exist_ok=True)
start = """# FemTech México — tres páginas en español

La versión vigente usa el diseño de skyline oscuro/rosa de la agenda y el newsletter. Empieza por handoff/TRANSFERENCIA-CLAUDE.md. Para compartir con Claude, lee handoff/COMO-COMPARTIR-CON-CLAUDE.md y copia el texto de handoff/PEGAR-EN-CLAUDE.txt. El correo contiene 9 actividades hasta el 6 de noviembre, sin Lisboa. La web conserva 10 actividades. Ver handoff/IMAGENES.md para distinguir imágenes incluidas y originales pendientes, y handoff/COPY-CLARO.md para redacción breve.

1. Revisa la agenda en newsletter/index.html y el correo en newsletter/email.html (vista autónoma con imágenes incrustadas). Para implementar en GHL usa newsletter/email-ghl.html y sustituye las rutas por URLs HTTPS de imágenes alojadas.
2. Abre sponsorship-designs/index.html para las páginas independientes de Tijuana y CDMX.
3. Lee sponsorship-designs/HANDOFF-CLAUDE-GHL.md. Cada *-ghl-block.html va en un elemento Custom Code / HTML de GHL. Seguir sponsorship-designs/AIRTABLE-GHL-REGISTRO-VIP.md para enlazar el Airtable existente con el pago GHL. No requiere compilación.
4. Consulta newsletter/EVENTS-AND-ACCESS.md para fechas, contenido, registro y diferencias entre gratuito, pase VIP, invitación y eventos externos.
5. Los originales de imagen siguen pendientes; la carpeta Drive y el mapa de colocación están en newsletter/HANDOFF-CLAUDE-GHL.md y newsletter/handoff/asset-map.json.

Oferta vigente: Tijuana, pase de tres días USD 650 individual o USD 980 dúo, con traslados entre sedes oficiales y SIN comidas incluidas, según el último contenido adjunto; sustituye el modelo anterior sin precio. CDMX: Pase VIP Gold de cinco accesos, MXN 30,000 de referencia con impuestos/condiciones por confirmar. GHL debe verificar PayPal, moneda USD, el total reportado S$0.00 y la reserva vinculada a Airtable. Registrar allí empresa, logotipo y nombre/contacto de cada persona: dos lugares = dos asistentes; cinco lugares = cinco asistentes. Los diseños no capturan datos ni procesan pagos.

Agenda corregida: 10 actividades, un Summit el 30, una experiencia VIP el 31 y sin MedSummit. Mayra participará junto con Jill Biden según la organización; seguir newsletter/handoff/MILKEN-GMAIL-PENDIENTE.md para verificar los detalles en Gmail al construir GHL.

Capturas en previews/. Nada se publicó, envió ni cobró. El contenido de GHL fue proporcionado por la usuaria; no se verificó la cuenta desde esta sesión.

Desarrollo opcional: npm ci; npm run dev:sponsorships (3020) o npm run dev:newsletter (3010). Regenerar correo: npm run build:newsletter; python3 newsletter/package-email.py. Chromium en /usr/bin/chromium o CHROMIUM_PATH. Verificación: npm run test:sponsorships y npm run test:newsletter.
"""

def tree(z, directory, prefix=None):
    for p in sorted(directory.rglob('*')):
        if p.is_file():
            z.write(p, arcname=str((Path(prefix) / p.relative_to(directory)) if prefix else p.relative_to(root)))

with ZipFile(artifacts / 'femtech-claude-ghl-handoff.zip', 'w', ZIP_DEFLATED) as z:
    z.writestr('START-HERE.md', start)
    for name in ['README.md', 'package.json', 'package-lock.json', 'index.html', 'styles.css', 'app.js', 'config.js']:
        z.write(root / name, arcname=name)
    for folder in ['scripts', 'tests', 'assets', 'docs', 'handoff']:
        tree(z, root / folder)
    tree(z, root / 'newsletter')
    tree(z, root / 'sponsorship-designs')
    tree(z, root / 'newsletter/assets/skylines', 'IMAGENES/skylines')
    z.writestr('IMAGENES/LEER-PRIMERO.md', (root / 'handoff/IMAGENES.md').read_text())
    tree(z, artifacts / 'sponsorship-designs', 'previews/sponsorships')
    for name in ['hero.png', 'sponsorship-preview.png', 'email-top-preview.png', 'email.png', 'email-mobile.png', 'email-mobile-top.png', 'compact-comparison.json', 'desktop.png', 'city-sections.png', 'mobile.png']:
        p = artifacts / 'newsletter' / name
        if p.exists(): z.write(p, arcname='previews/newsletter/' + name)
    for name in ['email.html', 'email.png', 'metrics.json']:
        previous = artifacts / 'newsletter/before-compact' / name
        if previous.exists(): z.write(previous, arcname='previews/newsletter/before-compact/' + name)
    manifest = [{'path': n, 'bytes': len(z.read(n)), 'sha256': hashlib.sha256(z.read(n)).hexdigest()} for n in z.namelist()]
    z.writestr('FILE-MANIFEST.json', json.dumps(manifest, ensure_ascii=False, indent=2))

with ZipFile(artifacts / 'femtech-two-sponsorship-pages.zip', 'w', ZIP_DEFLATED) as z:
    for p in sorted((root / 'sponsorship-designs').rglob('*')):
        if p.is_file(): z.write(p, arcname=str(p.relative_to(root / 'sponsorship-designs')))
    tree(z, artifacts / 'sponsorship-designs', 'previews')

with ZipFile(artifacts / 'femtech-agenda-vip-review.zip', 'w', ZIP_DEFLATED) as z:
    z.writestr('START-HERE.md', start)
    tree(z, root / 'newsletter')
    tree(z, root / 'sponsorship-designs')

for name in ['femtech-claude-ghl-handoff.zip', 'femtech-two-sponsorship-pages.zip', 'femtech-agenda-vip-review.zip']:
    with ZipFile(artifacts / name) as z:
        assert z.testzip() is None, name
    print('Created and verified:', name)

# Nombre explícito para la nueva entrega en español; conserva los paquetes anteriores actualizados.
from shutil import copyfile
copyfile(artifacts / 'femtech-claude-ghl-handoff.zip', artifacts / 'femtech-tres-paginas-es.zip')
print('Entrega vigente: femtech-tres-paginas-es.zip')

copyfile(artifacts / 'femtech-claude-ghl-handoff.zip', artifacts / 'femtech-pack-completo-claude.zip')
print('Paquete completo: femtech-pack-completo-claude.zip')
