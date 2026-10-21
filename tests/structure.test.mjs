import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
test('every local anchor resolves to one unique element', () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(ids.length, new Set(ids).size);
  for (const [, anchor] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(anchor), anchor);
});
test('review starts with payment disabled and no sensitive collection', async () => {
  const context = {window:{}}; vm.runInNewContext(await readFile(new URL('../config.js', import.meta.url), 'utf8'), context);
  assert.equal(context.window.FEMTECH_CONFIG.mode, 'review');
  assert.ok(Object.values(context.window.FEMTECH_CONFIG.approvals).every(v => v === false));
  assert.equal(context.window.FEMTECH_CONFIG.nativeRegistrationUrl, '');
  assert.match(html, /noindex, nofollow/);
  assert.match(html, /lang="es-MX"/);
  assert.doesNotMatch(html, /autocomplete="cc-/);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
});
