import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import ImageRecipe from '../Components/recipeComponents/ImageRecipe';
import fetchAPIs from '../services/FetchAPI';
import FavShareButton from '../Components/Fav-Share-Buttons';

function RecipeDetails({ history: { location: { pathname } } }) {
  const params = useParams(); // params.id da o id correto
  const [detailedRecipe, setDetailedRecipe] = useState([]);
  // const [ingredient, setIngredients] = useState([]);

  useEffect(() => {
    const idFetch = async () => {
      if (pathname.includes('/foods')) {
        const returnedRecipe = await fetchAPIs(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`);
        console.log(returnedRecipe.meals.strArea);
        setDetailedRecipe(returnedRecipe.meals);
      }
      if (pathname.includes('/drinks')) {
        const returnedRecipe = await fetchAPIs(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`);
        setDetailedRecipe(returnedRecipe);
      }
    };
    idFetch();
  }, [pathname, params]);

  // useEffect(() => {
  //   const filteredIngredients = Object.entries(detailedRecipe)
  //     .filter(([key, value]) => key.includes(ingredient)
  //   && value !== null).map((item) => item[1]);
  //   console.log(filteredIngredients);
  // }, [detailedRecipe]);

  return (
    <div>
      <h1>
        Recipe Details page:
        {params.id}
      </h1>
      <ImageRecipe detailedRecipe={ detailedRecipe } />
      {
        detailedRecipe.map((food, i) => (
          <div key={ i }>
            {/* <img
              key={ `photo${i}` }
              src={ food.strMealThumb }
              alt={ food.strMeal }
              data-testid="recipe-photo"
            /> */}
            <h1 key={ `title${i}` }>
              { food.strMeal }
            </h1>
            <span key={ `categor${i}` } data-testid="recipe-category">
              { food.strCategory }
            </span>
            <FavShareButton />
          </div>
        ))
      }
    </div>
    // const ingredients = Object.entries(detailedRecipe).filter(([key, value]) => key.includes(ingredient) && value !== null).map((item) => item[1])
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
