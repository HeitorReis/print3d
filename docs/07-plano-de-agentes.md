# Etapa 3 — Um sistema de agentes para operar a loja

Você pediu sugestão aqui, e amplitude. Vou dar as duas — mas começando por uma opinião, porque ela muda o desenho inteiro.

## A opinião, primeiro

**O gargalo desta operação não é publicar. É imprimir e fotografar.**

Uma A1 mini entrega, no melhor caso do catálogo, 30 unidades por dia de um único produto — e isso ocupando 53% da máquina. Um sistema de agentes que publique 200 anúncios por semana não vende mais: cria backlog e atrasa entrega, o que destrói reputação em marketplace mais rápido do que qualquer anúncio ruim conserta.

Então o objetivo do sistema **não é volume**. É três coisas:

1. **Eliminar trabalho repetitivo de baixo valor** — republicar o mesmo produto em cinco lugares, atualizar preço quando o filamento sobe, recalcular o catálogo quando o mercado muda.
2. **Nunca deixar uma pergunta de cliente esperando** — tempo de resposta é métrica de ranking no ML e é a diferença entre venda e carrinho abandonado.
3. **Manter o catálogo honesto** — se o preço do PLA subir 15%, o sistema deve avisar que três produtos ficaram com margem abaixo do piso, antes de você descobrir no extrato.

Um agente que faz isso bem vale mais que dez agentes que postam no Instagram.

---

## Arquitetura proposta

```
                        ┌──────────────────────────┐
                        │   data/catalog/*.json    │
                        │  (fonte única da verdade)│
                        └────────────┬─────────────┘
                                     │
                    ┌────────────────┼────────────────┐
                    │                │                │
            ┌───────▼──────┐ ┌───────▼──────┐ ┌───────▼───────┐
            │  ORQUESTRADOR│ │  MOTOR DE    │ │  FILA DE      │
            │  (cron +     │ │  CÁLCULO     │ │  APROVAÇÃO    │
            │   estado)    │ │  (já existe) │ │  (WhatsApp)   │
            └───────┬──────┘ └──────────────┘ └───────▲───────┘
                    │                                  │
   ┌────────┬───────┼────────┬──────────┬──────────────┘
   │        │       │        │          │
┌──▼───┐┌───▼───┐┌──▼────┐┌──▼─────┐┌───▼──────┐
│VITRINE││ANÚNCIO││ SOCIAL││ATENDIM.││ VIGIA    │
│(Pages)││(ML/   ││(IG)   ││(caixa  ││(preço,   │
│       ││Shopee)││       ││ de     ││ margem,  │
│       ││       ││       ││entrada)││ estoque) │
└───────┘└───────┘└───────┘└────────┘└──────────┘
```

O princípio: **um único JSON manda em tudo.** Nenhum agente inventa preço, título ou descrição — todos leem de `data/catalog/selected.json`. Isso garante que o preço da etiqueta do ML, o preço do site e o preço que você fala no WhatsApp nunca divirjam, que é exatamente o tipo de erro que mata confiança.

---

## Os seis agentes

### 1. Agente Vitrine — GitHub Pages

**O mais fácil e o primeiro a existir.** Já está 90% pronto: o workflow de Pages roda a cada push na `main`.

O que falta automatizar:
- rodar `analyze.mjs` → `pricing.mjs` → `sync-site.mjs` no CI e **falhar o build** se `products.ts` estiver dessincronizado do catálogo
- abrir PR automático quando o recálculo mudar algum preço, em vez de commitar direto
- gerar `sitemap.xml` e JSON‑LD de `Product` a partir do catálogo (SEO orgânico de graça)

**Viabilidade: total.** É GitHub Actions puro. Uma tarde de trabalho.

### 2. Agente Anúncio — Mercado Livre e Shopee

**Mercado Livre tem API pública e documentada** (`developers.mercadolivre.com.br`) com OAuth, criação de item, upload de imagem, descrição e atualização de preço/estoque. É o único marketplace do plano que dá para automatizar de ponta a ponta com confiança.

**Shopee exige aprovação no Open Platform** — solicitação formal, análise, e o acesso não é dado a qualquer vendedor. Planeje Shopee como **semiautomático**: o agente gera o pacote (título, descrição, atributos, fotos já recortadas em 1:1) e você cola. O ganho ainda é grande: 40 minutos viram 8.

