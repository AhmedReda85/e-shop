class Product {
  constructor(id, name, price, description, image, category) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.image = image;
    this.category = category;
  }
}

class ClothingProduct extends Product {
  constructor(id, name, price, description, image, category, size, color) {
    super(id, name, price, description, image, category);
    this.size = size;
    this.color = color;
  }
}

class AccessoryProduct extends Product {
  constructor(id, name, price, description, image, category, material) {
    super(id, name, price, description, image, category);
    this.material = material;
  }
}

class ProductFactory {
  static createProduct(type, productData) {
    switch (type) {
      case 'clothing':
        return new ClothingProduct(
          productData.id,
          productData.name,
          productData.price,
          productData.description,
          productData.image,
          productData.category,
          productData.size,
          productData.color
        );
      case 'accessory':
        return new AccessoryProduct(
          productData.id,
          productData.name,
          productData.price,
          productData.description,
          productData.image,
          productData.category,
          productData.material
        );
      default:
        return new Product(
          productData.id,
          productData.name,
          productData.price,
          productData.description,
          productData.image,
          productData.category
        );
    }
  }
}

export default ProductFactory; 