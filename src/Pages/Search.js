import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import RecipeCard from '../Components/RecipeCards';
import RecipesContext from '../Context/recipesContext';
import Footer from '../Components/Footer';
import fetchAPIs from '../services/FetchAPI';

function Search({ history: { location: { pathname } } }) {
  const [recipeType, setRecipeType] = useState('');

  const { recipes, setRecipes } = useContext(RecipesContext);

  useEffect(() => {
    const setInitalRecipes = async () => {
      if (pathname === '/foods') {
        setRecipeType('Foods');
        const data = await fetchAPIs('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const responseRecipes = [...Object.values(data)[0]];
        setRecipes(responseRecipes);
      }
      if (pathname === '/drinks') {
        setRecipeType('Drinks');
        const data = await fetchAPIs('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const responseRecipes = [...Object.values(data)[0]];
        setRecipes(responseRecipes);
      }
    };
    setInitalRecipes();
  }, [pathname, setRecipes]);

  const MAX_LENGTH_CARDS = 12;

  return (
    <main>
      <Header headerText={ recipeType } isSearchPage />
      <section>
        {
          recipes.length > 0 && recipes.map((recipe, index) => {
            if (index < MAX_LENGTH_CARDS) {
              return (
                <RecipeCard
                  key={ recipeType === 'Foods' ? recipe.idMeal : recipe.idDrink }
                  index={ index }
                  recipeId={ recipeType === 'Foods' ? recipe.idMeal : recipe.idDrink }
                  recipeImage={ recipeType === 'Foods'
                    ? recipe.strMealThumb : recipe.strDrinkThumb }
                  recipeName={ recipeType === 'Foods' ? recipe.strMeal : recipe.strDrink }
                  recipeType={ recipeType }
                />
              );
            }
            return null;
          })
        }
      </section>
      <Footer />
    </main>
  );
}

Search.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Search;
