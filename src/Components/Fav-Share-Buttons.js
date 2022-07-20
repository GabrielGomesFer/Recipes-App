import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
/* import fetchAPIs from '../services/FetchAPI';
import RecipesContext from '../Context/recipesContext'; */

function FavShareButton(pathname: pathname) {
  // const params = useParams(); // params.id da o id correto
  const [coppied, setCoppied] = useState(false);
  /*   const handleClick = () => {

  }; */
  const copyMessage = () => {
    const copy = clipboardCopy;
    const copyLink = pathname.pathname;
    // console.log(pathname.pathname);
    copy(`http://localhost:3000${copyLink}`); //  Isso é puramente uma gambiarra pra rodar no test trazendo o localhost do link
    setCoppied(true);
    // })
  };

  return (
    <section>
      <button
        type="button"
        onClick={ copyMessage }
        data-testid="share-btn"
      >
        <img src={ shareIcon } alt="share icon" />
      </button>
      {
        coppied === true
        && (
          <div className="alert alert-warning" role="alert">
            Link copied!
          </div>

        )
      }
      <button
        type="button"
        data-testid="favorite-btn"
        /* onClick={ handleClick } */
      >
        Favoritar Receita
      </button>
    </section>
  );
}

FavShareButton.propTypes = {
  pathname: PropTypes.string.isRequired,
//   history: PropTypes.shape({
//     location: PropTypes.shape({
//       pathname: PropTypes.string.isRequired,
//     }).isRequired,
//   }).isRequired,
};

export default FavShareButton;
