#!/usr/bin/env node
/** Gera as seções por produto de docs/06-playbook-de-publicacao.md a partir de selected.json. */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ler = (p) => JSON.parse(readFileSync(resolve(raiz, p), 'utf8'));
const escolhidos = ler('catalog/selected.json');
const precos = ler('outputs/precificacao.json');
const cabecalho = readFileSync(resolve(raiz, '../docs/_06-cabecalho.md'), 'utf8');

const brl = (v) => 'R$ ' + v.toFixed(2).replace('.', ',');
let md = cabecalho + '\n---\n\n# Fichas de publicação\n\n';

for (const p of escolhidos.produtos) {
  const linhas = precos.filter((x) => x.produto === p.nome);
  const ml = linhas.find((x) => x.canal === 'mercado-livre');
  const sh = linhas.find((x) => x.canal === 'shopee');

  md += `## ${p.ordem}. ${p.nome}\n\n`;
  md += `\`${p.slug}\` · categoria **${p.categoria}** · ${p.material} · ${p.dimensoesMm.join(' × ')} mm\n\n`;
  md += `> ${p.gancho}\n\n`;
  md += `**Por que está no catálogo.** ${p.porQueFoiEscolhido}\n\n`;
  md += `### Preços\n\n| Canal | Preço | Margem |\n|---|---|---|\n`;
  md += `| Loja própria / WhatsApp (**preço usual**) | **${brl(p.precoUsualBRL)}** | — |\n`;
  if (ml) md += `| Mercado Livre | ${brl(ml.etiqueta)} | ${brl(ml.margem)} (${((ml.margem / ml.etiqueta) * 100).toFixed(0)}%) |\n`;
  if (sh) md += `| Shopee | ${brl(sh.etiqueta)} | ${brl(sh.margem)} (${((sh.margem / sh.etiqueta) * 100).toFixed(0)}%) |\n`;

  md += `\n### Título — Mercado Livre (${p.tituloML.length}/60 caracteres)\n\n\`\`\`\n${p.tituloML}\n\`\`\`\n`;
  md += `\n### Título — Shopee (${p.tituloShopee.length}/256 caracteres)\n\n\`\`\`\n${p.tituloShopee}\n\`\`\`\n`;
  md += `\n### Bullets (topo da descrição, os dois marketplaces)\n\n`;
  p.bullets.forEach((b) => { md += `- ${b}\n`; });
  md += `\n### Descrição completa\n\n\`\`\`\n${p.descricao}\n\`\`\`\n`;
  md += `\n### Perguntas frequentes (cole na seção de perguntas)\n\n`;
  p.faq.forEach((f) => { md += `**${f.p}**  \n${f.r}\n\n`; });
  md += `### Ficha técnica a preencher\n\n| Campo | Valor |\n|---|---|\n`;
  md += `| Marca | PRINT3D |\n| Modelo | ${p.slug} |\n| Material | ${p.material} |\n| Dimensões | ${p.dimensoesMm.join(' × ')} mm |\n| Cor | a definir no pedido |\n| Fabricação | Impressão 3D FDM |\n`;
  md += `\n### Palavras‑chave\n\n${p.palavrasChave.map((k) => `\`${k}\``).join(' · ')}\n`;
  md += `\n### Referência visual do modelo\n\n${p.referenciaVisual}\n\n> Use apenas como referência de forma. **Não baixe e não publique as fotos do MakerWorld** — ver "Briefing de fotos" acima.\n\n---\n\n`;
}

writeFileSync(resolve(raiz, '../docs/06-playbook-de-publicacao.md'), md);
console.log('docs/06-playbook-de-publicacao.md gerado:', md.length, 'caracteres');
