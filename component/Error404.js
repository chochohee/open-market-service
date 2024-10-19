export default class Error404 {

  template() {
    return `
        <div class="errorpage-wrap">
      <img src="../src/assets/icon-404.svg" alt="" />
      <div class="content-wrap">
        <p class="title">페이지를 찾을 수 없습니다.</p>
        <p class="content">페이지가 존재하지 않거나 사용할 수 없는 페이지입니다. </br> 웹 주소가 올바른지 확인해 주세요</p>
        <div class="btn-wrap">
          <button class="logo-btn">메인으로</button>
          <button class="back-page">이전 페이지</button>
        </div>
      </div>
    </div>
    `;
  }
}
