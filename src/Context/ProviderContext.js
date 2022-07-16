import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './recipesContext';

function ProviderContext({ children }) {
  const [recipes, setRecipes] = useState([]);

  const valueContext = {
    recipes,
    setRecipes,
  };

  return (
    <RecipesContext.Provider value={ valueContext }>
      { children }
    </RecipesContext.Provider>
  );
}

ProviderContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderContext;
