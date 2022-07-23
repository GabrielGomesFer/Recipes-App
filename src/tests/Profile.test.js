import React from 'react';
import renderWithRouter from './helper/renderWithRouter';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testa pagina de perfil', () => {
 it('testa funcionalidade do link Done Recipes', () => {
    renderWithRouter(<App />);
    const { history } = renderWithRouter(<App />);

    history.push('/profile');
    const doneLink = screen.getByTestId('profile-done-btn');
    userEvent.click(doneLink);

    expect(history.location.pathname).toBe('/done-recipes');
 });

 it('testa funcionalidade do link Favorite Recipes', () => {
    renderWithRouter(<App />);
    const { history } = renderWithRouter(<App />);

    history.push('/profile');
    const favoriteLink = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favoriteLink);

    expect(history.location.pathname).toBe('/favorite-recipes');
 });

 it('testa funcionalidade do LogOut', () => {
    renderWithRouter(<App />);
    Storage.prototype.setItem = jest.fn();
    localStorage.setItem('user', JSON.stringify('teste@teste.com'));
    const { history } = renderWithRouter(<App />);

    history.push('/profile');
    const logOutLink = screen.getByTestId('profile-logout-btn');

    userEvent.click(logOutLink);

    const afterLogoutLS = JSON.parse(localStorage.getItem('user'));

    expect(afterLogoutLS).toBeNull();
 });

})