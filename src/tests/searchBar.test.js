import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';
import userEvent from '@testing-library/user-event';
import mealsByIngredient from './mocks/mealsByIngredients';
import drinks from './mocks/drinks';
import mealCategories from './mocks/mealCategorys';
// import { mockComponent } from 'react-dom/test-utils';

describe('Testa a barra de busca na página de comidas', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mealsByIngredient),
    }));
  });
 
  afterEach(() => jest.clearAllMocks());
  
  it('Verifica a funcionalidade do filtro de ingredientes', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const openSearchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(openSearchBtn);

    const search = screen.getByTestId('search-input');
    const radio1 = screen.getByTestId('ingredient-search-radio');
    const searchButton = screen.getAllByRole('button', { name:/search/i });

    userEvent.click(radio1);
    userEvent.type(search, 'chicken');
    userEvent.click(searchButton[1]);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const ingredient = screen.getByTestId('0-card-name');
    expect(ingredient).toHaveTextContent('Brown Stew Chicken');
  });

  it('Verifica a funcionalidade do filtro de nome', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve({
        'meals': [
          {
            'strMeal': 'Brown Stew Chicken',
            'strMealThumb': 'https://www.themealdb.com/images/media/meals/sypxpx1515365095.jpg',
            'idMeal': '52940'
          }
        ]
      }),
    }));

    const openSearchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(openSearchBtn);

    const search = screen.getByTestId('search-input');
    const radio2 = screen.getByTestId('name-search-radio');
    const searchButton = screen.getByTestId('exec-search-btn');

    userEvent.click(radio2);
    userEvent.type(search, 'Brown Stew Chicken');
    userEvent.click(searchButton);
    
    // await waitFor(() => expect(history.location.pathname).toBe('/foods/52940'));
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());    

    // Problema de reconhecimento dos elementos corrigido, não faço idéia de como mockar a resposta dos drinks recomendados no meio de 3 fetchs diferentes

    expect(history.location.pathname).toBe('/foods/52940')

    // const name = await waitFor(() => screen.getByTestId('recipe-title'));
    // const name = screen.getByTestId('recipe-title');

    // expect(name.innerHTML).toBe('Brown Stew Chicken');
  });

//   it('Verifica a funcionalidade do filtro de primeira letra', async () => {
//     const { history } = renderWithRouter(<App />);
//     history.push('/foods');
//     const openSearchBtn = screen.getByTestId('search-top-btn');
//     userEvent.click(openSearchBtn);
//     // const alert = screen.getByRole(alertdialog, { description:'Your search must have only 1 (one) character' });
//     const search = screen.getByTestId('search-input');
//     const radio3 = screen.getByTestId('first-letter-search-radio');
//     userEvent.click(radio3);
//     userEvent.type('l');
//     userEvent.click(search);
//     await waitFor(() => expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=l'));
//     global.alert = jest.fn();
//     userEvent.type('li');
//     userEvent.click(search);
//     await waitFor(() => expect(global.alert).toHaveBeenCalledTimes(1));
//   });
// });
//   // Página de bebidas
// describe('Testa a barra de busca na página de bebidas', () => {
//   it('Verifica a funcionalidade do filtro de ingredientes', async () => {
//     const { history } = renderWithRouter(<App />);
//     history.push('/drinks');
//     const openSearchBtn = screen.getByTestId('search-top-btn');
//     userEvent.click(openSearchBtn);
//     const search = screen.getByTestId('search-input');
//     const radio1 = screen.getByTestId('ingredient-search-radio');
//     userEvent.click(radio1);
//     userEvent.type('tequila');
//     userEvent.click(search);
//     await waitFor(() => expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=tequila'));
//   });
//   it('Verifica a funcionalidade do filtro de nome', async () => {
//     const { history } = renderWithRouter(<App />);
//     history.push('/drinks')
//     const openSearchBtn = screen.getByTestId('search-top-btn');
//     userEvent.click(openSearchBtn);
//     const search = screen.getByTestId('search-input');
//     const radio2 = screen.getByTestId('name-search-radio');
//     userEvent.click(radio2);
//     userEvent.type('mojito');
//     userEvent.click(search);
//     await waitFor(() => expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=mojito'));
//   });
//   it('Verifica a funcionalidade do filtro de primeira letra', async () => {
//     const { history } = renderWithRouter(<App />);
//     history.push('/drinks');
//     const openSearchBtn = screen.getByTestId('search-top-btn');
//     userEvent.click(openSearchBtn);
//     // const alert = screen.getByRole(alertdialog, { description:'Your search must have only 1 (one) character' });
//     const search = screen.getByTestId('search-input');
//     const radio3 = screen.getByTestId('first-letter-search-radio');
//     userEvent.click(radio3);
//     userEvent.type('v');
//     userEvent.click(search);
//     await waitFor(() => expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=v'));
//     global.alert = jest.fn();
//     userEvent.type('vi');
//     userEvent.click(search);
//     await waitFor(() => expect(global.alert).toHaveBeenCalledTimes(1));
//   });
// })
});
