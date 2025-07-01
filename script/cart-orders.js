console.log("ALWAYS EXECUTE ON THE FIRST LINE (CART ORDERS JS)");
import {
  cart,
  editOrderQuantity,
  removeCartItem,
  renderCartQuantity,
} from "./cart.js";
import { products } from "./products.js";
import { removeItemElement, renderCartItem } from "./render-html.js";

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
    const cartId = inputQuantity.dataset.cartId;
    editOrderQuantity(cartId, Number(inputQuantity.value));
  });
});

document.querySelectorAll(".order__remove").forEach((remove) => {
  remove.addEventListener("click", (event) => {
    removeCartItem(remove.dataset.removeId);
    removeItemElement(remove.dataset.removeId);
    renderCartQuantity();
  });
});
