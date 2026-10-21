"""Create an unsent email preview with local images attached by Content-ID."""
from pathlib import Path
from email.message import EmailMessage
from email.policy import SMTP
import json
import mimetypes
import re

root = Path(__file__).resolve().parent
html = (root / 'email-ghl.html').read_text()
images = sorted(set(re.findall(r'<img[^>]+src="(assets/[^\"]+)"', html)))
attachments = []
for index, relative in enumerate(images):
    path = (root / relative).resolve()
    if not path.is_relative_to(root / 'assets'):
        raise ValueError('Image outside asset directory')
    cid = f'image-{index}@femtech-preview'
    html = html.replace(f'src="{relative}"', f'src="cid:{cid}"')
    attachments.append((path, cid))
message = EmailMessage(policy=SMTP)
message['Subject'] = '[REVISIÓN] ' + json.loads((root / 'email-copy.json').read_text())['subject']
message['X-Unsent'] = '1'
message.set_content((root / 'email.txt').read_text())
message.add_alternative(html, subtype='html')
part = message.get_payload()[-1]
for path, cid in attachments:
    mime = mimetypes.guess_type(path.name)[0]
    if not mime or not mime.startswith('image/'):
        raise ValueError('Unsupported image type')
    maintype, subtype = mime.split('/')
    part.add_related(path.read_bytes(), maintype=maintype, subtype=subtype,
                     cid=f'<{cid}>', filename=path.name, disposition='inline')
(root / 'email-preview.eml').write_bytes(message.as_bytes())
print(f'Created unsent email-preview.eml with {len(attachments)} attached images; no recipients or sender configured.')
