import { Clock, Layers, PlusCircle } from 'lucide-react';
import { Product } from '@/data/products';
import { useLang } from '@/contexts/LangContext';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const CATEGORY_LABELS: Record<Product['category'], { en: string; pt: string }> = {
  gadgets: { en: 'Gadgets', pt: 'Gadgets' },
  'car-parts': { en: 'Car Parts', pt: 'Peças Auto' },
  figures: { en: 'Figures', pt: 'Miniaturas' },
  decorations: { en: 'Decorations', pt: 'Decorações' },
  prototypes: { en: 'Prototypes', pt: 'Protótipos' },
  custom: { en: 'Custom', pt: 'Personalizado' },
};

export function ProductCard({ product }: ProductCardProps) {
  const { lang, t } = useLang();
  const { addItem } = useCart();

  const name = lang === 'en' ? product.nameEn : product.namePt;
  const description = lang === 'en' ? product.descriptionEn : product.descriptionPt;
  const delivery = lang === 'en' ? product.deliveryEn : product.deliveryPt;
  const tags = lang === 'en' ? product.tagsEn : product.tagsPt;

  const catLabel = CATEGORY_LABELS[product.category][lang];

  return (
    <article
      className="group flex flex-col rounded-xl border overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
      style={{
        backgroundColor: '#1E293B',
        borderColor: 'rgba(148,163,184,0.1)',
        boxShadow: '0 0 0 0 transparent',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(249,115,22,0.3)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(249,115,22,0.08)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(148,163,184,0.1)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 0 transparent';
      }}
      data-testid={`card-product-${product.id}`}
    >
      {/* Image block */}
      <div
        className="relative h-44 flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${product.gradientFrom}, ${product.gradientTo})` }}
      >
        {/* Abstract layer pattern overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 8px,
              rgba(255,255,255,0.025) 8px,
              rgba(255,255,255,0.025) 9px
            )`,
          }}
        />
        <Layers
          className="w-12 h-12 transition-transform duration-500 group-hover:scale-110 relative z-10"
          style={{ color: 'rgba(248,250,252,0.18)' }}
        />
        {/* Hover orange tint */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.1), transparent)' }}
        />
        {/* Material badge */}
        <div
          className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-xs font-semibold tracking-wide"
          style={{
            backgroundColor: 'rgba(11,15,20,0.85)',
            color: '#22D3EE',
            border: '1px solid rgba(34,211,238,0.2)',
            backdropFilter: 'blur(4px)',
          }}
        >
          {product.material}
        </div>
        {/* Category badge */}
        <div
          className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-xs font-semibold tracking-wide"
          style={{
            backgroundColor: 'rgba(11,15,20,0.85)',
            color: '#F97316',
            border: '1px solid rgba(249,115,22,0.2)',
            backdropFilter: 'blur(4px)',
          }}
        >
          {catLabel}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Name + Price */}
        <div className="flex items-start justify-between gap-2">
          <h3
            className="text-sm font-semibold leading-snug"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}
            data-testid={`text-product-name-${product.id}`}
          >
            {name}
          </h3>
          <span
            className="text-base font-bold whitespace-nowrap shrink-0 tabular-nums"
            style={{ color: '#F97316' }}
            data-testid={`text-price-${product.id}`}
          >
            {product.price}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs leading-relaxed flex-1" style={{ color: '#94A3B8', lineHeight: '1.6' }}>
          {description}
        </p>

        {/* Delivery row */}
        <div className="flex items-center gap-1.5 text-xs" style={{ color: '#64748B' }}>
          <Clock className="w-3 h-3 shrink-0" style={{ color: '#22D3EE' }} />
          <span>
            {lang === 'en' ? 'Est. delivery:' : 'Prazo:'}{' '}
            <span style={{ color: '#CBD5E1' }}>{delivery}</span>
          </span>
        </div>

        {/* Technical tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded border"
              style={{
                borderColor: 'rgba(34,211,238,0.12)',
                color: '#64748B',
                backgroundColor: 'rgba(34,211,238,0.04)',
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="pt-0.5">
          <button
            onClick={() => addItem(product)}
            data-testid={`button-add-to-quote-${product.id}`}
            className="flex w-full items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 hover:brightness-110 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            style={{ backgroundColor: '#F97316', color: '#0B0F14' }}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            {t('btn_add_to_cart')}
          </button>
        </div>
      </div>
    </article>
  );
}
