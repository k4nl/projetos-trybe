import React from 'react';
import PropTypes from 'prop-types';

class AddExpense extends React.Component {
  render() {
    const { expenses } = this.props;
    const { currency, exchangeRates } = expenses;
    const [newCurrencyName] = exchangeRates[currency].name.split('/');
    const value = Number(expenses.value);
    const cambio = Number(exchangeRates[currency].ask);
    return (
      <tr>
        <td>{ expenses.description }</td>
        <td>{ expenses.tag }</td>
        <td>{ expenses.method }</td>
        <td>{ value }</td>
        <td>{ newCurrencyName }</td>
        <td>{ cambio.toFixed(2) }</td>
        <td>{ cambio * value }</td>
        <td>Real</td>
        <td><button type="button">editar</button></td>
      </tr>
    );
  }
}

AddExpense.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default AddExpense;
