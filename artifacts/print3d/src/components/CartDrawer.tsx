import { X, Minus, Plus, Trash2, ShoppingCart, Mail } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { useCart } from '@/contexts/CartContext';
import { useLang } from '@/contexts/LangContext';
import { generateWhatsAppCartLink, generateEmailLink } from '@/utils/orderMessage';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

function parsePrice(priceStr: string): number {
  const numeric = parseFloat(priceStr.replace(/[^\d.,]/g, '').replace(',', '.'));
  return isNaN(numeric) ? 0 : numeric;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQty, clearCart } = useCart();
  const { lang, t } = useLang();

  const total = items.reduce((sum, i) => sum + parsePrice(i.product.price) * i.quantity, 0);
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const whatsappLink = generateWhatsAppCartLink(items, lang);
  const emailLink = generateEmailLink(items, lang);

  const scrollToCatalog = () => {
    onClose();
    setTimeout(() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }), 150);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 transition-opacity duration-300"
        style={{
          backgroundColor: 'rgba(0,0,0,0.65)',
          backdropFilter: open ? 'blur(3px)' : 'none',
          pointerEvents: open ? 'auto' : 'none',
          opacity: open ? 1 : 0,
        }}
        onClick={onClose}
        data-testid="cart-backdrop"
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        className="fixed top-0 right-0 h-full z-50 flex flex-col transition-transform duration-300 ease-in-out"
        style={{
          width: 'min(440px, 100vw)',
          backgroundColor: '#111827',
          borderLeft: '1px solid rgba(148,163,184,0.1)',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
        }}
        data-testid="cart-drawer"
        role="dialog"
        aria-label={t('cart_title')}
        aria-modal="true"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b shrink-0"
          style={{ borderColor: 'rgba(148,163,184,0.1)' }}
        >
          <div className="flex items-center gap-2.5">
            <ShoppingCart className="w-5 h-5" style={{ color: '#F97316' }} />
            <h2
              className="text-base font-semibold"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}
            >
              {t('cart_title')}
            </h2>
            {totalItems > 0 && (
              <span
                className="text-xs px-2 py-0.5 rounded-full font-bold tracking-wide"
                style={{ backgroundColor: '#F97316', color: '#0B0F14' }}
              >
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            data-testid="button-close-cart"
            className="p-1.5 rounded-lg transition-colors hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            style={{ color: '#64748B' }}
            aria-label="Close quote request"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 pb-8">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: 'rgba(148,163,184,0.07)', border: '1px solid rgba(148,163,184,0.1)' }}
              >
                <ShoppingCart className="w-7 h-7" style={{ color: 'rgba(148,163,184,0.2)' }} />
              </div>
              <div>
                <p className="text-sm font-medium mb-1" style={{ color: '#CBD5E1' }}>
                  {t('cart_empty')}
                </p>
                <p className="text-xs" style={{ color: '#64748B' }}>
                  {lang === 'en' ? 'Choose an item or send a custom request to get a quote.' : 'Escolha um item ou envie um pedido personalizado para receber um orçamento.'}
                </p>
              </div>
              <button
                onClick={scrollToCatalog}
                data-testid="button-browse-products"
                className="text-sm font-semibold transition-colors hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded px-4 py-2"
                style={{ color: '#F97316', border: '1px solid rgba(249,115,22,0.25)', borderRadius: '0.5rem' }}
              >
                {t('cart_browse')}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => {
                const name = lang === 'en' ? item.product.nameEn : item.product.namePt;
                const delivery = lang === 'en' ? item.product.deliveryEn : item.product.deliveryPt;
                const itemTotal = parsePrice(item.product.price) * item.quantity;

                return (
                  <div
                    key={item.product.id}
                    className="flex gap-3 p-3.5 rounded-xl border"
                    style={{
                      backgroundColor: 'rgba(11,15,20,0.6)',
                      borderColor: 'rgba(148,163,184,0.08)',
                    }}
                    data-testid={`cart-item-${item.product.id}`}
                  >
                    {/* Product thumbnail */}
                    <div
                      className="w-14 h-14 rounded-lg shrink-0 flex items-center justify-center border"
                      style={{
                        background: `linear-gradient(135deg, ${item.product.gradientFrom}, ${item.product.gradientTo})`,
                        borderColor: 'rgba(148,163,184,0.1)',
                      }}
                      aria-hidden="true"
                    />

                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-semibold truncate mb-0.5"
                        style={{ color: '#F8FAFC' }}
                        data-testid={`cart-item-name-${item.product.id}`}
                      >
                        {name}
                      </p>
                      <p className="text-xs mb-2" style={{ color: '#64748B' }}>
                        {lang === 'en' ? 'Est.' : 'Prazo:'} {delivery} · {item.product.material}
                      </p>

                      <div className="flex items-center justify-between">
                        {/* Qty controls */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => updateQty(item.product.id, item.quantity - 1)}
                            data-testid={`button-qty-decrease-${item.product.id}`}
                            className="w-6 h-6 rounded-md flex items-center justify-center transition-colors hover:bg-white/10 border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                            style={{ borderColor: 'rgba(148,163,184,0.18)', color: '#CBD5E1' }}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span
                            className="text-sm font-bold w-7 text-center tabular-nums"
                            style={{ color: '#F8FAFC' }}
                            data-testid={`text-qty-${item.product.id}`}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(item.product.id, item.quantity + 1)}
                            data-testid={`button-qty-increase-${item.product.id}`}
                            className="w-6 h-6 rounded-md flex items-center justify-center transition-colors hover:bg-white/10 border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                            style={{ borderColor: 'rgba(148,163,184,0.18)', color: '#CBD5E1' }}
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className="text-sm font-bold tabular-nums"
                            style={{ color: '#F97316' }}
                            data-testid={`text-item-total-${item.product.id}`}
                          >
                            R$ {itemTotal.toFixed(2).replace('.', ',')}
                          </span>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            data-testid={`button-remove-item-${item.product.id}`}
                            className="p-1 rounded transition-colors hover:text-red-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-400"
                            style={{ color: '#475569' }}
                            aria-label={`Remove ${name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer: totals + quote actions */}
        {items.length > 0 && (
          <div
            className="shrink-0 border-t"
            style={{ borderColor: 'rgba(148,163,184,0.1)', backgroundColor: '#111827' }}
          >
            {/* Subtotal */}
            <div
              className="flex justify-between items-center px-5 py-4 border-b"
              style={{ borderColor: 'rgba(148,163,184,0.08)' }}
            >
              <div>
                <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: '#64748B' }}>
                  {t('cart_estimated_total')}
                </p>
                <p className="text-xs" style={{ color: '#475569' }}>
                  {lang === 'en' ? 'Confirmed before production' : 'Confirmado antes da produção'}
                </p>
              </div>
              <span
                className="text-2xl font-bold tabular-nums"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F97316' }}
                data-testid="text-cart-total"
              >
                R$ {total.toFixed(2).replace('.', ',')}
              </span>
            </div>

            {/* Checkout buttons */}
            <div className="px-5 py-4 space-y-2.5">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-cart-whatsapp"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                style={{ backgroundColor: '#F97316', color: '#0B0F14' }}
              >
                <SiWhatsapp className="w-4 h-4" />
                {t('btn_order_whatsapp')}
              </a>
              <a
                href={emailLink}
                data-testid="link-cart-email"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-white/6 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                style={{ borderColor: 'rgba(148,163,184,0.18)', color: '#CBD5E1' }}
              >
                <Mail className="w-4 h-4" />
                {t('btn_order_email')}
              </a>
              <button
                onClick={clearCart}
                data-testid="button-clear-cart"
                className="w-full py-2 text-xs font-medium transition-colors hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded"
                style={{ color: '#475569' }}
              >
                {t('cart_clear')}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
