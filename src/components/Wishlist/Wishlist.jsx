import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const [isClearing, setIsClearing] = useState(false);

  const handleAddToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  const handleClearWishlist = () => {
    setIsClearing(true);
    setTimeout(() => {
      clearWishlist();
      setIsClearing(false);
    }, 500);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Wishlist is Empty</h2>
          <p className="text-gray-600 mb-8">Add items that you like to your wishlist. Review them anytime and easily move them to the cart.</p>
          <Link 
            to="/products" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">My Wishlist</h1>
        <button
          onClick={handleClearWishlist}
          disabled={isClearing}
          className="flex items-center px-4 py-2 text-sm text-red-600 hover:text-red-700 transition-colors disabled:opacity-50"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear Wishlist
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <Link to={`/product/${product.id}`}>
              <div className="aspect-w-1 aspect-h-1 w-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              </div>
            </Link>
            <div className="p-4">
              <Link 
                to={`/product/${product.id}`}
                className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors"
              >
                {product.name}
              </Link>
              <p className="text-gray-600 mt-1">{formatPrice(product.price)}</p>
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex items-center px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 