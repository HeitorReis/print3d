# Etapa 2‑1 — Anúncios e preço

## O que a evidência realmente diz

Comecei procurando as "regras de ouro" de copy de e‑commerce e encontrei, como esperado, muita afirmação e pouca medição. Vale separar o que tem base do que é folclore, porque duas dessas descobertas mudam o que **não** vale a pena fazer.

### Preço terminado em 9: efeito bem menor do que se diz

Este é o achado mais útil, e ele contraria o senso comum do e‑commerce.

- **Troll et al. (2024)**, meta‑análise no *Journal of Consumer Psychology*, encontrou efeito moderado de subestimação para preços *just‑below* versus redondos: **g = 0,67, IC95% (0,04; 1,30)**. Mas o intervalo quase toca o zero — e os autores registram que, **corrigido para viés de publicação, o efeito fica "muito menor e próximo de zero"**.
- **Fenneman et al. (2022)**, PLOS ONE, 266 participantes e 4.788 decisões de compra: **nenhum suporte** nem para o efeito de dígito à esquerda nem para o de fluência perceptual. Nem *just‑below* nem redondo aumentaram compra de forma significativa.
- **Escher, Troll, Henjes & Loschelder (2026)**, dois experimentos pré‑registrados (N = 284 e N = 417): preços **precisos** (R$ 37,45) produziram a melhor *imagem de preço*, seguidos de *just‑below*, depois redondos — mas **nenhuma terminação afetou de forma confiável a intenção de compra**.
- **Loschelder et al. (2025)**, 9.200 preços em 23 países de um marketplace C2C de produtos artesanais: 51,7% redondos, 25,3% *just‑below*, 23,0% precisos. Na América Latina a distribuição é diferente da anglófona — no México, 50% dos preços são precisos.

**O que fazemos com isso.** Usamos terminação em `,90` como padrão porque é a convenção do varejo brasileiro e não custa nada — não porque acreditamos que ela vende sozinha. **Não gaste um minuto testando R$ 29,90 contra R$ 30,00.** O tempo rende infinitamente mais em foto e em avaliações. O preço é definido por custo e por âncora de mercado, nas duas seções abaixo.

### Imagem: mais informação não é melhor

- **Zhu, Cao, Su & Ma (2025)**, 1.000 produtos de moda de um grande marketplace chinês, 996 participantes em experimento comportamental: mediram "riqueza de informação" da imagem com *Vision Transformer* + clusterização. Resultado contraintuitivo — cada unidade a mais de riqueza **reduziu a probabilidade de compra em ~0,16–0,20 (p < 0,05)** e encurtou o tempo de decisão em 0,19–0,26 s.

Ou seja: imagem carregada decide mais rápido, e decide mais vezes por não comprar. A leitura prática é a mesma que as duas plataformas já impõem por regra: **foto de capa limpa, fundo branco, um produto, sem texto**. Não é só compliance — é conversão.

### Avaliações: aqui o efeito é real e grande

- **Babić Rosário, Sotgiu, De Valck & Bijmolt (2016)**, meta‑análise no *Journal of Marketing Research* sobre efeito de eWOM em vendas: efeito positivo e robusto, mais forte para produtos novos e em plataformas com métricas de volume.

Tradução para o seu caso: **as 10 primeiras avaliações valem mais que qualquer ajuste de copy.** O plano de lançamento em [06‑playbook](06-playbook-de-publicacao.md) trata isso como prioridade número um.

## Padrões extraídos dos anúncios brasileiros reais

Os títulos que apareceram nas buscas de ML, Shopee e Amazon BR (títulos são públicos mesmo com as páginas bloqueadas) seguem uma gramática bem consistente:

```
[Substantivo do produto] + [qualificador] + [aplicação] + "Impressão 3D" + [material/medida]
```

Exemplos reais coletados:
- "Suporte Celular Impressao 3d"
- "Porta Caneta Objetos Escritório Mesa Vazado 18 cm Impressão 3D Preto"
- "Cubo Infinito Fidget Impressão 3d Anti Estresse Laranja"
- "Suporte Para Celular Duocolor - Feito Na Impressão 3d"
- "Organizador 3D Geométrico Porta Caneta Lápis Clips e Suporte Celular para Escritório Home Office (Cinza, Kit Completo)"

