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
    estematedTax: 0,
    grandTotal: 0,
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

export function calculateTotalBeforeTax() {
  const totalBeforeTax =
    orderSummaryObj[0].totalPrice + orderSummaryObj[0].totalShippingPrice;
  orderSummaryObj[0].totalBeforeTax = totalBeforeTax;

  const estematedTax = totalBeforeTax * 0.1;
  orderSummaryObj[0].estematedTax = estematedTax.toFixed(2);
  console.log("TAX: ", formatPrice(estematedTax));

  const grandTotal = totalBeforeTax + estematedTax;
  orderSummaryObj[0].grandTotal = grandTotal;
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

  content.querySelector(".summary__shipping-price").textContent = formatPrice(
    orderSummaryObj[0].totalShippingPrice
  );

  content.querySelector(".summary__before-tax-price").textContent = formatPrice(
    orderSummaryObj[0].totalBeforeTax
  );

  content.querySelector(".summary__estimated-tax-price").textContent =
    formatPrice(orderSummaryObj[0].estematedTax);

  content.querySelector(".summary__total-price").textContent = formatPrice(
    orderSummaryObj[0].grandTotal
  );

  content.querySelector(".summary__total-price").textContent = formatPrice(
    orderSummaryObj[0].grandTotal
  );

  placeHolderEl.appendChild(content);
  orderSummaryEl = placeHolderEl.querySelector(".summary");
}

export function updateSummaryContent() {
  console.log("updateSummaryContent is called");
  console.log("Order Summary Element: ", orderSummaryEl);
  console.log("Order Summary Object: ", orderSummaryObj);
  console.log("Shipping Price: ", orderSummaryObj[0].totalShippingPrice);

  orderSummaryEl.querySelector(".summary__items-price").textContent =
    formatPrice(orderSummaryObj[0].totalPrice);

  orderSummaryEl.querySelector(
    ".summary__items"
  ).textContent = `Items(${getTotalItems()})`;

  orderSummaryEl.querySelector(".summary__shipping-price").textContent =
    formatPrice(orderSummaryObj[0].totalShippingPrice);

  orderSummaryEl.querySelector(".summary__before-tax-price").textContent =
    formatPrice(orderSummaryObj[0].totalBeforeTax);

  orderSummaryEl.querySelector(".summary__estimated-tax-price").textContent =
    formatPrice(orderSummaryObj[0].estematedTax);

  orderSummaryEl.querySelector(".summary__total-price").textContent =
    formatPrice(orderSummaryObj[0].grandTotal);
}

export function addShippingPrice(cartItemId) {
  const matchingOption = deliveryOption.find(
    (optionItem) => optionItem.id === cartItemId
  );
  const matchingIndex = deliveryOption.indexOf(matchingOption);
  orderSummaryObj[0].totalShippingPrice +=
    deliveryOption[matchingIndex].deliveryPriceInCents;
  console.log(
    "Shipping Price",
    deliveryOption[matchingIndex].deliveryPriceInCents
  );
}

export function reAddShippingPrice() {
  orderSummaryObj[0].totalShippingPrice = 0;
  products.forEach((productItem) => {
    cart.forEach((cartItem) => {
      if (productItem.id === cartItem.id) {
        addShippingPrice(cartItem.deliveryOptionId);
      }
    });
  });
}

export function removeShippingPrice(cartId) {
  let cartOptionId = null;
  console.log("CART ID: ", cartId);
  cart.forEach((cartItem) => {
    if (cartItem.id === cartId) {
      cartOptionId = cartItem.deliveryOptionId;
    }
  });
  deliveryOption.forEach((optionItem) => {
    if (optionItem.id === cartOptionId) {
      console.log("DELIVERY PRICE IN CENTS: ", optionItem.deliveryPriceInCents);
      orderSummaryObj[0].totalShippingPrice -= optionItem.deliveryPriceInCents;
    }
  });
}
