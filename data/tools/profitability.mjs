/**
 * MOTOR DE CALCULO DE LUCRABILIDADE - PRINT3D
 * ============================================
 *
 * Este arquivo e proposital e integralmente editavel. Nao ha nada escondido:
 * todas as constantes vivem em data/catalog/cost-params.json e todas as
 * entradas vivem em data/catalog/candidates.json e market-prices.json.
 *
 * As quatro grandezas do briefing, implementadas ao pe da letra:
 *
 *   esforcoDeProducao (h/peca) = tempoDeMesaCheia / pecasPorMesa
 *   lucroEstimado     (R$)     = media dos precos nas lojas (banda: +/- 1 desvio padrao)
 *   custoDoMaterial   (R$)     = gramasPorPeca / 1000 * precoPorKg   (PLA 110, PETG 130)
 *   capacidade        (pc/dia) = floor(24 / (tempoDeMesaCheia + 2)) * pecasPorMesa
 *
 * As tres metricas do briefing:
 *
 *   lucrabilidade       = (lucro - custo) / esforco        -> R$ por hora de impressora
 *   lucrabilidadeDiaria = (lucro - custo) * capacidade     -> R$ por dia
 *   tempoUtil           = capacidade * esforco             -> h de impressao por dia
 *
 * Alem disso, e SEPARADAMENTE, calculamos a camada `liquido`, que desconta
 * energia, taxa de falha, embalagem, mao de obra, depreciacao e comissao de
 * marketplace. A camada primaria acima trata o preco de venda como se fosse
 * lucro (foi assim que o briefing definiu); a camada liquida mostra o que
 * realmente sobra. Use a primaria para RANQUEAR e a liquida para PRECIFICAR.
 */

// ---------------------------------------------------------------------------
// Estatistica
// ---------------------------------------------------------------------------

/** Media aritmetica. */
export function media(xs) {
  if (!xs.length) return 0;
  return xs.reduce((a, b) => a + b, 0) / xs.length;
}

/** Desvio padrao amostral (n-1). Com n<2 devolve 0. */
export function desvioPadrao(xs) {
  if (xs.length < 2) return 0;
  const m = media(xs);
  return Math.sqrt(xs.reduce((a, x) => a + (x - m) ** 2, 0) / (xs.length - 1));
}

/**
 * Estatistica de preco de uma familia de mercado.
 * Observacoes marcadas com outlier:true sao excluidas.
 * Observacoes do tipo "faixa" contribuem com o ponto medio e, via regra da
 * amplitude, com um desvio proprio (max-min)/4 que e combinado ao desvio amostral.
 */
export function estatisticaDePreco(familia) {
  const obs = (familia.observacoes || []).filter((o) => !o.outlier);
  const precos = obs.map((o) => o.preco);
  const m = media(precos);
  const sdAmostral = desvioPadrao(precos);

  const sdsDeFaixa = obs
    .filter((o) => o.tipo === 'faixa' && typeof o.min === 'number' && typeof o.max === 'number')
    .map((o) => (o.max - o.min) / 4);

  // Combina desvios como fontes independentes de variabilidade.
  const sd = Math.sqrt(sdAmostral ** 2 + media(sdsDeFaixa) ** 2);

  return {
    n: precos.length,
    media: m,
    desvioPadrao: sd,
    min: precos.length ? Math.min(...precos) : 0,
    max: precos.length ? Math.max(...precos) : 0,
    bandaInferior: m - sd,
    bandaSuperior: m + sd,
    fatorMarketplace: familia.fatorMarketplace ?? 1,
    mediaEmMarketplace: m * (familia.fatorMarketplace ?? 1),
    qualidade: familia.qualidade ?? 'ok',
  };
}

// ---------------------------------------------------------------------------
// Geometria e producao
// ---------------------------------------------------------------------------

/** Quantas unidades fisicas compoem 1 SKU (peca avulsa = 1, kit de 4 = 4). */
export function unidadesPorSku(candidato) {
  return candidato.venda?.unidadesPorSku ?? 1;
}

/**
 * Quantas unidades FISICAS cabem numa mesa da A1 mini.
 * Empacotamento em grade simples com margem de cama e espacamento entre pecas.
 * Deliberadamente conservador: nao considera rotacao nem nesting.
 */
export function unidadesFisicasPorMesa(candidato, params) {
  const override = candidato.geometria?.pecasPorMesaOverride;
  if (typeof override === 'number') return override;

  const [w, d] = candidato.geometria?.footprintMm ?? [180, 180];
  const { x, y } = params.impressora.camaMm;
  const margem = params.impressora.margemDaCamaMm;
  const gap = params.impressora.espacamentoEntrePecasMm;

  const util = { x: x - 2 * margem, y: y - 2 * margem };
  const nx = Math.floor((util.x + gap) / (w + gap));
  const ny = Math.floor((util.y + gap) / (d + gap));
  return Math.max(1, nx * ny);
}

