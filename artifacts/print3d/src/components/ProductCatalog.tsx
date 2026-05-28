import { useState } from 'react';
import { products, Product } from '@/data/products';
import { ProductCard } from './ProductCard';
import { useLang } from '@/contexts/LangContext';
import { translations } from '@/i18n';

type FilterCategory = 'all' | Product['category'];
type TranslationKey = keyof typeof translations.en;

export function ProductCatalog() {
  const { t } = useLang();
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const filters: { key: FilterCategory; labelKey: TranslationKey }[] = [
    { key: 'all', labelKey: 'filter_all' },
    { key: 'figures', labelKey: 'filter_figures' },
    { key: 'gadgets', labelKey: 'filter_gadgets' },
    { key: 'car-parts', labelKey: 'filter_car_parts' },
    { key: 'decorations', labelKey: 'filter_decorations' },
    { key: 'prototypes', labelKey: 'filter_prototypes' },
    { key: 'custom', labelKey: 'filter_custom' },
  ];

  const filtered =
    activeFilter === 'all' ? products : products.filter((p) => p.category === activeFilter);

  return (
    <section id="catalog" className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#0B0F14' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <div
              className="text-xs font-semibold tracking-widest uppercase mb-2"
              style={{ color: '#22D3EE' }}
            >
              — {t('nav_products')}
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC', letterSpacing: '-0.02em' }}
            >
              {t('catalog_heading')}
            </h2>
          </div>
          <p
            className="text-sm font-mono shrink-0"
            style={{ color: '#64748B' }}
          >
            {filtered.length.toString().padStart(2, '0')}/{products.length.toString().padStart(2, '0')}{' '}
            {t('catalog_items_label')}
          </p>
        </div>

        {/* Filters */}
        <div
          className="flex flex-wrap gap-2 mb-10"
          role="group"
          aria-label="Category filters"
        >
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              data-testid={`filter-${f.key}`}
              className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
              style={{
                backgroundColor: activeFilter === f.key ? '#F97316' : 'transparent',
                color: activeFilter === f.key ? '#0B0F14' : '#94A3B8',
                borderColor: activeFilter === f.key ? '#F97316' : 'rgba(148,163,184,0.18)',
              }}
              aria-pressed={activeFilter === f.key}
            >
              {t(f.labelKey)}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20" style={{ color: '#64748B' }}>
            No products found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
