import { useState } from 'react';
import { ChevronDown, PlusCircle } from 'lucide-react';
import { Product, CATEGORY_LABELS, formatBRL } from '@/data/products';
import { useLang } from '@/contexts/LangContext';
import { useCart } from '@/contexts/CartContext';
import { ProductMediaCarousel } from './ProductMediaCarousel';

interface ProductCardProps {
  product: Product;
}

const MARKETPLACE_LABELS: Record<string, string> = {
  'mercado-livre': 'Mercado Livre',
  shopee: 'Shopee',
};

export function ProductCard({ product }: ProductCardProps) {
  const { t } = useLang();
  const { addItem } = useCart();
  const [open, setOpen] = useState(false);

  const marketplaces = Object.entries(product.marketplacePrices).filter(
    ([canal]) => canal in MARKETPLACE_LABELS
  );

  return (
    <article
      className="group flex flex-col rounded-xl border overflow-hidden transition-all duration-300"
      style={{ backgroundColor: '#1E293B', borderColor: 'rgba(148,163,184,0.1)' }}
      data-testid={`card-product-${product.id}`}
    >
      {/* Bloco de imagem */}
      <div
        className="relative h-44 flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)' }}
      >
        <ProductMediaCarousel product={product} />
        <div className="pointer-events-none absolute left-2.5 top-2.5 z-30">
          <span
            className="rounded px-2 py-0.5 text-xs font-semibold tracking-wide"
            style={{
              backgroundColor: 'rgba(11,15,20,0.85)',
              color: '#F97316',
              border: '1px solid rgba(249,115,22,0.2)',
              backdropFilter: 'blur(4px)',
            }}
          >
            {CATEGORY_LABELS[product.category]}
          </span>
        </div>
        <div className="pointer-events-none absolute right-2.5 top-2.5 z-30">
          <span
            className="rounded px-2 py-0.5 text-xs font-mono font-semibold"
            style={{
              backgroundColor: 'rgba(11,15,20,0.85)',
              color: '#22D3EE',
              border: '1px solid rgba(34,211,238,0.2)',
              backdropFilter: 'blur(4px)',
            }}
          >
            {product.material}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4 gap-3">
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

        <p className="text-xs font-medium leading-relaxed" style={{ color: '#22D3EE' }}>
          {product.hook}
        </p>

        <ul className="flex flex-col gap-1.5 flex-1">
          {product.bullets.slice(0, 3).map((b) => (
            <li key={b} className="flex gap-1.5 text-xs leading-relaxed" style={{ color: '#94A3B8' }}>
              <span style={{ color: '#F97316' }} aria-hidden>
                ·
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {marketplaces.length > 0 && (
          <p className="text-xs" style={{ color: '#475569' }}>
            {t('label_marketplace_note')}{' '}
            {marketplaces.map(([canal, valor], i) => (
              <span key={canal}>
                {i > 0 && ' · '}
                {MARKETPLACE_LABELS[canal]} {formatBRL(valor)}
              </span>
            ))}
          </p>
        )}

        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          data-testid={`button-details-${product.id}`}
          className="flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          style={{ borderColor: 'rgba(148,163,184,0.18)', color: '#CBD5E1' }}
        >
          {open ? t('btn_details_close') : t('btn_details')}
          <ChevronDown
            className="h-3.5 w-3.5 transition-transform"
            style={{ transform: open ? 'rotate(180deg)' : 'none' }}
          />
        </button>

        {open && (
          <div className="flex flex-col gap-3 rounded-lg border p-3" style={{ borderColor: 'rgba(148,163,184,0.12)', backgroundColor: 'rgba(11,15,20,0.45)' }}>
            <p className="text-xs leading-relaxed whitespace-pre-line" style={{ color: '#94A3B8' }}>
              {product.description}
            </p>

            <dl className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
              <div>
                <dt style={{ color: '#475569' }}>{t('label_material')}</dt>
                <dd style={{ color: '#CBD5E1' }}>{product.material}</dd>
              </div>
              <div>
                <dt style={{ color: '#475569' }}>{t('label_size')}</dt>
                <dd style={{ color: '#CBD5E1' }}>{product.dimensionsMm.join(' × ')} mm</dd>
              </div>
              <div>
                <dt style={{ color: '#475569' }}>{t('label_weight')}</dt>
                <dd style={{ color: '#CBD5E1' }}>~{product.gramsPerUnit} g</dd>
              </div>
              <div>
                <dt style={{ color: '#475569' }}>{t('label_time')}</dt>
                <dd style={{ color: '#CBD5E1' }}>
                  ~{product.printTimeH.toString().replace('.', ',')} h
                </dd>
              </div>
            </dl>

            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold" style={{ color: '#CBD5E1' }}>
                {t('label_faq')}
              </p>
              {product.faq.map((f) => (
                <div key={f.q}>
                  <p className="text-xs font-medium" style={{ color: '#94A3B8' }}>
                    {f.q}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: '#64748B' }}>
                    {f.a}
                  </p>
                </div>
              ))}
            </div>

          </div>
        )}

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
    </article>
  );
}
