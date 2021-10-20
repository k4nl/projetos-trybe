import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './renderWithRouter';
import data from '../data';

// recupera os elementos que vamos testar
// interage com eles se for o caso
// faz os testes

describe('Testando Pokemon', () => {
  const message = 'Teste se é renderizado um card';
  const byName = 'pokemon-name';
  const byType = 'pokemon-type';
  const byWeight = 'pokemon-weight';
  const moreDetails = 'More details';

  test(` ${message}
  com o nome correto do Pokémon deve ser mostrado na tela`, () => {
    renderWithRouter(<Pokemon pokemon={ data[0] } isFavorite={ false } />);
    const pokemonName = screen.getByTestId(byName);
    expect(pokemonName).toBeDefined();
    expect(pokemonName.textContent).toBe('Pikachu');
  });

  test(` ${message}
  com o tipo correto do pokémon deve ser mostrado na tela`, () => {
    renderWithRouter(<Pokemon pokemon={ data[0] } isFavorite />);
    const pokemonType = screen.getByTestId(byType);
    expect(pokemonType).toBeDefined();
    expect(pokemonType.textContent).toBe('Electric');
  });

  test(` ${message}
  com o um texto no formato correto Average weight: <value> <measurementUnit>`, () => {
    renderWithRouter(<Pokemon pokemon={ data[0] } isFavorite />);
    const pokemonWeight = screen.getByTestId(byWeight);
    expect(pokemonWeight).toBeDefined();
    expect(pokemonWeight.textContent).toBe('Average weight: 6.0 kg');
  });

  test(` ${message}
  com a exibicao da imagem do pokemon`, () => {
    renderWithRouter(<Pokemon pokemon={ data[0] } isFavorite />);
    const imgURL = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const pokemonImg = screen.getByAltText('Pikachu sprite');
    expect(pokemonImg).toBeDefined();
    expect(pokemonImg.src).toBe(imgURL);
  });

  test(`Se ao clicar no link de navegação do Pokémon,
   é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.`, () => {
    renderWithRouter(<Pokemon pokemon={ data[0] } isFavorite />);
    const pokemonDetails = screen.getByText(moreDetails);
    expect(pokemonDetails).toBeDefined();
    expect(pokemonDetails.textContent).toBe('More details');
  });

  test(`Se o card do Pokémon indicado na 
  Pokédex contém um link de navegação para exibir detalhes deste Pokémon`, () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ data[0] }
      isFavorite
    />);
    const pokemonDetails = screen.getByText(moreDetails);
    fireEvent.click(pokemonDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test(`Se existe um ícone de 
  estrela nos Pokémons favoritados.`, () => {
    renderWithRouter(<Pokemon
      pokemon={ data[0] }
      isFavorite
    />);
    const favoriteImg = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteImg).toBeDefined();
    expect(favoriteImg.src).toMatch(/\/star-icon.svg/i);
  });
});
