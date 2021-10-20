import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';
import data from '../data';

// recupera os elementos que vamos testar
// interage com eles se for o caso
// faz os testes

describe('Testando FavoritePokemons.js', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found,'
  + 'se a pessoa não tiver pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const mesage = screen.getByText('No favorite pokemon found');
    expect(mesage).toBeDefined();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const pokemon1 = 25;
    const pokemon2 = 4;
    const pokemons = data
      .filter((pokemon) => pokemon.id === pokemon1 || pokemon.id === pokemon2);
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    const pikachu = screen.getByText('Pikachu');
    const charmander = screen.getByText('Charmander');
    expect(pokemons.length).toStrictEqual(2);
    expect(pikachu).toBeDefined();
    expect(charmander).toBeDefined();
  });
});
