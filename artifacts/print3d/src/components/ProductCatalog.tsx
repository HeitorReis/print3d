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

  const filtered = activeFilter === 'all'
    ? products
    : products.filter((p) => p.category === activeFilter);

  return (
    <section id="catalog" className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#0B0F14' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <div
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: '#22D3EE' }}
          >
            — {t('nav_products')}
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}
          >
            {t('filter_all')} Products
          </h2>
        </div>

        <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Category filters">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              data-testid={`filter-${f.key}`}
              className="px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 border"
              style={{
                backgroundColor: activeFilter === f.key ? '#F97316' : 'transparent',
                color: activeFilter === f.key ? '#0B0F14' : '#CBD5E1',
                borderColor: activeFilter === f.key ? '#F97316' : 'rgba(148,163,184,0.2)',
              }}
            >
              {t(f.labelKey)}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20" style={{ color: '#94A3B8' }}>
            No products found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
