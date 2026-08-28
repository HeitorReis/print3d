# Protocolo de coleta de preços (20 minutos, uma vez por trimestre)

Mercado Livre, Shopee e Amazon bloqueiam leitura automatizada. Isso não é contornável por aqui — e não deveria ser contornado. Mas você abre o navegador e resolve em vinte minutos, com dado melhor do que qualquer raspagem daria, porque você vê o **"+X vendidos"**, que é o único indicador de demanda real que existe.

## Como fazer

Para cada uma das 6 famílias do catálogo:

1. Busque no **Mercado Livre** o termo da coluna "busca" abaixo.
2. Ordene por **Mais vendidos**.
3. Anote os **10 primeiros**: preço e o número de "vendidos".
4. Repita na **Shopee**, ordenando por "Mais vendidos".
5. Ignore anúncios de **arquivo STL** (são digitais, preço não comparável) e kits com 20+ peças.

| Família | Busca no ML | Busca na Shopee |
|---|---|---|
| `fidget-antistress` | cubo infinito impressão 3d | cubo infinito antiestresse 3d |
| `suporte-notebook` | suporte notebook impressão 3d | suporte para notebook 3d |
| `organizador-de-mesa` | organizador de mesa impressão 3d | porta caneta impressão 3d |
| `banheiro-bem-estar` | saboneteira impressão 3d | saboneteira drenante 3d |
| `miniatura-decorativa` | miniatura decorativa impressão 3d | enfeite de mesa impressão 3d |
| `brinde-pequeno` | kit apito emergência | apito de segurança kit |

## Onde colar

Em [`data/catalog/market-prices.json`](../data/catalog/market-prices.json), dentro de `familias.<nome>.observacoes`:

```json
{
  "preco": 34.90,
  "produto": "Cubo Infinito Fidget 3D Bicolor",
  "loja": "Mercado Livre",
  "url": "https://...",
  "vendidos": 250,
  "coletadoEm": "2026-09-01"
}
```

Apague as observações antigas de guias de setor (as com `"tipo": "faixa"`) assim que tiver 8+ observações reais da mesma família — elas existem só para tapar buraco.

## Depois

```bash
node data/tools/analyze.mjs    # recalcula ranking de categorias e produtos
node data/tools/pricing.mjs    # recalcula preço por canal
```

Se o ranking mudar de ordem, o catálogo do site deve mudar junto: edite `data/catalog/selected.json` e rode `node data/tools/sync-site.mjs`.

## Bônus: 2 minutos que valem mais que os 20

Abra os 6 modelos no **Bambu Studio**, fatie com o perfil da A1 mini e anote:

- **massa em gramas** → campo `material.gramasPorPecaMedida` no candidato
- **quantas peças cabem de fato na mesa** → campo `geometria.pecasPorMesaOverride`
- **tempo real da mesa cheia** → `impressao.perfilTempoH` com `unidadesNoPerfil` igual ao número de peças

Isso troca as duas estimativas de maior alavancagem do modelo por medição. Dois produtos hoje marcados com `incertezaAlta: true` (Small Clip e Wire Garbage Bag Holder Clip) provavelmente sobem várias posições depois disso.
