import {
  addToCart,
  cart,
  editOrderQuantity,
  renderCartQuantity,
} from "./cart.js";
import { products } from "./products.js";
import { renderCartItem } from "./render-html.js";

renderCartQuantity();
matchingProductCart();

function matchingProductCart() {
  products.forEach((productItem) => {
    cart.forEach((cartItem) => {
      if (productItem.id === cartItem.id) {
        renderCartItem(productItem, cartItem);
      }
    });
  });
}

document.querySelectorAll(".order__edit-quantity").forEach((inputQuantity) => {
  inputQuantity.addEventListener("input", (event) => {
    event.preventDefault();
    console.log(inputQuantity.dataset.cartId);
    const cartId = inputQuantity.dataset.cartId;
    editOrderQuantity(cartId, Number(inputQuantity.value));
  });
});
