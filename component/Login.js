class Login {
  template() {
    return `
    <div class="login-wrap">
      <h1 class="login-logo">
        <a href="#" class="logo-btn"></a>
      </h1>
      <form method="post">
        <div class="choice-user">
          <button type="button" class="buyer active">
            구매회원 로그인
          </button>
          <button type="button" class="seller">
            판매회원 로그인
          </button>
        </div>
        <div class="input-wrap">
          <input type="text" id="id" placeholder="아이디" />
          <input type="password" id="pw" placeholder="비밀번호" />
          <div></div>
          <button type="submit" class="submit">
            로그인
          </button>
        </div>
      </form>
      <div class="btn-wrap">
        <a href="" id="sign-up">
          회원가입
        </a>
        <a href="" id="find-pw">
          비밀번호 찾기
        </a>
      </div>
    </div>`;
  }
}

export default new Login();
