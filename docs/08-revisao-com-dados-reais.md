# Revisão de 28/08/2026 — o que mudou com dados de primeira mão

Na primeira análise, Mercado Livre, Shopee e Amazon bloquearam a leitura automatizada e os preços vieram de lojas próprias brasileiras e guias de setor. Registrei isso como a maior fraqueza do modelo.

Com o navegador do próprio computador, essa lacuna foi fechada — parcialmente.

## Cobertura da coleta

| Plataforma | Famílias cobertas | Contagem de vendas | Observação |
|---|---|---|---|
| **Amazon Brasil** | **6 de 6** | parcial ("compras no mês passado") | Leu sem resistência |
| **Mercado Livre** | **2 de 6** | **sim, "+X vendidos"** | Travou a busca após ~6 consultas seguidas. Parei para não marcar a conta |
| **Shopee** | 0 de 6 | — | Exige login; a conta não estava logada |

As duas famílias que o ML entregou — cubo infinito e suporte de notebook — são justamente as que mudaram as conclusões.

## O erro sistemático da primeira análise

As lojas próprias de impressão 3D vendem para um público que **já aceitou o preço de peça impressa**. Marketplace é outro jogo: lá a peça impressa compete com plástico injetado e alumínio importado. Ancorar em loja própria superestimou quase tudo.

| Família | Âncora antiga | Preço real | Δ |
|---|---|---|---|
| Suporte de notebook | R$ 64,13 | **R$ 28,80** | **−55%** |
| Saboneteira | R$ 34,29 | **R$ 22,96** | −33% |
| Cubo infinito | R$ 32,63 | **R$ 24,52** | −25% |
| Organizador de mesa | R$ 43,88 | **R$ 37,24** | −15% |
| Miniatura decorativa | R$ 37,23 | **R$ 33,64** | −10% |
| Kit de apitos | R$ 17,16 | **R$ 35,20** | **+105%** |

O apito subiu porque o comparável estava errado: eu havia usado um kit de passa-fio de R$ 17 como proxy. O comparável real é o **Kit 10 Apitos de Metal a R$ 33,15**.

## Os três achados que só apareceram olhando

### 1. O suporte de notebook tem um clone impresso em 3D vendendo a R$ 18,33

**"Pés Elevadores De Visão Macbook Laptop Notebook Pezinhos"**, da Vix3D, impresso em 3D, mesmo conceito de par de apoios: **R$ 18,33 · 4,4 estrelas · +1000 vendidos**.

E acima dele, suportes de alumínio com regulagem de altura a partir de **R$ 17,19 com 4,8 mil avaliações e mais de 3 mil compras no mês passado**.

O produto caiu de R$ 59,90 para R$ 26,90 e de R$ 38,98/h para R$ 16,18/h. Continua positivo, mas deixou de ser o ticket alto do catálogo. **Só se sustenta com diferenciação real** — PETG declarado com a justificativa térmica, acabamento, atendimento — e não com preço.

### 2. A saboneteira compete com a Coza, não com outra impressora 3D

**Coza Saboneteira Splash: R$ 16,91 · 4,8 estrelas · 2,2 mil avaliações · +200 compras no mês.** Injetada, de marca, disponível em qualquer lugar.

A categoria inteira vive entre R$ 12,99 e R$ 29,90. Uma peça impressa não tem vantagem funcional evidente ali. Preço caiu para R$ 19,90 e a margem no marketplace ficou em **33% — a mais apertada do catálogo**.

### 3. O organizador de marca-texto virou o melhor produto

Apenas **18 resultados** na Amazon para a busca específica — a menor saturação medida em todo o levantamento — contra 190 do cubo infinito, 259 do suporte de notebook e 440 dos apitos.

Mediana de R$ 37,24, margem de **58%** no Mercado Livre, 46% de ocupação de impressora. E escritório continua sendo a categoria mais profunda em modelos CC0.

## O que mudou no ranking

| Categoria | Campeão | R$/h antes | R$/h agora |
|---|---|---|---|
| Decoração | Mini Cachorro | R$ 85,48 | R$ 77,05 |
| Life hacks | Kit 10 Apitos | R$ 31,81 | **R$ 67,51** ↑ |
| Escritório | Organizador Marca-Texto | R$ 45,38 | R$ 38,20 |
| Tecnologia | Suporte de Notebook | R$ 38,98 | **R$ 16,18** ↓ |
| Entretenimento | Cubo Infinito | R$ 17,74 | R$ 12,78 |
| Bem-estar | Saboneteira | R$ 24,40 | R$ 15,51 |

**As seis categorias continuam as mesmas.** O que mudou foi a ordem interna e, principalmente, a expectativa de retorno: o catálogo inteiro rende menos do que a primeira análise sugeria, e dois produtos ficaram em posição defensiva.

## Preços revisados

| Produto | Usual antes | Usual agora | ML | Margem ML |
|---|---|---|---|---|
| Cubo Infinito | R$ 29,90 | **R$ 21,90** | R$ 25,90 | 35% |
| Suporte Notebook | R$ 59,90 | **R$ 26,90** | R$ 31,90 | 45% |
| Organizador Marca-Texto | R$ 39,90 | **R$ 31,90** | R$ 37,90 | 58% |
| Saboneteira | R$ 29,90 | **R$ 19,90** | R$ 23,90 | 33% |
| Mini Cachorro | R$ 29,90 | **R$ 27,90** | R$ 33,90 | 58% |
| Kit 10 Apitos | R$ 24,90 | **R$ 29,90** | R$ 35,90 | 59% |

O preço usual foi fixado ~15% abaixo da mediana observada no próprio marketplace — a loja própria continua sendo o canal barato para o cliente e o de margem para você.

## Mudança no motor

O componente de demanda do score deixou de usar impressões no MakerWorld e passa a usar **`vendidosMax` — a maior contagem de vendas observada entre concorrentes diretos no Brasil**. Onde não houve coleta, o motor cai de volta para o MakerWorld e marca a saída como `fallback`.

Famílias reverificadas ganharam `verificadoEm: "2026-08-28"`. Categorias cujo campeão tem preço não reverificado **não disputam o topo do ranking** — senão uma âncora antiga e otimista venceria uma nova e realista, o que seria artefato de método, não resultado. Cozinha é o único caso, e por isso aparece marcada com ⚠️.

## O que ainda falta

1. **Quatro famílias sem dados do Mercado Livre** — organizador, saboneteira, miniatura e apito. Refazer em outra sessão, com intervalo entre buscas para não disparar o bloqueio.
2. **Shopee inteira.** Basta estar logado no navegador antes de começar.
3. **Massa de filamento e peças por mesa** continuam estimadas. Isso não está na web: são 2 minutos no Bambu Studio por modelo.
