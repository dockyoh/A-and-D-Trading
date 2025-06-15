import { products } from "./products.js";

export let cart = [];
let quantity;

export function addToCart(productId, isIncrement) {
  if (isIncrement) {
    getIncrementValue(productId);
  } else {
    getDecrementValue(productId);
  }
  products.forEach((item) => {
    if (item.id === productId) {
      console.log("Product Match found");
      console.log(`Quantity: ${quantity}`);
    } else {
      console.log("No Match Data");
    }
  });
}

function getIncrementValue(productId) {
  document.querySelectorAll(".increment").forEach((increment) => {
    if (increment.dataset.productId === productId) {
      quantity = increment.dataset.quantity;
      if (!quantity) quantity = 1;
      console.log(`increment Quantity: ${quantity}`);
    }
  });
}

function getDecrementValue(productId) {
  document.querySelectorAll(".decrement").forEach((decrement) => {
    if (decrement.dataset.productId === productId) {
      quantity = decrement.dataset.quantity;
      if (!quantity) quantity = 1;
      console.log(`decrement Quantity: ${quantity}`);
    }
  });
}