O que o agente faz:
- monta o payload a partir do catálogo, valida contra as regras (título ≤ 60 no ML, foto ≥ 1200×1200, ficha técnica completa)
- publica, guarda o `item_id` de volta no catálogo
- sincroniza preço e estoque quando o catálogo muda
- **nunca** publica sem aprovação humana na primeira vez de cada SKU

**Guardrail obrigatório:** piso de preço. O agente recusa qualquer atualização que deixe a margem líquida abaixo de um valor configurado. Não existe cenário em que um agente deva baixar preço sozinho para "ganhar a Buy Box".

### 3. Agente Social — Instagram

Aqui a ambição precisa ser calibrada. A API de publicação do Instagram exige **conta Business ou Creator**, passa por **app review** da Meta, e tem limite de publicação por janela móvel. Não é um obstáculo intransponível, mas é semanas de burocracia, não uma tarde.

**Sugestão: comece manual e deixe o agente fazer a parte difícil, que não é postar — é ter o que postar.**

O agente gera, toda semana, um **kit de conteúdo** e te manda no WhatsApp:

| Formato | O que o agente produz | Frequência |
|---|---|---|
| Time‑lapse de impressão | roteiro + legenda + hashtags; você grava com a câmera do celular apontada para a mesa | 2×/semana |
| "Por que PETG e não PLA" | carrossel de 4 telas, texto já escrito, gerado a partir do campo de material do catálogo | 1×/semana |
| Antes/depois da mesa | foto da mesa cheia + peça pronta, legenda com o número real de peças e o tempo | 1×/semana |
| Prova social | print de avaliação real + resposta sua | quando chegar |

Conteúdo de impressão 3D tem uma vantagem rara: **o processo é hipnótico e você já vai rodar a impressora de qualquer jeito.** O custo marginal de filmar é zero. O que falta é constância — e é exatamente isso que um agente com cron resolve.

Quando o volume justificar, a publicação automática entra pela API. Antes disso, não vale o app review.

### 4. Agente Atendimento — o de maior retorno

Perguntas em anúncio de marketplace são **as mesmas cinco perguntas**, para sempre: cabe no meu aparelho? que cores tem? quanto tempo demora? aguenta calor? tem nota fiscal?

Todas as respostas já estão escritas em `selected.json`, no campo `faq`.

O agente:
- lê perguntas novas via API do ML
- responde as que casam com o FAQ, com alta confiança
- **escala para você** qualquer pergunta que envolva prazo excepcional, desconto, defeito ou reclamação
- registra pergunta nova e sugere adicionar ao FAQ do catálogo

**Isto é o item de maior retorno da lista.** Tempo de resposta é métrica de ranqueamento no ML, e responder em 3 minutos às 23h é impossível para uma pessoa e trivial para um agente.

**Guardrail:** o agente nunca negocia preço, nunca promete prazo fora do padrão, nunca aceita reclamação em nome da loja. Ele responde fato, ou passa adiante.

### 5. Agente Vigia — o que ninguém pensa em construir

Roda toda segunda de manhã e te manda um parágrafo no WhatsApp:

- **Preço de filamento**: relê as páginas das lojas de filamento; se PLA passou de R$ 110, recalcula tudo e avisa quais produtos ficaram com margem abaixo do piso.
- **Concorrência**: mede o preço mediano das buscas do [protocolo de coleta](protocolo-de-coleta-de-precos.md); avisa se o mercado se moveu mais de 15%.
- **Taxas**: acompanha mudança nas regras de comissão do ML e da Shopee — elas mudaram duas vezes em 2026.
- **Saúde dos anúncios**: nota de qualidade no ML, anúncios pausados, perguntas sem resposta.
- **Licenças**: reconfere se algum modelo CC0 do catálogo mudou de licença no MakerWorld. Isso acontece, e transforma um produto legal num problema jurídico da noite para o dia.

O último item vale sozinho o esforço do agente inteiro.

### 6. Agente Curador — o que renova o catálogo

Uma vez por mês, refaz a Etapa 1 sozinho: varre o MakerWorld, lê licenças, aplica as três travas (CC0 + A1 mini + sem montagem), roda o motor de lucrabilidade e apresenta **os três candidatos que bateriam o pior produto atual do catálogo**.

