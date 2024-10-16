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

      `;
  }
}

export default SignUp;
