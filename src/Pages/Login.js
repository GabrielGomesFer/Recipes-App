import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './StyleSheet/Login.css';

const Login = (props) => {
  const [isValid, setIsValid] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const onChangeHandler = ({ target: { value, name } }) => {
    setUser((oldState) => ({
      ...oldState,
      [name]: value }));
  };

  const handleClick = () => {
    const { history } = props;
    const { email } = user;
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/foods');
  };

  useEffect(() => {
    const validaEmail = () => {
      const validator = /\S+@\w+\.\w+/;
      return validator.test(user.email); // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
    };

    const validButton = () => {
      const { password } = user;
      const minpass = 6;
      if (validaEmail() && password.length > minpass) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    };
    validButton();
  }, [user, setIsValid]);

  return (
    <main className="main-container-login">
      <h4>Login</h4>
      <form className="form-container-login">
        <input
          type="text"
          data-testid="email-input"
          name="email"
          id="user"
          value={ user.email }
          onChange={ onChangeHandler }
          placeholder="seu@email.com"
        />

        <input
          type="password"
          data-testid="password-input"
          name="password"
          id="password"
          value={ user.password }
          onChange={ onChangeHandler }
          placeholder="Digite sua senha"
        />

        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ !isValid }
          onClick={ handleClick }
        >
          Login
        </button>
      </form>
    </main>
  );
};

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
