import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';
import doneRecipes from './mocks/doneRecipes';

describe('Testes da página de receitas feitas', () => {
  it('Testa se os elementos são renderizados na página', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

    const { history } = renderWithRouter(<App />);
    history.push('/done-recipes');

    const btnFilterAll = screen.getByTestId('filter-by-all-btn');
    const btnFilterFood = screen.getByTestId('filter-by-food-btn');
    const btnFilterDrink = screen.getByTestId('filter-by-drink-btn');

    expect(btnFilterAll).toBeInTheDocument();
    expect(btnFilterFood).toBeInTheDocument();
    expect(btnFilterDrink).toBeInTheDocument();

    
    expect(await screen.findByText(doneRecipes[0].name)).toBeInTheDocument();
    expect(await screen.findByText(doneRecipes[1].name)).toBeInTheDocument();
  });
})