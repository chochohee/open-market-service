class SignUp {
  constructor() {
    this.init();
  }
  async init() {
    this.render();
  }

  render() {
    const html = this.template(); // 템플릿 생성
    const $app = document.querySelector(".App"); // .App 요소 선택
    $app.innerHTML = html; // HTML 렌더링
  }

  template() {
    return `
    <div class="sign-up-wrap">
      <h1 class="sign-up-logo">
        <a href="#" class="logo-btn"></a>
      </h1>
      <form method="post" class="sign-up-form">
        <div class="choice-user">
          <button type="button" class="buyer active">구매회원가입</button>
          <button type="button" class="seller">판매회원가입</button>
        </div>
        <div class="input-wrap">
          <label for="sign-up-id">아이디</label>
          <div class="id-wrap">
            <input
              type="text"
              id="sign-up-id"
              name="sign-up-id"
              class="sign-up-id"
              pattern="[a-zA-Z]+[a-zA-Z0-9]{5,19}$"
              required
            />
            <button class="checked-id" type="button">중복확인</button>
          </div>
          <div class="error-text"></div>
          <div class="sign-up-pw-wrap">
            <label for="sign-up-pw">비밀번호</label>
            <input
              type="password"
              id="sign-up-pw"
              name="sign-up-pw"
              class="sign-up-pw"
              pattern="^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$"
              required
            />
          </div>
          <div class="checked-pw-wrap">
            <label for="checked-pw" class="checked-pw-label"
              >비밀번호 재확인</label
            >
            <input
              type="password"
              id="checked-pw"
              name="checked-pw"
              class="checked-pw"
              required
            />
            <div class="error-text"></div>
          </div>

          <label for="user-name" class="user-name">이름</label>
          <input type="text" id="user-name" name="user-name" required />
          <label for="contact">휴대폰번호</label>
          <div class="contact-inp">
            <div class="select">
              <div class="selected">010</div>
            <ul class="none">
              <li class="select-option">010</li>
              <li class="select-option">011</li>
              <li class="select-option">016</li>
              <li class="select-option">017</li>
              <li class="select-option">018</li>
              <li class="select-option">019</li>
            </ul>
          </div>
          <input type="text" name="middle-number" id="middle-number" />
          <input type="text" name="last-number" id="last-number" />
        </div>
    </div>
        <div class="sign-up-checkd">
          <input type="checkbox" id="checkbox" class="checkbox txt-hide" />
          <label for="checkbox" class="label-hold"></label>
          <label for="checkbox" class="agreed">
            호두샵의 <a href="#">이용약관</a> 및
            <a href="#">개인정보처리방침</a>에 대한 내용을 확인하였고
            동의합니다.
          </label>
        </div>
        <button type="submit" class="sign-up-submit" disabled>가입하기</button>
      </form>
      `;
  }
}

export default SignUp;
