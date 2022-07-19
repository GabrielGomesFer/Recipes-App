import React from 'react';
/* import fetchAPIs from '../services/FetchAPI';
import RecipesContext from '../Context/recipesContext'; */

function FavShareButton() {
/*   const handleClick = () => {

  }; */

  return (
    <section>
      <button
        type="button"
        /* onClick={ handleClick } */
        data-testid="share-btn"
      >
        Compartilhar Receita
      </button>

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

export default FavShareButton;
