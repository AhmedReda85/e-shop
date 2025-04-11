import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { AuthProvider } from './context/AuthContext';
import { UserHistoryProvider } from './context/UserHistoryContext';
import { WishlistProvider } from './context/WishlistContext';
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import CategoryShowcase from './components/CategoryShowcase/categoryshowcase';
import ProductListing from './components/ProductListing/productlisting';
import ProductPage from './components/ProductPage/ProductPage';
import Cart from './components/Cart/Cart';
import Wishlist from './components/Wishlist/Wishlist';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import UserHistory from './components/UserHistory/UserHistory';
import Checkout from './components/Checkout/Checkout';
import OrderSuccess from './components/Checkout/OrderSuccess';
import Home from './components/Home/Home';

function App() {
  return (
    <AuthProvider>
      <CurrencyProvider>
        <CartProvider>
          <WishlistProvider>
            <UserHistoryProvider>
              <Router>
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <main>
                    <Routes>
                      <Route path="/" element={
                        <>
                          <HeroSection />
                          <CategoryShowcase />
                        </>
                      } />
                      <Route path="/products" element={<ProductListing />} />
                      <Route path="/product/:id" element={<ProductPage />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/wishlist" element={<Wishlist />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/order-success" element={<OrderSuccess />} />
                      <Route path="/user-history" element={<UserHistory />} />
                    </Routes>
                  </main>
                </div>
              </Router>
            </UserHistoryProvider>
          </WishlistProvider>
        </CartProvider>
      </CurrencyProvider>
    </AuthProvider>
  );
}

export default App;
