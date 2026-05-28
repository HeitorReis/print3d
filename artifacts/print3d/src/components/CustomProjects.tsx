import { useLang } from '@/contexts/LangContext';
import { generateWhatsAppCartLink, generateEmailLink } from '@/utils/orderMessage';
import { Cpu } from 'lucide-react';

export function CustomProjects() {
  const { lang, t } = useLang();

  const whatsappLink = generateWhatsAppCartLink([], lang);
  const emailLink = generateEmailLink([], lang);

  return (
    <section id="custom" className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#1E293B' }}>
      <div className="max-w-4xl mx-auto text-center">
        <div
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-4"
          style={{ color: '#22D3EE' }}
        >
          <Cpu className="w-4 h-4" />— {t('nav_custom')}
        </div>

        <h2
          className="text-3xl sm:text-4xl font-bold mb-6"
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}
        >
          {t('custom_title')}
        </h2>

        <p className="text-lg mb-10 max-w-2xl mx-auto leading-relaxed" style={{ color: '#CBD5E1' }}>
          {t('custom_body')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-custom-whatsapp"
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90 hover:scale-105"
            style={{ backgroundColor: '#F97316', color: '#0B0F14' }}
          >
            {t('custom_btn_whatsapp')}
          </a>
          <a
            href={emailLink}
            data-testid="link-custom-email"
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg text-sm font-semibold transition-all hover:bg-white/10 border text-center"
            style={{ borderColor: 'rgba(148,163,184,0.25)', color: '#CBD5E1' }}
          >
            {t('custom_btn_email')}
          </a>
        </div>
      </div>
    </section>
  );
}
