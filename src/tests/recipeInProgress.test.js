import React from "react";
import { screen, waitFor } from "@testing-library/react";
import renderWithRouter from "./helper/renderWithRouter";
import App from "../App";
import userEvent from "@testing-library/user-event";
import oneDrink from "./mocks/oneDrink";
import oneMeal from "./mocks/oneMeal";


describe("Testa a página Recipe Details", () => {
  afterEach(() => jest.clearAllMocks());

  it("Verifica se a pagina de uma comida em progresso é renderizada corretamente", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(oneMeal),
      })
    );

    const { history } = renderWithRouter(<App />);
    history.push("/foods/52771/in-progress");

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const ingredient = screen.getByTestId("0-ingredient-step");
    const photo = screen.getByTestId("recipe-photo");
    const text = screen.getByTestId("recipe-category");
    const title = screen.getByTestId("recipe-title");
    const instructions = screen.getByTestId("instructions");
    const ingredientList = screen.getAllByRole("checkbox");
    const buttonFinish = screen.getByTestId("finish-recipe-btn");

    expect(ingredient).toHaveTextContent("penne rigate: 1 pound");
    expect(photo).toBeInTheDocument();
    expect(text).toHaveTextContent("Vegetarian");
    expect(title).toHaveTextContent("Spicy Arrabiata Penne");
    expect(instructions).toBeInTheDocument();
    expect(ingredientList.length).toBe(8);
    expect(buttonFinish).toBeInTheDocument();
  });

  it("Verifica se a pagina de uma bebida em progresso é renderizada corretamente", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(oneDrink),
      })
    );

    const { history } = renderWithRouter(<App />);
    history.push("/drinks/178319/in-progress");

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const ingredient = screen.getByTestId("0-ingredient-step");
    const photo = screen.getByTestId("recipe-photo");
    const text = screen.getByTestId("recipe-category");
    const title = screen.getByTestId("recipe-title");
    const instructions = screen.getByTestId("instructions");
    const ingredientList = screen.getAllByRole("checkbox");
    const buttonFinish = screen.getByTestId("finish-recipe-btn");

    expect(ingredient).toHaveTextContent("Hpnotiq");
    expect(photo).toBeInTheDocument();
    expect(text).toHaveTextContent("Alcoholic");
    expect(title).toHaveTextContent("Aquamarine");
    expect(instructions).toBeInTheDocument();
    expect(ingredientList.length).toBe(3);
    expect(buttonFinish).toBeInTheDocument();
  });

  it("Verifica se a pagina de uma bebida em progresso é renderizada corretamente", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(oneDrink),
      })
    );

    const { history } = renderWithRouter(<App />);
    history.push("/drinks/178319/in-progress");

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    
    const ingredientList = screen.getAllByRole("checkbox");
    const buttonFinish = screen.getByTestId("finish-recipe-btn");

    expect(buttonFinish).toBeDisabled();
   
    ingredientList.forEach((ingredient) => {
      expect(ingredient).not.toHaveClass('selected');
      expect(ingredient).not.toBeChecked();
      userEvent.click(ingredient);
      expect(ingredient).toBeChecked();
      expect(ingredient).toHaveClass('selected');
      userEvent.click(ingredient);
      expect(ingredient).not.toHaveClass('selected');
      expect(ingredient).not.toBeChecked();
      userEvent.click(ingredient);
    });

    expect(buttonFinish).not.toBeDisabled();   

    // expect(ingredientList[0]).not.toHaveAttribute(
    //   "text-decoration",
    //   "line-through"
    // ); //Aron, olha aqui!

    userEvent.click(buttonFinish);

    await waitFor(() => expect(history.location.pathname).toBe("/done-recipes"));

    expect(JSON.parse(localStorage.getItem('doneRecipes')).length).toBe(1);
  });

  it("Verifica se a pagina de uma bebida em progresso é renderizada corretamente", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(oneMeal),
      })
    );

    const { history } = renderWithRouter(<App />);
    history.push("/foods/52771/in-progress");

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    
    const ingredientList = screen.getAllByRole("checkbox");
    const buttonFinish = screen.getByTestId("finish-recipe-btn");

    expect(buttonFinish).toBeDisabled();
   
    ingredientList.forEach((ingredient) => {
      expect(ingredient).not.toHaveClass('selected');
      expect(ingredient).not.toBeChecked();
      userEvent.click(ingredient);
      expect(ingredient).toBeChecked();
      expect(ingredient).toHaveClass('selected');
      userEvent.click(ingredient);
      expect(ingredient).not.toHaveClass('selected');
      expect(ingredient).not.toBeChecked();
      userEvent.click(ingredient);
    });

    expect(buttonFinish).not.toBeDisabled();

    userEvent.click(buttonFinish);

    await waitFor(() => expect(history.location.pathname).toBe("/done-recipes"));

    expect(JSON.parse(localStorage.getItem('doneRecipes')).length).toBe(2);
  });
});
