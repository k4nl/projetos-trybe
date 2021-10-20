const URL = 'https://api.mercadolibre.com/sites/MLB';

export async function getCategories() {
  const endpoint = `${URL}/categories`;

  const fetchApi = await fetch(endpoint);
  const data = await fetchApi.json();

  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  let endpoint = '';

  if (categoryId && query) {
    endpoint = `${URL}/search?category=${categoryId}&q=${query}`;
  } else if (categoryId) {
    endpoint = `${URL}/search?category=${categoryId}`;
  } else if (query) {
    endpoint = `${URL}/search?q=${query}`;
  }

  const fetchApi = await fetch(endpoint);
  const data = await fetchApi.json();

  return data;
}

export async function getProductsDescription(catalogoid) {
  const url = `https://api.mercadolibre.com/catalog_products/${catalogoid}`;
  const fetchApi = await fetch(url);
  const data = await fetchApi.json();

  return data;
}
