# Etapa 1‑3 — As 6 categorias e os 6 produtos

> **Revisado em 28/08/2026** com preços coletados de primeira mão no Mercado Livre e na Amazon. As seis categorias se mantiveram; os preços e a ordem interna mudaram bastante. O que mudou e por quê está em [08‑revisão com dados reais](08-revisao-com-dados-reais.md).

Saída bruta do motor: [`data/outputs/ranking.md`](../data/outputs/ranking.md)

## Ranking de categorias

| # | Categoria | Score | Produto campeão | R$/h | R$/dia | Ocupação | Impressões MW | Profundidade CC0 |
|---|---|---|---|---|---|---|---|---|
| 1 | **Decoração** | 0,899 | Mini Cachorro Dormindo | R$ 85,48 | R$ 1.089,82 | 53% | 188 | 4 |
| 2 | **Escritório** | 0,516 | Organizador de Marca‑Texto | R$ 45,38 | R$ 503,69 | 46% | 591 | 5 |
| 3 | **Life hacks** | 0,426 | Kit 10 Apitos de Emergência | R$ 31,81 | R$ 481,90 | 63% | 291 | 2 |
| 4 | **Tecnologia** | 0,412 | Suporte Ergonômico p/ Notebook | R$ 38,98 | R$ 362,52 | 39% | 95 | 3 |
| 5 | **Entretenimento** | 0,341 | Cubo Infinito Antiestresse | R$ 17,74 | R$ 232,34 | 55% | **34.000** | 3 |
| 6 | **Bem‑estar** | 0,300 | Saboneteira Drenante | R$ 24,40 | R$ 311,11 | 53% | 27 | 1 |
| — | ~~Cozinha~~ | 0,250 | Vortex Fruit Washer | R$ 10,59 | R$ 166,73 | 66% | 4.900 | 3 |

**Cozinha ficou de fora.** Não por falta de modelos — tem três CC0 aprovados — mas porque os três são de baixo valor unitário (clipes que competem com plástico injetado de R$ 5) ou de tempo longo (o lavador de frutas gasta 5,25 h por peça para render R$ 10,59/h). É a pior relação valor‑por‑hora do catálogo aprovado.

## O catálogo escolhido

| # | Produto | Categoria | Preço usual | Custo líquido | Margem | Esforço | Capacidade |
|---|---|---|---|---|---|---|---|
| 1 | Cubo Infinito Antiestresse | Entretenimento | R$ 29,90 | R$ 7,23 | 76% | 1,64 h | 8/dia |
| 2 | Suporte Ergonômico p/ Notebook (par) | Tecnologia | R$ 59,90 | R$ 7,31 | 88% | 1,55 h | 6/dia |
| 3 | Organizador de Marca‑Texto 8 lugares | Escritório | R$ 39,90 | R$ 5,04 | 87% | 0,92 h | 12/dia |
| 4 | Saboneteira Drenante | Bem‑estar | R$ 29,90 | R$ 6,59 | 78% | 1,27 h | 10/dia |
| 5 | Mini Cachorro Dormindo | Decoração | R$ 29,90 | R$ 3,69 | 88% | 0,43 h | 30/dia |
| 6 | Kit 10 Apitos de Emergência | Life hacks | R$ 24,90 | R$ 3,95 | 84% | 0,51 h | 30/dia |

*Margem = sobre o preço da loja própria, já descontando material, energia, depreciação, mão de obra, embalagem e reserva de falha. Antes de comissão de marketplace.*

## Por que cada um

**Cubo Infinito Antiestresse.** Não é o de maior margem, e entra assim mesmo — é o único produto do levantamento inteiro com **demanda comprovada dos dois lados**: 34.000 impressões e 17.516 curtidas no MakerWorld, *e* preço brasileiro observado em duas lojas independentes (R$ 19,90 na Loja Flowin, R$ 39,00 na ArtTech 3D). Todo o resto do catálogo tem demanda inferida; este tem demanda medida. É o produto‑âncora, o que traz gente para a vitrine.

**Suporte Ergonômico para Notebook.** Maior ticket do catálogo (R$ 59,90) com a **menor ocupação de impressora** (39%) — rende bem sem bloquear a máquina para os outros cinco. Vendido em PETG de propósito: a base de um notebook em carga passa de 45 °C e PLA amolece perto de 55 °C. Essa escolha de material é argumento de venda, não detalhe técnico.

**Organizador de Marca‑Texto.** Segundo maior R$/h (R$ 45,38) com 46% de ocupação. Escritório é a categoria mais **profunda** em CC0 (5 modelos aprovados): dá para lançar variações — porta‑post‑it, pés de prateleira, caixa paramétrica — sem sair do nicho e sem repetir problema jurídico.

**Saboneteira Drenante.** Único modelo CC0 compatível com A1 mini que encontrei em bem‑estar, em 62 modelos auditados. Escassez de oferta em domínio público é também escassez de concorrentes que imprimem a mesma coisa. Resolve uma dor concreta e repetida — sabonete que derrete no próprio caldo — e isso escreve o anúncio sozinho.

**Mini Cachorro Dormindo.** **Maior lucro por hora de todo o catálogo, por larga margem: R$ 85,48/h.** 24 minutos de impressora e 8 g de filamento por peça, seis por mesa, 30 por dia. É o produto que paga a conta de luz dos outros cinco e o candidato natural a brinde, a item de combo e a "compre junto".

**Kit 10 Apitos de Emergência.** O único produto do levantamento com **massa e peças por mesa medidas em vez de estimadas** — o próprio autor publica o arranjo de mesa cheia da A1 mini com 100 apitos em 4,9 h e informa ~1 g por peça. Custo de material do kit de 10 inteiro: **R$ 1,10**. É também um raro caso de licença CC0 declarada em texto explícito ("No attribution required. No restrictions. Ever.").

## Duas decisões que vale explicitar

**O apito foi reclassificado.** No primeiro rodar ele apareceu em "entretenimento" e destruiu o ranking com R$ 5.116/dia — porque a família de preço usada era de kit e o motor tratava cada apito como um SKU. Corrigido: o SKU é o **kit de 10**, e a categoria passou a ser life hacks, que é o que um apito de segurança é. Sem isso, o catálogo teria escolhido a categoria errada.

**Placas de parede ficaram fora do ranking.** O modelo "Wall stickers" (CC0, aprovado) precisa de **11 mesas** para o conjunto. O motor modela ciclo de mesa única e daria um número sem sentido. Está no catálogo marcado `excluirDoRanking: true`, com o motivo escrito. Prefiro deixar de fora a ranquear errado.

## Os 22 aprovados, para quando quiser trocar algo

Todos estão em [`data/catalog/candidates.json`](../data/catalog/candidates.json) com licença verificada, tempo, compatibilidade e popularidade. Trocar um produto do catálogo é editar `data/catalog/selected.json` e rodar os dois scripts.

Os reservas mais fortes, por categoria:

| Categoria | Reserva | R$/h |
|---|---|---|
| Decoração | Tubular Vase | R$ 26,91 |
| Decoração | French Bulldog | R$ 26,02 |
| Escritório | Post‑it To‑Do List Holder | R$ 26,28 |
| Escritório | Desk Shelf Riser Feet | R$ 21,68 |
| Tecnologia | Wall mount phone holder | R$ 14,77 |
| Entretenimento | Tic Tac Twist | R$ 16,29 |
