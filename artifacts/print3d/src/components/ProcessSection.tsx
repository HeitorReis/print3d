import { useLang } from '@/contexts/LangContext';

const STEPS_EN = [
  { num: '01', label: 'Pick the part', detail: 'Choose from the catalogue or send a reference for a custom piece.' },
  { num: '02', label: 'Get the quote', detail: 'Price, colour, material and lead time confirmed by message before anything starts.' },
  { num: '03', label: 'Confirm and pay', detail: 'Pix or the payment link. Production only starts after confirmation.' },
  { num: '04', label: 'Printing', detail: 'The part is printed, inspected, cleaned and packed. Up to 3 business days.' },
  { num: '05', label: 'Delivery', detail: 'Shipped with tracking, or picked up in São José dos Campos.' },
];

const STEPS_PT = [
  { num: '01', label: 'Escolha a peça', detail: 'Do catálogo, ou mande uma referência para uma peça sob medida.' },
  { num: '02', label: 'Receba o orçamento', detail: 'Preço, cor, material e prazo confirmados por mensagem antes de qualquer coisa.' },
  { num: '03', label: 'Confirme e pague', detail: 'Pix ou link de pagamento. A produção só começa depois da confirmação.' },
  { num: '04', label: 'Impressão', detail: 'A peça é impressa, conferida, limpa e embalada. Até 3 dias úteis.' },
  { num: '05', label: 'Entrega', detail: 'Envio com rastreio, ou retirada em São José dos Campos.' },
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
            ? 'A part with a printing defect is reprinted at no cost — just send a photo within 7 days of delivery.'
            : 'Peça com defeito de impressão é reimpressa sem custo — basta enviar uma foto em até 7 dias após a entrega.'}
        </p>
      </div>
    </section>
  );
}
