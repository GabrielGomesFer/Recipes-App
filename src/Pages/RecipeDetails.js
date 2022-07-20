import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import fetchAPIs from '../services/FetchAPI';
import IngredientsRecipe from '../Components/IngredientsRecipe';
import RecipeCard from '../Components/RecipeCard';
import ShareButton from '../Components/ShareButton';
import FavoriteButton from '../Components/FavoriteButton';

function RecipeDetails({ history: { location: { pathname } } }) {
  const [detailedRecipe, setDetailedRecipe] = useState({});
  const [recipeType, setRecipeType] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [recomendation, setRecomendation] = useState([]);
  const { id } = useParams(); // hook usado para pegar parametros passados via url;

  useEffect(() => {
    const idFetch = async () => {
      if (pathname.includes('/foods')) {
        setRecipeType('food');
        const returnedRecipe = await fetchAPIs(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const recomendedRecipes = await fetchAPIs('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        setRecomendation([...recomendedRecipes.drinks]);
        setDetailedRecipe(returnedRecipe.meals[0]);
        setIsLoading(false);
      }
      if (pathname.includes('/drinks')) {
        setRecipeType('drink');
        const returnedRecipe = await fetchAPIs(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const recomendedRecipes = await fetchAPIs('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        setRecomendation([...recomendedRecipes.meals]);
        setDetailedRecipe(returnedRecipe.drinks[0]);
        setIsLoading(false);
      }
    };
    idFetch();
  }, [pathname, id]);

  const handleClick = () => {
    setIsStarted(true);
  };

  const { strInstructions, strYoutube } = detailedRecipe;

  const MAX_LENGTH_RECOMENDATION = 6;

  return (
    <main>
      {
        !isLoading && (
          <div>
            <header>
              <img
                src={ recipeType === 'food'
                  ? detailedRecipe.strMealThumb : detailedRecipe.strDrinkThumb }
                alt="recipe ilustration"
                data-testid="recipe-photo"
              />
              <h3 data-testid="recipe-title">
                { recipeType === 'food'
                  ? detailedRecipe.strMeal : detailedRecipe.strDrink }
              </h3>
              <h5 data-testid="recipe-category">
                { recipeType === 'food'
                  ? detailedRecipe.strCategory : detailedRecipe.strAlcoholic }
              </h5>
              <div>
                <ShareButton pathname={ pathname } />
                <FavoriteButton />
              </div>
            </header>
            <IngredientsRecipe recipe={ detailedRecipe } isStarted={ false } />
            <section>
              <p data-testid="instructions">{ strInstructions }</p>
            </section>
            <section>
              {
                (!isStarted && recipeType === 'food') && (
                  <iframe
                    title="Video Recipe"
                    src={ strYoutube.replace('watch?v=', 'embed/') }
                    data-testid="video"
                  />
                )
              }
            </section>
            <section>
              {
                !isStarted && recomendation.map((recipe, index) => {
                  if (index < MAX_LENGTH_RECOMENDATION) {
                    return (
                      <RecipeCard
                        key={ recipeType === 'food' ? recipe.idDrink : recipe.idMeal }
                        linkTestId={ `${index}-recomendation-card` }
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
            <button
              type="button"
              data-testid="start-recipe-btn"
              onClick={ handleClick }
            >
              Start Recipe

            </button>
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
  }).isRequired,
};

export default RecipeDetails;
