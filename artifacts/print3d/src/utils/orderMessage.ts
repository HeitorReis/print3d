import { CartItem } from '@/hooks/useCart';
import { Lang } from '@/i18n';
import { WHATSAPP_PHONE, CONTACT_EMAIL } from '@/config';

function formatPrice(priceStr: string, qty: number): number {
  const numeric = parseFloat(priceStr.replace(/[^\d.,]/g, '').replace(',', '.'));
  if (isNaN(numeric)) return 0;
  return numeric * qty;
}

function buildProductMessage(items: CartItem[]): string {
  let total = 0;
  const itemsText = items.map((i) => {
    const price = formatPrice(i.product.price, i.quantity);
    total += price;
    return `${i.quantity}x ${i.product.name}\nPreço: ${i.product.price}`;
  }).join('\n\n');

  const greeting = items.length === 1
    ? `Olá! Tenho interesse no produto: ${items[0].product.name}. Gostaria de mais informações.\n\n`
    : 'Olá! Tenho interesse nos produtos abaixo. Gostaria de mais informações.\n\n';

  return `${greeting}${itemsText}\nTotal estimado: R$ ${total.toFixed(2).replace('.', ',')}`;
}

export function generateWhatsAppCartLink(items: CartItem[], lang: Lang): string {
  if (items.length === 0) {
    const text = lang === 'en'
      ? "Hello! I found PRINT3D and would like to request a quote for a custom 3D printed part."
      : 'Olá! Encontrei a PRINT3D e gostaria de pedir um orçamento para uma peça impressa em 3D.';
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
  }

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(buildProductMessage(items))}`;
}

export function generateEmailLink(items: CartItem[], _lang: Lang): string {
  const subject = 'Pedido de informações PRINT3D';

  if (items.length === 0) return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildProductMessage(items))}`;
}
