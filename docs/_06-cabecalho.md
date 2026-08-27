<!-- Este arquivo é o cabeçalho manual. O corpo de docs/06-playbook-de-publicacao.md
     é gerado por `node data/tools/playbook.mjs` a partir de data/catalog/selected.json.
     Edite este arquivo ou o JSON — nunca o 06 diretamente. -->

# Etapa 2‑3 — Playbook de publicação

Tudo o que é preciso para colocar os 6 produtos no ar. Os textos abaixo são para copiar e colar; nada aqui é rascunho.

## Ordem de execução

| Passo | O que | Tempo | Quando |
|---|---|---|---|
| 1 | Imprimir 2 unidades de cada produto | ~14 h de impressora | Dia 1–2 |
| 2 | Fotografar as 12 peças (briefing abaixo) | 2 h | Dia 3 |
| 3 | Publicar o site (GitHub Pages) | 15 min | Dia 3 |
| 4 | Publicar os 6 anúncios no Mercado Livre | 4 h | Dia 4 |
| 5 | Conseguir as 10 primeiras avaliações | 2–3 semanas | Semanas 1–3 |
| 6 | Replicar na Shopee com fotos quadradas | 3 h | Semana 4 |
| 7 | Publicar os combos acima de R$ 79 | 1 h | Semana 4 |

Passo 5 não é opcional nem é "marketing". É a variável com maior efeito medido sobre vendas ([Babić Rosário et al., 2016](https://journals.sagepub.com/doi/10.1509/jmr.14.0380)) e a única que não dá para acelerar com código.

## Briefing de fotos

**Regra inegociável: as fotos são suas, das suas peças.** Não use as imagens do MakerWorld. Dois motivos, ambos sérios:

1. **Jurídico.** A licença CC0 cobre o **arquivo 3D**. As fotos do designer são obra separada e não necessariamente estão sob a mesma licença. Publicar foto de terceiro num anúncio comercial é exatamente o tipo de risco que este catálogo inteiro foi montado para evitar.
2. **Comercial.** Comprador brasileiro de impressão 3D reconhece foto de catálogo internacional na hora. Foto da peça real, com marca de camada visível, converte melhor — e é o que sustenta a promessa de "impresso sob demanda por uma pessoa".

### As 6 fotos de cada produto

| # | Foto | Como |
|---|---|---|
| 1 | **Capa** | Fundo branco liso (papel A3 ou tecido), produto ocupando 70–80% do quadro, luz difusa (janela + papel manteiga), **sem texto, sem logo, sem borda** |
| 2 | Ângulo 3/4 | Mostra volume e profundidade |
| 3 | **Escala** | Ao lado de objeto conhecido — moeda de R$ 1, caneta, mão |
| 4 | **Em uso** | Na mesa real, com o objeto que ele organiza/segura |
| 5 | Detalhe | Close do encaixe, do dreno, da dobradiça — o que justifica o preço |
| 6 | Variações de cor | Todas as cores disponíveis lado a lado |

### Especificações técnicas

- **Mercado Livre**: mínimo 1200×1200 px, ideal 2000×2000. Mínimo 3 fotos, ideal 6+.
- **Shopee**: **quadradas 1:1**, 1024×1024 px, máximo 9 imagens, arquivo abaixo de 5 MB.
- **Fotografe já em quadrado** (1:1) e recorte para o ML se precisar — o caminho contrário perde enquadramento.
- Proibido na capa das duas plataformas: texto promocional, moldura, borda colorida, marca d'água, logo, selo.

Uma sessão de 2 horas com luz de janela, um papel branco e o celular resolve as 36 fotos.

## Checklist de confiabilidade (o que fazer em todos os anúncios)

- [ ] Ficha técnica **100% preenchida** — campo vazio derruba a nota de qualidade no ML
- [ ] Marca: `PRINT3D` · Modelo: o slug do produto
- [ ] Peso e dimensões da **embalagem** corretos (frete errado sai do seu bolso)
- [ ] Prazo de produção declarado com folga: prometa 5 dias úteis, entregue em 3
- [ ] Dizer o que **não** vem na caixa
- [ ] Dizer o limite real do material (PLA amolece acima de 55 °C)
- [ ] Responder pergunta em menos de 12 h — o ML mede isso
- [ ] Nunca colocar contato externo (WhatsApp, e‑mail, site) dentro do anúncio: é violação nas duas plataformas

## Combos para atravessar o degrau dos R$ 79

Depois das primeiras avaliações, publique também:

| Combo | Composição | Preço | Por quê |
|---|---|---|---|
| **Kit Home Office** | Suporte de notebook + Organizador de marca‑texto | R$ 99,90 | Passa dos R$ 79 com margem que paga o frete grátis obrigatório |
| **Kit Mesa Organizada** | Organizador de marca‑texto + Mini cachorro + Cubo infinito | R$ 89,90 | Usa o mini cachorro (custo R$ 3,69) como isca de valor percebido |
| **Kit Banheiro** | 2 saboneteiras drenantes | R$ 54,90 | Ticket médio sem produzir SKU novo |

