export function loggedIn() {
  const loginForm = document.querySelector(".login-form");
  const id = loginForm.querySelector(".id-inp");
  const pw = loginForm.querySelector(".pw-inp");
  const msg = loginForm.querySelector(".error-text");
  const loginBtn = loginForm.querySelector(".login-submit");
  const buyerLogin = loginForm.querySelector(".buyer");
  const sellerLogin = loginForm.querySelector(".seller");

  let userType = "BUYER";

  buyerLogin.addEventListener("click", (e) => {
    e.preventDefault();
    userType = "BUYER";
    buyerLogin.classList.add("active");
    sellerLogin.classList.remove("active");
  });

  sellerLogin.addEventListener("click", (e) => {
    e.preventDefault();
    userType = "SELLER";
    buyerLogin.classList.remove("active");
    sellerLogin.classList.add("active");
  });

  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    handleLogin(id.value, pw.value, validId, validPw, msg, userType);
  });

  function handleLogin(idValue, pwValue, validId, validPw, msg, userType) {
    if (idValue === validId && pwValue === validPw) {
      localStorage.setItem("userId", idValue);
      localStorage.setItem("isLoggedIn", true); // 로그인 상태를 로컬스토리지에 저장
      setLoggedIn(true, userType); // 로그인 상태 업데이트
      window.history.back(); // 로그인 성공 시 이전 페이지로 이동
    } else {
      validateLoginFields(idValue, pwValue, msg);
    }
  }
  function validateLoginFields(idValue, pwValue, msg) {
    if (!idValue) {
      msg.textContent = "아이디를 입력해주세요.";
    } else if (!pwValue) {
      msg.textContent = "비밀번호를 입력해주세요.";
    } else {
      msg.textContent = "아이디 또는 비밀번호가 일치하지 않습니다.";
      pw.value = ""; // 비밀번호 필드 비우기
      pw.focus(); // 비밀번호에 focus
    }
  }
}
