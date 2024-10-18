import { fetchAllProducts } from "./api.js";

class ProductList {
  constructor() {
    this.data = [];
  }

  async init() {
    this.data = await this.loadProducts();
    console.log(this.data);
  }

  async loadProducts() {
    const response = await fetchAllProducts();
    if (!response) {
      console.error("제품 목록을 가져오지 못했습니다.");
      return null;
    }

    return response.results;
  }

  getData() {
    return this.data;
  }

  getProductById(id) {
    if (!this.data || !this.data.length) {
      console.error("제품 목록이 로드되지 않았습니다.");
      return null;
    }
    const foundProduct = this.data.find((product) => product.id === id);
    if (!foundProduct) {
      return null;
    }
    return foundProduct;
  }
}

export default new ProductList; // 인스턴스 내보내기
