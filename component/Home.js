import Header from "./Header.js";
import Footer from "./Footer.js";
import ProductList from "../js/productList.js";

class Home {
  constructor() {
    this.productList = ProductList;
    this.init();
  }

  async init() {
    try {
      await this.productList.init();
      this.render();
      console.log("Home초기화");
    } catch (error) {
      console.error("home 초기화 오류 :", error);
    }
  }

  render() {
    const html = this.template(); // 템플릿 생성
    const $app = document.querySelector(".App"); // .App 요소 선택
    $app.innerHTML = html; // HTML 렌더링
  }

  template() {
    const data = this.productList.getData();
    let productListHtml = "<p>상품정보를 가져오는중입니다.</p>";

    if (data && data.length > 0) {
      productListHtml = data
        .map(
          (product) => `
          <li class="product-wrap" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" />
            <div class="product-store">${product.seller?.name}</div>
            <div class="product-title">${product.name}</div>
            <div class="product-price">${Number(
              product.price
            ).toLocaleString()}<span>원</span></div>
          </li>
      `
        )
        .join("");
    } else {
      productListHtml = "<p>등록된 상품이 없습니다.</p>"; // 상품이 없을 때의 메시지
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

export default Home;
