# Etapa 2‑2 — Onde publicar: custo, taxa e trabalho real

Dados estruturados: [`data/catalog/marketplaces.json`](../data/catalog/marketplaces.json)

## Primeiro, a notícia que muda o plano

**O Elo7 encerrou as operações em 11 de maio de 2026.** Era o destino óbvio para peça artesanal e não existe mais. Quem migrou foi para Shopee, Mercado Livre, Amazon e loja própria. Se algum plano seu ainda contava com ele, ele caiu.

## Comparativo

| | Mercado Livre | Shopee | Amazon BR | Nuvemshop | Etsy |
|---|---|---|---|---|---|
| Mensalidade | R$ 0 | R$ 0 | R$ 0 (individual) ou R$ 19 (profissional, 12 meses grátis) | R$ 0 no plano grátis; pagos a partir de R$ 69 | R$ 0 |
| Comissão | 10–14% clássico · 15–19% premium | 20% até R$ 79,99 · 14% acima | ~16% (varia por categoria) | **0%** com Nuvem Pago | 6,5% |
| Taxa fixa | R$ 6–7 por unidade **abaixo de R$ 79** | R$ 4 até R$ 79,99 · R$ 16–28 acima | R$ 2/item (individual) | — | US$ 0,20 por anúncio |
| Frete | grátis obrigatório **a partir de R$ 79**, pago pelo vendedor com subsídio por reputação | programa de frete grátis com coparticipação | FBA opcional | você define | você define |
| Tráfego próprio | altíssimo | altíssimo | alto | **nenhum** | médio, internacional |

### Custo efetivo nos nossos preços

| Produto | Preço ML | Taxa ML | % | Preço Shopee | Taxa Shopee | % |
|---|---|---|---|---|---|---|
| Cubo Infinito | R$ 38,90 | R$ 11,17 | 29% | R$ 38,90 | R$ 11,78 | 30% |
| Suporte Notebook | R$ 71,90 | R$ 15,13 | 21% | R$ 71,90 | R$ 18,38 | 26% |
| Organizador Marca‑Texto | R$ 45,90 | R$ 12,01 | 26% | R$ 45,90 | R$ 13,18 | 29% |
| Saboneteira | R$ 35,90 | R$ 10,81 | 30% | R$ 35,90 | R$ 11,18 | 31% |
| Mini Cachorro | R$ 37,90 | R$ 11,05 | 29% | R$ 37,90 | R$ 11,58 | 31% |
| Kit 10 Apitos | R$ 32,90 | R$ 10,45 | 32% | R$ 32,90 | R$ 10,58 | 32% |

**Entre 21% e 32% do preço vai para a plataforma.** Em produto barato a taxa fixa domina: no kit de apitos, quase um terço do preço é taxa. Esse é o argumento econômico para tratar marketplace como **canal de aquisição** e loja própria como **canal de margem**.

## Quanto trabalho dá publicar, de verdade

Medido em tarefas, não em otimismo.

### Mercado Livre — 40 a 60 min por anúncio na primeira vez

1. Conta de vendedor (CPF serve para começar) — 15 min, uma vez
2. Dados bancários e chave Pix — 10 min, uma vez
3. Por anúncio: categoria correta, título ≤ 60 caracteres, 6+ fotos em 1200×1200 mín., ficha técnica **completa** (marca, modelo, material, medidas — campo vazio derruba a nota de qualidade), descrição, estoque, dimensões e peso da embalagem para cálculo de frete
4. Acompanhar a **nota de qualidade** do anúncio; abaixo de 80 a exposição cai

Ponto de atrito real: o ML exige **marca** e **modelo**. Use `PRINT3D` como marca e o slug do produto como modelo. Deixar "sem marca" custa posição.

### Shopee — 30 a 45 min por anúncio

