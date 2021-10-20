import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import renderWithRouter from './renderWithRouter';
import data from '../data';

// recupera os elementos que vamos testar
// interage com eles se for o caso
// faz os testes

describe('Testando Pokedex', () => {
  const proximoPokemon = 'Próximo pokémon';
  const pokemonName = 'pokemon-name';
  test('Teste se página contém um heading h2 com o texto,'
  + 'Encountered pokémons', () => {
    renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ { 25: false } }
    />);
    const heading = screen.getByRole('heading');
    expect(heading.textContent).toBe('Encountered pokémons');
  });

  test('Teste se é exibido o próximo Pokémon da lista,'
  + 'quando o botão Próximo pokémon é clicado.', () => {
    renderWithRouter(<Pokedex
      pokemons={ [data[0], data[1]] }
      isPokemonFavoriteById={ { 25: false, 4: false } }
    />);

    const nextPokemon = screen.getByText(proximoPokemon);
    expect(nextPokemon.textContent).toBe(proximoPokemon);

    fireEvent.click(nextPokemon);
    const pokemon = screen.getByText('Charmander');
    expect(pokemon).toBeDefined();

    fireEvent.click(nextPokemon);
    const firstPokemon = screen.getAllByText('Pikachu');
    expect(firstPokemon).toBeDefined();
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<Pokedex
      pokemons={ [data[4], data[5]] }
      isPokemonFavoriteById={ { 65: false, 151: false } }
    />);
    const one = 1;
    const nextPokemon = screen.getAllByTestId('next-pokemon');
    expect(nextPokemon.length).toBe(one);
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ { 25: false, 4: false, 78: false } }
    />);
    const allButton = screen.getByText('All');
    // se existem 7 botoes
    const filterButons = screen.getAllByTestId('pokemon-type-button');
    const seven = 7;
    expect(filterButons.length).toBe(seven);
    // se nao existem botoes duplicados
    const allFilter = filterButons
      .map((type) => type.textContent);
    const isDuplicated = allFilter
      .some((value, index) => allFilter.indexOf(value) !== index);
    expect(isDuplicated).toBe(false);
    // testando com eletric ( nao ha outro pokemon eletrico )
    expect(filterButons[0].textContent).toBe('Electric');
    fireEvent.click(filterButons[0]);
    const nextPokemon = screen.getByText(proximoPokemon);
    expect(nextPokemon).toBeDisabled();
    expect(allButton).toBeDefined();
    // testanto com fogo ( existe 2 pokemons de fogo )
    // primeiro pokemon
    expect(filterButons[1].textContent).toBe('Fire');
    fireEvent.click(filterButons[1]);
    const charmander = screen.getByTestId(pokemonName);
    expect(nextPokemon).not.toBeDisabled();
    expect(charmander.textContent).toBe('Charmander');
    expect(allButton).toBeDefined();
    // segundo pokemon
    fireEvent.click(nextPokemon);
    expect(nextPokemon).not.toBeDisabled();
    const rapidash = screen.getByTestId(pokemonName);
    expect(rapidash.textContent).toBe('Rapidash');
    expect(allButton).toBeDefined();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ { 25: false, 4: false } }
    />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[0].textContent).toBe('All');

    fireEvent.click(buttons[0]);
    const pikachu = screen.getByTestId(pokemonName);
    expect(pikachu.textContent).toBe('Pikachu');
    // botao proximo pokemon = buttons[8]
    fireEvent.click(buttons[8]);
    const charmander = screen.getByTestId(pokemonName);
    expect(charmander.textContent).toBe('Charmander');
  });
});
