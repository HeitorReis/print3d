import { useLang } from '@/contexts/LangContext';
import { TIKTOK_URL } from '@/config';
import { SiTiktok } from 'react-icons/si';

const STEPS_EN = [
  { num: '01', label: 'File received', detail: 'STL / OBJ / STEP' },
  { num: '02', label: 'Slice & setup', detail: 'Layer, infill, support' },
  { num: '03', label: 'Print', detail: 'FDM — PLA / PETG' },
  { num: '04', label: 'Post-process', detail: 'Removal, cleaning' },
  { num: '05', label: 'Ship', detail: 'Direct to you' },
];

const STEPS_PT = [
  { num: '01', label: 'Arquivo recebido', detail: 'STL / OBJ / STEP' },
  { num: '02', label: 'Fatiamento', detail: 'Camada, preenchimento, suporte' },
  { num: '03', label: 'Impressão', detail: 'FDM — PLA / PETG' },
  { num: '04', label: 'Pós-processamento', detail: 'Remoção, limpeza' },
  { num: '05', label: 'Envio', detail: 'Direto para você' },
];

export function ProcessSection() {
  const { lang, t } = useLang();
  const steps = lang === 'en' ? STEPS_EN : STEPS_PT;

  return (
    <section id="process" className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#0B0F14' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <div
              className="text-xs font-semibold tracking-widest uppercase mb-2"
              style={{ color: '#22D3EE' }}
            >
              — {t('nav_process')}
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC', letterSpacing: '-0.02em' }}
            >
              {t('process_title')}
            </h2>
          </div>

          <a
            href={TIKTOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-tiktok"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:brightness-110 active:scale-[0.98] shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            style={{ backgroundColor: '#F97316', color: '#0B0F14' }}
          >
            <SiTiktok className="w-4 h-4" />
            {t('process_btn_tiktok')}
          </a>
        </div>

        {/* Process description */}
        <p className="text-base mb-12 max-w-2xl leading-relaxed" style={{ color: '#94A3B8' }}>
          {t('process_body')}
        </p>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div
            className="absolute top-6 left-0 right-0 h-px hidden sm:block"
            style={{ backgroundColor: 'rgba(148,163,184,0.08)', left: '3rem', right: '3rem' }}
          />

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-2 relative">
            {steps.map((step, i) => (
              <div key={step.num} className="flex flex-col items-center text-center">
                {/* Step circle */}
                <div
                  className="relative w-12 h-12 rounded-full flex items-center justify-center mb-3 border z-10"
                  style={{
                    backgroundColor: i === 0 ? 'rgba(249,115,22,0.15)' : 'rgba(30,41,59,0.8)',
                    borderColor: i === 0 ? 'rgba(249,115,22,0.4)' : 'rgba(148,163,184,0.15)',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  <span
                    className="text-xs font-bold font-mono"
                    style={{ color: i === 0 ? '#F97316' : '#64748B' }}
                  >
                    {step.num}
                  </span>
                </div>
                <p
                  className="text-sm font-semibold mb-1"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}
                >
                  {step.label}
                </p>
                <p className="text-xs" style={{ color: '#64748B' }}>
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
