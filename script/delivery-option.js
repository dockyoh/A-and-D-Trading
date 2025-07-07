import { formatPrice } from "./currency-formater.js";

export const deliveryOption = [
  {
    id: "1",
    deliveryDate: 7,
    deliveryPriceInCents: 0,
  },
  {
    id: "2",
    deliveryDate: 3,
    deliveryPriceInCents: 499,
  },
  {
    id: "3",
    deliveryDate: 1,
    deliveryPriceInCents: 999,
  },
];

export function getShippingPrice(price) {
  if (price === 0) return "FREE Shipping";
  else if (price === 499) return `${formatPrice(price)} - Shipping`;
  else return `${formatPrice(price)} - Shipping`;
}
