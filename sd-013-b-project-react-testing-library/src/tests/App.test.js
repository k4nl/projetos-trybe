import React from 'react';

import { screen, fireEvent } from '@testing-library/react';

import App from '../App';
import renderWithRouter from './renderWithRouter';

// recupera os elementos que vamos testar
// interage com eles se for o caso
// faz os testes

describe('Testando App.js', () => {
  test('Testando o primeiro Link, Home', () => {
    renderWithRouter(<App />);
    const firstLink = screen.getAllByRole('link')[0];
    expect(firstLink.textContent).toBe('Home');
  });
  test('O segundo link deve possuir o texto About', () => {
    renderWithRouter(<App />);
    const secondLink = screen.getAllByRole('link')[1];
    expect(secondLink.textContent).toBe('About');
  });

  test('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const thirdLink = screen.getAllByRole('link')[2];
    expect(thirdLink.textContent).toBe('Favorite Pokémons');
  });

  test('A aplicação é redirecionada para a página inicial, '
  + 'na URL / ao clicar no link Home da barra de navegação.',
  () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByText(/Home/i);
    fireEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Se a aplicação é redirecionada para a'
  + 'página de About, na URL /about, ao clicar no link About da barra de navegação.',
  () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByText(/About/i);
    fireEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Se a aplicação é redirecionada para a'
  + 'página de About, na URL /about, ao clicar no link About da barra de navegação.',
  () => {
    const { history } = renderWithRouter(<App />);
    const pokemonsFavoritados = screen.getByText(/Favorite Pokémons/i);
    fireEvent.click(pokemonsFavoritados);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Teste se a aplicação é redirecionada para a'
  + 'página Not Found ao entrar em uma URL desconhecida',
  () => {
    const { history } = renderWithRouter(<App />);
    history.push('/alberto');
    const notFound = screen.getAllByText('Page requested not found');
    expect(notFound).toBeDefined();
  });
});
