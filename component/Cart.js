import Header from "./Header.js";
import Footer from "./Footer.js";

class Cart {
  template() {
    return `
        ${Header.template()}
        <h2>장바구니</h2>
        
        ${Footer.template()};`;
  }
}

export default new Cart();
