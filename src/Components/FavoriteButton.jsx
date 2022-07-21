import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteButton({ recipe, recipeType, recipeId }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const saveRecipe = () => {
    const currentFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorite = {
      id: recipeType === 'food' ? recipe.idMeal : recipe.idDrink,
      type: recipeType,
      nationality: recipeType === 'food' ? recipe.strArea : '',
      category: recipe.strCategory,
      alcoholicOrNot: recipeType === 'food' ? '' : recipe.strAlcoholic,
      name: recipeType === 'food' ? recipe.strMeal : recipe.strDrink,
      image: recipeType === 'food' ? recipe.strMealThumb : recipe.strDrinkThumb,
    };

    localStorage.setItem('favoriteRecipes', JSON.stringify([
      ...currentFavorites,
      newFavorite,
    ]));
    setFavoriteRecipes([...currentFavorites, newFavorite]);
  };

  const deleteFavorite = () => {
    const currentFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const updatedFavorites = currentFavorites
      .filter((favorite) => favorite.id !== recipeId);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
    setFavoriteRecipes(updatedFavorites);
  };

  const favoriteClick = () => {
    if (!isFavorite) {
      saveRecipe();
    }
    if (isFavorite) {
      deleteFavorite();
    }
  };

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('favoriteRecipes'))) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const idFavoriteRecipes = JSON
      .parse(localStorage.getItem('favoriteRecipes')).map(({ id }) => id);

    setIsFavorite(idFavoriteRecipes.some((favoriteId) => favoriteId === recipeId));
  }, [recipeId, favoriteRecipes]);

  return (
    <div>
      <button
        type="button"
        onClick={ favoriteClick }
      >
        <img
          src={ isFavorite
            ? blackHeartIcon : whiteHeartIcon }
          alt="Heart Icon"
          data-testid="favorite-btn"
        />
      </button>
    </div>
  );
}

FavoriteButton.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  recipeType: PropTypes.string.isRequired,
  recipeId: PropTypes.string.isRequired,
};

export default FavoriteButton;
