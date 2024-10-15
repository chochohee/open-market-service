import { getLoggedIn, state } from "../js/loggedIn.js";

class Header {
  template() {
    const loggedInState = getLoggedIn();
    const currentPath = window.location.pathname;
    const isCartPage = currentPath === "/cart";
    console.log("현재 로그인상태:", state);
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
        <a href="/cart" class="cart-btn ${
          isCartPage ? "active" : ""
        }">장바구니</a>
        ${
          !loggedInState
            ? '<a href="/login" class="login-btn">로그인</a>'
            : '<a href="#" class="my-page">마이페이지</a>'
        }
      </div>
    </header>
    `;
  }
}

export default new Header();
