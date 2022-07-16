import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function Profile() {
  const [emailProfile, setEmailProfile] = useState('');
  const history = useHistory();

  const getEmail = () => {
    if (!JSON.parse(localStorage.getItem('user'))) {
      localStorage.setItem('user', JSON.stringify({ email: '' }));
    }
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user.email);
    setEmailProfile(user.email);
  };

  useEffect(() => {
    getEmail();
  }, []);

  const redirectToPage = (page) => {
    history.push(`/${page}`);
  };

  const logOut = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header headerText="Profile" isSearchPage={ false } />
      <h1 data-testid="profile-email">{ emailProfile }</h1>
      <button
        type="button"
        onClick={ () => redirectToPage('done-recipes') }
        data-testid="profile-done-btn"
      >
        Done Recipes
      </button>
      <button
        type="button"
        onClick={ () => redirectToPage('favorite-recipes') }
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        onClick={ logOut }
        data-testid="profile-logout-btn"
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
