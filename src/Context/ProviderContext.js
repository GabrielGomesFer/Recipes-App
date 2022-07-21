import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './recipesContext';

function ProviderContext({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isStarted, setIsStarted] = useState(false);

  const valueContext = {
    recipes,
    setRecipes,
    isLoading,
    setIsLoading,
    isStarted,
    setIsStarted,
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
