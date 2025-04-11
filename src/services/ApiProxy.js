class ApiService {
  async fetchProducts() {
    // Simulated API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            name: "Classic T-Shirt",
            price: 29.99,
            description: "A comfortable classic t-shirt",
            image: "/images/tshirt.jpg",
            category: "clothing",
            size: "M",
            color: "Black"
          },
          // Add more products as needed
        ]);
      }, 1000);
    });
  }

  async fetchProduct(id) {
    // Simulated API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id,
          name: "Classic T-Shirt",
          price: 29.99,
          description: "A comfortable classic t-shirt",
          image: "/images/tshirt.jpg",
          category: "clothing",
          size: "M",
          color: "Black"
        });
      }, 1000);
    });
  }
}

class ApiProxy {
  constructor() {
    this.api = new ApiService();
    this.cache = new Map();
  }

  async fetchProducts() {
    if (this.cache.has('products')) {
      return this.cache.get('products');
    }

    const products = await this.api.fetchProducts();
    this.cache.set('products', products);
    return products;
  }

  async fetchProduct(id) {
    const cacheKey = `product-${id}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const product = await this.api.fetchProduct(id);
    this.cache.set(cacheKey, product);
    return product;
  }

  clearCache() {
    this.cache.clear();
  }
}

export default new ApiProxy(); 