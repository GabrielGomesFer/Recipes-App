import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

function Header({ headerText, isSearchPage }) {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const openSearchBar = () => {
    if (isOpen === false) {
      setIsOpen(true);
    }
    if (isOpen === true) {
      setIsOpen(false);
    }
  };

  const redirectToProfilePage = () => {
    history.push('/profile');
  };

  return (
    <header>
      <button type="button" onClick={ redirectToProfilePage }>
        <img
          src={ profileIcon }
          alt="profile-img"
          data-testid="profile-top-btn"
        />
      </button>
      <h2 data-testid="page-title">{ headerText }</h2>
      {
        isSearchPage && (
          <button type="button" onClick={ openSearchBar }>
            <img
              src={ SearchIcon }
              alt="search-img"
              data-testid="search-top-btn"
            />
          </button>
        )
      }
      {
        isOpen && (
          <form>
            <input type="text" data-testid="search-input" />
            <input
              type="radio"
              id="ingredient"
              name="search-radio"
              value="ingredient"
              data-testid="ingredient-search-radio"
            />
            <input
              type="radio"
              id="name"
              name="search-radio"
              value="name-search"
              data-testid="name-search-radio"
            />
            <input
              type="radio"
              id="firstLetter"
              name="search-radio"
              value="first-letter"
              data-testid="first-letter-search-radio"
            />
            <button type="button" data-testid="exec-search-btn">
              SEARCH
            </button>
          </form>
        )
      }
    </header>
  );
}

Header.propTypes = {
  headerText: PropTypes.string.isRequired,
  isSearchPage: PropTypes.bool.isRequired,
};

export default Header;
