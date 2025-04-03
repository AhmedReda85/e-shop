import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { AuthProvider } from './context/AuthContext';
import { UserHistoryProvider } from './context/UserHistoryContext';
import Navigation from './components/Navigation/Navigation';
import HeroSection from './components/HeroSection/herosection';
import CategoryShowcase from './components/CategoryShowcase/categoryshowcase';
import ProductListing from './components/ProductListing/productlisting';
import ProductPage from './components/ProductPage/ProductPage';
import Cart from './components/Cart/Cart';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import UserHistory from './components/UserHistory/UserHistory';
import Checkout from './components/Checkout/Checkout';
import OrderSuccess from './components/Checkout/OrderSuccess';

function App() {
  return (
    <AuthProvider>
      <CurrencyProvider>
        <CartProvider>
          <UserHistoryProvider>
            <Router>
              <div className="min-h-screen bg-gray-50">
                <Navigation />
                <Routes>
                  <Route
                    path="/"
                    element={
                      <>
                        <HeroSection />
                        <CategoryShowcase />
                      </>
                    }
                  />
                  <Route path="/products" element={<ProductListing />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/history" element={<UserHistory />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-success" element={<OrderSuccess />} />
                </Routes>
              </div>
            </Router>
          </UserHistoryProvider>
        </CartProvider>
      </CurrencyProvider>
    </AuthProvider>
  );
}

export default App;
