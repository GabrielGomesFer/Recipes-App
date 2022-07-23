import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';
import userEvent from '@testing-library/user-event';
import oneMeal from './mocks/oneMeal';
import drinks from './mocks/drinks';
import meals from './mocks/meals';
import oneDrink from './mocks/oneDrink';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import copy from 'clipboard-copy';

describe('Testa a página Recipe Details', () => {

  afterEach(() => jest.clearAllMocks());

  it('Verifica se a pagina de uma comida em progresso é renderizada corretamente', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(oneMeal),
    }));
      
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve(drinks),
    }));

    localStorage.setItem('inProgressRecipes', JSON.stringify({meals: {53013:["3", "11", "12"]}}));

    const { history } = renderWithRouter(<App />);
    history.push('/foods/53013/in-progress');

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
    
    const ingredient = screen.getByTestId('0-ingredient-step')
    const photo = screen.getByTestId('recipe-photo');
    const text = screen.getByTestId('recipe-category');
    const title = screen.getByTestId('recipe-title');
    const instructions = screen.getByTestId('instructions');
    const ingredientList = screen.getAllByRole('checkbox');
    const buttonFinish = screen.getByTestId('finish-recipe-btn');

    expect(ingredient).toHaveTextContent('Minced Beef: 400g');
    expect(photo).toBeInTheDocument();
    expect(text).toHaveTextContent('Beef');
    expect(title).toHaveTextContent('Big Mac');
    expect(instructions).toBeInTheDocument();
    expect(ingredientList.length).toBe(14);
    expect(buttonFinish).toBeInTheDocument();
  });

    it('Verifica se a pagina de uma bebida em progresso é renderizada corretamente', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve(oneMeal),
        }));
          
        jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(drinks),
        }));
    
        localStorage.setItem('inProgressRecipes', JSON.stringify({cocktails: {17225:["1", "2"]}}));
    
        const { history } = renderWithRouter(<App />);
        history.push('/drinks/17225/in-progress');
    
        await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
        
        const ingredient = screen.getByTestId('0-ingredient-step');
        const photo = screen.getByTestId('recipe-photo');
        const text = screen.getByTestId('recipe-category');
        const title = screen.getByTestId('recipe-title');
        const instructions = screen.getByTestId('instructions');
        const ingredientList = screen.getAllByRole('checkbox');
        const buttonFinish = screen.getByTestId('finish-recipe-btn');
    
        expect(ingredient).toHaveTextContent('Gin: 2 shots');
        expect(photo).toBeInTheDocument();
        expect(text).toHaveTextContent('Alcoholic');
        expect(title).toHaveTextContent('Ace');
        expect(instructions).toBeInTheDocument();
        expect(ingredientList.length).toBe(5);
        expect(ingredientList[1]).toHaveAttribute('checked', true);
        expect(ingredientList[2]).toHaveAttribute('checked', true);
        expect(ingredientList[3]).toHaveAttribute('checked', false);
        expect(buttonFinish).toBeInTheDocument();
        expect(buttonFinish).toHaveAttribute('disabled', true);

        expect(ingredientList[0]).not.toHaveAttribute('text-decoration', 'line-through'); //Aron, olha aqui!
        userEvent.click(ingredientList[0]);
        expect(ingredientList[0]).toHaveAttribute('text-decoration', 'line-through');
        userEvent.click(ingredientList[3]);
        userEvent.click(ingredientList[4]);
        expect(buttonFinish).toHaveAttribute('disabled', false);
        
        userEvent.click(buttonFinish);
        expect(history.location.pathname).toBe('/done-recipes')
  });
});