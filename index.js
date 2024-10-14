import Home from "./component/Home.js";
import Login from "./component/Login.js";

const $app = document.querySelector(".App");

const routes = {
  "/": Home,
  "/login": Login,
};

function renderPage(path) {
  const page = routes[path];
  if (page) {
    $app.innerHTML = page.template();
  } else {
    $app.innerHTML = "<p>404 Not Found</p>";
  }
}

function navigateTo(path) {
  window.history.pushState({}, path, window.location.origin + path); // URL 변경
  renderPage(path);
}

renderPage(window.location.pathname);

window.addEventListener("popstate", () => {
  renderPage(window.location.pathname);
});

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded 이벤트 발생");
  const $app = document.querySelector(".App");

  $app.addEventListener("click", (event) => {
    if (event.target.matches(".login-btn")) {
      event.preventDefault();
      navigateTo("/login");
    }

    if (event.target.matches(".cart-btn")) {
      event.preventDefault();
      navigateTo("/cart");
    }

    if (event.target.matches(".logo-btn")) {
      event.preventDefault();
      navigateTo("/");
    }
  });
});
