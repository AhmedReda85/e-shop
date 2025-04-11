import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { createCart } from '../../services/CartState';
import { useCurrency } from "../../context/CurrencyContext";
import { useNavigate } from "react-router-dom";

export default function Cart({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const [cart, setCart] = useState(createCart());
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");

  const handleAddItem = (item) => {
    const newCart = cart.addItem(item);
    setCart(newCart);
  };

  const handleRemoveItem = (itemId) => {
    const newCart = cart.removeItem(itemId);
    setCart(newCart);
  };

  const subtotal = cart.getItems().reduce((total, item) => total + item.price * item.quantity, 0);
  const discountAmount = subtotal * (discount / 100);
  const total = subtotal - discountAmount;

  const handlePromoCode = (e) => {
    e.preventDefault();
    
    const validCodes = {
      SUMMER20: 100,
      WELCOME10: 10,
    };

    if (validCodes[promoCode.toUpperCase()]) {
      setDiscount(validCodes[promoCode.toUpperCase()]);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg z-50"
        >
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Shopping Cart</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="p-4 overflow-y-auto h-[calc(100vh-180px)]">
            {cart.getItems().length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                Your cart is empty
              </div>
            ) : (
              <div className="space-y-4">
                {cart.getItems().map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-600">${item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleAddItem(item)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-1 hover:bg-gray-200 rounded text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total:</span>
              <span className="text-xl font-bold">${formatPrice(total)}</span>
            </div>
            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              disabled={cart.getItems().length === 0}
            >
              Checkout
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 