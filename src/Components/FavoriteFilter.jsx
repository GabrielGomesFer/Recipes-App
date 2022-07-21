import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function FavoriteFilter({ favorites, setFavorites }) {
  const resetAll = () => {
    const resetedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorites(resetedFavorites);
  };

  const filterFood = () => {
    const filteredFoodFavorites = favorites.filter((food) => food.type === 'food');
    console.log(filteredFoodFavorites);
    setFavorites(filteredFoodFavorites);
  };

  const filterDrink = () => {
    const filteredDrinkFavorites = favorites.filter((drink) => drink.type === 'drink');
    console.log(filteredDrinkFavorites);
    setFavorites(filteredDrinkFavorites);
  };

  useEffect(() => {
    console.log('favorite filter', favorites);
  }, []);

  return (
    <div>
      <button type="button" data-testid="filter-by-all-btn" onClick={ resetAll }>
        All
      </button>
      <button type="button" data-testid="filter-by-food-btn" onClick={ filterFood }>
        Foods
      </button>
      <button type="button" data-testid="filter-by-drink-btn" onClick={ filterDrink }>
        Drinks
      </button>
    </div>
  );
}

FavoriteFilter.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  setFavorites: PropTypes.func.isRequired,
};

export default FavoriteFilter;
