#!/usr/bin/env node
/**
 * Precificacao por canal para os 6 produtos escolhidos.
 *
 *   node data/tools/pricing.mjs
 *
 * Para cada canal calcula:
 *   - preco de etiqueta ancorado no mercado (media da familia x fatorMarketplace,
 *     arredondado para terminacao 9)
 *   - o que sobra depois da comissao e da taxa fixa
 *   - o preco minimo que ainda paga o custo liquido com a margem alvo
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { avaliar, taxaDeMarketplace } from './profitability.mjs';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ler = (p) => JSON.parse(readFileSync(resolve(raiz, p), 'utf8'));

const params = ler('catalog/cost-params.json');
const { candidatos } = ler('catalog/candidates.json');
const { familias } = ler('catalog/market-prices.json');
const { plataformas } = ler('catalog/marketplaces.json');
const escolhidos = ler('catalog/selected.json');

const canais = plataformas.filter((p) => ['mercado-livre', 'shopee', 'nuvemshop'].includes(p.id));

/** Arredonda para cima ate a proxima terminacao ,90 ou ,00 conforme a faixa. */
function terminacao9(v) {
  if (v < 10) return Math.ceil(v) - 0.1 + 0.0;      // 7,90 / 8,90
  const inteiro = Math.floor(v);
  return inteiro + 0.9 >= v ? inteiro + 0.9 : inteiro + 1.9;
}

const brl = (v) => 'R$ ' + v.toFixed(2).replace('.', ',');
const linhas = [];

let md = `# Precificação por canal — 6 produtos escolhidos

> Gerado por \`node data/tools/pricing.mjs\`. Editar \`data/catalog/*.json\` e rodar de novo.

**Preço usual** = preço de referência da marca, praticado na loja própria / cotação por WhatsApp.
Ele é o preço "verdadeiro" do produto e fica salvo em \`data/catalog/selected.json\`.
Os preços de marketplace são derivados dele para absorver comissão e taxa fixa sem perder margem.

`;

for (const sel of escolhidos.produtos) {
  const cand = candidatos.find((c) => c.id === sel.candidatoId);
  const fam = familias[cand.familiaDeMercado];
  const av = avaliar(cand, fam, params);
  const custoLiquido = av.liquido.custo.total;
  const precoUsual = sel.precoUsualBRL;

  md += `## ${sel.nome}\n\n`;
  md += `- Categoria: **${sel.categoria}** · SKU: ${av.venda.rotuloSku} · material: ${cand.material.tipo}\n`;
  md += `- Custo líquido por SKU: **${brl(custoLiquido)}** (material ${brl(av.liquido.custo.material)} + energia ${brl(av.liquido.custo.energia)} + depreciação ${brl(av.liquido.custo.depreciacao)} + mão de obra ${brl(av.liquido.custo.maoDeObra)} + embalagem ${brl(av.liquido.custo.embalagem)} + reserva de falha ${brl(av.liquido.custo.reservaFalha)})\n`;
  md += `- Esforço: **${av.producao.esforcoDeProducaoHporPeca.toFixed(2)} h/SKU** · ${av.producao.pecasPorMesa} SKU por mesa · capacidade **${av.producao.capacidadeDiariaPecas} SKU/dia**\n`;
  md += `- Âncora de mercado (loja própria): ${brl(av.preco.media)} ± ${brl(av.preco.desvioPadrao)} (n=${av.preco.n})\n`;
  md += `- **Preço usual PRINT3D: ${brl(precoUsual)}**\n\n`;
  md += `| Canal | Preço de etiqueta | Taxa do canal | Líquido recebido | Margem após custo | Margem % |\n|---|---|---|---|---|---|\n`;

  for (const canal of canais) {
    let etiqueta;
    if (canal.id === 'nuvemshop') etiqueta = precoUsual;
    else etiqueta = terminacao9(precoUsual * (fam.fatorMarketplace ?? 1.2));

    const taxa = canal.id === 'nuvemshop' ? 0 : taxaDeMarketplace(canal, etiqueta);
    const liquido = etiqueta - taxa;
    const margem = liquido - custoLiquido;
    md += `| ${canal.nome} | ${brl(etiqueta)} | ${brl(taxa)} | ${brl(liquido)} | ${brl(margem)} | ${((margem / etiqueta) * 100).toFixed(0)}% |\n`;
    linhas.push({ produto: sel.nome, canal: canal.id, etiqueta, taxa, liquido, margem });
  }
  md += `\n`;
}

writeFileSync(resolve(raiz, 'outputs/precificacao.md'), md);
writeFileSync(resolve(raiz, 'outputs/precificacao.json'), JSON.stringify(linhas, null, 2));
console.log(md);
