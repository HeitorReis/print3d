import { PlusCircle } from 'lucide-react';
import { Product } from '@/data/products';
import { useLang } from '@/contexts/LangContext';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const CATEGORY_LABELS: Record<Product['category'], string> = {
  decoracao: 'Decoração',
  ergonomia: 'Ergonomia',
  gamer: 'Gamer',
  organizacao: 'Organização',
  acessorios: 'Acessórios',
};

function getPublicImageUrl(path: string): string {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;
}

export function ProductCard({ product }: ProductCardProps) {
  const { t } = useLang();
  const { addItem } = useCart();

  const catLabel = CATEGORY_LABELS[product.category];
  const imageUrl = getPublicImageUrl(product.image);

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
        style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)' }}
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
        <img
          src={imageUrl}
          alt={product.name}
          className="relative z-10 h-full w-full object-contain p-5 transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Hover orange tint */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.1), transparent)' }}
        />
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
            {product.name}
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
          {product.description}
        </p>

        {/* Technical tags */}
        <div className="flex flex-wrap gap-1.5">
          {product.tags.map((tag) => (
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
