import Home from "./component/Home.js";
import Login from "./component/Login.js";
import Cart from "./component/Cart.js";
import DetailPage from "./component/DetailPage.js";
import { loggedIn, setLoggedIn, state } from "./js/loggedIn.js";

const $app = document.querySelector(".App");

const routes = {
  "/": Home,
  "/login": Login,
  "/cart": Cart,
  "/product": DetailPage,
  "/product/:id": DetailPage,
};

async function renderPage(path) {
  console.log("랜더링경로:", path);
  // 일반 페이지 라우팅 || 상세페이지 라우팅
  const pathParts = path.split("/");

  if (pathParts[1] === "product" && pathParts[2]) {
    const productId = pathParts[2];
    await DetailPage.render(productId);
    return;
  }

  const page = routes[path];

  if (page) {
    console.log("렌더링중...");
    $app.innerHTML = page.template();

    if (path === "/login") {
      // 로그인 페이지 일 때 loggedIn 함수 호출
      loggedIn();
    }
  } else {
    $app.innerHTML = "<p>404 Not Found</p>";
  }
}

function navigateTo(path) {
  window.history.pushState({}, "", path); // URL 변경
  renderPage(path);
}

// 페이지 로드시 로컬스토리지의 isLoggedIn 속성을 통해 로그인여부 확인하는 함수
function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (isLoggedIn) {
    setLoggedIn(true, state.isBuyer, state.isSeller);
  } else {
    setLoggedIn(false, false, false);
  }
}

renderPage(window.location.pathname);

window.addEventListener("popstate", () => {
  renderPage(window.location.pathname);
});

document.addEventListener("DOMContentLoaded", () => {
  renderPage(window.location.pathname);

  checkLoginStatus();

  const $app = document.querySelector(".App");

  $app.addEventListener("click", (e) => {
    if (e.target.matches(".logo-btn") || e.target.matches(".main-logo")) {
      e.preventDefault();
      navigateTo("/");
      loggedIn();
    }

    if (e.target.matches(".login-btn")) {
      e.preventDefault();
      navigateTo("/login");
    }

    if (e.target.matches(".cart-btn")) {
      e.preventDefault();
      navigateTo("/cart");
    }

    if (e.target.closest(".product-wrap")) {
      const productId = e.target
        .closest(".product-wrap")
        .getAttribute("data-id");
      console.log("e ID:", productId);
      navigateTo(`/product/${productId}`);
    }

    console.log(e.target);
  });
});
