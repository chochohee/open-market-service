import { state } from "../js/state.js";
class Header {
  template() {
    console.log("현재 로그인상태:", state.isLoggedIn);

    return `
      <header>
      <div class="main-logo-wrap">
        <h1 class="main-logo"><a href="/"></a></h1>
        <form class="search-box">
          <input type="text" placeholder="상품을 검색해보세요!" />
          <button>검색</button>
        </form>
      </div>
      <div class="main-header-btn">
        <a href="#/cart" class="cart-btn">장바구니</a>
          ${
            state.isLoggedIn
              ? '<a href="#" class="my-page-btn">마이페이지</a>'
              : '<a href="#/login" class="login-btn">로그인</a>'
          }
          
      </div>
        <div class="my-page-modal">
          <button class="my-page">마이페이지</button>
          <button class="logout">로그아웃</button>
        </div>
    </header>
    `;
  }
}

export default new Header();
