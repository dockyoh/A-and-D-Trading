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

  productContainerEl.setAttribute("class", "product");
  productImgEl.setAttribute("src", `${item.image}`);
  brandEl.setAttribute("class", "brand");
  imageWrapperEl.setAttribute("class", "product-img-wrapper");
  namePriceWrapperEl.setAttribute("class", "name-price-wrapper");
  nameEl.setAttribute("class", "name");
  priceEl.setAttribute("class", "price");

  brandEl.textContent = `${item.brand}`;
  nameEl.textContent = `${item.pName}`;
  priceEl.textContent = `₱${item.price}.00`;

  productContainerEl.appendChild(imageWrapperEl);
  imageWrapperEl.appendChild(productImgEl);
  productContainerEl.appendChild(brandEl);
  productContainerEl.appendChild(namePriceWrapperEl);
  namePriceWrapperEl.appendChild(nameEl);
  namePriceWrapperEl.appendChild(priceEl);

  gridContainerEl.appendChild(productContainerEl);
}
