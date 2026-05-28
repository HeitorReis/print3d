import { Mail, Linkedin } from 'lucide-react';
import { SiWhatsapp, SiTiktok } from 'react-icons/si';
import { useLang } from '@/contexts/LangContext';
import { WHATSAPP_PHONE, CONTACT_EMAIL, LINKEDIN_URL, TIKTOK_URL } from '@/config';
import { generateWhatsAppCartLink } from '@/utils/orderMessage';

export function ContactSection() {
  const { lang, t } = useLang();
  const whatsappLink = generateWhatsAppCartLink([], lang);

  const contacts = [
    {
      icon: SiWhatsapp,
      label: t('contact_whatsapp'),
      value: `+55 11 99999-9999`,
      href: whatsappLink,
      color: '#25D366',
    },
    {
      icon: Mail,
      label: t('contact_email'),
      value: CONTACT_EMAIL,
      href: `mailto:${CONTACT_EMAIL}`,
      color: '#22D3EE',
    },
    {
      icon: Linkedin,
      label: t('contact_linkedin'),
      value: 'LinkedIn',
      href: LINKEDIN_URL,
      color: '#0A66C2',
    },
    {
      icon: SiTiktok,
      label: t('contact_tiktok'),
      value: '@print3d',
      href: TIKTOK_URL,
      color: '#F8FAFC',
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#1E293B' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: '#22D3EE' }}
          >
            — {t('contact_title')}
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}
          >
            {t('contact_title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contacts.map((contact) => {
            const Icon = contact.icon;
            return (
              <a
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`link-contact-${contact.label.toLowerCase()}`}
                className="flex flex-col items-center p-6 rounded-xl border text-center transition-all duration-200 hover:-translate-y-1 group"
                style={{
                  backgroundColor: '#0B0F14',
                  borderColor: 'rgba(148,163,184,0.1)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors duration-200 group-hover:scale-110"
                  style={{ backgroundColor: `${contact.color}18` }}
                >
                  <Icon className="w-6 h-6" style={{ color: contact.color }} />
                </div>
                <p className="text-sm font-semibold mb-1" style={{ color: '#F8FAFC' }}>
                  {contact.label}
                </p>
                <p className="text-xs" style={{ color: '#94A3B8' }}>
                  {contact.value}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
