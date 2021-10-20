import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

// recupera os elementos que vamos testar
// interage com eles se for o caso
// faz os testes

describe('Testando NotFound', () => {
  test('Teste se página contém um heading h2 com o texto,'
  + 'Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    const heading = screen.getByRole('heading');
    expect(heading.textContent).toBe('Page requested not found 😭');
  });

  test('Teste se página mostra a imagem', () => {
    const imgURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    renderWithRouter(<NotFound />);
    const image = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(image.src).toBe(imgURL);
  });
});
