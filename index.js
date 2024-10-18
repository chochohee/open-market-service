import HomePage from "./component/HomePage.js";
import LoginPage from "./component/LoginPage.js";
import DetailPage from "./component/DetailPage.js";
import SignUpPage from "./component/SignUpPage.js";
import { login } from "./js/login.js";
import { signup } from "./js/signUp.js";
import { isLoggedIn } from "./js/isLoggedIn.js";

function headerModal() {
  const mypageBtn = document.querySelector(".my-page-btn");
  const mypageModal = document.querySelector(".my-page-modal");
  const logoutBtn = document.querySelector(".logout");

  // 모달 리스너 추가
  if (mypageBtn) {
    mypageBtn.addEventListener("click", (e) => {
      e.preventDefault();
      mypageModal.classList.toggle("none");
    });

    document.addEventListener("click", (e) => {
      e.preventDefault();
      if (!mypageModal.contains(e.target) && !mypageBtn.contains(e.target)) {
        mypageModal.classList.add("none");
      }
    });
  }

  //로그아웃 리스너
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("accessToken");
      location.reload();
    });
  }
}
const $app = document.querySelector(".App");

const routes = {
  "/": HomePage,
  "/login": LoginPage,
  "/product": DetailPage,
  "/signup": SignUpPage,
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
      console.log("랜더링 완료");
    } catch (error) {
      console.error("페이지 초기화 오류", error);
    }

    if (path === "/login") {
      login();
    }
  } else {
    $app.innerHTML = "<p>404 Not Found</p>";
  }

  if (path === "/signup") {
    signup();
  }

  headerModal();
}

document.addEventListener("DOMContentLoaded", async () => {
  await isLoggedIn();
  await renderPage(window.location.hash);
  window.addEventListener("hashchange", () => {
    renderPage(window.location.hash);
    isLoggedIn();
  });

  $app.addEventListener("click", (e) => {
    console.log(e.target);
    if (e.target.matches(".logo-btn") || e.target.matches(".main-logo")) {
      e.preventDefault();
      window.location.hash = "#";
    }

    if (e.target.matches(".login-btn")) {
      e.preventDefault();
      window.location.hash = "#/login";
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
  });
});

// if (!mypageBtn.parentNode.querySelector(".none")) {
//   mypageModal.classList.add("none");
// }
