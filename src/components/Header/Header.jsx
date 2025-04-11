import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useCurrency } from '../../context/CurrencyContext';

export default function Header() {
  const location = useLocation();
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const { currency, changeCurrency } = useCurrency();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isCurrencyOpen) setIsCurrencyOpen(false);
  };

  const toggleCurrency = () => {
    setIsCurrencyOpen(!isCurrencyOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const currencies = ['USD', 'EUR', 'GBP', 'EGP'];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-blue-600">
            E-Shop
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-gray-700 hover:text-blue-600 transition-colors ${
                location.pathname === '/' ? 'font-medium text-blue-600' : ''
              }`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`text-gray-700 hover:text-blue-600 transition-colors ${
                location.pathname === '/products' ? 'font-medium text-blue-600' : ''
              }`}
            >
              Products
            </Link>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={toggleCurrency}
                className="flex items-center space-x-1 p-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <span>{currency}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {isCurrencyOpen && (
                <div className="absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg py-1 z-10">
                  {currencies.map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        changeCurrency(curr);
                        setIsCurrencyOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        currency === curr
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Cart */}
            <Link 
              to="/cart" 
              className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* User Account / Login */}
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleMenu}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <User className="h-5 w-5" />
                </button>
                
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link 
                      to="/orders" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/login" 
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <User className="h-5 w-5" />
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-2 border-t border-gray-200">
            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                className={`px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md ${
                  location.pathname === '/' ? 'font-medium text-blue-600 bg-blue-50' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className={`px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md ${
                  location.pathname === '/products' ? 'font-medium text-blue-600 bg-blue-50' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              {user ? (
                <>
                  <Link
                    to="/profile" 
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link 
                    to="/orders" 
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 