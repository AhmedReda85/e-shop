import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function FeaturedProducts() {
    const { addToCart } = useCart();
    const products = [
      { id: 1, name: "Casual Shirt", price: 29.99, image: "src/assets/shirt.jpg" },
      { id: 2, name: "Denim Jacket", price: 49.99, image: "src/assets/jacket.jpg" },
      { id: 3, name: "Running Shoes", price: 59.99, image: "src/assets/shoes.jpg" },
      { id: 4, name: "Summer Dress", price: 39.99, image: "src/assets/dress.jpg" }
    ];
  
    return (
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-60 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-blue-600 font-medium">EGP {product.price.toFixed(2)}</p>
                </Link>
                <button 
                  onClick={() => addToCart(product)}
                  className="mt-4 w-full px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  