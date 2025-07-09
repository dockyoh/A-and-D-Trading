import { cart } from "./cart.js";
import { formatPrice } from "./currency-formater.js";
import { getDeliveryDate } from "./date-logic.js";
import { deliveryOption, getShippingPrice } from "./delivery-option.js";
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
    createElements(item);
  });
}

export function renderCartItem(productItem, cartItem) {
  const orderLeftEl = document.querySelector(".order-left");

  const orderItemTemplate = document.getElementById("order-item-template");
  const orderItemContent = orderItemTemplate.content.cloneNode(true);

  const deliveryOptionPlaceholder = orderItemContent.querySelector(
    ".delivery__option-placeholder"
  );

  const orderItemContentEl = orderItemContent.querySelector(
    ".order-item-container"
  );

  orderItemContentEl.classList.add(`order__item-${cartItem.id}`);

  orderItemContent
    .querySelector(".order-item-date")
    .setAttribute("class", `order-item-date-${cartItem.id}`);

  orderItemContent.querySelector(".order-item-image").src = productItem.image;
  orderItemContent.querySelector(".order__item-name").textContent =
    productItem.pName;
  orderItemContent.querySelector(".order__item-price").textContent =
    formatPrice(productItem.priceInCents);
  orderItemContent.querySelector("#order__input-quantity").value =
    cartItem.quantity;
  orderItemContent
    .querySelector("#order__input-quantity")
    .setAttribute("data-cart-id", cartItem.id);
  orderItemContent
    .querySelector(".order__remove")
    .setAttribute("data-remove-id", cartItem.id);

  orderLeftEl.appendChild(orderItemContent);

  const deliveryOptionTemplate = document.getElementById(
    "delivery__option-template"
  );

  renderDeliveryOption(
    deliveryOptionPlaceholder,
    deliveryOptionTemplate,
    cartItem
  );
}

export function renderDeliveryOption(
  optionPlaceholder,
  optionTemplate,
  cartItem
) {
  deliveryOption.forEach((option) => {
    const optionTemplateContent = optionTemplate.content.cloneNode(true);

    const inputs = optionTemplateContent.querySelector(`#delivery__input`);
    const labels = optionTemplateContent.querySelector("label");

    inputs.setAttribute("data-cart-id", `${cartItem.id}`);
    inputs.setAttribute("data-delivery-id", `${option.id}`);

    if ((!inputs, !labels)) {
      console.error("Missing delivery input(s) and label(s) in template");
      return;
    }

    optionTemplateContent
      .querySelector(`#delivery__input`)
      .setAttribute("id", `delivery__input-${option.id}-${cartItem.id}`);

    optionTemplateContent
      .querySelector(`#delivery__input-${option.id}-${cartItem.id}`)
      .setAttribute("name", `delivery__input-radio-${cartItem.id}`);

    renderCheckedRadio(cartItem, option, optionTemplateContent);

    optionTemplateContent
      .querySelector("label")
      .setAttribute("for", `delivery__input-${option.id}-${cartItem.id}`);

    optionTemplateContent
      .querySelector("label")
      .classList.add(`delivery__label-${option.id}`);

    optionTemplateContent.querySelector(".delivery__label-date").textContent =
      getDeliveryDate(option.deliveryDate);

    optionTemplateContent.querySelector(".delivery__label-price").textContent =
      getShippingPrice(option.deliveryPriceInCents);

    optionPlaceholder.appendChild(optionTemplateContent);
  });
}

export function renderCheckedRadio(cartItem, option, optionTemplateContent) {
  if (cartItem.deliveryOptionId === option.id) {
    optionTemplateContent.querySelector(
      `#delivery__input-${option.id}-${cartItem.id}`
    ).checked = true;
    renderDeliveryDate(cartItem.id, option);
  }
}

export function renderDeliveryDate(inputId, deliveryOption) {
  const orderDateHeader = document.querySelector(`.order-item-date-${inputId}`);
  const days = deliveryOption.deliveryDate;
  orderDateHeader.textContent = `Delivery date: ${getDeliveryDate(days)}`;
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
