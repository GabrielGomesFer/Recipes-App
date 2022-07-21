import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function ShareButton({ pathname, type, id, index }) {
  const [coppied, setCoppied] = useState(false);

  const copyMessage = () => {
    if (pathname.includes('recipes')) {
      copy(`http://localhost:3000/${type}s/${id}`);
    } else {
      copy(`http://localhost:3000${pathname.replace('/in-progress', '')}`);
    }
    setCoppied(true);
  };

  return (
    <div>
      <button
        type="button"
        onClick={ copyMessage }
      >
        <img
          src={ shareIcon }
          alt="share icon"
          data-testid={ pathname.includes('recipes') ? (
            `${index}-horizontal-share-btn`
          ) : ('share-btn') }
        />
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

ShareButton.propTypes = {
  pathname: PropTypes.string.isRequired,
  id: PropTypes.string,
  type: PropTypes.string,
  index: PropTypes.number.isRequired,
};

ShareButton.defaultProps = {
  id: '',
  type: '',
};

export default ShareButton;