Não troca nada sozinho. Só apresenta, com os números lado a lado, e você decide.

Isso resolve o problema real de um catálogo de 6 itens: ele envelhece. O agente mantém uma fila de substitutos sempre pronta.

---

## Fases

| Fase | Agentes | Pré‑requisito | Esforço |
|---|---|---|---|
| **0 — agora** | Vitrine (CI que valida sincronia catálogo↔site) | nenhum | 1 dia |
| **1** | Vigia (preço de filamento, licenças, margem) | nenhum | 2 dias |
| **2** | Anúncio (ML via API) | app OAuth no ML + 6 anúncios já publicados à mão | 3–4 dias |
| **3** | Atendimento (perguntas do ML) | mesmo app OAuth | 2 dias |
| **4** | Social (kit de conteúdo semanal) | conta Instagram criada | 2 dias |
| **5** | Curador (renovação mensal do catálogo) | nenhum | 3 dias |
| **6 — talvez nunca** | Publicação automática no Instagram | conta Business + app review da Meta | semanas |

Publicar à mão os 6 primeiros anúncios **antes** de automatizar não é desperdício: é como você descobre os campos obrigatórios de verdade, as pegadinhas de categoria e o que a plataforma recusa. Automatizar um processo que você nunca executou produz um agente que erra com eficiência.

---

## Guardrails, escritos antes de existir código

1. **Piso de preço absoluto.** Nenhum agente publica abaixo de `custoLíquido × 1,6`. Recusa e avisa.
2. **Aprovação humana no primeiro lançamento de cada SKU** em cada canal. Depois disso, atualização de preço e estoque pode ser automática.
3. **Nenhum agente promete prazo.** Prazo sai do catálogo, não da conversa.
4. **Nenhum agente responde reclamação.** Escala sempre.
5. **Nenhum agente publica foto que não seja sua.** A regra do CC0 vale para o arquivo 3D, não para a foto do designer.
6. **Todo agente registra o que fez** num log versionado no repositório. Se algo der errado, dá para saber qual agente, quando e por quê.
7. **Limite de gasto e de chamadas por execução.** Um loop de agente com API de marketplace pode gerar centenas de anúncios duplicados em minutos.

---

## Três ideias mais soltas, já que você pediu imaginação

**O catálogo como API pública.** `data/catalog/selected.json` já é um documento bem estruturado, com preço, material, licença e FAQ. Publicar ele como endpoint no GitHub Pages transforma o repositório num backend de leitura — e qualquer coisa futura (bot de WhatsApp, loja Nuvemshop, app) consome dali sem duplicar dado.

**Precificação por ocupação de máquina, não por produto.** O motor já calcula ocupação. Um agente poderia, toda manhã, olhar a fila de pedidos e sugerir **qual produto promover hoje** — se a impressora está livre, promove o Suporte de Notebook (alta margem, baixa ocupação); se está cheia, promove o Mini Cachorro (24 min por peça, encaixa nos buracos). Preço dinâmico baseado em capacidade real, não em concorrência. Não conheço nenhum vendedor pequeno fazendo isso.

**Prova social como produto.** Cada peça vendida vira um par foto‑antes/foto‑depois. Um agente que colete isso de forma sistemática constrói, em seis meses, um acervo que nenhum concorrente novo consegue copiar — e que alimenta Instagram, anúncio e site sem custo marginal.

---

## O que eu faria primeiro, se fosse escolher uma coisa só

O **Agente Vigia**, checando licença e margem toda semana. É o único da lista que evita um problema em vez de acelerar um ganho — e é o tipo de coisa que ninguém constrói até ser tarde.

## Fontes

- [Mercado Livre Developers — publicação de produtos](https://developers.mercadolivre.com.br/pt_br/publicacao-de-produtos/) · [tipos de publicação](https://developers.mercadolivre.com.br/pt_br/tutorial-tipos-de-publicacao-y-atualizacao-de-artigos) · [API de preços](https://developers.mercadolivre.com.br/pt_br/api-de-precos)
- [Shopee Open API Platform — passo a passo de solicitação](https://seller.br.shopee.cn/edu/article/3445)
- [Instagram Graph API 2026: versões, rate limits e content publishing](https://www.netrows.com/blog/instagram-graph-api-guide-2026)
