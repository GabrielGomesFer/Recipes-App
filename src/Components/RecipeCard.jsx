import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './StyleSheet/RecipeCard.css';

function RecipeCard({
  recipeId, recipeImage, recipeName, recipeType, index, linkTestId, nameTestId }) {
  return (
    <Link
      to={ recipeType === 'Foods' ? `/foods/${recipeId}` : `/drinks/${recipeId}` }
      data-testid={ linkTestId }
      className="recipe-card"
    >
      <div className="done-recipe-card">
        <img
          data-testid={ `${index}-card-img` }
          src={ recipeImage }
          alt={ `${recipeName}` }
        />
        <h5 data-testid={ nameTestId }>{ recipeName }</h5>
      </div>
    </Link>
  );
}

RecipeCard.propTypes = {
  recipeId: PropTypes.string,
  recipeName: PropTypes.string,
  recipeImage: PropTypes.string,
  recipeType: PropTypes.string,
  index: PropTypes.number,
  linkTestId: PropTypes.string,
  nameTestId: PropTypes.string,
};

RecipeCard.defaultProps = {
  recipeId: '',
  recipeName: '',
  recipeImage: '',
  recipeType: '',
  index: 0,
  linkTestId: '',
  nameTestId: '',
};

export default RecipeCard;
