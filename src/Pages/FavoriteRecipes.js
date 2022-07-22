import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../Context/recipesContext';
import Header from '../Components/Header';
import HorizontalRecipeCard from '../Components/HorizontalRecipeCard';
import ProfileRecipeFilter from '../Components/ProfileRecipeFilter';

function FavoriteRecipes({ history: { location: { pathname } } }) {
  const { favorites, setFavorites } = useContext(RecipesContext);

  useEffect(() => {
    const currentFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorites(currentFavorites);
  }, [setFavorites]);
  return (
    <div>
      <Header headerText="Favorite Recipes" isSearchPage={ false } />

      <ProfileRecipeFilter
        profileRecipes={ favorites }
        setRecipes={ setFavorites }
        storageKey="favoriteRecipes"
      />
      {
        favorites && favorites.map((recipe, index) => (
          <HorizontalRecipeCard
            key={ index }
            favorites={ favorites }
            index={ index }
            alcoholicOrNot={ recipe.alcoholicOrNot }
            category={ recipe.category }
            id={ recipe.id }
            image={ recipe.image }
            name={ recipe.name }
            nationality={ recipe.nationality }
            type={ recipe.type }
            pathname={ pathname }
          />
        ))
      }
    </div>
  );
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default FavoriteRecipes;
