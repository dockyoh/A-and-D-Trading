import { totalCartQuantity } from "./cart-orders.js";
import { addToCart } from "./cart.js";
import { getInputs, setInputs } from "./inputs-logic.js";
import { renderProducts } from "./render-html.js";
import { searchProduct } from "./shop.js";

totalCartQuantity();
renderProducts();

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  const input = document.querySelector("input");

  searchProduct(input.value);
});

document.querySelectorAll(".input-quantity").forEach((input) => {
  setInputs(input.value, input.dataset.productId);
  let keys = "1";
  input.addEventListener("keyup", (event) => {
    keys = getInputs(input.dataset.productId);
    if (Number(event.key) || event.key === "0") {
      if (keys.length === 0 && event.key === "0") {
        input.value = 1;
        keys = "1";
      } else {
        keys += event.key;
      }
      console.log(keys);
    } else {
      if (event.key === "Backspace") {
        let newKeys = keys.toString().slice(0, -1);
        keys = newKeys;
      }
    }
    console.log(`KEYUP ID: ${input.dataset.productId}`);
    console.log(`KEYUP VALUE: ${input.value}`);
    console.log(`INPUT VALUE: ${input.value}`);
    console.log(`KEYS VALUE: ${keys}`);
    console.log(`KEYUP KEYS: ${keys}`);
    setInputs(keys, input.dataset.productId);
    keys = getInputs(input.dataset.productId);
    input.value = getInputs(input.dataset.productId);
  });
});

document.querySelectorAll(".decrement").forEach((decrement) => {
  decrement.addEventListener("click", (event) => {
    const input = event.target.nextElementSibling;
    let value = Number(input.value);
    if (value > 1) {
      value -= 1;
      input.value = value;
    }
    console.log(`DECREMENT KEYS: ${value}`);
    setInputs(value, decrement.dataset.productId);
  });
});

document.querySelectorAll(".increment").forEach((increment) => {
  increment.addEventListener("click", (event) => {
    const input = event.target.previousElementSibling;
    let value = Number(input.value);
    value += 1;
    input.value = value;
    console.log(`INCREMENT KEYS: ${value}`);
    setInputs(value, increment.dataset.productId);
  });
});

document.querySelectorAll(".add-to-cart").forEach((addButton) => {
  addButton.addEventListener("click", (event) => {
    event.preventDefault();
    const productId = addButton.dataset.productId;
    addToCart(productId);
  });
});
