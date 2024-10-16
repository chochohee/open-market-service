import Header from "./Header.js";
import Footer from "./Footer.js";

class Cart {
  template() {
    return `
        ${Header.template()}

        ${Footer.template()};`;
  }
}

export default Cart;
