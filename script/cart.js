import { products } from "./products.js";

export let cart = [];

export function addToCart(productId) {
  const matchingItem = cart.find((item) => item.id === productId);

  document.querySelectorAll(".input-quantity").forEach((input) => {
    if (input.dataset.productId === productId) {
      const quantity = Number(input.value);

      if (!matchingItem) {
        cart.push({
          id: productId,
          quantity: quantity,
        });
      } else {
        const matchingIndex = cart.indexOf(matchingItem);
        // console.log(cart[matchingIndex].quantity);
        cart[matchingIndex].quantity += quantity;
      }
      // console.log(`Product ID: ${productId} Quantity: ${quantity}`);
      // console.log(cart.indexOf(matchingItem));
      console.log(cart);
      renderCartQuantity();
    }
  });
}

function renderCartQuantity() {
  let cartQuantityEl = document.querySelector(".cart-quantity");
  let totalQuantity = 0;
  cart.forEach((item) => {
    totalQuantity += item.quantity;
  });
  cartQuantityEl.textContent = totalQuantity;
}
