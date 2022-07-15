import React from 'react';

function SearchBar() {
  return (
    <form>
      <input type="text" data-testid="search-input" />
      <label htmlFor="ingredient">
        <input
          type="radio"
          id="ingredient"
          name="search-radio"
          value="i="
          data-testid="ingredient-search-radio"
        />
        Ingredient
      </label>
      <label htmlFor="name">
        <input
          type="radio"
          id="name"
          name="search-radio"
          value="s="
          data-testid="name-search-radio"
        />
        Name
      </label>
      <label htmlFor="firstLetter">
        <input
          type="radio"
          id="firstLetter"
          name="search-radio"
          value="f="
          data-testid="first-letter-search-radio"
        />
        First letter
      </label>
      <button type="button" data-testid="exec-search-btn">
        SEARCH
      </button>
    </form>
  );
}

export default SearchBar;
