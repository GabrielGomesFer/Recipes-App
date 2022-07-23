import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import fetchAPIs from '../services/FetchAPI';
import IngredientsRecipe from '../Components/IngredientsRecipe';
import ShareButton from '../Components/ShareButton';
import FavoriteButton from '../Components/FavoriteButton';
import RecipesContext from '../Context/recipesContext';
import './StyleSheet/RecipeDetails.css';

function RecipeDetails({ history: { location: { pathname }, push } }) {
  const [detailedRecipe, setDetailedRecipe] = useState({});
  const [recipeType, setRecipeType] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const { id } = useParams(); // hook usado para pegar parametros passados via url;

  const { isStarted, setIsStarted } = useContext(RecipesContext);

  useEffect(() => {
    const idFetch = async () => {
      const startedRecipe = pathname.includes('in-progress');
      setIsStarted(startedRecipe);

      if (pathname.includes('/foods')) {
        setRecipeType('food');
        const returnedRecipe = await fetchAPIs(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        setDetailedRecipe(returnedRecipe.meals[0]);
        setIsLoading(false);
      }
      if (pathname.includes('/drinks')) {
        setRecipeType('drink');
        const returnedRecipe = await fetchAPIs(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        setDetailedRecipe(returnedRecipe.drinks[0]);
        setIsLoading(false);
      }
    };
    idFetch();
  }, [pathname, id, setIsStarted]);

  const handleFinishRecipe = () => {
    if (!JSON.parse(localStorage.getItem('doneRecipes'))) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const currentDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

    const finishedRecipe = {
      id: recipeType === 'food' ? detailedRecipe.idMeal : detailedRecipe.idDrink,
      type: recipeType,
      nationality: recipeType === 'food' ? detailedRecipe.strArea : '',
      category: detailedRecipe.strCategory,
      alcoholicOrNot: recipeType === 'food' ? '' : detailedRecipe.strAlcoholic,
      name: recipeType === 'food' ? detailedRecipe.strMeal : detailedRecipe.strDrink,
      image: recipeType === 'food'
        ? detailedRecipe.strMealThumb : detailedRecipe.strDrinkThumb,
      doneDate: `${day}/${month}/${year}`,
      tags: recipeType === 'food' ? detailedRecipe.strTags.split(',') : [],
    };

    localStorage
      .setItem('doneRecipes', JSON.stringify([...currentDoneRecipes, finishedRecipe]));

    push('/done-recipes');
  };

  const { strInstructions } = detailedRecipe;
  return (
    <main>
      {
        !isLoading && (
          <div>
            <header
              className="header-recipe-details"
            >
              <img
                src={ recipeType === 'food'
                  ? detailedRecipe.strMealThumb : detailedRecipe.strDrinkThumb }
                alt="recipe ilustration"
                data-testid="recipe-photo"
                className="header-image"
              />
              <h2 data-testid="recipe-title">
                { recipeType === 'food'
                  ? detailedRecipe.strMeal : detailedRecipe.strDrink }
              </h2>
              <h5 data-testid="recipe-category">
                { recipeType === 'food'
                  ? detailedRecipe.strCategory : detailedRecipe.strAlcoholic }
              </h5>
              <div
                className="fav-share-bttn"
              >
                <ShareButton pathname={ pathname } />
                <FavoriteButton
                  recipeId={ id }
                  recipe={ detailedRecipe }
                  recipeType={ recipeType }
                  pathname={ pathname }
                />
              </div>
            </header>
            <IngredientsRecipe
              recipeType={ recipeType }
              recipe={ detailedRecipe }
              isStarted={ isStarted }
              recipeId={ id }
              setIsDisabled={ setIsDisabled }
            />
            <section className="instruction-paragraph">
              <p
                data-testid="instructions"
              >
                { strInstructions }
              </p>
            </section>
            <div className="recipe-buttons-start-finish">
              <button
                className="finish-btn"
                type="button"
                data-testid="finish-recipe-btn"
                disabled={ isDisabled }
                onClick={ handleFinishRecipe }
              >
                Finish Recipe
              </button>
            </div>
          </div>
        )
      }
    </main>
  );
}
RecipeDetails.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default RecipeDetails;
