import { Box, Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { useLang } from '@/contexts/LangContext';
import { GITHUB_URL, INSTAGRAM_URL, LINKEDIN_URL } from '@/config';
import { generateEmailLink, generateWhatsAppCartLink } from '@/utils/orderMessage';

export function Footer() {
  const { lang, t } = useLang();
  const whatsappLink = generateWhatsAppCartLink([], lang);
  const emailLink = generateEmailLink([], lang);

  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: '#0B0F14', borderColor: 'rgba(148,163,184,0.08)' }}
    >
      <div className="max-w-7xl mx-auto py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-2 max-w-xs">
            <div className="flex items-center gap-2.5">
              <Box className="w-4.5 h-4.5" style={{ color: '#F97316', width: '1.1rem', height: '1.1rem' }} />
              <span
                className="text-sm font-bold tracking-[0.15em]"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}
              >
                PRINT3D
              </span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: '#475569' }}>
              {t('footer_desc')}
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-1">
            {[
              { href: whatsappLink, icon: SiWhatsapp, label: 'WhatsApp', external: true },
              { href: emailLink, icon: Mail, label: 'Email', external: false },
              { href: LINKEDIN_URL, icon: Linkedin, label: 'LinkedIn', external: true },
              { href: GITHUB_URL, icon: Github, label: 'GitHub', external: true },
              { href: INSTAGRAM_URL, icon: Instagram, label: 'Instagram', external: true },
            ].map(({ href, icon: Icon, label, external }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                data-testid={`link-footer-${label.toLowerCase()}`}
                className="p-2.5 rounded-lg transition-colors hover:bg-white/6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                style={{ color: '#475569' }}
                aria-label={label}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#CBD5E1')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#475569')}
              >
                <Icon className="w-4.5 h-4.5" style={{ width: '1.1rem', height: '1.1rem' }} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t py-5"
        style={{ borderColor: 'rgba(148,163,184,0.06)' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-xs leading-relaxed max-w-2xl" style={{ color: '#334155' }}>
            {t('footer_disclaimer')}
          </p>
          <p className="text-xs whitespace-nowrap" style={{ color: '#334155' }}>
            © {year} PRINT3D.{' '}
            {lang === 'en' ? 'All rights reserved.' : 'Todos os direitos reservados.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
