import React, { useState } from 'react';
import InputCard from '../components/InputCard';
import { loginValidator } from '../redux/helper';
import ButtonCard from '../components/ButtonCard';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({
      email,
    }));
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('mealsToken', 1);
  };
  return (
    <main className="log-container">
      <div className="none" />
      <form className="form">
        <h2>Recipes App</h2>
        <InputCard
          id="email"
          name="email"
          type="text"
          testId="email-input"
          onChange={ ({ target: { value } }) => setEmail(value) }
        />
        <InputCard
          id="login"
          name="login"
          type="password"
          testId="password-input"
          onChange={ ({ target: { value } }) => setPassword(value) }
        />
        <ButtonCard
          page="/comidas"
          testId="login-submit-btn"
          buttonText="Entrar"
          onClick={ handleSubmit }
          disabled={ !loginValidator({ email, password }) }
        />
      </form>
      <div className="none" />
    </main>
  );
}
export default Login;
