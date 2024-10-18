import Header from "./Header.js";
import Footer from "./Footer.js";
import productList from "../js/productList.js";
class DetailPage {
  constructor() {
    this.productList = productList;
  }

  async init() {
    await this.productList.init();
    this.render();
  }

  async render() {
    const pathParts = window.location.hash.split("/");
    console.log(pathParts);
    this.productId = pathParts[2];
    console.log(this.productId);
    const product = await this.productList.getProductById(
      Number(this.productId)
    );
    console.log(this.productId);

    const $app = document.querySelector(".App");
    if (product) {
      $app.innerHTML = this.template(product);
      this.productCount(product);
    } else {
      $app.innerHTML = "<p>제품을 찾을 수 없습니다.</p>";
    }
  }

  template(product) {
    let shippingText =
      product.shipping_method === "PARCEL" ? "택배배송" : "직접배송(화물배달)";

    let shippingFee =
      product.shipping_fee === 0
        ? "무료배송"
        : `${Number(product.shipping_fee).toLocaleString()}원`;

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
              <div class="store">${product.seller.name}</div>
              <div class="title" data-id="${product.id}">${product.name}</div>
              <div class="price">${Number(
                product.price
              ).toLocaleString()}<span>원</span></div>
            </div>
            <div class="buy-info">
              <div class="delivery">${shippingText} / ${shippingFee}</div>
              <div class="count-wrap">
                <button class="minus">
                  <img src="../src/assets/icon-minus-line.svg" alt="minus" />
                </button>
                <span class="count">1</span>
                <button class="plus">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 9.5H20" stroke="currentColor" stroke-width="2"/>
                  <path d="M10 20L10 0" stroke="currentColor" stroke-width="2"/>
                  </svg>
                </button>
              </div>
              <div class="price-info">
                <div >총 상품 금액</div>
                <div class="count-total">
                  <span>총 수량 <strong class="count-number">1</strong>개</span>
                  <span><strong class="total-price">${Number(
                    product.price
                  ).toLocaleString()}</strong>원</span>
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

  async productCount() {
    const minusBtn = document.querySelector(".minus");
    const plusBtn = document.querySelector(".plus");
    const countDisplay = document.querySelector(".count");
    const totalCount = document.querySelector(".count-number");

    const product = await this.productList.getProductById(
      Number(this.productId)
    );
    // count의 최소 숫자는 1, 각 버튼을 눌러 수량 +,- 할수있음.

    let count = 1;

    this.buttonStyle(count, product.stock);
    this.updateTotalPrice(count, product.price);

    minusBtn.addEventListener("click", () => {
      if (count > 1) {
        count--;
        countDisplay.textContent = count;
        totalCount.textContent = count;
        this.updateTotalPrice(count, product.price);
        this.buttonStyle(count, product.stock);
      }
    });

    plusBtn.addEventListener("click", () => {
      if (count < product.stock) {
        count++;
        countDisplay.textContent = count;
        totalCount.textContent = count;
        this.updateTotalPrice(count, product.price);
        this.buttonStyle(count, product.stock);
      }
    });
  }

  buttonStyle(count, stock) {
    const plusBtn = document.querySelector(".plus");

    if (count >= stock) {
      plusBtn.disabled = true;
    } else {
      plusBtn.disabled = false;
    }
  }

  updateTotalPrice(count, price) {
    const totalPriceDisplay = document.querySelector(".total-price");
    // 선택한 수량만큼 화면에 rendering
    const totalPrice = price * count;
    totalPriceDisplay.textContent = totalPrice.toLocaleString();
  }
}

export default DetailPage;
