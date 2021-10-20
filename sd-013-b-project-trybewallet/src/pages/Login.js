import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getEmail as getEmailAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      validEmail: false,
      validPassword: false,
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.login = this.login.bind(this);
  }

  handleEmail({ target }) {
    // regex pego no site https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    const re = /([a-z])\w+@([a-z])\w+.com/i;
    const validEmail = re.test(String(target.value).toLowerCase());

    this.setState({
      email: target.value,
      validEmail,
    });
  }

  handlePassword({ target }) {
    const password = target.value;
    const five = 5;
    if (password.length > five) {
      this.setState({
        password,
        validPassword: true,
      });
    } else {
      this.setState({
        password,
        validPassword: false,
      });
    }
  }

  login() {
    const { history, getEmail } = this.props;
    const { email } = this.state;
    getEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, validEmail, validPassword, password } = this.state;
    return (
      <main>
        <form>
          <label htmlFor="email">
            <input
              type="email"
              placeholder="Email"
              id="email"
              data-testid="email-input"
              onChange={ this.handleEmail }
              value={ email }
            />
          </label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            data-testid="password-input"
            onChange={ this.handlePassword }
            value={ password }
          />
          <button
            type="button"
            disabled={ !validEmail || !validPassword }
            onClick={ this.login }
          >
            Entrar
          </button>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  getEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getEmail: (payload) => dispatch(getEmailAction(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
