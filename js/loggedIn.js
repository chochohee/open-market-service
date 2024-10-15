export function loggedIn() {
  const loginForm = document.querySelector(".login-form");
  const id = loginForm.querySelector(".id-inp");
  const pw = loginForm.querySelector(".pw-inp");
  const msg = loginForm.querySelector(".error-text");
  const loggedIn = loginForm.querySelector(".login-submit");

  loggedIn.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("ID 유효성:", id.validity);
    console.log("비밀번호 유효성:", pw.validity);

    if (
      (id.validity.valueMissing && pw.validity.valueMissing) ||
      id.validity.valueMissing
    ) {
      msg.textContent = "아이디를 입력해주세요";
    }
  });
}
