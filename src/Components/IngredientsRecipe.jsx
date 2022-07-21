import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function IngredientsRecipe({ recipe, isStarted, recipeType, recipeId }) {
  const [ingredients, setIngredients] = useState([]);
  const [progressType, setProgressType] = useState('');
  const [progressRecipe, setProgressRecipe] = useState([]);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {},
        meals: {},
      }));
    }

    if (recipeType === 'food') {
      setProgressType('meals');
      const recipesInProgress = Object
        .entries(JSON.parse(localStorage.getItem('inProgressRecipes')).meals);
      const progress = recipesInProgress
        .filter((recipeInProgress) => recipeInProgress[0] === recipeId)
        .map((recipeIngredients) => recipeIngredients[1]);
      setProgressRecipe(progress ? [...progress] : []);
    } else {
      setProgressType('cocktails');
      const recipesInProgress = Object
        .entries(JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails);
      const progress = recipesInProgress
        .filter((recipeInProgress) => recipeInProgress[0] === recipeId)
        .map((recipeIngredients) => recipeIngredients[1]);
      console.log(progress);
      setProgressRecipe(progress ? [...progress] : []);
    }

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
  }, [setIngredients, recipe, recipeType, recipeId]);

  const saveProgress = (name, operation) => {
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...recipesInProgress,
      [progressType]: {
        ...recipesInProgress[progressType],
        [recipeId]: operation === 'save'
          ? [...recipesInProgress[progressType][recipeId], name]
          : [...recipesInProgress[progressType][recipeId]
            .filter((ingredient) => ingredient !== name)],
      },
    }));
    const updatedRecipesInProgress = Object
      .entries(JSON.parse(localStorage.getItem('inProgressRecipes'))[progressType]);
    const progress = updatedRecipesInProgress
      .filter((recipeInProgress) => recipeInProgress[0] === recipeId)
      .map((recipeIngredients) => recipeIngredients[1]);
    setProgressRecipe([...progress[0]]);
  };

  const handleChange = ({ target: { name, checked } }) => {
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!recipesInProgress[progressType][recipeId]) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...recipesInProgress,
        [progressType]: {
          ...recipesInProgress[progressType],
          [recipeId]: [],
        },
      }));
    }
    if (checked) {
      saveProgress(name, 'save');
    } else {
      saveProgress(name, 'delete');
      console.log('delete');
    }
  };

  return (
    <section>
      <h1>Ingredients</h1>
      {
        isStarted ? ingredients.map((ingredient, index) => (
          <label
            key={ ingredient }
            htmlFor={ `${index}-ingredient` }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              type="checkbox"
              id={ `${index}-ingredient` }
              onChange={ handleChange }
              name={ index }
              checked={ progressRecipe
                .some((ingredientNumber) => ingredientNumber === index.toString()) }
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
  recipeId: PropTypes.string.isRequired,
  recipeType: PropTypes.string.isRequired,
};

export default IngredientsRecipe;
