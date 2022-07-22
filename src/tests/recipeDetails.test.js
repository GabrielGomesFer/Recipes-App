import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';
import userEvent from '@testing-library/user-event';
import oneMeal from './mocks/oneMeal';
import drinks from './mocks/drinks';
import meals from './mocks/meals';
import oneDrink from './mocks/oneDrink';

describe('Testa a página Recipe Details', () => {

  afterEach(() => jest.clearAllMocks());

  it('Verifica se a pagina de uma comida é renderizada corretamente', async () => {

    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(oneMeal),
    }));
      
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve(drinks),
    }));

    const { history } = renderWithRouter(<App />);
    history.push('/foods/52771');

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
    
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771');
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');

    const ingredient = screen.getByTestId('0-ingredient-name-and-measure')
    const photo = screen.getByTestId('recipe-photo');
    const text = screen.getByTestId('recipe-category');
    const title = screen.getByTestId('recipe-title');
    const instructions = screen.getByTestId('instructions');
    const video = screen.getByTestId('video');
    const ingredientList = screen.getAllByRole('listitem');
    const recommendations = screen.getAllByRole('link');
    const buttonStart = screen.getByTestId('start-recipe-btn');

    expect(ingredient).toHaveTextContent('penne rigate: 1 pound');
    expect(photo).toBeInTheDocument();
    expect(text).toHaveTextContent('Vegetarian');
    expect(title).toHaveTextContent('Spicy Arrabiata Penne');
    expect(video).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(ingredientList.length).toBe(8);
    expect(recommendations.length).toBe(6);
    expect(buttonStart).toBeInTheDocument();
  });

  it('Verifica se a pagina de uma bebida é renderizada corretamente', async () => {

    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(oneDrink),
    }));
      
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve(meals),
    }));

    localStorage.setItem('doneRecipes', JSON.stringify([{
      alcoholicOrNot: "Alcoholic",
      category: "Cocktail",
      doneDate: "22/07/2022",
      id: "178319",
      image: "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg",
      name: "Aquamarine",
      nationality: "",
      tags: [],
      type: "drink",
    }]));

    const { history } = renderWithRouter(<App />);
    history.push('/drinks/178319');

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319');
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');

    const ingredient = screen.getByTestId('0-ingredient-name-and-measure');
    const photo = screen.getByTestId('recipe-photo');
    const text = screen.getByTestId('recipe-category');
    const title = screen.getByTestId('recipe-title');
    const instructions = screen.getByTestId('instructions');
    const ingredientList = screen.getAllByRole('listitem');
    const recommendations = screen.getAllByRole('link');

    expect(ingredient).toHaveTextContent('Hpnotiq: 2 oz');
    expect(photo).toBeInTheDocument();
    expect(text).toHaveTextContent('Alcoholic');
    expect(title).toHaveTextContent('Aquamarine');
    expect(instructions).toBeInTheDocument();
    expect(ingredientList.length).toBe(3);
    expect(recommendations.length).toBe(6);
    
    expect(screen.queryByTestId('start-recipe-btn')).not.toBeInTheDocument();
  });
});