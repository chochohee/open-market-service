class Login {
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
    <div class="login-wrap">
      <h1 class="login-logo">
        <a href="#" class="logo-btn"></a>
      </h1>
      <form method="post" class="login-form">
        <div class="choice-user">
          <button type="button" class="buyer active"> 
            구매회원 로그인
          </button>
          <button type="button" class="seller">
            판매회원 로그인
          </button>
        </div>
        <div class="input-wrap">
          <input type="text" id="id" name="id" class="id-inp" placeholder="아이디" required autocomplete="username" />
          <input type="password" id="pw" name="pw" class="pw-inp" placeholder="비밀번호" required autocomplete="current-password"/>
          <div class="error-text"></div>
          <button type="submit" class="login-submit">
            로그인
          </button>
        </div>
      </form>
      <div class="btn-wrap">
        <a href="" class="sign-up">
          회원가입
        </a>
        <a href="" class="find-pw">
          비밀번호 찾기
        </a>
      </div>
    </div>`;
  }
}

export default Login;
