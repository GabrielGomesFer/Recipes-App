import React from 'react';
import renderWithRouter from './helper/renderWithRouter';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import meals from './mocks/meals';
import beefMeals from './mocks/beefMeals';
import breakFast from './mocks/breakfastMeals';
import chickenMeals from './mocks/chickenMeals';
import dessertMeals from './mocks/dessertMeals';
import goatMeals from './mocks/goatMeals';
import drinks from './mocks/drinks';
import cocoaDrinks from './mocks/cocoaDrinks';
import ordinary from './mocks/ordinaryDrinks';
import otherDrinks from './mocks/otherDrinks';
import shakes from './mocks/milkDrinks';
import cocktail from './mocks/cocktailDrinks';
import App from '../App';

describe('testa funcionalidades dos botões de filtro', () => {
    it('testa botoes do /Foods', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve(meals),
        }));

        const { history } = renderWithRouter(<App />);
        history.push('/foods');

        await waitFor(() => expect(global.fetch).toBeCalledTimes(2)); //GOAT
        
        jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
          json: () => Promise.resolve(goatMeals),
        }));

        await waitFor(() => expect(global.fetch).toBeCalledTimes(2)); // dessert
        
        jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
          json: () => Promise.resolve(dessertMeals),
        }));

        await waitFor(() => expect(global.fetch).toBeCalledTimes(2)); // CHICKEN
        
        jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
          json: () => Promise.resolve(chickenMeals),
        }));

        await waitFor(() => expect(global.fetch).toBeCalledTimes(2)); // BREAKFAST
        
        jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
          json: () => Promise.resolve(breakFast),
        }));
        await waitFor(() => expect(global.fetch).toBeCalledTimes(2)); // BEEF
        
        jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
          json: () => Promise.resolve(beefMeals),
        }));
        
        const allBtn = screen.getByTestId('All-category-filter');
        const beefBTN = screen.getByTestId('Beef-category-filter');
        const breakfastBTN = screen.getByTestId('Breakfast-category-filter');
        const dessertBTN = screen.getByTestId('Dessert-category-filter');
        const chickenBTN = screen.getByTestId('Chicken-category-filter');
        const goatBTN = screen.getByTestId('Goat-category-filter');

        const imageCards = screen.getAllByRole('a');

        userEvent.click(beefBTN);
        waitFor(() => expect(imageCards).toHaveLength(12));
        userEvent.click(beefBTN);
        waitFor(() => expect(imageCards).toHaveLength(12));
        userEvent.click(breakfastBTN);
        waitFor(() => expect(imageCards).toHaveLength(7));
        userEvent.click(chickenBTN);
        waitFor(() => expect(imageCards).toHaveLength(12));
        userEvent.click(dessertBTN);
        waitFor(() => expect(imageCards).toHaveLength(12));
        userEvent.click(goatBTN);
        waitFor(() => expect(imageCards).toHaveLength(1));
        userEvent.click(allBtn);
        waitFor(() => expect(imageCards).toHaveLength(12));

    })


    it('testa botao breakfast e all do /drinks', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve(drinks),
        }));

        const { history } = renderWithRouter(<App />);
        history.push('/drinks');
        
        await waitFor(() => expect(global.fetch).toBeCalledTimes(2)); //GOAT
        
        jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
          json: () => Promise.resolve(ordinary),
        }));

        await waitFor(() => expect(global.fetch).toBeCalledTimes(2)); // dessert
        
        jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
          json: () => Promise.resolve(shakes),
        }));

        await waitFor(() => expect(global.fetch).toBeCalledTimes(2)); // CHICKEN
        
        jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
          json: () => Promise.resolve(cocktail),
        }));

        await waitFor(() => expect(global.fetch).toBeCalledTimes(2)); // BREAKFAST
        
        jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
          json: () => Promise.resolve(otherDrinks),
        }));
        await waitFor(() => expect(global.fetch).toBeCalledTimes(2)); // BEEF
        
        jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
          json: () => Promise.resolve(cocoaDrinks),
        }));
        
        const allBtn = screen.getByTestId('All-category-filter');
        const cocoaBTN = screen.getByTestId('Cocoa-category-filter');
        const otherBTN = screen.getByTestId('Other/Unknown-category-filter');
        const shakeBTN = screen.getByTestId('Shake-category-filter');
        const cocktailBTN = screen.getByTestId('Cocktail-category-filter');
        const ordinaryBTN = screen.getByTestId('Ordinary Drink-category-filter');

        const imageCards = screen.getAllByRole('a');

        userEvent.click(cocoaBTN);
        waitFor(() => expect(imageCards).toHaveLength(9));
        userEvent.click(otherBTN);
        waitFor(() => expect(imageCards).toHaveLength(12));
        userEvent.click(cocktailBTN);
        waitFor(() => expect(imageCards).toHaveLength(12));
        userEvent.click(shakeBTN);
        waitFor(() => expect(imageCards).toHaveLength(12));
        userEvent.click(ordinaryBTN);
        waitFor(() => expect(imageCards).toHaveLength(12));
        userEvent.click(allBtn);
        waitFor(() => expect(imageCards).toHaveLength(12));
})
})