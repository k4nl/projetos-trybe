import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sumCurrencies as sumCurrenciesAction } from '../actions';

class Header extends React.Component {
  constructor() {
    super();
    this.calcTotalExpenses = this.calcTotalExpenses.bind(this);
  }

  calcTotalExpenses() {
    const { expenses, totalExpense, sumCurrencies } = this.props;
    const values = expenses
      .map((item) => item.value * item.exchangeRates[item.currency].ask);
    const expended = values.reduce((acc, curr) => acc + curr, 0).toFixed(2);
    sumCurrencies(expended);
    return totalExpense;
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <p
          data-testid="email-field"
        >
          { email}
        </p>
        <p
          data-testid="total-field"
        >
          { `R$: ${this.calcTotalExpenses()}` }
        </p>
        <p
          data-testid="header-currency-field"
        >
          BRL
        </p>
      </header>
    );
  }
}

Header.defaultProps = {
  totalExpense: 0,
};

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  totalExpense: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  sumCurrencies: PropTypes.func.isRequired,
};

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
  totalExpense: wallet.totalExpense,
});

const mapDispatchToProps = (dispatch) => ({
  sumCurrencies: (payload) => dispatch(sumCurrenciesAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
