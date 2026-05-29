export type ProductCategory = 'decoracao' | 'ergonomia' | 'gamer' | 'organizacao' | 'acessorios';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: string;
  image: string;
  tags: string[];
}

export const products: Product[] = [
  {
    id: 'aviao-embraer-c390-5cm',
    name: 'Avião Embraer C-390 5 cm',
    category: 'decoracao',
    description:
      'Miniatura decorativa do Embraer C-390 impressa em 3D, ideal para mesa, estante, coleção ou presente para quem gosta de aviação, engenharia e tecnologia.',
    price: 'R$ 15,00',
    image: '/images/products/aviao-embraer-c390-5cm-placeholder.png',
    tags: ['Decoração', 'Aviação', 'Miniatura', 'Presente'],
  },
  {
    id: 'suporte-decorativo-aviao',
    name: 'Suporte decorativo para avião',
    category: 'decoracao',
    description:
      'Base decorativa para exposição da miniatura do C-390. Deixa a peça mais bonita, organizada e com aparência mais profissional.',
    price: 'R$ 10,00',
    image: '/images/products/suporte-decorativo-aviao-placeholder.png',
    tags: ['Decoração', 'Suporte', 'Acessório'],
  },
  {
    id: 'kit-aviao-c390-suporte',
    name: 'Kit Avião Embraer C-390 + suporte',
    category: 'decoracao',
    description:
      'Kit decorativo com miniatura do Embraer C-390 e suporte de exposição. Ideal para decorar setups, escritórios, mesas e estantes.',
    price: 'R$ 25,00',
    image: '/images/products/kit-aviao-c390-suporte-placeholder.png',
    tags: ['Kit', 'Decoração', 'Aviação', 'Presente'],
  },
  {
    id: 'suporte-ergonomico-notebook',
    name: 'Suporte ergonômico para notebook',
    category: 'ergonomia',
    description:
      'Suporte compacto para notebook, pensado para melhorar a inclinação do aparelho e deixar o uso mais confortável no trabalho, estudo ou home office.',
    price: 'R$ 45,00',
    image: '/images/products/suporte-ergonomico-notebook-placeholder.png',
    tags: ['Ergonomia', 'Notebook', 'Escritório', 'Home Office'],
  },
  {
    id: 'suportes-joycon-nintendo-switch',
    name: 'Par de suportes Joy-Con Nintendo Switch',
    category: 'gamer',
    description:
      'Par de suportes ergonômicos para Joy-Con do Nintendo Switch. Melhora a pegada e deixa o uso dos controles mais confortável.',
    price: 'R$ 45,00',
    image: '/images/products/suportes-joycon-nintendo-switch-placeholder.png',
    tags: ['Gamer', 'Nintendo Switch', 'Joy-Con', 'Acessório'],
  },
  {
    id: 'suporte-celular-2-em-1',
    name: 'Suporte 2 em 1 para celular',
    category: 'acessorios',
    description:
      'Suporte versátil para celular, que pode ser usado normalmente sobre a mesa ou pendurado de ponta cabeça em uma superfície plana.',
    price: 'R$ 30,00',
    image: '/images/products/suporte-celular-2-em-1-placeholder.png',
    tags: ['Celular', 'Organização', 'Acessório', 'Mesa'],
  },
  {
    id: 'estojo-viagem-cilindrico-textura',
    name: 'Estojo de viagem cilíndrico com textura',
    category: 'organizacao',
    description:
      'Estojo cilíndrico texturizado para organizar pequenos objetos, acessórios, cabos e itens do dia a dia.',
    price: 'R$ 35,00',
    image: '/images/products/estojo-viagem-cilindrico-textura-placeholder.png',
    tags: ['Viagem', 'Organização', 'Estojo', 'Acessórios'],
  },
  {
    id: 'porta-caneta-cerebro',
    name: 'Porta-caneta em formato de cérebro',
    category: 'decoracao',
    description:
      'Porta-caneta criativo em formato de cérebro, perfeito para organizar a mesa com um visual diferente e funcional.',
    price: 'R$ 35,00',
    image: '/images/products/porta-caneta-cerebro-placeholder.png',
    tags: ['Escritório', 'Organização', 'Decoração', 'Criativo'],
  },
  {
    id: 'porta-caneta-3-subdivisoes',
    name: 'Porta-caneta com 3 subdivisões',
    category: 'organizacao',
    description:
      'Porta-caneta básico com três divisórias, ideal para organizar canetas, lápis, marcadores e pequenos itens de escritório.',
    price: 'R$ 30,00',
    image: '/images/products/porta-caneta-3-subdivisoes-placeholder.png',
    tags: ['Escritório', 'Organização', 'Porta-caneta', 'Home Office'],
  },
];
