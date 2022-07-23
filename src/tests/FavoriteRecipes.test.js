import React from 'react';
import renderWithRouter from './helper/renderWithRouter';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import favoriteRecipes from './mocks/localStorage/favoriteRecipes';
import App from '../App';

describe('Testes da página de receitas favoritas', () => {
  it('Verificar se os elementos são renderizados corretamente', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    const { history } = renderWithRouter(<App />);
    history.push('/favorite-recipes');

    const btnFilterAll = screen.getByTestId('filter-by-all-btn');
    const btnFilterFood = screen.getByTestId('filter-by-food-btn');
    const btnFilterDrink = screen.getByTestId('filter-by-drink-btn');

    expect(btnFilterAll).toBeInTheDocument();
    expect(btnFilterFood).toBeInTheDocument();
    expect(btnFilterDrink).toBeInTheDocument();

    
    expect(await screen.findByText(favoriteRecipes[0].name)).toBeInTheDocument();
    expect(await screen.findByText(favoriteRecipes[1].name)).toBeInTheDocument();
  });

  it('Testa o funcionamento do botão de desfavoritar', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    const { history } = renderWithRouter(<App />);
    history.push('/favorite-recipes');

    const favoriteBtn = await screen.findByTestId('0-horizontal-favorite-btn');

    userEvent.click(favoriteBtn);

    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));

    expect(storage).toHaveLength(1);

    expect(screen.queryByTestId('1-horizontal-favorite-btn')).not.toBeInTheDocument();
  });

  it('Verifica o funcionamento do botão share', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    document.execCommand = jest.fn(() => Promise.resolve('Copiado!'));

    const { history } = renderWithRouter(<App />);
    history.push('/favorite-recipes');

    const shareBtn = await screen.findByTestId('0-horizontal-share-btn');

    userEvent.click(shareBtn);

    await waitFor(() => expect(screen.getByText(/link copied!/i)).toBeInTheDocument());
  });
});