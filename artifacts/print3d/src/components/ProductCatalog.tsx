import { useState } from 'react';
import { products, Product, CATEGORY_LABELS } from '@/data/products';
import { ProductCard } from './ProductCard';
import { useLang } from '@/contexts/LangContext';

type FilterCategory = 'all' | Product['category'];

export function ProductCatalog() {
  const { t } = useLang();
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const categories = Array.from(new Set(products.map((p) => p.category)));
  const filters: { key: FilterCategory; label: string }[] = [
    { key: 'all', label: t('filter_all') },
    ...categories.map((c) => ({ key: c as FilterCategory, label: CATEGORY_LABELS[c] })),
  ];

  const filtered = activeFilter === 'all' ? products : products.filter((p) => p.category === activeFilter);

  return (
    <section id="catalog" className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#0B0F14' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4">
          <div>
            <div className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: '#22D3EE' }}>
              — {t('catalog_kicker')}
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC', letterSpacing: '-0.02em' }}
            >
              {t('catalog_heading')}
            </h2>
          </div>
          <p className="text-sm font-mono shrink-0" style={{ color: '#64748B' }}>
            {filtered.length.toString().padStart(2, '0')}/{products.length.toString().padStart(2, '0')}{' '}
            {t('catalog_items_label')}
          </p>
        </div>

        <p className="text-sm max-w-2xl leading-relaxed mb-10" style={{ color: '#94A3B8' }}>
          {t('catalog_sub')}
        </p>

        <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filtros de categoria">
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
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
