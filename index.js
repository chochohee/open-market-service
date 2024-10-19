import HomePage from "./component/HomePage.js";
import LoginPage from "./component/LoginPage.js";
import DetailPage from "./component/DetailPage.js";
import SignUpPage from "./component/SignUpPage.js";
import Error404 from "./component/Error404.js";

import { login } from "./js/login.js";
import { signup } from "./js/signUp.js";
import { isLoggedIn } from "./js/isLoggedIn.js";
import { state } from "./js/state.js";

const $app = document.querySelector(".App");

const routes = {
  "/": HomePage,
  "/login": LoginPage,
  "/product": DetailPage,
  "/signup": SignUpPage,
  "/404": Error404,
};

async function renderPage() {
  const hash = window.location.hash || "#/";
  const path = hash.replace("#", "");
  const pathParts = path.split("/").filter(Boolean); // 빈 요소를 제거하여 경로 파트 얻기

  console.log("pathParts:", pathParts);

  if (path === "/404") {
    renderErrorPage();
    return;
  }

  if (pathParts[0] === "product" && pathParts[1]) {
    const productId = pathParts[1];
    const detailPage = new DetailPage();
    try {
      await detailPage.init(productId); // 초기화 후 렌더링
      $app.innerHTML = detailPage.template();
      return;
    } catch (error) {
      console.error("상세페이지 초기화 오류", error);
      renderErrorPage();
    }
  }

  const page = routes[path] || (pathParts[1] === "product" ? DetailPage : null);

  if (page) {
    console.log("렌더링중...");
    try {
      const pageInstance = new page();
      /// init 메서드가 있는 경우에만 호출
      if (typeof pageInstance.init === "function") {
        await pageInstance.init();
      }
      $app.innerHTML = pageInstance.template();
      console.log("랜더링 완료");
      if (path === "/login") {
        login();
      } else if (path === "/signup") {
        signup();
      }
    } catch (error) {
      console.error("페이지 초기화 오류", error);
      renderErrorPage();
    }
  } else {
    renderErrorPage();
  }
}

function renderErrorPage() {
  const errorPage = new Error404();
  $app.innerHTML = errorPage.template();
  window.location.hash = "/404";
}

document.addEventListener("DOMContentLoaded", async () => {
  await isLoggedIn();
  await renderPage();

  // 페이지가 로드될 때, hash 체크하여 해당 페이지로 이동
  window.addEventListener("load", async () => {
    const currentPage = sessionStorage.getItem("currentPage");
    if (currentPage) {
      window.location.hash = currentPage;
      await renderPage();
    }
  });

  window.addEventListener("hashchange", async () => {
    // hash가 변경될 때, 현재 페이지를 세션스토리지에 저장
    const currentPage = window.location.hash;
    sessionStorage.setItem("currentPage", currentPage);
    await isLoggedIn();
    await renderPage();
  });

  $app.addEventListener("click", async (e) => {
    console.log(e.target);

    if (e.target.matches(".logo-btn")) {
      e.preventDefault();
      window.location.hash = "#";
      await renderPage();
    }

    if (e.target.matches(".login-btn")) {
      e.preventDefault();
      window.location.hash = "#/login";
      document.body.style.overflow = "auto";
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
      state.userType = "BUYER";
    }

    if (e.target.closest(".back-page")) {
      e.preventDefault();
      window.history.back();
    }
  });
});
