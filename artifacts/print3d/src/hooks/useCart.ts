import { useState, useCallback, useEffect } from 'react';
import { Product } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

function isValidCartItem(item: unknown): item is CartItem {
  if (!item || typeof item !== 'object') return false;

  const candidate = item as CartItem;
  return (
    typeof candidate.quantity === 'number' &&
    candidate.quantity > 0 &&
    typeof candidate.product?.id === 'string' &&
    typeof candidate.product.name === 'string' &&
    typeof candidate.product.price === 'string'
  );
}

export function useCartState() {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('print3d_cart');
      if (stored) {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed.filter(isValidCartItem) : [];
      }
    } catch (e) {
      console.error('Failed to parse cart', e);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('print3d_cart', JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product: Product) => {
    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.product.id !== id));
  }, []);

  const updateQty = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems(prev => prev.map(item => 
      item.product.id === id ? { ...item, quantity } : item
    ));
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  return { items, addItem, removeItem, updateQty, clearCart };
}
