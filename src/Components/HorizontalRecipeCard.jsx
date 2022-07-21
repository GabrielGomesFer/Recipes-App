import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
import './StyleSheet/horizontalRecipeCards.css';

function HorizontalRecipeCard({
  id,
  index,
  type,
  image,
  category,
  name,
  doneDate,
  alcoholicOrNot,
  tags,
  nationality,
  // favorites,
  pathname,
}) {
  return (
    <div className="card-container">
      <div className="image-container">
        <Link to={ `/${type}s/${id}` }>
          <img
            src={ image }
            alt={ index }
            data-testid={ `${index}-horizontal-image` }
          />
        </Link>
      </div>
      <div className="item-container">
        {
          type === 'food' ? (
            <span data-testid={ `${index}-horizontal-top-text` }>
              {`${nationality} - ${category}`}
            </span>
          ) : (
            <span data-testid={ `${index}-horizontal-top-text` }>
              {alcoholicOrNot}
            </span>
          )
        }
        <Link to={ `/${type}s/${id}` }>
          <h3 data-testid={ `${index}-horizontal-name` }>
            { name }
          </h3>
        </Link>
        {
          pathname === '/done-recipes' ? (
            <h5
              data-testid={ `${index}-horizontal-done-date` }
            >
              {`Done in: ${doneDate}`}

            </h5>
          ) : (
            <div>
              {
                tags.map((tag) => (
                  <h5
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                    key={ tag }
                  >
                    { tag }

                  </h5>
                ))
              }
            </div>
          )
        }
        <ShareButton
          index={ index }
          pathname={ pathname }
          type={ type }
          id={ id }
        />
        {
          pathname === '/favorite-recipes' && (
            <FavoriteButton
              recipeId={ id }
              // recipe={ favorites }
              index={ index }
              pathname={ pathname }
            />
          )
        }
      </div>

    </div>
  );
}

HorizontalRecipeCard.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  doneDate: PropTypes.string,
  alcoholicOrNot: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  nationality: PropTypes.string.isRequired,
  // favorites: PropTypes.arrayOf(PropTypes.object),
  pathname: PropTypes.string.isRequired,
};

HorizontalRecipeCard.defaultProps = {
  doneDate: '',
  alcoholicOrNot: '',
  tags: [],
  // favorites: [],
};

export default HorizontalRecipeCard;
