import { cart, getTotalItems } from "./cart.js";
import { formatPrice } from "./currency-formater.js";
import { deliveryOption } from "./delivery-option.js";
import { products } from "./products.js";

// let totalPrice = 0;
// export let totalShippingPrice = 0;
// let totalBeforeTax = totalPrice + totalShippingPrice;
const placeHolderEl = document.querySelector(".summary__placeholder");
let orderSummaryEl = null;

export let orderSummaryObj = [
  {
    totalPrice: 0,
    totalShippingPrice: 0,
    totalBeforeTax: 0,
  },
];

export function calculateTotalPrice() {
  orderSummaryObj[0].totalPrice = 0;
  products.forEach((product) => {
    cart.forEach((item) => {
      if (product.id === item.id) {
        orderSummaryObj[0].totalPrice += product.priceInCents * item.quantity;
      }
    });
  });
}

export function renderSummaryHTML() {
  const template = document.querySelector("#summary__template");
  const content = template.content.cloneNode(true);

  content.querySelector(
    ".summary__items"
  ).textContent = `Items(${getTotalItems()})`;
  content.querySelector(".summary__items-price").textContent = formatPrice(
    orderSummaryObj[0].totalPrice
  );

  content.querySelector(".summary__shipping-price");

  content.querySelector(".summary__before-tax-price");

  placeHolderEl.appendChild(content);
  orderSummaryEl = placeHolderEl.querySelector(".summary");
}

export function updateSummaryContent() {
  console.log("updateSummaryContent is called");
  console.log("Order Summary Element: ", orderSummaryEl);
  console.log("Order Summary Object: ", orderSummaryObj);

  orderSummaryEl.querySelector(".summary__items-price").textContent =
    formatPrice(orderSummaryObj[0].totalPrice);

  orderSummaryEl.querySelector(
    ".summary__items"
  ).textContent = `Items(${getTotalItems()})`;
}

export function addShippingPrice(cartItem) {
  const matchingOption = deliveryOption.find(
    (optionItem) => optionItem.id === cartItem.deliveryOptionId
  );
  const matchingIndex = deliveryOption.indexOf(matchingOption);
  // totalShippingPrice += deliveryOption[matchingIndex].deliveryPriceInCents;
  console.log(
    "Shipping Price",
    deliveryOption[matchingIndex].deliveryPriceInCents
  );
  // console.log("Total Shipping Price", totalShippingPrice);
  // console.log("Total Before Tax: ", totalBeforeTax);
}
