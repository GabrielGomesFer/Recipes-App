import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchAPIs from '../services/FetchAPI';
import RecipesContext from '../Context/recipesContext';
import './StyleSheet/ButtonFilters.css';
import 'bootstrap';

function ButtonFilters({ recipeType }) {
  const [categorys, setCategorys] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('');

  const { setIsLoading, setRecipes } = useContext(RecipesContext);

  useEffect(() => {
    const getCategorys = async () => {
      if (recipeType === 'Foods') {
        setIsLoading(true);
        const response = await fetchAPIs('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const responseCategorys = [...response.meals];
        setCategorys(responseCategorys);
        setIsLoading(false);
      }
      if (recipeType === 'Drinks') {
        setIsLoading(true);
        const response = await fetchAPIs('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const responseCategorys = [...response.drinks];
        setCategorys(responseCategorys);
        setIsLoading(false);
      }
    };
    getCategorys();
  }, [recipeType, setIsLoading]);

  const handleClick = async ({ target: { id } }) => {
    if (id === 'All' || id === currentFilter) {
      setIsLoading(true);
      setCurrentFilter('All');
      const url = recipeType === 'Foods'
        ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
        : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const data = await fetchAPIs(url);
      const responseRecipes = [...Object.values(data)[0]];
      setRecipes(responseRecipes);
      setIsLoading(false);
    }
    if (id !== 'All' && id !== currentFilter) {
      setCurrentFilter(id);
      setIsLoading(true);
      const url = recipeType === 'Foods'
        ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`
        : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${id}`;
      const data = await fetchAPIs(url);
      const responseRecipes = [...Object.values(data)[0]];
      setRecipes(responseRecipes);
      setIsLoading(false);
    }
  };

  const MAX_LENGTH_FILTERS = 5;

  return (
    <section>
      <button
        className="all-bttn"
        type="button"
        id="All"
        onClick={ handleClick }
        data-testid="All-category-filter"
      >
        All

      </button>
      {
        categorys.map(({ strCategory }, index) => {
          if (index < MAX_LENGTH_FILTERS) {
            return (
              <button
                className="filter-bttn"
                key={ index }
                type="button"
                id={ strCategory }
                data-testid={ `${strCategory}-category-filter` }
                onClick={ handleClick }
              >
                { strCategory }
              </button>
            );
          }
          return null;
        })
      }
    </section>
  );
}

ButtonFilters.propTypes = {
  recipeType: PropTypes.string.isRequired,
};

export default ButtonFilters;
