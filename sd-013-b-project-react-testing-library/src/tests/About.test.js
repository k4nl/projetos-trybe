import React from 'react';

import { screen } from '@testing-library/react';

import About from '../components/About';
import renderWithRouter from './renderWithRouter';

// recupera os elementos que vamos testar
// interage com eles se for o caso
// faz os testes

describe('Testando About.js', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const pokedex = screen.getAllByText(/see more details for each one of them/i);
    expect(pokedex).toBeDefined();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    const aboutPokedex = screen.getByRole('heading');
    expect(aboutPokedex.textContent).toBe('About Pokédex');
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const imgURL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const aboutImg = screen.getByAltText('Pokédex');
    expect(aboutImg.src).toBe(imgURL);
  });
});
