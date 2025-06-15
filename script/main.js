import { addToCart } from "./cart.js";
import { renderProducts } from "./render-html.js";
import { searchProduct } from "./shop.js";

renderProducts();
let isIncrement = false;

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  const input = document.querySelector("input");

  searchProduct(input.value);
});

document.querySelectorAll(".input-quantity").forEach((input) => {
  let keys = "";
  input.addEventListener("keyup", (event) => {
    if (Number(event.key) || event.key === "0") {
      if (keys.length === 0 && event.key === "0") {
        input.value = "1";
        keys = "1";
      } else {
        keys += event.key;
      }
    } else {
      if (event.key === "Backspace") {
        let newKeys = keys.slice(0, -1);
        keys = newKeys;
      }
      // input.value = keys;
    }
    input.value = keys;
  });
  console.log(`input value: ${input.value}`);
});

document.querySelectorAll(".decrement").forEach((decrement) => {
  decrement.addEventListener("click", (event) => {
    isIncrement = false;
    const input = event.target.nextElementSibling;
    let value = Number(input.value);
    if (value > 1) {
      value -= 1;
      input.value = value;
    }
    console.log(input.value);
    decrement.setAttribute("data-quantity", `${value}`);
  });
});

document.querySelectorAll(".increment").forEach((increment) => {
  increment.addEventListener("click", (event) => {
    isIncrement = true;
    const input = event.target.previousElementSibling;
    let value = Number(input.value);
    value += 1;
    input.value = value;
    console.log(input.value);
    increment.setAttribute("data-quantity", `${value}`);
  });
});

document.querySelectorAll(".add-to-cart").forEach((addButton) => {
  addButton.addEventListener("click", (event) => {
    event.preventDefault();
    const productId = addButton.dataset.productId;
    addToCart(productId, isIncrement);
    console.log(productId);
  });
});
