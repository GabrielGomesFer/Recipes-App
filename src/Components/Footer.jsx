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
    <footer className="footer-container" data-testid="footer">
      <button
        type="button"
        onClick={ () => redirectToPage('foods') }
      >
        <img data-testid="food-bottom-btn" src={ mealIcon } alt="Meal Icon" />
      </button>
      <button
        type="button"
        onClick={ () => redirectToPage('drinks') }
      >
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="Drink Icon" />
      </button>
    </footer>

  );
}

export default Footer;
