# Etapa 1‑2 — O motor de cálculo

Código: [`data/tools/profitability.mjs`](../data/tools/profitability.mjs) · parâmetros: [`data/catalog/cost-params.json`](../data/catalog/cost-params.json)

```bash
node data/tools/analyze.mjs    # ranking de categorias e produtos
node data/tools/pricing.mjs    # preço por canal dos 6 escolhidos
```

Tudo é editável em JSON. Nenhuma constante está escondida no código.

## As quatro grandezas, exatamente como você definiu

### Esforço de produção — horas de impressora por peça

```
esforço = tempoDeMesaCheia / peçasPorMesa
tempoDeMesaCheia = overheadDaMesa + peçasPorMesa × tempoPorPeça
```

O `overheadDaMesa` (padrão 0,15 h) existe porque aquecimento, purga e primeira camada não escalam com o número de peças. Sem ele, encher a mesa pareceria grátis.

**peçasPorMesa** vem de empacotamento em grade, deliberadamente conservador — sem rotação, sem *nesting*:

```
área útil = 180 − 2×5 mm de margem = 170 mm
nx = floor((170 + 5) / (largura + 5))
ny = floor((170 + 5) / (profundidade + 5))
peçasPorMesa = nx × ny
```

### Lucro estimado — média dos preços ± desvio padrão

Três cenários por produto: `média − 1 dp`, `média`, `média + 1 dp`.

Observações marcadas `outlier: true` saem da conta (por exemplo, o vaso de R$ 280 de 28 cm, que não cabe na A1 mini). Faixas publicadas (ex.: "R$ 45–80") entram pelo ponto médio, e a **regra da amplitude** (`dp ≈ (max − min)/4`) devolve um desvio próprio, combinado ao desvio amostral como fontes independentes:

```
dp_total = √(dp_amostral² + dp_faixa²)
```

### Custo do material

```
custo = gramasPorPeça / 1000 × preçoPorKg     PLA R$ 110 · PETG R$ 130
```

`gramasPorPeça` vem, em ordem de preferência: (1) massa medida no fatiador, se você preencher `gramasPorPecaMedida`; (2) `tempoPorPeça × vazão`, com vazão de 20,4 g/h para peça sólida e 12,9 g/h para parede fina — as duas âncoras reais documentadas em [01‑levantamento](01-levantamento.md).

### Capacidade escalável — peças por dia

```
ciclo = tempoDeMesaCheia + 2 h de pausa
mesasPorDia = floor(24 / ciclo)
capacidade = mesasPorDia × peçasPorMesa
```

O `floor` é proposital: meia mesa por dia não vende. É por isso que a capacidade dá saltos e não uma curva suave — e é por isso que **encurtar o tempo de mesa em 20 minutos às vezes vale mais que baixar o custo do filamento**: pode adicionar uma mesa inteira ao dia.

## As três métricas

| Métrica | Fórmula | Lê‑se |
|---|---|---|
| Lucrabilidade | `(lucro − custo) / esforço` | R$ por hora de impressora |
| Lucrabilidade diária | `(lucro − custo) × capacidade` | R$ por dia |
| Tempo útil | `capacidade × esforço` | horas de impressão por dia |

O tempo útil também vira `ocupacaoDaImpressoraPct`. Um produto que rende bem mas ocupa 90% da máquina bloqueia os outros cinco — por isso a ocupação entra no score.

## A camada líquida, que roda em paralelo

A definição do briefing trata **o preço de venda como se fosse lucro**. É a definição certa para *ranquear* (compara maçãs com maçãs), e errada para *precificar*. Então existe uma segunda camada, separada, que desconta tudo:

```
custoLíquido = material + energia + depreciação + mão de obra + embalagem + reserva de falha
```

| Componente | Valor padrão | Fonte |
|---|---|---|
| Energia | 70 W × horas × R$ 0,95/kWh | consumo medido da A1 mini + tarifa de exemplo 2026 |
| Depreciação | R$ 2.200 / 5.000 h de vida | preço de máquina + vida útil conservadora |
| Mão de obra | 2 min/peça × R$ 25/h | manuseio, limpeza, embalagem |
| Embalagem | R$ 1,50/peça | saco, etiqueta, proteção |
| Reserva de falha | 7% do subtotal | faixa recomendada de 5–10% no setor |

Use a camada primária para **decidir o que fabricar** e a líquida para **decidir por quanto vender**.

## O score de "quentura"

```
score = 0,40·(R$/h normalizado) + 0,40·(R$/dia normalizado)
      + 0,05·(folga de máquina) + 0,15·(demanda validada)
```

`demanda validada = log₁₀(1 + impressões no MakerWorld)`.

Esse quarto termo existe por honestidade. Os três primeiros derivam inteiramente de preço e tempo, e o preço veio de amostra pequena. "Quantas pessoas já imprimiram este objeto" é o **único sinal de demanda revelada** no conjunto de dados — e quando dois produtos empatam na matemática de custo, ele é quem desempata. O peso é pequeno (15%) de propósito: mede interesse global de *makers*, não disposição a pagar no Brasil.

O log comprime a escala. Sem ele, o Infinity Cube (34.000 impressões) sozinho dominaria tudo.

## Onde este modelo pode estar errado

Vale mais dizer do que esconder:

1. **`peçasPorMesa` supõe que N peças levam N × o tempo de uma.** Na prática, imprimir 6 peças juntas é um pouco mais lento por peça (mais deslocamento) e um pouco mais rápido no total (menos aquecimentos). O erro é pequeno e nos dois sentidos.
2. **`footprintMm` é estimado a olho** para quase todos os modelos — o MakerWorld não publica dimensões de forma legível. É o parâmetro com maior alavancagem no resultado: errar 20% na largura pode custar uma coluna inteira de peças na mesa.
3. **O tempo publicado no MakerWorld é do perfil, não da peça.** Se o autor arranjou 8 clipes na mesa e publicou "1 h", o motor lê como 1 h por clipe. Dois produtos estão marcados com `incertezaAlta: true` exatamente por isso (Small Clip e Wire Garbage Bag Holder Clip) — e aparecem **artificialmente ruins** no ranking. Fatiar os dois no Bambu Studio custa 2 minutos e resolve.
4. **Preço tem n = 3 a 7 por família.** É pouco. O desvio padrão largo já reflete isso, e é por isso que existem três cenários em vez de um número.

Nenhum desses erros muda a **ordem** do ranking — a distância entre o primeiro e o sexto colocado é de mais de uma ordem de grandeza. Mas todos mudam os **valores absolutos**, então trate R$/dia como faixa, não como promessa.
