class DetailPage {
  template() {
    return `
    ${Header.template()}
        <main>
      <div class="detail-page-wrapper">
        <div class="product-detail">
          <div class="img-wrapper">
            <img src="../src/assets/productImg/무릎담요.png" alt="상품이미지" />
          </div>
          <div class="info-wrapper">
            <div class="product-info">
              <div class="store">백엔드 글로벌</div>
              <div class="title">딥러닝 개발자 무릎담요</div>
              <div class="price">17,500<span>원</span></div>
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
                <div class="total-price">총 상품 금액</div>
                <div class="count-total">
                  <span>총 수량 <strong class="count-number">1</strong>개</span>
                  <span><strong>17,500</strong>원</span>
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
}

export default new DetailPage();
