import { useState } from 'react';
import { ShoppingCart, Box, Menu, X } from 'lucide-react';
import { useLang } from '@/contexts/LangContext';
import { useCart } from '@/contexts/CartContext';

interface HeaderProps {
  onCartOpen: () => void;
}

export function Header({ onCartOpen }: HeaderProps) {
  const { lang, setLang, t } = useLang();
  const { items } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: t('nav_products'), id: 'catalog' },
    { label: t('nav_custom'), id: 'custom' },
    { label: t('nav_process'), id: 'process' },
    { label: t('nav_contact'), id: 'contact' },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{ backgroundColor: '#1E293B', borderColor: 'rgba(148,163,184,0.15)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group"
            data-testid="button-logo"
          >
            <Box className="w-6 h-6 transition-transform group-hover:scale-110" style={{ color: '#F97316' }} />
            <span
              className="text-xl tracking-wider font-bold"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}
            >
              PRINT3D
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                data-testid={`nav-link-${link.id}`}
                className="text-sm font-medium transition-colors hover:text-white"
                style={{ color: '#CBD5E1' }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1 rounded-md overflow-hidden border" style={{ borderColor: 'rgba(148,163,184,0.2)' }}>
              <button
                onClick={() => setLang('en')}
                data-testid="button-lang-en"
                className="px-3 py-1.5 text-xs font-semibold transition-colors"
                style={{
                  backgroundColor: lang === 'en' ? '#F97316' : 'transparent',
                  color: lang === 'en' ? '#0B0F14' : '#CBD5E1',
                }}
              >
                EN
              </button>
              <button
                onClick={() => setLang('pt')}
                data-testid="button-lang-pt"
                className="px-3 py-1.5 text-xs font-semibold transition-colors"
                style={{
                  backgroundColor: lang === 'pt' ? '#F97316' : 'transparent',
                  color: lang === 'pt' ? '#0B0F14' : '#CBD5E1',
                }}
              >
                PT
              </button>
            </div>

            <button
              onClick={onCartOpen}
              data-testid="button-cart"
              className="relative p-2 rounded-md transition-colors hover:bg-white/10"
              style={{ color: '#CBD5E1' }}
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: '#F97316', color: '#0B0F14' }}
                  data-testid="cart-count-badge"
                >
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md transition-colors hover:bg-white/10"
              style={{ color: '#CBD5E1' }}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t" style={{ backgroundColor: '#0B0F14', borderColor: 'rgba(148,163,184,0.15)' }}>
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                data-testid={`mobile-nav-${link.id}`}
                className="w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors hover:bg-white/10"
                style={{ color: '#CBD5E1' }}
              >
                {link.label}
              </button>
            ))}
            <div className="flex gap-2 pt-2 px-3">
              <button
                onClick={() => setLang('en')}
                className="flex-1 py-2 text-xs font-semibold rounded-md transition-colors"
                style={{
                  backgroundColor: lang === 'en' ? '#F97316' : 'rgba(255,255,255,0.08)',
                  color: lang === 'en' ? '#0B0F14' : '#CBD5E1',
                }}
              >EN</button>
              <button
                onClick={() => setLang('pt')}
                className="flex-1 py-2 text-xs font-semibold rounded-md transition-colors"
                style={{
                  backgroundColor: lang === 'pt' ? '#F97316' : 'rgba(255,255,255,0.08)',
                  color: lang === 'pt' ? '#0B0F14' : '#CBD5E1',
                }}
              >PT</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
