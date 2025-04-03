import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useAuth } from '../../context/AuthContext';
import { useUserHistory } from '../../context/UserHistoryContext';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Image, Star, StarHalf, Heart, MessageSquare } from 'lucide-react';

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

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }
        return res.json();
      })
      .then((data) => {
        const foundProduct = data.find((p) => p.id === parseInt(id));
        if (!foundProduct) {
          navigate('/products');
          return;
        }
        setProduct(foundProduct);
        setLoading(false);
        
        // Fetch related products (same category)
        const related = data.filter((p) => p.category === foundProduct.category && p.id !== foundProduct.id);
        setRelatedProducts(related.slice(0, 4));
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
        navigate('/products');
      });
  }, [id, navigate]);

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return null;
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

    // Here you would typically send the review to your backend
    // For now, we'll just show a success message
    setReviewText("");
    setRating(5);
    setError("");
  };

  const canReview = user && hasPurchasedProduct(user.id, product.id);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-blue-600 mb-8"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {imageError ? (
            <div className="w-full h-[500px] bg-gray-100 rounded-lg shadow-lg flex items-center justify-center">
              <Image className="w-16 h-16 text-gray-400" />
            </div>
          ) : (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[500px] object-cover rounded-lg shadow-lg"
              onError={handleImageError}
            />
          )}
          <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition">
            <Heart className="text-gray-600" size={24} />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-semibold text-blue-600">
              {formatPrice(product.price)}
            </p>
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="ml-1 text-gray-600">{calculateAverageRating(product.reviews)}</span>
              <span className="ml-1 text-gray-500">({product.reviews?.length || 0} reviews)</span>
            </div>
          </div>
          <p className="text-gray-600">{product.description}</p>

          {/* Size Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Select Size</h3>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-lg transition ${
                    selectedSize === size
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300 hover:border-blue-600"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Select Color</h3>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border rounded-lg transition ${
                    selectedColor === color
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300 hover:border-blue-600"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Quantity</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="px-3 py-1 border rounded-lg hover:bg-gray-100"
              >
                -
              </button>
              <span className="text-lg font-medium">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="px-3 py-1 border rounded-lg hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>

          {error && (
            <p className="mt-4 text-red-600 text-sm">{error}</p>
          )}

          {/* Reviews Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <MessageSquare size={24} />
              Reviews
            </h2>

            {/* Review Form */}
            {canReview && (
              <form onSubmit={handleReviewSubmit} className="mb-8">
                <div className="mb-4">
                  <label className="block font-medium mb-2">Your Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                      >
                        <Star
                          size={24}
                          className={`${
                            star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block font-medium mb-2">Your Review</label>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="4"
                    placeholder="Share your experience with this product..."
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Submit Review
                </button>
              </form>
            )}

            {!canReview && user && (
              <p className="text-gray-600 mb-6">
                You need to purchase this product to leave a review.
              </p>
            )}

            {!user && (
              <p className="text-gray-600 mb-6">
                Please log in to leave a review.
              </p>
            )}

            {/* Reviews List */}
            <div className="space-y-6">
              {product.reviews.map((review) => (
                <div key={review.id} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">{review.user}</h3>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${
                              i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-600">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
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
        </motion.div>
      </div>
    </div>
  );
} 