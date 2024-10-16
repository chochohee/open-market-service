import Home from "./component/Home.js";
import Login from "./component/Login.js";
import Cart from "./component/Cart.js";
import DetailPage from "./component/DetailPage.js";
import SignUp from "./component/SignUp.js";
import { loggedIn } from "./js/loggedIn.js";
import { setLoggedIn, state } from "./js/state.js";

const $app = document.querySelector(".App");

const routes = {
  "/": Home,
  "/login": Login,
  "/cart": Cart,
  "/product": DetailPage,
  "/signup": SignUp,
};

async function renderPage() {
  const hash = window.location.hash || "#/";
  const path = hash.replace("#", "");
  const pathParts = path.split("/").filter(Boolean); // 빈 요소를 제거하여 경로 파트 얻기
  console.log("pathParts:", pathParts);

  if (pathParts[0] === "product" && pathParts[1]) {
    const productId = pathParts[1];
    const detailPage = new DetailPage();
    await detailPage.init(productId); // 초기화 후 렌더링
    $app.innerHTML = detailPage.template();
    return;
  }

  const page = routes[path] || (pathParts[1] === "product" ? DetailPage : null);

  if (page) {
    console.log("렌더링중...");
    try {
      const pageInstance = new page();
      await pageInstance.init();
      $app.innerHTML = pageInstance.template();
      console.log(typeof Login.template);
      console.log("랜더링 완료");
    } catch (error) {
      console.error("페이지 초기화 오류", error);
    }

    if (path === "/login") {
      loggedIn();
    }
  } else {
    $app.innerHTML = "<p>404 Not Found</p>";
  }
}

// 페이지 로드시 로컬스토리지의 isLoggedIn 속성을 통해 로그인여부 확인하는 함수
function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (isLoggedIn) {
    const userType = localStorage.getItem("userType") || "BUYER";
    setLoggedIn(true, userType);
  } else {
    setLoggedIn(false, "BUYER");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("페이지가 로드되었습니다.");
  checkLoginStatus();

  window.addEventListener("hashchange", () => {
    renderPage(window.location.hash);
  });
  renderPage(window.location.hash);

  $app.addEventListener("click", (e) => {
    if (e.target.matches(".logo-btn") || e.target.matches(".main-logo")) {
      e.preventDefault();
      window.location.hash = "#/";
    }

    if (e.target.matches(".login-btn")) {
      e.preventDefault();
      window.location.hash = "#/login";
    }

    if (e.target.matches(".cart-btn")) {
      e.preventDefault();
      window.location.hash = "#/cart";
    }

    if (e.target.closest(".product-wrap")) {
      const productId = e.target
        .closest(".product-wrap")
        .getAttribute("data-id");
      console.log("e ID:", productId);
      window.location.hash = `#/product/${productId}`;
    }

    if (e.target.closest(".sign-up")) {
      e.preventDefault();
      window.location.hash = "#/signup";
    }

    console.log(e.target);
  });
});
