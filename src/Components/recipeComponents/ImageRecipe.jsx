import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import { useParams } from 'react-router-dom';

function ImageRecipe(detailedRecipe) {
  const [getRecipe, setGetRecipe] = useState('');
  // const params = useParams(); // params.id da o id correto

  useEffect(() => {
    setGetRecipe(detailedRecipe);
    console.log('det', detailedRecipe);
    console.log('get', getRecipe);
  }, [detailedRecipe]);

  return (
    <div>
      <h1>text</h1>
      {
        getRecipe.length > 0
        && getRecipe.map((imagRec, i) => (
          <img
            key={ `photo${i}` }
            src={ imagRec.strMealThumb }
            alt={ imagRec.strMeal }
            data-testid="recipe-photo"
          />

        ))
      }
    </div>
  );
}

export default ImageRecipe;
