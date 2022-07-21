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
  const [isDisabled, setIsDisabled] = useState(true);
  const { id } = useParams(); // hook usado para pegar parametros passados via url;

  const { isStarted, setIsStarted } = useContext(RecipesContext);

  useEffect(() => {
    const idFetch = async () => {
      if (pathname.includes('in-progress')) {
        setIsStarted(true);
      }
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
      setIsInProgress(inProgressIds.some((inProgressId) => inProgressId === id));
    }
  }, [id, recipeType]);

  const handleClick = () => {
    setIsStarted(true);
    push(`/${recipeType}s/${id}/in-progress`);
  };

  const handleFinishRecipe = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const tags = Array.isArray(detailedRecipe.strTags)
      ? [...detailedRecipe.strTags] : [detailedRecipe.strTags];
    const currentDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

    const COMPARATION_DATE = 10;

    const formatedDay = day >= COMPARATION_DATE
      ? day : `0${day}`;
    const formatedMonth = month >= COMPARATION_DATE
      ? month : `0${month}`;

    const finishedRecipe = {
      id: recipeType === 'food' ? detailedRecipe.idMeal : detailedRecipe.idDrink,
      type: recipeType,
      nationality: recipeType === 'food' ? detailedRecipe.strArea : '',
      category: detailedRecipe.strCategory,
      alcoholicOrNot: recipeType === 'food' ? '' : detailedRecipe.strAlcoholic,
      name: recipeType === 'food' ? detailedRecipe.strMeal : detailedRecipe.strDrink,
      image: recipeType === 'food'
        ? detailedRecipe.strMealThumb : detailedRecipe.strDrinkThumb,
      doneDate: `${formatedDay}/${formatedMonth}/${year}`,
      tags: tags || [],
    };

    localStorage
      .setItem('doneRecipes', JSON.stringify([...currentDoneRecipes, finishedRecipe]));

    push('/done-recipes');
  };

  const MAX_LENGTH_RECOMENDATION = 6;
  const { strInstructions, strYoutube } = detailedRecipe;
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
                className="header-image"
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
            <section className="recomended-container">
              {
                !isStarted && recomendation.map((recipe, index) => {
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
                <div>
                  {
                    !isStarted ? (
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
                    ) : (
                      <button
                        type="button"
                        data-testid="finish-recipe-btn"
                        disabled={ isDisabled }
                        onClick={ handleFinishRecipe }
                      >
                        Finish Recipe

                      </button>
                    )
                  }
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
