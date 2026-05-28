import { Mail, Linkedin } from 'lucide-react';
import { SiWhatsapp, SiTiktok } from 'react-icons/si';
import { useLang } from '@/contexts/LangContext';
import { CONTACT_EMAIL, LINKEDIN_URL, TIKTOK_URL, WHATSAPP_PHONE_DISPLAY } from '@/config';
import { generateWhatsAppCartLink } from '@/utils/orderMessage';

export function ContactSection() {
  const { lang, t } = useLang();
  const whatsappLink = generateWhatsAppCartLink([], lang);

  const contacts = [
    {
      icon: SiWhatsapp,
      label: t('contact_whatsapp'),
      value: WHATSAPP_PHONE_DISPLAY,
      href: whatsappLink,
      accent: '#25D366',
      note: lang === 'en' ? 'Fastest response' : 'Resposta mais rápida',
    },
    {
      icon: Mail,
      label: t('contact_email'),
      value: CONTACT_EMAIL,
      href: `mailto:${CONTACT_EMAIL}`,
      accent: '#22D3EE',
      note: lang === 'en' ? 'For detailed requests' : 'Para pedidos detalhados',
    },
    {
      icon: Linkedin,
      label: t('contact_linkedin'),
      value: 'LinkedIn',
      href: LINKEDIN_URL,
      accent: '#0A66C2',
      note: lang === 'en' ? 'Professional contact' : 'Contato profissional',
    },
    {
      icon: SiTiktok,
      label: t('contact_tiktok'),
      value: '@print3d',
      href: TIKTOK_URL,
      accent: '#F8FAFC',
      note: lang === 'en' ? 'See the process' : 'Veja o processo',
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#111827' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div
            className="text-xs font-semibold tracking-widest uppercase mb-2"
            style={{ color: '#22D3EE' }}
          >
            — {t('contact_title')}
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC', letterSpacing: '-0.02em' }}
          >
            {t('contact_title')}
          </h2>
          <p className="text-base max-w-xl" style={{ color: '#94A3B8' }}>
            {lang === 'en'
              ? 'Reach out via any channel. We respond quickly to WhatsApp and email.'
              : 'Entre em contato por qualquer canal. Respondemos rapidamente por WhatsApp e e-mail.'}
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contacts.map((contact) => {
            const Icon = contact.icon;
            return (
              <a
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`link-contact-${contact.label.toLowerCase().replace(/\s/g, '-')}`}
                className="group flex flex-col p-5 rounded-xl border text-left transition-all duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                style={{
                  backgroundColor: 'rgba(11,15,20,0.6)',
                  borderColor: 'rgba(148,163,184,0.1)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${contact.accent}35`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(148,163,184,0.1)';
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110"
                  style={{ backgroundColor: `${contact.accent}14`, border: `1px solid ${contact.accent}22` }}
                >
                  <Icon className="w-5 h-5" style={{ color: contact.accent }} />
                </div>
                <p className="text-sm font-semibold mb-0.5" style={{ color: '#F8FAFC' }}>
                  {contact.label}
                </p>
                <p className="text-xs mb-2" style={{ color: '#94A3B8' }}>
                  {contact.value}
                </p>
                <p className="text-xs mt-auto" style={{ color: '#64748B' }}>
                  {contact.note}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
