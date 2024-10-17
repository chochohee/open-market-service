import { state } from "./state.js";

export function signup() {
  const signupForm = document.querySelector(".sign-up-form");

  const buyerSignup = signupForm.querySelector(".buyer");
  const sellerSignup = signupForm.querySelector(".seller");

  const checkedId = signupForm.querySelector(".checked-id");
  const idError = signupForm.querySelector(".id-error");
  const userName = signupForm.querySelector(".user-name");

  const pw = signupForm.querySelector(".sign-up-pw");
  const checkedPw = signupForm.querySelector(".checked-pw");

  const submitBtn = signupForm.querySelector(".sign-up-submit");

  buyerSignup.addEventListener("click", (e) => {
    e.preventDefault();
    state.userType = "BUYER";
    buyerSignup.classList.add("active");
    sellerSignup.classList.remove("active");
  });

  sellerSignup.addEventListener("click", (e) => {
    e.preventDefault();
    state.userType = "SELLER";
    sellerSignup.classList.add("active");
    buyerSignup.classList.remove("active");
  });

  // 1. 아이디 검증
  // 에러메세지 class관리
  if (!state.isCheckedId) {
    idError.classList.remove("success");
  }

  // focus 검증
  userName.addEventListener("blur", () => {
    if (state.isCheckedId) return;

    if (!userName.value.trim()) {
      idError.textContent = "필수 정보입니다.";
      userName.classList.add("error");
      state.isCheckedId = false;
    } else if (userName.validity.patternMismatch) {
      idError.textContent =
        "20자 이내의 영문 소문자, 대문자, 숫자만 사용 가능합니다.";
      userName.classList.add("error");

      state.isCheckedId = false;
    } else if (userName.validity.valid) {
      idError.textContent = "중복확인을 진행해주세요.";
      userName.classList.add("error");
      state.isCheckedId = false;
    }
  });

  userName.addEventListener("input", (e) => {
    state.isCheckedId = false;
    idError.classList.remove("success");
    idError.textContent = "";
    userName.classList.remove("error");

    if (userName.validity.patternMismatch) {
      idError.textContent =
        "20자 이내의 영문 소문자, 대문자, 숫자만 사용 가능합니다.";
      state.isCheckedId = false;
      userName.classList.add("error");
    } else if (userName.validity.valid) {
      idError.textContent = "중복확인을 진행해주세요.";
      state.isCheckedId = false;
      userName.classList.add("error");
    }
  });

  checkedId.addEventListener("click", async (e) => {
    e.preventDefault();
    const username = userName.value.trim();

    const isUsernameValid = await validateUsername(username);

    if (!userName.value.trim()) {
      idError.textContent = "필수 정보입니다.";
      state.isCheckedId = false;
      userName.classList.add("error");
    } else if (userName.validity.patternMismatch) {
      idError.textContent =
        "20자 이내의 영문 소문자, 대문자, 숫자만 사용 가능합니다.";
      state.isCheckedId = false;
      userName.classList.add("error");
    } else if (isUsernameValid.valid) {
      idError.textContent = "멋진 아이디네요:)";
      state.isCheckedId = true;
      idError.classList.add("success");
      userName.classList.remove("error");
    } else {
      idError.textContent = isUsernameValid.error;
      state.isCheckedId = false;
      userName.classList.add("error");
    }

    // 아이디 검증 서버통신
    async function validateUsername(username) {
      try {
        const response = await fetch(
          "https://estapi.openmarket.weniv.co.kr/accounts/validate-username/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username }),
          }
        );
        const result = await response.json();
        if (result.message === "사용 가능한 아이디입니다.") {
          return { valid: true }; // 유효한 사용자명
        } else if (result.error === "이미 사용 중인 아이디입니다.") {
          return { valid: false, error: "이미 사용 중인 아이디입니다." }; // 중복된 아이디
        } else {
          return { valid: false, error: "알 수 없는 오류입니다." }; // 예기치 않은 오류
        }
      } catch (error) {
        console.error("Error:", error);
        return { valid: false, error: "서버 오류가 발생했습니다." }; // 오류 발생 시
      }
    }
  });

  // 2. 나머지 입력 유효성검사
  function validateInputs() {
    const errorText = document.createElement("div");
    errorText.classList.add("error-text");
    const successPw = signupForm.querySelector(".sign-up-pw-wrap");
    const successCheckedPw = signupForm.querySelector(".checked-pw-wrap");
    const noneValue = "필수 정보입니다.";

    // 에러메세지 add
    function showError(message) {
      errorText.textContent = message;
      if (!pw.parentNode.querySelector(".error-text")) {
        pw.parentNode.appendChild(errorText);
      }
    }

    // 에러메세지 remove
    function removeError() {
      if (pw.parentNode.querySelector(".error-text")) {
        pw.parentNode.removeChild(errorText);
      }
    }

    // 유효하지 않은 pw
    function invalidPw() {
      pw.classList.add("error");
      let errorMessage = "";

      if (!pw.value.trim()) {
        errorMessage = noneValue;
      } else if (pw.validity.patternMismatch) {
        errorMessage = "8자 이상, 영문 대 소문자, 숫자, 특수문자를 사용하세요.";
      }

      if (errorMessage) {
        showError(errorMessage);
      }

      successPw.classList.remove("on");
    }

    // 유효한 pw
    function validPw() {
      successPw.classList.add("on");
      pw.classList.remove("error");
      removeError();
    }

    function trimUserName() {
      if (!userName.value.trim()) {
        idError.textContent = noneValue;
        pw.classList.add("error");
      }
    }
    function trimPw() {
      if (!pw.value.trim()) {
        showError(noneValue);
      }
    }

    function checkCheckedPw() {
      if (checkedPw.value.trim()) {
        if (checkedPw.value === pw.value) {
          checkedPwErrorText.textContent = "";
          successCheckedPw.classList.add("on");
          checkedPw.classList.remove("error");
        } else if (checkedPw.value !== pw.value) {
          checkedPwErrorText.textContent = "비밀번호가 일치하지 않습니다.";
          checkedPw.classList.add("error");
          successCheckedPw.classList.remove("on");
        }
      }
    }

    // pw
    pw.addEventListener("blur", () => {
      trimUserName();
      trimPw();
    });

    pw.addEventListener("input", () => {
      trimUserName();
      if (pw.validity.valid) {
        validPw();
      } else {
        invalidPw();
      }
      checkCheckedPw();
    });

    // checkedPw
    const checkedPwErrorText = signupForm.querySelector(
      ".checked-pw-wrap .error-text"
    );

    checkedPw.addEventListener("blur", () => {
      trimUserName();
      trimPw();

      if (!checkedPw.value.trim()) {
        checkedPwErrorText.textContent = noneValue;
        checkedPw.classList.add("error");
      }
    });

    checkedPw.addEventListener("input", () => {
      console.log("Pw확인", state.isPw, state.isCheckedPw);

      trimUserName();
      trimPw();
      checkCheckedPw();
    });
  }

  validateInputs();

  // 3. form 제출

  // 핸드폰번호
  let firstNumber = "010";
  let middleNumber = "";
  let lastNumber = "";

  // 핸드폰번호 첫자리 입력받기
  function selectNumber() {
    const select = signupForm.querySelector(".selected");
    const selectList = signupForm.querySelector(".contact-inp ul");

    select.addEventListener("click", (e) => {
      e.preventDefault();
      selectList.classList.toggle("none");

      selectList.addEventListener("click", (e) => {
        e.preventDefault();
        select.textContent = e.target.textContent;
        selectList.classList.add("none");

        firstNumber = select.textContent;
        getContactNum();
      });
    });
  }

  // 입력하는 값이 숫자인지 판별
  function checkNumber(e) {
    if (
      (e.key < "0" || e.key > "9") && // 숫자가 아닐 때
      e.key !== "Backspace" &&
      !e.key.startsWith("Arrow") // 화살표 키가 아닐 때
    ) {
      e.preventDefault();
    }

    const target = e.target;
    if (target.value.length >= 4 && e.key !== "Backspace") {
      e.preventDefault();
    }
  }

  function onlyNumbers(e) {
    // 숫자만 남기고 나머지 제거
    e.target.value = e.target.value.replace(/[^0-9]/g, "");

    // 4자리가 넘으면 잘라내기
    if (e.target.value.length > 4) {
      e.target.value = e.target.value.slice(0, 4);
    }

    if (e.target.id === "middle-number") {
      middleNumber = e.target.value;
    } else if (e.target.id === "last-number") {
      lastNumber = e.target.value;
    }
    getContactNum();
  }

  function enterNumber(e) {
    const middleNum = signupForm.querySelector("#middle-number");
    const lastNum = signupForm.querySelector("#last-number");

    middleNum.addEventListener("keydown", checkNumber);
    lastNum.addEventListener("keydown", checkNumber);

    middleNum.addEventListener("input", onlyNumbers);
    lastNum.addEventListener("input", onlyNumbers);
  }

  function getContactNum() {
    const contactNum = `${firstNumber}${middleNumber}${lastNumber}`.trim();
    return contactNum;
  }

  function init() {
    selectNumber();
    enterNumber();
  }

  const checkbox = signupForm.querySelector("#checkbox");
  const checkboxLabel = signupForm.querySelector(".agreed");
  checkbox.addEventListener("click", () => {
    state.isAgreed = checkbox.checked;
  });
  checkboxLabel.addEventListener("click", () => {
    state.isAgreed = checkbox.checked;
  });

  init();

  window.addEventListener("click", (e) => {
    console.log(e.target);
  });
}
