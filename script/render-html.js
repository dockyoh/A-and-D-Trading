import { products } from "./products.js";
import { searchResult } from "./shop.js";

const gridContainerEl = document.querySelector(".product-grid-container");

export function renderProducts() {
  products.map((item) => {
    createElements(item);
  });
}

export function renderSearchResult() {
  gridContainerEl.innerHTML = "";

  searchResult.map((item) => {
    console.log(item);
    createElements(item);
  });
}

function createElements(item) {
  const productContainerEl = document.createElement("div");

  const imageWrapperEl = document.createElement("div");
  const productImgEl = document.createElement("img");
  const brandEl = document.createElement("p");
  const namePriceWrapperEl = document.createElement("div");
  const nameEl = document.createElement("p");
  const priceEl = document.createElement("p");

  const quantityAddContainerEl = document.createElement("div");
  const quantityWrapperEl = document.createElement("div");
  const decrementEl = document.createElement("span");
  const quantityEl = document.createElement("input");
  const incrementEl = document.createElement("span");
  const addToCartEl = document.createElement("button");

  productContainerEl.setAttribute("class", "product");
  productImgEl.setAttribute("src", `${item.image}`);
  brandEl.setAttribute("class", "brand");
  imageWrapperEl.setAttribute("class", "product-img-wrapper");
  namePriceWrapperEl.setAttribute("class", "name-price-wrapper");
  nameEl.setAttribute("class", "name");
  priceEl.setAttribute("class", "price");

  quantityAddContainerEl.setAttribute("class", "quantity-add-container");
  quantityWrapperEl.setAttribute("class", "quantity-wrapper");
  decrementEl.setAttribute("class", "decrement");
  decrementEl.setAttribute("data-product-id", `${item.id}`);
  quantityEl.setAttribute("type", "text");
  quantityEl.setAttribute("class", "input-quantity");
  quantityEl.setAttribute("value", "1");
  quantityEl.setAttribute("data-product-id", `${item.id}`);
  incrementEl.setAttribute("class", "increment");
  incrementEl.setAttribute("data-product-id", `${item.id}`);
  addToCartEl.setAttribute("class", "add-to-cart");
  addToCartEl.setAttribute("data-product-id", `${item.id}`);

  brandEl.textContent = `${item.brand}`;
  nameEl.textContent = `${item.pName}`;
  priceEl.textContent = `₱${item.price}.00`;
  decrementEl.textContent = "-";
  incrementEl.textContent = "+";
  addToCartEl.textContent = "Add to Cart";

  productContainerEl.appendChild(imageWrapperEl);
  imageWrapperEl.appendChild(productImgEl);
  productContainerEl.appendChild(brandEl);
  productContainerEl.appendChild(namePriceWrapperEl);
  namePriceWrapperEl.appendChild(nameEl);
  namePriceWrapperEl.appendChild(priceEl);
  productContainerEl.appendChild(quantityAddContainerEl);
  quantityAddContainerEl.appendChild(quantityWrapperEl);
  quantityWrapperEl.appendChild(decrementEl);
  quantityWrapperEl.appendChild(quantityEl);
  quantityWrapperEl.appendChild(incrementEl);
  quantityAddContainerEl.appendChild(addToCartEl);

  gridContainerEl.appendChild(productContainerEl);
}
