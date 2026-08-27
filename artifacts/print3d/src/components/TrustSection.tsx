import { FileCheck2, Layers, Thermometer, Truck, Tag, User } from 'lucide-react';
import { useLang } from '@/contexts/LangContext';
import { translations } from '@/i18n';

type Key = keyof typeof translations.en;

const CARDS: { icon: typeof FileCheck2; titleKey: Key; bodyKey: Key; accent: string; index: string }[] = [
  { icon: FileCheck2, titleKey: 'trust_1_title', bodyKey: 'trust_1_body', accent: '#22D3EE', index: '01' },
  { icon: Layers, titleKey: 'trust_2_title', bodyKey: 'trust_2_body', accent: '#F97316', index: '02' },
  { icon: Thermometer, titleKey: 'trust_3_title', bodyKey: 'trust_3_body', accent: '#22D3EE', index: '03' },
  { icon: Truck, titleKey: 'trust_4_title', bodyKey: 'trust_4_body', accent: '#F97316', index: '04' },
  { icon: Tag, titleKey: 'trust_5_title', bodyKey: 'trust_5_body', accent: '#22D3EE', index: '05' },
  { icon: User, titleKey: 'trust_6_title', bodyKey: 'trust_6_body', accent: '#F97316', index: '06' },
];

export function TrustSection() {
  const { t } = useLang();

  return (
    <section id="trust" className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#111827' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 max-w-2xl">
          <div className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: '#22D3EE' }}>
            — {t('trust_kicker')}
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC', letterSpacing: '-0.02em' }}
          >
            {t('trust_heading')}
          </h2>
          <p className="text-base leading-relaxed" style={{ color: '#94A3B8' }}>
            {t('trust_sub')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.titleKey}
                className="relative p-5 rounded-xl border"
                style={{ backgroundColor: 'rgba(11,15,20,0.6)', borderColor: 'rgba(148,163,184,0.1)' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${card.accent}14` }}
                  >
                    <Icon style={{ color: card.accent, width: '1.1rem', height: '1.1rem' }} />
                  </div>
                  <span className="text-xs font-mono font-semibold" style={{ color: 'rgba(148,163,184,0.2)' }}>
                    {card.index}
                  </span>
                </div>
                <h3
                  className="text-sm font-semibold mb-1.5 leading-snug"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}
                >
                  {t(card.titleKey)}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: '#94A3B8', lineHeight: '1.7' }}>
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
