import { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ValueProps } from '@/components/ValueProps';
import { ProductCatalog } from '@/components/ProductCatalog';
import { CartDrawer } from '@/components/CartDrawer';
import { CustomProjects } from '@/components/CustomProjects';
import { ProcessSection } from '@/components/ProcessSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

export function Home() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0B0F14' }}>
      <Header onCartOpen={() => setCartOpen(true)} />
      <main>
        <Hero />
        <ValueProps />
        <ProductCatalog />
        <CustomProjects />
        <ProcessSection />
        <ContactSection />
      </main>
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
