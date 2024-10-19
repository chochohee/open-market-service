import { state } from "./state.js";

export function login() {
  const loginForm = document.querySelector(".login-form");
  const id = loginForm.querySelector(".id-inp");
  const pw = loginForm.querySelector(".pw-inp");
  const msg = loginForm.querySelector(".error-text");
  const loginBtn = loginForm.querySelector(".login-submit");
  const buyerLogin = loginForm.querySelector(".buyer");
  const sellerLogin = loginForm.querySelector(".seller");

  buyerLogin.addEventListener("click", (e) => {
    e.preventDefault();
    state.userType = "BUYER";
    buyerLogin.classList.add("active");
    sellerLogin.classList.remove("active");
  });

  sellerLogin.addEventListener("click", (e) => {
    e.preventDefault();
    state.userType = "SELLER";
    buyerLogin.classList.remove("active");
    sellerLogin.classList.add("active");
  });

  loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const formData = {
      username: id.value.trim(),
      password: pw.value.trim(),
      login_type: state.userType,
    };

    try {
      const response = await fetch(
        "https://estapi.openmarket.weniv.co.kr/accounts/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        const data = await response.json();
        const accessToken = data.access;
        sessionStorage.setItem("accessToken", accessToken);
        console.log("로그인 성공:", data);
        state.isLoggedIn = true;
        window.history.back();
      } else {
        const errorData = await response.json();
        console.log("로그인 실패", errorData);
        state.isLoggedIn = false;
        msg.textContent = errorData.error;
      }
    } catch (error) {
      console.log("서버 오류", error);
      state.isLoggedIn = false;
    }
  });
}
