import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';

export default function ProductFilters({ onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: [],
    size: [],
    color: [],
    priceRange: [0, 1000],
    sortBy: 'featured'
  });

  const categories = ['T-Shirts', 'Shirts', 'Pants', 'Jeans', 'Dresses', 'Sweaters', 'Jackets', 'Accessories'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Pink'];
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'popular', label: 'Most Popular' }
  ];

  const handleCategoryChange = (category) => {
    const newCategories = filters.category.includes(category)
      ? filters.category.filter(c => c !== category)
      : [...filters.category, category];
    
    const newFilters = { ...filters, category: newCategories };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSizeChange = (size) => {
    const newSizes = filters.size.includes(size)
      ? filters.size.filter(s => s !== size)
      : [...filters.size, size];
    
    const newFilters = { ...filters, size: newSizes };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleColorChange = (color) => {
    const newColors = filters.color.includes(color)
      ? filters.color.filter(c => c !== color)
      : [...filters.color, color];
    
    const newFilters = { ...filters, color: newColors };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (min, max) => {
    const newFilters = { ...filters, priceRange: [min, max] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (value) => {
    const newFilters = { ...filters, sortBy: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center text-blue-600 hover:text-blue-700"
        >
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
      </div>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        className="overflow-hidden"
      >
        <div className="space-y-6">
          {/* Categories */}
          <div>
            <h3 className="font-medium mb-2">Categories</h3>
            <div className="grid grid-cols-2 gap-2">
              {categories.map(category => (
                <label key={category} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.category.includes(category)}
                    onChange={() => handleCategoryChange(category)}
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
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => handleSizeChange(size)}
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
              {colors.map(color => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
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
                onChange={(e) => handlePriceChange(parseInt(e.target.value), filters.priceRange[1])}
                className="w-24 px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span>to</span>
              <input
                type="number"
                min="0"
                max="1000"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(filters.priceRange[0], parseInt(e.target.value))}
                className="w-24 px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Sort By */}
          <div>
            <h3 className="font-medium mb-2">Sort By</h3>
            <select
              value={filters.sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 