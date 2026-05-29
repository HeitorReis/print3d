import { useLang } from '@/contexts/LangContext';
import { generateWhatsAppCartLink } from '@/utils/orderMessage';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const { lang, t } = useLang();

  const scrollToCatalog = () => {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  const whatsappLink = generateWhatsAppCartLink([], lang);

  const stats = [
    { value: 'PLA/PETG', label: lang === 'en' ? 'Material options' : 'Materiais' },
    { value: '2-8d', label: lang === 'en' ? 'Typical delivery' : 'Prazo comum' },
    { value: 'Quote', label: lang === 'en' ? 'Before printing' : 'Antes de imprimir' },
    { value: 'Direct', label: lang === 'en' ? 'WhatsApp contact' : 'Contato WhatsApp' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16"
      style={{ backgroundColor: '#0B0F14' }}
    >
      {/* Blueprint grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.035) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />
      {/* Smaller sub-grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.015) 1px, transparent 1px)
          `,
          backgroundSize: '16px 16px',
        }}
      />
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 55% at 50% 45%, rgba(249,115,22,0.055) 0%, transparent 70%)',
        }}
      />
      {/* Corner vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 60%, rgba(11,15,20,0.8) 100%)',
        }}
      />

      {/* Technical corner labels */}
      <div
        className="absolute top-20 left-6 text-xs font-mono select-none hidden lg:block"
        style={{ color: 'rgba(34,211,238,0.28)' }}
      >
        <div>X: 0.000 mm</div>
        <div>Y: 0.000 mm</div>
        <div>Z: 0.000 mm</div>
      </div>
      <div
        className="absolute top-20 right-6 text-xs font-mono select-none hidden lg:block text-right"
        style={{ color: 'rgba(34,211,238,0.28)' }}
      >
        <div>LAYER: READY</div>
        <div>MATERIAL: PLA/PETG</div>
        <div>STATUS: READY</div>
      </div>

      {/* Crosshair bottom-left */}
      <div className="absolute bottom-10 left-6 select-none hidden lg:block">
        <div
          className="relative w-20 h-20 border"
          style={{ borderColor: 'rgba(34,211,238,0.1)' }}
        >
          <div
            className="absolute top-1/2 left-0 right-0 h-px"
            style={{ backgroundColor: 'rgba(34,211,238,0.1)' }}
          />
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px"
            style={{ backgroundColor: 'rgba(34,211,238,0.1)' }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ backgroundColor: 'rgba(249,115,22,0.5)' }}
          />
        </div>
        <div
          className="mt-1 text-xs font-mono"
          style={{ color: 'rgba(34,211,238,0.22)' }}
        >
          ORIGIN
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-8 border"
          style={{
            backgroundColor: 'rgba(249,115,22,0.08)',
            borderColor: 'rgba(249,115,22,0.25)',
            color: '#F97316',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: '#F97316' }}
          />
          {lang === 'en' ? 'Custom prints on demand - PLA / PETG' : 'Impressões sob demanda - PLA / PETG'}
        </div>

        {/* Headline */}
        <h1
          className="text-4xl sm:text-5xl lg:text-[4.5rem] font-bold leading-[1.05] mb-6 tracking-tight"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: '#F8FAFC',
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

        {/* Subheading */}
        <p
          className="text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: '#94A3B8' }}
        >
          {t('hero_subtitle')}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
          <button
            onClick={scrollToCatalog}
            data-testid="button-hero-view-products"
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F14]"
            style={{ backgroundColor: '#F97316', color: '#0B0F14' }}
          >
            {t('hero_btn_products')}
          </button>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-hero-whatsapp"
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 hover:bg-white/6 active:scale-[0.98] border text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F14]"
            style={{ borderColor: 'rgba(249,115,22,0.35)', color: '#F97316' }}
          >
            {t('hero_btn_whatsapp')}
          </a>
        </div>

        {/* Supporting details */}
        <div
          className="w-full max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 divide-x border rounded-xl overflow-hidden"
          style={{
            borderColor: 'rgba(148,163,184,0.1)',
            backgroundColor: 'rgba(30,41,59,0.5)',
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center py-4 px-2"
              style={{ borderColor: 'rgba(148,163,184,0.1)' }}
            >
              <span
                className="text-xl font-bold tracking-tight mb-0.5"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: i % 2 === 0 ? '#F97316' : '#22D3EE',
                }}
              >
                {s.value}
              </span>
              <span className="text-xs uppercase tracking-widest" style={{ color: '#64748B' }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToCatalog}
        className="relative z-10 mb-8 flex flex-col items-center gap-1 transition-opacity hover:opacity-70 focus-visible:outline-none"
        aria-label="Scroll to products"
        style={{ color: 'rgba(148,163,184,0.35)' }}
      >
        <span className="text-xs font-mono tracking-widest uppercase">scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
}
