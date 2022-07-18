import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './StyleSheet/RecipeCard.css';

function RecipeCard({ recipeId, recipeImage, recipeName, recipeType, index }) {
  return (
    <Link
      to={ recipeType === 'Foods' ? `/foods/${recipeId}` : `/drinks/${recipeId}` }
      data-testid={ `${index}-recipe-card` }
      className="recipe-card"
    >
      <div>
        <img
          data-testid={ `${index}-card-img` }
          src={ recipeImage }
          alt={ `${recipeName}` }
        />
        <h5 data-testid={ `${index}-card-name` }>{ recipeName }</h5>
      </div>
    </Link>
  );
}

RecipeCard.propTypes = {
  recipeId: PropTypes.string.isRequired,
  recipeName: PropTypes.string.isRequired,
  recipeImage: PropTypes.string.isRequired,
  recipeType: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