Três coisas se repetem e foram adotadas:

1. **"Impressão 3D" aparece quase sempre.** É termo de busca, não desabono. Quem procura isso já aceitou marca de camada.
2. **A aplicação entra no título** ("Escritório", "Home Office", "Mesa"). É onde mora a cauda longa.
3. **Cor e medida entram no fim**, quando sobra caractere.

## Regras formais de cada plataforma

| | Mercado Livre | Shopee |
|---|---|---|
| Título | **máx. 60 caracteres**; palavra‑chave no início; sem maiúsculas, sem `!*#`, sem palavra promocional | **máx. 256 caracteres**; Produto + especificações + tipo + marca + modelo |
| Descrição | subtítulos e listas; ficha técnica; sem contato externo | **máx. 5.000 caracteres**; sem link externo, sem contato, sem nome de concorrente |
| Fotos | **mín. 3, ideal 6+**; mín. 1200×1200 px (ideal 2000×2000); capa em fundo branco, produto ocupando **70–80%** do quadro, sem texto/logo/marca d'água | **1 a 9 imagens**; **quadradas 1:1**, 1024×1024 px recomendado; capa em fundo branco com produto em **70–85%**; texto comercial, moldura, borda colorida e logo são **proibidos** |
| Penalidade | nota de qualidade do anúncio abaixo de 80 derruba exposição | perda imediata de relevância; casos graves de bloqueio ou exclusão |

