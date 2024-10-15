import ProductList from "../js/productList.js";
import Header from "./Header.js";
import Footer from "./Footer.js";

class DetailPage {
  constructor() {
    this.productList = new ProductList();
    this.productId = null;
    this.init();
  }

  async init() {
    await this.productList.init();
    this.render();
  }

  async render() {
    const pathParts = window.location.pathname.split("/");
    this.productId = pathParts[2];
    const product = this.productList.getProductById(Number(this.productId));

    const $app = document.querySelector(".App");
    if (product) {
      $app.innerHTML = this.template(product);
      this.productCount();
    }
  }

  template(product) {
    return `
    ${Header.template()}
        <main>
      <div class="detail-page-wrapper">
        <div class="product-detail">
          <div class="img-wrapper" data-id="${product.id}">
            <img src="${product.image}" alt="상품이미지" />
          </div>
          <div class="info-wrapper">
            <div class="product-info">
              <div class="store">${product.store}</div>
              <div class="title" data-id="${product.id}">${product.title}</div>
              <div class="price">${product.price}<span>원</span></div>
            </div>
            <div class="buy-info">
              <div class="delivery">택배배송 / 무료배송</div>
              <div class="count-wrap">
                <button class="minus">
                  <img src="../src/assets/icon-minus-line.svg" alt="minus" />
                </button>
                <span class="count">1</span>
                <button class="plus">
                  <img src="../src/assets/icon-plus-line.svg" alt="" />
                </button>
              </div>
              <div class="price-info">
                <div >총 상품 금액</div>
                <div class="count-total">
                  <span>총 수량 <strong class="count-number">1</strong>개</span>
                  <span><strong class="total-price">${
                    product.price
                  }</strong>원</span>
                </div>
              </div>
              <div class="buy-btns">
                <button class="buy-now">바로 구매</button>
                <button class="cart-btn">장바구니</button>
              </div>
            </div>
          </div>
        </div>
        <div class="product-info-btn">
          <button class="active">버튼</button>
          <button>리뷰</button>
          <button>Q&A</button>
          <button>반품/교환정보</button>
        </div>
      </div>
    </main>
    ${Footer.template()}`;
  }

  productCount() {
    const minusBtn = document.querySelector(".minus");
    const plusBtn = document.querySelector(".plus");
    const countDisplay = document.querySelector(".count");
    const totalCount = document.querySelector(".count-number");

    // count의 최소 숫자는 1, 각 버튼을 눌러 수량 +,- 할수있음.

    let count = 1;

    minusBtn.addEventListener("click", () => {
      if (count > 1) {
        count--;
        countDisplay.textContent = count;
        totalCount.textContent = count;
        this.updateTotalPrice(count);
      }
    });

    plusBtn.addEventListener("click", () => {
      count++;
      countDisplay.textContent = count;
      totalCount.textContent = count;
      this.updateTotalPrice(count);
    });
  }

  updateTotalPrice(count) {
    const product = this.productList.getProductById(Number(this.productId));
    const totalPriceDisplay = document.querySelector(".total-price");

    // product.prce를 콤마 제거하고 10진수로 숫자 변경
    const price = parseInt(product.price.replace(/,/g, ""), 10);
    // 선택한 수량만큼 화면에 rendering
    const totalPrice = price * count;
    totalPriceDisplay.textContent = totalPrice.toLocaleString();
  }
}

export default new DetailPage();
