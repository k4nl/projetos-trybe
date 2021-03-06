import React from 'react';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import ShowExpenses from '../components/ShowExpenses';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <ExpenseForm />
        <ShowExpenses />
      </div>
    );
  }
}

export default Wallet;
