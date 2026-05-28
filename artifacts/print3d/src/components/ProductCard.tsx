import { ShoppingCart, MessageCircle, Layers } from 'lucide-react';
import { Product } from '@/data/products';
import { useLang } from '@/contexts/LangContext';
import { useCart } from '@/contexts/CartContext';
import { generateWhatsAppProductLink } from '@/utils/orderMessage';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { lang, t } = useLang();
  const { addItem } = useCart();

  const name = lang === 'en' ? product.nameEn : product.namePt;
  const description = lang === 'en' ? product.descriptionEn : product.descriptionPt;
  const delivery = lang === 'en' ? product.deliveryEn : product.deliveryPt;
  const tags = lang === 'en' ? product.tagsEn : product.tagsPt;

  const categoryLabel: Record<Product['category'], { en: string; pt: string }> = {
    gadgets: { en: 'Gadgets', pt: 'Gadgets' },
    'car-parts': { en: 'Car Parts', pt: 'Peças Auto' },
    figures: { en: 'Figures', pt: 'Miniaturas' },
    decorations: { en: 'Decorations', pt: 'Decorações' },
    prototypes: { en: 'Prototypes', pt: 'Protótipos' },
    custom: { en: 'Custom', pt: 'Personalizado' },
  };

  const catLabel = categoryLabel[product.category][lang];
  const whatsappLink = generateWhatsAppProductLink(product, lang);

  return (
    <div
      className="flex flex-col rounded-xl border overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{
        backgroundColor: '#1E293B',
        borderColor: 'rgba(148,163,184,0.1)',
        boxShadow: '0 0 0 0 transparent',
      }}
      data-testid={`card-product-${product.id}`}
    >
      <div
        className="relative h-44 flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${product.gradientFrom}, ${product.gradientTo})`,
        }}
      >
        <Layers
          className="w-14 h-14 transition-transform duration-500 group-hover:scale-110"
          style={{ color: 'rgba(148,163,184,0.25)' }}
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.06), transparent)' }}
        />
        <div
          className="absolute top-3 right-3 px-2 py-0.5 rounded text-xs font-semibold"
          style={{ backgroundColor: 'rgba(30,41,59,0.9)', color: '#22D3EE', border: '1px solid rgba(34,211,238,0.2)' }}
        >
          {product.material}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full mb-1.5 inline-block"
              style={{ backgroundColor: 'rgba(249,115,22,0.12)', color: '#F97316' }}
            >
              {catLabel}
            </span>
            <h3
              className="text-sm font-semibold leading-snug"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}
              data-testid={`text-product-name-${product.id}`}
            >
              {name}
            </h3>
          </div>
          <span
            className="text-base font-bold whitespace-nowrap shrink-0"
            style={{ color: '#F97316' }}
            data-testid={`text-price-${product.id}`}
          >
            {product.price}
          </span>
        </div>

        <p className="text-xs leading-relaxed flex-1" style={{ color: '#94A3B8' }}>
          {description}
        </p>

        <div className="flex flex-wrap gap-2 text-xs" style={{ color: '#CBD5E1' }}>
          <span style={{ color: '#94A3B8' }}>
            {lang === 'en' ? 'Delivery:' : 'Prazo:'}{' '}
            <span style={{ color: '#CBD5E1' }}>{delivery}</span>
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full border"
              style={{
                borderColor: 'rgba(148,163,184,0.2)',
                color: '#94A3B8',
                backgroundColor: 'rgba(148,163,184,0.05)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-2 pt-1">
          <button
            onClick={() => addItem(product)}
            data-testid={`button-add-to-cart-${product.id}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition-all hover:opacity-90 active:scale-95"
            style={{ backgroundColor: '#F97316', color: '#0B0F14' }}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            {t('btn_add_to_cart')}
          </button>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`link-ask-item-${product.id}`}
            className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all hover:bg-white/10 border"
            style={{ borderColor: 'rgba(34,211,238,0.3)', color: '#22D3EE' }}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            {t('btn_ask_item')}
          </a>
        </div>
      </div>
    </div>
  );
}
