import { Layers, Zap, Settings, MessageSquare } from 'lucide-react';
import { useLang } from '@/contexts/LangContext';

export function ValueProps() {
  const { t } = useLang();

  const cards = [
    {
      icon: Layers,
      titleKey: 'vp_made_to_order_title' as const,
      bodyKey: 'vp_made_to_order_body' as const,
      accentColor: '#F97316',
    },
    {
      icon: Zap,
      titleKey: 'vp_fast_iteration_title' as const,
      bodyKey: 'vp_fast_iteration_body' as const,
      accentColor: '#22D3EE',
    },
    {
      icon: Settings,
      titleKey: 'vp_functional_title' as const,
      bodyKey: 'vp_functional_body' as const,
      accentColor: '#F97316',
    },
    {
      icon: MessageSquare,
      titleKey: 'vp_direct_custom_title' as const,
      bodyKey: 'vp_direct_custom_body' as const,
      accentColor: '#22D3EE',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#0B0F14' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.titleKey}
                className="relative p-6 rounded-xl border group transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: '#1E293B',
                  borderColor: 'rgba(148,163,184,0.1)',
                }}
              >
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${card.accentColor}08, transparent)`,
                  }}
                />
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${card.accentColor}18` }}
                >
                  <Icon className="w-5 h-5" style={{ color: card.accentColor }} />
                </div>
                <h3
                  className="text-base font-semibold mb-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}
                >
                  {t(card.titleKey)}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>
                  {t(card.bodyKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
