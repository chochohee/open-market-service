import Header from "./Header.js";
import Footer from "./Footer.js";
import ProductList from "../js/productList.js";
class Home {
  constructor() {
    this.productList = new ProductList();
    this.init();
  }

  async init() {
    await this.productList.init();
    this.render();
  }

  render() {
    const html = this.template(); // 템플릿 생성
    const $app = document.querySelector(".App"); // .App 요소 선택
    $app.innerHTML = html; // HTML 렌더링
  }

  template() {
    const data = this.productList.getData();
    let productListHtml = "<p>상품정보를 가져오는중입니다.</p>";

    if (data && data.products) {
      productListHtml = data.products
        .map(
          (product) => `
          <li class="product-wrap" data-id="${product.id}">
            <img src="${product.image}" alt="" />
            <div class="product-store">${product.store}</div>
            <div class="product-title">${product.title}</div>
            <div class="product-price">${product.price}<span>원</span></div>
          </li>
      `
        )
        .join("");
    }
    return `    
    ${Header.template()}
    <main>
      <div class="slide-img-wrap">
        <button class="left"></button>
        <button class="right"></button>
        <div class="slide-list-btn">
          <button class="active"></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
        </div>
      </div>
      <ul class="main-product">
        ${productListHtml}
      </ul>
    </main>
    ${Footer.template()}    
        `;
  }
}

export default new Home();
