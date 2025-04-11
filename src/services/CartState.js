class CartState {
  constructor() {
    this.items = [];
    this.total = 0;
  }

  addItem(item) {
    this.items.push(item);
    this.calculateTotal();
  }

  removeItem(itemId) {
    this.items = this.items.filter(item => item.id !== itemId);
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.items.reduce((sum, item) => sum + item.price, 0);
  }

  getItems() {
    return this.items;
  }

  getTotal() {
    return this.total;
  }

  clear() {
    this.items = [];
    this.total = 0;
  }
}

class EmptyCartState extends CartState {
  addItem(item) {
    super.addItem(item);
    return new FilledCartState(this.items, this.total);
  }
}

class FilledCartState extends CartState {
  constructor(items, total) {
    super();
    this.items = items;
    this.total = total;
  }

  removeItem(itemId) {
    super.removeItem(itemId);
    if (this.items.length === 0) {
      return new EmptyCartState();
    }
    return this;
  }
}

export const createCart = () => new EmptyCartState(); 