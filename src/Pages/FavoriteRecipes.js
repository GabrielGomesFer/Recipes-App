import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import FavoriteCard from '../Components/FavoriteCard';
import FavoriteFilter from '../Components/FavoriteFilter';

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const currentFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorites(currentFavorites);
    /*  console.log(favorites); */
  }, []);
  return (
    <div>
      <Header headerText="Favorite Recipes" isSearchPage={ false } />

      <FavoriteFilter favorites={ favorites } setFavorites={ setFavorites } />
      {
        favorites.map((recipe, index) => (
          <FavoriteCard
            key={ index }
            favorites={ favorites }
            index={ index }
            alcoholic={ recipe.alcoholicOrNot }
            category={ recipe.category }
            id={ recipe.id }
            image={ recipe.image }
            name={ recipe.name }
            nationality={ recipe.nationality }
            type={ recipe.type }
          />

        ))
      }
    </div>
  );
}

export default FavoriteRecipes;
