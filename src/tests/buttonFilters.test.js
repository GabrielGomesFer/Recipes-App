import React from "react";
import renderWithRouter from "./helper/renderWithRouter";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import meals from "./mocks/meals";
import mealCategorys from "./mocks/mealCategorys";
import drinks from "./mocks/drinks";
import drinkCategories from './mocks/drinkCategories';
import beefMeals from "./mocks/buttonFilter/beefMeals";
import cocktail from "./mocks/buttonFilter/cocktailDrinks";

describe("testa funcionalidades dos botões de filtro", () => {
  afterEach(() => jest.clearAllMocks());
  it("testa botoes do /Foods", async () => {
    jest.spyOn(global, "fetch").mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(meals),
      })
    );

    jest.spyOn(global, "fetch").mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mealCategorys),
      })
    );

    const { history } = renderWithRouter(<App />);
    history.push("/foods");

    await waitFor(() => expect(global.fetch).toBeCalledTimes(2));    

    jest.spyOn(global, "fetch").mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(beefMeals),
      })
    );
    // Beef
    const buttonBeef = screen.getByText("Beef");

    userEvent.click(buttonBeef);

    await waitFor(() =>
      expect(global.fetch).toBeCalledWith(
        "https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef"
      )
    );

    expect(screen.getByText('Beef and Mustard Pie')).toBeInTheDocument();

    userEvent.click(buttonBeef);

    await waitFor(() => expect(global.fetch).toBeCalled());
  });

  it("testa se o botao de filtro funciona também no /drinks", async () => {
    jest.spyOn(global, "fetch").mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(drinks),
      })
    );

    jest.spyOn(global, "fetch").mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(drinkCategories),
      })
    );

    const { history } = renderWithRouter(<App />);
    history.push("/drinks");

    await waitFor(() => expect(global.fetch).toBeCalledTimes(2));
    
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(drinks),
      })
    );

    jest.spyOn(global, "fetch").mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(cocktail),
      })
    );
    const buttonCocktail = screen.getByText("Cocktail");

    userEvent.click(buttonCocktail);

    await waitFor(() =>
      expect(global.fetch).toBeCalledWith(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail"
      )
    );
    
    expect(screen.getByText('\'57 Chevy with a White License Plate')).toBeInTheDocument();
    
    userEvent.click(buttonCocktail);

    await waitFor(() => expect(global.fetch).toBeCalled());
  });
});
