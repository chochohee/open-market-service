import Header from "../component/Header.js";
import Footer from "../component/Footer.js";

class Home {
  template() {
    return `    
    ${Header.template()}
    <main>
      <div class="slide-img-wrap">
        <button class="left"></button>
        <button class="right"></button>
        <div class="slide-list-btn">
          <button class="active"></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
        </div>
      </div>
      <ul class="main-product">
        <li class="product-wrap">
          <img src="./src/assets/productImg/노트북파우치.png" alt="" />
          <div class="product-store">우당탕탕 라이캣의 실험실</div>
          <div class="product-title">Hack Your Life 개발자 노트북 파우치</div>
          <div class="product-price">29,000<span>원</span></div>
        </li>
        <li class="product-wrap">
          <img src="./src/assets/productImg/노트북파우치.png" alt="" />
          <div class="product-store">store</div>
          <div class="product-title">title</div>
          <div class="product-price">price<span>원</span></div>
        </li>
        <li class="product-wrap">
          <img src="./src/assets/productImg/노트북파우치.png" alt="" />
          <div class="product-store">store</div>
          <div class="product-title">title</div>
          <div class="product-price">price<span>원</span></div>
        </li>
        <li class="product-wrap">
          <img src="./src/assets/productImg/노트북파우치.png" alt="" />
          <div class="product-store">store</div>
          <div class="product-title">title</div>
          <div class="product-price">price<span>원</span></div>
        </li>
        <li class="product-wrap">
          <img src="./src/assets/productImg/노트북파우치.png" alt="" />
          <div class="product-store">store</div>
          <div class="product-title">title</div>
          <div class="product-price">price<span>원</span></div>
        </li>
      </ul>
    </main>
    ${Footer.template()}    
        `;
  }
}

export default new Home();
