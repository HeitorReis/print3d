# Etapa 1‑1 — Levantamento inicial

## O que foi possível apurar, e o que não foi

Antes dos números, a parte desconfortável: **Mercado Livre, Shopee e Amazon Brasil bloqueiam leitura automatizada** (`robots.txt` proíbe `/lista`, `/p/`, `/dp/` e as buscas). Não existe caminho legítimo de coletar preço e "vendidos" dessas três plataformas por aqui. Tentei as três, e as três recusaram.

Então este levantamento foi construído assim:

| Dado | Origem | Qualidade |
|---|---|---|
| Licença, tempo de impressão, compatibilidade A1 mini, downloads, impressões, curtidas | **MakerWorld, página por página, 62 modelos abertos e lidos um a um** | Primária, verificada em 27/08/2026 |
| Preço praticado no Brasil | **Lojas próprias brasileiras de impressão 3D** (OctoDIY, R3D, ArtTech 3D, DecoraPrint3D, Camélia Decor, Open Eyes, ND3D, Loja Flowin) + guias de precificação do setor | Secundária, mas real e citada |
| Preço no ML / Shopee / Amazon | **Não coletado** | Ausente — ver protocolo de coleta manual |
| Massa de filamento por peça | Modelo de vazão calibrado com duas âncoras reais | Estimada, marcada como tal |
| Peças por mesa da A1 mini | Empacotamento em grade a partir de footprint estimado | Estimada, marcada como tal |

Nada foi inventado. Todo campo estimado tem `estimado: true` e um campo `base` explicando o raciocínio, em `data/catalog/candidates.json`.

**20 minutos resolvem a lacuna de preço.** Está descrito em [`protocolo-de-coleta-de-precos.md`](protocolo-de-coleta-de-precos.md): 10 anúncios por família, copiando preço e "vendidos" à mão. Cole no JSON, rode `node data/tools/analyze.mjs`, e o ranking inteiro se recalcula.

## A descoberta que muda a estratégia

Comecei filtrando MakerWorld por domínio público, como você pediu. O filtro de licença do site é aplicado no navegador — a página que chega ao servidor não vem filtrada — então não deu para usar o filtro. Abri modelo por modelo e li a frase de licença.

O resultado justifica a sua regra melhor do que eu esperava. A licença padrão do MakerWorld, a **Standard Digital File License**, diz literalmente:

> "You shall not share, sub-license, sell, rent, host, transfer, or distribute in any way the digital or **3D printed versions** of this object… The objects may not be used without permission in any way whatsoever in which you charge money, or collect fees."

Ou seja: proíbe explicitamente vender a peça impressa. E é a licença da maioria dos modelos mais populares. Alguns exemplos que **não podem ser vendidos**:

| Modelo | Impressões no MakerWorld | Licença |
|---|---|---|
| Flexi Funny Octopus | 61.600 | Standard Digital File License |
| Desk cable holder with clamp | 16.700 | Standard Digital File License |
| Ultimate Cable Management Tie | 15.200 | Standard Digital File License |
| Cable Organizer v2 | 7.500 | Standard Digital File License |
| Universal Bottle Cap Opener | 759 (7,4 mil curtidas) | Standard Digital File License |

Todos esses são exatamente os produtos que a gente veria num vídeo de "o que imprimir para vender". São armadilhas jurídicas.

### CC0 não é passe livre para tudo

Segunda armadilha, mais sutil: encontrei coleções públicas chamadas "Public Domain Products" e "FREE To Sell Prints" recheadas de **Minecraft, Harry Potter, Iron Man, Pokémon, Fallout, Skyrim, Deadpool**. O uploader marcou CC0, e isso resolve o direito autoral **do arquivo** — não resolve nada sobre a marca e o personagem, que são de terceiros.

Regra que passou a valer no catálogo: **CC0 **e** objeto genérico**. Sem personagem, sem marca, sem obra protegida. Todos os 22 aprovados passam nas duas.

### Quanto sobra depois do filtro

De 62 modelos auditados:

| Situação | Modelos |
|---|---|
| Aprovados (CC0 + A1 mini + sem montagem com ferragem) | **22** |
| Reprovados por licença não comercial (SDFL / CC‑BY‑NC*) | 24 |
| Reprovados por licença fora de domínio público (CC‑BY, CC‑BY‑SA, CC‑BY‑ND) | 4 |
| CC0, mas sem perfil para A1 mini | 9 |
| CC0 e A1 mini, mas exigindo ímã / rolamento / cola | 2 |

E a oferta CC0 é **muito desigual por categoria**:

| Categoria | Aprovados CC0 | Comentário |
|---|---|---|
| Escritório | 5 | Nicho mais fundo — dá para lançar variações sem trocar de tema |
| Decoração | 5 | Bom, com vasos, miniaturas e placas |
| Entretenimento | 4 | Concentrado em fidgets |
| Cozinha | 3 | Fraco e de baixo valor unitário |
| Tecnologia | 3 | Fraco |
| Life hacks | 2 | Muito fraco |
| **Bem‑estar e cosméticos** | **1** | Praticamente inexistente em domínio público |

