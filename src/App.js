import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Search from './Pages/Search';
import Profile from './Pages/Profile';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import DoneRecipes from './Pages/DoneRecipes';
import RecipeDetails from './Pages/RecipeDetails';
import RecipeInProgress from './Pages/RecipeInProgress';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Switch>
      <Route
        path="/drinks/:id/in-progress"
        render={ (props) => (
          <RecipeInProgress { ...props } />) }
      />
      <Route
        path="/foods/:id/in-progress"
        render={ (props) => (
          <RecipeInProgress { ...props } />
        ) }
      />
      <Route path="/drinks/:id" render={ (props) => <RecipeDetails { ...props } /> } />
      <Route path="/foods/:id" render={ (props) => <RecipeDetails { ...props } /> } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route path="/profile" component={ Profile } />
      <Route path="/drinks" component={ Search } />
      <Route path="/foods" component={ Search } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
