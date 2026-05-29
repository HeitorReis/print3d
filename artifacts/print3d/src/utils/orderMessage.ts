import { CartItem } from '@/hooks/useCart';
import { Lang } from '@/i18n';
import { WHATSAPP_PHONE, CONTACT_EMAIL } from '@/config';

function formatPrice(priceStr: string, qty: number): number {
  const numeric = parseFloat(priceStr.replace(/[^\d.,]/g, '').replace(',', '.'));
  if (isNaN(numeric)) return 0;
  return numeric * qty;
}

export function generateWhatsAppCartLink(items: CartItem[], lang: Lang): string {
  if (items.length === 0) {
    const text = lang === 'en'
      ? "Hello! I found PRINT3D and would like to request a quote for a custom 3D printed part."
      : "Olá! Encontrei a PRINT3D e gostaria de pedir um orçamento para uma peça impressa em 3D.";
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
  }

  let total = 0;
  const itemsText = items.map(i => {
    const price = formatPrice(i.product.price, i.quantity);
    total += price;
    const name = lang === 'en' ? i.product.nameEn : i.product.namePt;
    const delivery = lang === 'en' ? i.product.deliveryEn : i.product.deliveryPt;
    return `${i.quantity}x ${name}\n${lang === 'en' ? 'Starting price' : 'Preço inicial'}: ${i.product.price}\n${lang === 'en' ? 'Estimated delivery' : 'Prazo estimado'}: ${delivery}`;
  }).join('\n\n');

  const greeting = lang === 'en'
    ? "Hello! I would like to request a quote from PRINT3D:\n\n"
    : "Olá! Gostaria de pedir um orçamento na PRINT3D:\n\n";

  const footer = lang === 'en'
    ? `\nEstimated total: R$ ${total.toFixed(2).replace('.', ',')}\n\nCan you confirm feasibility, material, color options and delivery?`
    : `\nTotal estimado: R$ ${total.toFixed(2).replace('.', ',')}\n\nVocê pode confirmar viabilidade, material, cores e prazo?`;

  const text = greeting + itemsText + footer;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}

export function generateEmailLink(items: CartItem[], lang: Lang): string {
  const subject = lang === 'en' ? "PRINT3D quote request" : "Pedido de orçamento PRINT3D";

  if (items.length === 0) return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;

  let total = 0;
  const itemsText = items.map(i => {
    const price = formatPrice(i.product.price, i.quantity);
    total += price;
    const name = lang === 'en' ? i.product.nameEn : i.product.namePt;
    const delivery = lang === 'en' ? i.product.deliveryEn : i.product.deliveryPt;
    return `${i.quantity}x ${name}\n${lang === 'en' ? 'Starting price' : 'Preço inicial'}: ${i.product.price}\n${lang === 'en' ? 'Estimated delivery' : 'Prazo estimado'}: ${delivery}`;
  }).join('\n\n');

  const greeting = lang === 'en'
    ? "Hello! I would like to request a quote from PRINT3D:\n\n"
    : "Olá! Gostaria de pedir um orçamento na PRINT3D:\n\n";

  const footer = lang === 'en'
    ? `\nEstimated total: R$ ${total.toFixed(2).replace('.', ',')}\n\nCan you confirm feasibility, material, color options and delivery?`
    : `\nTotal estimado: R$ ${total.toFixed(2).replace('.', ',')}\n\nVocê pode confirmar viabilidade, material, cores e prazo?`;

  const body = greeting + itemsText + footer;

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
