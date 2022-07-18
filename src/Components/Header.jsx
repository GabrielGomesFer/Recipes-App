import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import './StyleSheet/Header.css';

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
    <header className="header-container">
      <nav className="navigation-container">
        <button type="button" onClick={ redirectToProfilePage }>
          <img
            src={ profileIcon }
            alt="profile-img"
            data-testid="profile-top-btn"
          />
        </button>
        <h2 data-testid="page-title">{ headerText }</h2>
        {
          isSearchPage ? (
            <button type="button" onClick={ openSearchBar }>
              <img
                src={ SearchIcon }
                alt="search-img"
                data-testid="search-top-btn"
              />
            </button>
          ) : <div className="ghost-element" />
        }
      </nav>
      {
        isOpen && (
          <SearchBar recipeType={ headerText } />
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
