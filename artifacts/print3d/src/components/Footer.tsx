import { Box } from 'lucide-react';
import { SiWhatsapp, SiTiktok } from 'react-icons/si';
import { Linkedin } from 'lucide-react';
import { useLang } from '@/contexts/LangContext';
import { LINKEDIN_URL, TIKTOK_URL, CONTACT_EMAIL, WHATSAPP_PHONE } from '@/config';
import { generateWhatsAppCartLink } from '@/utils/orderMessage';
import { Mail } from 'lucide-react';

export function Footer() {
  const { lang, t } = useLang();
  const whatsappLink = generateWhatsAppCartLink([], lang);

  return (
    <footer
      className="border-t py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: '#0B0F14', borderColor: 'rgba(148,163,184,0.1)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
          <div className="flex flex-col gap-3 max-w-sm">
            <div className="flex items-center gap-2">
              <Box className="w-5 h-5" style={{ color: '#F97316' }} />
              <span
                className="text-lg font-bold tracking-wider"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}
              >
                PRINT3D
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>
              {t('footer_desc')}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-footer-whatsapp"
              className="p-2.5 rounded-lg transition-colors hover:bg-white/10"
              style={{ color: '#94A3B8' }}
              aria-label="WhatsApp"
            >
              <SiWhatsapp className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              data-testid="link-footer-email"
              className="p-2.5 rounded-lg transition-colors hover:bg-white/10"
              style={{ color: '#94A3B8' }}
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-footer-linkedin"
              className="p-2.5 rounded-lg transition-colors hover:bg-white/10"
              style={{ color: '#94A3B8' }}
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-footer-tiktok"
              className="p-2.5 rounded-lg transition-colors hover:bg-white/10"
              style={{ color: '#94A3B8' }}
              aria-label="TikTok"
            >
              <SiTiktok className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div
          className="border-t pt-6 space-y-3"
          style={{ borderColor: 'rgba(148,163,184,0.08)' }}
        >
          <p className="text-xs leading-relaxed" style={{ color: '#64748B' }}>
            {t('footer_disclaimer')}
          </p>
          <p className="text-xs" style={{ color: '#64748B' }}>
            © 2025 Print3d. {lang === 'en' ? 'All rights reserved.' : 'Todos os direitos reservados.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
