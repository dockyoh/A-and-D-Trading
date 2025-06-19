export function formatPrice(priceInCents) {
  const centsToPeso = priceInCents / 100;
  return centsToPeso.toFixed(2);
}
