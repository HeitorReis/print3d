import { Layers, Zap, Cpu, MessageSquare, DollarSign } from 'lucide-react';
import { useLang } from '@/contexts/LangContext';

export function ValueProps() {
  const { t } = useLang();

  const cards = [
    {
      icon: Layers,
      titleKey: 'vp_made_to_order_title' as const,
      bodyKey: 'vp_made_to_order_body' as const,
      accent: '#F97316',
      index: '01',
    },
    {
      icon: Zap,
      titleKey: 'vp_fast_iteration_title' as const,
      bodyKey: 'vp_fast_iteration_body' as const,
      accent: '#22D3EE',
      index: '02',
    },
    {
      icon: Cpu,
      titleKey: 'vp_functional_title' as const,
      bodyKey: 'vp_functional_body' as const,
      accent: '#F97316',
      index: '03',
    },
    {
      icon: MessageSquare,
      titleKey: 'vp_direct_custom_title' as const,
      bodyKey: 'vp_direct_custom_body' as const,
      accent: '#22D3EE',
      index: '04',
    },
    {
      icon: DollarSign,
      titleKey: 'vp_transparent_title' as const,
      bodyKey: 'vp_transparent_body' as const,
      accent: '#F97316',
      index: '05',
    },
  ] as const;

  return (
    <section
      className="py-16 px-4 sm:px-6 lg:px-8 border-y"
      style={{ backgroundColor: '#0B0F14', borderColor: 'rgba(148,163,184,0.07)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.titleKey}
                className="relative p-5 rounded-xl border group transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: '#1E293B',
                  borderColor: 'rgba(148,163,184,0.1)',
                }}
              >
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `linear-gradient(135deg, ${card.accent}07, transparent)` }}
                />
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${card.accent}14` }}
                  >
                    <Icon className="w-4.5 h-4.5" style={{ color: card.accent, width: '1.1rem', height: '1.1rem' }} />
                  </div>
                  <span
                    className="text-xs font-mono font-semibold"
                    style={{ color: 'rgba(148,163,184,0.2)' }}
                  >
                    {card.index}
                  </span>
                </div>
                <h3
                  className="text-sm font-semibold mb-1.5 leading-snug"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}
                >
                  {t(card.titleKey)}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: '#64748B', lineHeight: '1.6' }}>
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
