import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import fetchAPIs from '../services/FetchAPI';
import IngredientsRecipe from '../Components/IngredientsRecipe';
import RecipeCard from '../Components/RecipeCard';
import ShareButton from '../Components/ShareButton';
import FavoriteButton from '../Components/FavoriteButton';
import RecipesContext from '../Context/recipesContext';
import './StyleSheet/RecipeDetails.css';

function RecipeDetails({ history: { location: { pathname }, push } }) {
  const [detailedRecipe, setDetailedRecipe] = useState({});
  const [recipeType, setRecipeType] = useState('');
  const [isFinishedRecipe, setIsFinishedRecipe] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [recomendation, setRecomendation] = useState([]);
  const [isInProgress, setIsInProgress] = useState(false);
  const { id } = useParams(); // hook usado para pegar parametros passados via url;

  const { isStarted, setIsStarted } = useContext(RecipesContext);

  useEffect(() => {
    const idFetch = async () => {
      if (pathname.includes('/foods')) {
        setRecipeType('food');
        const recomendedRecipes = await fetchAPIs('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const returnedRecipe = await fetchAPIs(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        setRecomendation([...recomendedRecipes.drinks]);
        setDetailedRecipe(returnedRecipe.meals[0]);
        setIsLoading(false);
      }
      if (pathname.includes('/drinks')) {
        setRecipeType('drink');
        const recomendedRecipes = await fetchAPIs('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const returnedRecipe = await fetchAPIs(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        setRecomendation([...recomendedRecipes.meals]);
        setDetailedRecipe(returnedRecipe.drinks[0]);
        setIsLoading(false);
      }
    };
    idFetch();
  }, [pathname, id, setIsStarted]);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('doneRecipes'))) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {},
        meals: {},
      }));
    }

    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (doneRecipes.some(({ id: doneId }) => id === doneId)) {
      setIsFinishedRecipe(true);
    }
    if (recipeType === 'food' && inProgressRecipes.meals) {
      const inProgressIds = Object.keys(inProgressRecipes.meals);
      setIsInProgress(inProgressIds.some((inProgressId) => inProgressId === id));
    }
    if (recipeType === 'drink' && inProgressRecipes.cocktails) {
      const inProgressIds = Object.keys(inProgressRecipes.cocktails);
      const inProgress = inProgressIds.some((inProgressId) => inProgressId === id);
      setIsInProgress(inProgress);
    }
  }, [id, recipeType]);

  const handleClick = () => {
    setIsStarted(true);
    push(`/${recipeType}s/${id}/in-progress`);
  };

  const MAX_LENGTH_RECOMENDATION = 6;
  const { strInstructions, strYoutube } = detailedRecipe;
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
              recipeId={ id }
              isStarted={ isStarted }
            />
            <section className="instruction-paragraph">
              <p
                data-testid="instructions"
              >
                { strInstructions }
              </p>
            </section>
            <section className="recipe-video">
              {
                (recipeType === 'food') && (
                  <iframe
                    title="Video Recipe"
                    src={ strYoutube.replace('watch?v=', 'embed/') }
                    data-testid="video"
                  />
                )
              }
            </section>
            <section className="recomended-container">
              {
                recomendation.map((recipe, index) => {
                  if (index < MAX_LENGTH_RECOMENDATION) {
                    return (
                      <RecipeCard
                        key={ recipeType === 'food' ? recipe.idDrink : recipe.idMeal }
                        linkTestId={ `${index}-recomendation-card` }
                        nameTestId={ `${index}-recomendation-title` }
                        index={ index }
                        recipeId={ recipeType === 'food'
                          ? recipe.idDrink : recipe.idMeal }
                        recipeImage={ recipeType === 'food'
                          ? recipe.strDrinkThumb : recipe.strMealThumb }
                        recipeName={ recipeType === 'food'
                          ? recipe.strDrink : recipe.strMeal }
                        recipeType={ recipeType }
                      />
                    );
                  }
                  return null;
                })
              }
            </section>
            {
              !isFinishedRecipe && (
                <div className="recipe-buttons-start-finis">
                  <button
                    type="button"
                    data-testid="start-recipe-btn"
                    onClick={ handleClick }
                    className="start-recipe-btn"
                  >
                    {
                      isInProgress ? 'Continue Recipe' : 'Start Recipe'
                    }
                  </button>
                </div>
              )
            }
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
