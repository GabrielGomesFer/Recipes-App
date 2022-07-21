import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Testa a barra de busca na página de comidas', () => {
   
  beforeEach(() => { jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(response),
    })); })

  afterEach(() => {jest.clearAllMocks();})

  it('Verifica a funcionalidade do filtro de ingredientes', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/food');
    
    const search = screen.getByTestId('search-input');
    const radio1 = screen.getByTestId('ingredient-search-radio');
    userEvent.click(radio1);
    userEvent.type('rice');
    userEvent.click(search);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=rice'));
  });

  it('Verifica a funcionalidade do filtro de nome', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/food');
    
    const search = screen.getByTestId('search-input');
    const radio2 = screen.getByTestId('name-search-radio');
    userEvent.click(radio2);
    userEvent.type('popcorn');
    userEvent.click(search);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s={nome}'));
  });

  it('Verifica a funcionalidade do filtro de primeira letra', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/food');
    
    // const alert = screen.getByRole(alertdialog, { description:'Your search must have only 1 (one) character' });
    const search = screen.getByTestId('search-input');
    const radio3 = screen.getByTestId('first-letter-search-radio');
    userEvent.click(radio3);
    userEvent.type('l');
    userEvent.click(search);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=l'));
    
    global.alert = jest.fn();
    userEvent.type('li');
    userEvent.click(search);
    await waitFor(() => expect(global.alert).toHaveBeenCalledTimes(1));
  });
});


  // Página de bebidas
describe('Testa a barra de busca na página de bebidas', () => {
  it('Verifica a funcionalidade do filtro de ingredientes', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    
    const search = screen.getByTestId('search-input');
    const radio1 = screen.getByTestId('ingredient-search-radio');
    userEvent.click(radio1);
    userEvent.type('tequila');
    userEvent.click(search);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=tequila'));
  });

  it('Verifica a funcionalidade do filtro de nome', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks')
    
    const search = screen.getByTestId('search-input');
    const radio2 = screen.getByTestId('name-search-radio');
    userEvent.click(radio2);
    userEvent.type('mojito');
    userEvent.click(search);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=mojito'));
  });

  it('Verifica a funcionalidade do filtro de primeira letra', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    
    // const alert = screen.getByRole(alertdialog, { description:'Your search must have only 1 (one) character' });
    const search = screen.getByTestId('search-input');
    const radio3 = screen.getByTestId('first-letter-search-radio');
    userEvent.click(radio3);
    userEvent.type('v');
    userEvent.click(search);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=v'));
    
    global.alert = jest.fn();
    userEvent.type('vi');
    userEvent.click(search);
    await waitFor(() => expect(global.alert).toHaveBeenCalledTimes(1));
  });
})