// ============================================================================
// ARQUIVO GERADO — NÃO EDITE À MÃO
// Fonte da verdade: data/catalog/selected.json
// Regenerar: node data/tools/sync-site.mjs
// ============================================================================

export type ProductCategory =
  | 'entretenimento'
  | 'tecnologia'
  | 'escritorio'
  | 'bem-estar'
  | 'decoracao'
  | 'life-hacks';

export type ProductMediaType = 'photo' | 'gif' | 'illustration';

export interface ProductMedia {
  type: ProductMediaType;
  src: string;
  label: string;
  filePath: string;
}

export interface ProductFaq {
  q: string;
  a: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  hook: string;
  description: string;
  priceBRL: number;
  price: string;
  marketplacePrices: Record<string, number>;
  material: 'PLA' | 'PETG';
  dimensionsMm: [number, number, number];
  printTimeH: number;
  gramsPerUnit: number;
  bullets: string[];
  faq: ProductFaq[];
  tags: string[];
  license: { code: string; sourceUrl: string; author: string | null };
  image: string;
  media: ProductMedia[];
}

const productMediaFiles = import.meta.glob('/public/images/products/**/*.{png,jpg,jpeg,webp,avif,gif,svg}');

function mediaLabel(fileName: string, index: number): string {
  const base = fileName.replace(/\.[^.]+$/, '');
  if (/placeholder/i.test(base)) return 'Ilustração';
  const numbered = base.match(/(?:foto|photo|image|img)[-_ ]?(\d+)/i);
  if (numbered) return `Foto ${numbered[1]}`;
  return base.replace(/^\d+[-_]/, '').replace(/[-_]+/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()) || `Foto ${index + 1}`;
}

