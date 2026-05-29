import { useLang } from '@/contexts/LangContext';
import { generateWhatsAppCartLink, generateEmailLink } from '@/utils/orderMessage';
import { Cpu, CheckCircle2 } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';

export function CustomProjects() {
  const { lang, t } = useLang();

  const whatsappLink = generateWhatsAppCartLink([], lang);
  const emailLink = generateEmailLink([], lang);

  const capabilities = lang === 'en'
    ? [
        'Replacement parts and small fixtures',
        'Custom car clips and accessories',
        'Desk gadgets and organizers',
        'Figures, gifts and decorative pieces',
        'Prototypes from CAD files',
        'Scale models and miniatures',
      ]
    : [
        'Peças de reposição e pequenos fixadores',
        'Clips e acessórios automotivos personalizados',
        'Gadgets de mesa e organizadores',
        'Miniaturas, presentes e peças decorativas',
        'Protótipos a partir de arquivos CAD',
        'Maquetes e miniaturas em escala',
      ];

  return (
    <section id="custom" className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#111827' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: '#22D3EE' }}
            >
              <Cpu className="w-3.5 h-3.5" />
              - {t('nav_custom')}
            </div>

            <h2
              className="text-3xl sm:text-4xl font-bold mb-5 leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC', letterSpacing: '-0.02em' }}
            >
              {t('custom_title')}
            </h2>

            <p className="text-base mb-8 leading-relaxed" style={{ color: '#94A3B8' }}>
              {t('custom_body')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-custom-whatsapp"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                style={{ backgroundColor: '#F97316', color: '#0B0F14' }}
              >
                <SiWhatsapp className="w-4 h-4" />
                {t('custom_btn_whatsapp')}
              </a>
              <a
                href={emailLink}
                data-testid="link-custom-email"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-white/6 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                style={{ borderColor: 'rgba(148,163,184,0.2)', color: '#CBD5E1' }}
              >
                {t('custom_btn_email')}
              </a>
            </div>
          </div>

          <div
            className="p-6 rounded-2xl border"
            style={{ backgroundColor: 'rgba(11,15,20,0.5)', borderColor: 'rgba(148,163,184,0.1)' }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: '#64748B' }}
            >
              {lang === 'en' ? 'What you can request' : 'O que você pode pedir'}
            </p>
            <ul className="space-y-3.5">
              {capabilities.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: '#22D3EE' }} />
                  <span className="text-sm" style={{ color: '#CBD5E1' }}>{item}</span>
                </li>
              ))}
            </ul>

            <div
              className="mt-6 pt-5 border-t flex items-center gap-3"
              style={{ borderColor: 'rgba(148,163,184,0.08)' }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.2)' }}
              >
                <Cpu className="w-4 h-4" style={{ color: '#F97316' }} />
              </div>
              <p className="text-xs" style={{ color: '#64748B', lineHeight: '1.5' }}>
                {lang === 'en'
                  ? 'I review the request and confirm the quote before production starts.'
                  : 'Eu avalio o pedido e confirmo o orçamento antes da produção começar.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
