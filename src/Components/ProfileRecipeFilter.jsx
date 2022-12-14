import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './StyleSheet/ProfileRecipeFilter.css';

function ProfileRecipeFilter({ profileRecipes, setRecipes, storageKey }) {
  const resetAll = () => {
    const resetedRecipes = JSON.parse(localStorage.getItem(storageKey));
    setRecipes(resetedRecipes);
  };

  const filterFood = () => {
    const filteredFoodRecipes = profileRecipes.filter((food) => food.type === 'food');
    setRecipes(filteredFoodRecipes);
  };

  const filterDrink = () => {
    const filteredDrinkRecipes = profileRecipes
      .filter((drink) => drink.type === 'drink');
    setRecipes(filteredDrinkRecipes);
  };

  useEffect(() => {
  }, [profileRecipes]);

  return (
    <div className="all-food-drinks-bttn">
      <button
        className="all-bttn"
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ resetAll }
      >
        All
      </button>
      <button
        className="foods-bttn"
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ filterFood }
      >
        Foods
      </button>
      <button
        className="drinks-bttn"
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ filterDrink }
      >
        Drinks
      </button>
    </div>
  );
}

ProfileRecipeFilter.propTypes = {
  profileRecipes: PropTypes.arrayOf(PropTypes.object.isRequired),
  setRecipes: PropTypes.func.isRequired,
  storageKey: PropTypes.string.isRequired,
};

ProfileRecipeFilter.defaultProps = {
  profileRecipes: [],
};

export default ProfileRecipeFilter;
