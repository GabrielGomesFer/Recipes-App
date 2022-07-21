import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function ProfileRecipeFilter({ profileRecipes, setRecipes, storageKey }) {
  const resetAll = () => {
    const resetedRecipes = JSON.parse(localStorage.getItem(storageKey));
    setRecipes(resetedRecipes);
  };

  const filterFood = () => {
    const filteredFoodRecipes = profileRecipes.filter((food) => food.type === 'food');
    console.log(filteredFoodRecipes);
    setRecipes(filteredFoodRecipes);
  };

  const filterDrink = () => {
    const filteredDrinkRecipes = profileRecipes
      .filter((drink) => drink.type === 'drink');
    console.log(filteredDrinkRecipes);
    setRecipes(filteredDrinkRecipes);
  };

  useEffect(() => {
    console.log('profile filter', profileRecipes);
  }, [profileRecipes]);

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

ProfileRecipeFilter.propTypes = {
  profileRecipes: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  setRecipes: PropTypes.func.isRequired,
  storageKey: PropTypes.string.isRequired,
};

export default ProfileRecipeFilter;
