import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function FavoriteShareButton({ id, type }) {
  const [coppied, setCoppied] = useState(false);

  const FavCopyMessage = () => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setCoppied(true);
  };

  return (
    <div>
      <button
        type="button"
        onClick={ FavCopyMessage }
        data-testid="share-btn"
      >
        <img src={ shareIcon } alt="share icon" />
      </button>
      {
        coppied && (
          <div className="alert alert-warning" role="alert">
            Link copied!
          </div>
        )
      }
    </div>
  );
}

FavoriteShareButton.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default FavoriteShareButton;