1. Conta de vendedor — 15 min, uma vez
2. Por anúncio: título até 256 caracteres, **fotos quadradas 1:1** (as do ML precisam ser recortadas — planeje fotografar em quadrado desde o início), descrição até 5.000 caracteres, atributos, peso e dimensões
3. Adesão ao programa de frete grátis: praticamente obrigatório para ter volume

Ponto de atrito real: **as regras de imagem são punitivas.** Moldura, borda colorida, texto promocional ou logo na capa derrubam relevância e, em caso grave, excluem o anúncio.

### Amazon BR — 60 min de setup, 20 min por anúncio

Mais burocrática (exige mais dados fiscais), menor volume nesta faixa de preço. **Recomendação: deixar para a fase 3.** Não compensa o esforço antes de existirem avaliações nos outros dois.

### Nuvemshop — 2 a 3 h de setup, 10 min por produto

Sem comissão sobre a venda (só a taxa do gateway). Em compensação, **não traz tráfego nenhum** — quem traz é o GitHub Pages, o Instagram e o WhatsApp.

## Formalização

- **MEI**: limite de R$ 81.000/ano (R$ 6.750/mês proporcional no ano de abertura). CNAE candidato: **2229‑3/99 — artesão em plástico independente** (confirme com contador que descreve mesmo a sua operação). Máximo 1 empregado; não pode ser sócio de outra empresa.
- **Nota fiscal**: MEI costuma ter mais dispensa vendendo para pessoa física do que para empresa, mas **a regra varia por estado** e os marketplaces exigem emissão em vários cenários. Confirme antes de publicar, não depois da primeira venda.
- Vender como CPF na Shopee funciona no começo; acima de 450 pedidos em 90 dias entra taxa adicional de R$ 3/item, e acima de R$ 81.000/ano a migração para CNPJ deixa de ser opcional.

*Isto é informação, não aconselhamento contábil — eu não sou contador. Confirme com um antes de formalizar.*

## Estratégia de canal recomendada

| Fase | Canais | Objetivo |
|---|---|---|
| 1 — Semanas 1–3 | **Mercado Livre + GitHub Pages + WhatsApp** | Conseguir as 10 primeiras avaliações. É a variável com maior efeito medido sobre vendas. |
| 2 — Semanas 4–8 | + **Shopee** + combos acima de R$ 79 | Volume e ticket médio |
| 3 — Mês 3+ | + **Nuvemshop** + Instagram | Migrar margem para canal próprio |
| 4 — quando fizer sentido | Amazon | Só se a fase 2 saturar |

O site estático do repositório é o hub: ele não vende, ele **converte tráfego em conversa** por WhatsApp e e‑mail — onde a margem é 76–88% em vez de 50–69%.

## Fontes

- [Lider 10 — Taxas Mercado Livre 2026](https://lider10.com.br/blog/taxas-mercado-livre-2026.html)
- [Irroba — Novas taxas Shopee 2026](https://blog.irroba.com.br/novas-taxas-shopee-2026-guia-de-comissoes-e-frete/)
- [Amazon — Investimentos e tarifas](https://venda.amazon.com.br/sellerblog/investimentos-e-tarifas--quanto-custa-vender-na-amazon)
- [Nuvemshop — Alternativas ao Elo7 (confirmação do encerramento)](https://www.nuvemshop.com.br/blog/alternativas-elo7-fechou/)
- [Printcal — MEI para impressão 3D: CNAE, nota fiscal e imposto](https://printcal.co/blog/mei-impressao-3d-nota-fiscal-cnae/)
- [Jaguar Sheet — checklist de anúncio no Mercado Livre](https://jaguarsheet.com/pt/blog/checklist-publicacion-perfecta-mercado-livre)
- [Ideris — boas práticas de anúncio Shopee](https://atendimento.ideris.com.br/hc/pt-br/articles/21406464506647-Boas-pr%C3%A1ticas-de-an%C3%BAncios-para-a-Shopee)
- [1001 Clicks — regras de imagem Shopee 2026](https://1001clicks.com.br/blog/post/regras-imagens-shopee-evitar-banimentos/)