function productMedia(productId: string): ProductMedia[] {
  const folder = `/public/images/products/${productId}/`;
  return Object.keys(productMediaFiles)
    .filter((path) => path.startsWith(folder))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    .map((path, index) => {
      const fileName = path.split('/').pop() ?? `foto-${index + 1}`;
      const lower = fileName.toLowerCase();
      const type: ProductMediaType = lower.endsWith('.gif')
        ? 'gif'
        : lower.endsWith('.svg')
          ? 'illustration'
          : 'photo';
      return {
        type,
        src: path.replace(/^\/public/, ''),
        label: mediaLabel(fileName, index),
        filePath: path.replace(/^\//, ''),
      };
    });
}

export function formatBRL(value: number): string {
  return `R$ ${value.toFixed(2).replace('.', ',')}`;
}

export function getPrimaryProductMedia(product: Product): ProductMedia {
  return product.media[0] ?? {
    type: 'illustration',
    src: product.image,
    label: 'Ilustração',
    filePath: product.image.replace(/^\//, 'public/'),
  };
}

const raw = [
  {
    "id": "cubo-infinito-antiestresse",
    "name": "Cubo Infinito Antiestresse",
    "category": "entretenimento",
    "hook": "Cabe no bolso e some com a ansiedade da reunião.",
    "description": "Um cubo que não para. O Cubo Infinito é formado por oito blocos ligados por dobradiças impressas junto com a peça. Você dobra, ele vira; dobra de novo, ele volta. Não tem começo nem fim, e é exatamente por isso que a mão não larga.",
    "priceBRL": 29.9,
    "marketplacePrices": {
      "mercado-livre": 38.9,
      "shopee": 38.9,
      "nuvemshop": 29.9
    },
    "material": "PLA",
    "dimensionsMm": [
      80,
      40,
      40
    ],
    "printTimeH": 1.64,
    "bullets": [
      "Movimento contínuo: dobra, gira e volta ao ponto de partida sem fim",
      "Peça única impressa em 3D — sai da impressora já montada, sem parafuso, cola ou ímã",
      "8 cm aberto / 4 cm fechado — cabe no bolso, na mochila e na gaveta da mesa",
      "PLA de origem vegetal, leve e resistente ao uso diário",
      "Ideal para foco em reunião, estudo, home office e para quem tem mania de mexer nas mãos"
    ],
    "faq": [
      {
        "q": "Vem montado?",
        "a": "Sim. A peça sai inteira da impressora, com as dobradiças já formadas. Não há nada para encaixar."
      },
      {
        "q": "Faz barulho?",
        "a": "Muito pouco. É plástico contra plástico, mais silencioso que um fidget com rolamento."
      },
      {
        "q": "Serve para criança?",
        "a": "A partir de 3 anos, com supervisão. Não há peça solta que possa ser engolida."
      }
    ],
    "tags": [
      "Antiestresse",
      "Fidget",
      "Presente",
      "Escritório",
      "Print-in-place"
    ],
    "license": {
      "code": "CC0",
      "sourceUrl": "https://makerworld.com/en/models/21188-sturdy-infinity-cube",
      "author": "waveman"
    },
    "gramsPerUnit": 33
  },
  {
    "id": "suporte-notebook-ergonomico",
    "name": "Suporte Ergonômico para Notebook (par)",
    "category": "tecnologia",
    "hook": "Levanta a tela, endireita o pescoço, esfria a máquina.",
    "description": "O jeito mais barato de parar de olhar para baixo o dia inteiro. Notebook em cima da mesa deixa a tela abaixo da linha dos olhos. O pescoço compensa. Depois de algumas horas, dói.",
    "priceBRL": 59.9,
    "marketplacePrices": {
      "mercado-livre": 71.9,
      "shopee": 71.9,
      "nuvemshop": 59.9
    },
    "material": "PETG",
    "dimensionsMm": [
      150,
      85,
      60
    ],
    "printTimeH": 1.55,
    "bullets": [
      "Par de apoios que eleva o notebook e melhora o ângulo da tela e do teclado",
      "Abre espaço de ar embaixo da máquina — o cooler respira e a base esquenta menos",
      "PETG: mais resistente ao calor que o PLA comum, feito para ficar embaixo de uma máquina quente",
      "Encaixe seco entre as duas metades para virar um bloco único e caber na mochila",
      "Serve em notebooks de 13 a 17 polegadas"
    ],
    "faq": [
      {
        "q": "Escorrega na mesa?",
        "a": "A base tem área de contato larga e o PETG tem atrito alto. Em vidro liso, um quadradinho de fita dupla-face resolve."
      },
      {
        "q": "Aguenta notebook pesado?",
        "a": "Sim. O par foi dimensionado para máquinas de até 3 kg."
      },
      {
        "q": "Vem montado?",
        "a": "São duas peças independentes, uma para cada lado. Não há montagem."
      }
    ],
    "tags": [
      "Ergonomia",
      "Home Office",
      "Notebook",
      "PETG"
    ],
    "license": {
      "code": "CC0",
      "sourceUrl": "https://makerworld.com/en/models/2058192-gaming-laptop-stand",
      "author": "AIZAWA.MOLD"
    },
    "gramsPerUnit": 29
  },
  {
    "id": "organizador-marca-texto",
    "name": "Organizador de Marca-Texto 8 Lugares",
    "category": "escritorio",
    "hook": "Oito marca-textos, oito lugares, zero garimpo na gaveta.",
    "description": "Quem estuda com marca-texto sabe: a cor que você quer é sempre a que sumiu. Este organizador resolve isso deixando os oito marcadores em pé, inclinados para trás, com a ponta colorida virada para você. Bate o olho, vê a cor, pega. Sem revirar estojo.",
    "priceBRL": 39.9,
    "marketplacePrices": {
      "mercado-livre": 45.9,
      "shopee": 45.9,
      "nuvemshop": 39.9
    },
    "material": "PLA",
    "dimensionsMm": [
      130,
      55,
      45
    ],
    "printTimeH": 0.92,
    "bullets": [
      "Oito nichos inclinados, um para cada marca-texto — a ponta colorida fica sempre à vista",
      "Encaixe pensado para marcadores tipo chanfrado (Stabilo Boss e similares)",
      "Peça única: não tem tampa, mola nem parafuso para quebrar",
      "Base larga, não tomba quando você puxa uma caneta com pressa",
      "13 cm de frente por 5,5 cm de profundidade — cabe entre o monitor e o teclado"
    ],
    "faq": [
      {
        "q": "Serve para caneta comum?",
        "a": "Serve, mas os nichos foram dimensionados para o corpo chanfrado do marca-texto. Caneta fina fica com folga."
      },
      {
        "q": "Acompanha os marcadores?",
        "a": "Não. O produto é apenas o organizador."
      },
      {
        "q": "Dá para lavar?",
        "a": "Pano úmido resolve. Não vai à máquina de lavar louças."
      }
    ],
    "tags": [
      "Escritório",
      "Organização",
      "Estudo",
      "Home Office"
    ],
    "license": {
      "code": "CC0",
      "sourceUrl": "https://makerworld.com/en/models/841705-stabilo-boss-textmarker-holder",
      "author": "fried_fry"
    },
    "gramsPerUnit": 17
  },
  {
    "id": "saboneteira-drenante",
    "name": "Saboneteira Drenante Seca-Sabonete",
    "category": "bem-estar",
    "hook": "Sabonete parado na água vira gosma. Aqui a água vai embora.",
    "description": "O sabonete não derrete de tanto usar. Derrete de ficar parado na água. Toda saboneteira comum vira uma pocinha. A barra fica de molho, amolece pelas bordas e some na metade do tempo. Este modelo resolve pela geometria: o piso é inclinado e vazado, com canaleta de saída na frente. A água que escorre do sabonete não fica — vai embora.",
    "priceBRL": 29.9,
    "marketplacePrices": {
      "mercado-livre": 35.9,
      "shopee": 35.9,
      "nuvemshop": 29.9
    },
    "material": "PETG",
    "dimensionsMm": [
      110,
      80,
      25
    ],
    "printTimeH": 1.27,
    "bullets": [
      "Fundo inclinado com canaleta: a água escorre para fora em vez de empoçar sob o sabonete",
      "Sabonete seca entre um banho e outro — dura visivelmente mais",
      "PETG: não amarela nem incha com umidade constante como plástico comum",
      "Superfície vazada, fácil de enxaguar — não acumula limo no fundo",
      "Serve para sabonete em barra e para shampoo em barra"
    ],
    "faq": [
      {
        "q": "A água escorre para onde?",
        "a": "Para a frente da peça, pela canaleta. O ideal é apoiar na borda da pia ou dentro do box, com a canaleta virada para o ralo."
      },
      {
        "q": "Cabe shampoo em barra?",
        "a": "Cabe. A área útil comporta barras de até 9 x 6 cm."
      },
      {
        "q": "Escorrega no azulejo molhado?",
        "a": "PETG tem atrito razoável em superfície molhada. Em azulejo muito liso, use um pedaço de fita dupla-face resistente à água."
      }
    ],
    "tags": [
      "Banheiro",
      "Bem-estar",
      "Utilidade",
      "PETG"
    ],
    "license": {
      "code": "CC0",
      "sourceUrl": "https://makerworld.com/en/models/1530752-soap-dish-always-dry-soap",
      "author": "nao identificado na pagina"
    },
    "gramsPerUnit": 24
  },
  {
    "id": "mini-cachorro-dormindo",
    "name": "Mini Cachorro Dormindo",
    "category": "decoracao",
    "hook": "Um cachorrinho dormindo em cima do monitor. Só isso. E funciona.",
    "description": "Tem coisa que não precisa de justificativa. É um cachorro pequeno, enrolado, dormindo. Cinco centímetros e meio. Fica em cima do monitor, na borda da prateleira, no console do carro, na mesinha ao lado da cama. Não ocupa espaço e sempre arranca comentário de quem vê.",
    "priceBRL": 29.9,
    "marketplacePrices": {
      "mercado-livre": 37.9,
      "shopee": 37.9,
      "nuvemshop": 29.9
    },
    "material": "PLA",
    "dimensionsMm": [
      55,
      40,
      25
    ],
    "printTimeH": 0.43,
    "bullets": [
      "Miniatura de 5,5 cm de um cachorro enrolado dormindo",
      "Cabe em qualquer canto: monitor, prateleira, mesa de cabeceira, painel do carro",
      "Peça única impressa em 3D — sem cola, sem emenda, sem pintura que descasca",
      "Impressa sob demanda na cor que você escolher",
      "Presente barato que não parece barato"
    ],
    "faq": [
      {
        "q": "É oco ou maciço?",
        "a": "Impresso com preenchimento interno, não é oco nem totalmente sólido. Fica leve e resistente."
      },
      {
        "q": "Dá para pintar?",
        "a": "Dá. PLA aceita tinta acrílica e spray para plástico depois de uma lixada leve."
      },
      {
        "q": "Tem em outras cores?",
        "a": "Sim — a cor é escolhida no pedido. Consulte as disponíveis no momento."
      }
    ],
    "tags": [
      "Decoração",
      "Miniatura",
      "Presente",
      "Pet"
    ],
    "license": {
      "code": "CC0",
      "sourceUrl": "https://makerworld.com/en/models/1384845-a-cute-sleepy-puppy",
      "author": "Smart3d"
    },
    "gramsPerUnit": 8
  },
  {
    "id": "kit-10-apitos-emergencia",
    "name": "Kit 10 Apitos de Emergência",
    "category": "life-hacks",
    "hook": "Dez apitos por menos que o preço de um. Um em cada mochila.",
    "description": "Apito é daqueles itens que só faz falta uma vez — e nessa vez faz muita falta. Este kit traz dez unidades porque a lógica é essa: não adianta ter um apito guardado na gaveta. Adianta ter um preso na mochila de trilha, um no chaveiro, um no estojo de primeiros socorros do carro, um na bolsa da criança.",
    "priceBRL": 24.9,
    "marketplacePrices": {
      "mercado-livre": 32.9,
      "shopee": 32.9,
      "nuvemshop": 24.9
    },
    "material": "PLA",
    "dimensionsMm": [
      45,
      15,
      10
    ],
    "printTimeH": 0.51,
    "bullets": [
      "Kit com 10 apitos — um para cada mochila, chaveiro, estojo de primeiros socorros e bolso de jaqueta",
      "1 grama cada: você esquece que está carregando até precisar",
      "Sopro seco e agudo, sem esfera interna que trava ou enferruja",
      "Peça única impressa em 3D, sem parte móvel e sem metal",
      "Uso comum: trilha, camping, escola, professor de educação física, brinde de evento, kit de emergência"
    ],
    "faq": [
      {
        "q": "Apita alto mesmo?",
        "a": "É um apito de sopro direto, sem esfera. O som é agudo e seco, feito para chamar atenção a curta e média distância."
      },
      {
        "q": "Posso escolher as cores?",
        "a": "Pode. O padrão é cores sortidas; cor única sob combinação."
      },
      {
        "q": "Serve para arbitragem esportiva?",
        "a": "Serve para uso escolar e recreativo. Para arbitragem profissional, prefira apito homologado pela federação."
      }
    ],
    "tags": [
      "Segurança",
      "Trilha",
      "Escola",
      "Kit"
    ],
    "license": {
      "code": "CC0",
      "sourceUrl": "https://makerworld.com/en/models/2322874-penne-2-0-public-domain-safety-whistle-cc0",
      "author": "nao identificado na pagina"
    },
    "gramsPerUnit": 10
  }
] as const;

export const products: Product[] = raw.map((p) => ({
  ...p,
  dimensionsMm: p.dimensionsMm as unknown as [number, number, number],
  material: p.material as 'PLA' | 'PETG',
  category: p.category as ProductCategory,
  marketplacePrices: { ...p.marketplacePrices },
  bullets: [...p.bullets],
  tags: [...p.tags],
  faq: p.faq.map((f) => ({ ...f })),
  license: { ...p.license },
  price: formatBRL(p.priceBRL),
  image: `/images/products/${p.id}/00-placeholder.svg`,
  media: productMedia(p.id),
}));

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  'entretenimento': 'Entretenimento',
  'tecnologia': 'Tecnologia',
  'escritorio': 'Escritório',
  'bem-estar': 'Bem-estar',
  'decoracao': 'Decoração',
  'life-hacks': 'Life Hacks',
};
