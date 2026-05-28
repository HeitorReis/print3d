import { useLang } from '@/contexts/LangContext';
import { generateWhatsAppCartLink } from '@/utils/orderMessage';

export function Hero() {
  const { lang, t } = useLang();

  const scrollToCatalog = () => {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  const whatsappLink = generateWhatsAppCartLink([], lang);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      style={{ backgroundColor: '#0B0F14' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 40%, rgba(249,115,22,0.06) 0%, transparent 70%)',
        }}
      />

      <div
        className="absolute top-24 left-8 text-xs font-mono select-none hidden lg:block"
        style={{ color: 'rgba(34,211,238,0.3)' }}
      >
        <div>X: 0.000 mm</div>
        <div>Y: 0.000 mm</div>
        <div>Z: 0.000 mm</div>
      </div>
      <div
        className="absolute top-24 right-8 text-xs font-mono select-none hidden lg:block text-right"
        style={{ color: 'rgba(34,211,238,0.3)' }}
      >
        <div>LAYER: —</div>
        <div>MATERIAL: PLA/PETG</div>
        <div>STATUS: READY</div>
      </div>

      <div
        className="absolute bottom-8 left-8 w-24 h-24 border select-none hidden lg:block"
        style={{ borderColor: 'rgba(34,211,238,0.12)' }}
      >
        <div className="absolute top-1/2 left-0 right-0 border-t" style={{ borderColor: 'rgba(34,211,238,0.12)' }} />
        <div className="absolute left-1/2 top-0 bottom-0 border-l" style={{ borderColor: 'rgba(34,211,238,0.12)' }} />
        <div
          className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ backgroundColor: 'rgba(249,115,22,0.5)' }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-8 border"
          style={{
            backgroundColor: 'rgba(249,115,22,0.1)',
            borderColor: 'rgba(249,115,22,0.3)',
            color: '#F97316',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: '#F97316' }}
          />
          FDM 3D Printing — PLA / PETG
        </div>

        <h1
          className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: '#F8FAFC',
            letterSpacing: '-0.02em',
          }}
        >
          {t('hero_title').split('.').map((part, i, arr) =>
            i < arr.length - 1 ? (
              <span key={i}>
                {part}
                <span style={{ color: '#F97316' }}>.</span>
              </span>
            ) : part.trim() ? <span key={i}>{part}</span> : null
          )}
        </h1>

        <p
          className="text-lg sm:text-xl max-w-3xl mx-auto mb-10 leading-relaxed"
          style={{ color: '#CBD5E1' }}
        >
          {t('hero_subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToCatalog}
            data-testid="button-hero-view-products"
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg font-semibold text-sm transition-all hover:opacity-90 hover:scale-105 active:scale-100"
            style={{ backgroundColor: '#F97316', color: '#0B0F14' }}
          >
            {t('hero_btn_products')}
          </button>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-hero-whatsapp"
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg font-semibold text-sm transition-all hover:bg-white/10 active:scale-100 border text-center"
            style={{ borderColor: 'rgba(249,115,22,0.5)', color: '#F97316' }}
          >
            {t('hero_btn_whatsapp')}
          </a>
        </div>

        <div
          className="mt-20 flex items-center justify-center gap-2 text-xs animate-bounce"
          style={{ color: 'rgba(148,163,184,0.5)' }}
        >
          <span>↓</span>
        </div>
      </div>
    </section>
  );
}
