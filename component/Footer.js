class Footer {
  template() {
    return `
            <footer>
      <div class="footer-item">
        <div class="link-list">
          <a href="">호두샵 소개</a>
          <a href="">이용약관</a>
          <a href="">개인정보처리방침</a>
          <a href="">전자금융거래약관</a>
          <a href="">청소년보호정책</a>
          <a href="">제휴문의</a>
        </div>
        <div class="sns-list">
          <a href="" class="youtube">
            <img src="./src/assets/icon-yt.svg" alt="유튜브" />
          </a>
          <a href="" class="facebook"
            ><img src="./src/assets/icon-fb.svg" alt="페이스북"
          /></a>
          <a href="" class="insta">
            <img src="./src/assets/icon-insta.svg" alt="인스타"
          /></a>
        </div>
      </div>
      <address>
        <div class="company">(주)HODU SHOP</div>
        <div>제주특별자치도 제주시 동광고 137 제주코딩베이스캠프</div>
        <span>사업자번호 : 000-0000-0000</span>
        <span>통신판매업</span>
        <div>대표 : 김호두</div>
      </address>
    </footer>`;
  }
}

export default new Footer();
