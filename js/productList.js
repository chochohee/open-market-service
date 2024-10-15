class ProductList {
  constructor() {
    this.data = null;
    this.init();
  }
  async init() {
    try {
      const response = await fetch("./src/product.json");
      this.data = await response.json();
      console.log(this.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  getData() {
    return this.data;
  }

  getProductById(id) {
    return this.data?.products.find((product) => product.id === id);
  }
}

export default ProductList;
