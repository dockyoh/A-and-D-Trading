import { renderProducts } from "./render-html.js";
import { searchProduct } from "./shop.js";

renderProducts();

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  const input = document.querySelector("input");

  searchProduct(input.value);
});
