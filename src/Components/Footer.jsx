import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './StyleSheet/footer.css';

function Footer() {
  const history = useHistory();

  const redirectToPage = (page) => {
    history.push(`/${page}`);
  };

  return (
    <footer data-testid="footer">
      <button
        type="button"
        onClick={ () => redirectToPage('foods') }
        data-testid="food-bottom-btn"
      >
        <img src={ mealIcon } alt="Meal Icon" />
      </button>
      <button
        type="button"
        onClick={ () => redirectToPage('drinks') }
        data-testid="drinks-bottom-btn"
      >
        <img src={ drinkIcon } alt="Drink Icon" />
      </button>
    </footer>

  );
}

export default Footer;
