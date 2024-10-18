import { state } from "../js/state.js";

export default class SignUp {
  constructor() {
    this.init();
  }
  async init() {
    this.render();
  }

  render() {
    const html = this.template();
    const $app = document.querySelector(".App");
    $app.innerHTML = html;
  }

  template() {
    return `
    <div class="sign-up-wrap">
      <h1 class="main-logo">
        <button href="#/" class="logo-btn"></button>
      </h1>
      <form method="post" class="sign-up-form">
        <div class="choice-user">
          <button type="button" class="buyer ${
            state.userType === "BUYER" ? "active" : ""
          }">구매회원가입</button>
          <button type="button" class="seller ${
            state.userType === "SELLER" ? "active" : ""
          }">판매회원가입</button>
        </div>
        <div class="input-wrap">
          <label for="user-name">아이디</label>
          <div class="id-wrap">
            <input
              type="text"
              id="user-name"
              name="user-name"
              class="user-name"
              pattern="[a-zA-Z]+[a-zA-Z0-9]{5,19}$"
              required
            />
            <button class="checked-id" type="submit">중복확인</button>
          </div>
          <div class="id-error"></div>
          <div class="sign-up-pw-wrap">
            <label for="sign-up-pw">비밀번호</label>
            <input
              type="password"
              id="sign-up-pw"
              name="sign-up-pw"
              class="sign-up-pw"
              pattern="^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$"
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

          <div class="name-wrap">
          <label for="name" class=name" >이름</label>
          <input type="text" id="name" name="name" class="name" pattern= "^[가-힣a-zA-Z]+$" required />
          </div>
          <div class= contact-wrap>
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
            <div class="error-text"></div>
            </div>
             <input
              type="text"
      name="middle-number"
      id="middle-number"
      pattern="^[0-9]{3,4}"
      title="3자리 또는 4자리 입력해주세요."
      required
    />
        <input 
      type="text"
      name="last-number"
      id="last-number"
      pattern="^[0-9]{4}"
      title="4자리 입력해주세요."
      required/>
      </div>
        </div>
    </div>
        <div class="sign-up-checkd">
          <input type="checkbox" id="checkbox" class="checkbox txt-hide"/>
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
