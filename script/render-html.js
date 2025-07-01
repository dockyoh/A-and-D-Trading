import { formatPrice } from "./currency-formater.js";
import { products } from "./products.js";
import { searchResult } from "./shop.js";

const gridContainerEl = document.querySelector(".product-grid-container");
const orderLeftEl = document.querySelector(".order-left");

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

export function renderCartItem(productItem, cartItem) {
  const template = document.querySelector("#order-item-template");
  const clone = template.content.cloneNode(true);

  const addClass = clone.querySelector(".order-item-container");
  addClass.classList.add(`order__item-${cartItem.id}`);

  clone.querySelector("#delivery__input-1").id = `delivery__input-1-${cartItem.id}`;
  clone.querySelector("#delivery__input-2").id = `delivery__input-2-${cartItem.id}`;
  clone.querySelector("#delivery__input-3").id = `delivery__input-3-${cartItem.id}`;

  clone.querySelector(`#delivery__input-1-${cartItem.id}`).name = `delivery__input-radio-${cartItem.id}`;
  clone.querySelector(`#delivery__input-2-${cartItem.id}`).name = `delivery__input-radio-${cartItem.id}`;
  clone.querySelector(`#delivery__input-3-${cartItem.id}`).name = `delivery__input-radio-${cartItem.id}`;

  clone.querySelector("#label-1").setAttribute("for",`delivery__input-1-${cartItem.id}`);
  clone.querySelector("#label-2").setAttribute("for",`delivery__input-2-${cartItem.id}`);
  clone.querySelector("#label-3").setAttribute("for",`delivery__input-3-${cartItem.id}`);
  
  clone.querySelector(".order-item-date").textContent =
    "Delivery date: Tuesday, July 8";
  clone.querySelector(".order-item-image").src = productItem.image;
  clone.querySelector(".order__item-name").textContent = productItem.pName;
  clone.querySelector(".order__item-price").textContent = formatPrice(
    productItem.priceInCents
  );
  clone.querySelector("#order__input-quantity").value = cartItem.quantity;
  clone
    .querySelector("#order__input-quantity")
    .setAttribute("data-cart-id", cartItem.id);
  clone
    .querySelector(".order__remove")
    .setAttribute("data-remove-id", cartItem.id);

  orderLeftEl.appendChild(clone);
}

export function removeItemElement(removeId) {
  const itemToRemove = document.querySelector(`.order__item-${removeId}`);
  itemToRemove.remove();
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
  priceEl.textContent = `${formatPrice(item.priceInCents)}`;
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
