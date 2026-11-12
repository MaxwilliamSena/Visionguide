import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import vm from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(resolve(root, 'index.html'), 'utf8');
const elementIds = [...html.matchAll(/\bid\s*=\s*["']([^"']+)["']/gi)].map(match => match[1]);

test('A pagina tem estrutura HTML basica em portugues', () => {
  assert.match(html, /<!doctype html>/i);
  assert.match(html, /<html\b[^>]*\blang\s*=\s*["']pt-BR["']/i);
  assert.match(html, /<title>\s*Aventura na Floresta Amazônica\s*<\/title>/i);
  assert.match(html, /<main\b/i);
  assert.match(html, /<\/html\s*>/i);
});

test('As quatro secoes essenciais existem', () => {
  const ids = new Set(elementIds);
  for (const id of ['sobre', 'fases', 'controles', 'instalacao']) {
    assert.ok(ids.has(id), `Secao essencial ausente: id="${id}"`);
  }
});

test('Todos os links internos apontam para um id existente', () => {
  const ids = new Set(elementIds);
  const links = [...html.matchAll(/\bhref\s*=\s*["']#([^"']+)["']/gi)].map(match => match[1]);
  assert.ok(links.length > 0, 'Nenhum link interno encontrado');
  for (const id of links) {
    assert.ok(ids.has(id), `Link quebrado: href="#${id}" nao tem elemento id="${id}"`);
  }
});

test('Nenhum elemento possui id repetido', () => {
  assert.equal(new Set(elementIds).size, elementIds.length, 'Encontrado id duplicado');
});

test('O menu mobile possui botao e container', () => {
  const ids = new Set(elementIds);
  assert.ok(ids.has('mobile-menu-btn'));
  assert.ok(ids.has('mobile-menu'));
});

test('O JavaScript embutido nao possui erro de sintaxe', () => {
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)]
    .filter(match => !/\bsrc\s*=/.test(match[1]));
  assert.ok(scripts.length > 0, 'Nenhum script embutido encontrado');
  for (const [index, script] of scripts.entries()) {
    assert.doesNotThrow(() => new vm.Script(script[2], { filename: `inline-${index + 1}.js` }));
  }
});
