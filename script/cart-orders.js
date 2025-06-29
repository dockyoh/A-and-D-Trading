import { cart } from "./cart.js";
import { renderCartQuantity } from "./render-html.js";

totalCartQuantity();

export function totalCartQuantity() {
  let quantity = 0;
  cart.forEach((cartQuantity) => {
    quantity += cartQuantity.quantity;
    console.log(cartQuantity.quantity);
  });
  renderCartQuantity(quantity);
}
