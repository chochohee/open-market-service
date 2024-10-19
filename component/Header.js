import { state } from "../js/state.js";
export default class Header {
  constructor() {
    this.mypageBtn = null;
    this.mypageModal = null;
    this.logoutBtn = null;
  }

  init() {
    this.mypageBtn = document.querySelector(".my-page-btn");
    this.mypageModal = document.querySelector(".my-page-modal");
    this.logoutBtn = document.querySelector(".logout");

    this.setupMypageModal();
    this.setupLogout();
  }

  setupMypageModal() {
    if (this.mypageBtn) {
      this.mypageBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.mypageModal.classList.toggle("none");
        this.mypageBtn.classList.toggle("active");
      });

      document.addEventListener("click", (e) => {
        if (
          !this.mypageModal.contains(e.target) &&
          !this.mypageBtn.contains(e.target)
        ) {
          this.mypageModal.classList.add("none");
          this.mypageBtn.classList.remove("active");
        }
      });
    }
  }

  setupLogout() {
    if (this.logoutBtn) {
      this.logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        sessionStorage.removeItem("accessToken");
        state.isLoggedIn = false;
        location.reload();
      });
    }
  }

  template() {
    console.log("현재 로그인상태:", state.isLoggedIn);

    return `
      <header>
      <div class="main-logo-wrap">
        <h1 class="main-logo">
         <button class="logo-btn"> </button>
        </h1>
        <form class="search-box">
          <input type="text" placeholder="상품을 검색해보세요!" />
          <button type="button">검색</button>
        </form>
      </div>
      <div class="main-header-btn">
        <a class="cart-btn">장바구니</a>
          ${
            state.isLoggedIn
              ? '<a class="my-page-btn">마이페이지</a>'
              : '<a href="#/login" class="login-btn">로그인</a>'
          }
          
      </div>
        <div class="my-page-modal none">
          <button class="my-page">마이페이지</button>
          <button class="logout">로그아웃</button>
        </div>
    </header>
    `;
  }
}