Isso é uma informação de estratégia, não um detalhe: **bem‑estar e cosméticos é o nicho mais vendido em conteúdo de impressão 3D e o mais vazio em domínio público**. Todo modelo bom de porta‑pincel, gua sha e organizador de maquiagem que abri estava sob Standard Digital File License. Se você quiser entrar nesse nicho de verdade, o caminho não é procurar mais — é **modelar o seu próprio**. Aí o arquivo é seu e o problema jurídico deixa de existir.

## Preços brasileiros observados

Coletados de lojas próprias brasileiras que vendem peça impressa em 3D (páginas públicas, todas citadas em `data/catalog/market-prices.json`):

| Produto | Preço | Loja |
|---|---|---|
| Porta‑lápis colmeia | R$ 19,90 | OctoDIY |
| Cubo infinito antiestresse (PLA, 8×4 cm) | R$ 19,90 | Loja Flowin |
| Suporte de celular para mesa | R$ 20,00 | Open Eyes |
| Suporte de mesa para celular | R$ 24,90 | ND3D |
| Organizador de post‑its | R$ 24,99 | OctoDIY |
| Suporte porta cartão de visita (kit 3) | R$ 24,99 | OctoDIY |
| Cubo sensorial triangular / fidget | R$ 39,00 | ArtTech 3D |
| Vaso cachepô decorativo capitonê | a partir de R$ 39,00 | ArtTech 3D |
| Bandeja octogonal | R$ 44,99 | OctoDIY |
| Vaso suculento design moderno | R$ 45,90 | OctoDIY |
| Organizador de mesa hexa | a partir de R$ 64,90 | OctoDIY |
| Vaso decorativo moderno (7×7×15 cm, 214 g) | R$ 71,90 | DecoraPrint3D |
| Organizador de mesa canelado | R$ 84,90 | OctoDIY |
| Vaso orgânico (14×28 cm) | R$ 280,00 | Camélia Decor |

Duas leituras importantes:

1. **A faixa real de peça pequena impressa em 3D no Brasil é R$ 20–45.** Guias de setor falam em R$ 80–200 para "suporte 10×10×5 cm", mas isso é preço de *serviço sob encomenda*, não de produto de prateleira. Usar aquele número teria inflado todo o modelo.
2. **Dá para cobrar R$ 84,90 num porta‑caneta** se a peça tiver desenho próprio e a loja tiver cara de loja. A diferença entre R$ 19,90 e R$ 84,90 no mesmo tipo de objeto é quase toda apresentação.

## Duas âncoras que salvaram o cálculo de material

Nenhuma página do MakerWorld publica a massa em gramas de forma legível. Em vez de chutar, calibrei um modelo de vazão (gramas por hora de impressão) com dois pontos reais:

| Âncora | Dado | Vazão |
|---|---|---|
| Penne 2.0 Safety Whistle (CC0) | mesa cheia da A1 mini = **100 apitos de ~1 g em 4,9 h** | **20,4 g/h** — perfil sólido |
| Vaso decorativo de 25 cm | **180 g de PLA em 14 h** | **12,9 g/h** — parede fina / vaso |

São os dois extremos de geometria, e é entre eles que quase toda peça cai. O motor usa `perfilDeVazao: "solido"` ou `"paredeFina"` por produto, e qualquer massa medida no Bambu Studio sobrescreve a estimativa (campo `gramasPorPecaMedida`).

## Fontes

- [MakerWorld](https://makerworld.com/) — 62 páginas de modelo, licença e perfil de impressão lidos individualmente (URLs em `data/catalog/candidates.json`)
- [OctoDIY](https://www.octodiy.com.br/) · [R3D](https://loja.r3d.com.br/) · [ArtTech 3D](https://loja.arttech3d.com.br/) · [DecoraPrint3D](https://decoraprint3d.com.br/) · [Camélia Decor](https://www.cameliadecor.com.br/) · [Open Eyes](https://openeyes.com.br/) · [Loja Flowin](https://www.lojaflowin.com.br/)
- [Tamo Tudo 3D — produtos mais vendidos 2026](https://tamotudo3d.com.br/blog/5-produtos-mais-lucrativos-para-imprimir-e-vender-em-2026) e [custo de vaso decorativo](https://tamotudo3d.com.br/blog/quanto-custa-vaso-decorativo-3d)
- [Inside 3D Printing Brasil — quanto custa impressão 3D](https://inside3dprintingbrasil.com.br/quanto-custa-impressao-3d/)
- [CaniveteMEI — como precificar impressão 3D](https://canivetemei.com.br/blog/quanto-cobrar-por-impressao-3d)
- [3D Fila — preços de PLA 1 kg](https://3dfila.com.br/categoria-produto/filamento-3d-para-impressora-3d/filamento-pla/)
- [Custo Impressão 3D — consumo da A1 mini](https://custoimpressao3d.com.br/quanto-gasta-de-energia/bambu-a1-mini)
