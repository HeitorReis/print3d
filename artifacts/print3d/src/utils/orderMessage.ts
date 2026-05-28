import { Product } from '@/data/products';
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
      ? "Hello! I found Print3d and would like to request information about a custom 3D printed product."
      : "Olá! Encontrei a Print3d e gostaria de solicitar informações sobre um produto personalizado impresso em 3D.";
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
  }

  let total = 0;
  const itemsText = items.map(i => {
    const price = formatPrice(i.product.price, i.quantity);
    total += price;
    const name = lang === 'en' ? i.product.nameEn : i.product.namePt;
    const delivery = lang === 'en' ? i.product.deliveryEn : i.product.deliveryPt;
    return `${i.quantity}x ${name}\n${lang === 'en' ? 'Price' : 'Preço'}: ${i.product.price}\n${lang === 'en' ? 'Delivery' : 'Prazo'}: ${delivery}`;
  }).join('\n\n');

  const greeting = lang === 'en' 
    ? "Hello! I would like to request an order from Print3d:\n\n"
    : "Olá! Gostaria de fazer um pedido na Print3d:\n\n";
    
  const footer = lang === 'en'
    ? `\nEstimated total: R$ ${total.toFixed(2).replace('.', ',')}\n\nCan you confirm availability, material options, color options and payment details?`
    : `\nTotal estimado: R$ ${total.toFixed(2).replace('.', ',')}\n\nVocê pode confirmar disponibilidade, opções de material, cores e forma de pagamento?`;

  const text = greeting + itemsText + footer;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}

export function generateWhatsAppProductLink(product: Product, lang: Lang): string {
  const name = lang === 'en' ? product.nameEn : product.namePt;
  const delivery = lang === 'en' ? product.deliveryEn : product.deliveryPt;
  
  const text = lang === 'en'
    ? `Hello! I would like more information about this Print3d product:\n${name}\nPrice: ${product.price}\nDelivery: ${delivery}\nCan you confirm customization options?`
    : `Olá! Gostaria de mais informações sobre este produto da Print3d:\n${name}\nPreço: ${product.price}\nPrazo: ${delivery}\nVocê pode confirmar as opções de personalização?`;
    
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}

export function generateEmailLink(items: CartItem[], lang: Lang): string {
  const subject = lang === 'en' ? "Print3d order request" : "Pedido Print3d";
  
  if (items.length === 0) return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;

  let total = 0;
  const itemsText = items.map(i => {
    const price = formatPrice(i.product.price, i.quantity);
    total += price;
    const name = lang === 'en' ? i.product.nameEn : i.product.namePt;
    const delivery = lang === 'en' ? i.product.deliveryEn : i.product.deliveryPt;
    return `${i.quantity}x ${name}\n${lang === 'en' ? 'Price' : 'Preço'}: ${i.product.price}\n${lang === 'en' ? 'Delivery' : 'Prazo'}: ${delivery}`;
  }).join('\n\n');

  const greeting = lang === 'en' 
    ? "Hello! I would like to request an order from Print3d:\n\n"
    : "Olá! Gostaria de fazer um pedido na Print3d:\n\n";
    
  const footer = lang === 'en'
    ? `\nEstimated total: R$ ${total.toFixed(2).replace('.', ',')}\n\nCan you confirm availability, material options, color options and payment details?`
    : `\nTotal estimado: R$ ${total.toFixed(2).replace('.', ',')}\n\nVocê pode confirmar disponibilidade, opções de material, cores e forma de pagamento?`;

  const body = greeting + itemsText + footer;
  
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
