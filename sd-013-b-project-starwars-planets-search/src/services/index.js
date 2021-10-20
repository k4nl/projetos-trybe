const url = 'https://swapi-trybe.herokuapp.com/api/planets/';

export default async function getPlanets() {
  const fetchApi = await fetch(url);
  const data = await fetchApi.json();
  return data;
}
