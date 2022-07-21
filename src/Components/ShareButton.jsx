import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function ShareButton({ pathname }) {
  const [coppied, setCoppied] = useState(false);

  const copyMessage = () => {
    copy(`http://localhost:3000${pathname.replace('/in-progress', '')}`);
    setCoppied(true);
  };

  return (
    <div>
      <button
        type="button"
        onClick={ copyMessage }
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

ShareButton.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default ShareButton;
