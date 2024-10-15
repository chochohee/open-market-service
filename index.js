import Home from "./component/Home.js";
import Login from "./component/Login.js";
import Cart from "./component/Cart.js";
import { loggedIn, setLoggedIn, state } from "./js/loggedIn.js";

const $app = document.querySelector(".App");

const routes = {
  "/": Home,
  "/login": Login,
  "/cart": Cart,
};

function renderPage(path) {
  console.log("랜더링경로:", path);
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

  $app.addEventListener("click", (event) => {
    if (
      event.target.matches(".logo-btn") ||
      event.target.matches(".main-logo")
    ) {
      event.preventDefault();
      navigateTo("/");
      loggedIn();
    }

    if (event.target.matches(".login-btn")) {
      event.preventDefault();
      navigateTo("/login");
    }

    if (event.target.matches(".cart-btn")) {
      event.preventDefault();
      navigateTo("/cart");
    }
  });
});
