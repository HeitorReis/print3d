import { useLang } from '@/contexts/LangContext';
import { TIKTOK_URL } from '@/config';
import { SiTiktok } from 'react-icons/si';
import { Play } from 'lucide-react';

export function ProcessSection() {
  const { t } = useLang();

  return (
    <section id="process" className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#0B0F14' }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div
              className="inline-block text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: '#22D3EE' }}
            >
              — TikTok
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}
            >
              {t('process_title')}
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: '#CBD5E1' }}>
              {t('process_body')}
            </p>
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-tiktok"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90 hover:scale-105"
              style={{ backgroundColor: '#F97316', color: '#0B0F14' }}
            >
              <SiTiktok className="w-4 h-4" />
              {t('process_btn_tiktok')}
            </a>
          </div>

          <div className="shrink-0">
            <div
              className="relative w-64 h-80 rounded-2xl flex flex-col items-center justify-center border overflow-hidden"
              style={{
                backgroundColor: '#1E293B',
                borderColor: 'rgba(148,163,184,0.1)',
                background: 'linear-gradient(160deg, #1E293B, #0B0F14)',
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)
                  `,
                  backgroundSize: '24px 24px',
                }}
              />
              <div
                className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border"
                style={{
                  backgroundColor: 'rgba(249,115,22,0.15)',
                  borderColor: 'rgba(249,115,22,0.3)',
                }}
              >
                <Play className="w-8 h-8 ml-1" style={{ color: '#F97316' }} />
              </div>
              <p
                className="relative z-10 text-sm font-semibold text-center px-6"
                style={{ color: '#F8FAFC' }}
              >
                @print3d
              </p>
              <p
                className="relative z-10 text-xs text-center px-6 mt-1"
                style={{ color: '#94A3B8' }}
              >
                filament → finished part
              </p>

              <div
                className="absolute bottom-0 left-0 right-0 h-24"
                style={{ background: 'linear-gradient(to top, rgba(249,115,22,0.08), transparent)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
