#!/usr/bin/env node
/**
 * Roda o motor de lucrabilidade sobre todos os candidatos aprovados,
 * ranqueia categorias e produtos e escreve data/outputs/.
 *
 *   node data/tools/analyze.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { avaliar, score } from './profitability.mjs';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ler = (p) => JSON.parse(readFileSync(resolve(raiz, p), 'utf8'));

const params = ler('catalog/cost-params.json');
const { candidatos } = ler('catalog/candidates.json');
const { familias } = ler('catalog/market-prices.json');

const aprovados = candidatos.filter((c) => c.status.startsWith('aprovado') && !c.excluirDoRanking);

const avaliacoes = aprovados.map((c) => {
  const familia = familias[c.familiaDeMercado];
  if (!familia) throw new Error(`Familia de mercado ausente: ${c.familiaDeMercado} (${c.id})`);
  return avaliar(c, familia, params);
});

const maximos = {
  hora: Math.max(...avaliacoes.map((a) => a.cenarios.central.lucrabilidade)),
  dia: Math.max(...avaliacoes.map((a) => a.cenarios.central.lucrabilidadeDiaria)),
  demanda: Math.max(...avaliacoes.map((a) => a.demandaValidada)),
};
avaliacoes.forEach((a) => { a.score = score(a, maximos); });

// Categoria: representada pelo seu melhor produto.
const porCategoria = {};
for (const a of avaliacoes) {
  (porCategoria[a.categoria] ??= []).push(a);
}
const categorias = Object.entries(porCategoria).map(([categoria, itens]) => {
  const ordenados = [...itens].sort((x, y) => y.score - x.score);
  return {
    categoria,
    campeao: ordenados[0],
    candidatos: ordenados,
    scoreDaCategoria: ordenados[0].score,
    profundidade: ordenados.length,
  };
}).sort((a, b) => b.scoreDaCategoria - a.scoreDaCategoria);

const brl = (v) => 'R$ ' + v.toFixed(2).replace('.', ',');
const num = (v, d = 2) => v.toFixed(d).replace('.', ',');

let md = `# Ranking de lucrabilidade — saída do motor de cálculo

> Gerado por \`node data/tools/analyze.mjs\` em ${new Date().toISOString().slice(0, 10)}.
> Não edite este arquivo à mão: edite \`data/catalog/*.json\` e rode de novo.

Parâmetros vigentes: PLA ${brl(params.materiais.PLA.precoPorKgBRL)}/kg · PETG ${brl(params.materiais.PETG.precoPorKgBRL)}/kg · pausa de ${params.operacao.pausaEntreMesasH} h entre mesas · cama ${params.impressora.camaMm.x}×${params.impressora.camaMm.y} mm.

## 1. Ranking de categorias

| # | Categoria | Score | Produto campeão | R$/h | R$/dia | Ocupação | Impressões MW | Profundidade CC0 |
|---|-----------|-------|-----------------|------|--------|----------|---------------|------------------|
`;
categorias.forEach((c, i) => {
  const a = c.campeao;
  md += `| ${i + 1} | **${c.categoria}** | ${num(c.scoreDaCategoria, 3)} | ${a.nome} | ${brl(a.cenarios.central.lucrabilidade)} | ${brl(a.cenarios.central.lucrabilidadeDiaria)} | ${num(a.producao.ocupacaoDaImpressoraPct, 0)}% | ${(a.demandaValidada > 0 ? Math.round(10 ** a.demandaValidada - 1) : 0).toLocaleString('pt-BR')} | ${c.profundidade} |\n`;
});

md += `\n## 2. Todos os produtos aprovados\n\n| Produto | Categoria | Peças/mesa | Esforço (h/pç) | Filamento (g) | Custo mat. | Preço médio | R$/h | R$/dia | Score |\n|---|---|---|---|---|---|---|---|---|---|\n`;
[...avaliacoes].sort((a, b) => b.score - a.score).forEach((a) => {
  md += `| ${a.nome} | ${a.categoria} | ${a.producao.pecasPorMesa} | ${num(a.producao.esforcoDeProducaoHporPeca, 3)} | ${num(a.producao.gramasPorPeca, 1)} | ${brl(a.custoDoMaterial)} | ${brl(a.preco.media)} | ${brl(a.cenarios.central.lucrabilidade)} | ${brl(a.cenarios.central.lucrabilidadeDiaria)} | ${num(a.score, 3)} |\n`;
});

md += `\n## 3. Bandas de cenário (preço médio ± 1 desvio padrão)\n\n| Produto | Pessimista R$/h | Central R$/h | Otimista R$/h | Pessimista R$/dia | Central R$/dia | Otimista R$/dia |\n|---|---|---|---|---|---|---|\n`;
[...avaliacoes].sort((a, b) => b.score - a.score).forEach((a) => {
  md += `| ${a.nome} | ${brl(a.cenarios.pessimista.lucrabilidade)} | ${brl(a.cenarios.central.lucrabilidade)} | ${brl(a.cenarios.otimista.lucrabilidade)} | ${brl(a.cenarios.pessimista.lucrabilidadeDiaria)} | ${brl(a.cenarios.central.lucrabilidadeDiaria)} | ${brl(a.cenarios.otimista.lucrabilidadeDiaria)} |\n`;
});

md += `\n## 4. Camada líquida — o que sobra de verdade\n\nA coluna "margem líquida" já desconta material, energia, depreciação, mão de obra, embalagem e reserva de falha — mas **ainda não** a comissão de marketplace.\n\n| Produto | Custo líquido | Preço médio de mercado | Margem líquida | Margem líquida diária | Preço sugerido loja própria |\n|---|---|---|---|---|---|\n`;
[...avaliacoes].sort((a, b) => b.score - a.score).forEach((a) => {
  md += `| ${a.nome} | ${brl(a.liquido.custo.total)} | ${brl(a.preco.media)} | ${brl(a.liquido.margemLiquidaUnitariaNoPrecoCentral)} | ${brl(a.liquido.lucroLiquidoDiarioNoPrecoCentral)} | ${brl(a.liquido.precoSugeridoLojaPropria)} |\n`;
});

md += `\n## 5. Qualidade do dado de preço por família\n\n| Família | n | Média | Desvio | Faixa observada | Qualidade |\n|---|---|---|---|---|---|\n`;
const vistas = new Set();
avaliacoes.forEach((a) => {
  if (vistas.has(a.familia)) return;
  vistas.add(a.familia);
  md += `| ${a.familia} | ${a.preco.n} | ${brl(a.preco.media)} | ${brl(a.preco.desvioPadrao)} | ${brl(a.preco.min)} – ${brl(a.preco.max)} | ${a.preco.qualidade} |\n`;
});

mkdirSync(resolve(raiz, 'outputs'), { recursive: true });
writeFileSync(resolve(raiz, 'outputs/ranking.md'), md);
writeFileSync(resolve(raiz, 'outputs/ranking.json'), JSON.stringify({ geradoEm: new Date().toISOString(), categorias: categorias.map((c) => ({ categoria: c.categoria, score: c.scoreDaCategoria, campeao: c.campeao.id, profundidade: c.profundidade })), avaliacoes }, null, 2));

console.log(md);
