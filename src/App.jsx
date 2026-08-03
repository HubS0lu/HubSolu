import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, Package, DollarSign, Settings, User } from 'lucide-react';
import LandingPage from './pages/LandingPage';
import CadastroPage from './pages/CadastroPage';
import RegistroPage from './pages/RegistroPage';
import PerfilPage from './pages/PerfilPage';
import PlanosPage from './pages/PlanosPage';
import SelecaoNegocioPage from './pages/SelecaoNegocioPage';
import MarketplaceHome from './pages/MarketplaceHome';
import MarketplaceCategory from './pages/MarketplaceCategory';
import MarketplaceStore from './pages/MarketplaceStore';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { StoreProvider } from './contexts/StoreContext';
import { OrderProvider } from './contexts/OrderContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import ProtectedRoute from './components/ProtectedRoute';

function MobileLayout({ children }) {
  return (
    <div className="flex justify-center bg-[#212529] min-h-screen">
      <div className="w-full max-w-[480px] bg-[#f8f9fa] relative min-h-screen flex flex-col shadow-2xl overflow-hidden transition-colors duration-300">
        <main className="flex-1 overflow-y-auto pb-0">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <OrderProvider>
          <ThemeProvider>
            <CartProvider>
              <FavoritesProvider>
                <Router>
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/cadastro" element={<CadastroPage />} />
                    <Route path="/registro" element={<RegistroPage />} />
                    <Route path="/selecao-negocio" element={<ProtectedRoute><SelecaoNegocioPage /></ProtectedRoute>} />
                    <Route path="/planos" element={<ProtectedRoute><PlanosPage /></ProtectedRoute>} />
                    <Route path="/marketplace" element={<MarketplaceHome />} />
                    <Route path="/marketplace/category" element={<MarketplaceCategory />} />
                    <Route path="/loja/:storeId" element={<MarketplaceStore />} />
                    <Route path="/marketplace/store" element={<MarketplaceStore />} />
                    <Route path="/*" element={
                      <ProtectedRoute>
                        <MobileLayout>
                          <Routes>
                            <Route path="/perfil" element={<PerfilPage />} />
                          </Routes>
                        </MobileLayout>
                      </ProtectedRoute>
                    } />
                  </Routes>
                </Router>
              </FavoritesProvider>
            </CartProvider>
          </ThemeProvider>
        </OrderProvider>
      </StoreProvider>
    </AuthProvider>
  );
}
