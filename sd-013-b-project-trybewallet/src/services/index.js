const api = 'https://economia.awesomeapi.com.br/json/all';

export async function fetchCurrenciesApi() {
  const fetchApi = await fetch(api);
  const data = await fetchApi.json();
  const three = 3;
  const dataArray = Object.keys(data).filter((currency) => currency.length === three);
  return dataArray;
}

export async function fetchExchangeRateApi() {
  const fetchApi = await fetch(api);
  const data = await fetchApi.json();
  return data;
}
