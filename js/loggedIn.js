export let state = {
  isLoggedIn: false,
  isSeller: false,
  isBuyer: true,
};

export function setLoggedIn(isLoggedInValue, isSellerValue, isBuyerValue) {
  state.isLoggedIn = isLoggedInValue;
  state.isSeller = isSellerValue;
  state.isBuyer = isBuyerValue;
}

export function getLoggedIn() {
  return state.isLoggedIn;
}

export function loggedIn() {
  const loginForm = document.querySelector(".login-form");
  const id = loginForm.querySelector(".id-inp");
  const pw = loginForm.querySelector(".pw-inp");
  const msg = loginForm.querySelector(".error-text");
  const loggedIn = loginForm.querySelector(".login-submit");
  const buyerLogin = loginForm.querySelector(".buyer");
  const sellerLogin = loginForm.querySelector(".seller");

  let isBuyer = true;
  let isSeller = false;
  // id 영문자로시작하는 영문자 또는 숫자 6~20자
  // pw 8~16자 영문,숫자 조합
  const validId = "test1234";
  const validPw = "test1234";

  buyerLogin.addEventListener("click", (event) => {
    event.preventDefault();
    isBuyer = true;
    isSeller = false;
    console.log("buyer:", isBuyer, "seller:", isSeller);
    buyerLogin.classList.add("active");
    sellerLogin.classList.remove("active");
  });

  sellerLogin.addEventListener("click", (event) => {
    event.preventDefault();
    isSeller = true;
    isBuyer = false;
    console.log("buyer:", isBuyer, "seller:", isSeller);
    buyerLogin.classList.remove("active");
    sellerLogin.classList.add("active");
  });

  loggedIn.addEventListener("click", (event) => {
    event.preventDefault();

    const idValue = id.value;
    const pwValue = pw.value;

    // 아이디,비번 일치
    if (idValue === validId && pwValue === validPw) {
      localStorage.setItem("userId", idValue);
      localStorage.setItem("isLoggedIn", true); // 로그인상태 스토리지에 저장
      setLoggedIn(true, !isBuyer, !isSeller); // 로그인상태 업데이트

      window.history.back(); // 로그인 성공시 이전 페이지로 이동
    } else if (
      (id.validity.valueMissing && pw.validity.valueMissing) ||
      id.validity.valueMissing
    ) {
      msg.textContent = "아이디를 입력해주세요.";
    } else if (pw.validity.valueMissing) {
      msg.textContent = "비밀번호를 입력해주세요.";
    } else if (!id.validity.valid || !pw.validity.valid) {
      msg.textContent = "아이디 또는 비밀번호가 일치하지 않습니다.";
      pw.value = ""; // 비밀번호 필드 비우기
      pw.focus(); // 비밀번호에 focus
    }
  });
}