/**
 * Quantos SKUs (o que o cliente compra) cabem numa mesa cheia.
 * Esta e a "peca" das formulas do briefing: o objeto que gera receita.
 */
export function pecasPorMesa(candidato, params) {
  const fisicas = unidadesFisicasPorMesa(candidato, params);
  return Math.max(1, Math.floor(fisicas / unidadesPorSku(candidato)));
}

/** Tempo de impressao de UMA unidade fisica, em horas. */
export function tempoPorUnidadeFisicaH(candidato) {
  const p = candidato.impressao;
  return p.perfilTempoH / (p.unidadesNoPerfil || 1);
}

/** Tempo de impressao de UM SKU, em horas. */
export function tempoPorPecaH(candidato) {
  return tempoPorUnidadeFisicaH(candidato) * unidadesPorSku(candidato);
}

/** Tempo de uma mesa cheia = overhead fixo + n pecas em serie. */
export function tempoDeMesaCheiaH(candidato, params) {
  const n = pecasPorMesa(candidato, params);
  return params.impressora.overheadPorMesaH + n * tempoPorPecaH(candidato);
}

/** Massa de filamento por peca, em gramas. */
export function gramasPorPeca(candidato, params) {
  const medidaPorUnidade = candidato.material?.gramasPorPecaMedida;
  if (typeof medidaPorUnidade === 'number') return medidaPorUnidade * unidadesPorSku(candidato);

  const perfil = candidato.material?.perfilDeVazao ?? 'solido';
  const gPorHora = params.vazaoFilamento[perfil].gPorHora;
  return tempoPorPecaH(candidato) * gPorHora;
}

// ---------------------------------------------------------------------------
// As quatro grandezas do briefing
// ---------------------------------------------------------------------------

/** esforco de producao, em horas de impressora por peca. */
export function esforcoDeProducao(candidato, params) {
  return tempoDeMesaCheiaH(candidato, params) / pecasPorMesa(candidato, params);
}

/** custo do material de UMA peca, em reais. */
export function custoDoMaterial(candidato, params) {
  const tipo = candidato.material?.tipo ?? 'PLA';
  const precoKg = params.materiais[tipo].precoPorKgBRL;
  return (gramasPorPeca(candidato, params) / 1000) * precoKg;
}

/**
 * capacidade escalavel, em pecas por dia.
 * Uma mesa ocupa (tempoDeMesa + pausa) horas de ciclo. Cabem floor(24 / ciclo)
 * mesas por dia; cada mesa entrega pecasPorMesa unidades.
 */
export function capacidadeDiaria(candidato, params) {
  const ciclo = tempoDeMesaCheiaH(candidato, params) + params.operacao.pausaEntreMesasH;
  const mesas = Math.floor(params.operacao.horasPorDia / ciclo);
  return Math.max(0, mesas) * pecasPorMesa(candidato, params);
}

// ---------------------------------------------------------------------------
// Camada liquida (o que realmente sobra)
// ---------------------------------------------------------------------------

export function custoLiquidoUnitario(candidato, params) {
  const ind = params.custosIndiretos;
  const material = custoDoMaterial(candidato, params);
  const horas = esforcoDeProducao(candidato, params);

  const energia = (params.impressora.potenciaMediaW / 1000) * horas * ind.energiaBRLporKWh;
  const depreciacao = (ind.depreciacaoImpressoraBRL / ind.vidaUtilHoras) * horas;
  const maoDeObra = (ind.minutosDeManuseioPorPeca / 60) * ind.maoDeObraBRLporHoraDeManuseio;
  const embalagem = ind.embalagemBRLporPeca;

  const subtotal = material + energia + depreciacao + maoDeObra + embalagem;
  const reservaFalha = subtotal * (ind.taxaDeFalhaPct / 100);

  return {
    material, energia, depreciacao, maoDeObra, embalagem, reservaFalha,
    total: subtotal + reservaFalha,
  };
}

/** Comissao + taxa fixa de uma plataforma para um dado preco de etiqueta. */
export function taxaDeMarketplace(plataforma, preco) {
  if (plataforma.comissaoPorFaixa) {
    const faixa = plataforma.comissaoPorFaixa.find((f) => f.ateBRL === null || preco <= f.ateBRL);
    return preco * faixa.percentual + faixa.fixoBRL;
  }
  if (plataforma.comissao) {
    const pct = plataforma.comissao.classico
      ? (plataforma.comissao.classico.min + plataforma.comissao.classico.max) / 2
      : plataforma.comissao;
    const fixo = plataforma.custoFixoPorUnidade && preco < plataforma.custoFixoPorUnidade.aplicaAbaixoDeBRL
      ? plataforma.custoFixoPorUnidade.usarBRL
      : 0;
    return preco * pct + fixo;
  }
  return 0;
}

