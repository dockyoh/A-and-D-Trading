console.log("ALWAYS EXECUTE ON THE FIRST LINE (CART ORDERS JS)");
import {
  addDeliveryId,
  cart,
  editOrderQuantity,
  removeCartItem,
  renderCartQuantity,
} from "./cart.js";
import { deliveryOption } from "./delivery-option.js";
import { products } from "./products.js";
import {
  removeItemElement,
  renderCartItem,
  renderDeliveryDate,
} from "./render-html.js";

renderCartQuantity();
matchingProductCart();
console.log(cart);

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

document.querySelectorAll("input").forEach((inputRadio) => {
  inputRadio.addEventListener("click", (event) => {
    const deliveryId = inputRadio.dataset.deliveryId;
    const cartId = inputRadio.dataset.cartId;
    addDeliveryId(cartId, deliveryId);
    deliveryOption.forEach((option) => {
      if (option.id === deliveryId) {
        renderDeliveryDate(cartId, option);
      }
    });
  });
});
