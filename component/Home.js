import Header from "./Header.js";
import Footer from "./Footer.js";
class Home {
  constructor() {
    this.data = null;
    this.init();
  }

  async init() {
    try {
      const response = await fetch("./src/product.json");
      const data = await response.json();
      this.data = data;
      this.render();
    } catch (error) {
      console.error(error.message);
    }
  }

  render() {
    const html = this.template(); // 템플릿 생성
    const $app = document.querySelector(".App"); // .App 요소 선택
    $app.innerHTML = html; // HTML 렌더링
  }

  template() {
    if (!this.data) return "<p>상품정보를 가져오는중입니다.</p>";

    const productList = this.data.products
      .map(
        (product) => `
          <li class="product-wrap">
            <img src="${product.image}" alt="" />
            <div class="product-store">${product.store}</div>
            <div class="product-title">${product.title}</div>
            <div class="product-price">${product.price}<span>원</span></div>
          </li>
      `
      )
      .join("");
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
        ${productList}
      </ul>
    </main>
    ${Footer.template()}    
        `;
  }
}

export default new Home();