// ---------------------------------------------------------------------------
// Avaliacao completa de um candidato
// ---------------------------------------------------------------------------

function demandaValidadaInterna(candidato) {
  const p = candidato.popularidade || {};
  const impressoes = p.impressoes ?? p.downloads ?? 0;
  return Math.log10(1 + impressoes);
}

export function avaliar(candidato, familia, params) {
  const preco = estatisticaDePreco(familia);
  const esforco = esforcoDeProducao(candidato, params);
  const custo = custoDoMaterial(candidato, params);
  const capacidade = capacidadeDiaria(candidato, params);
  const nPorMesa = pecasPorMesa(candidato, params);
  const tMesa = tempoDeMesaCheiaH(candidato, params);

  const cenario = (lucro) => ({
    lucro,
    margemBruta: lucro - custo,
    lucrabilidade: esforco > 0 ? (lucro - custo) / esforco : 0,
    lucrabilidadeDiaria: (lucro - custo) * capacidade,
  });

  const liquido = custoLiquidoUnitario(candidato, params);
  const precoSugerido = liquido.total * params.precificacao.margemAlvoSobreCustoLiquido;

  return {
    id: candidato.id,
    nome: candidato.nome,
    demandaValidada: demandaValidadaInterna(candidato),
    categoria: candidato.categoria,
    familia: candidato.familiaDeMercado,
    licenca: candidato.licenca?.codigo,

    venda: { unidadesPorSku: unidadesPorSku(candidato), rotuloSku: candidato.venda?.rotuloSku ?? 'Peca unica' },

    producao: {
      tempoPorUnidadeFisicaH: tempoPorUnidadeFisicaH(candidato),
      unidadesFisicasPorMesa: unidadesFisicasPorMesa(candidato, params),
      tempoPorPecaH: tempoPorPecaH(candidato),
      pecasPorMesa: nPorMesa,
      tempoDeMesaCheiaH: tMesa,
      esforcoDeProducaoHporPeca: esforco,
      gramasPorPeca: gramasPorPeca(candidato, params),
      capacidadeDiariaPecas: capacidade,
      mesasPorDia: capacidade / nPorMesa,
      tempoUtilDeImpressaoHporDia: capacidade * esforco,
      ocupacaoDaImpressoraPct: (capacidade * esforco / params.operacao.horasPorDia) * 100,
    },

    preco,
    custoDoMaterial: custo,

    cenarios: {
      pessimista: cenario(preco.bandaInferior),
      central: cenario(preco.media),
      otimista: cenario(preco.bandaSuperior),
    },

    liquido: {
      custo: liquido,
      precoSugeridoLojaPropria: precoSugerido,
      margemLiquidaUnitariaNoPrecoCentral: preco.media - liquido.total,
      lucroLiquidoDiarioNoPrecoCentral: (preco.media - liquido.total) * capacidade,
    },
  };
}

/**
 * Score de "quentura" de um produto.
 *
 * Quatro componentes, todos normalizados contra o melhor do conjunto:
 *
 *  1. lucrabilidade por hora  (R$/h)   - quanto a impressora rende ocupada
 *  2. lucrabilidade diaria    (R$/dia) - quanto o produto rende num dia real
 *  3. folga de maquina                 - penaliza quem so ganha ocupando 24 h/dia
 *  4. demanda validada                 - log10(1 + impressoes no MakerWorld)
 *
 * O componente 4 existe porque os tres primeiros sao 100% derivados de preco e
 * tempo, e preco aqui vem de amostra pequena. "Quantas pessoas ja imprimiram
 * este objeto" e o unico sinal de demanda REVELADA no conjunto de dados, e
 * serve de contrapeso quando dois produtos empatam na matematica de custo.
 * Peso pequeno (15%) de proposito: e sinal de interesse global de makers, nao
 * de disposicao a pagar no Brasil.
 */
export function score(av, maximos, pesos = { hora: 0.40, dia: 0.40, folga: 0.05, demanda: 0.15 }) {
  const nHora = maximos.hora > 0 ? av.cenarios.central.lucrabilidade / maximos.hora : 0;
  const nDia = maximos.dia > 0 ? av.cenarios.central.lucrabilidadeDiaria / maximos.dia : 0;
  const folga = 1 - Math.min(1, av.producao.ocupacaoDaImpressoraPct / 100);
  const nDemanda = maximos.demanda > 0 ? av.demandaValidada / maximos.demanda : 0;
  return pesos.hora * nHora + pesos.dia * nDia + pesos.folga * folga + pesos.demanda * nDemanda;
}

/** log10(1 + impressoes) - demanda revelada, com escala comprimida. */
export function demandaValidada(candidato) {
  const p = candidato.popularidade || {};
  const impressoes = p.impressoes ?? p.downloads ?? 0;
  return Math.log10(1 + impressoes);
}
