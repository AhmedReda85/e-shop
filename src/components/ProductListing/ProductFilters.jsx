import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function ProductFilters({ filters, onFilterChange }) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    size: true,
    color: true,
    price: true,
    sort: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const categories = ['Men', 'Women', 'Kids'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Pink'];

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full mb-2"
        >
          <h3 className="font-medium">Categories</h3>
          {expandedSections.category ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
        {expandedSections.category && (
          <div className="space-y-2">
            {categories.map(category => (
              <label key={category} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === category}
                  onChange={() => onFilterChange({ category })}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">{category}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Sizes */}
      <div>
        <button
          onClick={() => toggleSection('size')}
          className="flex items-center justify-between w-full mb-2"
        >
          <h3 className="font-medium">Sizes</h3>
          {expandedSections.size ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
        {expandedSections.size && (
          <div className="flex flex-wrap gap-2">
            {sizes.map(size => (
              <button
                key={size}
                onClick={() => onFilterChange({ size: filters.size === size ? '' : size })}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.size === size
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Colors */}
      <div>
        <button
          onClick={() => toggleSection('color')}
          className="flex items-center justify-between w-full mb-2"
        >
          <h3 className="font-medium">Colors</h3>
          {expandedSections.color ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
        {expandedSections.color && (
          <div className="flex flex-wrap gap-2">
            {colors.map(color => (
              <button
                key={color}
                onClick={() => onFilterChange({ color: filters.color === color ? '' : color })}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.color === color
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div>
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full mb-2"
        >
          <h3 className="font-medium">Price Range</h3>
          {expandedSections.price ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
        {expandedSections.price && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="number"
                min="0"
                max="1000"
                value={filters.priceRange[0]}
                onChange={(e) => onFilterChange({
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
                onChange={(e) => onFilterChange({
                  priceRange: [filters.priceRange[0], parseInt(e.target.value)]
                })}
                className="w-24 px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Sort By */}
      <div>
        <button
          onClick={() => toggleSection('sort')}
          className="flex items-center justify-between w-full mb-2"
        >
          <h3 className="font-medium">Sort By</h3>
          {expandedSections.sort ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
        {expandedSections.sort && (
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ sortBy: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        )}
      </div>
    </div>
  );
} 