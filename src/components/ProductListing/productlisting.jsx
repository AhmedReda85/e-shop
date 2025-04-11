import { useState, useEffect } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import CategoryFilter from "../CategoryFilter/categoryfilter";
import { useCart } from "../../context/CartContext";
import { useCurrency } from "../../context/CurrencyContext";
import { SlidersHorizontal, X, ShoppingCart, Heart, Filter, Grid, List, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from 'framer-motion';

export default function ProductListing() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: [],
    size: [],
    color: [],
    priceRange: [0, 1000],
    sortBy: 'featured'
  });

  // Get category from URL params
  const categoryParam = searchParams.get('category');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Fetch from local JSON file
        const response = await fetch("/data/products.json");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        
        // Apply category filter from URL if present
        if (categoryParam) {
          const filtered = data.filter(product => 
            product.category.toLowerCase() === categoryParam.toLowerCase()
          );
          setFilteredProducts(filtered);
          setFilters(prev => ({ ...prev, category: [categoryParam] }));
        } else {
          setFilteredProducts(data);
        }
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryParam]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    let filtered = [...products];

    // Apply category filter
    if (newFilters.category.length > 0) {
      filtered = filtered.filter(product => 
        newFilters.category.includes(product.category)
      );
    }

    // Apply size filter
    if (newFilters.size.length > 0) {
      filtered = filtered.filter(product => 
        product.size && newFilters.size.includes(product.size)
      );
    }

    // Apply color filter
    if (newFilters.color.length > 0) {
      filtered = filtered.filter(product => 
        product.color && newFilters.color.includes(product.color)
      );
    }

    // Apply price range filter
    filtered = filtered.filter(product => 
      product.price >= newFilters.priceRange[0] && 
      product.price <= newFilters.priceRange[1]
    );

    // Apply sorting
    switch (newFilters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // Keep original order for 'featured' and 'popular'
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 lg:w-72">
          <div className="md:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>
          
          <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center text-blue-600 hover:text-blue-700 md:hidden"
                >
                  {showFilters ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
              </div>

              <div className="space-y-6">
                {/* Categories */}
                <div>
                  <h3 className="font-medium mb-2">Categories</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {['T-Shirts', 'Shirts', 'Pants', 'Jeans', 'Dresses', 'Sweaters', 'Jackets', 'Accessories'].map(category => (
                      <label key={category} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={filters.category.includes(category)}
                          onChange={() => {
                            const newCategories = filters.category.includes(category)
                              ? filters.category.filter(c => c !== category)
                              : [...filters.category, category];
                            
                            handleFilterChange({ ...filters, category: newCategories });
                          }}
                          className="rounded text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <h3 className="font-medium mb-2">Sizes</h3>
                  <div className="flex flex-wrap gap-2">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                      <button
                        key={size}
                        onClick={() => {
                          const newSizes = filters.size.includes(size)
                            ? filters.size.filter(s => s !== size)
                            : [...filters.size, size];
                          
                          handleFilterChange({ ...filters, size: newSizes });
                        }}
                        className={`px-3 py-1 rounded-full text-sm ${
                          filters.size.includes(size)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <h3 className="font-medium mb-2">Colors</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Pink'].map(color => (
                      <button
                        key={color}
                        onClick={() => {
                          const newColors = filters.color.includes(color)
                            ? filters.color.filter(c => c !== color)
                            : [...filters.color, color];
                          
                          handleFilterChange({ ...filters, color: newColors });
                        }}
                        className={`px-3 py-1 rounded-full text-sm ${
                          filters.color.includes(color)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-medium mb-2">Price Range</h3>
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      min="0"
                      max="1000"
                      value={filters.priceRange[0]}
                      onChange={(e) => handleFilterChange({
                        ...filters,
                        priceRange: [parseInt(e.target.value), filters.priceRange[1]]
                      })}
                      className="w-24 px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span>to</span>
                    <input
                      type="number"
                      min="0"
                      max="1000"
                      value={filters.priceRange[1]}
                      onChange={(e) => handleFilterChange({
                        ...filters,
                        priceRange: [filters.priceRange[0], parseInt(e.target.value)]
                      })}
                      className="w-24 px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <h3 className="font-medium mb-2">Sort By</h3>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange({ ...filters, sortBy: e.target.value })}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {/* View Options */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-gray-600">
              {filteredProducts.length} products found
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${
                  viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${
                  viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Products */}
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                <div className={`relative group ${viewMode === 'list' ? 'w-1/3' : ''}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full ${viewMode === 'list' ? 'h-full' : 'h-64'} object-cover`}
                  />
                  <div className="absolute top-2 right-2 space-x-2">
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                      <Heart className="h-5 w-5 text-gray-600" />
                    </button>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                    >
                      <ShoppingCart className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>
                <div className={`p-4 ${viewMode === 'list' ? 'w-2/3' : ''}`}>
                  <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-xl font-bold text-blue-600">{formatPrice(product.price)}</span>
                    {product.size && (
                      <span className="text-sm text-gray-500">Size: {product.size}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
