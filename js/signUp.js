import { signupValidate, state } from "./state.js";

export function signup() {
  const signupForm = document.querySelector(".sign-up-form");

  const buyerSignup = signupForm.querySelector(".buyer");
  const sellerSignup = signupForm.querySelector(".seller");

  const checkedId = signupForm.querySelector(".checked-id");
  const idError = signupForm.querySelector(".id-error");
  const userName = signupForm.querySelector(".user-name");
  const name = signupForm.querySelector(".name");

  const pw = signupForm.querySelector(".sign-up-pw");
  const checkedPw = signupForm.querySelector(".checked-pw");

  const contactError = signupForm.querySelector(".contact-wrap .error-text");
  const middleNum = signupForm.querySelector("#middle-number");
  const lastNum = signupForm.querySelector("#last-number");

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

  // contact
  let firstNumber = "010";
  let middleNumber = "";
  let lastNumber = "";

  function getContactNum() {
    const contactNum = `${firstNumber}${middleNumber}${lastNumber}`.trim();
    return contactNum;
  }

  function toggleSubmitState() {
    signupValidate.canSubmit =
      signupValidate.isValidUsername &&
      signupValidate.isValidPw &&
      signupValidate.isValidCheckedPw &&
      signupValidate.isValidName &&
      signupValidate.isValidContact &&
      signupValidate.isAgreed;

    submitBtn.disabled = !signupValidate.canSubmit;
  }

  // 1. 아이디 검증
  function validateId() {
    // 에러메세지 class관리
    if (!signupValidate.isValidUsername) {
      idError.classList.remove("success");
    }

    // focus 검증
    userName.addEventListener("blur", () => {
      if (signupValidate.isValidUsername) return;

      if (!userName.value.trim()) {
        idError.textContent = "필수 정보입니다.";
        idError.classList.remove("none");
        userName.classList.add("error");
        signupValidate.isValidUsername = false;
      } else if (userName.validity.patternMismatch) {
        idError.textContent =
          "20자 이내의 영문 소문자, 대문자, 숫자만 사용 가능합니다.";
        idError.classList.remove("none");
        userName.classList.add("error");

        signupValidate.isValidUsername = false;
      } else {
        idError.textContent = "중복확인을 진행해주세요.";
        idError.classList.remove("none");
        userName.classList.add("error");
        signupValidate.isValidUsername = false;
      }
    });

    userName.addEventListener("input", () => {
      signupValidate.isValidUsername = false;
      idError.classList.remove("success");
      idError.classList.add("none");
      idError.textContent = "";
      userName.classList.remove("error");

      if (userName.validity.patternMismatch) {
        idError.textContent =
          "20자 이내의 영문 소문자, 대문자, 숫자만 사용 가능합니다.";
        signupValidate.isValidUsername = false;
        idError.classList.remove("none");
        userName.classList.add("error");
      } else if (userName.validity.valid) {
        idError.textContent = "중복확인을 진행해주세요.";
        idError.classList.remove("none");
        signupValidate.isValidUsername = false;
        userName.classList.add("error");
      }
    });

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

    checkedId.addEventListener("click", async (e) => {
      e.preventDefault();
      const username = userName.value.trim();

      if (!userName) {
        idError.textContent = "필수 정보입니다.";
        idError.classList.remove("none");
        signupValidate.isValidUsername = false;
        userName.classList.add("error");
        return;
      }

      const isUsernameValid = await validateUsername(username);

      if (isUsernameValid.valid) {
        idError.textContent = "멋진 아이디네요:)";
        idError.classList.remove("none");
        idError.classList.add("success");
        signupValidate.isValidUsername = true;
        userName.classList.remove("error");
      } else {
        idError.textContent = isUsernameValid.error;
        idError.classList.remove("none");
        signupValidate.isValidUsername = false;
        userName.classList.add("error");
      }

      await toggleSubmitState();
    });
  }

  // 2. 나머지 입력 유효성검사
  function validateInputs() {
    const successPw = signupForm.querySelector(".sign-up-pw-wrap");
    const successCheckedPw = signupForm.querySelector(".checked-pw-wrap");
    const noneValue = "필수 정보입니다.";

    // 에러메세지 add
    function createError(message, target) {
      const errorText = document.createElement("div");
      errorText.classList.add("error-text");
      errorText.textContent = message;

      if (!target.parentNode.querySelector(".error-text")) {
        target.parentNode.appendChild(errorText);
      }
    }

    // 에러메세지 remove
    function removeError(target) {
      console.log("Removing error element:", target);
      const existingErrorText = target.parentNode.querySelector(".error-text");
      if (existingErrorText) {
        target.parentNode.removeChild(existingErrorText);
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
        createError(errorMessage, pw);
      }

      successPw.classList.remove("on");
      signupValidate.isValidPw = false;
    }

    // 유효한 pw
    function validPw() {
      successPw.classList.add("on");
      pw.classList.remove("error");
      removeError(pw);
      signupValidate.isValidPw = true;
    }

    function passingUserName() {
      if (!userName.value.trim()) {
        idError.textContent = noneValue;
        idError.classList.remove("none");
        userName.classList.add("error");
      }
    }
    function passingPw() {
      if (!pw.value.trim()) {
        createError(noneValue, pw);
        pw.classList.add("error");
      }
    }

    function passingCheckedPw() {
      if (checkedPw.value.trim()) {
        if (checkedPw.value === pw.value) {
          checkedPwErrorText.textContent = "";
          checkedPwErrorText.classList.remove("none");
          successCheckedPw.classList.add("on");
          checkedPw.classList.remove("error");
          signupValidate.isValidCheckedPw = true;
        } else if (checkedPw.value !== pw.value) {
          checkedPwErrorText.textContent = "비밀번호가 일치하지 않습니다.";
          checkedPwErrorText.classList.remove("none");
          checkedPw.classList.add("error");
          successCheckedPw.classList.remove("on");
          signupValidate.isValidCheckedPw = false;
        }
      } else {
        if (!checkedPw.value.trim()) {
          checkedPwErrorText.textContent = noneValue;
          checkedPwErrorText.classList.remove("none");
          checkedPw.classList.add("error");
        }
      }
    }

    function passingName() {
      if (!name.value.trim()) {
        createError(noneValue, name);
        name.classList.add("error");
        signupValidate.isValidName = false;
      } else if (name.validity.valid) {
        removeError(name);
        name.classList.remove("error");
        signupValidate.isValidName = true;
      } else if (!name.validity.valid) {
        createError("올바른 이름을입력해주세요.", name);
        name.classList.add("error");
      }
    }

    function passingContact() {
      const middleNumValid = middleNum.validity.valid;
      const lastNumValid = lastNum.validity.valid;

      let isValid = true;

      if (!middleNum.value.trim()) {
        contactError.textContent = "필수 정보입니다.";
        contactError.classList.remove("none");
        middleNum.classList.add("error");
        isValid = false;
      } else if (!middleNumValid) {
        contactError.textContent = noneValue;
        contactError.classList.remove("none");
        middleNum.classList.add("error");
        isValid = false;
      } else {
        middleNum.classList.remove("error");
      }

      if (!lastNum.value.trim()) {
        contactError.textContent = noneValue;
        contactError.classList.remove("none");
        lastNum.classList.add("error");
        isValid = false;
      } else if (!lastNumValid) {
        contactError.textContent = noneValue;
        contactError.classList.remove("none");
        lastNum.classList.remove("error");
        isValid = false;
      } else {
        lastNum.classList.remove("error");
      }

      if (middleNumValid && lastNumValid) {
        contactError.textContent = "";
        contactError.classList.add("none");
        middleNum.classList.remove("error");
        lastNum.classList.remove("error");
        isValid = true;
      }

      signupValidate.isValidContact = isValid;
    }

    // pw
    pw.addEventListener("blur", () => {
      passingUserName();
      passingPw();
    });

    pw.addEventListener("input", () => {
      passingUserName();
      if (pw.validity.valid) {
        validPw();
      } else {
        invalidPw();
      }
      passingCheckedPw();
    });

    // checkedPw
    const checkedPwErrorText = signupForm.querySelector(
      ".checked-pw-wrap .error-text"
    );

    checkedPw.addEventListener("blur", () => {
      passingUserName();
      passingPw();
      passingCheckedPw();
    });

    checkedPw.addEventListener("input", () => {
      passingUserName();
      passingPw();
      passingCheckedPw();
    });

    // name
    name.addEventListener("blur", () => {
      passingUserName();
      passingPw();
      passingCheckedPw();
      passingName();
    });

    name.addEventListener("input", () => {
      passingUserName();
      passingPw();
      passingCheckedPw();
      passingName();
    });

    // 핸드폰번호 첫자리 입력받기
    function selectNumber() {
      const select = signupForm.querySelector(".selected");
      const selectList = signupForm.querySelector(".contact-inp ul");

      select.addEventListener("click", (e) => {
        e.preventDefault();
        selectList.classList.toggle("none");
        select.classList.toggle("active");

        selectList.addEventListener("click", (e) => {
          e.preventDefault();
          select.textContent = e.target.textContent;
          selectList.classList.add("none");
          select.classList.remove("active");

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

      // 4자리이상 입력 방지
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
      middleNum.addEventListener("keydown", checkNumber);
      lastNum.addEventListener("keydown", checkNumber);

      middleNum.addEventListener("blur", () => {
        passingUserName();
        passingPw();
        passingCheckedPw();
        passingName();
        passingContact();
      });

      lastNum.addEventListener("blur", () => {
        passingUserName();
        passingPw();
        passingCheckedPw();
        passingName();
        passingContact();
      });

      middleNum.addEventListener("input", (e) => {
        onlyNumbers(e);
        passingUserName();
        passingPw();
        passingCheckedPw();
        passingName();
        passingContact();
      });
      lastNum.addEventListener("input", (e) => {
        onlyNumbers(e);
        passingUserName();
        passingPw();
        passingCheckedPw();
        passingName();
        passingContact();
      });
    }

    function init() {
      selectNumber();
      enterNumber();
    }

    init();

    const checkbox = signupForm.querySelector("#checkbox");
    checkbox.addEventListener("click", () => {
      signupValidate.isAgreed = !signupValidate.isAgreed;
    });

    signupForm.addEventListener("click", (e) => {
      console.log(signupValidate.isValidUsername);
      if (
        e.target.matches(".select-option") ||
        e.target.matches(".selected") ||
        e.target.matches("#checkbox")
      ) {
        toggleSubmitState();
      }
    });
    signupForm.addEventListener("input", (e) => {
      if (e.target.matches("input")) {
        toggleSubmitState();
      }
    });
  }
  validateId();
  validateInputs();
  // 3. form 제출

  submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const formData = {
      username: userName.value.trim(),
      password: pw.value.trim(),
      name: name.value.trim(),
      phone_number: getContactNum(),
    };

    try {
      const response = await fetch(
        "https://estapi.openmarket.weniv.co.kr/accounts/buyer/signup/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log("회원가입 성공:", result);
        window.location.hash = "#/login";
      } else {
        const errorMessage = result.phone_number
          ? result.phone_number[0]
          : "오류가 발생했습니다.";

        contactError.textContent = errorMessage;
      }
    } catch (error) {
      console.error("서버 오류:", error);
    }
  });
}
