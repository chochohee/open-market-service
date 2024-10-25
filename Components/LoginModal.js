import { state } from "../js/state.js";

export default class LoginModal {
  constructor() {
    this.loginModal = null;
    this.cartBtn = null;
    this.buyNow = null;
    this.closedModal = null;
  }

  init() {
    this.renderLoginModal();

    this.loginModal = document.querySelector(".login-modal-wrap");
    this.cartBtn = document.querySelectorAll(".cart-btn");
    this.buyNow = document.querySelector(".buy-now");
    this.closedModal = document.querySelectorAll(".close-modal");

    this.setLoginModal();

    document.body.style.overflow = "auto";
  }

  renderLoginModal() {
    const $app = document.querySelector(".App");
    if ($app) {
      $app.insertAdjacentHTML("beforeend", this.template());
    }
  }

  setLoginModal() {
    if (!state.isLoggedIn) {
      if (this.buyNow) {
        this.buyNow.addEventListener("click", (e) => {
          e.preventDefault();
          this.loginModal.classList.remove("none");
          document.body.style.overflow = "hidden";
        });
      }

      if (this.cartBtn.length > 0) {
        this.cartBtn.forEach((btn) => {
          btn.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("카트");
            this.loginModal.classList.remove("none");
            document.body.style.overflow = "hidden";
          });
        });
      }

      if (this.closedModal.length > 0) {
        this.closedModal.forEach((btn) => {
          btn.addEventListener("click", (e) => {
            e.preventDefault();
            this.loginModal.classList.add("none");
            document.body.style.overflow = "auto";
          });
        });
      }
    }
  }

  template() {
    return `
    <div class="login-modal-wrap none">
      <div class="login-modal">
        <img src="../src/assets/icon-delete.svg" alt="창닫기" class="close-modal" id="close-img">
        <div>로그인이 필요한 서비스입니다.</br>로그인 하시겠습니까?
        </div>
        <div class="modal-btn-wrap">
          <button class="close-modal close-btn">아니오</button>
          <button class="login-btn">예</button>
        </div>
      </div>
    </div>
    `;
  }
}
