import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function IngredientsRecipe({ recipe, isStarted }) {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const ingredientsList = Object.entries(recipe)
      .filter((recipeInfo) => recipeInfo[0].includes('Ingredient') && recipeInfo[1]);

    const ingredientsMeasure = Object.entries(recipe)
      .filter((recipeInfo) => recipeInfo[0]
        .includes('Measure') && (recipeInfo[1] && recipeInfo[1] !== ' '))
      .map((ingredient) => ingredient[1]);

    ingredientsMeasure.forEach((ingredient, index) => {
      ingredientsList[index].splice(0, 1, ingredient);
    });
    setIngredients(ingredientsList);
  }, [setIngredients, recipe]);
  return (
    <section>
      <h1>Ingredients</h1>
      {
        isStarted ? ingredients.map((ingredient, index) => (
          <label key={ ingredient } htmlFor={ `${index}-checkbox-ingredient` }>
            <input
              type="checkbox"
              id={ `${index}-checkbox-ingredient` }
            />
            { `${ingredient[1]}: ${ingredient[0]}` }
          </label>
        )) : (
          <ul>
            {
              ingredients.map((ingredient, index) => (
                <li
                  data-testid={ `${index}-ingredient-name-and-measure` }
                  key={ ingredient }
                >
                  { `${ingredient[1]}: ${ingredient[0]}` }

                </li>
              ))
            }
          </ul>
        )
      }
    </section>
  );
}

IngredientsRecipe.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  isStarted: PropTypes.bool.isRequired,
};

export default IngredientsRecipe;
