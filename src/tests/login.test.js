import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Testa a pagina de Login', () => {
  it('Verifica funcionalidade do login', () => {
		const { history } = renderWithRouter(<App />)

		const inputEmail = screen.getByTestId('email-input');
		const inputPassword =  screen.getByTestId('password-input');
		const button = screen.getByTestId('login-submit-btn');

		expect(inputEmail).toBeInTheDocument();
		expect(inputPassword).toBeInTheDocument();
		expect(button).toBeInTheDocument();

		expect(button).toBeDisabled();

		userEvent.type(inputEmail, 'teste@teste.com');
		userEvent.type(inputPassword, '1234567');

		expect(button).not.toBeDisabled();

		userEvent.click(button);

		expect(history.location.pathname).toBe('/foods');
  })

})
