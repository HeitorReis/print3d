#!/usr/bin/env node
/**
 * Gera artifacts/print3d/src/data/products.ts a partir de data/catalog/selected.json
 * e de data/outputs/precificacao.json. O site nunca e a fonte da verdade: o catalogo e.
 *
 *   node data/tools/sync-site.mjs
 *
 * Tambem cria um placeholder SVG por produto, na identidade da marca, para as pastas
 * de imagem que ainda estiverem vazias. Assim que voce jogar fotos reais em
 * public/images/products/<slug>/, elas passam a ser usadas automaticamente.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const site = resolve(raiz, '../artifacts/print3d');
const ler = (p) => JSON.parse(readFileSync(resolve(raiz, p), 'utf8'));

const escolhidos = ler('catalog/selected.json');
const precos = ler('outputs/precificacao.json');
const candidatos = ler('catalog/candidates.json').candidatos;

const ICONES = {
  'cubo-infinito-antiestresse': `<g stroke="#F97316" stroke-width="3" fill="none"><rect x="70" y="70" width="60" height="60" rx="6"/><rect x="130" y="70" width="60" height="60" rx="6"/><rect x="70" y="130" width="60" height="60" rx="6"/><rect x="130" y="130" width="60" height="60" rx="6"/></g><path d="M100 100 L160 160" stroke="#22D3EE" stroke-width="3"/>`,
  'suporte-notebook-ergonomico': `<g stroke="#F97316" stroke-width="3" fill="none"><path d="M50 160 L90 100 L210 100 L170 160 Z"/><path d="M40 175 h180"/></g><path d="M90 100 L110 70 L200 70" stroke="#22D3EE" stroke-width="3" fill="none"/>`,
  'organizador-marca-texto': `<g stroke="#F97316" stroke-width="3" fill="none"><path d="M55 175 L70 95 L190 95 L205 175 Z"/></g><g stroke="#22D3EE" stroke-width="3"><path d="M90 95 v-40"/><path d="M115 95 v-52"/><path d="M140 95 v-46"/><path d="M165 95 v-56"/></g>`,
  'saboneteira-drenante': `<g stroke="#F97316" stroke-width="3" fill="none"><path d="M50 150 L60 110 h140 l10 40 Z"/><path d="M50 150 h160"/></g><g stroke="#22D3EE" stroke-width="2"><path d="M80 118 v24"/><path d="M105 118 v24"/><path d="M130 118 v24"/><path d="M155 118 v24"/><path d="M180 118 v24"/></g><path d="M120 178 v14" stroke="#22D3EE" stroke-width="3"/>`,
  'mini-cachorro-dormindo': `<g stroke="#F97316" stroke-width="3" fill="none"><path d="M60 160 q10 -55 60 -55 q55 0 70 40 q8 20 -10 20 Z"/><circle cx="150" cy="120" r="26"/></g><g stroke="#22D3EE" stroke-width="3" fill="none"><path d="M136 100 q-14 -18 4 -22"/><path d="M162 138 h14"/></g>`,
  'kit-10-apitos-emergencia': `<g stroke="#F97316" stroke-width="3" fill="none"><path d="M60 120 h90 q22 0 22 18 t-22 18 H60 q-12 0 -12 -18 t12 -18 Z"/><circle cx="150" cy="138" r="7"/></g><g stroke="#22D3EE" stroke-width="2.5" fill="none"><path d="M188 118 q16 20 0 40"/><path d="M202 106 q26 32 0 64"/></g>`,
};

function placeholder(nome, slug) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 220" width="260" height="220" role="img" aria-label="${nome}">
  <defs>
    <pattern id="g" width="16" height="16" patternUnits="userSpaceOnUse">
      <path d="M16 0 H0 V16" fill="none" stroke="rgba(34,211,238,0.10)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="260" height="220" fill="#0F172A"/>
  <rect width="260" height="220" fill="url(#g)"/>
  ${ICONES[slug] ?? ''}
  <text x="130" y="205" text-anchor="middle" font-family="monospace" font-size="9" fill="rgba(148,163,184,0.55)" letter-spacing="2">FOTO EM BREVE</text>
</svg>
`;
}

const linhas = [];
for (const p of escolhidos.produtos) {
  const dir = resolve(site, 'public/images/products', p.slug);
  mkdirSync(dir, { recursive: true });
  const temFoto = existsSync(dir) && readdirSync(dir).some((f) => /\.(png|jpe?g|webp|avif|gif)$/i.test(f));
  if (!temFoto) writeFileSync(resolve(dir, '00-placeholder.svg'), placeholder(p.nome, p.slug));

  const cand = candidatos.find((c) => c.id === p.candidatoId);
  const canal = Object.fromEntries(
    precos.filter((x) => x.produto === p.nome).map((x) => [x.canal, Number(x.etiqueta.toFixed(2))])
  );

  linhas.push({
    id: p.slug,
    name: p.nome,
    category: p.categoria,
    hook: p.gancho,
    description: p.descricao.split('\n\n')[0] + ' ' + (p.descricao.split('\n\n')[1] ?? ''),
    priceBRL: p.precoUsualBRL,
    marketplacePrices: canal,
    material: p.material,
    dimensionsMm: p.dimensoesMm,
    printTimeH: null,
    bullets: p.bullets,
    faq: p.faq.map((f) => ({ q: f.p, a: f.r })),
    tags: p.tags,
    license: {
      code: cand?.licenca?.codigo ?? 'CC0',
      sourceUrl: p.referenciaVisual,
      author: cand?.autor ?? null,
    },
  });
}

// tempo de impressao vem do motor
const params = ler('catalog/cost-params.json');
const { avaliar } = await import('./profitability.mjs');
const familias = ler('catalog/market-prices.json').familias;
for (const l of linhas) {
  const sel = escolhidos.produtos.find((p) => p.slug === l.id);
  const cand = candidatos.find((c) => c.id === sel.candidatoId);
  const av = avaliar(cand, familias[cand.familiaDeMercado], params);
  l.printTimeH = Number(av.producao.esforcoDeProducaoHporPeca.toFixed(2));
  l.gramsPerUnit = Number(av.producao.gramasPorPeca.toFixed(0));
}

const ts = `// ============================================================================
// ARQUIVO GERADO — NÃO EDITE À MÃO
// Fonte da verdade: data/catalog/selected.json
// Regenerar: node data/tools/sync-site.mjs
// ============================================================================

export type ProductCategory =
${[...new Set(linhas.map((l) => l.category))].map((c) => `  | '${c}'`).join('\n')};

export type ProductMediaType = 'photo' | 'gif' | 'illustration';

export interface ProductMedia {
  type: ProductMediaType;
  src: string;
  label: string;
  filePath: string;
}

export interface ProductFaq {
  q: string;
  a: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  hook: string;
  description: string;
  priceBRL: number;
  price: string;
  marketplacePrices: Record<string, number>;
  material: 'PLA' | 'PETG';
  dimensionsMm: [number, number, number];
  printTimeH: number;
  gramsPerUnit: number;
  bullets: string[];
  faq: ProductFaq[];
  tags: string[];
  license: { code: string; sourceUrl: string; author: string | null };
  image: string;
  media: ProductMedia[];
}

const productMediaFiles = import.meta.glob('/public/images/products/**/*.{png,jpg,jpeg,webp,avif,gif,svg}');

