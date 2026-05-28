import { X, Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
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
  const whatsappLink = generateWhatsAppCartLink(items, lang);
  const emailLink = generateEmailLink(items, lang);

  const scrollToCatalog = () => {
    onClose();
    setTimeout(() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }), 150);
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={onClose}
          data-testid="cart-backdrop"
        />
      )}

      <div
        className="fixed top-0 right-0 h-full z-50 flex flex-col transition-transform duration-300"
        style={{
          width: 'min(420px, 100vw)',
          backgroundColor: '#1E293B',
          borderLeft: '1px solid rgba(148,163,184,0.12)',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
        }}
        data-testid="cart-drawer"
      >
        <div
          className="flex items-center justify-between px-5 py-4 border-b shrink-0"
          style={{ borderColor: 'rgba(148,163,184,0.12)' }}
        >
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" style={{ color: '#F97316' }} />
            <h2
              className="text-lg font-semibold"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}
            >
              {t('cart_title')}
            </h2>
            {items.length > 0 && (
              <span
                className="text-xs px-2 py-0.5 rounded-full font-semibold"
                style={{ backgroundColor: '#F97316', color: '#0B0F14' }}
              >
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            data-testid="button-close-cart"
            className="p-1.5 rounded-md transition-colors hover:bg-white/10"
            style={{ color: '#94A3B8' }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <ShoppingCart className="w-14 h-14" style={{ color: 'rgba(148,163,184,0.2)' }} />
              <p style={{ color: '#94A3B8' }}>{t('cart_empty')}</p>
              <button
                onClick={scrollToCatalog}
                data-testid="button-browse-products"
                className="text-sm font-semibold underline underline-offset-4 transition-colors hover:opacity-80"
                style={{ color: '#F97316' }}
              >
                {t('cart_browse')}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const name = lang === 'en' ? item.product.nameEn : item.product.namePt;
                const delivery = lang === 'en' ? item.product.deliveryEn : item.product.deliveryPt;
                const itemTotal = parsePrice(item.product.price) * item.quantity;

                return (
                  <div
                    key={item.product.id}
                    className="flex gap-3 p-3 rounded-xl border"
                    style={{ backgroundColor: 'rgba(11,15,20,0.5)', borderColor: 'rgba(148,163,184,0.1)' }}
                    data-testid={`cart-item-${item.product.id}`}
                  >
                    <div
                      className="w-14 h-14 rounded-lg shrink-0 flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${item.product.gradientFrom}, ${item.product.gradientTo})` }}
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-semibold truncate mb-0.5"
                        style={{ color: '#F8FAFC' }}
                        data-testid={`cart-item-name-${item.product.id}`}
                      >
                        {name}
                      </p>
                      <p className="text-xs mb-1" style={{ color: '#94A3B8' }}>
                        {lang === 'en' ? 'Est.' : 'Prazo:'} {delivery}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => updateQty(item.product.id, item.quantity - 1)}
                            data-testid={`button-qty-decrease-${item.product.id}`}
                            className="w-6 h-6 rounded flex items-center justify-center transition-colors hover:bg-white/10 border"
                            style={{ borderColor: 'rgba(148,163,184,0.2)', color: '#CBD5E1' }}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span
                            className="text-sm font-semibold w-6 text-center"
                            style={{ color: '#F8FAFC' }}
                            data-testid={`text-qty-${item.product.id}`}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(item.product.id, item.quantity + 1)}
                            data-testid={`button-qty-increase-${item.product.id}`}
                            className="w-6 h-6 rounded flex items-center justify-center transition-colors hover:bg-white/10 border"
                            style={{ borderColor: 'rgba(148,163,184,0.2)', color: '#CBD5E1' }}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className="text-sm font-bold"
                            style={{ color: '#F97316' }}
                            data-testid={`text-item-total-${item.product.id}`}
                          >
                            R$ {itemTotal.toFixed(2).replace('.', ',')}
                          </span>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            data-testid={`button-remove-item-${item.product.id}`}
                            className="p-1 rounded transition-colors hover:text-red-400"
                            style={{ color: '#94A3B8' }}
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

        {items.length > 0 && (
          <div
            className="shrink-0 px-5 py-4 border-t space-y-4"
            style={{ borderColor: 'rgba(148,163,184,0.12)', backgroundColor: '#1E293B' }}
          >
            <div
              className="flex justify-between items-center py-3 border-t"
              style={{ borderColor: 'rgba(148,163,184,0.12)' }}
            >
              <span className="text-sm font-semibold" style={{ color: '#F8FAFC' }}>
                {t('cart_estimated_total')}
              </span>
              <span
                className="text-xl font-bold"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F97316' }}
                data-testid="text-cart-total"
              >
                R$ {total.toFixed(2).replace('.', ',')}
              </span>
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-cart-whatsapp"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: '#F97316', color: '#0B0F14' }}
            >
              {t('btn_order_whatsapp')}
            </a>
            <a
              href={emailLink}
              data-testid="link-cart-email"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg text-sm font-semibold transition-all hover:bg-white/10 border"
              style={{ borderColor: 'rgba(148,163,184,0.2)', color: '#CBD5E1' }}
            >
              {t('btn_order_email')}
            </a>
            <button
              onClick={clearCart}
              data-testid="button-clear-cart"
              className="w-full py-2 text-xs font-medium transition-colors hover:text-red-400"
              style={{ color: '#94A3B8' }}
            >
              {t('cart_clear')}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
