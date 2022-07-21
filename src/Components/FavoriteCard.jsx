import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FavoriteShareButton from './FavoriteShareButton';
import FavoriteButton from './FavoriteButton';

function FavoriteCard({
  favorites, index, alcoholic, category, id, image, name, nationality, type,
}) {
  console.log(
    favorites, index, alcoholic, category, id, image, name, nationality, type,
  );
  const redirectToRecipe = () => {
    const { history } = props;
    history.push(`http://localhost:3000/${type}s/${id}`);
  };

  return (
    <div>
      <Link to={ `/${type}s/${id}` }>
        <img
          src={ image }
          alt={ index }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      {
        nationality !== '' ? (
          <span data-testid={ `${index}-horizontal-top-text` }>
            {`${nationality} - ${category}`}
          </span>

        ) : (
          <span data-testid={ `${index}-horizontal-top-text` }>
            {category}
          </span>
        )
      }
      <Link to={ `/${type}s/${id}` }>
        <h3 data-testid={ `${index}-horizontal-name` }>
          { name }
        </h3>
      </Link>
      <FavoriteShareButton
        id={ id }
        type={ type }
      />
      <FavoriteButton // Acredito que eu vá ter que criar outro arquivo por conta da forma que os objetos são tratados dentro
        recipeId={ id } // do FavoriteButton
        recipe={ favorites }
        recipeType={ type }
      />
    </div>
  );
}

FavoriteCard.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  index: PropTypes.number.isRequired,
  alcoholic: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default FavoriteCard;
