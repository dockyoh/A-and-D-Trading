export let cart = JSON.parse(localStorage.getItem("cart")) || [];

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
      console.log(cart);
      renderCartQuantity();
    }
  });
  saveCart();
}

export function renderCartQuantity() {
  let cartQuantityEl = document.querySelector(".cart-quantity");
  let totalQuantity = 0;
  cart.forEach((item) => {
    totalQuantity += item.quantity;
  });
  cartQuantityEl.textContent = totalQuantity;
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