Fontes: [Jaguar Sheet — checklist ML](https://jaguarsheet.com/pt/blog/checklist-publicacion-perfecta-mercado-livre) · [Ideris — boas práticas Shopee](https://atendimento.ideris.com.br/hc/pt-br/articles/21406464506647-Boas-pr%C3%A1ticas-de-an%C3%BAncios-para-a-Shopee) · [1001 Clicks — regras de imagem Shopee 2026](https://1001clicks.com.br/blog/post/regras-imagens-shopee-evitar-banimentos/)

## A estrutura de descrição que usei nos 6 anúncios

Todos os textos completos estão em [`data/catalog/selected.json`](../data/catalog/selected.json), prontos para copiar e colar. A estrutura é sempre a mesma:

1. **Uma frase que nomeia o problema**, não o produto. *"O sabonete não derrete de tanto usar. Derrete de ficar parado na água."*
2. **Como o produto resolve, em mecanismo concreto.** Não "design inovador" — "o piso é inclinado e vazado, com canaleta de saída na frente".
3. **Uma escolha técnica justificada.** Por que PETG e não PLA. Isso faz duas coisas: sinaliza competência e antecipa a objeção de durabilidade.
4. **Ficha técnica em lista.** Material, medidas, peso, o que não tem (sem ímã, sem rolamento, sem montagem).
5. **O que vem na caixa**, explicitando o que *não* vem ("os marcadores da foto não acompanham").
6. **Cuidados**, incluindo o limite real do material (PLA amolece acima de 55 °C — dizer isso antes evita a reclamação depois).
7. **Origem do modelo**: domínio público, CC0, sem personagem ou marca de terceiro.

Os itens 5, 6 e 7 são de confiabilidade, não de venda — e são exatamente os que a maioria dos concorrentes omite. Anúncio que diz o que o produto **não** faz é lido como mais honesto, e reduz devolução.

## Precificação

Tabela completa por canal: [`data/outputs/precificacao.md`](../data/outputs/precificacao.md)

### O método

1. **Piso**: custo líquido × 2,2. Cobre material, energia, depreciação, mão de obra, embalagem e reserva de falha de 7%, com margem.
2. **Âncora**: média das lojas brasileiras da mesma família (± 1 desvio).
3. **Preço usual** = escolhido entre os dois, arredondado para `,90`, sempre **abaixo** da âncora — a marca é nova e não tem avaliação para justificar prêmio.
4. **Preço de marketplace** = preço usual × fator do canal (1,15 a 1,30 conforme a família), arredondado para `,90`. O fator absorve comissão e taxa fixa.
5. **O preço usual nunca é sobrescrito.** Fica em `selected.json` e é o preço da loja própria, do WhatsApp e do site.

### O resultado

| Produto | Usual | ML | Shopee | Margem ML | Margem Shopee | Margem loja |
|---|---|---|---|---|---|---|
| Cubo Infinito | R$ 29,90 | R$ 38,90 | R$ 38,90 | 53% | 51% | 76% |
| Suporte Notebook | R$ 59,90 | R$ 71,90 | R$ 71,90 | 69% | 64% | 88% |
| Organizador Marca‑Texto | R$ 39,90 | R$ 45,90 | R$ 45,90 | 63% | 60% | 87% |
| Saboneteira Drenante | R$ 29,90 | R$ 35,90 | R$ 35,90 | 52% | 50% | 78% |
| Mini Cachorro | R$ 29,90 | R$ 37,90 | R$ 37,90 | 61% | 60% | 88% |
| Kit 10 Apitos | R$ 24,90 | R$ 32,90 | R$ 32,90 | 56% | 56% | 84% |

### A decisão estrutural: todos abaixo de R$ 79

Os seis SKUs ficam **de propósito** abaixo de R$ 79. Esse número não é estético — é o degrau do Mercado Livre:

- **Abaixo de R$ 79**: você paga o custo fixo por unidade (R$ 6 a 7, hoje ~R$ 6,50) e o comprador paga o frete.
- **A partir de R$ 79**: o custo fixo some, mas o **frete grátis passa a ser obrigatório e é seu**, com subsídio proporcional à sua reputação — que, no começo, é zero.

Para uma operação nova, com uma A1 mini e sem reputação verde‑escuro, atravessar os R$ 79 com um produto de 30 g é entregar a margem para a transportadora. A saída correta não é subir o preço unitário: é **montar combo**. Um kit "Home Office" (organizador de marca‑texto + suporte de notebook) chega a R$ 99,90 com dois produtos, atravessa o degrau com margem para pagar o frete e ainda aumenta o ticket médio.

Isso está no plano de lançamento como fase 2, depois das primeiras avaliações.

### A Shopee castiga o barato

Na faixa até R$ 79,99 a Shopee cobra **20% + R$ 4,00**. Num produto de R$ 24,90 isso é 36% do preço. É por isso que o fator de marketplace da Shopee é mais alto nas famílias baratas, e é por isso que **o kit de apitos e o mini cachorro só fazem sentido lá dentro de combo ou com pedido mínimo**. Vendidos avulsos, entregam metade da margem.

## Referências científicas citadas

- Troll, E. S. et al. (2024). *A meta‑analysis on the effects of just‑below versus round prices.* Journal of Consumer Psychology. [doi:10.1002/jcpy.1353](https://myscp.onlinelibrary.wiley.com/doi/full/10.1002/jcpy.1353)
- Fenneman, A. et al. (2022). *Psychological price perception may exert a weaker effect on purchasing decisions than previously suggested.* PLOS ONE. [link](https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0270850)
- Escher, Troll, Henjes & Loschelder (2026). *How consumers evaluated precise, just‑below, and round prices.* Frontiers in Behavioral Economics. [link](https://www.frontiersin.org/journals/behavioral-economics/articles/10.3389/frbhe.2026.1828446/full)
- Loschelder, Ventura, Troll & Soliman (2025). *Round, just‑below, or precise prices? Cultural differences in the prevalence of price endings in E‑commerce.* Frontiers in Behavioral Economics. [link](https://www.frontiersin.org/journals/behavioral-economics/articles/10.3389/frbhe.2025.1296207/full)
- Zhu, Cao, Su & Ma (2025). *Measuring Information Richness in Product Images: Implications for Online Sales.* [arXiv:2508.04541](https://arxiv.org/html/2508.04541v2)
- Babić Rosário, A., Sotgiu, F., De Valck, K. & Bijmolt, T. (2016). *The Effect of Electronic Word of Mouth on Sales: A Meta‑Analytic Review.* Journal of Marketing Research. [link](https://journals.sagepub.com/doi/10.1509/jmr.14.0380)
