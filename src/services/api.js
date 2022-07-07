export async function getCategories() {
  // Implemente aqui
  const endPointUrl = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(endPointUrl);
  const data = response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  const endPointUrlQuery = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const endPointUrlCategory = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;

  const endPointUrl = query ? endPointUrlQuery : endPointUrlCategory;

  const response = await fetch(endPointUrl);
  const data = response.json();

  return data;
}
