class Login {
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
          <input type="text" id="id" name="id" class="id-inp"placeholder="아이디" pattern="^[a-z]+[a-z0-9]{5,19}$/g" required/>
          <input type="password" id="pw" name="pw" class="pw-inp" placeholder="비밀번호" pattern="^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/" required/>
          <div class="error-text"></div>
          <button type="submit" class="login-submit">
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
