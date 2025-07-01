console.log("ALWAYS EXECUTE ON THE FIRST LINE (CART JS)");
// import { matchingProductCart } from "./cart-orders.js"; // !ALERT THIS LINE OF CODE CAN GIVE YOU A HEADACHE!

export let cart = JSON.parse(localStorage.getItem("cart")) || [];

renderCartQuantity();

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
        cart[matchingIndex].quantity += quantity;
      }
      renderCartQuantity();
    }
  });
  saveCart();
}

export function removeCartItem(cartId) {
  const indexToRemove = cart.findIndex((cartObj) => cartObj.id === cartId);
  cart.splice(indexToRemove, 1);
  saveCart();
}

export function renderCartQuantity() {
  let cartQuantityEl = document.querySelector(".cart-quantity");
  let checkOutItemsEl = document.querySelector(".checkout-title");
  let totalQuantity = 0;
  cart.forEach((item) => {
    totalQuantity += item.quantity;
  });
  if (totalQuantity === 0) {
    cartQuantityEl.textContent = "";
    if (checkOutItemsEl) checkOutItemsEl.textContent = "";
  } else {
    cartQuantityEl.textContent = totalQuantity;
    if (checkOutItemsEl)
      checkOutItemsEl.textContent = `Checkout(${totalQuantity} item(s))`;
  }
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function editOrderQuantity(cartId, value) {
  cart.forEach((cartItem) => {
    if (cartItem.id === cartId) {
      cartItem.quantity = value;
      saveCart();
      renderCartQuantity();
    }
  });
}
