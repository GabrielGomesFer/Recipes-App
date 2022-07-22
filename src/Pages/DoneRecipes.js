import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import HorizontalRecipeCard from '../Components/HorizontalRecipeCard';
import ProfileRecipeFilter from '../Components/ProfileRecipeFilter';

function DoneRecipes({ history: { location: { pathname } } }) {
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    // if (!JSON.parse(localStorage.getItem('doneRecipes'))) {
    //   localStorage.setItem('doneRecipes', JSON.stringify([]));
    // }
    const storageRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(storageRecipes);
  }, []);

  return (
    <div>
      <Header headerText="Done Recipes" isSearchPage={ false } />
      <ProfileRecipeFilter
        profileRecipes={ doneRecipes }
        setRecipes={ setDoneRecipes }
        storageKey="doneRecipes"
      />
      {
        doneRecipes && doneRecipes.map(({
          id,
          type,
          nationality,
          category,
          alcoholicOrNot,
          name,
          image,
          doneDate,
          tags,
        }, index) => (
          <HorizontalRecipeCard
            key={ id }
            id={ id }
            index={ index }
            type={ type }
            image={ image }
            category={ category }
            name={ name }
            doneDate={ doneDate }
            alcoholicOrNot={ alcoholicOrNot }
            tags={ tags }
            nationality={ nationality }
            pathname={ pathname }
          />
        ))
      }
    </div>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DoneRecipes;
