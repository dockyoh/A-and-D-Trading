export function formatPrice(priceInCents) {
  const centsToPeso = priceInCents / 100;
  // return `₱${centsToPeso.toFixed(2)}`;
  const stringCurrency = centsToPeso.toLocaleString("en-US", {
    style: "currency",
    currency: "PHP",
  });
  return stringCurrency;
}