function mediaLabel(fileName: string, index: number): string {
  const base = fileName.replace(/\\.[^.]+$/, '');
  if (/placeholder/i.test(base)) return 'Ilustração';
  const numbered = base.match(/(?:foto|photo|image|img)[-_ ]?(\\d+)/i);
  if (numbered) return \`Foto \${numbered[1]}\`;
  return base.replace(/^\\d+[-_]/, '').replace(/[-_]+/g, ' ').replace(/\\b\\w/g, (l) => l.toUpperCase()) || \`Foto \${index + 1}\`;
}

function productMedia(productId: string): ProductMedia[] {
  const folder = \`/public/images/products/\${productId}/\`;
  return Object.keys(productMediaFiles)
    .filter((path) => path.startsWith(folder))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    .map((path, index) => {
      const fileName = path.split('/').pop() ?? \`foto-\${index + 1}\`;
      const lower = fileName.toLowerCase();
      const type: ProductMediaType = lower.endsWith('.gif')
        ? 'gif'
        : lower.endsWith('.svg')
          ? 'illustration'
          : 'photo';
      return {
        type,
        src: path.replace(/^\\/public/, ''),
        label: mediaLabel(fileName, index),
        filePath: path.replace(/^\\//, ''),
      };
    });
}

export function formatBRL(value: number): string {
  return \`R$ \${value.toFixed(2).replace('.', ',')}\`;
}

export function getPrimaryProductMedia(product: Product): ProductMedia {
  return product.media[0] ?? {
    type: 'illustration',
    src: product.image,
    label: 'Ilustração',
    filePath: product.image.replace(/^\\//, 'public/'),
  };
}

const raw = ${JSON.stringify(linhas, null, 2)} as const;

export const products: Product[] = raw.map((p) => ({
  ...p,
  dimensionsMm: p.dimensionsMm as unknown as [number, number, number],
  material: p.material as 'PLA' | 'PETG',
  category: p.category as ProductCategory,
  marketplacePrices: { ...p.marketplacePrices },
  bullets: [...p.bullets],
  tags: [...p.tags],
  faq: p.faq.map((f) => ({ ...f })),
  license: { ...p.license },
  price: formatBRL(p.priceBRL),
  image: \`/images/products/\${p.id}/00-placeholder.svg\`,
  media: productMedia(p.id),
}));

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
${[...new Set(linhas.map((l) => l.category))].map((c) => `  '${c}': '${({ entretenimento: 'Entretenimento', tecnologia: 'Tecnologia', escritorio: 'Escritório', 'bem-estar': 'Bem-estar', decoracao: 'Decoração', 'life-hacks': 'Life Hacks' })[c] ?? c}',`).join('\n')}
};
`;

writeFileSync(resolve(site, 'src/data/products.ts'), ts);
console.log('products.ts gerado com', linhas.length, 'produtos');
