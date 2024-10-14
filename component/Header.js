class Header {
  template() {
    return `
        <header>
      <div class="main-logo-wrap">
        <h1 class="main-logo"><a href="#"></a></h1>
        <form class="search-box">
          <input type="text" placeholder="상품을 검색해보세요!" />
          <button></button>
        </form>
      </div>
      <div class="main-header-btn">
        <a href="./pages/ShoppingCart.html" class="cart-btn">장바구니</a>
        <a href="./pages/LoginPage.html" class="login-btn">로그인</a>
      </div>
    </header>
        `;
  }
}

export default new Header();
