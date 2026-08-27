# PRINT3D

Catálogo de 6 produtos impressos em 3D, escolhidos por cálculo aberto, com o site estático que os vende.

Site: **https://heitorreis.github.io/print3d/**

## O que tem aqui

```
data/
  catalog/          fonte única da verdade
    candidates.json     62 modelos do MakerWorld auditados um a um (licença, tempo, A1 mini, popularidade)
    selected.json       os 6 produtos escolhidos, com preço usual e todo o texto de anúncio
    market-prices.json  preços brasileiros observados, por família de produto
    marketplaces.json   taxas, comissões e regras de ML, Shopee, Amazon, Nuvemshop, Etsy
    cost-params.json    parâmetros editáveis do motor (filamento, energia, pausa, margem)
  tools/
    profitability.mjs   motor de lucrabilidade (as 4 grandezas e as 3 métricas do briefing)
    analyze.mjs         ranking de categorias e produtos      -> data/outputs/ranking.md
    pricing.mjs         preço por canal dos 6 escolhidos      -> data/outputs/precificacao.md
    playbook.mjs        gera docs/06 a partir do catálogo
    sync-site.mjs       gera artifacts/print3d/src/data/products.ts
  outputs/          saídas geradas (não editar à mão)

docs/
  01-levantamento.md               o que foi apurado, o que não deu, e a armadilha das licenças
  02-metodologia-de-calculo.md     as fórmulas, as calibrações e onde o modelo pode errar
  03-selecao.md                    as 6 categorias e os 6 produtos, com o porquê de cada um
  04-copywriting-e-precificacao.md o que a evidência científica sustenta, e os preços
  05-plataformas-ecommerce.md      custo, taxa e trabalho real de cada marketplace
  06-playbook-de-publicacao.md     fichas prontas para copiar e colar (gerado)
  07-plano-de-agentes.md           o sistema de agentes proposto
  protocolo-de-coleta-de-precos.md 20 minutos que melhoram todo o modelo

artifacts/print3d/  o site (React + Vite + Tailwind), publicado no GitHub Pages
```

## Como recalcular tudo

```bash
pnpm install
node data/tools/analyze.mjs     # ranking
node data/tools/pricing.mjs     # preços por canal
node data/tools/playbook.mjs    # docs/06
node data/tools/sync-site.mjs   # products.ts do site
pnpm --filter @workspace/print3d run typecheck
VITE_BASE_PATH=/print3d/ pnpm --filter @workspace/print3d run build:pages
```

Mudou o preço do filamento? Edite `data/catalog/cost-params.json` e rode os quatro comandos. Mudou o mercado? Edite `data/catalog/market-prices.json`. Quer trocar um produto? Edite `data/catalog/selected.json`.

## As três regras que definem o catálogo

1. **Só modelo em domínio público (CC0).** A licença padrão do MakerWorld proíbe vender a peça impressa, com todas as letras. 24 dos 62 modelos auditados caíram nessa trava.
2. **Só objeto genérico.** CC0 resolve o arquivo, não a marca. Nenhum Minecraft, nenhum Pokémon, nenhum personagem.
3. **Só o que cabe na A1 mini sem montagem.** 180 × 180 × 180 mm, sem ímã, rolamento ou cola.

## Aviso

PRINT3D é uma marca de portfólio pessoal, não uma empresa registrada. Os preços do site são de referência e confirmados por mensagem antes da produção.
