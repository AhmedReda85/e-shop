import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useAuth } from '../../context/AuthContext';
import { useUserHistory } from '../../context/UserHistoryContext';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Image, Star, StarHalf, Heart, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const { user } = useAuth();
  const { hasPurchasedProduct } = useUserHistory();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [imageError, setImageError] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [error, setError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const productImages = product ? [
    product.image,
  ] : [];

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch('/data/products.json');
      if (!response.ok) throw new Error('Failed to fetch product');
      const data = await response.json();
      const foundProduct = data.find(p => p.id === parseInt(id));
      if (!foundProduct) throw new Error('Product not found');
      setProduct(foundProduct);
      if (foundProduct.sizes?.length) setSelectedSize(foundProduct.sizes[0]);
      if (foundProduct.colors?.length) setSelectedColor(foundProduct.colors[0]);
      
      // Fetch related products (same category)
      const related = data.filter((p) => p.category === foundProduct.category && p.id !== foundProduct.id);
      setRelatedProducts(related.slice(0, 4));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-center">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      setError("Please select size and color");
      return;
    }
    addToCart({
      ...product,
      quantity,
      size: selectedSize,
      color: selectedColor,
    });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      setError("Please log in to leave a review");
      return;
    }

    if (!hasPurchasedProduct(user.id, product.id)) {
      setError("You can only review products you have purchased");
      return;
    }

    
    setReviewText("");
    setRating(5);
    setError("");
  };

  const canReview = user && hasPurchasedProduct(user.id, product.id);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <img
            src={productImages[currentImageIndex]}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Product Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-2xl font-bold text-blue-600">${formatPrice(product.price)}</p>
          <p className="text-gray-600">{product.description}</p>

          {/* Size Selection */}
          {product.sizes && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md ${
                      selectedSize === size
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-blue-600'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {product.colors && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-md ${
                      selectedColor === color
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-blue-600'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selection */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Quantity</h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 border rounded-md hover:bg-gray-50"
              >
                -
              </button>
              <span className="text-lg font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 border rounded-md hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Add to Cart</span>
          </button>

          {/* Reviews */}
          {product.reviews && product.reviews.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Customer Reviews</h3>
              <div className="space-y-4">
                {product.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{review.user}</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-lg ${
                              i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Related Products */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-4">Related Products</h3>
        <div className="grid grid-cols-2 gap-4">
          {relatedProducts.map((relatedProduct) => (
            <Link
              key={relatedProduct.id}
              to={`/product/${relatedProduct.id}`}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="w-full h-32 object-cover transition-transform group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = '/images/products/placeholder.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity"></div>
              </div>
              <p className="mt-2 text-sm font-medium">{relatedProduct.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 