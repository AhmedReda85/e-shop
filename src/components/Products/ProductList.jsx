import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductFactory from '../../services/ProductFactory';
import ApiProxy from '../../services/ApiProxy';
import { ShoppingCart, Heart, Grid, List, Filter } from 'lucide-react';
import ProductFilters from './ProductFilters';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const rawProducts = await ApiProxy.fetchProducts();
        const processedProducts = rawProducts.map(product => 
          ProductFactory.createProduct(product.category, product)
        );
        setProducts(processedProducts);
        setFilteredProducts(processedProducts);
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (filters) => {
    let filtered = [...products];

    // Apply category filter
    if (filters.category.length > 0) {
      filtered = filtered.filter(product => 
        filters.category.includes(product.category)
      );
    }

    // Apply size filter
    if (filters.size.length > 0) {
      filtered = filtered.filter(product => 
        product.size && filters.size.includes(product.size)
      );
    }

    // Apply color filter
    if (filters.color.length > 0) {
      filtered = filtered.filter(product => 
        product.color && filters.color.includes(product.color)
      );
    }

    // Apply price range filter
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange[0] && 
      product.price <= filters.priceRange[1]
    );

    // Apply sorting
    switch (filters.sortBy) {
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
            <ProductFilters onFilterChange={handleFilterChange} />
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
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                      <ShoppingCart className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>
                <div className={`p-4 ${viewMode === 'list' ? 'w-2/3' : ''}`}>
                  <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-xl font-bold text-blue-600">${product.price}</span>
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