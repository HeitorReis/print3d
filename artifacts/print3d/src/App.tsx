import { Toaster } from '@/components/ui/toaster';
import { LangProvider } from '@/contexts/LangContext';
import { CartProvider } from '@/contexts/CartContext';
import { Home } from '@/pages/Home';

function App() {
  return (
    <LangProvider>
      <CartProvider>
        <Home />
        <Toaster />
      </CartProvider>
    </LangProvider>
  );
}

export default App;
