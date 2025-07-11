import { cart, getTotalItems } from "./cart.js";
import { formatPrice } from "./currency-formater.js";
import { products } from "./products.js";

let totalPrice = 0;
let updateTemplateContent = null;

export function renderOrderSummary() {
  products.forEach((product) => {
    cart.forEach((item) => {
      if (product.id === item.id) {
        totalPrice += product.priceInCents;
      }
    });
  });
  console.log(formatPrice(totalPrice));
  renderSummaryHTML();
}

export function renderSummaryHTML() {
  const placeHolderEl = document.querySelector(".summary__placeholder");

  const template = document.querySelector("#summary__template");
  const content = template.content.cloneNode(true);

  content.querySelector(
    ".summary__items"
  ).textContent = `Items(${getTotalItems()})`;
  content.querySelector(".summary__items-price").textContent =
    formatPrice(totalPrice);

  updateTemplateContent = placeHolderEl.appendChild(content);
}

export function updateSummaryHTML() {
  if (!updateTemplateContent) {
    console.error("Template content not rendered yet.");
    return;
  } else {
    console.log("Template content is rendered");
    console.log(updateTemplateContent.innerHTML);
  }

  const itemsEl = updateTemplateContent.querySelector(".summary__items");
  if (!itemsEl) {
    console.error(".summary__items not found inside template content.");
    return;
  }
}
