import React from 'react';

export default class PusharseForm extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="nome">
          Nome completo:
          <input type="text" data-testid="checkout-fullname" id="nome" />
        </label>
        <label htmlFor="email">
          Email:
          <input type="email" data-testid="checkout-email" id="email" />
        </label>
        <label htmlFor="cpf">
          CPF:
          <input type="text" data-testid="checkout-cpf" id="cpf" />
        </label>
        <label htmlFor="phone">
          Telefone:
          <input type="text" data-testid="checkout-phone" id="phone" />
        </label>
        <label htmlFor="cep">
          CEP:
          <input type="text" data-testid="checkout-cep" id="cep" />
        </label>
        <label htmlFor="adress">
          Endereco:
          <input type="text" data-testid="checkout-address" id="adress" />
        </label>
      </form>
    );
  }
}
