import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const categories = [
  {
    id: 'men',
    name: 'Men',
    image: '/images/products/men.jpg',
    description: 'Discover our latest collection of men\'s clothing'
  },
  {
    id: 'women',
    name: 'Women',
    image: '/images/products/women.jpg',
    description: 'Explore our stylish women\'s fashion line'
  },
  {
    id: 'kids',
    name: 'Kids',
    image: '/images/products/boys.jpg',
    description: 'Find the perfect outfits for your little ones'
  }
];

export default function CategoryShowcase() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={category.image}
                  alt={category.name}
                  className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-200 text-sm">
                  {category.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
  