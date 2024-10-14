import Home from "../component/Home.js";

const $app = document.querySelector(".App");

const routes = {
  "/": Home,
};

$app.innerHTML = routes["/"].template();
