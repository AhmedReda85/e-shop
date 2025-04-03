import { useNavigate } from 'react-router-dom';

export default function CategoryShowcase() {
    const navigate = useNavigate();
    const categories = [
      { name: "Men", image: "src/assets/men.jpg" },
      { name: "Women", image: "src/assets/women.jpg" },
      { name: "Boys", image: "src/assets/boys.jpg" },
      { name: "Girls", image: "src/assets/girls.jpg" }
    ];
  
    const handleCategoryClick = (category) => {
      navigate('/products', { state: { selectedCategory: category } });
    };
  
    return (
      <section className="py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div 
                key={category.name} 
                className="relative group cursor-pointer"
                onClick={() => handleCategoryClick(category.name)}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-60 object-cover rounded-lg shadow-md transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition">
                  <span className="text-white text-xl font-semibold">{category.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  