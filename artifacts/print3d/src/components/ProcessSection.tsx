import { useLang } from '@/contexts/LangContext';

const STEPS_EN = [
  { num: '01', label: 'Send the idea or file', detail: 'Share a reference, sketch, measurements, STL or CAD file.' },
  { num: '02', label: 'Receive the quote', detail: 'I check feasibility, material, price and estimated delivery.' },
  { num: '03', label: 'Confirm the details', detail: 'We align color, size, material and any adjustments before printing.' },
  { num: '04', label: 'Production', detail: 'The part is printed, checked and cleaned.' },
  { num: '05', label: 'Delivery or pickup', detail: 'You receive the finished piece with the agreed delivery method.' },
];

const STEPS_PT = [
  { num: '01', label: 'Envie a ideia ou arquivo', detail: 'Compartilhe referência, desenho, medidas, STL ou arquivo CAD.' },
  { num: '02', label: 'Receba o orçamento', detail: 'Eu avalio viabilidade, material, preço e prazo estimado.' },
  { num: '03', label: 'Confirme os detalhes', detail: 'Alinhamos cor, tamanho, material e ajustes antes da impressão.' },
  { num: '04', label: 'Produção', detail: 'A peça é impressa, conferida e limpa.' },
  { num: '05', label: 'Entrega ou retirada', detail: 'Você recebe a peça final pelo método combinado.' },
];

export function ProcessSection() {
  const { lang, t } = useLang();
  const steps = lang === 'en' ? STEPS_EN : STEPS_PT;

  return (
    <section id="process" className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#0B0F14' }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div>
            <div
              className="text-xs font-semibold tracking-widest uppercase mb-2"
              style={{ color: '#22D3EE' }}
            >
              - {t('nav_process')}
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC', letterSpacing: '-0.02em' }}
            >
              {t('process_title')}
            </h2>
          </div>
        </div>

        <p className="text-base mb-12 max-w-2xl leading-relaxed" style={{ color: '#94A3B8' }}>
          {t('process_body')}
        </p>

        <div className="relative">
          <div
            className="absolute top-6 left-0 right-0 h-px hidden sm:block"
            style={{ backgroundColor: 'rgba(148,163,184,0.08)', left: '3rem', right: '3rem' }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-5 sm:gap-2 relative">
            {steps.map((step, i) => (
              <div key={step.num} className="flex flex-col items-start sm:items-center sm:text-center">
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
                <p className="text-xs leading-relaxed" style={{ color: '#64748B' }}>
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm mt-12 max-w-2xl leading-relaxed" style={{ color: '#94A3B8' }}>
          {lang === 'en'
            ? 'Want to see the process? Follow print tests, prototypes and finished parts on TikTok.'
            : 'Quer ver o processo? Acompanhe testes, protótipos e peças finalizadas no TikTok.'}
        </p>
      </div>
    </section>
  );
}
