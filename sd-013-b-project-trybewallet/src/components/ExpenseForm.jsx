import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from './Input';
import Select from './Select';
import {
  fetchCurrencies as fetchCurrenciesAction,
  fetchExchangeRates as fetchExchangeRatesAction,
} from '../actions/index';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  handleClick(event) {
    event.preventDefault();
    const { value, description, currency, method, tag } = this.state;
    const { fetchExchangeRates } = this.props;
    fetchExchangeRates({
      value,
      description,
      currency,
      method,
      tag,
    });
  }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <form>
          <Input
            onChange={ this.handleChange }
            description={ description }
            value={ value }
          />
          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              id="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              { currencies.map((currencyType, index) => (
                <option
                  key={ index }
                >
                  { currencyType }
                </option>))}
            </select>
          </label>
          <Select
            onChange={ this.handleChange }
            method={ method }
            tag={ tag }
          />
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.any).isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  fetchExchangeRates: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrenciesAction()),
  fetchExchangeRates: (payload) => dispatch(fetchExchangeRatesAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
