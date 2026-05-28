import { useState, useEffect } from 'react';
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
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = ['catalog', 'custom', 'process', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

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
      className="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(30,41,59,0.97)' : '#1E293B',
        borderColor: 'rgba(148,163,184,0.12)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded"
            data-testid="button-logo"
          >
            <Box
              className="w-5 h-5 transition-transform group-hover:scale-110"
              style={{ color: '#F97316' }}
            />
            <span
              className="text-base tracking-[0.15em] font-bold"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}
            >
              PRINT3D
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                data-testid={`nav-link-${link.id}`}
                className="relative px-4 py-2 text-sm font-medium transition-colors rounded-md hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                style={{ color: activeSection === link.id ? '#F8FAFC' : '#94A3B8' }}
              >
                {link.label}
                {activeSection === link.id && (
                  <span
                    className="absolute bottom-0.5 left-4 right-4 h-px rounded-full"
                    style={{ backgroundColor: '#F97316' }}
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div
              className="hidden sm:flex items-center rounded-lg overflow-hidden border"
              style={{ borderColor: 'rgba(148,163,184,0.18)' }}
            >
              <button
                onClick={() => setLang('en')}
                data-testid="button-lang-en"
                className="px-3 py-1.5 text-xs font-bold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-400"
                style={{
                  backgroundColor: lang === 'en' ? '#F97316' : 'transparent',
                  color: lang === 'en' ? '#0B0F14' : '#94A3B8',
                }}
              >
                EN
              </button>
              <button
                onClick={() => setLang('pt')}
                data-testid="button-lang-pt"
                className="px-3 py-1.5 text-xs font-bold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-400"
                style={{
                  backgroundColor: lang === 'pt' ? '#F97316' : 'transparent',
                  color: lang === 'pt' ? '#0B0F14' : '#94A3B8',
                }}
              >
                PT
              </button>
            </div>

            <button
              onClick={onCartOpen}
              data-testid="button-cart"
              className="relative p-2 rounded-lg transition-colors hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
              style={{ color: '#CBD5E1' }}
              aria-label={t('cart_title')}
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-4.5 h-4.5 min-w-[1.1rem] min-h-[1.1rem] rounded-full flex items-center justify-center text-xs font-bold leading-none"
                  style={{ backgroundColor: '#F97316', color: '#0B0F14', padding: '2px' }}
                  data-testid="cart-count-badge"
                >
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-colors hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              style={{ color: '#CBD5E1' }}
              data-testid="button-mobile-menu"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          className="md:hidden border-t"
          style={{ backgroundColor: '#0B0F14', borderColor: 'rgba(148,163,184,0.12)' }}
        >
          <div className="px-4 py-3 space-y-0.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                data-testid={`mobile-nav-${link.id}`}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-white/8 flex items-center gap-2"
                style={{ color: activeSection === link.id ? '#F8FAFC' : '#CBD5E1' }}
              >
                {activeSection === link.id && (
                  <span className="w-1 h-1 rounded-full" style={{ backgroundColor: '#F97316' }} />
                )}
                {link.label}
              </button>
            ))}
            <div className="flex gap-2 pt-2 pb-1 px-3">
              <button
                onClick={() => setLang('en')}
                className="flex-1 py-2 text-xs font-bold tracking-wide rounded-lg transition-colors"
                style={{
                  backgroundColor: lang === 'en' ? '#F97316' : 'rgba(255,255,255,0.06)',
                  color: lang === 'en' ? '#0B0F14' : '#94A3B8',
                }}
              >EN</button>
              <button
                onClick={() => setLang('pt')}
                className="flex-1 py-2 text-xs font-bold tracking-wide rounded-lg transition-colors"
                style={{
                  backgroundColor: lang === 'pt' ? '#F97316' : 'rgba(255,255,255,0.06)',
                  color: lang === 'pt' ? '#0B0F14' : '#94A3B8',
                }}
              >PT</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
