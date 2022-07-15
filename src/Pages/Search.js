import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

function Search({ history: { location: { pathname } } }) {
  const [recipeType, setRecipeType] = useState('');

  useEffect(() => {
    if (pathname === '/foods') {
      setRecipeType('Foods');
    }
    if (pathname === '/drinks') {
      setRecipeType('Drinks');
    }
  }, [pathname]);

  return (
    <main>
      <Header headerText={ recipeType } isSearchPage />
    </main>
  );
}

Search.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Search;
