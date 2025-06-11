import { products } from "./products.js";
import { renderSearchResult } from "./render-html.js";

export let searchResult = [];

export function searchProduct(inputValue) {
  searchResult.length = 0;

  products.forEach((item) => {
    const productName = item.pName.toLowerCase();
    if (productName.includes(inputValue)) {
      searchResult.push(item);
    }
  });

  renderSearchResult();
}
