import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';
import doneRecipes from './mocks/localStorage/doneRecipes';
import userEvent from '@testing-library/user-event';

describe('Testes da página de receitas feitas', () => {
  it('Testa se os elementos são renderizados na página', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

    const { history } = renderWithRouter(<App />);
    history.push('/done-recipes');

    expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-food-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();

    
    expect(await screen.findByText(doneRecipes[0].name)).toBeInTheDocument();
    expect(await screen.findByText(doneRecipes[1].name)).toBeInTheDocument();
  });

  it('Verifica o funcionamento dos botões de filtro do profile', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

    const { history } = renderWithRouter(<App />);
    history.push('/done-recipes');

    const btnFilterAll = screen.getByTestId('filter-by-all-btn');
    const btnFilterFood = screen.getByTestId('filter-by-food-btn');
    const btnFilterDrink = screen.getByTestId('filter-by-drink-btn');

    userEvent.click(btnFilterFood);

    expect(await screen.findByText(doneRecipes[0].name)).toBeInTheDocument();
    expect(screen.queryByText(doneRecipes[1].name)).not.toBeInTheDocument();

    userEvent.click(btnFilterAll);
    userEvent.click(btnFilterDrink);

    expect(await screen.findByText(doneRecipes[1].name)).toBeInTheDocument();
    expect(screen.queryByText(doneRecipes[0].name)).not.toBeInTheDocument();

    userEvent.click(btnFilterAll);

    expect(await screen.findByText(doneRecipes[1].name)).toBeInTheDocument();
    expect(await screen.findByText(doneRecipes[0].name)).toBeInTheDocument();
  });
})